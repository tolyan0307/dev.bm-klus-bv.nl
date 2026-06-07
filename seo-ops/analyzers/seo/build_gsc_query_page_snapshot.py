"""
build_gsc_query_page_snapshot.py — Build normalized GSC query/page snapshot.

Pulls data via query_page_loader, normalizes, classifies, and outputs:
  - gsc_query_page_last{N}d_raw.json
  - gsc_query_page_last{N}d.csv (row-level)
  - gsc_query_page_aggregated_queries_last{N}d.csv
  - gsc_query_page_aggregated_pages_last{N}d.csv
  - gsc_query_page_snapshot_last{N}d.md (summary)

Usage:
  python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py           # default 90d
  python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py --days 28 # recent 28d
"""

from __future__ import annotations

import csv
import json
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.gsc.query_page_loader import pull_query_page_data
from integrations.site.page_inventory_loader import load_page_inventory


# ── Output paths ─────────────────────────────────────────────────────────────

RAW_DIR = SEO_OPS_ROOT / "snapshots" / "raw" / "gsc"
NORM_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "seo"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "seo"


def _output_paths(days: int) -> dict[str, Path]:
    """Return output paths keyed by role, parameterized by window size."""
    tag = f"last{days}d"
    return {
        "raw_json":      RAW_DIR / f"gsc_query_page_{tag}_raw.json",
        "row_csv":       NORM_DIR / f"gsc_query_page_{tag}.csv",
        "query_agg_csv": NORM_DIR / f"gsc_query_page_aggregated_queries_{tag}.csv",
        "page_agg_csv":  NORM_DIR / f"gsc_query_page_aggregated_pages_{tag}.csv",
        "summary_md":    REPORT_DIR / f"gsc_query_page_snapshot_{tag}.md",
    }


# Legacy constants kept for backwards-compat imports (used by downstream scripts)
RAW_JSON = RAW_DIR / "gsc_query_page_last90d_raw.json"
ROW_CSV = NORM_DIR / "gsc_query_page_last90d.csv"
QUERY_AGG_CSV = NORM_DIR / "gsc_query_page_aggregated_queries_last90d.csv"
PAGE_AGG_CSV = NORM_DIR / "gsc_query_page_aggregated_pages_last90d.csv"
SUMMARY_MD = REPORT_DIR / "gsc_query_page_snapshot_last90d.md"


# ── Normalization ────────────────────────────────────────────────────────────

def normalize_query(raw: str) -> str:
    """Conservative: lowercase, trim, collapse whitespace."""
    s = raw.strip().lower()
    return re.sub(r'\s+', ' ', s)


def url_to_route(url: str) -> str:
    """Extract route path from full URL."""
    parsed = urlparse(url)
    path = parsed.path
    if not path.endswith("/"):
        path += "/"
    return path


# ── Classification (reuse keyword_master rules) ─────────────────────────────

THEME_RULES: list[tuple[str, list[str]]] = [
    ("subsidie_vergunning", ["subsidi", "vergunning", "isde", "energielabel"]),
    ("prijs_kosten", ["prijs", "kosten", "kost", "tarief", "goedkoop", "duur", "per m2", "per m\u00b2"]),
    ("materialen", ["eps", "pir", "minerale wol", "rockwool", "polystyreen", "neopor", "xps",
                     "materiaal", "materialen", "isolatieplaat", "isolatieplaten"]),
    ("technical_rc_dikte", ["rc-waarde", "rc waarde", "rd-waarde", "rd waarde", "dikte",
                            "koudebrug", "lambda", "warmtegeleidings"]),
    ("steenstrips", ["steenstrips", "steenstrip", "baksteenstrip"]),
    ("stuc_crepi", ["stuc", "crepi", "sierpleister", "spachtelputz", "pleister",
                    "schilderen", "schilder", "verf"]),
    ("bekleden", ["bekleding", "bekleden", "gevelbekleding", "cladding"]),
    ("offerte", ["offerte", "aanvra", "contact", "bel ", "gratis"]),
    ("core_isolation", ["gevelisolatie", "buitengevelisolatie", "etics", "buitenmuur isol",
                        "gevel isoler", "muurisolatie", "buitenisolatie",
                        "gevel isolatie", "isoleren buitenkant",
                        "buitengevel", "woning isoler", "huis isoler"]),
]

