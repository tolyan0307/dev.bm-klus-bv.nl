# Page SEO Diagnosis — /buiten-stucwerk/

**Date:** 2026-04-08
**Target page:** https://bm-klus-bv.nl/buiten-stucwerk/
**Report mode:** preliminary
**Live API calls:** none

**Analysis scope:**
- Requested page: /buiten-stucwerk/
- Requested channel: organic
- Requested period: last 28 days
- Requested question: "Сделай page SEO diagnosis для /buiten-stucwerk/"
- Actual data window: GSC 2026-03-09 → 2026-04-05 (28d, query×page); GSC 2026-03-11 → 2026-04-07 (28d, page-level aggregation); GA4 2026-03-11 → 2026-04-07 (28d)
- Scope match: ⚠️ Two GSC sources have slightly different windows (2-day offset). Page-level aggregation and query×page breakdowns come from different API calls. Findings are presented per-source with explicit labels.
- Primary sources used: GSC page-level snapshot (combined), GSC query×page raw snapshot, GA4 landing-page snapshot, on-page metadata (source code)

**Excluded from this diagnosis:** historical paid campaigns, blended traffic explanations, competitor assumptions without evidence, cross-channel conversion attribution, live SERP verification (not performed).

---

## 1. Data sources used

| Source | Artifact path | Window | Freshness | Rows/records |
|--------|--------------|--------|-----------|-------------|
| GSC page-level (combined) | `data/processed/latest_combined_snapshot.json` → `gsc_top_pages` + `gsc_page_comparison` | 2026-03-11 → 2026-04-07 (28d) | 0 days (2026-04-08) | 1 row for this page |
| GSC query×page (raw) | `snapshots/raw/gsc/gsc_query_page_last28d_raw.json` | 2026-03-09 → 2026-04-05 (28d) | 0 days | 134 rows for this page (of 402 total) |
| GA4 landing pages | `data/processed/latest_combined_snapshot.json` → `ga4_landing_pages` | 2026-03-11 → 2026-04-07 (28d) | 0 days | 1 row for this page |
| GA4 key events | `data/processed/latest_combined_snapshot.json` → `ga4_key_events_by_page` | 2026-03-11 → 2026-04-07 (28d) | 0 days | 0 rows for this page |
| On-page source code | `lib/content/buiten-stucwerk.ts`, `app/buiten-stucwerk/page.tsx` | current | current | — |
| SEO brief | `seo-system/briefs/buiten-stucwerk.yaml` | static | current | — |

> Note: GSC page-level data covers 2026-03-11 → 2026-04-07. GSC query×page data covers 2026-03-09 → 2026-04-05 (2-day offset). GA4 data covers 2026-03-11 → 2026-04-07. Findings are not cross-multiplied.

---

## 2. Search visibility snapshot

### GSC page-level metrics (aggregated)

| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Organic impressions | 2 468 | GSC page-level | 2026-03-11 → 2026-04-07 (28d) | page-level |
| Organic clicks | 8 | GSC page-level | 2026-03-11 → 2026-04-07 (28d) | page-level |
| Organic CTR | 0.32% | GSC page-level | 2026-03-11 → 2026-04-07 (28d) | page-level |
| Avg position | 13.4 | GSC page-level | 2026-03-11 → 2026-04-07 (28d) | page-level aggregate |

### GSC query×page aggregate (cross-check)

| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Sum of impressions | 1 513 | GSC query×page | 2026-03-09 → 2026-04-05 (28d) | sum of 134 query×page rows |
| Sum of clicks | 2 | GSC query×page | 2026-03-09 → 2026-04-05 (28d) | sum of 134 query×page rows |
| Unique queries | 134 | GSC query×page | 2026-03-09 → 2026-04-05 (28d) | count |

> Discrepancy note: page-level aggregation (2 468 impressions, 8 clicks) vs query×page sum (1 513 impressions, 2 clicks). This is a known GSC behavior — query-level data applies anonymization thresholds that suppress low-impression queries, while page-level data includes all impressions. The difference (955 impressions, 6 clicks) is hidden behind GSC's anonymization threshold.

### Period-over-period comparison (GSC page-level)

