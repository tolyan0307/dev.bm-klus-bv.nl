# Verification Audit + Cannibalization Analysis: "gevelisolatie rotterdam"

**Date:** 2026-04-07
**Type:** Read-only verification + narrow decision analysis
**Scope:** Prior decision pack claims + "gevelisolatie rotterdam" query ownership
**Live API calls:** NONE

---

## 1. Scope of this task

**What was verified:**
- All major numeric/factual claims in `gevelisolatie_decision_pack_v1.md`
- DataForSEO cost and balance provenance
- SERP position claim for "gevelisolatie rotterdam"
- GSC data claims for the same query
- Cannibalization page count claim
- PPC waste/leakage claim

**What was consciously excluded:**
- Full gevelisolatie cluster re-analysis
- Sitewide SEO audit
- New DataForSEO or API runs
- Keyword master updates
- Any code/content/campaign changes

---

## 2. Artifacts reviewed

| Artifact | Path |
|----------|------|
| Decision pack v1 | `reports/combined/gevelisolatie_decision_pack_v1.md` |
| DataForSEO SERP snapshot (output) | `outputs/dataforseo_serp_snapshot_v1.json` |
| DataForSEO SERP snapshot (raw) | `snapshots/raw/dataforseo/dataforseo_serp_snapshot_v1.json` |
| DataForSEO SERP report | `reports/dataforseo/serp_snapshot_v1.md` |
| DataForSEO user_data (raw) | `snapshots/raw/dataforseo/dataforseo_user_data_v1.json` |
| GSC query-page raw (90d) | `snapshots/raw/gsc/gsc_query_page_last90d_raw.json` |
| GSC query-page normalized (90d) | `snapshots/normalized/seo/gsc_query_page_last90d.csv` |
| GSC aggregated queries (90d) | `snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv` |
| Combined snapshot (28d) | `data/processed/latest_combined_snapshot.json` |
| PPC review (output) | `outputs/ppc_review_campaign_23271040037_last30d.json` |
| Page audit gevelisolatie | `reports/pages/page_audit_gevelisolatie_v1.md` |
| Page-vs-query gap | `reports/seo/page_vs_query_gap_v1.md` |
| Page inventory | `snapshots/normalized/pages/page_inventory_v1.json` |

---

## 3. Verification audit of prior decision pack

### Claim A: SERP position 6 for "gevelisolatie rotterdam"

- **Prior claim:** "SERP snapshot: position 6 (live, April 7)"
- **Status:** ✅ CONFIRMED
- **Evidence:** `outputs/dataforseo_serp_snapshot_v1.json` → `own_positions[4]`:
  ```
  keyword: "gevelisolatie rotterdam"
  own_position: 6
  own_url: "https://bm-klus-bv.nl/gevelisolatie/"
  status: "ranking"
  ```
- **Important nuance (not in decision pack):** The ranking URL is `/gevelisolatie/` (main service page), NOT `/gevelisolatie/rotterdam/` (intended city page). The decision pack does not highlight this distinction clearly enough.

### Claim B: GSC — 1,369 impressions, position 8.0, 2 clicks (90d)

- **Prior claim:** "GSC: 1,369 impressions, pos 8.0, 2 clicks (90d)"
- **Status:** ⚠️ PARTIALLY CONFIRMED — impressions and clicks correct, position misleading

**Impressions (1,369):** ✅ CONFIRMED
Raw GSC data shows 6 page-level rows for "gevelisolatie rotterdam":

| Page | Impressions | Clicks | Position |
|------|----------:|-------:|---------:|
| `/gevelisolatie/` | 941 | 1 | 12.3 |
| `/` | 317 | 1 | 34.59 |
| `/onze-werken/` | 83 | 0 | 49.24 |
| `/gevelisolatie/rotterdam/` | 26 | 0 | 53.73 |
| `/gevelisolatie/dordrecht/` | 1 | 0 | 95.0 |
| `/onze-werken/rotterdam-...` | 1 | 0 | 8.0 |
| **Total** | **1,369** | **2** | — |

**Clicks (2):** ✅ CONFIRMED

**Position (8.0):** ⚠️ TECHNICALLY CORRECT but MISLEADING
- The value 8.0 comes from `gsc_query_page_aggregated_queries_last90d.csv` — this is GSC's query-level aggregation, which uses the best-ranking URL's position per impression.
- The primary ranking page `/gevelisolatie/` actually sits at position **12.3** with 941 impressions.
- The combined snapshot (28d window) shows position **6.8**.
- **Position 8.0 overstates typical visibility.** A more honest framing would be: "primary page at pos 12.3 (90d avg), with recent 28d trend improving to ~6.8."

