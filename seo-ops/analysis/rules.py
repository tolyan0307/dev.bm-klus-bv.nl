"""
Simple rule-based analysis engine for SEO / CRO / measurement signals.

No ML, no magic. Conservative confidence levels.
All functions take snapshot sections and return lists of finding dicts.
"""

GEVELISOLATIE_PREFIX = "/gevelisolatie/"

# Thresholds — intentionally conservative
MIN_IMPRESSIONS_FOR_CTR_SIGNAL = 50
LOW_CTR_THRESHOLD = 0.03
STRIKING_DISTANCE_MIN_POS = 4.0
STRIKING_DISTANCE_MAX_POS = 15.0
SIGNIFICANT_DELTA_CLICKS = 5
SIGNIFICANT_DELTA_IMPRESSIONS = 20


def _page_path(url: str) -> str:
    """Extract path from full URL for readability."""
    if "://" in url:
        return "/" + url.split("://", 1)[1].split("/", 1)[-1]
    return url


def _is_gevelisolatie(page: str) -> bool:
    path = _page_path(page)
    return path.startswith(GEVELISOLATIE_PREFIX) or path.rstrip("/") == "/gevelisolatie"


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


# --- SEO opportunities --------------------------------------------------


def seo_opportunities(snapshot: dict) -> list[dict]:
    findings = []

    # 1. Pages in striking distance (pos 4–15) with weak CTR
    top_pages = snapshot.get("gsc_top_pages", {})
    for row in top_pages.get("rows", []):
        keys = row.get("keys", [])
        page = keys[0] if keys else row.get("page", "")
        pos = row.get("position", 0)
        ctr = row.get("ctr", 0)
        impr = row.get("impressions", 0)

        if (
            STRIKING_DISTANCE_MIN_POS <= pos <= STRIKING_DISTANCE_MAX_POS
            and impr >= MIN_IMPRESSIONS_FOR_CTR_SIGNAL
            and ctr < LOW_CTR_THRESHOLD
        ):
            confidence = "medium" if impr >= 100 else "low"
            findings.append(_finding(
                page=_page_path(page),
                query=None,
                signal=f"Position {pos:.1f} with CTR {ctr:.1%} ({impr} impr)",
                why="Striking distance to top 3 but CTR suggests title/description may not match intent",
                confidence=confidence,
                action="Review title tag and meta description for query-intent alignment",
                category="SEO",
            ))

    # 2. Queries with high impressions but low CTR
    top_queries = snapshot.get("gsc_top_queries", {})
    for row in top_queries.get("rows", []):
        keys = row.get("keys", [])
        query = keys[0] if keys else ""
        impr = row.get("impressions", 0)
        ctr = row.get("ctr", 0)

        if impr >= MIN_IMPRESSIONS_FOR_CTR_SIGNAL and ctr < LOW_CTR_THRESHOLD:
            confidence = "medium" if impr >= 200 else "low"
            findings.append(_finding(
                page=None,
                query=query,
                signal=f"{impr} impressions but CTR {ctr:.1%}",
                why="High visibility query not converting to clicks — possible SERP snippet mismatch",
                confidence=confidence,
                action="Check which page ranks for this query; review title/description fit",
                category="SEO",
            ))

    # 3. Pages gaining impressions/clicks (comparison)
    comparison = snapshot.get("gsc_page_comparison", {})
    for row in comparison.get("rows", []):
        page = row.get("page", "")
        dc = row.get("delta_clicks", 0)
        di = row.get("delta_impressions", 0)

        if dc >= SIGNIFICANT_DELTA_CLICKS and di >= SIGNIFICANT_DELTA_IMPRESSIONS:
            findings.append(_finding(
                page=_page_path(page),
                query=None,
                signal=f"Clicks +{dc}, impressions +{di} vs previous period",
                why="Page gaining momentum — opportunity to accelerate with content or internal links",
                confidence="medium",
                action="Review page content freshness; strengthen internal linking to this page",
                category="SEO",
            ))

    return findings


# --- SEO risks -----------------------------------------------------------


def seo_risks(snapshot: dict) -> list[dict]:
    findings = []

    comparison = snapshot.get("gsc_page_comparison", {})
    for row in comparison.get("rows", []):
        page = row.get("page", "")
        dc = row.get("delta_clicks", 0)
        di = row.get("delta_impressions", 0)
        current = row.get("current", {})

        # Only flag pages that had meaningful traffic before
        if dc <= -SIGNIFICANT_DELTA_CLICKS and di <= -SIGNIFICANT_DELTA_IMPRESSIONS:
            prev = row.get("previous", {})
            prev_clicks = prev.get("clicks", 0)
            confidence = "medium" if prev_clicks >= 10 else "low"
            findings.append(_finding(
                page=_page_path(page),
                query=None,
                signal=f"Clicks {dc:+d}, impressions {di:+d} vs previous period",
                why="Page losing organic visibility — may indicate ranking drop or seasonal shift",
                confidence=confidence,
                action="Check GSC for position changes; review if content is still relevant",
                category="SEO",
            ))

    return findings


# --- Measurement issues ---------------------------------------------------


