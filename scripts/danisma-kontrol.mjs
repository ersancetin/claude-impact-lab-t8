/* Danışma penceresinin arama isabetini sınar.
 *
 * Neden var: danışma yanlış rehbere yönlendirirse kullanıcı yanlış
 * dilekçeyi yanlış yere gönderir. Bu yüzden beklenen eşleşmeler
 * burada sabitlenir ve her üretimden sonra ölçülür.
 *
 * Kullanım:  node scripts/danisma-kontrol.mjs
 * Çıkış kodu 1 ise beklenen eşleşmeyi tutturamayan soru vardır.
 */
import { ara } from "../docs/assets/danisma.js";

/* [soru, ilk sırada beklenen url parçası] */
const SORULAR = [
  ["DASK hasar ihbarı kaç gün?", "sureler"],
  ["dask ihbar süresi", "sureler"],
  ["Hasar tespitine nasıl itiraz ederim?", "hasar"],
  ["hasar tespit itiraz kaç gün", "sureler"],
  ["Kiracıysam hangi haklarım var?", "haklarim"],
  ["kiraci hakları", "haklarim"],
  ["DASK neyi karşılamaz?", "dask-neyi-karsilar"],
  ["dask eşya karşılıyor mu", "dask"],
  ["Hak sahipliği başvurusu ne zamana kadar?", "sureler"],
  ["dilekçe nasıl yazarım", "dilekce"],
  ["eksper raporuna itiraz", "eksper"],
  ["teminat açığı ne demek", "teminat"],
  ["müteahhide dava zamanaşımı", "sureler"],
  ["verilerim saklanıyor mu", "mahremiyet"],
  ["eksik sigorta nedir", "sigorta"],
  ["neden poliçe gerekli", "police"],
  ["dask yeterli mi", "police"],
  ["kimden para alıyorsunuz", "model"],
  ["alternatif konaklama teminatı", "police"],
];

/* Eşleşme bulunmaması gereken sorular: danışma boş dönmeyi bilmeli.
   "Bilmiyorum" demek, uydurmaktan iyidir. */
const BOS_OLMALI = [
  "pizza tarifi",
  "bugün hava nasıl",      // "bugün" birçok sayfada geçer — tek kelime yetmemeli
  "merhaba nasılsın",
  "bu sayfa çok güzel",
  "futbol maçı sonucu",
];

let hata = 0;

console.log("=== İSABET ===");
for (const [soru, beklenen] of SORULAR) {
  const sonuc = ara(soru);
  const ilk = sonuc[0];
  const url = ilk ? ilk.kayit.url : "—";
  const tamam = ilk && url.includes(beklenen);
  if (!tamam) hata++;
  console.log(
    `  ${tamam ? "OK   " : "HATA "} ${soru.padEnd(42)} → ${url}` +
    (tamam ? "" : `   (beklenen: *${beklenen}*)`));
}

console.log("\n=== BOŞ DÖNMELİ ===");
for (const soru of BOS_OLMALI) {
  const sonuc = ara(soru);
  const bos = sonuc.length === 0;
  if (!bos) hata++;
  console.log(
    `  ${bos ? "OK   " : "HATA "} ${soru.padEnd(42)} → ` +
    (bos ? "eşleşme yok" : sonuc[0].kayit.url));
}

if (hata) {
  console.log(`\n${hata} soru beklenen sonucu vermedi.`);
  process.exit(1);
}
console.log("\nTüm sorular beklenen kaydı ilk sırada döndürdü.");
