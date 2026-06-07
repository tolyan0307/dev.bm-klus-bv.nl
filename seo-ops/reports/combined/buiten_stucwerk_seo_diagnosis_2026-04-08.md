# Page SEO Diagnosis — /buiten-stucwerk/

**Date:** 2026-04-08
**Target page:** https://bm-klus-bv.nl/buiten-stucwerk/
**Report mode:** preliminary
**Live API calls:** none

**Analysis scope:**
- Requested page: /buiten-stucwerk/
- Requested channel: organic
- Requested period: last 30 days
- Requested question: "Проверь, почему /buiten-stucwerk/ не получает SEO-трафик, смотри последние 30 дней."
- Actual data window: GSC 2026-01-05 → 2026-04-04 (90d rolling, includes ~63d pre-cutover); GA4 2026-01-05 → 2026-04-04 (90d rolling, channel-segmented)
- Scope match: ⚠️ mismatch — GSC snapshot is 90d rolling (cannot filter to exact 30d from snapshot CSV); GA4 snapshot is 90d rolling. Post-cutover clean window is 27d (2026-03-08 → 2026-04-04), closest available approximation to requested 30d. All metrics below represent 90d aggregates unless noted; the 27d post-cutover sub-window cannot be isolated from snapshot-level CSV. Disclosure: findings may include ~63 days of pre-cutover WordPress noise.
- Primary sources used: GSC page-level snapshot (gsc_query_page_last90d.csv), GSC aggregated pages (gsc_query_page_aggregated_pages_last90d.csv), GA4 landing pages by channel (ga4_landing_pages_by_channel_last90d.csv), page inventory (page_inventory_v1.csv), on-page source code (app/buiten-stucwerk/page.tsx)

**Excluded from this diagnosis:** historical paid campaigns, blended traffic explanations, competitor assumptions without evidence, cross-channel conversion attribution, live SERP verification (not performed).

---

## 1. Data sources used
| Source | Artifact path | Window | Freshness | Rows/records |
|--------|--------------|--------|-----------|-------------|
| GSC query+page | seo-ops/snapshots/normalized/seo/gsc_query_page_last90d.csv | 2026-01-05 → 2026-04-04 (90d) | 4d (source: file mtime 2026-04-07) | ~143 rows for /buiten-stucwerk/ |
| GSC aggregated pages | seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv | 2026-01-05 → 2026-04-04 (90d) | 4d | 1 row for /buiten-stucwerk/ |
| GA4 by channel | seo-ops/snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv | 90d rolling to 2026-04-04 | 4d | 3 rows for /buiten-stucwerk/ (organic, paid, direct) |
| Page inventory | seo-ops/snapshots/normalized/pages/page_inventory_v1.csv | static build scan | 1d | 1 row |
| On-page source | app/buiten-stucwerk/page.tsx | current HEAD | 0d | n/a |

> Note: GSC data covers 2026-01-05 → 2026-04-04 (90d). GA4 data covers 90d rolling to 2026-04-04. Post-cutover clean window is 27d only (2026-03-08 → 2026-04-04). Findings are not cross-multiplied between GSC and GA4.

## 2. Search visibility snapshot
| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Organic impressions | 2,689 | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Organic clicks | 3 | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Organic CTR | 0.11% | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Avg position | 30.1 | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Organic sessions | 13 | GA4 | 90d rolling to 2026-04-04 | landing page = /buiten-stucwerk/, channel = Organic Search |
| Engagement rate | 92.3% | GA4 | 90d rolling to 2026-04-04 | landing page = /buiten-stucwerk/, channel = Organic Search |
| Avg session duration | 380.3s | GA4 | 90d rolling to 2026-04-04 | landing page = /buiten-stucwerk/, channel = Organic Search |
| Distinct queries | 143 | GSC | 90d | page-level |

## 3. Query fit analysis

**Top queries by impressions (GSC, 90d, page = /buiten-stucwerk/):**

