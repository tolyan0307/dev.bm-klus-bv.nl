"""
run_legacy_indexation_review_v1.py -- Legacy / indexation cleanup review.

Identifies legacy, disabled, unmapped, and suspicious URLs still receiving
impressions or sessions, and recommends manual cleanup actions.

READ-ONLY: does not modify any site pages or server config.

Usage:
    python seo-ops/analyzers/seo/run_legacy_indexation_review_v1.py
"""

from __future__ import annotations

import csv
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Windows UTF-8 stdout
# ---------------------------------------------------------------------------
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
elif sys.stdout and sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(
        sys.stdout.buffer, encoding="utf-8", errors="replace"
    )

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[3]
SEO_OPS = PROJECT_ROOT / "seo-ops"

# Inputs
PAGE_INV_CSV = SEO_OPS / "snapshots/normalized/pages/page_inventory_v1.csv"
GSC_PAGES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv"
GA4_LANDING_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_last90d.csv"
GA4_CHANNEL_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv"

# Outputs
REPORT_MD = SEO_OPS / "reports/seo/legacy_indexation_review_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs/legacy_indexation_review_v1.json"
OUTPUT_CSV = SEO_OPS / "outputs/legacy_indexation_candidates_v1.csv"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        print(f"  WARN: {path.name} not found")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _sf(v, d=0.0) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def _si(v, d=0) -> int:
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return d


def _sb(v) -> bool:
    if isinstance(v, bool):
        return v
    return str(v).strip().lower() in ("true", "1", "yes")


def _normalize_path(url: str) -> str:
    """Extract path from full URL and ensure trailing slash for non-file paths."""
    p = url.strip()
    if p.startswith("http"):
        # Remove scheme + host: https://host/path → /path
        try:
            from urllib.parse import urlparse
            p = urlparse(p).path
        except Exception:
            p = "/" + p.split("/", 3)[-1] if p.count("/") >= 3 else "/"
    if not p or p == "/":
        return "/"
    p = p.rstrip("/")
    # Don't add trailing slash to file-like paths
    if "." in p.split("/")[-1]:
        return p
    return p + "/"


# ---------------------------------------------------------------------------
# Load
# ---------------------------------------------------------------------------

def load_all() -> dict:
    print("Loading sources...")
    d = {
        "page_inv": _load_csv(PAGE_INV_CSV),
        "gsc_pages": _load_csv(GSC_PAGES_CSV),
        "ga4_landing": _load_csv(GA4_LANDING_CSV),
        "ga4_channel": _load_csv(GA4_CHANNEL_CSV),
    }
    for k, v in d.items():
        print(f"  {k}: {len(v)} rows")
    return d


# ---------------------------------------------------------------------------
# Build unified URL map
# ---------------------------------------------------------------------------

