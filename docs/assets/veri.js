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

const imza = (v) => `\nSaygılarımla arz ederim.\n\nTarih   : ${v.tarih || "…/…/20…"}\nAd Soyad: ${v.adSoyad}\nT.C. No : ${v.tc}\nAdres   : ${(v.adres || "").replace(/\n/g, " ")}\nTelefon : ${v.telefon}\nİmza    :\n`;

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
    govde: (v) => `${(v.sirket || "").toUpperCase()} SİGORTA A.Ş. GENEL MÜDÜRLÜĞÜNE

Konu : Sigorta tazminatı talebi ve 5684 sayılı Kanun m.30 uyarınca yazılı başvuru

Yukarıda bilgileri yer alan şirketiniz nezdinde, ${v.police} numaralı poliçe ile sigortalı bulunan taşınmazım hakkında aşağıdaki hususları bilgilerinize sunarım.

1. Sigortalı taşınmaz:
${v.tasinmaz}

2. Riziko tarihi: ${v.olayTarihi}
${v.hasarNo ? `3. Hasar dosya numarası: ${v.hasarNo}\n` : ""}
${v.hasarNo ? "4" : "3"}. Talebim:
${v.talep}

Bu başvuru, 5684 sayılı Sigortacılık Kanunu'nun 30 uncu maddesi uyarınca, Sigorta Tahkim Komisyonuna başvuru ve dava yoluna gitmeden önce yapılması gereken yazılı başvuru niteliğindedir.

Başvurumun değerlendirilerek tarafıma yazılı olarak cevap verilmesini, tazminatın yasal faiziyle birlikte ödenmesini talep ederim.
${imza(v)}
EKLER:
- Poliçe örneği
- Hasar fotoğrafları
- Varsa eksper raporu
- Tapu / kira sözleşmesi örneği`
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
    govde: (v) => `${v.il.toUpperCase()} VALİLİĞİNE
(İl Çevre, Şehircilik ve İklim Değişikliği Müdürlüğüne iletilmek üzere)

Konu : Hasar tespit raporuna itiraz

Aşağıda bilgileri yer alan taşınmaz hakkında düzenlenen hasar tespit raporuna, ilan tarihinden itibaren yasal süresi içinde itiraz ediyorum.

1. Taşınmazın adresi:
${v.binaAdres}
İl / İlçe : ${v.il} / ${v.ilce}
${v.ada ? `Ada / Parsel : ${v.ada}\n` : ""}
2. Taşınmaz ile ilişkim: ${v.sifat}

3. Raporda belirlenen hasar derecesi: ${v.mevcutDerece}

4. İlan tarihi: ${v.ilanTarihi}

5. İtiraz gerekçelerim:
${v.gerekce}

Yukarıda açıkladığım nedenlerle, taşınmaz hakkında yeniden hasar tespiti yapılmasını ve hasar derecesinin yeniden değerlendirilmesini talep ederim.
${imza(v)}
EKLER:
- Tapu veya kira sözleşmesi örneği
- Binaya ait fotoğraflar
- Varsa teknik rapor`
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
    govde: (v) => `${v.il.toUpperCase()} VALİLİĞİNE
${v.ilce ? `(${v.ilce} Kaymakamlığı aracılığıyla)` : ""}

Konu : 7269 sayılı Kanun kapsamında hak sahipliği talebi ve taahhüt

Meydana gelen deprem nedeniyle aşağıda bilgileri yer alan taşınmazım hasar görmüştür. 7269 sayılı Kanun ve ilgili yönetmelik hükümleri uyarınca hak sahibi olarak kabul edilmemi talep ederim.

1. Taşınmazın adresi:
${v.binaAdres}
İl / İlçe : ${v.il} / ${v.ilce}
${v.ada ? `Ada / Parsel : ${v.ada}\n` : ""}
2. Kesinleşen hasar derecesi: ${v.derece}

3. Talebim: ${v.talepTuru}

4. Zorunlu deprem sigortası durumu: ${v.daskVar}

TAAHHÜT

7269 sayılı Kanun ile ilgili yönetmeliklerde öngörülen yükümlülükleri kabul ettiğimi, borçlandırma esaslarına uyacağımı, verdiğim bilgilerin doğru olduğunu ve gerçeğe aykırı beyanda bulunmam hâlinde doğacak hukuki sonuçlara katlanacağımı kabul ve taahhüt ederim.
${imza(v)}
EKLER:
- Tapu örneği
- Nüfus kayıt örneği
- Kesinleşmiş hasar tespit belgesi
- Varsa zorunlu deprem sigortası poliçesi`
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
    govde: (v) => `${(v.sirket || "").toUpperCase()} SİGORTA A.Ş.
HASAR BİRİMİNE

Konu : Eksper raporuna itiraz${v.ikinciEksper === "Evet" ? " ve ikinci eksper atanması talebi" : ""}

${v.police} numaralı poliçe${v.hasarNo ? ` ve ${v.hasarNo} numaralı hasar dosyası` : ""} kapsamında düzenlenen ve tarafıma ${v.raporTarihi} tarihinde tebliğ edilen eksper raporuna, yasal süresi içinde itiraz ediyorum.

İtiraz gerekçelerim:
${v.gerekce}
${v.ikinciEksper === "Evet" ? "\nBu nedenlerle, dosyada ikinci bir eksper görevlendirilmesini talep ediyorum. Düzenlenecek raporlar arasında çelişki bulunması hâlinde hakem eksper atanmasını da ayrıca talep ederim.\n" : ""}
İtirazımın değerlendirilerek tarafıma yazılı olarak cevap verilmesini talep ederim.
${imza(v)}
EKLER:
- Hasar fotoğrafları
- Varsa bağımsız teknik rapor
- Poliçe örneği`
  }
];
