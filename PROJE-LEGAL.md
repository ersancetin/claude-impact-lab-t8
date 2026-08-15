# Deprem Hakları Bilgilendirme Platformu — Hukuki Altyapı ve Ürün Tasarımı

**Ekip:** T8 — Hasar Tespiti
**Durum:** Araştırma ve vizyon dokümanı / taslak
**Son güncelleme:** 2026-08-15
**İlgili doküman:** [`PROJE.md`](./PROJE.md) — Afet Lojistik Koordinasyon Sistemi

---

## Doğruluk işaretleri

Bu doküman hukuki bir metindir; her bilginin doğrulama durumu açıkça işaretlenmiştir.

| İşaret | Anlamı |
|---|---|
| ✅ | Birden fazla kaynaktan doğrulandı |
| ⚠️ | Tek kaynak veya kaynaklar arasında çelişki var — **yayına almadan önce resmî metinden teyit edilmeli** |
| 🔴 | Ürünün hukuka uygunluğunu doğrudan etkileyen kritik konu |

> **Araştırma kısıtı — dürüst not:** Çalışma ortamının ağ politikası tüm resmî hukuk kaynaklarını **ağ katmanında** engelliyor: `mevzuat.gov.tr`, `resmigazete.gov.tr`, `dask.gov.tr`, `bedesten.adalet.gov.tr`, `karararama.yargitay.gov.tr`, `d.barobirlik.org.tr`, `webdosya.csb.gov.tr` — hepsi `CONNECT tunnel failed, response 403` veriyor.
>
> **Mevzuat MCP de bu ortamda çalışamaz.** `mevzuat-mcp` 0.3.0 paketi PyPI'dan indirilip incelendi; istemci **yalnızca** `https://www.mevzuat.gov.tr` ile konuşuyor (`BASE_URL`, `SEARCH_ENDPOINT`, `DOC/PDF_URL_TEMPLATE`). MCP kurulsa da her çağrı bağlantı hatası verir.
>
> Bu nedenle bilgiler **çoklu bağımsız kaynak teyidi** (web araması) ile derlendi. Madde numaraları ve hukuki çerçeve güvenilirdir; ancak **hiçbir madde, resmî metinden birebir doğrulanmadan yayına alınmamalıdır.**
>
> 👉 Doğrulama işi maddeye kadar planlandı ve ayrı bir dosyaya çıkarıldı: **[`DOGRULAMA.md`](./DOGRULAMA.md)** — 34 kalem, öncelik sırasına dizili, her biri için MCP çağrısı yazılmış durumda. Repoya ayrıca [`.mcp.json`](./.mcp.json) eklendi; ağ erişimi olan bir ortamda Claude Code repo kökünde açıldığında Mevzuat MCP otomatik devreye girer.

---

# BÖLÜM I — ÜRÜNÜN HUKUKA UYGUNLUĞU

## 1. 🔴 En kritik mesele: Avukatlık Kanunu m.35 (avukat tekeli)

Bu, projenin **en büyük hukuki riskidir ve ürün mimarisini baştan belirler.** Teknik tasarıma geçmeden önce çözülmesi gerekir.

**1136 sayılı Avukatlık Kanunu m.35** ✅ — "Kanun işlerinde ve hukuki meselelerde mütalaa vermek, mahkeme, hakem veya yargı yetkisini haiz bulunan diğer organlar huzurunda gerçek ve tüzel kişilere ait hakları dava etmek ve savunmak, adli işlemleri takip etmek, **bu işlere ait bütün evrakı düzenlemek** yalnız baroda yazılı avukatlara aittir."

Son cümle kritik: **"bu işlere ait bütün evrakı düzenlemek"** ifadesi dilekçe hazırlamayı kapsar. Avukatlık tekeli ayrıca m.63'te yaptırıma bağlanmıştır.

Bu soyut bir risk değil — **emsal olay mevcut:** İstanbul Barosu, yapay zekâ ile dilekçe hazırlayan bir uygulamaya karşı kamuoyu tepkisi göstermiş ve bu hizmetlerin "gerek Adalet Bakanlığı gerekse başkaca kişi veya kurumlar eliyle verilmesinin kanunen yasak" olduğunu ileri sürmüştür. ✅

### Bu ne anlama geliyor?

Ürünü olduğu gibi — "chatbot kullanıcının olayını dinler, hukuki değerlendirme yapar, dilekçesini yazar" — kurgularsak, m.35 ihlali iddiasıyla karşılaşma olasılığı yüksektir. Ekipte avukat bulunması bu riski **azaltmaz**, çünkü avukat tekeli avukatın kendi mesleki faaliyeti için tanınmıştır; bir yazılımın kitlesel biçimde dilekçe üretmesi ayrı bir tartışmadır ve ayrıca Reklam Yasağı Yönetmeliği'ni devreye sokar (bkz. Bölüm 2).

### Riski yöneten tasarım kararları

Bu üç ayrım, ürünü savunulabilir kılan asıl mimaridir:

**① "Hukuki bilgi" ile "hukuki tavsiye" arasına kesin sınır çekmek**

| Yapılabilir (bilgi) | Yapılmamalı (tavsiye) |
|---|---|
| "Hasar tespit raporuna itiraz süresi mahallî ilan tarihinden itibaren 30 gündür." | "Sizin durumunuzda itiraz etmelisiniz, kazanma şansınız yüksek." |
| "TBK m.478'e göre yüklenicinin ağır kusuru varsa zamanaşımı 20 yıldır." | "Sizin müteahhidiniz ağır kusurludur, dava açın." |
| "Bu durumda başvurulabilecek yollar şunlardır: A, B, C." | "Sizin için en iyisi B yoludur." |
| Mevzuat metnini ve süreyi kaynağıyla göstermek | Somut olayı hukuken nitelendirmek |

Sistem **kullanıcının olayını hukuken nitelendirmemeli**; yalnızca mevzuatı, süreleri ve prosedürü kaynağıyla aktarmalıdır. Bu, ansiklopedi ile danışmanlık arasındaki farktır — ve hukuken de savunulabilir olan taraftır.

**② Dilekçeyi "üretmek" yerine "boş şablon vermek"**

Serbest metin üreten bir LLM yerine, **kullanıcının kendi doldurduğu deterministik şablon** yaklaşımı hem hukuken daha güvenli hem de çıktı kalitesi olarak daha iyidir:

- Şablonlar **önceden avukat tarafından hazırlanır ve onaylanır** (LLM yazmaz).
- Kullanıcı form doldurur; sistem yalnızca **ad, tarih, adres, parsel no gibi alanları yerleştirir**.
- LLM'in görevi hukuki metin yazmak değil, **kullanıcıya hangi şablonun uygun olduğunu ve alanların ne anlama geldiğini anlatmaktır.**
- Çıktının başında sabit uyarı: *"Bu bir taslaktır, hukuki tavsiye değildir. İmzalamadan önce bir avukata danışın."*

Matbu dilekçe örneği dağıtmak Türkiye'de yerleşik ve yaygın bir uygulamadır (barolar, kamu kurumları, sivil toplum kuruluşları bunu yapar). Yapay zekânın olaya özgü hukuki metin üretmesi ise farklı bir alandır. **Bu ayrım, ürünün bel kemiğidir.**

**③ Baro ile ortaklık — en güçlü çözüm**

Projeyi bir **baro veya Türkiye Barolar Birliği ile ortaklaşa** yürütmek, m.35 riskini büyük ölçüde ortadan kaldırır ve içeriğe meşruiyet kazandırır. TBB'nin hazırladığı **"Depremzedeler İçin Hukuk Rehberi"** ✅ zaten bu alanda mevcut bir çalışmadır (ceza hukuku, özel hukuk, idare hukuku, vergi hukuku, sağlık hukuku ve adli yardım başlıklarını kapsar). Bu rehberi rakip görmek yerine **dijitalleştirilecek ve aranabilir hale getirilecek referans** olarak konumlamak, hem hukuken hem stratejik olarak doğru hamledir.

Ayrıca sistem, kullanıcıyı somut olayında **baronun adli yardım birimine yönlendirmelidir** — Avukatlık Kanunu m.176 vd. ve HMK m.334 vd. adli yardım kurumunu düzenler ✅. Ücretsiz avukat hakkı olan bir depremzedeye "işte dilekçen" demek yerine "işte adli yardım başvuru yolun" demek, hem hukuken güvenli hem kullanıcı için gerçekten daha faydalıdır.

---

## 2. 🔴 TBB Reklam Yasağı Yönetmeliği

Ekipte avukat varsa ve site avukatın adıyla/bürosuyla ilişkilendirilecekse, **TBB Reklam Yasağı Yönetmeliği** devreye girer. ✅

Yönetmelik avukatları, avukatlık ortaklıklarını, avukatlık bürolarını, stajyer avukatları ve dava vekillerini kapsar. Avukatın internet sitesi açması mümkündür; ancak sitede yer alabilecek bilgiler sınırlıdır (ad-soyad, akademik unvan, sicil numaraları, mesleğe başlama tarihi, mezun olunan üniversite, yabancı dil, büro adresi, iletişim bilgileri). **İş getirmeye yönelik yönlendirme ve reklam yasaktır.**

### Sonuç: tüzel yapı kararı ürünün ilk kararıdır

| Model | m.35 riski | Reklam yasağı riski | Değerlendirme |
|---|---|---|---|
| Avukat/büro adına ticari site | Yüksek | **Yüksek** | Önerilmez |
| Dernek / vakıf çatısı, kâr amacı gütmeyen | Orta | Düşük | Uygulanabilir |
| **Baro / TBB ortaklığı** | **Düşük** | **Düşük** | **En güçlü seçenek** |
| Üniversite / hukuk kliniği ortaklığı | Düşük | Düşük | Akademik meşruiyet sağlar |

Site **kâr amacı gütmemeli, reklam içermemeli, avukat yönlendirmesi yapmamalıdır.** "Şu avukatla görüşün" demek yerine "baronuzun adli yardım birimine başvurun" demelidir. Bu hem yasağı aşar hem etik olarak doğrudur.

---

## 3. KVKK ve veri mimarisi

Deprem sonrası hukuki danışma verileri **özel nitelikli kişisel veri** içerebilir (sağlık durumu, ölüm bilgisi, ceza soruşturması bilgisi). 6698 sayılı KVKK bakımından:

- **Varsayılan: hiçbir şey saklanmaz.** Chatbot oturumları kalıcı olarak tutulmamalı; dilekçe formu tarayıcıda doldurulmalı, sunucuya gönderilmemelidir. Bu hem KVKK yükünü sıfıra yaklaştırır hem de kullanıcı güvenini artırır.
- Zorunlu saklama varsa: açık rıza, aydınlatma metni, saklama süresi, VERBİS kaydı.
- 2023'te enkaz altındaki kişilerin ad ve telefon bilgileri kamuya açık listelerde dolaştı ve dolandırıcılıkta kullanıldı. Bu platform **aynı hatayı tekrarlamamalıdır.**
- Anonim kullanım mümkün olmalı — üyelik zorunluluğu konulmamalıdır.

---

# BÖLÜM II — HUKUKİ İÇERİK ALTYAPISI

## 4. Mevzuat haritası

Platformun içeriğinin dayanacağı temel mevzuat:

| Kanun / Düzenleme | No | Konu |
|---|---|---|
| Afet Sigortaları Kanunu | 6305 | Zorunlu deprem sigortası (DASK), teminat, zorunluluk |
| Zorunlu Deprem Sigortası Genel Şartları | — | DASK'ın kapsamı, istisnaları, tazminat usulü |
| Umumi Hayata Müessir Afetler Dolayısiyle Alınacak Tedbirlerle Yapılacak Yardımlara Dair Kanun | 7269 | Hasar tespiti, hak sahipliği, afet konutu |
| Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun | 6306 | Riskli yapı tespiti, kentsel dönüşüm, kira yardımı |
| Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkında Yönetmelik | — | Hak sahipliği usul ve esasları |
| Türk Borçlar Kanunu | 6098 | Eser sözleşmesi, ayıp, kira, haksız fiil |
| Türk Ceza Kanunu | 5237 | Taksirle öldürme, bilinçli taksir, imar kirliliği |
| Türk Medeni Kanunu | 4721 | Ölüm karinesi, gaiplik, miras |
| Kat Mülkiyeti Kanunu | 634 | Ana yapının harap olması, arsa payı, yeniden inşa |
| İmar Kanunu | 3194 | İmar planı, ruhsat, askı ve itiraz |
| Yapı Denetimi Hakkında Kanun | 4708 | Yapı denetim kuruluşunun sorumluluğu |
| Sigortacılık Kanunu | 5684 | Sigorta Tahkim Komisyonu (m.30) |
| Türk Ticaret Kanunu | 6102 | Sigorta sözleşmesi, zamanaşımı (m.1420) |
| İş Kanunu | 4857 | Zorlayıcı sebep, fesih, yarım ücret |
| İşsizlik Sigortası Kanunu | 4447 | Kısa çalışma ödeneği |
| Vergi Usul Kanunu | 213 | Mücbir sebep (m.13), terkin (m.115) |
| Nüfus Hizmetleri Kanunu | 5490 | Ölüm tutanağı, ölüm karinesi tescili (m.32) |
| İdari Yargılama Usulü Kanunu | 2577 | İdari başvuru, iptal ve tam yargı davası süreleri |
| Avukatlık Kanunu | 1136 | Avukat tekeli (m.35), adli yardım (m.176 vd.) |
| Bilgi Edinme Hakkı Kanunu | 4982 | Zemin etüdü, ruhsat, denetim raporlarını isteme |
| Kişisel Verilerin Korunması Kanunu | 6698 | Platformun veri işleme yükümlülüğü |

---

## 5. DEPREM ÖNCESİ HAKLAR

Platformun en çok değer üreteceği ama en az ilgi gören bölüm burasıdır. Deprem sonrası hakları anlatan çok kaynak var; **deprem öncesi ne yapılabileceğini anlatan neredeyse yok.**

### 5.1 Bina risk tespiti isteme hakkı — tek malik yeterli ✅

**6306 sayılı Kanun m.3/1:** Riskli yapı tespiti, **malik veya kanuni temsilcisi tarafından, masrafı kendisine ait olmak üzere**, Bakanlıkça lisanslandırılan kuruluşlara yaptırılır ve sonuç Bakanlığa veya İdareye bildirilir.

**Kritik ve az bilinen nokta:** Tespit için **diğer maliklerin onayı gerekmez.** Tek bir kat maliki, kendi masrafıyla tüm binanın risk tespitini yaptırabilir. Komşuları ikna edemeyen bir daire sahibinin elindeki en güçlü araç budur ve neredeyse hiç bilinmez.

- Tespit masrafı, sonradan hisseleri oranında maliklere dağıtılır. ⚠️
- Süre disiplini: tespit iki ay içinde tamamlanmazsa herhangi bir malikin talebiyle, altı ay içinde tamamlanmazsa Bakanlıkça re'sen kayıt silinebilir. ⚠️

### 5.2 Riskli yapı tespitine itiraz ✅

Riskli yapı tespitine, tebliğden itibaren **15 gün** içinde Bakanlığa itiraz edilebilir. İtiraz üzerine farklı bir teknik heyet yeniden inceleme yapar. Malik gibi **kiracı da** bu süreçte hak sahibidir.

### 5.3 İmar planlarına itiraz ✅

**3194 sayılı İmar Kanunu m.8/b:** Onaylanan imar planları, belediye başkanlığınca belirlenen ilan yerlerinde ve ilgili idarenin internet sayfasında eş zamanlı olarak **bir ay** süreyle ilan edilir. Bu bir aylık askı süresi içinde **yazılı olarak itiraz edilebilir**. Belediye meclisi veya valilik itirazları **on beş gün** içinde inceleyip kesin karara bağlar.

İtirazın reddi (veya zımnen reddi) üzerine 2577 sayılı Kanun uyarınca **60 gün** içinde iptal davası açılabilir. ✅

Bu, "yandaki boş araziye 15 katlı bina dikiliyor, zemin de kötü" diyen vatandaşın elindeki tek hukuki araçtır ve süresi kaçırıldığında geri dönüşü çok zorlaşır.

### 5.4 Bilgi edinme hakkı ⚠️

4982 sayılı Bilgi Edinme Hakkı Kanunu kapsamında ilgili idarelerden talep edilebilecek belgeler:

- Binanın **yapı ruhsatı ve yapı kullanma izin belgesi (iskân)**
- **Zemin etüdü raporu**
- **Yapı denetim kuruluşu raporları** (4708 sayılı Kanun kapsamındaki yapılar için)
- İmar durumu ve plan notları

Bu belgeler, hem deprem öncesi risk değerlendirmesi hem de deprem sonrası açılacak davalarda **delil** niteliğindedir. Depremden sonra bu belgelere ulaşmak çok daha zorlaşır — bu yüzden platform kullanıcıyı **şimdi** toplamaya teşvik etmelidir.

### 5.5 Zorunlu Deprem Sigortası yaptırma yükümlülüğü ✅

**6305 sayılı Kanun m.10** kapsamındaki binalar:

- Kat Mülkiyeti Kanunu kapsamındaki **bağımsız bölümler**
- Tapuya kayıtlı ve **özel mülkiyete tabi taşınmazlar üzerinde mesken olarak inşa edilmiş binalar**
- Bu binaların içindeki **ticarethane, büro ve benzeri amaçlarla kullanılan bağımsız bölümler**
- Doğal afetler nedeniyle **Devlet tarafından verilen veya sağlanan kredi ile yapılan meskenler**

**m.11:** Kapsamdaki bina ve bağımsız bölümlere ilişkin **su ve elektrik abonelik işlemlerinde** zorunlu deprem sigortasının varlığı ilgili kurumca kontrol edilir. Tapu işlemlerinde de aranır. ✅

### 5.6 🔴 DASK'sız binaya devlet konut yardımı yok ✅

**7269 sayılı Kanun m.29/8:** Zorunlu deprem sigortası bulunmayanlara Devlet **konut yardımı veya kredi ödemez.**

Bu, platformun en yüksek etkili tek mesajıdır. "DASK primi 500 lira, ödemesem ne olur?" diyen bir vatandaşa verilecek cevap "ceza kesilir" değil, **"binanız yıkılırsa devletten afet konutu ve kredi alamazsınız"**dır. Ana sayfada bu bilgi öne çıkarılmalıdır.

### 5.7 Deprem yönetmeliği kuşakları ⚠️

Bina yaşı, dayanıklılık hakkında kaba ama anlamlı bir göstergedir. Türkiye'de yürürlüğe girmiş başlıca deprem yönetmelikleri:

| Dönem | Yönetmelik | Resmî Gazete | Durum |
|---|---|---|---|
| 1975 | Afet Bölgelerinde Yapılacak Yapılar Hakkında Yönetmelik (ABYYHY) | — | ⚠️ RG tarihi gerekli |
| 1998 | ABYYHY (kapsamlı revizyon) | — | ⚠️ RG tarihi gerekli |
| 2007 | Deprem Bölgelerinde Yapılacak Binalar Hakkında Yönetmelik (DBYBHY) | — | ⚠️ RG tarihi gerekli |
| **2018** | **Türkiye Bina Deprem Yönetmeliği (TBDY)** | **18.03.2018 / 30364 (Mükerrer)** — yürürlük **01.01.2019** | ✅ doğrulandı |

TBDY 2018, DBYBHY 2007'yi yürürlükten kaldırmıştır. Amacı, yeni yapılacak/değiştirilecek/büyütülecek kamu ve özel binaların depreme dayanıklı tasarımı ile **mevcut binaların deprem etkisi altında değerlendirilmesi ve güçlendirilmesi** için gerekli kuralları belirlemektir. ✅

Ayrıca **4708 sayılı Yapı Denetimi Hakkında Kanun** 2001'de kabul edilmiş, zorunlu yapı denetimi kademeli olarak yaygınlaştırılmıştır. **2001 öncesi yapılar bu denetimden geçmemiştir** — testin en ayırt edici sorularından biri budur.

> ⚠️ Bu tablo "Güvende miyim?" testinin çekirdeğidir; kalan üç yönetmeliğin RG tarihleri doğrulanmalıdır (bkz. `DOGRULAMA.md` § E).

### 5.8 🔴 İmar barışı / Yapı Kayıt Belgesi — milyonlarca binayı ilgilendiren yanılgı ⚠️

**3194 sayılı İmar Kanunu geçici m.16** (7143 s.K. m.16 ile eklenmiştir, 11.05.2018): 31.12.2017'den önce yapılmış ruhsatsız veya ruhsata aykırı yapılar için, 31.10.2018'e kadar başvurup 31.12.2018'e kadar bedelini ödeyenlere **Yapı Kayıt Belgesi** verilmiştir.

**Kritik ve yaygın biçimde yanlış bilinen nokta:**

> **Yapı Kayıt Belgesi, binanın depreme dayanıklı olduğunu göstermez ve maliki sorumluluktan kurtarmaz.** Düzenleme, **binanın depreme dayanıklılığı konusundaki sorumluluğu açıkça malike yüklemektedir.** Belge yapıyı imar mevzuatına uygun hale getirmez; yalnızca mevcut kullanımına geçici bir hukuki statü tanır.

Ayrıca basit tamir ve bakım sınırlarını aşan esaslı onarım yapılması hâlinde belge geçerliliğini yitirir. ⚠️

Bu, platformun anlatması gereken en yüksek etkili uyarılardan biridir: "İmar barışından yararlandım, binam artık yasal" diyen bir kullanıcı, hem deprem güvenliği hem hukuki sorumluluk bakımından yanılmaktadır.

---

## 6. ZORUNLU DEPREM SİGORTASI (DASK) — DETAYLI

### 6.1 Neyi teminat altına alır? ✅

**Zorunlu Deprem Sigortası Genel Şartları A.1:** Sigorta, **depremin doğrudan neden olduğu maddi zararlar** ile deprem nedeniyle ortaya çıkan **yangın, infilak, dev dalga (tsunami) ve yer kayması** sonucu binada meydana gelen maddi zararları teminat altına alır.

Teminat kapsamındaki bina unsurları: temeller, ana duvarlar, bağımsız bölümleri ayıran ortak duvarlar, tavan ve tabanlar, merdivenler, asansörler, sahanlıklar, koridorlar, çatılar, bacalar ve yapının benzer nitelikteki tamamlayıcı kısımları. ⚠️

### 6.2 🔴 Neyi teminat altına ALMAZ? — Genel Şartlar A.3 ✅

Bu liste kullanıcı beklentisi ile gerçeklik arasındaki en büyük uçurumdur ve platformun **en çok değer üreteceği tek içerik parçasıdır.**

DASK teminatı dışındadır:

- ❌ **Enkaz kaldırma masrafları**
- ❌ **Kâr kaybı, iş durması, kira mahrumiyeti**
- ❌ **Alternatif ikametgâh ve işyeri masrafları**
- ❌ **Mali sorumluluklar ve benzeri dolaylı zararlar**
- ❌ **Her türlü taşınır mal, eşya ve benzerleri** (mobilya, beyaz eşya, elektronik — hiçbiri kapsamda değildir)
- ❌ **Ölüm dâhil olmak üzere tüm bedeni zararlar**
- ❌ **Manevi tazminat talepleri**
- ❌ Deprem ve deprem sonucu oluşan yangın, infilak, tsunami veya yer kaymasının **dışında kalan hasarlar**
- ❌ Belirli bir deprem hadisesine bağlı olmaksızın **binanın kendi kusur ve özellikleri nedeniyle zamanla oluşan zararlar**

> **Kullanıcıya net cümle:** *"DASK binanızı sigortalar, hayatınızı değil. Eşyanız, canınız, kiranız ve enkaz masrafınız DASK kapsamında değildir."*

### 6.3 Hangi binalar kapsam dışıdır? — Genel Şartlar A.2 ✅

- Kamu hizmet binası olarak kullanılan binalar
- Köy yerleşik alanlarındaki binalar
- **Tamamı** ticari veya sınai amaçla kullanılan binalar
- **Projesi bulunmayan ve mühendislik hizmeti görmemiş binalar**
- Taşıyıcı sistemi olumsuz yönde etkileyecek şekilde **tadil edilmiş binalar**
- Yetkili kamu kurumları tarafından **yıkılmasına karar verilen** binalar ile metruk, bakımsız veya harap binalar

⚠️ **Uyarı içeriği:** "Kolon kestirdim" veya "taşıyıcı duvarı kaldırdım" diyen bir kullanıcının poliçesi hasar anında geçersiz sayılabilir. Bu, tadilat yapan herkese gösterilmesi gereken bir uyarıdır.

