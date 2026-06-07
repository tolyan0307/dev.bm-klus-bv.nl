# Page SEO Diagnosis — /muren-stucen/

**Date:** 2026-04-08
**Target page:** https://bm-klus-bv.nl/muren-stucen/
**Report mode:** preliminary
**Live API calls:** none

**Analysis scope:**
- Requested page: /muren-stucen/
- Requested channel: organic
- Requested period: last 30 days
- Requested question: "Сделай page SEO diagnosis для /muren-stucen/"
- Actual data window: GSC 2026-01-05 → 2026-04-04 (90d rolling, includes ~63d pre-cutover); GA4 2026-01-05 → 2026-04-04 (90d rolling, channel-segmented)
- Scope match: ⚠️ mismatch — GSC snapshot is 90d rolling (cannot filter to exact 30d from snapshot CSV); GA4 snapshot is 90d rolling. Post-cutover clean window is 27d (2026-03-08 → 2026-04-04), closest available approximation. All metrics below represent 90d aggregates unless noted; the 27d post-cutover sub-window cannot be isolated from snapshot-level CSV. Disclosure: findings may include ~63 days of pre-cutover WordPress noise.
- Primary sources used: GSC page-level snapshot (gsc_query_page_last90d.csv), GSC aggregated pages (gsc_query_page_aggregated_pages_last90d.csv), GA4 landing pages by channel (ga4_landing_pages_by_channel_last90d.csv), page inventory (page_inventory_v1.csv), on-page source code (app/muren-stucen/page.tsx, lib/content/muren-stucen.ts)

**Excluded from this diagnosis:** historical paid campaigns, blended traffic explanations, competitor assumptions without evidence, cross-channel conversion attribution, live SERP verification (not performed).

---

## 1. Data sources used

| Source | Artifact path | Window | Freshness | Rows/records |
|--------|--------------|--------|-----------|-------------|
| GSC query+page | seo-ops/snapshots/normalized/seo/gsc_query_page_last90d.csv | 2026-01-05 → 2026-04-04 (90d) | 1d (file mtime 2026-04-07) | 50 rows for /muren-stucen/, 8 rows for /muren-stucen-2/ |
| GSC aggregated pages | seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv | 2026-01-05 → 2026-04-04 (90d) | 1d | 1 row for /muren-stucen/ |
| GA4 by channel | seo-ops/snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv | 90d rolling to 2026-04-04 | 1d | 2 rows for /muren-stucen/ (organic, direct), 2 rows for /muren-stucen-2/ |
| Page inventory | seo-ops/snapshots/normalized/pages/page_inventory_v1.csv | static build scan | current | 1 row |
| On-page source | app/muren-stucen/page.tsx, lib/content/muren-stucen.ts | current HEAD | 0d | n/a |

> Note: GSC data covers 2026-01-05 → 2026-04-04 (90d). GA4 data covers 90d rolling to 2026-04-04. Post-cutover clean window is 27d only (2026-03-08 → 2026-04-04). Findings are not cross-multiplied between GSC and GA4.

---

## 2. Search visibility snapshot

| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Organic impressions | 823 | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Organic clicks | 0 | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Organic CTR | 0.0% | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Avg position | 32.2 | GSC | 90d (2026-01-05 → 2026-04-04) | page-level aggregate |
| Distinct queries | 50 | GSC | 90d | page-level |
| Organic sessions | 4 | GA4 | 90d rolling to 2026-04-04 | landing page = /muren-stucen/, channel = Organic Search |
| Engaged sessions | 2 | GA4 | 90d rolling to 2026-04-04 | landing page = /muren-stucen/, channel = Organic Search |
| Engagement rate | 50.0% | GA4 | 90d rolling to 2026-04-04 | landing page = /muren-stucen/, channel = Organic Search |
| Avg session duration | 658.2s | GA4 | 90d rolling to 2026-04-04 | landing page = /muren-stucen/, channel = Organic Search |

