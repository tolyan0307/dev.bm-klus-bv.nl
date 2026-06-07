# PPC Review — Good Example v1

> **Status:** EXEMPLAR — illustrative only, not a production report.
> Synthetic data for BM Klus context (€10/day budget). Do not cite as real findings.

---

## 1. Purpose / Scope

**Request:** "Review Google Ads performance for the last 30 days."

| Field | Value |
|-------|-------|
| Account | BM Klus BV — Google Ads |
| Budget | ~€10/day (~€300/month) |
| Campaigns in scope | 1 active campaign (Search) |
| Data window | 2026-03-01 – 2026-03-30 |
| Report mode | preliminary |

---

## 2. Sources used

| Source | Class | Role |
|--------|-------|------|
| `snapshots/google_ads_campaign_30d_*.csv` | Rank 1 — internal artifact | Primary: spend, clicks, impressions, conversions |
| `snapshots/google_ads_search_terms_30d_*.csv` | Rank 1 — internal artifact | Primary: search term analysis |
| `config/conversions.yaml` | Rank 1 — internal artifact | Key event definitions |
| Google Ads Help — conversion tracking | Rank 2 — official documentation | Supporting: conversion attribution model reference |

---

## 3. Key observations

> Raw facts only.

- Total spend: **€287.40** `source: ads_api | window: 30d | scope: account`
- Clicks: **94** `source: ads_api | window: 30d | scope: account`
- Impressions: **2 180** `source: ads_api | window: 30d | scope: account`
- Conversions (phone_call + form_submit): **3** `source: ads_api | window: 30d | scope: account`
- Average CPC: **€3.06** `source: calculated | window: 30d | scope: account`
- Search term report: 67 unique terms triggered ads.
- 18 search terms (27%) appear informational (e.g., "wat kost gevelisolatie," "gevelisolatie zelf doen").
- 4 search terms relate to services BM Klus does not offer (e.g., "spouwmuurisolatie," "dakisolatie").
- 3 conversions came from 3 different search terms — no single term has > 1 conversion.

---

## 4. Performance interpretation

- **Volume is too low for keyword-level performance conclusions.** At 94 clicks / 30 days (~3 clicks/day), individual keyword CPA or conversion rate calculations are not statistically meaningful. Analysis should be at theme level.

- **Conversion count (3) is below the minimum threshold for "converting well."** Per ppc_expert_playbook_v1: ≥ 5 conversions / 30 days is the minimum to label performance as positive. Current count does not support claims of "good" or "bad" conversion performance — it is simply insufficient data.

- **Search term leakage is present but proportional.** ~27% informational terms is a known pattern at this budget level. This is waste, but the absolute spend on leaked terms is estimated at ~€40–60 (rough extrapolation, not exact).
  `source: estimated | confidence: low`

---

## 5. Budget sensitivity / Constraints

- At €10/day, the account generates ~3 clicks/day. This means:
  - Smart bidding strategies require ~30 conversions/month to function — current volume is 10× below that threshold.
  - Campaign restructuring (splitting into multiple campaigns) would dilute budget below useful levels.
  - Adding keywords will not increase total volume proportionally — budget is the binding constraint, not keyword coverage.

- **Budget increase is NOT recommended at this stage.** First, reduce waste from irrelevant search terms. If CPA improves after cleanup, reassess.

---

## 6. Risks / Caveats

- **Conversion attribution uncertainty:** 3 conversions across 30 days does not reveal a pattern. Any CPA calculation (€287 / 3 = ~€96) is a point estimate with no confidence interval at this volume.
- **Phone call tracking accuracy:** Not verified whether all phone conversions are genuine leads or accidental clicks. At 1–2 phone conversions, one false positive changes the picture significantly.
- **No post-click journey data:** GA4 landing page engagement for paid traffic was not assessed in this review. Bounce rate / engagement for paid sessions is unknown.

---

## 7. Recommended manual actions

### Do now (clear waste reduction)
1. **Add negative keywords** for confirmed irrelevant terms: "zelf doen," "kosten berekenen," "spouwmuurisolatie," "dakisolatie." These are factual mismatches — the account pays for clicks that cannot convert.
2. **Review 18 informational terms** — decide per-term whether to negate or retain. Some ("wat kost gevelisolatie") may attract early-funnel leads; others are pure waste.

### Monitor (insufficient data to act)
3. **Track conversion volume** for 30 more days after negative keyword cleanup. If conversions rise to ≥ 5/month, theme-level analysis becomes more meaningful.
4. **Check phone call quality** — if possible, verify that phone conversions correspond to actual inquiries, not misdials.

### Not yet (premature at current volume)
5. Do NOT restructure campaigns. Single-campaign structure is appropriate at €10/day.
6. Do NOT enable Smart Bidding — volume is far below the ~30 conversions/month threshold.
7. Do NOT calculate or report ROAS — data is insufficient and the number would be misleading.

---

## 8. What NOT to change yet

- **Do not pause the campaign** based on 3 conversions. This is not evidence of failure — it is evidence of insufficient data.
- **Do not increase budget** before cleaning up search term leakage. More budget on a leaky funnel amplifies waste.
- **Do not add broad match keywords.** At this budget, broad match will increase irrelevant impressions without proportional conversion lift.

---

## 9. Provenance footer

| Field | Value |
|-------|-------|
| Report mode | preliminary |
| Data sources | Google Ads API (30d), conversions.yaml |
| Generated | 2026-03-31 (illustrative) |
| Contracts applied | ppc_expert_playbook_v1, numeric_provenance_v1, expert_rules_v1 |

---

## 10. Why this is a good example

1. **Low-budget context is explicit** — the report never pretends this is a large account with statistical power.
2. **No keyword-level performance claims** — analysis stays at theme level, as required by ppc_expert_playbook_v1 for €10/day budgets.
3. **3 conversions are NOT treated as "converting well"** — the minimum threshold (≥ 5) is cited and respected.
4. **Waste is quantified cautiously** — the estimated leakage spend is labelled as estimated/low confidence, not presented as exact.
5. **Actions are proportional** — negative keywords (clear waste) are "do now"; restructuring and smart bidding are explicitly deferred.
6. **What NOT to do is explicit** — prevents the reader from over-reacting to low numbers.
7. **No ROAS calculation** — at 3 conversions and €287 spend, any ROAS figure would be noise, and the report says so.