**Corrected wording:** "GSC: 1,369 total impressions across 6 pages, 2 clicks. Primary ranking page /gevelisolatie/ at position 12.3 (941 impr). Query-level aggregate pos 8.0 includes GSC's best-URL selection bias."

### Claim C: 6 pages compete (cannibalization risk HIGH)

- **Prior claim:** "6 pages competing internally (cannibalization risk = HIGH)"
- **Status:** ⚠️ PARTIALLY CONFIRMED — count is correct, severity is overstated

**Page count (6):** ✅ CONFIRMED — exactly 6 pages appear in GSC for this query.

**Severity assessment:** ⚠️ OVERSTATED
Only 2 pages have meaningful impression volume:
- `/gevelisolatie/` — 941 impr (68.7% of total)
- `/` — 317 impr (23.2% of total)

The other 4 pages account for 8.1% of impressions combined and rank at positions 49–95 (deep noise). This is normal for a young site where Google tests multiple URLs.

**Corrected wording:** "6 pages appear in GSC for this query, but only 2 have meaningful volume (/gevelisolatie/ at 941 impr and homepage at 317 impr). The remaining 4 are deep-position noise (positions 49–95, combined 111 impr). This is partial overlap with homepage noise, not full-scale 6-way cannibalization."

### Claim D: PPC — EUR 193 / 55% went to 0-conversion keywords

- **Prior claim:** "EUR 193 PPC spend (55% of budget) went to 0-conversion keywords"
- **Status:** ✅ CONFIRMED
- **Evidence:** `ppc_review_campaign_23271040037_last30d.json` → executive_summary.main_weakness: "€193.42 spent on keywords with zero conversions (55.3% of budget)"
- **Total campaign cost:** €349.61 over 29 days
- **Calculation:** 193.42 / 349.61 = 55.3% ✓
- **Note:** Theme grouping (stuc_crepi, bekleden, steenstrips) is heuristic, but zero-conversion status is factual from Ads data.

### Claim E: 3 proven converting keywords

- **Prior claim:** "buitengevelisolatie (1 conv), buitenmuur isoleren (1 conv), gevel van buiten isoleren (1 conv)"
- **Status:** ✅ CONFIRMED
- **Evidence:** PPC review JSON → `protect_keywords` list matches exactly.
- **Note:** Decision pack also mentions voorgevel isolatie (1 conv, EUR 1) in section 7 table but not in the executive summary. That's a 4th converter.

### Claim F: 4 of 5 core keywords NOT in top 10

- **Prior claim:** "gevelisolatie, buitenmuur isoleren, gevelisolatie kosten, buitengevelisolatie — all NOT in top 10"
- **Status:** ✅ CONFIRMED
- **Evidence:** `outputs/dataforseo_serp_snapshot_v1.json` → `own_positions`: all 4 have `status: "not_found_in_top10"`

### Claim G: DataForSEO session cost ~$0.235

- **Prior claim:** "SERP snapshot ~$0.01, Gap ~$0.225, total ~$0.235"
- **Status:** ⚠️ UNVERIFIABLE — these are estimated costs, not measured
- **Evidence:** The SERP snapshot meta says `estimated_cost_usd: 0.01` — this is a pre-run guardrail estimate, not post-run actual cost from the API.
- **Note:** DataForSEO API responses include a `cost` field per task, but the user_data file's `money` section shows `total: 1, balance: 1`, which are clearly NOT dollar amounts (see section 4 below). There is no artifact in the repository that records verified post-run costs.
- **Corrected wording:** "Estimated DataForSEO spend for this session: ~$0.235 based on pre-run cost models. Actual cost was not captured from API response fields."

---

## 4. DataForSEO balance/cost issue

### What the decision pack claimed

| Line | Claim |
|------|-------|
| Section 12 | "Total DFS spend to date: ~$0.27" |
| Section 12 | "Remaining balance (est.): ~$0.69" |

### Source of the "~$0.69" error

**Root cause chain:**

1. The file `snapshots/raw/dataforseo/dataforseo_user_data_v1.json` contains a `money` object:
   ```json
   "money": {
     "total": 1,
     "balance": 1
   }
   ```
2. The analysis interpreted `money.total = 1` as **"$1.00 total deposited"**.
3. Then calculated: $1.00 − $0.27 (estimated spend) = ~$0.69 remaining.
4. **Actual balance per user: $50.86**.

### Why the interpretation was wrong

The `money.total: 1` and `money.balance: 1` values in the DataForSEO `user_data` endpoint are **NOT dollar amounts**. They are most likely:
- Access flags (1 = section available/enabled), OR
- API response field counts, OR
- Values in a different unit/scale

The actual balance field would require either:
- A different API endpoint or parameter
- Checking the DataForSEO dashboard directly

### What can be confirmed locally about costs

