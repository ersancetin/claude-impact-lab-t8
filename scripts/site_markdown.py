#!/usr/bin/env python3
"""Rehber metinleri için küçük markdown alt kümesi işleyicisi.

Bağımlılık yok. Desteklenen sözdizimi:
  ## Başlık / ### Alt başlık   → h2 / h3 (kimlik verilir, içindekilere girer)
  - madde                       → ul
  1. madde                      → ol
  | a | b |                     → tablo (ikinci satır ayraç)
  > alıntı                      → blockquote
  :::uyari Başlık               → durum kartı (uyari | tehlike | bilgi | guvence)
  ...
  :::
  **kalın** *eğik* `kod` [bağ](adres)
"""
import html
import re
import unicodedata

TR = str.maketrans("çğıöşüÇĞİÖŞÜ", "cgiosuCGIOSU")


def kimlik(metin: str) -> str:
    m = metin.translate(TR)
    m = unicodedata.normalize("NFKD", m).encode("ascii", "ignore").decode()
    m = re.sub(r"[^a-zA-Z0-9]+", "-", m).strip("-").lower()
    return m or "bolum"


def satir_ici(metin: str) -> str:
    m = html.escape(metin, quote=False)
    m = re.sub(r"`([^`]+)`", r"<code>\1</code>", m)
    m = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", m)
    m = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", m)
    m = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', m)
    return m


def isle(kaynak: str):
    """(html, basliklar) döndürür. basliklar: [(seviye, kimlik, metin)]"""
    satirlar = kaynak.replace("\r\n", "\n").split("\n")
    cikti, basliklar = [], []
    i, n = 0, len(satirlar)

    while i < n:
        s = satirlar[i]
        cip = s.strip()

        if not cip:
            i += 1
            continue

        # Başlık
        b = re.match(r"^(#{2,4})\s+(.*)$", cip)
        if b:
            sev = len(b.group(1))
            metin = b.group(2).strip()
            kim = kimlik(metin)
            basliklar.append((sev, kim, metin))
            cikti.append(f'<h{sev} id="{kim}">{satir_ici(metin)}</h{sev}>')
            i += 1
            continue

        # Durum kartı
        k = re.match(r"^:::(uyari|tehlike|bilgi|guvence|vurgulu)\s*(.*)$", cip)
        if k:
            tur, baslik = k.group(1), k.group(2).strip()
            i += 1
            govde = []
            while i < n and satirlar[i].strip() != ":::":
                govde.append(satirlar[i])
                i += 1
            i += 1
            ic, _ = isle("\n".join(govde))
            bas = f"<h3 class=\"mt0\">{satir_ici(baslik)}</h3>" if baslik else ""
            sinif = {"uyari": "uyarili", "tehlike": "tehlikeli",
                     "bilgi": "bilgili"}.get(tur, tur)
            cikti.append(f'<div class="kart {sinif}">{bas}{ic}</div>')
            continue

        # Tablo
        if cip.startswith("|") and i + 1 < n and re.match(r"^\|[\s:|-]+\|$", satirlar[i + 1].strip()):
            def hucreler(satir):
                return [h.strip() for h in satir.strip().strip("|").split("|")]

            bas = hucreler(cip)
            i += 2
            govde = []
            while i < n and satirlar[i].strip().startswith("|"):
                govde.append(hucreler(satirlar[i]))
                i += 1
            th = "".join(f"<th>{satir_ici(h)}</th>" for h in bas)
            tr = "".join(
                "<tr>" + "".join(f"<td>{satir_ici(h)}</td>" for h in sat) + "</tr>"
                for sat in govde
            )
            cikti.append(f'<div class="tablo-sar"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>')
            continue

        # Alıntı
        if cip.startswith(">"):
            govde = []
            while i < n and satirlar[i].strip().startswith(">"):
                govde.append(satirlar[i].strip()[1:].strip())
                i += 1
            ic, _ = isle("\n".join(govde))
            cikti.append(f"<blockquote>{ic}</blockquote>")
            continue

        # Listeler
        #
        # Sarma satırı desteği: bir madde birden fazla satıra yayılabilir.
        # Önceden döngü ilk sarma satırında kopuyordu; sonraki madde yeni
        # bir <ol> açtığı için numaralandırma her maddede 1'e dönüyor ve
        # sarma metni ayrı bir paragrafa düşüyordu. Metinleri 80 sütuna
        # sarmak bu depoda yerleşik bir alışkanlık olduğu için hata
        # yayımlanmış içeriği de etkiliyordu.
        if re.match(r"^[-*]\s+", cip) or re.match(r"^\d+\.\s+", cip):
            sirali = bool(re.match(r"^\d+\.\s+", cip))
            desen = r"^\d+\.\s+" if sirali else r"^[-*]\s+"
            isaretli = r"^(#{2,4}\s|[-*]\s|\d+\.\s|\||>|:::)"
            ogeler = []
            while i < n and re.match(desen, satirlar[i].strip()):
                parcalar = [re.sub(desen, "", satirlar[i].strip())]
                i += 1
                # Boş satıra ya da yeni bir işarete kadar olan satırlar
                # aynı maddenin devamıdır.
                while (i < n and satirlar[i].strip()
                       and not re.match(isaretli, satirlar[i].strip())):
                    parcalar.append(satirlar[i].strip())
                    i += 1
                ogeler.append(" ".join(parcalar))
            etiket = "ol" if sirali else "ul"
            ic = "".join(f"<li>{satir_ici(o)}</li>" for o in ogeler)
            cikti.append(f"<{etiket}>{ic}</{etiket}>")
            continue

        # Paragraf
        govde = []
        while i < n and satirlar[i].strip() and not re.match(
                r"^(#{2,4}\s|[-*]\s|\d+\.\s|\||>|:::)", satirlar[i].strip()):
            govde.append(satirlar[i].strip())
            i += 1
        cikti.append(f"<p>{satir_ici(' '.join(govde))}</p>")

    return "\n".join(cikti), basliklar
