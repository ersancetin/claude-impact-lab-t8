/* ============================================================
   DOSYA KODU — kod verinin KENDİSİNİ taşır

   Sunucu yok, veritabanı yok, kullanıcı hesabı yok. "Dosya sorgulama"
   bir yere sormak değil, kodu çözmek demektir. Böylece sitenin
   "hiçbir kişisel veri toplanmaz" sözü bozulmadan kullanıcı dosyasını
   başka bir cihazda da açabiliyor.

   NEDEN JSON + DEFLATE DEĞİL: ilk kurgu kompakt JSON'u deflate-raw ile
   sıkıştırıyordu; sonuç 130 karakterin üstündeydi. Elle yazılamayan,
   telefonda okunamayan bir kod işe yaramaz. Alanlar sabit ve sayılı
   olduğu için ikili biçim çok daha verimli: tarih başına 2 bayt.
   Aynı dosya artık ~24 karakter. Ayrıca CompressionStream bağımlılığı
   da kalktı — kod her tarayıcıda çalışıyor.

   Kod düzeni (base32'ye yazılan baytlar):
     bayt 0        sürüm (2)
     bayt 1        alan maskesi — hangi tarihlerin dolu olduğu
     bayt 2        profil (üst yarı) + bina durumu (alt yarı)
     bayt 3..      dolu her alan için 2 bayt: 2000-01-01'den beri gün
     son 2 bayt    sağlama (FNV-1a 16 bit) — yazım hatasını yakalar

   Alfabe Crockford base32: I, L, O, U yok. Elle yazarken 1↔I ve 0↔O
   karışması okurken geri çevrilebiliyor.

   Bu dosya saf hesaptır: DOM'a, localStorage'a ve ağa dokunmaz.
   Sınaması: scripts/dosya-kod-kontrol.mjs
   ============================================================ */

const ABC = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ONEK = "DH";
const SURUM = 2;
const BASLANGIC = Date.UTC(2000, 0, 1);
const GUN = 86400000;

/* Maske bit sırası — DEĞİŞTİRİLEMEZ. Sıra değişirse eski kodlar
   yanlış alana çözülür; yeni alan yalnızca sona eklenir. */
export const ALANLAR = [
  "deprem", "ilan", "eksper", "haksahipligi",
  "riskliyapi", "dosyakapanis", "ret",
];
const PROFILLER = ["", "malik", "kiraci"];
const HASARLAR = ["", "agir", "hafif", "bilinmiyor"];

export function base32Yaz(baytlar) {
  let bit = 0, deger = 0, cikti = "";
  for (const b of baytlar) {
    deger = (deger << 8) | b; bit += 8;
    while (bit >= 5) { cikti += ABC[(deger >>> (bit - 5)) & 31]; bit -= 5; }
  }
  if (bit) cikti += ABC[(deger << (5 - bit)) & 31];
  return cikti;
}

export function base32Oku(metin) {
  const t = String(metin).toUpperCase().replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0").replace(/[IL]/g, "1").replace(/U/g, "V");
  const cikti = [];
  let bit = 0, deger = 0;
  for (const ch of t) {
    const i = ABC.indexOf(ch);
    if (i < 0) throw new Error(`Kodda tanınmayan karakter var: "${ch}".`);
    deger = (deger << 5) | i; bit += 5;
    if (bit >= 8) { cikti.push((deger >>> (bit - 8)) & 255); bit -= 8; }
  }
  return Uint8Array.from(cikti);
}

function sagla(baytlar) {
  let h = 0x811c;
  for (const b of baytlar) { h ^= b; h = (h * 0x0193) & 0xffff; }
  return [(h >> 8) & 255, h & 255];
}

/* "YYYY-MM-DD" ↔ 2000-01-01'den beri geçen gün. Saat dilimi devreye
   girmesin diye baştan sona UTC kullanılır. */
function gunYaz(iso) {
  const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso).trim());
  if (!p) return null;
  const g = Math.round((Date.UTC(+p[1], +p[2] - 1, +p[3]) - BASLANGIC) / GUN);
  return g >= 0 && g <= 0xffff ? g : null;
}