- **Pre-run cost estimates** from script guardrails are available (e.g., `estimated_cost_usd: 0.01` for SERP)
- **Actual per-task costs** are returned in each DataForSEO API response's `cost` field, but these were not captured into a dedicated cost-tracking artifact
- **Balance** cannot be confirmed from any local artifact

### Recommendation: how to prevent this in future reports

1. **Never derive balance from `user_data` money fields** without verifying their meaning against DataForSEO documentation.
2. **Capture actual `cost` values** from each API response into a cumulative cost log (e.g., `outputs/dataforseo_cost_log.json`).
3. **If balance is needed**, either (a) check the DataForSEO dashboard, or (b) use a verified API endpoint that returns dollar amounts.
4. **Any numeric claim about balance should be marked "user-reported" or "unverified"** unless derived from a confirmed source.

---

## 5. Cannibalization analysis for "gevelisolatie rotterdam"

### Query/theme examined

**Primary query:** "gevelisolatie rotterdam"
**Variant query:** "buitengevelisolatie rotterdam"

### Pages involved — "gevelisolatie rotterdam" (90d GSC raw data)

| # | Page | Impr | Clicks | Position | Role |
|---|------|-----:|-------:|---------:|------|
| 1 | `/gevelisolatie/` | 941 | 1 | 12.3 | **De facto ranker** — Google's current choice |
| 2 | `/` | 317 | 1 | 34.59 | Homepage noise — normal for young sites |
| 3 | `/onze-werken/` | 83 | 0 | 49.24 | Archive noise — irrelevant for this intent |
| 4 | `/gevelisolatie/rotterdam/` | 26 | 0 | 53.73 | **Intended owner** — currently very weak |
| 5 | `/gevelisolatie/dordrecht/` | 1 | 0 | 95.0 | Noise — wrong city page appearing |
| 6 | `/onze-werken/rotterdam-julianastraat-...` | 1 | 0 | 8.0 | Noise — project page, 1 impression |

### Pages involved — "buitengevelisolatie rotterdam" (90d GSC raw data)

| # | Page | Impr | Clicks | Position | Role |
|---|------|-----:|-------:|---------:|------|
| 1 | `/gevelisolatie/` | 113 | 0 | 4.29 | De facto ranker |
| 2 | `/gevelisolatie/rotterdam/` | 11 | 0 | 16.36 | Intended owner — weak |
| 3 | `/onze-werken/` | 10 | 0 | 34.2 | Noise |
| 4 | `/` | 1 | 0 | 6.0 | Noise |

### SERP confirmation

DataForSEO live SERP (April 7, 2026):
- **"gevelisolatie rotterdam"** → bm-klus-bv.nl at **position 6** with URL **`/gevelisolatie/`** (not `/gevelisolatie/rotterdam/`)

### Type of overlap

This is a **combination of three problems:**

1. **Owner page weakness** (primary issue)
   - `/gevelisolatie/rotterdam/` has only 26 impressions at position 53.73
   - It is NOT the page Google selects — Google clearly prefers `/gevelisolatie/`
   - The city page fails to compete for its own intended query

2. **Partial overlap between main service page and city page**
   - `/gevelisolatie/` captures 68.7% of impressions for a local query it shouldn't need to own
   - This is because the city page is too weak, not because the main page is doing anything wrong

3. **Normal young-site noise**
   - Homepage, archive, dordrecht page appearing with deep positions (34–95) is expected behavior for a site with 30 days of indexation history
   - This noise will likely self-resolve as Google settles on preferred URLs

**This is NOT full 6-way cannibalization.** It is primarily a **weak owner page problem** with secondary homepage/archive noise.

### Confidence level

- **HIGH** that `/gevelisolatie/` is currently the dominant ranker
- **HIGH** that `/gevelisolatie/rotterdam/` is not competing effectively
- **MEDIUM** that strengthening the city page will transfer ranking authority
- **LOW** that the noise pages (/, /onze-werken/, /dordrecht/) are causing material harm

---

## 6. Query ownership decision

### Intended owner page: `/gevelisolatie/rotterdam/`

**Why this is the correct owner:**
- It's the most specific page for the "[service] + [city]" search intent
- The main `/gevelisolatie/` page already carries 192 keywords across 9 themes — it's overloaded
- The site has a deliberate city page architecture (21 city pages exist)
- Long-term, the city page should be the canonical URL for local intent

**Why this is not simple:**
- Currently, Google ranks `/gevelisolatie/` at position 6 (SERP) / 12.3 (GSC 90d) for this query
- `/gevelisolatie/rotterdam/` is at position 53.73 — extremely far behind
- Premature aggressive "consolidation" (e.g., noindex/redirect on main page) would destroy the current position 6 ranking
- The transition must be gradual: strengthen the city page, then let Google migrate naturally

