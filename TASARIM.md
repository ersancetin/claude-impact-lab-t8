# Tasarım Sistemi

**Ürün:** Deprem Haklarım · **Kod:** [`docs/assets/tasarim.css`](./docs/assets/tasarim.css)
**Son güncelleme:** 2026-08-15

---

## 1. Tasarımın tek kuralı

> Bu siteyi kullanan kişi muhtemelen **evini kaybetmiş, uykusuz, telefonunun şarjı azalmış** ve şebekesi zayıf bir yerde. Tasarımın tek işi, o kişinin bir sonraki adımı görmesini sağlamak.

Buradan çıkan her karar:

| Kural | Gerekçe |
|---|---|
| **Ekran başına tek karar** | Seçenek çokluğu kriz anında felç eder |
| **En büyük öge, sıradaki eylem** | Göz nereye gideceğini aramamalı |
| **Jargon yok** | "Zımni ret" değil, "cevap gelmezse" |
| **Süre her zaman görünür** | Kaybedilen hakların çoğu süre kaçtığı için kaybediliyor |
| **Kayıt, üyelik, e-posta yok** | Hem güven hem KVKK; veri toplamıyoruz |
| **Yazdırılabilir** | Telefonun şarjı biter, kağıt bitmez |
| **Tek dosya, sıfır bağımlılık** | 2G'de de açılmalı |

---

## 2. Neden framework yok?

Kullanıcı shadcn/ui benzeri bir çatı önerdi. Değerlendirdim ve **kullanmadım** — gerekçesi:

| Yaklaşım | Sorun |
|---|---|
| shadcn/ui + React + Tailwind | Derleme adımı, ~100 kB+ JS, GitHub Pages için ek iş akışı, çevrimdışı çalışmaz |
| CDN'den CSS çatısı | Dış bağımlılık; şebeke zayıfsa sayfa çıplak açılır |
| **Vanilla HTML + tek CSS + ES modülü** | **Toplam ~30 kB. Derleme yok. İlk açılıştan sonra çevrimdışı çalışır.** |

Hedef kitle düşük bant genişliğinde ve eski telefonlarda. Burada framework bir kolaylık değil, **kullanıcıya yüklenen bir maliyet** olurdu. shadcn'in getirdiği düzen (jeton tabanlı tema, tutarlı bileşen sözlüğü) zaten benimsendi; getirdiği ağırlık benimsenmedi.

Ayrıca dilekçe modülü hukuki nedenlerle **deterministik** olmak zorunda (bkz. `PROJE-LEGAL.md` Bölüm 1) — sabit şablon + alan yerleştirme. Bu, ağır bir istemci çatısı gerektirmiyor.

---

## 3. Ayırt edici işaretler

Yaygın yapay zekâ arayüz kalıplarından (yuvarlak köşe, krem/turuncu palet, yumuşak gölge, gradyan) bilinçli olarak uzaklaşıldı. Bu sistemin imzası:

| Öge | Karar |
|---|---|
| **Köşe** | `border-radius: 0` — her yerde. Keskin, resmî, evrak hissi |
| **Gölge** | Hiç yok. Derinlik yerine **1px çizgi** |
| **Gradyan** | Hiç yok |
| **Vurgu** | Tek renk: **derin teal-yeşil** `#0B6B5B`. Kurumsal mavi değil, uyarı kırmızısı değil |
| **Kart** | Gölge yerine **4px sol vurgu çubuğu** — durumu renkle taşır |
| **Mikro etiket** | Monospace + versal + geniş harf aralığı |
| **Kanun dayanağı** | Monospace + sol çizgi — hukuki metni gövdeden ayırır |
| **Adım göstergesi** | Daire değil **kare/çubuk** |
| **Marka** | Logo yok; ada bitişik **6px dikey teal çubuk** |

Sonuç: yazılım ürününden çok **resmî bir form** gibi okunur — bu, hukuki içerik için doğru tondur.

---

## 4. Renk jetonları

Tüm renkler CSS değişkeni. Üç tema bloğu: açık (`:root`), sistem-koyu (`@media`), açık seçim (`[data-tema]`).

| Jeton | Açık | Koyu | Kullanım |
|---|---|---|---|
| `--kagit` | `#F4F6F4` | `#0D1012` | Sayfa zemini |
| `--yuzey` | `#FFFFFF` | `#161A1D` | Kart, girdi |
| `--murekkep` | `#14181A` | `#E7EDEA` | Gövde metni |
| `--murekkep-2` | `#4B5560` | `#9EAAB1` | İkincil metin |
| `--murekkep-3` | `#5E686F` | `#7C888F` | Etiket (kontrast için koyulaştırıldı) |
| `--cizgi` | `#D5DBD6` | `#2A3135` | Kenarlık |
| **`--vurgu`** | **`#0B6B5B`** | **`#4FC0A7`** | Tek vurgu rengi |
| `--uyari` | `#8A5200` | `#E3A75C` | Süre yaklaşıyor |
| `--tehlike` | `#A02016` | `#EC8C80` | Süre doldu, teminat açığı |
| `--bilgi` | `#1B4E7A` | `#7FB3DE` | Yönlendirme |
| `--dugme-yazi` | `#FFFFFF` | `#06201B` | Birincil düğme yazısı |

### Renk anlamı sabittir

- **Teal** = güvence altında, doğru yol, sıradaki adım
- **Amber** = süre yaklaşıyor, dikkat
- **Kırmızı** = süre doldu **veya** açıkta kalan tutar
- **Mavi** = bilgi, başka sayfaya yönlendirme

Kırmızı asla dekoratif kullanılmaz. Kriz sitesinde her kırmızı, gerçek bir riski göstermelidir.

---

## 5. Ölçek ve tipografi

