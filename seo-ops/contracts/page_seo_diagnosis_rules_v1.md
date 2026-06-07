# Page SEO Diagnosis Rules v1

**Scope:** Single-page SEO diagnostic requests — "why isn't page X getting traffic", "what's wrong with page X SEO", "why impressions but no clicks on page X".

**Activates when:** User asks about a specific page's organic search performance.

**Depends on:** `expert_rules_v1.md` (evidence tiers), `numeric_provenance_v1.md` (provenance labels), `measurement_interpretation_rules_v1.md` (data window safety), `seo_expert_playbook_nl_v1.md` (NL market context).

---

## 0. Request binding (mandatory)

Before building any page SEO diagnosis, the operator MUST lock the analysis scope by filling in a **Scope binding** block at the top of the report (immediately after the header):

```
**Analysis scope:**
- Requested page: {exact URL or path}
- Requested channel: {organic / all-channel / specific}
- Requested period: {e.g., last 30 days}
- Requested question: {user's original question, verbatim or paraphrased}
- Actual data window: {e.g., GSC 2026-03-11 → 2026-04-07 (28d); GA4 2026-03-11 → 2026-04-07 (28d)}
- Primary sources used: {e.g., GSC page-level snapshot, GA4 landing-page snapshot, page inventory, on-page metadata}
```

### Enforcement rules

| Rule | Severity |
|------|----------|
| Scope binding block is absent | **FAIL** — report cannot be delivered |
| Requested period differs from actual data window without explicit disclosure and justification | **FAIL** — reader will misinterpret temporal scope |
| Requested channel is "organic" but report uses all-channel metrics as core evidence | **FAIL** — channel contamination |
| Requested page differs from analyzed page | **FAIL** — scope drift |

If the actual data window cannot match the requested period (e.g., GSC only has 28d but user asked 30d), the report must state this in the scope binding block AND in the data sources section. This is a mandatory disclosure, not a stylistic choice.

---

## 1. Channel isolation

When the user asks for an SEO page diagnosis:

- **Primary truth sources:** GSC page metrics, GSC query-level data, GA4 organic-only sessions, page inventory, on-page content/metadata.
- **Paid context:** Include ONLY if (a) user explicitly requests it, or (b) paid campaign directly targets the same page AND you disclose this.
- **Forbidden:** Blended CTR language. Never write "CTR" that mixes paid and organic. Never use paid campaign history as a root cause for organic weakness unless explicitly scoped.

### Excluded-context block (mandatory)

Every page SEO diagnosis must include a short block:

> **Excluded from this diagnosis:** historical paid campaigns, blended traffic explanations, competitor assumptions without evidence, cross-channel conversion attribution, live SERP verification (not performed).

Modify only if a specific exclusion was explicitly brought into scope by the user (e.g., if live SERP check was actually performed, remove that item).

---

## 2. Metric labeling standard

Never write bare metric names. Every metric must carry: **source, window, scope**.

| Forbidden | Required format |
|-----------|----------------|
| clicks | Organic clicks (GSC, 28d, page-level) |
| impressions | Organic impressions (GSC, 28d, page-level) |
| CTR | Organic CTR (GSC, 28d, page-level) |
| position | Avg position (GSC, 28d, page-level aggregate) |
| sessions | Organic sessions (GA4, 28d, landing page = /path/) |
| engagement rate | Engagement rate (GA4, 28d, landing page = /path/) |

**Query-level metrics** must say so: "Avg position (GSC, 90d, query = 'buiten stucwerk', page-filtered)".

**If two different windows appear in the same section**, open with a disclosure:

> Note: GSC data covers [date range]. GA4 data covers [date range]. Findings are not cross-multiplied.

---

## 3. Diagnostic structure

Every page SEO diagnosis must follow this sequence. Do not merge sections.

### A. Search visibility snapshot
Raw numbers only. No interpretation. Table format preferred.
- Page-level: impressions, clicks, CTR, avg position (GSC, current window)
- Period-over-period delta if available (same source, same window)
- GA4 organic sessions + engagement (separate table or clearly labeled)

### B. Query fit analysis
- Top queries by impressions (with clicks, CTR, position per query)
- Query-intent alignment: which queries match page content, which don't
- Missing queries: high-value terms the page should rank for but doesn't appear in GSC data

