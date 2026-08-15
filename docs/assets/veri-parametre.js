/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.
   Kaynak: data/parametreler.json (kanonik)
   Üreteç: scripts/veri-uret.py

   Süre birimleri güne ÇEVRİLMEZ: 'iki ay' {ay: 2} olarak durur,
   takvim aritmetiğini app.js → sureEkle() yapar.
   dogrulama='celiskili' değerler PARAM.celiskiler'e düşer ve
   hiçbir hesaba girmez.

   UYARI: Değerlerin hiçbiri henüz resmî kaynaktan doğrulanmadı.
   Doğrulama planı: DOGRULAMA.md
 */
export const PARAM = {
  "surum": "0.1.0-taslak",
  "guncelleme": "2026-08-15",
  "dask": {
    "azamiTeminat": 2271283,
    "azamiTeminatTarihi": "2026-05-01",
    "azamiTeminatDogrulama": "tek",
    "tarifeSerisi": [
      {
        "tarih": "2024-01-01",
        "deger": 1272000,
        "dogrulama": "coklu"
      },
      {
        "tarih": "2025-01-01",
        "deger": 1704162,
        "dogrulama": "coklu"
      },
      {
        "tarih": "2026-01-01",
        "deger": 2095462,
        "dogrulama": "tek"
      },
      {
        "tarih": "2026-05-01",
        "deger": 2271283,
        "dogrulama": "tek"
      }
    ],
    "m2": {
      "celik_betonarme_karkas": 10714,
      "diger": 7142
    },
    "m2Tarihi": "2026-05-01",
    "m2Dogrulama": "tek",
    "muafiyetOrani": 0.02,
    "muafiyetDogrulama": "coklu",
    "muafiyetAciklama": "Sigorta bedelinin %2'si oranında tenzili muafiyet. DASK, hasarın muafiyeti aşan kısmından sorumludur; muafiyet her ödemeden düşülür.",
    "hasarPenceresiSaat": 72,
    "hasarPenceresiDogrulama": "coklu"
  },
  "sureler": [
    {
      "id": "dask-ihbar",
      "ad": "DASK hasar ihbarı",
      "baslangicEtiket": "Depremi öğrendiğiniz tarih",
      "baslangicAnahtar": "deprem",
      "neYapmali": "ALO DASK 125, e-Devlet veya poliçenizi düzenleyen sigorta şirketi.",
      "sablon": null,
      "gun": 15,
      "dayanak": "ZDS Genel Şartları B.1",
      "dogrulama": "tek"
    },
    {
      "id": "eksper-itiraz",
      "ad": "Eksper raporuna itiraz",
      "baslangicEtiket": "Eksper raporunun size tebliğ tarihi",
      "baslangicAnahtar": "eksper",
      "neYapmali": "Poliçeyi düzenleyen sigorta şirketine yazılı başvuru.",
      "sablon": "eksper-itiraz",
      "gun": 15,
      "dayanak": "sigorta şirketine yazılı itiraz",
      "dogrulama": "tek"
    },
    {
      "id": "dask-dosya-itiraz",
      "ad": "DASK hasar dosyasına itiraz",
      "baslangicEtiket": "Hasar dosyanızın kapatıldığı tarih",
      "baslangicAnahtar": "dosyakapanis",
      "neYapmali": "DASK Genel Müdürlüğüne yazılı itiraz.",
      "sablon": null,
      "gun": 30,
      "dayanak": "DASK Genel Müdürlüğüne yazılı itiraz",
      "dogrulama": "tek"
    },
    {
      "id": "hasar-itiraz",
      "ad": "Hasar tespit raporuna itiraz",
      "baslangicEtiket": "Hasar tespit sonucunun ilan tarihi",
      "baslangicAnahtar": "ilan",
      "neYapmali": "İl Çevre ve Şehircilik Müdürlüğü, valilik veya kaymakamlık.",
      "sablon": "hasar-itiraz",
      "gun": 30,
      "dayanak": "7269 sayılı Kanun",
      "dogrulama": "coklu",
      "kritik": true
    },
    {
      "id": "hak-sahipligi",
      "ad": "Hak sahipliği başvurusu",
      "baslangicEtiket": "Hak sahipliği ilan tarihi",
      "baslangicAnahtar": "haksahipligi",
      "neYapmali": "Mahallin en büyük mülkî amirine yazılı talep ve taahhütname.",
      "sablon": "hak-sahipligi",
      "ay": 2,
      "dayanak": "7269 s.K. m.29 — mülkiye amirine yazılı talep ve taahhütname",
      "dogrulama": "coklu",
      "kritik": true
    },
    {
      "id": "riskli-yapi-itiraz",
      "ad": "Riskli yapı tespitine itiraz",
      "baslangicEtiket": "Riskli yapı tespitinin tebliğ tarihi",
      "baslangicAnahtar": "riskliyapi",
      "neYapmali": "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı / İl Müdürlüğü.",
      "sablon": null,
      "gun": 15,
      "dayanak": "6306 Uygulama Yönetmeliği",
      "dogrulama": "coklu"
    },
    {
      "id": "idari-dava",
      "ad": "İdari dava açma süresi",
      "baslangicEtiket": "Ret kararının tebliğ tarihi",
      "baslangicAnahtar": "ret",
      "neYapmali": "İdare mahkemesi. Avukata danışın.",
      "sablon": null,
      "gun": 60,
      "dayanak": "2577 s.K.",
      "dogrulama": "coklu"
    },
    {
      "id": "sigorta-zamanasimi",
      "ad": "Sigorta tazminatı zamanaşımı",
      "baslangicEtiket": "Depremi öğrendiğiniz tarih",
      "baslangicAnahtar": "deprem",
      "neYapmali": "Önce sigortacıya yazılı başvuru (dava şartı), sonra Tahkim veya mahkeme.",
      "sablon": "sigorta-basvuru",
      "yil": 2,
      "dayanak": "TTK m.1420",
      "dogrulama": "coklu",
      "kritik": true,
      "azamiYil": 6
    }
  ],
  "emsal": {
    "$uyari": "BUNLAR KALICI HAK DEGILDIR. 2023 depremine ozgu idari kararlardir. Platformda 'hakkiniz' olarak degil, 'gecmis afette uygulanan emsal' olarak sunulmalidir. Aksi halde kullaniciya var olmayan bir hak vaat edilmis olur.",
    "kiraYardimiEvSahibi": 5000,
    "kiraYardimiKiraci": 3000,
    "kiraYardimiAy": 12,
    "tasinmaYardimi": 15000,
    "dogrulama": "tek"
  },
  "tahkim": {
    "gecerlilikTarihi": "2026-01-22",
    "kesinlikSiniri": null,
    "itirazSiniri": 35000,
    "ucKisilikHeyetSiniri": 122000,
    "temyizSiniri": null,
    "itirazSuresiGun": 10
  },
  "celiskiler": [
    {
      "alan": "dask.azamiTeminat.gecmis",
      "deger": 2407723,
      "not": "Hangi doneme ait oldugu belirsiz"
    },
    {
      "alan": "sigortaTahkim.kesinlikSiniri",
      "deger": 35000,
      "not": "Bir kaynak 28.000 TL diyor"
    },
    {
      "alan": "sigortaTahkim.temyizSiniri",
      "deger": 383000,
      "not": "Bir kaynak 300.000 TL diyor"
    }
  ]
};
