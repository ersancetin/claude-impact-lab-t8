# Tasarım Sistemi

**Ürün:** Deprem Haklarım · **Kod:** [`docs/assets/tasarim.css`](./docs/assets/tasarim.css)
**Sürüm:** 2 — kurumsal sivil toplum kimliği · **Son güncelleme:** 2026-08-15

---

## 1. Sürüm 2 neyi değiştirdi?

Sürüm 1 tek sütunlu, "resmî form" hissi veren bir yerleşimdi. Modüller birbirinden bağımsız
sayfalar gibi duruyordu; kullanıcı hangi modülün neye yaradığını ancak açtığında anlıyordu.

Sürüm 2'nin hedefi **kurumsal bir sivil toplum platformu** görüntüsüdür: kurum kimliğinin
sayfanın üstünde görünür olduğu, gezinmenin sabit olduğu, içeriğin konu başlıklarına
ayrıldığı, her sayfanın nerede olduğunu künye şeridinden okunabildiği bir yapı.

| Sürüm 1 | Sürüm 2 |
|---|---|
| Modüller düz bir liste | **Araçlar / Bilgi Merkezi / Kurumsal** olmak üzere üç kolon |
| Başlık ve alt bilgi JavaScript ile basılıyordu | Statik HTML — arama motoru gezinmeyi görebiliyor |
| Tek sütun 44rem | Kurumsal yerleşim 74rem, okuma ölçüsü 42–44rem |
| Sayfalar elle yazılıyordu | İçerikten **üretiliyor** (`scripts/site-uret.py`) |
| Tek vurgu rengi (teal) | Türkiye'ye özgü kurumsal palet |

---

## 2. Tasarımın değişmeyen kuralı

> Bu siteyi kullanan kişi muhtemelen **evini kaybetmiş, uykusuz, telefonunun şarjı azalmış**
> ve şebekesi zayıf bir yerde. Tasarımın tek işi, o kişinin bir sonraki adımı görmesini
> sağlamak.

| Kural | Gerekçe |
|---|---|
| Ekran başına tek karar | Seçenek çokluğu kriz anında felç eder |
| En büyük öge, sıradaki eylem | Göz nereye gideceğini aramamalı |
| Jargon yok | "Zımni ret" değil, "cevap gelmezse" |
| Süre her zaman görünür | Kaybedilen hakların çoğu süresi kaçtığı için kaybediliyor |
| Kayıt, üyelik, e-posta yok | Hem güven hem KVKK; veri toplamıyoruz |
| Yazdırılabilir | Telefonun şarjı biter, kağıt bitmez |
| Sıfır bağımlılık | 2G'de de açılmalı |

---

## 3. Renk paleti — neden bu renkler?

Kullanıcı, DASK ve Türk Reasürans gibi kurumların kurumsal renklerini referans göstererek
"Türkiye'ye özgü" bir palet istedi. Bu kurumların resmî kurumsal kimlik kılavuzlarına
geliştirme ortamının ağ politikası nedeniyle **erişilemedi** (`dask.gov.tr` ve
`turkreasurans.com.tr` engelli). Bu yüzden marka renk kodlarını tahmin etmek yerine palet,
**belgelenebilir kültürel ve kurumsal kaynaklardan** türetildi:

| Jeton | Kaynak | Gerekçe |
|---|---|---|
| **Çini laciverdi** `#0E3A6B` | İznik çinisinin **kobalt mavisi** — 15. yy'dan itibaren tek renkli İznik dekorunun temel rengi | Türk kamu, sigorta ve reasürans kurumlarının kurumsal dili bu lacivert-mavi ailesindedir. Ana kurumsal renk. |
| **İznik türkuazı** `#0A6E6B` | 16. yy'ın ikinci çeyreğinde İznik paletine giren **bakır-turkuaz** | "Türkuaz" sözcüğü zaten "Türk taşı" demektir. Güvence, teminat ve olumlu durum rengi. |
| **Kökboya kırmızısı** `#A32014` | Osmanlı'nın kökboya (alizarin) ile elde ettiği ve Avrupa'da **"Turkey red"** diye anılan kırmızı | Tehlike ve açıkta kalan tutar rengi. Solmayan, ağır bir kırmızı. |
| **Bayrak kırmızısı** `#E30A17` | Türk bayrağı kırmızısı | **Yalnızca marka işaretinin köşe çentiğinde.** Durum rengi olarak asla kullanılmaz. |
| **Amber** `#855100` | — | Uyarı, süre yaklaşıyor, "geçmiş uygulama" etiketi |

