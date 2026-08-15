# Mevzuat Doğrulama Görev Listesi

**Amaç:** [`PROJE-LEGAL.md`](./PROJE-LEGAL.md) içindeki her hukuki iddianın resmî kaynaktan birebir doğrulanması.
**Son güncelleme:** 2026-08-15

---

## Neden bu dosya var?

`PROJE-LEGAL.md` bir bilgilendirme platformunun temelini oluşturacak. **Yanlış bir süre bilgisi, kullanıcının hakkını tamamen kaybetmesine yol açar.** Bu yüzden hiçbir madde, resmî metinden birebir doğrulanmadan yayına alınmayacak.

Bu dosya, doğrulamanın **kim tarafından, hangi araçla, hangi sorguyla** yapılacağını maddeye kadar tarif eder. Doğrulayan kişi sonucu aynı tabloya işler.

---

## 🔴 Bu oturumda doğrulama neden tamamlanamadı?

Çalışma ortamının ağ politikası resmî hukuk kaynaklarını **ağ katmanında** engelliyor. Kanıt:

```
https://www.mevzuat.gov.tr/         → 000  (curl: (56) CONNECT tunnel failed, response 403)
https://www.resmigazete.gov.tr/     → 000
https://dask.gov.tr/                → 000
https://bedesten.adalet.gov.tr/     → 000
https://karararama.yargitay.gov.tr/ → 000
https://d.barobirlik.org.tr/        → 000
https://webdosya.csb.gov.tr/        → 000
https://www.lexpera.com.tr/         → 000
https://pypi.org/simple/            → 200  ✅ (paket indirmeye açık)
```

**Mevzuat MCP bu ortamda çalışamaz.** Paketi (`mevzuat-mcp` 0.3.0) PyPI'dan indirip inceledim; istemci **yalnızca** şu adreslerle konuşuyor:

```python
BASE_URL         = "https://www.mevzuat.gov.tr"
SEARCH_ENDPOINT  = f"{BASE_URL}/Anasayfa/MevzuatDatatable"
DOC_URL_TEMPLATE = f"{BASE_URL}/MevzuatMetin/{tur}.{tertip}.{no}.doc"
PDF_URL_TEMPLATE = f"{BASE_URL}/MevzuatMetin/{tur}.{tertip}.{no}.pdf"
```

Bu alan adı engelli olduğu için MCP kurulsa da her çağrı bağlantı hatası verir. **Doğrulama, ağ erişimi olan bir ortamda yapılmalıdır.**

Bu oturumda yapılabilen: **çoklu bağımsız kaynak teyidi** (web araması). Bu, resmî teyidin yerine geçmez ama güven düzeyini yükseltir ve aşağıda ayrı bir sütunda izlenir.

---

## Mevzuat MCP kurulumu

Repoya [`.mcp.json`](./.mcp.json) eklendi. Ağ erişimi olan bir ortamda Claude Code'u repo kökünde açmak yeterli:

```jsonc
{
  "mcpServers": {
    "mevzuat": {
      "command": "uvx",
      "args": ["--from", "mevzuat-mcp", "mevzuat-mcp"]
    }
  }
}
```

