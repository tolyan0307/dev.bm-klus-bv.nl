# BM Klus BV — Final Ranked Diagnosis (2026-06-06)

**READ-ONLY.** No changes made to site, Ads, GA4, GTM, GBP, WP. Diagnosis only.
**Framing correction (per user, 2026-06-06):** the user manually verified that the conversion path
fires today (GTM → GA4 → Ads). Therefore **"tracking outage" is NOT assumed as the primary cause.**
It is a *secondary* hypothesis to be settled by historical reconciliation against the **WP submission log**,
which is the one ground-truth source not yet available to me.

Windows: **healthy** 2026-04-06→04-23 · **bad** 2026-04-24→05-09 · **recovery/current** 2026-05-10→06-05 (Ads/GA4) / →06-02 (GSC).
Provenance keys: `[Ads API]` `[GA4]` `[GSC]` `[GBP API]` `[DataForSEO]` `[crawl]` `[repo]`. Confidence: low/med/high.

---

## Phase 1 — Were leads genuinely absent in the bad window? (reconciliation)

| Signal | healthy | bad | recovery | Source |
|---|---|---|---|---|
| Ads conversions (primary = form) | 6 | **0** | 5 | `[Ads API]` |
| Ads all_conversions | 8 | **0** | 10 | `[Ads API]` |
| Ads conv-action rows that fired | 3 | **0** | 4 | `[Ads API]` |
| GA4 key events (form/phone/wa/email, all channels) | ~11 | **1** | ~9 | `[GA4]` |
| GA4 paid sessions | 95 | 78 | 92 | `[GA4]` |
| GA4 organic sessions | 112 | **39** | 69 | `[GA4]` |
| GSC organic clicks | 49 | 14 | 55 | `[GSC]` |
| GBP website clicks | 13 | 2 | 10 | `[GBP API]` |
| **WP form submissions (email/log)** | **?** | **?** | **?** | **NOT AVAILABLE — needed** |

**What fired the form conversions** `[Ads API, conversion_action segment]`:
- Healthy: "Отправка контактной формы с сайта" = **6** form submits (+ 1 local site-visit, 1 Whatsapp).
- Bad: **nothing fired at all** — not the form, not Whatsapp, not the Google-hosted local actions.
- Recovery: form = **5** (+ local 2, Whatsapp 1, local-engagement 3).

**Classification: UNRESOLVED — pending WP log.** The dominant lead signal (the website form) is
site-side-tracked, AND the conversion *action* was reconfigured around the incident (the historical primary
action `6769425725` is now `REMOVED`; the current one `6790076058` has a higher/newer ID). So the bad-window
zero is **equally consistent** with:
- (a) a real absence of form submissions, or
- (b) a measurement/attribution gap while the conversion action was swapped.

Partial discriminators, both weak due to tiny volume:
- The **Google-hosted local actions** (server-side, GTM-independent) were also 0 in the bad window → leans
  slightly toward *real low activity* — but base rate is ~1/window, so near-noise.
- **Organic sessions fell hardest** (112→39) while paid only dipped (95→78) → there *was* a real traffic
  softening in the bad window, independent of any tag.

**Decisive next step (request):** the WP `bm/v1/contact` submission log / lead-email count per day for
2026-04-06 → today. If WP shows **0 submissions** 04-24→05-09 → real lead drop, tracking outage demoted.
If WP shows **submissions that GA4/Ads missed** → measurement/attribution gap confirmed.

> Earlier memo `02_initial_findings_no_actions.md` leaned toward "tracking outage (high)"; **this memo supersedes
> that framing.** I over-weighted "high engagement in bad window" — engagement ≠ intent to contact.

---

## Phase 2 — Google Ads deep diagnosis `[Ads API, fresh 2026-06-06]`

**Settings (current):** ENABLED, Search-only, **MAXIMIZE_CONVERSIONS**, budget **€9/day** (was €6 on 05-09).
Change history (28d): only 3 budget edits (05-09 ×2, 05-12). No strategy/keyword/goal changes in 28d.

