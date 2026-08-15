/* ============================================================
   VERİ KATMANI

   PARAM (parasal değerler, hak düşürücü süreler, emsal uygulamalar)
   data/parametreler.json'dan ÜRETİLİR — bkz. veri-parametre.js ve
   scripts/veri-uret.py. Buradan yeniden dışa aktarılıyor ki mevcut
   `import { PARAM } from "../assets/veri.js"` satırları değişmesin.

   Bu dosyada ELLE bakılan iki şey kalır: HAKLAR ve SABLONLAR. İkisi de
   JSON'a çevrilemez (şablon gövdeleri fonksiyondur), bu yüzden üretime
   girmezler.

   UYARI: Değerlerin hiçbiri henüz resmî kaynaktan doğrulanmamıştır.
   Doğrulama planı: DOGRULAMA.md
   ============================================================ */

export { PARAM } from "./veri-parametre.js";

/* ------------------------------------------------------------
   HAK KARTLARI — profile göre gösterilir
   ------------------------------------------------------------ */
export const HAKLAR = [
  {
    id: "tazminat-mulkiyet",
    baslik: "Tazminat davası için tapu sahibi olmanız gerekmez",
    profil: ["kiraci"],
    onem: "yuksek",
    metin: "Hak sahipliği mülkiyet ilişkisi arar; tazminat davası aramaz. Kiracı da müteahhide, yapı denetim kuruluşuna ve idareye karşı kendi eşya zararı, bedeni zararı ve yakınının ölümü için dava açabilir. Ceza yargılamasında katılan olabilirsiniz.",
    dayanak: "TBK haksız fiil hükümleri · 4708 s.K. · 2577 s.K. m.13"
  },
  {
    id: "kiraci-esya-sigortasi",
    baslik: "Kendi eşyanız için sigorta yaptırabilirsiniz",
    profil: ["kiraci"],
    onem: "yuksek",
    metin: "DASK binaya ve malike bağlıdır; kiracı DASK yaptıramaz. Ancak kendi eşyanız için konut/eşya sigortası yaptırabilirsiniz. Bina malikin, eşya sizin — sigortası da ayrı. Türkiye'de kiracılar arasında yaygınlığı çok düşüktür.",
    dayanak: "Konut Sigortası Genel Şartları"
  },
  {
    id: "kira-fesih",
    baslik: "Kira sözleşmesini feshedebilirsiniz",
    profil: ["kiraci"],
    onem: "orta",
    metin: "Ağır hasar, kira ilişkisinin sürdürülmesini çekilmez kılan önemli bir sebep sayılabilir. Kiralanan tamamen yıkıldıysa ifa imkânsızlığı gündeme gelir. Hasarlı ama kullanılabilir konutta kira bedelinde indirim isteyebilirsiniz.",
    dayanak: "TBK m.331 · m.136 · m.305 vd."
  },
  {
    id: "kiraci-kira-yardimi",
    baslik: "Kira yardımı kiracılar için de var",
    profil: ["kiraci"],
    onem: "orta",
    metin: "Riskli yapıda oturan kiracılar da Bakanlıktan kira yardımı talep edebilir. Süre 18 aya kadar uzayabilir. Depozitonuzun ve peşin ödediğiniz kiranın iadesini de talep edin.",
    dayanak: "6306 sayılı Kanun ve Uygulama Yönetmeliği"
  },
  {
    id: "dask-kapsam",
    baslik: "DASK eşyanızı ve canınızı kapsamaz",
    profil: ["malik", "kiraci"],
    onem: "yuksek",
    metin: "DASK yalnızca binayı sigortalar. Enkaz kaldırma, kira mahrumiyeti, alternatif konaklama, tüm ev eşyası, ölüm dâhil bedeni zararlar ve manevi tazminat teminat dışıdır. Bunlar için ayrı poliçeler gerekir.",
    dayanak: "Zorunlu Deprem Sigortası Genel Şartları A.3"
  },
  {
    id: "hak-sahipligi",
    baslik: "Hak sahipliği başvurusu yapın",
    profil: ["malik"],
    onem: "yuksek",
    metin: "Binası yıkılan veya ağır hasarlı malikler, devletten konut veya faizsiz kredi için hak sahipliği başvurusu yapabilir. Başvuru, ilan tarihinden itibaren iki ay içinde mahallin en büyük mülkî amirine yazılı talep ve taahhütname ile yapılır. Geri ödeme en az 20 yıl, faizsizdir.",
    dayanak: "7269 sayılı Kanun m.29"
  },
  {
    id: "dasksiz-yardim",
    baslik: "DASK'ınız yoksa devlet konut yardımı yapmaz",
    profil: ["malik"],
    onem: "yuksek",
    metin: "Zorunlu deprem sigortası bulunmayanlara Devlet konut yardımı veya kredi ödemez. DASK'ın asıl karşılığı ceza değil, afet sonrası devlet desteğine erişim hakkıdır.",
    dayanak: "7269 sayılı Kanun m.29/8"
  },
  {
    id: "eksper-itiraz-hak",
    baslik: "Eksper raporu son söz değildir",
    profil: ["malik", "kiraci"],
    onem: "orta",
    metin: "Rapora 15 gün içinde yazılı itiraz edebilir, ikinci eksper talep edebilirsiniz. İki rapor çelişirse hakem eksper atanır. Ayrıca masrafını kendiniz karşılayarak bağımsız eksper de tutabilirsiniz. Şimdi bol bol fotoğraf çekin — sonradan telafisi yok.",
    dayanak: "Sigorta Eksperleri Yönetmeliği"
  },
  {
    id: "sigorta-onbasvuru",
    baslik: "Mahkemeden önce sigortacıya yazılı başvuru zorunlu",
    profil: ["malik", "kiraci"],
    onem: "yuksek",
    metin: "Sigorta Tahkim Komisyonu'na veya mahkemeye gitmeden önce sigorta şirketine yazılı başvuru yapmak dava şartıdır. Bu adım atlanırsa başvurunuz usulden reddedilir. Ayrıca mahkemeye giden uyuşmazlık artık Tahkim'e götürülemez — yol seçimi geri dönüşsüzdür.",
    dayanak: "5684 sayılı Kanun m.30"
  },
  {
    id: "esya-alma",
    baslik: "Eşya almak, itiraz hakkınızdan vazgeçmek anlamına gelebilir",
    profil: ["malik", "kiraci"],
    onem: "yuksek",
    metin: "\"Yıkık\" ve \"acil yıktırılacak\" yapılara girmek kesinlikle yasaktır. Ağır hasarlı yapılarda eşya alımı uzman raporuyla planlanır ve pratikte 30 günlük itiraz süresine bağlanmıştır. Eşyanızı almadan önce hasar tespitine itiraz edip etmeyeceğinize karar verin.",
    dayanak: "Bakanlık genelgeleri · 7269 sayılı Kanun"
  },
  {
    id: "olum-karinesi",
    baslik: "Cenaze bulunamasa da ölüm nüfusa işlenebilir",
    profil: ["malik", "kiraci"],
    onem: "orta",
    metin: "Ölümüne kesin gözle bakılmayı gerektiren durumda kaybolan kişi, cesedi bulunamasa bile ölmüş sayılır. Bu, mahkeme kararı gerektirmez; mülkî idare amirinin emriyle ölüm tutanağı düzenlenir ve miras hemen açılır. Gaiplikten farkı budur — süre beklenmez.",
    dayanak: "TMK m.31 · 5490 sayılı Kanun m.32"
  },
  {
    id: "bes-sorgu",
    baslik: "Vefat edenin BES birikimini e-Devlet'ten sorgulayın",
    profil: ["malik", "kiraci"],
    onem: "orta",
    metin: "Aileler çoğu zaman bireysel emeklilik birikiminden habersizdir. Sözleşme olup olmadığı e-Devlet lehtar sorgulamasından öğrenilebilir. Birikim, sözleşmedeki lehtara veya yasal mirasçılara ödenir.",
    dayanak: "Bireysel emeklilik mevzuatı"
  },
  {
    id: "adli-yardim",
    baslik: "Avukat tutamıyorsanız baro adli yardımına başvurun",
    profil: ["malik", "kiraci"],
    onem: "yuksek",
    metin: "Bulunduğunuz ilin barosunun adli yardım birimi, avukatlık ücretini karşılayamayacak durumdaki kişilere ücretsiz avukat görevlendirir. Bu sitedeki hiçbir bilgi avukat yerine geçmez.",
    dayanak: "1136 sayılı Avukatlık Kanunu m.176 vd. · HMK m.334 vd."
  }
];

