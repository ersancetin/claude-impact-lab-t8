/* Takvim süresi aritmetiğini sınar.
 *
 * Neden var: 7269 s.K. m.29 "iki ay" der. Bunu 60 gün olarak yazmak,
 * kullanıcıya olmayan bir gün vaat edebilir — hak düşürücü sürede bu
 * doğrudan hak kaybıdır. Aşağıdaki örnekler, ay/yıl hesabının takvime
 * göre yapıldığını ve ay sonu taşmasının kırpıldığını sabitler.
 *
 * Kullanım:  node scripts/sure-kontrol.mjs
 */
import { sureEkle } from "../docs/assets/app.js";

const g = (s) => new Date(s + "T00:00:00");
const y = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const gunFark = (a, b) => Math.round((a - b) / 86400000);

/* [başlangıç, süre, beklenen bitiş, açıklama] */
const ORNEKLER = [
  // --- iki ay: takvime göre 59-62 gün ---
  ["2026-01-01", { ay: 2 }, "2026-03-01", "1 Ocak + 2 ay (Şubat 28 → 59 gün)"],
  ["2024-01-01", { ay: 2 }, "2024-03-01", "artık yıl (Şubat 29 → 60 gün)"],
  ["2026-12-01", { ay: 2 }, "2027-02-01", "yıl sınırını aşan 2 ay (62 gün)"],
  ["2026-06-15", { ay: 2 }, "2026-08-15", "ay ortası"],

  // --- ay sonu taşması: hedef ayda o gün yoksa ayın son günü ---
  ["2026-01-31", { ay: 1 }, "2026-02-28", "31 Ocak + 1 ay → 28 Şubat (3 Mart'a taşmaz)"],
  ["2024-01-31", { ay: 1 }, "2024-02-29", "artık yılda 29 Şubat"],
  ["2026-03-31", { ay: 1 }, "2026-04-30", "31 Mart + 1 ay → 30 Nisan"],
  ["2026-08-31", { ay: 6 }, "2027-02-28", "31 Ağustos + 6 ay → 28 Şubat"],

  // --- gün: eski davranış korunmalı ---
  ["2026-02-06", { gun: 15 }, "2026-02-21", "DASK ihbarı 15 gün"],
  ["2026-02-06", { gun: 30 }, "2026-03-08", "hasar tespitine itiraz 30 gün"],

  // --- yıl ---
  ["2026-02-06", { yil: 2 }, "2028-02-06", "sigorta zamanaşımı 2 yıl"],
  ["2024-02-29", { yil: 1 }, "2025-02-28", "29 Şubat + 1 yıl → 28 Şubat"],
];

let hata = 0;

console.log("=== TAKVİM SÜRESİ ===");
for (const [bas, sure, beklenen, ad] of ORNEKLER) {
  const bulunan = y(sureEkle(g(bas), sure));
  const tamam = bulunan === beklenen;
  if (!tamam) hata++;
  console.log(
    `  ${tamam ? "OK   " : "HATA "} ${bas} + ${JSON.stringify(sure).padEnd(12)} = ${bulunan}` +
    (tamam ? `   ${ad}` : `   BEKLENEN ${beklenen} — ${ad}`));
}

/* Asıl mesele: "iki ay" sabit 60 gün DEĞİLDİR. */
console.log("\n=== 'İKİ AY' SABİT 60 GÜN DEĞİLDİR ===");
const uzunluklar = new Set();
for (let ay = 0; ay < 12; ay++) {
  const bas = new Date(2026, ay, 1);
  uzunluklar.add(gunFark(sureEkle(bas, { ay: 2 }), bas));
}
const dizi = [...uzunluklar].sort((a, b) => a - b);
console.log(`  2026 boyunca "2 ay" = ${dizi.join(", ")} gün`);
if (dizi.length === 1) {
  console.log("  HATA  tek bir uzunluk çıktı — takvim aritmetiği çalışmıyor.");
  hata++;
} else if (dizi.includes(60) && dizi.some((d) => d < 60)) {
  console.log("  OK    60 günden kısa dönemler var; sabit 60 yazmak hak kaybettirirdi.");
} else {
  console.log("  OK    birden fazla uzunluk üretiliyor.");
}

if (hata) {
  console.log(`\n${hata} örnek beklenen sonucu vermedi.`);
  process.exit(1);
}
console.log("\nTüm süre örnekleri beklendiği gibi.");
