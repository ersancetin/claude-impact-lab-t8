# Akış Tasarımı: Kiracının Korunması ve Tek Pencere Modeli

**Ekip:** T8 — Hasar Tespiti
**Durum:** Tasarım tartışması / taslak
**Son güncelleme:** 2026-08-15
**İlgili:** [`PROJE.md`](./PROJE.md) · [`PROJE-LEGAL.md`](./PROJE-LEGAL.md) · [`DOGRULAMA.md`](./DOGRULAMA.md)

---

## Özet: iki soru, iki cevap

**Soru 1 — Tapusu olmadığı için sistemin dışında kalan kiracı nasıl ayağa kalkar?**

Türkiye'nin afet toparlanma sistemi baştan sona **mülkiyet ekseni** üzerine kurulu. DASK binayı sigortalar ve malike öder; 7269 hak sahipliği "yıkılan binayla mülkiyet ilişkisi" arar; afet konutu malike verilir; arsa payı malikin hakkını belirler. Kiracı bu zincirin hiçbir halkasında yok.

Ama **bir istisna var ve çok az kullanılıyor:** haksız fiil tazminatında mülkiyet şartı yoktur. Kiracı da müteahhide, yapı denetime ve idareye karşı **kendi zararı için** dava açabilir. Sistemin dışında kalan kiracının elindeki en güçlü araç budur ve neredeyse hiç anlatılmaz.

Kalıcı çözüm ise sigorta tarafında: **kiracı kendi eşyası için poliçe yaptırabilir** — bunu bilen yok. Uluslararası karşılığı *renters insurance*'tır ve içinde Türkiye'de hiç konuşulmayan bir teminat var: **alternatif konaklama gideri (ALE)**.

**Soru 2 — Afetzede dağınık kurumlar arasında kaybolmadan hangi adımda olduğunu nasıl bilir?**

Sorun bilgi eksikliği değil, **durum takibi** eksikliği. Kullanıcı "hakkım var mı?"yı öğrense bile "başvurdum mu, cevap geldi mi, sıradaki ne, süresi ne zaman doluyor?"u takip edemiyor; çünkü bu bilgi DASK, AFAD, ÇŞB, belediye, SGK ve bankaya dağılmış durumda.

Cevap: **vaka dosyası + durum makinesi.** `PROJE.md`'deki talep yaşam döngüsünün aynısı, bu kez afetzedenin kendi dosyası için. Kritik tasarım kararı: bu **kurum entegrasyonuyla değil**, kullanıcı beyanı + belge yükleme + takvim ile çözülür (gerekçesi Bölüm 6'da).

---

# BÖLÜM I — KİRACI SORUNU

## 1. Kiracı neden sistemin dışında kalıyor?

Bu bir uygulama hatası değil, **sistemin tasarım tercihi.** Mevzuat mülkiyeti esas alıyor:

| Mekanizma | Ölçüt | Kiracı? |
|---|---|---|
| **DASK** | Bina sigortalanır, tazminat **malike** ödenir | ❌ Poliçe malik adına; kiracının eşyası Genel Şartlar A.3 ile **açıkça teminat dışı** |
| **7269 hak sahipliği** | "Yıkılan/ağır hasarlı binayla **mülkiyet ilişkisi**" | ❌ Mülkiyet ilişkisi yok |
| **Afet konutu / faizsiz kredi** | Hak sahipliğine bağlı | ❌ |
| **Arsa payı / yeniden inşa** | Malik hakkı (KMK m.47) | ❌ |
| **Kentsel dönüşüm oylaması** | Arsa payı = oy ağırlığı | ❌ Oy hakkı yok, sonucuna katlanıyor |

### Kiracının gerçek kaybı ile sistemin kapsamı

