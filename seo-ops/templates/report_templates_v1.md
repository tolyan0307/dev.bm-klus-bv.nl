# Standard Report Templates v1

**Version:** 1.1
**Date:** 2026-04-07
**Purpose:** Fixed output shapes for all ad-hoc analysis reports. Weaker models MUST follow these templates exactly.

---

## Template 1: Decision Pack

**Use when:** User asks for actionable recommendations on a specific topic (page, query, cluster).
**Output path:** `reports/combined/{topic}_decision_pack_{date}.md`

```markdown
# Decision Pack — {Topic}

**Date:** YYYY-MM-DD
**Scope:** {what is covered}
**Report mode:** preliminary | verified | enrichment_only
**Live API calls:** none | {list with cost}

---

## 1. Objective
{What decision this pack supports — 1-2 sentences}

## 2. Data sources used
| Source | Artifact path | Freshness | Rows/records |
|--------|--------------|-----------|-------------|
| {source} | {path} | {age in days} | {count} |

## 3. Current state
{Factual summary of current metrics, positions, traffic — all with provenance labels}

## 4. Key findings
{3-7 numbered findings, each with:}
1. **{Finding title}** — {description}
   - Evidence: {data point with source label}
   - Confidence: low | medium | high
   - Impact: {what happens if ignored}

## 5. Recommended actions
| Priority | Action | Category | Confidence | Expected impact |
|----------|--------|----------|------------|-----------------|
| {high/medium/low} | {what to do} | {seo/content/technical/linking/metadata} | {low/medium/high} | {expected result} |

## 6. What should NOT be changed
{Explicit list of things that are working correctly and should be preserved}

## 7. Risks and uncertainties
{What could go wrong, what is unknown, what needs more data}

## 8. Provenance
- **Generated:** YYYY-MM-DD
- **Report mode:** {mode}
- **Data sources used:** {list with freshness}
- **Live API calls made:** {none or list}
- **Numeric confidence cap:** {state if any}
- **Known limitations:** {list}
```

---

## Template 2: Verification Audit

**Use when:** User asks to verify claims from a prior report or external source.
**Output path:** `reports/combined/{topic}_verification_audit_{date}.md`

```markdown
# Verification Audit — {Topic}

**Date:** YYYY-MM-DD
**Scope:** {what claims are being verified}
**Source document:** {what is being audited}
**Report mode:** preliminary | verified

---

## 1. Claims under review
| # | Claim | Source document section |
|---|-------|----------------------|
| 1 | {exact claim text} | {section/page} |

## 2. Verification method
{How each claim was checked — which artifacts, which fields}

## 3. Verification results
| # | Claim | Verdict | Evidence | Correct value | Source |
|---|-------|---------|----------|---------------|--------|
| 1 | {claim} | confirmed | partially_confirmed | corrected | refuted | {data} | {correct value if different} | {source label} |

## 4. Provenance errors found
{List of numeric claims that had wrong or missing provenance in original document}

## 5. Impact assessment
{Which incorrect claims matter for decisions, which are cosmetic}

## 6. Corrected summary
{If needed: corrected version of key findings from the audited document}

## 7. Provenance
{standard provenance footer}
```

---

## Template 3: Page Ownership Audit

**Use when:** User asks about query ownership, cannibalization, or page-vs-query alignment.
**Output path:** `reports/combined/{query_slug}_ownership_audit_{date}.md`

```markdown
# Page Ownership Audit — "{target query}"

**Date:** YYYY-MM-DD
**Target query:** {exact query}
**Expected owner page:** {URL}
**Report mode:** preliminary | verified

---

## 1. Current SERP state
| Position | Page | Impressions | Clicks | CTR | Source |
|----------|------|-------------|--------|-----|--------|
| {pos} | {url} | {n} | {n} | {%} | {gsc_api / dataforseo_api} |

## 2. Internal competition
| Page | Position | Impressions | Volume share | Role |
|------|----------|-------------|-------------|------|
| {url} | {pos} | {n} | {%} | owner | competitor | noise |

## 3. Diagnosis
- **Situation:** owner_page_weakness | true_cannibalization | no_issue | insufficient_data
- **Severity:** low | medium | high
- **Evidence:** {specific data points with source labels}

## 4. Root causes
{Numbered list of identified causes}

## 5. Recommended actions
| Priority | Action | Category | Files to change | Confidence |
|----------|--------|----------|-----------------|------------|
| {p} | {action} | {cat} | {file paths} | {confidence} |

## 6. What should NOT be changed
{Things that are working and should be preserved}

## 7. Monitoring plan
{What to check after changes, when to re-evaluate}

## 8. Provenance
{standard provenance footer}
```