### C. On-page signal review
- Title tag vs top query terms (exact match, partial, absent)
- Meta description vs commercial intent queries
- H1/content alignment with query clusters
- Structured data presence and correctness
- Internal linking (inbound links from other site pages)

### D. Supported interpretations
Claims that follow from A–C with evidence tier 1–2 (per `expert_rules_v1.md`).
Each interpretation must reference specific data from sections A–C.

### E. Hypotheses requiring verification
Claims at evidence tier 3. Each must state:
- What would confirm or refute it
- What data is needed

### F. Actions

Three buckets only:

| Bucket | Criteria | Evidence requirement |
|--------|----------|---------------------|
| **Do now** | Supported interpretation (tier 1–2), reversible, clear benefit | Must reference specific data |
| **Monitor** | Hypothesis (tier 3) or metric trend not yet conclusive | State what to watch and re-check window |
| **Later / needs data** | Requires data not currently available | State what's missing |

---

## 4. Forbidden inferences (cause inflation guard)

These observations are NOT causes by themselves. Do not present them as root causes without additional evidence:

| Observation | Why it's not automatically a cause |
|-------------|-----------------------------------|
| Low CTR at position 10–20 | Page 2 CTR is structurally low (~1–3%). Low CTR here is baseline, not anomaly. Only flag if CTR is significantly below position-band average. |
| Many unique queries (e.g., 100+) | Broad query spread can mean topical authority, not confusion. Only a problem if queries span unrelated intents AND page ranks poorly for all. |
| Suspected cannibalization | Requires: both pages >10 impressions for same query, position gap <5, different URL ranking in different periods. One page appearing for a related query is not cannibalization. |
| Good engagement rate | High engagement rate (GA4) does not mean the page converts well. Engagement = session duration + scroll, not lead/call/form. |
| Position improved but clicks didn't | Position 30→15 is still page 2. Click growth requires top 5–7. This is progress, not a problem. |
| Title doesn't contain exact query | Google rewrites titles. Partial semantic match may be sufficient. Only flag if primary commercial query is completely absent from title AND meta. |

### Speculative cause escalation ban

The following claims MUST NOT appear as stated root causes or "Do now" actions. They may appear ONLY as hypotheses (tier 3) with explicit evidence-level disclosure:

| Forbidden as root cause | Why | Allowed phrasing |
|------------------------|-----|-----------------|
| "Low domain authority causes…" | DA is a third-party proxy, not a Google ranking factor | "Hypothesis: domain authority gap may limit ranking ceiling (requires: competitor DA comparison + SERP feature analysis)" |
| "Lacks backlinks therefore…" | No backlink data available in current toolset | "Hypothesis: external link profile may be a factor (requires: backlink audit via Ahrefs/DataForSEO)" |
| "Featured snippet steals traffic" | No SERP feature data to confirm | "Hypothesis: SERP features may suppress organic CTR (requires: SERP snapshot)" |
| "Engagement signals hurt/help ranking" | GA4 engagement ≠ Google ranking signal, causation unproven | State GA4 engagement as observation only |
| "Google does not understand the page" | Unfalsifiable without crawl/render data | State which specific signals are misaligned (title/H1/schema vs queries) |
| "Page converts well / good conversion rate" | Engagement ≠ conversion; requires key_event evidence | State exact metric name, source, and what "conversion" means |

### Causal language discipline

**Forbidden phrasing** (any evidence tier, unless backed by tier 1 confirmed fact):

| Language (EN) | Language (RU) | Why forbidden |
|---------------|---------------|---------------|
| "the main cause" / "the primary cause" | "главная причина" / "основная причина" | Implies singular root cause without elimination of alternatives |
| "the obvious cause" / "clearly because" | "очевидная причина" / "очевидно потому что" | False certainty without evidence tier |
| "this tells us that" / "this shows that" | "это говорит о том, что" / "это показывает, что" | Presents interpretation as confirmed fact |
| "Google does not understand the page" | "Google не понимает страницу" | Unfalsifiable without crawl/render data |
| "Google does not equate" / "Google does not treat X as Y" | "Google не приравнивает" | Internal algorithm claim without evidence |
| "the page converts well" | "страница хорошо конвертит" | Engagement ≠ conversion without key_event data |
| "The reason is" / "The problem is" / "This causes" | "Причина в том, что" / "Проблема в том, что" | Causal claim requires tier 1–2 evidence |
| "catastrophic CTR" | "катастрофический CTR" | Emotional language, not analytical |

