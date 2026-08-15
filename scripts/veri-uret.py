#!/usr/bin/env python3
"""data/parametreler.json → docs/assets/veri-parametre.js

NEDEN VAR: veri.js başlığında yıllardır "bu dosya scripts/veri-uret.py ile
üretilir — elle düzenlemeyin" yazıyordu ama o betik depoda yoktu. Parasal
ve süre değerleri iki dosya arasında ELLE senkronlanıyordu ve fiilen
bozulmuştu: parametreler.json hak sahipliği için "iki ay" derken veri.js
"60 gün" tutuyordu. İki takvim ayı 59-62 gün sürer; bu fark kullanıcının
hakkını kaybettirebilir.

Bu betik o senkronizasyonu ortadan kaldırır. Kanonik kaynak tektir:
data/parametreler.json.

TASARIM KURALLARI
1. Süre birimi ASLA güne çevrilmez. "iki ay" 60 gün değildir; {ay: 2}
   olarak yayınlanır, takvim aritmetiğini tarayıcıda app.js/sureEkle yapar.
2. dogrulama="celiskili" olan hiçbir değer hesap girdisi olarak
   yayınlanmaz. Ayrı bir PARAM.celiskiler listesine düşer; arayüz onu
   rakam olarak değil, "kaynaklar çelişiyor" olarak gösterir. Böylece
   çelişkili bir değerin yanlışlıkla hesaba girmesi kod düzeyinde imkânsız.
3. Bir sürenin araçta gösterilmesi "sunum" bloğuna bağlıdır. Yarım sunum
   bloğu hatadır — sessizce atlanmaz.

Kullanım:  python3 scripts/veri-uret.py
"""
import json
import sys
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
KAYNAK = KOK / "data" / "parametreler.json"
HEDEF = KOK / "docs" / "assets" / "veri-parametre.js"

SUNUM_ALANLARI = ("id", "ad", "baslangicEtiket", "baslangicAnahtar", "neYapmali", "sablon")
SURE_BIRIMLERI = ("gun", "ay", "yil", "isGunu")


def hata(mesaj):
    print(f"HATA: {mesaj}", file=sys.stderr)
    sys.exit(1)


def sure_birimi(kayit, anahtar):
    """Kayıttaki tek süre birimini döndürür. Birden fazlası belirsizliktir."""
    bulunan = [b for b in SURE_BIRIMLERI if b in kayit]
    if len(bulunan) != 1:
        hata(f"sureler.{anahtar}: tam olarak bir süre birimi olmalı "
             f"({', '.join(SURE_BIRIMLERI)}) — bulunan: {bulunan or 'hiç'}")
    return bulunan[0], kayit[bulunan[0]]


def sureleri_uret(veri, celiskiler):
    ler = []
    for anahtar, kayit in veri["sureler"].items():
        if anahtar.startswith("$") or not isinstance(kayit, dict):
            continue
        sunum = kayit.get("sunum")
        if not sunum:
            continue                      # araçta gösterilmiyor — bilinçli karar
        eksik = [a for a in SUNUM_ALANLARI if a not in sunum]
        if eksik:
            hata(f"sureler.{anahtar}.sunum eksik alan: {', '.join(eksik)}")

        if kayit.get("dogrulama") == "celiskili":
            celiskiler.append({"alan": f"sureler.{anahtar}",
                               "not": kayit.get("not", "Kaynaklar çelişiyor.")})
            continue

        birim, miktar = sure_birimi(kayit, anahtar)
        oge = {a: sunum[a] for a in SUNUM_ALANLARI}
        oge[birim] = miktar
        oge["dayanak"] = kayit.get("dayanak", "")
        oge["dogrulama"] = kayit.get("dogrulama", "tek")
        if kayit.get("kritik"):
            oge["kritik"] = True
        if kayit.get("azamiYil"):
            oge["azamiYil"] = kayit["azamiYil"]
        ler.append(oge)
    return ler


def tarife_serisi(dask, celiskiler):
    """Azami teminatın tarih serisi. Tarihi ayrıştırılamayan kayıt hesaba
    giremez — '2026-??-??' gibi bir tarih sıralanamaz."""
    seri = []
    for k in dask["azamiTeminat"].get("gecmis", []):
        tarih = k.get("tarih", "")
        gecerli = len(tarih) == 10 and tarih[4] == "-" and tarih[:4].isdigit() \
            and tarih[5:7].isdigit() and tarih[8:].isdigit()
        if not gecerli or k.get("dogrulama") == "celiskili":
            celiskiler.append({
                "alan": "dask.azamiTeminat.gecmis",
                "deger": k.get("deger"),
                "not": k.get("not", "Tarihi belirsiz ya da kaynaklar çelişiyor."),
            })
            continue
        seri.append({"tarih": tarih, "deger": k["deger"],
                     "dogrulama": k.get("dogrulama", "tek")})
    return sorted(seri, key=lambda x: x["tarih"])


def esik(kayit, celiskiler, ad):
    """Parasal eşik. Çelişkili olan hesaba girmez, aralık olarak anlatılır."""
    if kayit.get("dogrulama") == "celiskili":
        celiskiler.append({"alan": ad, "deger": kayit.get("deger"),
                           "not": kayit.get("not", "Kaynaklar çelişiyor.")})
        return None
    return kayit.get("deger")