**Confidence:** HIGH that `/gevelisolatie/rotterdam/` is the right long-term owner. MEDIUM that this transition can happen within 2–3 months.

---

## 7. Minimal manual actions

### Action 1: Strengthen `/gevelisolatie/rotterdam/` on-page signals
- **Priority:** HIGH
- **What:** Review and improve the Rotterdam city page's title tag, H1, and body content for explicit local relevance. Ensure "gevelisolatie rotterdam" appears naturally in heading and first paragraph.
- **Why:** The city page ranks at position 53.73 — Google currently sees no reason to prefer it over the main page. On-page signals are the first lever.
- **Confidence:** HIGH
- **Channel:** SEO

### Action 2: Add internal link from `/gevelisolatie/` → `/gevelisolatie/rotterdam/`
- **Priority:** HIGH
- **What:** Add a prominent contextual internal link from the main gevelisolatie page to the Rotterdam city page, with "Rotterdam" in the anchor text.
- **Why:** Internal linking is the primary mechanism to signal to Google which page should own which intent. Currently there may be no strong link signal pointing to the city page.
- **Confidence:** HIGH
- **Channel:** SEO

### Action 3: Monitor position shifts for 4 weeks after changes
- **Priority:** MEDIUM
- **What:** After actions 1 and 2, wait 4 weeks and re-pull GSC data. Check whether `/gevelisolatie/rotterdam/` starts gaining impressions and improving position for "gevelisolatie rotterdam".
- **Why:** Premature further action without data would be guessing.
- **Confidence:** HIGH
- **Channel:** Measurement

### Action 4: Do NOT suppress `/gevelisolatie/` for this query
- **Priority:** HIGH (protective)
- **What:** Do not add noindex, canonical, or redirect signals that would weaken `/gevelisolatie/` for this query.
- **Why:** This is the ONLY page ranking in top 10 for "gevelisolatie rotterdam" (position 6 in live SERP). Removing it before the city page is ready would lose all current visibility.
- **Confidence:** HIGH
- **Channel:** SEO

### Action 5: Verify `/gevelisolatie/rotterdam/` is indexed
- **Priority:** MEDIUM
- **What:** Confirm in GSC URL Inspection that the Rotterdam page is indexed and has no crawl/index issues.
- **Why:** Position 53.73 could partially be explained by indexation problems. Rule this out first.
- **Confidence:** MEDIUM
- **Channel:** Measurement

---

## 8. What should NOT be done yet

| Action | Why premature |
|--------|---------------|
| Redirect /gevelisolatie/ to /gevelisolatie/rotterdam/ for local queries | Would destroy current position 6 ranking |
| Aggressive internal link restructuring across all city pages | This analysis only covers Rotterdam; other city pages need separate verification |
| Pausing PPC keywords based on this analysis | PPC findings are confirmed but 30 days is still too short; wait 2 more weeks |
| Creating new content/pages for "gevelisolatie rotterdam" | A dedicated page already exists; the issue is page strength, not page existence |
| Running full DataForSEO competitor analysis | Current data sufficient for this decision; save API budget |
| Running Workflow C (question suggestions) | Premature — consolidation and tracking first |
| Updating keyword_master to v4 | Not relevant to this narrow task |

---

## 9. Files produced

| File | Description |
|------|-------------|
| `seo-ops/reports/combined/verification_audit_rotterdam_v1.md` | This document |

No other files created. No files modified.

---

## 10. Live calls made

**None.** All findings derived from existing artifacts.

---

## Summary of prior claim verification

| Claim | Status | Key correction |
|-------|--------|----------------|
| SERP position 6 for "gevelisolatie rotterdam" | ✅ Confirmed | Ranking URL is /gevelisolatie/, not /rotterdam/ |
| GSC 1,369 impressions, 2 clicks | ✅ Confirmed | — |
| GSC position 8.0 | ⚠️ Technically correct | Misleading — primary page at 12.3; "8.0" is GSC query-level aggregate with best-URL selection bias |
| 6 pages compete (cannibalization HIGH) | ⚠️ Count correct, severity overstated | Only 2 pages have meaningful volume; 4 are deep-position noise |
| EUR 193 / 55% PPC waste | ✅ Confirmed | Theme grouping is heuristic but zero-conversion status is factual |
| 3 proven converting keywords | ✅ Confirmed | Actually 4 (voorgevel isolatie omitted from summary) |
| 4/5 core keywords not in top 10 | ✅ Confirmed | — |
| DataForSEO session cost ~$0.235 | ⚠️ Unverifiable | Pre-run estimates, not measured actual costs |
| DataForSEO remaining balance ~$0.69 | ❌ Incorrect | Derived from misinterpreted `user_data` field; actual balance $50.86 per user |

---

_Generated: 2026-04-07. Mode: verification + narrow analysis. No live API calls. No site changes._