| Query | Impressions | Clicks | CTR | Position | Intent |
|-------|------------|--------|-----|----------|--------|
| prijs buitenstucwerk | 217 | 0 | 0.0% | 30.75 | commercial |
| buiten stucwerk | 216 | 0 | 0.0% | 37.81 | commercial_investigative |
| kosten buitenstucwerk | 186 | 0 | 0.0% | 33.09 | commercial |
| buitenstucwerk prijs | 182 | 0 | 0.0% | 36.62 | commercial |
| buiten stucwerk kosten | 164 | 0 | 0.0% | 32.95 | commercial |
| buitenstucwerk | 145 | 0 | 0.0% | 58.80 | commercial_investigative |
| buitenmuur stucen kosten | 135 | 0 | 0.0% | 28.78 | commercial |
| buitenmuur stucen | 131 | 0 | 0.0% | 17.58 | commercial_investigative |
| buitenmuur stucen nadelen | 129 | 1 | 0.78% | 5.26 | informational |
| buiten stucwerk prijs | 128 | 0 | 0.0% | 38.92 | commercial |
| kosten buiten stucwerk | 113 | 0 | 0.0% | 31.98 | commercial |
| buitengevel stucwerk | 86 | 0 | 0.0% | 41.57 | commercial_investigative |
| gevel stucen | 74 | 1 | 1.35% | 4.14 | commercial_investigative |
| onderhoud buitenstucwerk | 72 | 0 | 0.0% | 49.21 | commercial_investigative |
| bm klus bv | 69 | 1 | 1.45% | 2.36 | navigational |

**Query-intent alignment:** Core queries ("buiten stucwerk", "buitenmuur stucen", "gevel stucen") match the page's service scope well. Price/cost queries ("prijs", "kosten") are highly represented and match the page's price-per-m2 focus (H1 includes "prijs per m2").

**Missing / weak queries:** The page has some impressions for "materiaal" (source: GSC, 90d, page-level — 39 impressions at position 1.31) — one of the few queries at a strong position. Many high-volume commercial queries are at positions 28-40, outside the click zone.

**Observation:** Only 3 of 143 queries produced clicks (GSC, 90d, page-level). The 3 organic clicks (GSC, 90d, page-level) came from: "bm klus bv" (navigational, position 2.36 (source: GSC)), "buitenmuur stucen nadelen" (informational, position 5.26 (source: GSC)), "gevel stucen" (commercial, position 4.14 (source: GSC)). All core high-volume commercial queries have zero clicks (source: GSC, 90d, page-level) and positions 28–60.

## 4. On-page signal review

- **Title tag:** "Buitenmuur stucen (gevel stucen) – prijs per m2" (source: page_inventory). Contains core query terms "buitenmuur stucen", "gevel stucen", "prijs". Does not contain "buiten stucwerk" or "buitenstucwerk" as exact match, though semantically related.
- **Meta description:** "Buitenmuur stucen / gevel stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Kosten per m2 na gratis opname." Contains "kosten", "Rotterdam", material types.
- **H1:** "Buitenmuur stucen (gevel stucen) voor een strakke buitengevel" — aligns with "buitenmuur stucen" and "gevel stucen" query clusters.
- **Structured data:** Service schema (Service, priceRange 35-110), FAQPage schema, LocalBusiness schema, BreadcrumbList. All present and correctly configured (source: on-page source code).
- **Internal linking:** Page has an internal links navigation section at bottom ("Gerelateerde pagina's"). The page is linked from service-level navigation. No dedicated cluster of inbound internal links identified beyond standard navigation.

## 5. Supported interpretations

1. **Page is not visible for its core queries (Tier 1).** Of the top 15 queries by impressions, 12 have avg position > 28 (GSC, 90d, page-level). At these positions, organic CTR approaching 0% is expected behavior, not an anomaly. The page receives impressions (2,689 total) but almost no clicks (3 total) because it ranks outside the click zone for high-volume queries.

2. **Title/H1 use "buitenmuur stucen" / "gevel stucen" but top-volume queries use "buiten stucwerk" / "buitenstucwerk" (Tier 2).** There may be a partial term mismatch: the exact phrases "buiten stucwerk" (216 impressions (source: GSC, 90d), position 37.81 (source: GSC)) and "buitenstucwerk" (145 impressions (source: GSC, 90d), position 58.80 (source: GSC)) do not appear in title or H1. Alternative: Google may treat these as semantically equivalent; the mismatch alone does not explain positions 30-60.

3. **The page shows some organic engagement when reached (Tier 2).** GA4 organic sessions (source: GA4, 90d, organic, n=13) have 92.3% engagement rate and 380s avg duration, suggesting the page content is relevant for users who do arrive. Note: volume is very small (source: GA4, n=13 organic sessions); engagement metrics at this volume carry low statistical weight.

4. **Post-cutover position instability is likely (Tier 2).** Site cutover was 2026-03-08 (31 days ago). GSC 90d snapshot includes 63 days of old WordPress data. Current positions may reflect instability during domain authority transfer. This is consistent with project_state_v1: "position instability first 60d is normal" per seo_expert_playbook_nl_v1.

## 6. Hypotheses requiring verification

1. **Term mismatch may suppress rankings for "buiten stucwerk" / "buitenstucwerk" variants**
   - Supporting signal: Title and H1 use "buitenmuur stucen" / "gevel stucen" but not "buiten stucwerk" or "buitenstucwerk"; these high-volume queries show positions 30-60.
   - Would confirm: Adding "buiten stucwerk" to title/content improves position for these queries within 4-8 weeks.
   - Would refute: Position remains unchanged after title update; or SERP analysis shows top-10 results also do not use this exact phrase.

