"""
.tmp_seo_loss_audit.py — one-shot SEO query/page loss audit
Read-only. Reads incident_audit_2026-05-09.json and produces structured analysis.

Output: writes JSON summary + prints key tables to stdout (UTF-8 safe).
Outputs go to: seo-ops/outputs/seo_audit_2026-05-10/
"""
from __future__ import annotations
import json
import sys
import re
from pathlib import Path
from collections import defaultdict
from datetime import datetime

# UTF-8 safe stdout
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / "data" / "raw" / "gsc" / "incident_audit_2026-05-09.json"
OUT_DIR = ROOT / "outputs" / "seo_audit_2026-05-10"
OUT_DIR.mkdir(parents=True, exist_ok=True)

with open(SNAPSHOT, "r", encoding="utf-8") as f:
    DATA = json.load(f)

HEALTHY = DATA["windows"]["healthy"]   # 2026-04-06 → 2026-04-23 (18d)
BAD = DATA["windows"]["bad"]            # 2026-04-24 → 2026-05-08 (15d)
FULL = DATA["windows"]["full"]          # 2026-03-15 → 2026-05-08 (54d)

H_DAYS = 18
B_DAYS = 15

# Normalize windows to per-day rates for fair compare (day count differs 18 vs 15).
# We will report both raw totals AND per-day rates.

def per_day(v, days):
    return v / days if days else 0.0


# ─── 1. SITE-WIDE QUERY DELTA ──────────────────────────────────────────────
def query_delta_table():
    h_q = {q["query"]: q for q in HEALTHY["by_query"]}
    b_q = {q["query"]: q for q in BAD["by_query"]}
    all_q = set(h_q) | set(b_q)

    rows = []
    for q in all_q:
        h = h_q.get(q, {"clicks": 0, "impressions": 0, "ctr": 0.0, "position": None})
        b = b_q.get(q, {"clicks": 0, "impressions": 0, "ctr": 0.0, "position": None})

        h_clk, h_imp = h["clicks"], h["impressions"]
        b_clk, b_imp = b["clicks"], b["impressions"]
        h_ctr = h["ctr"] or 0.0
        b_ctr = b["ctr"] or 0.0
        h_pos = h.get("position")
        b_pos = b.get("position")

        # per-day rates
        h_imp_pd = per_day(h_imp, H_DAYS)
        b_imp_pd = per_day(b_imp, B_DAYS)
        h_clk_pd = per_day(h_clk, H_DAYS)
        b_clk_pd = per_day(b_clk, B_DAYS)

        d_clicks = b_clk - h_clk
        d_impressions = b_imp - h_imp
        d_clicks_pd = b_clk_pd - h_clk_pd
        d_imp_pd = b_imp_pd - h_imp_pd
        d_pos = (b_pos - h_pos) if (h_pos is not None and b_pos is not None) else None
        d_ctr = (b_ctr - h_ctr) if (h_ctr is not None and b_ctr is not None) else None

        # Classification
        klass = classify_query(h_imp, b_imp, h_clk, b_clk, h_pos, b_pos, h_ctr, b_ctr,
                               h_imp_pd, b_imp_pd)

        rows.append({
            "query": q,
            "h_clicks": h_clk, "h_impr": h_imp, "h_ctr": round(h_ctr, 4),
            "h_pos": round(h_pos, 2) if h_pos is not None else None,
            "b_clicks": b_clk, "b_impr": b_imp, "b_ctr": round(b_ctr, 4),
            "b_pos": round(b_pos, 2) if b_pos is not None else None,
            "h_imp_pd": round(h_imp_pd, 2), "b_imp_pd": round(b_imp_pd, 2),
            "d_clicks": d_clicks, "d_impr": d_impressions,
            "d_imp_pd": round(d_imp_pd, 2),
            "d_pos": round(d_pos, 2) if d_pos is not None else None,
            "d_ctr": round(d_ctr, 4) if d_ctr is not None else None,
            "class": klass,
        })
    return rows