def build_url_map(data: dict) -> list[dict]:
    """Merge all URLs from page_inventory, GSC, and GA4 into one list."""

    # 1. Page inventory routes
    inv_routes: dict[str, dict] = {}
    for row in data["page_inv"]:
        route = row.get("route_path", "").strip()
        if route:
            inv_routes[route] = row

    # 2. GSC pages → normalized paths
    gsc_map: dict[str, dict] = {}
    for row in data["gsc_pages"]:
        raw = row.get("page", "").strip()
        if not raw:
            continue
        norm = _normalize_path(raw)
        gsc_map[norm] = row

    # 3. GA4 landing pages → normalized paths
    ga4_map: dict[str, dict] = {}
    for row in data["ga4_landing"]:
        norm = row.get("normalized_path", "").strip()
        if not norm or norm == "(not set)":
            continue
        ga4_map[norm] = row

    # Collect all unique paths
    all_paths = set()
    all_paths.update(inv_routes.keys())
    all_paths.update(gsc_map.keys())
    all_paths.update(ga4_map.keys())

    # Also add (not set) GA4 entry as special case
    ga4_not_set = None
    for row in data["ga4_landing"]:
        if row.get("normalized_path", "").strip() == "(not set)":
            ga4_not_set = row
            break

    candidates = []
    for path in sorted(all_paths):
        inv_row = inv_routes.get(path)
        gsc_row = gsc_map.get(path)
        ga4_row = ga4_map.get(path)

        entry = {
            "url": path,
            "normalized_path": path,
            "in_page_inventory": inv_row is not None,
            "page_inventory_route": path if inv_row else "",
            "page_type_guess": "",
            "is_indexable_guess": "",
            "gsc_impressions": 0,
            "gsc_clicks": 0,
            "gsc_position": 0.0,
            "ga4_sessions": 0,
            "ga4_engaged_sessions": 0,
            "ga4_key_events": 0,
            "issue_category": "",
            "severity_guess": "",
            "recommended_manual_action": "",
            "confidence": "",
            "notes": "",
        }

        if inv_row:
            entry["page_type_guess"] = inv_row.get("page_type", "")
            entry["is_indexable_guess"] = inv_row.get("is_indexable_guess", "")

        if gsc_row:
            entry["gsc_impressions"] = _si(gsc_row.get("total_impressions"))
            entry["gsc_clicks"] = _si(gsc_row.get("total_clicks"))
            entry["gsc_position"] = round(_sf(gsc_row.get("avg_position")), 1)

        if ga4_row:
            entry["ga4_sessions"] = _si(ga4_row.get("sessions"))
            entry["ga4_engaged_sessions"] = _si(ga4_row.get("engaged_sessions"))
            entry["ga4_key_events"] = _si(ga4_row.get("key_events"))

        candidates.append(entry)

    # Add (not set) entry
    if ga4_not_set:
        candidates.append({
            "url": "(not set)",
            "normalized_path": "(not set)",
            "in_page_inventory": False,
            "page_inventory_route": "",
            "page_type_guess": "",
            "is_indexable_guess": "",
            "gsc_impressions": 0,
            "gsc_clicks": 0,
            "gsc_position": 0.0,
            "ga4_sessions": _si(ga4_not_set.get("sessions")),
            "ga4_engaged_sessions": _si(ga4_not_set.get("engaged_sessions")),
            "ga4_key_events": _si(ga4_not_set.get("key_events")),
            "issue_category": "measurement_issue",
            "severity_guess": "medium",
            "recommended_manual_action": "Investigate GA4 (not set) landing pages — likely missing page_location or referrer",
            "confidence": "high",
            "notes": "GA4 (not set) — 84 sessions with almost no engagement; likely bot or misconfigured tracking",
        })

    return candidates


# ---------------------------------------------------------------------------
# Classify candidates
# ---------------------------------------------------------------------------

# Patterns
RE_UNDERSCORE_SLUG = re.compile(r"/[a-z]+_[a-z]+/")
RE_EMOJI = re.compile(r"[^\x00-\x7F]")
RE_OBJECT_SLUG = re.compile(r"^/object\d+/$")
RE_OLD_PROJECT_ROOT = re.compile(
    r"^/(?:gevelisolatie|buitenstucwerk|vlaardingen|muren-stucen)-"
    r"(?:woning-)?[a-z]"
)
RE_WP_CONTENT = re.compile(r"^/wp-content/")
RE_IMAGE_FILE = re.compile(r"^/images/")
RE_DOUBLE_SLASH = re.compile(r"^//")
RE_YEAR_SUFFIX = re.compile(r"-20\d{2}/$")
RE_ONZE_WERKEN_PROJECT = re.compile(r"^/onze-werken/[a-z]")
RE_MUREN_STUCEN_VARIANT = re.compile(r"^/muren-stucen-\d+/$")


def _find_likely_redirect_target(path: str, inv_routes: set[str]) -> str:
    """Try to find a plausible current equivalent for a legacy URL."""

    # /over_ons/ → /over-ons/
    dash_variant = path.replace("_", "-")
    if dash_variant in inv_routes:
        return dash_variant

    # /muren-stucen-2/ → /muren-stucen/
    base = RE_MUREN_STUCEN_VARIANT.sub("/muren-stucen/", path)
    if base != path and base in inv_routes:
        return base

    # Old project slug at root → match to /onze-werken/ equivalent by keyword overlap
    # e.g. /gevelisolatie-woning-almere-35m2-sierpleister/ → /onze-werken/almere-...-2024/
    if not path.startswith("/onze-werken/") and not path.startswith("/gevelisolatie/"):
        slug_words = set(path.strip("/").split("-"))
        best_match = ""
        best_score = 0
        for route in inv_routes:
            if route.startswith("/onze-werken/") and route != "/onze-werken/":
                route_words = set(route.strip("/").replace("onze-werken/", "").split("-"))
                overlap = len(slug_words & route_words)
                if overlap > best_score:
                    best_score = overlap
                    best_match = route
        if best_score >= 2:
            return best_match

    # Old-year project in /onze-werken/ → check for newer year variant
    # e.g. /onze-werken/bruinisse-...-2024/ → /onze-werken/bruinisse-...-2025/
    if path.startswith("/onze-werken/") and RE_YEAR_SUFFIX.search(path):
        base_no_year = RE_YEAR_SUFFIX.sub("", path)
        for route in inv_routes:
            if route.startswith(base_no_year) and route != path:
                return route

    return ""


