# WP Stats Snapshot (last 90 days)

**Generated:** 2026-09-04 22:37 UTC
**Date range:** 2026-06-07 to 2026-09-04
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 90d, lead-level]` / `[WP, 90d, event-level]`)
**Plugin version:** 2.0.1

> Pageview and CTA events exist only from 2026-09-04 (1 of 90 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 22 |
| Leads excl. spam | 22 |
| Qualified (qualified + won + lost) | 0 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 11 |

### By status

| Status | Leads |
|--------|-------|
| archive | 22 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 11 |
| direct | 11 |

### By form

| Form | Leads |
|------|-------|
| other | 22 |

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
| / | 3 | 0 | 2 | — | home |
| /gevelisolatie/ | 1 | 2 | 6 | — | service |
| /onze-werken/ | 1 | 0 | 1 | — | archive |
| /buiten-stucwerk/ | 0 | 0 | 6 | — | service |
| /contact/ | 0 | 0 | 5 | — | utility |
| /gevelisolatie/afwerkingen/ | 0 | 0 | 3 | — | cluster |
| /gevelisolatie/den-haag/ | 0 | 0 | 1 | — | city |
| /over-ons/ | 0 | 0 | 1 | — | utility |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 0 | 0 | 11 |
| campaign | 0 | 0 | 0 |
| organic | 0 | 0 | 0 |
| referral | 0 | 0 | 0 |
| direct | 5 | 2 | 14 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 2 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 25 |

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
| Raw JSON | `seo-ops/snapshots/raw/wp/wp_stats_last90d_raw.json` |
| Leads CSV | `seo-ops/snapshots/normalized/wp/wp_leads_last90d.csv` |
| Leads daily CSV | `seo-ops/snapshots/normalized/wp/wp_leads_daily_last90d.csv` |
| Pageviews daily CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_daily_last90d.csv` |
| Pageviews by path CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_by_path_last90d.csv` |
| Traffic by source CSV | `seo-ops/snapshots/normalized/wp/wp_traffic_by_source_last90d.csv` |
| CTA CSV | `seo-ops/snapshots/normalized/wp/wp_cta_last90d.csv` |