| Window | Impr | Clicks | CTR | Cost€ | Conv | CPA€ | CPC€ | SearchIS | LostIS-rank | LostIS-budget |
|---|---|---|---|---|---|---|---|---|---|---|
| healthy | 1156 | 161 | 13.9% | 183 | 6 | 30.6 | 1.14 | 11.8% | 78.2% | 10.0% |
| bad | 962 | 131 | 13.6% | 166 | 0 | – | 1.27 | 15.7% | 77.6% | 6.7% |
| recovery | 1231 | 156 | 12.7% | 238 | 5 | 47.5 | 1.52 | 15.0% | 61.9% | 23.2% |

Findings:
- **Maximize Conversions is signal-starved:** ~5–6 conv/month is far below the ~15–30/month it needs to
  optimise. With a 16-day zero in its training data, the strategy was effectively flying blind. `[Ads API]` med-high
- **CPC rising** (€1.14→€1.52), **CPA rising** (€30→€47); after the €9 budget, **budget-lost IS jumped to 23%**
  while rank-lost IS is still ~62% → low Ad Rank is the dominant ceiling, budget now also binds. `[Ads API]` high
- **Hour-of-day:** conversions scattered across hours both windows; no daypart pattern to exploit. `[Ads API]` med
- **Device/geo:** pulled (device×3, geo_userloc×3 windows) — low per-cell volume; no single device/region
  explains the drop. `[Ads API]` low
- **Conversion concentration:** converts on **steenstrips / bekleden / buitengevelisolatie** intent; pure
  "isoleren" informational terms spend without converting. `[Ads API]` med

### Ads action table (proposals only — DO NOT EXECUTE; low confidence due to low volume)
| Bucket | Item | Evidence |
|---|---|---|
| **Keep / protect** | `gevel isoleren en bekleden` (3 conv/€109), `buitengevelisolatie` exact (2/€41), `gevelisolatie met steenstrips` (2/€12), `buitengevelisolatie met steenstrips` (1/€40), `gevelisolatie met stucwerk` (1/€33) | `[Ads keyword_matrix]` |
| **Lower bid / monitor** | `gevel van buiten isoleren` phrase (€66, 60 clk, 0 conv), `buitenmuur isoleren en stucen` (€44, 0 conv) | high spend, 0 conv, but informational intent |
| **Pause candidate** | `huis isoleren buitenkant` (€25, 0), `isolatie buitengevel` (€25, 0) — only after ≥2 more weeks | low volume → pause cautiously |
| **Negative candidate** | none egregious — top waste terms are on-topic (`buitengevel isoleren`, `gevelisolatie buitenkant`); no DIY/retail/jobs waste visible | `[Ads search_terms_matrix]` |
| **Needs more data / measurement** | confirm which GA4 key events feed account-default goals; consider adding **Phone/WhatsApp as secondary→primary** once volume proven, to feed Max-Conv more signal | `[Ads conversion_action]` |

---

## Phase 3 — SEO deep diagnosis `[GSC truth]` + `[DataForSEO enrichment]`

- **Organic is structurally weak:** site-wide avg position ~17–20; clicks 1–5/day. Organic is a **minor**
  lead channel today. `[GSC]` high
- Window organic: clicks 49→14→55, impressions 5182→3218→4731 — bad-window dip, **aggregate recovered**. `[GSC]` high
- **Query rank slippage** healthy→recovery on commercial/local terms: `kosten gevelisolatie` 12→49,
  `gevelisolatie kosten` 22→53, `gevelisolatie rotterdam` 9.7→18, `gevelisolatie breda` 19→dropped. `[GSC, query]` med
- **Indexation healthy:** 19/20 inspected URLs indexed; **only `/gevelisolatie/dordrecht/` = "Crawled, currently
  not indexed."** onze-werken project pages indexed (confirms user's "all 52 indexed"). `[GSC URL inspection]` high
- **City pages:** indexed and present, ~1100 words + 3–4 FAQ each, unique titles/meta. NOT a doorway/thin issue.
  The constraint is **authority + SERP structure**, not page thinness. `[crawl]` `[GSC]` med

## Phase 4 — SERP / competitor reconstruction `[DataForSEO, live 2026-06-06, NL, depth100, $1.01]`