2. **Cannibalization with /sierpleister/ or /gevelisolatie/ for overlapping queries**
   - Supporting signal: "prijs buitenstucwerk" appears on 3 pages in GSC (buiten-stucwerk, gevelisolatie, sierpleister). "buiten stucwerk subsidie" maps to /gevelisolatie/ instead.
   - Would confirm: Multiple pages rank for same query with >10 impressions each (source: GSC) and position gap <5.
   - Would refute: Other pages have <5 impressions (source: GSC) for overlapping queries (noise-level, per seo_expert_playbook_nl_v1).

3. **Post-cutover authority lag may be depressing all non-brand positions for this page**
   - Supporting signal: Site is 31d post-cutover from WordPress; most commercial queries show positions 28-60 which is consistent with a "starting from scratch" pattern.
   - Would confirm: Positions improve over 60-90d without content changes; or other service pages show similar position patterns.
   - Would refute: Other service pages on the same site rank significantly better for similar-volume queries.

4. **Internal linking depth may be insufficient**
   - Supporting signal: Page has a generic "Gerelateerde pagina's" nav at the bottom but no dedicated contextual internal links from other content pages (e.g., blog posts, project pages about buitenstucwerk).
   - Would confirm: Adding contextual inbound links from project pages improves crawl signals and positions.
   - Would refute: Other well-ranking service pages on the site have the same internal link structure.

## 7. Actions
| Bucket | Action | Evidence level | Why now | Risk / reversibility |
|--------|--------|---------------|---------|---------------------|
| Do now | Evaluate adding "buiten stucwerk" to title tag alongside existing "buitenmuur stucen" — test: "Buiten stucwerk (buitenmuur stucen) – prijs per m2" | Tier 2 — term mismatch between title and top-volume queries is observable | Page currently has zero organic clicks (source: GSC, 90d) for 1,600+ impressions on "buiten stucwerk" / "buitenstucwerk" / "prijs buitenstucwerk" queries | Low risk, fully reversible (title tag change) |
| Monitor | Track position changes for top-10 queries over next 30-60d to separate post-cutover instability from structural issues | Tier 2 — site is 31d post-cutover, within expected instability window | Re-check at day 60 (2026-05-07) | No risk |
| Monitor | Check for cannibalization: compare impressions for "prijs buitenstucwerk" across /buiten-stucwerk/, /sierpleister/, /gevelisolatie/ after next GSC refresh | Tier 3 — overlap observed but volume on other pages is minimal | Re-check after GSC snapshot refresh | No risk |
| Later / needs data | Add contextual internal links from project pages (Halsteren buitenstucwerk, Rotterdam buitenstucwerk) to /buiten-stucwerk/ | Tier 3 — internal link depth hypothesis not yet validated | Needs comparison with other service pages' link profiles | Low risk, reversible |
| Later / needs data | Evaluate creating a dedicated "kosten buiten stucwerk" content section or FAQ entry targeting the price cluster | Tier 3 — price queries are the highest volume cluster but require SERP analysis to determine content gap | Needs live SERP snapshot (DataForSEO) | Medium risk (content dilution possible) |

## 8. What should NOT be changed

- **Page content quality and structure** — engagement metrics (source: GA4, 90d, organic, landing page = /buiten-stucwerk/ — 92.3% engagement rate, 380s duration, n=13) suggest the content satisfies user intent when reached.
- **Structured data** — Service, FAQ, LocalBusiness, Breadcrumb schemas are all correctly implemented.
- **H1 structure** — contains key commercial terms and geographic qualifier.
- **Price indication** — "Vanaf 35/m2" is visible, aligns with commercial intent queries.
- **Meta description** — covers materials, region, and call to action.

## 9. Provenance
- **Generated:** 2026-04-08
- **Report mode:** preliminary
- **Data sources used:** GSC page-level 90d snapshot (4d old), GA4 by-channel 90d snapshot (4d old), page inventory (1d old), on-page source code (current)
- **Live API calls made:** none
- **Numeric confidence cap:** medium (site is 31d post-cutover, <6 months; GSC snapshot contains 63d pre-cutover data)
- **Known limitations:** (1) Cannot isolate exact 30d window from 90d snapshot CSV — requested 30d vs actual 90d mismatch disclosed. (2) Post-cutover clean data is only 27d. (3) No SERP feature data available. (4) No backlink data available. (5) GA4 organic sessions volume (n=13) too low for statistically significant engagement conclusions.