def classify_candidates(candidates: list[dict], inv_routes: set[str]) -> list[dict]:
    """Assign issue_category, severity, and recommended action to each candidate."""

    for c in candidates:
        path = c["normalized_path"]
        in_inv = c["in_page_inventory"]
        is_indexable = _sb(c["is_indexable_guess"]) if c["is_indexable_guess"] else None
        gsc_impr = c["gsc_impressions"]
        gsc_clicks = c["gsc_clicks"]
        ga4_sess = c["ga4_sessions"]
        ga4_events = c["ga4_key_events"]
        total_signal = gsc_impr + ga4_sess

        # Already classified (e.g. not set)
        if c["issue_category"]:
            continue

        # --- Skip: in inventory, indexable, no issues ---
        if in_inv and is_indexable is True:
            c["issue_category"] = "ok"
            continue

        # --- Disabled page receiving traffic ---
        if in_inv and is_indexable is False and total_signal > 0:
            c["issue_category"] = "disabled_page_receiving_traffic"
            c["severity_guess"] = "high" if gsc_impr >= 100 else "medium"
            c["recommended_manual_action"] = (
                "Review noindex/canonical status; if page is intentionally disabled, "
                "ensure proper noindex tag or 301 redirect to parent"
            )
            c["confidence"] = "high"
            target = ""
            if "/onze-werken/" in path:
                target = "/onze-werken/"
            c["notes"] = (
                f"Page exists in inventory but is_indexable=False; "
                f"still gets {gsc_impr} GSC impressions + {ga4_sess} GA4 sessions"
            )
            if target:
                c["notes"] += f"; consider redirect to {target}"
            continue

        # --- In inventory, disabled, no traffic: just flag ---
        if in_inv and is_indexable is False:
            c["issue_category"] = "ok_disabled_no_traffic"
            continue

        # --- NOT in inventory: external/legacy URL analysis ---

        # Emoji URLs
        if RE_EMOJI.search(path):
            c["issue_category"] = "suspicious_slug"
            c["severity_guess"] = "low"
            c["recommended_manual_action"] = "Investigate source of emoji URLs; likely bot/spam traffic — monitor only"
            c["confidence"] = "medium"
            c["notes"] = f"Emoji characters in URL; {ga4_sess} GA4 sessions, likely not real user traffic"
            continue

        # WordPress legacy
        if RE_WP_CONTENT.search(path):
            c["issue_category"] = "legacy_url"
            c["severity_guess"] = "low"
            c["recommended_manual_action"] = "Ignore if site is no longer WordPress; will naturally drop from index"
            c["confidence"] = "high"
            c["notes"] = "WordPress legacy wp-content path; 1 GSC impression, harmless"
            continue

        # Image URLs indexed
        if RE_IMAGE_FILE.search(path) or path.endswith((".webp", ".jpg", ".png")):
            c["issue_category"] = "likely_old_utility_slug"
            c["severity_guess"] = "low"
            c["recommended_manual_action"] = "No action needed unless images are showing in web search results"
            c["confidence"] = "high"
            c["notes"] = "Image file URL in GSC index; not a page"
            continue

        # Double-slash malformed
        if RE_DOUBLE_SLASH.match(path):
            c["issue_category"] = "suspicious_slug"
            c["severity_guess"] = "low"
            c["recommended_manual_action"] = "Check server/CDN config for double-slash URL normalization"
            c["confidence"] = "medium"
            clean = path.replace("//", "/")
            c["notes"] = f"Double-slash URL; likely should be {clean}"
            continue

        # Object slugs (old project stubs)
        if RE_OBJECT_SLUG.match(path):
            c["issue_category"] = "likely_old_project_slug"
            c["severity_guess"] = "low" if total_signal < 10 else "medium"
            c["recommended_manual_action"] = "Review if these are legacy project stubs; redirect to /onze-werken/ if so"
            c["confidence"] = "medium"
            c["notes"] = f"Old object slug pattern; {ga4_sess} GA4 sessions"
            continue

        # Underscore variant (e.g. /over_ons/ vs /over-ons/)
        if RE_UNDERSCORE_SLUG.search(path):
            target = _find_likely_redirect_target(path, inv_routes)
            c["issue_category"] = "possible_redirect_candidate"
            c["severity_guess"] = "high" if gsc_impr >= 50 else "medium"
            c["recommended_manual_action"] = f"301 redirect to {target}" if target else "Find current equivalent and 301 redirect"
            c["confidence"] = "high" if target else "medium"
            c["notes"] = (
                f"Underscore slug variant; {gsc_impr} GSC impressions, {ga4_sess} GA4 sessions"
            )
            if target:
                c["notes"] += f"; current equivalent: {target}"
            continue

        # muren-stucen-2 variant
        if RE_MUREN_STUCEN_VARIANT.match(path):
            target = _find_likely_redirect_target(path, inv_routes)
            c["issue_category"] = "possible_redirect_candidate"
            c["severity_guess"] = "medium"
            c["recommended_manual_action"] = f"301 redirect to {target}" if target else "Review and redirect to /muren-stucen/"
            c["confidence"] = "high"
            c["notes"] = f"Numbered duplicate slug; {gsc_impr} GSC impr, {ga4_sess} GA4 sessions"
            if target:
                c["notes"] += f"; target: {target}"
            continue

        # Truncated /onze-werken/ path (e.g. /onze-werken/nieuw-/)
        if path.startswith("/onze-werken/") and len(path.strip("/").split("/")) >= 2:
            slug_part = path.strip("/").split("/", 1)[1]
            if len(slug_part) < 10 and not any(c.isdigit() for c in slug_part):
                c["issue_category"] = "suspicious_slug"
                c["severity_guess"] = "low"
                c["recommended_manual_action"] = "Investigate truncated URL; likely a partial/broken link"
                c["confidence"] = "medium"
                c["notes"] = f"Truncated project URL; {ga4_sess} GA4 sessions"
                continue

        # Old-year project in /onze-werken/ (e.g. 2024 when 2025 exists)
        if path.startswith("/onze-werken/") and RE_YEAR_SUFFIX.search(path):
            target = _find_likely_redirect_target(path, inv_routes)
            if target:
                c["issue_category"] = "possible_redirect_candidate"
                c["severity_guess"] = "low"
                c["recommended_manual_action"] = f"301 redirect to updated version: {target}"
                c["confidence"] = "medium"
                c["notes"] = (
                    f"Old year variant; newer version exists at {target}; "
                    f"{ga4_sess} GA4 sessions"
                )
                continue

        # Old project slug at root level (not under /onze-werken/)
        if not path.startswith("/onze-werken/") and not path.startswith("/gevelisolatie/") and (
            RE_OLD_PROJECT_ROOT.match(path)
        ):
            target = _find_likely_redirect_target(path, inv_routes)
            c["issue_category"] = "likely_old_project_slug"
            c["severity_guess"] = "high" if gsc_impr >= 100 else "medium"
            c["recommended_manual_action"] = (
                f"301 redirect to {target}" if target
                else "Review and redirect to /onze-werken/ or relevant current page"
            )
            c["confidence"] = "medium" if target else "low"
            c["notes"] = (
                f"Root-level project slug (should be under /onze-werken/); "
                f"{gsc_impr} GSC impressions, {ga4_sess} GA4 sessions"
            )
            if target:
                c["notes"] += f"; likely target: {target}"
            continue

        # /onze-werken/ project not in inventory but in GA4/GSC
        if path.startswith("/onze-werken/") and total_signal > 0:
            c["issue_category"] = "unmapped_url"
            c["severity_guess"] = "low"
            c["recommended_manual_action"] = "Check if project page was removed or renamed; redirect if old version"
            c["confidence"] = "low"
            c["notes"] = f"Project URL not in page_inventory; {ga4_sess} GA4 sessions, {gsc_impr} GSC impressions"
            continue

        # Catch-all: unmapped URL with signal
        if not in_inv and total_signal > 0:
            c["issue_category"] = "unmapped_url"
            c["severity_guess"] = "low" if total_signal < 5 else "medium"
            c["recommended_manual_action"] = "Investigate origin; redirect or noindex as appropriate"
            c["confidence"] = "low"
            c["notes"] = f"URL not in page_inventory; {gsc_impr} GSC impressions, {ga4_sess} GA4 sessions"
            continue

        # No signal, not in inventory — ignore
        if not in_inv and total_signal == 0:
            c["issue_category"] = "ok_no_signal"
            continue

    return candidates