- **BM is absent from top-100 for almost every target query.** Present in only 4 of 74 results, all deep:
  `sausklaar stucen` #27, `behangklaar stucen` #37/#45 (→ /muren-stucen/), `gevel schilderen kosten` #43
  (→ /gevel-schilderen/). For **all** core gevelisolatie, **all** local/city, buiten-stucwerk, sierpleister →
  **not in top 100.** `[DataForSEO]` high
- **Top-10 dominated by aggregators + portals + retail**, not local contractors:
  homedeal.nl (39× top-10, 10× top-3), gevelrenovatie-info.nl (34×), **gamma.nl (15×, 9× top-3)**,
  eigenhuis.nl (16×, 7× top-3), slimster/trustoo/werkspot (lead marketplaces), milieucentraal, vtwonen. `[DataForSEO]` high
- **SERP features:** AI Overview on 40/74, PAA on 67, local_pack on 17 (all local queries), featured_snippet 4.
  Cost/info queries are AIO-heavy; local queries are map-pack-led. `[DataForSEO]` high
- **Page-type match:** BM's pages ARE the right type (service + cost guide, content-rich). The gap is **domain
  authority and SERP-feature ownership** (not in aggregators, below the map pack), not page content. Copying
  competitor content would not close an authority gap. `[DataForSEO]` `[crawl]` med-high

## Phase 5 — Page content audit `[crawl 2026-06-06]`
- `/gevelisolatie/kosten/`: 1445 words, 10 FAQ, indexed, title 55, self-canonical, breadcrumb+FAQ schema. Content-complete.
- `/buiten-stucwerk/`: 2228 words, 10 FAQ, indexed. Content-complete.
- City pages: ~1100 words, 3–4 FAQ, indexed, unique meta.
- Project pages: 643–872 words, 0 FAQ, each missing 1 image alt (minor).
- **No "thin/missing content" cause found.** Additive opportunities are minor (alt text; dordrecht index request).

---

## Phase 6 — Final ranked diagnosis

### 1. What is definitely NOT the cause
- ❌ **Technical/indexation failure** — 52/52 pages 200-OK, indexed (1 city page pending), schema intact. `[crawl][GSC]`
- ❌ **GBP suspension / local collapse** — published, 4.9★/18 reviews, rising direction requests. `[GBP API]`
- ❌ **Thin/broken page content** — money/cluster pages are 1.4k–2.8k words with FAQ schema. `[crawl]`
- ❌ **Bid-strategy/keyword sabotage in the last 28d** — change history shows only budget edits; no Manual-CPC
  switch or keyword pause (the original ТЗ assumption). `[Ads API]`
- ❌ **Daypart / single-device / single-region** explanation — no such concentration. `[Ads API]`

### 2. What is confirmed (high)
- ✅ Conversions (form) went **6 → 0 → 5** across windows; the 0 spanned **2026-04-24→05-09**, recovered 05-10. `[Ads][GA4]`
- ✅ The conversion-action set was **reconfigured around the incident** (primary action removed/replaced). `[Ads]`
- ✅ **Organic visibility is near-zero** for commercial/local head terms; SERP owned by aggregators + AIO. `[DataForSEO]`
- ✅ **Max Conversions is signal-starved** (~5 conv/month); CPC/CPA rising; Ad Rank caps reach. `[Ads]`
- ✅ Real **organic-session softening** in the bad window (112→39), only partial recovery (69). `[GA4]`

### 3. What is likely (medium)
- 🔸 The lead weakness is **MIXED**: a real demand/traffic softening in the bad window **plus** a measurement/
  attribution discontinuity from the conversion-action swap — not one single cause. `[multi-source]`
- 🔸 Near-term lead growth must come from **Paid + GBP/local pack**, not organic blue links (authority-limited). `[DataForSEO]`
- 🔸 Paid efficiency is constrained by **low Ad Rank + thin conversion signal**, a self-reinforcing loop
  (few conversions → Max-Conv underperforms → fewer conversions). `[Ads]`

### 4. What is still unknown (needs your input / more time)
- ❓ **WP form-submission counts per day** in the bad window — the single fact that resolves real-vs-tracking. **REQUEST.**
- ❓ **GTM container version history** around 2026-04-24 and 2026-05-09 (was a tag/consent/trigger changed?). **REQUEST.**
- ❓ Whether the 05-09 conversion-action change *created* the recovery or merely coincided with it.
- ❓ Sustained vs noise for the `kosten`/local rank drops (need 2–3 more GSC weeks).

