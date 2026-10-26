# WP Stats Snapshot (last 90 days)

**Generated:** 2026-10-22 16:41 UTC
**Date range:** 2026-07-24 to 2026-10-21
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 90d, lead-level]` / `[WP, 90d, event-level]`)
**Plugin version:** 2.2.0

> Pageview and CTA events exist only from 2026-09-04 (48 of 90 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 27 |
| Leads excl. spam | 27 |
| Qualified (qualified + won + lost) | 5 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 15 |

### By status

| Status | Leads |
|--------|-------|
| new | 8 |
| qualified | 5 |
| archive | 14 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 15 |
| campaign | 1 |
| organic | 3 |
| direct | 8 |

### By form

| Form | Leads |
|------|-------|
| other | 14 |
| quote_modal | 10 |
| contact_form | 3 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 1137 |
| CTA clicks | 15 |
| Days with events | 48 |

### Top pages by views (conversion shown as — : views start later than lead events in this window)

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 217 | 4 | 2 | — | home |
| /gevelisolatie/ | 183 | 3 | 5 | — | service |
| /buiten-stucwerk/ | 168 | 1 | 6 | — | service |
| /gevelisolatie/afwerkingen/ | 100 | 0 | 4 | — | cluster |
| /onze-werken/ | 82 | 0 | 1 | — | archive |
| /contact/ | 52 | 5 | 6 | — | utility |
| /sierpleister/ | 40 | 0 | 0 | — | service |
| /gevelisolatie/kosten/ | 35 | 0 | 0 | — | cluster |
| /diensten/ | 33 | 0 | 1 | — | service |
| /over-ons/ | 33 | 0 | 2 | — | utility |
| /gevel-schilderen/ | 25 | 0 | 0 | — | service |
| /gevel-schilderen/keimen/ | 23 | 1 | 0 | — | cluster |
| /gevelisolatie/rc-waarde-dikte/ | 12 | 0 | 0 | — | cluster |
| /onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/ | 12 | 0 | 0 | — | project |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 10 | 0 | 0 | — | project |
| /gevelisolatie/den-haag/ | 9 | 1 | 1 | — | city |
| /gevelisolatie/materialen/ | 9 | 0 | 1 | — | cluster |
| /muren-stucen/sausklaar-behangklaar/ | 9 | 0 | 0 | — | cluster |
| /gevelisolatie/leiden/ | 8 | 0 | 0 | — | city |
| /muren-stucen/ | 7 | 0 | 0 | — | service |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 342 | 2 | 15 |
| campaign | 75 | 2 | 1 |
| organic | 406 | 6 | 3 |
| referral | 31 | 0 | 0 |
| direct | 283 | 5 | 10 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 10 |
| email | 4 |
| phone | 1 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 29 |

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