/* ------------------------------------------------------------
   DİLEKÇE ŞABLONLARI
   Sabit metinlerdir. Yapay zekâ tarafından üretilmez; yalnızca
   kullanıcının girdiği alanlar yerleştirilir.
   Yayın öncesi avukat onayı ZORUNLUDUR.
   ------------------------------------------------------------ */
const ORTAK_ALANLAR = [
  { ad: "adSoyad", etiket: "Adınız ve soyadınız", tip: "text", zorunlu: true },
  { ad: "tc",      etiket: "T.C. kimlik numaranız", tip: "text", zorunlu: true,
    ipucu: "Bu bilgi yalnızca tarayıcınızda kalır, hiçbir yere gönderilmez." },
  { ad: "adres",   etiket: "Tebligat adresiniz", tip: "textarea", zorunlu: true },
  { ad: "telefon", etiket: "Telefon numaranız", tip: "text", zorunlu: true }
];

/* ------------------------------------------------------------
   RESMÎ DİLEKÇE İSKELETİ

   Türkiye'de idareye ve şirketlere verilen dilekçenin yerleşik
   düzeni vardır ve evrak birimleri bu düzeni bekler:

     MUHATAP MAKAM (üstte, versal)
     KONU / BAŞVURUCU / ADRES / TELEFON  (etiketli künye bloğu)
     AÇIKLAMALAR      (numaralı)
     HUKUKİ SEBEPLER
     DELİLLER
     SONUÇ VE İSTEM
     tarih · ad soyad · imza
     EKLER            (numaralı)

   Önceki sürümde yalnızca muhatap, konu, numaralı açıklama, imza ve
   ekler vardı; HUKUKİ SEBEPLER / DELİLLER / SONUÇ VE İSTEM başlıkları
   yoktu. İskelet tek yerde kuruluyor: her şablon yalnızca kendi
   bölümlerinin içeriğini veriyor, biçim burada üretiliyor. Böylece
   bir başlık değişince dört şablonda birden değişiyor.
   ------------------------------------------------------------ */