# ---------------------------------------------------------------------------
# Build action buckets
# ---------------------------------------------------------------------------

def build_action_buckets(candidates: list[dict]) -> dict:
    """Group candidates into do_now / monitor / do_later."""
    do_now = []
    monitor = []
    do_later = []

    for c in candidates:
        cat = c["issue_category"]
        if cat.startswith("ok"):
            continue

        item = {
            "url": c["url"],
            "issue_category": cat,
            "severity_guess": c["severity_guess"],
            "gsc_impressions": c["gsc_impressions"],
            "ga4_sessions": c["ga4_sessions"],
            "recommended_manual_action": c["recommended_manual_action"],
            "confidence": c["confidence"],
            "notes": c["notes"],
        }

        sev = c["severity_guess"]
        total = c["gsc_impressions"] + c["ga4_sessions"]

        if sev == "high" or (cat == "possible_redirect_candidate" and total >= 10):
            do_now.append(item)
        elif sev == "medium" or total >= 5:
            monitor.append(item)
        else:
            do_later.append(item)

    # Sort each bucket by total signal descending
    for bucket in (do_now, monitor, do_later):
        bucket.sort(key=lambda x: x["gsc_impressions"] + x["ga4_sessions"], reverse=True)

    return {"do_now": do_now, "monitor": monitor, "do_later": do_later}


