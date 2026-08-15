# CLAUDE.md

Bu dosya, depoda çalışan Claude Code oturumları için kılavuzdur.

**Ürün:** Deprem Haklarım — deprem öncesi ve sonrasındaki hakları, dayandığı
kanun maddesiyle birlikte ve **süresi geçmeden önce** anlatan ücretsiz bilgi
platformu. Ekip: T8 Hasar Tespiti · Claude Impact Lab.

---

## 1. En önemli kural: hiçbir hukuki bilgi doğrulanmadı

`DOGRULAMA.md` 71 kalemlik bir doğrulama görev listesidir ve **tamamlanmadı.**
Geliştirme ortamının ağ politikası `mevzuat.gov.tr`, `resmigazete.gov.tr` ve
`dask.gov.tr` erişimini engelledi. Bu yüzden:

- **Hiçbir madde numarasını, süreyi veya tutarı "kesin" diye sunmayın.**
  Metinlerde "belirtilmektedir", "kabul edilmektedir" gibi çekinceli dil
  bilinçlidir; düzeltme değildir.
- Yeni içerik yazarken kaynağın doğrulama durumunu (`resmi` / `coklu` / `tek` /
  `celiskili`) mutlaka taşıyın; her rehber künyesinde `dogrulama` alanı vardır.
- Parasal değerler **metne gömülmez**; `data/parametreler.json` kanonik
  kaynaktır. Rehber gövdesinde `{{dask.azamiTeminat}}` gibi **yer tutucular**
  kullanılır (bkz. Bölüm 4). DASK azami teminatı 2026'da aylık güncelleniyor —
  bir sayfaya sabit rakam yazmak o sayfayı bir ay içinde yanlış hâle getirir.

## 2. Site tek bir üreteçten çıkar

`docs/` altındaki **her `.html` dosyası üretilmiştir; elle düzenlemeyin.**
Kaynaklar `icerik/`, `kaynak/modul/` ve `data/` altındadır:

```bash
python3 scripts/site-uret.py     # docs/ klasörünü baştan üretir
```

Üreteç `docs/` içinde yalnızca `rehber/ bilgi/ arac/ kurumsal/` klasörlerini
siler ve yeniden yazar; `docs/assets/` elle bakılan varlıklardır (yalnızca
`assets/bilgi-tabani.js` üretilir).

