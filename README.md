# Deprem Haklarım

**Ekip:** T8 — Hasar Tespiti · Claude Impact Lab

Deprem öncesi ve sonrasında bir vatandaşın sahip olduğu hakları, dayandığı kanun
maddesiyle birlikte, **süresi geçmeden önce** anlatan ücretsiz bilgi platformu.

> ⚠️ **Bu proje geliştirme aşamasındadır.** Sitedeki hukuki bilgiler henüz resmî
> kaynaklardan doğrulanmamıştır ve dilekçe şablonları avukat onayından geçmemiştir.
> Yayına alınmadan önce [`DOGRULAMA.md`](./DOGRULAMA.md) tamamlanmalıdır.

---

## Site

Kaynak içerik `icerik/` ve `kaynak/` altındadır; yayına giden statik site
[`docs/`](./docs) klasörüne **üretilir**. Derleme adımı yok, bağımlılık yok —
üreteç yalnızca Python standart kütüphanesini kullanır.

```bash
python3 scripts/site-uret.py       # docs/ klasörünü üretir
python3 scripts/bag-kontrol.py     # iç bağlantıları denetler
python3 scripts/veri-uret.py       # parametreler.json -> veri-parametre.js
python3 scripts/kontrast.py        # renk kontrastlarını ölçer
python3 scripts/veri-kontrol.py    # parametreler.json ↔ veri.js tutarlılığı
node scripts/danisma-kontrol.mjs   # danışmanın arama isabeti (24 soru)
node scripts/hesap-kontrol.mjs     # tazminat hesabı (33 altın örnek)
node scripts/sure-kontrol.mjs      # takvim süresi aritmetiği (12 örnek)
python3 scripts/markdown-kontrol.py  # markdown işleyici sınamaları

cd docs && python3 -m http.server 8899   # http://localhost:8899
```

### Yapı

```
icerik/site.json          kurum bilgisi, gezinme, 9 konu başlığı
icerik/police/*.md        "Neden poliçe?" bölümü
data/ikon.json            ikon sözlüğü (tek kaynak; ikon.js buradan üretilir)
icerik/rehber/*.md        Bilgi Merkezi rehberleri (JSON künye + markdown)
icerik/kurumsal/*.md      kurumsal sayfalar
kaynak/modul/*.html       etkileşimli araç sayfaları (JSON künye + HTML gövde)
scripts/site-uret.py      üreteç: şablon, mega menü, SEO, JSON-LD, sitemap
docs/                     üretilen site (yayına giden klasör)
docs/assets/*.css,*.js    elle bakılan varlıklar — üreteç bunları silmez
docs/assets/bilgi-tabani.js  ÜRETİLİR: danışmanın aradığı künye dizini
docs/assets/veri-parametre.js ÜRETİLİR: parametreler.json'un JS karşılığı
docs/assets/dosya-kod.js     dosya kodu çözücü/üretici (saf hesap)
docs/assets/sahne3b.js       hero 3B sahnesi (üste binen katman)
docs/vendor/three.module.min.js  yerele gömülü three.js — dış istek yok
```

Yeni bir rehber eklemek için `icerik/rehber/` altına tek bir dosya yazmak yeterlidir;
gezinme, kategori sayfası, ilgili içerik bağları, site haritası ve yapılandırılmış veri
yeniden üretimde kendiliğinden güncellenir.

### Bölümler

| Bölüm | İş |
|---|---|
| **Neden poliçe?** | DASK'ın kapsamı, teminat bazında karşılaştırma, şeffaflık ve gelir modeli |
| **Araçlar** | *Süre ve hak:* Süre takvimi, Hak tarama, Dosya kodu · *Dilekçe ve başvuru:* Dilekçe üretici · *Sigorta ve teminat:* Teminat açığı ve tazminat hesabı |
| **Bilgi Merkezi** | 9 konu başlığı altında kanuni dayanaklı rehberler |
| **Kurumsal** | Hakkımızda · Yöntemimiz · Mahremiyet · Yasal uyarı · Katkı |
| **Danışma** | Her sayfada, sağ altta. Soruyu sitedeki doğrulanmış içerikle eşleştirir |

### Danışma penceresi

