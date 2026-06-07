# Expert Rules v1 — Reasoning Precision Contract

**Purpose:** Enforce strict separation of evidence tiers in all SEO/PPC analysis.
**Scope:** Applies to any analytical output — reports, chat answers, recommendations.

---

## 1. Evidence tiers — use explicitly

| Tier | Label | Definition | Can drive action? |
|------|-------|------------|-------------------|
| 1 | **Confirmed fact** | Directly observed in data with known source, window, and provenance | Yes |
| 2 | **Supported interpretation** | Logical inference from ≥2 confirmed facts, internally consistent | Yes, with caveat |
| 3 | **Working hypothesis** | Plausible explanation based on limited/indirect evidence | No — monitor/test only |
| 4 | **Future exploration** | Question worth investigating; no current evidence either way | No — queue only |

**Rule:** Every claim in a report must carry one of these labels (explicitly or via section placement). Never present Tier 3–4 as Tier 1–2.

---

## 2. What NOT to infer from

### Low-volume PPC data (budget ≤ €15/day)
- Do not calculate meaningful CPA from < 10 conversions
- Do not declare keyword "unprofitable" from < 30 days of data
- Do not compare campaign performance across periods with different budgets
- Safe to report: spend, impression share, click volume as raw facts

### Post-cutover SEO instability (first 90 days after 2026-03-08)
- Do not treat position drops as "problems" — expect volatility
- Do not compare pre-cutover vs post-cutover metrics as same-site trend
- Do not conclude "page is failing" from < 60 days of post-cutover data
- Safe to report: current positions, impression counts, CTR — as baseline, not verdict

### Mixed-window metrics
- If a 90-day snapshot includes pre-cutover data, state this explicitly
- Never average across pre/post cutover without disclosure
- When possible, isolate post-cutover window (use period comparison fields)

### Legacy tails
- Old WordPress URLs still in index ≠ current site problem
- Impressions on legacy URLs ≠ evidence of current content issue
- Legacy duplicates are redirect candidates, not content failures

---

## 3. What counts as a strong recommendation

A recommendation is strong (= "do now") only when ALL of:
- Based on Tier 1 or Tier 2 evidence
- Clear mechanism: what changes → what improves → why we believe this
- Reversible or low-risk if wrong
- Not already implemented (check project_state_v1.yaml and decision_log_v1.csv)

A recommendation is conditional (= "monitor / test") when ANY of:
- Based on Tier 3 evidence
- Mechanism is plausible but not proven
- Sample size is small
- Effect size is uncertain

---

## 4. What stays caveat-only

- Any conclusion from < 100 impressions on a single query
- Any CTR inference at positions > 20 (SERP page 3+, CTR is structurally near-zero)
- Any conversion-rate claim from < 20 sessions
- Any "trend" from < 3 comparable data points
- Any cross-page comparison where pages launched at different times

---

## 5. SEO/PPC anti-overclaim rules

| Forbidden pattern | Why | Instead say |
|-------------------|-----|-------------|
| "Page is not performing" | Conflates visibility, CTR, conversions | Specify which metric is weak and at what tier |
| "Keyword X doesn't work" | Keyword may work at different position/match type | "At current position Y, query X generates Z impressions with W% CTR" |
| "Campaign is wasting budget" | Requires proven alternative allocation | "Campaign spent €X with Y conversions; efficiency unclear at current volume" |
| "Competitors outrank us" | Requires SERP evidence, not just position data | "Our average position is X; SERP composition unknown without enrichment" |
| "This will increase traffic" | Prediction, not fact | "If position improves to top-10, estimated CTR curve suggests ~N% CTR" |
| "Issue resolved" | Requires post-fix measurement | "Fix deployed on [date]; effect measurable after [date]" |

---

## 6. Project state check — mandatory

Before finalizing any report or recommendation set:

1. Read `seo-ops/config/project_state_v1.yaml`
2. Read `seo-ops/data/decision_log_v1.csv`
3. Cross-check: is any recommendation already in `pending_actions` or `decision_log`?
4. Cross-check: is any "problem" already in `resolved_issues`?
5. If yes — do not re-report as new finding. Reference existing entry.