function gunOku(g) {
  const d = new Date(BASLANGIC + g * GUN);
  const iki = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${iki(d.getUTCMonth() + 1)}-${iki(d.getUTCDate())}`;
}

const grupla = (metin) => (metin.match(/.{1,4}/g) || []).join("-");

/* dosya: { deprem, ilan, …, profil, hasar } — hepsi isteğe bağlı */
export function kodUret(dosya = {}) {
  const baytlar = [SURUM, 0, 0];
  let maske = 0;
  const gunler = [];
  ALANLAR.forEach((ad, i) => {
    const g = gunYaz(dosya[ad]);
    if (g == null) return;
    maske |= 1 << i;
    gunler.push((g >> 8) & 255, g & 255);
  });
  baytlar[1] = maske;
  baytlar[2] = ((Math.max(0, PROFILLER.indexOf(dosya.profil)) & 15) << 4)
             | (Math.max(0, HASARLAR.indexOf(dosya.hasar)) & 15);
  const govde = Uint8Array.from([...baytlar, ...gunler]);
  const tam = Uint8Array.from([...govde, ...sagla(govde)]);
  return `${ONEK}-${grupla(base32Yaz(tam))}`;
}

export function kodCoz(kod) {
  /* "DH" ön eki base32 alfabesinde geçerli iki harftir (D ve H); önce
     ayıklanmazsa gövdeye karışıp kodu bozar. Boşluklar önce silinir ki
     telefondan "D H - 0 9…" gibi aralanmış yapıştırma da tanınsın. */
  const govdeMetni = String(kod).replace(/\s+/g, "").replace(/^DH[-.]*/i, "");
  const baytlar = base32Oku(govdeMetni);
  if (baytlar.length < 5)
    throw new Error("Kod çok kısa — eksik kopyalanmış olabilir.");

  /* Kanoniklik: baytları yeniden yazınca girdinin aynısı çıkmalı.
     base32'nin son karakterinde 1–4 bitlik dolgu vardır ve o bitler
     baytlara girmez; yalnızca sağlamaya bakarsak o karakterdeki bir
     yazım hatası sessizce yutulur. Bu kontrol onu da yakalar. */
  const temiz = String(govdeMetni).toUpperCase().replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0").replace(/[IL]/g, "1").replace(/U/g, "V");
  if (base32Yaz(baytlar) !== temiz)
    throw new Error("Kod doğrulanamadı. Fazladan veya hatalı karakter var — " +
                    "olduğu gibi kopyalayıp yeniden deneyin.");

  /* base32 dolgusu 5 bitten kısa kaldığı için çözüm asla fazladan bayt
     üretmez: n bayt ⇒ ceil(8n/5) karakter ⇒ tam n bayt. */
  const govde = baytlar.slice(0, -2);
  const beklenen = sagla(govde);
  const gelen = baytlar.slice(-2);
  if (beklenen[0] !== gelen[0] || beklenen[1] !== gelen[1])
    throw new Error("Kod doğrulanamadı. Bir karakter eksik veya yanlış olabilir — " +
                    "olduğu gibi kopyalayıp yeniden deneyin.");

  if (govde[0] !== SURUM)
    throw new Error(`Bu kod ${govde[0]} numaralı sürümle üretilmiş; bu sayfa ${SURUM} numaralı sürümü okuyor.`);

  const maske = govde[1];
  const dosya = {};
  const p = PROFILLER[(govde[2] >> 4) & 15];
  const h = HASARLAR[govde[2] & 15];
  if (p) dosya.profil = p;
  if (h) dosya.hasar = h;

  let o = 3;
  for (let i = 0; i < ALANLAR.length; i++) {
    if (!(maske & (1 << i))) continue;
    if (o + 1 >= govde.length)
      throw new Error("Kod eksik — tarihlerin bir kısmı okunamadı.");
    dosya[ALANLAR[i]] = gunOku((govde[o] << 8) | govde[o + 1]);
    o += 2;
  }
  return dosya;
}
