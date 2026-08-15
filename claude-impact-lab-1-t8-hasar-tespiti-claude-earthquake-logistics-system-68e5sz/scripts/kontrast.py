#!/usr/bin/env python3
"""Tasarım sistemindeki renk çiftlerinin WCAG kontrast oranını ölçer.

Kullanım:  python3 scripts/kontrast.py
Çıkış kodu 1 ise eşiğin altında kalan çift vardır.
"""
import re
import sys
from pathlib import Path

CSS = Path(__file__).resolve().parent.parent / "docs" / "assets" / "tasarim.css"


def kanal(c: float) -> float:
    c /= 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def parlaklik(hexkod: str) -> float:
    h = hexkod.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b)


def oran(a: str, b: str) -> float:
    la, lb = parlaklik(a), parlaklik(b)
    if la < lb:
        la, lb = lb, la
    return (la + 0.05) / (lb + 0.05)


def jetonlar(blok: str) -> dict:
    return dict(re.findall(r"--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})", blok))


def blok_bul(metin: str, baslangic: str) -> str:
    i = metin.index(baslangic)
    return metin[i:metin.index("}", i)]


# (ön plan, arka plan, eşik, açıklama)
CIFTLER = [
    ("murekkep", "yuzey", 4.5, "gövde metni / kart"),
    ("murekkep", "kagit", 4.5, "gövde metni / sayfa"),
    ("murekkep", "yuzey-alt", 4.5, "gövde metni / ikincil zemin"),
    ("murekkep-2", "yuzey", 4.5, "ikincil metin"),
    ("murekkep-2", "kagit", 4.5, "ikincil metin / sayfa"),
    ("murekkep-3", "yuzey", 4.5, "etiket"),
    ("murekkep-3", "yuzey-alt", 4.5, "etiket / künye şeridi"),
    ("vurgu", "yuzey", 4.5, "bağlantı ve kurumsal vurgu"),
    ("vurgu", "kagit", 4.5, "vurgu / sayfa"),
    ("vurgu", "vurgu-zemin", 4.5, "vurgu / kendi zemini"),
    ("turkuaz", "yuzey", 4.5, "güvence rengi"),
    ("turkuaz", "turkuaz-zemin", 4.5, "güvence / kendi zemini"),
    ("tehlike", "yuzey", 4.5, "tehlike"),
    ("tehlike", "tehlike-zemin", 4.5, "tehlike / kendi zemini"),
    ("uyari", "yuzey", 4.5, "uyarı"),
    ("uyari", "uyari-zemin", 4.5, "uyarı / kendi zemini"),
    ("bilgi", "bilgi-zemin", 4.5, "bilgi / kendi zemini"),
    ("dugme-yazi", "vurgu", 4.5, "birincil düğme yazısı"),
]

# Koyu kurumsal şerit ve alt bilgi sabit renklerle çalışır.
SABIT = [
    ("#C9D6E6", "#0B2545", 4.5, "kurum şeridi yazısı"),
    ("#B9C7D8", "#0B2545", 4.5, "alt bilgi gövdesi"),
    ("#8FA4BD", "#0B2545", 4.5, "alt bilgi başlığı"),
    ("#93A7BF", "#0B2545", 4.5, "alt bilgi yasal notu"),
    ("#D8E2EE", "#0B2545", 4.5, "alt bilgi bağlantısı"),
    ("#FFFFFF", "#0A6E6B", 4.5, "teminat çubuğu — kapsanan"),
    ("#FFFFFF", "#A32014", 4.5, "teminat çubuğu — açıkta"),
]


def main() -> int:
    metin = CSS.read_text(encoding="utf-8")
    temalar = {
        "açık": jetonlar(blok_bul(metin, ":root {")),
        "koyu": jetonlar(blok_bul(metin, ':root[data-tema="koyu"]')),
    }

    hata = 0
    for tema, jeton in temalar.items():
        print(f"\n=== {tema.upper()} TEMA ===")
        for on, arka, esik, ad in CIFTLER:
            if on not in jeton or arka not in jeton:
                print(f"  ?  {on} / {arka} — jeton bulunamadı")
                hata += 1
                continue
            o = oran(jeton[on], jeton[arka])
            im = "OK " if o >= esik else "DÜŞÜK"
            if o < esik:
                hata += 1
            print(f"  {im:5} {o:5.2f}:1  {on:12} / {arka:12}  {ad}")

    print("\n=== TEMADAN BAĞIMSIZ ===")
    for on, arka, esik, ad in SABIT:
        o = oran(on, arka)
        im = "OK " if o >= esik else "DÜŞÜK"
        if o < esik:
            hata += 1
        print(f"  {im:5} {o:5.2f}:1  {on} / {arka}  {ad}")

    if hata:
        print(f"\n{hata} çift eşiğin altında.")
        return 1
    print("\nTüm çiftler 4.5:1 eşiğinin üstünde.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