def main():
    veri = json.loads(KAYNAK.read_text(encoding="utf-8"))
    celiskiler = []
    dask = veri["dask"]
    tahkim = veri.get("sigortaTahkim", {})
    emsal = veri.get("gecmisUygulamalar", {}).get("afad2023", {})

    param = {
        "surum": veri["surum"],
        "guncelleme": veri["guncellemeTarihi"],

        "dask": {
            "azamiTeminat": dask["azamiTeminat"]["gecerliDeger"],
            "azamiTeminatTarihi": dask["azamiTeminat"]["gecerlilikTarihi"],
            "azamiTeminatDogrulama": dask["azamiTeminat"]["dogrulama"],
            "tarifeSerisi": tarife_serisi(dask, celiskiler),
            "m2": dict(dask["metrekareBirimBedeli"]["yapiTarzi"]),
            "m2Tarihi": dask["metrekareBirimBedeli"]["gecerlilikTarihi"],
            "m2Dogrulama": dask["metrekareBirimBedeli"]["dogrulama"],
            "muafiyetOrani": dask["muafiyetOrani"]["deger"],
            "muafiyetDogrulama": dask["muafiyetOrani"]["dogrulama"],
            "muafiyetAciklama": dask["muafiyetOrani"]["aciklama"],
            "hasarPenceresiSaat": dask["hasarBirlestirmePenceresi"]["saat"],
            "hasarPenceresiDogrulama": dask["hasarBirlestirmePenceresi"]["dogrulama"],
        },

        "sureler": sureleri_uret(veri, celiskiler),

        # Kalıcı hak DEĞİL: 2023'e özgü idari kararlar. Arayüzde ayrı bir
        # kutuda, "emsal" rozetiyle ve toplama KATILMADAN gösterilir.
        "emsal": {
            "$uyari": veri["gecmisUygulamalar"]["$KRITIK_UYARI"],
            "kiraYardimiEvSahibi": emsal.get("kiraYardimiEvSahibi", {}).get("aylik"),
            "kiraYardimiKiraci": emsal.get("kiraYardimiKiraci", {}).get("aylik"),
            "kiraYardimiAy": emsal.get("kiraYardimiKiraci", {}).get("ay"),
            "tasinmaYardimi": emsal.get("tasinmaYardimi", {}).get("deger"),
            "dogrulama": "tek",
        },

        "tahkim": {
            "gecerlilikTarihi": tahkim.get("gecerlilikTarihi"),
            "kesinlikSiniri": esik(tahkim.get("kesinlikSiniri", {}), celiskiler,
                                   "sigortaTahkim.kesinlikSiniri"),
            "itirazSiniri": esik(tahkim.get("itirazSiniri", {}), celiskiler,
                                 "sigortaTahkim.itirazSiniri"),
            "ucKisilikHeyetSiniri": esik(tahkim.get("ucKisilikHeyetSiniri", {}), celiskiler,
                                         "sigortaTahkim.ucKisilikHeyetSiniri"),
            "temyizSiniri": esik(tahkim.get("temyizSiniri", {}), celiskiler,
                                 "sigortaTahkim.temyizSiniri"),
            "itirazSuresiGun": tahkim.get("itirazSuresiGun", {}).get("deger"),
        },

        # Hesaba GİRMEYEN, yalnızca "kaynaklar çelişiyor" olarak anlatılan
        # değerler. Bu listeye düşen bir değer koda hiç ulaşmaz.
        "celiskiler": celiskiler,
    }

    govde = json.dumps(param, ensure_ascii=False, indent=2)
    return (
        "/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin.\n"
        "   Kaynak: data/parametreler.json (kanonik)\n"
        "   Üreteç: scripts/veri-uret.py\n\n"
        "   Süre birimleri güne ÇEVRİLMEZ: 'iki ay' {ay: 2} olarak durur,\n"
        "   takvim aritmetiğini app.js → sureEkle() yapar.\n"
        "   dogrulama='celiskili' değerler PARAM.celiskiler'e düşer ve\n"
        "   hiçbir hesaba girmez.\n\n"
        "   UYARI: Değerlerin hiçbiri henüz resmî kaynaktan doğrulanmadı.\n"
        "   Doğrulama planı: DOGRULAMA.md\n */\n"
        f"export const PARAM = {govde};\n")


if __name__ == "__main__":
    icerik = main()
    if "--kontrol" in sys.argv:
        # Tazelik denetimi: diskteki dosya üretilenle birebir aynı mı?
        mevcut = HEDEF.read_text(encoding="utf-8") if HEDEF.exists() else ""
        if mevcut != icerik:
            print("HATA: docs/assets/veri-parametre.js bayat.\n"
                  "      Çalıştırın: python3 scripts/veri-uret.py", file=sys.stderr)
            sys.exit(1)
        print("veri-parametre.js taze.")
    else:
        HEDEF.write_text(icerik, encoding="utf-8")
        print(f"{HEDEF.relative_to(KOK)} üretildi.")
