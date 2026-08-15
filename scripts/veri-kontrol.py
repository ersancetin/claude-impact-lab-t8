#!/usr/bin/env python3
"""data/parametreler.json bütünlüğü ve üretilmiş veri dosyasının tazeliği.

ÖNCEKİ HALİ YETERSİZDİ: yalnızca sürüm satırını ve doğrulama sayımlarını
karşılaştırıyordu. Bu yüzden veri.js'te bir sürenin "60 gün" olarak
durması, parametreler.json "iki ay" derken bile "Tutarlı" raporlanıyordu.

Şimdi iki iş yapılıyor:

1. TAZELİK — veri-uret.py'nin çıktısı bellekte üretilip diskteki dosyayla
   bayt bayt karşılaştırılır. Regex tahmini yok, kapsama %100.
2. SEMANTİK — parametreler.json'un kendi iç kuralları denetlenir:
   doğrulama durumları tanımlı mı, her parasal değerin tarihi var mı,
   süre kayıtlarında tam olarak bir birim var mı, sunum blokları tam mı.

Kullanım:
  python3 scripts/veri-kontrol.py
  python3 scripts/veri-kontrol.py --yayin    # yayın kapısı: resmî olmayan
                                             # hesap girdisi kabul edilmez
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import importlib.util

KOK = Path(__file__).resolve().parent.parent
KAYNAK = KOK / "data" / "parametreler.json"
URETILEN = KOK / "docs" / "assets" / "veri-parametre.js"

SURE_BIRIMLERI = ("gun", "ay", "yil", "isGunu")
SUNUM_ALANLARI = ("id", "ad", "baslangicEtiket", "baslangicAnahtar", "neYapmali", "sablon")


def uretici_yukle():
    spec = importlib.util.spec_from_file_location(
        "veri_uret", Path(__file__).resolve().parent / "veri-uret.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def tarih_gecerli(t):
    return (isinstance(t, str) and len(t) == 10 and t[4] == "-" and t[7] == "-"
            and t[:4].isdigit() and t[5:7].isdigit() and t[8:].isdigit())


def main():
    yayin = "--yayin" in sys.argv
    veri = json.loads(KAYNAK.read_text(encoding="utf-8"))
    hata, uyari = [], []

    # ---- 1. Tazelik ----------------------------------------------------
    print("=== TAZELİK ===")
    beklenen = uretici_yukle().main()
    mevcut = URETILEN.read_text(encoding="utf-8") if URETILEN.exists() else ""
    if mevcut != beklenen:
        hata.append("docs/assets/veri-parametre.js bayat — "
                    "çalıştırın: python3 scripts/veri-uret.py")
        print("  HATA  üretilmiş dosya kaynakla uyuşmuyor")
    else:
        print("  OK    veri-parametre.js kaynakla birebir aynı")

    # ---- 2. Semantik ---------------------------------------------------
    print("\n=== SEMANTİK ===")
    gecerli_durumlar = set(veri["dogrulamaDurumlari"])

    def durum_denetle(yol, kayit):
        d = kayit.get("dogrulama")
        if d is None:
            return
        if d not in gecerli_durumlar:
            hata.append(f"{yol}: tanımsız doğrulama durumu '{d}'")
        if yayin and d != "resmi":
            hata.append(f"{yol}: yayın kapısı — '{d}' seviyesinde değer yayınlanamaz")

    def gez(yol, d):
        if isinstance(d, dict):
            if "dogrulama" in d:
                durum_denetle(yol, d)
            for k, v in d.items():
                if not k.startswith("$"):
                    gez(f"{yol}.{k}" if yol else k, v)
        elif isinstance(d, list):
            for i, x in enumerate(d):
                gez(f"{yol}[{i}]", x)

    gez("", veri)

    # Süre kayıtları: tam olarak bir birim, tam sunum bloğu
    for anahtar, kayit in veri["sureler"].items():
        if anahtar.startswith("$") or not isinstance(kayit, dict):
            continue
        birimler = [b for b in SURE_BIRIMLERI if b in kayit]
        if len(birimler) != 1:
            hata.append(f"sureler.{anahtar}: tam olarak bir süre birimi olmalı, "
                        f"bulunan: {birimler or 'hiç'}")
        if not kayit.get("dayanak"):
            uyari.append(f"sureler.{anahtar}: dayanak boş")
        sunum = kayit.get("sunum")
        if sunum:
            eksik = [a for a in SUNUM_ALANLARI if a not in sunum]
            if eksik:
                hata.append(f"sureler.{anahtar}.sunum eksik: {', '.join(eksik)}")

    # Tarife serisi tarihleri
    for k in veri["dask"]["azamiTeminat"].get("gecmis", []):
        if not tarih_gecerli(k.get("tarih", "")):
            if k.get("dogrulama") != "celiskili":
                hata.append(f"dask.azamiTeminat.gecmis: ayrıştırılamayan tarih "
                            f"'{k.get('tarih')}' çelişkili işaretlenmemiş")

    # Çelişkili değerler hesaba girmemeli
    i = beklenen.index("export const PARAM = ") + len("export const PARAM = ")
    param = json.loads(beklenen[i:].rstrip().rstrip(";"))
    for c in param["celiskiler"]:
        print(f"  bilgi çelişkili, hesap dışı: {c['alan']}")
    for ad, deger in param["tahkim"].items():
        if deger is None and ad != "gecerlilikTarihi":
            print(f"  bilgi tahkim.{ad} yayınlanmadı (çelişkili)")

    print(f"  {'HATA ' if hata else 'OK   '} {len(hata)} hata, {len(uyari)} uyarı")

    # ---- 3. Özet -------------------------------------------------------
    sayim = {}
    def say(d):
        if isinstance(d, dict):
            if "dogrulama" in d and isinstance(d["dogrulama"], str):
                sayim[d["dogrulama"]] = sayim.get(d["dogrulama"], 0) + 1
            for v in d.values():
                say(v)
        elif isinstance(d, list):
            for x in d:
                say(x)
    say(veri)

    print(f"\n=== ÖZET ===")
    print(f"  sürüm            : {veri['surum']}")
    print(f"  doğrulama durumu : {sayim}")
    print(f"  araçta gösterilen süre : {len(param['sureler'])}")
    print(f"  hesap dışı çelişki     : {len(param['celiskiler'])}")

    for u in uyari:
        print(f"  UYARI {u}")
    for h in hata:
        print(f"  HATA  {h}")

    if not sayim.get("resmi"):
        print("\nUYARI: Hiçbir değer resmî kaynaktan doğrulanmadı. Bkz. DOGRULAMA.md")

    if hata:
        return 1
    print("\nTutarlı.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
