#!/usr/bin/env python3
"""Markdown alt kümesi işleyicisinin sınamaları.

Neden var: içerik metinleri bu depoda 80 sütuna sarılıyor. İşleyici
sarma satırlarını doğru toplamazsa liste numaralandırması bozulur ve
metnin bir kısmı listenin dışına düşer — yayımlanmış sayfada bu
sessizce olur, kimse fark etmez.

Kullanım:  python3 scripts/markdown-kontrol.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from site_markdown import isle  # noqa: E402

ORNEKLER = [
    (
        "sarma satırlı sıralı liste tek <ol> olmalı",
        "1. Birinci madde burada başlar ve\n"
        "ikinci satıra sarar.\n"
        "2. İkinci madde.\n",
        lambda h: h.count("<ol>") == 1 and h.count("<li>") == 2
        and "sarar." in h and "<p>ikinci satıra" not in h,
    ),
    (
        "sarma satırlı madde işaretli liste",
        "- Bir madde\nsarma satırı.\n- İkinci madde\n",
        lambda h: h.count("<ul>") == 1 and h.count("<li>") == 2
        and "sarma satırı." in h,
    ),
    (
        "boş satır listeyi bitirir, sonrası paragraf olur",
        "- Madde\n\nBu ayrı bir paragraf.\n",
        lambda h: h.count("<li>") == 1 and "<p>Bu ayrı bir paragraf.</p>" in h,
    ),
    (
        "listeden sonra başlık gelirse liste kapanır",
        "1. Madde\n## Başlık\n",
        lambda h: h.count("<li>") == 1 and "<h2" in h,
    ),
    (
        "iç içe olmayan iki ayrı liste karışmaz",
        "- a\n\n1. b\n",
        lambda h: h.count("<ul>") == 1 and h.count("<ol>") == 1,
    ),
    (
        "tablo listeyi bitirir",
        "- Madde\n| a | b |\n|---|---|\n| 1 | 2 |\n",
        lambda h: h.count("<li>") == 1 and "<table>" in h,
    ),
    (
        "satır içi biçimlendirme sarma satırında da çalışır",
        "1. **Kalın** başlangıç ve\n*eğik* devam.\n",
        lambda h: "<strong>Kalın</strong>" in h and "<em>eğik</em>" in h,
    ),
]

hata = 0
print("=== MARKDOWN İŞLEYİCİ ===")
for ad, kaynak, olcut in ORNEKLER:
    html, _ = isle(kaynak)
    tamam = olcut(html)
    if not tamam:
        hata += 1
    print(f"  {'OK   ' if tamam else 'HATA '} {ad}")
    if not tamam:
        print(f"        çıktı: {html}")

# Gerçek içerikte kopuk liste kaldı mı?
print("\n=== İÇERİKTE KOPUK LİSTE ===")
KOK = Path(__file__).resolve().parent.parent
kopuk = []
for yol in sorted(KOK.glob("icerik/**/*.md")):
    ham = yol.read_text(encoding="utf-8")
    govde = ham.split("\n---\n", 1)[-1]
    html, _ = isle(govde)
    # Arka arkaya kapanıp açılan liste, sarma satırının koptuğunu gösterir
    if "</ol>\n<ol>" in html or "</ul>\n<ul>" in html:
        kopuk.append(yol.relative_to(KOK))
if kopuk:
    hata += len(kopuk)
    for y in kopuk:
        print(f"  HATA  {y}")
else:
    print("  OK    art arda kopan liste yok")

if hata:
    print(f"\n{hata} sınama başarısız.")
    sys.exit(1)
print("\nTüm sınamalar geçti.")
