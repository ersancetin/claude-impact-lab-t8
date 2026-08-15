# Tasarım Sistemi

**Ürün:** Deprem Haklarım · **Kod:** [`docs/assets/tasarim.css`](./docs/assets/tasarim.css)
**Sürüm:** 4 — tek palet, marka işareti, iki evreli 3B kapsam sahnesi · **Son güncelleme:** 2026-08-15

---

## 1. Sürüm 4 neyi değiştirdi?

| Sürüm 3 | Sürüm 4 |
|---|---|
| Açık + koyu tema, tema düğmesi | **Tek palet.** İki palet bakımı ikiye katlıyor, her yeni bileşende ikinci kontrast ölçümü gerektiriyordu |
| Marka: kare içinde "DH" harfleri | **Kalkan + ev işareti** — sitenin konusunu iki şekille anlatır; favicon aynı şekil |
| Marka altında "Hak · Süre · Dilekçe" | Kaldırıldı — başlık zaten aynı şeyi söylüyordu |
| Hero'da 3B: dönen ev | **İki evreli sahne:** önce DASK kapsamı, sonra konut poliçesi eklendiğinde; alt yazı evreyle birlikte değişir |
| Hesap sonunda yalnızca açık | Sonunda **teklif talebi metni** üretilir; kullanıcı kendi seçtiği şirkete gönderir |

---

## 1b. Sürüm 3 neyi değiştirdi?

Sürüm 2 kurumsal ama **düz**dü: üç başlıklı ince bir menü, altında mobilde yirmi
bağlantılık düz bir liste. Kullanıcı neyin nerede olduğunu ancak tıklayarak
öğreniyordu. Palet de lacivert ağırlıklıydı; sayfa "kamu formu" gibi duruyordu.

| Sürüm 2 | Sürüm 3 |
|---|---|
| Üç başlıklı ince menü | **Mega menü** — araçlar işlevine göre gruplu, 9 konu üç sütunda, açıklamalarıyla |
| Lacivert kurumsal kabuk | **Kırmızı kurumsal bant** (üst şerit + başlık bandı) |
| Kırmızı yalnızca durum rengiydi | Kırmızı **iki ayrı iş** yapar; jetonları ayrıldı (bkz. Bölüm 4) |
| Araç etiketi "Araç 1", "Araç 2" | Etiket artık **işlev grubu**: `SÜRE VE HAK`, `DİLEKÇE VE BAŞVURU` |
| Araçlara ancak menüden ulaşılırdı | Kahramanın altında **hızlı erişim şeridi** — dördü de katlamanın üstünde |
| Yardım kanalı yok | **Danışma penceresi** — sunucusuz soru/cevap (Bölüm 10) |
| Durum yalnızca renkle | Süre satırlarında **yazılı durum etiketi** (renk körlüğü) |

---

## 2. Sürüm 2 neyi değiştirmişti?

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

## 3. Tasarımın değişmeyen kuralı

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

## 4. Renk paleti — ve kırmızının iki işi

Kurumsal kimlik kırmızıdır. Ancak bu projede kırmızının **zaten bir anlamı vardı**:
"süren doldu", "teminat açığı". Marka rengi ile tehlike rengi karışırsa kullanıcı
gerçek bir riski marka süsü sanar. Çözüm üç katmanlı:

**1. Jetonlar ayrıldı.** Kırmızı tek bir değişken değildir:

| Jeton | Açık tema | Koyu tema | İş |
|---|---|---|---|
| `--marka` | `#C8102E` | `#FF8A99` | Açık yüzey **üstünde** okunan vurgu: çizgi, küçük başlık, sayı |
| `--marka-bant` | `#C8102E` | `#8E0C20` | Kırmızı **kabuk zemini**: üst bant, birincil düğme, danışma başlığı |
| `--marka-bant-2` | `#A00C24` | `#6D0918` | Koyu kabuk: kurum şeridi, vurgulu hâl |
| `--tehlike` | `#8E1B12` | `#F5948A` | **Yalnızca** süre doldu / açıkta kalan tutar |