| Kiracının kaybı | Kapsayan var mı? |
|---|---|
| **Ev eşyası** (mobilya, beyaz eşya, elektronik) | DASK ❌ · İhtiyari eşya poliçesi ✅ (varsa) |
| **Barınma** — nereye gidecek? | AFAD/6306 kira yardımı ⚠️ kısmen |
| **Depozito** — kiraya verende kaldı | Hukuken iade edilmeli, pratikte kayıp |
| **Peşin ödenmiş kira** | Sebepsiz zenginleşme — talep edilmeli |
| **Taşınma masrafı** | 2023'te 15.000 TL ⚠️ (kalıcı hak değil) |
| **Bedeni zarar / yakın kaybı** | DASK ❌ · Hayat/ferdi kaza poliçesi (varsa) |
| **İş ve okul bağının kopması** | ❌ |

> **Sonuç:** Malik en azından binası için sigortalı ve devlet konutu kuyruğunda. Kiracı ise **hiçbir kuyrukta değil.** Elinde kalan tek şey, mülkiyet şartı aramayan hukuk yolları.

---

## 2. 🔴 Kiracının bugün sahip olduğu ama bilmediği haklar

Bu liste, platformun kiracıya söyleyeceği asıl şeydir.

### 2.1 En güçlü araç: tazminat davasında mülkiyet şartı yoktur

Hak sahipliği "mülkiyet ilişkisi" arar. **Haksız fiil tazminatı aramaz.** Kiracı da:

- **Müteahhide karşı** — binanın ayıplı yapımı nedeniyle uğradığı eşya zararı, bedeni zarar ve yakınının ölümü için
- **Yapı denetim kuruluşuna karşı** (4708)
- **İdareye karşı** — tam yargı davası (ruhsat, iskân, denetim kusuru)
- **Kiraya verene karşı** — kiralananın ayıplı olması (TBK m.305 vd.); kiraya verenin, güvenli olmayan bir yapıyı kiraya vermekten doğan sorumluluğu ⚠️

dava açabilir. Ceza yargılamasında da **mağdur/katılan** sıfatını alabilir.

> Bölüm 9.5'teki kararlarda (müteahhitlere 17–21+ yıl) ölenlerin bir kısmı kiracıydı. Ceza davası malik-kiracı ayrımı yapmaz; **tazminat davası da yapmaz.** Kiracıya söylenmesi gereken ilk şey budur.

### 2.2 Kiracı kendi adına eşya sigortası yaptırabilir

**Neredeyse hiç bilinmeyen bilgi:** Kiracı DASK yaptıramaz (poliçe binaya ve malike bağlıdır), ama **kendi eşyası için konut sigortası yaptırabilir.** Bina malikin, eşya kiracının — sigortası da ayrı.

Aylık maliyeti düşük, karşılığı yüksek bir üründür ve Türkiye'de kiracılar arasında yaygınlığı çok düşüktür. Platformun deprem öncesi mesajı burada netleşiyor:

> *"Malik binayı sigortalar, siz eşyanızı sigortalarsınız. DASK'ınız yok çünkü olamaz — ama sigortasız olmak zorunda değilsiniz."*

### 2.3 Diğer haklar

| Hak | Dayanak | Not |
|---|---|---|
| Kira sözleşmesini feshetme | TBK m.331 (önemli sebep) / m.136 (ifa imkânsızlığı) | Ağır hasar önemli sebep sayılabilir |
| Kira ödeme borcunun sona ermesi | Taşınmazın iade edildiği tarihe kadar sürer ⚠️ | |
| Kira bedelinde indirim / onarım talebi | TBK m.305 vd. (ayıp) | Hasarlı ama kullanılabilir konutta |
| **6306 kira yardımı** | Riskli yapıda oturan kiracıya da | 18 aya kadar ⚠️; maliklere yapılanın 2 katı bir defalık ⚠️ |
| AFAD kira yardımı | 2023: aylık 3.000 TL ⚠️ | Kalıcı hak değil |
| Riskli yapı sürecinde taraf olma | 6306 | Kiracı da tespit sürecinde hak sahibidir |
| Depozito ve peşin kira iadesi | TBK / sebepsiz zenginleşme | |

