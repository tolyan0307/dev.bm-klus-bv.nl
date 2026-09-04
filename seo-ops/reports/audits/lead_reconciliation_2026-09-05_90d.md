# Lead reconciliation: WP lead log vs GA4 vs Google Ads (2026-06-07 .. 2026-09-04)

**Generated:** 2026-09-04 23:06 UTC
**Report mode:** verified
**Workflow:** lead_reconciliation_v1
**Confidence cap:** high for WP counts, medium for cross-source ratios

**Sources**
- WP lead log, BM Stats v2 plugin, server-side, every form submission with owner-set status → `[WP, 90d, lead-level]`
- WP server-side pageviews and CTA clicks, beacon, no consent gate, from 2026-09-04 → `[WP, since 2026-09-04, event-level]`
- GA4 events by date: `Contact_Form_Site` (GTM trigger CE bm_lead_form_success), `Phone` / `Whatsapp` / `Email` (GTM link-click triggers tel: / wa.me / mailto:) → `[GA4, 90d, event-level]`
- Google Ads conversions by date, live Google Ads API (read-only), summed over all campaigns → `[Ads API, 2026-06-07..2026-09-04, all campaigns, daily]`

---

## 1. Observations

| Metric | Value | Provenance |
|--------|-------|------------|
| Form submissions received by the site | 22 | [WP, 90d, lead-level] |
| … excluding status `spam` | 22 | [WP, 90d, lead-level] |
| … triaged (qualified + won + lost) | 0 | [WP, 90d, lead-level] |
| … `archive` (real, outcome unknown, pre-2026-09-05) | 22 | [WP, 90d, lead-level] |
| … still status `new` (not triaged) | 0 | [WP, 90d, lead-level] |
| … first-touch source ads / direct / organic / other | 11 / 11 / 0 / 0 | [WP, 90d, lead-level] |
| … with gclid | 11 | [WP, 90d, lead-level] |
| GA4 `Contact_Form_Site` events | 18 | [GA4, 90d, event-level] |
| GA4 form events as % of WP submissions | 81.8% | [GA4, 90d, event-level] ÷ [WP, 90d, lead-level] |
| GA4 `Phone` + `Whatsapp` + `Email` events | 27 | [GA4, 90d, event-level] |
| GA4 `bm_*` dataLayer events (not tagged in GTM, expected 0) | 0 | [GA4, 90d, event-level] |
| WP CTA clicks (WhatsApp / phone / e-mail) | 2 | [WP, since 2026-09-04, event-level] |
| GA4 `Phone` + `Whatsapp` + `Email` in the same days | 1 | [GA4, 90d, event-level] |
| Ads conversions in the window | 18.0 | [Ads API, 2026-06-07..2026-09-04, all campaigns, daily] |
| WP leads with first-touch `ads` in the same coverage | 11 | [WP, 90d, lead-level] |

### Weekly table

All counts per ISO week (Mon–Sun). WP columns: [WP, 90d, lead-level]; views/CTA: [WP, since 2026-09-04, event-level]; GA4 columns: [GA4, 90d, event-level]; Ads: [Ads API, 2026-06-07..2026-09-04, all campaigns, daily].

| Week | WP total | WP non-spam | WP triaged | WP ads | WP direct | GA4 form | GA4 form % | GA4 phone | GA4 whatsapp | GA4 email | WP views | WP CTA | Ads conv |
|------|---------:|------------:|-----------:|-------:|----------:|---------:|-----------:|----------:|-------------:|----------:|---------:|-------:|---------:|
| 2026-06-01 | 0 | 0 | 0 | 0 | 0 | 0 | — | 0 | 0 | 0 | — | — | 0.0 |
| 2026-06-08 | 1 | 1 | 0 | 0 | 1 | 2 | 200.0 | 2 | 1 | 0 | — | — | 1.0 |
| 2026-06-15 | 2 | 2 | 0 | 2 | 0 | 1 | 50.0 | 0 | 0 | 1 | — | — | 2.0 |
| 2026-06-22 | 1 | 1 | 0 | 1 | 0 | 0 | 0.0 | 0 | 1 | 3 | — | — | 1.0 |
| 2026-06-29 | 1 | 1 | 0 | 0 | 1 | 1 | 100.0 | 0 | 0 | 0 | — | — | 0.0 |
| 2026-07-06 | 0 | 0 | 0 | 0 | 0 | 0 | — | 0 | 2 | 2 | — | — | 0.0 |
| 2026-07-13 | 0 | 0 | 0 | 0 | 0 | 1 | — | 0 | 0 | 0 | — | — | 0.0 |
| 2026-07-20 | 4 | 4 | 0 | 1 | 3 | 3 | 75.0 | 2 | 1 | 0 | — | — | 2.0 |
| 2026-07-27 | 3 | 3 | 0 | 2 | 1 | 2 | 66.7 | 1 | 2 | 1 | — | — | 3.0 |
| 2026-08-03 | 4 | 4 | 0 | 0 | 4 | 3 | 75.0 | 0 | 2 | 0 | — | — | 1.0 |
| 2026-08-10 | 2 | 2 | 0 | 1 | 1 | 2 | 100.0 | 0 | 0 | 0 | — | — | 3.0 |
| 2026-08-17 | 1 | 1 | 0 | 1 | 0 | 0 | 0.0 | 0 | 4 | 0 | — | — | 1.0 |
| 2026-08-24 | 1 | 1 | 0 | 1 | 0 | 1 | 100.0 | 0 | 0 | 1 | — | — | 2.0 |
| 2026-08-31 | 2 | 2 | 0 | 2 | 0 | 2 | 100.0 | 0 | 1 | 0 | 5 | 2 | 2.0 |

