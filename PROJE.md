# Afet Lojistik Koordinasyon Sistemi

**Ekip:** T8 — Hasar Tespiti
**Durum:** Vizyon dokümanı / tartışmaya açık taslak
**Son güncelleme:** 2026-08-15

---

## 1. Problem

6 Şubat 2023 Kahramanmaraş depremlerinin ardından onlarca ihtiyaç toplama platformu, form ve harita ortaya çıktı. Buna rağmen yardım dağılımı ciddi biçimde dengesiz kaldı. Sahadan çıkan tabloya bakıldığında darboğazın **talebi toplamak olmadığı**, aşağıdaki beş noktada düğümlendiği görülüyor:

| # | Darboğaz | Sahadaki karşılığı |
|---|---|---|
| 1 | **Mükerrer ve hayalet talepler** | Aynı ihtiyaç onlarca kanaldan giriliyor, karşılandığında hiçbir yerde kapanmıyor. Kapanmayan talepler kaynağı aynı noktaya tekrar tekrar çekiyor. |
| 2 | **Doğrulanmamış talep** | Sahte, hatalı veya günü geçmiş kayıtlar kaynağı yanlış yere yönlendiriyor. |
| 3 | **Son 50 km** | Bölgeye ulaşan yardım depoda tasnif edilemiyor, dağıtılamıyor. Depoda bekleyip bozulan gıda gerçek bir olgu. |
| 4 | **Şebeke yokluğu** | Sahada internet ve elektrik yok. Çevrimiçi çalışmayı varsayan hiçbir araç ilk 72 saatte işe yaramıyor. |
| 5 | **Görünürlük eksikliği** | Kurum, STK ve gönüllüler birbirinin ne yaptığını bilmiyor. Bir mahalleye onlarca tır su giderken komşu köye hiçbir şey ulaşmıyor. |

**Sonuç:** Sorun bilgi kıtlığı değil, **bilgi fazlasının koordine edilememesi**. Bir ihtiyaç formu daha yazmak bu tabloyu değiştirmez.

---

## 2. Ürün tezi

> Bu sistem bir ihtiyaç toplama formu değil, **arz ile talebi eşleştiren ve döngüyü teslimle kapatan bir koordinasyon motorudur.**

Ürünün merkezinde tek bir zincir var ve bu zincir uçtan uca çalışır:

```
Hasar kaydı
   → Otomatik ihtiyaç türetme
      → Mükerrer kayıt birleştirme (dedup)
         → Doğrulama
            → Önceliklendirme skoru
               → Depo stoğuyla eşleştirme
                  → Sevkiyat
                     → Teslim kanıtı
                        → Talebin KAPANMASI
```

Kritik tasarım kuralı: **kapanmayan talep, karşılanmamış talepten daha zararlıdır.** Bu yüzden teslim kanıtı ve kapanma, sistemin isteğe bağlı değil zorunlu adımıdır.

### Konumlandırma

Bu sistem AFAD'ın veya belediyelerin yerine geçmeyi hedeflemez — afet anında kurumlar kendi sistemlerini kullanır ve yeni bir uygulama benimsetmek pratikte imkânsızdır. Sistem, **kurumlar arası boşluğu dolduran koordinasyon katmanı** olarak konumlanır. Bunun iki zorunlu tasarım sonucu vardır:

- **Sıfır kurulum:** SMS / WhatsApp / tek tıkla açılan bağlantı ile giriş. Uygulama mağazasından indirme zorunluluğu yok.
- **Açık API ve veri ihracı:** Kurum kendi sistemine besleme yapabilmeli. Veri bu platformda hapsolmamalı.

---

## 3. Hasar tespitinden ihtiyaca: sistemin ayırt edici özelliği

Ekibin adı ve reponun konusu hasar tespiti. Bunu lojistiğe bağlayan köprü, ürünün en özgün parçası:

**Bina hasar kaydı girildiği anda ihtiyaç otomatik türetilir.** Kimse form doldurmayı beklemez.