const SATIR = 74;                 // A4'te 12pt eşit aralıklı yazının satır ölçüsü
const ETIKET = 16;

const ortala = (metin) => metin.split("\n").map((s) => {
  const bosluk = Math.max(0, Math.floor((SATIR - s.length) / 2));
  return " ".repeat(bosluk) + s;
}).join("\n");

/* İmza bloğu: satırlar tek tek değil, blok olarak sağa yaslanır.
   Satır satır yaslamak tırtıklı bir merdiven üretiyordu. */
const saga = (metin) => {
  const satirlar = metin.split("\n");
  const en = Math.max(...satirlar.map((s) => s.length));
  const bosluk = " ".repeat(Math.max(0, SATIR - 8 - en));
  return satirlar.map((s) => bosluk + s).join("\n");
};

/* A4'te satır ölçüsünü aşan paragraf sağdan taşar; kelime bütünlüğünü
   koruyarak sarılır. Kullanıcının kendi girdiği satır sonları korunur. */
const sar = (metin, en = SATIR) => String(metin || "").split("\n").map((satir) => {
  if (satir.length <= en) return satir;
  const cikti = [];
  let o = "";
  for (const kelime of satir.split(" ")) {
    if (o && (o + " " + kelime).length > en) { cikti.push(o); o = kelime; }
    else o = o ? o + " " + kelime : kelime;
  }
  if (o) cikti.push(o);
  return cikti.join("\n");
}).join("\n");

const kunye = (etiket, deger) => `${etiket.padEnd(ETIKET)}: ${deger}`;

/* Çok satırlı ve uzun değerler künye bloğunda etiket hizasına iner */
const kunyeCok = (etiket, deger) => {
  const girinti = " ".repeat(ETIKET + 2);
  const satirlar = [];
  for (const ham of String(deger || "").split("\n")) {
    const t = ham.trim();
    if (!t) continue;
    for (const s of sar(t, SATIR - girinti.length).split("\n")) satirlar.push(s.trim());
  }
  if (!satirlar.length) return kunye(etiket, "");
  return satirlar
    .map((s, i) => (i === 0 ? kunye(etiket, s) : girinti + s))
    .join("\n");
};

