# WP Stats Snapshot (last 28 days)

**Generated:** 2026-10-22 16:41 UTC
**Date range:** 2026-09-24 to 2026-10-21
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 28d, lead-level]` / `[WP, 28d, event-level]`)
**Plugin version:** 2.2.0

> Pageview and CTA events exist only from 2026-09-04 (28 of 28 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 8 |
| Leads excl. spam | 8 |
| Qualified (qualified + won + lost) | 5 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 5 |

### By status

| Status | Leads |
|--------|-------|
| new | 3 |
| qualified | 5 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 5 |
| organic | 2 |
| direct | 1 |

### By form

| Form | Leads |
|------|-------|
| quote_modal | 7 |
| contact_form | 1 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 584 |
| CTA clicks | 7 |
| Days with events | 28 |

### Top pages by views

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 114 | 1 | 1 | 0.88% | home |
| /buiten-stucwerk/ | 93 | 1 | 0 | 0.00% | service |
| /gevelisolatie/ | 87 | 1 | 2 | 2.30% | service |
| /gevelisolatie/afwerkingen/ | 54 | 0 | 2 | 3.70% | cluster |
| /onze-werken/ | 45 | 0 | 0 | 0.00% | archive |
| /contact/ | 30 | 3 | 1 | 3.33% | utility |
| /sierpleister/ | 20 | 0 | 0 | 0.00% | service |
| /diensten/ | 18 | 0 | 1 | 5.56% | service |
| /gevelisolatie/kosten/ | 18 | 0 | 0 | 0.00% | cluster |
| /over-ons/ | 13 | 0 | 1 | 7.69% | utility |
| /gevel-schilderen/ | 12 | 0 | 0 | 0.00% | service |
| /gevel-schilderen/keimen/ | 9 | 0 | 0 | 0.00% | cluster |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 7 | 0 | 0 | 0.00% | project |
| /gevelisolatie/leiden/ | 6 | 0 | 0 | 0.00% | city |
| /gevelisolatie/rc-waarde-dikte/ | 6 | 0 | 0 | 0.00% | cluster |
| /gevelisolatie/den-haag/ | 5 | 1 | 0 | 0.00% | city |
| /gevelisolatie/materialen/ | 4 | 0 | 0 | 0.00% | cluster |
| /muren-stucen/sausklaar-behangklaar/ | 4 | 0 | 0 | 0.00% | cluster |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 4 | 0 | 0 | 0.00% | project |
| /gevelisolatie/subsidie-vergunning/ | 3 | 0 | 0 | 0.00% | cluster |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 185 | 2 | 5 |
| campaign | 38 | 1 | 0 |
| organic | 221 | 4 | 2 |
| referral | 17 | 0 | 0 |
| direct | 123 | 0 | 1 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 5 |
| email | 2 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 8 |

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
