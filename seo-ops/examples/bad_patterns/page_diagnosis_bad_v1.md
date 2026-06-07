# Page Diagnosis — Bad Pattern v1

> **Status:** ANTI-PATTERN — demonstrates common mistakes. Do not use as a template.

---

## Bad example

> Below is a **deliberately flawed** page diagnosis. Each problematic section is followed by an explanation.

---

### Report

**Page: /gevelisolatie/**

The page /gevelisolatie/ is underperforming significantly. Traffic has dropped and the page is losing ground to competitors. Here's what's happening and what we need to fix.

**Performance Overview**

The page gets 1,240 impressions and 38 clicks. Position is around 14. CTR is low at 3.1% which shows the title and meta description aren't working well. Compared to industry benchmarks, this CTR should be at least 5-7% for a money page.

Sessions are 42 which confirms the traffic problem. No conversions were recorded, meaning the page fails to convert visitors.

**Root Cause Analysis**

The main cause of poor performance is that Google doesn't fully understand the page's topic. The content is too generic and doesn't match search intent well. Additionally, the domain is relatively new, so Google hasn't built enough trust yet.

Competitors like isolatie-specialist.nl and isolatievakman.nl are ranking higher because they have more authority and better-optimized content.

**Recommendations**

1. Rewrite the title tag to include "kosten" and "specialist" — this will improve CTR by 20-30%.
2. Add 500+ words of unique content to boost topical relevance.
3. Build 5-10 backlinks from local directories to increase domain authority.
4. The page should start ranking in top 5 within 2-3 months after these changes.

---

## What is wrong

### 1. No scope binding
- No explicit page, channel, window, or report mode declared.
- Reader doesn't know: what period? what data source? organic only or all channels?

**Violated:** `page_seo_diagnosis_rules_v1` — mandatory scope binding block.

### 2. Observations and conclusions are mixed
- "CTR is low at 3.1% which shows the title and meta description aren't working well" — the CTR observation and the cause claim are in the same sentence. 3.1% at position ~14 may actually be normal. The "shows" creates a false causal link.
- "No conversions were recorded, meaning the page fails to convert visitors" — absence of conversions could mean the tracking is broken, volume is too low, or conversions happen via a different path. "Meaning" collapses alternatives into one conclusion.

**Violated:** `final_report_rules_v1` — observations must be separate from interpretations.

### 3. No provenance labels on metrics
- "1,240 impressions," "38 clicks," "42 sessions" — none carry source, window, or scope labels. The reader cannot verify or reproduce these numbers.

**Violated:** `numeric_provenance_v1` — every numeric claim requires source + window + scope.

### 4. Speculative root cause presented as confirmed
- "The main cause of poor performance is that Google doesn't fully understand the page's topic" — this is unfalsifiable and anthropomorphises Google. There is no internal artifact that reveals Google's "understanding."
- "the domain is relatively new, so Google hasn't built enough trust yet" — plausible but Tier 3. Presented as if confirmed.

**Violated:** `expert_rules_v1` — Tier 3 hypotheses cannot be stated as confirmed causes. `official_source_usage_rules_v1` — Google's internal signals are not observable.

### 5. Competitor claims without evidence
- "Competitors like isolatie-specialist.nl are ranking higher because they have more authority" — no SERP data, no DataForSEO snapshot, no source cited. These are invented claims.

**Violated:** `source_hierarchy_rules_v1` — competitor claims require Rank 4 evidence (external enrichment) at minimum.

### 6. Guaranteed outcomes in recommendations
- "This will improve CTR by 20-30%" — no basis for this prediction. Title changes may or may not improve CTR; the magnitude is unknowable in advance.
- "Should start ranking in top 5 within 2-3 months" — ranking timelines cannot be promised.

**Violated:** `expert_rules_v1` — SEO overclaim patterns; `final_report_rules_v1` — unfalsifiable claims forbidden.

### 7. No hypotheses section
- Speculative ideas (Google trust, competitor authority) are embedded in the root cause section instead of being separated into a labelled Hypotheses section with Tier 3 status.

**Violated:** `page_seo_diagnosis_rules_v1` — hypotheses requiring verification must be in a separate section.

### 8. No excluded context / caveats
- No mention of what was NOT assessed. Reader assumes the analysis is complete when it isn't.

**Violated:** `final_report_rules_v1` — excluded context section is mandatory.

---

## Why it is risky

- **False confidence leads to wrong actions.** If the reader trusts the "root cause analysis," they may invest time and money in content rewrites and backlink campaigns that address speculative causes rather than verified issues.
- **Unverifiable claims erode trust.** When "CTR by 20-30%" doesn't materialise, the entire report loses credibility — including parts that were actually correct.
- **Missing scope makes the report unreproducible.** A second analyst cannot verify findings without knowing the data window, source, and channel.
- **Competitor claims without data create liability.** Stating competitor names and ranking positions without evidence could lead to incorrect strategic decisions.