```
Bina: Antakya / X Mahallesi / 12 daire / AĞIR HASARLI
   ↓ türetme kuralı
   ~38 kişi barınmasız
   → 10 aile çadırı (veya 38 kişilik konteyner kapasitesi)
   → 76 battaniye        (kişi başı 2, kış koşulu)
   → 114 öğün/gün sıcak yemek
   → 38 kişilik hijyen kiti
   ↓
   Talep havuzuna "türetilmiş / doğrulama bekliyor" statüsünde düşer
```

Depremin ilk saatlerinde kimse ihtiyaç formu doldurabilecek durumda değildir. **Sistem talebi kendisi öngörür**, saha ekibi yalnızca doğrular veya düzeltir. Türetme katsayıları (kişi/daire, battaniye/kişi, öğün/kişi) Sphere insani yardım standartlarına dayandırılır ve yapılandırılabilir tutulur.

### Hasar verisi nasıl girer?

Birincil yöntem: **saha ekibinin mobil kaydı.** Gönüllü veya AFAD ekibi bina bazında hasar formu doldurur; form çevrimdışı çalışır, şebeke geldiğinde senkronlanır. Veri kalitesi yüksek, uygulanabilirlik gerçekçi.

Vatandaş bildirimi ve uydu görüntüsü analizi ileri sürümlere bırakılan tamamlayıcı kanallardır (bkz. Yol Haritası V2).

---

## 4. Roller

| Rol | Ne yapar | Kritik ihtiyacı |
|---|---|---|
| **Saha gönüllüsü** | Hasar ve ihtiyaç kaydı girer, teslim kanıtı yükler | Çevrimdışı çalışma, tek elle kullanım, düşük veri girişi |
| **Doğrulayıcı (teyitçi)** | Talepleri teyit eder, mükerrerleri birleştirir | Hızlı kuyruk arayüzü, toplu işlem |
| **Koordinatör** | Öncelikleri görür, tahsis kararı verir, sevkiyat açar | Bütünsel harita, açıklanabilir öncelik skoru |
| **Depo sorumlusu** | Stok girişi/çıkışı, tasnif, sevk hazırlığı | Barkod/QR ile hızlı işlem, SKU disiplini |
| **Sürücü / konvoy** | Sevkiyatı taşır, teslim eder | Basit görev listesi, çevrimdışı navigasyon, teslim kanıtı |
| **Kurum (AFAD/belediye/STK)** | Kendi faaliyetini işler, boşluğu görür | 3W paneli, veri ihracı, API |
| **Bağışçı** | Ayni/nakdi bağış yapar, akıbetini izler | Şeffaflık, uçtan uca iz |
| **Kamu (anonim)** | Genel durumu görür | Kişisel veri içermeyen özet panel |

---

## 5. Çekirdek veri modeli (taslak)

```
Bina            id, konum, hane/daire sayısı, hasar_seviyesi, kayıt_eden, zaman
Talep           id, tip(SKU), miktar, birim, konum, kaynak(türetilmiş|bildirilmiş),
                durum, aciliyet, kırılganlık_bayrakları, küme_id, oluşma_zamanı
Küme            id, birleştirilen_talep_id[], toplam_miktar, öncelik_skoru
Stok            id, depo_id, sku, miktar, son_kullanma, soğuk_zincir?, ayrılan_miktar
Depo            id, konum, kapasite, sorumlu, çalışma_durumu
Sevkiyat        id, kaynak_depo, hedef_küme, kalemler[], araç, sürücü, durum, ETA
TeslimKanıtı    sevkiyat_id, foto[], imza/QR, konum, zaman, teslim_alan_rolü
Kapasite        id, tip(barınma|yemek|sağlık|hijyen|jeneratör), konum, doluluk/kapasite
Faaliyet(3W)    kurum, ne, nerede, ne_zaman        ← OCHA 3W şeması
Gönüllü         id, beceriler[], konum, uygunluk, doğrulama_durumu
```

### Talep durum makinesi

