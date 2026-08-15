{
  "id": "mahremiyet",
  "ad": "Mahremiyet",
  "sira": 3,
  "baslik": "Verileriniz cihazınızdan çıkmıyor",
  "ozet": "Sunucu yok, hesap yok, analitik yok, çerez yok, dış istek yok. Bu bir politika tercihi değil, mimari bir karardır.",
  "anahtar": [
    "mahremiyet",
    "veri",
    "kişisel veri",
    "kvkk",
    "çerez",
    "analitik",
    "saklanıyor mu",
    "gizlilik",
    "sunucu"
  ]
}
---
## Mimari karar

Bu platform **statik dosyalardan** oluşur. Arka planda çalışan bir uygulama sunucusu
veya veritabanı yoktur. Süre takvimine girdiğiniz tarihler, dilekçeye yazdığınız ad,
T.C. kimlik numarası ve adres bilgisi yalnızca tarayıcınızın kendi yerel deposunda
(`localStorage`) tutulur.

Bu, "verilerinizi korumaya söz veriyoruz" demek değildir. Verilerinizi **teknik olarak
alamayacak** şekilde kurulmuş olmak demektir.

| Yaygın uygulama | Bizde |
|---|---|
| Kullanıcı hesabı, e-posta ile giriş | Yok |
| Analitik (Google Analytics vb.) | Yok |
| Çerez | Yok |
| Dış kaynaklı yazı tipi, betik, görsel | Yok — sayfa tek bir dış bağlantı bile açmaz |
| Sunucuya form gönderimi | Yok — dilekçe metni cihazınızda oluşur |
| Reklam ve izleme pikseli | Yok |

## Neden bu kadar katıyız?

2023 depremlerinden sonra enkaz altındaki kişilerin ad, adres ve telefon bilgileri kamuya
açık listelerde dolaştı; bu bilgiler daha sonra dolandırıcılık girişimlerinde kullanıldı.
Afet anında toplanan kişisel veri, olağan zamandakinden **çok daha tehlikelidir**: veriyi
verenler mağdur, veriyi isteyenler ise kalabalıktır ve kimin yetkili olduğu ayırt edilemez.

Bu yüzden hiç toplamıyoruz.

## Cihazınızdaki kaydı silmek

Her araçta **Temizle** düğmesi vardır; bu, o araca ait yerel kaydı siler. Tarayıcınızın
site verilerini temizlemeniz de aynı sonucu verir. Ortak kullanılan bir bilgisayardaysanız
dilekçe hazırladıktan sonra temizlemeniz önerilir.

## KVKK bakımından

Kişisel veri işlenmediği, aktarılmadığı ve saklanmadığı için platform bakımından bir
veri sorumlusu faaliyeti doğmaz. Yerel depoda tutulan veriler üzerinde yalnızca
kullanıcının kendisi hâkimdir.

:::bilgi Barındırma hakkında
Site GitHub Pages üzerinde yayımlanır. Barındırma sağlayıcısı, tüm web sunucuları gibi
teknik erişim kayıtları (IP adresi, tarayıcı bilgisi) tutabilir. Bu kayıtlar platformun
kontrolünde değildir ve platform tarafından okunmaz, işlenmez.
:::
