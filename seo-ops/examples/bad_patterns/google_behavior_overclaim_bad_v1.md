# Google Behavior Overclaim — Bad Pattern v1

> **Status:** ANTI-PATTERN — demonstrates common mistakes. Do not use as a template.

---

## Bad example

> Below is a **deliberately flawed** analysis excerpt. Each problematic section is followed by an explanation.

---

### Report excerpt

**Why /gevelisolatie/amsterdam/ is Not Ranking**

Based on Google's helpful content guidelines, the page lacks sufficient E-E-A-T signals. Google's algorithm evaluates expertise, experience, authoritativeness, and trustworthiness, and this page doesn't demonstrate enough of these qualities. According to a recent Search Engine Journal analysis, pages without author bios and detailed credentials are 40% less likely to rank in YMYL niches.

Google's crawl budget is likely being wasted on low-value city pages, which means Google deprioritizes crawling /gevelisolatie/amsterdam/. The Screaming Frog blog recommends consolidating thin pages to preserve crawl budget.

The page is penalized by Google's duplicate content filter because it shares boilerplate text with other city pages. Google views near-duplicate pages as low-quality and suppresses them from the index. This explains why the page has zero impressions in GSC.

To fix this, we should follow Ahrefs' recommendation to build topical authority clusters. Adding 10-15 supporting articles around "gevelisolatie Amsterdam" will signal to Google that the site is authoritative on this topic.

---

## What is wrong

### 1. Official docs used as proof of BM Klus-specific causation
- "Based on Google's helpful content guidelines, the page lacks sufficient E-E-A-T signals" — Google's guidelines describe what they value in general. They do not diagnose why a SPECIFIC page on bm-klus-bv.nl is or isn't ranking. Using general documentation to explain a specific result is a logical leap, not evidence.
- The report presents Google's public documentation as if it proves a cause-and-effect relationship for this particular URL.

**Violated:** `official_source_usage_rules_v1` — official sources explain system behavior in general; they cannot prove BM Klus-specific causation. `source_hierarchy_rules_v1` — Rank 2 sources support definitions and context, not site-specific root causes.

### 2. Third-party blogs cited as policy sources
- "According to a recent Search Engine Journal analysis..." and "The Screaming Frog blog recommends..." and "Ahrefs' recommendation..." — these are Rank 5 sources (community knowledge). They are being used as if they were authoritative policy: "40% less likely to rank" is a claim from a third-party study applied directly to BM Klus without verification.
- Blog recommendations are opinions, not Google policy. "Screaming Frog recommends consolidating thin pages" is advice from a tool vendor, not an indexation rule.

**Violated:** `source_hierarchy_rules_v1` — Rank 5 sources cannot substitute for Rank 1-2 evidence. Third-party blogs are not policy sources.

### 3. Google anthropomorphism and mind-reading
- "Google views near-duplicate pages as low-quality" — attributes a subjective judgment to an algorithm. We do not know what Google "views" or "thinks."
- "Google deprioritizes crawling" — states an internal Google system behavior as if directly observed. Crawl priority is not visible to site operators.
- "Google's algorithm evaluates expertise, experience..." — while E-E-A-T is documented as a quality rater guideline concept, the report claims the algorithm directly measures these qualities on this page, which is not something we can verify.

**Violated:** `expert_rules_v1` — forbidden causal language includes claims about Google's internal evaluation of specific pages. `page_seo_diagnosis_rules_v1` — speculative cause phrases are not allowed in the observations/interpretations sections.

### 4. "Penalized" without evidence of a penalty
- "The page is penalized by Google's duplicate content filter" — there is no "duplicate content penalty" in Google's documentation. "Crawled — currently not indexed" is not a penalty status. Using the word "penalized" implies a manual or algorithmic action that has not been verified via GSC manual actions report or any other Rank 1 source.

**Violated:** `expert_rules_v1` — overclaim patterns. `official_source_usage_rules_v1` — misrepresenting Google's documented behavior.

### 5. Crawl budget applied to a small site
- "Google's crawl budget is likely being wasted on low-value city pages" — crawl budget is a concern for sites with tens of thousands of pages. BM Klus has ~50 pages. Google's own documentation states crawl budget is not a concern for most small-to-medium sites.

**Violated:** `seo_expert_playbook_nl_v1` — this specific context is documented; crawl budget does not apply at BM Klus scale.

### 6. Action based entirely on Tier 3+ speculation
- "Adding 10-15 supporting articles" is a major content investment based entirely on a third-party blog's generic recommendation, not on any BM Klus-specific evidence of topical authority gaps.

**Violated:** `expert_rules_v1` — Tier 3 hypotheses cannot drive "do now" actions. Actions must be supported by Tier 1-2 evidence.

---

## Why it is risky

- **Misattributes cause, leads to wrong fix.** If the page isn't indexed because it's 33 days old on a new domain (a Tier 1 fact), creating 10-15 supporting articles wastes significant resources solving a problem that may resolve itself with time.
- **Erodes source discipline.** Once third-party blogs are accepted as policy sources, every future report can justify any recommendation by finding a supporting blog post. This makes the analysis system unfalsifiable.
- **"Penalty" language creates panic.** Telling a client their page is "penalized" when it's simply not yet indexed triggers urgency for dramatic changes. The actual situation may require patience, not intervention.
- **Anthropomorphism blocks clear thinking.** "Google doesn't understand the page" is not actionable — what specific technical or content signal would you change? Framing issues in terms of Google's "understanding" or "views" prevents precise diagnosis.
- **Undermines the source hierarchy.** The entire report relies on Rank 2 and Rank 5 sources to explain Rank 1 data. Internal artifacts (URL inspection, GSC data) should drive the analysis; external sources should only provide context.
