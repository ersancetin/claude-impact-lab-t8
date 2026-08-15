#!/usr/bin/env python3
"""Üretilen sitedeki iç bağlantıları ve varlık yollarını denetler."""
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urldefrag

CIKTI = Path(__file__).resolve().parent.parent / "docs"


def main() -> int:
    kirik = []
    sayac = 0
    for sayfa in sorted(CIKTI.rglob("*.html")):
        metin = sayfa.read_text(encoding="utf-8")
        for oz in ("href", "src"):
            for hedef in re.findall(rf'{oz}="([^"]+)"', metin):
                if hedef.startswith(("http://", "https://", "mailto:", "#", "data:")):
                    continue
                yol, _ = urldefrag(hedef)
                yol = unquote(yol.split("?")[0])
                if not yol:
                    continue
                sayac += 1
                if not (sayfa.parent / yol).resolve().exists():
                    kirik.append((sayfa.relative_to(CIKTI), hedef))

    if kirik:
        print(f"{len(kirik)} kırık bağlantı ({sayac} bağlantı denetlendi):")
        for s, h in kirik:
            print(f"  {s} → {h}")
        return 1
    print(f"{sayac} iç bağlantının tamamı geçerli.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