```
AÇIK ──► DOĞRULANDI ──► TAHSİS EDİLDİ ──► YOLDA ──► TESLİM EDİLDİ ──► KAPANDI
  │            │                │
  ├──► MÜKERRER (küme'ye birleştirildi)
  ├──► GEÇERSİZ (doğrulama başarısız)
  └──► ZAMAN AŞIMI (X saat hareketsiz → yeniden doğrulama kuyruğuna)
```

`ZAMAN AŞIMI` durumu hayalet talep sorununun panzehiridir: hiçbir talep sessizce sonsuza kadar açık kalamaz.

---

## 6. Eşleştirme ve önceliklendirme

Öncelik skoru **açıklanabilir** olmak zorundadır. Koordinatör "bu sevkiyat neden önce?" sorusunun cevabını ekranda görebilmelidir. Kara kutu model kullanmıyoruz.

```
öncelik = aciliyet_ağırlığı
        × kırılganlık_çarpanı      (bebek, gebe, yaşlı, kronik hasta, engelli)
        × bekleme_süresi_faktörü   (karşılanmamış geçen süre, süper-doğrusal artış)
        × karşılanmamışlık_oranı   (talep edilen − ulaşan) / talep edilen
        ÷ erişim_maliyeti          (mesafe, yol durumu, hava)
```

Her skorun yanında insan diliyle gerekçe gösterilir:

> *"Öncelik 94 — 3 bebekli hane, 26 saattir karşılanmamış, en yakın depoya 12 km, bu bölgeye bugün hiç sevkiyat yapılmadı."*

### Mükerrer birleştirme (dedup)

Talepler şu üç eksende kümelenir: **coğrafi yakınlık** (yapılandırılabilir yarıçap) + **SKU eşleşmesi** + **zaman penceresi**. Kümeleme otomatik önerilir, doğrulayıcı tek tıkla onaylar veya ayırır. Otomatik birleştirme asla geri alınamaz olmamalıdır.

### SKU standardizasyonu

"Bebek bezi" yeterli bir kayıt değildir — beden bilgisi olmadan yanlış ürün gönderilir. Serbest metin yerine kontrollü ürün listesi:

- Beden/yaş kırılımı (bez bedeni, mama tipi, kıyafet bedeni ve cinsiyeti)
- Soğuk zincir bayrağı (ilaç, aşı)
- Son kullanma tarihi zorunluluğu (gıda, ilaç)
- Helal/vegan/alerjen ve özel diyet bayrakları

---

## 7. Çevrimdışı çalışma

İlk 72 saat şebekesizdir. Bu bir kenar durum değil, **varsayılan durumdur.**

- **Offline-first PWA:** IndexedDB'de yerel kayıt, service worker ile kuyruklama, şebeke gelince senkron.
- **Çakışma çözümü:** Aynı kayıt iki cihazdan güncellendiğinde son-yazan-kazanır yerine alan bazlı birleştirme; çelişki koordinatöre gösterilir.
- **SMS geri düşüşü:** Yapılandırılmış kısa mesaj formatı (`IHT <mahalle> <sku> <adet>`) ile veri girişi. İnternet olmadan da sisteme veri akar.
- **Yazdırılabilir çıktı:** Sevkiyat manifestosu ve teslim formu kağıt üzerinde de çalışmalı. Telefonun şarjı biter.

---

## 8. Mahremiyet, güvenlik ve kötüye kullanım

2023'te enkaz altındaki kişilerin ad ve telefon bilgileri kamuya açık listelerde dolaştı; bu bilgiler dolandırıcılıkta kullanıldı. Bu tekrarlanmamalı.

- **Katmanlı veri erişimi:** Kişisel veri hiçbir koşulda kamuya açık katmanda yer almaz. Kamu paneli yalnızca toplulaştırılmış ve anonim veri gösterir.
- **Konum bulanıklaştırma:** Kamu görünümünde nokta konum değil, mahalle/ızgara düzeyinde toplulaştırma.
- **Rol bazlı erişim (RBAC):** Her rol yalnızca işini yapmak için gereken alanı görür. Sürücü teslim adresini görür, tıbbi bilgiyi görmez.
- **Denetim kaydı:** Kim neyi ne zaman değiştirdi — özellikle stok ve tahsis işlemlerinde.
- **Kötüye kullanım savunması:** Sahte talep tespiti (davranışsal sinyaller), sahte gönüllü doğrulaması, stok hareketlerinde çift onay.
- **Veri saklama süresi:** Afet fazı bittiğinde kişisel verinin otomatik silinmesi/anonimleştirilmesi.