| Metric | Current (28d) | Previous (28d) | Delta | Source |
|--------|---------------|----------------|-------|--------|
| Impressions | 2 468 | 1 152 | +1 316 (+114%) | GSC page comparison, current: 2026-03-11 → 2026-04-07, previous: 2026-02-11 → 2026-03-10 |
| Clicks | 8 | 3 | +5 (+167%) | GSC page comparison |
| CTR | 0.32% | 0.26% | +0.06pp | GSC page comparison (calculated) |
| Avg position | 13.4 | 39.4 | −26.0 (improved) | GSC page comparison |

> Context: Site cutover (WordPress → Next.js): 2026-03-08 — 31 days ago. The previous period (2026-02-11 → 2026-03-10) is almost entirely pre-cutover. The current period is entirely post-cutover. The position improvement from 39.4 → 13.4 may reflect cutover effect, natural settling, or a combination.

### GA4 organic landing page metrics

| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Sessions (all channels) | 12 | GA4 | 2026-03-11 → 2026-04-07 (28d) | landing page = /buiten-stucwerk/ |
| Engaged sessions | 11 | GA4 | 2026-03-11 → 2026-04-07 (28d) | landing page = /buiten-stucwerk/ |
| Engagement rate | 91.7% | GA4 | 2026-03-11 → 2026-04-07 (28d) | landing page = /buiten-stucwerk/ |
| Key events | 0 | GA4 key events | 2026-03-11 → 2026-04-07 (28d) | landing page = /buiten-stucwerk/ |

> Note: GA4 row shows 12 sessions total (all channels). Organic-only breakdown not available in this snapshot. At this volume (12 sessions), engagement and conversion metrics are below the 20-session reliability threshold.

---

## 3. Query fit analysis

### Top queries by impressions (GSC, query×page, 28d, page = /buiten-stucwerk/)

| Query | Impressions | Clicks | CTR | Avg position | Intent alignment |
|-------|-------------|--------|-----|-------------|-----------------|
| buitenmuur stucen | 135 | 0 | 0.0% | 17.4 | ✅ Primary keyword (brief) |
| buitenmuur stucen nadelen | 129 | 1 | 0.8% | 4.9 | ✅ Nadelen section present |
| buiten stucwerk | 107 | 0 | 0.0% | 32.8 | ✅ Core — slug match |
| buitenmuur stucen kosten | 81 | 0 | 0.0% | 20.3 | ✅ Kosten section present |
| gevel stucen | 75 | 1 | 1.3% | 3.9 | ✅ Secondary keyword, in title + H1 |
| buitenstucwerk | 73 | 0 | 0.0% | 38.1 | ✅ Core — compound form |
| buitenstucwerk prijs | 72 | 0 | 0.0% | 15.5 | ✅ Prijs/kosten intent |
| buiten stucwerk kosten | 64 | 0 | 0.0% | 20.1 | ✅ Prijs/kosten intent |
| prijs buitenstucwerk | 61 | 0 | 0.0% | 16.2 | ✅ Prijs/kosten intent |
| buiten stucwerk prijs | 53 | 0 | 0.0% | 17.3 | ✅ Prijs/kosten intent |
| gevel stucwerk | 47 | 0 | 0.0% | 33.0 | ✅ Core |
| cementstuc buiten | 41 | 0 | 0.0% | 22.9 | ✅ Material subtype |
| buiten stucwerk materiaal | 40 | 0 | 0.0% | 1.3 | ✅ Materialen section present |
| kosten buiten stucwerk | 38 | 0 | 0.0% | 30.0 | ✅ Prijs/kosten intent |
| kosten buitenstucwerk | 38 | 0 | 0.0% | 15.3 | ✅ Prijs/kosten intent |
| stucen gevel | 37 | 0 | 0.0% | 9.6 | ✅ Core |
| wat kost buitenmuur stucen | 37 | 0 | 0.0% | 19.9 | ✅ Prijs/kosten intent |
| kosten buitenmuur stucen | 33 | 0 | 0.0% | 26.0 | ✅ Prijs/kosten intent |

### Query-intent observations

- **All top-18 queries align with page content.** 100% intent match — the page covers stucen, gevel stucen, kosten, materialen, nadelen.
- **No off-topic queries** among top entries.
- **"kosten/prijs" cluster** (8+ queries, ~440 combined impressions) is the largest intent group. Positions range 15–30 — page 2–3.
- **"core service" cluster** (`buitenmuur stucen`, `buiten stucwerk`, `gevel stucen`, `buitenstucwerk`, `stucen gevel`, `gevel stucwerk`) — ~474 combined impressions. Positions split: `gevel stucen` at 3.9 (top 5), others at 9–38.