def classify_query(h_imp, b_imp, h_clk, b_clk, h_pos, b_pos, h_ctr, b_ctr, h_imp_pd, b_imp_pd):
    """Classification rules — operator-friendly."""
    # Adjust impressions to per-day for comparison
    if h_imp == 0 and b_imp > 0:
        return "new"
    if b_imp == 0 and h_imp > 0:
        return "disappeared"

    # Both windows have data
    # too small to judge
    if max(h_imp_pd, b_imp_pd) < 1.0:  # < 1 impr per day in both
        return "too_small"

    # demand-down: impressions dropped >50% per-day, position similar (±3) — query loses interest
    pos_similar = (h_pos is not None and b_pos is not None and abs(b_pos - h_pos) <= 3.0)
    pos_worse = (h_pos is not None and b_pos is not None and (b_pos - h_pos) > 3.0)

    imp_drop_pct = ((b_imp_pd - h_imp_pd) / h_imp_pd) if h_imp_pd > 0 else 0
    ctr_drop = (b_ctr - h_ctr) if (h_ctr is not None and b_ctr is not None) else 0

    if imp_drop_pct < -0.5 and pos_similar:
        return "demand_down"
    if imp_drop_pct < -0.5 and pos_worse:
        return "ranking_down"
    if pos_worse and imp_drop_pct >= -0.5:
        return "ranking_down"
    # CTR drop with stable position and stable impressions
    if pos_similar and abs(imp_drop_pct) < 0.3 and ctr_drop < -0.02 and h_clk >= 1:
        return "ctr_down"
    if abs(imp_drop_pct) < 0.3 and (h_pos is None or b_pos is None or abs((b_pos or 0) - (h_pos or 0)) <= 3):
        return "stable"
    return "other"


# ─── 2. PAGE-LEVEL LOSS ────────────────────────────────────────────────────
def page_delta_table():
    h_p = {p["page"]: p for p in HEALTHY["by_page"]}
    b_p = {p["page"]: p for p in BAD["by_page"]}
    all_p = set(h_p) | set(b_p)

    rows = []
    for p in all_p:
        h = h_p.get(p, {"clicks": 0, "impressions": 0, "ctr": 0.0, "position": None})
        b = b_p.get(p, {"clicks": 0, "impressions": 0, "ctr": 0.0, "position": None})
        h_clk, h_imp = h["clicks"], h["impressions"]
        b_clk, b_imp = b["clicks"], b["impressions"]
        h_pos, b_pos = h.get("position"), b.get("position")

        h_clk_pd = per_day(h_clk, H_DAYS)
        b_clk_pd = per_day(b_clk, B_DAYS)
        h_imp_pd = per_day(h_imp, H_DAYS)
        b_imp_pd = per_day(b_imp, B_DAYS)

        rows.append({
            "page": p,
            "h_clicks": h_clk, "h_impr": h_imp, "h_pos": round(h_pos, 2) if h_pos else None,
            "b_clicks": b_clk, "b_impr": b_imp, "b_pos": round(b_pos, 2) if b_pos else None,
            "h_clk_pd": round(h_clk_pd, 2), "b_clk_pd": round(b_clk_pd, 2),
            "h_imp_pd": round(h_imp_pd, 2), "b_imp_pd": round(b_imp_pd, 2),
            "d_clk_pd": round(b_clk_pd - h_clk_pd, 2),
            "d_imp_pd": round(b_imp_pd - h_imp_pd, 2),
            "category": page_category(p),
        })
    return rows


CITY_SLUGS = ["rotterdam", "den-haag", "delft", "dordrecht", "schiedam", "vlaardingen",
              "leiden", "gouda", "zoetermeer", "capelle-aan-den-ijssel", "spijkenisse",
              "barendrecht", "ridderkerk", "alphen-aan-den-rijn", "maassluis",
              "hellevoetsluis", "breda", "bergen-op-zoom", "roosendaal",
              "leidschendam-voorburg", "hendrik-ido-ambacht"]

MONEY_PAGES = [
    "https://bm-klus-bv.nl/",
    "https://bm-klus-bv.nl/gevelisolatie/",
    "https://bm-klus-bv.nl/gevelisolatie/kosten/",
    "https://bm-klus-bv.nl/gevelisolatie/afwerkingen/",
    "https://bm-klus-bv.nl/gevelisolatie/materialen/",
    "https://bm-klus-bv.nl/gevelisolatie/subsidie-vergunning/",
    "https://bm-klus-bv.nl/gevelisolatie/rc-waarde-dikte/",
    "https://bm-klus-bv.nl/buiten-stucwerk/",
    "https://bm-klus-bv.nl/sierpleister/",
    "https://bm-klus-bv.nl/gevel-schilderen/",
    "https://bm-klus-bv.nl/muren-stucen/",
]


def page_category(p: str) -> str:
    if any(f"/gevelisolatie/{s}/" in p for s in CITY_SLUGS):
        return "city"
    if "/onze-werken/" in p:
        return "portfolio"
    if "/gevelisolatie-woning-" in p:  # project pages slug pattern
        return "project"
    if p in MONEY_PAGES:
        return "money"
    if p.endswith("/") and "/images/" not in p:
        return "money_or_info"
    if "/images/" in p:
        return "image"
    return "other"


