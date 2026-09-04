# Lead reconciliation: WP lead log vs GA4 vs Google Ads (2026-06-07 .. 2026-09-04)

**Generated:** 2026-09-04 22:13 UTC
**Report mode:** verified
**Workflow:** lead_reconciliation_v1
**Confidence cap:** high for WP counts, medium for cross-source ratios

**Sources**
- WP lead log, BM Stats v2 plugin, server-side, every form submission with owner-set status → `[WP, 90d, lead-level]`
- WP server-side pageviews and CTA clicks, beacon, no consent gate, from 2026-09-04 → `[WP, since 2026-09-04, event-level]`
- GA4 key events by date: `Contact_Form_Site`, `Phone`, `Whatsapp`, plus `bm_*` dataLayer events if tagged → `[GA4, 90d, event-level]`
- Google Ads campaign conversions by date from the last CSV export → `[Ads CSV, n/a]`

---

## 1. Observations

| Metric | Value | Provenance |
|--------|-------|------------|
| Form submissions received by the site | 22 | [WP, 90d, lead-level] |
| … excluding status `spam` | 22 | [WP, 90d, lead-level] |
| … triaged (qualified + won + lost) | 0 | [WP, 90d, lead-level] |
| … still status `new` (not triaged) | 22 | [WP, 90d, lead-level] |
| … first-touch source ads / direct / organic / other | 11 / 11 / 0 / 0 | [WP, 90d, lead-level] |
| … with gclid | 11 | [WP, 90d, lead-level] |
| GA4 `Contact_Form_Site` events | 18 | [GA4, 90d, event-level] |
| GA4 form events as % of WP submissions | 81.8% | [GA4, 90d, event-level] ÷ [WP, 90d, lead-level] |
| GA4 `Phone` + `Whatsapp` events | 19 | [GA4, 90d, event-level] |
| GA4 `bm_*` click events (GTM triggers) | 0 | [GA4, 90d, event-level] |
| WP CTA clicks (WhatsApp / phone / e-mail) | 2 | [WP, since 2026-09-04, event-level] |
| GA4 `Phone` + `Whatsapp` in the same days | 1 | [GA4, 90d, event-level] |
| Ads conversions | not available: CSV missing or outside window | [Ads CSV, n/a] |

### Weekly table

All counts per ISO week (Mon–Sun). WP columns: [WP, 90d, lead-level]; views/CTA: [WP, since 2026-09-04, event-level]; GA4 columns: [GA4, 90d, event-level]; Ads: [Ads CSV, n/a].

| Week | WP total | WP non-spam | WP triaged | WP ads | WP direct | GA4 form | GA4 form % | GA4 phone | GA4 whatsapp | WP views | WP CTA | Ads conv |
|------|---------:|------------:|-----------:|-------:|----------:|---------:|-----------:|----------:|-------------:|---------:|-------:|---------:|
| 2026-06-01 | 0 | 0 | 0 | 0 | 0 | 0 | — | 0 | 0 | — | — | — |
| 2026-06-08 | 1 | 1 | 0 | 0 | 1 | 2 | 200.0 | 2 | 1 | — | — | — |
| 2026-06-15 | 2 | 2 | 0 | 2 | 0 | 1 | 50.0 | 0 | 0 | — | — | — |
| 2026-06-22 | 1 | 1 | 0 | 1 | 0 | 0 | 0.0 | 0 | 1 | — | — | — |
| 2026-06-29 | 1 | 1 | 0 | 0 | 1 | 1 | 100.0 | 0 | 0 | — | — | — |
| 2026-07-06 | 0 | 0 | 0 | 0 | 0 | 0 | — | 0 | 2 | — | — | — |
| 2026-07-13 | 0 | 0 | 0 | 0 | 0 | 1 | — | 0 | 0 | — | — | — |
| 2026-07-20 | 4 | 4 | 0 | 1 | 3 | 3 | 75.0 | 2 | 1 | — | — | — |
| 2026-07-27 | 3 | 3 | 0 | 2 | 1 | 2 | 66.7 | 1 | 2 | — | — | — |
| 2026-08-03 | 4 | 4 | 0 | 0 | 4 | 3 | 75.0 | 0 | 2 | — | — | — |
| 2026-08-10 | 2 | 2 | 0 | 1 | 1 | 2 | 100.0 | 0 | 0 | — | — | — |
| 2026-08-17 | 1 | 1 | 0 | 1 | 0 | 0 | 0.0 | 0 | 4 | — | — | — |
| 2026-08-24 | 1 | 1 | 0 | 1 | 0 | 1 | 100.0 | 0 | 0 | — | — | — |
| 2026-08-31 | 2 | 2 | 0 | 2 | 0 | 2 | 100.0 | 0 | 1 | 5 | 2 | — |

