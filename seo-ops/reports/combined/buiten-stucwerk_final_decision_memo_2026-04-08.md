# Final Decision Memo — /buiten-stucwerk/

**Date:** 2026-04-08
**Target page:** https://bm-klus-bv.nl/buiten-stucwerk/
**Report mode:** revised (conservative)
**Live API calls:** none
**Prior reports superseded:** `buiten-stucwerk_seo_diagnosis_2026-04-08.md`, `buiten_stucwerk_seo_diagnosis_2026-04-08.md`

---

## 0. Source-of-truth corrections

### Title tag

| What | Value | Rendering source |
|------|-------|-----------------|
| **Rendered `<title>`** | `Buitenmuur stucen (gevel stucen) – prijs per m² | BM klus BV` | `data/sitemap-plan.ts` line 113 → `buildPageMetadata()` (`lib/seo/meta.ts`) → root layout template `"%s | BM klus BV"` (`app/layout.tsx` line 19) |
| **lib/content `meta.title`** | `Buitenmuur stucen (gevel stucen) – prijs per m² | BM klus BV` | `lib/content/buiten-stucwerk.ts` line 5 — **NOT imported or consumed by page.tsx; NOT the rendering source** |

Values happen to match but the rendering pipeline is `sitemap-plan.ts`, not `lib/content`. If they ever diverge, `sitemap-plan.ts` wins.

### Meta description

| What | Value | Rendering source |
|------|-------|-----------------|
| **Rendered** | `Buitenmuur stucen / gevel stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Kosten per m² na gratis opname.` | `data/sitemap-plan.ts` line 114–115 → `buildPageMetadata()` |
| **lib/content `meta.description`** | Same text | `lib/content/buiten-stucwerk.ts` line 6–7 — **NOT the rendering source** |

### H1

| What | Value | Rendering source |
|------|-------|-----------------|
| **Rendered H1** | `Buitenmuur stucen (gevel stucen) prijs per m² na gratis opname` | **Hardcoded in `app/buiten-stucwerk/page.tsx` lines 165–170** — inline JSX with `<span>` and `<br/>` elements |
| **lib/content `hero.h1`** | `Buitenmuur stucen (gevel stucen) voor een strakke buitengevel` | `lib/content/buiten-stucwerk.ts` line 17 — **exported but NOT used for the H1 element; NOT rendered** |

⚠️ **Inconsistency**: the prior diagnosis reports cited the lib/content H1 (`voor een strakke buitengevel`). The actual rendered H1 is different (`prijs per m² na gratis opname`). The verification pass (source code) is authoritative.

---

## 1. Data sources used

| Source | Artifact path | Window | Freshness | Rows |
|--------|--------------|--------|-----------|------|
| GSC page-level (combined) | `data/processed/latest_combined_snapshot.json` → `gsc_top_pages` + `gsc_page_comparison` | 2026-03-11 → 2026-04-07 (28d) | 0d (2026-04-08) | 1 row |
| GSC query×page (raw) | `snapshots/raw/gsc/gsc_query_page_last28d_raw.json` | 2026-03-09 → 2026-04-05 (28d) | 0d | 134 rows |
| GA4 landing pages | `data/processed/latest_combined_snapshot.json` → `ga4_landing_pages` | 2026-03-11 → 2026-04-07 (28d) | 0d | 1 row |
| GA4 key events | `data/processed/latest_combined_snapshot.json` → `ga4_key_events_by_page` | 2026-03-11 → 2026-04-07 (28d) | 0d | 0 rows |
| On-page source code | `app/buiten-stucwerk/page.tsx`, `data/sitemap-plan.ts`, `lib/seo/meta.ts` | current HEAD | 0d | — |

---

## 2. Search visibility snapshot

### GSC page-level (28d)

| Metric | Value | Source |
|--------|-------|--------|
| Impressions | 2 468 | GSC page-level, 2026-03-11 → 2026-04-07 |
| Clicks | 8 | GSC page-level |
| CTR | 0.32% | GSC page-level |
| Avg position | 13.4 | GSC page-level (aggregate) |

### Period-over-period (GSC page-level)

| Metric | Current 28d | Previous 28d | Delta |
|--------|-------------|-------------|-------|
| Impressions | 2 468 | 1 152 | +1 316 (+114%) |
| Clicks | 8 | 3 | +5 |
| Avg position | 13.4 | 39.4 | −26.0 (improved) |

> ⚠️ Previous period is almost entirely pre-cutover (WordPress). The delta reflects cutover effect, not a confirmed organic trend. Cannot isolate cutover effect from natural settling from content improvement.

### GA4 landing page (28d)

| Metric | Value |
|--------|-------|
| Sessions (all channels) | 12 |
| Engaged sessions | 11 |
| Engagement rate | 91.7% |
| Key events | 0 |

> ⚠️ **12 sessions is below the 20-session reliability threshold.** No engagement or conversion conclusions can be drawn from this volume. This is not evidence that "content works" — it is insufficient data.