# ─── 3. CLUSTER AGGREGATION ────────────────────────────────────────────────
CLUSTERS = {
    "brand": [r"\bbm\s?klus\b", r"\bbmklus\b", r"\bbm-klus\b"],
    "gevelisolatie_core": [r"\bgevelisolatie\b(?!.*(kosten|prijs|subsidie|vergunning|rc|dikte|steenstrips|stuc|material|afwerking))"],
    "buitengevelisolatie": [r"\bbuitengevelisolatie\b"],
    "buitenmuur_isoleren": [r"\bbuitenmuur\b.*\bisoler", r"\bbuitenmuur isoleren\b"],
    "kosten_prijs": [r"kosten|prijs|wat kost|hoeveel kost"],
    "afwerking_steenstrips_stuc": [r"steenstrips|stucwerk|afwerk|sierpleister|crepi"],
    "subsidie_vergunning": [r"subsidie|vergunning|isde"],
    "rc_dikte_materiaal": [r"\brc[\s-]?waarde\b|\bdikte\b|materiaal|materialen|eps|pir|minerale wol|isolatieplaten"],
    "city": [],  # filled below
    "buiten_stucwerk": [r"buiten[-\s]?stuc|gevel stucen|buitenmuur stucen|buitenmuur stuken"],
    "sierpleister": [r"sierpleister|spachtelputz|crepi"],
    "gevel_schilderen": [r"gevel schilderen|gevelverf|keimen"],
    "muren_stucen": [r"muren stucen|muur stucen|behangklaar|sausklaar"],
}
CLUSTERS["city"] = [re.escape(c.replace("-", " ")) for c in CITY_SLUGS] + \
                   [re.escape(c.replace("-", "")) for c in CITY_SLUGS] + \
                   [re.escape(c) for c in CITY_SLUGS]


def query_clusters(q: str) -> list[str]:
    ql = q.lower()
    hits = []
    for name, patterns in CLUSTERS.items():
        for p in patterns:
            if re.search(p, ql):
                hits.append(name)
                break
    return hits or ["unclassified"]


def cluster_aggregate():
    h_q = {q["query"]: q for q in HEALTHY["by_query"]}
    b_q = {q["query"]: q for q in BAD["by_query"]}

    agg = defaultdict(lambda: {
        "h_clicks": 0, "h_impr": 0, "h_pos_w": 0.0, "h_imp_w_total": 0,
        "b_clicks": 0, "b_impr": 0, "b_pos_w": 0.0, "b_imp_w_total": 0,
        "h_queries": set(), "b_queries": set(),
    })

    for q, h in h_q.items():
        for c in query_clusters(q):
            agg[c]["h_clicks"] += h["clicks"]
            agg[c]["h_impr"] += h["impressions"]
            if h.get("position") is not None and h["impressions"] > 0:
                agg[c]["h_pos_w"] += h["position"] * h["impressions"]
                agg[c]["h_imp_w_total"] += h["impressions"]
            agg[c]["h_queries"].add(q)
    for q, b in b_q.items():
        for c in query_clusters(q):
            agg[c]["b_clicks"] += b["clicks"]
            agg[c]["b_impr"] += b["impressions"]
            if b.get("position") is not None and b["impressions"] > 0:
                agg[c]["b_pos_w"] += b["position"] * b["impressions"]
                agg[c]["b_imp_w_total"] += b["impressions"]
            agg[c]["b_queries"].add(q)

    out = []
    for name, v in agg.items():
        h_pos = v["h_pos_w"] / v["h_imp_w_total"] if v["h_imp_w_total"] > 0 else None
        b_pos = v["b_pos_w"] / v["b_imp_w_total"] if v["b_imp_w_total"] > 0 else None
        h_ctr = v["h_clicks"] / v["h_impr"] if v["h_impr"] > 0 else 0
        b_ctr = v["b_clicks"] / v["b_impr"] if v["b_impr"] > 0 else 0
        out.append({
            "cluster": name,
            "h_queries": len(v["h_queries"]),
            "b_queries": len(v["b_queries"]),
            "h_clicks": v["h_clicks"], "b_clicks": v["b_clicks"],
            "h_impr": v["h_impr"], "b_impr": v["b_impr"],
            "h_imp_pd": round(v["h_impr"] / H_DAYS, 2),
            "b_imp_pd": round(v["b_impr"] / B_DAYS, 2),
            "h_clk_pd": round(v["h_clicks"] / H_DAYS, 2),
            "b_clk_pd": round(v["b_clicks"] / B_DAYS, 2),
            "h_pos": round(h_pos, 2) if h_pos else None,
            "b_pos": round(b_pos, 2) if b_pos else None,
            "h_ctr": round(h_ctr, 4),
            "b_ctr": round(b_ctr, 4),
        })
    return sorted(out, key=lambda x: -(x["h_impr"] + x["b_impr"]))