### Position distribution

| Position band | Queries (approx) | Impressions (approx) | Clicks |
|--------------|-------------------|---------------------|--------|
| 1–5 (page 1, top) | ~60 | ~190 | 2 |
| 6–10 (page 1, bottom) | ~5 | ~55 | 0 |
| 11–20 (page 2) | ~15 | ~600 | 0 |
| 21+ (page 3+) | ~54 | ~668 | 0 |

> ~60 queries rank in positions 1–5, but ~58 of them have ≤3 impressions each (ultra-long-tail). Only 3 queries in top-5 have meaningful volume: `gevel stucen` (75 impr, pos 3.9), `buitenmuur stucen nadelen` (129 impr, pos 4.9), `buiten stucwerk materiaal` (40 impr, pos 1.3).

### Missing queries

Based on brief target keywords and topical expectations (no search volume data available):

- `gevel pleisteren` — 0 appearances for this page
- `stukadoor buiten` / `stukadoor buitengevel` — only 2 impressions seen
- `buitenmuur laten stucen prijs` — not seen (compound; `buitenmuur laten stucen` appears with 3 impressions)

### Cannibalization check

No material cannibalization detected. `/buiten-stucwerk/` and `/sierpleister/` share a few queries (`sierpleister buitengevel` 5 impr, `sierpleister voor buiten` 2 impr) but with separate page ownership. Branded query `bm klus bv` (29 impr, pos 2.4) appearing on this page is expected sitelinks behavior.

---

## 4. On-page signal review

### Title tag
**Current:** `Buitenmuur stucen (gevel stucen) – prijs per m² | BM klus BV` (60 characters)
- Contains: `buitenmuur stucen` ✅, `gevel stucen` ✅, `prijs per m²` ✅
- Missing from title: `buiten stucwerk` (slug form, 107 impressions at pos 32.8), `kosten`
- Parenthetical construction `(gevel stucen)` may reduce scan-ability in SERPs

### Meta description
**Current:** `Buitenmuur stucen / gevel stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Kosten per m² na gratis opname.` (~133 characters)
- Contains region (Rotterdam), material types, `kosten per m²`
- No explicit differentiator or CTA (e.g., `VCA-gecertificeerd`, `gratis offerte`)

### H1
**Current:** `Buitenmuur stucen (gevel stucen) voor een strakke buitengevel`
- Contains primary and secondary keyword
- Same parenthetical pattern as title

### Structured data (source: page.tsx)
- `BreadcrumbList` ✅ (Home → Diensten → Buiten stucwerk)
- `LocalBusiness` ✅
- `Service` ✅ (name: "Buiten stucwerk (gevel stucen)", priceRange: €35–€110)
- `FAQPage` — loaded via `dynamic(() => import(...))` (client-side). May not be in initial HTML for crawlers.

### Internal linking

**Inbound:** Page is linked from navbar, footer, all gevelisolatie cluster pages (21 city pages + sub-pages), sibling service pages (`/gevel-schilderen/`, `/muren-stucen/`, `/sierpleister/`), project pages, and utility pages. Coverage is extensive.

**Outbound:** Page has `internalLinks` export in content file but `has_internal_links_section: false` in page inventory — the page itself lacks a visible "Gerelateerde pagina's" bottom section (unlike `/muren-stucen/`, `/sierpleister/`, `/gevel-schilderen/` which have one). Brief lists this as a required section.

---

## 5. Supported interpretations

### 5.1 Position improvement from 39.4 → 13.4 is consistent with post-cutover settling (Tier 2)

**Evidence:** GSC page comparison (section 2) shows avg position moved from 39.4 (previous 28d, mostly pre-cutover) to 13.4 (current 28d, entirely post-cutover). Impressions more than doubled (+114%). Site cutover was 2026-03-08 (31 days ago).

**Alternative explanation:** The position improvement may be a temporary indexation spike that could regress. 31 days is insufficient to determine whether this is a sustained trend.

### 5.2 Primary commercial queries rank on page 2–3, structurally limiting clicks (Tier 2)