---

## 3. Dünyada kiracı nasıl korunuyor?

Türkiye'nin boşluğu, başka ülkelerde standart bir ürünle kapatılmış: **renters insurance / contents insurance.**

### 3.1 Renters insurance'ın üç ayağı

| Teminat | İçerik |
|---|---|
| **Personal property** | Kiracının eşyası — poliçe limitleri tipik olarak 20.000–50.000 USD |
| **Liability** | Kiracının üçüncü kişilere verdiği zarar |
| 🔴 **Additional Living Expenses (ALE) / loss of use** | **Konut oturulamaz hâle gelirse geçici barınma, otel, kısa dönem kiralama ve yemek masrafları.** Tipik olarak 12 ay veya eşya limitinin %20'si ile sınırlı |

**ALE, Türkiye'de kiracı için hiç konuşulmayan teminattır** ve kiracının en büyük ihtiyacını — "bu gece nerede kalacağım?" — doğrudan karşılar. DASK'ın açıkça teminat dışı bıraktığı "alternatif ikametgâh masrafları" tam olarak budur (Genel Şartlar A.3).

### 3.2 Deprem, standart poliçede istisnadır — ek teminat gerekir

Önemli uyarı: ABD'de de standart renters insurance **depremi kapsamaz**; ayrı deprem teminatı veya ayrı poliçe gerekir. Kaliforniya'da **CEA (California Earthquake Authority) kiracılar için ayrı poliçe** sunar — eşya + ALE, yüzde bazlı muafiyetle.

> **Türkiye için çıkarım:** DASK'ın kiracı muadili yok. CEA'nın "renters policy"si, DASK bünyesinde veya özel sigorta eliyle kurulabilecek bir modelin hazır örneğidir. Bu, projenin **politika önerisi** boyutudur.

### 3.3 Parametrik mikrosigorta — kiracı için en uygun model

Kiracının sorunu iki katmanlı: teminat yok, **ve** olsa bile eksper süreci aylar sürüyor. Parametrik sigorta ikisini birden çözüyor:

- Ödeme, **ölçülebilir bir tetikleyiciye** bağlıdır (deprem büyüklüğü + konum), hasar tespitine değil
- **Eksper gerekmez** → hasar yönetim maliyeti çok düşük → prim düşük
- Ödeme **hızlıdır** → afetzedenin ilk 72 saatteki nakit ihtiyacını karşılar
- Uyuşmazlık riski neredeyse sıfırdır; tetikleyici şeffaftır

Türkiye'de henüz yaygın değil, ancak 6 Şubat 2023 sonrasında ilgi hızla artmış durumda. Düşük gelirli kiracı için **düşük primli, hızlı ödemeli, küçük tutarlı** bir parametrik ürün, klasik eşya sigortasından daha gerçekçi olabilir.

> **Öneri:** Kiracıya iki katmanlı bir çözüm sunulmalı — *acil nakit* için parametrik mikro ürün, *eşya ve barınma* için klasik eşya + ALE teminatlı poliçe.

---

## 4. Kira sözleşmesi klozları — tartışmaya açık fikirler

Kiracının korunması yalnızca sigortayla değil, **sözleşmeyle** de sağlanabilir. Aşağıdakiler ekipteki hukukçular tarafından değerlendirilip yazılacak **fikirlerdir**, hazır kloz metni değildir:

1. **Yapı bilgisi şeffaflığı klozu** — Kiraya veren; yapı ruhsatı, iskân, varsa risk tespit raporu ve binanın yapım yılını sözleşme ekinde beyan eder. *Amaç: kiracının bilerek karar vermesi.*
2. **Risk tespiti bilgilendirme klozu** — Bina hakkında riskli yapı tespiti başvurusu yapılmışsa veya yapılırsa kiracıya bildirim yükümlülüğü.
3. **Afet hâlinde fesih ve iade klozu** — Ağır hasar/yıkım hâlinde sözleşmenin kendiliğinden sona ermesi, **depozitonun belirli süre içinde iadesi** ve peşin kiranın oranlanarak iadesi. *Amaç: TBK'nın genel hükümlerini beklemeden netlik.*
4. **Eşya sigortası teşvik klozu** — Kiracının eşya sigortası yaptırması hâlinde kiraya verenin katkısı veya kira indirimi. *Amaç: sigortalılığı yaygınlaştırmak.*
5. **Alternatif konaklama klozu** — Kiraya verenin, kendi kusuru bulunan hâllerde geçici barınma katkısı.

> ⚠️ **Sınır:** Bu klozların somut olaya uyarlanması ve yazımı avukatlık faaliyetidir ([`PROJE-LEGAL.md`](./PROJE-LEGAL.md) Bölüm 1). Platform bunları **örnek/tartışma metni** olarak yayımlayabilir; kullanıcının sözleşmesine özel kloz yazamaz.

---

# BÖLÜM II — TEK PENCERE

## 5. Sorun: bilgi değil, durum takibi

Kullanıcı "hasar tespitine 30 gün içinde itiraz edebilirim"i öğrenir. Sonra ne olur?

- İtiraz etti mi, ne zaman etti?
- İdare cevap verdi mi? Vermezse ne zaman zımni ret olur?
- DASK ihbarı yapıldı mı, eksper geldi mi, rapor tebliğ edildi mi?
- Hak sahipliği ilanı yapıldı mı, 2 ay ne zaman doluyor?
- Şu an **hangi aşamadayım ve sıradaki adım ne?**

Bu bilgi altı ayrı kuruma dağılmış durumda ve hiçbiri diğerini bilmiyor. **Afetzedenin kaybolduğu yer burası.**

## 6. 🔴 Neden kurum entegrasyonu değil, vaka dosyası?

Kullanıcının önerdiği akışta "otomatik olarak poliçe bilgileri çekilir" adımı var. Bunu netleştirelim:

**Poliçe/hasar verisinin otomatik çekilmesi bir kodlama işi değil, bir protokol işidir.** DASK ve SBM (Sigorta Bilgi ve Gözetim Merkezi) verileri kamuya açık API ile sunulmuyor; erişim için kurumsal protokol, KVKK açık rıza altyapısı ve büyük olasılıkla e-Devlet entegrasyonu gerekir. Bu, ay veya yıl ölçeğinde bir kurumsal ilişki demektir.

> **Tasarım kararı: sistem entegrasyon olmadan da tam çalışmalı, entegrasyon geldiğinde iyileşmeli.**

| Katman | Entegrasyonsuz (V0 — bugün yapılabilir) | Entegrasyonla (V2 — protokol sonrası) |
|---|---|---|
| Poliçe bilgisi | Kullanıcı poliçe no girer / e-Devlet'e yönlendirilir | SBM/DASK sorgusu |
| Başvuru durumu | Kullanıcı beyanı + belge yükleme | Kurum API'sinden durum |
| Süre takibi | **Tam çalışır** — beyan edilen tarihlerden hesaplanır | Aynı, doğrulanmış tarihlerle |
| Hatırlatma | **Tam çalışır** | Aynı |

**Kritik nokta:** Ürünün en değerli parçası olan süre takibi ve yol haritası, **hiçbir entegrasyon gerektirmiyor.** Entegrasyonu V0'ın önkoşulu yapmak, projeyi hiç başlamadan kurumsal bir bekleme odasına kilitler.

## 7. Vaka dosyası ve durum makinesi

Her afetzede için tek bir dosya; içinde kişiselleştirilmiş bir yol haritası:

```
VAKA DOSYASI                                    [doğrulama kodu: 7K3-M92]
─────────────────────────────────────────────────────────────────────
Profil: Kiracı · Hatay/Antakya · Bina ağır hasarlı · DASK yok (malikte)

  ✅ TAMAMLANDI    Hasar tespiti sonucu öğrenildi        12.02.2026
  ✅ TAMAMLANDI    Eşya tahliye izni alındı              20.02.2026
  🔵 SIRADA        6306 kira yardımı başvurusu
                   → Nereye: ÇŞB İl Müdürlüğü / e-Devlet
                   → Gereken: kira sözleşmesi, hasar belgesi
                   → [Dilekçeyi hazırla]
  ⏳ BEKLİYOR      AFAD kira yardımı sonucu              18 gündür
                   → Cevap gelmezse: zımni ret + 60 gün dava süresi
  ⏰ SÜRE VAR      Müteahhide tazminat davası
                   → Zamanaşımı: 20 yıl (ağır kusur) — acele yok
  ⚠️ SÜRE DOLUYOR  Eşya sigortası tazminat talebi
                   → 6 GÜN KALDI (TTK m.1420: 2 yıl)
  ⛔ SÜRE GEÇTİ    Hasar tespitine itiraz
                   → 30 günlük süre 14.03.2026'da doldu
                   → Kalan yol: idari yargı (bkz. rehber)
```

### Durum makinesi

`PROJE.md`'deki talep yaşam döngüsünün afetzede dosyasına uyarlanmış hâli:

```
BILGILENDI ─► BASVURULDU ─► CEVAP BEKLENIYOR ─► SONUCLANDI
                   │               │                  ├─► KABUL
                   │               ├─► ZIMNI RET ─────┤
                   │               │                  └─► RET ─► ITIRAZ/DAVA
                   │               └─► SURE DOLDU ─► ALTERNATIF YOL
                   └─► VAZGECILDI
```

**Tasarım kuralı:** Hiçbir adım sessizce ölmez. Süre dolduğunda sistem "süre geçti" demekle kalmaz, **kalan alternatif yolu gösterir** — idari itiraz süresi kaçmışsa yargı yolu, tahkim süresi kaçmışsa mahkeme. Kullanıcıyı çıkmazda bırakan bir ekran, hiç ekran olmamasından kötüdür.

### Doğrulama kodu — önerinin en iyi parçası

Kullanıcının "başka bir yere girmeden site üzerinden takip" fikri doğrudur ve **KVKK açısından da isabetlidir:**

- Üyelik, kimlik doğrulama, e-posta zorunluluğu yok → kişisel veri yükü minimum
- Kod + (tercihen) telefon doğrulaması yeterli
- Kodu bilen dosyaya erişir; sistemde kimlik bilgisi saklanmaz
- **Anonim kullanım mümkün kalır** — deprem sonrası güvensizlik ortamında kritik

> ⚠️ Kod tahmin edilemez olmalı (kısa/sıralı kod değil), oturum süresi sınırlı olmalı ve kod kaybı için telefon üzerinden kurtarma tanımlanmalı.

---

# BÖLÜM III — ÖNERİLEN AKIŞIN DEĞERLENDİRMESİ

## 8. Neyi olduğu gibi tutuyoruz

| Fikir | Değerlendirme |
|---|---|
| Ayırt edici sorular → kişiselleştirilmiş hak listesi | ✅ Doğru. `PROJE-LEGAL.md` Test 3 ile birebir örtüşüyor |
| Dilekçenin hazır gelmesi + nereye/nasıl göndereceğinin gösterilmesi | ✅ Doğru. **"Nereye göndereceğim?" sorusu, dilekçenin kendisi kadar önemli** ve hiçbir kaynakta yok |
| Doğrulama kodu ile tek pencereden takip | ✅ **En iyi fikir.** Hem "hangi adımdayım" sorusunu çözüyor hem KVKK yükünü düşürüyor |
| Deprem öncesi DASK'a ek poliçe önerisi | ✅ Doğru — DASK gerçekten sınırlı |
| Teminatı görselleştiren animasyon | ✅ Doğru fikir, ama kapsamı sınırlanmalı (Bölüm 10) |
| Kiracı için kloz ve dünya uygulamaları çalışması | ✅ Doğru — Bölüm 3-4 bu çalışmanın başlangıcı |

