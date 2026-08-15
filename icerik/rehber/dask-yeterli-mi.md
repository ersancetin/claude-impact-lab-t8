{
  "id": "dask-yeterli-mi",
  "kategori": "konut-sigorta",
  "sira": 6,
  "baslik": "DASK'ım yeterli mi? Sigorta bedeli, azami teminat ve eksik sigorta tuzağı",
  "seoBaslik": "DASK Yeterli mi? Sigorta Bedeli ve Azami Teminat",
  "ozet": "DASK'ın ödeyeceği tutar konutunuzun piyasa değeri değildir. Bedel metrekareyle hesaplanır, azami teminatla sınırlıdır ve muafiyet düşülür.",
  "seoAciklama": "DASK ne kadar öder? Sigorta bedeli metrekare üzerinden hesaplanır, azami teminatla sınırlıdır. Eksik sigorta tuzağı ve teminat açığının nasıl kapatılacağı.",
  "nitelik": "kalici",
  "dogrulama": "coklu",
  "guncelleme": "2026-08-15",
  "dayanaklar": [
    {
      "ad": "Zorunlu Deprem Sigortası Tarife ve Talimat Tebliği",
      "aciklama": "Metrekare bedelleri ve azami teminat"
    },
    {
      "ad": "Zorunlu Deprem Sigortası Genel Şartları",
      "aciklama": "Muafiyet ve teminat kapsamı"
    },
    {
      "ad": "6102 sayılı Türk Ticaret Kanunu",
      "aciklama": "Eksik sigorta ve oransal ödeme"
    }
  ],
  "sss": [
    {
      "soru": "DASK'ın ödeyeceği tutar nasıl hesaplanır?",
      "cevap": "Sigorta bedeli, yapı tarzına göre belirlenen metrekare birim bedelinin binanın brüt yüzölçümüyle çarpılmasıyla bulunur. Bulunan tutar azami teminatı aşarsa ödeme azami teminatla sınırlıdır; ayrıca yüzde iki muafiyet düşülür."
    },
    {
      "soru": "DASK azami teminat tutarı ne kadar?",
      "cevap": "Azami teminat tutarı sabit değildir; tarife dönemlerinde güncellenir. 01.05.2026 tarifesine göre bir mesken için azami teminat 2.271.283 TL olarak belirtilmiştir. Güncel değeri her zaman resmî tarifeden teyit edin."
    },
    {
      "soru": "Eksik sigorta ne demek?",
      "cevap": "Sigorta bedelinin, malın gerçek değerinden düşük belirlenmesidir. Bu durumda sigortacı, sigorta bedelinin gerçek değere oranı ölçüsünde orantılı ödeme yapar; hasarın tamamını ödemez."
    },
    {
      "soru": "DASK'ın üstünü hangi poliçe kapatır?",
      "cevap": "Deprem ek teminatlı ihtiyari konut sigortası. Önce DASK limitine kadar öder, limiti aşan kısım konut paket poliçesinin deprem teminatından karşılanır."
    }
  ],
  "arac": [
    {
      "id": "teminat",
      "ad": "Teminat açığı hesabı",
      "ozet": "Binanızın bedelini, muafiyeti ve açıkta kalan tutarı hesaplayın."
    },
    {
      "id": "haklarim",
      "ad": "Hak tarama",
      "ozet": "Profilinize göre hangi haklara sahipsiniz?."
    }
  ],
  "ilgili": [
    "dask-neyi-karsilar",
    "dask-hasar-ihbari",
    "daskim-yoksa-ne-olur",
    "eksper-raporuna-itiraz"
  ],
  "anahtar": [
    "DASK ne kadar öder",
    "DASK azami teminat",
    "sigorta bedeli hesaplama",
    "eksik sigorta",
    "DASK yeterli mi",
    "konut sigortası deprem teminatı"
  ]
}
---
"DASK'ım var" cümlesi, çoğu insan için "evim sigortalı" anlamına geliyor. Oysa DASK'ın ödeyeceği tutarın konutunuzun piyasa değeriyle ilgisi yoktur. Ödeme üç filtreden geçer: **sigorta bedeli**, **azami teminat** ve **muafiyet**.

## 1. Sigorta bedeli: metrekare × birim bedel

Sigorta bedeli, yapı tarzına göre belirlenen metrekare birim bedelinin binanın brüt yüzölçümüyle çarpılmasıyla bulunur.

:tablo Yapı tarzına göre metrekare birim bedelleri
| Yapı tarzı | m² bedeli (01.05.2026) |
|---|--:|
| Çelik, betonarme karkas | {{dask.m2.betonarme}} |
| Diğer yapılar | {{dask.m2.diger}} |

**Örnek:** 100 m² betonarme konut → 100 × {{dask.m2.betonarme}} = **{{dask.ornek100m2}}** sigorta bedeli ({{dask.m2.tarih}} tarifesi).

Aynı konutun piyasa değeri 4 milyon TL olabilir. DASK bu farkı kapatmaz; zaten amacı da bu değildir — DASK, yapıyı yeniden üretme maliyetine dayalı bir sistemdir.

## 2. Azami teminat: üst sınır

Sigorta bedeli ne çıkarsa çıksın, bir mesken için ödenecek tutar **azami teminat** ile sınırlıdır. {{dask.azamiTeminatTarih}} tarifesine göre bu tutar {{dask.azamiTeminat}} olarak belirtilmektedir.