COMMERCIAL_SIGNALS = ["prijs", "kosten", "kost", "offerte", "tarief", "per m2", "per m\u00b2",
                      "goedkoop", "beste", "vergelijk", "aanvragen", "kopen", "bestellen"]
INFORMATIONAL_SIGNALS = ["wat is", "hoe ", "waarom", "verschil", "uitleg",
                         "betekenis", "voordelen", "nadelen", "ervar"]
INVESTIGATIVE_SIGNALS = ["review", "ervaring", "vergelijk", "welke", "soorten", "typen", "materialen"]
NAVIGATIONAL_SIGNALS = ["bm klus", "bmklus", "bm-klus"]


def classify_theme(q: str) -> str:
    q_lower = q.lower()
    for theme, patterns in THEME_RULES:
        for pat in patterns:
            if pat in q_lower:
                return theme
    return "other"


def classify_intent(q: str) -> str:
    q_lower = q.lower()
    if any(s in q_lower for s in NAVIGATIONAL_SIGNALS):
        return "navigational"
    has_commercial = any(s in q_lower for s in COMMERCIAL_SIGNALS)
    has_info = any(s in q_lower for s in INFORMATIONAL_SIGNALS)
    has_invest = any(s in q_lower for s in INVESTIGATIVE_SIGNALS)
    if has_commercial and has_info:
        return "mixed"
    if has_commercial:
        return "commercial"
    if has_invest:
        return "commercial_investigative"
    if has_info:
        return "informational"
    return "commercial_investigative"


# ── Page mapping ─────────────────────────────────────────────────────────────

def build_route_map(pages: list[dict]) -> dict[str, dict]:
    """Map route_path -> page info."""
    return {p["route_path"]: p for p in pages if p.get("route_path")}


def map_gsc_page(url: str, route_map: dict[str, dict]) -> tuple[str, str, str]:
    """Map a GSC page URL to route, page_type, confidence."""
    route = url_to_route(url)
    if route in route_map:
        p = route_map[route]
        return route, p.get("page_type", ""), "high"
    # Try without trailing slash
    route_no_slash = route.rstrip("/") + "/"
    if route_no_slash in route_map:
        p = route_map[route_no_slash]
        return route_no_slash, p.get("page_type", ""), "high"
    return route, "", "low"


# ── Build row-level table ────────────────────────────────────────────────────

def build_row_table(raw_rows: list[dict], route_map: dict[str, dict]) -> list[dict]:
    rows = []
    for r in raw_rows:
        query = r["query"]
        nq = normalize_query(query)
        page = r["page"]
        route, page_type, confidence = map_gsc_page(page, route_map)

        rows.append({
            "query": query,
            "normalized_query": nq,
            "page": page,
            "clicks": r["clicks"],
            "impressions": r["impressions"],
            "ctr": r["ctr"],
            "position": r["position"],
            "query_intent_guess": classify_intent(nq),
            "query_theme_guess": classify_theme(nq),
            "mapped_route_guess": route,
            "mapped_page_type_guess": page_type,
            "mapping_confidence": confidence,
            "notes": "",
        })
    return rows


# ── Aggregated query table ───────────────────────────────────────────────────

def build_query_aggregation(row_table: list[dict]) -> list[dict]:
    agg: dict[str, dict] = {}
    for r in row_table:
        nq = r["normalized_query"]
        if nq not in agg:
            agg[nq] = {
                "query": r["query"],
                "normalized_query": nq,
                "total_clicks": 0,
                "total_impressions": 0,
                "_click_weighted_position": 0.0,
                "_pages": set(),
                "best_position": 999.0,
                "query_intent_guess": r["query_intent_guess"],
                "query_theme_guess": r["query_theme_guess"],
            }
        a = agg[nq]
        a["total_clicks"] += r["clicks"]
        a["total_impressions"] += r["impressions"]
        a["_click_weighted_position"] += r["position"] * r["clicks"]
        a["_pages"].add(r["page"])
        if r["position"] < a["best_position"]:
            a["best_position"] = r["position"]

    result = []
    for nq, a in agg.items():
        total_impr = a["total_impressions"]
        total_clicks = a["total_clicks"]
        weighted_ctr = round(total_clicks / total_impr, 6) if total_impr > 0 else 0.0
        distinct_pages = len(a["_pages"])
        cannibalization = distinct_pages >= 3

        result.append({
            "query": a["query"],
            "normalized_query": nq,
            "total_clicks": total_clicks,
            "total_impressions": total_impr,
            "weighted_ctr": weighted_ctr,
            "best_position_guess": round(a["best_position"], 2),
            "distinct_pages_count": distinct_pages,
            "possible_cannibalization_guess": cannibalization,
            "query_intent_guess": a["query_intent_guess"],
            "query_theme_guess": a["query_theme_guess"],
        })

    result.sort(key=lambda x: x["total_clicks"], reverse=True)
    return result


