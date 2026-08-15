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
   "metin": "Kiracı mısınız, malik mi? Üç soruyla durumunuza uyan deprem haklarını kanuni dayanağı, süresi ve başvuru yeriyle birlikte listeleyin."
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
   "baslik": "Dosya kodu",
   "ozet": "Süre ve hak bilgilerinizi tek bir koda çevirin; kodu başka bir cihaza yazarak dosyanızı orada açın. Sunucu yok, kayıt yok.",
   "url": "arac/dosya.html",
   "dogrulama": "coklu",
   "anahtar": [
    "dosya kodu",
    "hasar dosyası sorgula",
    "dosya sorgula",
    "takip kodu",
    "kaydımı aç",
    "başka cihazda aç"
   ],
   "metin": "Deprem hasar dosyanızın tarihlerini ve durumunuzu taşıyan kod üretin veya elinizdeki kodu sorgulayın. Kod verinin kendisini taşır; hiçbir kayıt tutulmaz."
  },
  {
   "tur": "arac",
   "turAd": "Araç",
   "baslik": "Teminat açığı ve tazminat hesabı",
   "ozet": "DASK sigorta bedelini, %2 tenzili muafiyeti ve açıkta kalan tutarı hesaplayın; hasar tutarı girerseniz kalem kalem kimin ne ödeyeceğini görün.",
   "url": "arac/teminat.html",
   "dogrulama": "coklu",
   "anahtar": [
    "dask",
    "teminat",
    "muafiyet",
    "sigorta bedeli",
    "eksik sigorta",
    "eşya",
    "açık",
    "tazminat",
    "ne kadar öder",
    "hasar"
   ],
   "metin": "DASK azami teminatı, metrekare birim bedeli, tenzili muafiyet, eksik sigorta (TTK m.1462) ve teminat açığı hesabı. Kiracı ve malik için ayrı akış."
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
   "metin": "{{KESIT}} DASK'ı yaptırmak yeterli değil — ama yaptırmamak çok daha kötü İki ayrı yanılgı var ve ikisi de pahalıya mal oluyor. Birincisi: \"DASK'ım var, evim güvende.\" Değil. DASK binayı sigortalar; içindekileri değil. Eviniz tamamen yıkılsa bile mobilyanız, beyaz eşyanız, kıyafetiniz, bilgisayarınız için tek kuruş ödenmez. Enkazın kaldırılması, siz otelde kalırken ödediğiniz para, işinize gidememekten doğan kaybınız da öyle. İkincisi: \"Nasılsa yetmiyor, boş ver.\" Bu daha kötü. DASK, binanın yeniden yapım maliyetinin çok büyük bir kısmını karşılar ve primi ihtiyari poliçelere göre çok düşüktür. Ayrıca DASK'sız bir konut için devlet yardımlarında da sorun yaşanır. :::bilgi Doğru kurgu şudur DASK tabandır , tavan değil. Üstüne ihtiyari konut sigortası (bina fazlası + eşya + alternatif konaklama) eklendiğinde tablo tamamlanır. İkisi rakip değil, üst üste binen iki katmandır. ::: Kiracıysanız tablo tamamen farklı DASK binaya ve malike bağlıdır. Kiracı DASK yaptıramaz, bina tazminatı ev sahibine ödenir. Yani yukarıdaki bina teminatı sizin için hiç devrede değildir. Ama şunu çok az kişi biliyor: kendi eşyanız için sigorta yaptırabilirsiniz. Eşya ve alternatif konaklama teminatı, kiracının poliçesinde de bulunur ve primi düşüktür. Yurt dışında kiracı poliçesi (renters insurance) standart bir üründür; Türkiye'de neredeyse hiç konuşulmaz. Sonra ne yapmalı? Üç adım, sırayla: 1. Açığınızı görün. Teminat açığı hesabı kaç liranın sizde kaldığını kalem kalem çıkarır. 2. Neye bakacağınızı öğ"
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
   "metin": "Bu sayfa marka karşılaştırması yapmaz. Şirket seçmek sizin kararınız; burada öğreneceğiniz şey, poliçe teklifini okurken hangi satırlara bakacağınız. {{TABLO}} Teklif alırken sorulacak altı soru 1. Bina bedeli kaç TL yazıyor? Yeniden yapım maliyetinin altındaysa, tam hasarda bile eksik ödeme alırsınız (eksik sigorta). Piyasa değeri değil, yeniden yapım maliyeti esas alınmalıdır. 2. Eşya teminatı var mı, limiti ne? \"Var\" yeterli değil; limitin eşyanızın gerçek değerini karşılaması gerekir. 3. Alternatif konaklama (ALE) var mı? Ev oturulamaz hâle gelirse otel ve geçici kira giderinizi karşılayan teminat budur. Ayda kaç TL, kaç ay? 4. Enkaz kaldırma dâhil mi? DASK karşılamaz; ihtiyari poliçede ek teminat olarak bulunabilir. 5. Muafiyet oranı kaç? Her ödemeden düşülen paydır. Düşük prim, yüksek muafiyet demek olabilir. 6. Deprem teminatı seçili mi? Özellikle ferdi kaza poliçelerinde deprem, aksi kararlaştırılmadıkça teminat dışıdır. Bu satırı özellikle sorun. :::uyari Eksik sigorta tuzağı Poliçedeki sigorta bedeli gerçek değerin altındaysa, tazminat oranlı ödenir. 2.000.000 TL değerindeki bir bina 1.000.000 TL üzerinden sigortalanmışsa, 400.000 TL'lik hasarda 400.000 TL değil, yaklaşık 200.000 TL ödenir. Prim düşük diye bedeli düşük tutmak, hasar anında yarı yarıya kayıp demektir. Dayanak: TTK m.1462. ::: Örnek poliçe profilleri {{SIRKETLER}} :::guvence Teklif isterken yalnız kalmayın Teminat açığı hesabı kendi rakamlarınızla doldurulmuş bir teklif talebi metni üretir: hangi temi"
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
   "metin": "Kısa cevap: hiç kimseden, hiçbir ödeme almıyoruz. Reklam yok, sponsor yok, sigorta şirketiyle anlaşma yok, kullanıcıdan ücret yok. Bugünkü durum :::guvence Bu sayfadaki hiçbir şirket adı gerçek değildir. Sitede hiçbir sigorta şirketine giden bağlantı, form veya yönlendirme yoktur. Poliçe almak isteyen kullanıcı, şirketini kendisi seçer ve bizimle hiçbir teması olmaz. Teminat açığı hesabının sonunda üretilen teklif talebi metni de bir yönlendirme değildir: metin sizin cihazınızda oluşur, size verilir ve kime göndereceğinize siz karar verirsiniz. Biz kimin teklif verdiğini bilmeyiz. ::: Hedeflediğimiz model Amacımız DASK ve konut poliçesi sahipliğini artırmak. Bunu yaparken platformun ayakta kalması için bir kaynağa ihtiyacı var. Kurmak istediğimiz yapı şu: Poliçe aracılığını lisanslı bir sigorta brokeri veya acentesi yapar — biz değil. Bu yönlendirmeden doğan komisyonun tamamı , afet alanında çalışan kurumlara bağışlanır. Girişimin kasasına hiçbir tutar girmez. Bağış tutarları ve alıcıları düzenli olarak bu sayfada yayımlanır. Yani hedef, \"kâr etmeyen aracı\" değil; aracı hiç olmayan, geliri baştan bağışa bağlanmış bir yapı. Neden henüz kurulmadı — dürüst cevap Bu modeli bugün uygulamıyoruz, çünkü uygulanamaz. Nedeni önemli ve gizlemiyoruz: Sigorta sözleşmesine aracılık etmek ruhsata tabidir. 5684 sayılı Sigortacılık Kanunu ve ilgili yönetmelikler uyarınca acentelik ve brokerlik izne bağlıdır. Dahası, dernek ve vakıf gibi kuruluşların bu faaliyeti yürütebilmesi için ayrı bir tü"
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
   "baslik": "Deprem öncesi yapı güvenliği",
   "ozet": "Riskli yapı tespiti, kentsel dönüşüm, imar barışı ve bina yaşının hukuki anlamı.",
   "url": "bilgi/yapi-guvenligi.html",
   "dogrulama": "coklu",
   "anahtar": [],
   "metin": "Deprem olmadan önce kullanılabilecek haklar: riskli yapı tespiti nasıl istenir, yapı kayıt belgesi neyi değiştirir, binanın hangi yönetmelikle yapıldığı sorumlulukta ne anlama gelir."
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
   "baslik": "Cenaze bulunamadıysa ölüm nüfusa nasıl işlenir? Ölüm karinesi, gaiplik ve miras",
   "ozet": "Enkazda kaybolan kişi, cesedi bulunamasa bile ölmüş sayılabilir. Bu, mahkeme kararı gerektirmez ve mirası hemen açar. Gaiplikten farkı budur.",
   "url": "rehber/olum-karinesi-ve-miras.html",
   "dogrulama": "coklu",
   "anahtar": [
    "ölüm karinesi",
    "gaiplik kararı",
    "deprem miras",
    "cenaze bulunamayan ölüm kaydı",
    "BES lehtar sorgulama",
    "SGK ölüm aylığı"
   ],
   "metin": "Depremin en ağır sonuçlarından biri, kaybedilen kişinin cenazesine ulaşılamamasıdır. Yasın yanına bir de belirsizlik eklenir: nüfus kaydı kapanmaz, miras açılmaz, sigorta ödemesi yapılmaz, banka hesabına erişilemez, maaş bağlanmaz. Oysa Türk hukukunda bu durumun karşılığı vardır ve neredeyse hiç bilinmez. Ölüm karinesi: cenaze şart değil :::vurgulu \"Bir kimse, ölümüne kesin gözle bakılmayı gerektiren durumlar içinde kaybolursa, cesedi bulunamamış olsa bile gerçekten ölmüş sayılır .\" ::: :dayanak TMK m.31 Yıkılan bir binanın altında kalıp cesedine ulaşılamayan kişi, bu hükmün tipik uygulama alanıdır. Burada mahkemeye gitmek gerekmez. Nüfusa nasıl işlenir? Müracaat edilen yerin mülkî idare amirinin emriyle ölüm tutanağı düzenlenir ve ölüm olayı nüfus kütüğüne işlenir. Başvuruyu altsoy, üstsoy ve kardeşler yapabilir; bunlar yoksa mirasçılar başvurabilir. :dayanak 5490 sayılı Nüfus Hizmetleri Kanunu m.32 1. Kaymakamlık veya valiliğe (mülkî idare amirliğine) başvurun. 2. Kaybolan kişinin kimlik bilgilerini, olayın tarih ve yerini, binanın adresini bildirin. 3. Elinizdeki her kanıtı ekleyin: enkazda arama kayıtları, tanık beyanları, son görüşme bilgileri, telefon konum kayıtları, hastane ve AFAD kayıtları. 4. Ölüm tutanağı düzenlendikten sonra nüfus kaydı kapanır ve miras hemen açılır. Gaiplikten farkı: en pratik bilgi :tablo Ölüm karinesi ile gaiplik karşılaştırması Ölüm karinesi Gaiplik Karar mercii Mülkî idare amiri (idari) Sulh hukuk mahkemesi Süre şartı Yok Var, kanuni süreler"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "DASK neyi karşılar, neyi karşılamaz?",
   "ozet": "DASK binanızı sigortalar, hayatınızı değil. Ev eşyası, enkaz kaldırma, alternatif konaklama, kira kaybı ve ölüm dâhil bedeni zararlar kapsam dışıdır.",
   "url": "rehber/dask-neyi-karsilar.html",
   "dogrulama": "coklu",
   "anahtar": [
    "DASK neleri karşılamaz",
    "DASK eşya karşılıyor mu",
    "DASK teminat dışı",
    "enkaz kaldırma sigorta",
    "DASK kapsamı",
    "zorunlu deprem sigortası kapsam"
   ],
   "metin": "Türkiye'de en yaygın sigorta yanılgısı tek cümleyle özetlenebilir: \"DASK'ım var, ben güvendeyim.\" Zorunlu deprem sigortası önemli bir korumadır ama kapsamı, çoğu kişinin sandığından çok daha dardır. :::vurgulu DASK binanızı sigortalar, hayatınızı değil. Eşyanız, canınız, kiranız ve enkaz masrafınız DASK kapsamında değildir. ::: DASK neyi karşılar? Sigorta, depremin doğrudan neden olduğu maddi zararlar ile deprem nedeniyle ortaya çıkan yangın, infilak, dev dalga (tsunami) ve yer kayması sonucu binada meydana gelen maddi zararları teminat altına alır. :dayanak Zorunlu Deprem Sigortası Genel Şartları A.1 Teminat kapsamındaki bina unsurları: temeller, ana duvarlar, bağımsız bölümleri ayıran ortak duvarlar, tavan ve tabanlar, merdivenler, asansörler, sahanlıklar, koridorlar, çatılar, bacalar ve yapının benzer nitelikteki tamamlayıcı kısımları. Ödeme, konutun piyasa değeri üzerinden yapılmaz: sigorta bedeli yapı tarzına ve brüt yüzölçümüne göre hesaplanır, arsa değeri teminata dâhil değildir ve tutar hiçbir hâlde azami teminatı aşamaz (01.05.2026 tarifesine göre 2.271.283 TL). Hesabın ayrıntısı: DASK'ım yeterli mi? DASK neleri karşılamaz? Tam liste :::tehlike Enkaz kaldırma masrafları Kâr kaybı, iş durması, kira mahrumiyeti Alternatif ikametgâh ve iş yeri masrafları Mali sorumluluklar ve benzeri dolaylı zararlar Her türlü taşınır mal, eşya ve benzerleri — mobilya, beyaz eşya, elektronik: hiçbiri kapsamda değildir Ölüm dâhil olmak üzere tüm bedeni zararlar Manevi tazminat talepleri "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Deprem işi durdurunca: yarım ücret, haklı fesih ve kısa çalışma",
   "ozet": "Deprem zorlayıcı sebeptir. İş bir haftadan fazla durursa hem işçinin hem işverenin derhal fesih hakkı doğar; duran bir haftaya kadarki süre için işveren yarım ücret öder.",
   "url": "rehber/isci-ve-isyeri-haklari.html",
   "dogrulama": "coklu",
   "anahtar": [
    "deprem iş sözleşmesi",
    "yarım ücret",
    "zorlayıcı sebep",
    "haklı nedenle fesih",
    "kısa çalışma ödeneği",
    "iş yeri hasarı",
    "esnaf destekleri",
    "SGK prim ertelemesi"
   ],
   "metin": "Deprem sonrasında en sessiz kayıp iş ilişkisinde yaşanıyor: iş yeri kapanıyor, ücret ödenmiyor, kimse kimseye ne yapacağını söylemiyor. Oysa İş Kanunu bu durumu adıyla tanımlar. Deprem, zorlayıcı sebeptir ve zorlayıcı sebebin sonuçları kanunda yazılıdır. Belirleyici eşik tek bir sayıdır: bir hafta. Bir haftaya kadar: yarım ücret Zorlayıcı sebeplerle iş yerinde çalışılamayan bir haftaya kadar olan süre için işveren işçiye yarım ücret öder. Bu, işverenin lütfu değil kanuni yükümlülüğüdür ve işçi çalışmasa da doğar. :dayanak 4857 sayılı İş Kanunu m.40 Ulaşımın kesilmesi, iş yerinin hasar görmesi, bölgeye giriş çıkışın kısıtlanması gibi hâller zorlayıcı sebep sayılabilir. Önemli olan, işin durmasının işçiden ve işverenden kaynaklanmayan bir nedene dayanmasıdır. Bir haftadan sonra: iki taraf da feshedebilir Bir haftalık süre dolduğunda tablo değişir. Aynı olay hem işçiye hem işverene derhal fesih hakkı verir: :tablo Zorlayıcı sebepte fesih hakkı Kim Hangi durumda Dayanak İşçi İşyerinde bir haftadan fazla süre işin durmasını gerektiren zorlayıcı sebep m.24/III İşveren İşçiyi bir haftadan fazla süreyle çalışmaktan alıkoyan zorlayıcı sebep m.25/III :::uyari İstifa ile haklı fesih aynı şey değildir Deprem sonrasında en sık yapılan hata, işten ayrılırken \"istifa ediyorum\" yazmaktır. İstifa, kıdem tazminatı bakımından farklı sonuç doğurur. Haklı nedene dayanıyorsanız dilekçenizde sebebini açıkça yazın: işin ne zamandan beri durduğunu, iş yerinin durumunu ve hangi maddeye dayandığınızı b"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Deprem sonrası vergi: mücbir sebep, terkin ve yıkılan binanın emlak vergisi",
   "ozet": "Deprem mücbir sebep hâlidir ve süreler işlemez. Yıkılan bina için emlak vergisi mükellefiyeti ise çoğu zaman bildirime bağlı olarak sona erer.",
   "url": "rehber/deprem-vergi-ve-emlak-vergisi.html",
   "dogrulama": "coklu",
   "anahtar": [
    "deprem mücbir sebep",
    "deprem vergi affı",
    "yıkılan bina emlak vergisi",
    "VUK 13 mücbir sebep",
    "vergi terkini",
    "deprem borç erteleme"
   ],
   "metin": "Deprem sonrasında en son akla gelen konu vergidir; oysa burada hem kaçırılan haklar hem de gereksiz yere ödenen tutarlar vardır. Üç başlık bilinmeli: mücbir sebep, terkin ve emlak vergisi mükellefiyeti. 1. Mücbir sebep: süreler işlemez Yangın, yer sarsıntısı (deprem) ve su basması gibi afetler, vergi ödevlerinin yerine getirilmesine engel olan mücbir sebep hâlleri arasında sayılmıştır. Mücbir sebep süresince süreler işlemez . :dayanak VUK m.13 · m.15 Uygulamada Hazine ve Maliye Bakanlığı, afet bölgeleri için mücbir sebep hâli ilan eder ve bu ilanla beyanname verme, bildirim ve ödeme süreleri durur. 2023 depremlerinin ardından on bir il için deprem tarihinden itibaren mücbir sebep hâli ilan edilmiştir. :::uyari Mücbir sebep ilanı kendiliğinden süresiz değildir; kapsamı ve bitiş tarihi idari kararla belirlenir. Kendi durumunuz için güncel ilanı vergi dairesinden veya Gelir İdaresi Başkanlığı duyurularından teyit edin. ::: 2. Terkin: borcun silinmesi Yangın, yer sarsıntısı, yer kayması, su basması, kuraklık gibi afetler yüzünden varlıklarının veya mahsullerinin en az üçte birini kaybedenlerin , afete uğrayan gelir kaynaklarıyla ilgili kamu borçları Cumhurbaşkanı kararıyla kısmen veya tamamen terkin edilebilir. :dayanak VUK m.115 Terkin kendiliğinden uygulanmaz; kapsam ve koşullar ilgili karara bağlıdır. Zararınızı belgeleyen her şeyi (hasar tespit raporu, fotoğraflar, sigorta dosyası, iş yeri kayıtları) saklayın. 3. Emlak vergisi: en çok para kaybettiren üç kural Mükellefiyetin "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Depremden sonra ilk 30 gün: hangi hakkın süresi ne zaman doluyor?",
   "ozet": "Deprem sonrasında kaybedilen hakların çoğu bilinmediği için değil, süresi kaçtığı için kaybediliyor. İşte gün gün yapılması gerekenler.",
   "url": "rehber/deprem-sonrasi-ilk-30-gun.html",
   "dogrulama": "coklu",
   "anahtar": [
    "deprem sonrası yapılacaklar",
    "deprem hakları",
    "hasar tespiti itiraz süresi",
    "DASK hasar ihbarı",
    "hak sahipliği başvurusu",
    "deprem hukuku süreleri"
   ],
   "metin": "6 Şubat 2023 sonrasında en sık duyulan cümlelerden biri şuydu: \"Bilmiyordum, süresi geçmiş.\" Deprem sonrasında kaybedilen hakların çoğu, hakkın varlığı bilinmediği için değil, süresi kaçtığı için kaybediliyor. Üstelik bu süreler, insanın enkaz, cenaze ve barınma sorunuyla uğraştığı ilk haftalarda işliyor. Bu yazı, deprem sonrasındaki ilk otuz günü bir kontrol listesine çeviriyor. Her başlıkta süre, başvuru yeri ve dayandığı düzenleme var. İlk 72 saat: kanıt üretme zamanı Hukuki süreçlerin tamamı, sonradan üretilemeyen bir şeye dayanır: hasarın o anki hâlinin kanıtı. Enkaz kaldırıldıktan, bina yıkıldıktan veya onarım yapıldıktan sonra bu kanıt bir daha elde edilemez. Fotoğraf ve video çekin. Binanın dışı, giriş cephesi, kolonlar, taşıyıcı duvarlar, çatlaklar, zemin kat. Mümkünse tarih bilgisi görünecek şekilde. Eşya hasarını da belgeleyin. DASK eşyayı karşılamaz ama müteahhide veya idareye açacağınız tazminat davasında eşya zararınızı siz ispatlarsınız. Belgelerinizi toplayın. Tapu ya da kira sözleşmesi, DASK poliçesi, varsa yapı ruhsatı ve iskân belgesi. Kimin neyi söylediğini yazın. Hangi görevli, hangi tarihte ne dedi; hangi başvuruyu nereye yaptınız. :::uyari Sık yapılan hata Hasarlı binaya girip fotoğraf çekmeye çalışmak hayati risk taşır. \"Yıkık\" ve \"acil yıktırılacak\" olarak işaretlenmiş yapılara kısa süreliğine dahi girmek yasaktır. Eşya alma kuralları ayrı bir yazının konusu. ::: İlk 15 gün: DASK hasar ihbarı Zorunlu deprem sigortanız varsa, hasarı sigortacıya bildirm"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Genel akışın dışında kalanlar: öğrenci, asker, memur ve yabancı uyruklular",
   "ozet": "Afet sistemi malik-kiracı ekseni üzerine kuruludur. Öğrenciler, askerlik yükümlüleri, kamu personeli ve geçici koruma altındakiler bu eksenin dışında kalır; hakları çoğunlukla emsal uygulamalardan okunur.",
   "url": "rehber/ogrenci-asker-memur-ve-yabanci-uyruklular.html",
   "dogrulama": "tek",
   "anahtar": [
    "deprem öğrenci hakları",
    "KYK kredi burs",
    "askerlik sevk tehiri",
    "kamu personeli deprem izni",
    "geçici koruma deprem",
    "yabancı uyruklu deprem hakları"
   ],
   "metin": "Afet sonrası toparlanma sistemi tek bir eksende kuruludur: kim malik, kim kiracı. Bu eksenin dışında kalan gruplar — üniversite öğrencisi, askerlik yükümlüsü, kamu personeli, geçici koruma altındaki kişiler — kendilerine ne olacağını çoğu zaman hiçbir yerde yazılı bulamaz. Bu sayfa, o boşluğu dürüstçe anlatır. Buradaki başlıkların çoğu kalıcı mevzuattan değil, geçmiş afette uygulanmış idari kararlardan okunur. Aradaki fark, hakkınız olan ile umut ettiğiniz şey arasındaki farktır. :::tehlike Bu sayfadaki bilgilerin niteliği. Aşağıdaki başlıkların büyük kısmı 2023 depremlerine özgü uygulamalardır. Yeni bir afette aynı kararların aynı kapsamda tekrarlanacağının garantisi yoktur. Bu yüzden hiçbirini \"hakkınız\" diye sunmuyoruz; \"böyle uygulanmıştı, bugün için kurumun güncel duyurusunu doğrulayın\" diyoruz. ::: Öğrenciler 2023 uygulamasında öne çıkan üç başlık şuydu: KYK kredisinin bursa dönüştürülmesi — depremde yakınını kaybeden ya da konutu veya iş yeri hasar gören öğrenciler için uygulanmıştır. Yurtlarda öncelik — ek şart aranmaksızın yerleştirme yapılmıştır. Psikososyal destek programları — üniversiteler ve kurumlar eliyle yürütülmüştür. Bugün için yapılması gereken, üniversitenizin ve KYK'nın o afete ilişkin duyurusunu yazılı olarak teyit etmek ve başvuruyu süresi içinde yapmaktır. Hasar tespit belgesi, öğrencinin kendisine değil konutun malikine verildiği için, ailenizden belge örneği istemeniz gerekebilir. Askerlik yükümlüleri Sevk tehiri, kanunla kendiliğinden doğan bir hak"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Hak sahipliği başvurusu: iki aylık süre, taahhütname ve faizsiz borçlandırma",
   "ozet": "Binası yıkılan veya ağır hasarlı malikler devletten konut ya da faizsiz kredi isteyebilir. Başvuru süresi ilan tarihinden itibaren iki aydır.",
   "url": "rehber/hak-sahipligi-basvurusu.html",
   "dogrulama": "coklu",
   "anahtar": [
    "hak sahipliği başvurusu",
    "afet konutu",
    "7269 hak sahipliği",
    "faizsiz afet kredisi",
    "hak sahipliği itiraz",
    "deprem konut yardımı"
   ],
   "metin": "Hasar tespiti kesinleştikten sonraki en önemli başvuru budur. Binası yıkılan veya ağır hasarlı olan malikler, devletten konut ya da faizsiz kredi talep edebilir. Süresi kısa, şekli özeldir ve kaçırılması hâlinde telafisi çok zordur. Süre, mercii ve şekil :tablo Hak sahipliği başvurusunun esasları Konu Bilgi Başvuru süresi İlanın yapıldığı günden itibaren iki ay Başvuru mercii Mahallin en büyük mülkî amiri (valilik / kaymakamlık) Başvuru şekli Yazılı talep ve taahhütname Ret hâlinde Tebliğden itibaren 15 gün içinde itiraz Cevap verilmezse 30 gün sonunda zımni ret; 60 günlük dava süresi işler :dayanak 7269 sayılı Kanun m.29 · 2577 sayılı Kanun m.10 11 Taahhütname neden zorunlu? Hak sahipliği başvurusu yalnızca bir talep değildir; aynı zamanda yükümlülük üstlenmedir . Taahhütnamede kişi, kanun ve yönetmeliklerde öngörülen yükümlülükleri kabul ettiğini, borçlandırma esaslarına uyacağını ve verdiği bilgilerin doğru olduğunu beyan eder. :::uyari Gerçeğe aykırı beyan, hem hak sahipliğinin iptaline hem de hukuki ve cezai sonuçlara yol açabilir. Taahhütnameyi imzalamadan önce içeriğini okuyun; anlamadığınız bir kısım varsa barosunun adli yardım birimine sorun. ::: Gerekli belgeler Tapu örneği (mülkiyet ilişkisini gösteren belge) Nüfus kayıt örneği Kesinleşmiş hasar tespit belgesi Varsa zorunlu deprem sigortası poliçesi Kimlik ve iletişim bilgileri, tebligata elverişli adres Dilekçenizi hazır şablondan oluşturabilirsiniz; şablon sabit metindir, yalnızca girdiğiniz bilgiler yerleştirili"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Kiracının deprem hakları: tazminat davası için tapu sahibi olmanız gerekmez",
   "ozet": "DASK malike öder, hak sahipliği tapu arar, afet konutu malike verilir. Ama tazminat davasında mülkiyet şartı yoktur — kiracının en güçlü hakkı budur.",
   "url": "rehber/kiraci-deprem-haklari.html",
   "dogrulama": "coklu",
   "anahtar": [
    "kiracı deprem hakları",
    "kiracı tazminat davası",
    "kiracı eşya sigortası",
    "kiracı kira yardımı",
    "depozito iadesi deprem",
    "kiracı DASK yaptırabilir mi"
   ],
   "metin": "Afet toparlanma sistemi Türkiye'de mülkiyet üzerine kuruludur . Bu bir uygulama hatası değil, mevzuatın tercihidir: :tablo Mekanizmaların ölçütü ve kiracının durumu Mekanizma Ölçüt Kiracı DASK Bina sigortalanır, tazminat malike ödenir Kapsam dışı Hak sahipliği (7269) Yıkılan binayla mülkiyet ilişkisi Kapsam dışı Afet konutu / faizsiz kredi Hak sahipliğine bağlı Kapsam dışı Yeniden inşa, arsa payı Malik hakkı Kapsam dışı Kentsel dönüşüm oylaması Arsa payı = oy ağırlığı Oy yok, sonucuna katlanır Sonuç şudur: malik en azından binası için sigortalı ve devlet konutu kuyruğundadır. Kiracı ise hiçbir kuyrukta değildir. Elinde kalan, mülkiyet şartı aramayan hukuk yollarıdır — ve bu yollar sanıldığından güçlüdür. En güçlü hak: tazminat davasında mülkiyet şartı yoktur :::vurgulu Hak sahipliği \"mülkiyet ilişkisi\" arar. Haksız fiil tazminatı aramaz. Kiracı da kendi zararı için dava açabilir. ::: Kiracının dava açabileceği taraflar: Müteahhide karşı — binanın ayıplı yapımı nedeniyle uğradığı eşya zararı, bedeni zararı ve yakınının ölümü için. Yapı denetim kuruluşuna karşı — denetim görevinin gereği gibi yerine getirilmemesinden doğan zararlar için. İdareye karşı — ruhsat, iskân ve denetim kusurlarına dayalı tam yargı davası. Kiraya verene karşı — kiralananın ayıplı olması hükümleri çerçevesinde. Ayrıca ceza yargılamasında katılan sıfatı alınabilir. 2023 depremlerine ilişkin ceza davalarında ölenlerin bir kısmı kiracıydı; ceza yargılaması malik–kiracı ayrımı yapmaz, tazminat davası da yapm"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Riskli yapı tespiti nasıl yaptırılır? Komşularınızın onayı gerekmiyor",
   "ozet": "Riskli yapı tespiti için diğer maliklerin onayı gerekmez. Tek bir kat maliki, masrafı kendisine ait olmak üzere tüm binanın tespitini yaptırabilir.",
   "url": "rehber/riskli-yapi-tespiti.html",
   "dogrulama": "coklu",
   "anahtar": [
    "riskli yapı tespiti",
    "tek malik risk tespiti",
    "riskli yapı itiraz 15 gün",
    "6306 sayılı kanun",
    "bina risk tespiti nasıl yapılır",
    "kentsel dönüşüm başvurusu"
   ],
   "metin": "Deprem sonrası haklarını anlatan çok kaynak var; deprem olmadan önce ne yapılabileceğini anlatan neredeyse yok. Oysa en değerli hak tam da burada: binanızın riskli olup olmadığını öğrenme hakkı. En az bilinen kural: tek malik yeterli :::vurgulu Riskli yapı tespiti, malik veya kanuni temsilcisi tarafından, masrafı kendisine ait olmak üzere Bakanlıkça lisanslandırılan kuruluşlara yaptırılır ve sonuç Bakanlığa veya İdareye bildirilir. Diğer maliklerin onayı gerekmez. ::: :dayanak 6306 sayılı Kanun m.3/1 Bu, komşularını ikna edemeyen bir daire sahibinin elindeki en güçlü araçtır ve neredeyse hiç bilinmez. Apartman toplantısında çoğunluk sağlanamadığı için yıllarca bekleyen binalar, aslında tek bir malikin başvurusuyla değerlendirilebilir. Tespit nasıl yaptırılır? 1. Lisanslı kuruluş bulun. Bakanlıkça lisanslandırılmış kuruluşların listesi Çevre, Şehircilik ve İklim Değişikliği Bakanlığı ile il müdürlüklerinden öğrenilebilir. 2. Belgeleri hazırlayın. Tapu, kimlik, binaya ilişkin varsa proje ve ruhsat belgeleri. 3. İnceleme yapılır. Binadan beton numuneleri (karot) alınır, donatı taraması yapılır, taşıyıcı sistem değerlendirilir. 4. Rapor Bakanlığa/İdareye bildirilir ve sonuç maliklere tebliğ edilir. :::uyari Masraf: Tespit masrafı başvuran malike aittir; sonradan hisseleri oranında maliklere dağıtıldığı belirtilmektedir. Tutarı binanın büyüklüğüne ve numune sayısına göre değişir; başvurmadan önce birden fazla kuruluştan fiyat alın. ::: Sonuca itiraz: 15 gün Riskli yapı tespitine, "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Sigortayla uyuşmazlık: önce yazılı başvuru, sonra Tahkim mi mahkeme mi?",
   "ozet": "Sigorta şirketine yazılı başvuru yapmadan Tahkim'e veya mahkemeye gidilemez; bu bir dava şartıdır. Yol seçimi ise geri dönüşsüzdür.",
   "url": "rehber/sigorta-uyusmazligi-tahkim-mahkeme.html",
   "dogrulama": "coklu",
   "anahtar": [
    "sigorta tahkim komisyonu",
    "sigortaya yazılı başvuru",
    "dava şartı sigorta",
    "DASK dava",
    "sigorta hakem kararı itiraz",
    "sigorta uyuşmazlığı"
   ],
   "metin": "Sigorta uyuşmazlığında en pahalı hata, haklı olduğunuz hâlde yanlış kapıya gitmektir . İki kural bilinmezse dosya daha başlamadan kaybedilir: yazılı başvurunun dava şartı olması ve yol seçiminin geri dönüşsüz olması. 1. Zorunlu ilk adım: sigorta şirketine yazılı başvuru :::tehlike Sigorta Tahkim Komisyonuna veya mahkemeye gitmeden önce sigorta kuruluşuna yazılı başvuru yapılması zorunludur ve bu bir dava şartıdır. Doğrudan gidilirse başvuru/dava usulden reddedilir. ::: :dayanak 5684 sayılı Sigortacılık Kanunu m.30 Yazılı başvuruda bulunması gerekenler: Poliçe numarası, varsa hasar dosya numarası Sigortalı taşınmazın açık adresi ve riziko (deprem) tarihi Talebiniz: ödeme yapılmadı / yapılan ödeme eksik / dosya sonuçlandırılmadı Yazılı cevap istediğinizin açıkça belirtilmesi Gönderim kanalı da önemlidir. En güvenli yol, tebliğ kaydı oluşturan kanallardır: şirketin KEP adresi , noter kanalıyla ihtarname, iadeli taahhütlü posta veya genel müdürlüğe elden imza karşılığı teslim. Hazır şablon: sigorta şirketine yazılı başvuru dilekçesi. 2. Sigorta Tahkim Komisyonu Komisyon, 5684 sayılı Kanun m.30 uyarınca Türkiye Sigorta ve Reasürans Şirketleri Birliği nezdinde kurulmuştur. Başvurular önce raportörlerce incelenir; çözülemeyen dosyalar bağımsız sigorta hakemlerine iletilir. Mahkemeye kıyasla daha hızlı ve düşük maliyetli . Zorunlu sigortalarda (DASK, trafik) sigorta şirketinin Komisyona üye olması şartı aranmadığı belirtilmektedir — yani DASK uyuşmazlıkları her hâlde Komisyona taşına"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Afet konutu bedava değildir: borçlandırma koşullarını başvurmadan önce bilin",
   "ozet": "Hak sahipliği kabul edilen kişiye verilen konut karşılıksız değildir. Geri ödeme en az 20 yıl, faizsiz ve eşit taksitlidir; ilk taksit teslimden iki yıl sonra başlar.",
   "url": "rehber/afet-konutu-ve-borclandirma.html",
   "dogrulama": "tek",
   "anahtar": [
    "afet konutu",
    "borçlandırma",
    "hak sahipliği",
    "faizsiz kredi",
    "7269",
    "TOKİ deprem konutu",
    "geri ödeme"
   ],
   "metin": "Hak sahipliği kabul edildiğinde çoğu kişinin duyduğu cümle şudur: \"Devlet ev veriyor.\" Bu cümle eksiktir ve eksikliği pahalıya mal olur. Afet konutu karşılıksız bir bağış değil, borçlandırma karşılığı yapılan bir tahsistir. Koşullar kötü değildir — faizsiz ve uzun vadelidir — ama bir borçtur; başvurmadan önce sayıları bilmek gerekir. Borçlandırmanın üç kuralı :tablo Afet konutu borçlandırma koşulları Konu Kural Vade En az 20, en çok 30 yıl; eşit taksitler Faiz Faizsiz olduğu belirtilmektedir İlk taksit Teslimden 2 yıl sonra başlar :dayanak 7269 sayılı Umumi Hayata Müessir Afetler Kanunu \"Evini Yapana Yardım\" yöntemiyle kendi konutunu yapanlarda ve orta hasarlı konut/iş yeri onarımlarında ilk taksitin, son kredi taksitinin ödenmesinden iki yıl sonra başladığı belirtilmektedir. Neden başvurmadan önce hesaplamak gerekir? Borçlandırma tutarı konutun maliyetine göre belirlenir ve tapu üzerinde bir yük doğurur. Bu, üç kararı doğrudan etkiler: 1. Konutu kabul etmek mi, tazminat yolunu sürdürmek mi? İkisi birbirini dışlamaz ama dosyanızı etkiler; müteahhide veya idareye açılacak davada elde edilen kazanımlar ayrıca değerlendirilir. 2. Mirasçılar ne olacak? Borç, konutla birlikte devredilir. Ortak mülkiyet varsa ödeme yükünün nasıl paylaşılacağı önceden konuşulmalıdır. 3. Satış ve devir sınırlıdır. Tahsis edilen konutlar üzerinde belirli bir süre tasarruf kısıtı uygulanabildiği için, \"alıp satarım\" planı çoğu zaman yürümez. :::uyari Taahhütname okumadan imzalanmaz Başvuru, yazılı tale"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Evim hasarlı: kira ödemeye devam edecek miyim? Fesih, indirim ve depozito",
   "ozet": "Ağır hasar kira ilişkisini çekilmez kılan önemli sebep sayılabilir. Bina tamamen yıkıldıysa ifa imkânsızlığı gündeme gelir.",
   "url": "rehber/kira-sozlesmesi-deprem.html",
   "dogrulama": "coklu",
   "anahtar": [
    "deprem kira sözleşmesi fesih",
    "hasarlı evde kira indirimi",
    "deprem depozito iadesi",
    "TBK 331 önemli sebep",
    "kira ödeme borcu deprem",
    "ağır hasarlı ev kira"
   ],
   "metin": "Deprem sonrasında kiracıların en somut ve en acil sorusu şudur: \"Oturamadığım ev için kira ödemeye devam edecek miyim?\" Cevap binanın durumuna göre değişir ve üç ayrı hukuki kurum devreye girer. Üç durum, üç farklı sonuç :tablo Binanın durumuna göre kira ilişkisi Durum Hukuki kurum Sonuç Bina tamamen yıkıldı İfa imkânsızlığı (TBK m.136) Sözleşme kendiliğinden sona erer Ağır hasarlı, oturulamaz Önemli sebeple olağanüstü fesih (TBK m.331) Fesih bildirimiyle sona erdirilebilir Hasarlı ama kullanılabilir Ayıp hükümleri (TBK m.305 vd.) Kira indirimi, onarım talebi, koşulları varsa fesih Önemli sebeple fesih Taraflardan biri için kira ilişkisinin sürdürülmesini çekilmez hâle getiren önemli sebeplerin varlığında, yasal fesih bildirim süresine uyulmak koşuluyla sözleşme her zaman feshedilebilir. Deprem gibi doğal afetler ve ağır hasarlı bina , kiracı bakımından önemli sebep oluşturabilir. Feshin parasal sonuçlarını hâkim, durumun özelliğine göre takdir eder. :dayanak TBK m.331 Fesih bildirimini yazılı yapın ve tebliğ kaydı oluşturan bir kanal kullanın: noter ihtarnamesi, iadeli taahhütlü posta veya imza karşılığı elden teslim. Kira borcu ne zamana kadar devam eder? :::uyari Kira ödeme borcunun, taşınmazın kiraya verene fiilen iade edildiği tarihe kadar devam ettiği kabul edilir. Bu yüzden anahtar teslimini mutlaka belgeleyin: tutanak, yazılı bildirim veya noter kanalı. ::: Binaya girilemeyen, mühürlenmiş veya yıkım kararı verilmiş durumlarda fiilî iade tartışmalı hâle gelebilir. Bu g"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Hasar tespit raporuna itiraz nasıl yapılır? 30 günlük süre ve dilekçe",
   "ozet": "Binanızın hasar derecesi yanlış belirlendiyse itiraz süresi ilan tarihinden itibaren 30 gün. Kaçarsa idari itiraz hakkı tümüyle biter.",
   "url": "rehber/hasar-tespitine-itiraz.html",
   "dogrulama": "coklu",
   "anahtar": [
    "hasar tespit itiraz",
    "hasar tespit raporuna itiraz dilekçesi",
    "ağır hasarlı itiraz",
    "orta hasarlı itiraz",
    "hasar tespit süresi 30 gün",
    "hasar tespiti nasıl öğrenilir e-devlet"
   ],
   "metin": "Deprem sonrasında devletin yaptığı hasar tespiti, binanız için verilmiş teknik bir not değildir — bir dizi hakkın anahtarıdır . Hasar dereceniz; binanın yıkılıp yıkılmayacağını, hak sahibi olup olamayacağınızı, alacağınız desteği ve eşyanızı alıp alamayacağınızı belirler. Bu yüzden yanlış belirlenmiş bir hasar derecesi, tek başına yıllar süren bir kayba dönüşebilir. İyi haber şu: itiraz hakkı var. Kötü haber: süresi 30 gün ve bu süre, insanın barınma derdiyle uğraştığı haftalarda işliyor. Hasar dereceleri ne anlama geliyor? :tablo Hasar dereceleri ve sonuçları Derece Pratik sonucu Hasarsız Kullanıma devam; destek yok Az hasarlı Onarımla kullanılabilir Orta hasarlı Güçlendirme/onarım gerekir; bazı desteklerde farklı rejim Ağır hasarlı Yıkım gündemde; hak sahipliği yolu açılır Yıkık Bina fiilen yok; girmek yasak Ağır hasarlı ile orta hasarlı arasındaki fark, çoğu ailenin hayatını belirleyen çizgidir. Aynı şekilde \"az hasarlı\" verilmiş ama taşıyıcı sisteminde sorun olan bir bina, sonraki depremde çok daha tehlikelidir. İtiraz süresi: 30 gün, ilan tarihinden itibaren Fen kurullarınca düzenlenen teknik hasar tespit raporlarına, sonucun mahallî ilan tarihinden itibaren 30 gün içinde itiraz edilebilir. Raporlar aynı süreyle askıda/ilanda kalır. :::tehlike Kritik Süre, raporun size posta ile ulaştığı gün değil, mahallinde ilan edildiği gün başlar. \"Bana tebliğ edilmedi\" savunması pratikte çoğu zaman işe yaramaz. İlan tarihini öğrenip not alın. ::: Hasar tespit sonucunuzu e Devlet üze"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Kendi başvurusunu yapamayanlar: engelli, yaşlı ve refakatsiz çocuklar",
   "ozet": "Afet sonrası başvuruların çoğu, kişinin kendi işini kendisi takip edebildiği varsayımıyla kurulmuştur. Vesayet, kayyım ve çocuk koruma tedbirleri bu varsayımın dışındakiler içindir.",
   "url": "rehber/engelli-yasli-ve-refakatsiz-cocuklar.html",
   "dogrulama": "tek",
   "anahtar": [
    "vesayet",
    "vasi atanması",
    "kayyım",
    "refakatsiz çocuk",
    "engelli hakları deprem",
    "yaşlı bakımı afet"
   ],
   "metin": "Afet sonrası sistemin sessiz varsayımı şudur: kişi kendi işini kendisi takip edebilir. Başvuruyu kendisi yapar, dilekçesini kendisi verir, süresini kendisi takip eder. Bu varsayımın dışında kalan üç grup vardır: ailesini kaybetmiş çocuklar, bakıma muhtaç yaşlılar ve işlerini kendisi göremeyen engelli bireyler. Onlar için önce temsil sorunu çözülmelidir; aksi hâlde bütün süreler işlemeye devam ederken hiçbir başvuru yapılamaz. Önce temsil, sonra başvuru :tablo Temsil yollarının karşılaştırması Yol Ne zaman Nereye başvurulur Vesayet (vasi atanması) Velayet altında olmayan küçük; işlerini göremeyen ergin Sulh hukuk mahkemesi Kayyımlık Belirli bir işin görülmesi veya malvarlığının yönetimi gerektiğinde Sulh hukuk mahkemesi Koruyucu ve destekleyici tedbir Korunma ihtiyacı olan çocuk hakkında Çocuk mahkemesi / ilgili merciler :dayanak 4721 sayılı Türk Medeni Kanunu m.404 vd. · m.426 · 5395 sayılı Çocuk Koruma Kanunu :::uyari Süre işlemeye devam eder Vasi atanmasını beklerken hasar tespitine itiraz, hak sahipliği başvurusu ve sigorta ihbarı süreleri durmaz. Bu yüzden iki işi paralel yürütün: bir yandan temsil talebini açın, diğer yandan süresi dolan başvuruları \"kanuni temsilci atanması beklenmektedir\" şerhiyle yapıp evrak kaydını alın. ::: Ailesini kaybeden çocuk Velayet altında bulunmayan küçük vesayet altına alınır. Ayrıca korunma ihtiyacı olan çocuk hakkında koruyucu ve destekleyici tedbirler gündeme gelir. Bu süreçte önemli olan üç şey vardır: 1. İhbar. Durumu öğrenen herkes il"
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
   "metin": "DASK zorunlu ve dar bir teminattır. Onun bıraktığı boşluğu kapatan şey ihtiyari konut sigortasıdır — ama bu poliçenin kendi içinde, ödeme anında ortaya çıkan ve neredeyse hiç anlatılmayan bir tuzağı vardır. Konut sigortası neyi ekler? İhtiyari konut poliçesi, şirkete ve seçilen teminatlara göre değişmekle birlikte tipik olarak şunları kapsayabilir: :tablo DASK ile ihtiyari konut sigortasının teminat karşılaştırması Teminat DASK'ta Konut sigortasında Bina (azami teminata kadar) Var Var, sınır poliçeye göre Bina değerinin azami teminatı aşan kısmı Yok Var Ev eşyası Yok Var Enkaz kaldırma Yok Genellikle ek teminat Alternatif konaklama / geçici ikamet Yok Genellikle ek teminat Kira kaybı Yok Genellikle ek teminat Cam kırılması, hırsızlık, su baskını Yok Poliçeye göre Eksik sigorta: en pahalı ayrıntı Sigorta hukukunun temel kurallarından biri, poliçedeki sigorta bedelinin malın gerçek sigorta değerinden düşük olması hâlinde uygulanır: sigortacı zararın tamamını değil, bedelin değere olan oranını öder. :::tehlike Sayısal örnek Eşyanızın gerçek değeri 1.000.000 TL, ama poliçedeki eşya bedeli 400.000 TL olsun. Depremde 300.000 TL'lik eşya zararı doğdu. Ödeme: 300.000 × (400.000 / 1.000.000) = 120.000 TL. Hasar poliçe bedelinin altında olmasına rağmen zararın yalnızca %40'ı ödenir. Aradaki 180.000 TL sizde kalır. ::: Bu kural, prim tasarrufu için bedeli düşük tutma alışkanlığını doğrudan cezalandırır. Poliçe yenilenirken bedelin güncel yeniden yapım ve yeniden satın alma maliyetine gö"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Mücbir sebep ilan edilince ne oluyor? Vergi ve prim süreleri durur",
   "ozet": "Deprem, Vergi Usul Kanunu bakımından mücbir sebeptir. Mücbir sebep hâli süresince vergi ödevlerine ilişkin süreler işlemez; SGK tarafında da erteleme düzenlemeleri gündeme gelir.",
   "url": "rehber/mucbir-sebep-ve-sgk-primleri.html",
   "dogrulama": "coklu",
   "anahtar": [
    "mücbir sebep",
    "VUK 13",
    "vergi süreleri durur",
    "SGK prim ertelemesi",
    "beyanname erteleme",
    "terkin"
   ],
   "metin": "Afetten sonra en hızlı yayılan bilgi \"vergiler silindi\" olur. Doğrusu daha dar ama yine de kıymetlidir: deprem mücbir sebeptir ve mücbir sebep süresince vergi ödevlerine ilişkin süreler işlemez. Silinme değil, durma. Bu ayrımı bilmek, sonradan gecikme faiziyle karşılaşmayı önler. Mücbir sebep nedir, ne yapar? Vergi Usul Kanunu, yer sarsıntısını mücbir sebep hâlleri arasında sayar; mücbir sebebin devamı süresince sürelerin işlemeyeceğini düzenler. :dayanak 213 sayılı VUK m.13 ve m.15 Pratik karşılığı üç maddedir: 1. Beyan ve bildirim süreleri durur. 2. Ödeme süreleri durur. 3. Dava açma ve düzeltme talebi gibi süreler bakımından da mücbir sebep hükümleri değerlendirilir. :::uyari Silme ile durdurma karıştırılmasın Mücbir sebep borcu ortadan kaldırmaz. Borcun silinmesi (terkin), afet nedeniyle varlığının veya mahsulünün en az üçte birini kaybedenler için ayrıca değerlendirilen bir kurumdur ve karar gerektirir. ::: Terkin: borcun silinmesi Afetler yüzünden varlıklarının veya mahsullerinin en az üçte birini kaybedenlerin, afete uğrayan gelir kaynaklarıyla ilgili kamu borçlarının kısmen veya tamamen terkin edilebileceği belirtilmektedir. :dayanak 213 sayılı VUK m.115 Bu, kendiliğinden işleyen bir sonuç değildir: kayıp oranının belgelenmesi ve karar alınması gerekir. Hasar tespit raporunuz, bu dosyanın omurgasıdır. 2023'te nasıl uygulanmıştı? Hazine ve Maliye Bakanlığının, deprem tarihinden 31.07.2023 tarihine kadar 11 il için mücbir sebep hâli ilan ettiği belirtilmektedir. Bu bir "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Müteahhidin sorumluluğu: ağır kusur varsa zamanaşımı 20 yıl",
   "ozet": "Binanın depremde yıkılması hukuken ayıplı ifadır. Taşınmaz yapılarda zamanaşımı beş yıl, yüklenicinin ağır kusuru varsa yirmi yıldır.",
   "url": "rehber/muteahhit-sorumlulugu.html",
   "dogrulama": "coklu",
   "anahtar": [
    "müteahhit sorumluluğu",
    "müteahhit zamanaşımı 20 yıl",
    "ayıplı ifa deprem",
    "TBK 478",
    "taksirle ölüme neden olma",
    "deprem tazminat davası"
   ],
   "metin": "Deprem hukukunda en çok sorulan soru şudur: \"Müteahhide dava açabilir miyim, süresi geçmiş mi?\" Cevap çoğu kişinin sandığından daha umut vericidir — ama abartılı beklenti kurmak da doğru değildir. Binanın yıkılması hukuken ayıplı ifadır Yüklenicinin temel borcu, yapıyı sözleşmeye, imar mevzuatına ve deprem yönetmeliğine uygun, eksiksiz ve ayıpsız teslim etmektir. Hukuken bir binanın depremde yıkılması ayıplı ifa sayılır. :dayanak TBK m.474 478 Açık ayıp / gizli ayıp ayrımı: Açık ayıp teslim anında basit incelemeyle görülebilen, gizli ayıp ise sonradan kullanım veya dış etkenle (deprem gibi) ortaya çıkan ayıptır. Depremde yıkılan binalardaki ayıplar hemen her zaman gizli ayıptır . Zamanaşımı: 5 yıl mı, 20 yıl mı? :tablo Eser sözleşmesinde zamanaşımı süreleri Durum Süre (teslimden itibaren) : Taşınmaz yapı dışındaki eserler 2 yıl Taşınmaz yapılar 5 yıl Yüklenicinin ağır kusuru varsa 20 yıl :::vurgulu Deprem davalarının neredeyse tamamı 20 yıllık süreye dayanır , çünkü beş yıllık süre çoğu binada çoktan dolmuştur. Ayıbın hile ile gizlenmiş olması hâlinde de sürenin uzadığı kabul edilir. ::: Ağır kusur örnekleri Statik projeden sapma Demir eksiltme — projede öngörülen donatının konmaması Beton sınıfını düşürme — düşük dayanımlı beton kullanımı Kolon kesme ve taşıyıcı sisteme müdahale Ruhsat ve projeye aykırı kat ilavesi Bu iddiaların ispatı teknik incelemeyle olur: enkaz numuneleri, beton karot sonuçları, projeler ve yapı denetim kayıtları. Bu yüzden enkaz kaldırılmadan önce numu"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Ölüm hâlinde sigorta ve SGK: DASK'ın ödemediği yerde hangi poliçe var?",
   "ozet": "DASK ölümü karşılamaz. Bedeni zararların karşılığı hayat sigortası, deprem teminatı seçilmiş ferdi kaza poliçesi, SGK ölüm aylığı ve çoğu ailenin varlığından habersiz olduğu BES birikimleridir.",
   "url": "rehber/olum-halinde-sigorta-ve-sgk.html",
   "dogrulama": "tek",
   "anahtar": [
    "hayat sigortası deprem",
    "ferdi kaza deprem istisnası",
    "SGK ölüm aylığı",
    "BES lehtar sorgulama",
    "vefat sigorta ödemesi",
    "dul yetim aylığı"
   ],
   "metin": "Yakınını kaybeden ailelerin karşılaştığı en acı sürprizlerden biri şudur: DASK ölümü karşılamaz. Zorunlu deprem sigortası binayı sigortalar; ölüm dâhil tüm bedeni zararlar ve manevi tazminat talepleri teminat dışıdır. :dayanak Zorunlu Deprem Sigortası Genel Şartları A.3 Bedeni zararların karşılığı başka yerlerdedir ve bu ayrım neredeyse hiç bilinmez. Dört ayrı kaynak :tablo Ölüm hâlinde başvurulabilecek kaynaklar Kaynak Ne öder Dikkat Hayat sigortası Poliçedeki vefat teminatı Ölümün resmen tespiti ya da gaiplik kararı aranır Ferdi kaza sigortası Poliçedeki teminat Deprem, aksi kararlaştırılmadıkça teminat dışıdır SGK ölüm aylığı Hak sahiplerine aylık Sigortalılık süresi ve prim gün şartı aranır BES birikimi Birikim, devlet katkısı ve getirileri Lehtar yoksa yasal mirasçılara ödenir 1. Hayat sigortası ve ferdi kaza: iki farklı poliçe Hayat sigortasında vefat teminatı ödenir. Ferdi kaza sigortasında ise durum farklıdır: poliçe, aksi sözleşmeyle kararlaştırılmadıkça deprem kaynaklı olayları teminat dışında bırakır. :dayanak Ferdi Kaza Sigortası Genel Şartları :::tehlike \"Sigortam var\" demek yetmiyor Deprem teminatı seçilmemiş bir ferdi kaza poliçesi, depremde yaralanma veya ölüm hâlinde ödeme yapmaz. Bunu afetten sonra öğrenmek, bugün poliçeyi açıp bir satırı okumaktan çok daha pahalıdır. ::: 2. SGK: ölüm aylığı ve başvuru 4/a kapsamındaki sigortalının hak sahiplerine, en az beş yıl sigortalılık süresi ve 900 gün prim şartıyla ölüm aylığı bağlandığı belirtilmektedir. Başvuru, e "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "İmar barışı ve Yapı Kayıt Belgesi: binanız yasallaştı ama güvenli olmadı",
   "ozet": "Yapı Kayıt Belgesi, binanın depreme dayanıklı olduğunu göstermez ve maliki sorumluluktan kurtarmaz. Sorumluluk açıkça malike bırakılmıştır.",
   "url": "rehber/imar-barisi-yapi-kayit-belgesi.html",
   "dogrulama": "coklu",
   "anahtar": [
    "imar barışı",
    "yapı kayıt belgesi",
    "imar affı deprem",
    "yapı kayıt belgesi geçerliliği",
    "ruhsatsız yapı deprem",
    "imar barışı sorumluluk"
   ],
   "metin": "Milyonlarca binayı ilgilendiren ve büyük ölçüde yanlış bilinen bir konu: imar barışı. 2018'de getirilen düzenlemeyle, belirli bir tarihten önce yapılmış ruhsatsız veya ruhsata aykırı yapılar için Yapı Kayıt Belgesi alınabildi. Belgeyi alan çok sayıda kişi şunu düşündü: \"Binam artık yasal, sorun kalmadı.\" Bu cümlenin ilk yarısı kısmen doğru, ikinci yarısı ise tehlikeli biçimde yanlıştır. Düzenleme ne getirdi? 3194 sayılı İmar Kanunu'na 2018'de eklenen geçici 16. madde ile, 31.12.2017'den önce yapılmış ruhsatsız veya ruhsata aykırı yapılar için başvuru imkânı tanınmış; süresinde başvurup bedelini ödeyenlere Yapı Kayıt Belgesi verilmiştir. :dayanak 3194 sayılı İmar Kanunu geçici m.16 (7143 s.K. m.16 ile eklenmiştir) Belge, yapıya mevcut kullanımı bakımından bir hukuki statü tanır; abonelik ve bazı işlemlerde kolaylık sağlar. Peki ne getirmedi? :::tehlike Yapı Kayıt Belgesi, binanın depreme dayanıklı olduğunu göstermez ve maliki sorumluluktan kurtarmaz. Düzenleme, binanın depreme dayanıklılığı konusundaki sorumluluğu açıkça malike yüklemektedir. Belge, yapıyı imar mevzuatına uygun hâle getirmez; yalnızca mevcut kullanımına hukuki bir statü tanır. ::: Yani bir binanın kâğıt üzerindeki durumu ile fiziksel güvenliği farklı şeylerdir. Yapı Kayıt Belgesi birinciyi düzeltir, ikinciye dokunmaz. Bu ayrım depremde ne anlama gelir? Sorumluluk sizde: Binanın depreme dayanıklılığından malik sorumludur. Belge, hasar veya can kaybı hâlinde koruma sağlamaz. Yapı mühendislik hizmeti görmemiş ola"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "İş yeri hasar gördüyse: DASK'ın bittiği yer, esnafın başladığı yer",
   "ozet": "Tamamı ticari kullanılan binalar zorunlu deprem sigortası kapsamı dışındadır; iş durması ve kâr kaybı hiçbir hâlde DASK teminatında değildir. Esnafın kaybı bu boşlukta doğar.",
   "url": "rehber/isyeri-hasari-ve-esnaf.html",
   "dogrulama": "tek",
   "anahtar": [
    "iş yeri hasarı",
    "ticari deprem sigortası",
    "iş durması kâr kaybı",
    "esnaf destekleri",
    "KOSGEB",
    "kiracı esnaf"
   ],
   "metin": "Konut hasarında ne yapılacağı az çok konuşulur; iş yeri hasarında hemen hiç konuşulmaz. Oysa esnafın kaybı çoğu zaman iki kat büyüktür: hem işyeri, hem gelir. Bu sayfa, boşluğun tam olarak nerede olduğunu gösterir. Birinci boşluk: bina kapsam dışı olabilir Zorunlu deprem sigortası, mesken olarak inşa edilmiş binalar ile bu binalardaki ticarethane ve büro niteliğindeki bağımsız bölümleri kapsar. Buna karşılık tamamı ticari veya sınai amaçla kullanılan binalar genel şartlar gereği kapsam dışındadır. :dayanak Zorunlu Deprem Sigortası Genel Şartları A.2 Pratik sonucu şudur: apartmanın zemin katındaki dükkân kapsamda olabilirken, müstakil bir iş hanı veya fabrika için ticari deprem sigortası gerekir. İkinci boşluk: asıl kayıp zaten teminat dışı Diyelim bina kapsamda ve tazminat ödendi. Esnafın asıl kaybı yine karşılanmaz: :tablo İş yeri zararlarının teminat karşılığı Zarar kalemi Zorunlu deprem sigortası Nerede karşılanır Bina hasarı Kapsamdaysa, azami teminata kadar Ticari poliçe üstünü kapatabilir Emtia, demirbaş, makine Yok İşyeri paket poliçesi İş durması, kâr kaybı Yok Kâr kaybı teminatı Enkaz kaldırma Yok Ek teminat Çalışanların bedeni zararı Yok Ferdi kaza / SGK / dava :dayanak Zorunlu Deprem Sigortası Genel Şartları A.3 :::uyari Poliçenizi bugün açın \"İşyeri sigortam var\" cümlesi çoğu zaman yangın ve hırsızlık teminatını anlatır. Poliçede deprem teminatının ve kâr kaybı maddesinin seçili olup olmadığını kontrol edin. Bu kontrol beş dakikadır; karşılığı bir işletmedir. ::: "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Belediyeye ve yapı denetime dava: deprem her zaman mücbir sebep değildir",
   "ozet": "Deprem kuşağındaki bölgelerde depremin mücbir sebep sayılamayacağı kabul ediliyor. Bu, idarenin 'elimden bir şey gelmezdi' savunmasını kıran ilkedir.",
   "url": "rehber/idare-ve-yapi-denetimi-sorumlulugu.html",
   "dogrulama": "coklu",
   "anahtar": [
    "idareye tam yargı davası",
    "belediyeye deprem davası",
    "yapı denetim sorumluluğu",
    "hizmet kusuru deprem",
    "deprem mücbir sebep değil",
    "2577 madde 13"
   ],
   "metin": "Deprem davalarında müteahhit ilk akla gelen taraftır. Oysa binanın ruhsatını veren, iskânını düzenleyen, denetimini yapan ve yapı denetim sistemini gözeten kurumlar da tablodadır. İdareye karşı açılan davanın adı tam yargı davasıdır ve dayanağı hizmet kusurudur . Sorumluluğu tartışılan idareler :tablo İdareler ve sorumluluk gerekçeleri İdare Gerekçe Belediyeler İmar, ruhsat, iskân ve denetim kusurları Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Yapı denetim sisteminin gözetimi, afet risk yönetimi, imar politikalarındaki eksiklikler TOKİ Kamu kaynaklı konutların projelendirme, ihale, yapım ve denetim süreçleri İçişleri Bakanlığı / AFAD Afet öncesi hazırlık, önleme, arama kurtarma ve koordinasyon eksiklikleri Kilit ilke: deprem her zaman mücbir sebep değildir :::vurgulu Deprem kuşağında bulunan, daha önce deprem yaşanmış veya deprem riski yüksek olan bölgelerde deprem mücbir sebep sayılamaz. ::: Bu ilke, idarenin \"doğal afet oldu, elimden bir şey gelmezdi\" savunmasını kıran temel argümandır. Türkiye'nin deprem haritası bilinen bir gerçek olduğuna göre, riskin öngörülemez olduğu savunulamaz. Hizmet kusuru değerlendirilirken bakılanlar Yapının bulunduğu zeminin özelliği ve zemin durumuna göre depreme dayanıklılığın kontrol edilip edilmediği Yapı kullanma izninin (iskân) bulunup bulunmadığı İmar planları ve inşaat ruhsatlarının hangi idarelerce verildiği Yapıların imar mevzuatı açısından denetlenip denetlenmediği Afet bölgelerinin tespit ve ilan edilip edilmediği İdarece gere"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Bina yıkıldıktan sonra mülkiyet ne oluyor? Kat mülkiyeti, arsa payı ve yeniden inşa",
   "ozet": "Ana yapı tamamen yıkılırsa kat mülkiyeti sona erer; geriye arsa payı oranında paylı mülkiyet kalır. Yeni dairenizin büyüklüğünü bu oran belirler.",
   "url": "rehber/arsa-payi-ve-kat-mulkiyeti.html",
   "dogrulama": "coklu",
   "anahtar": [
    "arsa payı",
    "kat mülkiyeti sona ermesi",
    "arsa payı düzeltme davası",
    "bina yıkıldı tapu",
    "yeniden inşa deprem",
    "KMK 47"
   ],
   "metin": "Yıkılan binanın enkazı kaldırıldığında ortada çıplak bir arsa kalır. O anda çoğu kişinin aklından geçen soru şudur: \"Benim dairem yok oldu, tapum ne oldu?\" Cevap net: mülkiyetiniz yok olmaz, biçim değiştirir. Kat mülkiyeti sona erer, paylı mülkiyet kalır :::vurgulu Ana yapı tamamen yıkılır veya harap olursa kat mülkiyeti sona erer ; geriye arsa payı oranında paylı mülkiyet kalır. ::: :dayanak 634 sayılı Kat Mülkiyeti Kanunu m.47 Bina yıkılıp arsa çıplak kaldığında, kurulmuş kat irtifakı veya kat mülkiyeti ilgili tapu müdürlüğünce tarafların rızası aranmaksızın terkin edilir ve taşınmaz, malikler adına payları oranında tescil edilir. Yani artık \"3. kattaki 6 numaralı daire\"nin sahibi değil, arsanın belirli bir payının sahibisiniz. Yeniden inşa süreci de bu pay üzerinden yürür. Arsa payı neden bu kadar kritik? Çünkü yeni binada size ne verileceğini bu oran belirler: Alacağınız bağımsız bölümün metrekaresi Hangi kat ve hangi cephe Kaç bağımsız bölüm alacağınız Müteahhitle yapılacak paylaşımda payınız Kentsel dönüşüm karar süreçlerinde oy ağırlığınız :::uyari Arsa payı yanlışsa, yeni binada kalıcı hak kaybı yaşarsınız. Üstelik bu kayıp, bina yapıldıktan sonra düzeltilemez hâle gelir. Yeniden inşa sürecine girmeden önce tapu kaydınızdaki arsa payını mutlaka kontrol edin. ::: Arsa payı nasıl belirlenmiş olmalı? Arsa payları, bağımsız bölümlerin değerleriyle orantılı olarak dağıtılmalıdır. Uygulamada ise çoğu binada paylar özensiz belirlenmiş, bazen tüm dairelere eşit pay verilmiş, "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Binanız hangi deprem yönetmeliği döneminde yapıldı? Belgeleri nasıl alırsınız?",
   "ozet": "Bina yaşı, dayanıklılık hakkında kaba ama anlamlı bir göstergedir. Ruhsat, iskân ve zemin etüdü raporu bilgi edinme yoluyla istenebilir.",
   "url": "rehber/bina-yasi-ve-deprem-yonetmelikleri.html",
   "dogrulama": "coklu",
   "anahtar": [
    "deprem yönetmeliği",
    "TBDY 2018",
    "bina yaşı deprem güvenliği",
    "yapı ruhsatı nasıl alınır",
    "iskan belgesi",
    "zemin etüdü raporu",
    "bilgi edinme başvurusu"
   ],
   "metin": "\"Binam kaç yılında yapıldı?\" sorusu, deprem güvenliği hakkında elinizdeki en hızlı göstergedir. Tek başına yeterli değildir; ama hangi kurallara göre inşa edildiğini ve hangi denetimden geçtiğini söyler. Deprem yönetmeliği kuşakları :tablo Türkiye'de deprem yönetmeliği dönemleri Dönem Yönetmelik Not 1975 Afet Bölgelerinde Yapılacak Yapılar Hakkında Yönetmelik Erken dönem 1998 Aynı yönetmeliğin kapsamlı revizyonu Yayım 1997, yaygın adlandırma 1998 2007 Deprem Bölgelerinde Yapılacak Binalar Hakkında Yönetmelik 2018 ile yürürlükten kaldırıldı 2018 Türkiye Bina Deprem Yönetmeliği (TBDY) 18.03.2018 tarihli mükerrer Resmî Gazete; yürürlük 01.01.2019 TBDY 2018, yalnızca yeni yapılacak binaların tasarımını değil, mevcut binaların deprem etkisi altında değerlendirilmesi ve güçlendirilmesi için gerekli kuralları da belirler. Yani binanız eski olsa da bugünün ölçütleriyle değerlendirilebilir. :::uyari Tablodaki eski dönemlerin Resmî Gazete tarihleri ikincil kaynaklardan derlenmiştir ve resmî metinden doğrulanması sürmektedir. Bir davada veya teknik değerlendirmede kullanmadan önce yürürlük tarihlerini resmî kaynaktan teyit edin. ::: 2001 eşiği: yapı denetimi 4708 sayılı Yapı Denetimi Hakkında Kanun 2001'de kabul edilmiş, zorunlu yapı denetimi kademeli olarak yaygınlaştırılmıştır. 2001 öncesi yapılar bu denetimden geçmemiştir. Bu tarih, sonradan açılacak davalarda da belirleyicidir: yapı denetim kuruluşunun sorumluluğu, ancak denetime tabi yapılar bakımından gündeme gelir. İdare ve yapı "
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "DASK hasar ihbarı nasıl yapılır? 15 günlük süre, %2 muafiyet ve 72 saat kuralı",
   "ozet": "Depremden sonra DASK hasar ihbarı için süre 15 gün. İhbar kanalları, eksper süreci, %2 muafiyet ve ödemenin nasıl hesaplandığı.",
   "url": "rehber/dask-hasar-ihbari.html",
   "dogrulama": "coklu",
   "anahtar": [
    "DASK hasar ihbarı",
    "ALO DASK 125",
    "DASK muafiyet",
    "72 saat kuralı deprem",
    "DASK tazminat süreci",
    "DASK hasar dosyası"
   ],
   "metin": "Zorunlu deprem sigortanız varsa depremden sonraki ilk hukuki adımınız hasar ihbarıdır. Bu adım basit görünür ama üç noktada hak kaybına yol açar: süresini kaçırmak, ihbarın kaydını tutmamak ve ödemenin nasıl hesaplandığını bilmemek. İhbar süresi: 15 gün Zorunlu Deprem Sigortası Genel Şartlarına göre hasar ihbarı, rizikoyu öğrendiğiniz tarihten itibaren 15 gün içinde yapılır. :dayanak Zorunlu Deprem Sigortası Genel Şartları B.1 Bu süre, hasarın büyüklüğünü öğrenmenizi beklemez. Binaya giremiyor olsanız, şehir dışındaysanız veya hasarın boyutu belirsizse bile ihbarı yapın; detaylar sonradan tamamlanır. İhbar kanalları ALO DASK 125 — telefonla, en hızlısı. DASK internet sitesi — online hasar işlemleri. Poliçenizi düzenleyen sigorta şirketi. e Devlet üzerinden ilgili başvuru adımı. :::uyari Kayıt tutun Hangi kanaldan ihbar ettiyseniz hasar dosya numarasını not edin; telefonla ihbar ettiyseniz görüşme tarihini ve saatini yazın. Sonraki her itirazda bu numara istenir. ::: İhbardan ödemeye: süreç nasıl işliyor? 1. İhbar — dosya açılır, numara verilir. 2. Eksper incelemesi — hasar tespit görevlileri veya sigorta eksperleri yerinde inceleme yapar, rapor düzenlenir. 3. Dosyanın değerlendirilmesi — teminat kapsamı, sigorta bedeli ve muafiyet uygulanarak tazminat hesaplanır. 4. Ödeme — belgelerin tamamlanmasından sonra ödeme yapılır. Ödeme gecikirse temerrüt faizi talep edilebilir. Eksper geldiğinde yanında olun, gördüğü ve görmediği yerleri kayda alın. Rapor, ödemenin tek belirleyicisid"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Deprem iş yerinde yakaladıysa: iş kazası tartışması ve işverenin sorumluluğu",
   "ozet": "Deprem sırasında iş yerinde ölüm veya yaralanma hâlinde olayın iş kazası sayılıp sayılmayacağı tartışmalıdır. Sayılırsa SGK hakları ve işverenin sorumluluğu bakımından sonuç değişir.",
   "url": "rehber/isyerinde-olum-ve-is-kazasi.html",
   "dogrulama": "tek",
   "anahtar": [
    "iş kazası deprem",
    "iş yerinde ölüm",
    "SGK bildirimi",
    "işverenin sorumluluğu",
    "iş sağlığı ve güvenliği",
    "tazminat davası"
   ],
   "metin": "Depremlerin önemli bir kısmı gündüz olmaz; ama olduğunda insanlar iş yerindedir. O anda ortaya çıkan soru hukukta hâlâ tartışmalıdır: iş yerinde, çalışma sırasında gerçekleşen deprem ölümü iş kazası sayılır mı? Cevabın pratik önemi büyüktür: sayılırsa hak sahiplerine bağlanacak gelir bakımından şartlar değişebilir. Tartışma neden var? İş kazası, sigortalının iş yerinde bulunduğu sırada veya işveren tarafından yürütülmekte olan iş nedeniyle meydana gelen ve sigortalıyı bedenen veya ruhen zarara uğratan olaydır. :dayanak 5510 sayılı Kanun m.13 Depremde iki unsur çatışır: Lehine olan: Olay iş yerinde ve iş görme sırasında gerçekleşmiştir. Aleyhine olan: Zararın kaynağı işin kendisi değil, dış bir doğa olayıdır. Uygulamada değerlendirme, binanın durumu ve işverenin yükümlülüklerini yerine getirip getirmediğiyle birlikte yapılır. Riskli yapı raporu bulunan, hasarlı olduğu bilinen ya da tahliye edilmesi gerekirken çalışılmaya devam edilen bir yapıda olay gerçekleşmişse tablo değişir. İşverenin yükümlülükleri :tablo İşverenin iş yeri güvenliğine ilişkin temel yükümlülükleri Yükümlülük Kaynağı Çalışanın sağlık ve güvenliğini sağlama, risk değerlendirmesi 6331 sayılı Kanun Acil durum planı, tahliye ve tatbikat 6331 sayılı Kanun İşçiyi gözetme borcu, gerekli önlemleri alma TBK m.417 İş kazasını üç iş günü içinde Kuruma bildirme 5510 sayılı Kanun m.13 :::uyari Bildirim yapılmadıysa hak sahipleri başvurabilir Bildirim yükümlülüğü işverendedir; ancak yapılmadığında hak kaybolmaz. Hak sahi"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Hasarlı binadan eşya alınabilir mi? Kurallar ve kimsenin söylemediği tuzak",
   "ozet": "Yıkık ve acil yıktırılacak yapılara girmek yasak. Ağır hasarlı binada eşya alımı ise pratikte 30 günlük itiraz hakkınızla çakışıyor.",
   "url": "rehber/hasarli-binadan-esya-alma.html",
   "dogrulama": "coklu",
   "anahtar": [
    "hasarlı binadan eşya alma",
    "ağır hasarlı bina eşya",
    "yıkık binaya girmek yasak",
    "eşya tahliyesi deprem",
    "hasar tespiti itiraz eşya"
   ],
   "metin": "Deprem sonrasının en insani sorularından biri: \"Eşyalarımı alabilir miyim?\" Çocuğun fotoğrafı, ilaçlar, kimlik belgeleri, altınlar, kışlık giysi… Bu soru duygusal olduğu kadar hukukidir de, çünkü verilen cevap yalnızca güvenlikle ilgili değil — itiraz hakkınızla da bağlantılıdır. Bina durumuna göre kural :tablo Bina durumuna göre eşya alma kuralları Bina durumu Kural Yıkık / acil yıktırılacak Kısa süreliğine dahi girmek ve eşya almak kesinlikle yasaktır. Ağır hasarlı Giriş ve eşya alımı, Bakanlıkça görevlendirilen uzmanların raporu doğrultusunda değerlendirilir; tahliye, yerel afet tahliye ve planlama grubu gözetiminde yapılır. Orta / az hasarlı Yetkililerin verdiği güvenlik değerlendirmesine göre; artçılar sürerken tek başınıza girmeyin. :::tehlike Hayati uyarı Ağır hasarlı binalar artçı sarsıntılarda çöker. 2023'te enkaz altında kalanların bir kısmı, eşyasını almak için binaya giren kişilerdi. Hiçbir eşya buna değmez; resmî tahliye organizasyonunu bekleyin. ::: Kimsenin söylemediği tuzak: eşya mı, itiraz hakkı mı? Ağır hasarlı yapılarda eşya tahliyesi uygulamada 30 günlük itiraz süresine bağlanmıştır : hasar durumuna itiraz etmeyecek vatandaşların eşya alımı, uzmanlarca oluşturulacak tahliye raporuna göre planlanır. İtiraz edilen binalarda ise tespit çalışmaları, \"acil yıkılacak bina\" dışındaki yapılar için 30 günlük sürenin bitiminden sonra başlar. Sonuç, kimsenin açıkça anlatmadığı bir ikilem: eşyanızı hızla almak istiyorsanız itiraz etmemeye, itiraz edecekseniz beklemeye"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Kira yardımı ve taşınma yardımı: kim alır, ne kadar sürer?",
   "ozet": "Kira yardımının iki ayrı kaynağı var: afete özgü AFAD kararları ve kentsel dönüşüm mevzuatındaki kalıcı kira yardımı. İkincisinde kiracı da taraftır.",
   "url": "rehber/kira-ve-tasinma-yardimi.html",
   "dogrulama": "tek",
   "anahtar": [
    "kira yardımı",
    "taşınma yardımı",
    "AFAD kira yardımı",
    "6306 kira yardımı",
    "kiracı kira yardımı",
    "geçici barınma"
   ],
   "metin": "Kira yardımı, deprem sonrasında en çok sorulan ve en çok karıştırılan başlıktır. Karışıklığın nedeni basittir: tek bir kira yardımı yoktur, iki ayrı kaynak vardır ve kuralları farklıdır. İki kaynak, iki farklı mantık :tablo Kira yardımının iki kaynağı Kaynak Niteliği Kimi kapsar Kentsel dönüşüm (6306) Kalıcı mevzuat; tutar Bakanlıkça yıllık güncellenir Riskli yapıdaki malik ve kiracı Afete özgü kararlar (AFAD) O afet için alınmış idari karar Karar metninde kim sayılmışsa Birincisi bir haktır ve mevzuatta yazılıdır. İkincisi bir karardır: her afette yeniden alınır, tutarı ve süresi değişir, hatta hiç alınmayabilir. :::uyari Bu ayrımı neden bu kadar vurguluyoruz? Çünkü \"2023'te şu kadar ödenmişti\" cümlesi bir hak değil, bir emsaldir. Yeni bir afette aynı tutarın ödeneceğini kimse taahhüt edemez. Size olmayan bir hakkı varmış gibi göstermek, bilgi vermemekten daha zararlıdır. ::: Kentsel dönüşümde kira yardımı: kiracı da taraftır Riskli yapı tespiti yapılmış bir binada oturuyorsanız, süreç yalnızca maliki değil kiracıyı da ilgilendirir. Kiracıların da kira yardımı talep edebildiği, sürenin 18 aya kadar uzayabildiği ve tutarın Bakanlıkça yıllık güncellendiği belirtilmektedir. Kiracılara, maliklere yapılan aylık yardımın iki katı tutarında bir defaya mahsus ödeme yapıldığı ifade edilmektedir. :dayanak 6306 sayılı Kanun ve Uygulama Yönetmeliği Riskli yapı sürecinin nasıl başladığı ve itiraz basamakları için: riskli yapı tespiti. Afete özgü yardımlar: 2023'te ne uygulanmıştı? 2023 d"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Kredi ve kredi kartı borçları: erteleme bir hak mı, karar mı?",
   "ozet": "Deprem sonrası borç ertelemeleri kalıcı bir hak değil, düzenleyici kurum kararlarıdır. 2023'te uygulanan esnekliklerin ne olduğunu ve bugün ne yapılabileceğini ayrı ayrı anlatıyoruz.",
   "url": "rehber/kredi-ve-kart-borclari.html",
   "dogrulama": "coklu",
   "anahtar": [
    "kredi ertelemesi",
    "kredi kartı borcu",
    "BDDK kararı",
    "icra takibi",
    "yapılandırma",
    "kefil"
   ],
   "metin": "Deprem sonrasında gelen mesajların en umut vericisi genellikle şudur: \"Borçlar ertelendi.\" Bu cümlenin doğru okunuşu şudur: bir kurum, belirli bir dönem için, belirli borç türlerinde esneklik kararı almış olabilir. Kalıcı bir hak değildir. Bu yüzden bu sayfada size \"hakkınız\" demiyoruz; ne olduğunu ve bugün ne yapabileceğinizi anlatıyoruz. 2023'te ne uygulanmıştı? 6 Şubat 2023 sonrasında BDDK kararlarıyla getirilen esneklikler şunlardı: Tüketici ve taşıt kredilerinde anapara ve faiz ödemelerinin, müşterinin talebi üzerine en az 6 ay ertelenmesi Kredi kartı borçlarında ödemesiz dönem tanımlanabilmesi Taksitlendirme sürelerinin bir katına kadar artırılabilmesi Kredi kartı yıllık ücreti ve POS aylık ücretlerinin alınmaması :::tehlike Bunlar kalıcı mevzuat değildir Yukarıdakiler belirli bir dönem için alınmış kararlardır. Yeni bir afette aynı kararların çıkacağının garantisi yoktur. Bugün için bankanızın ve düzenleyici kurumun güncel duyurusunu esas alın. ::: Bugün ne yapılabilir? Karar olsun olmasın, her borçlunun kullanabileceği üç yol vardır: 1. Bankaya yazılı başvuru. Durumunuzu (hasar tespit raporu, iş yeri kapanışı, gelir kaybı) belgeleyerek ödeme planı revizyonu talep edin. Şubede sözlü konuşmak yetmez; başvurunun kaydını alın. 2. Yeni plan yazılı istenir. Erteleme kabul edilirse toplam maliyetin ne olacağını gösteren yeni ödeme planını yazılı isteyin. Erteleme çoğu zaman faizi silmez , öteler. 3. Uyarlama talebi. Sözleşmenin kurulmasından sonra ortaya çıkan olağanüstü dur"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Miras yalnızca mal değil borç da getirir: reddin üç aylık süresi",
   "ozet": "Miras, ölümle birlikte kendiliğinden mirasçılara geçer; borçlar da dâhil. Reddetmek isteyen mirasçının üç aylık süresi vardır ve bu süre çoğu ailede farkına varılmadan geçer.",
   "url": "rehber/mirasin-reddi-ve-tereke.html",
   "dogrulama": "tek",
   "anahtar": [
    "mirasın reddi",
    "üç aylık süre",
    "tereke",
    "borçlu miras",
    "veraset ilamı",
    "mirasçı borcu"
   ],
   "metin": "Afet sonrasında miras, çoğu ailede aylar sonra konuşulan bir konudur. Oysa hukuk beklemez: miras, ölümle birlikte kendiliğinden mirasçılara geçer — malvarlığı da, borçlar da. Bu yüzden mirasın en kritik kararı \"ne alacağım\" değil, \"kabul edecek miyim\" sorusudur ve o sorunun bir süresi vardır. Miras nasıl geçiyor? Mirasçılar, mirasbırakanın ölümüyle mirası bir bütün olarak kazanır. Bütün derken kastedilen şudur: taşınmaz, banka hesabı, alacak, araç — ve kredi borcu, kart borcu, kefalet, vergi borcu. :dayanak 4721 sayılı Türk Medeni Kanunu m.599 Ret hakkı ve üç aylık süre Yasal mirasçılar mirası reddedebilir. Ret süresi kural olarak üç aydır ve mirasçının ölümü ile mirasçı olduğunu öğrendiği tarihten işlemeye başlar. :dayanak 4721 sayılı Türk Medeni Kanunu m.605 606 :::tehlike Süre sessizce işler Ret süresi kimse size hatırlatmadan işler. Süre geçtiğinde miras kayıtsız şartsız kabul edilmiş sayılır ve borçlardan sorumluluk doğar. Afet sonrasında cenaze, barınma ve hasar süreçleriyle uğraşırken en kolay kaçırılan süre budur. ::: Beyan, mirasbırakanın son yerleşim yeri sulh hukuk mahkemesine yapılır. Beyanın kayda geçtiğine dair belgeyi mutlaka saklayın. Ret hakkını kaybettiren davranışlar :tablo Ret hakkını etkileyen davranışlar Davranış Sonucu Tereke işlerine karışmak, mal kaçırmak veya gizlemek Ret hakkı kaybedilir Olağan yönetim ve zorunlu işler Kural olarak ret hakkını etkilemez Üç aylık sürenin geçmesi Miras kayıtsız şartsız kabul edilmiş sayılır :dayanak 4721 sayılı Türk M"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Yurt dışında yaşayan malikler: vekâletname, tebligat ve kaçırılan süreler",
   "ozet": "Yurt dışında yaşayan malikin en büyük riski mesafe değil tebligattır: süreler, haberi olmasa da kayıtlı adrese yapılan bildirimle işlemeye başlar.",
   "url": "rehber/yurt-disinda-yasayanlar.html",
   "dogrulama": "tek",
   "anahtar": [
    "yurt dışında yaşayan malik",
    "konsolosluk vekâletnamesi",
    "tebligat",
    "adres kayıt sistemi",
    "gurbetçi deprem",
    "vekil ile başvuru"
   ],
   "metin": "Yurt dışında yaşayan bir malikin depremdeki en büyük riski uçak bileti değildir. Riski üreten şey şudur: süreler, sizin haberiniz olmasa da işler. Hasar tespit sonuçları mahallinde ilan edilir ve otuz günlük itiraz süresi o ilan tarihinden başlar. Tebligat ise adres kayıt sistemindeki adrese yapılabilir. İkisi de sizin Türkiye'de olmanızı beklemez. Birinci iş: vekâletname Türkiye'ye gelemeyecekseniz, bulunduğunuz ülkedeki Türk konsolosluğundan düzenlenecek vekâletname ile bir yakınınızı ya da avukatı yetkilendirin. :::uyari Vekâletnamede yetkiler tek tek sayılmalı \"Her türlü işlemi yapmaya\" ifadesi bazı kurumlarda yeterli görülmez. Şunları ayrı ayrı yazdırın: hasar tespitine itiraz, hak sahipliği başvurusu ve taahhütname imzalama, sigorta ihbarı ve tazminat talebi, tapu işlemleri, dava açma ve takip, tebligat alma. ::: Vekilin yapacağı işlerin çoğunda kimlik ve tapu örneği de istenir; bu belgelerin taranmış kopyalarını vekile önceden gönderin. İkinci iş: tebligat adresini düzeltmek :tablo Yurt dışındaki malik için tebligat riskleri Durum Sonucu Adres kaydı hasarlı binada kalmış Tebligat oraya yapılır; haberiniz olmaz Yurt dışı adresi kayıtlarda yok Kurum size ulaşamaz, süre yine işler Vekil atanmış ama tebligata yetkisi yok Evrak vekile ulaşmaz :dayanak 7201 sayılı Tebligat Kanunu · 5490 sayılı Nüfus Hizmetleri Kanunu Yapılacak şey basittir ve ücretsizdir: adres kaydınızı güncelleyin, vekilinizin adresini tebligat adresi olarak bildirin, e Devlet bildirimlerini açık tutun. Üç"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "Eksper raporu son söz değildir: itiraz, ikinci eksper ve hakem eksper",
   "ozet": "Sigorta ödemesini az bulanların çoğu doğrudan mahkemeyi düşünüyor. Arada çok daha hızlı üç basamak var: itiraz, ikinci eksper, hakem eksper.",
   "url": "rehber/eksper-raporuna-itiraz.html",
   "dogrulama": "tek",
   "anahtar": [
    "eksper raporuna itiraz",
    "ikinci eksper talebi",
    "hakem eksper",
    "bağımsız eksper",
    "DASK ödemesi az geldi",
    "hasar dosyasına itiraz"
   ],
   "metin": "Sigorta ödemesini az bulan kişilerin çoğu iki şeyden birini yapıyor: ya kabul edip susuyor ya da doğrudan mahkemeyi düşünüyor. Oysa arada çok daha hızlı ve ucuz üç basamak var ve bu basamaklar neredeyse hiç bilinmiyor. Rapor size tebliğ edildiğinde Önce raporu isteyin ve okuyun. Uygulamada birçok kişi yalnızca ödenen tutarı görür, raporu hiç görmez. Oysa itiraz, raporun somut tespitlerine yöneltilmelidir. Raporda kontrol edilecekler: Hasarın niteliği doğru tanımlanmış mı? (taşıyıcı sistem hasarı mı, tamamlayıcı eleman mı) Zarar gören kalemler eksiksiz sayılmış mı? Metrekare, yapı tarzı ve sigorta bedeli doğru mu? Muafiyet doğru oranda düşülmüş mü? Rapora esas fotoğraf ve ölçümler yeterli mi? Üç basamak ve süreleri :tablo Eksper raporuna itiraz basamakları Basamak Usul Süre : 1. Eksper raporuna itiraz Raporun tebliğinden itibaren sigorta şirketine yazılı itiraz 15 gün 2. İkinci eksper talebi Raporun eksik/hatalı olduğu gerekçesiyle yeni eksper atanması — 3. Hakem eksper İki rapor arasında ciddi fark varsa üçüncü bir hakem eksper atanır — Bağımsız eksper hakkı Sigortalı, masrafını kendi karşılayarak dilediği eksperden rapor alabilir — DASK'a itiraz Hasar dosyasının kapatılmasından itibaren DASK Genel Müdürlüğüne yazılı itiraz 30 gün İtiraz dilekçesinde ne yazmalı? Kötü bir itiraz \"ödeme az geldi, itiraz ediyorum\" der. İyi bir itiraz rapordaki hangi tespite, neden katılmadığınızı kalem kalem gösterir. Poliçe numarası ve hasar dosya numarası. Raporun size tebliğ edildiği tarih. R"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "DASK'ım yeterli mi? Sigorta bedeli, azami teminat ve eksik sigorta tuzağı",
   "ozet": "DASK'ın ödeyeceği tutar konutunuzun piyasa değeri değildir. Bedel metrekareyle hesaplanır, azami teminatla sınırlıdır ve muafiyet düşülür.",
   "url": "rehber/dask-yeterli-mi.html",
   "dogrulama": "coklu",
   "anahtar": [
    "DASK ne kadar öder",
    "DASK azami teminat",
    "sigorta bedeli hesaplama",
    "eksik sigorta",
    "DASK yeterli mi",
    "konut sigortası deprem teminatı"
   ],
   "metin": "\"DASK'ım var\" cümlesi, çoğu insan için \"evim sigortalı\" anlamına geliyor. Oysa DASK'ın ödeyeceği tutarın konutunuzun piyasa değeriyle ilgisi yoktur. Ödeme üç filtreden geçer: sigorta bedeli , azami teminat ve muafiyet . 1. Sigorta bedeli: metrekare × birim bedel Sigorta bedeli, yapı tarzına göre belirlenen metrekare birim bedelinin binanın brüt yüzölçümüyle çarpılmasıyla bulunur. :tablo Yapı tarzına göre metrekare birim bedelleri Yapı tarzı m² bedeli (01.05.2026) : Çelik, betonarme karkas 10.714 TL Diğer yapılar 7.142 TL Örnek: 100 m² betonarme konut → 100 × 10.714 TL = 1.071.400 TL sigorta bedeli (01.05.2026 tarifesi). Aynı konutun piyasa değeri 4 milyon TL olabilir. DASK bu farkı kapatmaz; zaten amacı da bu değildir — DASK, yapıyı yeniden üretme maliyetine dayalı bir sistemdir. 2. Azami teminat: üst sınır Sigorta bedeli ne çıkarsa çıksın, bir mesken için ödenecek tutar azami teminat ile sınırlıdır. 01.05.2026 tarifesine göre bu tutar 2.271.283 TL olarak belirtilmektedir. :::uyari Tarih damgası Azami teminat tutarı 2026'da yıl içinde birden fazla kez güncellenmiştir: 2024'te 1.272.000 TL, 2025'te 1.704.162 TL, 2026 başında 2.095.462 TL, 01.05.2026'da 2.271.283 TL. Bu yüzden hiçbir içerik sayfasına sabit rakam yazılmamalı; hesaplama, tarih damgalı bir tarifeden yapılmalıdır. Sigorta açığı aracı hangi tarihli tarifeyle hesap yaptığını size gösterir. ::: 3. Muafiyet: %2 tenzili muafiyet Her hasarda sigorta bedelinin %2'si oranında tenzili muafiyet uygulanır; DASK muafiyeti aşan"
  },
  {
   "tur": "rehber",
   "turAd": "Rehber",
   "baslik": "DASK'ım yoksa ne olur? Asıl kayıp ceza değil, devlet desteğini kaybetmektir",
   "ozet": "Zorunlu deprem sigortası bulunmayanlara devlet konut yardımı veya kredi ödenmediği belirtilmektedir. DASK'ın asıl karşılığı budur.",
   "url": "rehber/daskim-yoksa-ne-olur.html",
   "dogrulama": "coklu",
   "anahtar": [
    "DASK yaptırmazsam ne olur",
    "DASK zorunlu mu",
    "DASK cezası",
    "devlet konut yardımı şartı",
    "zorunlu deprem sigortası",
    "hak sahipliği DASK şartı"
   ],
   "metin": "\"DASK primi ne kadar? Ödemesem ne olur?\" sorusunun standart cevabı yanlış yerden başlar. Doğru cevap ceza değil, şudur: :::tehlike Zorunlu deprem sigortası bulunmayanlara Devlet konut yardımı veya kredi ödemez. Yani binanız yıkılırsa devletten afet konutu veya faizsiz kredi alamayabilirsiniz. ::: :dayanak 7269 sayılı Kanun m.29/8 DASK'ın asıl karşılığı bir yaptırımdan kaçınmak değil, afet sonrası devlet desteğine erişim hakkını korumaktır. Yıllık prim ile kaybedilebilecek destek arasındaki oran, bu kararı kolay hâle getirir. Kimler için zorunlu? Kat Mülkiyeti Kanunu kapsamındaki bağımsız bölümler Tapuya kayıtlı ve özel mülkiyete tabi taşınmazlar üzerinde mesken olarak inşa edilmiş binalar Bu binaların içindeki ticarethane, büro ve benzeri amaçlarla kullanılan bağımsız bölümler Doğal afetler nedeniyle Devlet tarafından verilen veya sağlanan kredi ile yapılan meskenler :dayanak 6305 sayılı Afet Sigortaları Kanunu m.10 Poliçe nerede kontrol ediliyor? Kapsamdaki bina ve bağımsız bölümlere ilişkin su ve elektrik abonelik işlemlerinde zorunlu deprem sigortasının varlığı ilgili kurumca kontrol edilir. Tapu işlemlerinde de aranır. :dayanak 6305 sayılı Kanun m.11 Yani poliçesizlik çoğu zaman bir gün bir işlem sırasında karşınıza çıkar — ama en kötü ihtimalle depremden sonra çıkar. Poliçesiz kalınca tam olarak ne kaybediliyor? :tablo DASK'lı ve DASK'sız durum karşılaştırması Konu DASK var DASK yok Bina hasarı tazminatı Azami teminata kadar ödenir Ödenmez Devlet konut yardımı / faizsiz "
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Hakkımızda",
   "ozet": "Deprem Haklarım; afetten sonraki hakları kanuni dayanağıyla ve süresi geçmeden anlatan, kâr amacı gütmeyen, reklamsız ve kayıt istemeyen bir platformdur.",
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
   "metin": "En önemli ayrım: kalıcı hak mı, geçmiş uygulama mı? Afet sonrasında kamuoyunda dolaşan bilgilerin büyük kısmı kalıcı mevzuat değil, o afete özgü idari kararlardır. 2023 depremlerinde uygulanan kredi ertelemeleri, KOSGEB destekleri, kira yardımı tutarları ve öğrenci kolaylıkları bunlara örnektir. Bunların yeni bir afette aynen tekrarlanacağının hiçbir garantisi yoktur. Bir platformun yapabileceği en zararlı hata, olmayan bir hakkı varmış gibi anlatmaktır. Bu yüzden her rehber iki etiketten biriyle işaretlenir: :tablo Doğrulama etiketlerinin anlamı Etiket Anlamı Kalıcı mevzuat Kanun, yönetmelik "
  },
  {
   "tur": "kurumsal",
   "turAd": "Kurumsal",
   "baslik": "Mahremiyet",
   "ozet": "Sunucu yok, hesap yok, analitik yok, çerez yok, dış istek yok. Girdiğiniz tarih ve kimlik bilgisi cihazınızdan çıkmaz; bu bir politika değil mimari karardır.",
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
   "metin": "Mimari karar Bu platform statik dosyalardan oluşur. Arka planda çalışan bir uygulama sunucusu veya veritabanı yoktur. Süre takvimine girdiğiniz tarihler, dilekçeye yazdığınız ad, T.C. kimlik numarası ve adres bilgisi yalnızca tarayıcınızın kendi yerel deposunda ( localStorage ) tutulur. Bu, \"verilerinizi korumaya söz veriyoruz\" demek değildir. Verilerinizi teknik olarak alamayacak şekilde kurulmuş olmak demektir. :tablo Yaygın uygulamalar ile bu platformun karşılaştırması Yaygın uygulama Bizde Kullanıcı hesabı, e posta ile giriş Yok Analitik (Google Analytics vb.) Yok Çerez Yok Dış kaynaklı ya"
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
   "ozet": "Proje açık kaynaktır. Hata bildirimi, mevzuat doğrulaması ve içerik katkısı en çok ihtiyaç duyulan üç alandır; nasıl katkı verileceği adım adım anlatılır.",
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