Kaynak: [github.com/saidsurucu/mevzuat-mcp](https://github.com/saidsurucu/mevzuat-mcp) · PyPI: `mevzuat-mcp` 0.3.0

### Kullanılabilir araçlar (paketten çıkarıldı)

| Araç | Kapsam |
|---|---|
| `search_kanun` / `search_within_kanun` | **Kanunlar** — bu listedeki işlerin çoğu |
| `search_kurum_yonetmelik` / `search_within_kurum_yonetmelik` | **Kurum ve kuruluş yönetmelikleri** |
| `search_cbyonetmelik` / `search_within_cbyonetmelik` | Cumhurbaşkanlığı yönetmelikleri |
| `search_teblig` / `get_teblig_content` | **Tebliğler** — DASK tarifesi burada |
| `search_cbk` / `search_within_cbk` | Cumhurbaşkanlığı kararnameleri |
| `search_cbbaskankarar` / `get_cbbaskankarar_content` | Cumhurbaşkanı kararları |
| `search_cbgenelge` / `get_cbgenelge_content` | Cumhurbaşkanlığı genelgeleri |
| `search_khk` / `search_within_khk` | KHK'lar |
| `search_tuzuk` / `search_within_tuzuk` | Tüzükler |

> **Not:** Genel Şartlar (Zorunlu Deprem Sigortası Genel Şartları) mevzuat.gov.tr'de **"9" türü** altında yer alıyor (`MevzuatTur=9&MevzuatNo=14982&MevzuatTertip=5`). MCP'nin araç seti bunu doğrudan karşılamıyor olabilir — bu durumda doğrudan URL'den veya SEDDK sitesinden alınmalıdır.

### Önerilen çalışma akışı

```
1. search_kanun("6305")                          → mevzuat kimliğini bul
2. search_within_kanun(mevzuat_id, "madde 10")   → madde metnini çek
3. Metni birebir kopyala → PROJE-LEGAL.md'ye işle
4. Bu dosyada satırı ✅ yap, tarih ve doğrulayan adını yaz
```

---

## Durum özeti

| Durum | Adet |
|---|---|
| 🔴 Kritik — yayın öncesi **zorunlu** | 12 |
| 🟠 Önemli — V1 öncesi | 14 |
| 🟡 İkincil — V2'ye kadar | 8 |
| 📐 Parametrik değer kümesi (§ D) | 6 |
| 📚 Ek yönetmelik (§ E) | 20 |
| **Toplam** | **60** |

**Resmî kaynaktan doğrulanan:** 0 — ağ engeli nedeniyle bu ortamda hiçbiri yapılamadı.
**Çoklu bağımsız kaynaktan teyit edilen:** ~20 kalem (aşağıdaki "Çoklu kaynak" sütunu).

---

## A. 🔴 KRİTİK — yayın öncesi zorunlu

Bu maddelerdeki hata, kullanıcının **hak kaybına** yol açar.

| # | Doğrulanacak iddia | Kaynak / MCP çağrısı | Çoklu kaynak | Resmî | Doğrulayan / tarih |
|---|---|---|---|---|---|
| A1 | **DASK hasar ihbar süresi 15 gün** (ZDS Genel Şartları B.1) | Genel Şartlar B bölümü — `MevzuatTur=9&MevzuatNo=14982` | ⚠️ tek kaynak | ☐ | |
| A2 | **DASK tazminat ödeme süresi** (belge tamamlanmasından sonra 15 gün; temerrüt faizi dayanağı) | Genel Şartlar B.4 vd. | ⚠️ tek kaynak | ☐ | |
| A3 | **Muafiyet %2 + 72 saat kuralı** | Genel Şartlar — muafiyet maddesi | ✅ çoklu | ☐ | |
| A4 | **Hasar tespit raporuna itiraz: mahallî ilan tarihinden 30 gün** | `search_within_kanun(7269, "itiraz")` | ✅ çoklu | ☐ | |
| A5 | **Hak sahipliği başvurusu: ilandan itibaren 2 ay**, mülkiye amirine yazılı talep+taahhütname | `search_within_kanun(7269, "madde 29")` | ✅ çoklu | ☐ | |
| A6 | **Hak sahipliği reddine itiraz: tebliğden 15 gün** | Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkında Yönetmelik (`MevzuatTur=7&MevzuatNo=4905`) | ⚠️ tek kaynak | ☐ | |
| A7 | **Riskli yapı tespitine itiraz: 15 gün** | 6306 Uygulama Yönetmeliği m.7 | ✅ çoklu | ☐ | |
| A8 | **TTK m.1420 — 2 yıl / her hâlde 6 yıl**; sürenin başlangıç anı | `search_within_kanun(6102, "madde 1420")` | ✅ çoklu | ☐ | |
| A9 | **5684 m.30 — sigortacıya yazılı başvuru dava/başvuru şartıdır** | `search_within_kanun(5684, "madde 30")` | ✅ çoklu | ☐ | |
| A10 | **5684 m.30/14 — mahkemeye/THH'ye giden uyuşmazlık Tahkim'e gidemez** | aynı madde | ⚠️ tek kaynak | ☐ | |
| A11 | **İYUK m.13 — tam yargı: 1 yıl / her hâlde 5 yıl, önce idareye başvuru** | `search_within_kanun(2577, "madde 13")` | ⚠️ tek kaynak | ☐ | |
| A12 | **İmar planı askı 1 ay + itiraz + 60 gün dava** (3194 m.8/b) | `search_within_kanun(3194, "madde 8")` | ✅ çoklu | ☐ | |

---

## B. 🟠 ÖNEMLİ — V1 öncesi

| # | Doğrulanacak iddia | Kaynak / MCP çağrısı | Çoklu kaynak | Resmî | Doğrulayan / tarih |
|---|---|---|---|---|---|
| B1 | **6305 m.10** — kapsamdaki bina tipleri (tam liste) | `search_within_kanun(6305, "madde 10")` | ✅ çoklu | ☐ | |
| B2 | **6305 m.11** — su/elektrik aboneliği ve tapuda DASK kontrolü | `search_within_kanun(6305, "madde 11")` | ✅ çoklu | ☐ | |
| B3 | 🔴 **7269 m.29/8** — DASK'sız olana devlet konut yardımı/kredisi yok | `search_within_kanun(7269, "madde 29")` | ⚠️ tek kaynak | ☐ | |
| B4 | **ZDS Genel Şartları A.2** — kapsam dışı bina listesi (tam) | Genel Şartlar A.2 | ✅ çoklu | ☐ | |
| B5 | **ZDS Genel Şartları A.3** — teminat dışı haller (tam) | Genel Şartlar A.3 | ✅ çoklu | ☐ | |
| B6 | **ZDS Genel Şartları A.1** — teminat kapsamındaki bina unsurları (temeller, ana duvarlar, merdiven, asansör…) | Genel Şartlar A.1 | ⚠️ tek kaynak | ☐ | |
| B7 | **6306 m.3/1** — malikin kendi masrafıyla, tek başına risk tespiti yaptırabilmesi | `search_within_kanun(6306, "madde 3")` | ✅ çoklu | ☐ | |
| B8 | 6306 m.3 — tespit masrafının hisseler oranında dağıtımı; 2 ay / 6 ay kayıt silme süreleri | aynı madde + Uygulama Yönetmeliği | ⚠️ tek kaynak | ☐ | |
| B9 | **TBK m.478** — ağır kusurda 20 yıl; m.474-477 ayıp hükümleri | `search_within_kanun(6098, "madde 478")` | ✅ çoklu | ☐ | |
| B10 | **TCK m.85/1 (2-6 yıl), m.85/2 (2-15 yıl)** | `search_within_kanun(5237, "madde 85")` | ✅ çoklu | ☐ | |
| B11 | **TCK m.22/3** — bilinçli taksirde ceza 1/3–1/2 artırılır | `search_within_kanun(5237, "madde 22")` | ✅ çoklu | ☐ | |
| B12 | **TCK m.66** — 15 yıllık dava zamanaşımı + **başlangıç anı tartışması** (inşaat mı, yıkım mı) | `search_within_kanun(5237, "madde 66")` + Yargıtay içtihadı | ⚠️ tartışmalı | ☐ | |
| B13 | **TMK m.31 ölüm karinesi**, **m.29 birlikte ölüm karinesi**, m.32-35 gaiplik | `search_within_kanun(4721, "madde 31")` | ✅ çoklu | ☐ | |
| B14 | **5490 m.32** — ölüm tutanağı, mülkî idare amiri emri, başvurabilecekler | `search_within_kanun(5490, "madde 32")` | ⚠️ tek kaynak | ☐ | |

---

## C. 🟡 İKİNCİL — V2'ye kadar

| # | Doğrulanacak iddia | Kaynak / MCP çağrısı | Çoklu kaynak | Resmî | Doğrulayan / tarih |
|---|---|---|---|---|---|
| C1 | **4857 m.24/III, m.25/III, m.40** — zorlayıcı sebep ve yarım ücret | `search_within_kanun(4857, "madde 40")` | ✅ çoklu | ☐ | |
| C2 | **Kısa çalışma ödeneği dayanağı** — 4447 ek m.2 mi, İşK m.65 mi? (kaynaklar çelişiyor) | `search_within_kanun(4447, "ek madde 2")` | 🔴 çelişki | ☐ | |
| C3 | **TBK m.331** olağanüstü fesih; **m.136** ifa imkânsızlığı; **m.305 vd.** ayıp | `search_within_kanun(6098, "madde 331")` | ✅ çoklu | ☐ | |
| C4 | **VUK m.13 mücbir sebep, m.15 süre uzatımı, m.115 terkin (1/3 kaybı)** | `search_within_kanun(213, "madde 115")` | ✅ çoklu | ☐ | |
| C5 | **KMK m.47** — ana yapının harap olması, kat mülkiyetinin sona ermesi | `search_within_kanun(634, "madde 47")` | ⚠️ tek kaynak | ☐ | |
| C6 | **7471 s.K. ile 6306'da "en az üçte iki" → "salt"** değişikliği (RG 09.11.2023/32364) | `search_kanun("7471")` | ✅ çoklu | ☐ | |
| C7 | **4708 m.9** — yapı denetim sorumluluğu. **Dikkat:** bulunan metin **765 sayılı (mülga) TCK'ya** atıf yapıyor; yürürlükteki hâli teyit edilmeli | `search_within_kanun(4708, "madde 9")` | 🔴 güncellik şüphesi | ☐ | |
| C8 | **3194 geçici m.16** (imar barışı) — Yapı Kayıt Belgesi'nin depreme dayanıklılık sorumluluğunu **malike** yüklemesi | `search_within_kanun(3194, "geçici madde 16")` | ⚠️ tek kaynak | ☐ | |

---

## D. 🔴 PARAMETRİK DEĞERLER — ayrı rejim

Bu değerler **kanun metninde değil**, yıl (hatta ay) içinde değişen tebliğ/karar/duyurularda yer alır. **Metne gömülmeyecek**, sürümlü yapılandırma dosyasından okunacak.

> ✅ **Bu dosya oluşturuldu: [`data/parametreler.json`](./data/parametreler.json)**
> 16 süre, DASK tarife değerleri, Tahkim parasal sınırları, deprem yönetmeliği kuşakları ve 2023 emsal uygulamaları tek yerde toplandı. Her değerde geçerlilik tarihi ve doğrulama durumu var.
> **Mevcut durum:** `resmi` **0** · `coklu` 19 · `tek` 25 · `celiskili` 3.
> Doğrulama yapıldıkça bu dosyadaki `dogrulama` alanları `resmi` yapılacak — ilerlemenin ölçüldüğü yer burasıdır.

### D1. DASK azami teminat tutarı — 🔴 aylık güncelleniyor

Araştırmada üç farklı 2026 değeri çıktı. **Bu bir çelişki değil, tutarın aylık güncellendiğinin kanıtı:**

| Dönem | Azami teminat |
|---|---|
| 2024 | 1.272.000 TL |
| 2025 | 1.704.162 TL |
| 2026 (yıl başı tarifesi) | 2.095.462 TL |
| **01.05.2026** | **2.271.283 TL** |
| 2026 (başka bir dönem) | 2.407.723 TL |

> **Ürün sonucu:** DASK tutarını bir metin sayfasına yazmak, o sayfayı **bir ay içinde yanlış** hale getirir. "Sigortam yeterli mi?" testi bu değeri **tarih damgalı bir tablodan** okumalı ve kullanıcıya hangi tarihli tarifeyle hesap yaptığını göstermelidir.

**Doğrulama:** `search_teblig("Zorunlu Deprem Sigortası Tarife ve Talimat")` → `get_teblig_content` · Ayrıca [DASK Tarife sayfası](https://dask.gov.tr/tr/tarife) aylık kontrol edilmeli. ☐

### D2. DASK metrekare birim bedelleri (01.05.2026)

| Yapı tarzı | m² bedeli |
|---|---|
| Çelik / betonarme / karkas | 10.714 TL ⚠️ |
| Diğer | 7.142 TL ⚠️ |

Aynı tebliğden doğrulanmalı. ☐

### D3. Sigorta Tahkim Komisyonu parasal sınırları (22.01.2026 itibarıyla)

| Eşik | Tutar | Not |
|---|---|---|
| Kesinlik sınırı (itiraz edilemez) | **35.000 TL altı** ⚠️ | Bir kaynak 28.000 TL diyor — çelişki |
| İtiraz sınırı | 35.000 TL ve üzeri ⚠️ | |
| Üç kişilik hakem heyeti zorunluluğu | 122.000 TL ve üzeri ⚠️ | |
| Yargıtay temyiz sınırı | **383.000 TL** üzeri ⚠️ | Başka kaynak 300.000 TL diyor — çelişki |

> Kanun metnindeki **5.000 TL** rakamı orijinal hâldir; her yıl **yeniden değerleme oranında** artar. Metne asla 5.000 TL yazılmamalı.
> **Kural:** İtiraz/temyiz için **kararın verildiği tarihteki**, heyet teşekkülü için **zorunlu hale geldiği tarihteki** sınır uygulanır. ⚠️

**Doğrulama:** [sigortatahkim.org](https://www.sigortatahkim.org/) resmî duyuruları. ☐

### D4. 6306 kira yardımı tutarları

- Süre **18 aya kadar** ⚠️
- Tutar Bakanlıkça **yıllık, TÜİK TÜFE'ye göre** güncellenir ⚠️
- Kiracılara maliklere yapılan aylık yardımın **iki katı, bir defaya mahsus** ⚠️
- İl/ilçeye göre değişir

**Doğrulama:** 6306 Uygulama Yönetmeliği + Bakanlık yıllık duyurusu. ☐

### D5. AFAD kira ve taşınma yardımı (2023 uygulaması — emsal)

| Kalem | Tutar |
|---|---|
| Ev sahibi aylık kira yardımı | 5.000 TL (12 ay = 60.000 TL) ⚠️ |
| Kiracı aylık kira yardımı | 3.000 TL (12 ay = 36.000 TL) ⚠️ |
| Taşınma yardımı (bir defalık) | 15.000 TL ⚠️ |

> Bunlar **2023 depremine özgü** tutarlardır, kalıcı mevzuat değildir. Platformda "geçmiş uygulama örneği" olarak sunulmalı, güncel hak gibi gösterilmemelidir. ☐

### D6. 7269 afet konutu borçlandırma koşulları

- Geri ödeme **en az 20, en çok 30 yıl**, eşit taksitler ⚠️
- **Faizsiz** ⚠️
- İlk taksit: inşaatın tamamlanıp hak sahibine tesliminden **2 yıl sonra** ⚠️

**Doğrulama:** `search_within_kanun(7269, "borçlandırma")` ☐

---

## E. Doğrulanması gereken ek yönetmelikler

`PROJE-LEGAL.md`'ye eklenecek veya derinleştirilecek düzenlemeler:

| Düzenleme | Neden gerekli | Durum |
|---|---|---|
| **Zorunlu Deprem Sigortası Tarife ve Talimat Tebliği** (`MevzuatNo=23199, Tur=9`) | Tüm parasal değerlerin tek resmî kaynağı | ☐ |
| **Zorunlu Deprem Sigortası Genel Şartları** (`MevzuatNo=14982, Tur=9`) | DASK içeriğinin tamamı buna dayanıyor | ☐ |
| **Doğal Afet Sigortaları Kurumu Çalışma Esasları Yönetmeliği** | DASK'ın işleyişi, hasar tespit usulü | ☐ |
| **6306 Sayılı Kanunun Uygulama Yönetmeliği** | Kira yardımı, itiraz usulü, tahliye | ☐ |
| **Afet Sebebiyle Hak Sahibi Olanların Tespiti Hakkında Yönetmelik** (`MevzuatNo=4905, Tur=7`) | Hak sahipliği usulünün tamamı | ☐ |
| **Türkiye Bina Deprem Yönetmeliği (TBDY)** — RG 18.03.2018/30364 Mükerrer, yürürlük 01.01.2019 ✅ | "Binam hangi yönetmeliğe göre yapıldı?" testinin temeli | ✅ doğrulandı (çoklu kaynak) |
| **Deprem Bölgelerinde Yapılacak Binalar Hakkında Yönetmelik (DBYBHY 2007)** — RG 06.03.2007/26454 ⚠️ | Aynı test | ⚠️ tek kaynak |
| **ABYYHY 1998** — RG 02.09.1997/23098 ⚠️ | Aynı test. **Dikkat:** yayım 1997, yaygın adlandırma "1998" — hangisinin esas alınacağı netleşmeli | ⚠️ tek kaynak |
| **ABYYHY 1975** | Aynı test — RG tarihi hâlâ bulunamadı | ☐ |
| **1319 sayılı Emlak Vergisi Kanunu** | Mükellefiyetin sona ermesi, bildirim şartı, 5 yıllık muafiyet | ☐ |
| **KMK m.3, m.44, m.47** | Arsa payı, düzeltme davası, ana yapının harap olması | ☐ |
| **Sevk Tehiri İşlemleri Yönetmeliği** (RG 17.10.2009) | Askerlik erteleme çerçevesi | ☐ |
| **Yapı Denetimi Uygulama Yönetmeliği** | 4708'in uygulaması, denetçi sorumluluğu | ☐ |
| **Sigortacılıkta Tahkime İlişkin Yönetmelik** (`MevzuatNo=11514, Tur=7`) | Başvuru ücreti, itiraz usulü, süreler | ☐ |
| **Sigorta Eksperleri Yönetmeliği** | Eksper raporuna itiraz, ikinci eksper talebi | ☐ |
| **Kısa Çalışma ve Kısa Çalışma Ödeneği Hakkında Yönetmelik** | C2'deki dayanak çelişkisini çözer | ☐ |
| **Bilgi Edinme Hakkı Kanununun Uygulanmasına İlişkin Yönetmelik** | Ruhsat/zemin etüdü talebinin usulü ve süresi | ☐ |
| **TBB Adli Yardım Yönetmeliği** | Ücretsiz avukat başvuru şartları | ☐ |
| **Afet ve Acil Durum Müdahale Hizmetleri Yönetmeliği / TAMP** | Eşya tahliyesi, yıkım kararı süreçleri | ☐ |
| **Binaların Yıkılması Hakkında Yönetmelik** | "Acil yıkılacak" kararına itiraz | ☐ |
| **BDDK kararları (borç erteleme)** | Kalıcı mevzuat değil; emsal olarak işlenmeli | ☐ |

---

## F. Doğrulama dışı — ayrıca araştırılacak konular

`PROJE-LEGAL.md`'de henüz yer almayan, kullanıcı için yüksek değerli başlıklar:

**İkinci araştırma turunda `PROJE-LEGAL.md`'ye eklendi** — artık doğrulama sırası bekliyor:

- [x] **Hayat sigortası / ferdi kaza** → Bölüm 10.5. **Kritik:** ferdi kaza sigortalarında *aksi kararlaştırılmadıkça deprem teminat dışıdır* ⚠️
- [x] **SGK ölüm (dul-yetim) aylığı** → Bölüm 10.5. 4/a'da 5 yıl sigortalılık + 900 prim günü ⚠️; iş kazası tartışması açık
- [x] **Ağır hasarlı binadan eşya alma** → Bölüm 10.6. "Yıkık" ve "acil yıktırılacak" yapılara giriş yasak ✅ · **eşya alma ile 30 günlük itiraz hakkı çatışması** tespit edildi
- [x] **Yıkım kararına karşı iptal davası** → Bölüm 10.6, hasar derecesi tespitinden ayrı işlem ⚠️
- [x] **Öğrenci hakları** → Bölüm 10.9 (2023 uygulaması) ⚠️
- [x] **Askerlik erteleme** → Bölüm 10.11. Sevk Tehiri İşlemleri Yönetmeliği + 2023 celp ertelemesi ⚠️
- [x] **Kamu personeli hakları** → Bölüm 10.11. İzin, geçici görevlendirme, naklen atama ⚠️
- [x] **Emlak vergisi** → Bölüm 10.4. Mükellefiyetin sona ermesi, **bildirim şartı**, 5 yıllık yeniden inşa muafiyeti (1319 s.K.) ⚠️
- [x] **Tapu / arsa payı** → Bölüm 10.4.1. KMK m.47 (kat mülkiyetinin sona ermesi), arsa payı düzeltilmesi davası (KMK m.3, m.44) ⚠️
- [x] **Esnaf ve işletme** → Bölüm 10.10. KOSGEB destekleri (2023 uygulaması) ⚠️
- [x] **2023 sonrası içtihat** → **Bölüm 9.5.** Müteahhitlere 17–21+ yıl hapis; uygulama **bilinçli taksir** üzerinden ilerliyor; belediye görevlileri de mahkûm oluyor ⚠️

**Hâlâ araştırılmayı bekleyen:**

- [ ] **BES / bireysel emeklilik** birikimlerine erişim ve intikal usulü
- [ ] **Enkaz altında kalan değerli eşya / kasa** — mülkiyet ve ispat sorunu
- [ ] **Deprem davalarının kesinleşme durumu** — Bölüm 9.5'teki kararlar Yargıtay'dan geçti mi? Karar metinlerine erişim gerekiyor (UYAP / Yargıtay Karar Arama / `yargi-mcp`)
- [ ] **Sigorta eksperi raporuna itiraz** — ikinci eksper talep edilebilir mi, usulü nedir?
- [ ] **Kooperatif ve yapı kooperatifi** üyelerinin durumu
- [ ] **Yabancı uyruklular / geçici koruma altındakiler** — deprem bölgesinin gerçek nüfus profili göz önüne alındığında zorunlu başlık

### F.1 🔴 Bölüm 9.5 için özel doğrulama rejimi

Dava sonuçları **haber kaynaklıdır** ve platformda en yüksek riski taşıyan içeriktir. Yayın öncesi:

1. Her karar için **mahkeme adı, esas/karar no, tarih** tespit edilecek
2. **Kesinleşip kesinleşmediği** kontrol edilecek; kesinleşmemişse bu ibare zorunlu
3. İstinaf/Yargıtay aşamasındaki değişiklikler izlenecek
4. Ceza miktarları haber başlıklarından değil **karar metninden** alınacak

> Kesinleşmemiş bir kararı kesinmiş gibi sunmak, hem hukuken yanlış hem de kullanıcı beklentisini çarpıtır.

---

## G. Doğrulama kuralları

1. **Birebir kopyala.** Madde metni özetlenmez; tam metin alınır, sonra sadeleştirilmiş açıklama ayrı yazılır.
2. **Yürürlük kontrolü.** Metnin *mülga* olup olmadığı, son değişikliğin tarihi ve hangi kanunla yapıldığı not edilir. (C7'deki 765 sayılı TCK atfı bu kontrolün neden zorunlu olduğunu gösteriyor.)
3. **Kaynak künyesi.** Her madde için: kanun no + madde no + RG tarih/sayı + erişim tarihi.
4. **Çelişki varsa yayınlanmaz.** D1 ve D3'teki gibi kaynaklar çelişiyorsa, resmî kaynaktan çözülmeden hiçbir değer yayına alınmaz.
5. **Parasal değerler metne gömülmez.** Tümü sürümlü yapılandırma dosyasına; her değerin yanında geçerlilik tarihi.
6. **İki kişi kuralı.** 🔴 kritik maddeler **iki ayrı kişi** tarafından doğrulanır.
7. **Tartışmalı konular tartışmalı olarak sunulur.** B12'deki zamanaşımı başlangıcı gibi konularda tek görüş kesin doğruymuş gibi yazılmaz.

---

## H. Sonraki adım

Ağ erişimi olan bir ortamda:

```bash
git clone https://github.com/saidsurucu/claude-impact-lab-1-t8-hasar-tespiti
cd claude-impact-lab-1-t8-hasar-tespiti
claude          # .mcp.json otomatik yüklenir, mevzuat MCP devreye girer
```

Ardından A bölümündeki 12 kritik maddeden başlanır. Her doğrulama sonrası:
- `PROJE-LEGAL.md`'deki ilgili ⚠️ işareti ✅'e çevrilir ve madde metni eklenir,
- bu dosyada satır işaretlenir, doğrulayan ve tarih yazılır.

---

## I. Gelir modeli ve sigorta aracılığı — 🔴 model kararı öncesi zorunlu

[`PROJE-AKIS.md`](./PROJE-AKIS.md) Bölüm 10'daki tespitler ikincil kaynaklıdır ve **iş modelini doğrudan belirler.** Model seçilmeden önce doğrulanmalı:

| # | Doğrulanacak iddia | Kaynak / MCP çağrısı | Çoklu kaynak | Resmî | Doğrulayan / tarih |
|---|---|---|---|---|---|
| I1 | 🔴 **Dernek/vakıf doğrudan sigorta acenteliği yapamaz; ayrı tüzel kişi (A.Ş./Ltd.) kurmalı, iktisadi işletme yetmez** | `search_kurum_yonetmelik("Sigorta Acenteleri Yönetmeliği")` → m.5 | ⚠️ tek kaynak | ☐ | |
| I2 | Sigorta aracılığının ruhsata tabi olması; izinsiz aracılığın yaptırımı | `search_within_kanun(5684, "acente")` | ⚠️ tek kaynak | ☐ | |
| I3 | Brokerlik ile acentelik ayrımı; STK'nın hangi rolü üstlenebileceği | Sigorta ve Reasürans Brokerleri Yönetmeliği | ☐ | ☐ | |
| I4 | "Yönlendirme" faaliyetinin aracılık sayılıp sayılmayacağı sınırı | 2016/27 sayılı Genelge + Yönetmelik | ☐ | ☐ | |
| I5 | Kiracının kendi adına eşya/konut sigortası yaptırabilmesi | Konut Sigortası Genel Şartları | ⚠️ tek kaynak | ☐ | |
| I6 | Parametrik sigortanın Türk mevzuatındaki durumu — ürün onayı gerekir mi? | SEDDK düzenlemeleri | ☐ | ☐ | |

## J. Kiracı hakları — ek doğrulama

| # | Doğrulanacak iddia | Kaynak | Çoklu kaynak | Resmî | Doğrulayan / tarih |
|---|---|---|---|---|---|
| J1 | 🔴 **Tazminat davasında mülkiyet şartı aranmaması** — kiracının müteahhit/idare/yapı denetime karşı dava ehliyeti | TBK haksız fiil + içtihat | ☐ | ☐ | |
| J2 | Kiraya verenin, güvenli olmayan yapıyı kiraya vermekten doğan sorumluluğu | TBK m.305 vd. + içtihat | ☐ | ☐ | |
| J3 | 6306 kira yardımında kiracıya ilişkin koşullar (18 ay, 2 kat, bir defalık) | 6306 Uygulama Yönetmeliği | ⚠️ tek kaynak | ☐ | |
| J4 | Kayıt dışı kira ilişkisinde yardıma erişim — sözleşmesi olmayan kiracı | Yönetmelik + uygulama | ☐ | ☐ | |
| J5 | Depozito ve peşin kiranın iadesi — yıkım hâlinde usul | TBK | ☐ | ☐ | |

---

## K. Parametrik ürün ve DASK protokolü — 🔴 ürün kararı öncesi zorunlu

[`PROJE-PARAMETRIK.md`](./PROJE-PARAMETRIK.md) tespitleri ikincil kaynaklıdır. K1–K3 **ürünün hukuken ayakta durup duramayacağını** belirler.

| # | Doğrulanacak iddia | Kaynak / MCP çağrısı | Çoklu kaynak | Resmî | Doğrulayan / tarih |
|---|---|---|---|---|---|
| K1 | 🔴 **Ruhsatsız kişiyle yapılan sigorta sözleşmesine kumar/bahis hükümleri uygulanır** — atıf yapılan TBK maddeleri ve güncel karşılıkları | `search_within_kanun(6102, "kumar")` + TBK 604-605 | ⚠️ tek kaynak | ☐ | |
| K2 | 🔴 **TTK m.1461** — sigortacının sorumluluğunun sigorta bedeliyle sınırlı olması | `search_within_kanun(6102, "madde 1461")` | ⚠️ tek kaynak | ☐ | |
| K3 | 🔴 **Sigortalanabilir menfaat** hükümleri (TTK m.1401 vd., zarar sigortalarında menfaat) | `search_within_kanun(6102, "menfaat")` | ⚠️ tek kaynak | ☐ | |
| K4 | **6305'te DASK'ın faaliyet konusunu çizen madde** — yeni ürün sunma yetkisinin sınırı | `search_within_kanun(6305, "amaç OR kapsam")` | ⚠️ tek kaynak | ☐ | |
| K5 | DASK hakkında 5684 ve TTK'nın doğrudan uygulanmadığı hükmü | `search_within_kanun(6305, "uygulanmaz")` | ⚠️ tek kaynak | ☐ | |
| K6 | **AFAD-Türkiye Deprem Veri Merkezi Sistemi Yönetmeliği** (`MevzuatTur=7, MevzuatNo=21104`) — verinin resmî statüsü | `search_kurum_yonetmelik("Deprem Veri Merkezi")` | ☐ | ☐ | |
| K7 | AFAD ShakeMap çıktılarının **revize edilip edilmediği** ve yayım süresi — sözleşmeye esas alınabilirliği belirler | AFAD / TADAS teknik dokümantasyon | ☐ | ☐ | |
| K8 | SEDDK ürün ve genel şart onay süreci | SEDDK mevzuatı | ☐ | ☐ | |
| K9 | DASK ödeme kapasitesi ve cat bond verileri (46 milyar TL / 400 milyon USD) | DASK faaliyet raporları | ⚠️ tek kaynak | ☐ | |
| K10 | DASK poliçelerinin yetkili şirket ve acenteler eliyle DASK adına düzenlenmesi | 6305 + DASK Çalışma Esasları Yönetmeliği | ⚠️ tek kaynak | ☐ | |
| K11 | Türkiye Deprem Tehlike Haritası'nın aktüeryal kullanıma elverişliliği (PGA/SS/S1 aşılma olasılıkları) | AFAD | ☐ | ☐ | |

---

## Ortam notu — 2026-08-15

Mevzuat MCP sunucusu bu oturumda **çalışır hâle getirildi**: sunucu, kurulu olmayan bir
Playwright `headless_shell` sürümünü arıyordu (`chromium_headless_shell-1187`); ortamdaki
1194 sürümüne bağ verilerek tarayıcı başlatma hatası giderildi.

Buna rağmen doğrulama **yapılamadı**: ağ geçidi `www.mevzuat.gov.tr:443` isteklerini
politika gereği 403 ile reddediyor (`net::ERR_TUNNEL_CONNECTION_FAILED`). Aynı engel
`resmigazete.gov.tr`, `dask.gov.tr`, `afad.gov.tr` ve `turkreasurans.com.tr` için de
geçerlidir; WebFetch de aynı nedenle `EGRESS_BLOCKED` döndürür.

**Sonuç:** doğrulama, bu adreslere erişimi olan bir ortamda yapılmalıdır. Aşağıdaki liste
o ortamda doğrudan çalıştırılabilir durumdadır.