### 6.4 Sigorta bedeli ve azami teminat ⚠️

Sigorta bedeli, **yapı tarzına göre belirlenen metrekare birim bedeli × binanın brüt yüzölçümü** formülüyle hesaplanır.

| Parametre (01.05.2026 itibarıyla) | Değer |
|---|---|
| Çelik / betonarme / karkas yapılar m² bedeli | 10.714 TL ⚠️ |
| Diğer yapılar m² bedeli | 7.142 TL ⚠️ |
| Bir mesken için azami teminat tutarı | **2.271.283 TL** ⚠️ |

#### 🔴 Azami teminat **aylık** güncelleniyor — ürünü belirleyen bulgu

İlk araştırmada çıkan üç farklı 2026 rakamı bir çelişki değil; **tutarın yıl içinde defalarca güncellendiğinin kanıtı.** Doğrulama sonrası tablo:

| Dönem | Azami teminat |
|---|---|
| 2024 | 1.272.000 TL |
| 2025 | 1.704.162 TL |
| 2026 (yıl başı tarifesi) | 2.095.462 TL |
| **01.05.2026** | **2.271.283 TL** |
| 2026 (sonraki dönem) | 2.407.723 TL |

DASK'ın resmî tarife tablosunda 2026 için **ocak–haziran değerleri ayrı ayrı** yayımlanmıştır. ⚠️

> **Ürün sonucu — pazarlıksız kural:** Bu tutarı bir içerik sayfasına yazmak, o sayfayı **bir ay içinde yanlış** hâle getirir. Değer, tarih damgalı ve sürümlü bir yapılandırma dosyasından okunmalı; "Sigortam yeterli mi?" testi kullanıcıya **hangi tarihli tarifeyle** hesap yaptığını açıkça göstermelidir. Bu, Bölüm 15.2'deki "parametrik değerler metne gömülmez" kuralının somut gerekçesidir.

**Örnek hesap:** 100 m² betonarme konut → 100 × 10.714 = **1.071.400 TL** sigorta bedeli. Bu tutar azami teminatın altında olduğundan doğrudan geçerlidir. ⚠️

### 6.5 🔴 Muafiyet: %2 tenzili muafiyet ve 72 saat kuralı ✅

Her bir hasarda **sigorta bedelinin %2'si oranında tenzili muafiyet** uygulanır. DASK, hasarın bu şekilde bulunan muafiyet miktarını **aşan kısmından** sorumludur.

**Muafiyet uygulaması açısından her bir 72 saatlik dönem bir hasar sayılır.**

Bu iki kural birlikte, kullanıcıların en çok yanıldığı noktadır:

- 1.071.400 TL sigorta bedelli bir konutta muafiyet = **21.428 TL**. Bu tutarın altındaki hasarlar için ödeme yapılmaz.
- **72 saat kuralı depremzedenin lehinedir:** 6 Şubat 2023'teki gibi 9 saat arayla iki büyük deprem olduğunda, ikisi tek hasar sayılır ve muafiyet **bir kez** uygulanır. Ayrı sayılsaydı muafiyet iki kez düşülecekti.

### 6.6 Hasar ihbarı ve tazminat süreci

| Aşama | Süre / Usul | Durum |
|---|---|---|
| Hasar ihbarı | Rizikoyu öğrenme tarihinden itibaren **15 gün** (Genel Şartlar B.1) | ⚠️ |
| İhbar kanalları | ALO DASK **125**, DASK web sitesi "Online Hasar İşlemleri", poliçeyi düzenleyen sigorta şirketi, **e-Devlet** | ✅ |
| Eksper incelemesi | DASK hasar tespit görevlileri / sigorta eksperleri yerinde inceleme yapar, hasar tespit raporu düzenlenir | ✅ |
| Tazminat ödemesi | Belgelerin tamamlanmasından sonra **en geç 15 gün** içinde ödeme; ödenmezse DASK temerrüde düşer ve **faiz** talep edilebilir | ⚠️ |

> ⚠️ **Ödeme süresi tek kaynaktan alınmıştır. Genel Şartlar'ın B bölümünden birebir teyit edilmelidir** — bu süre, temerrüt faizi talebinin dayanağı olduğu için hata payı taşıyamaz.

### 6.7 Zamanaşımı ⚠️

**TTK m.1420:** Sigorta sözleşmesinden doğan bütün istemler, alacağın **muaccel olduğu tarihten itibaren iki yıl** geçmekle zamanaşımına uğrar. Sigorta tazminatına ve sigorta bedeline ilişkin istemler **her hâlde rizikonun gerçekleştiği tarihten itibaren altı yıl** geçmekle zamanaşımına uğrar.

- Süre, hasar tespit raporunun tebliği veya DASK'ın ret bildiriminin tebliğinden itibaren işlemeye başlar. ⚠️
- Sigortacıya yapılan **yazılı başvuru**, cevap verilinceye kadar zamanaşımını durdurur. ⚠️

> **Ürün açısından:** Zamanaşımı, kullanıcının hakkını tamamen kaybetmesine yol açan tek mekanizmadır. Platformun **"süre hesaplayıcı"** aracı, en yüksek pratik değeri üreten özelliktir.

### 6.8 Eksik ödeme / bakiye tazminat

DASK'ın ödediği tutar gerçek hasarın altındaysa **bakiye tazminat** talep edilebilir. 6 Şubat depremleri sonrasında bu yönde emsal kararlar oluşmuştur ⚠️. İzlenecek yol Bölüm 8'de.

---

## 7. KONUT SİGORTASI (İHTİYARİ) — DASK'IN BIRAKTIĞI BOŞLUK

DASK zorunlu ve sınırlı, konut sigortası isteğe bağlı ve geniştir. İkisi **birbirinin alternatifi değil, tamamlayıcısıdır.** ✅

| Konu | DASK | Konut sigortası (deprem ek teminatlı) |
|---|---|---|
| Zorunluluk | Zorunlu | İsteğe bağlı |
| Bina hasarı | ✅ (azami teminata kadar) | ✅ (DASK limiti üstü) |
| Eşya / taşınır mal | ❌ | ✅ (poliçeye göre) |
| Enkaz kaldırma | ❌ | ✅ (ek teminat olarak seçilebilir) |
| Kira mahrumiyeti / alternatif konut | ❌ | ✅ (poliçeye göre) |
| Bedeni zararlar, ölüm | ❌ | Ferdi kaza teminatı ile kısmen |
| Teminat üst sınırı | Azami teminat tutarı ile sınırlı | Poliçede belirlenen bedel |

**İşleyiş sırası:** Önce DASK devreye girer ve limitine kadar öder; **DASK limitini aşan kısım** konut paket poliçesinin deprem teminatından karşılanır. ✅

### 7.1 🔴 Eksik sigorta (sub-insurance) tuzağı ✅

Sigorta bedeli, malın gerçek değerinden düşük belirlenmişse **eksik sigorta** söz konusu olur ve sigortacı, **sigorta bedelinin gerçek değere oranı ölçüsünde orantılı** ödeme yapar.

**Somut örnek:** Gerçek değeri 4.000.000 TL olan konutu 2.000.000 TL üzerinden sigortalatan kişi, 1.000.000 TL hasarda tam değil, oran gereği **500.000 TL** tazminat alır.

Bu, poliçesi olduğu için kendini güvende sanan kullanıcıların **en sık düştüğü tuzaktır** ve "Tam koruma altında mıyım?" testinin ana sorularından biri olmalıdır.

---

## 8. UYUŞMAZLIK ÇÖZÜM YOLLARI

### 8.1 🔴 Zorunlu ilk adım: sigorta şirketine yazılı başvuru ✅

**5684 sayılı Sigortacılık Kanunu m.30:** Tüm sigorta branşları için, Sigorta Tahkim Komisyonu'na gitmeden önce **sigorta kuruluşuna yazılı başvuru yapılması zorunludur** ve bu bir **dava/başvuru şartıdır.**

Doğrudan Tahkim Komisyonu'na veya mahkemeye gitmek, başvurunun/davanın usulden reddine yol açar. **Bu, platformun kullanıcıya vereceği en kritik prosedürel bilgidir** ve dilekçe şablonlarının ilki bu yazılı başvuru olmalıdır.

### 8.2 Sigorta Tahkim Komisyonu ✅

- **Dayanak:** 5684 sayılı Kanun m.30, Türkiye Sigorta ve Reasürans Şirketleri Birliği nezdinde kurulmuştur.
- **Zorunlu sigortalarda (DASK, trafik) sigorta şirketinin Komisyon'a üye olması şartı aranmaz** — yani DASK uyuşmazlıkları her hâlde Komisyon'a taşınabilir. Bu önemli bir avantajdır.
- Başvurular önce **raportörler** tarafından incelenir; çözülemeyenler bağımsız **sigorta hakemlerine** iletilir.
- **m.30/14:** Mahkemeye veya Tüketici Hakem Heyetine intikal etmiş uyuşmazlıklar için Komisyon'a başvurulamaz. **Yol seçimi geri dönüşsüzdür** — kullanıcıya bu açıkça anlatılmalıdır.
- Mahkemeye kıyasla daha hızlı ve düşük maliyetlidir.
- İtiraz, **üç kişilik itiraz hakem heyeti** tarafından **iki ay** içinde karara bağlanır; itiraz süresi kararın bildiriminden itibaren **10 gün** ve bir defaya mahsustur. ⚠️

#### 🔴 Parasal sınırlar — her yıl değişir, metne yazılmaz

| Eşik (22.01.2026 itibarıyla) | Tutar |
|---|---|
| **Kesinlik sınırı** — hakem kararına itiraz edilemez | 35.000 TL altı ⚠️ |
| **İtiraz sınırı** — Komisyon nezdinde itiraz | 35.000 TL ve üzeri ⚠️ |
| **Üç kişilik hakem heyeti** zorunluluğu | 122.000 TL ve üzeri ⚠️ |
| **Yargıtay temyiz sınırı** | 383.000 TL üzeri ⚠️ |

> **Uyarı:** Kanun metnindeki **5.000 TL** rakamı 2007 tarihli orijinal hâldir ve her yıl yeniden değerleme oranında artar. Hiçbir içerikte bu rakam kullanılmamalıdır.
>
> **Hangi tarihin sınırı uygulanır?** İtiraz ve temyizde **kararın verildiği tarihteki**, hakem heyeti teşekkülünde **zorunlu hâle geldiği tarihteki** sınır esas alınır. ⚠️
>
> 🔴 Kaynaklar kesinlik sınırında 35.000/28.000 TL, temyizde 383.000/300.000 TL olarak çelişmektedir — resmî duyurudan teyit zorunludur.

### 8.3 Hasar tespit raporuna itiraz ✅

Bu, DASK sürecinden **ayrı** bir süreçtir ve karıştırılmaması gerekir. Devletin yaptığı hasar tespiti (az hasarlı / orta hasarlı / ağır hasarlı / yıkık) hak sahipliğini, yıkım kararını ve devlet desteklerini belirler.

| Konu | Bilgi | Durum |
|---|---|---|
| İtiraz süresi | Fen kurullarınca düzenlenen teknik hasar tespit raporlarına **mahallî ilan tarihinden itibaren 30 gün** | ✅ |
| İlan süresi | Raporlar 30 gün süreyle askıda/ilanda kalır | ✅ |
| Başvuru yeri | İl Çevre ve Şehircilik Müdürlükleri, Valilikler, Kaymakamlıklar veya afet bölgesi ilan edilen yerlerdeki Hasar Tespit İtiraz ve Koordinasyon Merkezleri | ✅ |
| Sonrası | **İtiraz üzerine yapılan hasar tespiti kesindir**; idari yolla yeniden tespit yapılmaz | ✅ |
| Yargı yolu | Kesin tespitten sonra **idari yargıda** dava açılabilir | ✅ |
| Koordinasyon | Hasar tespit çalışmaları AFAD adına Çevre, Şehircilik ve İklim Değişikliği Bakanlığı/İl Müdürlükleri koordinasyonunda yürütülür | ✅ |

> 🔴 **30 günlük süre kaçırılırsa idari itiraz hakkı tümüyle kaybedilir.** Platformun geri sayım/hatırlatma özelliği en çok burada işe yarar.

### 8.4 Hak sahipliği (7269 sayılı Kanun) ✅