# ---------------------------------------------------------------------------
# Build summary stats
# ---------------------------------------------------------------------------

def build_summary(candidates: list[dict], buckets: dict) -> dict:
    total_urls = len(candidates)
    ok_count = sum(1 for c in candidates if c["issue_category"].startswith("ok"))
    issue_count = total_urls - ok_count

    category_counts: dict[str, int] = {}
    for c in candidates:
        cat = c["issue_category"]
        if cat.startswith("ok"):
            continue
        category_counts[cat] = category_counts.get(cat, 0) + 1

    # Total wasted impressions (impressions on non-ok URLs)
    wasted_impressions = sum(
        c["gsc_impressions"] for c in candidates if not c["issue_category"].startswith("ok")
    )
    wasted_sessions = sum(
        c["ga4_sessions"] for c in candidates if not c["issue_category"].startswith("ok")
    )

    return {
        "total_urls_analyzed": total_urls,
        "ok_urls": ok_count,
        "issue_urls": issue_count,
        "category_counts": category_counts,
        "wasted_gsc_impressions": wasted_impressions,
        "wasted_ga4_sessions": wasted_sessions,
        "do_now_count": len(buckets["do_now"]),
        "monitor_count": len(buckets["monitor"]),
        "do_later_count": len(buckets["do_later"]),
    }


# ---------------------------------------------------------------------------
# Write markdown report
# ---------------------------------------------------------------------------

