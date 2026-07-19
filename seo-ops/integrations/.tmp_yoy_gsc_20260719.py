"""Ad-hoc: год-к-году GSC сравнение (старый WP-сайт лето 2025 vs новый Next.js лето 2026)
+ помесячный тренд кликов/показов за 16 месяцев. Read-only. Удалить после анализа."""

import json
import sys
from pathlib import Path

from google_clients.config import load_gsc_config
from google_clients.gsc_client import _build_service

OUT = Path(__file__).resolve().parents[1] / "outputs" / "gsc_yoy_comparison_2026-07-19.json"

OLD = ("2025-04-18", "2025-07-16")   # старый сайт, тот же сезон
NEW = ("2026-04-18", "2026-07-16")   # новый сайт
MONTHLY_START = "2025-04-01"
MONTHLY_END = "2026-07-16"


def fetch(service, site, start, end, dims, limit=250):
    body = {"startDate": start, "endDate": end, "dimensions": dims, "rowLimit": limit}
    resp = service.searchanalytics().query(siteUrl=site, body=body).execute()
    return resp.get("rows", [])


def agg_total(rows):
    return {
        "clicks": sum(r.get("clicks", 0) for r in rows),
        "impressions": sum(r.get("impressions", 0) for r in rows),
    }


def main():
    cfg = load_gsc_config()
    service = _build_service(cfg)
    site = cfg.site_url
    out = {}

    # 1. Помесячный тренд
    rows = fetch(service, site, MONTHLY_START, MONTHLY_END, ["date"], limit=500)
    monthly = {}
    for r in rows:
        month = r["keys"][0][:7]
        m = monthly.setdefault(month, {"clicks": 0, "impressions": 0})
        m["clicks"] += r.get("clicks", 0)
        m["impressions"] += r.get("impressions", 0)
    out["monthly"] = monthly
    print("=== Помесячно (клики / показы) ===")
    for month in sorted(monthly):
        m = monthly[month]
        print(f"  {month}: {m['clicks']:>5} / {m['impressions']:>7}")

    # 2. Топ-запросы старый vs новый период
    for label, (start, end) in (("old_2025", OLD), ("new_2026", NEW)):
        q_rows = fetch(service, site, start, end, ["query"], limit=250)
        p_rows = fetch(service, site, start, end, ["page"], limit=250)
        out[label] = {
            "range": [start, end],
            "totals_by_query": agg_total(q_rows),
            "totals_by_page": agg_total(p_rows),
            "top_queries": [
                {"q": r["keys"][0], "clicks": r["clicks"], "impr": r["impressions"],
                 "pos": round(r.get("position", 0), 1)}
                for r in q_rows[:60]
            ],
            "top_pages": [
                {"page": r["keys"][0].replace("https://bm-klus-bv.nl", ""),
                 "clicks": r["clicks"], "impr": r["impressions"],
                 "pos": round(r.get("position", 0), 1)}
                for r in p_rows[:60]
            ],
        }
        t = out[label]["totals_by_query"]
        print(f"\n=== {label} {start}..{end}: clicks={t['clicks']} impr={t['impressions']} ===")
        print("  Топ-15 запросов по кликам:")
        for r in out[label]["top_queries"][:15]:
            print(f"    {r['q'][:55]:<55} clicks={r['clicks']:>4} impr={r['impr']:>6} pos={r['pos']}")
        print("  Топ-15 страниц по кликам:")
        for r in out[label]["top_pages"][:15]:
            print(f"    {r['page'][:60]:<60} clicks={r['clicks']:>4} impr={r['impr']:>6} pos={r['pos']}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nJSON -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