`--marka` ile `--marka-bant` ayrılmazsa koyu temada bant açık pembeye döner ve
üstündeki beyaz yazı okunmaz hâle gelir. Bu ayrım kozmetik değil, erişilebilirlik
gereğidir; `scripts/kontrast.py` ikisini **ayrı ayrı** ölçer.

**2. Yerleşim kuralı.** Marka kırmızısı yalnızca kabukta ve birincil eylemde bulunur;
içerik gövdesinde asla durum taşımaz. Tehlike kırmızısı yalnızca gövdede bulunur;
kabukta asla görünmez. İkisi aynı ekran bölgesinde yan yana gelmez.

**3. Renge bağlı olmayan işaret.** Tehlike her zaman renkten bağımsız bir sinyal
taşır: kartta **6px** çubuk (diğerleri 4px) ve süre satırlarında yazılı durum
etiketi — `SÜRE DOLDU` / `SÜRE YAKLAŞIYOR` / `SÜRE İŞLİYOR`. Renk körlüğünde de
ayırt edilir (WCAG 1.4.1: bilgi yalnızca renkle aktarılamaz).

### Diğer renkler

| Jeton | Değer | Anlam |
|---|---|---|
| `--vurgu` çini laciverdi | `#14395F` | **Yapı**: bağlantı, kart çubuğu, bölüm ayracı |
| `--turkuaz` İznik türkuazı | `#0A6E6B` | **Güvence**: kalıcı hak, teminat altında |
| `--uyari` amber | `#855100` | Süre yaklaşıyor, geçmiş uygulama (kalıcı hak değil) |

Lacivert ve türkuaz gerekçesi sürüm 2'den korundu: İznik çinisinin kobalt mavisi ve
bakır turkuazı; "türkuaz" sözcüğü zaten "Türk taşı" demektir.

### Kontrast ölçümü

```bash
python3 scripts/kontrast.py
```

52 renk çifti (açık tema, koyu tema, alt bilgi ve teminat çubuğu) ölçülür; tamamının
**4.5:1 eşiğinin üstünde** olması beklenir. En düşük ölçüm 4.95:1'dir.

---

## 5. Ayırt edici işaretler

Yaygın yapay zekâ arayüz kalıplarından (yuvarlak köşe, krem/turuncu palet, yumuşak gölge,
gradyan) bilinçli olarak uzaklaşıldı.

| Öge | Karar |
|---|---|
| **Köşe** | Kart ve panelde `0`. Yalnızca **etkileşimli** ögede 3px (düğme, alan, rozet) — kurumsal duruşu kart keskinliği taşır |
| **Gölge** | Sayfa içinde hiç yok; derinlik yerine **1px çizgi**. Tek istisna **üste binen katman** (mega menü, danışma penceresi) — bunlar sayfadan kopmak zorunda |
| **Gradyan** | Hiç yok |
| **Kurum şeridi** | Sayfanın en üstünde koyu lacivert ince şerit — kurumsal siteleri kurumsal yapan katman |
| **Marka** | Logo yok; kırmızı bant üzerinde **beyaz kare** içinde monospace kısaltma |
| **Menü** | Mega panel; açılış saf CSS (`:hover` + `:focus-within`) — JS yok, klavyeyle de açılır |
| **Kart** | Gölge yerine **4px vurgu çubuğu** — durumu renkle taşır |
| **Modül kartı** | Üstten 4px lacivert çubuk; rehber kartı soldan türkuaz çubuk |
| **Mikro etiket** | Monospace + versal + geniş harf aralığı |
| **Kanun dayanağı** | Monospace + sol çizgi + ikincil zemin |
| **Adım göstergesi** | Daire değil **kare/çubuk** |
| **Nitelik rozeti** | `Kalıcı mevzuat` (türkuaz) / `Geçmiş uygulama` (amber) |

---

## 6. Yerleşim

| Jeton | Değer | Kullanım |
|---|---|---|
| `--genislik-genis` | `74rem` | Kurumsal yerleşim: başlık, kahraman, ızgaralar, alt bilgi |
| `--genislik` | `44rem` | Araç sayfaları (form odaklı) |
| `.yazi` | `42rem` | Rehber metni — okuma ölçüsü |
| `--dokun` | `56px` | Asgari dokunma hedefi; titreyen elle kullanılabilmeli |
| `--olcek` | `4px` | Tüm boşluklar bunun katı |

