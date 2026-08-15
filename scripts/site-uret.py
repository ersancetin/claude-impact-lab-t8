#!/usr/bin/env python3
"""Deprem Haklarım — statik site üreteci.

Girdi:
  icerik/site.json          site yapılandırması, gezinme, kategoriler
  icerik/rehber/*.md        bilgi merkezi rehberleri (JSON künye + markdown)
  icerik/kurumsal/*.md      kurumsal sayfalar
  kaynak/modul/*.html       etkileşimli araç sayfaları (JSON künye + HTML gövde)

Çıktı:
  docs/                     yayına hazır statik site + sitemap.xml + robots.txt

Bağımlılık yoktur; yalnızca standart kütüphane kullanılır.
    python3 scripts/site-uret.py
"""
import html
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import gorseller                              # noqa: E402  (SVG şema kütüphanesi)
from sekiller import SEKILLER                 # noqa: E402  (slug → şema tanımı)
from site_markdown import isle, kimlik        # noqa: E402

KOK = Path(__file__).resolve().parent.parent
ICERIK = KOK / "icerik"
KAYNAK = KOK / "kaynak"
VERI = KOK / "data"
CIKTI = KOK / "docs"

# Açılış fotoğrafları: uzaktan bağlanmaz, indirilir (bkz. scripts/foto-indir.py).
# Künye dosyası üretilir ama depoda durur; fotoğrafı olmayan rehber de olabilir.
GORSEL_DIZIN = CIKTI / "assets" / "gorsel"
KUNYE_DOSYA = Path(__file__).resolve().parent / "foto-kunye.json"
FOTOGRAFLAR = (json.loads(KUNYE_DOSYA.read_text(encoding="utf-8"))
               if KUNYE_DOSYA.exists() else {})

NITELIK = {
    "kalici": ("kalici", "Kalıcı mevzuat"),
    "emsal": ("emsal", "Geçmiş uygulama"),
}
DOGRULAMA = {
    "resmi": ("iyi", "resmî kaynak"),
    "coklu": ("notr", "çoklu kaynak"),
    "tek": ("dogrulanmamis", "doğrulanmadı"),
}


# ---------------------------------------------------------------- yardımcı
def kunye_oku(yol: Path):
    """JSON künye + gövde ayrıştırır. Ayraç: tek başına '---' satırı."""
    ham = yol.read_text(encoding="utf-8")
    if not ham.lstrip().startswith("{"):
        raise SystemExit(f"{yol}: dosya JSON künye ile başlamalı")
    parcalar = re.split(r"^---\s*$", ham, maxsplit=1, flags=re.M)
    if len(parcalar) != 2:
        raise SystemExit(f"{yol}: künye ile gövdeyi ayıran '---' satırı yok")
    try:
        kunye = json.loads(parcalar[0])
    except json.JSONDecodeError as e:
        raise SystemExit(f"{yol}: künye JSON hatası — {e}")
    return kunye, parcalar[1].strip()


def kacir(m):
    return html.escape(str(m), quote=True)


def para(n):
    """1071400 → '1.071.400 TL' (binlik ayracı nokta)."""
    return f"{n:,.0f}".replace(",", ".") + " TL"


def tarih_yaz(iso):
    """'2026-05-01' → '01.05.2026'"""
    y, a, g = iso.split("-")
    return f"{g}.{a}.{y}"


def parametre_sozlugu():
    """Metne gömülmeyen parasal değerler — kanonik kaynak parametreler.json.

    Rehber metinleri `{{dask.azamiTeminat}}` gibi yer tutucular yazar; değer
    üretim anında buradan gelir. Tek bir sayfaya sabit rakam yazmak, DASK
    azami teminatı aylık güncellendiği için o sayfayı bir ay içinde yanlış
    hâle getirirdi.
    """
    p = json.loads((VERI / "parametreler.json").read_text(encoding="utf-8"))
    d, t, g = p["dask"], p["sigortaTahkim"], p["gecmisUygulamalar"]
    m2 = d["metrekareBirimBedeli"]
    ornek_bedel = 100 * m2["yapiTarzi"]["celik_betonarme_karkas"]
    oran = d["muafiyetOrani"]["deger"]
    return {
        "dask.azamiTeminat": para(d["azamiTeminat"]["gecerliDeger"]),
        "dask.azamiTeminatTarih": tarih_yaz(d["azamiTeminat"]["gecerlilikTarihi"]),
        "dask.m2.betonarme": para(m2["yapiTarzi"]["celik_betonarme_karkas"]),
        "dask.m2.diger": para(m2["yapiTarzi"]["diger"]),
        "dask.m2.tarih": tarih_yaz(m2["gecerlilikTarihi"]),
        "dask.muafiyetOrani": f"%{oran * 100:g}",
        "dask.ornek100m2": para(ornek_bedel),
        "dask.ornek100m2Muafiyet": para(round(ornek_bedel * oran)),
        "dask.hasarPenceresiSaat": str(d["hasarBirlestirmePenceresi"]["saat"]),
        "tahkim.kesinlikSiniri": para(t["kesinlikSiniri"]["deger"]),
        "tahkim.itirazSiniri": para(t["itirazSiniri"]["deger"]),
        "tahkim.heyetSiniri": para(t["ucKisilikHeyetSiniri"]["deger"]),
        "tahkim.temyizSiniri": para(t["temyizSiniri"]["deger"]),
        "tahkim.tarih": tarih_yaz(t["gecerlilikTarihi"]),
        "parametre.surum": p["surum"],
        "parametre.tarih": tarih_yaz(p["guncellemeTarihi"]),
        # Afet konutu borçlandırma — 7269 sayılı Kanun
        "konut.asgariYil": str(p["afetKonutuBorclandirma"]["geriOdemeAsgariYil"]),
        "konut.azamiYil": str(p["afetKonutuBorclandirma"]["geriOdemeAzamiYil"]),
        "konut.ilkTaksitYil": str(p["afetKonutuBorclandirma"]["ilkTaksitGecikmeYil"]),
        # Geçmiş uygulamalar: KALICI HAK DEĞİLDİR — metinde daima "emsal"
        # olarak sunulur. Tutarlar burada durur ki bir sayfaya "hakkınız"
        # gibi yazılmasın.
        "emsal.kiraEvSahibi": para(g["afad2023"]["kiraYardimiEvSahibi"]["aylik"]),
        "emsal.kiraKiraci": para(g["afad2023"]["kiraYardimiKiraci"]["aylik"]),
        "emsal.kiraAy": str(g["afad2023"]["kiraYardimiEvSahibi"]["ay"]),
        "emsal.tasinma": para(g["afad2023"]["tasinmaYardimi"]["deger"]),
        "emsal.kosgebKredi": para(g["kosgeb2023"]["acilDestekKredisi"]["azami"]),
        "emsal.kosgebKonteyner": para(g["kosgeb2023"]["konteynerDestegi"]["azami"]),
        "emsal.kosgebOnarim": para(g["kosgeb2023"]["onarimPersonelDestegi"]["deger"]),
        "emsal.kosgebGirisim": para(g["kosgeb2023"]["girisimcilikDestegi"]["azami"]),
        "emsal.krediErtelemeAy": str(g["bddk2023"]["kreditErtelemeAyAzami"]),
        "emsal.mucbirBitis": tarih_yaz(g["mucbirSebep2023"]["bitis"]),
        "emsal.mucbirIlSayisi": str(len(g["mucbirSebep2023"]["iller"])),
    }


def parametreleri_yerlestir(metin, sozluk, nereden):
    def degistir(m):
        anahtar = m.group(1).strip()
        if anahtar not in sozluk:
            raise SystemExit(f"{nereden}: tanımsız parametre {{{{{anahtar}}}}}")
        return sozluk[anahtar]

    return re.sub(r"\{\{([^}]+)\}\}", degistir, metin)


def sayi_yaz(n):
    """Metin içinde geçen küçük sayılar yazıyla yazılır ('dokuz konu başlığı').
    Kategori eklendiğinde cümlenin yanlış kalmaması için üretilir."""
    adlar = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi",
             "sekiz", "dokuz", "on", "on bir", "on iki"]
    return adlar[n] if n < len(adlar) else str(n)