### 5. Highest-confidence causes, ranked
1. **SEO ranking/authority gap (organic near-invisible)** — confirmed, structural, but it is a *chronic*
   condition, not the *trigger* of the April drop. `[DataForSEO][GSC]` **high**
2. **Ads signal starvation + rising costs (Max-Conv underpowered)** — confirmed, ongoing. `[Ads]` **high**
3. **Measurement/attribution discontinuity (conversion-action swap)** — confirmed it happened; impact size
   unknown until WP reconciliation. `[Ads]` **medium**
4. **Real demand/traffic softening in the bad window** — supported by organic-session drop; magnitude unclear. `[GA4][GSC]` **medium**
5. **SERP competitor displacement (aggregators + AIO)** — confirmed present; a ceiling, not a new event. `[DataForSEO]` **medium**
6. **Weak page content/depth** — **rejected** as a cause. `[crawl]` **low**
7. **Tracking outage (site tag/consent)** — possible but **not assumed**; demoted pending WP log; the user's
   live test shows it works now. `[user test][repo]` **low–medium, unresolved**

### 6. Action plan (proposals — nothing executed)

**Immediate safe (no risk, do first):**
- **You:** export WP `bm/v1/contact` submissions per day 2026-04-06→today; pull **GTM version history**. → resolves cause #3/#4/#7. `[request]`
- Run the manual conversion test (`memos/03_form_test_checklist.md`) under cookie-accept AND cookie-reject.
- Index-request `/gevelisolatie/dordrecht/`; add the 11 project-page missing alt texts (separate scoped code task).

**Ads (needs explicit Ads approval; low confidence → small steps):**
- Hold bid-strategy/budget changes until the post-05-10 signal matures and the WP reconciliation lands.
- Candidate (after data): demote/curb informational spenders (`gevel van buiten isoleren` €66/0, `huis isoleren buitenkant` €25/0); protect the converting steenstrips/bekleden cluster.
- Consider adding **Phone + WhatsApp as counted conversions** (currently not primary) to feed Max-Conv more
  signal — only after verifying they fire reliably (the test above).

**SEO content (only what evidence supports — NO mass rewrites):**
- Do **not** rewrite `kosten`/city pages — content is complete; the gap is authority, not depth. `[crawl][DataForSEO]`
- Authority/relevance plays instead: get BM listed on the **aggregators that own the SERP** (homedeal, werkspot,
  slimster, trustoo) and strengthen local signals (GBP posts, reviews, local citations) to compete in the
  **local pack** where BM can realistically win. `[DataForSEO]` medium
- Optional additive: target PAA/AIO-style question coverage on existing money pages (no URL changes).

**Measurement hardening (separate scoped code task, additive):**
- Add in-repo dataLayer pushes on `tel:`/`wa.me` clicks so `Phone`/`Whatsapp` no longer depend solely on
  GTM auto-triggers. `[repo]`
- Consolidate to ONE clearly-primary lead conversion and document the GTM→GA4→Ads mapping so a future
  reconfiguration cannot silently zero conversions.
- Add a server-side lead counter (WP) as the source of truth, decoupled from GTM/consent.

**What NOT to touch:**
- No URL/canonical/noindex/redirect/sitemap changes. No content mass-rewrites. No Ads bid/budget changes
  before WP reconciliation. No GTM/consent edits before version-history review.

**Validation checkpoints:**
- **7-day:** WP-vs-GA4-vs-Ads daily reconciliation table; confirm form/phone/wa fire under accept+reject;
  confirm dordrecht indexed; watch Max-Conv conv count trend.
- **14-day:** GSC sustained-loss check on `kosten`/local queries; Ads CPA/conv-rate trend after any small
  keyword curbs; local-pack visibility for city terms; decide if organic authority program is worth starting.

---

**Hard rules honored:** READ-ONLY; no platform/site changes; tracking outage NOT assumed primary; no mass
rewrites; every claim carries a source + confidence; no "rewrite page" issued (no sustained-loss + SERP-mismatch +
page-audit trifecta supports one — the audit actually *rejects* content rewrites for `kosten`/city).
