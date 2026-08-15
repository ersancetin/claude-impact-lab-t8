/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.
   Kaynak: icerik/, kaynak/modul/, data/parametreler.json
   Üreteç: scripts/site-uret.py → bilgi_tabani_yaz()

   Danışma penceresi yalnızca buradaki metinleri gösterir;
   cevap metni tarayıcıda üretilmez. */
export const BILGI = {
 "surum": "0.1.0-taslak",
 "guncelleme": "2026-08-15",
 "oneriler": [
  "DASK hasar ihbarı kaç gün?",
  "Hasar tespitine nasıl itiraz ederim?",
  "Kiracıysam hangi haklarım var?",
  "DASK neyi karşılamaz?",
  "Hak sahipliği başvurusu ne zamana kadar?"
 ],
 "kayitlar": [
  {
   "tur": "arac",
   "turAd": "Araç",
   "baslik": "Süre takvimi",
   "ozet": "Tarihleri girin; hangi hakkınızın kaç günü kaldığını, hangisinin dolduğunu aciliyet sırasına dizilmiş bir takvim olarak görün.",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "süre",
    "gün",
    "takvim",
    "son tarih",
    "hak düşürücü",
    "itiraz süresi",
    "geri sayım"
   ],
   "metin": "Deprem sonrası hak düşürücü sürelerinizi hesaplayın: DASK ihbarı 15 gün, hasar tespitine itiraz 30 gün, hak sahipliği 2 ay. Kayıt gerektirmez."
  },
  {
   "tur": "arac",
   "turAd": "Araç",
   "baslik": "Hak tarama",
   "ozet": "Üç soruya cevap verin; kiracı mı malik mi olduğunuza göre size uyan hakları dayanağıyla listeleyelim.",
   "url": "arac/haklarim.html",
   "dogrulama": "coklu",
   "anahtar": [
    "hak",
    "kiracı",
    "malik",
    "ev sahibi",
    "hangi haklarım",
    "hak sahipliği"
   ],
   "metin": "Kiracı mısınız, malik mi? Üç soruyla durumunuza uyan deprem haklarını kanuni dayanağıyla listeleyin."
  },
  {
   "tur": "arac",
   "turAd": "Araç",
   "baslik": "Dilekçe üretici",
   "ozet": "Sabit şablonu doldurun, çıktıyı alın, nereye ve hangi kanaldan göndereceğinizi öğrenin.",
   "url": "arac/dilekce.html",
   "dogrulama": "coklu",
   "anahtar": [
    "dilekçe",
    "şablon",
    "başvuru",
    "itiraz dilekçesi",
    "yazılı başvuru",
    "nereye göndereceğim"
   ],
   "metin": "Hasar tespitine itiraz, sigortaya yazılı başvuru, eksper raporuna itiraz ve hak sahipliği dilekçesi şablonları. Metin cihazınızda üretilir."
  },
  {
   "tur": "arac",
   "turAd": "Araç",
   "baslik": "Teminat açığı hesabı",
   "ozet": "DASK sigorta bedelini, %2 muafiyeti ve açıkta kalan tutarı hesaplayın; eksik sigorta tuzağını görün.",
   "url": "arac/teminat.html",
   "dogrulama": "coklu",
   "anahtar": [
    "dask",
    "teminat",
    "muafiyet",
    "sigorta bedeli",
    "eksik sigorta",
    "eşya",
    "açık"
   ],
   "metin": "DASK azami teminatı, metrekare birim bedeli, %2 tenzili muafiyet ve teminat açığı hesabı. Kiracı ve malik için ayrı akış."
  },
  {
   "tur": "police",
   "turAd": "Neden poliçe?",
   "baslik": "Neden poliçe?",
   "ozet": "Zorunlu deprem sigortası yalnızca binanın kendisini, o da bir tavana kadar sigortalar. Eşyanız, barınmanız, enkaz kaldırma ve bedeni zararlar teminat dışıdır.",
   "url": "police/index.html",
   "dogrulama": "coklu",
   "anahtar": [
    "neden poliçe",
    "dask yeterli mi",
    "konut sigortası gerekli mi",
    "dört duvar",
    "teminat dışı"
   ],
   "metin": "{{KESIT}} DASK'ı yaptırmak yeterli değil — ama yaptırmamak çok daha kötü İki ayrı yanılgı var ve ikisi de pahalıya mal oluyor. Birincisi: \"DASK'ım var, evim güvende.\" Değil. DASK binayı sigortalar; içindekileri değil. Eviniz tamamen yıkılsa bile mobilyanız, beyaz eşyanız, kıyafetiniz, bilgisayarınız için tek kuruş ödenmez. Enkazın kaldırılması, siz otelde kalırken ödediğiniz para, işinize gidememekten doğan kaybınız da öyle. İkincisi: \"Nasılsa yetmiyor, boş ver.\" Bu daha kötü. DASK, binanın yeniden yapım maliyetinin çok büyük bir kısmını karşılar ve primi ihtiyari poliçelere göre çok düşüktür. Ayrıca DASK'sız bir konut için devlet yardımlarında da sorun yaşanır. :::bilgi Doğru kurgu şudur DASK tabandır , tavan değil. Üstüne ihtiyari konut sigortası (bina fazlası + eşya + alternatif konaklama) eklendiğinde tablo tamamlanır. İkisi rakip değil, üst üste binen iki katmandır. ::: Kiracıysanız tablo tamamen farklı DASK binaya ve malike bağlıdır. Kiracı DASK yaptıramaz, bina tazminatı ev sahibine ödenir. Yani yukarıdaki bina teminatı sizin için hiç devrede değildir. Ama şunu çok az kişi biliyor: kendi eşyanız için sigorta yaptırabilirsiniz. Eşya ve alternatif konaklama teminatı, kiracının poliçesinde de bulunur ve primi düşüktür. Yurt dışında kiracı poliçesi (renters insurance) standart bir üründür; Türkiye'de neredeyse hiç konuşulmaz. Sonra ne yapmalı? Önce kendi açığınızı görün, sonra neye bakacağınızı öğrenin. Bu sayfa size bir şirket önermez — hangi teminatı sormanız gerektiğini"
  },
  {
   "tur": "police",
   "turAd": "Neden poliçe?",
   "baslik": "Hangi teminat neyi karşılar?",
   "ozet": "Teminat bazında karşılaştırma: DASK, ihtiyari konut, eşya, alternatif konaklama ve ferdi kaza. Marka değil, kapsam karşılaştırılır.",
   "url": "police/karsilastirma.html",
   "dogrulama": "coklu",
   "anahtar": [
    "teminat karşılaştırma",
    "hangi sigorta",
    "poliçe seçimi",
    "eşya teminatı",
    "alternatif konaklama",
    "ale",
    "ferdi kaza"
   ],
   "metin": "Bu sayfa marka karşılaştırması yapmaz. Şirket seçmek sizin kararınız; burada öğreneceğiniz şey, poliçe teklifini okurken hangi satırlara bakacağınız. {{TABLO}} Teklif alırken sorulacak altı soru 1. Bina bedeli kaç TL yazıyor? Yeniden yapım maliyetinin altındaysa, tam hasarda bile eksik ödeme alırsınız (eksik sigorta). Piyasa değeri değil, yeniden yapım maliyeti esas alınmalıdır. 2. Eşya teminatı var mı, limiti ne? \"Var\" yeterli değil; limitin eşyanızın gerçek değerini karşılaması gerekir. 3. Alternatif konaklama (ALE) var mı? Ev oturulamaz hâle gelirse otel ve geçici kira giderinizi karşılayan teminat budur. Ayda kaç TL, kaç ay? 4. Enkaz kaldırma dâhil mi? DASK karşılamaz; ihtiyari poliçede ek teminat olarak bulunabilir. 5. Muafiyet oranı kaç? Her ödemeden düşülen paydır. Düşük prim, yüksek muafiyet demek olabilir. 6. Deprem teminatı seçili mi? Özellikle ferdi kaza poliçelerinde deprem, aksi kararlaştırılmadıkça teminat dışıdır. Bu satırı özellikle sorun. :::uyari Eksik sigorta tuzağı Poliçedeki sigorta bedeli gerçek değerin altındaysa, tazminat oranlı ödenir. 2.000.000 TL değerindeki bir bina 1.000.000 TL üzerinden sigortalanmışsa, 400.000 TL'lik hasarda 400.000 TL değil, yaklaşık 200.000 TL ödenir. Prim düşük diye bedeli düşük tutmak, hasar anında yarı yarıya kayıp demektir. Dayanak: TTK m.1462. ::: Örnek poliçe profilleri {{SIRKETLER}} Peki biz ne yapıyoruz? Bu platform hiçbir sigorta şirketine yönlendirme yapmaz ve hiçbir şirketten ödeme almaz. Nedenini ve hedeflediğimiz "
  },
  {
   "tur": "police",
   "turAd": "Neden poliçe?",
   "baslik": "Şeffaflık ve gelir modeli",
   "ozet": "Bugün hiç kimseden hiçbir ödeme alınmıyor. Hedeflenen model, aracılığı lisanslı bir tarafın yaptığı ve gelirin tamamının bağışlandığı bir yapıdır — ama bu model henüz kurulmadı.",
   "url": "police/model.html",
   "dogrulama": "coklu",
   "anahtar": [
    "gelir modeli",
    "bağış",
    "komisyon",
    "şeffaflık",
    "kimden para alıyorsunuz",
    "aracılık"
   ],
   "metin": "Kısa cevap: hiç kimseden, hiçbir ödeme almıyoruz. Reklam yok, sponsor yok, sigorta şirketiyle anlaşma yok, kullanıcıdan ücret yok. :::guvence Bugünkü durum Bu sayfadaki hiçbir şirket adı gerçek değildir. Sitede hiçbir sigorta şirketine giden bağlantı, form veya yönlendirme yoktur. Poliçe almak isteyen kullanıcı, şirketini kendisi seçer ve bizimle hiçbir teması olmaz. ::: Hedeflediğimiz model Amacımız DASK ve konut poliçesi sahipliğini artırmak. Bunu yaparken platformun ayakta kalması için bir kaynağa ihtiyacı var. Kurmak istediğimiz yapı şu: Poliçe aracılığını lisanslı bir sigorta brokeri veya acentesi yapar — biz değil. Bu yönlendirmeden doğan komisyonun tamamı , afet alanında çalışan kurumlara bağışlanır. Girişimin kasasına hiçbir tutar girmez. Bağış tutarları ve alıcıları düzenli olarak bu sayfada yayımlanır. Yani hedef, \"kâr etmeyen aracı\" değil; aracı hiç olmayan, geliri baştan bağışa bağlanmış bir yapı. Neden henüz kurulmadı — dürüst cevap Bu modeli bugün uygulamıyoruz, çünkü uygulanamaz. Nedeni önemli ve gizlemiyoruz: Sigorta sözleşmesine aracılık etmek ruhsata tabidir. 5684 sayılı Sigortacılık Kanunu ve ilgili yönetmelikler uyarınca acentelik ve brokerlik izne bağlıdır. Dahası, dernek ve vakıf gibi kuruluşların bu faaliyeti yürütebilmesi için ayrı bir tüzel kişi acente kurmaları gerekir; bünyelerindeki iktisadi işletme dahi yeterli sayılmaz. Ve en kritik nokta: \"kâr almıyoruz, bağışlıyoruz\" demek bir istisna oluşturmaz. Ruhsat yükümlülüğü faaliyetin niteliğine bağlıdı"
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Konut ve sigorta",
   "ozet": "Zorunlu deprem sigortası, konut sigortası, eksper süreci ve teminat açığı.",
   "url": "bilgi/konut-sigorta.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "DASK neyi karşılar, neyi karşılamaz; eksik sigorta nedir; eksper raporuna nasıl itiraz edilir."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Hasar tespiti ve itiraz",
   "ozet": "Hasar tespit dereceleri, 30 günlük itiraz, riskli yapı tespiti ve yıkım kararı.",
   "url": "bilgi/hasar-tespit.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Hasar derecesi yanlış belirlendiğinde hangi süre içinde, nereye, nasıl itiraz edilir."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Devlet destekleri",
   "ozet": "Hak sahipliği, afet konutu, kira ve taşınma yardımı, AFAD destekleri.",
   "url": "bilgi/devlet-destek.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "7269 sayılı Kanun kapsamındaki kalıcı haklar ile afete özgü geçici destekleri ayırarak anlatır."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Vergi, prim ve borçlar",
   "ozet": "Mücbir sebep, vergi terkini, emlak vergisi, SGK prim ertelemesi, kredi ve kart borçları.",
   "url": "bilgi/mali-yukumluluk.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Afetten sonra hangi mali yükümlülük durur, hangisi ertelenir, hangisi silinebilir."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Çalışma hayatı ve iş yeri",
   "ozet": "İş sözleşmesi, yarım ücret, kısa çalışma ödeneği, esnaf ve KOBİ destekleri.",
   "url": "bilgi/calisma-isyeri.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "İşçi, işveren ve esnafın afet sonrası hak ve yükümlülükleri."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Kira ve mülkiyet",
   "ozet": "Kira sözleşmesinin feshi, kira indirimi, kat mülkiyeti, arsa payı ve yeniden inşa.",
   "url": "bilgi/kira-mulkiyet.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Kiracının ve malikin bina yıkıldıktan sonraki hukuki durumu."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Yakınını kaybedenler",
   "ozet": "Ölüm karinesi, nüfusa tescil, miras, SGK ölüm aylığı, hayat sigortası ve BES.",
   "url": "bilgi/kayip-miras.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Cenazesi bulunamayan yakınlar için nüfus, miras ve sigorta işlemlerinin nasıl yürütüleceği."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Dava ve uyuşmazlık",
   "ozet": "Sigorta Tahkim Komisyonu, müteahhit ve yapı denetim sorumluluğu, idareye karşı tam yargı davası.",
   "url": "bilgi/dava-uyusmazlik.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Hangi uyuşmazlık hangi yola gider, hangi süre işler, hangi adım atlanırsa dosya usulden reddedilir."
  },
  {
   "tur": "konu",
   "turAd": "Konu başlığı",
   "baslik": "Özel durumlar",
   "ozet": "Öğrenciler, askerlik yükümlüleri, kamu personeli ve yabancı uyruklular.",
   "url": "bilgi/ozel-durumlar.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Genel akışın dışında kalan grupların afet sonrası hakları."
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "DASK neyi karşılar, neyi karşılamaz?",
   "ozet": "Zorunlu deprem sigortası yalnızca binayı sigortalar. Ev eşyası, enkaz kaldırma, alternatif konaklama, kira kaybı ve ölüm dâhil tüm bedeni zararlar teminat dışıdır.",
   "url": "rehber/dask-neyi-karsilar.html",
   "dogrulama": "coklu",
   "anahtar": [
    "dask",
    "zorunlu deprem sigortası",
    "kapsam",
    "teminat dışı",
    "eşya",
    "enkaz kaldırma",
    "kira kaybı",
    "alternatif konaklama",
    "bedeni zarar",
    "manevi tazminat",
    "neyi karşılar",
    "neyi karşılamaz"
   ],
   "metin": "Zorunlu deprem sigortası (DASK) Türkiye'de en yaygın bilinen afet sigortasıdır; aynı zamanda en yaygın yanlış bilinen sigortadır. \"DASK'ım var\" cümlesi çoğu kişi için \"zararım karşılanır\" anlamına gelir. Gerçekte DASK dar ve net bir teminattır: binayı sigortalar, insanı ve eşyayı sigortalamaz. DASK neyi karşılar? Teminat, deprem ve depremin doğrudan sonucu olan olayların binada yol açtığı maddi zararları kapsar: Deprem Deprem sonucu yangın Deprem sonucu infilak Tsunami Deprem sonucu yer kayması Bina bakımından teminat; temeller, ana duvarlar, taşıyıcı sistem, tavan ve tabanlar, merdivenler, asansörler, çatı ve bacalar gibi binanın bütünleyici parçalarını kapsar. DASK neyi karşılamaz? Asıl mağduriyet burada doğar. Aşağıdaki kalemler teminat dışıdır: Kalem Durum Ev eşyası (mobilya, beyaz eşya, elektronik) Teminat dışı Enkaz kaldırma masrafları Teminat dışı Alternatif konaklama, geçici barınma gideri Teminat dışı Kira kaybı, iş durması, kâr kaybı Teminat dışı Ölüm dâhil tüm bedeni zararlar Teminat dışı Manevi tazminat talepleri Teminat dışı Deprem dışındaki dolaylı zararlar Teminat dışı :::tehlike En sık yapılan hata \"DASK var, gerisini düşünmem\" varsayımı. DASK ödemesi yapılsa bile eşyanız, barınma gideriniz, kira kaybınız ve bedeni zararlarınız için hiçbir ödeme almazsınız. ::: Hangi binalar kapsam dışıdır? Zorunlu deprem sigortası, tapuya kayıtlı ve özel mülkiyete tabi taşınmazlar üzerindeki meskenler için düzenlenir. Genel şartlarda kapsam dışı bırakılan yapılar arasında şun"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Konut sigortası ve eksik sigorta tuzağı",
   "ozet": "DASK'ın karşılamadığı eşya, konaklama ve kira kaybı ihtiyari konut sigortasıyla kapatılır. Ancak sigorta bedeli gerçek değerin altındaysa, tam hasarda bile eksik ödeme yapılır.",
   "url": "rehber/konut-sigortasi-ve-eksik-sigorta.html",
   "dogrulama": "coklu",
   "anahtar": [
    "konut sigortası",
    "eksik sigorta",
    "ihtiyari sigorta",
    "oransal ödeme",
    "sigorta bedeli",
    "ferdi kaza",
    "eşya teminatı"
   ],
   "metin": "DASK zorunlu ve dar bir teminattır. Onun bıraktığı boşluğu kapatan şey ihtiyari konut sigortasıdır — ama bu poliçenin kendi içinde, ödeme anında ortaya çıkan ve neredeyse hiç anlatılmayan bir tuzağı vardır. Konut sigortası neyi ekler? İhtiyari konut poliçesi, şirkete ve seçilen teminatlara göre değişmekle birlikte tipik olarak şunları kapsayabilir: Teminat DASK'ta Konut sigortasında Bina (azami teminata kadar) Var Var, sınır poliçeye göre Bina değerinin azami teminatı aşan kısmı Yok Var Ev eşyası Yok Var Enkaz kaldırma Yok Genellikle ek teminat Alternatif konaklama / geçici ikamet Yok Genellikle ek teminat Kira kaybı Yok Genellikle ek teminat Cam kırılması, hırsızlık, su baskını Yok Poliçeye göre Eksik sigorta: en pahalı ayrıntı Sigorta hukukunun temel kurallarından biri, poliçedeki sigorta bedelinin malın gerçek sigorta değerinden düşük olması hâlinde uygulanır: sigortacı zararın tamamını değil, bedelin değere olan oranını öder. :::tehlike Sayısal örnek Eşyanızın gerçek değeri 1.000.000 TL, ama poliçedeki eşya bedeli 400.000 TL olsun. Depremde 300.000 TL'lik eşya zararı doğdu. Ödeme: 300.000 × (400.000 / 1.000.000) = 120.000 TL. Hasar poliçe bedelinin altında olmasına rağmen zararın yalnızca %40'ı ödenir. Aradaki 180.000 TL sizde kalır. ::: Bu kural, prim tasarrufu için bedeli düşük tutma alışkanlığını doğrudan cezalandırır. Poliçe yenilenirken bedelin güncel yeniden yapım ve yeniden satın alma maliyetine göre gözden geçirilmesi gerekir; enflasyon ortamında birkaç yıl güncel"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "DASK hasar ihbarı: 15 gün, muafiyet ve 72 saat kuralı",
   "ozet": "Hasarı öğrendiğiniz tarihten itibaren 15 gün içinde ihbar edilmelidir. Ödemeden %2 tenzili muafiyet düşülür; 72 saat içindeki artçılar tek hasar sayılır.",
   "url": "rehber/dask-hasar-ihbari.html",
   "dogrulama": "coklu",
   "anahtar": [
    "dask",
    "hasar ihbarı",
    "ihbar",
    "15 gün",
    "muafiyet",
    "72 saat",
    "alo 125",
    "e-devlet",
    "eksper",
    "tazminat"
   ],
   "metin": "DASK sürecinde ilk ve en kısa süre hasar ihbarıdır. Süre, deprem tarihinden değil, rizikonun gerçekleştiğini öğrendiğiniz tarihten işlemeye başlar. İhbar süresi ve kanallar Genel şartlara göre ihbar, rizikonun gerçekleştiğinin öğrenilmesinden itibaren onbeş gün içinde yapılmalıdır. Başvuru kanalları: ALO DASK 125 e Devlet üzerinden DASK hasar ihbarı adımı Poliçenizi düzenleyen sigorta şirketi Afet bölgelerinde kurulan hasar ihbar noktaları :::uyari İhbar kaydını saklayın Hangi kanaldan ihbar ettiyseniz dosya numarasını, tarihi ve saati not edin. Süreç uzadığında, ihbarın zamanında yapıldığını gösterecek tek şey bu kayıttır. ::: Sonra ne oluyor? 1. Eksper görevlendirilir. Bağımsız sigorta eksperi hasarı yerinde tespit eder. 2. Rapor düzenlenir. Hasarın niteliği ve tutarı belirlenir. 3. Ödeme yapılır. Sigorta bedeli sınırı ve muafiyet düşülerek ödenir. Eksper gelmeden önce yapılacak en değerli iş fotoğraf ve video çekmektir. Enkaz kaldırıldıktan veya onarım yapıldıktan sonra hasarın kanıtlanması pratikte imkânsız hâle gelir. Çatlakları, kolonları, tavan ve zeminleri, tarih bilgisi görünecek şekilde kaydedin. %2 tenzili muafiyet DASK'ta tenzili muafiyet uygulanır: sigorta bedelinin %2'sine karşılık gelen tutar hasardan düşülür ve yalnızca aşan kısım ödenir. Sigorta bedeli Muafiyet (%2) 30.000 TL hasarda ödeme 1.000.000 TL 20.000 TL 10.000 TL 1.500.000 TL 30.000 TL 0 TL 2.000.000 TL 40.000 TL 0 TL Tablodaki ikinci ve üçüncü satır sık karşılaşılan durumdur: küçük hasarlarda hiç öd"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Eksper raporu son söz değildir",
   "ozet": "Eksper raporuna yazılı itiraz edebilir, ikinci eksper atanmasını isteyebilirsiniz. Raporlar çelişirse hakem eksper görevlendirilir; ayrıca kendi masrafınızla bağımsız eksper de tutabilirsiniz.",
   "url": "rehber/eksper-raporuna-itiraz.html",
   "dogrulama": "tek",
   "anahtar": [
    "eksper",
    "eksper raporu",
    "itiraz",
    "ikinci eksper",
    "hakem eksper",
    "bağımsız eksper",
    "rapor"
   ],
   "metin": "Sigorta sürecinde en çok kaçırılan basamak budur: eksper raporu, tazminat tutarını fiilen belirler ama nihai bir karar değildir. Rapora itiraz edilebilir, ikinci eksper istenebilir, raporlar çelişirse hakem eksper devreye girer. Rapor size tebliğ edildiğinde Öncelikle raporu isteyin ve okuyun. Uygulamada birçok kişi yalnızca ödenen tutarı görür, raporu hiç görmez. Oysa itiraz, raporun somut tespitlerine yöneltilmelidir. Raporda kontrol edilecekler: Hasarın niteliği doğru tanımlanmış mı? (taşıyıcı sistem hasarı mı, tamamlayıcı eleman mı) Zarar gören kalemler eksiksiz sayılmış mı? Metrekare, yapı tarzı ve sigorta bedeli doğru mu? Muafiyet doğru oranda düşülmüş mü? Rapora esas fotoğraf ve ölçümler yeterli mi? Üç itiraz yolu 1. Yazılı itiraz ve ikinci eksper talebi Sigorta şirketine yazılı olarak başvurup raporun hangi tespitine neden katılmadığınızı kalem kalem bildirebilir, ikinci bir eksper görevlendirilmesini talep edebilirsiniz. 2. Hakem eksper İki eksper raporu arasında çelişki bulunması hâlinde uyuşmazlığın çözümü için hakem eksper atanması gündeme gelir. 3. Bağımsız eksper Masrafını kendiniz karşılayarak bağımsız bir sigorta eksperi tutabilirsiniz. Bu rapor bağlayıcı değildir, ancak itirazınızı ve olası bir tahkim/dava dosyasını güçlendirir. :::uyari Şimdi fotoğraf çekin İtirazın kaderini belirleyen şey, çoğu zaman hukuki argüman değil kanıttır. Enkaz kaldırıldıktan veya onarım yapıldıktan sonra hasarın kapsamını ispat etmek pratikte imkânsızdır. Her odayı, her çatlağı, k"
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Hakkımızda",
   "ozet": "Deprem Haklarım, afetten sonra vatandaşın sahip olduğu hakları kanuni dayanağıyla ve süresi geçmeden anlatan, kâr amacı gütmeyen bağımsız bir bilgi platformudur.",
   "url": "kurumsal/hakkimizda.html",
   "dogrulama": "resmi",
   "anahtar": [
    "hakkımızda",
    "kimsiniz",
    "platform",
    "kâr amacı gütmeyen",
    "bağımsız"
   ],
   "metin": "Neden bu platform var? Türkiye'de afet sonrası hak kaybının başlıca nedeni bilgisizlik değil, zamanlamadır. Hasar tespit raporuna itiraz için 30 gün, sigorta hasar ihbarı için 15 gün, hak sahipliği başvurusu için iki ay vardır. Bu süreler; enkaz, cenaze, barınma ve ulaşım sorunlarının en yoğun olduğu haftalara denk gelir. Kimse o günlerde \"hangi dilekçeyi kaç gün içinde nereye vermeliyim\" diye araştırmaz. Bu platform tam olarak o boşluğu doldurmak için kuruldu: süreyi görünür kılmak, hakkı dayanağıyla anlatmak ve dilekçeyi hazır hâle getirmek. Üç temel tezimiz 1. Haklar bilinmediği için değil,"
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Yöntemimiz",
   "ozet": "Her rehberin kanuni dayanağı, doğrulama düzeyi ve niteliği (kalıcı hak mı, geçmiş uygulama mı) açıkça gösterilir. Bilmediğimizi bilmediğimizi söyleriz.",
   "url": "kurumsal/yontem.html",
   "dogrulama": "resmi",
   "anahtar": [
    "yöntem",
    "doğrulama",
    "kaynak",
    "kalıcı hak",
    "geçmiş uygulama",
    "nasıl derliyorsunuz"
   ],
   "metin": "En önemli ayrım: kalıcı hak mı, geçmiş uygulama mı? Afet sonrasında kamuoyunda dolaşan bilgilerin büyük kısmı kalıcı mevzuat değil, o afete özgü idari kararlardır. 2023 depremlerinde uygulanan kredi ertelemeleri, KOSGEB destekleri, kira yardımı tutarları ve öğrenci kolaylıkları bunlara örnektir. Bunların yeni bir afette aynen tekrarlanacağının hiçbir garantisi yoktur. Bir platformun yapabileceği en zararlı hata, olmayan bir hakkı varmış gibi anlatmaktır. Bu yüzden her rehber iki etiketten biriyle işaretlenir: Etiket Anlamı Kalıcı mevzuat Kanun, yönetmelik veya genel şarttan doğar; afetten afet"
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Mahremiyet",
   "ozet": "Sunucu yok, hesap yok, analitik yok, çerez yok, dış istek yok. Bu bir politika tercihi değil, mimari bir karardır.",
   "url": "kurumsal/mahremiyet.html",
   "dogrulama": "resmi",
   "anahtar": [
    "mahremiyet",
    "veri",
    "kişisel veri",
    "kvkk",
    "çerez",
    "analitik",
    "saklanıyor mu",
    "gizlilik",
    "sunucu"
   ],
   "metin": "Mimari karar Bu platform statik dosyalardan oluşur. Arka planda çalışan bir uygulama sunucusu veya veritabanı yoktur. Süre takvimine girdiğiniz tarihler, dilekçeye yazdığınız ad, T.C. kimlik numarası ve adres bilgisi yalnızca tarayıcınızın kendi yerel deposunda ( localStorage ) tutulur. Bu, \"verilerinizi korumaya söz veriyoruz\" demek değildir. Verilerinizi teknik olarak alamayacak şekilde kurulmuş olmak demektir. Yaygın uygulama Bizde Kullanıcı hesabı, e posta ile giriş Yok Analitik (Google Analytics vb.) Yok Çerez Yok Dış kaynaklı yazı tipi, betik, görsel Yok — sayfa tek bir dış bağlantı bile"
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Yasal uyarı",
   "ozet": "Buradaki bilgiler genel bilgilendirme amaçlıdır, avukatlık hizmetinin yerine geçmez ve somut olayınıza uygulanabilirliği garanti edilmez.",
   "url": "kurumsal/yasal-uyari.html",
   "dogrulama": "resmi",
   "anahtar": [
    "yasal uyarı",
    "hukuki tavsiye",
    "avukat",
    "sorumluluk",
    "adli yardım"
   ],
   "metin": "Kapsam Bu platformdaki metinler, hesaplamalar ve dilekçe şablonları genel bilgilendirme amaçlıdır. Hiçbiri: somut olayınızın hukuki nitelendirmesi, size özel hazırlanmış hukuki görüş, avukat–müvekkil ilişkisinin kurulması anlamına gelmez. Bir hakkın varlığı, kapsamı ve süresi olayın özelliklerine göre değişir. Avukatlık Kanunu m.35 çerçevesi 1136 sayılı Avukatlık Kanunu m.35 uyarınca hukuki işlerin takibi ve hukuki mütalaa verme yetkisi avukatlara aittir. Platform bu sınırı korumak için şu tasarım kararlarını uygulamıştır: Dilekçe şablonları sabit metinlerdir ; yapay zekâ ile hukuki metin üret"
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Katkı ve iletişim",
   "ozet": "Proje açık kaynaktır. Hata bildirimi, mevzuat doğrulaması ve içerik katkısı en çok ihtiyaç duyulan üç alandır.",
   "url": "kurumsal/katki.html",
   "dogrulama": "resmi",
   "anahtar": [
    "katkı",
    "iletişim",
    "hata bildirimi",
    "açık kaynak",
    "gönüllü"
   ],
   "metin": "En çok neye ihtiyaç var? 1. Mevzuat doğrulaması İçeriklerin önemli bir kısmı henüz çoklu kaynak düzeyindedir: bilgi birden fazla bağımsız kaynakta aynı şekilde geçmektedir, ancak resmî metin doğrudan görülerek teyit edilmemiştir. Hukukçu katkısıyla en hızlı ilerleyecek alan budur. Öncelik sırası, kullanıcının hak kaybına yol açabilecek kalemlerdedir: 1. Hak düşürücü süreler (itiraz süreleri, ihbar süresi, başvuru süresi) 2. Başvuru mercileri 3. Parasal değerler ve güncelleme tarihleri 2. Dilekçe şablonlarının avukat onayı Şablonlar sabit metindir ve yayın öncesi avukat incelemesinden geçirilme"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "DASK hasar ihbarı",
   "ozet": "DASK hasar ihbarı için süre 15 gün.",
   "deger": "15 gün",
   "baslangic": "rizikoyu öğrenme tarihi",
   "dayanak": "ZDS Genel Şartları B.1",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "dask",
    "ihbar",
    "hasar bildirimi",
    "125",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "rizikoyu öğrenme tarihi ZDS Genel Şartları B.1"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Eksper raporuna itiraz",
   "ozet": "Eksper raporuna itiraz için süre 15 gün.",
   "deger": "15 gün",
   "baslangic": "raporun tebliği",
   "dayanak": "sigorta şirketine yazılı itiraz",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "eksper",
    "rapor",
    "itiraz",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "raporun tebliği sigorta şirketine yazılı itiraz"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "DASK hasar dosyasına itiraz",
   "ozet": "DASK hasar dosyasına itiraz için süre 30 gün.",
   "deger": "30 gün",
   "baslangic": "hasar dosyasının kapatılması",
   "dayanak": "DASK Genel Müdürlüğüne yazılı itiraz",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "dask",
    "dosya",
    "itiraz",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "hasar dosyasının kapatılması DASK Genel Müdürlüğüne yazılı itiraz"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Hasar tespitine itiraz",
   "ozet": "Hasar tespitine itiraz için süre 30 gün.",
   "deger": "30 gün",
   "baslangic": "mahallî ilan tarihi",
   "dayanak": "7269 sayılı Kanun",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "hasar tespit",
    "itiraz",
    "ağır hasarlı",
    "orta hasarlı",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "mahallî ilan tarihi 7269 sayılı Kanun"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Hak sahipliği başvurusu",
   "ozet": "Hak sahipliği başvurusu için süre 2 ay.",
   "deger": "2 ay",
   "baslangic": "ilan tarihi",
   "dayanak": "7269 s.K. m.29 — mülkiye amirine yazılı talep ve taahhütname",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "hak sahipliği",
    "afet konutu",
    "başvuru",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "ilan tarihi 7269 s.K. m.29 — mülkiye amirine yazılı talep ve taahhütname"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Hak sahipliği reddine itiraz",
   "ozet": "Hak sahipliği reddine itiraz için süre 15 gün.",
   "deger": "15 gün",
   "baslangic": "tebliğ",
   "dayanak": "Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkında Yönetmelik",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "hak sahipliği",
    "ret",
    "itiraz",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "tebliğ Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkında Yönetmelik"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Riskli yapı tespitine itiraz",
   "ozet": "Riskli yapı tespitine itiraz için süre 15 gün.",
   "deger": "15 gün",
   "baslangic": "tebliğ",
   "dayanak": "6306 Uygulama Yönetmeliği",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "riskli yapı",
    "kentsel dönüşüm",
    "6306",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "tebliğ 6306 Uygulama Yönetmeliği"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "İmar planı askı itirazı",
   "ozet": "İmar planı askı itirazı için süre 30 gün.",
   "deger": "30 gün",
   "baslangic": "askı ilanı",
   "dayanak": "3194 s.K. m.8/b — bir ay",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "imar",
    "askı",
    "plan",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "askı ilanı 3194 s.K. m.8/b — bir ay"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "İdari dava açma",
   "ozet": "İdari dava açma için süre 60 gün.",
   "deger": "60 gün",
   "baslangic": "tebliğ veya zımni ret",
   "dayanak": "2577 s.K.",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "idari dava",
    "dava",
    "mahkeme",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "tebliğ veya zımni ret 2577 s.K."
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "İdareye başvuruda cevap süresi",
   "ozet": "İdareye başvuruda cevap süresi için süre 30 gün.",
   "deger": "30 gün",
   "baslangic": "",
   "dayanak": "2577 s.K. m.10-11",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "zımni ret",
    "idare",
    "cevap",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "2577 s.K. m.10-11 Cevap verilmezse zımni ret sayılır; 60 günlük dava süresi bu sürenin bitiminden işler"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Tam yargı davası ön başvurusu",
   "ozet": "Tam yargı davası ön başvurusu için süre 1 yıl (azami 5 yıl).",
   "deger": "1 yıl (azami 5 yıl)",
   "baslangic": "eylemi öğrenme / eylem tarihi",
   "dayanak": "2577 s.K. m.13",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "tam yargı",
    "tazminat",
    "idare",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "eylemi öğrenme / eylem tarihi 2577 s.K. m.13"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Sigortaya karşı zamanaşımı",
   "ozet": "Sigortaya karşı zamanaşımı için süre 2 yıl (azami 6 yıl).",
   "deger": "2 yıl (azami 6 yıl)",
   "baslangic": "alacağın muaccel olduğu tarih / riziko tarihi",
   "dayanak": "TTK m.1420",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "zamanaşımı",
    "sigorta",
    "tazminat",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "alacağın muaccel olduğu tarih / riziko tarihi TTK m.1420"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Müteahhide karşı zamanaşımı",
   "ozet": "Müteahhide karşı zamanaşımı için süre 5 yıl.",
   "deger": "5 yıl",
   "baslangic": "teslim tarihi",
   "dayanak": "TBK m.474-478",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "müteahhit",
    "zamanaşımı",
    "ayıp",
    "eser",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "teslim tarihi TBK m.474-478 Deprem davalarının neredeyse tamamı 20 yıllık süreye dayanır"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "Ceza davası zamanaşımı",
   "ozet": "Ceza davası zamanaşımı için süre 15 yıl.",
   "deger": "15 yıl",
   "baslangic": "",
   "dayanak": "TCK m.66 — TCK m.85/1 ve 85/2 için",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "ceza",
    "zamanaşımı",
    "taksirle ölüm",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "TCK m.66 — TCK m.85/1 ve 85/2 için Başlangıç anı (inşaatın tamamlanması mı, yıkım mı) doktrinde tartışmalı"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "İşverenin yarım ücret yükümlülüğü",
   "ozet": "İşverenin yarım ücret yükümlülüğü için süre 7 gün.",
   "deger": "7 gün",
   "baslangic": "",
   "dayanak": "4857 s.K. m.40",
   "url": "arac/sureler.html",
   "dogrulama": "coklu",
   "anahtar": [
    "işveren",
    "ücret",
    "iş sözleşmesi",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "4857 s.K. m.40 Zorlayıcı sebeple çalışılamayan bir haftaya kadar süre için yarım ücret"
  },
  {
   "tur": "sure",
   "turAd": "Hak düşürücü süre",
   "baslik": "BES ödemesi",
   "ozet": "BES ödemesi için süre 20 iş günü.",
   "deger": "20 iş günü",
   "baslangic": "lehtar veya mirasçıların talebi",
   "dayanak": "",
   "url": "arac/sureler.html",
   "dogrulama": "tek",
   "anahtar": [
    "bes",
    "emeklilik",
    "birikim",
    "süre",
    "kaç gün",
    "son tarih"
   ],
   "metin": "lehtar veya mirasçıların talebi"
  }
 ]
};
