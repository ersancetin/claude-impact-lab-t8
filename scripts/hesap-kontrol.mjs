/* Tazminat hesabının altın örnek sınamaları.
 *
 * Neden var: bu hesabın çıktısı kullanıcının "sigortam yeterli mi"
 * kararını belirliyor. Yanlış bir formül, ya gereksiz prim ödetir ya da
 * gerçek bir açığı görünmez kılar. Formüller elle hesaplanmış
 * örneklerle sabitlenir.
 *
 * Kullanım:  node scripts/hesap-kontrol.mjs
 */
import { PARAM } from "../docs/assets/veri-parametre.js";
import {
  daskBedeli, daskOdemesi, oransalTazminat, hesapla,
} from "../docs/assets/hesap.js";

let hata = 0;
const yuvarla = (n) => Math.round(n);

function esit(ad, bulunan, beklenen) {
  const tamam = yuvarla(bulunan) === yuvarla(beklenen);
  if (!tamam) hata++;
  console.log(`  ${tamam ? "OK   " : "HATA "} ${ad.padEnd(52)} ${yuvarla(bulunan)}` +
    (tamam ? "" : `   (beklenen ${yuvarla(beklenen)})`));
}

function dogru(ad, kosul) {
  if (!kosul) hata++;
  console.log(`  ${kosul ? "OK   " : "HATA "} ${ad}`);
}

const TAVAN = PARAM.dask.azamiTeminat;      // 2.271.283
const M2 = PARAM.dask.m2.celik_betonarme_karkas;  // 10.714
const MUAF = PARAM.dask.muafiyetOrani;      // 0,02

console.log("=== SİGORTA BEDELİ ===");
{
  const a = daskBedeli({ m2: 100, yapiTarzi: "celik_betonarme_karkas" }, PARAM);
  esit("100 m² betonarme → tarifeli bedel", a.tarifeli, 100 * M2);
  dogru("tavanın altında, tavana dayanmadı", !a.tavanda);

  const b = daskBedeli({ m2: 400, yapiTarzi: "celik_betonarme_karkas" }, PARAM);
  esit("400 m² → tavanla sınırlanır", b.bedel, TAVAN);
  dogru("tavana dayandı işaretlendi", b.tavanda);

  const c = daskBedeli({ m2: 100, yapiTarzi: "celik_betonarme_karkas",
                         policeBedeli: 1500000 }, PARAM);
  esit("poliçedeki bedel tarifeyi ezer", c.bedel, 1500000);
  dogru("kaynak poliçe olarak işaretlendi", c.kaynak === "police");
}

console.log("\n=== DASK ÖDEMESİ (tenzili muafiyet) ===");
{
  const bedel = 1000000;
  const muafiyet = bedel * MUAF;            // 20.000

  const a = daskOdemesi({ bedel, hasarTutari: 30000 }, PARAM);
  esit("1.000.000 bedel, 30.000 hasar → ödeme", a.odeme, 10000);
  dogru("muafiyet EŞİK değil: 30.000 hasarda 30.000 ödenmiyor", a.odeme !== 30000);

  const b = daskOdemesi({ bedel, hasarTutari: 15000 }, PARAM);
  esit("muafiyetin altındaki hasarda ödeme yok", b.odeme, 0);

  const c = daskOdemesi({ bedel, hasarTutari: 900000 }, PARAM);
  esit("büyük hasarda da muafiyet düşülür", c.odeme, 900000 - muafiyet);

  const d = daskOdemesi({ bedel, hasarTutari: 1500000 }, PARAM);
  esit("tam hasarda azami ödeme = bedel − muafiyet", d.odeme, bedel - muafiyet);
  esit("tavanın üstü DASK dışıdır", d.tavanFazlasi, 500000);
}

console.log("\n=== DASK'TA ORANSAL İNDİRİM YOKTUR ===");
{
  /* Kullanıcının sezgisi: "evim 4.000.000, tavan 2.271.283, demek ki
     hasarın yarısını alırım." Yanlış — tavan first-loss'tur. */
  const bedel = daskBedeli({ m2: 400, yapiTarzi: "celik_betonarme_karkas" }, PARAM).bedel;
  const o = daskOdemesi({ bedel, hasarTutari: 1000000 }, PARAM);
  esit("4M değerli evde 1M hasar → DASK ödemesi", o.odeme, 1000000 - bedel * MUAF);
  dogru("oransal indirim uygulanmadı (1M × tavan/4M değil)",
    yuvarla(o.odeme) !== yuvarla(1000000 * (bedel / 4000000)));
}

