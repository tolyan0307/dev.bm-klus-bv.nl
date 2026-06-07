# Final Report Rules v1 — Output Quality Gate

**Purpose:** Every decision-grade report must pass these rules before delivery.
**Scope:** Applies to all reports saved to `seo-ops/reports/` and all structured analytical answers.

---

## 1. Mandatory three-part structure

Every analytical output must separate:

### Part 1 — Observations
Raw facts from data. Each observation must include:
- Source file or snapshot name
- Data window (dates)
- Metric with exact value
- No adjectives ("good", "bad", "weak") — only numbers and comparisons

### Part 2 — Interpretations
What the observations likely mean. Each interpretation must include:
- Which observations support it (reference by number or label)
- Evidence tier (per expert_rules_v1.md: confirmed fact / supported interpretation / working hypothesis)
- Alternative explanations considered (at least one for Tier 2–3)
- Confidence: low / medium / high

### Part 2b — Hypotheses (mandatory for page SEO diagnoses; recommended for all reports)
Working hypotheses (Tier 3) that require separate verification. Each must state:
- What would confirm or refute it
- What data is needed
This section MUST be separate from Part 2 — do not merge hypotheses into supported interpretations.

### Part 3 — Actions
What to do based on interpretations. Each action must include:
- **Why now** — what makes this timely vs deferrable
- **Evidence tier** — which interpretation drives it
- **Risk / reversibility** — what happens if action is wrong
- **Bucket** — one of: `do_now` | `monitor` | `later` | `needs_data`
- **Owner** — who executes (operator / site developer / ads manager / business owner)

---

## 2. Hypothesis escalation ban

- A working hypothesis (Tier 3) must NOT appear in the Actions section as `do_now`
- A working hypothesis may appear as `monitor` or `needs_data`
- If a report's main conclusion rests on a hypothesis, the report mode must be `preliminary`

### Page SEO diagnosis: additional FAIL-level rules

For reports of type **page_seo_diagnosis**, the following violations are **FAIL** (not WARN):

| Violation | Reference |
|-----------|-----------|
| Missing "Analysis scope" block (request binding) | `page_seo_diagnosis_rules_v1.md` §0 |
| Requested period ≠ actual data window without disclosure | `page_seo_diagnosis_rules_v1.md` §0 |
| Missing metric source + window + scope labels | `numeric_provenance_v1.md` §6b |
| Missing channel isolation (all-channel metrics as core evidence) | `page_seo_diagnosis_rules_v1.md` §1 |
| Missing hypotheses section (merged into interpretations) | `page_seo_diagnosis_rules_v1.md` §3 |
| Speculative cause presented as root cause / do-now | `page_seo_diagnosis_rules_v1.md` §4 |
| Missing excluded-context block | `page_seo_diagnosis_rules_v1.md` §1 |
| Internal contradiction between summary and metric table | `page_seo_diagnosis_rules_v1.md` §7 |

---

## 3. Project state gate

Before generating any report:

1. Load `seo-ops/config/project_state_v1.yaml`
2. Load `seo-ops/data/decision_log_v1.csv`
3. Apply these checks:

| Check | If true | Action |
|-------|---------|--------|
| Issue is in `resolved_issues` | Do not report as active problem | Reference resolution, verify current state |
| Action is in `pending_actions` | Do not recommend again as new | Reference pending entry, update status if new data |
| Action is in `decision_log` with status=done | Do not re-recommend | Note as implemented, assess effect if data available |
| Data window includes pre-cutover period | Flag in report header | Isolate post-cutover metrics where possible |

---

## 4. Data window disclosure

Every report must state in its header:

```
Data windows:
  GSC: [start] → [end] (N days; post-cutover: M days)
  GA4: [start] → [end] (N days; post-cutover: M days)
  Ads: [start] → [end] or "no fresh export"
  Enrichment: [source] [date] or "not available"
```

If different sections use different windows, disclose per-section.

---

## 5. Recommendation quality gate

A recommendation enters the final summary ONLY if:

- [ ] Based on Tier 1 or Tier 2 evidence
- [ ] Not already resolved or pending (project state check passed)
- [ ] Mechanism stated: input → expected output
- [ ] Risk acknowledged
- [ ] Bucket assigned
- [ ] Not contradicted by another finding in the same report

Recommendations that fail this gate may appear in an appendix labeled "Items for future consideration" but NOT in the main action list.

---

## 6. Report mode labels

| Mode | When to use | Allowed action buckets |
|------|-------------|----------------------|
| `verified` | All data fresh (< 7 days), post-cutover window ≥ 60 days | All |
| `preliminary` | Post-cutover window < 60 days OR stale data | `do_now` only for low-risk/reversible; rest = `monitor` |
| `enrichment_only` | External data added, no GSC/GA4 refresh | `needs_data` and `later` only |

Current default (as of 2026-04-08): **preliminary** — 31 days post-cutover.

---

## 7. Forbidden patterns in final output

| Pattern | Why forbidden | Fix |
|---------|--------------|-----|
| "The page is not performing well" | Vague, mixes metrics | State which metric, what value, what benchmark |
| "We recommend…" without evidence tier | Hides confidence level | Add tier label |
| Listing 10+ actions as "priority" | Dilutes focus | Max 5 `do_now`, rest in `monitor`/`later` |
| Comparing periods without stating dates | Reader can't verify | Always include date ranges |
| "As we can see…" / "Clearly…" | Rhetorical filler | Delete |
| Presenting GSC position < 50 as "not ranking" | Position 20–50 = visible but low | Say "ranking at position X (page Y of SERP)" |
| "The obvious cause is…" / "Clearly because…" | Presents hypothesis as confirmed cause | Use tier labels; state evidence level explicitly |
| "Catastrophic CTR" / "Extremely low CTR" | Emotional language hides context (position-band baseline) | State CTR value, position, and expected range for that position band |
| "Google does not understand the page" | Unfalsifiable claim without SERP/crawl evidence | State which signals are misaligned and what data supports this |
| "The page converts well" / "Good conversion rate" | Engagement ≠ conversion; requires lead/form evidence | State exact metric, source, and what "converts" means (key event name) |
| Bare metric without source + window + scope (in page SEO diagnosis) | Reader cannot verify or reproduce | Use format: "Value (Source, Window, Scope)" per page_seo_diagnosis_rules_v1 |