---

## 3. Query fit analysis

### Top queries (GSC query×page, 28d)

| Query | Impressions | Clicks | Avg position |
|-------|-------------|--------|-------------|
| buitenmuur stucen | 135 | 0 | 17.4 |
| buitenmuur stucen nadelen | 129 | 1 | 4.9 |
| buiten stucwerk | 107 | 0 | 32.8 |
| buitenmuur stucen kosten | 81 | 0 | 20.3 |
| gevel stucen | 75 | 1 | 3.9 |
| buitenstucwerk | 73 | 0 | 38.1 |
| buitenstucwerk prijs | 72 | 0 | 15.5 |
| buiten stucwerk kosten | 64 | 0 | 20.1 |
| prijs buitenstucwerk | 61 | 0 | 16.2 |
| buiten stucwerk prijs | 53 | 0 | 17.3 |

### Intent alignment (conservative assessment)

**Verified for top 18 queries**: all 18 highest-impression queries have a corresponding content section on the page. This is a topical match, not a ranking guarantee.

**NOT verified**: the remaining ~116 lower-impression queries were not individually reviewed for intent alignment. The prior claim of "100% intent match for all 134 queries" is withdrawn — only the top 18 have been manually verified.

### Position distribution (134 queries)

| Band | Queries (approx) | Combined impressions |
|------|-------------------|---------------------|
| 1–5 | ~60 | ~190 |
| 6–10 | ~5 | ~55 |
| 11–20 | ~15 | ~600 |
| 21+ | ~54 | ~668 |

> ~58 of the ~60 queries in positions 1–5 are ultra-long-tail (≤3 impressions each). Only 3 queries in top-5 have meaningful volume: `gevel stucen` (75 impr), `buitenmuur stucen nadelen` (129 impr), `buiten stucwerk materiaal` (40 impr).

---

## 4. On-page signal review (from verification pass)

### Title tag
**Rendered:** `Buitenmuur stucen (gevel stucen) – prijs per m² | BM klus BV` (60 chars)
- Contains: `buitenmuur stucen` ✅, `gevel stucen` ✅, `prijs per m²` ✅
- Missing: `buiten stucwerk` (slug form, 107 impr at pos 32.8), `buitenstucwerk` (73 impr at pos 38.1)
- Rendering source: `data/sitemap-plan.ts` → `buildPageMetadata()`

### Meta description
**Rendered:** `Buitenmuur stucen / gevel stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Kosten per m² na gratis opname.` (~133 chars)
- Rendering source: `data/sitemap-plan.ts` → `buildPageMetadata()`

### H1
**Rendered:** `Buitenmuur stucen (gevel stucen) prijs per m² na gratis opname`
- Contains: primary keyword ✅, secondary keyword ✅, commercial intent signal (`prijs per m²`) ✅
- Rendering source: hardcoded JSX in `app/buiten-stucwerk/page.tsx` lines 165–170
- ⚠️ `lib/content/buiten-stucwerk.ts` `hero.h1` contains a different value — this is an unused field for the H1 element

### Structured data (source code review only — NOT live-validated)

Present in source code (`page.tsx` lines 63–101):
- `BreadcrumbList` — Home → Diensten → Buiten stucwerk
- `LocalBusiness` — via `localBusinessSchema()`
- `Service` — name: "Buiten stucwerk (gevel stucen)", priceRange: €35–€110
- `FAQPage` — rendered inline (NOT via dynamic import; the FAQ schema itself is in `PageJsonLd()` which is a server component)

⚠️ **Not validated live.** Source code presence does not guarantee Google detects the structured data correctly. No Rich Results Test has been performed. The prior claim "structured data is correctly configured" is reduced to: "structured data is present in source code."

> **Correction on FAQPage rendering**: the `FAQPage` JSON-LD is emitted by `PageJsonLd()` (a regular function called in the server component), NOT by the dynamically imported `FaqAccordion`. The schema itself should be in the initial HTML. However, this has not been verified via a live crawl or Rich Results Test.

### Internal linking

- **Inbound**: extensively linked from navbar, footer, sibling service pages, gevelisolatie cluster pages, project pages
- **Outbound**: visible "Gerelateerde pagina's" section confirmed present in `page.tsx` (verification pass). Links to `/gevelisolatie/`, `/sierpleister/`, `/gevel-schilderen/`, `/muren-stucen/`, `/onze-werken/`, `/contact/`

---

## 5. Supported interpretations (conservative)

### 5.1 Position improvement from 39.4 → 13.4 is observable but not yet interpretable (Tier 2)

**Evidence:** GSC page comparison shows avg position moved from 39.4 (previous 28d, mostly pre-cutover) to 13.4 (current 28d, entirely post-cutover).

**Limitations:** 31 days post-cutover is too early to determine whether this is sustained improvement, temporary indexation spike, or settling-in-progress. The previous period includes WordPress data — the delta is contaminated by platform change, not just organic movement.