## 9. Neyi değiştirmemiz gerekiyor

### 9.1 "Otomatik poliçe çekme" → V2'ye, fallback V0'a

Gerekçe Bölüm 6'da. **Entegrasyon hedef olarak kalsın, önkoşul olmasın.**

### 9.2 🔴 "STK hasar başvurusunu yapar" → "STK yanında durur"

Öneride, DASK protokolüne dayanarak başvurunun STK tarafından yapılması var. Buradaki sorun avukatlık tekeli değil (sigorta hasar başvurusu bir "kanun işi/hukuki mesele mütalaası" değildir); sorun **temsil ve sorumluluk**:

- Başkası adına başvuru yapmak **temsil ilişkisi** kurar → yazılı yetki/vekâlet gerekir
- **STK sorumluluk üstlenir:** 15 günlük ihbar süresi kaçırılırsa sorumluluk STK'dadır
- Binlerce dosyada bu, taşınamayacak bir risktir

**Önerilen model — aynı faydayı riski üstlenmeden veriyor:**

```
Sistem başvuruyu HAZIRLAR  →  KULLANICI tek tıkla gönderir/imzalar
        →  STK süreci TAKİP EDER ve hatırlatır
        →  Takılma olursa STK kurumla İLETİŞİME GEÇER (kullanıcı adına değil, kolaylaştırıcı olarak)
```

Kullanıcı deneyimi neredeyse aynı, hukuki yük radikal biçimde düşük. Doğrulama kodu ve takip ekranı aynen çalışır. DASK ile protokol yine değerli — ama **"başvuruyu biz yaparız" değil, "başvuruları toplu takip ederiz ve tıkanan dosyaları bildiririz"** biçiminde.

> Bir istisna: **başvuru yapamayacak durumdaki kişiler** (yaşlı, engelli, hastanede, okuma-yazma bilmeyen) için vekâletle temsil ayrı ve meşru bir hizmet olabilir — ancak bu, kitlesel akış değil, **istisnai ve belgeli** bir yol olarak tasarlanmalıdır.

---

## 10. 🔴 Gelir modeli — burada ciddi bir hukuki engel var

Öneri şu: *sigorta şirketlerine poliçe yönlendirmesi yapılır, karşılığında belirli bir tutar şirket tarafından DASK/Kızılay gibi kurumlara bağışlanır; STK üzerine ödeme almaz.*

**Bu model, mevcut hâliyle uygulanamaz.** Nedeni:

### 10.1 Sigorta aracılığı ruhsata tabidir

Sigorta sözleşmesine aracılık etmek (acentelik/brokerlik) **5684 sayılı Sigortacılık Kanunu** ve ilgili yönetmelikler uyarınca **izne ve ruhsata tabi bir faaliyettir.** İzinsiz aracılık faaliyeti hukuka aykırıdır.

### 10.2 🔴 Dernek ve vakıf doğrudan acentelik yapamaz

Araştırmanın en net bulgusu: **vakıf, dernek, kooperatif ve birlik gibi kuruluşların sigorta acenteliği faaliyetinde bulunabilmesi için ayrı bir tüzel kişi sigorta acentesi (A.Ş., Ltd. vb.) kurmaları gerekir.** Kendi bünyelerinde kurdukları **iktisadi işletme dahi yeterli değildir.** ⚠️

### 10.3 "Kâr almıyoruz, bağışlıyoruz" bir istisna oluşturmaz

Ruhsat yükümlülüğü **faaliyetin niteliğine** bağlıdır, elde edilen bedelin nereye gittiğine değil. Aracılık geliri Kızılay'a bağışlansa da faaliyet aracılıktır. Ayrıca:

- Ekipte avukat varsa **TBB Reklam Yasağı Yönetmeliği** ayrıca devrededir
- "DASK'a bağış" kavramsal olarak sorunlu — DASK bir sigorta havuzu/kurumdur, bağış muhatabı değildir

