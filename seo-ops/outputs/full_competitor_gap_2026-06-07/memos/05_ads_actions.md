# 05 — Ads Actions (campaign 23271040037, NL | Gevelisolatie | Search)

READ-ONLY. Settings unchanged: ENABLED, Search-only, MAXIMIZE_CONVERSIONS, budget €9/day. `[Ads API, 2026-06-07]`
Data: `processed/ads_keyword_action_matrix.csv`. Low conversion volume → all calls are **low/medium confidence**.

## Window summary `[Ads API]`
| Window | Impr | Clicks | Cost€ | Conv | CPA€ | SearchIS | RankLostIS | BudgetLostIS |
|---|---|---|---|---|---|---|---|---|
| last 30d | 1475 | 186 | 284 | 5 | 56.7 | 15.5% | 64.1% | 20.4% |
| last 60d | 3266 | 437 | 583 | 11 | 53.0 | 14.0% | 72.2% | 13.8% |
| last 90d | 5117 | 686 | 954 | 14 | 68.2 | 13.9% | 68.8% | 17.3% |
| recovery (05-10→) | 1257 | 158 | 240 | 5 | 48.1 | 14.8% | 62.5% | 22.7% |

**Structural reads:**
- **Rank-lost IS 62–72%** every window → the dominant ceiling is **Ad Rank**, not budget. Ads are simply not
  shown for ~2/3 of eligible auctions due to rank. `[Ads API]` high
- **Budget-lost IS rose to ~20–23%** after the €9 budget + Max-Conv spending harder → budget now also binds. high
- **Max Conversions is signal-starved** (~5 conv / 28d). A smart-bidding strategy with <15 conv/month has weak
  training; the 16-day April–May conversion gap further starved it. `[Ads API]` medium-high
- CPA €48–68; conversions concentrate on **steenstrips / bekleden / buitengevelisolatie** intent. medium

## Keyword action matrix (proposals — DO NOT EXECUTE)
Counts: keep_protect 7 · lower_bid_monitor 2 · pause_candidate 4 · zero_impr_cleanup 75 · needs_data 90.

| Bucket | Keywords | Evidence | Confidence |
|---|---|---|---|
| **Keep / protect** | `gevel isoleren en bekleden` (3 conv/€107), `buitengevelisolatie` exact (2/€45), `buitengevelisolatie met steenstrips` (1/€36), `gevelisolatie met stucwerk` (1/€30), `gevelisolatie` phrase (1/€22), `gevelisolatie met steenstrips` (2/€12), `buitenmuur isoleren buitenkant` (1/€7) | only converting terms | med |
| **Lower bid / monitor** | `gevel van buiten isoleren` phrase (€58, 54 clk, 0 conv), `buitenmuur isoleren en stucen` (€42, 31 clk, 0) | high spend, 0 conv, informational intent | med |
| **Pause candidate** (after ≥2 wks) | `huis isoleren buitenkant` (€25/0), `isolatie buitengevel` (€24/0), `huis aan buitenkant isoleren` (€18/0), `buitengevel isoleren` (€16/0) | spend, 0 conv, broad/informational | low (volume) |
| **Zero-impression cleanup** | 75 enabled keywords with 0 impressions in 28d | account hygiene, no cost | low urgency |
| **Negative candidates** | none egregious — top waste search terms are on-topic (`buitengevel isoleren`, `gevelisolatie buitenkant`); no DIY/retail/jobs waste | `[Ads search_terms]` | — |

## Measurement-driven Ads recommendations (needs verification first)
- The campaign's only counted primary conversion is the **website form**. Phone & WhatsApp fire as GA4 events but
  are **not counted** in the bidding `conversions` metric. Adding Phone/WhatsApp as counted conversions would feed
  Max-Conv 2–3× more signal — **only after** confirming they fire reliably (test in `2026-06-06/memos/03_form_test_checklist.md`). medium
- Do not change bid strategy/budget before the WP-submission reconciliation (see 2026-06-06 audit) confirms the
  April drop was real vs. an attribution artifact.

## Ads action backlog (priority)
| P | Item | Action | Risk | When |
|---|---|---|---|---|
| P1 | Rank-lost IS 62–72% | Improve Ad Rank via ad relevance / landing-page experience (RSA quality, page match), not just bids | low | after confirm |
| P1 | Signal starvation | Add Phone + WhatsApp as counted conversions (after firing verified) | low-med | after test |
| P2 | `gevel van buiten isoleren` €58/0, `buitenmuur isoleren en stucen` €42/0 | lower bids / tighten match; monitor 2 wks | low | do after confirmation |
| P2 | 4 pause candidates (€16–25, 0 conv) | pause after 2 more weeks of zero | low | do after confirmation |
| P3 | 75 zero-impression keywords | clean up for hygiene | none | anytime |
| — | bid strategy / budget | **do not change** before reconciliation + signal maturity | — | do not do yet |
