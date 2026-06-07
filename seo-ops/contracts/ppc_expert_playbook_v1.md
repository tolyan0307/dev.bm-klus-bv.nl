# PPC Expert Playbook — Low-Budget Local Service

Version 1.0 · 2026-04-08 · For operator-level PPC interpretation at bm-klus-bv.nl

---

## Purpose

Decision-support rules for interpreting Google Ads data when daily budget is €10 and conversion volume is minimal. Every rule here is calibrated for a low-spend local service account — not enterprise PPC.

---

## 1. Statistical reality at €10/day

**At €10/day with average CPCs of €2–4:**
- ~3–5 clicks per day
- ~90–150 clicks per month
- ~2–5 conversions per month (at 2–3% CVR)

**What this means for analysis:**
- Individual keyword performance is NOT statistically reliable
- Week-over-week comparisons are noise
- "This keyword converted" after 1–2 conversions is anecdotal, not a pattern
- "This keyword didn't convert" after 20 clicks proves nothing
- Monthly trends require 3+ months to detect signal

**Minimum thresholds for claims:**

| Claim type | Minimum data required |
|------------|----------------------|
| "Keyword is converting well" | ≥5 conversions over ≥30 days |
| "Keyword is wasting budget" | ≥50 clicks, 0 conversions, ≥60 days |
| "Campaign CVR is X%" | ≥30 conversions (for ±5% confidence interval) |
| "CPA is €X" | ≥10 conversions (otherwise range only) |
| "This ad copy works better" | Not testable at this budget — do not claim |

---

## 2. What NOT to infer from 2–3 conversions

- "Keyword X is our best performer" — No. 2 conversions could be random.
- "Ad group A outperforms ad group B" — Not with <10 conversions per group.
- "We should shift budget to this keyword" — Not until pattern is confirmed over 60+ days.
- "CVR improved this month" — Going from 1 to 3 conversions is not an improvement, it's variance.

**Safe language for low-conversion accounts:**
- "Keyword X has shown early conversion signals (N=2) — monitor"
- "No conversions observed in 45 days / 30 clicks — flag for review if trend continues"
- "Directional: most conversions came from [theme] queries"

---

## 3. Pause-risk vs monitor-only

**Pause candidates (act):**
- Keywords with >€30 spent, 0 conversions, clearly wrong intent (e.g., DIY/info queries hitting commercial landing page)
- Search terms leaking to irrelevant verticals (e.g., "gevelisolatie zelf doen" = DIY intent)
- Keywords consistently consuming >30% of daily budget over 7+ days with no engagement signal (high bounce, 0 form starts)

**Monitor-only (do NOT pause yet):**
- Keywords with <€15 spent and 0 conversions — insufficient data
- Keywords with 1 conversion in 30 days — could be early signal
- Low-impression keywords (<10/month) — not enough exposure to judge
- Newly added keywords (<14 days active)

**Rule:** At €10/day, pausing too aggressively shrinks reach. Only pause when intent mismatch is clear, not when volume is low.

---

## 4. Theme-level inefficiency vs keyword-level noise

**At this budget, analyze at theme level, not keyword level.**

| Theme example | Sample query | Read as |
|---------------|-------------|---------|
| gevelisolatie (core) | gevelisolatie, buitengevelisolatie, gevelisolatie kosten | Primary commercial theme — protect budget |
| gevelisolatie + city | gevelisolatie rotterdam, gevelisolatie den haag | Geo-qualified — high intent |
| stucwerk | muren stucen, buiten stucwerk, sierpleister | Secondary theme — lower priority at current budget |
| informational leakage | wat is gevelisolatie, gevelisolatie zelf doen | Wrong intent — negative keyword candidates |
| brand | bm klus, bm klus bv | Cheap traffic, mostly existing awareness |

**Decision rule:** If an entire theme shows no conversions after €50+ spend over 30+ days AND landing page is relevant — it's a theme-level signal worth acting on. If 1 keyword in a healthy theme has no conversions — that's noise.

---

## 5. Search term leakage

**What to look for:**
- Informational queries: "wat is...", "hoe werkt...", "zelf...", "nadelen..." — add as negative keywords
- Wrong service: "gevelisolatie huur" (rental) — not commercial intent for contractor
  - Mixed intent: "gevelisolatie subsidie aanvragen" (subsidy application process) — lower commercial intent, but applicants may also need a contractor; monitor rather than auto-negate
- Wrong geography: cities far outside service area
- Competitor names: "isolatiebedrijf [competitor]" — usually low-quality clicks
- B2B terms: "groothandel", "leverancier" — wrong audience