console.log("\n=== EKSİK SİGORTA (TTK m.1462) — ihtiyari poliçe ===");
{
  const a = oransalTazminat({ zarar: 400000, policeBedeli: 1000000, gercekDeger: 2000000 });
  esit("2M değer, 1M poliçe, 400k zarar → tazminat", a.tazminat, 200000);
  dogru("eksik sigorta işaretlendi", a.eksikSigorta);
  esit("açıkta kalan", a.acik, 200000);

  const b = oransalTazminat({ zarar: 400000, policeBedeli: 2000000, gercekDeger: 2000000 });
  esit("tam sigortada tazminat tam ödenir", b.tazminat, 400000);
  dogru("eksik sigorta yok", !b.eksikSigorta);

  const c = oransalTazminat({ zarar: 400000, policeBedeli: 3000000, gercekDeger: 2000000 });
  dogru("aşkın sigortada oran 1'i geçmez", c.oran === 1);

  const d = oransalTazminat({ zarar: 400000, policeBedeli: 0, gercekDeger: 2000000 });
  esit("poliçe yoksa tazminat sıfır", d.tazminat, 0);
  esit("poliçe yoksa tamamı açıkta", d.acik, 400000);
}

console.log("\n=== MALİK SENARYOSU (uçtan uca) ===");
{
  const s = hesapla({
    profil: "malik",
    m2: 100, yapiTarzi: "celik_betonarme_karkas",
    binaDeger: 4000000, binaHasari: 4000000,
    esyaDeger: 500000, esyaHasari: 500000, esyaPoliceBedeli: 0,
    konutPoliceBedeli: 0,
    aylikKonaklama: 20000, konaklamaAy: 12, alePoliceLimiti: 0,
  }, PARAM);

  const bedel = Math.min(100 * M2, TAVAN);
  esit("DASK ödemesi", s.toplam.dask, bedel - bedel * MUAF);
  esit("konut poliçesi ödemesi (yok)", s.toplam.police, 0);
  dogru("açık, DASK ödemesinden büyük", s.toplam.acik > s.toplam.dask);
  dogru("emsal kalemler TOPLAMA girmiyor",
    s.toplam.zarar === s.kalemler.reduce((t, k) => t + k.zarar, 0));
  dogru("emsal ayrı alanda duruyor", s.emsal.length > 0);
  dogru("tutarı tahmin edilemeyen kalemler anlatılıyor", s.anlatilan.length >= 3);
}

console.log("\n=== KİRACI SENARYOSU ===");
{
  const s = hesapla({
    profil: "kiraci",
    esyaDeger: 300000, esyaHasari: 300000, esyaPoliceBedeli: 150000,
    aylikKonaklama: 15000, konaklamaAy: 12, alePoliceLimiti: 60000,
  }, PARAM);

  const bina = s.kalemler.find((k) => k.ad === "Bina");
  esit("kiracıda bina zararı sıfır", bina.zarar, 0);
  esit("eşya: 150k poliçe / 300k değer → %50 oran",
    s.kalemler.find((k) => k.ad === "Ev eşyası").police, 150000);
  esit("konaklama poliçe limitiyle sınırlı",
    s.kalemler.find((k) => k.ad === "Alternatif konaklama").police, 60000);
  esit("hiç DASK ödemesi yok", s.toplam.dask, 0);
  dogru("kiracı emsalinde kiracı kira yardımı kullanılıyor",
    s.emsal.some((x) => x.not.includes(String(PARAM.emsal.kiraYardimiKiraci))));
}

console.log("\n=== KENAR DURUMLAR ===");
{
  const bos = hesapla({ profil: "malik" }, PARAM);
  dogru("boş girdi çökmez", Number.isFinite(bos.toplam.zarar));
  esit("boş girdide toplam sıfır", bos.toplam.zarar, 0);

  const negatif = hesapla({
    profil: "malik", m2: -100, binaHasari: -5000, esyaHasari: -1,
    yapiTarzi: "celik_betonarme_karkas",
  }, PARAM);
  dogru("negatif girdi negatif sonuç üretmiyor",
    negatif.toplam.zarar >= 0 && negatif.toplam.acik >= 0);

  const nan = hesapla({
    profil: "malik", m2: NaN, binaHasari: undefined,
    yapiTarzi: "celik_betonarme_karkas",
  }, PARAM);
  dogru("NaN/undefined girdi sayı üretiyor", Number.isFinite(nan.toplam.acik));

  const bilinmeyenYapi = daskBedeli({ m2: 100, yapiTarzi: "uzay_gemisi" }, PARAM);
  esit("bilinmeyen yapı tarzında bedel sıfır", bilinmeyenYapi.tarifeli, 0);
}

if (hata) {
  console.log(`\n${hata} sınama başarısız.`);
  process.exit(1);
}
console.log("\nTüm hesap sınamaları geçti.");