**Legacy URL signal:** `/muren-stucen-2/` (WordPress legacy) also appears in GSC with 32 impressions, 0 clicks, avg position 52.84, 7 distinct queries. GA4 shows 1 organic session for this URL.

---

## 3. Query fit analysis

**Top queries by impressions (GSC, 90d, page = /muren-stucen/):**

| Query | Impressions | Clicks | CTR | Position | Intent |
|-------|------------|--------|-----|----------|--------|
| sausklaar stucen | 230 | 0 | 0.0% | 25.28 | commercial_investigative |
| behangklaar stucen | 108 | 0 | 0.0% | 35.63 | commercial_investigative |
| sausklaar stucwerk | 73 | 0 | 0.0% | 48.19 | commercial_investigative |
| behangklaar stucwerk | 68 | 0 | 0.0% | 37.74 | commercial_investigative |
| sausklaar stucen nieuwbouw | 56 | 0 | 0.0% | 28.07 | commercial_investigative |
| stucwerk sausklaar | 29 | 0 | 0.0% | 43.45 | commercial_investigative |
| stucen behangklaar | 29 | 0 | 0.0% | 24.55 | commercial_investigative |
| strakke nieuwbouw muren | 27 | 0 | 0.0% | 26.48 | commercial_investigative |
| stucen rotterdam | 20 | 0 | 0.0% | 19.90 | commercial_investigative |
| behangklaar wanden | 18 | 0 | 0.0% | 52.44 | commercial_investigative |
| behangklaar of sausklaar | 17 | 0 | 0.0% | 31.88 | commercial_investigative |
| van behangklaar naar sausklaar kosten | 17 | 0 | 0.0% | 14.76 | commercial |
| behangklaar en sausklaar | 14 | 0 | 0.0% | 25.36 | commercial_investigative |
| behangklare wanden afwerken | 14 | 0 | 0.0% | 56.93 | commercial_investigative |
| verschil behangklaar en sausklaar | 10 | 0 | 0.0% | 19.50 | informational |

**Query-intent alignment:** The page ranks for "sausklaar"/"behangklaar" query clusters, which align well with the page's content focus on afwerkingsniveaus. However, the primary target keyword "muren stucen" (from SEO brief) shows only 3 impressions at position 19.33. The page captures impressions primarily through secondary terms from the brief — "sausklaar" and "behangklaar" variants.

**Missing / weak queries:** The primary keyword "muren stucen" barely appears (3 impressions, position 19.33). The brief's secondary keywords "wanden stucen", "stucwerk binnen", "prijs per m2" have zero or minimal presence. The title emphasizes "sausklaar stucwerk" which matches the actual query profile but deviates from the primary keyword target.

**Observation:** Zero clicks across all 50 queries (GSC, 90d, page-level aggregate). This is consistent with avg position 32.2 — the page ranks entirely outside the click zone (page 3+) for its query set. The 4 organic sessions in GA4 likely represent long-tail or brand-adjacent entries not captured at the query level in GSC.

---

## 4. On-page signal review

- **Title tag:** "Muren stucen (binnen) – sausklaar stucwerk | BM klus BV" (source: page_inventory). Contains "muren stucen" (primary keyword) and "sausklaar stucwerk" (secondary). Does not contain "behangklaar" though it is the #2 query cluster by impressions.
- **Meta description:** "Binnenmuren stucen: behangklaar of sausklaar. Richtprijzen per m², werkwijze, voorbereiding en droogtijd. Regio Rotterdam (±80–100 km)." Contains "behangklaar", "sausklaar", "richtprijzen per m²", "Rotterdam". Well-composed for commercial intent.
- **H1:** "Muren stucen (binnen): sausklaar stucwerk voor strakke wanden" — aligns with "muren stucen" and "sausklaar stucwerk" clusters.
- **Structured data:** 4 schemas implemented (source: on-page source code):
  - BreadcrumbList: Home > Diensten > Muren stucen
  - LocalBusiness: standard BM Klus info
  - Service: name "Muren stucen (binnenstucwerk)", priceRange €8-30
  - FAQPage: 10 Q&A items
  - All correctly configured.
