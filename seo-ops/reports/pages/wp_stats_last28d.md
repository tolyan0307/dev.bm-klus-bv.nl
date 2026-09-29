# WP Stats Snapshot (last 28 days)

**Generated:** 2026-09-24 16:19 UTC
**Date range:** 2026-08-27 to 2026-09-23
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 28d, lead-level]` / `[WP, 28d, event-level]`)
**Plugin version:** 2.2.0

> Pageview and CTA events exist only from 2026-09-04 (20 of 28 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 7 |
| Leads excl. spam | 7 |
| Qualified (qualified + won + lost) | 0 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 5 |

### By status

| Status | Leads |
|--------|-------|
| new | 5 |
| archive | 2 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 5 |
| campaign | 1 |
| organic | 1 |

### By form

| Form | Leads |
|------|-------|
| quote_modal | 3 |
| other | 2 |
| contact_form | 2 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 553 |
| CTA clicks | 8 |
| Days with events | 20 |

### Top pages by views (conversion shown as — : views start later than lead events in this window)

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 103 | 3 | 0 | — | home |
| /gevelisolatie/ | 96 | 2 | 2 | — | service |
| /buiten-stucwerk/ | 75 | 0 | 2 | — | service |
| /gevelisolatie/afwerkingen/ | 46 | 0 | 1 | — | cluster |
| /onze-werken/ | 37 | 0 | 0 | — | archive |
| /contact/ | 22 | 2 | 3 | — | utility |
| /over-ons/ | 20 | 0 | 0 | — | utility |
| /sierpleister/ | 20 | 0 | 0 | — | service |
| /gevelisolatie/kosten/ | 17 | 0 | 0 | — | cluster |
| /diensten/ | 15 | 0 | 0 | — | service |
| /gevel-schilderen/keimen/ | 14 | 1 | 0 | — |  |
| /gevel-schilderen/ | 13 | 0 | 0 | — | service |
| /onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/ | 9 | 0 | 0 | — |  |
| /gevelisolatie/rc-waarde-dikte/ | 6 | 0 | 0 | — | cluster |
| /gevelisolatie/materialen/ | 5 | 0 | 1 | — | cluster |
| /muren-stucen/ | 5 | 0 | 0 | — | service |
| /muren-stucen/sausklaar-behangklaar/ | 5 | 0 | 0 | — |  |
| /gevelisolatie/den-haag/ | 4 | 0 | 0 | — | city |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 4 | 0 | 0 | — | project |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 3 | 0 | 0 | — |  |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 157 | 0 | 5 |
| campaign | 37 | 1 | 1 |
| organic | 185 | 2 | 1 |
| referral | 14 | 0 | 0 |
| direct | 160 | 5 | 2 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 5 |
| email | 2 |
| phone | 1 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 9 |

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