Sayfa iskeleti:

```
kurum-serit      koyu kırmızı şerit: kurum adı, nitelik, tema düğmesi
ust              kırmızı bant: marka + mega gezinme + "Soru sor" + mobil menü
kunye            breadcrumb — nerede olduğunuzu söyler
main             sayfa gövdesi
alt              4 sütunlu kurumsal alt bilgi + yasal şerit
danisma          sağ altta sabit: soru penceresi (her sayfada)
```

---

## 7. Bileşen sözlüğü

| Sınıf | İş |
|---|---|
| `.kap` / `.kap-genis` | Okuma sütunu / kurumsal sütun |
| `.kurum-serit` | Üst kurum şeridi |
| `.gezinme` + `.mega` | Mega gezinme paneli (saf CSS açılır) |
| `.gezinme-mobil` | `<details>` tabanlı mobil menü, işlev gruplarıyla |
| `.hizli` / `.hizli-kart` | Kahraman altı hızlı erişim şeridi |
| `.danisma` / `.danisma-ac` / `.balon` | Danışma penceresi, açma düğmesi, konuşma balonu |
| `.sure-durum` | Renge bağlı olmayan durum etiketi (SÜRE DOLDU vb.) |
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

## 8. Neden framework yok?

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

## 9. Erişilebilirlik

- **Kontrast:** 29 çift, tek palette ≥ 4.5:1 (ölçüm: `scripts/kontrast.py`)
- **Klavye:** her etkileşimli öge erişilebilir, `:focus-visible` 3px belirgin
- **"İçeriğe atla"** bağlantısı her sayfada
- **Sonuç bölgeleri** `aria-live="polite"`
- Gezinme `<nav aria-label>`, künye `aria-current="page"`
- Mobil menü, mega menü ve SSS **JavaScript olmadan** çalışır
- **Renk tek başına bilgi taşımaz** (WCAG 1.4.1): süre durumları yazıyla da işaretlenir
- Danışma penceresi `Esc` ile kapanır, `role="log"` + `aria-live` ile okunur
- `prefers-reduced-motion` mutlak saygı görür: 3B sahne yüklenmez bile
- Semantik HTML: `fieldset`/`legend`, gerçek `label`, gerçek `button`
- **Yazdırma stili**: gezinme, künye, içindekiler ve düğmeler gizlenir

---

## 10. Danışma penceresi

Her sayfanın sağ altında, kabuktaki "Soru sor" düğmesiyle de açılan bir soru penceresi.

**Ne değildir:** dil modeli değildir, metin üretmez, tahmin etmez.
**Ne yapar:** soruyu sitedeki doğrulanmış içerik künyeleriyle eşleştirir ve ilgili
rehbere, araca ya da süreye yönlendirir.

Bunun bir tercih değil **zorunluluk** olmasının iki nedeni var: (1) platformun çekirdek
taahhüdü "girdiğiniz hiçbir bilgi cihazdan çıkmaz" — soruyu bir API'ye göndermek,
kullanıcının hukuki durumunu üçüncü tarafa aktarmak olurdu; (2) statik bir sitede API
anahtarı saklanamaz, herkese açık olurdu.

| Parça | Dosya | İş |
|---|---|---|
| Bilgi tabanı | `docs/assets/bilgi-tabani.js` | **Üretilir.** `icerik/`, `kaynak/modul/` ve `data/parametreler.json`'dan 38 kayıt |
| Arama ve pencere | `docs/assets/danisma.js` | Normalleştirme, önek eşleşmesi, puanlama, arayüz |
| Isabet sınaması | `scripts/danisma-kontrol.mjs` | 24 sorunun beklenen kaydı ilk sırada döndürmesi (5 tanesi boş dönmeli) |