- **Content depth:** 8 main sections with dedicated content for behangklaar vs sausklaar comparison, pricing table (4 afwerkingsniveaus), 6-step werkwijze, voorbereiding, droogtijd, and 10 FAQs. Content is comprehensive and well-structured.
- **Internal linking:** 6 contextual links at bottom (Gevelisolatie, Buiten stucwerk, Sierpleister, Gevel schilderen, Diensten, Contact). Standard navigation linking. No dedicated cluster of inbound internal links from project pages identified.

---

## 5. Supported interpretations

1. **Page is not visible for any query in the click zone (Tier 1).** Zero organic clicks across 823 impressions and 50 queries (GSC, 90d, page-level aggregate). Average position 32.2 places the page on page 3-4 of SERPs. At these positions, 0% CTR is expected behavior, not an anomaly. The page is simply not ranking high enough to receive clicks.

2. **Query profile is dominated by "sausklaar/behangklaar" variants, not "muren stucen" (Tier 2).** The primary keyword "muren stucen" has only 3 impressions (GSC, 90d, position 19.33), while "sausklaar stucen" has 230 impressions (GSC, 90d, position 25.28). This suggests Google may be associating the page more with the afwerkingsniveau topic than with the broader "muren stucen" service query. This is consistent with the H1/title emphasis on "sausklaar stucwerk" and the extensive behangklaar-vs-sausklaar content section.

3. **Post-cutover position instability is likely (Tier 2).** Site cutover was 2026-03-08 (31 days ago). GSC 90d snapshot includes 63 days of old WordPress data. Current positions may reflect instability during domain authority transfer. Consistent with project_state_v1: "position instability first 60d is normal."

4. **Legacy URL /muren-stucen-2/ creates split signal (Tier 2).** WordPress legacy URL /muren-stucen-2/ still appears in GSC (32 impressions, 7 queries, position 52.84). It shares query "stucen rotterdam" (8 impressions on legacy vs 20 on current URL) and "muren stucen" (1 impression on legacy vs 3 on current). Volume is low but the existence of two URLs for the same topic may dilute crawl/indexation signals.

5. **Closest-to-click-zone query is informational (Tier 2).** "van behangklaar naar sausklaar kosten" at position 14.76 (GSC, 90d, 17 impressions) is the highest-positioned query with meaningful volume. It is a commercial query about pricing, which aligns with page content. However, position 14-15 is still page 2, just at the edge of visibility.

---

## 6. Hypotheses requiring verification

1. **"Muren stucen" as primary keyword may be too competitive for current domain authority**
   - Supporting signal: Primary keyword "muren stucen" has only 3 impressions at position 19 — Google shows the page rarely even for this query. The page may be competing against established sites for this broad term.
   - Would confirm: SERP analysis for "muren stucen" shows high-DA competitors (e.g., Werkspot, Verbouwkosten.com) dominating top 10.
   - Would refute: Similar-age/authority sites rank in top 10 for this query.

2. **Page topic may be splitting between "muren stucen" (service) and "behangklaar vs sausklaar" (informational comparison)**
   - Supporting signal: 58% of total impressions come from "sausklaar" or "behangklaar" queries. Page has an extensive comparison section. Google may classify the page as informational-comparative rather than service-commercial.
   - Would confirm: Top-ranking pages for "sausklaar stucen" are informational articles, not service pages.
   - Would refute: Other service pages with similar comparative content rank well for both intent types.

3. **Legacy /muren-stucen-2/ may cause minor crawl confusion**
   - Supporting signal: /muren-stucen-2/ appears in GSC with 32 impressions for 7 queries; shares "stucen rotterdam" and "muren stucen" with the current URL.
   - Would confirm: URL Inspection shows /muren-stucen-2/ still indexed; implementing a 301 redirect improves consolidation.
   - Would refute: /muren-stucen-2/ is already returning 404 or redirect, and GSC data is stale impression memory.