def measurement_issues(snapshot: dict) -> list[dict]:
    findings = []

    # 1. (not set) landing pages in GA4
    ga4_lp = snapshot.get("ga4_landing_pages", {})
    for row in ga4_lp.get("rows", []):
        lp = row.get("landingPagePlusQueryString", "")
        sessions = int(row.get("sessions", 0))
        if lp == "(not set)" and sessions > 10:
            findings.append(_finding(
                page="(not set)",
                query=None,
                signal=f"{sessions} sessions with landing page = (not set)",
                why="GA4 cannot determine the entry page — may distort landing page analysis",
                confidence="high",
                action="Check GA4 data stream configuration; may be internal/app traffic",
                category="Measurement",
            ))

    # 2. Landing pages with sessions but zero key events across all pages
    key_events = snapshot.get("ga4_key_events_by_page", {})
    key_event_rows = key_events.get("rows", [])
    pages_with_events = set()
    for row in key_event_rows:
        lp = row.get("landingPagePlusQueryString", "")
        count = int(row.get("eventCount", 0))
        if count > 0:
            pages_with_events.add(lp)

    if not pages_with_events and ga4_lp.get("row_count", 0) > 0:
        findings.append(_finding(
            page=None,
            query=None,
            signal="Zero key events (Contact_Form_Site/Phone/Whatsapp) across all landing pages",
            why="Either no conversions occurred or key event tracking may not be firing",
            confidence="medium",
            action="Verify key event configuration in GA4; test form submission and phone click tracking",
            category="Measurement",
        ))

    # 3. Suspicious traffic sources
    acq = snapshot.get("ga4_traffic_acquisition", {})
    for row in acq.get("rows", []):
        source = row.get("sessionSourceMedium", "")
        sessions = int(row.get("sessions", 0))
        engagement = float(row.get("engagementRate", 0))

        if sessions >= 10 and engagement < 0.1:
            findings.append(_finding(
                page=None,
                query=None,
                signal=f"Source '{source}': {sessions} sessions, engagement {engagement:.0%}",
                why="Very low engagement may indicate bot traffic or misconfigured referrer",
                confidence="low",
                action="Investigate source in GA4; consider excluding if confirmed noise",
                category="Measurement",
            ))

    return findings


# --- Conversion opportunities --------------------------------------------


def conversion_opportunities(snapshot: dict) -> list[dict]:
    findings = []

    # Pages with sessions but no key events
    ga4_lp = snapshot.get("ga4_landing_pages", {})
    key_events = snapshot.get("ga4_key_events_by_page", {})

    pages_with_events = set()
    for row in key_events.get("rows", []):
        lp = row.get("landingPagePlusQueryString", "")
        count = int(row.get("eventCount", 0))
        if count > 0:
            pages_with_events.add(lp)

    for row in ga4_lp.get("rows", []):
        lp = row.get("landingPagePlusQueryString", "")
        sessions = int(row.get("sessions", 0))

        if lp == "(not set)" or sessions < 10:
            continue

        if lp not in pages_with_events:
            findings.append(_finding(
                page=lp,
                query=None,
                signal=f"{sessions} sessions but 0 key events",
                why="Traffic exists but no lead signal — possible CTA gap or intent mismatch",
                confidence="low" if sessions < 30 else "medium",
                action="Check CTA visibility and relevance on this page; verify event tracking",
                category="CRO",
            ))

    return findings


# --- Gevelisolatie cluster review ----------------------------------------


def gevelisolatie_cluster_notes(snapshot: dict) -> list[dict]:
    """Separate review of /gevelisolatie/ cluster pages across all data."""
    findings = []

    # GSC visibility for cluster pages
    comparison = snapshot.get("gsc_page_comparison", {})
    cluster_pages_found = []

    for row in comparison.get("rows", []):
        page = row.get("page", "")
        if _is_gevelisolatie(page):
            current = row.get("current", {})
            dc = row.get("delta_clicks", 0)
            cluster_pages_found.append(_page_path(page))

            if current.get("impressions", 0) < 10:
                findings.append(_finding(
                    page=_page_path(page),
                    query=None,
                    signal=f"Cluster page with < 10 impressions in current period",
                    why="Strategic cluster page has very weak visibility",
                    confidence="low",
                    action="Check indexation status; review internal linking from parent /gevelisolatie/",
                    category="Cluster",
                ))
            elif dc <= -SIGNIFICANT_DELTA_CLICKS:
                findings.append(_finding(
                    page=_page_path(page),
                    query=None,
                    signal=f"Cluster page lost {abs(dc)} clicks vs previous period",
                    why="Cluster page losing momentum — may need content refresh or link support",
                    confidence="medium",
                    action="Compare query rankings; check for cannibalization within cluster",
                    category="Cluster",
                ))

    # Summary note
    if cluster_pages_found:
        findings.insert(0, _finding(
            page="/gevelisolatie/*",
            query=None,
            signal=f"{len(cluster_pages_found)} cluster pages found in GSC comparison data",
            why="Cluster tracking summary",
            confidence="high",
            action="Review individual cluster page findings below",
            category="Cluster",
        ))

    return findings
