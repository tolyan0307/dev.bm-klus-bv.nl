# Verification Audit — PPC review April 2026

**Date:** 2026-04-07
**Scope:** Major numeric and interpretive claims in the PPC decision pack for Campaign 23271040037, period 2026-03-07 – 2026-04-05
**Source document:** `seo-ops/reports/combined/ppc_review_april_2026_decision_pack_2026-04-07.md`
**Report mode:** preliminary

---

## 1. Claims under review

| # | Claim | Source document section |
|---|-------|----------------------|
| 1 | Impressions 1,708 / Clicks 230 / Cost €349.61 / CTR 13.5% / Avg CPC €1.52 / Conversions 3 / CPA €116.54 | §3 Current state |
| 2 | Budget 10 EUR/day × 29 days → expected ~€290; actual €349.61 → "возможны дни с превышением" | §3 Current state |
| 3 | All 3 conversions (source: google_ads_csv, 29d) come from core_isolation theme | §4 Finding 1 |
| 4 | €193.42 / 55.3% of spend on 7 pause-risk keywords (zero conversions) | §4 Finding 2 |
| 5 | Single converting search term: "voorgevel isolatie", 1 conv, €1.29 CPC | §4 Finding 3 |
| 6 | 10 paid sessions with (not set) landing page in GA4, engagement rate 0% | §4 Finding 4 |
| 7 | 18 keywords present in both PPC and organic (GSC) | §4 Finding 5 |
| 8 | /gevelisolatie/ engagement 76%, 116 paid sessions, avg duration 172s — "works normally, no urgent changes" | §4 Finding 6 + §6 What NOT to change |
| 9 | "~€130/мес освободить при паузе" top-3 pause-risk keywords | §5 Recommended actions |

---

## 2. Verification method

All claims verified against two primary artifacts, without live API calls:

- **`seo-ops/reports/ppc/ppc_review_campaign_23271040037_last30d.md`** — direct script output from `run_ppc_review_v1.py`. Contains ad group table, theme table, keyword tables, search term table, landing page table, cross-source table. This is the machine-generated source that feeds the decision pack.
- **`seo-ops/reports/combined/ppc_review_april_2026_decision_pack_2026-04-07.md`** — the document under audit (target report).

Numeric checks: cross-referenced claim-by-claim against tables in `ppc_review_campaign_23271040037_last30d.md`. Calculations re-derived where the claim is labeled `source: calculated`.

No raw CSV files re-read (not necessary — the ppc_review script output is the authoritative processed artifact and already summarizes the CSV data).

---

## 3. Verification results

