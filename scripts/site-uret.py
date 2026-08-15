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
from site_markdown import isle, kimlik  # noqa: E402

KOK = Path(__file__).resolve().parent.parent
ICERIK = KOK / "icerik"
KAYNAK = KOK / "kaynak"
CIKTI = KOK / "docs"

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

    def gezinme_html(self, derinlik, aktif):
        p = self.onek(derinlik)
        ogeler = []
        for g in self.y["gezinme"]:
            im = ' aria-current="page"' if g["anahtar"] == aktif else ""
            ogeler.append(f'<a href="{p}{g["url"]}"{im}>{kacir(g["ad"])}</a>')
        return "".join(ogeler)

    def mobil_gezinme(self, derinlik):
        p = self.onek(derinlik)
        bag = [f'<a href="{p}index.html">Ana sayfa</a>']
        bag.append('<span class="etiket">Araçlar</span>')
        for m in MODULLER:
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
    <span class="bosluk"></span>
    <nav class="gezinme" aria-label="Ana gezinme">{self.gezinme_html(derinlik, aktif)}</nav>
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
              robots=None):
        p = self.onek(derinlik)
        url = yol_dosya.replace("index.html", "") if yol_dosya.endswith("/index.html") else yol_dosya
        kanonik = f'{self.y["taban"]}/{yol_dosya}'
        serit, kunye_ld = self.kunye_serit(derinlik, kunye or [])
        blok = list(ld or [])
        if kunye_ld:
            blok.append(kunye_ld)
        ld_html = "".join(
            f'<script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>'
            for b in blok)
        tam_baslik = baslik if baslik == self.y["ad"] else f'{baslik} · {self.y["ad"]}'
        robots_etiket = f'<meta name="robots" content="{robots}">\n' if robots else ""

        icerik = f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{kacir(tam_baslik)}</title>
<meta name="description" content="{kacir(aciklama)}">
{robots_etiket}<link rel="canonical" href="{kanonik}">
<meta name="color-scheme" content="light dark">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{kacir(self.y["ad"])}">
<meta property="og:title" content="{kacir(tam_baslik)}">
<meta property="og:description" content="{kacir(aciklama)}">
<meta property="og:url" content="{kanonik}">
<meta property="og:locale" content="tr_TR">
<meta name="twitter:card" content="summary">
<link rel="icon" href="{p}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="{p}assets/tasarim.css">
{ld_html}
</head>
<body{f' class="{sinif}"' if sinif else ""}>
<a class="atla" href="#ana">İçeriğe atla</a>
{self.ust_html(derinlik, aktif)}
{serit}
{govde}
{self.alt_html(derinlik)}
<script type="module">
  import {{ temaBaslat, temaBagla }} from "{p}assets/app.js";
  temaBaslat(); temaBagla();
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
    ler = []
    for yol in sorted((ICERIK / "rehber").glob("*.md")):
        k, govde = kunye_oku(yol)
        k["govde"] = govde
        ler.append(k)
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


def rehber_kart(r, onek, kategori_adi=None):
    et = kategori_adi or ""
    et_html = f'<span class="etiket">{kacir(et)}</span>' if et else ""
    return f"""<a class="rehber" href="{onek}rehber/{r["id"]}.html">
  {et_html}
  <b>{kacir(r["baslik"])}</b>
  <span>{kacir(r["ozet"])}</span>
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

    makale_ld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": r["baslik"],
        "description": r["ozet"],
        "inLanguage": "tr-TR",
        "dateModified": r.get("guncelleme", date.today().isoformat()),
        "isAccessibleForFree": True,
        "author": {"@type": "Organization", "name": site.y["kurumAdi"]},
        "publisher": {"@type": "Organization", "name": site.y["kurumAdi"]},
        "mainEntityOfPage": f'{site.y["taban"]}/rehber/{r["id"]}.html',
        "about": kat["ad"],
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
        ld=ld, oncelik="0.8", tarih=r.get("guncelleme"))


def kategori_sayfasi(site, kat):
    ler = [r for r in site.rehberler if r["kategori"] == kat["id"]]
    kartlar = "".join(rehber_kart(r, "../") for r in ler)
    liste = "".join(
        f'<a class="rehber" href="../rehber/{r["id"]}.html"><b>{kacir(r["baslik"])}</b>'
        f'<span>{kacir(r["ozet"])}</span></a>' for r in ler)
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
  {bos}<div class="izgara iki" style="margin-top:2rem">{liste}</div>
  <div class="bolum-baslik"><h2>Diğer konu başlıkları</h2>
  <p>Bilgi Merkezi dokuz konu başlığına ayrılmıştır.</p></div>
  <div class="izgara uc" style="margin-top:1.5rem">{diger}</div>
</main>"""
    site.sayfa(
        yol_dosya=f'bilgi/{kat["id"]}.html', derinlik=1,
        baslik=kat["ad"], aciklama=kat["aciklama"], govde=govde, aktif="bilgi",
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
        aciklama="Süre takvimi, hak tarama, dilekçe üretici ve sigorta teminat açığı hesaplayıcısı. "
                 "Kayıt yok, veri sunucuya gitmez.",
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
    konu_kartlari = "".join(
        f'<a class="rehber" href="bilgi/{k["id"]}.html"><span class="etiket">Konu</span>'
        f'<b>{kacir(k["ad"])}</b><span>{kacir(k["ozet"])}</span></a>'
        for k in site.y["kategoriler"])
    rehber_sayisi = len(site.rehberler)

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
        yol_dosya="index.html", derinlik=0, baslik=site.y["ad"],
        aciklama=site.y["aciklama"], govde=govde, ld=ld, oncelik="1.0")


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

    print(f"{len(site.sayfalar)} sayfa üretildi:")
    print(f"  {len(MODULLER)} araç · {len(site.rehberler)} rehber · "
          f"{len(yap['kategoriler'])} kategori · {len(KURUMSAL)} kurumsal sayfa")
    return 0


if __name__ == "__main__":
    sys.exit(main())