### 10.4 Uygulanabilir üç seçenek

| Seçenek | Nasıl işler | Risk | Değerlendirme |
|---|---|---|---|
| **A. Saf bilgi modeli** | STK hiç aracılık yapmaz. Poliçe türlerini, teminatları ve neye dikkat edileceğini anlatır; kullanıcı **kendi** şirketini seçer. Karşılaştırma tablosu marka bazlı değil **teminat bazlı** olur | Düşük | ✅ **V0 için önerilen.** Hemen başlanabilir |
| **B. Ayrı acente tüzel kişiliği** | STK, mevzuata uygun ayrı bir A.Ş./Ltd. acente kurar; ruhsat alır; komisyon şeffaf biçimde STK'ya aktarılır | Orta | Meşru ama kuruluş, ruhsat ve uyum yükü ağır; hackathon ölçeğinin dışında |
| **C. Lisanslı broker ortaklığı** | Ruhsatlı bir broker/acente ile protokol; aracılığı **o** yapar, STK yalnızca bilgilendirir ve şeffaf biçimde bağış taahhüdünü duyurur | Orta | Gerçekçi orta yol; sözleşmenin dikkatli yazılması şart |

**Önerim:** V0'da **A**, uzun vadede **C**. Model B ancak proje kurumsallaşırsa anlamlı olur.

> **Not — modelin ruhu değerli:** "Kullanıcıdan para almayan, geliri toplumsal faydaya dönen" yaklaşım hem etik hem de güven açısından doğru. Sorun amaçta değil, **aracılık faaliyetinin lisanslı olmasında.** Amaç korunarak yapı değiştirilebilir.

> ⚠️ Bu bölümdeki tespitler ikincil kaynaklıdır. **Sigorta Acenteleri Yönetmeliği ve Brokerler Yönetmeliği'nin ilgili maddeleri, model seçilmeden önce birebir doğrulanmalıdır** (bkz. `DOGRULAMA.md`).

---

## 11. Teminat görselleştirme — iyi fikir, dar tutulmalı

"DASK sadece dört duvarı korur" sezgisi doğru ve görselleştirmeye çok uygun. Bir evin kesitinde neyin kapsandığını, neyin kapsanmadığını göstermek, on paragraf metinden etkili.

**Ama kapsam kontrolü şart:**

| Yaklaşım | Değerlendirme |
|---|---|
| Three.js ile tam 3D ev modeli | ❌ Hackathon süresinin çoğunu yer, mobilde ağır, erişilebilirlik sorunlu |
| **Katmanlı SVG kesit + etkileşim** | ✅ **Önerilen.** Hafif, mobilde çalışır, ekran okuyucuya uyumlu, hızlı yapılır |

**Önerilen etkileşim:** Ev kesitinde kullanıcı DASK / +Konut sigortası / +Eşya / +ALE katmanlarını açıp kapatır; her katmanda **korunan alan yeşile döner, açıkta kalan kırmızı kalır.** Yanında canlı hesap:

> *"DASK: 2.271.283 TL'ye kadar bina. Eviniz 4.000.000 TL. **Açıkta: 1.728.717 TL + tüm eşyanız + barınma masrafınız.**"*

Kiracı profili seçildiğinde bina tamamen griye döner ve yalnızca eşya + ALE katmanları renklenir — kiracının neden farklı bir ürüne ihtiyacı olduğunu tek bakışta anlatır.

> 🔴 **Erişilebilirlik zorunlu:** Hedef kitle deprem sonrası, düşük bant genişliğinde, çoğu zaman eski telefonlarda. Görselleştirme **hiç yüklenmese bile** aynı bilgi tablo olarak sunulmalı.

---

## 12. Bütünleşmiş akış

