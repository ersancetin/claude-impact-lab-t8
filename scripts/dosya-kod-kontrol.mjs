/* Dosya kodu gidiş-dönüş sınaması.
   Kod verinin kendisini taşıdığı için tek doğrulama noktası burasıdır:
   üretilen kod aynı dosyayı geri vermiyorsa kullanıcı kaydını kaybeder.

   Çalıştırma: node scripts/dosya-kod-kontrol.mjs                       */

import { kodUret, kodCoz, ALANLAR, base32Yaz, base32Oku }
  from "../docs/assets/dosya-kod.js";

let hata = 0;
const ok = (ad, kosul, ek = "") => {
  console.log(`  ${kosul ? "OK   " : "HATA "} ${ad}${ek ? "  " + ek : ""}`);
  if (!kosul) hata++;
};
/* Anahtar sırası kodun taşıdığı bilgi değildir; karşılaştırma
   sıralı anahtarlar üzerinden yapılır. */
const duz = (x) => (x && typeof x === "object" && !Array.isArray(x))
  ? JSON.stringify(Object.fromEntries(Object.entries(x).sort()))
  : JSON.stringify(x);
const esit = (a, b) => duz(a) === duz(b);

const donusur = (dosya) => kodCoz(kodUret(dosya));

console.log("=== GİDİŞ-DÖNÜŞ ===");
{
  const tam = {
    deprem: "2026-02-06", ilan: "2026-02-20", eksper: "2026-03-01",
    haksahipligi: "2026-02-25", riskliyapi: "2026-03-10",
    dosyakapanis: "2026-04-01", ret: "2026-04-15",
    profil: "kiraci", hasar: "agir",
  };
  const kod = kodUret(tam);
  ok("yedi tarih + profil eksiksiz döner", esit(donusur(tam), tam));
  ok("kod insanın yazabileceği uzunlukta", kod.length <= 48, `${kod.length} karakter: ${kod}`);
  ok("kod DH ön ekiyle başlar", kod.startsWith("DH-"));
}
{
  const tek = { deprem: "2026-02-06" };
  ok("tek tarihli dosya döner", esit(donusur(tek), tek));
  ok("tek tarihli kod çok kısa", kodUret(tek).length <= 24, kodUret(tek));
}
ok("boş dosya döner", esit(donusur({}), {}));
ok("profilsiz dosya profil uydurmaz",
   esit(donusur({ deprem: "2026-02-06" }), { deprem: "2026-02-06" }));
ok("malik profili korunur",
   donusur({ deprem: "2026-02-06", profil: "malik", hasar: "hafif" }).profil === "malik");

console.log("\n=== BİÇİM DAYANIKLILIĞI ===");
{
  const d = { deprem: "2026-02-06", ilan: "2026-02-20", profil: "malik" };
  const kod = kodUret(d);
  ok("küçük harf kabul edilir", esit(kodCoz(kod.toLowerCase()), d));
  ok("baştaki/sondaki boşluk kabul edilir", esit(kodCoz("  " + kod + "  "), d));
  ok("tireler kaldırılabilir", esit(kodCoz(kod.replace(/-/g, "")), d));
  ok("ön ek olmadan da çözülür", esit(kodCoz(kod.replace(/^DH-/, "")), d));
  /* Crockford: elle yazarken O↔0 ve I/L↔1 karışır, geri çevrilebilmeli */
  ok("O harfi sıfıra çevrilir", esit(kodCoz(kod.replace(/0/g, "O")), d));
  ok("I harfi bire çevrilir", esit(kodCoz(kod.replace(/1/g, "I")), d));
  ok("araya karışan noktalama temizlenir",
     esit(kodCoz(kod.split("").join(" ").replace(/-/g, ".")), d));
}

console.log("\n=== BOZUK KOD REDDEDİLİR ===");
const reddeder = (ad, kod) => {
  try { kodCoz(kod); ok(ad, false, "hata vermedi"); }
  catch { ok(ad, true); }
};
{
  const kod = kodUret({ deprem: "2026-02-06", ilan: "2026-02-20" });
  const degistir = (m, i) => m.slice(0, i) + (m[i] === "Z" ? "Y" : "Z") + m.slice(i + 1);
  reddeder("ortadaki karakter değişmiş kod", degistir(kod, 8));
  /* Son karakterde 1–4 bitlik dolgu var; baytlara girmediği için
     yalnızca sağlama ile yakalanmaz — kanoniklik kontrolü yakalar. */
  reddeder("son karakteri değişmiş kod", degistir(kod, kod.length - 1));
  reddeder("fazladan karakter eklenmiş kod", kod + "ZZ");
  reddeder("eksik kod", kod.slice(0, 10));
  reddeder("boş kod", "");
  reddeder("anlamsız metin", "merhaba dünya");
}

console.log("\n=== TARİH SINIRLARI ===");
ok("artık gün korunur", donusur({ deprem: "2024-02-29" }).deprem === "2024-02-29");
ok("yıl başı korunur", donusur({ deprem: "2000-01-01" }).deprem === "2000-01-01");
ok("uzak gelecek korunur", donusur({ deprem: "2099-12-31" }).deprem === "2099-12-31");
ok("2000 öncesi tarih sessizce atılır",
   esit(donusur({ deprem: "1999-12-31", ilan: "2026-01-01" }), { ilan: "2026-01-01" }));
ok("geçersiz tarih biçimi atılır",
   esit(donusur({ deprem: "bugün", ilan: "2026-01-01" }), { ilan: "2026-01-01" }));

console.log("\n=== BASE32 ===");
{
  const b = Uint8Array.from([0, 1, 31, 32, 127, 128, 255]);
  ok("baytlar aynen döner", esit([...base32Oku(base32Yaz(b))].slice(0, b.length), [...b]));
  ok("çıktı yalnızca Crockford alfabesinden",
     /^[0-9A-HJKMNP-TV-Z]+$/.test(base32Yaz(b)));
}

console.log("\n=== ALAN SIRASI KİLİTLİ ===");
/* Sıra değişirse eski kodlar yanlış alana çözülür. Bu dizi sözleşmedir. */
ok("maske bit sırası beklenen sırada", esit(ALANLAR,
  ["deprem", "ilan", "eksper", "haksahipligi", "riskliyapi", "dosyakapanis", "ret"]));

console.log(hata ? `\n${hata} sınama başarısız.` : "\nTüm dosya kodu sınamaları geçti.");
process.exit(hata ? 1 : 0);
