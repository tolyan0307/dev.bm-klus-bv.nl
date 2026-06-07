# 09 — Ads Landing Mapping (READ-ONLY check)

**Nothing in Google Ads was changed.** Pure read via Ads API (campaign 23271040037).
Raw: `raw/ads_landing_mapping.json`. Date: 2026-06-07.
Method: final URL is set at **ad (RSA) level per ad group**; no keyword-level final_url overrides found → the ad-group
landing page applies to all its enabled keywords.

## Ad group → final URL → intent
| Ad group | Final URL | Enabled keywords (intent) | Verdict |
|---|---|---|---|
| Gevelisolatie - **Core** | `/gevelisolatie/` | gevelisolatie, buitenmuur isoleren, buitengevel isoleren, gevel van buiten isoleren (38) | ✅ correct |
| Gevelisolatie - **Kosten & Prijs** | `/gevelisolatie/kosten/` | gevelisolatie kosten, kosten gevelisolatie, buitengevelisolatie kosten, kosten buitenmuur isoleren, wat/hoeveel kost buitengevelisolatie (6) | ✅ correct |
| Gevelisolatie - **Afwerking** | `/gevelisolatie/afwerkingen/` | steenstrips, crepi, stucwerk, bekleden, gevel isoleren en bekleden (23) | ✅ correct |
| Gevelisolatie - **Materialen** | `/gevelisolatie/materialen/` | pir/eps/minerale wol/platen (14) | ✅ correct |
| Gevelisolatie - **Technisch** | `/gevelisolatie/rc-waarde-dikte/` | rc-waarde, dikte, etics, koudebrug, systemen (20) | ✅ correct |
| Gevelisolatie - **Subsidie & Vergunning** | `/gevelisolatie/subsidie-vergunning/` | subsidie, vergunning (8) | ✅ correct |
| Gevelisolatie - **Offerte** | `/gevelisolatie/` | gevelisolatie/buitenmuur/gevel isoleren offerte (8) | ⚠ acceptable; could point to `/gevelisolatie/kosten/` (has offerte CTA) — minor, not a mismatch |

## Verdicts on the three checks the task asked for
- **kosten terms → `/gevelisolatie/kosten/`** — ✅ **CLEAN**. All kosten/prijs keywords live in the "Kosten & Prijs" ad
  group, landing on `/gevelisolatie/kosten/`.
- **steenstrips / crepi / bekleden terms → `/gevelisolatie/afwerkingen/`** — ✅ **CLEAN**. All in the "Afwerking" ad
  group, landing on `/gevelisolatie/afwerkingen/`.
- **core gevelisolatie terms → `/gevelisolatie/`** — ✅ **CLEAN**. "Core" + "Offerte" ad groups land on the hub.

## Result: landing mapping is CLEAN — no mismatch found
**This corrects an earlier hypothesis.** `06_final_priority_plan.md` / `07_execution_scope_plan.md` (Scope C) raised a
possible landing-URL misalignment as a contributor to the **rank-lost IS 62–72%**. The data shows routing is already
correct and intent-segmented. Therefore:
- **Do NOT** "re-point" landing URLs — there is nothing to fix.
- The rank-lost IS is driven by **Ad Rank (bids / ad relevance / quality / low budget)**, **not** by landing-page
  routing. Any Ads work should target Ad Rank levers, not URLs. (Bid strategy/budget still unchanged pending the WP
  reconciliation — per standing instruction.)

## Minor optional (not required, no action now)
- "Offerte" ad group → `/gevelisolatie/` could route to `/gevelisolatie/kosten/` (which carries the offerte CTA and
  price context). Low impact, optional, **needs no change now**.

## What was NOT done
- No Ads change of any kind (no bids, budget, URLs, status, conversions, structure). Read-only.
