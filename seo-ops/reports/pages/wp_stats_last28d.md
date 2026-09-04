# WP Stats Snapshot (last 28 days)

**Generated:** 2026-09-04 22:37 UTC
**Date range:** 2026-08-08 to 2026-09-04
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 28d, lead-level]` / `[WP, 28d, event-level]`)
**Plugin version:** 2.0.1

> Pageview and CTA events exist only from 2026-09-04 (1 of 28 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 8 |
| Leads excl. spam | 8 |
| Qualified (qualified + won + lost) | 0 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 5 |

### By status

| Status | Leads |
|--------|-------|
| archive | 8 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 5 |
| direct | 3 |

### By form

| Form | Leads |
|------|-------|
| other | 8 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 5 |
| CTA clicks | 2 |
| Days with events | 1 |

### Top pages by views (conversion shown as — : views start later than lead events in this window)

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 3 | 0 | 1 | — | home |
| /gevelisolatie/ | 1 | 2 | 2 | — | service |
| /onze-werken/ | 1 | 0 | 0 | — | archive |
| /buiten-stucwerk/ | 0 | 0 | 3 | — | service |
| /contact/ | 0 | 0 | 2 | — | utility |
| /gevelisolatie/afwerkingen/ | 0 | 0 | 1 | — | cluster |
| /over-ons/ | 0 | 0 | 1 | — | utility |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 0 | 0 | 5 |
| campaign | 0 | 0 | 0 |
| organic | 0 | 0 | 0 |
| referral | 0 | 0 | 0 |
| direct | 5 | 2 | 5 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 2 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 10 |

---

## Limitations

1. Pageviews and CTA clicks are counted by a JS beacon from 2026-09-04; earlier days are 0 by construction, not real zeros.
2. Leads before 2026-09-04 were backfilled: source comes from the form page URL only (utm/gclid), no first-touch referrer, form variant unknown.
3. Lead source is classified from first-touch UTM/gclid/referrer, not from GA4 channel grouping; the two are not expected to match 1:1.
4. No cookies, no visitor identifier: unique visitors are not available (visitor hash disabled by owner decision).
5. Statuses are set manually by the owner; `new` means not yet triaged, `archive` means a real pre-2026-09-05 lead whose outcome is unknown (excluded from qualified/won ratios).

## Output files

| File | Path |
|------|------|
| Raw JSON | `seo-ops/snapshots/raw/wp/wp_stats_last28d_raw.json` |
| Leads CSV | `seo-ops/snapshots/normalized/wp/wp_leads_last28d.csv` |
| Leads daily CSV | `seo-ops/snapshots/normalized/wp/wp_leads_daily_last28d.csv` |
| Pageviews daily CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_daily_last28d.csv` |
| Pageviews by path CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_by_path_last28d.csv` |
| Traffic by source CSV | `seo-ops/snapshots/normalized/wp/wp_traffic_by_source_last28d.csv` |
| CTA CSV | `seo-ops/snapshots/normalized/wp/wp_cta_last28d.csv` |