**Evidence:** The top-8 highest-volume queries (section 3 table) rank at positions 15–38 (GSC, query×page, 28d). At these positions, expected CTR is near-zero (~0.5–1.5% at positions 11–15, lower beyond). The page's aggregate CTR of 0.32% (GSC, page-level, 28d) is consistent with predominantly page 2+ rankings.

### 5.3 The "kosten/prijs" query cluster is the largest commercial intent group and ranks worst (Tier 2)

**Evidence:** 8+ queries containing "kosten", "prijs", or "wat kost" total ~440 impressions (GSC, query×page, 28d) with impression-weighted avg position ~19.3. Zero clicks from this cluster. The page has a kosten section and priceRange in structured data.

**Alternative explanation:** The site is 31 days post-cutover. This cluster's positions may still be settling. Pre-cutover, these queries likely ranked even lower (page-level avg was 39.4).

### 5.4 Query-intent alignment is strong — all top queries match page content (Tier 1)

**Evidence:** 18/18 top queries (section 3) have direct content match. 134 total queries, no off-topic SERP pollution detected. Google correctly associates the page with the stucwerk topic.

### 5.5 Zero key events is not interpretable at this volume (Tier 1)

**Evidence:** 0 key events (GA4, 28d) from 12 total sessions. At this volume, absence of key events is a baseline-volume artifact, not a conversion signal.

---

## 6. Hypotheses requiring verification

### 6.1 Post-cutover trajectory may continue improving positions over the next 30–60 days

- **Supporting signal:** Position improved 39.4 → 13.4 in the first post-cutover window. The site is still within the 90-day settling period per `expert_rules_v1.md` §2.
- **Would confirm:** Re-run snapshot at day 60 (2026-05-07). If avg position improves to <10 for top-5 commercial queries, settling is ongoing.
- **Would refute:** If positions plateau or decline at day 60, settling has stopped and content/competitive factors should be investigated.

### 6.2 Competitive landscape for stucwerk queries may be stronger than for gevelisolatie

- **Supporting signal:** `/gevelisolatie/` with 1 345 impressions has 19 clicks (CTR 1.41%, pos 13.6 — GSC page-level, 28d), while `/buiten-stucwerk/` with 2 468 impressions has 8 clicks (CTR 0.32%, pos 13.4). Similar positions but different CTR may suggest different SERP composition.
- **Would confirm:** SERP snapshot or DataForSEO competitive density comparison for both query clusters.
- **Would refute:** If SERPs are similar and the CTR difference is explained by query mix (gevelisolatie may have more branded/navigational queries pulling CTR up).

### 6.3 Title parenthetical construction may suppress CTR for top-5 queries

- **Supporting signal:** `buiten stucwerk materiaal` (pos 1.3, 40 impressions, 0 clicks) and `gevel stucen` (pos 3.9, 75 impressions, 1 click) show below-expected CTR for top-5 positions. Title uses parenthetical `(gevel stucen)` which may reduce visual clarity.
- **Would confirm:** SERP snapshot showing competitor titles, or title rewrite A/B test over 28d.
- **Would refute:** If Google rewrites the title (common), the coded title may not be what users see.
- **Caveat:** Per §4 of rules — title not containing exact query is not automatically a cause; at 1–3 impressions/day per query, CTR noise is high.

### 6.4 FAQPage schema loaded client-side may not be detected by crawlers

- **Supporting signal:** FaqAccordion imported via `dynamic(() => import(...))` — client-side JS rendering.
- **Would confirm:** Google Rich Results Test for /buiten-stucwerk/ — check if FAQPage schema appears.
- **Would refute:** If schema is detected, rendering is not an issue.

---

## 7. Actions