Sitede **hesap ve giriş yoktur**; bunun yerine her sayfada bir soru penceresi vardır.
Bu pencere bir dil modeli değildir: soruyu `icerik/` ve `data/parametreler.json`'dan
üretilen künye dizininde arar, ilgili rehbere/araca yönlendirir ve o kaydın
**doğrulama rozetini** gösterir. Eşleşme bulamazsa uydurmaz, "bulamadım" der.

Böyle olmasının nedeni mahremiyet taahhüdüdür: soruyu bir API'ye göndermek,
kullanıcının hukuki durumunu üçüncü bir tarafa aktarmak olurdu. Ayrıntı:
[`TASARIM.md`](./TASARIM.md) Bölüm 10.

Her rehber iki etiketle işaretlenir: **kalıcı mevzuat mı, geçmiş uygulama mı** ve
bilginin **doğrulama düzeyi**. Bu ayrım, kullanıcıya olmayan bir hakkın vaat
edilmemesi için vardır.

**Mahremiyet:** sunucu yok, hesap yok, analitik yok, çerez yok, dış istek yok.
Girilen hiçbir bilgi — danışmaya sorulan soru dâhil — cihazdan çıkmaz.

---

## Dokümanlar

| Dosya | İçerik |
|---|---|
| [`PROJE.md`](./PROJE.md) | Afet lojistik koordinasyon sistemi — arz/talep eşleştirme ve kapatma döngüsü |
| [`PROJE-LEGAL.md`](./PROJE-LEGAL.md) | **Hukuki altyapı.** Deprem öncesi/sonrası haklar, DASK, uyuşmazlık yolları, sorumluluk davaları, mevzuat haritası |
| [`PROJE-AKIS.md`](./PROJE-AKIS.md) | Kiracının korunması ve tek pencere (vaka dosyası) modeli; gelir modeli hukuki analizi |
| [`PROJE-PARAMETRIK.md`](./PROJE-PARAMETRIK.md) | Kiracı için parametrik sigorta ürünü ve DASK protokol yaklaşımı |
| [`TASARIM.md`](./TASARIM.md) | **Tasarım sistemi**: kurumsal palet, bileşen sözlüğü, erişilebilirlik |
| [`DOGRULAMA.md`](./DOGRULAMA.md) | 🔴 **71 kalemlik mevzuat doğrulama görev listesi** |
| [`VERI-KAYNAKLARI.md`](./VERI-KAYNAKLARI.md) | Veri kaynakları |

---

## Projenin üç tezi

**1. Sorun bilgi eksikliği değil, koordinasyon eksikliği.** 2023'te onlarca ihtiyaç
platformu kuruldu ama yardım dengesiz dağıldı; çünkü mükerrer talepler
birleştirilmedi ve karşılanan talepler kapanmadı. `PROJE.md` bunu çözer.

**2. Hakların çoğu, bilinmediği için değil, süresi kaçtığı için kaybediliyor.**
Hasar tespitine itiraz 30 gün, DASK ihbarı 15 gün, hak sahipliği 2 ay. Site
bunları kişiselleştirilmiş bir takvime çevirir.

**3. Kiracı sistemin tamamen dışında.** DASK malike öder, hak sahipliği tapu arar,
afet konutu malike verilir. **Ama tazminat davasında mülkiyet şartı yoktur** —
kiracının en güçlü ve en az bilinen hakkı budur.

---

## Bilinen kısıtlar

- 🔴 **Hiçbir hukuki bilgi resmî kaynaktan doğrulanmadı.** Geliştirme ortamının ağ
  politikası `mevzuat.gov.tr`, `resmigazete.gov.tr` ve `dask.gov.tr` erişimini
  engelledi. Mevzuat MCP'nin tarayıcı bağımlılığı bu oturumda giderildi, ancak ağ
  geçidi `mevzuat.gov.tr` isteklerini 403 ile reddettiği için sunucu yine sonuç
  döndüremedi. Bilgiler çoklu bağımsız kaynak teyidiyle derlendi.
  Ayrıntı: [`DOGRULAMA.md`](./DOGRULAMA.md)
- 🔴 **Dilekçe şablonları avukat onayından geçmedi.** Resmî dilekçe iskeletine
  (KONU · AÇIKLAMALAR · HUKUKİ SEBEPLER · DELİLLER · SONUÇ VE İSTEM · EKLER)
  kavuşturuldu, ama biçim düzeltmek içeriği doğrulamaz.