/* Numaralı madde: sarma satırlar numaranın altına değil, metnin
   hizasına iner — resmî dilekçenin girinti düzeni budur. */
const numarali = (liste) => liste.filter(Boolean).map((x, i) => {
  const bas = `${i + 1}) `;
  return sar(String(x), SATIR - bas.length).split("\n")
    .map((s, j) => (j === 0 ? bas + s : " ".repeat(bas.length) + s)).join("\n");
}).join("\n\n");

const madde = (liste) => liste.filter(Boolean).map((x) =>
  sar(String(x), SATIR - 2).split("\n")
    .map((s, j) => (j === 0 ? "- " + s : "  " + s)).join("\n")).join("\n");

const ekListesi = (liste) =>
  liste.filter(Boolean).map((x, i) => `${i + 1}- ${x}`).join("\n");

const tarihYaz = (t) => {
  if (!t) return "…/…/20…";
  const p = String(t).split("-");
  return p.length === 3 ? `${p[2]}.${p[1]}.${p[0]}` : String(t);
};

const cagir = (x, v) => (typeof x === "function" ? x(v) : x);

/* Resmî metni üreten tek fonksiyon. Şablonlar biçim bilmez. */
export function dilekceMetni(s, v) {
  const bolumler = [];
  const ekle = (baslik, govde) => {
    const g = (govde || "").trim();
    if (g) bolumler.push(baslik ? `${baslik}\n\n${g}` : g);
  };

  bolumler.push(ortala(cagir(s.muhatap, v)));

  ekle(null, [
    kunyeCok("KONU", cagir(s.konu, v)),
    "",
    kunyeCok("BAŞVURUCU", `${v.adSoyad || ""} (T.C. Kimlik No: ${v.tc || ""})`),
    kunyeCok("ADRES", v.adres),
    kunye("TELEFON", v.telefon || ""),
  ].join("\n"));

  ekle("AÇIKLAMALAR", numarali(cagir(s.aciklamalar, v) || []));
  ekle("HUKUKİ SEBEPLER", madde(cagir(s.hukuki, v) || []));
  ekle("DELİLLER", madde(cagir(s.deliller, v) || []));
  ekle("SONUÇ VE İSTEM", sar(cagir(s.istem, v)));
  if (s.taahhut) ekle("TAAHHÜT", sar(cagir(s.taahhut, v)));

  bolumler.push(saga(
    `${tarihYaz(v.tarih)}\n${v.adSoyad || ""}\nİmza`));

  ekle("EKLER", ekListesi(cagir(s.ekler, v) || []));

  return bolumler.join("\n\n\n") + "\n";
}

/* ------------------------------------------------------------
   DİLEKÇE ŞABLONLARI
   Sabit metinlerdir. Yapay zekâ tarafından üretilmez; yalnızca
   kullanıcının girdiği alanlar yerleştirilir.
   Yayın öncesi avukat onayı ZORUNLUDUR.
   ------------------------------------------------------------ */
