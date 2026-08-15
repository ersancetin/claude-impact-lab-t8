#!/usr/bin/env python3
"""data/parametreler.json ile docs/assets/veri.js arasindaki tutarliligi kontrol eder.

Kanonik kaynak parametreler.json'dir. Site veri.js'ten okur (fetch gerektirmesin,
cevrimdisi ve file:// ile de calissin diye). Bu betik ikisinin uyustugunu dogrular.

Kullanim:  python3 scripts/veri-kontrol.py
"""
import json, re, sys, pathlib

kok = pathlib.Path(__file__).resolve().parent.parent
p = json.loads((kok / "data/parametreler.json").read_text(encoding="utf-8"))
js = (kok / "docs/assets/veri.js").read_text(encoding="utf-8")

def js_sayi(anahtar):
    m = re.search(rf"{anahtar}\s*:\s*([0-9.]+)", js)
    return float(m.group(1)) if m else None

hata = []
kontroller = [
    ("azamiTeminat", p["dask"]["azamiTeminat"]["gecerliDeger"]),
    ("celik_betonarme_karkas", p["dask"]["metrekareBirimBedeli"]["yapiTarzi"]["celik_betonarme_karkas"]),
    ("diger", p["dask"]["metrekareBirimBedeli"]["yapiTarzi"]["diger"]),
    ("muafiyetOrani", p["dask"]["muafiyetOrani"]["deger"]),
]
for ad, beklenen in kontroller:
    bulunan = js_sayi(ad)
    if bulunan is None:
        hata.append(f"veri.js icinde '{ad}' bulunamadi")
    elif abs(bulunan - float(beklenen)) > 1e-9:
        hata.append(f"{ad}: json={beklenen} ama veri.js={bulunan}")

# Surelerin gun degerleri
for s in p["sureler"].values() if isinstance(p["sureler"], dict) else []:
    pass

print(f"parametreler.json surum : {p['surum']}")
m = re.search(r'surum:\s*"([^"]+)"', js)
print(f"veri.js surum           : {m.group(1) if m else '?'}")
if m and m.group(1) != p["surum"]:
    hata.append(f"surum uyusmuyor: json={p['surum']} veri.js={m.group(1)}")

# Dogrulama durumu ozeti
sayac = {}
def gez(o):
    if isinstance(o, dict):
        if "dogrulama" in o and isinstance(o["dogrulama"], str):
            sayac[o["dogrulama"]] = sayac.get(o["dogrulama"], 0) + 1
        for v in o.values(): gez(v)
    elif isinstance(o, list):
        for v in o: gez(v)
gez(p)
print(f"dogrulama durumu        : {sayac}")
if sayac.get("resmi", 0) == 0:
    print("\nUYARI: Hicbir deger resmi kaynaktan dogrulanmadi. Bkz. DOGRULAMA.md")

if hata:
    print("\nTUTARSIZLIK:")
    for h in hata: print("  -", h)
    sys.exit(1)
print("\nTutarli.")