---

## Template 4: Enrichment Note

**Use when:** DataForSEO or other external enrichment was run and results need documenting.
**Output path:** `reports/combined/{topic}_enrichment_note_{date}.md`

```markdown
# Enrichment Note — {Topic}

**Date:** YYYY-MM-DD
**Enrichment type:** serp_snapshot | ranked_keywords_gap | question_suggestions | other
**Report mode:** enrichment_only

---

## 1. What was run
| Workflow | Scope | Estimated cost | Actual cost | Source |
|----------|-------|---------------|-------------|--------|
| {workflow_id} | {scope} | ${est} | ${actual} | cost_log |

## 2. Key data points
{5-15 most relevant data points from the enrichment, each with source label}

## 3. How this enriches existing analysis
{What existing reports/decisions this data supports or changes}

## 4. What this does NOT tell us
{Limitations of the enrichment data}

## 5. Raw artifact locations
| Artifact | Path |
|----------|------|
| Raw API response | {path} |
| Normalized output | {path} |
| Report | {path} |

## 6. Provenance
{standard provenance footer — MUST include actual cost from cost_log}
```

---

## Template 5: Page SEO Diagnosis

**Use when:** User asks about a specific page's organic search performance — "why isn't page X getting traffic", "audit page X SEO", "what's wrong with page X".
**Governing contract:** `contracts/page_seo_diagnosis_rules_v1.md` — ALL rules from that file apply.
**Output path:** `reports/combined/{page_slug}_seo_diagnosis_{date}.md`

```markdown
# Page SEO Diagnosis — {page path}

**Date:** YYYY-MM-DD
**Target page:** {full URL}
**Report mode:** preliminary | verified
**Live API calls:** none | {list with cost}

**Analysis scope:**
- Requested page: {exact URL or path from user request}
- Requested channel: {organic | all-channel | specific}
- Requested period: {what user asked for, e.g. "last 30 days"}
- Requested question: {user's original question, verbatim or paraphrased}
- Actual data window: {e.g., GSC 2026-03-11 → 2026-04-07 (28d); GA4 2026-03-11 → 2026-04-07 (28d)}
- Scope match: {✅ period matches | ⚠️ mismatch — [reason and justification]}
- Primary sources used: {e.g., GSC page-level snapshot, GA4 landing-page snapshot, page inventory, on-page metadata}

**Excluded from this diagnosis:** historical paid campaigns, blended traffic explanations, competitor assumptions without evidence, cross-channel conversion attribution, live SERP verification (not performed).

---

## 1. Data sources used
| Source | Artifact path | Window | Freshness | Rows/records |
|--------|--------------|--------|-----------|-------------|
| {source} | {path} | {date range} | {age in days} | {count} |

> Note: GSC data covers [date range]. GA4 data covers [date range]. Findings are not cross-multiplied.

## 2. Search visibility snapshot
{Raw numbers only. No interpretation. All metrics must carry source + window + scope labels.}

| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Organic impressions | {n} | GSC | {date range} | page-level |
| Organic clicks | {n} | GSC | {date range} | page-level |
| Organic CTR | {%} | GSC | {date range} | page-level |
| Avg position | {n} | GSC | {date range} | page-level aggregate |
| Organic sessions | {n} | GA4 | {date range} | landing page = {path} |
| Engagement rate | {%} | GA4 | {date range} | landing page = {path} |

{Period-over-period delta if available (same source, same window length)}

## 3. Query fit analysis
{Top queries by impressions with clicks, CTR, position per query — all labeled}
{Query-intent alignment: which queries match page content, which don't}
{Missing queries: high-value terms the page should rank for but doesn't appear in GSC}

## 4. On-page signal review
- Title tag vs top query terms
- Meta description vs commercial intent queries
- H1/content alignment with query clusters
- Structured data presence and correctness
- Internal linking (inbound links from other site pages)

## 5. Supported interpretations
{Claims that follow from sections 2–4 with evidence tier 1–2.
Each interpretation must reference specific data from prior sections.
Alternative explanations must be stated for tier 2.}

## 6. Hypotheses requiring verification
{Claims at evidence tier 3. Each must state:}
1. **{Hypothesis}**
   - Supporting signal: {what suggests this}
   - Would confirm: {what evidence would upgrade this to tier 2}
   - Would refute: {what evidence would eliminate this}

{Hypotheses MUST NOT appear in "Do now" actions below.}

## 7. Actions
| Bucket | Action | Evidence level | Why now | Risk / reversibility |
|--------|--------|---------------|---------|---------------------|
| Do now | {action} | Tier 1–2 only | {data-backed timing} | {risk} |
| Monitor | {action} | Tier 2–3 | {what to watch, re-check window} | {risk} |
| Later / needs data | {action} | Tier 3–4 | {what's missing} | {risk} |

## 8. What should NOT be changed
{Things that are working and should be preserved — with evidence}

## 9. Provenance
- **Generated:** YYYY-MM-DD
- **Report mode:** {mode}
- **Data sources used:** {list with freshness and windows}
- **Live API calls made:** none | {list}
- **Numeric confidence cap:** {state if any}
- **Known limitations:** {list}
```