**Uydurmama kuralı:** cevap metni tarayıcıda üretilmez; yalnızca bilgi tabanındaki
künye metinleri gösterilir. Eşleşme yoksa "bulamadım" denir, yaklaştırma yapılmaz.
Her cevap kaynak bağını ve o kaydın **doğrulama rozetini** taşır.

**Arama:** Türkçe eklemeli bir dil olduğu için ek listesi yerine önek eşleşmesi
kullanılır ("verilerim" → "veri" anahtarını bulur). Soru "kaç gün / ne zaman" tipiyse
süre kayıtları öne çıkar; "nedir / nasıl" tipiyse konuyu anlatan rehber öne çıkar.

---

## 10.5. Sürüm 4 bileşenleri

| Bileşen | Sınıf | Ne zaman kullanılır |
|---|---|---|
| İkon seti | `data/ikon.json` → `.ikon` | Mega menü, araç kartları. 20×20, tek renk (`currentColor`), `stroke-width:1.5` |
| Form ızgarası | `.form-izgara` (`.uc`, `> .tam`) | 46rem'den geniş ekranda iki sütun. Araç formlarında input yığınını kırar |
| Alan kümesi | `.alan-grup` | Birbirine bağlı alanları tek çerçevede toplar |
| Ölçüt şeridi | `.olcut-serit` / `.olcut` | Sonuç bölümünün başında 3–4 sayıyla özet |
| Adım göstergesi | `.adimlar` / `.adim` (`.aktif`, `.bitti`) | Çok adımlı formlar (hak tarama) |
| Etiket–değer listesi | `.deger-liste` | "ne → kaç" satırları. `.kalem-liste` bir kart ızgarasıdır, bunun yerine geçmez |
| Nitelik rozeti | `.nitelik.kalici` / `.nitelik.emsal` | Kalıcı hak ↔ geçmiş afet uygulaması ayrımı. **Emsal asla "hak" diye sunulmaz** |
| A4 kâğıt | `.dilekce-kagit` | Dilekçe çıktısı. 21 cm, 2 cm kenar boşluğu; yazdırmada çerçeve kalkar |
| Dosya kodu | `.dosya-kod` | Elle yazılacak kod: iri, aralıklı, `user-select: all` |

### Afiş ve 3B katman kuralı

Hero görselinde **iki katman** vardır ve ikisi aynı kutuyu paylaşır ki 3B açıldığında
yerleşim zıplamasın:

1. **Taban:** etiketli SVG kesit afişi (`afis_kesit()`). Her zaman üretilir.
2. **Üste binen:** three.js sahnesi (`sahne3b.js`). Yalnızca WebGL2 + hareket izni +
   hızlı bağlantı varsa yüklenir; yüklenirse SVG gizlenir.

Kural: **3B hiç yüklenmese bile aynı bilgi eksiksiz verilmelidir.** Bu yüzden lejant
her iki katmanda da vardır ve sahnenin canlı alt yazısı farkı metinle anlatır.
Renk tek başına bilgi taşımaz (WCAG 1.4.1).

### Yazdırma

Yazdırma bu projede tercih değil tasarım kuralıdır ("telefonun şarjı biter").
`@media print` altında: gezinme, düğme sıraları, danışma penceresi ve adım göstergesi
gizlenir; kesit, ölçüt, süre öğesi, değer listesi ve dilekçe kâğıdı sayfa ortasından
bölünmez; renkli zeminler beyaza, kenarlıklar tek renge iner.

---

## 11. Yapılacaklar

- [ ] Kalan rehber metinleri (Bilgi Merkezi'nde 5 kategori henüz boş)
- [x] Katmanlı SVG teminat kesiti — `afis_kesit()`, üstünde three.js sahnesi
- [ ] Çevrimdışı çalışma için service worker
- [ ] Danışma: eş anlamlı sözlüğü ("ev sahibi" ↔ "malik", "tazminat" ↔ "ödeme")
- [ ] Çok dilli içerik (TR, AR, KU)
- [ ] `.ics` takvim dışa aktarımı
- [ ] 🔴 Şablonların avukat onayı — yayın öncesi zorunlu
- [ ] 🔴 `DOGRULAMA.md` § A'daki kritik maddelerin doğrulanması
