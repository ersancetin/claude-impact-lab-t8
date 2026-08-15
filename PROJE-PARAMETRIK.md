# Parametrik Kiracı Ürünü ve DASK Protokol Yaklaşımı

**Ekip:** T8 — Hasar Tespiti
**Durum:** Fizibilite ve tasarım analizi / taslak
**Son güncelleme:** 2026-08-15
**İlgili:** [`PROJE-AKIS.md`](./PROJE-AKIS.md) · [`PROJE-LEGAL.md`](./PROJE-LEGAL.md) · [`DOGRULAMA.md`](./DOGRULAMA.md)

---

## Yönetici özeti — beş bulgu

**1. Parametrik sigorta bir "zarar ürünü" değil, "nakit akışı ürünü"dür.** Bu ayrım, hem ürün tasarımını hem hukuki konumlandırmayı belirliyor. Kiracıya kaybettiği eşyayı geri almayı vaat etmiyoruz; **depremden sonraki 72 saatte elinde nakit olmasını** sağlıyoruz. Bu çerçeve doğru kurulmazsa ürün hem yanlış anlaşılır hem hukuken sakatlanır.

**2. Emsal hazır ve birebir örtüşüyor: Jumpstart (Kaliforniya).** USGS ShakeMap verisiyle, yer hızı 30 cm/s eşiğini aşınca **sabit 10.000 USD**, eksper yok, muafiyet yok, evrak yok; aylık ~20 USD; Lloyd's teminatlı. Kiracılara da satılıyor. Türkiye'nin ihtiyacı olan modelin çalışan hali.

**3. 🔴 Türk hukukunda parametrik sigortanın açık düzenlemesi yok** ve iki gerçek engel var: **sigortalanabilir menfaat** ile **zenginleşme yasağı** (TTK m.1461). Daha ağırı: **ruhsatsız kişiyle yapılan sigorta sözleşmesine kumar ve bahis hükümleri uygulanır.** Yani yanlış kurgulanmış bir parametrik ürün, hukuken sigorta değil **bahis** sayılabilir. Jumpstart bu sorunu zarif bir mekanizmayla çözüyor (Bölüm 5.4) ve Türkiye'ye uyarlanabilir.

**4. 🔴 DASK, kiracı ürününü kendi başına sunamaz.** DASK 6305 sayılı Kanunla kurulmuş bir **kamu tüzel kişisidir** ve yetkisi bu kanunla **sınırlıdır**; hakkında 5684 ve TTK doğrudan uygulanmaz. Kanunun çizdiği sınırın dışında yeni ürün sunması **yasal olarak çok sınırlı** — gerçek bir kiracı poliçesi için **kanun değişikliği** gerekir. Bu, protokol beklentisini baştan doğru ayarlamamızı gerektiriyor.

**5. Buna karşılık DASK'la üç ayrı protokol katmanı mümkün ve bunların ikisi bugün başlatılabilir.** Ayrıca DASK **zaten parametrik mantığı kullanıyor**: 2013'te Bermuda'da kurulan Bosphorus 1 Re üzerinden **400 milyon USD katastrofi bonosu** ihraç etti. Kurum bu dile yabancı değil — sadece perakende tarafında kullanmıyor.

---

# BÖLÜM I — PARAMETRİK ÜRÜN TASARIMI

## 1. Neden kiracı için doğru araç?

Kiracının sorunu iki katmanlı ([`PROJE-AKIS.md`](./PROJE-AKIS.md) Bölüm 2): teminatı yok, **ve** olsa bile klasik süreç çok yavaş. Parametrik ikisini birden çözüyor:

| Klasik (indemnite) sigorta | Parametrik sigorta |
|---|---|
| Hasar tespiti gerekir → eksper → rapor → itiraz | **Tetikleyici gerçekleşti mi?** Evet/hayır |
| Ödeme aylar sürer | **Günler** — CCRIF 14 gün içinde ödüyor |
| Muafiyet düşülür (DASK'ta %2) | Muafiyet yok |
| Hasar yönetim maliyeti yüksek → prim yüksek | Eksper yok → maliyet düşük → **prim düşük** |
| Uyuşmazlık riski yüksek | Tetikleyici şeffaf → uyuşmazlık minimum |
| Belge, fatura, ispat yükü sigortalıda | Beyan yeterli |
| Ahlaki riziko (moral hazard) var | Sigortalı tetikleyiciyi etkileyemez → **yok** |

**Düşük gelirli kiracı için belirleyici olan:** primin düşük olması ve paranın **hemen** gelmesi. Aylar sonra gelen tam tazminat, ilk hafta sokakta kalan kiracı için geç kalmış bir çözümdür.

### 1.1 🔴 Temel çerçeve: nakit akışı ürünü, zarar ürünü değil

Bu, tüm tasarımın üzerine oturduğu cümle:

> **Parametrik ürün, kaybı tazmin etmez; likidite sağlar.**

Bunun üç sonucu var:

1. **Vaat dürüst kurulmalı.** "Eşyanızı geri alırsınız" değil, "ilk günlerde elinizde nakit olur" denmeli. Yanlış beklenti, baz riski gerçekleştiğinde güveni yok eder.
2. **Klasik sigortanın yerine geçmez, tamamlar.** Kiracıya iki katmanlı öneri: parametrik (acil nakit) + eşya/ALE poliçesi (gerçek zarar).
3. **Tutar, zarara değil ihtiyaca göre kalibre edilir.** Soru "eşyası kaç lira?" değil, **"ilk 72 saatte neye ihtiyacı var?"**

---

## 2. Emsal analizi: Jumpstart (Kaliforniya, Oregon, Washington)

| Unsur | Jumpstart uygulaması |
|---|---|
| **Veri kaynağı** | USGS **ShakeMap** — bağımsız, resmî, kamuya açık |
| **Tetikleyici** | Mülkün yakınında **yer hızı (PGV) > 30 cm/s** |
| **Şiddet karşılığı** | Modified Mercalli Intensity ölçeğinde yaklaşık **VII ve üzeri** |
| **Ödeme** | **Sabit 10.000 USD** — tek seferde, tam tutar |
| **Muafiyet** | **Yok** |
| **Süreç** | Ödeme bölgesindeki müşteriler **olayın ertesi günü** bilgilendirilir |
| 🔴 **Talep** | Müşteri **kısa mesajla, gideri olduğunu teyit eder** — tek işlem bu |
| **Eksper / evrak** | Yok |
| **Prim** | Kaliforniya'da ortalama **aylık ~20 USD** |
| **Risk taşıyıcı** | **Lloyd's of London** |
| **Hedef kitle** | Kiracılar, ev sahipleri, küçük işletmeler, STK'lar, okullar, site yönetimleri |

**Çıkarılacak dersler:**

- **Tetikleyici PGV (yer hızı) seçilmiş, magnitüd değil.** Magnitüd depremin büyüklüğünü ölçer, **kişinin bulunduğu yerde ne hissedildiğini ölçmez.** 7,8'lik bir deprem 300 km ötede hasar yaratmaz. Yer hareketi ölçümü, baz riskini ciddi biçimde azaltır.
- **Sabit tutar, kademeli değil.** Basitlik, anlaşılabilirlik ve hız için.
- **Ödeme proaktif tetikleniyor** — kullanıcı başvurmuyor, sistem ona ulaşıyor. Deprem sonrası kaosunda bu çok önemli.
- **Tek onay adımı hem operasyonel hem hukuki bir mekanizma** (Bölüm 5.4).

---

## 3. Türkiye için tetikleyici tasarımı

### 3.1 Veri kaynağı: AFAD — resmî ve yönetmelik dayanaklı

Parametrik ürünün en kritik bileşeni, **tarafsız, resmî, manipüle edilemez ve kamuya açık** bir veri kaynağıdır. Türkiye'de bu mevcut:

| Kaynak | İçerik |
|---|---|
| **TADAS** — Türkiye İvme Veritabanı ve Analiz Sistemi ([tadas.afad.gov.tr](https://tadas.afad.gov.tr/)) | Kuvvetli yer hareketi istasyonlarının ivme kayıtları |
| **AFAD ShakeMap** | AFAD, PGA ve şiddet haritalarını **otomatik olarak ShakeMap ile üretiyor**, ardından **Türkiye'ye özgü yer hareketi tahmin denklemleri (GMPE)** ve fay mekanizması çözümleriyle rafine ediyor ⚠️ |
| **Türkiye Deprem Tehlike Haritası** | Her konum için belirli aşılma olasılıklarına karşılık gelen PGA, SS, S1 değerleri. RG 18.03.2018, yürürlük 01.01.2019 |
| **AFAD-Türkiye Deprem Veri Merkezi Sistemi Yönetmeliği** ⚠️ | Veri merkezinin **hukuki dayanağı** — sözleşmede referans verilebilecek resmî çerçeve |

> 🔴 **Bu, projenin en şanslı yanı.** ABD'de Jumpstart'ı mümkün kılan USGS ShakeMap'in Türkiye'deki dengi mevcut, üstelik **yönetmelikle kurulmuş** bir veri merkezi tarafından üretiliyor. Parametrik ürünün en zor önkoşulu zaten karşılanmış durumda.

### 3.2 Tetikleyici seçenekleri

| Seçenek | Nasıl çalışır | Baz riski | Değerlendirme |
|---|---|---|---|
| **Magnitüd + yarıçap** ("cat-in-a-box") | M ≥ 6,5 ve merkez üssü şu kutunun içindeyse öde | **Yüksek** — derinlik, zemin ve mesafe yok sayılır | ❌ Basit ama adaletsiz |
| **PGA eşiği** (ivme) | Kullanıcının konumunda PGA > eşik | Orta | ✅ Uygulanabilir |
| **PGV eşiği** (hız) | Kullanıcının konumunda PGV > eşik | **Düşük** | ✅ **Önerilen** — Jumpstart'ın tercihi; hasarla korelasyonu ivmeden daha iyidir |
| **MMI / şiddet** | Şiddet ≥ VII | Düşük | ✅ Anlaşılırlığı en yüksek olan |
| **Hibrit** | PGV eşiği **veya** resmî hasar tespiti "ağır/yıkık" | **En düşük** | ✅✅ Bölüm 4.3'e bakınız |

**Öneri:** Birincil tetikleyici **PGV veya şiddet (MMI)**; iletişimde **şiddet** kullanılmalı çünkü vatandaş "30 cm/s"yi değil, "şiddet 7" ifadesini anlar.

### 3.3 Ödeme yapısı

```
Şiddet VI ve altı    →  ödeme yok
Şiddet VII           →  tam ödeme          (barınma + acil ihtiyaç)
Şiddet VIII+         →  tam ödeme          (aynı tutar)
```

**Neden kademeli değil sabit?** Kademeli yapı hesaplanabilirliği ve güveni zayıflatır; kullanıcı "ne kadar alacağım?"ı önceden bilemez. Basitlik burada bir özellik, eksiklik değil. Kademelendirme ancak ürün olgunlaştıktan sonra düşünülmeli.

### 3.4 Tutar kalibrasyonu — zarara göre değil, ihtiyaca göre

Doğru soru: *"Kiracının deprem sonrası ilk 1–2 haftada neye ihtiyacı var?"*

| İhtiyaç | Not |
|---|---|
| Geçici barınma (otel / kısa dönem kiralama) | En büyük kalem |
| Yeni konut için depozito + peşin kira | Eski depozito malikte kilitli |
| Temel ihtiyaç (giysi, gıda, ilaç, hijyen) | |
| Ulaşım / şehir dışına çıkış | |
| Telefon, şarj, iletişim | Küçük ama kritik |

> ⚠️ **Somut tutar bu dokümanda önerilmiyor** — çünkü dürüst bir rakam, güncel barınma maliyeti verisiyle hesaplanmalı ve bu veriye erişimimiz yok. **Kalibrasyon yöntemi** şu olmalı: *hedef bölgede 2 haftalık geçici barınma + bir aylık kira depozitosu + temel ihtiyaç sepeti.* Tutar `data/parametreler.json`'a tarih damgalı biçimde yazılmalı ve **yıllık güncellenmelidir** — DASK teminatında yaşanan değer aşınması burada da geçerli.

### 3.5 Primin belirlenmesi

Prim, üç bileşenin toplamıdır:

```
Prim = Beklenen hasar (tetikleyici olasılığı × ödeme tutarı)
     + Risk marjı (belirsizlik ve sermaye maliyeti)
     + Operasyon gideri (eksper olmadığı için DÜŞÜK)
```

Tetiklenme olasılığı, **Türkiye Deprem Tehlike Haritası**'ndan konum bazında türetilebilir — harita zaten belirli aşılma olasılıklarına karşılık gelen yer hareketi parametrelerini veriyor. Bu, aktüeryal çalışmanın veri temelini hazır sunuyor.

> **Bölgesel fiyatlama tuzağı:** Riski en yüksek bölgede prim de en yüksek olur — yani ürüne en çok ihtiyacı olan kiracı en pahalı primle karşılaşır. Bu, sosyal amaçlı bir üründe kabul edilemez. Çözüm: **düz (tek) prim + çapraz sübvansiyon**, veya bağış/hibe destekli prim indirimi. Bu bir aktüerya kararı değil, **politika kararıdır** ve baştan verilmelidir.

---

## 4. Baz riski — ürünün en zayıf noktası

**Baz riski:** ödemenin gerçek zararla örtüşmemesi. İki yönü var:

| Tür | Ne olur | Etkisi |
|---|---|---|
| **Zarar var, ödeme yok** | Eşik az farkla aşılmadı ama kiracının evi yıkıldı | 🔴 **Yıkıcı** — güven biter, itibar zarar görür |
| **Ödeme var, zarar yok** | Eşik aşıldı ama kiracı zarar görmedi | Maliyet artar; ayrıca **hukuki risk** (Bölüm 5) |

Uluslararası uygulamada baz riski, parametrik ürünlerin **kabul görmesinin önündeki en büyük engel** olarak raporlanıyor.

### 4.1 CCRIF'in çözümü: ADC

CCRIF SPC, 2017'de **ADC (Additional Deductible Cover)** mekanizmasını getirdi: sahada zarar olmasına rağmen poliçenin tetiklenmediği durumlarda **kaçırılan ödeme olasılığını azaltan** bir ek teminat. Üyelerine ücretsiz sunuldu.

### 4.2 Türkiye için baz riski azaltma önlemleri

1. **Yer hareketi tabanlı tetikleyici** (magnitüd değil) — en temel önlem
2. **Yoğun istasyon ağı** — AFAD'ın kuvvetli yer hareketi ağı bu açıdan avantaj
3. **Zemin etkisinin hesaba katılması** — ShakeMap zaten zemin büyütmesini modelliyor ⚠️
4. **Şeffaf iletişim** — kullanıcı eşiği ve kendi konumunun tetiklenme olasılığını **satın alma anında** görmeli

### 4.3 🔴 Hibrit tetikleyici — önerilen çözüm

```
ÖDE, eğer:
   (a) konumdaki PGV/şiddet eşiği aşıldıysa          → hızlı, otomatik, günler içinde
   VEYA
   (b) resmî hasar tespiti "ağır hasarlı" veya "yıkık" ise → yavaş ama kesin, ikinci şans
```

(b) şıkkı, **"zarar var ama ödeme yok" senaryosunu büyük ölçüde kapatır.** Hasar tespiti zaten devlet tarafından, ücretsiz ve her afetzede için yapılıyor — yani ek eksper maliyeti doğurmaz.

> Bu tasarım, ürünü `PROJE.md` ve `PROJE-LEGAL.md`'deki **hasar tespiti** eksenine bağlar: aynı hasar kaydı hem lojistik talebini, hem hukuki süre takvimini, hem de parametrik ödemenin ikinci tetikleyicisini besler. **Üç sistem tek veri noktasında buluşur.**

---

# BÖLÜM II — HUKUKİ ANALİZ

## 5. 🔴 Türk hukukunda parametrik sigorta

### 5.1 Açık düzenleme yok

Türkiye'de parametrik sigorta için **özel bir yasal düzenleme bulunmuyor.** Ürün, TTK'nın genel sigorta hükümleri altında değerlendirilmek zorunda ve burada iki ilkeyle çatışma riski var.

### 5.2 Sigortalanabilir menfaat ve zenginleşme yasağı

Türk sigorta hukukunda **zenginleşme yasağı** yasal bir ilkedir; TTK ve yerleşik yüksek mahkeme kararlarıyla desteklenir. **TTK m.1461** uyarınca sigortacının sorumluluğu **sigorta bedeliyle sınırlıdır** — sigortalının menfaati sigorta bedelini aşsa bile sigortacı daha fazlasını ödemez. ⚠️

Sorun şurada: parametrik üründe ödeme **gerçek zarara bakılmaksızın** yapılır. Zarar 5.000 TL iken ödeme 30.000 TL olursa, sigortalı **zararından fazlasını** almış olur — bu, zenginleşme yasağıyla doğrudan gerilim yaratır.

Doktrinde parametrik sözleşmelerin TTK karşısındaki geçerliliği **tam olarak bu iki başlık** (sigortalanabilir menfaat + zenginleşme yasağı) üzerinden tartışılmaktadır. ⚠️

### 5.3 🔴 En ağır risk: kumar ve bahis sayılma

Kritik hüküm: **ruhsatname almamış bir şahısla yapılan sigorta sözleşmesi hakkında kumar ve bahse ilişkin hükümler uygulanır.** ⚠️

Kumar ve bahisten doğan alacaklar **dava edilemez ve talep edilemez** (eksik borç). Yani yanlış kurgulanmış bir parametrik ürün:

- Sigorta sözleşmesi sayılmayabilir,
- Ödeme taahhüdü **hukuken talep edilemez** hale gelebilir,
- Kullanıcı prim öder ama ödeme alamazsa **elinde dava hakkı olmaz.**

Bu, kullanıcıyı korumak için kurulan bir üründe **kabul edilemez** bir sonuçtur ve tasarımın kırmızı çizgisidir.

### 5.4 🔴 Çözüm: Jumpstart'ın "gider beyanı" mekanizması

Jumpstart'ın süreci burada teknik bir ayrıntı değil, **hukuki mimarinin kalbi**:

> Ödeme bölgesindeki müşteri bilgilendirilir ve **kısa mesajla, gideri olduğunu teyit eder.** Ondan sonra ödeme yapılır.

Bu tek adım üç işi birden görüyor:

1. **Sigortalanabilir menfaati kurar** — sigortalı bir zarara/gidere uğradığını beyan eder
2. **Kumar/bahis niteliğini bertaraf eder** — ödeme salt bir olayın gerçekleşmesine değil, **sigortalının gider yükünü beyanına** bağlanır
3. **Operasyonel yükü artırmaz** — tek mesaj, eksper yok, belge yok

**Türkiye'ye uyarlama önerisi:**

```
Tetikleyici gerçekleşti
   → sistem kullanıcıya ulaşır (SMS/uygulama)
   → kullanıcı beyan eder: "Deprem nedeniyle gider/zarara uğradım"
      (tek ekran, belge yok, tutar sorulmaz)
   → ödeme yapılır
```

Beyan **belge veya tutar istemez** — yalnızca zararın varlığını teyit eder. Böylece hız korunur, hukuki temel kurulur. Sözleşmede ödemenin **götürü tazminat** niteliği ve **azami sigorta bedeli** açıkça tanımlanmalıdır.

> ⚠️ Bu, önerilen bir çözüm yoludur; **sigorta hukukçusu tarafından TTK m.1401 vd. ve m.1461 karşısında ayrıca değerlendirilmelidir.** Konuya ilişkin akademik çalışma mevcuttur: *Parametrik Sigorta Sözleşmeleri (Gösterge Temelli Sigorta Sözleşmeleri)*, Türk-Alman Üniversitesi Hukuk Fakültesi Dergisi.

### 5.5 Konumlandırma stratejisi

Açık düzenleme yokken en güvenli yol, ürünü **mikro-sigorta veya destek paketi** olarak konumlandırmaktır ⚠️. Bunun pratik anlamı:

- **Küçük tutar** — zenginleşme tartışmasını zayıflatır; ödeme "kaybın karşılığı" değil "acil destek" ölçeğinde kalır
- **Açık ürün adı** — "deprem tazminatı" değil, **"acil nakit desteği"**
- **Tamamlayıcı konum** — DASK ve eşya sigortasının yerine geçmediği sözleşmede ve arayüzde açıkça yazılır

### 5.6 Ruhsat ve onay yolu

| Gereklilik | Kim yapar |
|---|---|
| Sigorta ürününü sunmak | **Ruhsatlı sigorta şirketi** — STK asla taşıyıcı olamaz |
| Ürün/genel şart onayı | **SEDDK** — genel şartlar, tarife ve talimatlar bu kurumda düzenleniyor |
| Aracılık (satış) | Ruhsatlı **acente veya broker** — dernek/vakıf doğrudan yapamaz ([`PROJE-AKIS.md`](./PROJE-AKIS.md) Bölüm 10) |
| Risk taşıma / kapasite | Sigortacı + **reasürör** (Jumpstart'ta Lloyd's) |

> **STK'nın rolü net:** ürünü **tasarlatan, savunan, anlatan ve erişimi yaygınlaştıran** taraf olabilir; **satan ve riski taşıyan** taraf olamaz.

---

# BÖLÜM III — DASK PROTOKOL YAKLAŞIMI

## 6. DASK'ın hukuki yapısı — beklentiyi doğru ayarlamak

| Unsur | Durum |
|---|---|
| Hukuki statü | **Kamu tüzel kişisi**, 6305 sayılı Kanunla kurulmuş ⚠️ |
| Yetkinin kaynağı | Özel kanunla verilmiş **deprem sigortası düzenleme yetkisi** |
| 5684 ve TTK | DASK hakkında **doğrudan uygulanmaz** ⚠️ |
| Poliçe düzenleme | **Yetkili sigorta şirketleri ve acenteleri, DASK adına** düzenler |
| Dağıtım ağı | Tüm sigorta şirketleri, acenteleri ve **banka şubeleri** |
| Teknik işletici | Ayrı bir yapı mevcut ⚠️ |
| Ödeme kapasitesi | 31.12.2021: **46 milyar TL** (14,9 milyar birikmiş fon + 31,9 milyar hasar fazlası reasürans) ⚠️ |
| Alternatif risk transferi | 2013'te **Bosphorus 1 Re** (Bermuda) üzerinden **400 milyon USD katastrofi bonosu**; 100 milyonluk ilk ihraca ~6 kat talep gelmiş ⚠️ |

### 6.1 🔴 Kritik sınır: DASK yeni ürün sunamaz

DASK'ın faaliyet konusu 6305 ile çizilmiştir ve **kanunun belirlediği sınırlar dışında yeni sigorta ürünleri sunması yasal olarak çok sınırlıdır.** ⚠️

**Bunun anlamı:** "DASK bünyesinde kiracı poliçesi" fikri — [`PROJE-AKIS.md`](./PROJE-AKIS.md) Bölüm 3.2'de CEA modelinden esinlenerek önerilen — bir protokolle değil, **kanun değişikliğiyle** mümkün olur. Bu, projeyi bir yazılım işinden **politika savunuculuğu** işine dönüştürür.

Bu kötü haber değil; **doğru haber.** Protokol beklentisi buna göre kurulmalı: DASK'tan bugün alınabilecek şey ürün ortaklığı değil, **veri, bilgilendirme ve erişim** işbirliğidir.

### 6.2 DASK aslında parametrik dili biliyor

Katastrofi bonosu, tetikleyiciye bağlı ödeme yapan bir enstrümandır — **sovereign düzeyde parametrik risk transferi.** DASK bunu 2013'ten beri kullanıyor.

> **Savunuculuk argümanı:** *"DASK kendi riskini parametrik olarak transfer ediyor. Aynı mantığın vatandaş tarafında, özellikle hiçbir teminatı olmayan kiracı için kullanılmaması bir boşluktur."* Bu, kurumun kendi diliyle konuşan güçlü bir argümandır.

---

## 7. Üç protokol katmanı

### Katman 1 — Veri ve bilgilendirme işbirliği ✅ bugün başlatılabilir

| Konu | İçerik |
|---|---|
| Poliçe sorgulama yönlendirmesi | Kullanıcının DASK poliçesinin olup olmadığını öğrenmesi için resmî kanala yönlendirme |
| Doğru bilgi ortaklığı | Platformdaki DASK içeriğinin DASK tarafından teyidi — **hukuki doğruluk açısından paha biçilmez** |
| Güncel tarife verisi | `data/parametreler.json`'ın aylık güncellenen değerleri için resmî kaynak |
| Ortak farkındalık kampanyası | "DASK ne kapsar, ne kapsamaz" — DASK'ın da yararına, çünkü yanlış beklenti DASK'a itibar zararı veriyor |

**Neden DASK kabul edebilir:** Kurumun kendi iletişim hedefiyle örtüşüyor, hukuki risk taşımıyor, maliyeti yok.

### Katman 2 — Hasar süreci takibi ⚠️ orta vadeli

| Konu | İçerik |
|---|---|
| Toplu takip | STK'nın, tıkanan hasar dosyalarını **toplulaştırılmış** biçimde DASK'a bildirmesi |
| Geri bildirim döngüsü | Sahada en çok nerede tıkanma olduğunun veriyle gösterilmesi |
| Kullanıcı adına başvuru | ❌ **Önerilmez** — temsil ve sorumluluk riski ([`PROJE-AKIS.md`](./PROJE-AKIS.md) Bölüm 9.2) |

**Dikkat:** Bu katman KVKK açısından dikkatli kurgulanmalı; bireysel dosya verisi değil, **anonim/toplu tıkanma verisi** paylaşılmalı.

### Katman 3 — Ürün ortaklığı 🔴 kanun değişikliği gerektirir

| Konu | Durum |
|---|---|
| DASK bünyesinde kiracı poliçesi | 6305 değişikliği gerekir |
| DASK dağıtım ağının kullanımı | DASK'ın kendi ürünü olmayan bir ürün için ağını açması hukuken tartışmalı ⚠️ |
| **Gerçekçi alternatif** | Ürünü **özel sigortacı** sunar; DASK yalnızca **tamamlayıcılığı teyit eder** ve yanlış anlaşılmayı önler |

---

## 8. Kim taşıyacak? — önerilen mimari

```
   RİSK TAŞIYICI          Ruhsatlı sigorta şirketi + reasürör
        │                 (Jumpstart'ta: Lloyd's)
        │
   ÜRÜN ONAYI             SEDDK — genel şartlar ve tarife
        │
   DAĞITIM                Ruhsatlı acente / broker
        │                 (STK burada DEĞİL)
        │
   TETİKLEYİCİ VERİ       AFAD — TADAS / ShakeMap / şiddet haritası
        │                 (yönetmelik dayanaklı, tarafsız)
        │
   STK'NIN ROLÜ           Tasarım · savunuculuk · anlatım · erişim
                          Şeffaflık denetimi · kullanıcı temsili
                          ❌ satış yok  ❌ risk taşıma yok  ❌ prim tahsili yok
```

Bu mimari, [`PROJE-AKIS.md`](./PROJE-AKIS.md) Bölüm 10'daki gelir modeli analiziyle tutarlı: STK aracılık yapmaz, faaliyet lisanslı taraflarda kalır.

---

## 9. Fizibilite ve yol haritası

### Hackathon (V0) — kanıtlanabilir olan

- [ ] **Tetikleyici simülasyonu:** 6 Şubat 2023 verisiyle "kim ödeme alırdı?" haritası. Geçmiş AFAD şiddet/PGV verisi üzerinde çalıştırılırsa, ürünün ne kadarını kapsayacağı **somut olarak gösterilebilir** — jüriye anlatılacak en güçlü çıktı budur.
- [ ] **Baz riski görselleştirmesi:** aynı harita üzerinde "ödeme aldı ama hasarsız" ve "hasarlı ama ödeme yok" bölgelerinin dürüstçe gösterilmesi
- [ ] Hibrit tetikleyicinin (Bölüm 4.3) kapsamı ne kadar iyileştirdiğinin ölçülmesi
- [ ] Ürün tek sayfalık özeti (sigortacı ve DASK görüşmeleri için)

### V1 — ortaklık kurulumu

- [ ] Sigorta hukukçusu ile TTK uyum görüşü (Bölüm 5)
- [ ] Aktüeryal ön çalışma — tetiklenme olasılığı ve prim aralığı
- [ ] Sigortacı ve reasürör görüşmeleri
- [ ] AFAD ile veri kullanımı görüşmesi — **sözleşmede referans verilecek resmî veri tanımı**
- [ ] DASK Katman 1 protokolü

### V2 — ürün ve politika

- [ ] SEDDK ürün başvurusu
- [ ] Pilot bölge uygulaması
- [ ] **Politika savunuculuğu:** 6305'te kiracı teminatı için değişiklik önerisi

---

## 10. Riskler ve dürüst değerlendirme

| Risk | Etki | Azaltma |
|---|---|---|
| 🔴 **Kumar/bahis nitelendirmesi** | Ürün hukuken çöker | Gider beyanı mekanizması (5.4) + hukukçu görüşü + ruhsatlı taşıyıcı |
| 🔴 **Baz riski gerçekleşir** — hasarlı kiracı ödeme alamaz | İtibar yıkımı | Hibrit tetikleyici (4.3) + satın alma anında şeffaf iletişim |
| **DASK'tan ürün ortaklığı beklentisi** | Zaman kaybı | Katman 1'den başla, Katman 3'ü politika hedefi olarak konumla |
| **Aktüeryal veri yokluğu** | Fiyatlanamaz | Deprem Tehlike Haritası + sigortacı aktüeryası |
| **Düşük gelirli hedef kitle prim ödeyemez** | Ürün ulaşamaz | Düz prim + çapraz sübvansiyon; bağış destekli prim |
| **Sigortacı ilgisizliği** | Ortak bulunamaz | Küçük tutar + düşük operasyon maliyeti + itibar getirisi; 6 Şubat sonrası parametrik ilgisi artıyor |
| **Ürünün yanlış anlaşılması** | Güven kaybı | "Nakit akışı ürünü" çerçevesinin her yerde tutarlı kullanımı |

> **En büyük risk teknik değil, iletişimsel.** Kullanıcı bunu "deprem sigortası" sanırsa ve evi yıkıldığında 30.000 TL alırsa, ürünü dolandırıcılık olarak algılar. Vaadin dürüstlüğü, ürünün kendisinden önce gelir.

---

## 11. Açık sorular

- Ödeme tutarı ne olmalı? Güncel geçici barınma maliyeti verisi gerekiyor.
- AFAD verisi **sözleşmeye esas alınabilir mi** — resmî, zamanında ve değişmez biçimde yayımlanıyor mu? Yayım gecikmesi ödeme süresini belirler.
- AFAD ShakeMap çıktıları sonradan **revize ediliyor mu?** Revize edilen bir tetikleyici sözleşmeye esas alınamaz — hangi sürümün bağlayıcı olacağı tanımlanmalı.
- Hangi sigortacı ilk ortak olur? Reasürans kapasitesi Türkiye'den mi, Lloyd's'dan mı?
- Kayıt dışı kiracı bu ürünü alabilir mi? (Kira sözleşmesi şartı konursa en muhtaç grup dışarıda kalır — **konmamalı**; sadece adres beyanı yeterli olmalı.)
- Ürün DASK'ı zayıflatır mı? Aksine tamamlayıcı olduğu nasıl gösterilir?
- Prim tahsilatı nasıl olacak — aylık mikro ödeme altyapısı düşük gelirli kitlede çalışır mı?

---

## 12. Doğrulama notu

⚠️ **Bu dokümandaki hiçbir hukuki tespit resmî kaynaktan doğrulanmamıştır.** Ağ kısıtı nedeniyle `mevzuat.gov.tr`, `dask.gov.tr`, `seddk.gov.tr` ve `tadas.afad.gov.tr` erişilemedi; Mevzuat MCP kurulu olmasına rağmen aynı engel nedeniyle çalışmadı.

Doğrulanması gerekenler [`DOGRULAMA.md`](./DOGRULAMA.md) § K'ya eklenmiştir. Özellikle şunlar **ürün kararı verilmeden önce** teyit edilmelidir:

1. TTK m.1461 ve sigortalanabilir menfaat hükümlerinin tam metni
2. Ruhsatsız sigortada kumar/bahis hükümlerinin uygulanmasına ilişkin hüküm (TTK) ve atıf yapılan TBK maddeleri
3. 6305'te DASK'ın faaliyet konusunu çizen madde
4. AFAD-Türkiye Deprem Veri Merkezi Sistemi Yönetmeliği
5. SEDDK ürün/genel şart onay süreci

---

## Kaynaklar

**Parametrik sigorta — uluslararası uygulama**
- [Jumpstart Insurance — blog ve ürün sayfaları](https://blog.jumpstartinsurance.com/earthquake-insurance-for-small-businesses/) · [Jumpstart Parametric Earthquake Firm on Move in West — Insurance Journal](https://www.insurancejournal.com/news/west/2021/01/22/598416.htm) · [Jump-starting earthquake insurance uptake in California — Earth Magazine](https://www.earthmagazine.org/article/jump-starting-earthquake-insurance-uptake-california)
- [CCRIF SPC — SSS](https://www.ccrif.org/frequently-asked-questions?language_content_entity=en) · [CCRIF Model Evolution (PDF)](https://www.ccrif.org/sites/default/files/DRF-Course-2023/CCRIFModel-Evolution-February2023.pdf) · [PCRIC vaka çalışması — Global Shield (PDF)](https://www.globalshield.org/wp-content/uploads/2024/08/Global-Shield-Workshop-Fiji-PCRIC-case-study.pdf)
- [Parametric Insurance Is a Cash Flow Product, Not a Loss Product](https://faroeio.substack.com/p/parametric-insurance-is-a-cash-flow)
- [Managing Basis Risks in Weather Parametric Insurance — arXiv](https://arxiv.org/pdf/2409.16599) · [Parametric Insurance — Climate Policy Initiative (PDF)](https://www.climatepolicyinitiative.org/wp-content/uploads/2026/01/Parametric-Insurance.pdf)

**Türk hukuku**
- [Parametrik Sigorta Sözleşmeleri (Gösterge Temelli Sigorta Sözleşmeleri) — Türk-Alman Üniversitesi HFD](https://dergipark.org.tr/tr/pub/tauhfd/article/1610485)
- [Zarar Sigortalarında Menfaat Eksikliğinin Sonuçları — DergiPark](https://dergipark.org.tr/tr/download/article-file/4995474)
- [Sigorta Hukukunda Zenginleşme Yasağı](https://mecogalan.av.tr/sigorta-hukukunda-zenginlesme-yasagi/)
- [TTK 6. Kitap — Sigorta Hukuku (PDF)](https://www.tsb.org.tr/content/Legislations/Turk_Ticaret_Kanunu_6.Kitap.pdf)
- [Doğal Afet Sigortaları Kurumu'nun Hukuki Durumu — Lexpera Blog](https://blog.lexpera.com.tr/dogal-afet-sigortalari-kurumunun-hukuki-durumu-ve-sozlesme-sonrasi-bilgilendirme-yukumlulugu/)
- [SEDDK — Genel Şartlar](https://www.seddk.gov.tr/tr/mevzuat/sigortacilik/genel-sartlar) · [Tarife ve Talimatlar](https://www.seddk.gov.tr/tr/mevzuat/sigortacilik/tarife-ve-talimatlar)

**Tetikleyici verisi**
- [AFAD TADAS — Türkiye İvme Veritabanı ve Analiz Sistemi](https://tadas.afad.gov.tr/)
- [AFAD — Türkiye Deprem Tehlike Haritası](https://www.afad.gov.tr/turkiye-deprem-tehlike-haritasi) · [deprem.afad.gov.tr](https://deprem.afad.gov.tr/deprem-tehlike-haritasi)
- [AFAD-Türkiye Deprem Veri Merkezi Sistemi Yönetmeliği — mevzuat.gov.tr](https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatTur=7&MevzuatNo=21104&MevzuatTertip=5)

**DASK yapısı**
- [DASK — Yetkili Sigorta Şirketleri](https://dask.gov.tr/tr/yetkili-sigorta-sirketleri) · [Poliçe Üretim](https://dask.gov.tr/tr/police-uretim) · [ZDS Genel Şartlar](https://dask.gov.tr/tr/zds-genel-sartlar)
- [DASK 2018 Faaliyet Raporu (PDF)](https://www.dask.gov.tr/upload/Dask/Raporlar/Faaliyetraporlari/2018_dask_faaliyet_raporu.pdf)
- [Türkiye'nin ilk afet bonosu ihraç edildi — Dünya](https://www.dunya.com/sektorler/sigortacilik/turkiye039nin-ilk-afet-bonosu-ihrac-edildi-haberi-209776) · [DASK Reasürans Anlaşmaları — Doç. Dr. Metin Sarıaslan](http://www.metinsariaslan.com/zorunlu-deprem-sigortasi/)