export const SABLONLAR = [
  {
    id: "sigorta-basvuru",
    ad: "Sigorta şirketine yazılı başvuru",
    ozet: "Tahkim veya mahkeme yoluna gitmeden önce yapılması ZORUNLU olan başvuru. Bu adım atlanırsa dosyanız usulden reddedilir.",
    oncelik: 1,
    sure: "Zamanaşımı: 2 yıl (TTK m.1420)",
    dayanak: "5684 sayılı Sigortacılık Kanunu m.30",
    nereye: {
      kurum: "Poliçenizi düzenleyen sigorta şirketi",
      kanallar: [
        "Şirketin KEP (kayıtlı e-posta) adresine — en güvenli yol, tebliğ kaydı oluşur",
        "Noter kanalıyla ihtarname",
        "İadeli taahhütlü posta",
        "Şirketin genel müdürlük adresine elden, imza karşılığı"
      ],
      not: "Gönderdiğinizin kaydını mutlaka saklayın. Başvuru tarihini bu sitedeki süre takviminize işleyin."
    },
    alanlar: [
      ...ORTAK_ALANLAR,
      { ad: "sirket",  etiket: "Sigorta şirketinin adı", tip: "text", zorunlu: true },
      { ad: "police",  etiket: "Poliçe numarası", tip: "text", zorunlu: true },
      { ad: "hasarNo", etiket: "Hasar dosya numarası", tip: "text", zorunlu: false,
        ipucu: "Biliyorsanız yazın; bilmiyorsanız boş bırakabilirsiniz." },
      { ad: "tasinmaz", etiket: "Sigortalı taşınmazın açık adresi", tip: "textarea", zorunlu: true },
      { ad: "olayTarihi", etiket: "Deprem tarihi", tip: "date", zorunlu: true },
      { ad: "talep", etiket: "Talebiniz", tip: "textarea", zorunlu: true,
        ipucu: "Kendi cümlelerinizle yazın. Örnek: ödeme yapılmadı / yapılan ödeme eksik / dosya sonuçlandırılmadı." },
      { ad: "tarih", etiket: "Dilekçe tarihi", tip: "date", zorunlu: true }
    ],
    muhatap: (v) => `${(v.sirket || "").toUpperCase()} SİGORTA A.Ş.\nGENEL MÜDÜRLÜĞÜNE`,
    konu: "Sigorta tazminatı talebi ve 5684 sayılı Kanun m.30 uyarınca yazılı başvurudur.",
    aciklamalar: (v) => [
      `Şirketiniz nezdinde düzenlenen ${v.police} numaralı poliçe ile sigortalı bulunan taşınmaz, aşağıdaki adreste yer almaktadır:\n${(v.tasinmaz || "").trim()}`,
      `${tarihYaz(v.olayTarihi)} tarihinde meydana gelen deprem sonucunda sigortalı taşınmazda hasar meydana gelmiştir.` +
        (v.hasarNo ? ` Hasar, şirketiniz nezdinde ${v.hasarNo} numaralı dosya ile kayıt altına alınmıştır.` : ""),
      `Talebim şudur:\n${(v.talep || "").trim()}`,
      "İşbu başvuru, 5684 sayılı Sigortacılık Kanunu'nun 30 uncu maddesi uyarınca, Sigorta Tahkim Komisyonuna başvuru ve dava yoluna gitmeden önce yapılması gereken yazılı başvuru niteliğindedir. Başvurumun kayda alınarak tarafıma yazılı olarak cevap verilmesini talep ederim.",
    ],
    hukuki: [
      "5684 sayılı Sigortacılık Kanunu m.30",
      "6102 sayılı Türk Ticaret Kanunu m.1401 vd. ve m.1420",
      "Zorunlu Deprem Sigortası Genel Şartları",
      "İlgili sair mevzuat",
    ],
    deliller: (v) => [
      `${v.police} numaralı sigorta poliçesi`,
      v.hasarNo ? `${v.hasarNo} numaralı hasar dosyası` : null,
      "Hasara ilişkin fotoğraflar",
      "Varsa eksper raporu",
      "Tapu kaydı veya kira sözleşmesi",
      "Her tür yasal delil",
    ],
    istem: "Yukarıda açıklanan nedenlerle, başvurumun değerlendirilerek tarafıma yazılı olarak cevap verilmesini, sigorta tazminatının yasal faiziyle birlikte tarafıma ödenmesini saygılarımla talep ederim.",
    ekler: (v) => [
      "Poliçe örneği",
      "Hasar fotoğrafları",
      "Varsa eksper raporu",
      "Tapu / kira sözleşmesi örneği",
    ],
  },

  {
    id: "hasar-itiraz",
    ad: "Hasar tespit raporuna itiraz",
    ozet: "Binanızın hasar derecesi yanlış belirlendiyse veya hiç tespit yapılmadıysa kullanılır. Süre kaçarsa idari itiraz hakkı tamamen kaybedilir.",
    oncelik: 2,
    sure: "30 gün — mahallî ilan tarihinden itibaren",
    dayanak: "7269 sayılı Kanun",
    nereye: {
      kurum: "İl Çevre, Şehircilik ve İklim Değişikliği Müdürlüğü",
      kanallar: [
        "İl Çevre ve Şehircilik Müdürlüğüne elden, imza karşılığı",
        "Valilik veya kaymakamlık evrak birimi",
        "Afet bölgelerinde kurulan Hasar Tespit İtiraz ve Koordinasyon Merkezleri",
        "e-Devlet üzerinden ilgili başvuru adımı (varsa)"
      ],
      not: "İtiraz üzerine yapılan hasar tespiti KESİNDİR; idari yolla üçüncü bir tespit yapılmaz. Sonrasında yalnızca yargı yolu kalır."
    },
    alanlar: [
      ...ORTAK_ALANLAR,
      { ad: "il",       etiket: "İl", tip: "text", zorunlu: true },
      { ad: "ilce",     etiket: "İlçe", tip: "text", zorunlu: true },
      { ad: "binaAdres", etiket: "Binanın açık adresi", tip: "textarea", zorunlu: true },
      { ad: "ada",      etiket: "Ada / parsel", tip: "text", zorunlu: false },
      { ad: "sifat",    etiket: "Bina ile ilişkiniz", tip: "select", zorunlu: true,
        secenekler: ["Malik", "Hissedar", "Kiracı", "Kanuni temsilci"] },
      { ad: "mevcutDerece", etiket: "Raporda belirlenen hasar derecesi", tip: "select", zorunlu: true,
        secenekler: ["Hasarsız", "Az hasarlı", "Orta hasarlı", "Ağır hasarlı", "Yıkık", "Hiç tespit yapılmadı"] },
      { ad: "ilanTarihi", etiket: "Sonucun ilan edildiği tarih", tip: "date", zorunlu: true },
      { ad: "gerekce", etiket: "İtiraz gerekçeniz", tip: "textarea", zorunlu: true,
        ipucu: "Gördüğünüz somut durumu yazın: çatlaklar, kolonlardaki hasar, eğilme, daha önce yapılan tadilatlar." },
      { ad: "tarih", etiket: "Dilekçe tarihi", tip: "date", zorunlu: true }
    ],
    muhatap: (v) => `${(v.il || "").toUpperCase()} VALİLİĞİNE\n(İl Çevre, Şehircilik ve İklim Değişikliği\nMüdürlüğüne iletilmek üzere)`,
    konu: "Hasar tespit raporuna itiraz ve yeniden tespit talebidir.",
    aciklamalar: (v) => [
      `İtiraza konu taşınmaz aşağıdaki adreste yer almaktadır:\n${(v.binaAdres || "").trim()}\nİl / İlçe: ${v.il || ""} / ${v.ilce || ""}` +
        (v.ada ? `\nAda / Parsel: ${v.ada}` : ""),
      `Taşınmaz ile ilişkim: ${v.sifat || ""}.`,
      v.mevcutDerece === "Hiç tespit yapılmadı"
        ? "Taşınmaz hakkında bugüne kadar hasar tespiti yapılmamıştır."
        : `Yapılan hasar tespitinde taşınmaz "${v.mevcutDerece}" olarak değerlendirilmiş ve sonuç ${tarihYaz(v.ilanTarihi)} tarihinde ilan edilmiştir.`,
      `İtiraz gerekçelerim şunlardır:\n${(v.gerekce || "").trim()}`,
      "İşbu itiraz, ilan tarihinden itibaren yasal süresi içinde yapılmaktadır.",
    ],
    hukuki: [
      "7269 sayılı Umumi Hayata Müessir Afetler Dolayısiyle Alınacak Tedbirlerle Yapılacak Yardımlara Dair Kanun",
      "Afet sebebiyle hasar tespitine ilişkin yönetmelik ve genelgeler",
      "2577 sayılı İdari Yargılama Usulü Kanunu m.11",
      "İlgili sair mevzuat",
    ],
    deliller: [
      "Tapu kaydı veya kira sözleşmesi",
      "Binaya ait fotoğraflar",
      "Hasar tespit raporu ve ilan kaydı",
      "Varsa bağımsız teknik rapor",
      "Keşif ve bilirkişi incelemesi",
      "Her tür yasal delil",
    ],
    istem: "Yukarıda açıklanan nedenlerle, taşınmaz hakkında yeniden hasar tespiti yapılmasını, hasar derecesinin yeniden değerlendirilmesini ve sonucun tarafıma yazılı olarak bildirilmesini saygılarımla talep ederim.",
    ekler: [
      "Tapu veya kira sözleşmesi örneği",
      "Binaya ait fotoğraflar",
      "Varsa teknik rapor",
      "Kimlik fotokopisi",
    ],
  },

  {
    id: "hak-sahipligi",
    ad: "Hak sahipliği başvurusu",
    ozet: "Binası yıkılan veya ağır hasarlı maliklerin, devletten konut ya da faizsiz kredi talep etmesini sağlar.",
    oncelik: 3,
    sure: "2 ay — ilan tarihinden itibaren",
    dayanak: "7269 sayılı Kanun m.29",
    nereye: {
      kurum: "Mahallin en büyük mülkî amiri (valilik / kaymakamlık)",
      kanallar: [
        "Valilik veya kaymakamlık evrak birimine elden, imza karşılığı",
        "AFAD İl Müdürlüğü",
        "e-Devlet üzerinden ilgili başvuru adımı (varsa)"
      ],
      not: "Başvuru yazılı talep ve taahhütname ile yapılır. Reddedilirse tebliğden itibaren 15 gün içinde itiraz edebilirsiniz."
    },
    alanlar: [
      ...ORTAK_ALANLAR,
      { ad: "il",   etiket: "İl", tip: "text", zorunlu: true },
      { ad: "ilce", etiket: "İlçe", tip: "text", zorunlu: true },
      { ad: "binaAdres", etiket: "Yıkılan/hasarlı binanın açık adresi", tip: "textarea", zorunlu: true },
      { ad: "ada",  etiket: "Ada / parsel", tip: "text", zorunlu: false },
      { ad: "derece", etiket: "Kesinleşen hasar derecesi", tip: "select", zorunlu: true,
        secenekler: ["Ağır hasarlı", "Yıkık"] },
      { ad: "talepTuru", etiket: "Talebiniz", tip: "select", zorunlu: true,
        secenekler: ["Konut yapılması", "İnşaat kredisi verilmesi"] },
      { ad: "daskVar", etiket: "Zorunlu deprem sigortanız var mıydı?", tip: "select", zorunlu: true,
        secenekler: ["Evet", "Hayır"],
        ipucu: "Zorunlu deprem sigortası bulunmayanlara devlet konut yardımı veya kredi ödenmediği belirtilmektedir." },
      { ad: "tarih", etiket: "Dilekçe tarihi", tip: "date", zorunlu: true }
    ],
    muhatap: (v) => `${(v.il || "").toUpperCase()} VALİLİĞİNE` +
      (v.ilce ? `\n(${v.ilce} Kaymakamlığı aracılığıyla)` : ""),
    konu: "7269 sayılı Kanun kapsamında hak sahipliği talebi ve taahhüttür.",
    aciklamalar: (v) => [
      `Meydana gelen deprem nedeniyle maliki bulunduğum taşınmaz hasar görmüştür. Taşınmaz aşağıdaki adreste yer almaktadır:\n${(v.binaAdres || "").trim()}\nİl / İlçe: ${v.il || ""} / ${v.ilce || ""}` +
        (v.ada ? `\nAda / Parsel: ${v.ada}` : ""),
      `Taşınmazın kesinleşen hasar derecesi "${v.derece || ""}" olarak belirlenmiştir.`,
      `Talebim, hakkımda hak sahipliği kararı verilerek tarafıma ${(v.talepTuru || "").toLowerCase()} yönünde işlem tesis edilmesidir.`,
      `Taşınmaza ait zorunlu deprem sigortası durumu: ${v.daskVar || ""}.`,
    ],
    hukuki: [
      "7269 sayılı Kanun m.29",
      "Afet sebebiyle hak sahipliğine ilişkin yönetmelik hükümleri",
      "İlgili sair mevzuat",
    ],
    deliller: [
      "Tapu kaydı",
      "Nüfus kayıt örneği",
      "Kesinleşmiş hasar tespit belgesi",
      "Varsa zorunlu deprem sigortası poliçesi",
      "Her tür yasal delil",
    ],
    istem: "Yukarıda açıklanan nedenlerle, 7269 sayılı Kanun ve ilgili yönetmelik hükümleri uyarınca hak sahibi olarak kabul edilmemi ve talebim doğrultusunda işlem tesis edilmesini saygılarımla talep ederim.",
    taahhut: "7269 sayılı Kanun ile ilgili yönetmeliklerde öngörülen yükümlülükleri kabul ettiğimi, borçlandırma esaslarına uyacağımı, verdiğim bilgilerin doğru olduğunu ve gerçeğe aykırı beyanda bulunmam hâlinde doğacak hukuki sonuçlara katlanacağımı kabul ve taahhüt ederim.",
    ekler: [
      "Tapu örneği",
      "Nüfus kayıt örneği",
      "Kesinleşmiş hasar tespit belgesi",
      "Varsa zorunlu deprem sigortası poliçesi",
      "Kimlik fotokopisi",
    ],
  },

  {
    id: "eksper-itiraz",
    ad: "Eksper raporuna itiraz",
    ozet: "Eksper raporu son söz değildir. İtiraz edebilir, ikinci eksper isteyebilirsiniz; raporlar çelişirse hakem eksper atanır.",
    oncelik: 4,
    sure: "15 gün — raporun tebliğinden itibaren",
    dayanak: "Sigorta Eksperleri Yönetmeliği",
    nereye: {
      kurum: "Poliçenizi düzenleyen sigorta şirketi",
      kanallar: [
        "Şirketin KEP adresine",
        "İadeli taahhütlü posta",
        "Şirketin hasar birimine elden, imza karşılığı"
      ],
      not: "Masrafını kendiniz karşılayarak bağımsız eksper de tutabilirsiniz. Fotoğraf ve teknik rapor itirazı güçlendirir."
    },
    alanlar: [
      ...ORTAK_ALANLAR,
      { ad: "sirket",  etiket: "Sigorta şirketinin adı", tip: "text", zorunlu: true },
      { ad: "police",  etiket: "Poliçe numarası", tip: "text", zorunlu: true },
      { ad: "hasarNo", etiket: "Hasar dosya numarası", tip: "text", zorunlu: false },
      { ad: "raporTarihi", etiket: "Eksper raporunun tebliğ tarihi", tip: "date", zorunlu: true },
      { ad: "gerekce", etiket: "İtiraz gerekçeniz", tip: "textarea", zorunlu: true,
        ipucu: "Raporun hangi tespitine katılmıyorsunuz? Eksik değerlendirilen kalemleri tek tek yazın." },
      { ad: "ikinciEksper", etiket: "İkinci eksper atanmasını talep ediyor musunuz?", tip: "select",
        zorunlu: true, secenekler: ["Evet", "Hayır"] },
      { ad: "tarih", etiket: "Dilekçe tarihi", tip: "date", zorunlu: true }
    ],
    muhatap: (v) => `${(v.sirket || "").toUpperCase()} SİGORTA A.Ş.\nHASAR BİRİMİNE`,
    konu: (v) => "Eksper raporuna itiraz" +
      (v.ikinciEksper === "Evet" ? " ve ikinci eksper atanması talebidir." : "tır."),
    aciklamalar: (v) => [
      `${v.police} numaralı poliçe${v.hasarNo ? ` ve ${v.hasarNo} numaralı hasar dosyası` : ""} kapsamında düzenlenen eksper raporu tarafıma ${tarihYaz(v.raporTarihi)} tarihinde tebliğ edilmiştir.`,
      `Rapora ilişkin itiraz gerekçelerim şunlardır:\n${(v.gerekce || "").trim()}`,
      v.ikinciEksper === "Evet"
        ? "Bu nedenlerle dosyada ikinci bir eksper görevlendirilmesini talep ediyorum. Düzenlenecek raporlar arasında çelişki bulunması hâlinde hakem eksper atanmasını da ayrıca talep ederim."
        : null,
      "İşbu itiraz, raporun tebliğinden itibaren yasal süresi içinde yapılmaktadır.",
    ],
    hukuki: [
      "5684 sayılı Sigortacılık Kanunu m.22 vd.",
      "Sigorta Eksperleri Yönetmeliği",
      "6102 sayılı Türk Ticaret Kanunu m.1425 vd.",
      "İlgili sair mevzuat",
    ],
    deliller: (v) => [
      `${v.police} numaralı sigorta poliçesi`,
      "İtiraza konu eksper raporu",
      "Hasara ilişkin fotoğraflar",
      "Varsa bağımsız teknik rapor",
      "Her tür yasal delil",
    ],
    istem: "Yukarıda açıklanan nedenlerle, itirazımın değerlendirilerek tarafıma yazılı olarak cevap verilmesini ve hasar dosyamın yeniden ele alınmasını saygılarımla talep ederim.",
    ekler: [
      "Hasar fotoğrafları",
      "Varsa bağımsız teknik rapor",
      "Poliçe örneği",
      "Eksper raporu örneği",
    ],
  }
];