**Page SEO diagnosis-specific rules (in addition to general rules):**
- **Analysis scope block is mandatory** — must include requested page, channel, period, question, actual data window, scope match status, and primary sources used
- **Period mismatch = FAIL** unless explicitly disclosed and justified in scope block
- ALL metrics must carry source + window + scope — bare metric names are forbidden
- Sections 2–4 are observations only — no interpretation language
- Section 5 (interpretations) and section 6 (hypotheses) MUST be separate sections — do not merge
- Hypotheses (tier 3) MUST NOT appear in "Do now" actions
- Cross-page comparisons require explicit query-mix caveat
- "Excluded from this diagnosis" block is mandatory
- **Contradiction guard (§7 of page_seo_diagnosis_rules_v1):** title/summary must not contradict metric table
- **Speculative cause ban (§4):** domain authority, backlinks, featured snippets, engagement signals as ranking causes are forbidden without explicit evidence — hypothesis-only
- Forbidden phrasing without tier 1–2 evidence: "obvious cause", "clearly because", "catastrophic CTR", "Google does not understand the page", "Google does not equate", "page converts well", "The reason is", "The problem is", "main cause", "this tells us that" (EN+RU variants — see `contracts/page_seo_diagnosis_rules_v1.md` §4 causal language discipline table)

---

## Template 6: Indexation Diagnosis

**Use when:** User asks about indexation state of specific URLs — "is this page indexed", "why isn't this page in Google", "check indexation for these URLs".
**Governing contract:** `contracts/indexation_diagnosis_rules_v1.md` — ALL rules from that file apply.
**Output path:** `reports/seo/indexation_debug_{label}_{date}.md`

