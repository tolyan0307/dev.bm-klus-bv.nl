# CLAUDE.md — seo-ops

Scope: this file governs Claude's behavior **inside `seo-ops/`** (SEO / PPC / measurement / page analysis work for BM klus BV). The root `CLAUDE.md` still applies; this document refines behavior for analytical tasks and does not override project-wide guardrails.

---

## 1. Project identity

- `seo-ops/` is an **evidence-first, read-only recommendation system** for bm-klus-bv.nl.
- Claude acts as an orchestrator: it reads snapshots, runs existing analyzers/tools, and produces structured recommendations.
- The user implements changes manually. **No automatic website edits. No automatic Google Ads edits. No auto-publishing.**
- Priority cluster: `/gevelisolatie/`.
- Primary conversions: `Contact_Form_Site`, `Phone`, `Whatsapp`.
- Site cutover: **2026-03-08**. Google Ads structural change: **2026-03-15**.

---

## 2. Source hierarchy (truth-layer discipline)

Full rules: `contracts/source_hierarchy_rules_v1.md`. Short form:

| Rank | Source | Use for |
|------|--------|---------|
| 1 | Internal artifacts: GSC, GA4, Google Ads CSVs, URL Inspection, local page inventory | Primary truth for BM klus performance, measurement, and state |
| 2 | Google official docs (Search Central, GSC/GA4/Ads API) | Platform behavior, metric semantics, system constraints |
| 3 | Vendor docs (DataForSEO) | Truth about the vendor's own system, not about Google behavior |
| 4 | DataForSEO API outputs, manual SERP, competitor observation | **Enrichment only** — directional context |
| 5 | Blogs / forums | Background only — never policy, never primary evidence |

**Rules:**
- DataForSEO never replaces GSC for BM klus position/performance claims.
- Enrichment data must be labeled `[DataForSEO enrichment]` / `[competitor observation]` / `[manual SERP]`.
- If a claim has no authoritative source, say so explicitly — do not fill the gap with community knowledge.
- Pre-cutover data (before **2026-03-08**) is legacy noise by default. Only use it when intentionally investigating old-site tails — and label it clearly.
- Do not mix pre- and post-**2026-03-15** Google Ads structure data unless the task explicitly requires the comparison.

---

## 3. Read-only and recommendation-only

- Claude reads data and writes **reports**. Claude does not edit the website, WordPress, or Google Ads assets.
- No scheduled/auto-running jobs. Every workflow runs on explicit user request.
- No secrets or tokens may be printed in chat, committed to git, or written into docs/reports. If a path/env var is needed, reference it by name (e.g., `GOOGLE_APPLICATION_CREDENTIALS`), never by value. See `.gitignore` for the excluded credential files.
- Sensitive identifiers (customer IDs, property IDs, account IDs) are OK in reports if already in configs; do not invent or guess them.

---

## 4. Behavioral deltas for analytical work

The root `CLAUDE.md` already defines the four working principles (Think before coding, Simplicity first, Surgical changes, Goal-driven verification). **They apply in full here.** This section lists only the deltas specific to read-only analytical work in `seo-ops/`.

**Think before analyzing**
- Before touching data or configs, re-read the relevant contract in `contracts/` and the task's primary source listed in `README.md`.
- A simpler path almost always exists: **existing snapshot → existing analyzer output → rebuild snapshot → new live API call**. Name the cheapest path that answers the question before picking a heavier one.
- Do not conflate URL age, page-existence age, content-version age, and ranking-signal age. Surface which one matters for the claim.

**Simplicity first**
- No new analyzers, workflows, contracts, or config keys unless the task requires them. Extend existing artifacts before adding new ones.
- Prefer existing artifacts over new live calls (cost, rate limits, reproducibility).

**Surgical changes**
- The root rule "every changed line traces to the request" extends to configs, contracts, templates, and snapshots — not just code.
- Do not refactor existing contracts, report templates, or provenance schemes.

**Goal-driven — restate as analytical goals**
- "Проверь, почему /muren-stucen/ не получает SEO-трафик" → pull GSC 28d query+page data for the page, produce a `page_seo_diagnosis` with observations / interpretations / hypotheses separated, list prioritized manual actions.
- "Сделай Ads review за последние 30 дней" → use existing Ads snapshot if fresh; otherwise declare staleness and stop or rebuild; produce `ppc_review` per `contracts/ppc_expert_playbook_v1.md`, respecting the ~10 EUR/day budget reality.
- "Проверь claims из прошлого PPC review" → verification mode only; do not expand scope; re-check each claim against its cited source.

