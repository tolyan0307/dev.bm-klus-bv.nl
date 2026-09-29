"""
Rule-based signals for the weekly analysis report — v2 (2026-09-29).

Small-site data (tens of clicks a month) is mostly noise, so every rule has a
volume floor, click changes are compared with a Poisson-style noise band, and
brand queries and navigation pages are left out of snippet rules. Findings are
leads for the analyst to verify, not conclusions (seo-ops/CLAUDE.md,
"Как читать данные"). Thresholds are project heuristics, not industry benchmarks.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path
from urllib.parse import urlsplit

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))  # seo-ops root
from integrations.google_clients.definitions import is_brand_query, is_junk_source  # noqa: E402

GEVELISOLATIE_PREFIX = "/gevelisolatie/"

# Pages that mostly rank for brand / navigation queries: no snippet or CTR rules.
NAVIGATION_PATHS = {"/", "/contact/", "/over-ons/", "/privacybeleid/", "/diensten/", "/onze-werken/"}

MIN_IMPR_SNIPPET = 100          # impressions before judging CTR (page or query)
SNIPPET_MAX_POSITION = 20.0     # beyond this, low CTR is a ranking problem, not a snippet problem
LOW_CTR = 0.01                  # "low" CTR at position <= 20
RELEVANCE_MIN_IMPR = 500        # many impressions at position > 20 -> relevance / intent problem
POSITION_DROP = 2.0             # position worse by at least this ...
POSITION_DROP_MIN_IMPR = 300    # ... on a page with at least this many impressions
LFL_MIN_QUERIES = 5             # like-for-like position needs this many shared queries, else the page average
MIN_EXPECTED_KEY_EVENTS = 3.0   # CRO: zero events is a signal only if >= 3 were expected at the site rate
CLUSTER_LOW_IMPR = 10
DEFAULT_KEY_EVENTS = ["Contact_Form_Site", "Phone", "Whatsapp", "Email"]


def _path(url: str) -> str:
    """'https://bm-klus-bv.nl/gevelisolatie/?x=1' -> '/gevelisolatie/'."""
    if "://" in url:
        return urlsplit(url).path or "/"
    return url.split("?", 1)[0] or "/"


def _is_gevelisolatie(page: str) -> bool:
    path = _path(page)
    return path.startswith(GEVELISOLATIE_PREFIX) or path.rstrip("/") == "/gevelisolatie"


def noise_band(previous: float) -> float:
    """About two standard deviations of a Poisson count: smaller changes are noise."""
    return max(5.0, 2.0 * math.sqrt(previous + 1.0))


def _finding(
    page: str | None,
    query: str | None,
    signal: str,
    why: str,
    confidence: str,
    action: str,
    category: str,
) -> dict:
    f = {
        "signal": signal,
        "why_it_matters": why,
        "confidence": confidence,
        "recommended_action": action,
        "category": category,
    }
    if page:
        f["page"] = page
    if query:
        f["query"] = query
    return f


def _comparison_rows(snapshot: dict) -> list[dict]:
    return snapshot.get("gsc_page_comparison", {}).get("rows", [])


# --- SEO opportunities --------------------------------------------------


def seo_opportunities(snapshot: dict) -> list[dict]:
    findings = []

    for row in _comparison_rows(snapshot):
        path = _path(row.get("page", ""))
        cur = row.get("current", {})
        prev = row.get("previous", {})
        impr = cur.get("impressions", 0)
        pos = cur.get("position", 0)
        ctr = cur.get("ctr", 0)
        clicks = cur.get("clicks", 0)

        if path not in NAVIGATION_PATHS and impr >= MIN_IMPR_SNIPPET:
            if 0 < pos <= SNIPPET_MAX_POSITION and ctr < LOW_CTR:
                findings.append(_finding(
                    page=path,
                    query=None,
                    signal=f"Position {pos:.1f}, CTR {ctr:.1%} ({clicks} clicks / {impr} impressions)",
                    why="Shown in the top 20 but rarely clicked — the title/description may not match the queries it ranks for",
                    confidence="medium" if impr >= 300 else "low",
                    action="Compare the page's top queries (query-level CSV) with its title/description; rewrite the snippet if they diverge",
                    category="SEO",
                ))
            elif pos > SNIPPET_MAX_POSITION and impr >= RELEVANCE_MIN_IMPR:
                findings.append(_finding(
                    page=path,
                    query=None,
                    signal=f"{impr} impressions at average position {pos:.1f} ({clicks} clicks)",
                    why="Google shows the page for many queries but ranks it low — a relevance, intent or authority gap, not a snippet issue",
                    confidence="medium" if impr >= 1000 else "low",
                    action="Check which queries it ranks for and what ranks above it (page-diagnosis skill) before changing the page",
                    category="SEO",
                ))

        prev_clicks = prev.get("clicks", 0)
        dc = row.get("delta_clicks", 0)
        if dc >= noise_band(prev_clicks) and row.get("delta_impressions", 0) > 0:
            findings.append(_finding(
                page=path,
                query=None,
                signal=f"Clicks {prev_clicks} → {clicks} ({dc:+d}), impressions {row.get('delta_impressions', 0):+d}",
                why="Growth beyond the noise band for this volume",
                confidence="medium" if prev_clicks >= 10 else "low",
                action="Check what drove it (decision log, deploy dates, queries); support it with internal links if the growth is non-brand",
                category="SEO",
            ))

    for row in snapshot.get("gsc_top_queries", {}).get("rows", []):
        query = row["keys"][0] if row.get("keys") else ""
        if row.get("is_brand", is_brand_query(query)):
            continue
        impr = row.get("impressions", 0)
        pos = row.get("position", 0)
        ctr = row.get("ctr", 0)
        if impr >= MIN_IMPR_SNIPPET and 0 < pos <= SNIPPET_MAX_POSITION and ctr < LOW_CTR:
            findings.append(_finding(
                page=None,
                query=query,
                signal=f"{impr} impressions at position {pos:.1f}, CTR {ctr:.1%}",
                why="Non-brand query in the top 20 with few clicks — the snippet or SERP features may take the clicks",
                confidence="medium" if impr >= 300 else "low",
                action="Find the ranking page in the query-level CSV and check the live SERP (serp-check) before rewriting the snippet",
                category="SEO",
            ))

    return findings


# --- SEO risks -----------------------------------------------------------


def seo_risks(snapshot: dict) -> list[dict]:
    findings = []

    for row in _comparison_rows(snapshot):
        path = _path(row.get("page", ""))
        cur = row.get("current", {})
        prev = row.get("previous", {})
        prev_clicks = prev.get("clicks", 0)
        dc = row.get("delta_clicks", 0)

        if dc <= -noise_band(prev_clicks):
            findings.append(_finding(
                page=path,
                query=None,
                signal=f"Clicks {prev_clicks} → {cur.get('clicks', 0)} ({dc:+d}), impressions {row.get('delta_impressions', 0):+d}",
                why="Drop beyond the noise band for this volume",
                confidence="medium" if prev_clicks >= 20 else "low",
                action="Check position and query changes for this page and the decision log (recent edits, deploy dates) before acting",
                category="SEO",
            ))

        # Judge ranking changes on like-for-like queries: the page average also moves
        # when deep, click-less impressions come and go (seo-ops/CLAUDE.md).
        cur_pos, prev_pos = cur.get("position", 0), prev.get("position", 0)
        cur_impr = cur.get("impressions", 0)
        lfl = row.get("like_for_like")
        deep = row.get("deep_impressions_share", {})
        if lfl and lfl["queries"] >= LFL_MIN_QUERIES:
            drop = lfl["delta_position"]
            basis = f"Like-for-like position ({lfl['queries']} queries) {lfl['previous_position']:.1f} → {lfl['current_position']:.1f}"
        else:
            drop = cur_pos - prev_pos if cur_pos > 0 and prev_pos > 0 else 0
            basis = f"Average position {prev_pos:.1f} → {cur_pos:.1f} (too few shared queries for like-for-like)"
        if cur_impr >= POSITION_DROP_MIN_IMPR and drop >= POSITION_DROP:
            findings.append(_finding(
                page=path,
                query=None,
                signal=(
                    f"{basis} (higher is worse) on {cur_impr} impressions; page average {prev_pos:.1f} → {cur_pos:.1f}, "
                    f"impressions deeper than 50: {deep.get('previous', 0):.0%} → {deep.get('current', 0):.0%}"
                ),
                why="Rankings got worse on the same queries on a page with meaningful visibility",
                confidence="medium" if cur_impr >= 600 and lfl else "low",
                action="Compare query-level positions for both periods and check for a coinciding title/content change or new sibling page",
                category="SEO",
            ))

    return findings


# --- Measurement issues ---------------------------------------------------


def measurement_issues(snapshot: dict) -> list[dict]:
    findings = []

    ga4_lp = snapshot.get("ga4_landing_pages", {})
    for row in ga4_lp.get("rows", []):
        if row.get("landingPagePlusQueryString", "") == "(not set)":
            sessions = int(row.get("sessions", 0))
            if sessions > 10:
                findings.append(_finding(
                    page="(not set)",
                    query=None,
                    signal=f"{sessions} sessions with landing page = (not set)",
                    why="GA4 cannot tell the entry page for these sessions — landing-page analysis misses them",
                    confidence="medium",
                    action="Treat landing-page shares as approximate; recurring, so no action unless it grows",
                    category="Measurement",
                ))

    key_events = snapshot.get("ga4_key_events_by_page", {})
    tracked = key_events.get("key_events_tracked") or DEFAULT_KEY_EVENTS
    if not any(int(r.get("eventCount", 0)) > 0 for r in key_events.get("rows", [])) and ga4_lp.get("row_count", 0) > 0:
        findings.append(_finding(
            page=None,
            query=None,
            signal=f"Zero key events ({'/'.join(tracked)}) across all landing pages",
            why="Either no leads came in or the key events stopped firing",
            confidence="medium",
            action="Compare with the WP lead log first (ground truth); only then test the GTM triggers",
            category="Measurement",
        ))

    for row in snapshot.get("ga4_traffic_acquisition", {}).get("rows", []):
        source = row.get("sessionSourceMedium", "")
        sessions = int(row.get("sessions", 0))
        engagement = float(row.get("engagementRate", 0))
        if row.get("junk") or is_junk_source(source):
            if sessions >= 3:
                findings.append(_finding(
                    page=None,
                    query=None,
                    signal=f"Source '{source}': {sessions} sessions from a local-dev / hosting-panel referrer",
                    why="Not real visitors — inflates sessions and can add fake key events",
                    confidence="high",
                    action="Exclude in GA4 (owner): Admin → Data streams → Configure tag settings → List unwanted referrals / define internal traffic",
                    category="Measurement",
                ))
        elif sessions >= 10 and engagement < 0.1:
            findings.append(_finding(
                page=None,
                query=None,
                signal=f"Source '{source}': {sessions} sessions, engagement {engagement:.0%}",
                why="Very low engagement may indicate bot traffic or a misconfigured referrer",
                confidence="low",
                action="Investigate the source in GA4; exclude if confirmed noise",
                category="Measurement",
            ))

    return findings


# --- Conversion opportunities --------------------------------------------


def conversion_opportunities(snapshot: dict) -> list[dict]:
    """
    Landing pages with sessions but no key events — flagged only when the
    site-wide rate predicts at least MIN_EXPECTED_KEY_EVENTS for that page.
    """
    sessions_by_page: dict[str, int] = {}
    for row in snapshot.get("ga4_landing_pages", {}).get("rows", []):
        lp = row.get("landingPagePlusQueryString", "")
        if lp == "(not set)":
            continue
        path = _path(lp)
        sessions_by_page[path] = sessions_by_page.get(path, 0) + int(row.get("sessions", 0))

    events_by_page: dict[str, int] = {}
    for row in snapshot.get("ga4_key_events_by_page", {}).get("rows", []):
        lp = row.get("landingPagePlusQueryString", "")
        if lp == "(not set)":
            continue
        path = _path(lp)
        events_by_page[path] = events_by_page.get(path, 0) + int(row.get("eventCount", 0))

    total_sessions = sum(sessions_by_page.values())
    total_events = sum(events_by_page.values())
    if not total_sessions or not total_events:
        return []  # zero events overall is reported under measurement issues
    site_rate = total_events / total_sessions

    findings = []
    for path, sessions in sorted(sessions_by_page.items(), key=lambda kv: kv[1], reverse=True):
        expected = sessions * site_rate
        if events_by_page.get(path, 0) == 0 and expected >= MIN_EXPECTED_KEY_EVENTS:
            findings.append(_finding(
                page=path,
                query=None,
                signal=f"{sessions} sessions, 0 key events (≈{expected:.1f} expected at the site rate {site_rate:.1%})",
                why="No lead signals where the site average predicts several — possible CTA or intent gap (GA4 counts only consented visits)",
                confidence="medium" if expected >= 5 else "low",
                action="Check CTA visibility and intent fit on this page; compare with WP leads for the same landing page",
                category="CRO",
            ))
    return findings


# --- Gevelisolatie cluster review ----------------------------------------


def gevelisolatie_cluster_notes(snapshot: dict) -> list[dict]:
    """Cluster summary, one grouped low-visibility note, drops beyond the noise band."""
    rows = [r for r in _comparison_rows(snapshot) if _is_gevelisolatie(r.get("page", ""))]
    if not rows:
        return []

    def total(period: str, metric: str) -> int:
        return sum(r.get(period, {}).get(metric, 0) for r in rows)

    findings = [_finding(
        page="/gevelisolatie/*",
        query=None,
        signal=(
            f"{len(rows)} cluster pages in GSC data: clicks {total('previous', 'clicks')} → {total('current', 'clicks')}, "
            f"impressions {total('previous', 'impressions')} → {total('current', 'impressions')}"
        ),
        why="Cluster summary (strategic priority)",
        confidence="high",
        action="Review the cluster section of the weekly summary",
        category="Cluster",
    )]

    low = sorted(_path(r["page"]) for r in rows if r.get("current", {}).get("impressions", 0) < CLUSTER_LOW_IMPR)
    if low:
        shown = ", ".join(low[:12]) + (f" and {len(low) - 12} more" if len(low) > 12 else "")
        findings.append(_finding(
            page="/gevelisolatie/* (low visibility)",
            query=None,
            signal=f"{len(low)} pages with < {CLUSTER_LOW_IMPR} impressions: {shown}",
            why="Very weak visibility; for city pages the content decision is pending with the owner (Wave 1 plan)",
            confidence="low",
            action="Spot-check indexation (GSC URL Inspection) for a few of them; no content changes without the owner's decision",
            category="Cluster",
        ))

    for r in rows:
        prev_clicks = r.get("previous", {}).get("clicks", 0)
        dc = r.get("delta_clicks", 0)
        if dc <= -noise_band(prev_clicks):
            findings.append(_finding(
                page=_path(r["page"]),
                query=None,
                signal=f"Cluster page clicks {prev_clicks} → {r.get('current', {}).get('clicks', 0)}",
                why="Drop beyond the noise band",
                confidence="medium" if prev_clicks >= 20 else "low",
                action="Compare query rankings for both periods; check overlap with sibling pages",
                category="Cluster",
            ))

    return findings