def kisalt(metin, sinir=96):
    """Menü ve künye özetlerini cümle bütünlüğünü bozmadan kısaltır."""
    metin = (metin or "").strip()
    if len(metin) <= sinir:
        return metin
    kesme = metin[:sinir].rsplit(" ", 1)[0]
    return kesme.rstrip(" ,.;:") + "…"


# ---------------------------------------------------------------- şablon
class Site:
    def __init__(self, yap):
        self.y = yap
        self.kategoriler = {k["id"]: k for k in yap["kategoriler"]}
        self.rehberler = []
        self.sayfalar = []      # sitemap kayıtları: (url, oncelik, tarih)

    # kök göreli önek
    @staticmethod
    def onek(derinlik):
        return "../" * derinlik

    # ---- Mega gezinme ------------------------------------------------
    # Üst menüde "neyin nerede olduğu" görünür olmalı: araçlar işlevine
    # göre gruplanır, konular üç sütuna serilir. Açılış saf CSS
    # (:hover + :focus-within) — klavyeyle de açılır, JS gerekmez.

    def arac_gruplari(self):
        """Araçları künyedeki 'grup' alanına göre, sırayı bozmadan kümeler."""
        gruplar = {}
        for m in MODULLER:
            gruplar.setdefault(m.get("grup", "Araçlar"), []).append(m)
        return gruplar

    def mega_arac(self, p):
        sutun = []
        for grup, ler in self.arac_gruplari().items():
            oge = "".join(
                f'<li><a href="{p}arac/{m["id"]}.html">'
                f'<b>{kacir(m["ad"])}</b><span>{kacir(kisalt(m["ozet"]))}</span></a></li>'
                for m in ler)
            sutun.append(f'<div><h3>{kacir(grup)}</h3><ul>{oge}</ul></div>')
        return f"""<div class="mega">
  <div class="mega-izgara uc">{"".join(sutun)}</div>
  <div class="mega-alt">
    <a href="{p}arac/index.html">Tüm araçlar →</a>
    <span>Hepsi cihazınızda çalışır; hiçbir bilgi gönderilmez.</span>
  </div>
</div>"""

    def mega_bilgi(self, p):
        katlar = self.y["kategoriler"]
        boy = -(-len(katlar) // 3)          # üç sütuna böl, yukarı yuvarla
        sutun = []
        for i in range(0, len(katlar), boy):
            oge = "".join(
                f'<li><a href="{p}bilgi/{k["id"]}.html">'
                f'<b>{kacir(k["ad"])}</b><span>{kacir(kisalt(k["ozet"]))}</span></a></li>'
                for k in katlar[i:i + boy])
            sutun.append(f"<div><ul>{oge}</ul></div>")
        return f"""<div class="mega">
  <div class="mega-izgara uc">{"".join(sutun)}</div>
  <div class="mega-alt">
    <a href="{p}bilgi/index.html">Bilgi Merkezi ana sayfası →</a>
    <span>Her rehber kalıcı mevzuat mı, geçmiş uygulama mı — etiketlidir.</span>
  </div>
</div>"""

    def mega_kurumsal(self, p):
        oge = "".join(
            f'<li><a href="{p}kurumsal/{s["id"]}.html">'
            f'<b>{kacir(s["ad"])}</b><span>{kacir(kisalt(s.get("ozet", ""), 78))}</span></a></li>'
            for s in KURUMSAL)
        return f'<div class="mega sag"><div class="mega-izgara iki">' \
               f'<div><ul>{oge}</ul></div>' \
               f'<div><h3>Taahhüdümüz</h3><ul>' \
               f'<li><a href="{p}kurumsal/mahremiyet.html">' \
               f'<b>Veri toplamıyoruz</b><span>Sunucu yok, analitik yok, çerez yok. ' \
               f'Girdiğiniz hiçbir bilgi cihazınızdan çıkmaz.</span></a></li>' \
               f'</ul></div></div></div>'

    def gezinme_html(self, derinlik, aktif):
        p = self.onek(derinlik)
        paneller = {
            "arac": ("Araçlar", f"{p}arac/index.html", self.mega_arac(p)),
            "bilgi": ("Bilgi Merkezi", f"{p}bilgi/index.html", self.mega_bilgi(p)),
            "kurumsal": ("Kurumsal", f"{p}kurumsal/hakkimizda.html", self.mega_kurumsal(p)),
        }
        ogeler = []
        for anahtar in ("arac", "bilgi", "kurumsal"):
            ad, url, mega = paneller[anahtar]
            im = ' aria-current="page"' if anahtar == aktif else ""
            ogeler.append(
                f'<div class="oge"><a class="bas" href="{url}"{im}>{kacir(ad)}</a>{mega}</div>')
        return "".join(ogeler)

    def mobil_gezinme(self, derinlik):
        p = self.onek(derinlik)
        bag = [f'<a href="{p}index.html">Ana sayfa</a>']
        for grup, ler in self.arac_gruplari().items():
            bag.append(f'<span class="etiket">{kacir(grup)}</span>')
            for m in ler:
                bag.append(f'<a href="{p}arac/{m["id"]}.html">{kacir(m["ad"])}</a>')
        bag.append('<span class="etiket">Bilgi Merkezi</span>')
        bag.append(f'<a href="{p}bilgi/index.html">Tüm konular</a>')
        for k in self.y["kategoriler"]:
            bag.append(f'<a href="{p}bilgi/{k["id"]}.html">{kacir(k["ad"])}</a>')
        bag.append('<span class="etiket">Kurumsal</span>')
        for s in KURUMSAL:
            bag.append(f'<a href="{p}kurumsal/{s["id"]}.html">{kacir(s["ad"])}</a>')
        return "".join(bag)

    def ust_html(self, derinlik, aktif):
        p = self.onek(derinlik)
        return f"""<div class="kurum-serit">
  <div class="kap-genis">
    <b>{kacir(self.y["kurumAdi"])}</b>
    <span>{kacir(self.y["slogan"])}</span>
    <span class="bosluk"></span>
    <button class="tema-dugme" type="button">Koyu tema</button>
  </div>
</div>
<header class="ust">
  <div class="ust-ic">
    <a class="marka" href="{p}index.html">
      <span class="marka-isaret" aria-hidden="true">{kacir(self.y["kisaAd"])}</span>
      <span class="marka-ad"><b>{kacir(self.y["ad"])}</b><span>Hak · Süre · Dilekçe</span></span>
    </a>
    <nav class="gezinme" aria-label="Ana gezinme">{self.gezinme_html(derinlik, aktif)}</nav>
    <span class="bosluk"></span>
    <button class="ust-danisma" type="button" data-danisma-ac>Soru sor</button>
    <details class="gezinme-mobil">
      <summary aria-label="Menü">Menü</summary>
      <div class="gezinme-mobil-panel">{self.mobil_gezinme(derinlik)}</div>
    </details>
  </div>
</header>"""

    def kunye_serit(self, derinlik, yol):
        """yol: [(ad, url|None)] — sonuncusu geçerli sayfa."""
        if not yol:
            return "", None
        p = self.onek(derinlik)
        ogeler, ld = [], []
        for i, (ad, url) in enumerate(yol, start=1):
            if url:
                ogeler.append(f'<li><a href="{p}{url}">{kacir(ad)}</a></li>')
                tam = f'{self.y["taban"]}/{url}'
            else:
                ogeler.append(f'<li aria-current="page">{kacir(ad)}</li>')
                tam = None
            oge = {"@type": "ListItem", "position": i, "name": ad}
            if tam:
                oge["item"] = tam
            ld.append(oge)
        serit = f'<nav class="kunye" aria-label="Neredesiniz"><div class="kap-genis"><ol>{"".join(ogeler)}</ol></div></nav>'
        return serit, {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": ld}

    def alt_html(self, derinlik):
        p = self.onek(derinlik)
        arac = "".join(f'<li><a href="{p}arac/{m["id"]}.html">{kacir(m["ad"])}</a></li>' for m in MODULLER)
        konu = "".join(f'<li><a href="{p}bilgi/{k["id"]}.html">{kacir(k["ad"])}</a></li>'
                       for k in self.y["kategoriler"][:6])
        kurum = "".join(f'<li><a href="{p}kurumsal/{s["id"]}.html">{kacir(s["ad"])}</a></li>' for s in KURUMSAL)
        return f"""<footer class="alt">
  <div class="kap-genis">
    <div class="alt-sutunlar">
      <div class="alt-marka">
        <b>{kacir(self.y["ad"])}</b>
        <p>{kacir(self.y["aciklama"])}</p>
        <p>Sunucu yok, analitik yok, çerez yok. Girdiğiniz hiçbir bilgi cihazınızdan çıkmaz.</p>
      </div>
      <div><h2>Araçlar</h2><ul>{arac}</ul></div>
      <div><h2>Bilgi Merkezi</h2><ul>{konu}<li><a href="{p}bilgi/index.html">Tüm konular</a></li></ul></div>
      <div><h2>Kurumsal</h2><ul>{kurum}</ul></div>
    </div>
    <div class="alt-yasal">
      <p><strong>Bu platform hukuki tavsiye vermez.</strong> Buradaki bilgiler genel bilgilendirme
      amaçlıdır, avukatlık hizmetinin yerine geçmez. Somut durumunuz için bir avukata veya
      bulunduğunuz ilin barosunun <strong>adli yardım</strong> birimine başvurun.</p>
      <p>Bilgilerin resmî kaynaklardan doğrulanması sürmektedir; her sayfa kendi doğrulama
      durumunu gösterir. Kâr amacı gütmeyen açık kaynak çalışma · {kacir(self.y["ekip"])}</p>
    </div>
  </div>
</footer>"""

    def sayfa(self, *, yol_dosya, derinlik, baslik, aciklama, govde, aktif=None,
              kunye=None, ld=None, sinif="", oncelik="0.6", tarih=None,
              robots=None, gorsel=None, tur="website"):
        p = self.onek(derinlik)
        # ES modülü tanımlayıcısı "/" ya da "./" ile başlamak ZORUNDA.
        # Kökteki sayfada önek boş olduğu için düz "assets/app.js"
        # üretiliyordu ve tarayıcı modülü hiç yüklemiyordu (tema düğmesi
        # ana sayfada bu yüzden çalışmıyordu). Göreli bağlar için p,
        # modül yolları için p_mod kullanılır.
        p_mod = p or "./"
        # index sayfalarının adresi dizin biçimindedir; canonical, og:url ve
        # site haritası aynı adresi göstermek ZORUNDA (yoksa çift kayıt olur).
        url = yol_dosya.removesuffix("index.html")
        kanonik = f'{self.y["taban"]}/{url}'
        serit, kunye_ld = self.kunye_serit(derinlik, kunye or [])
        blok = list(ld or [])
        if kunye_ld:
            blok.append(kunye_ld)
        ld_html = "".join(
            f'<script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>'
            for b in blok)
        # Site adı yalnızca sığıyorsa eklenir: arama sonucunda 60 karakteri
        # aşan başlık kesilir ve kesilen yer çoğu zaman asıl bilgidir.
        tam_baslik = baslik
        if baslik != self.y["ad"] and not baslik.startswith(self.y["ad"]):
            adayi = f'{baslik} · {self.y["ad"]}'
            tam_baslik = adayi if len(adayi) <= 60 else baslik
        robots_etiket = (f'<meta name="robots" content="{robots}">\n' if robots else
                         '<meta name="robots" content="index,follow,'
                         'max-image-preview:large,max-snippet:-1">\n')

        # Paylaşım görseli: rehberin kendi açılış fotoğrafı varsa o, yoksa
        # sitenin kurumsal og.png'i. Adres mutlak olmak ZORUNDA — paylaşım
        # önizlemeleri göreli yolu çözemez.
        if gorsel:
            g_url = f'{self.y["taban"]}/{gorsel["yol"]}'
            g_en, g_boy, g_alt = gorsel["genislik"], gorsel["yukseklik"], gorsel["alt"]
            kart_tur = "summary_large_image"
        else:
            g_url = f'{self.y["taban"]}/assets/og.png'
            g_en, g_boy, g_alt = 1200, 630, self.y["ad"]
            kart_tur = "summary_large_image"
        gorsel_etiket = (
            f'<meta property="og:image" content="{g_url}">\n'
            f'<meta property="og:image:width" content="{g_en}">\n'
            f'<meta property="og:image:height" content="{g_boy}">\n'
            f'<meta property="og:image:alt" content="{kacir(g_alt)}">\n'
            f'<meta name="twitter:image" content="{g_url}">\n'
            f'<meta name="twitter:image:alt" content="{kacir(g_alt)}">')

        icerik = f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{kacir(tam_baslik)}</title>
<meta name="description" content="{kacir(aciklama)}">
{robots_etiket}<link rel="canonical" href="{kanonik}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#F4F5F7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0C1015" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="{tur}">
<meta property="og:site_name" content="{kacir(self.y["ad"])}">
<meta property="og:title" content="{kacir(tam_baslik)}">
<meta property="og:description" content="{kacir(aciklama)}">
<meta property="og:url" content="{kanonik}">
<meta property="og:locale" content="tr_TR">
{gorsel_etiket}
<meta name="twitter:card" content="{kart_tur}">
<meta name="twitter:title" content="{kacir(tam_baslik)}">
<meta name="twitter:description" content="{kacir(aciklama)}">
<link rel="icon" href="{p}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="{p}assets/tasarim.css">
{ld_html}
</head>
<body{f' class="{sinif}"' if sinif else ""} data-kok="{p}">
<a class="atla" href="#ana">İçeriğe atla</a>
{self.ust_html(derinlik, aktif)}
{serit}
{govde}
{self.alt_html(derinlik)}
<script type="module">
  import {{ temaBaslat, temaBagla }} from "{p_mod}assets/app.js";
  import {{ danismaBaslat }} from "{p_mod}assets/danisma.js";
  import {{ aiSohbetBaslat }} from "{p_mod}assets/ai-sohbet.js";
  temaBaslat(); temaBagla(); danismaBaslat(); aiSohbetBaslat();
</script>
</body>
</html>
"""
        hedef = CIKTI / yol_dosya
        hedef.parent.mkdir(parents=True, exist_ok=True)
        hedef.write_text(icerik, encoding="utf-8")
        self.sayfalar.append((f'{self.y["taban"]}/{url}', oncelik, tarih or date.today().isoformat()))


# ---------------------------------------------------------------- yükleme
def modulleri_yukle():
    ler = []
    for yol in sorted((KAYNAK / "modul").glob("*.html")):
        k, govde = kunye_oku(yol)
        k["govde"] = govde
        ler.append(k)
    return sorted(ler, key=lambda m: m.get("sira", 99))


def kurumsal_yukle():
    ler = []
    for yol in sorted((ICERIK / "kurumsal").glob("*.md")):
        k, govde = kunye_oku(yol)
        k["govde"] = govde
        ler.append(k)
    return sorted(ler, key=lambda s: s.get("sira", 99))


def rehberleri_yukle():
    sozluk = parametre_sozlugu()
    ler = []
    for yol in sorted((ICERIK / "rehber").glob("*.md")):
        k, govde = kunye_oku(yol)
        k["govde"] = parametreleri_yerlestir(govde, sozluk, yol.name)
        for alan in ("ozet", "seoAciklama", "sure"):
            if k.get(alan):
                k[alan] = parametreleri_yerlestir(k[alan], sozluk, yol.name)
        for s in k.get("sss", []):
            s["cevap"] = parametreleri_yerlestir(s["cevap"], sozluk, yol.name)
        ler.append(k)
    kimlikler = [r["id"] for r in ler]
    ikiz = {i for i in kimlikler if kimlikler.count(i) > 1}
    if ikiz:
        raise SystemExit("Aynı kimliği kullanan rehberler: " + ", ".join(sorted(ikiz)))
    return sorted(ler, key=lambda r: (r.get("sira", 99), r["baslik"]))


# ---------------------------------------------------------------- parçalar
def rozet(sinif, metin):
    return f'<span class="rozet {sinif}">{kacir(metin)}</span>'


def nitelik_rozeti(deger):
    sinif, ad = NITELIK.get(deger, NITELIK["kalici"])
    return f'<span class="nitelik {sinif}">{kacir(ad)}</span>'


def dogrulama_rozeti(deger):
    sinif, ad = DOGRULAMA.get(deger, DOGRULAMA["tek"])
    return rozet(sinif, ad)


def modul_kart(m, onek):
    return f"""<a class="modul" href="{onek}arac/{m["id"]}.html">
  <span class="etiket">{kacir(m.get("etiket", "Araç"))}</span>
  <b>{kacir(m["ad"])}</b>
  <span>{kacir(m["ozet"])}</span>
  <span class="git">{kacir(m.get("eylem", "Aracı aç"))} →</span>
</a>"""


def foto_kunyesi(rid):
    """Rehberin açılış fotoğrafını döndürür; dosya diskte yoksa None."""
    foto = FOTOGRAFLAR.get(rid)
    if not foto or not (GORSEL_DIZIN / f"{rid}.jpg").exists():
        return None
    return foto


def rehber_kart(r, onek, kategori_adi=None):
    """Rehber kartı — küçük görselli. Fotoğrafı olmayan rehberde görsel
    alanı boş bırakılmaz: kategori adını taşıyan sade bir kapak konur.
    Kart yüksekliğinin ızgara içinde tutarlı kalması için gereklidir."""
    et = kategori_adi or ""
    et_html = f'<span class="etiket">{kacir(et)}</span>' if et else ""
    foto = foto_kunyesi(r["id"])
    if foto and (GORSEL_DIZIN / "kucuk" / f'{r["id"]}.jpg').exists():
        # alt="" bilinçlidir: fotoğraf dekoratiftir, bilgiyi başlık taşır.
        kapak = (f'<img class="rehber-gorsel" src="{onek}assets/gorsel/kucuk/{r["id"]}.jpg" '
                 f'alt="" width="360" height="188" loading="lazy" decoding="async">')
    else:
        kapak = (f'<span class="rehber-gorsel rehber-kapak" aria-hidden="true">'
                 f'{kacir(et or "Rehber")}</span>')
    return f"""<a class="rehber gorselli" href="{onek}rehber/{r["id"]}.html">
  {kapak}
  <span class="rehber-ic">
    {et_html}
    <b>{kacir(r["baslik"])}</b>
    <span>{kacir(r["ozet"])}</span>
  </span>
</a>"""


# ---------------------------------------------------------------- sayfalar
def bekleyen_baglari_sadelestir(govde_html, mevcut):
    """Henüz yazılmamış rehberlere giden bağları düz metne çevirir.

    İçerik kademeli yazıldığı için, bir rehberin metni henüz üretilmemiş
    bir rehbere atıf yapabilir. Kırık bağlantı yerine bağsız metin bırakırız.
    """
    def degistir(m):
        hedef, metin = m.group(1), m.group(2)
        if hedef.startswith(("http", "../", "#")) or "/" in hedef:
            return m.group(0)
        if hedef.removesuffix(".html") in mevcut:
            return m.group(0)
        return f'<span class="bekleyen">{metin}</span>'

    return re.sub(r'<a href="([^"]+)">([^<]*)</a>', degistir, govde_html)


def rehber_sayfasi(site, r):
    kat = site.kategoriler[r["kategori"]]
    govde_html, basliklar = isle(r["govde"])
    govde_html = bekleyen_baglari_sadelestir(
        govde_html, {x["id"] for x in site.rehberler})
    ic = "".join(f'<li><a href="#{k}">{kacir(t)}</a></li>'
                 for s, k, t in basliklar if s == 2)
    icindekiler = (f'<aside class="icindekiler" aria-label="İçindekiler">'
                   f'<span class="etiket">İçindekiler</span><ol>{ic}</ol></aside>') if ic else ""

    dayanaklar = ""
    if r.get("dayanaklar"):
        satir = "".join(
            f'<tr><td><b>{kacir(d["ad"])}</b></td><td>{kacir(d["aciklama"])}</td></tr>'
            for d in r["dayanaklar"])
        dayanaklar = f"""<h2 id="kanuni-dayanak">Kanuni dayanak</h2>
<div class="tablo-sar"><table>
<caption class="sr">Bu rehberin dayandığı mevzuat</caption>
<thead><tr><th>Mevzuat</th><th>Ne diyor</th></tr></thead>
<tbody>{satir}</tbody></table></div>"""

    sss_html, sss_ld = "", None
    if r.get("sss"):
        ogeler = "".join(
            f'<details><summary>{kacir(s["soru"])}</summary>'
            f'<div class="cevap">{isle(s["cevap"])[0]}</div></details>'
            for s in r["sss"])
        sss_html = f'<h2 id="sik-sorulanlar">Sık sorulanlar</h2><div class="sss">{ogeler}</div>'
        sss_ld = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {"@type": "Question", "name": s["soru"],
                 "acceptedAnswer": {"@type": "Answer", "text": s["cevap"]}}
                for s in r["sss"]],
        }

    arac_html = ""
    if r.get("arac"):
        kartlar = "".join(
            f'<a class="secim" href="../arac/{a["id"]}.html"><b>{kacir(a["ad"])}</b>'
            f'<span>{kacir(a["ozet"])}</span></a>' for a in r["arac"])
        arac_html = f'<h2 id="ilgili-arac">Bu konuyla ilgili araç</h2>{kartlar}'

    ilgili_html = ""
    if r.get("ilgili"):
        kartlar = []
        for rid in r["ilgili"]:
            d = next((x for x in site.rehberler if x["id"] == rid), None)
            if d:
                kartlar.append(rehber_kart(d, "../", site.kategoriler[d["kategori"]]["ad"]))
        if kartlar:
            ilgili_html = (f'<section class="ilgili"><h2 class="mt0">İlgili rehberler</h2>'
                           f'<div class="izgara iki">{"".join(kartlar)}</div></section>')

    # Açılış fotoğrafı — indirilmiş dosyadan; künyesi fotoğrafçıya atıf içerir.
    foto = foto_kunyesi(r["id"])
    foto_html, og_gorsel = "", None
    if foto:
        foto_html = f"""<figure class="foto">
  <img src="../assets/gorsel/{r["id"]}.jpg" alt="{kacir(foto["alt"])}"
       width="{foto["genislik"]}" height="{foto["yukseklik"]}"
       decoding="async" fetchpriority="high">
  <figcaption>Fotoğraf:
    <a href="{kacir(foto["fotografci_adres"])}" rel="nofollow noopener" target="_blank">{kacir(foto["fotografci"])}</a> ·
    <a href="{kacir(foto["sayfa"])}" rel="nofollow noopener" target="_blank">Pexels</a></figcaption>
</figure>"""
        og_gorsel = {"yol": f'assets/gorsel/{r["id"]}.jpg',
                     "genislik": foto["genislik"], "yukseklik": foto["yukseklik"],
                     "alt": foto["alt"]}

    # Süre kartı: hakkın süresi sayfanın en üstünde, gövdeye girmeden görünür.
    sure_html = ""
    if r.get("sure"):
        sure_html = (f'<div class="kart tehlikeli"><span class="etiket">Süre</span>'
                     f'<p style="margin-bottom:0"><strong>{kacir(r["sure"])}</strong></p></div>')

    # Şema: satır içi SVG, tema değişkenlerini miras alır (dış istek yok).
    sekil_html = ""
    sekil = SEKILLER.get(r.get("sekil", r["id"]))
    if sekil:
        sekil_html = (f'<figure class="sekil">{gorseller.ciz(r["id"], sekil)}'
                      f'<figcaption>{kacir(sekil["altyazi"])}</figcaption></figure>')

    makale_ld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": r["baslik"],
        "description": r["ozet"],
        "inLanguage": "tr-TR",
        "datePublished": r.get("yayin", r.get("guncelleme", date.today().isoformat())),
        "dateModified": r.get("guncelleme", date.today().isoformat()),
        "isAccessibleForFree": True,
        "author": {"@type": "Organization", "name": site.y["kurumAdi"]},
        "publisher": {"@type": "Organization", "name": site.y["kurumAdi"]},
        "mainEntityOfPage": f'{site.y["taban"]}/rehber/{r["id"]}.html',
        "about": kat["ad"],
    }
    if foto:
        makale_ld["image"] = {
            "@type": "ImageObject",
            "url": f'{site.y["taban"]}/assets/gorsel/{r["id"]}.jpg',
            "width": foto["genislik"], "height": foto["yukseklik"],
            "caption": foto["alt"],
            "creditText": f'{foto["fotografci"]} · Pexels',
            "license": "https://www.pexels.com/license/",
        }
    ld = [makale_ld] + ([sss_ld] if sss_ld else [])

    govde = f"""<main id="ana" class="kap-genis">
  <div class="yazi-duzen">
    {icindekiler}
    <article class="yazi">
      <span class="etiket">{kacir(kat["ad"])}</span>
      <h1>{kacir(r["baslik"])}</h1>
      <p class="giris">{kacir(r["ozet"])}</p>
      <div class="yazi-kunye">
        {nitelik_rozeti(r.get("nitelik", "kalici"))}
        {dogrulama_rozeti(r.get("dogrulama", "tek"))}
        <span>Güncelleme: {kacir(r.get("guncelleme", "—"))}</span>
      </div>
      {foto_html}
      {sure_html}
      {sekil_html}
      {govde_html}
      {dayanaklar}
      {sss_html}
      {arac_html}
      <div class="serit">
        <strong>Bu sayfa hukuki tavsiye değildir.</strong>
        Somut olayınız için avukata veya baronun adli yardım birimine başvurun.
        Süreler ve tutarlar değişebilir; başvurudan önce güncel resmî kaynaktan teyit edin.
      </div>
      {ilgili_html}
    </article>
  </div>
</main>"""

    site.sayfa(
        yol_dosya=f'rehber/{r["id"]}.html', derinlik=1,
        baslik=r.get("seoBaslik", r["baslik"]),
        aciklama=r.get("seoAciklama", r["ozet"]),
        govde=govde, aktif="bilgi",
        kunye=[("Ana sayfa", "index.html"), ("Bilgi Merkezi", "bilgi/index.html"),
               (kat["ad"], f'bilgi/{kat["id"]}.html'), (r["baslik"], None)],
        ld=ld, oncelik="0.8", tarih=r.get("guncelleme"),
        gorsel=og_gorsel, tur="article")


def kategori_sayfasi(site, kat):
    ler = [r for r in site.rehberler if r["kategori"] == kat["id"]]
    liste = "".join(rehber_kart(r, "../") for r in ler)
    ld = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": kat["ad"],
        "description": kat["aciklama"],
        "inLanguage": "tr-TR",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
                {"@type": "ListItem", "position": i, "name": r["baslik"],
                 "url": f'{site.y["taban"]}/rehber/{r["id"]}.html'}
                for i, r in enumerate(ler, start=1)],
        },
    }
    bos = ("""<div class="kart uyarili"><h3 class="mt0">Bu başlığın rehberleri hazırlanıyor</h3>
<p>Konu kapsam içindedir; metinleri kanuni dayanağıyla ve doğrulama etiketiyle yazılmayı
bekliyor. Bu arada <a href="../arac/sureler.html">süre takvimi</a> ve
<a href="../arac/haklarim.html">hak tarama</a> araçları bu konuyu da kapsar.</p>
<p style="margin-bottom:0">Yayımlanmamış bir metni yayımlanmış gibi göstermemek,
platformun temel kuralıdır.</p></div>""" if not ler else "")
    diger = "".join(
        f'<a class="rehber" href="{k["id"]}.html"><b>{kacir(k["ad"])}</b>'
        f'<span>{kacir(k["ozet"])}</span></a>'
        for k in site.y["kategoriler"] if k["id"] != kat["id"])

    govde = f"""<main id="ana" class="kap-genis">
  <span class="etiket">Bilgi Merkezi</span>
  <h1>{kacir(kat["ad"])}</h1>
  <p class="giris">{kacir(kat["aciklama"])}</p>
  {bos}<div class="izgara uc" style="margin-top:2rem">{liste}</div>
  <div class="bolum-baslik"><h2>Diğer konu başlıkları</h2>
  <p>Bilgi Merkezi {kacir(sayi_yaz(len(site.y["kategoriler"])))} konu başlığına ayrılmıştır.</p></div>
  <div class="izgara uc" style="margin-top:1.5rem">{diger}</div>
</main>"""
    site.sayfa(
        yol_dosya=f'bilgi/{kat["id"]}.html', derinlik=1,
        baslik=kat["ad"], aciklama=kat.get("seoAciklama", kat["aciklama"]),
        govde=govde, aktif="bilgi",
        kunye=[("Ana sayfa", "index.html"), ("Bilgi Merkezi", "bilgi/index.html"), (kat["ad"], None)],
        ld=[ld], oncelik="0.7")


def bilgi_merkezi(site):
    bolumler = []
    for kat in site.y["kategoriler"]:
        ler = [r for r in site.rehberler if r["kategori"] == kat["id"]]
        if ler:
            kartlar = "".join(rehber_kart(r, "../") for r in ler)
        else:
            kartlar = (f'<div class="kart uyarili"><span class="etiket">Hazırlanıyor</span>'
                       f'<p style="margin-bottom:0">{kacir(kat["aciklama"])}</p></div>')
        bolumler.append(f"""<section>
  <div class="bolum-baslik">
    <h2><a href="{kat["id"]}.html">{kacir(kat["ad"])}</a></h2>
    <p>{kacir(kat["ozet"])}</p>
  </div>
  <div class="izgara uc" style="margin-top:1.5rem">{kartlar}</div>
</section>""")

    govde = f"""<main id="ana" class="kap-genis">
  <span class="etiket">Bilgi Merkezi</span>
  <h1>Deprem hakları rehberi</h1>
  <p class="giris">Her başlık kanuni dayanağıyla birlikte anlatılır. Kalıcı mevzuattan doğan
  haklar ile geçmiş afetlerde uygulanmış geçici destekler ayrı ayrı işaretlenir —
  bu ayrım, size olmayan bir hak vaat edilmemesi için vardır.</p>
  <div class="bolum-baslik"><h2>Etiketler ne anlama geliyor?</h2>
  <p>Her rehberin künyesinde bu iki etiketten biri bulunur.</p></div>
  <div class="izgara iki" style="margin-top:1.5rem">
    <div class="kart guvence"><h3 class="mt0">{NITELIK["kalici"][1]}</h3>
    <p style="margin-bottom:0">Kanun, yönetmelik veya genel şarttan doğan, afetten afete değişmeyen haklar.</p></div>
    <div class="kart uyarili"><h3 class="mt0">{NITELIK["emsal"][1]}</h3>
    <p style="margin-bottom:0">2023 depremlerinde uygulanmış ama kalıcı mevzuat olmayan destekler.
    Yeni bir afette aynen tekrarlanacağının garantisi yoktur.</p></div>
  </div>
  {"".join(bolumler)}
</main>"""
    site.sayfa(
        yol_dosya="bilgi/index.html", derinlik=1,
        baslik="Bilgi Merkezi",
        aciklama="Deprem hakları rehberleri: DASK, hasar tespiti, devlet destekleri, vergi ve SGK, "
                 "iş hukuku, kira, miras ve dava yolları — kanuni dayanağıyla.",
        govde=govde, aktif="bilgi",
        kunye=[("Ana sayfa", "index.html"), ("Bilgi Merkezi", None)],
        oncelik="0.9")


def arac_merkezi(site):
    kartlar = "".join(modul_kart(m, "../") for m in MODULLER)
    govde = f"""<main id="ana" class="kap-genis">
  <span class="etiket">Araçlar</span>
  <h1>Hesaplayan, listeleyen, dilekçe üreten araçlar</h1>
  <p class="giris">Dört araç da tarayıcınızda çalışır. Girdiğiniz hiçbir bilgi sunucuya
  gönderilmez, kaydınız açılmaz, e-posta istenmez.</p>
  <div class="izgara iki" style="margin-top:2rem">{kartlar}</div>
  <div class="bolum-baslik"><h2>Araçlar neyi yapmaz?</h2></div>
  <div class="kart uyarili">
    <p>Araçlar sizin girdiğiniz bilgiyi işler; olayınızı hukuken nitelendirmez, sizin yerinize
    karar vermez ve dilekçe metnini yapay zekâ ile yazmaz. Dilekçe şablonları sabit metinlerdir;
    yalnızca sizin doldurduğunuz alanlar yerleştirilir.</p>
    <p style="margin-bottom:0">Bunun nedeni hukukidir: 1136 sayılı Avukatlık Kanunu m.35 uyarınca
    hukuki işlerin takibi avukatlara aittir. Bu platform bilgi verir, avukatlık yapmaz.</p>
  </div>
</main>"""
    site.sayfa(
        yol_dosya="arac/index.html", derinlik=1, baslik="Araçlar",
        aciklama="Süre takvimi, hak tarama, dilekçe üretici ve teminat açığı hesabı. "
                 "Dördü de tarayıcınızda çalışır: kayıt yok, e-posta yok, "
                 "girdiğiniz bilgi cihazdan çıkmaz.",
        govde=govde, aktif="arac",
        kunye=[("Ana sayfa", "index.html"), ("Araçlar", None)], oncelik="0.9")


def modul_sayfasi(site, m):
    ilgili = ""
    if m.get("ilgili"):
        kartlar = []
        for rid in m["ilgili"]:
            r = next((x for x in site.rehberler if x["id"] == rid), None)
            if r:
                kartlar.append(rehber_kart(r, "../", site.kategoriler[r["kategori"]]["ad"]))
        if kartlar:
            ilgili = (f'<section class="ilgili"><h2 class="mt0">Bu aracın arkasındaki bilgi</h2>'
                      f'<div class="izgara iki">{"".join(kartlar)}</div></section>')

    govde = f"""<main id="ana" class="kap">
  <span class="etiket">{kacir(m.get("etiket", "Araç"))}</span>
  <h1>{kacir(m["baslik"])}</h1>
  <p class="giris">{kacir(m["giris"])}</p>
{m["govde"]}
  {ilgili}
</main>"""
    site.sayfa(
        yol_dosya=f'arac/{m["id"]}.html', derinlik=1,
        baslik=m["ad"], aciklama=m["aciklama"], govde=govde, aktif="arac",
        kunye=[("Ana sayfa", "index.html"), ("Araçlar", "arac/index.html"), (m["ad"], None)],
        oncelik="0.9")


def kurumsal_sayfasi(site, s):
    govde_html, basliklar = isle(s["govde"])
    ic = "".join(f'<li><a href="#{k}">{kacir(t)}</a></li>' for sv, k, t in basliklar if sv == 2)
    icindekiler = (f'<aside class="icindekiler" aria-label="İçindekiler">'
                   f'<span class="etiket">İçindekiler</span><ol>{ic}</ol></aside>') if ic else ""
    govde = f"""<main id="ana" class="kap-genis">
  <div class="yazi-duzen">
    {icindekiler}
    <article class="yazi">
      <span class="etiket">Kurumsal</span>
      <h1>{kacir(s["baslik"])}</h1>
      <p class="giris">{kacir(s["ozet"])}</p>
      {govde_html}
    </article>
  </div>
</main>"""
    site.sayfa(
        yol_dosya=f'kurumsal/{s["id"]}.html', derinlik=1, baslik=s["ad"],
        aciklama=s["ozet"], govde=govde, aktif="kurumsal",
        kunye=[("Ana sayfa", "index.html"), ("Kurumsal", "kurumsal/hakkimizda.html"), (s["ad"], None)],
        oncelik="0.5")


def ana_sayfa(site):
    arac_kartlari = "".join(modul_kart(m, "") for m in MODULLER)
    # Kahramanın hemen altındaki hızlı erişim şeridi: dört aracın
    # tamamı katlamanın üstünde görünür. "Neyin nerede olduğu belli
    # değil" sorununun ana sayfadaki karşılığı buydu.
    hizli_kartlar = "".join(
        f'<a class="hizli-kart" href="arac/{m["id"]}.html">'
        f'<span class="no">{kacir(m.get("grup", "Araç"))}</span>'
        f'<b>{kacir(m["ad"])}</b>'
        f'<span>{kacir(kisalt(m["ozet"], 84))}</span>'
        f'<span class="git">{kacir(m.get("eylem", "Aracı aç"))} →</span></a>'
        for m in MODULLER)
    konu_kartlari = "".join(
        f'<a class="rehber" href="bilgi/{k["id"]}.html"><span class="etiket">Konu</span>'
        f'<b>{kacir(k["ad"])}</b><span>{kacir(k["ozet"])}</span></a>'
        for k in site.y["kategoriler"])
    rehber_sayisi = len(site.rehberler)

    # Öne çıkan rehberler: ana sayfadan yazıya doğrudan giriş. Kategori
    # kartları "nerede" sorusunu yanıtlar, bunlar "ne yazıyor" sorusunu.
    one_cikan = []
    for rid in site.y.get("oneCikanRehberler", []):
        r = next((x for x in site.rehberler if x["id"] == rid), None)
        if r:
            one_cikan.append(rehber_kart(r, "", site.kategoriler[r["kategori"]]["ad"]))
    one_cikan_html = (
        f'<div class="bolum-baslik" style="margin-top:3rem"><h2>Öne çıkan rehberler</h2>'
        f'<p>En sık sorulan üç konu.</p></div>'
        f'<div class="izgara uc" style="margin-top:1.5rem">{"".join(one_cikan)}</div>'
        if one_cikan else "")

    ld = [{
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": site.y["kurumAdi"],
        "alternateName": site.y["ad"],
        "url": site.y["taban"] + "/",
        "description": site.y["aciklama"],
        "areaServed": {"@type": "Country", "name": "Türkiye"},
        "knowsLanguage": "tr",
        "nonprofitStatus": "NonprofitANBI",
    }, {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": site.y["ad"],
        "url": site.y["taban"] + "/",
        "inLanguage": "tr-TR",
    }]

    govde = f"""<main id="ana">

<section class="kahraman">
  <div class="kap-genis">
   <div class="kahraman-ic">
    <div>
      <span class="etiket">Bağımsız bilgi platformu · Kayıt yok · Reklam yok</span>
      <h1>Depremden sonra hakkınız var; ama çoğunun süresi işliyor.</h1>
      <p class="giris">Hangi hakka sahip olduğunuzu, kaç gününüzün kaldığını, hangi dilekçeyi
      nereye göndereceğinizi ve bunların hangi kanun maddesine dayandığını tek yerde toplar.
      DASK ve konutla sınırlı değil: vergi, SGK primi, kredi borcu, iş sözleşmesi, kira,
      miras ve devlet destekleri de burada.</p>
      <div class="kahraman-alt">
        <a class="dugme" href="arac/sureler.html">Sürelerimi hesapla</a>
        <a class="dugme ikincil" href="bilgi/index.html">Bilgi Merkezi'ne git</a>
      </div>
    </div>
    <aside class="sure-panel" aria-label="Öne çıkan süreler">
      <div class="sure-panel-bas">
        <b>Süresi en kısa üç hak</b>
        <span>Süreler olayı öğrendiğiniz ya da sonucun ilan edildiği tarihten işler.</span>
      </div>
      <ul>
        <li><b>15 gün</b><div>DASK hasar ihbarı<span>Depremi öğrendiğiniz tarihten</span></div></li>
        <li><b>30 gün</b><div>Hasar tespitine itiraz<span>Sonucun mahallî ilan tarihinden</span></div></li>
        <li><b>2 ay</b><div>Hak sahipliği başvurusu<span>Hak sahipliği ilan tarihinden</span></div></li>
      </ul>
      <div class="sure-panel-alt">
        <a class="dugme ikincil" href="arac/sureler.html" style="width:100%">Kendi takvimimi çıkar</a>
      </div>
    </aside>
   </div>
    <div class="olcut-serit">
      <div class="olcut"><b>{len(MODULLER)}</b><span>etkileşimli araç</span></div>
      <div class="olcut"><b>{rehber_sayisi}</b><span>kanuni dayanaklı rehber</span></div>
      <div class="olcut"><b>{len(site.y["kategoriler"])}</b><span>konu başlığı</span></div>
      <div class="olcut"><b>0</b><span>toplanan kişisel veri</span></div>
    </div>
  </div>
</section>

<section class="bolum-ince zemin-alt">
  <div class="kap-genis">
    <div class="hizli">{hizli_kartlar}</div>
  </div>
</section>

<section class="bolum">
  <div class="kap-genis">
    <div class="bolum-baslik">
      <h2 class="mt0">Durumunuz hangisi?</h2>
      <p>Üç giriş noktası. Hangisinden başladığınız fark etmez, hepsi aynı bilgiye bağlanır.</p>
    </div>
    <div class="izgara uc" style="margin-top:1.5rem">
      <a class="modul" href="arac/sureler.html">
        <span class="etiket">Deprem oldu</span>
        <b>Sürelerim doluyor mu?</b>
        <span>Bildiğiniz tarihleri girin; hangi hakkınızın kaç günü kaldığını takvim olarak görün.</span>
        <span class="git">Süre takvimini aç →</span>
      </a>
      <a class="modul" href="arac/teminat.html">
        <span class="etiket">Deprem olmadan</span>
        <b>Sigortam yeterli mi?</b>
        <span>DASK'ın neyi kapsamadığını ve ne kadarının açıkta kaldığını hesaplayın.</span>
        <span class="git">Teminat açığını hesapla →</span>
      </a>
      <a class="modul" href="bilgi/kayip-miras.html">
        <span class="etiket">Yakınımı kaybettim</span>
        <b>Nüfus, miras ve sigorta işlemleri</b>
        <span>Cenaze bulunamasa bile ölüm nüfusa işlenebilir; miras hemen açılır. SGK, hayat sigortası ve BES adımları.</span>
        <span class="git">Rehberi aç →</span>
      </a>
    </div>
  </div>
</section>

<section class="bolum zemin-alt">
  <div class="kap-genis">
    <div class="bolum-baslik">
      <h2 class="mt0">Araçlar</h2>
      <p>Hepsi tarayıcınızda çalışır; girdiğiniz bilgi cihazınızdan çıkmaz.</p>
    </div>
    <div class="izgara iki" style="margin-top:1.5rem">{arac_kartlari}</div>
  </div>
</section>

<section class="bolum">
  <div class="kap-genis">
    <div class="bolum-baslik">
      <h2 class="mt0">Bilgi Merkezi</h2>
      <p>{rehber_sayisi} rehber, {len(site.y["kategoriler"])} konu başlığı. Her sayfa kanuni dayanağını
      ve doğrulama durumunu açıkça gösterir.</p>
    </div>
    <div class="izgara uc" style="margin-top:1.5rem">{konu_kartlari}</div>
    {one_cikan_html}
  </div>
</section>

<section class="bolum zemin-alt">
  <div class="kap-genis">
    <div class="bolum-baslik">
      <h2 class="mt0">En sık yapılan üç hata</h2>
      <p>Kaybedilen hakların çoğu bilinmediği için değil, bu üç noktada kaçırıldığı için kaybediliyor.</p>
    </div>
    <div class="izgara uc" style="margin-top:1.5rem">
      <div class="kart tehlikeli">
        <span class="etiket">Hata 1</span>
        <h3 class="mt0">30 günlük itiraz süresini kaçırmak</h3>
        <p>Hasar tespit sonucuna itiraz süresi, mahallî ilan tarihinden itibaren 30 gündür.
        Süre geçtiğinde idari itiraz hakkı tamamen kaybedilir; geriye yalnızca yargı yolu kalır.</p>
        <p style="margin-bottom:0"><a href="bilgi/hasar-tespit.html">Hasar tespiti ve itiraz →</a></p>
      </div>
      <div class="kart tehlikeli">
        <span class="etiket">Hata 2</span>
        <h3 class="mt0">DASK'ın her şeyi karşıladığını sanmak</h3>
        <p>DASK yalnızca binayı sigortalar. Ev eşyası, enkaz kaldırma, alternatif konaklama,
        kira kaybı ve ölüm dâhil tüm bedeni zararlar teminat dışıdır.</p>
        <p style="margin-bottom:0"><a href="rehber/dask-neyi-karsilar.html">DASK rehberi →</a></p>
      </div>
      <div class="kart tehlikeli">
        <span class="etiket">Hata 3</span>
        <h3 class="mt0">Sigortacıya başvurmadan mahkemeye gitmek</h3>
        <p>Sigorta Tahkim Komisyonuna veya mahkemeye gitmeden önce sigorta şirketine yazılı
        başvuru yapmak dava şartıdır. Bu adım atlanırsa dosya usulden reddedilir.</p>
        <p style="margin-bottom:0"><a href="arac/dilekce.html?sablon=sigorta-basvuru">Başvuru dilekçesi →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="bolum">
  <div class="kap-genis">
    <div class="izgara iki">
      <div>
        <div class="bolum-baslik"><h2 class="mt0">Kiracıysanız</h2></div>
        <div class="kart vurgulu" style="margin-top:1.5rem">
          <p>Afet toparlanma sistemi mülkiyet üzerine kuruludur: DASK malike ödeme yapar,
          hak sahipliği tapu ilişkisi arar, afet konutu malike verilir.
          <strong>Ama tazminat davası açmak için tapu sahibi olmanız gerekmez.</strong></p>
          <p style="margin-bottom:0">Kiracı olarak müteahhide, yapı denetim kuruluşuna ve idareye
          karşı kendi zararınız için dava açabilirsiniz.
          <a href="bilgi/kira-mulkiyet.html">Kira ve mülkiyet →</a></p>
        </div>
      </div>
      <div>
        <div class="bolum-baslik"><h2 class="mt0">Bu platform nasıl çalışır?</h2></div>
        <div class="kart guvence" style="margin-top:1.5rem">
          <p>Sunucu yok, hesap yok, analitik yok, çerez yok, dış istek yok. Girdiğiniz tarih,
          adres ve kimlik bilgisi yalnızca kendi cihazınızda kalır.</p>
          <p style="margin-bottom:0">Her bilgi kanuni dayanağıyla verilir ve doğrulama durumu
          açıkça işaretlenir. <a href="kurumsal/yontem.html">Yöntemimiz →</a></p>
        </div>
      </div>
    </div>
  </div>
</section>

</main>"""
    site.sayfa(
        yol_dosya="index.html", derinlik=0,
        baslik=site.y.get("seoBaslik", site.y["ad"]),
        aciklama=site.y["aciklama"], govde=govde, ld=ld, oncelik="1.0")


# ---------------------------------------------------------------- danışma
# Danışma penceresi sunucusuzdur: soru cihazdan çıkmaz. Bu yüzden
# aranabilir künye burada, üretim anında hazırlanır ve statik bir ES
# modülü olarak yazılır. Pencere ASLA metin üretmez; yalnızca buradaki
# doğrulanmış özetleri gösterir.

# Süre adları elle yazılır: parametre anahtarı ("daskHasarIhbari")
# kullanıcının sorduğu dil değildir. Yanlış bir süre adı, kullanıcının
# hakkını tamamen kaybetmesine yol açabilir — bu eşleme gözden geçirilir.
SURE_ADI = {
    "daskHasarIhbari": ("DASK hasar ihbarı", ["dask", "ihbar", "hasar bildirimi", "125"]),
    "eksperRaporunaItiraz": ("Eksper raporuna itiraz", ["eksper", "rapor", "itiraz"]),
    "daskHasarDosyasinaItiraz": ("DASK hasar dosyasına itiraz", ["dask", "dosya", "itiraz"]),
    "hasarTespitineItiraz": ("Hasar tespitine itiraz", ["hasar tespit", "itiraz", "ağır hasarlı", "orta hasarlı"]),
    "hakSahipligiBasvurusu": ("Hak sahipliği başvurusu", ["hak sahipliği", "afet konutu", "başvuru"]),
    "hakSahipligiReddineItiraz": ("Hak sahipliği reddine itiraz", ["hak sahipliği", "ret", "itiraz"]),
    "riskliYapiTespitineItiraz": ("Riskli yapı tespitine itiraz", ["riskli yapı", "kentsel dönüşüm", "6306"]),
    "imarPlaniAskiItirazi": ("İmar planı askı itirazı", ["imar", "askı", "plan"]),
    "idariDavaAcma": ("İdari dava açma", ["idari dava", "dava", "mahkeme"]),
    "idariBasvuruyaCevap": ("İdareye başvuruda cevap süresi", ["zımni ret", "idare", "cevap"]),
    "tamYargiOnBasvurusu": ("Tam yargı davası ön başvurusu", ["tam yargı", "tazminat", "idare"]),
    "sigortaZamanasimi": ("Sigortaya karşı zamanaşımı", ["zamanaşımı", "sigorta", "tazminat"]),
    "eserSozlesmesiZamanasimi": ("Müteahhide karşı zamanaşımı", ["müteahhit", "zamanaşımı", "ayıp", "eser"]),
    "cezaDavasiZamanasimi": ("Ceza davası zamanaşımı", ["ceza", "zamanaşımı", "taksirle ölüm"]),
    "isverenYarimUcret": ("İşverenin yarım ücret yükümlülüğü", ["işveren", "ücret", "iş sözleşmesi"]),
    "besOdemesi": ("BES ödemesi", ["bes", "emeklilik", "birikim"]),
}

ONERILEN_SORULAR = [
    "DASK hasar ihbarı kaç gün?",
    "Hasar tespitine nasıl itiraz ederim?",
    "Kiracıysam hangi haklarım var?",
    "DASK neyi karşılamaz?",
    "Hak sahipliği başvurusu ne zamana kadar?",
]


def duz_metin(markdown, sinir=1500):
    """Markdown gövdesini arama için düz metne indirger."""
    m = re.sub(r"```.*?```", " ", markdown, flags=re.S)      # kod blokları
    m = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", m)          # bağ ve görsel
    m = re.sub(r"[#>*_`|~-]+", " ", m)                        # işaretleme
    m = re.sub(r"\s+", " ", m)
    return m.strip()[:sinir]


def sure_metni(anahtar, veri):
    """'15 gün' / '2 ay' / '1 yıl (azami 5 yıl)' biçiminde okunur değer."""
    for alan, birim in (("gun", "gün"), ("ay", "ay"), ("yil", "yıl"),
                        ("isGunu", "iş günü")):
        if alan in veri:
            metin = f'{veri[alan]} {birim}'
            if veri.get("azamiYil"):
                metin += f' (azami {veri["azamiYil"]} yıl)'
            return metin
    return ""


def bilgi_tabani_yaz(site):
    kayitlar = []

    for m in MODULLER:
        kayitlar.append({
            "tur": "arac", "turAd": "Araç",
            "baslik": m["ad"], "ozet": m["ozet"],
            "url": f'arac/{m["id"]}.html',
            "dogrulama": "coklu",
            "anahtar": m.get("anahtar", []),
            "metin": m.get("aciklama", ""),
        })

    for k in site.y["kategoriler"]:
        kayitlar.append({
            "tur": "konu", "turAd": "Konu başlığı",
            "baslik": k["ad"], "ozet": k["ozet"],
            "url": f'bilgi/{k["id"]}.html',
            "dogrulama": "coklu",
            "anahtar": k.get("anahtar", []),
            "metin": k.get("aciklama", ""),
        })

    for r in site.rehberler:
        kayitlar.append({
            "tur": "rehber", "turAd": "Rehber",
            "baslik": r["baslik"], "ozet": r["ozet"],
            "url": f'rehber/{r["id"]}.html',
            "dogrulama": r.get("dogrulama", "tek"),
            "anahtar": r.get("anahtar", []),
            "metin": duz_metin(r["govde"]),
        })

    for s in KURUMSAL:
        kayitlar.append({
            "tur": "kurumsal", "turAd": "Kurumsal",
            "baslik": s["ad"], "ozet": s["ozet"],
            "url": f'kurumsal/{s["id"]}.html',
            "dogrulama": "resmi",
            "anahtar": s.get("anahtar", []),
            "metin": duz_metin(s["govde"], 600),
        })

    # Hak düşürücü süreler — parametreler.json tek doğruluk kaynağıdır.
    param = json.loads((VERI / "parametreler.json").read_text(encoding="utf-8"))
    for anahtar, veri in param.get("sureler", {}).items():
        if anahtar.startswith("$"):
            continue
        ad, kelimeler = SURE_ADI.get(anahtar, (anahtar, []))
        deger = sure_metni(anahtar, veri)
        if not deger:
            continue
        kayitlar.append({
            "tur": "sure", "turAd": "Hak düşürücü süre",
            "baslik": ad,
            "ozet": f'{ad} için süre {deger}.',
            "deger": deger,
            "baslangic": veri.get("baslangic", ""),
            "dayanak": veri.get("dayanak", ""),
            "url": "arac/sureler.html",
            "dogrulama": veri.get("dogrulama", "tek"),
            "anahtar": kelimeler + ["süre", "kaç gün", "son tarih"],
            "metin": " ".join(filter(None, [
                veri.get("baslangic", ""), veri.get("dayanak", ""),
                veri.get("aciklama", ""), veri.get("not", "")])),
        })

    govde = json.dumps(
        {"surum": param.get("surum", ""),
         "guncelleme": param.get("guncellemeTarihi", ""),
         "oneriler": ONERILEN_SORULAR,
         "kayitlar": kayitlar},
        ensure_ascii=False, indent=1)

    (CIKTI / "assets" / "bilgi-tabani.js").write_text(
        "/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.\n"
        "   Kaynak: icerik/, kaynak/modul/, data/parametreler.json\n"
        "   Üreteç: scripts/site-uret.py → bilgi_tabani_yaz()\n\n"
        "   Danışma penceresi yalnızca buradaki metinleri gösterir;\n"
        "   cevap metni tarayıcıda üretilmez. */\n"
        f"export const BILGI = {govde};\n",
        encoding="utf-8")
    return len(kayitlar)


def sitemap_yaz(site):
    ogeler = "".join(
        f"  <url><loc>{u}</loc><lastmod>{t}</lastmod><priority>{o}</priority></url>\n"
        for u, o, t in sorted(site.sayfalar, key=lambda x: -float(x[1])))
    (CIKTI / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{ogeler}</urlset>\n", encoding="utf-8")
    (CIKTI / "robots.txt").write_text(
        "User-agent: *\nAllow: /\n\n"
        f'Sitemap: {site.y["taban"]}/sitemap.xml\n', encoding="utf-8")


# ---------------------------------------------------------------- ana akış
MODULLER = []
KURUMSAL = []


def main():
    global MODULLER, KURUMSAL
    yap = json.loads((ICERIK / "site.json").read_text(encoding="utf-8"))
    site = Site(yap)
    MODULLER = modulleri_yukle()
    KURUMSAL = kurumsal_yukle()
    site.rehberler = rehberleri_yukle()

    bilinmeyen = [r["id"] for r in site.rehberler if r["kategori"] not in site.kategoriler]
    if bilinmeyen:
        raise SystemExit("Tanımsız kategori kullanan rehberler: " + ", ".join(bilinmeyen))

    # Üretilen sayfaları temizle; el ile bakılan varlıklar korunur.
    for klasor in ("rehber", "bilgi", "arac", "kurumsal"):
        shutil.rmtree(CIKTI / klasor, ignore_errors=True)

    ana_sayfa(site)
    arac_merkezi(site)
    for m in MODULLER:
        modul_sayfasi(site, m)
    bilgi_merkezi(site)
    for kat in yap["kategoriler"]:
        kategori_sayfasi(site, kat)
    for r in site.rehberler:
        rehber_sayfasi(site, r)
    for s in KURUMSAL:
        kurumsal_sayfasi(site, s)
    sitemap_yaz(site)
    kayit = bilgi_tabani_yaz(site)

    print(f"{len(site.sayfalar)} sayfa üretildi:")
    print(f"  {len(MODULLER)} araç · {len(site.rehberler)} rehber · "
          f"{len(yap['kategoriler'])} kategori · {len(KURUMSAL)} kurumsal sayfa")
    print(f"  danışma bilgi tabanı: {kayit} kayıt")
    return 0


if __name__ == "__main__":
    sys.exit(main())