---

## 9. Standartlara yaslanma

Tekerleği yeniden icat etmemek ve kurumlarla veri alışverişi yapabilmek için mevcut insani yardım standartları temel alınır:

- **HXL (Humanitarian Exchange Language):** Veri sütunlarının standart etiketlenmesi → dış araçlarla doğrudan uyum.
- **Sphere Standartları:** Kişi başına düşen su, barınma alanı, gıda gibi minimum eşikler → ihtiyaç türetme katsayılarının kaynağı.
- **OCHA 3W/4W (Who does What Where, When):** Kurum faaliyet kaydının standart şeması → çakışma ve boşluk analizi.

---

## 10. Yol haritası

### V0 — Hackathon demosu (uçtan uca tek dikey hat)

Hedef: **Yarım kalmış on ekran yerine, sonuna kadar çalışan tek bir zincir.**

- [ ] Bina hasar kaydı (mobil form, çevrimdışı çalışır)
- [ ] Hasardan otomatik ihtiyaç türetme (Sphere tabanlı katsayılar)
- [ ] Talep havuzu + otomatik dedup önerisi + doğrulayıcı onayı
- [ ] Açıklanabilir öncelik skoru ve sıralı kuyruk
- [ ] Basit depo/stok kaydı ve stokla eşleştirme
- [ ] Sevkiyat oluşturma + durum takibi
- [ ] QR/foto ile teslim kanıtı → **talebin kapanması**
- [ ] Harita görünümü (talep yoğunluğu + depo + aktif sevkiyat)
- [ ] 6 Şubat senaryosuna dayalı sentetik veri seti (Antakya/Kahramanmaraş, mahalle bazlı)

### V1 — Sahada kullanılabilir sürüm

- [ ] SMS/WhatsApp ile sıfır kurulumlu veri girişi
- [ ] Kapasite haritası (çadır kent doluluk, sıcak yemek, hijyen, mobil sağlık, jeneratör)
- [ ] Depo yönetimi derinleşmesi: tasnif, soğuk zincir, son kullanma uyarısı
- [ ] Konvoy/araç takibi, rota ve ETA
- [ ] Gönüllü kaydı ve beceri eşleştirme (doktor, kepçe operatörü, işaret dili tercümanı, psikolog)
- [ ] 3W paneli ve kurum veri ihracı (HXL uyumlu CSV + REST API)
- [ ] Bağış şeffaflık izi: bağış → sevkiyat → teslim

### V2 — Ölçek ve zenginleştirme

- [ ] Vatandaş bildirimi kanalı + doğrulama iş akışı
- [ ] Uydu/hava görüntüsünden otomatik hasar sınıflandırma (saha kaydını doğrulayıcı ikinci kaynak)
- [ ] Talep tahmini: geçmiş örüntüden 24–72 saatlik ihtiyaç öngörüsü
- [ ] Çok dilli arayüz (TR, AR, KU, EN)
- [ ] Kurum entegrasyonları (AFAD/belediye sistemleri)
- [ ] Tatbikat/eğitim modu — afet öncesi hazırlık için

---

## 11. Teknik yaklaşım (öneri, tartışmaya açık)

| Katman | Öneri | Gerekçe |
|---|---|---|
| Web/PWA | Next.js + TypeScript | Tek kod tabanı, service worker ile offline, hızlı geliştirme |
| Veri | PostgreSQL + PostGIS | Coğrafi sorgular (yakınlık kümeleme, mesafe) doğrudan veritabanında |
| Yerel depolama | IndexedDB + senkron kuyruğu | Şebekesiz çalışma zorunluluğu |
| Harita | MapLibre + OpenStreetMap | Lisans kısıtı yok, çevrimdışı tile desteği mümkün |
| API | REST + HXL uyumlu CSV ihracı | Kurum entegrasyonu için en düşük sürtünmeli yol |
| Kimlik | Telefon + OTP, rol bazlı yetki | Sahada e-posta yok, telefon var |

