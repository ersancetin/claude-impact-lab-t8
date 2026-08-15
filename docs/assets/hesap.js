/* ============================================================
   TAZMİNAT VE TEMİNAT AÇIĞI HESABI

   DOM'a dokunmaz. Yalnızca saf fonksiyon — böylece
   scripts/hesap-kontrol.mjs ile tarayıcısız sınanabilir.
   Bir tazminat formülü, testi olmadan yayına gitmemeli.

   EN KRİTİK AYRIM — DASK'ta oransal indirim YOKTUR:
     Kullanıcının sezgisi şudur: "evim 4 milyon, DASK tavanı 2,27 milyon,
     demek ki hasarın ancak yarısını alırım." YANLIŞ. Azami teminat bir
     TAVANdır (first loss), oransal indirim sebebi değil. 1 milyonluk
     hasarda DASK muafiyet düşülmüş hâliyle 1 milyonu öder.
     Oransal (eksik sigorta / TTK m.1462) kural yalnızca İHTİYARİ
     poliçelere uygulanır. İkisini karıştırmak, kullanıcıya alacağından
     az olduğunu düşündürüp hakkını aramaktan vazgeçirir.

   MUAFİYET — tenzili muafiyet HER ödemeden düşülür; eşik değildir.
     Dayanak: ZDS Genel Şartları (PROJE-LEGAL.md §6.5, çoklu kaynak).
     Muafiyetin tavana göre konumu — min(hasar, bedel) − muafiyet mi,
     min(hasar − muafiyet, bedel) mi — doğrulanmadı. Fark yalnızca
     hasar > sigorta bedeli olduğunda ortaya çıkar. Burada birinci
     okuma uygulanıyor; DOGRULAMA.md A14 maddesi bunu izliyor.
   ============================================================ */

const artı = (n) => Math.max(0, Number.isFinite(n) ? n : 0);

/* Açıklama metinlerinde geçen tutarlar. app.js/paraYaz DOM katmanında
   olduğu için burada kopyası değil, aynı biçimin sade hâli kullanılır —
   bu modülün DOM'a hiç bağlanmaması testlerin ön şartı. */
const para = (n) => Math.round(n).toLocaleString("tr-TR") + " TL";

/* --- DASK sigorta bedeli ---------------------------------- */
/* Poliçedeki bedel biliniyorsa TARİFEDEN ÜSTÜNDÜR: en doğru veri
   kullanıcının elindedir, tarife rekonstrüksiyonu her zaman kırılgandır. */
export function daskBedeli({ m2 = 0, yapiTarzi, policeBedeli = 0 }, param) {
  const birim = param.dask.m2[yapiTarzi] ?? 0;
  const tarifeli = artı(m2) * birim;
  const tavan = param.dask.azamiTeminat;

  if (policeBedeli > 0) {
    return { kaynak: "police", tarifeli, birim, bedel: policeBedeli, tavanda: false };
  }
  return {
    kaynak: "tarife", tarifeli, birim,
    bedel: Math.min(tarifeli, tavan),
    tavanda: tarifeli > tavan,
  };
}

/* --- DASK'ın ödeyeceği tutar ------------------------------ */
export function daskOdemesi({ bedel, hasarTutari }, param) {
  const muafiyet = bedel * param.dask.muafiyetOrani;
  const karsilanan = Math.min(artı(hasarTutari), bedel);
  const odeme = artı(karsilanan - muafiyet);
  return {
    muafiyet,
    karsilanan,
    odeme,
    muafiyetYuku: karsilanan - odeme,          // muafiyet yüzünden sizde kalan
    tavanFazlasi: artı(artı(hasarTutari) - bedel),  // teminat tavanının üstü
  };
}

/* --- Eksik sigorta / oransal tazminat (TTK m.1462) --------- */
/* YALNIZCA ihtiyari poliçelere uygulanır. Poliçe bedeli gerçek değerin
   altındaysa tazminat aynı oranda düşer. */