def write_report(candidates: list[dict], buckets: dict, summary: dict) -> None:
    lines: list[str] = []
    w = lines.append

    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    w(f"# Legacy / Indexation Review v1")
    w(f"")
    w(f"**Generated:** {ts}")
    w(f"**Scope:** All URLs appearing in page_inventory, GSC (last 90d), or GA4 (last 90d)")
    w(f"**Status:** Recommendation-only — no changes applied")
    w("")

    # --- Section 1: Executive Summary ---
    w("## 1. Executive Summary")
    w("")
    w(f"- **URLs analyzed:** {summary['total_urls_analyzed']}")
    w(f"- **OK (no action):** {summary['ok_urls']}")
    w(f"- **Issues found:** {summary['issue_urls']}")
    w(f"- **GSC impressions on issue URLs:** {summary['wasted_gsc_impressions']:,}")
    w(f"- **GA4 sessions on issue URLs:** {summary['wasted_ga4_sessions']:,}")
    w("")

    # Severity assessment
    if summary["do_now_count"] == 0:
        w("**Overall severity: LOW** — no critical legacy/indexation issues detected.")
    elif summary["do_now_count"] <= 3:
        w("**Overall severity: MODERATE** — a few legacy URLs need attention, primarily redirect candidates.")
    else:
        w("**Overall severity: HIGH** — multiple legacy URLs receiving significant impressions/traffic.")
    w("")

    # Top risk
    all_issues = [c for c in candidates if not c["issue_category"].startswith("ok")]
    if all_issues:
        top_by_impr = max(all_issues, key=lambda c: c["gsc_impressions"])
        if top_by_impr["gsc_impressions"] > 0:
            w(f"**Biggest risk:** `{top_by_impr['url']}` — {top_by_impr['gsc_impressions']:,} GSC impressions "
              f"on a {top_by_impr['issue_category'].replace('_', ' ')} URL.")
            w("")
        top_by_sess = max(all_issues, key=lambda c: c["ga4_sessions"])
        if top_by_sess["ga4_sessions"] > 0 and top_by_sess["url"] != top_by_impr["url"]:
            w(f"**Top traffic leak:** `{top_by_sess['url']}` — {top_by_sess['ga4_sessions']} GA4 sessions "
              f"({top_by_sess['issue_category'].replace('_', ' ')}).")
            w("")

    w("**Category breakdown:**")
    w("")
    w("| Category | Count |")
    w("|----------|-------|")
    for cat, count in sorted(summary["category_counts"].items(), key=lambda x: -x[1]):
        w(f"| {cat} | {count} |")
    w("")

    # --- Section 2: Legacy/Unmapped URL Findings ---
    w("## 2. Legacy / Unmapped URL Findings")
    w("")

    # Top URLs by GSC impressions
    impr_issues = sorted(
        [c for c in all_issues if c["gsc_impressions"] > 0],
        key=lambda c: -c["gsc_impressions"]
    )
    if impr_issues:
        w("### Top issue URLs by GSC impressions")
        w("")
        w("| URL | GSC Impr | GSC Clicks | Category | Severity |")
        w("|-----|----------|------------|----------|----------|")
        for c in impr_issues[:15]:
            w(f"| `{c['url']}` | {c['gsc_impressions']:,} | {c['gsc_clicks']} | {c['issue_category']} | {c['severity_guess']} |")
        w("")

    # Top URLs by GA4 sessions
    sess_issues = sorted(
        [c for c in all_issues if c["ga4_sessions"] > 0],
        key=lambda c: -c["ga4_sessions"]
    )
    if sess_issues:
        w("### Top issue URLs by GA4 sessions")
        w("")
        w("| URL | Sessions | Engaged | Key Events | Category |")
        w("|-----|----------|---------|------------|----------|")
        for c in sess_issues[:15]:
            w(f"| `{c['url']}` | {c['ga4_sessions']} | {c['ga4_engaged_sessions']} | {c['ga4_key_events']} | {c['issue_category']} |")
        w("")

    # URLs in both GSC and GA4 but not in inventory
    both_not_inv = [
        c for c in all_issues
        if not c["in_page_inventory"] and c["gsc_impressions"] > 0 and c["ga4_sessions"] > 0
    ]
    if both_not_inv:
        w("### URLs in both GSC and GA4 but absent from page_inventory")
        w("")
        w("These are the strongest legacy/orphan signals — pages that are both indexed and receiving real visits.")
        w("")
        w("| URL | GSC Impr | GA4 Sessions | Category |")
        w("|-----|----------|--------------|----------|")
        for c in sorted(both_not_inv, key=lambda x: -(x["gsc_impressions"] + x["ga4_sessions"])):
            w(f"| `{c['url']}` | {c['gsc_impressions']:,} | {c['ga4_sessions']} | {c['issue_category']} |")
        w("")

    # Disabled pages still active
    disabled_active = [c for c in candidates if c["issue_category"] == "disabled_page_receiving_traffic"]
    if disabled_active:
        w("### Disabled pages still receiving traffic")
        w("")
        w("| URL | is_indexable | GSC Impr | GA4 Sessions | Page Type |")
        w("|-----|-------------|----------|--------------|-----------|")
        for c in disabled_active:
            w(f"| `{c['url']}` | {c['is_indexable_guess']} | {c['gsc_impressions']:,} | {c['ga4_sessions']} | {c['page_type_guess']} |")
        w("")

    # --- Section 3: Action Buckets ---
    w("## 3. Recommended Action Buckets")
    w("")

    # Group by action type
    redirect_candidates = [c for c in all_issues if "redirect" in c["issue_category"]]
    noindex_candidates = [c for c in all_issues if c["issue_category"] == "disabled_page_receiving_traffic"]
    monitor_candidates = [
        c for c in all_issues
        if c["issue_category"] in ("suspicious_slug", "measurement_issue", "likely_old_utility_slug")
    ]

    if redirect_candidates:
        w("### Review for 301 redirect")
        w("")
        for c in sorted(redirect_candidates, key=lambda x: -(x["gsc_impressions"] + x["ga4_sessions"])):
            w(f"- `{c['url']}` — {c['notes']}")
        w("")

    if noindex_candidates:
        w("### Review for noindex / deindex cleanup")
        w("")
        for c in noindex_candidates:
            w(f"- `{c['url']}` — {c['notes']}")
        w("")

    legacy_project = [c for c in all_issues if c["issue_category"] == "likely_old_project_slug"]
    if legacy_project:
        w("### Legacy project slugs — review for redirect or removal")
        w("")
        for c in sorted(legacy_project, key=lambda x: -(x["gsc_impressions"] + x["ga4_sessions"])):
            w(f"- `{c['url']}` — {c['notes']}")
        w("")

    if monitor_candidates:
        w("### Monitor only (no immediate action)")
        w("")
        for c in monitor_candidates:
            w(f"- `{c['url']}` — {c['notes']}")
        w("")

    # --- Section 4: Priority Recommendations ---
    w("## 4. Priority Recommendations")
    w("")

    for label, items in [("Do now", buckets["do_now"]), ("Monitor", buckets["monitor"]), ("Do later", buckets["do_later"])]:
        w(f"### {label} ({len(items)})")
        w("")
        if not items:
            w("*None*")
            w("")
            continue
        for item in items:
            w(f"**`{item['url']}`**")
            w(f"- Category: {item['issue_category']}")
            w(f"- Rationale: {item['notes']}")
            w(f"- Action: {item['recommended_manual_action']}")
            w(f"- Confidence: {item['confidence']}")
            risk = "Low" if item["severity_guess"] == "low" else "Medium" if item["severity_guess"] == "medium" else "High"
            w(f"- Risk if ignored: {risk}")
            w("")

    # --- Section 5: Cautions ---
    w("## 5. Cautions")
    w("")
    w("- **Do not delete pages** solely based on low impression/session counts — some pages may be new or seasonal.")
    w("- **Old project slugs at root level** may have external backlinks. Check backlink data before redirecting.")
    w("- **Emoji URLs** are almost certainly not real user traffic — do not waste time investigating deeply.")
    w("- **Disabled pages** (is_indexable=False) may be intentionally disabled for business reasons; verify before changing.")
    w("- **(not set) GA4 entries** are a measurement concern, not a page concern — investigate GA4 tag config, not page structure.")
    w("- **Year variants** of project pages (e.g. 2024 vs 2025) should only be redirected if the old year page is truly removed; "
      "sometimes both are valid portfolio entries.")
    w("- **Confidence ratings are conservative** — 'low' means the signal exists but manual verification is needed before acting.")
    w("- This review uses GSC/GA4 data from the last 90 days. URLs not seen in this window may still exist in the index.")
    w("")

    # Write file
    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"  Report: {REPORT_MD}")