| # | Claim | Verdict | Evidence | Correct value | Source |
|---|-------|---------|----------|---------------|--------|
| 1 | Impressions 1,708 / Clicks 230 / Cost €349.61 / CTR 13.5% / Avg CPC €1.52 / Conv 3 / CPA €116.54 | **confirmed** | ppc_review §2 campaign table exactly matches. CTR = 230/1708 = 13.47% ≈ 13.5% ✓. Avg CPC = 349.61/230 = 1.52 ✓. CPA = 349.61/3 = 116.54 ✓ | — | source: google_ads_csv; calculated |
| 2 | Expected spend ~€290, actual €349.61, "возможны дни с превышением" | **confirmed — wording misleading** | Math correct: 10×29 = €290. Overage = €59.61 over 29 days = €2.06/day avg. Average daily spend = €12.07 = 20.7% over daily budget. Google Ads standard policy allows up to 100% overbooking on any day within monthly cap — 20.7% overage is within normal managed behavior, not a signal of runaway spending | Safer wording: "Avg daily spend €12.07 = 20.7% over budget, within Google's standard management behavior" | source: google_ads_csv; source: user_reported (budget) |
| 3 | All 3 conversions from core_isolation theme; 6 other themes = 0 conv | **confirmed** | ppc_review §3 theme table: core_isolation = 91 clicks, €138.05, 3 conv (source: google_ads_csv, 29d). All other 6 themes = 0 conv. Confirmed. | — | source: google_ads_csv, 29d |
| 4 | €193.42 / 55.3% on 7 pause-risk keywords | **confirmed** | ppc_review §4 pause-risk table: 7 keywords total. Sum: €51.44 + €30.49 + €26.44 + €23.64 + €23.19 + €20.57 + €17.65 = €193.42 ✓. Ratio: 193.42/349.61 = 55.3% ✓ | — | source: calculated from google_ads_csv |
| 5 | "voorgevel isolatie" — only converting search term, 1 conv, €1.29 CPC | **confirmed** | ppc_review §5 top converting search terms table: voorgevel isolatie, 1 click, €1.29, 1 conv. Confirmed. Confidence correctly set at low in original. | — | source: google_ads_csv |
| 6 | 10 paid (not set) sessions, engagement rate 0% | **confirmed** | ppc_review §6 landing page table: (not set) = 10 sessions, 0.0% engagement rate, 0s duration. Confirmed. | — | source: ga4_api, 90d |
| 7 | 18 keywords overlap PPC and organic (GSC) | **partially confirmed** | ppc_review §8 Recommendation "Track 18 PPC/organic overlap keywords" states 18. However, the cross-source table in ppc_review §7 shows only 15 rows. Discrepancy: table (15) vs stated count (18). The additional 3 rows are not visible in the artifact. Cannot verify count of 18 from available data. Count 15 confirmed; count 18 not independently verifiable. | 15 confirmed visible; 18 unverifiable from artifact | source: calculated, keyword_master_v2 × gsc_api |
| 8 | /gevelisolatie/ 76% engagement, 116 sessions (source: ga4_api, 90d), 172s — "works normally" | **confirmed — wording potentially misleading** | ppc_review §6 table: /gevelisolatie/ = 116 sessions (source: ga4_api, 90d), 76.0%, 172s ✓. BUT: this is GA4 data over 90d window, which includes sessions before the campaign started (cutover 2026-03-08). The 90d paid session count is not equivalent to 30d PPC campaign performance. Decision pack correctly flags this in §7 Risks, but §6 "What should NOT be changed" does not restate the 90d caveat. | Safer: "76% engagement over 90d GA4 window, partially pre-campaign; LP appears serviceable but 30d PPC-specific engagement cannot be isolated from this artifact" | source: ga4_api, 90d |
| 9 | "~€130/мес при паузе" (top-3 pause-risk keywords) | **incorrect** | Top 3 spend in 29 days: €51.44 + €30.49 + €26.44 = €108.37. Monthly extrapolation: 108.37/29×30 = **€112/mo**, not €130/mo. The figure €130 is overstated by ~16%. If all 7 pause-risk keywords are paused: 193.42/29×30 = €200/mo. No interpretation of "top 3 keywords" produces ~€130/mo. | Correct monthly projection for top-3 pause: ~€112/mo | source: calculated from google_ads_csv |

---

## 4. Provenance errors found

1. **Claim #9 — €130/мес**: Numeric error in derived monthly projection. Correct value for top-3 pause candidates is ~€112/mo (from €108.37 over 29 days). The figure €130 cannot be traced to any calculation from listed keywords. Severity: minor for decision-making (order of magnitude correct), but violates accuracy standard.

2. **Claim #7 — "18 keywords" overlap**: The stated count (18) appears in the recommendation body of the ppc_review output but the cross-source table shows only 15 rows. The 3 missing rows are not visible in the artifact. This is an internal inconsistency in the source ppc_review script output (not introduced by the decision pack, which inherited the number from the script). Neither document independently verifies "18."

3. **Claim #2 — budget overage framing**: The wording "возможны дни с превышением дневного лимита" is technically accurate but lacks context that Google Ads routinely manages up to 100% daily overspend within the monthly cap. The 20.7% average daily overage is unremarkable by Google Ads standards. The framing implies a potential account issue where none may exist.

