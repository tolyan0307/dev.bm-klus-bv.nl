# Full Audit — Phase 0 Preflight

- **Run date:** 2026-06-06 (system date)
- **Mode:** READ-ONLY / data collection. No site/Ads/GA4/GTM/GBP/WP changes.
- **Working dir:** `D:/projects/bmklus/v0-site/site`
- **Preflight method:** live non-interactive auth ping (no interactive OAuth, no secrets printed).
  Script: `seo-ops/tools/.tmp_preflight_full_audit.py`. Raw: `raw/_preflight_status.json`.

---

## Preflight status table

| Source | Auth | Can pull? | Blocker | Next step |
|--------|------|-----------|---------|-----------|
| **GSC** | OK (token refreshed) | **yes** | — | Proceed Phase 1. Latest data date = **2026-06-02** (lag 4d) |
| **GA4** | OK (service account) | **yes** | — | Proceed Phase 2. Property `428253147` responds |
| **Google Ads** | **OK (refresh token valid)** | **yes** | ~~SDK missing~~ **RESOLVED 2026-06-06** | SDK restored in isolated venv; `test_ads_access.py` returns 3 campaigns, `23271040037` ENABLED |
| **GBP** | OK (token refreshed) | **yes** | — | Proceed Phase 4. Location resolves, API returns series |
| **DataForSEO** | OK (`status_code=20000`) | **yes (spend-bearing)** | — | Needs spend go-ahead (Phase 5 estimate below) |
| **Live crawl** | n/a | yes (local fetch) | — | Phase 6 — no creds needed |
| **Repo/seo-ops** | n/a | yes | — | All artifacts readable |

**Result: 5 of 6 API sources live-verified. Google Ads live API is blocked.**
Per scope ("stop after preflight if any credential/API blocker appears"), stopping here for a decision.

---

## Blocker detail — Google Ads live API

- `D:/projects/bmklus/google/google-ads.yaml` exists (updated 2026-04-24).
- `ads-refresh-token.json` exists (updated 2026-04-24); pull scripts exist
  (`test_ads_access.py`, `report_campaign_performance.py`, `report_keywords.py`, `report_search_terms.py`).
- **But the `google-ads` Python package is NOT installed** in: system Python 3.14
  (`C:\Python314`), Python 3.12, or the seo-ops venv. `import google.ads.googleads` → `ModuleNotFoundError`.
- The pull scripts that produced the existing Ads JSON exports ran on Python 3.14
  (`.pyc` cache = cpython-314) at a time when the SDK was installed; it is now absent.

**What is needed to unblock (one of):**
1. `pip install google-ads` into a **dedicated venv** (recommended — avoids touching the
   working Python 3.14, which has `protobuf 7.34.1`; `google-ads` may pin an older protobuf
   and break the GSC/GA4 environment if installed there).
2. Confirm the refresh token still works after the MFA/2SV requirement — run
   `test_ads_access.py` once the SDK is present. If `invalid_grant`, re-auth via
   `get_ads_refresh_token.py` (manual browser step — must be run by you with `! ...`).

**This is an SDK/dependency install decision, not something I should silently do** (risk of
breaking the working protobuf/google stack, and scope = read-only + report blockers).

---

## Data freshness context (provenance)

- **Last full incident data collection: 2026-05-09** across all sources
  (`outputs/recovery_log/snapshot_2026-05-09.json`, GA4/GBP/Ads JSONs dated 2026-05-09).
  → Everything is **~4 weeks stale**; the requested windows after 2026-05-10 have **no data pulled yet**.
- Ads CSV/JSON exports cover up to **2026-05-08** (bad window) and the healthy baseline
  **2026-03-15→2026-04-23**. No export covers **2026-05-10 → today** (the recovery/current window).
- GSC has data through **2026-06-02** but no fresh pull saved for the new windows.
- Last known Ads state (`recovery_log/state.json`, 2026-05-09 23:43): budget **€6.0/day**,
  bid strategy **MAXIMIZE_CONVERSIONS**, status ENABLED. `[Ads recovery_log, 2026-05-09]`
  — note: this differs from the task's "Manual CPC" assumption; current state unknown until fresh pull.

---

## Phase 5 (DataForSEO SERP) — spend estimate

`[DataForSEO cost_log]` Observed live SERP advanced cost: **~$0.002–0.016 per query**
(mean ≈ $0.013 in the 2026-05-09 run).

- Task asks ~**50 unique queries × {desktop, mobile}** ≈ **100 live tasks** ≈ **$1.3–2.0**.
- Optional Rotterdam/local-conditioned variant for ~12 local queries adds ~$0.15–0.30.
- Small absolute cost, but spend-bearing and outward → **requires explicit go-ahead** before running.

---

## Recommendation (decision needed from user)

Pick the scope to proceed with now:

- **A. Proceed without live Ads** — run Phases 1,2,4,5,6,7 fresh (GSC, GA4, GBP, DataForSEO,
  crawl, conversion-flow code check). Use the stale 2026-05-09 Ads exports as historical-only,
  clearly labeled. Fastest, no install risk.
- **B. Unblock Ads first** — set up a dedicated `google-ads` venv (+ verify refresh token),
  then run all phases including a live Ads pull (change history, auction IS, geo/device, current
  settings). Most complete, but needs the install decision + possibly a manual re-auth step.
- **C. Preflight only** — stop here; you review and decide later.

Also: **approve DataForSEO spend (~$1.3–2.0)** for Phase 5, yes/no.