```
┌─ DEPREM ÖNCESİ ───────────────────────────────────────────┐
│  Profil: malik mi, kiracı mı?                             │
│     ↓                                                      │
│  "Ne kadar korunuyorum?" → katmanlı kesit + teminat açığı │
│     ↓                                                      │
│  Eksik teminatlar (kiracıda: eşya + ALE)                  │
│     ↓                                                      │
│  Bilgi modeli: teminat bazlı karşılaştırma (Bölüm 10-A)    │
│     ↓                                                      │
│  Belgelerini şimdi topla: ruhsat, iskân, zemin etüdü,     │
│  poliçe, kira sözleşmesi, eşya fotoğrafları               │
└────────────────────────────────────────────────────────────┘
                            ↓ DEPREM
┌─ DEPREM SONRASI ──────────────────────────────────────────┐
│  Ayırt edici sorular (veya chatbot)                        │
│     ↓                                                      │
│  VAKA DOSYASI oluşur → doğrulama kodu verilir             │
│     ↓                                                      │
│  Kişiselleştirilmiş yol haritası + süre takvimi           │
│     ↓                                                      │
│  Her adımda: dilekçe hazır + nereye/nasıl göndereceği     │
│     ↓                                                      │
│  Kullanıcı gönderir → beyan eder → STK takip eder         │
│     ↓                                                      │
│  Süre yaklaşınca hatırlatma; süre geçerse ALTERNATİF YOL  │
└────────────────────────────────────────────────────────────┘
```

**`PROJE.md` ile bağlantı:** Lojistik sistemindeki hasar kaydı, buradaki vaka dosyasını tetikler. Bir binanın "ağır hasarlı" kaydı → o adresteki **malik için** hak sahipliği takvimi, **kiracı için** kira yardımı ve eşya sigortası takvimi başlar. Tek kayıt, iki farklı profil, iki farklı yol haritası.

---

## 13. Yol haritası güncellemesi

### V0 — hackathon
- [ ] Profil ayrımı: **malik / kiracı** (tüm akış boyunca ayrışır)
- [ ] Katmanlı SVG teminat kesiti + teminat açığı hesabı (`data/parametreler.json`'dan)
- [ ] Vaka dosyası + doğrulama kodu + süre takvimi (entegrasyonsuz)
- [ ] Kiracıya özel hak listesi — özellikle **"tazminat davasında mülkiyet şartı yok"**
- [ ] 3 dilekçe şablonu + **"nereye, nasıl göndereceğim?"** kartı
- [ ] Gelir modeli: **saf bilgi modeli (A)**

### V1
- [ ] Chatbot (katı RAG)
- [ ] Kiracı eşya + ALE poliçesi karşılaştırma rehberi
- [ ] STK takip paneli (tıkanan dosyaların tespiti)
- [ ] Lisanslı broker ortaklığı görüşmeleri (model C)

### V2
- [ ] DASK/SBM entegrasyonu (protokol sonrası)
- [ ] Parametrik mikrosigorta ürün tasarımı — sigortacı ortaklığıyla
- [ ] **Politika önerisi:** DASK bünyesinde veya özel sigorta eliyle **kiracı poliçesi** (CEA renters modeli)

---

## 14. Açık sorular

- Kiracı için parametrik ürün: hangi tetikleyici (büyüklük + mesafe? PGA/ivme?), hangi tutar, hangi sigortacı?
- 6306 kira yardımına kiracının erişiminde pratikte hangi engeller çıkıyor? (kayıt dışı kira ilişkisi en büyük engel olabilir)
- Kayıt dışı kiracı — sözleşmesi olmayan, elden ödeme yapan kiracı hiçbir yardıma erişemiyor. Bu grup için ne yapılabilir?
- Doğrulama kodu kaybolursa kurtarma akışı nasıl olacak (telefon doğrulaması KVKK yükünü artırır)?
- STK'nın "takip" rolü hangi noktada temsil sayılmaya başlar? Sınır net çizilmeli.
- DASK ile protokol gerçekçi mi — hangi kanaldan, kimle görüşülecek?