**Not:** Ölçek beklentisi yüksek okuma / düşük yazma değil, tam tersi — afet anında yoğun yazma ve senkron trafiği olur. Kuyruk tabanlı yazma ve idempotent senkron uçları baştan tasarlanmalı.

---

## 12. Riskler ve dürüst değerlendirme

| Risk | Etkisi | Azaltma |
|---|---|---|
| **Benimsenme** — kurumlar kendi sistemini kullanır | Yüksek | Sıfır kurulum, açık API, "yerine geçmeyen tamamlayıcı katman" konumlandırması |
| **Veri kalitesi** — hatalı saha kaydı | Yüksek | Doğrulama katmanı, çift kaynak, güven skoru |
| **Gerçek veri yokluğu** (geliştirme aşamasında) | Orta | Sentetik ama gerçekçi senaryo veri seti |
| **Kişisel veri sorumluluğu** | Yüksek | Katmanlı erişim, konum bulanıklaştırma, saklama süresi sınırı |
| **Kapsam şişmesi** | Yüksek | V0'da tek dikey hat disiplininden taviz verilmez |
| **Afet anında ölçek** | Orta | Kuyruk tabanlı yazma, idempotent senkron, kademeli bozulma (graceful degradation) |

---

## 13. Demo senaryosu

Uçtan uca anlatılacak hikâye:

1. Saha gönüllüsü Antakya'da bir binayı **ağır hasarlı** olarak kaydeder. Telefonda şebeke yoktur — kayıt cihazda kalır.
2. Gönüllü şebekeli bölgeye gelir, kayıt senkronlanır.
3. Sistem hane sayısından **38 kişi barınmasız** sonucunu türetir ve çadır, battaniye, sıcak yemek taleplerini otomatik açar.
4. Aynı mahalleden gelen 7 ayrı bildirimin bu talebin kopyası olduğu tespit edilir ve tek kümede birleştirilir.
5. Doğrulayıcı kümeyi teyit eder.
6. Öncelik skoru hesaplanır: **94 — 3 bebekli hane, 26 saattir karşılanmamış, bölgeye bugün sevkiyat yok.**
7. Koordinatör 12 km'deki depoda stoğu görür ve sevkiyat oluşturur.
8. Sürücü teslim eder, QR okutur, fotoğraf yükler.
9. **Talep kapanır** ve haritadan düşer — bir daha kimse aynı yere ikinci tır göndermez.

Son adım demonun can alıcı noktasıdır: 2023'te en çok eksik olan şey buydu.

---

## 14. Açık sorular

- İhtiyaç türetme katsayıları hangi kaynaktan sabitlenecek? (Sphere + AFAD kılavuzları karşılaştırması gerekiyor)
- Doğrulayıcı rolü kim olacak — merkezî bir ekip mi, mahalle bazlı yerel gönüllü mü?
- Kamu paneli hangi ayrıntı düzeyine kadar açık olmalı? Şeffaflık ile kötüye kullanım riski arasındaki denge.
- Kurum entegrasyonu için hangi kurumla temas kurulabilir? (Gerçek bir muhatap, projeyi demoluk olmaktan çıkarır)
- Çakışma çözümünde hangi alanlar otomatik birleştirilebilir, hangileri mutlaka insana sorulmalı?

---

## Katkı

Bu doküman tartışmaya açıktır. Her başlık ekip içinde ayrıca ele alınabilir; özellikle **Bölüm 6 (önceliklendirme)** ve **Bölüm 8 (mahremiyet)** üzerinde uzlaşmadan kod yazmaya başlamamak daha sağlıklı olur — bu iki başlık sonradan değiştirilmesi en pahalı olan kararları içeriyor.