export function oransalTazminat({ zarar = 0, policeBedeli = 0, gercekDeger = 0 }) {
  if (policeBedeli <= 0) {
    return { oran: 0, tazminat: 0, eksikSigorta: false, acik: artı(zarar) };
  }
  const oran = gercekDeger > 0 ? Math.min(1, policeBedeli / gercekDeger) : 1;
  const tazminat = Math.min(artı(zarar) * oran, policeBedeli);
  return {
    oran,
    tazminat,
    eksikSigorta: oran < 1,
    acik: artı(artı(zarar) - tazminat),
  };
}

/* --- Kalem yardımcısı ------------------------------------- */
/* Her kalem: ne kadar zarar, kim ne kadar ödüyor, ne kadarı açıkta.
   "oder" alanı arayüzde renk ve etiket seçmek için kullanılır. */
const kalem = (ad, zarar, dask, police, aciklama, oder) => ({
  ad, zarar: artı(zarar), dask: artı(dask), police: artı(police),
  acik: artı(artı(zarar) - artı(dask) - artı(police)),
  aciklama, oder,
});

/* --- Malik sonucu ----------------------------------------- */
export function malikSonucu(g, param) {
  const bedelBilgi = daskBedeli(g, param);
  const bedel = bedelBilgi.bedel;
  const odeme = daskOdemesi({ bedel, hasarTutari: g.binaHasari }, param);

  /* Tavanın üstünde kalan bina zararı ihtiyari poliçenin konusudur —
     ve orada eksik sigorta kuralı devreye girer. */
  const binaUstu = oransalTazminat({
    zarar: odeme.tavanFazlasi,
    policeBedeli: g.konutPoliceBedeli,
    gercekDeger: g.binaDeger,
  });

  const esya = oransalTazminat({
    zarar: g.esyaHasari,
    policeBedeli: g.esyaPoliceBedeli,
    gercekDeger: g.esyaDeger,
  });

  const konaklamaIhtiyaci = artı(g.aylikKonaklama) * artı(g.konaklamaAy);
  const konaklama = Math.min(konaklamaIhtiyaci, artı(g.alePoliceLimiti));

  const kalemler = [
    kalem("Bina — teminat içindeki kısım", odeme.karsilanan, odeme.odeme, 0,
      odeme.muafiyetYuku > 0
        ? `Muafiyet düşüldü: ${para(odeme.muafiyetYuku)} sizde kaldı.`
        : "Muafiyet uygulanmadı.",
      "dask"),
    kalem("Bina — teminat tavanının üstü", odeme.tavanFazlasi, 0, binaUstu.tazminat,
      odeme.tavanFazlasi === 0
        ? "Hasarınız teminat tavanının altında kaldı."
        : binaUstu.eksikSigorta
          ? `Poliçe bedeli gerçek değerin altında: tazminat %${Math.round(binaUstu.oran * 100)} oranında ödenir.`
          : "İhtiyari konut poliçesinin konusu.",
      "police"),
    kalem("Ev eşyası", g.esyaHasari, 0, esya.tazminat,
      esya.eksikSigorta
        ? `Eksik sigorta: tazminat %${Math.round(esya.oran * 100)} oranında ödenir.`
        : "DASK hiçbir taşınırı karşılamaz.",
      "police"),
    kalem("Alternatif konaklama", konaklamaIhtiyaci, 0, konaklama,
      "Ev oturulamaz hâle gelirse otel ve geçici kira gideri (ALE teminatı).",
      "police"),
  ];

  /* Tutarı tahmin edilemeyen ama mutlaka söylenmesi gereken kalemler.
     TL ile göstermek uydurma olurdu; kategorik olarak anlatılır. */
  const anlatilan = [
    { ad: "Enkaz kaldırma", not: "DASK karşılamaz. Bazı ihtiyari poliçelerde ek teminattır." },
    { ad: "Ölüm ve yaralanma", not: "Hiçbir konut poliçesinde yoktur. Hayat veya ferdi kaza sigortası gerekir." },
    { ad: "Manevi tazminat, kâr kaybı", not: "Konut sigortasının konusu değildir." },
  ];

  return ozetle({ profil: "malik", bedelBilgi, odeme, kalemler, anlatilan, param });
}

