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
python3 scripts/seo-kontrol.py     # SEO + erişilebilirlik denetimi (55 sayfa)
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
icerik/site.json          kurum bilgisi, gezinme, 10 konu başlığı
icerik/police/*.md        "Neden poliçe?" bölümü
data/ikon.json            ikon sözlüğü (tek kaynak; ikon.js buradan üretilir)
icerik/rehber/*.md        Bilgi Merkezi rehberleri (JSON künye + markdown)
icerik/kurumsal/*.md      kurumsal sayfalar
kaynak/modul/*.html       etkileşimli araç sayfaları (JSON künye + HTML gövde)
scripts/site-uret.py      üreteç: şablon, mega menü, SEO, JSON-LD, sitemap
scripts/sekiller.py       rehber başına SVG şema tanımı (slug → şema)
scripts/gorseller.py      şema çizen SVG kütüphanesi (5 tip)
scripts/foto-indir.py     rehber açılış fotoğraflarını Pexels'ten indirir
docs/                     üretilen site (yayına giden klasör)
docs/assets/gorsel/       rehber fotoğrafları (indirilmiş; kucuk/ = kart görselleri)
docs/assets/*.css,*.js    elle bakılan varlıklar — üreteç bunları silmez
docs/assets/bilgi-tabani.js  ÜRETİLİR: danışmanın aradığı künye dizini
```

Yeni bir rehber eklemek için `icerik/rehber/` altına tek bir dosya yazmak yeterlidir;
gezinme, kategori sayfası, ilgili içerik bağları, site haritası ve yapılandırılmış veri
yeniden üretimde kendiliğinden güncellenir.

Parasal değerler metne yazılmaz: rehber gövdesinde `{{dask.azamiTeminat}}` gibi yer
tutucular kullanılır, değer üretim anında `data/parametreler.json`'dan gelir.

### Bölümler

| Bölüm | İş |
|---|---|
| **Neden poliçe?** | DASK'ın kapsamı, teminat bazında karşılaştırma, şeffaflık ve gelir modeli |
| **Araçlar** | *Süre ve hak:* Süre takvimi, Hak tarama · *Dilekçe ve başvuru:* Dilekçe üretici · *Sigorta ve teminat:* Teminat açığı hesabı |
| **Bilgi Merkezi** | 10 konu başlığı altında 33 kanuni dayanaklı rehber; her rehberde açılış fotoğrafı ve bir şema |
| **Kurumsal** | Hakkımızda · Yöntemimiz · Mahremiyet · Yasal uyarı · Katkı |
| **AI Sohbet** | Üst barda (masaüstü) ve her sayfada sağ altta. Sorunuzu yapay zekâ ile sitede arar, ilgili sayfaya yönlendirir |

### Danışma arama motoru (dahili)

Sitenin altında, hiçbir dış isteğe çıkmayan bir yerel arama motoru vardır
(`danisma.js` → `ara()`): soruyu `icerik/` ve `data/parametreler.json`'dan
üretilen künye dizininde (`bilgi-tabani.js`) arar, ilgili rehbere/araca
eşler ve o kaydın **doğrulama rozetini** taşır. Bu motorun kendi açma
düğmesi artık arayüzde yok — tek görünür sohbet girişi AI Sohbet'tir — ama
altyapı olarak AI Sohbet'in yönlendirme katmanını besler (aşağıya bakınız).

Her rehber iki etiketle işaretlenir: **kalıcı mevzuat mı, geçmiş uygulama mı** ve
bilginin **doğrulama düzeyi**. Bu ayrım, kullanıcıya olmayan bir hakkın vaat
edilmemesi için vardır.

### AI Sohbet penceresi

Sitenin tek görünür sohbet girişi. Sorunuz bir yapay zekâ servisine
(DeepSeek) gönderilir; bu yüzden **mahremiyet taahhüdü bu pencere için
geçerli değildir** — kullanıcıya panel içinde bu açıkça belirtilir (sağlayıcı
adı kullanıcıya gösterilmez, sadece "yapay zekâ servisi" denir). Yönlendirme
yine de güvenilirdir: modele verilecek bağlam, yukarıdaki yerel arama
(`danisma.js` → `ara()`) ile `bilgi-tabani.js` künye dizininden seçilir;
kullanıcıya gösterilen "İlgili sayfalar" bağlantıları modelin ürettiği
metne değil, doğrudan bu aramaya dayanır.

`docs/assets/ai-yapilandirma.js` içindeki `apiAnahtar` alanı repoda **boş**
tutulur ve commit edilmez; gerçek anahtar yalnızca yayın derlemesinde,
`DEEPSEEK_API_KEY` adlı bir GitHub Actions secret'ından enjekte edilir (bkz.
aşağıdaki "GitHub Pages'i açma" bölümü). Anahtar tanımlı değilse pencere
çökmez, "yapılandırılmamış" mesajı gösterir.

> ⚠️ **Statik site backend'siz olduğu için anahtar yine de yayınlanan
> sayfanın kaynağında herkese açık olur.** Bu bilinçli bir demo/hackathon
> kararıdır — düşük harcama limitli bir anahtar kullanın. Kalıcı/üretim
> kullanımı için anahtarı gizleyen bir proxy (ör. Cloudflare Worker) şarttır.

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
- 🔴 **Dilekçe şablonları avukat onayından geçmedi.**
- **Parasal değerler eskir.** DASK azami teminatı 2026'da aylık güncelleniyor;
  bu yüzden tüm parametreler [`data/parametreler.json`](./data/parametreler.json)
  dosyasında tarih damgalı tutulur, metne gömülmez.
- Tüzel yapı kararı verilmedi (dernek mi, baro ortaklığı mı) — `PROJE-LEGAL.md`
  Bölüm 1-2'deki Avukatlık Kanunu m.35 analizine bakınız.

---

## Geliştirme

```bash
# Veri tutarlılığı (parametreler.json ↔ veri.js)
python3 scripts/veri-kontrol.py

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

### AI Sohbet için DeepSeek anahtarı (isteğe bağlı)

AI Sohbet penceresinin çalışması için depoya bir secret eklenmelidir:

1. Depo → **Settings → Secrets and variables → Actions → New repository secret**
2. İsim: `DEEPSEEK_API_KEY`, değer: DeepSeek API anahtarınız
3. Bir sonraki "GitHub Pages" iş akışı çalıştığında anahtar otomatik olarak
   `docs/assets/ai-yapilandirma.js` içine gömülür (yalnızca yayın derlemesinde,
   repoya geri commit edilmez — bkz. yukarıdaki "AI Sohbet penceresi" bölümü).

Secret tanımlı değilse iş akışı yine sorunsuz çalışır; AI Sohbet o zaman
"yapılandırılmamış" demo moduyla açılır.