# ── Aggregated page table ────────────────────────────────────────────────────

def build_page_aggregation(row_table: list[dict]) -> list[dict]:
    agg: dict[str, dict] = {}
    for r in row_table:
        page = r["page"]
        if page not in agg:
            agg[page] = {
                "page": page,
                "total_clicks": 0,
                "total_impressions": 0,
                "_position_sum": 0.0,
                "_position_count": 0,
                "_queries": set(),
                "page_type_guess": r.get("mapped_page_type_guess", ""),
                "route_match_guess": r.get("mapped_route_guess", ""),
            }
        a = agg[page]
        a["total_clicks"] += r["clicks"]
        a["total_impressions"] += r["impressions"]
        a["_position_sum"] += r["position"] * r["impressions"]  # weighted by impressions
        a["_position_count"] += r["impressions"]
        a["_queries"].add(r["normalized_query"])

    result = []
    for page, a in agg.items():
        total_impr = a["total_impressions"]
        total_clicks = a["total_clicks"]
        weighted_ctr = round(total_clicks / total_impr, 6) if total_impr > 0 else 0.0
        avg_position = round(a["_position_sum"] / a["_position_count"], 2) if a["_position_count"] > 0 else 0.0

        result.append({
            "page": page,
            "total_clicks": total_clicks,
            "total_impressions": total_impr,
            "weighted_ctr": weighted_ctr,
            "avg_position": avg_position,
            "distinct_queries_count": len(a["_queries"]),
            "page_type_guess": a["page_type_guess"],
            "route_match_guess": a["route_match_guess"],
        })

    result.sort(key=lambda x: x["total_clicks"], reverse=True)
    return result


# ── Writers ──────────────────────────────────────────────────────────────────

def write_json(data: dict, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False, default=str), encoding="utf-8")