```markdown
# Indexation Debug Report

**Generated:** YYYY-MM-DD HH:MM UTC
**Report mode:** preliminary | verified
**Workflow:** indexation_debug_v1
**Contract:** contracts/indexation_diagnosis_rules_v1.md

---

## 1. Sources used
| Source | Path | Status |
|--------|------|--------|
| {source} | {path} | loaded / not found / limited mode |

## 2. Summary
**URLs analyzed:** {N}

| Outcome | Count |
|---------|-------|
| not_indexed_confirmed | {n} |
| indexed_but_visibility_unknown | {n} |
| indexed_with_low_search_evidence | {n} |
| canonical_mismatch_suspected | {n} |
| insufficient_evidence | {n} |

## 3. Per-URL diagnosis

### {URL}
**Outcome:** `{outcome_bucket}`

**Observations:**
- {factual observations from inspection + GSC data}

**Interpretations:**
- {evidence-backed conclusions, with evidence tier}

**Hypotheses (require verification):**
- {plausible but unconfirmed claims}
- Supporting signal: {what suggests this}
- Would confirm: {what evidence would upgrade to tier 2}
- Would refute: {what evidence would eliminate this}

**Recommended next checks:**
- {specific diagnostic steps}

**Excluded context:**
- {what was NOT available or NOT assessed}

---

## 4. Provenance
- **Generated:** YYYY-MM-DD
- **Report mode:** {mode}
- **Generator:** run_indexation_debug_v1.py
- **Contract:** contracts/indexation_diagnosis_rules_v1.md
- **Primary truth:** URL Inspection API response
- **Supporting data:** {list with availability}
- **Known limitations:** {list}
```

**Indexation diagnosis-specific rules:**
- **Primary truth is URL Inspection evidence** — GSC query/page data is supporting, not primary
- Observations and interpretations MUST be separate from hypotheses
- Hypotheses MUST include "would confirm" / "would refute" conditions
- Excluded context block is mandatory
- Forbidden: "Google doesn't understand", "penalized", "crawl budget problem", guaranteed fix promises
- If running in limited mode (no GSC data), state this explicitly and limit diagnosis to indexation state only
- Do NOT use this template for ranking/visibility diagnosis — use Template 5 (Page SEO Diagnosis) instead

---

## Template 7: Measurement Audit

**Use when:** User asks about measurement quality, data trustworthiness, GSC/GA4 discrepancies, or whether conclusions are supported by evidence — "can we trust these numbers", "is this a tracking problem", "is the data reliable enough".
**Governing contract:** `contracts/measurement_audit_rules_v1.md` — ALL rules from that file apply.
**Output path:** `reports/audits/measurement_audit_{scope}_{date}.md`

```markdown
# Measurement Audit Report

**Generated:** YYYY-MM-DD HH:MM UTC
**Report mode:** preliminary | verified
**Workflow:** measurement_audit_v1
**Contract:** contracts/measurement_audit_rules_v1.md
**Scope:** site | page:{path} | pages:{count}

---

## 1. Sources used
| Source | Path | Status | Source class |
|--------|------|--------|-------------|
| {source} | {path} | loaded / not found / limited mode | internal_artifact |

## 2. Site-wide measurement health (site scope only)
{(not set) proportion, pages with/without key events, overall measurement quality indicators}

## 3. Measurement quality summary
**Pages audited:** {N}

| Outcome | Count |
|---------|-------|
| measurement_looks_adequate | {n} |
| measurement_limited_low_volume | {n} |
| measurement_signal_mismatch | {n} |
| measurement_scope_mismatch | {n} |
| measurement_evidence_insufficient | {n} |

## 4. Per-page measurement diagnosis

### {page path}
**Outcome:** `{outcome_bucket}`

**Observations:**
- {factual observations from GA4 + GSC data}

**Interpretation boundaries:**
- {what can and cannot be concluded from available evidence}

**Hypotheses (require verification):**
- {plausible but unconfirmed claims}

**Recommended next checks:**
- {specific diagnostic steps}

**Excluded context:**
- {what was NOT available or NOT assessed}

**Caveats:**
- {applicable caveats: low volume, post-cutover, mixed window}

---

## Provenance
- **Generated:** YYYY-MM-DD
- **Report mode:** {mode}
- **Generator:** run_measurement_audit_v1.py
- **Contract:** contracts/measurement_audit_rules_v1.md
- **Thresholds:** config/thresholds/measurement_audit_v1.yaml
- **Primary truth:** GA4 landing page snapshots + conversions config
- **Supporting data:** GSC page snapshots (if available)
- **Known limitations:** {list}
```