:::uyari Tarih damgası
Azami teminat tutarı 2026'da **yıl içinde birden fazla kez** güncellenmiştir: 2024'te 1.272.000 TL, 2025'te 1.704.162 TL, 2026 başında 2.095.462 TL, 01.05.2026'da 2.271.283 TL. Bu yüzden hiçbir içerik sayfasına sabit rakam yazılmamalı; hesaplama, tarih damgalı bir tarifeden yapılmalıdır. [Sigorta açığı aracı](../arac/teminat.html) hangi tarihli tarifeyle hesap yaptığını size gösterir.
:::

## 3. Muafiyet: %2 tenzili muafiyet

Her hasarda sigorta bedelinin **%2'si oranında tenzili muafiyet** uygulanır; DASK muafiyeti aşan kısımdan sorumludur. {{dask.ornek100m2}} bedelli bir konutta bu, {{dask.ornek100m2Muafiyet}} demektir. Bu tutarın altındaki hasarlar için ödeme yapılmaz.

Muafiyet uygulaması bakımından her 72 saatlik dönem tek hasar sayılır — bu kural sigortalının lehinedir. [Ayrıntısı burada](dask-hasar-ihbari.html).

## Sonuç: teminat açığı

Üç filtreden sonra ortaya çıkan tabloya **teminat açığı** diyoruz: konutunuzun gerçek değeri ile sigortanın ödeyeceği tutar arasındaki fark, artı DASK'ın hiç ödemediği kalemler.

:tablo Örnek teminat açığı hesabı
| Kalem | Tutar |
|---|--:|
| Konutun varsayılan değeri | 4.000.000 TL |
| DASK sigorta bedeli (100 m² betonarme) | {{dask.ornek100m2}} |
| Muafiyet ({{dask.muafiyetOrani}}) | −{{dask.ornek100m2Muafiyet}} |
| **Açıkta kalan** | **2.928.600 TL** |
| Ayrıca kapsam dışı: eşya, enkaz, kira, bedeni zarar | — |

## Eksik sigorta tuzağı

İhtiyari konut sigortası yaptıranların en sık düştüğü tuzak budur. Sigorta bedeli, malın gerçek değerinden düşük belirlenmişse **eksik sigorta** söz konusu olur ve sigortacı, sigorta bedelinin gerçek değere oranı ölçüsünde **orantılı** ödeme yapar.

:::tehlike Somut örnek
Gerçek değeri 4.000.000 TL olan konutu 2.000.000 TL üzerinden sigortalatan kişi, 1.000.000 TL'lik hasarda tam ödeme değil, oran gereği **500.000 TL** tazminat alır. Poliçesi olduğu için kendini güvende sanan kişi, hasarın yarısını üstlenmiş olur.
:::

Prim düşürmek için bedeli düşük göstermek, hasar anında en pahalı karara dönüşür.

## Açığı kapatmanın yolları

1. **Deprem ek teminatlı konut sigortası.** DASK limitini aşan bina hasarını, eşyayı, enkaz kaldırmayı ve alternatif konaklamayı poliçeye göre karşılar.
2. **Poliçedeki metrekare ve yapı tarzını düzeltin.** Yanlış metrekare doğrudan eksik bedel demektir.
3. **Ferdi kaza poliçenizde deprem teminatını kontrol edin.** Aksi kararlaştırılmadıkça deprem teminat dışıdır.
4. **Kiracıysanız kendi eşyanızı sigortalayın.** DASK yaptıramazsınız ama eşya sigortası yaptırabilirsiniz.

## Poliçenizi okurken bakılacak beş şey

- Brüt yüzölçümü doğru mu?
- Yapı tarzı (çelik/betonarme karkas veya diğer) doğru mu?
- Sigorta bedeli ve azami teminat kaç TL yazıyor?
- Poliçe hangi tarihe kadar geçerli? Yenileme yapılmadıysa teminat yoktur.
- Bina, genel şartlardaki kapsam dışı hâllerden birine giriyor mu (tamamı ticari kullanım, taşıyıcı sistem tadilatı, metruk yapı)?

Poliçeniz hiç yoksa, asıl kayıp cezai yaptırım değildir: [DASK'ı olmayan devlet konut yardımından da yararlanamaz.](daskim-yoksa-ne-olur.html)

## En sık yapılan hata: yanlış metrekare

Sigorta bedeli **brüt yüzölçümü** üzerinden hesaplanır. Poliçede net alan yazılmışsa veya balkon, ortak alan payı gibi kalemler eksik hesaplanmışsa, sigorta bedeliniz gerçekte olması gerekenden düşük çıkar ve hasar anında ödeme de düşük olur.

- Tapu ve proje bilgilerinizle poliçedeki metrekareyi karşılaştırın.
- Yapı tarzı alanının doğru olduğundan emin olun: betonarme bir binada "diğer" seçilmişse bedel yaklaşık üçte bir oranında düşük hesaplanır.
- Hata varsa poliçeyi düzenleyen şirkete başvurup **zeyilname** ile düzeltilmesini isteyin.

## DASK ne zaman "yeterli" sayılır?

DASK'ın amacı konutunuzun piyasa değerini korumak değil, yapının yeniden üretilmesine katkı sağlamaktır. Bu çerçevede DASK şu üç koşulda görece yeterlidir:

1. Binanın metrekaresi küçük ve sigorta bedeli, gerçek yapım maliyetine yakınsa,
2. Eşya, barınma ve bedeni zarar riskleri **ayrı poliçelerle** karşılanıyorsa,
3. Muafiyet tutarını kendi bütçenizden karşılayabilecek durumdaysanız.

Üçü de sağlanmıyorsa, DASK tek başına bir koruma planı değil, planın yalnızca ilk katmanıdır.