/* --- Kiracı sonucu ---------------------------------------- */
export function kiraciSonucu(g, param) {
  const esya = oransalTazminat({
    zarar: g.esyaHasari,
    policeBedeli: g.esyaPoliceBedeli,
    gercekDeger: g.esyaDeger,
  });
  const konaklamaIhtiyaci = artı(g.aylikKonaklama) * artı(g.konaklamaAy);
  const konaklama = Math.min(konaklamaIhtiyaci, artı(g.alePoliceLimiti));

  const kalemler = [
    kalem("Bina", 0, 0, 0,
      "DASK binaya ve malike bağlıdır. Kiracı DASK yaptıramaz, bina tazminatı "
      + "ev sahibine ödenir. Bu kalem sizin için hiç devrede değildir.",
      "yok"),
    kalem("Ev eşyası", g.esyaHasari, 0, esya.tazminat,
      esya.eksikSigorta
        ? `Eksik sigorta: tazminat %${Math.round(esya.oran * 100)} oranında ödenir.`
        : "Kiracı kendi eşyası için sigorta yaptırabilir — bunu bilen çok az kişi var.",
      "police"),
    kalem("Alternatif konaklama", konaklamaIhtiyaci, 0, konaklama,
      "Kiracı poliçesinin en değerli parçası; yurt dışında standart bir teminattır.",
      "police"),
  ];

  const anlatilan = [
    { ad: "Depozito ve peşin ödenen kira", not: "Sözleşme sona ererse iadesini talep edin (TBK m.331, m.136)." },
    { ad: "Tazminat davası", not: "Mülkiyet şartı yoktur: kiracı da müteahhide, yapı denetime ve idareye dava açabilir." },
    { ad: "Ölüm ve yaralanma", not: "Konut poliçelerinin konusu değildir." },
  ];

  return ozetle({ profil: "kiraci", bedelBilgi: null, odeme: null, kalemler, anlatilan, param });
}

/* --- Ortak özet ------------------------------------------- */
function ozetle({ profil, bedelBilgi, odeme, kalemler, anlatilan, param }) {
  const topla = (a) => kalemler.reduce((t, k) => t + k[a], 0);

  /* EMSAL KALEMLER TOPLAMA GİRMEZ. gecmisUygulamalar.$KRITIK_UYARI:
     bunlar kalıcı hak değil, 2023'e özgü idari kararlardır. Ayrı bir
     alanda tutuluyorlar ki ileride kimse yanlışlıkla toplayamasın. */
  const e = param.emsal || {};
  const emsal = [];
  if (e.kiraYardimiAy) {
    const aylik = profil === "kiraci" ? e.kiraYardimiKiraci : e.kiraYardimiEvSahibi;
    if (aylik) {
      emsal.push({
        ad: "Kira yardımı (2023 uygulaması)",
        tutar: aylik * e.kiraYardimiAy,
        not: `Aylık ${aylik} TL × ${e.kiraYardimiAy} ay. Kalıcı hak değildir.`,
      });
    }
  }
  if (e.tasinmaYardimi) {
    emsal.push({
      ad: "Taşınma yardımı (2023 uygulaması)",
      tutar: e.tasinmaYardimi,
      not: "Bir defalık. Kalıcı hak değildir.",
    });
  }

  return {
    profil,
    bedelBilgi,
    odeme,
    kalemler,
    anlatilan,
    emsal,                       // toplama DAHİL DEĞİL — bilinçli
    toplam: {
      zarar: topla("zarar"),
      dask: topla("dask"),
      police: topla("police"),
      acik: topla("acik"),
    },
    kaynak: {
      azamiTeminatTarihi: param.dask.azamiTeminatTarihi,
      azamiTeminatDogrulama: param.dask.azamiTeminatDogrulama,
      m2Tarihi: param.dask.m2Tarihi,
      m2Dogrulama: param.dask.m2Dogrulama,
      muafiyetDogrulama: param.dask.muafiyetDogrulama,
    },
  };
}

export function hesapla(girdi, param) {
  return girdi.profil === "kiraci"
    ? kiraciSonucu(girdi, param)
    : malikSonucu(girdi, param);
}