**Measurement audit-specific rules:**
- **Primary truth is GA4 landing page evidence** — GSC is supporting, not primary
- Observations and interpretations MUST be separate from hypotheses
- Engagement metrics are NOT conversion proof — always caveat when citing
- Low volume (below threshold) means engagement rate / bounce rate should NOT be cited
- (not set) proportion assessment is mandatory for site-scope audits
- Forbidden: "tracking is broken", "page converts well" from proxies, "GA4 proves SEO quality"
- If running in limited mode (no GSC data), state explicitly and skip mismatch analysis
- Do NOT use this template for SEO performance diagnosis — use Template 5 (Page SEO Diagnosis) instead

---

## Template 8: Query Intelligence Review

**Use when:** User asks about query intent classification, SEO vs PPC query opportunities, page-query fit, or needs a structured query landscape review — "what are our best query themes", "is this an SEO opportunity or PPC negative", "which queries don't match the page", "classify these queries by intent".
**Governing contract:** `contracts/query_intelligence_rules_v1.md` — ALL rules from that file apply.
**Output path:** `reports/keywords/query_intelligence_review_v1_{label}_{date}.md`

```markdown
# Query Intelligence Review

**Generated:** YYYY-MM-DD HH:MM UTC
**Report mode:** preliminary | verified
**Workflow:** query_intelligence_review_v1
**Contract:** contracts/query_intelligence_rules_v1.md
**Scope:** site | page:{path} | query-set:{file}

> Intent classification is heuristic — based on keyword signal matching
> against `query_intent_taxonomy_v1.yaml`. It does not represent confirmed user intent.

---

## 1. Sources used
| Source | Path | Status | Rows | Source class |
|--------|------|--------|------|-------------|
| {source} | {path} | loaded / not found | {count} | internal_artifact |

**Taxonomy version:** {version}

## 2. Classification summary
**Total queries analyzed:** {N}

### By intent
| Intent | Count |
|--------|-------|
| {intent} | {n} |

### By action bucket
| Bucket | Count |
|--------|-------|
| {bucket} | {n} |

## 3. Top findings by bucket

### {bucket_name}
| Query | Impressions | Clicks | Position | Confidence |
|-------|-------------|--------|----------|------------|
| {query} | {n} | {n} | {pos} | {heuristic note} |

{For page_fit_mismatch: include mismatch details}

## 4. Interpretation boundaries
- {What can and cannot be concluded from this classification}

## 5. Recommended manual actions
| Priority | Action | Bucket | Confidence |
|----------|--------|--------|------------|
| {high/medium/low} | {action} | {bucket} | {confidence} |

## 6. Excluded context
- {What was NOT assessed or NOT available}

## Provenance
- **Generated:** YYYY-MM-DD
- **Report mode:** {mode}
- **Generator:** run_query_intelligence_review_v1.py
- **Contract:** contracts/query_intelligence_rules_v1.md
- **Taxonomy:** query_intent_taxonomy_v1.yaml (v{version})
- **Primary truth:** keyword_master + GSC query/page snapshots
- **Supporting data:** page_inventory (for fit assessment)
- **Known limitations:** {list}
```

**Query intelligence review-specific rules:**
- **Primary truth is keyword_master + GSC query/page data** — external enrichment is supplementary only
- Intent classification is heuristic and MUST be caveated as such
- Forbidden: "this keyword will convert", "this page owns this query" (without multi-source evidence), "DataForSEO proves BM Klus demand"
- Low-volume queries (< 10 impressions) must carry a low-volume caveat
- Page-query fit assessment compares inferred intent against page_inventory roles — not definitive
- Recommendations must be manual and conservative — no automatic exclusions
- Separate: query evidence observations → classification inference → page fit interpretation → action recommendation
- Do NOT use this template for page-level SEO diagnosis — use Template 5 (Page SEO Diagnosis) instead
- Do NOT use this template for keyword landscape review — use keyword_intelligence_review_v2 for that

---

## Template 9: Local SEO / GBP Audit

