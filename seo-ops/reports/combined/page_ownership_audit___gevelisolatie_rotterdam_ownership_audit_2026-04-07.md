# Page Ownership Audit — gevelisolatie rotterdam

**Date:** 2026-04-07
**Target query:** gevelisolatie rotterdam
**Expected owner page:** /gevelisolatie/rotterdam/
**Report mode:** preliminary

---

## 1. Current SERP state

**GSC aggregated query level** (source: gsc_api, 90d, query-level = best-URL position per query-day):

| Metric | Value |
|--------|-------|
| Clicks | 2 |
| Impressions | 1,369 |
| CTR | 0.15% |
| Query-level position | 8.0 |
| Pages involved | 6 |

> **Aggregation note:** GSC query-level position (8.0) reflects the best-ranking URL per query per day across the 90-day window. It does NOT represent a single page's average position. See row-level breakdown in Section 2.

**DataForSEO SERP snapshot** (source: dataforseo_api, 2026-04-07, desktop, nl/NL — one point-in-time check):

| # | Domain | Title |
|---|--------|-------|
| 4 | ijsselmonde.org | IJsselmonde buitengevelisolatie |
| 5 | www.takkenkamp.com | Isolatie Rotterdam – Gratis advies |
| **6** | **bm-klus-bv.nl** | **Gevelisolatie buitenkant (ETICS) – prijs per m²** |
| 7 | www.mantellum.nl | Mantellum: Home |
| 8 | schotgevelisolatie.nl | Experts in Gevelisolatie en Afwerking |
| 9 | www.metsel-gigant.nl | Gevelisolatie in Rotterdam |
| 13 | www.plusisolatie.nl | Isolatiebedrijf Rotterdam [Reviews 9.5] |

bm-klus-bv.nl ranks at **position 6 (source: dataforseo_api, 2026-04-07, desktop)** in the live snapshot. The ranking URL is `/gevelisolatie/` (service page), not `/gevelisolatie/rotterdam/` (city page). City page is not visible in the top 13.

**CTR gap note:** 0.15% CTR at effective position 6–8 is very low. Likely cause: ads and/or a local pack are absorbing the majority of clicks above organic results. Not an organic-ranking issue.

---

## 2. Internal competition

**GSC row-level data per page** (source: gsc_api, 90d row-level, query = "gevelisolatie rotterdam"):

| Page | Route type | Avg position | Impressions | Clicks | Volume share | Role |
|------|-----------|-------------|-------------|--------|-------------|------|
| /gevelisolatie/ | service | 12.3 | 941 | 1 | 69% | **real owner** |
| / | home | 34.59 | 317 | 1 | 23% | noise |
| /onze-werken/ | archive | 49.24 | 83 | 0 | 6% | passive noise |
| /gevelisolatie/rotterdam/ | city | 53.73 | 26 | 0 | 2% | intended owner (not yet ranking) |
| /onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/ | project | 8.0 | 1 | 0 | <1% | noise (single data point) |
| /gevelisolatie/dordrecht/ | city | 95.0 | 1 | 0 | <1% | deep noise |

> **Row-level positions differ from query-level aggregate.** Each row reflects one URL's average position for this query over 90 days. The query-level aggregate (Section 1) shows best URL per day.

---

## 3. Diagnosis

- **Situation:** owner_page_weakness — the intended owner (/gevelisolatie/rotterdam/) is not yet competitive; service page (/gevelisolatie/) is doing the ranking work by default
- **Severity:** low — no harmful cannibalization; service page is adequately ranking at position 6 (DataForSEO) / 12.3 avg (GSC); city page is weak but not interfering
- **Evidence:**
  - /gevelisolatie/ holds 941 impressions (source: gsc_api, 90d row-level) vs /gevelisolatie/rotterdam/ with only 26 impressions (source: gsc_api, 90d row-level) — gap factor ~36×
  - DataForSEO snapshot confirms /gevelisolatie/ at position 6 (source: dataforseo_api, 2026-04-07); city page absent from top 13
  - /gevelisolatie/rotterdam/ was launched ~2026-03-08 (site cutover); 30 days is insufficient time for a new city page to establish authority
  - No evidence of true cannibalization: city page is not suppressing the service page; service page is the uncontested internal winner

**What is NOT happening:**
- The city page is not competing aggressively with the service page
- The home page and archive page showing up are passive noise at deep positions (34–49); they are not interfering with the service page's ranking
- The project page at position 8 with 1 impression (source: gsc_api, 90d row-level) is a single-day data point, not a trend

---

## 4. Root causes