---

## 5. Anti-overengineering (seo-ops specific)

- Do **not** rebuild seo-ops architecture. Use existing workflows, analyzers, contracts, templates, validators, snapshots, and reports first.
- Add a narrow mini-workflow **only** if there is a real operational need and nothing in `workflows/`, `analyzers/`, or `tools/` already covers it. Prefer extending an existing artifact over creating a new one.
- Do not generalize from a single request into a framework. Single-use analysis stays single-use.
- Do not invent new numeric-provenance schemes, evidence tiers, or report shapes — they are defined in `contracts/` (`numeric_provenance_v1.md`, `expert_rules_v1.md`, `final_report_rules_v1.md`).
- Do not create new config keys unless the task's implementation requires a path that doesn't exist yet — and only then in the narrowest possible location.
- Do not route around existing enforcement tools (`tools/run_preflight_check.py`, `tools/validate_report_provenance.py`, `tools/init_report_scaffold.py`) with ad-hoc logic.

---

## 6. Report quality rules

All decision-grade reports must separate:
1. **Observations** — what the data shows (numeric, with provenance label).
2. **Interpretations** — what the observations likely mean, with confidence (low / medium / high).
3. **Hypotheses** — plausible explanations that need more evidence; labeled as hypotheses, not facts.
4. **Recommended actions** — concrete manual steps for the user, ordered by priority.
5. **Excluded / stale context** — legacy data ignored, stale artifacts, missing sources, and *why*.

Additional requirements:
- Every numeric claim carries a provenance label per `contracts/numeric_provenance_v1.md` (e.g. `[GSC, 28d, page-level]`, `[GA4, 28d, landing-page]`, `[Ads CSV, 30d, campaign]`).
- Never present a hypothesis as a fact. Never conflate URL age, page-existence age, content-version age, and ranking-signal age.
- Confidence must be explicit (low / medium / high) and must respect the preflight `confidence_cap` for the report mode (`preliminary` / `verified` / `enrichment_only`).
- Do not re-recommend actions that are already implemented — check `data/decision_log_v1.csv` and `config/project_state_v1.yaml` first.
- No fake certainty from low-volume PPC data. Budget is ~10 EUR/day; statistical significance is rarely available.
- Use the existing templates in `templates/report_templates_v1.md` and `templates/export-file-naming.md`. Use `tools/init_report_scaffold.py` to start new reports.

---

## 7. Verification and preflight expectations

Before running any analytical workflow:
1. **Preflight.** Run `python seo-ops/tools/run_preflight_check.py {workflow}` (or check freshness per `config/preflight_rules_v1.yaml`). If required artifacts are stale or missing, either rebuild them or stop and tell the user — do not silently analyze stale data.
2. **Mode selection.** Pick `preliminary` / `verified` / `enrichment_only` per `preflight_rules_v1.yaml`. The confidence cap follows the mode.
3. **Project state.** Check `config/project_state_v1.yaml` and `data/decision_log_v1.csv` for resolved issues and pending actions so recommendations do not repeat completed work.
4. **Source manifests.** If citing official or external sources, use `config/official_sources_manifest_v1.yaml` and `config/external_sources_manifest_v1.yaml`.

Before reporting a task done:
- Report mode and confidence cap are declared.
- All numeric claims carry provenance labels.
- Observations / interpretations / hypotheses / recommendations / excluded context are separated.
- Run `python seo-ops/tools/validate_report_provenance.py {report.md}` on any new markdown report.
- No secrets, tokens, or raw credential paths leaked into report, chat, or git.
- No unrelated files edited. No analyzer code changed unless explicitly requested.
- Recommendations respect the read-only rule — they describe what the user should do manually.

_Signals these rules are working: smaller diffs, fewer drive-by edits, clarifying questions asked up front, reports that are easy to audit because facts and hypotheses are visibly separated._

---

## 8. When in doubt

- Prefer the existing contract over a new interpretation.
- Prefer the existing artifact over a new live call.
- Prefer "I don't have sufficient evidence" over a plausible-sounding guess.
- Ask the user. Narrow the scope.