**Use when:** User asks about local SEO health, GBP visibility, review signals, local presence, or needs to separate site-side vs GBP-side local issues — "what's our local SEO status", "check GBP signals", "do we have review data", "is this a site problem or a GBP problem".
**Governing contract:** `contracts/local_seo_gbp_rules_v1.md` — ALL rules from that file apply.
**Output path:** `reports/seo/local_seo_gbp_audit_v1_{label}_{date}.md`

```markdown
# Local SEO / GBP Audit Report

**Generated:** YYYY-MM-DD HH:MM UTC
**Report mode:** preliminary | verified
**Workflow:** local_seo_gbp_audit_v1
**Contract:** contracts/local_seo_gbp_rules_v1.md
**Scope:** profile | reviews | combined
**Business entity:** {entity name}

> **Limited mode:** {if GBP data unavailable — disclose here}

---

## 1. Sources used
| Source | Path | Status | Source class |
|--------|------|--------|-------------|
| {source} | {path} | loaded / not available — limited mode | {class} |

## 2. GBP profile evidence
**Outcome:** `{outcome_bucket}`

**Observations:**
- {factual GBP performance data}

**Interpretations:**
- {evidence-backed conclusions about GBP visibility}

**Hypotheses (require verification):**
- {plausible but unconfirmed claims}

## 3. Review / reputation signals
**Outcome:** `{outcome_bucket}`

**Observations:**
- {review count, average rating, recent review summary}

**Interpretations:**
- {what the review signal suggests — with caveats}

## 4. Supporting site/search context
{Local intent queries from GSC — table with query, impressions, clicks, local signal}
{Location page coverage — N/M target locations covered}

## 5. Interpretation boundaries
- {what can and cannot be concluded from available evidence}

## 6. Recommended manual actions
- {specific next steps for operator}

## 7. Excluded context
- {what was NOT assessed or NOT available}

## Provenance
- **Generated:** YYYY-MM-DD
- **Report mode:** {mode}
- **Generator:** run_local_seo_gbp_audit_v1.py
- **Contract:** contracts/local_seo_gbp_rules_v1.md
- **Primary truth:** GBP Performance API + GBP Reviews API (when available)
- **Supporting data:** GSC query/page snapshots, page inventory (optional)
- **Known limitations:** {list}
```

**Local SEO / GBP audit-specific rules:**
- **Primary truth is GBP API data** — site/GSC/GA4 are supporting context, not substitutes
- GBP evidence and site evidence MUST be in separate sections — do not blend
- If GBP data unavailable: mandatory limited-mode banner at report top
- Forbidden: "profile ranks #1", "reviews guarantee leads", "Google prefers this business", competitor claims without data
- Review ratings are signals, not proof of service quality — always caveat
- Low GBP volume (< 50 impressions) MUST carry a low-volume caveat
- Do NOT use this template for site-level SEO diagnosis — use Template 5 (Page SEO Diagnosis) instead
- Do NOT use this template for measurement quality — use Template 7 (Measurement Audit) instead

---

## General template rules

1. **Do not skip sections.** If a section has no findings, write "None identified" or "Not applicable."
2. **Do not add sections** beyond what the template defines. Extra findings go into the nearest matching section.
3. **All numeric values must have provenance labels** per `contracts/numeric_provenance_v1.md`.
4. **Provenance footer is mandatory** in all reports.
5. **Report mode must be set** at the top of every report.
6. **If data is insufficient**, state this explicitly rather than filling gaps with assumptions.
7. **Template names are fixed** — do not rename or create hybrid templates.
8. **Source class labeling is mandatory.** Every "Data sources used" table must include a `Source class` column with one of: `internal_artifact`, `google_official`, `vendor_official`, `enrichment`, `market_observation`, `community_knowledge`. Per `contracts/source_hierarchy_rules_v1.md`, internal artifacts are primary truth; enrichment/external sources must be labeled explicitly. If a report uses enrichment data, the Provenance footer must note: "Enrichment sources used: {list}".

---

_These templates are the required output shapes for all ad-hoc seo-ops analysis reports._