### Renk anlamı sabittir

- **Lacivert** = kurum, gezinme, sıradaki adım
- **Türkuaz** = güvence altında, kalıcı hak
- **Kırmızı** = süre doldu, teminat açığı, tehlike
- **Amber** = süre yaklaşıyor, geçmiş uygulama (kalıcı hak değil)

Kırmızı asla dekoratif kullanılmaz. Kriz sitesinde her kırmızı gerçek bir riski göstermelidir.
Bayrak kırmızısının durum rengi olarak kullanılmaması da bu yüzdendir: markanın rengiyle
tehlikenin rengi karışmamalıdır.

### Kontrast ölçümü

```bash
python3 scripts/kontrast.py
```

43 renk çifti (açık tema, koyu tema, koyu kurumsal şerit) ölçülür ve tamamının
**4.5:1 eşiğinin üstünde** olması beklenir. En düşük ölçüm 4.92:1'dir.

---

## 4. Ayırt edici işaretler

Yaygın yapay zekâ arayüz kalıplarından (yuvarlak köşe, krem/turuncu palet, yumuşak gölge,
gradyan) bilinçli olarak uzaklaşıldı.

| Öge | Karar |
|---|---|
| **Köşe** | `border-radius: 0` — her yerde |
| **Gölge** | Hiç yok. Derinlik yerine **1px çizgi** |
| **Gradyan** | Hiç yok |
| **Kurum şeridi** | Sayfanın en üstünde koyu lacivert ince şerit — kurumsal siteleri kurumsal yapan katman |
| **Marka** | Logo yok; kare çerçeve içinde monospace kısaltma + bayrak kırmızısı köşe çentiği |
| **Kart** | Gölge yerine **4px vurgu çubuğu** — durumu renkle taşır |
| **Modül kartı** | Üstten 4px lacivert çubuk; rehber kartı soldan türkuaz çubuk |
| **Mikro etiket** | Monospace + versal + geniş harf aralığı |
| **Kanun dayanağı** | Monospace + sol çizgi + ikincil zemin |
| **Adım göstergesi** | Daire değil **kare/çubuk** |
| **Nitelik rozeti** | `Kalıcı mevzuat` (türkuaz) / `Geçmiş uygulama` (amber) |

---

## 5. Yerleşim

| Jeton | Değer | Kullanım |
|---|---|---|
| `--genislik-genis` | `74rem` | Kurumsal yerleşim: başlık, kahraman, ızgaralar, alt bilgi |
| `--genislik` | `44rem` | Araç sayfaları (form odaklı) |
| `.yazi` | `42rem` | Rehber metni — okuma ölçüsü |
| `--dokun` | `56px` | Asgari dokunma hedefi; titreyen elle kullanılabilmeli |
| `--olcek` | `4px` | Tüm boşluklar bunun katı |

Sayfa iskeleti:

```
kurum-serit      koyu lacivert şerit: kurum adı, nitelik, tema düğmesi
ust              marka + ana gezinme + mobil menü (details, JS yok)
kunye            breadcrumb — nerede olduğunuzu söyler
main             sayfa gövdesi
alt              4 sütunlu kurumsal alt bilgi + yasal şerit
```

---

## 6. Bileşen sözlüğü