# ---------------------------------------------------------------------------
# Write CSV output
# ---------------------------------------------------------------------------

def write_csv(candidates: list[dict]) -> None:
    # Only output candidates that have issues (not ok*)
    issue_rows = [c for c in candidates if not c["issue_category"].startswith("ok")]

    fieldnames = [
        "url", "normalized_path", "in_page_inventory", "page_inventory_route",
        "page_type_guess", "is_indexable_guess", "gsc_impressions", "gsc_clicks",
        "gsc_position", "ga4_sessions", "ga4_engaged_sessions", "ga4_key_events",
        "issue_category", "severity_guess", "recommended_manual_action",
        "confidence", "notes",
    ]

    OUTPUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_CSV, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        for row in sorted(issue_rows, key=lambda x: -(x["gsc_impressions"] + x["ga4_sessions"])):
            writer.writerow(row)
    print(f"  CSV: {OUTPUT_CSV} ({len(issue_rows)} rows)")


# ---------------------------------------------------------------------------
# Write JSON output
# ---------------------------------------------------------------------------

def write_json(candidates: list[dict], buckets: dict, summary: dict) -> None:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    top_legacy = sorted(
        [c for c in candidates if c["issue_category"] in (
            "likely_old_project_slug", "possible_redirect_candidate", "legacy_url"
        )],
        key=lambda x: -(x["gsc_impressions"] + x["ga4_sessions"])
    )

    disabled_issues = [
        c for c in candidates if c["issue_category"] == "disabled_page_receiving_traffic"
    ]

    unmapped_issues = [
        c for c in candidates if c["issue_category"] == "unmapped_url"
    ]

    output = {
        "generated_at": ts,
        "version": "v1",
        "scope": "all URLs in page_inventory + GSC pages + GA4 landing pages (last 90d)",
        "summary": summary,
        "top_legacy_candidates": [
            {
                "url": c["url"],
                "issue_category": c["issue_category"],
                "gsc_impressions": c["gsc_impressions"],
                "ga4_sessions": c["ga4_sessions"],
                "recommended_manual_action": c["recommended_manual_action"],
                "confidence": c["confidence"],
            }
            for c in top_legacy[:10]
        ],
        "disabled_page_issues": [
            {
                "url": c["url"],
                "page_type": c["page_type_guess"],
                "is_indexable": c["is_indexable_guess"],
                "gsc_impressions": c["gsc_impressions"],
                "ga4_sessions": c["ga4_sessions"],
                "recommended_manual_action": c["recommended_manual_action"],
            }
            for c in disabled_issues
        ],
        "unmapped_url_issues": [
            {
                "url": c["url"],
                "gsc_impressions": c["gsc_impressions"],
                "ga4_sessions": c["ga4_sessions"],
                "recommended_manual_action": c["recommended_manual_action"],
                "confidence": c["confidence"],
            }
            for c in unmapped_issues
        ],
        "do_now": buckets["do_now"],
        "monitor": buckets["monitor"],
        "do_later": buckets["do_later"],
        "limitations": [
            "Only covers URLs seen in GSC/GA4 last 90 days — older indexed URLs not included",
            "Cannot detect URLs indexed but never receiving impressions",
            "Redirect target suggestions are heuristic-based and require manual verification",
            "Does not check actual HTTP status codes or server responses",
            "Does not analyze robots.txt, sitemap.xml, or canonical tags",
            "Backlink data not available — cannot assess redirect value",
            "Year-variant project pages may both be valid; manual judgment needed",
        ],
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(
        json.dumps(output, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print(f"  JSON: {OUTPUT_JSON}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("=" * 60)
    print("Legacy / Indexation Review v1")
    print("=" * 60)

    data = load_all()

    print("\nBuilding URL map...")
    candidates = build_url_map(data)
    print(f"  Total unique URLs: {len(candidates)}")

    # Build inventory route set for classification
    inv_routes = {row.get("route_path", "").strip() for row in data["page_inv"] if row.get("route_path")}

    print("Classifying candidates...")
    candidates = classify_candidates(candidates, inv_routes)

    print("Building action buckets...")
    buckets = build_action_buckets(candidates)

    print("Building summary...")
    summary = build_summary(candidates, buckets)

    print(f"\nResults:")
    print(f"  URLs analyzed: {summary['total_urls_analyzed']}")
    print(f"  OK: {summary['ok_urls']}")
    print(f"  Issues: {summary['issue_urls']}")
    print(f"  Do now: {summary['do_now_count']}")
    print(f"  Monitor: {summary['monitor_count']}")
    print(f"  Do later: {summary['do_later_count']}")
    print(f"  Wasted GSC impressions: {summary['wasted_gsc_impressions']:,}")
    print(f"  Wasted GA4 sessions: {summary['wasted_ga4_sessions']:,}")

    print("\nWriting outputs...")
    write_report(candidates, buckets, summary)
    write_csv(candidates)
    write_json(candidates, buckets, summary)

    print("\nDone.")


if __name__ == "__main__":
    main()