4. **Internal linking depth may be insufficient for this page**
   - Supporting signal: Page has standard footer navigation links but no contextual inbound links from other content pages or project pages.
   - Would confirm: Adding contextual inbound links from related pages improves crawl signals.
   - Would refute: Other service pages with same link structure rank better.

---

## 7. Actions

| Bucket | Action | Evidence level | Why now | Risk / reversibility |
|--------|--------|---------------|---------|---------------------|
| Do now | Verify status of /muren-stucen-2/ (WordPress legacy URL) — check if it returns 301/404/200. If 200 or 404, implement 301 redirect to /muren-stucen/ | Tier 2 — legacy URL appears in GSC with separate impressions for overlapping queries | Prevents signal dilution between two URLs for same topic; low-effort fix | Low risk, fully reversible |
| Do now | Track position trajectory for top-5 queries ("sausklaar stucen", "behangklaar stucen", "sausklaar stucwerk", "behangklaar stucwerk", "sausklaar stucen nieuwbouw") weekly for next 30-60d to establish trend direction post-cutover | Tier 1 — site is 31d post-cutover, within expected instability window; acting on content before trend stabilizes may be premature | Establishes baseline before any content intervention | No risk |
| Monitor | Observe whether "muren stucen" impressions increase as post-cutover stabilization progresses. If after 60d the primary keyword still shows <10 impressions, investigate competitive landscape | Tier 2 — 3 impressions in 90d for primary keyword is very low; may be competition-driven or may be pre-cutover noise | Re-check at day 60 (2026-05-07) | No risk |
| Monitor | Watch for convergence between "sausklaar/behangklaar" queries and "muren stucen" queries — if page continues to rank only for comparison terms, may need content/title rebalancing | Tier 3 — topic-split hypothesis not yet confirmed | Re-check after next GSC refresh with post-cutover-only data | No risk |
| Later / needs data | Evaluate whether "behangklaar stucen" should appear in title tag (currently absent). At 108 impressions it is the #2 query cluster, but without position improvement data this change is premature | Tier 3 — title optimization before stabilization carries risk of disrupting whatever signal Google is building | Needs 60d+ post-cutover position trend | Low risk, reversible |
| Later / needs data | Evaluate creating a dedicated supporting page for "verschil behangklaar en sausklaar" (informational intent, 10 impressions at position 19.5) to separate informational from commercial queries | Tier 3 — topic-split hypothesis must be confirmed first; creating a new page without evidence of split harm may cause cannibalization | Needs SERP analysis + confirmed intent mismatch | Medium risk (content dilution) |

---

## 8. What should NOT be changed

- **Page content structure and depth** — 8 well-organized sections, comprehensive pricing table, 10 FAQs. Content quality is not the issue; visibility is.
- **Structured data** — Service, FAQPage, LocalBusiness, Breadcrumb schemas are all correctly implemented.
- **Meta description** — well-composed, covers key terms (behangklaar, sausklaar, prijs, Rotterdam).
- **H1** — contains primary keyword and service qualifier.
- **Price indication** — "Vanaf €8/m²" is visible and aligns with commercial intent queries.
- **Image optimization** — 6 responsive source images with auto-generated variants.

---

## 9. Provenance

| Field | Value |
|-------|-------|
| Report mode | preliminary |
| Data sources | GSC page-level 90d snapshot (1d old), GA4 by-channel 90d snapshot (1d old), page inventory (current), on-page source code (current) |
| Generated | 2026-04-08 |
| Live API calls | none |
| Contracts applied | page_seo_diagnosis_rules_v1, source_hierarchy_rules_v1, numeric_provenance_v1 |
| Numeric confidence cap | medium (site is 31d post-cutover, <6 months; GSC snapshot contains 63d pre-cutover data) |
| Known limitations | (1) Cannot isolate exact 30d window from 90d snapshot CSV — 90d aggregate used. (2) Post-cutover clean data is only 27d. (3) No SERP feature data available. (4) No backlink data available. (5) GA4 organic sessions volume (n=4) too low for statistically significant engagement conclusions. (6) /muren-stucen-2/ status (200/301/404) not verified — URL Inspection not performed. |