---

## 2. Interpretations

- GA4 records 81.8% of real form submissions ([GA4, 90d, event-level] ÷ [WP, 90d, lead-level]); undercount is moderate. Confidence: **medium**.
- 50% of submissions carry a first-touch ads signal (gclid or paid UTM) ([WP, 90d, lead-level]). This is the ceiling for Ads-attributable leads regardless of what Ads reports. Confidence: **high** for post-2026-09-04 leads, **medium** for backfilled ones (source from form-page URL only).
- Contact clicks are measured twice by design: GA4 `Phone`/`Whatsapp`/`Email` via GTM link-click triggers (consent-gated) and WP `cta_click` via beacon (no consent gate). The `bm_*` dataLayer events are intentionally not tagged in GTM; tagging them would double-count. From 2026-09-04 the WP/GA4 click ratio becomes the second undercount estimate. Confidence: **high** on the setup, ratio needs 4+ weeks.
- Ads reports 18.0 conversions ([Ads API, 2026-06-07..2026-09-04, all campaigns, daily]) vs 11 site submissions with an ads first touch in the same days ([WP, 90d, lead-level]). The WP figure is a floor for backfilled leads: their source comes from the form-page URL only, so an ad click followed by internal navigation to /contact/ shows as `direct`. Ads counts the conversion tag fired on form success (GTM, consent-gated) with 30-day click attribution, which catches those. Expect the two to converge for leads after 2026-09-04, when first touch is recorded. Confidence: **medium**.

---

## 3. Hypotheses (need more evidence)

- H1: The GA4/WP gap is mostly consent decline, not tag breakage. Test: compare the gap on days with high vs low paid traffic; tag breakage would show as days with WP submissions and zero GA4 events regardless of channel.
- H2: Part of WP `direct` leads are actually organic returns (first touch in an earlier tab or hard reload resets the in-memory first touch). Test: once 4+ weeks of post-2026-09-04 leads exist, compare `direct` share among leads vs `direct` share among pageviews.
- H3: Leads with `gclid` but status `spam` inflate Ads conversions if imported blindly. Test: after triage, count spam among gclid leads.
- H4: Weeks where GA4 form events exceed WP submissions (ratio above 100%) point to duplicate `Contact_Form_Site` firing (e.g. success screen re-rendered) rather than missing WP rows, since WP writes one row per accepted submission. Test: compare per-day, not per-week, once the `bm_lead_form_success` event is tagged in GTM.

---

## 4. Recommended actions (manual)

1. Triage every `new` lead in WP → BM Stats → Заявки (status qualified / won / lost / spam). Leads from before 2026-09-05 with unknown outcome stay `archive`; only obvious spam among them should be re-marked. Without this the reconciliation stays at 'submissions', not 'leads'.
2. Measurement setup needs no change: GTM link-click triggers feed GA4 `Phone`/`Whatsapp`/`Email`, all four events are key events in GA4 (verified 2026-09-05). Keep it as is; do not add `bm_*` tags.
3. Use the WP lead count as the denominator in every conversion-rate claim; treat GA4 key events as a consent-limited sample. Record the undercount factor in `config/analysis_context_v1.yaml` once 4 weeks of data exist.
4. After one month of triaged data: plan the offline conversion import to Google Ads by gclid for `qualified`/`won` leads (spec §1, later phase).

---

## 5. Excluded / stale context

- WP pageviews and CTA clicks before 2026-09-04 do not exist (v1 counters were discarded by owner decision); those weeks show '—'.
- Backfilled leads (before 2026-09-04) have no first-touch referrer and unknown form variant; their source is derived from the form-page URL only.
- Ads conversions are read live from the Google Ads API (all campaigns of the customer); a CSV export is used only if the API is unreachable, and the Ads column stays empty rather than estimated.
- Pre-cutover data (before 2026-03-08) is not included in any source.

---

## Provenance

- **Generated:** 2026-09-04 23:06 UTC
- **Report mode:** verified
- **Generator:** analyzers/pages/run_lead_reconciliation_v1.py
- **Primary truth:** WP lead log (BM Stats v2 API, `/wp-json/bm-stats/v1/leads`, `/pageviews`, `/events`), internal_artifact
- **Supporting data:** GA4 Data API key events by date (`Contact_Form_Site`, `Phone`, `Whatsapp`, `Email`), internal_artifact; Google Ads API daily campaign metrics (CSV fallback), internal_artifact
- **Live API calls:** yes — WP stats API, GA4 Data API and Google Ads API were called at generation time for the window 2026-06-07..2026-09-04
- **Window:** 90 days ending yesterday (site local date, Europe/Amsterdam)
- **Enrichment sources:** none

## Output files

- Weekly CSV: `seo-ops/snapshots/normalized/wp/lead_reconciliation_weekly_last90d.csv`
- This report: `seo-ops/reports/audits/lead_reconciliation_2026-09-05_90d.md`