4. **Claim #8 — LP engagement window mismatch**: The 90d GA4 window caveat is disclosed in §7 Risks of the decision pack but is absent from the §6 "What should NOT be changed" block, which presents the 76% engagement figure without the caveat. A reader scanning only the recommendations could treat 90d data as 30d PPC validation.

---

## 5. Impact assessment

| Issue | Decision impact | Severity |
|-------|----------------|----------|
| ~€112 vs ~€130 monthly savings (claim #9) | Low — correct order of magnitude, decision outcome unchanged | Minor |
| 15 vs 18 overlap keywords (claim #7) | Negligible — both counts are in the "monitor, don't act" bucket; count doesn't change the recommendation | Cosmetic |
| Budget overage framing (claim #2) | Low — no action recommended in either case; framing creates unnecessary alarm | Minor |
| LP engagement 90d window not restated in "What NOT to change" (claim #8) | Medium — the "do not touch LP" recommendation is partially based on 90d data that may include pre-campaign sessions. If paid LP performance is actually weaker than 76%, the recommendation not to change anything could be wrong | Moderate |

The most material issue is the LP engagement window mismatch (#8). It does not make the recommendation wrong (76% is still a reasonable engagement signal), but the confidence assigned should be explicitly noted as 90d-window-limited, not current-campaign-verified.

---

## 6. Corrected summary

The decision pack's core conclusions hold:
- Campaign is generating traffic at low volume; all keyword-level conclusions remain provisional
- core_isolation is the only theme with conversions — protect it
- ~55% of spend on zero-conversion keywords is confirmed; monitoring / cautious pausing is reasonable
- Tracking verification before any keyword changes is the right first action

**Corrections to apply if the decision pack is cited:**

1. **§5 Recommended actions — savings estimate**: Replace "~€130/мес" with "~€112/мес" (top-3 pause) or "~€200/мес" (all 7 pause).
2. **§4 Finding 5 — overlap count**: Replace "18 ключевых слов" with "15 verified (18 per script output, 3 rows not visible in artifact)."
3. **§6 What NOT to change — LP engagement**: Add caveat: "engagement data is 90d GA4 window, not isolated to 30d PPC period."
4. **§3 Budget overage**: Add: "20.7% average daily overage is within Google Ads standard management tolerance."

**What should NOT be concluded from this audit:**
- The decision pack should not be discarded — its major claims are confirmed and its overall direction (protect core_isolation, verify tracking, watch pause-risk bucket) is sound.
- The €130 vs €112 discrepancy does not change the pausing decision.
- The LP "do not change" recommendation remains reasonable even with the 90d caveat.
- This audit does not reveal any invented metrics or fabricated data; issues are precision errors and framing concerns.

---

## 7. Provenance

- **Generated:** 2026-04-07
- **Report mode:** preliminary
- **Data sources used:**
  - `seo-ops/reports/combined/ppc_review_april_2026_decision_pack_2026-04-07.md` — target document (generated 2026-04-07)
  - `seo-ops/reports/ppc/ppc_review_campaign_23271040037_last30d.md` — source ppc_review script output (generated 2026-04-07)
  - No raw CSVs re-read; ppc_review artifact is the authoritative processed source
- **Live API calls made:** none
- **Numeric confidence cap:** low — site is 1m post-cutover (<6m); PPC budget 10 EUR/day; per-keyword volume below statistical threshold
- **Known limitations:**
  1. Raw Google Ads CSVs not independently re-read; verification relies on ppc_review script output as proxy
  2. Cross-source keyword overlap count (15 vs 18) could not be resolved without re-running the script with debug output
  3. GA4 landing page data covers 90d, not 30d PPC window — limits verification of LP performance claims
  4. This is an artifact-driven manual verification; no automated claim-checking tool used
