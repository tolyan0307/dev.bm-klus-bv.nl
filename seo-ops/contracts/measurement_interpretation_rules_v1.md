# Measurement Interpretation Rules

Version 1.0 · 2026-04-08 · For operator-level data interpretation at bm-klus-bv.nl

---

## Purpose

Rules for interpreting GA4, GSC, and Google Ads data together without mixing windows, inflating certainty, or producing misleading comparisons. This file exists because these three data sources have different time windows, different granularity, and different definitions of "the same thing."

---

## 1. Data source windows and their mismatches

| Source | Default window | Granularity | Latency |
|--------|---------------|-------------|---------|
| GSC | 90 days (rolling) | Daily, but reported as period aggregate | 2–3 days |
| GA4 | Configurable (28d typical) | Session-level | 24–48 hours |
| Google Ads | Configurable | Daily | Same day |

**Key mismatch:** A 90-day GSC snapshot overlaps with 3+ GA4 monthly periods. Comparing "GSC impressions" with "GA4 sessions" for the same page requires explicit window alignment.

**Rule:** Every cross-source comparison must state both windows explicitly. "GSC (Jan 5 – Apr 4) shows X impressions; GA4 (Mar 8 – Apr 4) shows Y sessions" — never merge these into a single number.

---

## 2. When mixed windows are acceptable vs misleading

**Acceptable (with disclosure):**
- Directional page-level overview: "Page X has GSC impressions (90d) and GA4 sessions (28d) — here's what each shows separately"
- Identifying zero-traffic pages: if a page has 0 in both GSC and GA4 regardless of window, it's genuinely invisible
- Checking conversion tracking: if GA4 shows key events for a page that GSC shows has clicks, tracking is working

**Misleading (do not do):**
- Computing "conversion rate" from GSC clicks ÷ GA4 conversions (different windows, different counting)
- "CTR" from GA4 sessions ÷ GSC impressions (nonsensical metric)
- Comparing pre-cutover GSC data with post-cutover GA4 data as if they measure the same site
- Trending a metric across time when the window shifts (GSC 90d rolling vs GA4 fixed 28d)

**Rule:** If you must combine sources, present each source's numbers separately with its window, then state the directional interpretation as a hypothesis, not a fact.

---

## 3. How to present engagement metrics safely

**GA4 engagement metrics and what they actually mean:**

| Metric | What it measures | Safe interpretation | Unsafe interpretation |
|--------|-----------------|--------------------|-----------------------|
| Sessions | Visits (30-min window) | Volume indicator | "Traffic" (conflates with users) |
| Engaged sessions | Sessions >10s OR conversion OR 2+ pageviews | Interest signal | "Good visits" |
| Engagement rate | Engaged sessions / sessions | Relative quality | "Conversion readiness" |
| Avg engagement time | Time actively on page | Content consumption | "User satisfaction" |
| Bounce rate | 100% - engagement rate | Inverse of engagement | "Page quality" (many valid reasons to bounce) |
| Key events | Configured event triggers | Action signal | "Leads" (unless event = actual lead) |

**Rules:**
- Do not equate engagement rate with conversion intent
- Do not treat high bounce rate as a negative without context (single-page visits to a contact page are not "bounces" in the business sense)
- Do not present engagement time as proof of content quality — it could indicate confusion
- Always specify which key events are configured and what they represent

---

## 4. What "(not set)" means operationally

**"(not set)" in GA4 landing page reports means:**
- GA4 could not determine the landing page for that session
- Common causes: direct traffic without page path, sessions starting from events, consent mode blocking, or tracking code issues

**How to treat:**
- Report it as a measurement gap, not as a content issue
- Do not allocate "(not set)" sessions to specific pages
- Do not subtract "(not set)" from total to get "real" page traffic
- If "(not set)" is >10% of sessions, flag as a tracking health issue
- If "(not set)" is 5–10%, note as elevated and worth investigating if it grows
- If "(not set)" is <5%, note and move on

