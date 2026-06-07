# Measurement Claims — Bad Pattern v1

> **Status:** ANTI-PATTERN — demonstrates common mistakes. Do not use as a template.

---

## Bad example

> Below is a **deliberately flawed** measurement interpretation. Each problematic section is followed by an explanation.

---

### Report excerpt

**Traffic & Conversion Analysis for /gevelisolatie/**

The page received 42 sessions last month, showing decent traffic. Average engagement time is 2:15 which is good — visitors are clearly interested in the content. The bounce rate of 45% is healthy.

Looking at traffic sources, most sessions come from organic search (28), followed by direct (8) and referral (6). The organic channel is performing well.

The page generated 3 form submissions, giving us a conversion rate of 7.1% (3/42). This is a strong conversion rate, confirming the page effectively converts visitors into leads. Combined with the good engagement metrics, we can conclude the page is a high-performing asset.

However, GA4 shows 5 sessions from "(not set)" landing page. This is normal GA4 behavior and doesn't affect our analysis.

---

## What is wrong

### 1. Engagement metrics treated as performance proof
- "Average engagement time is 2:15 which is good — visitors are clearly interested" — engagement time is a proxy metric. 2:15 could mean users are reading carefully, or it could mean the page is confusing and people scroll without finding what they need. "Clearly interested" is an overclaim from an ambiguous signal.
- "Bounce rate of 45% is healthy" — bounce rate thresholds are context-dependent. Without comparison to the same page in a prior window or similar pages on the same site, "healthy" is an unsupported label.

**Violated:** `measurement_interpretation_rules_v1` — engagement metrics must be presented with caveats, not as conclusive evidence.

### 2. "Converting well" at 3 conversions
- "3 form submissions... a strong conversion rate of 7.1%" — 3 conversions in 30 days is below the minimum threshold for performance conclusions (per expert_rules_v1: claims require ≥ 5 conversions / 30 days for even basic confidence). A 7.1% rate calculated from n=42 has enormous variance; one more or fewer conversion changes the rate by ~2.4 percentage points.
- "Confirms the page effectively converts visitors into leads" — this is a strong causal claim from insufficient data.

**Violated:** `expert_rules_v1` — minimum evidence thresholds for conversion claims.

### 3. Channel/source mixing
- "Most sessions come from organic search (28), followed by direct (8) and referral (6)" — while factually stated, the report then lumps all 42 sessions together for a single conversion rate. If conversions came from organic traffic only, the organic conversion rate is 3/28 = 10.7%; if from direct, it's different entirely. The blended rate obscures which channel actually generated leads.

**Violated:** `page_seo_diagnosis_rules_v1` — channel isolation is mandatory for SEO diagnosis.

### 4. Measurement issues dismissed
- "GA4 shows 5 sessions from '(not set)' landing page. This is normal GA4 behavior and doesn't affect our analysis" — (not set) sessions are a measurement issue, not "normal behavior." These 5 sessions could belong to /gevelisolatie/ or any other page. Dismissing them means the session count (42) and conversion rate are potentially wrong.

**Violated:** `measurement_interpretation_rules_v1` — (not set) entries must be flagged as a data quality concern, not dismissed.

### 5. No provenance labels
- None of the numbers (42 sessions, 2:15, 45%, 3 conversions) have source/window/scope labels. "Last month" is ambiguous — is this a calendar month? Last 28 days? Last 30 days?

**Violated:** `numeric_provenance_v1` — every numeric claim requires provenance.

### 6. Performance and measurement issues conflated
- The report treats the page as a "high-performing asset" while simultaneously having unresolved measurement issues ((not set) sessions, unknown conversion attribution by channel). Performance conclusions should come AFTER measurement issues are resolved or at minimum acknowledged as limiting factors.

**Violated:** `measurement_interpretation_rules_v1` — measurement issues must be separated from performance findings.

---

## Why it is risky

- **False positive on conversion performance.** Declaring a page "high-performing" at 3 conversions could prevent needed improvements or cause resources to be redirected away from this page based on a statistical fluke.
- **Measurement issues masked as normal.** If (not set) sessions are hiding misattributed traffic, the entire session/conversion analysis is built on inaccurate data — and the report told the reader not to worry about it.
- **Blended channel metrics hide problems.** If all 3 conversions came from direct traffic and organic produced zero, the organic landing page may actually need work — but the blended rate makes it look fine.
- **Engagement metric confidence creates false comfort.** Teams may deprioritize page improvements because "engagement is good," when the engagement data is ambiguous and the conversion data is insufficient.