**Required soft phrasing** for supported interpretations (tier 2):

- "likely driver" / "likely contributor"
- "suggests" / "may indicate"
- "consistent with" / "points toward"
- "needs separate verification"

### Hypothesis markers

When stating something that is tier 3 (hypothesis), use explicit language:

- "This suggests..." / "This may indicate..."
- "Hypothesis: ... (requires verification by ...)"

Never: "The reason is...", "This causes...", "The problem is..." — for tier 3 claims.

---

## 5. Comparison safety rules

### Allowed
- Same page, same metric, same source, different periods (period-over-period)
- Same source, same window, different pages — with explicit caveat about query mix differences
- Query-level metrics within same page's GSC data

### Forbidden or requires heavy caveat
| Comparison | Problem |
|-----------|---------|
| Homepage CTR vs service page CTR | Query mix completely different. Not comparable without intent-normalized caveat. |
| GSC 28d clicks + GA4 90d sessions in one conclusion | Different windows, different counting methods. State both separately. |
| "Page X gets Y sessions but only Z conversions" | GA4 sessions ≠ GSC clicks. Conversion requires separate evidence path. |
| Cross-page position comparison without query overlap | Pages rank for different queries. Position 8 for one query set ≠ position 15 for another. |

---

## 6. Action quality rules

Every recommended action must include:

- **Why now:** What specific data (with source/window) supports acting now vs waiting
- **Evidence level:** Tier 1–2 (supported) or Tier 3 (hypothesis) — per `expert_rules_v1.md`
- **Risk / reversibility:** Can this be undone? What breaks if it's wrong?
- **Bucket:** Do now / Monitor / Later

**Escalation ban:** Tier 3 hypotheses cannot appear in "Do now". They go to "Monitor" or "Later / needs data".

---

## 7. Contradiction guard (mandatory self-check)

Before submitting a page SEO diagnosis, the operator MUST verify that the report does not contain internal contradictions. The following patterns are **FAIL**-level if detected:

| Contradiction pattern | Example | Why it's FAIL |
|----------------------|---------|---------------|
| Title/summary says "0 clicks" or "no clicks" but metric table shows clicks > 0 | Title: "Page gets no organic traffic" / Table: "Organic clicks: 14" | Reader trusts the summary; metric table contradicts it |
| Summary says "no traffic" / "does not get SEO traffic" while evidence shows non-zero organic clicks or sessions | "The page has no organic visibility" + clicks = 47 | Direct factual contradiction |
| Summary says "growing" / "improving" but delta shows decline | "Traffic is improving" + Δ clicks = −12% | Direction mismatch |
| "Converts well" / "good conversion rate" without any conversion (key_event) evidence | "The page converts visitors well" + no form/call/lead data | Unsubstantiated positive claim |
| "Do not touch content" recommendation while data sample is too small to justify inaction | "Content is working" based on <10 clicks | Premature confidence |
| Recommendation contradicts finding in same report | Finding: "title matches primary query" / Action: "rewrite title for primary query" | Internal logic break |

This is a self-check, not an automated NLP validator. The operator must read their own summary, title, and findings before delivery and verify no contradictions exist.

---

## 8. Quick-reference checklist

Before submitting a page SEO diagnosis, verify:

- [ ] **Scope binding block is present** with requested page, channel, period, question, actual data window, and primary sources used
- [ ] **Requested period matches actual data window** (or mismatch is explicitly disclosed and justified)
- [ ] All metrics carry source + window + scope
- [ ] GSC and GA4 data windows are disclosed if both appear
- [ ] Paid context is excluded (or explicitly scoped in)
- [ ] Excluded-context block is present
- [ ] Observations, interpretations, and hypotheses are in separate sections
- [ ] No tier 3 claim appears in "Do now" actions
- [ ] No bare "CTR" / "clicks" / "sessions" without channel label
- [ ] Comparisons across pages include query-mix caveat
- [ ] Comparisons across sources include window-mismatch disclosure
- [ ] "Cause" language is only used for tier 1–2 findings
- [ ] **No internal contradictions** between title/summary and metric table (§7)
- [ ] **No speculative cause escalation** — forbidden causes are hypothesis-only (§4)