- 🔴 **Muafiyetin niteliği doğrulanmadı.** Hesap "tenzili muafiyet her ödemeden
  düşülür" okumasına göre kurulu; ters çıkarsa tutarlar değişir.
  Bkz. `DOGRULAMA.md` A13-A14.
- **Dosya kodu kaybedilirse kurtarılamaz.** Kod verinin kendisini taşır; sunucuda
  hiçbir kopya yoktur. Bu bir eksik değil, mahremiyet sözünün bedeli.
- **Parasal değerler eskir.** DASK azami teminatı 2026'da aylık güncelleniyor;
  bu yüzden tüm parametreler [`data/parametreler.json`](./data/parametreler.json)
  dosyasında tarih damgalı tutulur, metne gömülmez.
- Tüzel yapı kararı verilmedi (dernek mi, baro ortaklığı mı) — `PROJE-LEGAL.md`
  Bölüm 1-2'deki Avukatlık Kanunu m.35 analizine bakınız.

---

## Geliştirme

```bash
# Siteyi üret
python3 scripts/site-uret.py

# Denetim paketi — hepsinin yeşil olması yayın şartıdır
python3 scripts/bag-kontrol.py        # iç bağlantılar
python3 scripts/kontrast.py           # WCAG 4.5:1 eşiği
python3 scripts/veri-kontrol.py       # parametreler.json ↔ veri-parametre.js
python3 scripts/markdown-kontrol.py   # markdown işleyici
node scripts/sure-kontrol.mjs         # takvim süresi aritmetiği
node scripts/hesap-kontrol.mjs        # DASK / eksik sigorta hesabı
node scripts/danisma-kontrol.mjs      # danışma isabeti
node scripts/dosya-kod-kontrol.mjs    # dosya kodu gidiş-dönüşü

# Mevzuat MCP (ağ erişimi olan bir ortamda otomatik yüklenir)
# .mcp.json repoda hazır — bkz. DOGRULAMA.md
```

---

## Yasal uyarı

Bu platformdaki bilgiler **genel bilgilendirme amaçlıdır, hukuki tavsiye niteliği
taşımaz ve avukatlık hizmetinin yerine geçmez.** Somut olayınıza ilişkin
değerlendirme için bir avukata veya bulunduğunuz ilin barosunun **adli yardım**
birimine başvurunuz.

---

## GitHub Pages'i açma

İş akışı ([`.github/workflows/pages.yml`](./.github/workflows/pages.yml)) hazır ve
`main` dalındaki her `docs/` değişikliğinde çalışıyor. Ancak **Pages'in ilk kez
açılması elle yapılmalı** — Actions token'ı Pages sitesi *oluşturma* yetkisine
sahip değil (`Resource not accessible by integration`).

**Yapılacak (tek seferlik):**

1. Depo → **Settings → Pages**
2. **Source: GitHub Actions** seçin
3. Actions sekmesinden "GitHub Pages" iş akışını **Re-run** edin

Site şu adreste yayına girer:
`https://ersancetin.github.io/claude-impact-lab-t8/`

Yayın adresi tek yerden yönetilir: [`icerik/site.json`](./icerik/site.json)
içindeki `taban` alanı. Adres değişirse bu alanı güncelleyip
`python3 scripts/site-uret.py` çalıştırmak yeterlidir — canonical etiketleri,
`og:url`, JSON-LD ve `sitemap.xml` birlikte güncellenir.

> ℹ️ Depo **public**; ücretsiz planda Pages kullanılabilir. Depo private
> yapılırsa Pages yalnızca ücretli planlarda (Pro / Team / Enterprise) çalışır.

**Varsayılan dal dışından yayın:** `github-pages` ortamı öntanımlı olarak
yalnızca varsayılan daldan dağıtıma izin verir. Başka bir daldan yayınlamak için
o dal, Settings → Environments → `github-pages` → **Deployment branches**
listesine eklenmelidir.

**Alternatif (iş akışı olmadan):** Settings → Pages → Source: *Deploy from a
branch* → dal `main`, klasör `/docs`.