**How to handle:**
- Build negative keyword list incrementally (monthly review cadence at this budget)
- Don't over-negate: "gevelisolatie kosten" is commercial intent, not informational
- At €10/day, a few leaked clicks per week are normal — only act on patterns

---

## 6. Landing page fit

**Assessment criteria for this site:**

| Signal | Good fit | Poor fit |
|--------|----------|----------|
| Query intent matches page content | "gevelisolatie kosten" → /gevelisolatie/ (has pricing) | "muren stucen" → /gevelisolatie/ |
| CTA is visible and relevant | Contact form, WhatsApp, phone — all above the fold | CTA buried below 3 screens of text |
| Page loads fast | <3s on mobile | >5s or layout shift |
| Geo relevance shown | "Regio Rotterdam" mentioned | No location signal |

**For BM Klus specifically:**
- Each money page should receive traffic for its own service only
- Cross-service ad groups pointing to wrong landing pages = wasted budget
- If a campaign serves multiple services, each ad group needs its own landing page

**Do NOT recommend:**
- Separate landing pages for PPC (this is a small site — use existing service pages)
- A/B testing landing pages (no statistical power at this budget)
- "Optimize landing page conversion rate" without specifying what to change

---

## 7. Budget-sensitive recommendations

**What good recommendations look like at €10/day:**

| Recommendation type | Good example | Bad example |
|---------------------|-------------|-------------|
| Budget allocation | "Concentrate €10/day on gevelisolatie theme only" | "Split budget across 5 campaigns" |
| Keyword strategy | "Exact + phrase match for top 5 terms" | "Add 50 broad match keywords" |
| Negative keywords | "Add 3–5 clear intent mismatches monthly" | "Build comprehensive negative list of 200 terms" |
| Bid strategy | "Manual CPC or maximize clicks with cap" | "Switch to target CPA" (no conversion volume for smart bidding) |
| Expansion | "Add 2–3 geo variants when core is profitable" | "Launch separate campaigns for each city" |

**Smart bidding warning:** Target CPA / Target ROAS / Maximize Conversions require ~30 conversions/month to function. At 2–5 conversions/month, these strategies will not optimize properly. Manual CPC or Maximize Clicks (with CPC cap) is appropriate.

---

## 8. What should NOT be recommended too early

**Do not recommend until conversion volume supports it:**
- Campaign restructuring (need baseline first)
- Smart bidding strategies (need 30+ monthly conversions)
- Budget increase without ROI evidence (need 10+ tracked conversions to estimate CPA)
- New service campaigns (prove one works first)
- Display or YouTube expansion (no conversion signal to optimize toward)
- Ad copy split-testing (no statistical power)

**Safe early-stage recommendations:**
- Clean search term leakage (always safe)
- Fix obviously wrong landing pages (always safe)
- Add missing negative keywords (always safe)
- Ensure conversion tracking is working (always safe)
- Monitor and report — explicitly stating "more data needed before strategic changes"

---

## 9. Zero-impression / low-volume clutter

**What it means when keywords show 0 impressions:**
- Keyword may be too specific for this market (e.g., 4-5 word combinations)
- Keyword may be paused by the system (low search volume status)
- Keyword may be outbid by competitors
- Match type may be too restrictive for a niche query

**How to handle:**
- Do not report every zero-impression keyword as a finding — this is normal in small accounts
- Aggregate: "N keywords have shown 0 impressions in 30 days — review for relevance"
- Only flag if the zero-impression keyword is a known commercial term with real search volume

---

## 10. What NOT to overclaim

**Forbidden at this budget:**
- "Campaign ROAS is X:1" — not calculable without conversion value tracking and sufficient volume
- "Keyword X has a CPA of €Y" — not from 1–2 conversions
- "Quality Score is the problem" — QS optimization matters at scale, not at €10/day
- "We should double the budget" — only after CPA is estimated from ≥10 conversions
- "This campaign is unprofitable" — cannot determine without offline conversion data
- "Competitor CPCs are €X" — requires auction insights data or DataForSEO; do not estimate

**Safe claim patterns:**
- "At current budget (€10/day), conversion volume is too low for statistical conclusions"
- "Directional: gevelisolatie theme shows stronger engagement signals than stucwerk"
- "Search term report shows N% of spend going to non-commercial queries"
- "Conversion tracking appears functional — 3 key events configured"

---

## Cross-references

- Evidence tiers and forbidden inferences: `contracts/expert_rules_v1.md`
- Report format: `contracts/final_report_rules_v1.md`
- Numeric labeling: `contracts/numeric_provenance_v1.md`
- Site PPC config: `config/site.yaml` (budget, campaign ID)
- Analysis context: `config/analysis_context_v1.yaml` (interpretation mode)