| Konu | Bilgi |
|---|---|
| Başvuru süresi | İlanın yapıldığı günden itibaren **iki ay** içinde |
| Başvuru mercii | Mahallin en büyük **mülkiye amirine** |
| Başvuru şekli | **Yazılı talep ve taahhütname** |
| Ret hâlinde | Durum yazılı olarak tebliğ edilir; tebliğden itibaren **15 gün** içinde itiraz edilebilir |
| İdari başvuruya cevap verilmezse | 30 gün içinde cevap verilmemesi hâlinde **zımnen ret** sayılır; **60 günlük** dava açma süresi bu 30 günün bitiminden itibaren işler (2577 s.K. m.10-11) |

### 8.5 İdari yargı süreleri — özet ⚠️

| Dava türü | Süre |
|---|---|
| İptal davası | İşlemin tebliğinden itibaren **60 gün** |
| İdari başvuru sonrası | Ret veya zımni ret tarihinden itibaren **60 gün** |
| Tam yargı (tazminat) davası — idari eylemlerde | Eylemi öğrenmeden itibaren **1 yıl**, her hâlde eylem tarihinden itibaren **5 yıl** içinde önce idareye başvuru; reddi hâlinde dava (2577 s.K. m.13) |

---

## 9. SORUMLULUK VE TAZMİNAT DAVALARI

### 9.1 Müteahhidin hukuki sorumluluğu — TBK m.474-478 ✅

Yüklenicinin temel borcu, yapıyı **sözleşmeye, imar mevzuatına ve deprem yönetmeliğine uygun, eksiksiz ve ayıpsız** teslim etmektir. **Hukuken, bir binanın depremde yıkılması ayıplı ifa sayılır.**

**Açık ayıp / gizli ayıp ayrımı:** Açık ayıp teslim anında basit incelemeyle görülebilen, gizli ayıp ise sonradan kullanım veya dış etken (deprem gibi) ile ortaya çıkan ayıptır. **Depremde yıkılan binalardaki ayıplar hemen her zaman gizli ayıptır.**

**Zamanaşımı (teslim tarihinden itibaren):**

| Durum | Süre |
|---|---|
| Taşınmaz yapı dışındaki eserler | 2 yıl |
| **Taşınmaz yapılar** | **5 yıl** |
| **Yüklenicinin ağır kusuru varsa** (eserin niteliğine bakılmaksızın) | **20 yıl** (TBK m.478) |

**Ağır kusur örnekleri:** statik projeden sapma, **demir eksiltme**, **beton sınıfı düşürme**, kolon kesme. Deprem davalarının neredeyse tamamı bu 20 yıllık süreye dayanır — çünkü 5 yıllık süre çoğu binada çoktan dolmuştur. Ayıbın hile ile gizlenmesi hâlinde de süre 20 yıla uzar.

### 9.2 Müteahhidin cezai sorumluluğu ✅

| Suç / kurum | Madde | İçerik |
|---|---|---|
| Taksirle ölüme neden olma | **TCK m.85/1** | 2 yıldan 6 yıla kadar hapis |
| Birden fazla ölüm veya ölüm + yaralanma | **TCK m.85/2** | **2 yıldan 15 yıla kadar** hapis |
| Bilinçli taksir | **TCK m.22/3** | Neticeyi öngörmesine rağmen istememe — ceza **üçte birden yarısına kadar artırılır** |
| Dava zamanaşımı | **TCK m.66** | TCK m.85/1 ve 85/2 için **15 yıl** ⚠️ |

Müteahhidin özen ve dikkat yükümlülüğüne aykırı davranarak başkalarının ölümüne sebebiyet vermesi "taksirle ölüme neden olma" suçunu oluşturur. Doktrinde ve uygulamada, bilinen deprem riskine rağmen bilinçli olarak eksik malzeme kullanılması hâlinde **olası kast** tartışması da yapılmaktadır. ⚠️

> ⚠️ Zamanaşımının başlangıç anı (**inşaatın tamamlanması mı, yıkımın gerçekleşmesi mi**) doktrinde tartışmalıdır; kaynaklar yıkım tarihini esas alan görüşü aktarmaktadır. Bu, davanın kaderini belirleyen bir noktadır ve içerikte **tartışmalı olduğu belirtilerek** sunulmalıdır.

Ayrıca **TCK m.184 (imar kirliliğine neden olma)** ruhsatsız veya ruhsata aykırı yapı bakımından gündeme gelir. ⚠️

### 9.3 Yapı denetim kuruluşunun sorumluluğu ⚠️

**4708 sayılı Yapı Denetimi Hakkında Kanun**, yapı denetim kuruluşlarının ve denetçi mimar/mühendislerin sorumluluğunu düzenler. Kuruluş, denetim görevini gereği gibi yerine getirmemesinden doğan zararlardan sorumludur; sorumluluk hem hukuki hem cezai boyut taşır. Kanun 2001 tarihlidir; öncesinde yapılan binalar bu denetimden geçmemiştir.

**m.9 — Cezai sorumluluk:** Yapı denetim kuruluşunun ortakları, yöneticileri, mimar ve mühendisleri, yapı müteahhitleri, proje müellifleri ve laboratuvar görevlilerinden görevini ihmal eden veya yetkisini kötüye kullananlar hakkında cezai hüküm uygulanır. Ruhsat aşamasında **sahte belge** düzenlendiği sonradan anlaşılırsa izin derhal iptal edilir. Bu madde uyarınca verilen cezalar **paraya çevrilemez ve ertelenemez.** ⚠️

> 🔴 **Güncellik şüphesi:** Erişilebilen metin, görevi ihmal ve yetkiyi kötüye kullanma bakımından **765 sayılı (mülga) Türk Ceza Kanunu'na** atıf yapıyor. Bu, 2001 tarihli **orijinal** metin olabilir; 5237 sayılı TCK'nın yürürlüğe girmesiyle maddenin değişmiş olması kuvvetle muhtemeldir. **Yürürlükteki hâli doğrulanmadan bu madde içerikte kullanılmamalıdır** (`DOGRULAMA.md` § C7). Bu örnek, ikincil kaynaklara güvenmenin neden yeterli olmadığını iyi gösteriyor.

### 9.4 İdarenin sorumluluğu — tam yargı davası ✅

Deprem nedeniyle açılan tam yargı davaları **idarenin hizmet kusuru sorumluluğuna** dayanır.

**Sorumluluğu tartışılan idareler ve gerekçeleri:**

| İdare | Gerekçe |
|---|---|
| **Belediyeler** | İmar, ruhsat, iskân ve denetim kusurları |
| **Çevre, Şehircilik ve İklim Değişikliği Bakanlığı** | Yapı denetim sisteminin gözetimi, afet risk yönetimi, imar politikalarındaki eksiklikler |
| **TOKİ** | Kamu kaynaklı konutların projelendirilmesi, arazi tahsisi, ihale, yapım ve denetim süreçlerindeki yetersizlikler |
| **İçişleri Bakanlığı / AFAD** | Afet öncesi hazırlık, önleme, arama-kurtarma, müdahale ve koordinasyon eksiklikleri |

**🔴 Kilit içtihadi ilke:** *Deprem kuşağında bulunan, daha önce deprem yaşanmış veya deprem riski yüksek olan bölgelerde **deprem mücbir sebep sayılamaz.*** Bu, idarenin "doğal afet, elimden bir şey gelmezdi" savunmasını kıran temel argümandır ve platformun anlatması gereken en önemli hukuki fikirdir.

İdarenin sorumluluğu değerlendirilirken bakılan ölçütler: yapının bulunduğu **zeminin özelliği**, zemin durumuna göre depreme dayanıklılığın kontrol edilip edilmediği, **yapı kullanma izninin** bulunup bulunmadığı, imar planları ve inşaat ruhsatlarının hangi idarelerce verildiği, yapıların imar açısından denetlenip denetlenmediği, afet bölgelerinin tespit ve ilan edilip edilmediği, idarece gerekli önlemlerin alınıp alınmadığı. ✅

---

## 10. GÜNDELİK HAYATA İLİŞKİN HAKLAR

### 10.1 İş hukuku ✅

| Konu | Dayanak | İçerik |
|---|---|---|
| İşçinin haklı nedenle derhal feshi | **4857 s.K. m.24/III** | İşyerinde bir haftadan fazla süre işin durmasını gerektirecek zorlayıcı sebeplerin ortaya çıkması |
| İşverenin haklı nedenle derhal feshi | **4857 s.K. m.25/III** | İşçiyi işyerinde bir haftadan fazla süre ile çalışmaktan alıkoyan zorlayıcı sebep |
| **Yarım ücret** | **4857 s.K. m.40** | Zorlayıcı sebeplerle çalışılamayan **bir haftaya kadar** olan süre için işveren yarım ücret öder |
| Kısa çalışma ödeneği | **4447 s.K. ek m.2** ⚠️ | Zorlayıcı sebeple faaliyetin tamamen/kısmen durması veya haftalık çalışma sürelerinin önemli ölçüde azalması hâlinde |

Deprem, sel, kar gibi doğal olaylar nedeniyle ulaşımın kesilmesi zorlayıcı neden sayılır. ✅

### 10.2 Kira hukuku ✅