**Current state for BM Klus:** "(not set)" landing pages are a known measurement gap (documented in project_state).

---

## 5. How to treat low session counts

**Thresholds for GA4 interpretation:**

| Sessions (28d) | Interpretation reliability | What you can say |
|-----------------|--------------------------|-----------------|
| 0 | Page may not be indexed or linked | "No sessions recorded" — check indexation |
| 1–5 | Noise | "Minimal traffic — insufficient for analysis" |
| 6–20 | Directional only | "Low volume — engagement metrics unreliable" |
| 21–50 | Cautious interpretation | "Engagement signals are directional" |
| 50+ | Reasonable interpretation | Metrics can support findings (with caveats) |

**Key rule:** Engagement rate from 3 sessions (2 engaged = 67%) is meaningless. Do not present percentages from <20 sessions without stating the N.

**Formatting rule:** Always show absolute numbers alongside percentages. Write "67% engagement rate (N=3)" not just "67% engagement rate."

---

## 6. Tracking hypothesis vs confirmed tracking issue

**Confirmed tracking issue (evidence-based):**
- Page has GSC clicks but 0 GA4 sessions for the same period → tracking code likely missing or broken on that page
- Key event fires on test but never appears in GA4 reports → event configuration issue
- GA4 shows sessions but 0 key events site-wide for >7 days → key event tracking broken

**Tracking hypothesis (needs investigation):**
- "(not set)" is high → could be consent mode, could be tracking gap, could be direct traffic
- Low session count vs expected → could be indexation, could be tracking, could be no demand
- Key events seem low → could be real (low traffic) or could be misconfigured
- GA4 sessions ≠ GSC clicks → expected (different counting methods); only suspicious if ratio is extreme (<0.3 or >3)

**Rule:** Label every tracking-related finding as either "confirmed issue" or "hypothesis — needs investigation." Never present a hypothesis as a confirmed problem.

---

## 7. How to phrase measurement caveats in final reports

**Standard caveats to include when applicable:**

**Post-cutover caveat (use while site <90 days old):**
> Data window includes pre-cutover period. Metrics reflect a mix of old WordPress site and new Next.js site. Trends and comparisons are unreliable until a clean 90-day post-cutover window is available (≈2026-06-08).

**Mixed-window caveat (use when combining GSC + GA4):**
> GSC data covers [date range]. GA4 data covers [date range]. These windows do not align — cross-source metrics are directional only.

**Low-volume caveat (use when <50 sessions or <20 clicks):**
> Sample size (N=[X]) is too small for reliable percentages. Findings are directional signals, not confirmed patterns.

**Measurement gap caveat (use when known gaps exist):**
> Known measurement gaps: [list]. Findings may undercount actual activity.

**Formatting rule:** Caveats go in the report header (data sources section), NOT buried in individual findings. A reader should know the limitations before seeing any numbers.

---

## 8. Period-over-period comparison rules

**Safe comparisons:**
- Same source, same window length, fully post-cutover periods only
- Example: GA4 sessions Mar 8–Apr 4 vs Apr 5–May 2 (both post-cutover, both 28 days)

**Unsafe comparisons:**
- Pre-cutover vs post-cutover (different site)
- GSC 90d vs GA4 28d (different windows)
- This month vs last month when one month spans the cutover date
- Week-over-week with <10 data points per week

**When comparisons become safe:**
- After 2026-06-08: first clean 90-day post-cutover GSC window
- After 2026-09-08: two clean 90-day windows available for trend comparison

---

## Cross-references

- Evidence tiers: `contracts/expert_rules_v1.md`
- Report format and mode labels: `contracts/final_report_rules_v1.md`
- Numeric provenance labeling: `contracts/numeric_provenance_v1.md`
- SEO interpretation: `contracts/seo_expert_playbook_nl_v1.md`
- PPC interpretation: `contracts/ppc_expert_playbook_v1.md`
- Key events definition: `config/conversions.yaml`
- Known measurement gaps: `config/project_state_v1.yaml`