| Bucket | Action | Evidence level | Why now | Risk / reversibility |
|--------|--------|---------------|---------|---------------------|
| **Do now** | Add outbound "Gerelateerde pagina's" internal links section at the bottom of `/buiten-stucwerk/` (matching pattern on `/muren-stucen/`, `/sierpleister/`, `/gevel-schilderen/`). Link to `/gevelisolatie/`, `/sierpleister/`, `/gevel-schilderen/`, `/muren-stucen/`, `/onze-werken/` | Tier 2 — page inventory shows section missing; brief lists it as required; all sibling service pages have one | Structural consistency with other service pages. Effort is minimal (copy pattern from siblings). Minor link equity flow improvement outbound. | Low risk; fully reversible |
| **Monitor** | Re-run GSC snapshot at day 60 post-cutover (2026-05-07). Compare positions for top-10 queries from section 3 table and page-level avg position vs current 13.4. | Tier 3 — hypothesis 6.1 (post-cutover settling) | 28 more days of indexation data will distinguish settling from structural weakness. The position jump from 39.4 → 13.4 needs a second data point. | No risk |
| **Monitor** | Track whether "kosten/prijs" cluster positions improve with overall settling. If at day 60 these queries remain at positions >15, investigate content depth of kosten section relative to competitors. | Tier 2–3 — interpretation 5.3 + hypothesis 6.1 | Acting on kosten content before positions stabilize risks wasted effort if settling alone resolves it. | No risk in monitoring |
| **Monitor** | Track title CTR for top-5 queries. If at day 60, page has ≥3 commercial queries in top-10 with CTR <1%, evaluate title rewrite. | Tier 3 — hypothesis 6.3 | Premature to change title during active settling period. Need stable positions before CTR can be meaningfully evaluated. | No risk in monitoring; rewrite is reversible if later applied |
| **Later / needs data** | Run DataForSEO enrichment for stucwerk keyword cluster to obtain search volumes and competitive density | Tier 3 — hypothesis 6.2 | Search volume data needed to assess traffic ceiling and prioritize actions. Currently only gevelisolatie cluster is enriched. | Cost: DataForSEO API credits |
| **Later / needs data** | Test FAQPage schema via Google Rich Results Test | Tier 3 — hypothesis 6.4 | Low priority — FAQ rich results enhance CTR but are only relevant when page reaches page 1 for commercial terms | No risk; informational |

---

## 8. What should NOT be changed

| Element | Why preserve | Evidence |
|---------|-------------|---------|
| **Page content scope and sections** | All 134 GSC queries show strong intent alignment (section 3). Page covers all major query intents: service, kosten, materialen, nadelen, werkwijze, reparatie, isolatie, FAQ | GSC query×page, 28d: 100% intent match for top queries |
| **Internal linking to this page** | Extensive inbound coverage from navbar, footer, all service pages, all gevelisolatie cluster pages, project pages | Source code review (section 4) |
| **Structured data** (Service, LocalBusiness, BreadcrumbList) | Present and correctly configured. PriceRange (€35–€110) matches page content | Source code review |
| **Title and meta description** | Title contains primary keyword, secondary keyword, and pricing term. Changing during active post-cutover settling risks disrupting position improvement trajectory. Evaluate only after positions stabilize (day 60+) | Position improved 39.4 → 13.4 in first post-cutover window — trajectory should not be disrupted |

---

## 9. Provenance

- **Generated:** 2026-04-08
- **Report mode:** preliminary
- **Data sources used:**
  - GSC page-level aggregation (28d, generated 2026-04-08, covers 2026-03-11 → 2026-04-07) — 0 days old
  - GSC page comparison (current 28d vs previous 28d, generated 2026-04-08) — 0 days old
  - GSC query×page raw snapshot (28d, generated 2026-04-08, covers 2026-03-09 → 2026-04-05) — 0 days old
  - GA4 landing page snapshot (28d, generated 2026-04-08, covers 2026-03-11 → 2026-04-07) — 0 days old
  - GA4 key events snapshot (28d, generated 2026-04-08) — 0 days old
  - On-page source code (current)
  - SEO brief (`seo-system/briefs/buiten-stucwerk.yaml`, static)
- **Live API calls made:** none
- **Numeric confidence cap:** medium — site is 31 days post-cutover (within 90-day instability window per `expert_rules_v1.md` §2)
- **Known limitations:**
  - GSC query×page anonymization suppresses ~955 impressions and ~6 clicks (difference between page-level and query-level totals)
  - No DataForSEO search volume data for stucwerk cluster
  - No SERP feature data (competitor titles, featured snippets, PAA)
  - No backlink data
  - FAQPage schema rendering not verified via Rich Results Test
  - GA4 sample size (12 sessions) below 20-session reliability threshold for engagement/conversion claims
  - Previous period is almost entirely pre-cutover — period-over-period delta reflects cutover effect, not organic trend