---

## 2. Interpretations

- GA4 records 81.8% of real form submissions ([GA4, 90d, event-level] ÷ [WP, 90d, lead-level]); undercount is moderate. Confidence: **medium**.
- 50% of submissions carry a first-touch ads signal (gclid or paid UTM) ([WP, 90d, lead-level]). This is the ceiling for Ads-attributable leads regardless of what Ads reports. Confidence: **high** for post-2026-09-04 leads, **medium** for backfilled ones (source from form-page URL only).
- 22 submissions are still `new` ([WP, 90d, lead-level]); until the owner triages them, 'qualified' comparisons are not meaningful. Confidence: n/a, data-completeness note.
- `bm_*` click events are absent in GA4 ([GA4, 90d, event-level]): GTM triggers for the dataLayer events are still not configured (open since July). The WP CTA counter is currently the only measurement of WhatsApp/phone clicks. Confidence: **high**.

---

## 3. Hypotheses (need more evidence)

- H1: The GA4/WP gap is mostly consent decline, not tag breakage. Test: compare the gap on days with high vs low paid traffic; tag breakage would show as days with WP submissions and zero GA4 events regardless of channel.
- H2: Part of WP `direct` leads are actually organic returns (first touch in an earlier tab or hard reload resets the in-memory first touch). Test: once 4+ weeks of post-2026-09-04 leads exist, compare `direct` share among leads vs `direct` share among pageviews.
- H3: Leads with `gclid` but status `spam` inflate Ads conversions if imported blindly. Test: after triage, count spam among gclid leads.
- H4: Weeks where GA4 form events exceed WP submissions (ratio above 100%) point to duplicate `Contact_Form_Site` firing (e.g. success screen re-rendered) rather than missing WP rows, since WP writes one row per accepted submission. Test: compare per-day, not per-week, once the `bm_lead_form_success` event is tagged in GTM.

---

## 4. Recommended actions (manual)

1. Triage every `new` lead in WP → BM Stats → Заявки (status qualified / won / lost / spam). Without this the reconciliation stays at 'submissions', not 'leads'.
2. Configure the three GTM Custom Event triggers (`bm_whatsapp_click`, `bm_phone_click`, `bm_email_click`) → GA4 events, then mark them as key events. Keep old `Phone`/`Whatsapp` until end of September for overlap.
3. Use the WP lead count as the denominator in every conversion-rate claim; treat GA4 key events as a consent-limited sample. Record the undercount factor in `config/analysis_context_v1.yaml` once 4 weeks of data exist.
4. After one month of triaged data: plan the offline conversion import to Google Ads by gclid for `qualified`/`won` leads (spec §1, later phase).

---

## 5. Excluded / stale context

- WP pageviews and CTA clicks before 2026-09-04 do not exist (v1 counters were discarded by owner decision); those weeks show '—'.
- Backfilled leads (before 2026-09-04) have no first-touch referrer and unknown form variant; their source is derived from the form-page URL only.
- Ads conversions come from a manual CSV export; if the file is older than the window, the Ads column is empty rather than estimated.
- Pre-cutover data (before 2026-03-08) is not included in any source.

---

## Provenance

- **Generated:** 2026-09-04 22:13 UTC
- **Report mode:** verified
- **Generator:** analyzers/pages/run_lead_reconciliation_v1.py
- **Primary truth:** WP lead log (BM Stats v2 API, `/wp-json/bm-stats/v1/leads`, `/pageviews`, `/events`), internal_artifact
- **Supporting data:** GA4 Data API key events by date (`Contact_Form_Site`, `Phone`, `Whatsapp`, `bm_*`), internal_artifact; Google Ads CSV export (optional), internal_artifact
- **Live API calls:** yes — WP stats API and GA4 Data API were called at generation time for the window 2026-06-07..2026-09-04; Ads read from local CSV only
- **Window:** 90 days ending yesterday (site local date, Europe/Amsterdam)
- **Enrichment sources:** none

## Output files

- Weekly CSV: `seo-ops/snapshots/normalized/wp/lead_reconciliation_weekly_last90d.csv`
- This report: `seo-ops/reports/audits/lead_reconciliation_2026-09-05.md`