# ─── 4. QUERY OWNERSHIP (top page per query) ──────────────────────────────
def ownership_shifts():
    h_qp = HEALTHY["by_query_page"]
    b_qp = BAD["by_query_page"]
    # build {query: [(page, clicks, impr, pos), ...]}
    h_owners = defaultdict(list)
    b_owners = defaultdict(list)
    for r in h_qp:
        h_owners[r["query"]].append((r["page"], r["clicks"], r["impressions"], r.get("position")))
    for r in b_qp:
        b_owners[r["query"]].append((r["page"], r["clicks"], r["impressions"], r.get("position")))

    def top_page(rows):
        if not rows: return None
        return max(rows, key=lambda x: (x[1], x[2]))  # max clicks, tiebreak impr

    shifts = []
    for q in set(list(h_owners) + list(b_owners)):
        h_top = top_page(h_owners[q])
        b_top = top_page(b_owners[q])
        if h_top and b_top:
            if h_top[0] != b_top[0]:
                shifts.append({
                    "query": q,
                    "healthy_owner": h_top[0],
                    "h_clicks": h_top[1], "h_impr": h_top[2],
                    "bad_owner": b_top[0],
                    "b_clicks": b_top[1], "b_impr": b_top[2],
                })
    return shifts


# ─── 5. MONEY-PAGE DEEP DIVE ──────────────────────────────────────────────
def money_page_dive():
    h_qp = HEALTHY["by_query_page"]
    b_qp = BAD["by_query_page"]
    out = {}
    for mp in MONEY_PAGES:
        h_rows = [r for r in h_qp if r["page"] == mp]
        b_rows = [r for r in b_qp if r["page"] == mp]
        h_queries = {r["query"]: r for r in h_rows}
        b_queries = {r["query"]: r for r in b_rows}
        # totals
        h_clk = sum(r["clicks"] for r in h_rows)
        h_imp = sum(r["impressions"] for r in h_rows)
        b_clk = sum(r["clicks"] for r in b_rows)
        b_imp = sum(r["impressions"] for r in b_rows)

        top_h = sorted(h_rows, key=lambda r: -r["clicks"])[:8]
        top_b = sorted(b_rows, key=lambda r: -r["clicks"])[:8]
        top_h_imp = sorted(h_rows, key=lambda r: -r["impressions"])[:8]
        top_b_imp = sorted(b_rows, key=lambda r: -r["impressions"])[:8]
        lost = sorted([q for q in h_queries if q not in b_queries],
                      key=lambda q: -h_queries[q]["impressions"])[:10]
        new = sorted([q for q in b_queries if q not in h_queries],
                     key=lambda q: -b_queries[q]["impressions"])[:10]

        out[mp] = {
            "h_clicks": h_clk, "h_impr": h_imp,
            "b_clicks": b_clk, "b_impr": b_imp,
            "h_clk_pd": round(per_day(h_clk, H_DAYS), 2),
            "b_clk_pd": round(per_day(b_clk, B_DAYS), 2),
            "h_imp_pd": round(per_day(h_imp, H_DAYS), 2),
            "b_imp_pd": round(per_day(b_imp, B_DAYS), 2),
            "top_healthy_by_clicks": [(r["query"], r["clicks"], r["impressions"], round(r.get("position", 0), 1)) for r in top_h],
            "top_bad_by_clicks": [(r["query"], r["clicks"], r["impressions"], round(r.get("position", 0), 1)) for r in top_b],
            "top_healthy_by_imp": [(r["query"], r["clicks"], r["impressions"], round(r.get("position", 0), 1)) for r in top_h_imp],
            "top_bad_by_imp": [(r["query"], r["clicks"], r["impressions"], round(r.get("position", 0), 1)) for r in top_b_imp],
            "lost_queries": [(q, h_queries[q]["clicks"], h_queries[q]["impressions"]) for q in lost],
            "new_queries": [(q, b_queries[q]["clicks"], b_queries[q]["impressions"]) for q in new],
        }
    return out


# ─── 6. BRAND DEMAND ───────────────────────────────────────────────────────
def brand_check():
    brand_re = re.compile(r"\bbm\s?klus|\bbmklus\b|\bbm-klus\b", re.I)
    h_q = {q["query"]: q for q in HEALTHY["by_query"]}
    b_q = {q["query"]: q for q in BAD["by_query"]}
    f_q = {q["query"]: q for q in FULL["by_query"]}
    h_brand = {q: v for q, v in h_q.items() if brand_re.search(q)}
    b_brand = {q: v for q, v in b_q.items() if brand_re.search(q)}
    f_brand = {q: v for q, v in f_q.items() if brand_re.search(q)}
    return {
        "healthy": h_brand,
        "bad": b_brand,
        "full_post_cutover": f_brand,
        "h_total_clicks": sum(v["clicks"] for v in h_brand.values()),
        "h_total_impr": sum(v["impressions"] for v in h_brand.values()),
        "b_total_clicks": sum(v["clicks"] for v in b_brand.values()),
        "b_total_impr": sum(v["impressions"] for v in b_brand.values()),
        "f_total_clicks": sum(v["clicks"] for v in f_brand.values()),
        "f_total_impr": sum(v["impressions"] for v in f_brand.values()),
    }