def write_csv_file(rows: list[dict], path: Path) -> None:
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def write_summary(
    raw_data: dict,
    row_table: list[dict],
    query_agg: list[dict],
    page_agg: list[dict],
    path: Path,
) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    dr = raw_data.get("date_range", {})

    # Cannibalization candidates
    cannibs = [q for q in query_agg if q.get("possible_cannibalization_guess")]
    cannibs.sort(key=lambda x: x["total_impressions"], reverse=True)

    # Low CTR / high impression opportunities (pos 4-15, CTR < 5%, impressions > 20)
    striking = [
        q for q in query_agg
        if 4.0 <= q.get("best_position_guess", 0) <= 15.0
        and q.get("weighted_ctr", 0) < 0.05
        and q.get("total_impressions", 0) > 20
    ]
    striking.sort(key=lambda x: x["total_impressions"], reverse=True)

    lines = [
        "# GSC Query/Page Snapshot Summary (last 90 days)",
        "",
        f"**Generated:** {now}",
        f"**Date range:** {dr.get('start', '?')} to {dr.get('end', '?')}",
        f"**Site:** {raw_data.get('site_url', '?')}",
        "",
        "---",
        "",
        "## Overview",
        "",
        "| Metric | Count |",
        "|--------|-------|",
        f"| Total query-page rows | {len(row_table)} |",
        f"| Unique queries | {len(query_agg)} |",
        f"| Unique pages | {len(page_agg)} |",
        f"| Total clicks (all rows) | {sum(r['clicks'] for r in row_table)} |",
        f"| Total impressions (all rows) | {sum(r['impressions'] for r in row_table)} |",
        "",
        "---",
        "",
        "## Top queries by clicks",
        "",
        "| Query | Clicks | Impressions | CTR | Best Pos | Pages |",
        "|-------|--------|-------------|-----|----------|-------|",
    ]
    for q in query_agg[:20]:
        lines.append(
            f"| {q['normalized_query']} | {q['total_clicks']} "
            f"| {q['total_impressions']} | {q['weighted_ctr']:.4f} "
            f"| {q['best_position_guess']:.1f} | {q['distinct_pages_count']} |"
        )

    lines += [
        "",
        "## Top queries by impressions",
        "",
        "| Query | Impressions | Clicks | CTR | Best Pos |",
        "|-------|-------------|--------|-----|----------|",
    ]
    by_impr = sorted(query_agg, key=lambda x: x["total_impressions"], reverse=True)
    for q in by_impr[:20]:
        lines.append(
            f"| {q['normalized_query']} | {q['total_impressions']} "
            f"| {q['total_clicks']} | {q['weighted_ctr']:.4f} "
            f"| {q['best_position_guess']:.1f} |"
        )

    lines += [
        "",
        "---",
        "",
        "## Top pages by clicks",
        "",
        "| Page | Clicks | Impressions | CTR | Avg Pos | Queries | Type |",
        "|------|--------|-------------|-----|---------|---------|------|",
    ]
    for p in page_agg[:20]:
        lines.append(
            f"| {p['route_match_guess'] or p['page']} | {p['total_clicks']} "
            f"| {p['total_impressions']} | {p['weighted_ctr']:.4f} "
            f"| {p['avg_position']:.1f} | {p['distinct_queries_count']} "
            f"| {p['page_type_guess']} |"
        )

    lines += [
        "",
        "## Top pages by impressions",
        "",
        "| Page | Impressions | Clicks | CTR | Avg Pos | Queries |",
        "|------|-------------|--------|-----|---------|---------|",
    ]
    pages_by_impr = sorted(page_agg, key=lambda x: x["total_impressions"], reverse=True)
    for p in pages_by_impr[:20]:
        lines.append(
            f"| {p['route_match_guess'] or p['page']} | {p['total_impressions']} "
            f"| {p['total_clicks']} | {p['weighted_ctr']:.4f} "
            f"| {p['avg_position']:.1f} | {p['distinct_queries_count']} |"
        )

    lines += [
        "",
        "---",
        "",
        f"## Likely cannibalization candidates ({len(cannibs)} queries on 3+ pages)",
        "",
    ]
    if cannibs:
        lines.append("| Query | Impressions | Clicks | Pages |")
        lines.append("|-------|-------------|--------|-------|")
        for q in cannibs[:20]:
            lines.append(
                f"| {q['normalized_query']} | {q['total_impressions']} "
                f"| {q['total_clicks']} | {q['distinct_pages_count']} |"
            )
    else:
        lines.append("No queries found on 3+ pages.")

    lines += [
        "",
        f"## Low-CTR / high-impression opportunities ({len(striking)} queries)",
        "",
        "Queries in striking distance (position 4-15) with CTR < 5% and 20+ impressions.",
        "",
    ]
    if striking:
        lines.append("| Query | Impressions | Clicks | CTR | Best Pos | Theme |")
        lines.append("|-------|-------------|--------|-----|----------|-------|")
        for q in striking[:20]:
            lines.append(
                f"| {q['normalized_query']} | {q['total_impressions']} "
                f"| {q['total_clicks']} | {q['weighted_ctr']:.4f} "
                f"| {q['best_position_guess']:.1f} | {q['query_theme_guess']} |"
            )
    else:
        lines.append("No striking-distance opportunities found.")

    # Theme distribution in queries
    from collections import Counter
    theme_dist = Counter(q["query_theme_guess"] for q in query_agg)
    intent_dist = Counter(q["query_intent_guess"] for q in query_agg)

    lines += [
        "",
        "---",
        "",
        "## Query theme distribution",
        "",
        "| Theme | Queries |",
        "|-------|---------|",
    ]
    for theme, count in sorted(theme_dist.items(), key=lambda x: -x[1]):
        lines.append(f"| {theme} | {count} |")

    lines += [
        "",
        "## Query intent distribution",
        "",
        "| Intent | Queries |",
        "|--------|---------|",
    ]
    for intent, count in sorted(intent_dist.items(), key=lambda x: -x[1]):
        lines.append(f"| {intent} | {count} |")

    lines += [
        "",
        "---",
        "",
        "## Limitations (v1)",
        "",
        "1. **Dimensions:** query + page only; no device or country breakdown",
        "2. **Date range:** last 90 days (minus 3-day GSC lag)",
        "3. **Row limit:** GSC API returns max 25,000 rows per request; pagination used",
        "4. **Sampling:** GSC data is sampled for properties with high traffic",
        "5. **Theme/intent classifiers:** simple keyword-pattern rules, not ML",
        "6. **Cannibalization:** defined as 3+ pages for same query; may include false positives",
        "7. **Page mapping:** based on page_inventory route index; external URLs not mapped",
        "8. **No comparison period:** this is a single snapshot; no period-over-period delta",
        "",
        "---",
        "",
        "## Output files",
        "",
        "| File | Path |",
        "|------|------|",
        "| Raw JSON | `seo-ops/snapshots/raw/gsc/gsc_query_page_last90d_raw.json` |",
        "| Row-level CSV | `seo-ops/snapshots/normalized/seo/gsc_query_page_last90d.csv` |",
        "| Aggregated queries | `seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv` |",
        "| Aggregated pages | `seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv` |",
        "| Summary (this file) | `seo-ops/reports/seo/gsc_query_page_snapshot_last90d.md` |",
    ]

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    import argparse
    parser = argparse.ArgumentParser(description="Build GSC query/page snapshot")
    parser.add_argument("--days", type=int, default=90,
                        help="Window size in days (default: 90, recommended recent: 28)")
    args = parser.parse_args()
    days = args.days

    paths = _output_paths(days)
    print(f"Building GSC query/page snapshot (last {days} days)...")

    # 1. Pull raw data
    print("  Pulling from GSC API...")
    raw_data = pull_query_page_data(days=days)
    raw_rows = raw_data["rows"]
    print(f"  Pulled {len(raw_rows)} query-page rows")
    print(f"  Date range: {raw_data['date_range']['start']} to {raw_data['date_range']['end']}")

    # 2. Save raw JSON
    write_json(raw_data, paths["raw_json"])
    print(f"  Raw JSON -> {paths['raw_json']}")

    # 3. Load page inventory for mapping
    pages = load_page_inventory()
    route_map = build_route_map(pages)
    print(f"  Page inventory: {len(pages)} pages loaded")

    # 4. Build row-level table
    row_table = build_row_table(raw_rows, route_map)
    write_csv_file(row_table, paths["row_csv"])
    print(f"  Row CSV -> {paths['row_csv']} ({len(row_table)} rows)")

    # 5. Build aggregated query table
    query_agg = build_query_aggregation(row_table)
    write_csv_file(query_agg, paths["query_agg_csv"])
    print(f"  Query agg CSV -> {paths['query_agg_csv']} ({len(query_agg)} queries)")

    # 6. Build aggregated page table
    page_agg = build_page_aggregation(row_table)
    write_csv_file(page_agg, paths["page_agg_csv"])
    print(f"  Page agg CSV -> {paths['page_agg_csv']} ({len(page_agg)} pages)")

    # 7. Write summary
    write_summary(raw_data, row_table, query_agg, page_agg, paths["summary_md"])
    print(f"  Summary -> {paths['summary_md']}")

    # Quick stats
    total_clicks = sum(r["clicks"] for r in row_table)
    total_impressions = sum(r["impressions"] for r in row_table)
    print(f"\n  Total clicks: {total_clicks}")
    print(f"  Total impressions: {total_impressions}")
    print(f"  Unique queries: {len(query_agg)}")
    print(f"  Unique pages: {len(page_agg)}")

    cannibs = sum(1 for q in query_agg if q.get("possible_cannibalization_guess"))
    print(f"  Cannibalization candidates: {cannibs}")

    print("\n  Done.")


if __name__ == "__main__":
    main()
