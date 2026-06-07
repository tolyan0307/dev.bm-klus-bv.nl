# Indexation Debug

## Purpose
Diagnose indexation state for specific URLs using URL Inspection API evidence. Distinguish between indexation problems and ranking/visibility problems.

## When to use
- "Why is this page not indexed?"
- "Is this URL in Google's index?"
- "Check indexation state for these URLs"
- "Diagnose why this page gets no SEO clicks"
- "Is this an indexation problem or a ranking problem?"

## Workflow

### Step 1 — Collect inspection data
```bash
python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --url <URL>
python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --urls-file urls.txt --label <label>
```
This makes live GSC API calls — confirm before running.

### Step 2 — Run diagnosis
```bash
python seo-ops/analyzers/seo/run_indexation_debug_v1.py
python seo-ops/analyzers/seo/run_indexation_debug_v1.py --label <label> --prefer-window 28
```

### Step 3 — Read outputs
- JSON: `seo-ops/outputs/indexation_debug_v1.json`
- Report: `seo-ops/reports/seo/indexation_debug_<label>_<date>.md`

## Key distinctions

| Symptom | Likely category | What to check |
|---------|----------------|---------------|
| URL Inspection says "not indexed" | Indexation problem | robots, noindex, canonical, fetch errors |
| URL indexed but 0 impressions | Ranking/demand problem | query targeting, content relevance |
| URL indexed, impressions but 0 clicks | CTR/SERP problem | title, description, position |
| Canonical mismatch | Canonical problem | duplicate content, redirect chains |

## Contract
All outputs must follow `contracts/indexation_diagnosis_rules_v1.md`. No overclaiming, no guaranteed fixes, no anthropomorphic Google language.

## Do not
- Claim "crawl budget problem" without server log evidence
- Promise indexation after fixes
- Use URL Inspection as a ranking diagnostic (it confirms indexation, not ranking)
- Treat zero impressions as proof of non-indexation