1. **City page is new (≤30 days post-launch):** /gevelisolatie/rotterdam/ was created at or just after site cutover (2026-03-08). Google has not yet assigned it sufficient authority for geo-specific queries. This is expected behaviour, not an error.

2. **Service page has more accumulated authority:** /gevelisolatie/ targets the broader "gevelisolatie" theme and has had longer indexing history on the domain. For a geo-modified query like "gevelisolatie rotterdam", the service page still outranks the city page because it has more overall topical weight.

3. **Archive page noise (/onze-werken/):** The archive page shows Rotterdam-labelled project content (e.g. "rotterdam-julianastraat-aanbouw-isolatie-4cm-2026") which topically matches the query. This is expected for a portfolio archive and is not interfering with rankings.

4. **Competitive landscape:** Competitors at positions 5 and 9 (takkenkamp.com, metsel-gigant.nl) have dedicated Rotterdam pages or domain-level local authority. This is normal competition; no internal issue to fix.

---

## 5. Recommended actions

| Priority | Action | Category | Files to change | Confidence |
|----------|--------|----------|-----------------|------------|
| Monitor | Verify /gevelisolatie/rotterdam/ is linked from the /gevelisolatie/ hub page (internal link check, not a content change) | Internal linking | none — read-only check | medium |
| Monitor | Re-check impressions for /gevelisolatie/rotterdam/ in 8 weeks; expect slow growth as page ages | Monitoring | — | medium |
| Monitor | Watch CTR for the query in GSC — if position stays 6–8 but CTR remains <0.5%, investigate SERP feature presence (local pack, ads) | CRO monitoring | — | low |
| Do later | If city page still shows <100 impressions (source: gsc_api) at 90 days post-launch, review its content depth and keyword coverage vs competitors | Content review | /app/gevelisolatie/[location]/page.tsx | low |

---

## 6. What should NOT be changed

- **Do NOT suppress or add canonical to /gevelisolatie/:** It is currently the only page effectively ranking for this query. Pointing a canonical to /gevelisolatie/rotterdam/ or any restructuring would remove the only ranker.
- **Do NOT add noindex to /gevelisolatie/rotterdam/:** The page is new. Low impressions at 30 days is normal. Noindex would prevent future ranking.
- **Do NOT restructure the cluster or add redirects:** No evidence warrants structural intervention.
- **Do NOT treat /onze-werken/ noise as a problem:** The archive page surfacing at position 49 (source: gsc_api, 90d row-level) is passive and causes no measurable harm.
- **Do NOT act on the project page position 8 signal:** 1 impression is a single data point — statistical noise, not a trend.

---

## 7. Monitoring plan

- **Next check in:** 8 weeks (2026-06-02)
- **What to check:**
  1. /gevelisolatie/rotterdam/ impressions in GSC row-level — target: >100 impressions (source: gsc_api) to confirm indexing progress
  2. /gevelisolatie/rotterdam/ position — expect gradual improvement from current 53.73 toward <40 as page ages
  3. /gevelisolatie/ position for this query — should remain stable or improve; any degradation needs investigation
  4. Live SERP check (DataForSEO dry-run) if position trend in GSC shows significant movement
- **Decision point:** If at 90 days post-launch (≈2026-06-07) the city page still has fewer than 50 impressions (source: gsc_api, check at that date), escalate to content review

---

## 8. Provenance

- **Generated:** 2026-04-07
- **Report mode:** preliminary
- **Data sources used:**
  - gsc_api: `seo-ops/snapshots/normalized/seo/gsc_query_page_last90d.csv` (90d row-level, generated 2026-04-07)
  - gsc_api: `seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv` (90d query-aggregate, generated 2026-04-07)
  - dataforseo_api: `seo-ops/snapshots/normalized/dataforseo/serp_snapshot_v1.json` (live SERP snapshot, 2026-04-07, desktop, nl/NL — existing artifact, no new API call made)
  - site_code: `seo-ops/snapshots/normalized/pages/page_inventory_v1.csv` (page inventory, generated 2026-04-07)
- **Live API calls made:** none — all data from existing artifacts
- **Numeric confidence cap:** medium — site is 1m post-cutover (<6m); /gevelisolatie/rotterdam/ is <30 days old; low click volume per page (below reporting threshold)
- **Known limitations:**
  1. GSC data covers 90 days including pre-cutover period; city page only exists for ~30 of those days — its 90d averages are diluted by initial non-existence
  2. DataForSEO SERP snapshot is desktop-only, one point-in-time; mobile positions and daily variance not captured
  3. Competitor analysis is superficial (only top-13 titles visible); competitor page depth unknown
  4. CTR gap (0.15% at position 6–8) is undiagnosed — likely local pack / ads, but not confirmed without SERP feature data