- **Boşluk:** 4px tabanlı (`--olcek`). Tüm iç boşluklar bunun katı.
- **Genişlik:** `44rem` tek sütun. Çok sütun yok — kriz anında göz gezdirme yükü.
- **Gövde:** 17px mobil / 18px masaüstü, satır yüksekliği 1.62. Normalden büyük, bilinçli.
- **Dokunma hedefi:** asgari **56px** — titreyen elle kullanılabilmeli.
- **Font:** yalnızca sistem yazı tipleri. Web fontu yok → indirme yok, FOUT yok.
- **Monospace:** etiketler, kanun dayanakları, sayılar, dilekçe çıktısı.

---

## 6. Bileşen sözlüğü

| Sınıf | İş |
|---|---|
| `.kap` | Ortalanmış içerik sütunu |
| `.secim` | Büyük giriş düğmesi — ana sayfadaki yönlendirmeler |
| `.kart` + `.vurgulu` / `.uyarili` / `.tehlikeli` / `.bilgili` | Durum kartı |
| `.dugme` / `.dugme.ikincil` | Eylem düğmeleri |
| `.secenek` | Büyük radyo/onay kutusu satırı |
| `.sure-oge` + `.acik` / `.yakin` / `.gecti` | Geri sayım satırı |
| `.rozet` + `.iyi` / `.uyari` / `.tehlike` / `.dogrulanmamis` | Durum rozeti |
| `.teminat-cubuk` | Kapsanan/açıkta oranı |
| `.dayanak` | Kanun maddesi künyesi |
| `.serit` | Sayfa üstü uyarı |
| `.cikti` | Dilekçe metni |

---

## 7. Erişilebilirlik

Ölçülen ve karşılanan hedefler:

- **Kontrast:** tüm metin ≥ 4.5:1, iki temada da ölçüldü (en düşük 5.25:1)
- **Klavye:** her etkileşimli öge erişilebilir, `:focus-visible` 3px belirgin
- **"İçeriğe atla"** bağlantısı
- **Sonuç bölgeleri** `aria-live="polite"` — ekran okuyucu hesaplamayı duyurur
- `prefers-reduced-motion` desteklenir
- `prefers-color-scheme` desteklenir, kullanıcı seçimi üstünde tutulur
- Semantik HTML: `fieldset`/`legend`, gerçek `label`, gerçek `button`
- **Yazdırma stili**: gezinme ve düğmeler gizlenir, içerik kağıda sığar

> Görselleştirmeler hiç yüklenmese bile aynı bilgi metin/tablo olarak vardır.

---

## 8. Mahremiyet mimarisi

Tasarım kararı, veri kararıdır:

- **Sunucu yok.** GitHub Pages statik dosya sunar; form verisi hiçbir yere gitmez.
- **Analitik yok, çerez yok, dış istek yok.** Sayfa tek bir dış bağlantı bile açmaz.
- Girilenler yalnızca `localStorage`'da, kullanıcının cihazında. Her sayfada "Temizle" mümkün.
- T.C. kimlik numarası gibi alanların yanında bunu açıkça söyleyen not var.

2023'te enkaz altındaki kişilerin bilgileri kamuya açık listelerde dolaştı ve dolandırıcılıkta kullanıldı. Bu mimari, o hatayı **teknik olarak imkânsız** kılıyor.

---

## 9. Modüller

| Sayfa | İş |
|---|---|
| `index.html` | Dört giriş + en sık üç hata + kiracı uyarısı |
| `sureler.html` | Tarihlerden kişisel süre takvimi, aciliyete göre sıralı |
| `haklarim.html` | 3 soru → profile göre hak listesi (kiracı/malik ayrımı) |
| `dilekce.html` | Sabit şablon → form → çıktı → **nereye/nasıl göndereceği** |
| `teminat.html` | DASK bedeli, muafiyet, teminat açığı; kiracıda bina devre dışı |

### Dilekçe modülünün hukuki tasarımı

`PROJE-LEGAL.md` Bölüm 1'deki Avukatlık Kanunu m.35 analizinden doğrudan çıkar:

- Şablonlar **sabit metindir**; yapay zekâ hukuki metin üretmez
- Sistem yalnızca **kullanıcının girdiği alanları yerleştirir**
- Her çıktıda "bu bir taslaktır, avukata danışın" uyarısı
- Her şablonda **adli yardım** yönlendirmesi
- Somut olay hukuken nitelendirilmez

---

## 10. Test

```bash
cd docs && python3 -m http.server 8899
```

Tarayıcı testleri (Playwright) şunları doğruluyor:

- Beş sayfa konsol hatasız yükleniyor, iskelet basılıyor
- Süre hesaplayıcı 8 kalem üretiyor, sıralama aciliyete göre
- Dilekçe: `?sablon=` ile açılıyor, form doldurulunca çıktı ve gönderim kartı geliyor
- Teminat: 100 m² betonarme → 1.071.400 TL bedel, 21.428 TL muafiyet, 2.928.600 TL açık
- Kiracı profilinde bina alanı gizleniyor; kiracıya malik hakkı gösterilmiyor
- Kontrast iki temada da eşiğin üstünde

---

## 11. Yapılacaklar

- [ ] Vaka dosyası + doğrulama kodu ekranı (`PROJE-AKIS.md` Bölüm 7)
- [ ] Katmanlı SVG teminat kesiti (şu an oransal çubuk var)
- [ ] Çevrimdışı çalışma için service worker
- [ ] Çok dilli içerik (TR, AR, KU)
- [ ] `.ics` takvim dışa aktarımı
- [ ] 🔴 **Şablonların avukat onayı** — yayın öncesi zorunlu
- [ ] 🔴 **`DOGRULAMA.md` § A'daki 12 kritik maddenin doğrulanması** — sitedeki süreler buna bağlı