# ─── 7. CITY PAGES OWNERSHIP ───────────────────────────────────────────────
def city_pages_analysis():
    h_qp = HEALTHY["by_query_page"]
    b_qp = BAD["by_query_page"]
    h_p = {p["page"]: p for p in HEALTHY["by_page"]}
    b_p = {p["page"]: p for p in BAD["by_page"]}

    city_pages = [p for p in (set(h_p) | set(b_p)) if any(f"/gevelisolatie/{s}/" in p for s in CITY_SLUGS)]
    rows = []
    for p in city_pages:
        h = h_p.get(p, {"clicks": 0, "impressions": 0, "position": None})
        b = b_p.get(p, {"clicks": 0, "impressions": 0, "position": None})
        # queries on this page
        h_q_on_page = [r for r in h_qp if r["page"] == p]
        b_q_on_page = [r for r in b_qp if r["page"] == p]
        rows.append({
            "page": p,
            "h_clicks": h["clicks"], "h_impr": h["impressions"], "h_pos": h.get("position"),
            "b_clicks": b["clicks"], "b_impr": b["impressions"], "b_pos": b.get("position"),
            "h_imp_pd": round(per_day(h["impressions"], H_DAYS), 2),
            "b_imp_pd": round(per_day(b["impressions"], B_DAYS), 2),
            "h_unique_queries": len(h_q_on_page),
            "b_unique_queries": len(b_q_on_page),
            "h_top_q": sorted(h_q_on_page, key=lambda r: -r["impressions"])[:3],
            "b_top_q": sorted(b_q_on_page, key=lambda r: -r["impressions"])[:3],
        })
    rows.sort(key=lambda x: -(x["h_impr"] + x["b_impr"]))

    # Compare to /gevelisolatie/ hub
    hub = "https://bm-klus-bv.nl/gevelisolatie/"
    hub_h = h_p.get(hub, {"clicks": 0, "impressions": 0})
    hub_b = b_p.get(hub, {"clicks": 0, "impressions": 0})
    cities_h_imp = sum(r["h_impr"] for r in rows)
    cities_b_imp = sum(r["b_impr"] for r in rows)
    return {
        "city_pages": rows,
        "city_total_h_impr": cities_h_imp,
        "city_total_b_impr": cities_b_imp,
        "city_total_h_imp_pd": round(per_day(cities_h_imp, H_DAYS), 2),
        "city_total_b_imp_pd": round(per_day(cities_b_imp, B_DAYS), 2),
        "hub_h_impr": hub_h["impressions"],
        "hub_b_impr": hub_b["impressions"],
        "hub_h_imp_pd": round(per_day(hub_h["impressions"], H_DAYS), 2),
        "hub_b_imp_pd": round(per_day(hub_b["impressions"], B_DAYS), 2),
    }


# ─── 8. DAILY TREND ────────────────────────────────────────────────────────
def daily_trend():
    h_d = HEALTHY["daily_total"]
    b_d = BAD["daily_total"]
    f_d = FULL["daily_total"]
    return {
        "healthy_daily": h_d,
        "bad_daily": b_d,
        "full_daily": f_d,
    }