### 5.2 Primary commercial queries rank on page 2–3 (Tier 1)

**Evidence:** 8+ kosten/prijs queries (~440 combined impressions) rank at positions 15–30. At these positions, CTR is typically very low (<1%), which is consistent with the observed 0 clicks for this cluster.

### 5.3 Zero key events is not interpretable (Tier 1)

**Evidence:** 0 key events from 12 sessions. At this volume, nothing can be concluded about conversion performance.

### 5.4 Top 18 queries match page content topically (Tier 1)

**Evidence:** Manual review of top 18 queries confirms each has a corresponding section. This confirms topical relevance. It does NOT confirm ranking ability, content quality sufficiency, or competitive positioning.

---

## 6. Hypotheses requiring verification

### 6.1 Post-cutover settling may continue improving positions

- **Timeframe:** re-check at day 60 (2026-05-07)
- **Success criterion:** avg position <10 for top-5 commercial queries
- **Failure criterion:** positions plateau or decline

### 6.2 Term mismatch between title/H1 and slug-form queries

- Title/H1 use `buitenmuur stucen` / `gevel stucen`; high-volume queries use `buiten stucwerk` / `buitenstucwerk` (positions 32–38)
- Cannot determine causality without SERP analysis — Google may or may not treat these as equivalent
- **Needs:** DataForSEO SERP snapshot or manual SERP review

### 6.3 Competitive landscape unknown

- No competitor data, no SERP feature analysis, no backlink data
- Cannot assess whether current positions reflect content weakness, domain authority gap, or SERP composition

### 6.4 Structured data detection unverified

- FAQPage schema is in server-rendered HTML (source code review) but has not been tested via Google Rich Results Test

---

## 7. Actions

| Bucket | Action | Evidence level | Risk |
|--------|--------|---------------|------|
| **Do now** | Reconcile `lib/content/buiten-stucwerk.ts` `hero.h1` with actual rendered H1, or remove the unused field | Tier 1 — source-of-truth inconsistency confirmed | Low, reversible |
| **Monitor** | Re-run GSC snapshot at day 60 (2026-05-07). Compare top-10 query positions vs current values | Tier 3 — hypothesis 6.1 | No risk |
| **Monitor** | Track kosten/prijs cluster positions. If still >15 at day 60, investigate content depth vs competitors | Tier 2–3 | No risk |
| **Later / needs data** | Run DataForSEO enrichment for stucwerk cluster (search volumes, competitive density) | Tier 3 | API cost |
| **Later / needs data** | Run Google Rich Results Test for /buiten-stucwerk/ to verify structured data detection | Tier 3 | No risk |

---

## 8. What should NOT be changed (during settling period)

| Element | Why preserve |
|---------|-------------|
| **Title tag** | Contains primary keyword; positions improving; changing during settling risks disruption. Evaluate only after day 60+ |
| **Page content scope** | Top 18 queries confirm topical fit. No evidence of missing content sections for observed query clusters |
| **Internal linking TO this page** | Extensive inbound coverage already in place |

---

## 9. Known limitations

1. **GA4 volume (n=12)** is below the 20-session threshold — no engagement or conversion conclusions are valid
2. **No SERP data** — cannot assess competitor titles, featured snippets, PAA, or SERP layout
3. **No backlink data** — cannot assess off-page authority
4. **No live crawl verification** — structured data and rendered HTML not validated against live page
5. **Post-cutover instability** — site is 31d post-cutover (within 90d settling window); all position data carries medium confidence at best
6. **GSC anonymization** — page-level shows 2 468 impressions / 8 clicks; query-level sums to 1 513 / 2; ~955 impressions and ~6 clicks hidden behind anonymization threshold
7. **lib/content `meta` and `hero.h1` inconsistency** — these fields are defined but NOT consumed by the rendering pipeline; any analysis citing them as "what's on the page" is incorrect

---

## 10. Provenance

- **Generated:** 2026-04-08 (revised)
- **Supersedes:** `buiten-stucwerk_seo_diagnosis_2026-04-08.md`, `buiten_stucwerk_seo_diagnosis_2026-04-08.md`
- **Verification pass source:** source code review (`app/buiten-stucwerk/page.tsx`, `data/sitemap-plan.ts`, `lib/seo/meta.ts`, `app/layout.tsx`, `lib/content/buiten-stucwerk.ts`)
- **Live API calls:** none
- **Numeric confidence cap:** medium (31d post-cutover, within 90d instability window)
- **Corrections applied:**
  1. H1 source corrected from lib/content to hardcoded JSX in page.tsx (different text)
  2. Title/meta rendering source corrected from lib/content to sitemap-plan.ts → buildPageMetadata()
  3. "100% intent match for all 134 queries" → reduced to "top 18 manually verified"
  4. "Content works" claim removed (12 sessions insufficient)
  5. "Structured data correctly configured" → reduced to "present in source code, not live-validated"
  6. FAQPage rendering concern corrected — schema is in server component, not dynamic import