Ayrı bir `/blog` bölümü **yoktur.** Eski blog (20 yazı, RSS, kendi CSS'i)
Bilgi Merkezi'ne taşındı; `docs/blog/`, `scripts/blog-uret.py` ve
`scripts/yazilar/` kaldırıldı. Rehber stilleri artık `docs/assets/tasarim.css`
içindedir (`.foto`, `.sekil`, `.rehber.gorselli`).

---

## 3. Depo haritası

| Yol | İçerik |
|---|---|
| `docs/` | Yayımlanan statik site (GitHub Pages, derleme adımı yok) — **üretilir** |
| `docs/assets/` | `tasarim.css`, `app.js`, `veri.js`, `danisma.js`, `og.png` |
| `docs/assets/gorsel/` | Rehber açılış fotoğrafları; `kucuk/` kart görselleri |
| `icerik/site.json` | Kurum bilgisi, gezinme, **10 konu başlığı**, öne çıkanlar |
| `icerik/rehber/*.md` | **Bilgi Merkezi rehberleri** (JSON künye + markdown) |
| `icerik/kurumsal/*.md` | Kurumsal sayfalar |
| `kaynak/modul/*.html` | Etkileşimli araç sayfaları (JSON künye + HTML gövde) |
| `data/parametreler.json` | Tarih damgalı, sürümlü parametreler (kanonik) |
| `scripts/site-uret.py` | Üreteç: şablon, mega menü, SEO, JSON-LD, sitemap |
| `scripts/site_markdown.py` | Rehber metinleri için markdown alt kümesi |
| `scripts/sekiller.py` | Rehber başına SVG şema tanımı (slug → şema) |
| `scripts/gorseller.py` | Şema çizen SVG kütüphanesi (5 tip) |
| `scripts/foto-indir.py` | Pexels'ten açılış fotoğraflarını indirir/küçültür |
| `scripts/foto-kunye.json` | Fotoğraf künyeleri (üretilir, repoda durur) |
| `scripts/seo-kontrol.py` | Tüm site için SEO/erişilebilirlik denetimi |
| `scripts/bag-kontrol.py` | İç bağlantı ve varlık yolu denetimi |
| `scripts/veri-kontrol.py` | `parametreler.json` ↔ `veri.js` tutarlılığı |
| `scripts/kontrast.py` | Renk kontrastı ölçümü |
| `PROJE-LEGAL.md` | Hukuki altyapı — rehber içeriğinin ana kaynağı |
| `PROJE-AKIS.md` | Kiracının korunması, tek pencere modeli |
| `PROJE-PARAMETRIK.md` | Parametrik kiracı ürünü, DASK protokolü |
| `DOGRULAMA.md` | 🔴 Doğrulama görev listesi |
| `TASARIM.md` | Tasarım sistemi ve kriz UX kararları |

---

## 4. Rehber (Bilgi Merkezi) nasıl çalışır?

Bir rehber = `icerik/rehber/<slug>.md`. Dosya **JSON künye + `---` satırı +
markdown gövde** biçimindedir. Sıra `sira` alanıyla, kategori `kategori`
alanıyla belirlenir.

| Alan | Kural |
|---|---|
| `id` | Dosya adıyla aynı; `rehber/<id>.html` olur, yalnızca `a-z0-9-` |
| `kategori` | `icerik/site.json` içindeki 10 kategoriden birinin `id`'si |
| `sira` | Kategori içindeki sıra |
| `baslik` | Sayfadaki `<h1>` — uzun olabilir |
| `seoBaslik` | `<title>`; **60 karakteri aşmamalı** (site adı sığarsa eklenir) |
| `ozet` | Girişteki paragraf; kartlarda, RSS'te ve danışmada kullanılır |
| `seoAciklama` | meta description — **120-158 karakter** |
| `nitelik` | `kalici` (kanundan doğar) / `emsal` (geçmiş afet uygulaması) |
| `dogrulama` | `resmi` / `coklu` / `tek` |
| `sure` | (isteğe bağlı) sayfa başındaki kırmızı süre kartı |
| `dayanaklar` | `{ad, aciklama}` → görünür tablo + JSON-LD |
| `sss` | `{soru, cevap}` → açılır bölüm + `FAQPage` işaretlemesi |
| `arac` | (isteğe bağlı) `{id, ad, ozet}` — ilgili araç kartları |
| `ilgili` | Diğer rehberlerin `id`'leri (iç bağlantı ağı) |
| `anahtar` | Danışma penceresinin arama sözlüğü |
| `sekil` | (isteğe bağlı) `SEKILLER` anahtarı; verilmezse `id` denenir |

Üreteç tanımsız kategori, çift `id` ve tanımsız parametre yer tutucusunda
**hata verip durur.** Yayımlanmamış bir rehbere yapılan atıf kırık bağlantı
üretmez; düz metne çevrilir (`.bekleyen`).

### Gövdede kullanılabilen markdown (`scripts/site_markdown.py`)

```
## Başlık            → h2 (id verilir, içindekilere girer)
- madde / 1. madde   → liste
| a | b |            → tablo; ayraçta `--:` sütunu sayı sütunu yapar
:tablo Başlık        → tablonun görünmez <caption>'ı (erişilebilirlik: zorunlu)
:dayanak TBK m.474   → kanuni dayanak şeridi
:::uyari Başlık      → durum kartı (uyari | tehlike | bilgi | guvence | vurgulu)
...
:::
{{dask.azamiTeminat}} → parametreler.json'dan gelen parasal değer
```

Yer tutucuların listesi `site-uret.py` → `parametre_sozlugu()` içindedir.

### Görseller: her rehberde bir fotoğraf + bir şema

**1. Açılış fotoğrafı** (`docs/assets/gorsel/<id>.jpg`, 1200×627)

Kaynak Pexels'tir; lisans atıf zorunlu kılmasa da her fotoğrafın altında
fotoğrafçı künyesi vardır. Fotoğraflar **uzaktan bağlanmaz, indirilir** —
aksi hâlde okuyucunun IP adresi üçüncü tarafa gider.

```bash
export PEXELS_ANAHTAR="..."               # pexels.com/api · repoya YAZILMAZ
python3 scripts/foto-indir.py             # eksikleri indir
python3 scripts/foto-indir.py --yenile <slug>   # beğenilmeyeni değiştir
```

Arama sorguları ve Türkçe `alt` metinleri `foto-indir.py` içindeki `ARAMALAR`
sözlüğündedir; anahtar rehberin `id`'sidir. Fotoğraf 1200 piksele küçültülür,
160 kB'ı aşarsa yeniden sıkıştırılır ve kartlar için 360 piksellik kopya
üretilir. Fotoğrafı olmayan rehberin kartında sahte görsel değil, sade bir
kapak (`.rehber-kapak`) gösterilir.

> **Yayımlamadan önce fotoğrafı gözle kontrol edin.** Ton: sade, kişisiz,
> sansasyonsuz.

**2. Şema** (satır içi SVG, `scripts/sekiller.py` + `scripts/gorseller.py`)

Şema, yazının içindeki bir bilgiyi görselleştirir — süsleme değildir; aynı
bilgi metinde de bulunur. Satır içi olmasının nedeni CSS değişkenlerini miras
almasıdır: koyu/açık tema çizime de uygulanır. Beş tip: `sure`, `kapsam`,
`akis`, `karsilastirma`, `eksen`.

### Paylaşım görselini yeniden üretmek

```bash
qlmanage -t -s 1200 -o /tmp scripts/og-kaynak.svg
sips -c 630 1200 /tmp/og-kaynak.svg.png --out docs/assets/og.png
```

---

## 5. SEO kuralları

`scripts/seo-kontrol.py` **sitenin tamamını** denetler ve ihlalde çıkış kodu 1
döner:

- **Teknik:** `lang="tr"`, charset, viewport, tek `<h1>`, başlık atlaması yok,
  title ≤ 60 ve ≥ 25 karakter, description 120-158, canonical, robots,
  theme-color, favicon, stylesheet.
- **Paylaşım:** tüm Open Graph ve Twitter alanları; `og:url` ile canonical
  aynı olmalı; `og:image:alt` zorunlu.
- **Yapısal veri:** JSON-LD ayrıştırılabilir olmalı; `Article` zorunlu alanları
  (`datePublished`, `mainEntityOfPage`, kurum künyesi), `headline` ≤ 110,
  `FAQPage` cevapları.
- **Erişilebilirlik:** görsellerde `alt` ve `width`/`height` (CLS), satır içi
  SVG'de `role="img"` + `aria-labelledby`, **her tabloda caption**, anlamsız
  bağlantı metni yasak.
- **Görsel:** dış kaynaktan bağlanmış görsel hatadır; dosya diskte bulunmalı.
- **Bağlantı:** site içi bağlantı hedefi diskte var olmalı.
- **Kapsam:** `sitemap.xml` tüm sayfaları içermeli; `robots.txt` ve
  `assets/og.png` bulunmalı.

Değiştirilmeyen ilkeler: dış istek yok, çerez yok, analitik yok, web fontu yok.
Bir SEO iyileştirmesi bu ilkelerden birini bozuyorsa **yapılmaz**.

`index.html` sayfalarının canonical, `og:url` ve site haritası adresi **dizin
biçimindedir** (`.../bilgi/`); üçü de aynı olmak zorundadır.

---

## 6. Yazım ve ton

- **Jargon yok.** "Zımni ret" değil, "cevap gelmezse".
- **Süre her zaman görünür.** Kaybedilen hakların çoğu süresi kaçtığı için
  kaybediliyor.
- **Yanlış umut vermek, bilgi vermemekten daha zararlıdır.**
- **Kalıcı hak ile geçmiş uygulama ayrılır.** 2023'e özgü AFAD/KOSGEB/BDDK
  kararları "hakkınız" olarak değil, "geçmiş afette uygulanan emsal" olarak
  sunulur (`nitelik: emsal`).
- **Kiracı unutulmaz.** Sistem mülkiyet üzerine kuruludur; kiracının en güçlü
  ve en az bilinen hakkı, tazminat davasında mülkiyet şartı aranmamasıdır.
- Her rehberin sonunda **baro adli yardım** yönlendirmesi ve "hukuki tavsiye
  değildir" uyarısı bulunur (şablondan gelir).

## 7. Yerelde çalıştırma

```bash
cd docs && python3 -m http.server 8899   # http://localhost:8899
```

Sayfalar ES modülü kullandığı için `file://` ile açılmaz, sunulmaları gerekir.

## 8. Sık kullanılan komutlar

```bash
python3 scripts/site-uret.py            # siteyi üret
python3 scripts/seo-kontrol.py          # SEO + erişilebilirlik denetimi
python3 scripts/seo-kontrol.py --sessiz # yalnızca hataları göster
python3 scripts/bag-kontrol.py          # kırık bağlantı denetimi
python3 scripts/veri-kontrol.py         # parametre ↔ veri.js tutarlılığı
python3 scripts/kontrast.py             # renk kontrastı ölçümü
PEXELS_ANAHTAR="..." python3 scripts/foto-indir.py   # eksik fotoğrafları indir
```

---

## 9. Yapılacaklar (öncelik sırasıyla)

- 🔴 `DOGRULAMA.md` § A'daki 12 kritik maddenin resmî kaynaktan doğrulanması —
  sitedeki ve rehberdeki tüm süreler buna bağlı.
- 🔴 Dilekçe şablonlarının avukat onayı (yayın öncesi zorunlu).
- Rehberlerin bir avukat tarafından gözden geçirilip her sayfaya "içeriği
  doğrulayan" künyesinin eklenmesi.
- Çevrimdışı çalışma için service worker.
- Çok dilli içerik (TR, AR, KU) — `hreflang` altyapısı gerekir.