- **TBK m.331 — Önemli sebeple olağanüstü fesih:** Taraflardan biri için kira ilişkisinin sürdürülmesini çekilmez hâle getiren önemli sebeplerin varlığında, yasal fesih bildirim süresine uyulmak koşuluyla sözleşme her zaman feshedilebilir. Deprem gibi doğal afetler ve **ağır hasarlı bina**, kiracı bakımından önemli sebep oluşturabilir. Feshin parasal sonuçlarını hâkim durumun özelliğine göre takdir eder.
- **Kiralanan tamamen yıkılmışsa** ifa imkânsızlığı gündeme gelir; sözleşme kendiliğinden sona erer. ⚠️
- Kira ödeme borcu, taşınmazın kiraya verene **fiilen iade edildiği tarihe** kadar devam eder. ⚠️
- Hasarlı ama kullanılabilir taşınmazda **ayıp hükümleri** (TBK m.305 vd.) devreye girer: kira bedelinde indirim, onarım talebi, koşulları varsa fesih. ⚠️
- **6306 kapsamında kira yardımı:** Riskli yapıda oturan kiracılar da Bakanlıktan kira yardımı talep edebilir; süre **18 aya kadar** uzayabilir, tutar Bakanlıkça yıllık güncellenir (TÜİK TÜFE'ye göre). Kiracılara maliklere yapılan aylık yardımın **iki katı tutarında bir defaya mahsus** yardım yapıldığı belirtilmektedir. ⚠️

### 10.3 Miras ve kişi hukuku ✅

| Kurum | Dayanak | İçerik |
|---|---|---|
| **Ölüm karinesi** | **TMK m.31** | "Bir kimse, ölümüne kesin gözle bakılmayı gerektiren durumlar içinde kaybolursa, cesedi bulunamamış olsa bile gerçekten ölmüş sayılır." Yıkılan bina altında kalıp cesedine ulaşılamayan kişi tipik örnektir. |
| **Nüfusa tescil** | **5490 s.K. m.32** | Müracaat edilen yerin **mülkî idare amirinin emri** ile ölüm tutanağı düzenlenerek ölüm olayı işlenir. Başvurabilecekler: altsoy, üstsoy ve kardeşler; bunlar yoksa mirasçılar. |
| **Gaiplik** | **TMK m.32 vd.** | Yalnızca **sulh hukuk mahkemesi** kararıyla; belirli sürelerin geçmesi gerekir |
| **Birlikte ölüm karinesi** | **TMK m.29** ⚠️ | Ölenlerden hangisinin önce öldüğü ispat edilemezse, hepsi **aynı anda** ölmüş sayılır — aynı enkazda ölen aile bireylerinin mirasında belirleyicidir |

**Ölüm karinesi ile gaiplik farkı — pratikte en önemli bilgi:** Ölüm karinesi **idari bir kararla** (vali/kaymakam) nüfus kütüğüne işlenir ve **süre şartı yoktur**; gaiplik ise **mahkeme kararı** gerektirir ve süre bekler. Ölüm karinesine dayalı tescil, gerçekten ölmüş olmanın tüm hukuki sonuçlarını doğurur: **miras hemen açılır.** ✅

Bu ayrım, aylarca "kayıp" statüsünde bekleyip miras, sigorta ve banka işlemlerini yapamayan ailelere doğrudan çözüm sunar.

### 10.4 Vergi hukuku ✅

- **VUK m.13 — Mücbir sebep:** Yangın, **yer sarsıntısı (deprem)**, su basması gibi afetler vergi ödevlerinin yerine getirilmesine engel olan mücbir sebep hâlleri arasındadır. Mücbir sebep süresince **süreler işlemez** (VUK m.15).
- **Emsal uygulama:** 6 Şubat 2023 depremlerinin ardından Hazine ve Maliye Bakanlığı, Adana, Adıyaman, Diyarbakır, Gaziantep, Hatay, Kahramanmaraş, Kilis, Malatya, Osmaniye, Elâzığ ve Şanlıurfa illerinde deprem tarihinden **31 Temmuz 2023**'e kadar mücbir sebep hâli ilan etmiştir. ✅
- **VUK m.115 — Terkin:** Yangın, yer sarsıntısı, yer kayması, su basması, kuraklık, don, zararlı hayvan ve haşere istilası gibi afetler yüzünden **varlıklarının veya mahsullerinin en az üçte birini kaybedenlerin**, afete uğrayan gelir kaynakları ile ilgili kamu borçları **Cumhurbaşkanı kararıyla kısmen veya tamamen terkin edilebilir.** ✅
- Yıkılan veya ağır hasarlı binalarda **emlak vergisi mükellefiyeti** açısından ayrı bir değerlendirme gerekir. ⚠️

### 10.5 🔴 Ölüm hâlinde sigorta ve sosyal güvenlik hakları

DASK ölümü karşılamaz (Bölüm 6.2). Bedeni zararların karşılığı **başka** poliçelerdedir ve bu ayrım hiç bilinmez.

| Kaynak | İçerik | Durum |
|---|---|---|
| **Hayat sigortası** | Vefat teminatı ödenir. Ödeme için kişinin **vefat etmiş** ya da **gaiplik kararı** çıkarılmış olması gerekir — ölüm karinesi tescili (TMK m.31 / 5490 m.32) burada kritik hızlandırıcıdır | ⚠️ |
| **Ferdi kaza sigortası** | 🔴 **Aksi sözleşmeyle kararlaştırılmadıkça deprem teminat dışıdır.** Poliçede deprem teminatının seçilip seçilmediği mutlaka kontrol edilmelidir | ⚠️ |
| **SGK ölüm (dul-yetim) aylığı** | 4/a kapsamında **en az 5 yıl sigortalılık + 900 prim günü** koşuluyla hak sahiplerine bağlanır. Başvuru: e-Devlet "Gelir, Aylık, Ödenek Talep Belgesinin Verilmesi" | ⚠️ |
| **İş kazası tartışması** | Deprem sırasında iş yerinde ölüm hâlinde olayın iş kazası sayılıp sayılmayacağı — sayılırsa prim gün şartları farklılaşır | ⚠️ tartışmalı |
| **BES birikimleri** | Bireysel emeklilik birikimlerine erişim ve intikal usulü | ⚠️ |

> **Ürün notu:** Ferdi kaza poliçesindeki deprem istisnası, "sigortam var" diyen kullanıcının en büyük yanılgısıdır. "Sigortam yeterli mi?" testinin bir sorusu bunu kontrol etmelidir.

### 10.6 Hasarlı binadan eşya alma ve yıkım kararı ✅

| Bina durumu | Kural |
|---|---|
| **"Yıkık" ve "acil yıktırılacak yapı"** | Kısa süreliğine dahi **girmek ve eşya almak kesinlikle yasaktır** |
| **Ağır hasarlı** | Giriş ve eşya alımı, Bakanlıkça görevlendirilen **uzmanların raporu** doğrultusunda değerlendirilir; tahliye, yerel afet tahliye ve planlama grubu **gözetiminde** yapılır |

Ağır hasarlı yapılarda eşya tahliyesi, **30 günlük itiraz süresine bağlanmıştır**: hasar durumuna itiraz etmeyecek vatandaşların eşya alımı, uzmanlarca oluşturulacak tahliye raporuna göre planlanır. İtiraz hasar tespit çalışmaları ise "acil yıkılacak bina" dışındaki yapılar için 30 günlük sürenin bitiminden sonra başlar. ✅

> 🔴 **Burada gizli bir tuzak var:** Eşyasını almak isteyen kullanıcı, itiraz etmemeyi seçtiğinde **30 günlük itiraz hakkını da kullanmamış olur.** Platform bu ikilemi açıkça anlatmalı — "eşyanı al" ile "hakkını koru" arasındaki gerilim kullanıcıya gösterilmeden bırakılmamalıdır.

**Yıkım kararı**, hasar derecesi tespitinden **ayrı bir idari işlemdir** ve ona karşı ayrıca iptal davası açılabilir. ⚠️

### 10.7 Afet konutu borçlandırma koşulları ⚠️

Hak sahipliği kabul edilip kendisine konut tahsis edilen kişiler için (7269 s.K.):

- Geri ödeme süresi **en az 20, en çok 30 yıl**, **eşit taksitler**
- **Faizsizdir**
- İlk taksit: ihale ve emanet usulünde inşaatın tamamlanıp hak sahibine **tesliminden 2 yıl sonra**; "Evini Yapana Yardım" yönteminde ve orta hasarlı konut/iş yeri onarımlarında son kredi taksitinin ödenmesinden 2 yıl sonra başlar

Bu koşullar, hak sahipliğine başvurup başvurmama kararında belirleyicidir ve neredeyse hiç anlatılmaz.

### 10.8 Borç erteleme — kalıcı hak değil, emsal uygulama ⚠️

6 Şubat 2023 sonrasında **BDDK kararlarıyla** getirilen esneklikler:

- Tüketici ve taşıt kredilerinde anapara ve faiz ödemelerinin, müşterinin talebi üzerine **en az 6 ay ertelenmesi**
- Kredi kartı borçlarında **ödemesiz dönem** tanımlanabilmesi (asgari tutar dahil)
- Taksitlendirme sürelerinin **bir katına kadar** artırılması
- Kredi kartı yıllık ücreti ve POS aylık ücretlerinin alınmaması
- Kararların **06.02.2023 – 01.01.2024** arası geçerli olması

> 🔴 **Bunlar kalıcı mevzuat değildir.** Platformda "hakkınız" olarak değil, **"geçmiş afette uygulanan emsal"** olarak sunulmalıdır. Aksi hâlde kullanıcıya var olmayan bir hak vaat edilmiş olur — bu, platformun yapabileceği en zararlı hatalardan biridir.

Aynı uyarı **AFAD kira/taşınma yardımı tutarları** ve **öğrenci destekleri** için de geçerlidir.

### 10.9 Öğrenci hakları (2023 uygulaması) ⚠️

- KYK **kredisinin bursa dönüştürülmesi** — depremde yakınını kaybeden veya konutu/iş yeri hasar gören öğrenciler için
- KYK yurtlarında **öncelik**, ek şart aranmaksızın
- Psikososyal destek programları

Askerlik erteleme, sınav hakkı ve kamu personeli mazeret nakli konularında ayrı araştırma gerekiyor (bkz. `DOGRULAMA.md` § F).

---

# BÖLÜM III — ÜRÜN TASARIMI

## 11. Ürün konsepti

**Tek cümlelik tez:** *Deprem öncesi ve sonrasında bir vatandaşın sahip olduğu tüm hakları, dayandığı kanun maddesiyle birlikte, süresi geçmeden önce anlatan ve harekete geçiren ücretsiz bilgi platformu.*

Türkiye'de deprem hukuku bilgisi dağınık haldedir: avukat blogları (çoğu SEO amaçlı, güncelliği belirsiz), kurum duyuruları (bulunması zor), TBB rehberi (PDF, aranamaz). **Hiçbiri süre takibi yapmaz, hiçbiri kişiselleştirilmez, hiçbiri kaynağını maddeyle gösterip güncelliğini garanti etmez.** Boşluk burada.

### 11.1 Dört ana modül

| Modül | İşlevi | Hukuki risk |
|---|---|---|
| **① Bilgi kütüphanesi** | Hakların kanun maddesi ve tarihiyle birlikte anlatımı | Düşük |
| **② "Güvende miyim?" testleri** | Kişiselleştirilmiş risk ve koruma değerlendirmesi | Düşük–Orta |
| **③ Süre hesaplayıcı ve hatırlatıcı** | Hak düşürücü sürelerin takibi | Düşük |
| **④ Dilekçe şablonları** | Avukat onaylı matbu şablonların doldurulması | **Orta–Yüksek** (bkz. Bölüm 1) |
| **⑤ Chatbot** | Kütüphanede arama ve yönlendirme | **Orta** |

### 11.2 Öncelik önerisi

**En yüksek değeri modül ① ve ③ üretir, en yüksek riski ④ ve ⑤ taşır.** Bu yüzden ürünü chatbot'tan değil, **bilgi kütüphanesi + süre hesaplayıcıdan** başlatmak hem hukuken hem ürün olarak daha doğrudur. Chatbot, kütüphanenin üzerine oturan bir arama arayüzü olarak sonradan eklenmelidir — kendi başına bilgi üreten bir danışman olarak değil.

---

## 12. Bilgi kütüphanesi — içerik mimarisi

Kullanıcı hukukçu değildir; "TBK m.478" diye aramaz, **"müteahhit kaç yıl sorumlu?"** diye arar. Bilgi mimarisi kanun sistematiğine göre değil, **kullanıcının sorusuna göre** kurulmalıdır.

```
ANA SAYFA
│
├── 🏠 DEPREM OLMADAN ÖNCE
│   ├── Binamın riskli olup olmadığını nasıl öğrenirim?
│   │   └── Tek başıma risk tespiti yaptırabilir miyim?  ← 6306 m.3, az bilinen hak
│   ├── DASK'ım var mı, yeterli mi?
│   │   └── DASK'ım yoksa ne kaybederim?  ← 7269 m.29/8, en yüksek etkili mesaj
│   ├── Ölüm ve eşya zararımı ne karşılar?  ← hayat/ferdi kaza; deprem istisnası
│   ├── Binamın belgelerini nasıl alırım? (ruhsat, iskân, zemin etüdü)
│   ├── Yanımdaki inşaata itiraz edebilir miyim?  ← 3194 m.8/b, 1 ay askı
│   ├── İmar barışım var, binam güvenli mi?  ← 3194 gç. m.16, sorumluluk malikte
│   └── Binam hangi deprem yönetmeliğine göre yapıldı?
│
├── 🚨 DEPREM OLDU — İLK 30 GÜN
│   ├── Hasar tespiti nasıl yapılır, sonucu nereden öğrenirim?
│   ├── ⏰ Hasar tespitine itiraz — 30 GÜN
│   ├── ⏰ DASK hasar ihbarı — 15 GÜN
│   ├── Binamdan eşyamı alabilir miyim?  ← itiraz hakkıyla çatışma uyarısı
│   ├── Enkaz altında yakınım var / kayıp — ölüm karinesi
│   ├── Kiracıyım, evim hasarlı — kira ödemeye devam edecek miyim?
│   └── İşyerim kapandı, ücretimi alabilir miyim?
│
├── 📋 İLK 3 AY
│   ├── ⏰ Hak sahipliği başvurusu — 2 AY
│   │   └── Konut borçlandırması: 20-30 yıl, faizsiz
│   ├── DASK ödemesi yetersiz geldi, ne yapabilirim?
│   ├── Yakınımı kaybettim: hayat sigortası, SGK ölüm aylığı, BES
│   ├── Devlet destekleri: kira yardımı, taşınma yardımı
│   ├── Vergi ve borç ertelemesi  ← "kalıcı hak değil" uyarısı
│   ├── Öğrenciyim / askerlik / kamu görevlisiyim
│   └── Miras ve nüfus işlemleri
│
├── ⚖️ DAVA YOLLARI
│   ├── Müteahhide karşı — tazminat ve ceza
│   ├── Yapı denetim kuruluşuna karşı
│   ├── İdareye karşı — tam yargı davası
│   ├── Sigortaya karşı — Tahkim mi mahkeme mi?
│   └── ⏰ Zamanaşımı süreleri tablosu
│
└── 💰 ÜCRETSİZ HUKUKİ YARDIM
    └── Baro adli yardım başvurusu  ← her sayfanın altında sabit bağlantı
```

### 12.1 Her içerik sayfasının zorunlu yapısı

Hukuki içeriğin güvenilirliği biçimden geçer. Her sayfa şu şablona uymalıdır:

```
┌─────────────────────────────────────────────┐
│ SORU (kullanıcının dilinde)                 │
├─────────────────────────────────────────────┤
│ KISA CEVAP  (2-3 cümle, jargonsuz)          │
├─────────────────────────────────────────────┤
│ ⏰ SÜRE      (varsa, kırmızı ve büyük)       │
├─────────────────────────────────────────────┤
│ DAYANAK     Kanun adı + no + madde          │
│             ▸ Madde metni (açılır kutu)     │
├─────────────────────────────────────────────┤
│ NE YAPMALIYIM?  (numaralı adımlar)          │
├─────────────────────────────────────────────┤
│ NEREYE BAŞVURULUR?  (kurum + kanal)         │
├─────────────────────────────────────────────┤
│ İLGİLİ DİLEKÇE ŞABLONU  (varsa)             │
├─────────────────────────────────────────────┤
│ ⚠️ Bu bilgi hukuki tavsiye değildir.         │
│ 📅 Son güncelleme: GG.AA.YYYY               │
│ ✍️ İçeriği doğrulayan: Av. [ad] / [baro]     │
└─────────────────────────────────────────────┘
```

**"Son güncelleme" ve "doğrulayan" alanları pazarlama değil, güvenilirlik altyapısıdır.** Mevcut avukat bloglarının en zayıf noktası tam olarak budur: 2019'da yazılmış, mevzuat değişmiş, tarih yok.

---

## 13. "Güvende miyim?" testleri

Kişiselleştirilmiş, kısa, sonucu somut testler. Kullanıcıyı ürüne çeken ve paylaşılan asıl parça budur.

### Test 1 — "Binam ne kadar riskli?"
Sorular: yapım yılı → hangi deprem yönetmeliği kuşağı; kat sayısı; zemin kat kullanımı (dükkân/açık kat = yumuşak kat riski); **taşıyıcı sistemde tadilat (kolon kesme)**; görünür hasar/çatlak; zemin bilgisi; yapı denetimli mi (2001 sonrası).
Çıktı: risk göstergeleri listesi + **risk tespiti yaptırma hakkı** (6306 m.3) yönlendirmesi.
> ⚠️ Bu bir **mühendislik değerlendirmesi değildir** ve olduğu iddia edilmemelidir. Çıktı "binanız riskli" değil, "bu göstergeler risk tespiti yaptırmanız için sebep oluşturur" demelidir.

### Test 2 — "Sigortam yeterli mi?" (en yüksek pratik değer)
Sorular: DASK var mı; brüt m²; yapı tarzı; konutun güncel piyasa değeri; ihtiyari konut sigortası var mı; eşya teminatı, enkaz kaldırma, kira mahrumiyeti seçilmiş mi.
Hesap:
- DASK sigorta bedeli = m² × yapı tarzı birim bedeli (azami teminat ile sınırlı)
- **Muafiyet = sigorta bedeli × %2** → "şu tutarın altındaki hasarda ödeme almazsınız"
- **Teminat açığı = konut değeri − DASK teminatı** → "şu kadarı sizin üzerinizde"
- **Eksik sigorta kontrolü** → orantılı ödeme riski
Çıktı: *"Eviniz 4.000.000 TL değerinde. DASK azami 2.271.283 TL öder. Aradaki **1.728.717 TL** size aittir. Ayrıca eşyanız, enkaz masrafınız ve kiranız DASK kapsamında değildir."*

Bu tek ekran, DASK hakkındaki en yaygın yanılgıyı tek seferde çözer.

### Test 3 — "Hangi haklarım var, süresi ne zaman doluyor?" (deprem sonrası)
Sorular: deprem tarihi; malik/kiracı; hasar durumu; hasar tespiti ilan tarihi; DASK var mı; ihbar yapıldı mı; hak sahipliği ilanı yapıldı mı.
Çıktı: kişiselleştirilmiş **süre takvimi** — hangi hak, hangi tarihte doluyor, kaç gün kaldı. Takvime (.ics) aktarılabilir, e-posta/SMS hatırlatması kurulabilir.

**Bu özellik, platformun en somut fayda üreten parçasıdır:** 2023'te binlerce kişi 30 günlük itiraz süresini bilmediği için kaçırdı.

---

## 14. Dilekçe modülü

### 14.1 Tasarım ilkesi

🔴 **LLM hukuki metin yazmaz.** Şablonlar avukat tarafından önceden yazılır ve onaylanır; sistem yalnızca kullanıcının girdiği alanları yerleştirir. Bu karar Bölüm 1'deki m.35 analizinden doğar ve pazarlıksızdır.

```
Kullanıcı → soru-cevap formu → alan doğrulama →
   avukat onaylı sabit şablon + alan yerleştirme →
      PDF/DOCX çıktı + "bu bir taslaktır" uyarısı + adli yardım bağlantısı
```

LLM'in bu akıştaki tek rolü: **hangi şablonun uygun olduğunu bulmak** ve **alanların ne anlama geldiğini sade dille açıklamak.** Metin üretmek değil.

### 14.2 Şablon listesi (öncelik sırasıyla)

| # | Şablon | Dayanak | Süre |
|---|---|---|---|
| 1 | **Sigorta şirketine yazılı başvuru** (Tahkim/dava ön şartı) | 5684 s.K. m.30 | Dava şartı |
| 2 | Hasar tespit raporuna itiraz | 7269 s.K. | 30 gün |
| 3 | Hak sahipliği başvurusu (talep ve taahhütname) | 7269 s.K. m.29 | 2 ay |
| 4 | Hak sahipliği reddine itiraz | Hak Sahipliği Yönetmeliği | 15 gün |
| 5 | Sigorta Tahkim Komisyonu başvuru formu | 5684 s.K. m.30 | — |
| 6 | Riskli yapı tespiti başvurusu | 6306 s.K. m.3 | — |
| 7 | Riskli yapı tespitine itiraz | 6306 Uyg. Yön. | 15 gün |
| 8 | Bilgi edinme başvurusu (ruhsat, iskân, zemin etüdü, denetim raporu) | 4982 s.K. | — |
| 9 | İdareye tam yargı ön başvurusu | 2577 s.K. m.13 | 1 yıl / 5 yıl |
| 10 | Ölüm karinesi tescili başvurusu | 5490 s.K. m.32 | — |
| 11 | İmar planına askı süresinde itiraz | 3194 s.K. m.8/b | 1 ay |
| 12 | Baro adli yardım başvurusu | 1136 s.K. m.176 vd. | — |

---

## 15. Chatbot mimarisi

### 15.1 Zorunlu kurallar

Hukuki alanda halüsinasyon kabul edilemez — uydurulmuş bir madde numarası veya süre, kullanıcının hakkını kaybetmesine yol açar.

1. **Yalnızca kütüphaneden cevap (katı RAG).** Model kendi bilgisinden hukuki bilgi üretmez; yalnızca doğrulanmış içerik kümesinden alıntılar. Kütüphanede yoksa cevap **"bu konuda doğrulanmış bilgim yok"** olmalıdır.
2. **Kaynaksız cevap yok.** Her cevap kanun adı + madde + kütüphane sayfası bağlantısı içerir. Kaynak gösteremiyorsa cevap vermez.
3. **Somut olay nitelendirmesi yok.** "Sizin durumunuzda dava kazanırsınız" tipi çıktılar sistem düzeyinde engellenir.
4. **Süre sorularında her zaman uyarı.** "Süreler olayın özelliğine göre değişebilir; kesin süre için avukata danışın."
5. **Kırmızı çizgiler.** Ceza soruşturması stratejisi, dava kazanma ihtimali tahmini, avukat/büro önerisi — hiçbiri yapılmaz.
6. **Kriz protokolü.** Yakınını kaybetme, intihar ima eden mesajlar → psikososyal destek hattına yönlendirme. Deprem sonrası bir sistemde bu ihtimal düşük değildir.
7. **Sürüm damgası.** Cevap hangi tarihli mevzuat sürümüne dayanıyorsa gösterilir.

### 15.2 Teknik yaklaşım

| Katman | Öneri |
|---|---|
| İçerik deposu | Markdown + YAML meta (kanun no, madde, güncelleme tarihi, doğrulayan avukat) — git ile sürümlenir |
| Arama | Hibrit: anlamsal + anahtar kelime (madde numarası araması tam eşleşme gerektirir) |
| Model | Claude (`claude-opus-5` / `claude-sonnet-5`) — sistem talimatı ile katı RAG kısıtı |
| Kaynak zorunluluğu | Yapılandırılmış çıktı: `{cevap, kaynaklar[], güven, kütüphane_dışı_mı}` — kaynak boşsa cevap gösterilmez |
| Değerlendirme | Avukat tarafından hazırlanmış soru-cevap seti üzerinde düzenli doğruluk testi |

> **Parametrik değerler asla metne gömülmez.** DASK azami teminatı, m² bedelleri, kira yardımı tutarları yıllık değişir (Bölüm 6.4'teki kaynak çelişkisi bunun kanıtıdır). Bu değerler **sürümlü bir yapılandırma dosyasında** tutulmalı, içerik ve chatbot oradan okumalıdır. Aksi hâlde platform bir yıl içinde yanlış bilgi yayan bir kaynağa dönüşür.

---

## 16. Domain önerileri

**Seçim ölçütleri:** telefonda söylenince anlaşılır olmalı; Türkçe karakter ve tire içermemeli; "hak" vurgusu taşımalı; yalnızca depremle değil genel afetle de uyumlu olmalı (sel, yangın, heyelan — platform ileride genişleyebilir).

| Öneri | Değerlendirme |
|---|---|
| **depremhaklarim.com** | Açık, akılda kalıcı, doğrudan. Kullanıcının önerisi ve **en güçlü seçenek**. Tek zayıflığı depremle sınırlı olması. |
| **afethaklarim.com** | Sel, yangın, heyelanı da kapsar. Uzun vadeli en esnek seçenek. "Afet" kelimesi "deprem" kadar arama hacmi taşımaz. |
| **depremhukuku.org** | `.org` güven ve kâr amacı gütmezlik sinyali verir — reklam yasağı açısından da isabetli. "Hukuk" kelimesi bir kısım kullanıcıyı ürkütebilir. |
| **hakkimiziariyoruz.org** | Duygusal olarak güçlü ama işlevi anlatmıyor. |
| **depremdehakkim.com** | Akıcı, ancak "haklarım" kadar net değil. |

**Öneri:** Ana domain **`depremhaklarim.com`**, `afethaklarim.com` savunma amaçlı alınıp yönlendirilir. Baro/dernek ortaklığı kurulursa `.org` uzantısı tercih edilmelidir.

> ⚠️ Bu araştırma sırasında ağ kısıtı nedeniyle **domain müsaitliği kontrol edilemedi.** Kayıt öncesinde WHOIS sorgusu yapılmalı; ayrıca marka/isim benzerliği açısından mevcut platformlarla çakışma kontrol edilmelidir.

---

## 17. Zorunlu yasal uyarılar

Sitenin her sayfasında ve chatbot'un her cevabında bulunması gerekenler:

1. **Sorumluluk reddi:** *"Bu platformda yer alan bilgiler genel bilgilendirme amaçlıdır, hukuki tavsiye niteliği taşımaz ve avukatlık hizmetinin yerine geçmez. Somut olayınıza ilişkin değerlendirme için bir avukata veya bulunduğunuz ilin barosuna başvurunuz."*
2. **Güncellik uyarısı:** *"Mevzuat değişebilir. Bu sayfa [tarih] itibarıyla günceldir."*
3. **Adli yardım yönlendirmesi:** Baro adli yardım başvurusuna sabit bağlantı.
4. **Dilekçe çıktısı uyarısı:** *"Bu bir taslaktır. İmzalayıp sunmadan önce bir avukata danışmanız önerilir."*
5. **KVKK aydınlatma metni** ve çerez politikası.
6. **Kâr amacı gütmediğine ilişkin açık beyan** ve içeriği doğrulayan hukukçuların künyesi.

---

## 18. Yol haritası

### V0 — Hackathon demosu
- [ ] 🔴 Tüzel yapı kararı: dernek mi, baro ortaklığı mı? (Bölüm 1-2 — **kod yazmadan önce**)
- [ ] 🔴 [`DOGRULAMA.md`](./DOGRULAMA.md) § A — 12 kritik maddenin resmî metinden doğrulanması (ağ erişimli ortamda, Mevzuat MCP ile)
- [ ] Bilgi kütüphanesi: en kritik 15 konu, tam sayfa şablonuyla
- [ ] **Test 2 — "Sigortam yeterli mi?"** (en yüksek etkili, tek ekranda gösterilebilir)
- [ ] **Test 3 — süre hesaplayıcı ve kişisel takvim**
- [ ] 3 dilekçe şablonu (sigortaya yazılı başvuru, hasar tespiti itirazı, hak sahipliği)
- [ ] Parametrik değerler için sürümlü yapılandırma dosyası
- [ ] Sorumluluk reddi ve yasal uyarı altyapısı

### V1 — Yayına hazır
- [ ] [`DOGRULAMA.md`](./DOGRULAMA.md) § B, § D ve § E — önemli maddeler, parametrik değerler ve ek yönetmelikler
- [ ] Kütüphanenin tüm konulara genişletilmesi (~60 sayfa)
- [ ] Katı RAG chatbot + kaynak zorunluluğu + avukat onaylı test seti
- [ ] 12 dilekçe şablonunun tamamı
- [ ] Test 1 — bina risk değerlendirmesi
- [ ] SMS/e-posta süre hatırlatıcı
- [ ] Erişilebilirlik (WCAG), düşük bant genişliği modu, **çevrimdışı okunabilirlik**

### V2 — Ölçek
- [ ] Çok dilli içerik (TR, AR, KU, EN — deprem bölgesinin gerçek dil profili)
- [ ] Baro adli yardım sistemleriyle entegrasyon
- [ ] Mevzuat değişikliği izleme ve otomatik "bu sayfa güncellenmeli" uyarısı
- [ ] `PROJE.md`'deki lojistik sistemiyle entegrasyon: **hasar tespiti kaydı → o kullanıcının hukuki süre takvimi otomatik oluşur**

---

## 19. İki proje nasıl birleşiyor?

`PROJE.md` (lojistik) ile bu doküman ayrı ürünler değil, **aynı zincirin iki ucudur:**

```
Bina hasar kaydı  ←── ortak veri noktası ──→  Hukuki süre takvimi
       │                                              │
       ├── ihtiyaç türetme → sevkiyat → teslim        ├── ⏰ hasar tespiti itirazı: 30 gün
       │   (fiziksel yardım)                          ├── ⏰ DASK ihbarı: 15 gün
       │                                              ├── ⏰ hak sahipliği: 2 ay
       │                                              └── dilekçe şablonları
       └────────────── aynı hasar kaydı ──────────────┘
```

Bir binanın "ağır hasarlı" kaydı, lojistik tarafında **çadır ve battaniye talebi**, hukuki tarafta **30 günlük itiraz süresinin başlaması** anlamına gelir. Tek kayıt, iki farklı yardım zinciri tetikler.

**Bu, projeye gerçek bir bütünlük kazandırır:** afetzedeye yalnızca battaniye değil, hakkını da ulaştıran tek sistem. Bildiğimiz kadarıyla bu iki tarafı birleştiren bir örnek Türkiye'de mevcut değil.

---

## 20. Açık sorular

- 🔴 **Tüzel yapı**: Dernek mi kurulacak, baro ile mi çalışılacak? Bu karar verilmeden dilekçe ve chatbot modüllerine başlanmamalı.
- İçeriği kim doğrulayacak ve **düzenli olarak kim güncelleyecek?** Hukuki içerik bakımsız kaldığında zararlı hale gelir — bu bir yazılım değil, yayıncılık taahhüdüdür.
- Dilekçe modülü V0'a girmeli mi, yoksa hukuki yapı netleşene kadar bekletilmeli mi?
- Chatbot kütüphane dışı sorulara ne kadar "yardımcı olmaya çalışmalı"? Katı ret kullanıcıyı iter, esneklik hukuki risk yaratır.
- TBB'nin mevcut rehberi ile ilişki: dijitalleştirme izni alınabilir mi, ortak çalışma mümkün mü?
- 2023'te açılan davaların sonuçları ne oldu? **Gerçek içtihat verisi**, platformun "ne olur" sorusuna dürüst cevap vermesini sağlar.

---

## 21. Kaynaklar

Bu doküman aşağıdaki kaynaklardan derlenmiştir. Resmî mevzuat siteleri ağ kısıtı nedeniyle doğrudan indirilemediğinden, **yayına geçmeden önce tüm madde metinleri mevzuat.gov.tr üzerinden birebir doğrulanmalıdır** — planı [`DOGRULAMA.md`](./DOGRULAMA.md) içindedir.

**Mevzuat erişim altyapısı**
- [saidsurucu/mevzuat-mcp — GitHub](https://github.com/saidsurucu/mevzuat-mcp) · PyPI: `mevzuat-mcp` 0.3.0 · repo yapılandırması: [`.mcp.json`](./.mcp.json)
- [Zorunlu Deprem Sigortası Tarife ve Talimatı — mevzuat.gov.tr](https://mevzuat.gov.tr/mevzuat?MevzuatNo=23199&MevzuatTur=9&MevzuatTertip=5)
- [Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkındaki Yönetmelik — mevzuat.gov.tr](https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=7&MevzuatNo=4905&MevzuatTertip=5)
- [Sigortacılıkta Tahkime İlişkin Yönetmelik — mevzuat.gov.tr](https://mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=7&MevzuatNo=11514&MevzuatTertip=5)
- [Türkiye Bina Deprem Yönetmeliği (TBDY 2018) — mevzuat.gov.tr](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=24468&MevzuatTur=7&MevzuatTertip=5) · [Resmî Gazete 18.03.2018/30364 Mükerrer](https://www.resmigazete.gov.tr/eskiler/2018/03/20180318M1-2.htm) · [AFAD sayfası](https://www.afad.gov.tr/turkiye-bina-deprem-yonetmeligi) · [İMO duyurusu](https://www.imo.org.tr/TR,143081/turkiye-bina-deprem-yonetmeligi-yayinlandi.html)
- [4708 sayılı Yapı Denetimi Hakkında Kanun — mevzuat.gov.tr](https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4708.pdf) · [TMMOB JMO metni](https://www.jmo.org.tr/mevzuat/mevzuat_detay.php?kod=23)
- [7269 sayılı Kanun — mevzuat.gov.tr (PDF)](https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7269.pdf)
- [İmar Kanunu geçici m.16 (imar barışı) — ÇŞB](https://webdosya.csb.gov.tr/db/afyon/menu/3194-degisiklik-gecici-16_20180607081602.pdf) · [imarbarisi.csb.gov.tr — kanun maddesi](https://imarbarisi.csb.gov.tr/kanun-maddesi-i-86170)

**Resmî kaynaklar (doğrulama için başvurulacak)**
- [6305 Sayılı Afet Sigortaları Kanunu — mevzuat.gov.tr](https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6305.pdf)
- [6305 sayılı Kanun — Resmî Gazete, 18.05.2012/28296](https://www.resmigazete.gov.tr/eskiler/2012/05/20120518-4..htm)
- [Zorunlu Deprem Sigortası Genel Şartları — mevzuat.gov.tr](https://mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=9&MevzuatNo=14982&MevzuatTertip=5)
- [Zorunlu Deprem Sigortası Genel Şartları — TOBB](https://www.tobb.org.tr/SigortacilikMudurlugu/SigortaEksperleri/Documents/Mevzuat-/GenelSartlar/Mal%20Sigortalar%C4%B1/Zorunlu%20Deprem%20Sigortas%C4%B1%20Genel%20%C5%9Eartlar%C4%B1.pdf)
- [Zorunlu Deprem Sigortası Yönetmeliği — Resmî Gazete](https://resmigazete.gov.tr/eskiler/2011/05/20110513-9.htm)
- [DASK — Teminat ve Kapsamı](https://dask.gov.tr/tr/teminat-ve-kapsami) · [Tarife ve Primler](https://dask.gov.tr/tr/tarife-ve-primler) · [Tazminat Ödeme Süreci](https://www.dask.gov.tr/tr/tazminat-odeme-sureci) · [Kanun](https://dask.gov.tr/tr/kanun) · [SSS](https://dask.gov.tr/tr/sikca-sorulan-sorular)
- [7269 sayılı Kanun — mevzuat.gov.tr](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=7269&MevzuatTur=1&MevzuatTertip=3)
- [634 sayılı Kat Mülkiyeti Kanunu — mevzuat.gov.tr](https://mevzuat.gov.tr/MevzuatMetin/1.5.634.pdf)
- [1136 sayılı Avukatlık Kanunu — mevzuat.gov.tr](https://www.mevzuat.gov.tr/MevzuatMetin/1.5.1136.pdf)
- [6306 Sayılı Kanunun Uygulama Yönetmeliği — Çevre, Şehircilik ve İklim Değişikliği Bakanlığı](https://webdosya.csb.gov.tr/db/altyapi/icerikler/yonetmel-k---7.5.16849-20240604152834.pdf)
- [Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkındaki Yönetmelik — ÇŞB](https://webdosya.csb.gov.tr/db/yapiisleri/icerikler/afet-sebeb-yle-haksah-b--olanlarin-tesp-t--hakkindak--yonetmel-k-20210506173927.pdf)
- [AFAD — Afetzedeler İçin 7269 Sayılı Kanun Kapsamında Soru ve Cevaplar](https://www.afad.gov.tr/afetzedeler-icin-7269-sayili-kanun-kapsaminda-soru-ve-cevaplar)
- [AFAD — Hasar Tespit Çalışmaları Basın Duyurusu](https://www.afad.gov.tr/basin-duyurusu-deprem-bolgesinde-yapilan-hasar-tespit-calismalari)
- [ÇŞB — Tespit Süreci SSS](https://csb.gov.tr/sss/tespit-sureci)
- [İzmir ÇŞB — Kesin Hasar Tespit Raporlarının İlanı ve İtiraz Duyurusu](https://izmir.csb.gov.tr/kesin-hasar-tespit-raporlarinin-ilani-ve-itiraz-basvurularina-iliskin-kamuoyu-duyurusu-duyuru-411995)
- [AYDES — Hak Sahipliği SSS](https://aydes.gov.tr/hakSahipligiSSS)
- [e-Devlet — 6306 Kira Yardımı Başvurusu](https://www.turkiye.gov.tr/csb-kentsel-donusum-kira-yardimi-basvurusu-4621)
- [Sigorta Tahkim Komisyonu — SSS](https://www.sigortatahkim.org/sayfa/sik-sorulan-sorular)
- [SEDDK — Zorunlu Deprem Sigortası Mevzuatı](https://www.seddk.gov.tr/tr/mevzuat-bkbs-zorunlu-deprem-sigortasi)
- [TKGM — Hangi nitelikli taşınmazlarda DASK aranır?](https://www.tkgm.gov.tr/en/node/3317)
- [TBB Reklam Yasağı Yönetmeliği](https://d.barobirlik.org.tr/mevzuat/avukata_ozel/yonetmelikler/belgeler/Reklam_Yasagi_Yonetmeligi.pdf)
- [TBB — Depremzedeler İçin Hukuk Rehberi](https://d.barobirlik.org.tr/2023/DepremzedelerIcinHukukRehberi/) · [TBB duyurusu](https://www.barobirlik.org.tr/Haberler/tbb-tarafindan-hazirlanan-depremzedeler-icin-hukuk-rehberi-yurttaslarin-kullanimina-sunuldu-83560)
- [TÜRMOB — 7440 Sayılı Kanunla Deprem Bölgesine Yönelik Vergi Düzenlemeleri](https://www.turmob.org.tr/arsiv/mbs/resmigazete/-7440_deprem_rehber.pdf)
- [ÇŞB — Deprem Sebebiyle Hasarlı Binalardan Emlak Vergisi](https://webdosya.csb.gov.tr/db/yerelyonetimler/icerikler/deprem-sebeb-yle-hasarli-b-nalardan-20220210100100.pdf)

**Mevzuat derleme ve içtihat**
- [LEXPERA — 6305 sayılı Afet Sigortaları Kanunu (konsolide)](https://www.lexpera.com.tr/mevzuat/kanunlar/afet-sigortalari-kanunu-6305)
- [LEXPERA — 6306 sayılı Kanun (konsolide)](https://www.lexpera.com.tr/mevzuat/kanunlar/afet-riski-altindaki-alanlarin-donusturulmesi-hakkinda-kanun-6306)
- [LEXPERA — 7269 sayılı Kanun (konsolide)](https://www.lexpera.com.tr/mevzuat/kanunlar/umumi-hayata-muessir-afetler-dolayisi-ile-alinacak-tedbirlerle-yapilacak-yardimlara-dair-kanun-7269)
- [LEXPERA — 634 sayılı Kat Mülkiyeti Kanunu (konsolide)](https://www.lexpera.com.tr/mevzuat/kanunlar/kat-mulkiyeti-kanunu-634)
- [LEXPERA — TBB Reklam Yasağı Yönetmeliği (konsolide)](https://www.lexpera.com.tr/mevzuat/yonetmelikler/turkiye-barolar-birligi-reklam-yasagi-yonetmeligi-1)
- [Avukatlık Kanunu m.35 şerhi — e-uyar](https://app.e-uyar.com/madde/index/19d2d5ff-3f64-49f8-93ad-34f4c114894b)
- [TTK m.1420 (Zamanaşımı) — e-uyar](https://app.e-uyar.com/madde/index/28eaca55-cf55-4171-a2ab-b5bf9bf8057f)
- [Çalışma ve Toplum — Zorlayıcı Neden Yargı Kararları](https://yargi.calismatoplum.org/zorlayici-neden/)
- [Deprem Kaynaklı Tazminat Davaları — İçtihat derlemesi](https://sozlesmeakademisi.com.tr/?id=393&p=blog&t=deprem-kaynakli-tazminat-davalari-ictihat-derlemesi)

**Doktrin ve akademik çalışmalar**
- [Depremde Kaybolanların Hukuki Durumları: Gaiplik ve Ölüm Karinesi — DergiPark](https://dergipark.org.tr/tr/download/article-file/3093546)
- [Eser Sözleşmesinde Yüklenicinin Ağır Kusuru — DergiPark](https://dergipark.org.tr/tr/download/article-file/4157094)
- [Avukatlık Tekeline Genel Bir Bakış — DEÜ Hukuk Fakültesi](https://hukuk.deu.edu.tr/wp-content/uploads/2015/09/AL%C4%B0-%C3%87ET%C4%B0N-ASLAN.pdf)
- [Türk Vergi Hukukunda Mücbir Sebep ve Zor Durum — İÜ](https://nek.istanbul.edu.tr/ekos/TEZ/52324.pdf)
- [Zorlayıcı Sebepler Halinde Ücret ve İş Sözleşmesinin Feshi](https://www.bariserdem.com/pdf/zorlayici_sebep_halinde_ucret_ve_fesih.pdf)
- [Sigorta Sözleşmelerinden Kaynaklanan Taleplerde Zamanaşımı — DergiPark](https://dergipark.org.tr/tr/download/article-file/372732)
- [7221 Sayılı Kanunla İmar ve Parselasyon Planlarına Karşı Dava — DergiPark](https://dergipark.org.tr/tr/download/article-file/4272898)
- [Zorunlu Deprem Sigortası Rehberi — Doç. Dr. Metin Sarıaslan](https://www.metinsariaslan.com/zds-rehberi/)

**Güncel uygulama ve haber**
- [İstanbul Barosu'ndan "yapay zekâ ile dilekçe" uygulamasına tepki — Cumhuriyet](https://www.cumhuriyet.com.tr/turkiye/istanbul-barosu-ndan-yapay-zeka-ile-dilekce-uygulamasina-tepki-2498382)
- [7471 Sayılı Kanun Özeti (6306'da değişiklik, salt çoğunluk)](https://www.bbdas.com.tr/2023-16-7471-sayili-afet-riski-altindaki-alanlarin-donusturulmesi-hakkinda-kanun-ile-bazi-kanunlarda-degisiklik-yapilmasina-dair-kanun-ozeti-b-2357)
- [Yargıtay'dan emsal kira kararı: TBK 331 — Alomaliye](https://www.alomaliye.com/2026/03/12/yargitaydan-emsal-kira-karari-tbk-331-ile-konut-ve-catili-isyeri-kiralarinda-olaganustu-fesih-mumkun/)
- [AFAD — Taşınma Yardımı Duyurusu](https://www.afad.gov.tr/cumhurbaskanimiz-sn-erdogan-depremzedelerimize-15-bin-lira-tasinma-yardimini-bugun-itibariyla-odemeye-basliyoruz-merkezicerik)
- [2026 DASK Teminat Tutarı Güncellendi — İnci Sigorta](https://incisigorta.com/mevzuat/ev-sigortalari/2026-dask-teminat-tutari-guncellendi-mayis-2026-yeni-metrekare-bedelleri/)
- [2026 DASK Prim ve Tarife Değişikliği — Sigortaladım](https://www.sigortaladim.com/2026-dask-prim-ve-tarife-degisikligi)
- [Deprem Hasarı İhbarı ve Tazminat Ödeme Süreleri — Sigortaladım](https://www.sigortaladim.com/deprem-hasari-ihbari-ve-tazminat-odeme-sureleri)
- [Kahramanmaraş Depremleri ve DASK'tan Bakiye Hasar Tazminatı — Örnek Karar](https://www.basgozehukuk.com/post/bakiye-deprem-hasar-tazminat%C4%B1)
- [Zorunlu Deprem Sigortası 2026 tarifesinde artışa gidildi — Sigortacı Gazetesi](https://sigortacigazetesi.com.tr/zorunlu-deprem-sigortasi-2026-tarifesinde-artisa-gidildi/)
- [ZDS azami teminat 1.272.000 TL'ye yükseltildi (2024) — AA](https://www.aa.com.tr/tr/ekonomi/zorunlu-deprem-sigortasi-azami-teminat-tutari-1-milyon-272-bin-tl-ye-yukseltildi/3094542) · [1.704.162 TL'ye yükseltildi (2025) — AA](https://www.aa.com.tr/tr/ekonomi/zorunlu-deprem-sigortasi-azami-teminat-tutari-1-milyon-704-bin-162-tlye-yukseltildi/3502584)
- [TÜRMOB — ZDS Tarife ve Talimat Tebliğinde Değişiklik](https://www.turmob.org.tr/mevzuat/Pdf/19175)
- [2026 Sigorta Tahkim Parasal Sınırları: İtiraz ve Temyiz Limitleri — Paksoy & Partners](https://www.paksoyandpartners.com/tr/post/2026-sigorta-tahkim-parasal-s%C4%B1n%C4%B1rlar%C4%B1-i%CC%87tiraz-ve-temyiz-limitleri) · [2026 Yılı Sigorta Tahkim Komisyonu: İtiraz ve Güncel Parasal Sınırlar — Mondaq](https://www.mondaq.com/turkey/insurance-laws-and-products/1753706/2026-yili-sigorta-tahkim-komisyonu-itiraz-ve-g%C3%BCncel-parasal-sinirlar) · [Sigorta Tahkim Komisyonu duyurusu](https://www.sigortatahkim.org/manset/57)
- [BDDK depremzede borç esneklikleri — AA](https://www.aa.com.tr/tr/ekonomi/bddk-depremlerden-etkilenen-vatandaslarin-borclarina-yonelik-esnekliklerin-kapsamini-genisletti/2815148) · [BDDK Kararı: kredi ve kredi kartı düzenlemeleri — Alomaliye](https://www.alomaliye.com/2023/02/09/bddk-karari-depremden-etkilenen-illerdeki-kredi-ve-kredi-karti-duzenlemeleri/)
- [Hak sahiplerinin borçlandırılması — Kahramanmaraş AFAD](https://kahramanmaras.afad.gov.tr/hak-sahipligi-kabul-edilen-noter-krakllariyla-kendilerine-konut-cikan-vatandaslarimizin-borclandirma-islemi) · [Kahramanmaraş Valiliği duyurusu](https://www.kahramanmaras.gov.tr/hak-sahiplerinin-borclandirilmasi-duyurusu)
- [Hasarlı yapılardan eşya tahliyesine ilişkin genelge](https://haber.sol.org.tr/haber/hasarli-yapilardan-esya-tahliyesine-iliskin-genelge-366248) · [Ağır hasarlı binadan eşya alınır mı? — Hürriyet](https://www.hurriyet.com.tr/bilgi/galeri/agir-hasarli-binadan-esya-alinir-mi-deprem-bolgelerinde-esya-cikarma-islemi-nasil-olacak-izin-veriliyor-mu-iste-yapilan-aciklama-42223743)
- [Hasar tespiti, yıkım kararı ve hasar derecesine karşı iptal davası — MG Hukuk](https://mehmetgorunmez.av.tr/afet-sonrasi-bina-hasar-tespiti-yikim-karari-ve-hasar-derecesi-tespiti-islemine-karsi-acilabilecek-iptal-davasi/)
- [Deprem felaketine ilişkin BES, Hayat ve FKS ürünleri — SSS (Agesa)](https://www.agesa.com.tr/deprem-felaketine-iliskin-bes-hayat-ve-fks-urunleri-ile-ilgili-sik-sorulan-sorular) · [Hayat ve Ferdi Kaza Sigortası Genel Şartları](https://www.garantibbvaemeklilik.com.tr/content/dam/gewebsite/documents/pdf/hayat_sigortasi_genel_sartlar.pdf)
- [Depremde Yakınlarını Kaybedenler Hangi SGK Yardımlarından Faydalanabilir?](https://www.isvesosyalguvenlik.com/depremde-yakinlarini-kaybedenler-hangi-sgk-yardimlarindan-faydalanabilirler/)
- [Yapı Kayıt Belgesinin Sağladığı Yasallık — Av. İlker Hasan Duman](https://www.ilkerduman.av.tr/?d=1567) · [Sırf Yapı Kayıt Belgesine Sahip Olmak Ceza Sorumluluğunu Gündeme Getirir mi? — Ersan Şen](https://sen.av.tr/tr/makale/s%C4%B1rf-yapi-kayit-belgesine-sahip-olmak-ceza-sorumlulugunu-gundeme-getirir-mi)
- [Sigortacılıkta Tahkime İlişkin Yönetmelik'te Değişiklik — Gün + Partners](https://gun.av.tr/tr/goruslerimiz/guncel-yazilar/sigortacilikta-tahkime-iliskin-yonetmelik-te-degisiklik-yapilmasina-dair-yonetmelik-yayimlandi)
- [Depremzede öğrencilere burs ve yurt önceliği — Memurlar.net](https://www.memurlar.net/haber/1066240/depremzede-ogrencilere-yurtlarda-oncelik.html)

---

## Katkı

Bu doküman tartışmaya açıktır ve **hukuki bir metin olduğu için farklı bir titizlik gerektirir.** Üç kural önerisi:

1. **Bölüm 1 ve 2 (Avukatlık Kanunu ve reklam yasağı) çözülmeden dilekçe ve chatbot modüllerine kod yazılmamalıdır.** Bunlar sonradan düzeltilemeyecek mimari kararlardır.
2. **⚠️ işaretli hiçbir bilgi, resmî metinden birebir doğrulanmadan yayına alınmamalıdır.** Yanlış bir süre bilgisi, kullanıcının hakkını tamamen kaybetmesine yol açabilir — bu ürünün yaratabileceği en büyük zarardır. Doğrulama planı: [`DOGRULAMA.md`](./DOGRULAMA.md).
3. **Geçmiş afette uygulanan destekler, kalıcı hak gibi sunulmamalıdır.** BDDK borç ertelemesi, AFAD kira/taşınma yardımı tutarları ve öğrenci destekleri 2023'e özgü uygulamalardır. Kullanıcıya var olmayan bir hak vaat etmek, hiç bilgi vermemekten daha zararlıdır.

### Dosya haritası

| Dosya | İçerik |
|---|---|
| [`PROJE.md`](./PROJE.md) | Afet lojistik koordinasyon sistemi — arz/talep eşleştirme motoru |
| `PROJE-LEGAL.md` | Bu dosya — hukuki altyapı ve bilgilendirme platformu tasarımı |
| [`DOGRULAMA.md`](./DOGRULAMA.md) | 34 kalemlik mevzuat doğrulama görev listesi |
| [`.mcp.json`](./.mcp.json) | Mevzuat MCP yapılandırması (ağ erişimli ortamda otomatik yüklenir) |