| Sınıf | İş |
|---|---|
| `.kap` / `.kap-genis` | Okuma sütunu / kurumsal sütun |
| `.kurum-serit` | Üst kurum şeridi |
| `.gezinme` / `.gezinme-mobil` | Ana gezinme / `<details>` tabanlı mobil menü |
| `.kunye` | Breadcrumb |
| `.kahraman` + `.sure-panel` | Giriş bölümü ve süre paneli |
| `.olcut-serit` / `.olcut` | Kurumsal sayı şeridi |
| `.izgara.iki` / `.izgara.uc` | Duyarlı ızgara |
| `.modul` | Araç kartı |
| `.rehber` | Rehber/konu kartı |
| `.kart` + `.vurgulu` / `.guvence` / `.uyarili` / `.tehlikeli` / `.bilgili` | Durum kartı |
| `.dugme` / `.dugme.ikincil` | Eylem düğmeleri |
| `.secenek` | Büyük radyo/onay satırı |
| `.sure-oge` + `.acik` / `.yakin` / `.gecti` | Geri sayım satırı |
| `.rozet` / `.nitelik` | Doğrulama rozeti / hak niteliği rozeti |
| `.yazi-duzen` + `.icindekiler` + `.yazi` | Rehber yerleşimi |
| `.sss` | Sık sorulanlar (`<details>`, JSON-LD ile eşleşir) |
| `.teminat-cubuk` | Kapsanan/açıkta oranı |
| `.dayanak` | Kanun maddesi künyesi |
| `.serit` | Sayfa içi uyarı şeridi |
| `.cikti` | Dilekçe çıktısı |
| `.bekleyen` | Henüz yazılmamış rehbere atıf — bağ değil, işaret |

---

## 7. Neden framework yok?

| Yaklaşım | Sorun |
|---|---|
| shadcn/ui + React + Tailwind | Derleme adımı, ~100 kB+ JS, ek dağıtım iş akışı |
| CDN'den CSS çatısı | Dış bağımlılık; şebeke zayıfsa sayfa çıplak açılır |
| **Vanilla HTML + tek CSS + ES modülü** | **Toplam ~35 kB. Dış istek yok.** |

Hedef kitle düşük bant genişliğinde ve eski telefonlarda. Burada framework bir kolaylık
değil, **kullanıcıya yüklenen bir maliyet** olurdu. Jeton tabanlı tema ve tutarlı bileşen
sözlüğü benimsendi; ağırlık benimsenmedi.

Ayrıca dilekçe modülü hukuki nedenlerle **deterministik** olmak zorunda (`PROJE-LEGAL.md`
Bölüm 1) — sabit şablon + alan yerleştirme.

---

## 8. Erişilebilirlik

- **Kontrast:** 43 çift, iki temada da ≥ 4.5:1 (ölçüm: `scripts/kontrast.py`)
- **Klavye:** her etkileşimli öge erişilebilir, `:focus-visible` 3px belirgin
- **"İçeriğe atla"** bağlantısı her sayfada
- **Sonuç bölgeleri** `aria-live="polite"`
- Gezinme `<nav aria-label>`, künye `aria-current="page"`
- Mobil menü ve SSS **JavaScript olmadan** çalışır (`<details>`)
- `prefers-reduced-motion` ve `prefers-color-scheme` desteklenir
- Semantik HTML: `fieldset`/`legend`, gerçek `label`, gerçek `button`
- **Yazdırma stili**: gezinme, künye, içindekiler ve düğmeler gizlenir

---

## 9. Yapılacaklar

- [ ] Kalan rehber metinleri (Bilgi Merkezi'nde 5 kategori henüz boş)
- [ ] Katmanlı SVG teminat kesiti (şu an oransal çubuk var)
- [ ] Çevrimdışı çalışma için service worker
- [ ] Çok dilli içerik (TR, AR, KU)
- [ ] `.ics` takvim dışa aktarımı
- [ ] 🔴 Şablonların avukat onayı — yayın öncesi zorunlu
- [ ] 🔴 `DOGRULAMA.md` § A'daki kritik maddelerin doğrulanması
