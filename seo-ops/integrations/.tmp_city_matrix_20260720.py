"""Ad-hoc: матрица «услуга × город» через DataForSEO keyword_overview (этап 2, выбор городов).
Один batch-запрос. Вывод: outputs/city_service_matrix_2026-07-20.json + консоль. Удалить после этапа 2."""

import json
import sys
from pathlib import Path

from dataforseo.labs_google import LabsGoogle

OUT = Path(__file__).resolve().parents[1] / "outputs" / "city_service_matrix_2026-07-20.json"

CITIES = [
    # Tier 1
    "rotterdam", "vlaardingen", "schiedam", "spijkenisse", "barendrecht",
    "ridderkerk", "capelle aan den ijssel", "delft", "dordrecht", "zoetermeer",
    # Tier 2
    "den haag", "leiden", "gouda", "klaaswaal", "breda", "bergen op zoom",
    # Tier 3
    "etten-leur", "katwijk", "almere",
]
PATTERNS = ["gevelisolatie {c}", "buitengevelisolatie {c}", "stukadoor {c}", "gevel schilderen {c}"]


def main() -> int:
    keywords = [p.format(c=c) for c in CITIES for p in PATTERNS]
    print(f"Запрашиваю {len(keywords)} ключей одним batch...")
    labs = LabsGoogle()
    resp = labs.keyword_overview(keywords=keywords)

    cost = resp.get("cost")
    rows = {}
    for task in resp.get("tasks", []):
        for res in (task.get("result") or []):
            for item in (res.get("items") or []):
                kw = item.get("keyword", "")
                ki = item.get("keyword_info") or {}
                rows[kw] = {
                    "volume": ki.get("search_volume"),
                    "cpc": ki.get("cpc"),
                    "competition": ki.get("competition"),
                }

    matrix = {}
    for c in CITIES:
        matrix[c] = {}
        for p in PATTERNS:
            kw = p.format(c=c)
            service = p.replace(" {c}", "")
            matrix[c][service] = rows.get(kw, {"volume": None, "cpc": None})

    OUT.write_text(json.dumps({"cost_usd": cost, "matrix": matrix, "raw": rows},
                              ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"API cost: ${cost}")
    print(f"{'Город':<24} {'gevelisol.':>10} {'buitengev.':>10} {'stukadoor':>10} {'g.schild.':>10}   сумма")
    totals = []
    for c in CITIES:
        vals = [matrix[c][p.replace(' {c}', '')]["volume"] or 0 for p in PATTERNS]
        totals.append((c, vals, sum(vals)))
    for c, vals, s in sorted(totals, key=lambda x: -x[2]):
        print(f"{c:<24} {vals[0]:>10} {vals[1]:>10} {vals[2]:>10} {vals[3]:>10}   {s}")
    print(f"\nJSON -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