# ─── MAIN ──────────────────────────────────────────────────────────────────
def main():
    print("=" * 70)
    print("SEO LOSS AUDIT — BM Klus BV — 2026-05-10")
    print(f"Source: {SNAPSHOT.name}")
    print(f"Healthy: {HEALTHY['date_range']['start']} → {HEALTHY['date_range']['end']} ({H_DAYS}d)")
    print(f"Bad:     {BAD['date_range']['start']} → {BAD['date_range']['end']} ({B_DAYS}d)")
    print(f"Full:    {FULL['date_range']['start']} → {FULL['date_range']['end']}")
    print("=" * 70)

    queries = query_delta_table()
    pages = page_delta_table()
    clusters = cluster_aggregate()
    shifts = ownership_shifts()
    money = money_page_dive()
    brand = brand_check()
    cities = city_pages_analysis()
    trends = daily_trend()

    # Site-wide totals
    h_total_clk = sum(p["h_clicks"] for p in pages)
    h_total_imp = sum(p["h_impr"] for p in pages)
    b_total_clk = sum(p["b_clicks"] for p in pages)
    b_total_imp = sum(p["b_impr"] for p in pages)
    print(f"\nSITE-WIDE TOTALS:")
    print(f"  Healthy: {h_total_clk} clicks, {h_total_imp} impr ({h_total_clk/H_DAYS:.1f}/d, {h_total_imp/H_DAYS:.1f}/d)")
    print(f"  Bad:     {b_total_clk} clicks, {b_total_imp} impr ({b_total_clk/B_DAYS:.1f}/d, {b_total_imp/B_DAYS:.1f}/d)")
    print(f"  Δ clicks per-day: {b_total_clk/B_DAYS - h_total_clk/H_DAYS:+.1f}/d")
    print(f"  Δ impr   per-day: {b_total_imp/B_DAYS - h_total_imp/H_DAYS:+.1f}/d")
    print(f"  Δ clicks raw:     {b_total_clk - h_total_clk:+d} (different day counts)")
    print(f"  Δ impr   raw:     {b_total_imp - h_total_imp:+d} (different day counts)")

    # Classification distribution
    klass_counts = defaultdict(lambda: {"n": 0, "clicks_lost_pd": 0.0, "impr_lost_pd": 0.0})
    for q in queries:
        klass_counts[q["class"]]["n"] += 1
        # clicks/impr lost per-day
        clk_lost = (q["h_clicks"] / H_DAYS) - (q["b_clicks"] / B_DAYS)
        imp_lost = (q["h_impr"] / H_DAYS) - (q["b_impr"] / B_DAYS)
        klass_counts[q["class"]]["clicks_lost_pd"] += clk_lost
        klass_counts[q["class"]]["impr_lost_pd"] += imp_lost
    print(f"\nQUERY CLASSIFICATION (count, clicks-lost-pd, impr-lost-pd):")
    for k, v in sorted(klass_counts.items(), key=lambda x: -x[1]["clicks_lost_pd"]):
        print(f"  {k:18s}  n={v['n']:4d}  Δclk/d={-v['clicks_lost_pd']:+6.2f}  Δimp/d={-v['impr_lost_pd']:+7.2f}")

    # Top-30 lost queries by clicks
    lost_by_clicks = sorted(queries, key=lambda r: r["d_clicks"])[:30]
    lost_by_impr = sorted(queries, key=lambda r: r["d_imp_pd"])[:30]
    rank_drops = sorted([q for q in queries if q["d_pos"] is not None and q["d_pos"] > 2 and max(q["h_impr"], q["b_impr"]) >= 5],
                        key=lambda r: -r["d_pos"])[:30]
    ctr_drops = sorted([q for q in queries if q["d_ctr"] is not None and q["d_ctr"] < -0.02
                        and q["h_pos"] is not None and q["b_pos"] is not None
                        and abs(q["b_pos"] - q["h_pos"]) <= 2 and q["h_clicks"] >= 1],
                       key=lambda r: r["d_ctr"])[:30]
    disappeared = sorted([q for q in queries if q["class"] == "disappeared" and q["h_impr"] >= 5],
                         key=lambda r: -r["h_impr"])[:30]

    print(f"\nTOP 30 LOST QUERIES BY DELTA CLICKS:")
    print(f"  {'query':<55s} {'h_clk':>5s} {'b_clk':>5s} {'Δclk':>5s} {'h_imp':>5s} {'b_imp':>5s} {'h_pos':>5s} {'b_pos':>5s} {'class':<14s}")
    for r in lost_by_clicks:
        if r["d_clicks"] >= 0: continue
        print(f"  {r['query'][:54]:<55s} {r['h_clicks']:>5d} {r['b_clicks']:>5d} {r['d_clicks']:>+5d} "
              f"{r['h_impr']:>5d} {r['b_impr']:>5d} {str(r['h_pos'] or '-'):>5s} {str(r['b_pos'] or '-'):>5s} {r['class']:<14s}")

    print(f"\nTOP 30 LOST QUERIES BY IMPRESSIONS-PER-DAY:")
    for r in lost_by_impr:
        if r["d_imp_pd"] >= 0: continue
        print(f"  {r['query'][:54]:<55s} h_pd={r['h_imp_pd']:>5.1f} b_pd={r['b_imp_pd']:>5.1f} Δ={r['d_imp_pd']:>+6.1f}  pos {str(r['h_pos'] or '-'):>5s}->{str(r['b_pos'] or '-'):>5s}  {r['class']}")

    print(f"\nTOP RANKING DROPS (≥5 impr in either window, Δpos > +2):")
    for r in rank_drops[:20]:
        print(f"  {r['query'][:54]:<55s} pos {str(r['h_pos'] or '-'):>5s}->{str(r['b_pos'] or '-'):>5s}  Δ{r['d_pos']:+.1f}  imp {r['h_impr']}->{r['b_impr']}  clk {r['h_clicks']}->{r['b_clicks']}")

    print(f"\nTOP CTR DROPS (similar position, ≥1 healthy click):")
    for r in ctr_drops[:20]:
        print(f"  {r['query'][:54]:<55s}  CTR {r['h_ctr']:.3f}->{r['b_ctr']:.3f}  Δ{r['d_ctr']:+.3f}  pos {r['h_pos']}->{r['b_pos']}  clk {r['h_clicks']}->{r['b_clicks']}")

    print(f"\nDISAPPEARED QUERIES (≥5 healthy impr, 0 in bad):")
    for r in disappeared[:30]:
        print(f"  {r['query'][:54]:<55s}  h_imp={r['h_impr']}  h_pos={r['h_pos']}  h_clk={r['h_clicks']}")

    # Page-level
    print(f"\nTOP 20 LOST PAGES BY CLICKS-PER-DAY:")
    for r in sorted(pages, key=lambda x: x["d_clk_pd"])[:20]:
        if r["d_clk_pd"] >= 0: continue
        print(f"  [{r['category']:<7s}] {r['page']:<60s} h={r['h_clk_pd']:.2f}/d b={r['b_clk_pd']:.2f}/d Δ={r['d_clk_pd']:+.2f}/d  imp Δ={r['d_imp_pd']:+.2f}/d  pos {str(r['h_pos'] or '-'):>5s}->{str(r['b_pos'] or '-'):>5s}")

    print(f"\nPAGE CATEGORY ROLLUP (clicks per day):")
    cat_agg = defaultdict(lambda: {"h_clk": 0.0, "b_clk": 0.0, "h_imp": 0.0, "b_imp": 0.0, "n": 0})
    for r in pages:
        c = cat_agg[r["category"]]
        c["h_clk"] += r["h_clk_pd"]
        c["b_clk"] += r["b_clk_pd"]
        c["h_imp"] += r["h_imp_pd"]
        c["b_imp"] += r["b_imp_pd"]
        c["n"] += 1
    for cat, v in sorted(cat_agg.items(), key=lambda x: -x[1]["h_clk"]):
        print(f"  {cat:<14s} n={v['n']:>3d}  h_clk/d={v['h_clk']:>6.2f}  b_clk/d={v['b_clk']:>6.2f}  Δclk/d={v['b_clk']-v['h_clk']:+.2f}  h_imp/d={v['h_imp']:>7.2f}  b_imp/d={v['b_imp']:>7.2f}")

    print(f"\nMONEY PAGES — top healthy queries vs top bad queries:")
    for mp, info in money.items():
        slug = mp.replace("https://bm-klus-bv.nl", "") or "/"
        print(f"\n--- {slug} ---")
        print(f"  H: {info['h_clicks']} clk / {info['h_impr']} imp ({info['h_clk_pd']:.2f}/d, {info['h_imp_pd']:.2f}/d)")
        print(f"  B: {info['b_clicks']} clk / {info['b_impr']} imp ({info['b_clk_pd']:.2f}/d, {info['b_imp_pd']:.2f}/d)")
        print(f"  Top H by clicks: {info['top_healthy_by_clicks'][:5]}")
        print(f"  Top B by clicks: {info['top_bad_by_clicks'][:5]}")
        print(f"  Lost queries (top by h_imp, max 5): {info['lost_queries'][:5]}")
        print(f"  New queries (top by b_imp, max 5):  {info['new_queries'][:5]}")

    print(f"\nQUERY OWNERSHIP SHIFTS (query top-page changed between windows):")
    for s in shifts[:30]:
        h_slug = s["healthy_owner"].replace("https://bm-klus-bv.nl", "") or "/"
        b_slug = s["bad_owner"].replace("https://bm-klus-bv.nl", "") or "/"
        print(f"  '{s['query'][:40]:<40s}'  {h_slug:<35s} ({s['h_clicks']}/{s['h_impr']}) -> {b_slug} ({s['b_clicks']}/{s['b_impr']})")

    print(f"\nCLUSTER AGGREGATE:")
    print(f"  {'cluster':<28s} {'h_q':>4s} {'b_q':>4s} {'h_clk':>5s} {'b_clk':>5s} {'h_imp/d':>8s} {'b_imp/d':>8s} {'Δimp/d':>8s} {'h_pos':>5s} {'b_pos':>5s} {'h_ctr':>6s} {'b_ctr':>6s}")
    for c in clusters:
        d_imp_pd = c["b_imp_pd"] - c["h_imp_pd"]
        print(f"  {c['cluster']:<28s} {c['h_queries']:>4d} {c['b_queries']:>4d} {c['h_clicks']:>5d} {c['b_clicks']:>5d} {c['h_imp_pd']:>8.2f} {c['b_imp_pd']:>8.2f} {d_imp_pd:>+8.2f} {str(c['h_pos'] or '-'):>5s} {str(c['b_pos'] or '-'):>5s} {c['h_ctr']:>6.3f} {c['b_ctr']:>6.3f}")

    print(f"\nBRAND CHECK:")
    print(f"  Healthy queries matching brand: {len(brand['healthy'])}, clicks={brand['h_total_clicks']}, impr={brand['h_total_impr']}")
    print(f"  Bad queries matching brand:     {len(brand['bad'])}, clicks={brand['b_total_clicks']}, impr={brand['b_total_impr']}")
    print(f"  Full post-cutover brand queries: {len(brand['full_post_cutover'])}, clicks={brand['f_total_clicks']}, impr={brand['f_total_impr']}")
    print(f"  Healthy brand queries detail:")
    for q, v in brand['healthy'].items():
        print(f"    '{q}': {v['clicks']} clk / {v['impressions']} imp / pos {v.get('position', '-')}")
    print(f"  Bad brand queries detail:")
    for q, v in brand['bad'].items():
        print(f"    '{q}': {v['clicks']} clk / {v['impressions']} imp / pos {v.get('position', '-')}")
    print(f"  Full post-cutover brand queries detail (max 15):")
    for q, v in list(brand['full_post_cutover'].items())[:15]:
        print(f"    '{q}': {v['clicks']} clk / {v['impressions']} imp / pos {v.get('position', '-')}")

    print(f"\nCITY PAGES vs HUB /gevelisolatie/:")
    print(f"  Hub /gevelisolatie/  H: {cities['hub_h_imp_pd']:.2f}/d impr  B: {cities['hub_b_imp_pd']:.2f}/d impr")
    print(f"  Cities (sum 21 pages) H: {cities['city_total_h_imp_pd']:.2f}/d impr  B: {cities['city_total_b_imp_pd']:.2f}/d impr")
    print(f"\nCity pages by impressions (sorted):")
    for r in sorted(cities['city_pages'], key=lambda x: -(x['h_impr'] + x['b_impr']))[:21]:
        slug = r["page"].split("/gevelisolatie/")[-1].rstrip("/")
        print(f"  {slug:<25s} H: {r['h_impr']:>4d} imp / {r['h_clicks']} clk / pos {r['h_pos'] or '-'}  B: {r['b_impr']:>4d} imp / {r['b_clicks']} clk / pos {r['b_pos'] or '-'}  uniq_q H/B = {r['h_unique_queries']}/{r['b_unique_queries']}")

    print(f"\nDAILY CLICK/IMP TREND:")
    print(f"  Healthy daily (last 5):")
    for d in HEALTHY["daily_total"][-5:]:
        print(f"    {d.get('date', '?')}: clicks={d.get('clicks', 0)}, impr={d.get('impressions', 0)}")
    print(f"  Bad daily (all):")
    for d in BAD["daily_total"]:
        print(f"    {d.get('date', '?')}: clicks={d.get('clicks', 0)}, impr={d.get('impressions', 0)}")

    # Save full JSON output
    out = {
        "_meta": {
            "generated_at_local": datetime.now().isoformat(),
            "source_snapshot": str(SNAPSHOT.name),
            "healthy_window": HEALTHY["date_range"],
            "bad_window": BAD["date_range"],
            "full_window": FULL["date_range"],
            "healthy_days": H_DAYS,
            "bad_days": B_DAYS,
        },
        "site_totals": {
            "h_clicks": h_total_clk, "h_impr": h_total_imp,
            "b_clicks": b_total_clk, "b_impr": b_total_imp,
            "h_clk_pd": round(h_total_clk / H_DAYS, 2),
            "b_clk_pd": round(b_total_clk / B_DAYS, 2),
            "h_imp_pd": round(h_total_imp / H_DAYS, 2),
            "b_imp_pd": round(b_total_imp / B_DAYS, 2),
        },
        "queries": queries,
        "pages": pages,
        "clusters": clusters,
        "ownership_shifts": shifts,
        "money_pages": {k: v for k, v in money.items()},
        "brand": {
            "healthy": brand["healthy"], "bad": brand["bad"],
            "full_post_cutover": brand["full_post_cutover"],
            "totals": {
                "h_clicks": brand["h_total_clicks"], "h_impr": brand["h_total_impr"],
                "b_clicks": brand["b_total_clicks"], "b_impr": brand["b_total_impr"],
                "f_clicks": brand["f_total_clicks"], "f_impr": brand["f_total_impr"],
            },
        },
        "city_pages": cities,
        "trends": trends,
        "klass_counts": dict(klass_counts),
    }
    out_path = OUT_DIR / "audit_full_2026-05-10.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2, default=str)
    print(f"\n[OK] Saved: {out_path}")


if __name__ == "__main__":
    main()
