# Implementation Brief + Provenance Fix — Summary Report

**Date:** 2026-04-07
**Scope:** (A) Safe SEO brief for /gevelisolatie/rotterdam/, (B) DataForSEO cost/balance provenance fix
**Live API calls:** NONE

---

## 1. What was found

### Part A — /gevelisolatie/rotterdam/ page

- **Page data:** `lib/content/gevelisolatie-locations.ts` lines 23–71
- **Template:** `app/gevelisolatie/[location]/page.tsx` (shared by all 21 city pages)
- **Current title:** `Gevelisolatie Rotterdam – ETICS prijs per m²`
- **Current description:** `Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Opname op locatie en offerte per m². VCA-gecertificeerd.`
- **Current H1:** `Gevelisolatie in Rotterdam`
- **Internal links found:** 1 link from /gevelisolatie/ via MeerInformatieSection (below-fold, among 21 cities)
- **No prominent contextual link** from the main /gevelisolatie/ page body to the Rotterdam city page

### Part B — DataForSEO provenance

- **Client:** `seo-ops/integrations/dataforseo/client.py` — `user_data()` method had no warning about money fields
- **Smoke test:** `seo-ops/integrations/dataforseo/smoke_test_user_data.py` — extracted `money.balance` and reported it as account balance
- **Cost tracking:** Distributed across 5 analyzers, each reads `cost` from API responses but doesn't write to a central log
- **Raw artifacts confirm:** DataForSEO API responses DO contain reliable `cost` per task (e.g., $0.002 for SERP, $0.02 for keywords_for_site, $0.0109 for related_keywords)
- **Actual total spend (backfilled from raw artifacts):** $0.1028 — significantly less than the estimated ~$0.27

---

## 2. Files changed/created

| File | Action | Purpose |
|------|--------|---------|
| `seo-ops/integrations/dataforseo/cost_tracker.py` | **CREATED** | Centralized cost logging helper — `record_task_cost()` and `read_cost_log()` |
| `seo-ops/integrations/dataforseo/client.py` | **EDITED** | Added WARNING docstring to `user_data()` about unreliable money fields |
| `seo-ops/integrations/dataforseo/smoke_test_user_data.py` | **EDITED** | Added warning comment + UNVERIFIED label on balance + caveat note in report |
| `seo-ops/outputs/dataforseo_cost_log.json` | **CREATED** | Initialized with backfilled actual costs from existing raw artifacts |
| `seo-ops/reports/combined/rotterdam_implementation_brief_v1.md` | **CREATED** | Full implementation brief for /gevelisolatie/rotterdam/ |
| `seo-ops/reports/combined/rotterdam_brief_and_provenance_fix_v1.md` | **CREATED** | This summary report |

---

## 3. Part A — Implementation brief summary

### Minimal recommended page adjustments

**Only 2 field changes in 1 file:** `lib/content/gevelisolatie-locations.ts`

#### Change 1: Title (line 27)
- **From:** `Gevelisolatie Rotterdam – ETICS prijs per m²`
- **To:** `Gevelisolatie Rotterdam – Offerte op maat | BM klus BV`
- **Why:** Drops technical "ETICS" term, adds conversion-oriented "Offerte op maat", adds brand name. Keeps exact-match "Gevelisolatie Rotterdam" at start.

#### Change 2: Meta description (lines 28–29)
- **From:** `Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Opname op locatie en offerte per m². VCA-gecertificeerd.`
- **To:** `Gevelisolatie in Rotterdam door lokale specialisten. Stuc, sierpleister of steenstrips afwerking. Gratis opname op locatie — vraag uw offerte aan.`
- **Why:** Starts with exact query match. Adds "lokale specialisten" (differentiator). Ends with CTA.

### Internal link recommendation
The main /gevelisolatie/ page has a below-fold MeerInformatieSection that already links to /gevelisolatie/rotterdam/. An optional improvement: make "Rotterdam" in the WaaromBmKlusSection subtitle a hyperlink. **Not a priority — existing link structure is adequate.**

### What should NOT be changed
- H1 (already correct)
- Intro text (already strong and local)
- FAQ entries (well-written, Rotterdam-specific)
- JSON-LD schemas (correct)
- Page template (shared, do not modify for one city)
- Main /gevelisolatie/ page (do not suppress, redirect, or canonical)

---

## 4. Part B — Provenance fix details

### What was fixed

#### 4a. Warning on user_data money fields
- `client.py` → `user_data()` docstring now warns that `money.balance` and `money.total` are NOT USD amounts
- `smoke_test_user_data.py` → balance output now labeled "UNVERIFIED — see dashboard for actual USD balance"
- `smoke_test_user_data.py` → report template now includes explicit caveat note

#### 4b. Centralized cost logger
- New file `cost_tracker.py` provides:
  - `record_task_cost()` — appends actual cost from API response to `outputs/dataforseo_cost_log.json`
  - `read_cost_log()` — reads the log
  - `total_actual_spend()` — sums all recorded actual costs
- Each entry distinguishes: `actual_task_cost_usd` (from API) vs `estimated_cost_usd` (from guardrail)
- Each entry records `cost_source`: `api_response` | `manual_override` | `unavailable`

#### 4c. Backfilled cost log
`outputs/dataforseo_cost_log.json` initialized with 4 entries from existing raw artifacts:

| Analyzer | Scope | Actual cost | Estimated | Source |
|----------|-------|------------|-----------|--------|
| keyword_overview | 10 keywords | $0.011 | $0.05 | API response |
| related_keywords | 2 seeds | $0.0218 | $0.15 | API response |
| serp_snapshot | 5 keywords | $0.01 | $0.01 | API response |
| ranked_keywords_gap | 3 domains | $0.06 | $0.225 | API response |
| **Total actual** | | **$0.1028** | **$0.435** | |

**Key finding:** Actual total spend was $0.1028, not ~$0.27 as estimated. The guardrail estimates were 4x overestimates, particularly for `ranked_keywords_gap` ($0.06 actual vs $0.225 estimated).

### How balance claims are now prevented

1. `client.py` docstring explicitly warns against using `money` fields as USD
2. `smoke_test_user_data.py` labels any balance output as UNVERIFIED
3. Future analyzers should use `cost_tracker.record_task_cost()` to log actual costs
4. Reports should reference `outputs/dataforseo_cost_log.json` for verified spend, not the user_data response
5. Balance claims should only be made with source "user_reported" or "dashboard_verified"

### How future reports should label numbers

| Number type | Label | Source |
|-------------|-------|--------|
| Cost of a specific API call | `actual_task_cost_usd` | `cost` field in API response |
| Pre-run cost guardrail | `estimated_cost_usd` | Script constant × count |
| Total verified spend | Sum of `actual_task_cost_usd` | `outputs/dataforseo_cost_log.json` |
| Account balance | `user_reported_balance_usd` | Only from user or DataForSEO dashboard |
| Derived balance | **DO NOT USE** | — |

---

## 5. Files actually changed (diff summary)

### `seo-ops/integrations/dataforseo/client.py`
- Added 3-line warning docstring to `user_data()` method about unreliable money fields

### `seo-ops/integrations/dataforseo/smoke_test_user_data.py`
- Added 4-line comment block warning about money.balance interpretation
- Changed balance display to include "UNVERIFIED" label
- Added caveat note to markdown report output

### `seo-ops/integrations/dataforseo/cost_tracker.py` (NEW)
- ~120 lines. Provides `record_task_cost()`, `read_cost_log()`, `total_actual_spend()`

### `seo-ops/outputs/dataforseo_cost_log.json` (NEW)
- 4 backfilled entries from existing raw artifacts

### `seo-ops/reports/combined/rotterdam_implementation_brief_v1.md` (NEW)
- Full implementation brief with sections A1–A8

### `seo-ops/reports/combined/rotterdam_brief_and_provenance_fix_v1.md` (NEW)
- This report

---

## 6. Live API calls made

**None.** All data from existing artifacts.

---

## 7. Next-step instructions

### What you can safely implement now on /gevelisolatie/rotterdam/

1. Open `lib/content/gevelisolatie-locations.ts`
2. Change line 27 (title):
   ```typescript
   title: "Gevelisolatie Rotterdam – Offerte op maat | BM klus BV",
   ```
3. Change lines 28–29 (description):
   ```typescript
   description:
     "Gevelisolatie in Rotterdam door lokale specialisten. Stuc, sierpleister of steenstrips afwerking. Gratis opname op locatie — vraag uw offerte aan.",
   ```
4. Run `pnpm build` to verify
5. Run `npx tsc --noEmit` to verify
6. Check /gevelisolatie/rotterdam/ locally — confirm title and description
7. Check /gevelisolatie/den-haag/ — confirm it was NOT affected
8. Deploy
9. Request re-indexing in GSC URL Inspection
10. Check results after 4 weeks

### What the system will now do better for DataForSEO cost/balance provenance

- Future analyzers can import `from dataforseo.cost_tracker import record_task_cost` and log actual costs
- The cost log (`outputs/dataforseo_cost_log.json`) provides a single source of truth for verified spend
- The `smoke_test_user_data.py` no longer implies `money.balance` is a real USD balance
- Any future code that calls `client.user_data()` will see the warning docstring

**To integrate cost_tracker into existing analyzers** (optional future step):
After each API call in any analyzer, add:
```python
from dataforseo.cost_tracker import record_task_cost
record_task_cost(
    analyzer="run_dataforseo_serp_snapshot_v1",
    keyword_or_scope="gevelisolatie rotterdam",
    api_response=resp,
    estimated_cost_usd=0.002,
)
```
This is a recommended but non-urgent improvement. The existing analyzers continue to work without it.

---

## 8. What was consciously NOT done

| Excluded action | Reason |
|-----------------|--------|
| Full page content rewrite for Rotterdam | Brief provides direction only; 2 field changes are sufficient |
| Template modifications to page.tsx | Shared by 21 city pages, out of scope |
| Internal link restructuring on /gevelisolatie/ | Existing MeerInformatieSection link is adequate |
| Canonical/noindex/redirect changes | Explicitly prohibited per task rules |
| Retrofitting cost_tracker into all 5 analyzers | Non-urgent; cost_tracker exists, integration can be done per-analyzer as needed |
| Balance verification via live API call | No live calls policy; balance from dashboard only |
| New DataForSEO runs | Not needed for this task |
| Keyword master v4 | Out of scope |
| City page template overhaul | Out of scope |
| Broad sitewide SEO recommendations | Excluded by task definition |
| Documentation rewrite of workflows or architecture | Minimal fixes only applied |

---

_Generated: 2026-04-07. Mode: recommendation + minimal engineering fix. No live API calls. No site content changes applied._
