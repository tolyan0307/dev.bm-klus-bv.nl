> **SUPERSEDED FRAMING — read `04_final_ranked_diagnosis.md` instead.**
> After the user confirmed (manual test) that conversion tracking fires today, the "tracking outage (high
> confidence)" framing in H1 below was **demoted**. The corrected, neutral, fully-phased diagnosis lives in
> `04_final_ranked_diagnosis.md`. This file is retained for the raw observations/provenance only.

# BM Klus BV — Full Audit Diagnostic Memo (2026-06-06)

**Mode:** READ-ONLY / data collection. No changes applied to site, Ads, GA4, GTM, GBP, WP.
**Run date:** 2026-06-06. **Author:** seo-ops operator (Claude).
**Scope:** diagnosis only — no actions executed. All action candidates below are proposals, not changes.

Report discipline per `seo-ops/CLAUDE.md`: Observations (with provenance) → Interpretations (confidence) → Hypotheses → Action candidates → Excluded/stale context.

Provenance label key: `[GSC, <window>, <dim>]`, `[GA4, <window>, <dim>]`, `[Ads API, <window>]`, `[GBP API, <window>]`, `[DataForSEO]`, `[crawl 2026-06-06]`, `[repo]`.

Windows: **healthy** 2026-04-06→04-23 · **bad** 2026-04-24→05-08 · **recovery/current** 2026-05-10→06-05 (Ads/GA4) / →06-02 (GSC) · **post-cutover** 2026-03-15→06-05.

---

## 1. Data coverage

| Source | Collected | Window coverage | Notes |
|--------|-----------|-----------------|-------|
| Google Ads API | ✅ live (SDK restored in isolated venv) | all 5 windows + daily 03-15→06-05 | settings, IS, keywords, search terms, device, geo, conversion actions, change history (28d), ads/assets |
| GA4 | ✅ live | healthy/bad/recovery/postcutover | channel totals, landing×channel, key events ×name/channel/source, paid-specific, daily |
| GSC | ✅ live | healthy/bad/recovery/postcutover | site daily, page, query, query×page, URL inspection (20 URLs) |
| GBP | ✅ live | 85d series + reviews | 7 metrics daily, 18 reviews |
| DataForSEO SERP | ⏳ running (≤$3 approved) | live 2026-06-06 | 41 queries × desktop+mobile; competitor/feature extraction |
| Technical crawl | ✅ live | 2026-06-06 | all 52 sitemap URLs |
| Conversion-flow code | ✅ repo read | current | form, GTM, events, consent, tel/wa |

**Gaps / caveats:**
- Ads **change history limited to 28 days** by API (`START_DATE_TOO_OLD`); changes before 2026-05-09 are not retrievable via API.
- `searchAbsoluteTopImpressionShare = 0.0999` constant across all windows → likely a Google privacy-masked "< 0.1" value, not a real reading. Treat as "low/unknown".
- GA4 key-event counts are **single-digit per window** → low statistical power; conclusions lean on direction + cross-source corroboration, not magnitude.
- DataForSEO is enrichment-only; never overrides GSC for BM's own positions.

---

## 2. Current status by surface

### Ads `[Ads API]`
- Campaign `23271040037` (NL | Gevelisolatie | Search): **ENABLED**, Search-only (no partners/display), **MAXIMIZE_CONVERSIONS**, system status ENABLED.
- Budget **€9.00/day** (was €6.00 on 2026-05-09 per recovery_log; raised since). `[Ads API, settings]`
- Change history (28d): **only 3 events, all `CAMPAIGN_BUDGET` amount edits** (2026-05-09 ×2, 2026-05-12 ×1, by bmklusbv@gmail.com). **No bid-strategy change, no keyword pause, no conversion-goal change in the last 28d.** `[Ads API, change_event 28d]`

| Window | Impr | Clicks | CTR | Cost € | Conv | AllConv | CPA € | SearchIS | LostIS-budget | LostIS-rank |
|---|---|---|---|---|---|---|---|---|---|---|
| healthy (18d) | 1156 | 161 | 13.9% | 183.36 | **6** | 8 | 30.56 | 11.8% | 10.0% | 78.2% |
| bad (15d) | 962 | 131 | 13.6% | 166.38 | **0** | **0** | n/a | 15.7% | 6.7% | 77.6% |
| recovery (27d) | 1231 | 156 | 12.7% | 237.52 | **5** | 10 | 47.50 | 15.0% | 23.2% | 61.9% |
| post-cutover (83d) | 4865 | 643 | 13.2% | 892.04 | 14 | 39 | 63.72 | 14.2% | 16.8% | 69.0% |

- Avg CPC rising: €1.14 → €1.27 → €1.52. CPA rose €30→€47 after recovery. `conversionsValue=0` everywhere (no value tracking).
- **Impression share is low (~12–16%)**, dominated by **rank-lost IS 62–78%** → ads rarely shown; main constraint is Ad Rank, not budget (until recovery, where budget-lost IS jumped to 23% after the €9 budget + Max-Conv spend more aggressively).

### Conversion configuration `[Ads API, conversion_action]` — **central issue**
- 15 conversion actions. The **only** action with `includeInConversionsMetric=true` — `6769425725` "Отправка формы для потенциальных клиентов" (SUBMIT_LEAD_FORM, primary) — is **REMOVED**.
- Current ENABLED primary lead action `6790076058` "Отправка контактной формы с сайта" has `includeInConversionsMetric=false`.
- GA4-imported actions (Contact_Form_Site, Phone, Email) are mostly **HIDDEN**; Whatsapp ENABLED but not primary.
- Campaign uses **account-default goals** (no campaign selective_optimization).
- → The conversion-action set was clearly **reconfigured around the incident**; the historical primary signal was removed.

### GA4 `[GA4]`
| Window | Channel | Sessions | KeyEvents | EngRate |
|---|---|---|---|---|
| healthy | Paid Search | 95 | **6** | 0.56 |
| healthy | Organic | 112 | 5 | 0.38 |
| bad | Paid Search | 78 | **0** | **0.69** |
| bad | Organic | 39 | 1 | 0.31 |
| recovery | Paid Search | 92 | **7** | 0.63 |
| recovery | Organic | 69 | 1 | 0.48 |

- Paid key events V-shape **6 → 0 → 7**, exactly mirroring Ads conversions **6 → 0 → 5**.
- In the bad window, **paid traffic continued (78 sessions) at HIGH engagement (0.69) with ZERO key events.**

### GSC `[GSC, page-level]`
- Organic clicks 49 → 14 → 55; impressions 5182 → 3218 → 4731 (bad-window dip, recovered). Avg position ~17–20 (weak).
- Indexation `[GSC URL inspection]`: 19/20 inspected URLs **PASS / indexed**; **`/gevelisolatie/dordrecht/` = "Crawled, currently not indexed"** (NEUTRAL). onze-werken project pages indexed (confirms user's "all 52 indexed").
- Query-level rank slippage healthy→recovery on money/local terms: `kosten gevelisolatie` 12.1→48.8, `gevelisolatie kosten` 21.6→52.9, `gevelisolatie rotterdam` 9.7→17.9, `gevelisolatie breda` 19.1→dropped, `buitenmuur stucen nadelen` 3.3→15.1. `[GSC, query, healthy vs recovery]`

### GBP `[GBP API]`
- **No suspension**; published. 18 reviews, **4.9★**.
- Bad-window dip + recovery: website clicks 13→2→10; mobile-search impr 86→70→104; direction requests 11→26→52 (rising); desktop-search impr 18→14→25. Local visibility healthy.

### Technical `[crawl 2026-06-06]`
- 52/52 URLs **HTTP 200**, exactly 1 H1 each, titles ≤60, descriptions ≤156, no redirects flagged.
- Money/cluster pages 1445–2812 words, FAQ 7–12. City pages ~1073–1251 words, FAQ 3–4. Project pages 643–872 words, **0 FAQ**, each missing **1 image alt**. Homepage missing 1 alt.
- No technical red flags besides the single non-indexed city page and minor project-page alt gaps.

### Conversion-flow code `[repo]`
- Form → `fetch` to `…/wp-json/bm/v1/contact` with Turnstile + honeypot (`company`) + consent checkbox. Endpoint/flow intact.
- **On success the form pushes dataLayer event `bm_lead_form_success` — NOT `Contact_Form_Site`.** The GA4 event name `Contact_Form_Site` is produced by **GTM mapping**, not the site.
- **No `tel:`/`wa.me` click tracking anywhere in the repo** — `Phone`/`Whatsapp` GA4 events are created entirely by **GTM click triggers**.
- `gtm-provider.tsx` loads `gtm.js` with a **3.5s delay / first-interaction** trigger; **no `gtag('consent','default',…)` and no CookieScript in the repo** (`layout.tsx` only renders `<GtmProvider/>`).
- → **The entire measurement layer (consent + all 3 conversion events) lives inside the GTM container, outside the repository and version control.**

---

## 3. Main losses

- **Conversions/leads, bad window:** Ads conversions **0** and GA4 key events **0** for **16 consecutive days (2026-04-24 → 2026-05-09)**; first recovery day **2026-05-10**. `[Ads daily]` `[GA4 daily]`
- **Organic rank on money/local queries:** `kosten gevelisolatie`/`gevelisolatie kosten` fell from top-20 to ~pos 48–53; several city/local terms lost impressions. `[GSC, query]`
- **Ad efficiency:** CPA €30 → €47–50; CPC €1.14 → €1.56; Search IS stuck ~15% with 62–78% rank-lost IS. `[Ads API]`

## 4. Current winners

- **Paid traffic + engagement never dropped** — bad-window paid sessions 78 at 0.69 engagement; recovery 92 sessions, 7 key events. `[GA4]`
- **GBP strong** — 4.9★/18 reviews, rising direction requests (11→26→52). `[GBP API]`
- **Technical/indexation healthy** — 52/52 200-OK, rich FAQ schema, all money/cluster/city/project pages indexed except one city page. `[crawl]` `[GSC]`
- **Conversions recovered** post-05-10 (5 primary / 10 all-conv in 27d). `[Ads API]`

---

## 5. Root-cause hypotheses (ranked)

### H1 — Conversion-tracking outage 2026-04-24→05-09 (NOT a demand collapse). **Confidence: HIGH**
- **Evidence for:** Ads conversions and GA4 key events both went to **exact zero** for the same 16 days and recovered the **same day** (05-10); paid sessions (78) and engagement (0.69) stayed normal in the gap; the only `includeInConversionsMetric=true` action is REMOVED; conversion actions were reconfigured around the incident; every conversion event depends on the out-of-repo GTM container. `[Ads daily]` `[GA4 daily]` `[Ads conversion_action]` `[repo]`
- **Evidence against:** GA4 counts are tiny (single digits), so "zero" has limited statistical power on its own; organic/GBP also dipped in the same window (but only dipped — did not zero out).
- **Why "tracking" beats "demand":** every other metric merely *dipped but stayed positive*; only the conversion counters hit *absolute zero*. Demand loss scales metrics down proportionally; it does not zero one counter while traffic continues.
- **Next verification:** GTM container version history around 2026-04-24 (who/what changed triggers/tags/consent); GA4 DebugView live test of form/phone/whatsapp; Ads "Отправка контактной формы с сайта" tag firing; consent-mode state in GTM.

### H2 — Measurement architecture is fragile and partly mis-wired. **Confidence: HIGH**
- **Evidence for:** event-name mismatch (`bm_lead_form_success` vs `Contact_Form_Site`); no in-repo tel/wa tracking; no in-repo consent default; primary lead action `includeInConversionsMetric=false`; multiple overlapping/HIDDEN conversion actions. `[repo]` `[Ads conversion_action]`
- **Evidence against:** it currently works (post-05-10 conversions recording), so wiring is functional today.
- **Next verification:** confirm in GTM which dataLayer/click triggers map to GA4 `Contact_Form_Site`/`Phone`/`Whatsapp`, and which GA4 key events feed Ads "account-default" goals.

### H3 — Real but secondary organic softening on money/local queries. **Confidence: MEDIUM**
- **Evidence for:** `kosten`/`local` queries lost 20–40 positions healthy→recovery; one city page not indexed. `[GSC, query]` `[GSC URL inspection]`
- **Evidence against:** aggregate organic clicks recovered (49→55); site is low-volume organic (pos ~18–20) so noise is high; post-cutover settling (cutover 2026-03-08) is still plausible.
- **Next verification:** DataForSEO SERP competitor/feature comparison (in progress); sustained-loss check over more weeks; page-type vs SERP-intent match for `kosten`.

### H4 — Ad Rank / visibility ceiling limits paid scale. **Confidence: MEDIUM**
- **Evidence for:** Search IS ~15%, rank-lost IS 62–78%, CPC rising. `[Ads API]`
- **Evidence against:** low budget (€9/day) + Max-Conversions inherently caps reach; with so few conversions, Max-Conv has thin training data.
- **Next verification:** quality score per keyword (pull available), auction-time competitiveness, whether thin conversion history is starving Max-Conv.

### H5 — DataForSEO/SERP competitor displacement. **Confidence: TBD (pending SERP)**
- Section 7 / serp_summary to be completed when the SERP pull finishes.

---

## 6. Action candidates — **DO NOT EXECUTE** (proposals only)

**Safe / no-risk (verification, no change):**
- Run GA4 DebugView + Ads tag-assistant live test of form submit, tel click, wa.me click (manual checklist in `memos/03_form_test_checklist.md` — to be added).
- Review GTM container version history for changes dated ~2026-04-24 and ~2026-05-09.
- Confirm which GA4 key events feed Ads account-default conversion goals.

**Low-risk additive (after verification):**
- Re-establish a single, clearly-primary lead conversion with `includeInConversionsMetric=true` (or confirm the account-default goal already covers it).
- Add in-repo dataLayer pushes for tel/wa clicks so `Phone`/`Whatsapp` no longer depend solely on GTM auto-triggers (code change — needs separate approval).
- Index-request `/gevelisolatie/dordrecht/`; add the missing project-page image alts.

**Ads changes (needs explicit Ads approval):**
- Do not change bid strategy/budget/keywords yet — the bad-window data is a tracking artifact; let the post-05-10 signal accumulate before re-optimizing.

**High-risk / defer:**
- No content rewrites or noindex/canonical/redirect changes — organic hypothesis (H3) not yet confirmed by SERP + sustained-loss evidence.

---

## 7. SERP / competitor analysis `[DataForSEO, 2026-06-06, $1.01]`
- BM absent from top-100 for ~all target queries (4/74 results, all deep #27–#45 on muren-stucen/gevel-schilderen).
- Top-10 owned by aggregators/portals/retail: homedeal.nl, gevelrenovatie-info.nl, gamma.nl, eigenhuis.nl,
  slimster, trustoo, werkspot. AI Overview on 40/74, local_pack on 17. → authority/SERP-structure gap, not content.
- Full analysis + ranked causes: see `04_final_ranked_diagnosis.md`. Data: `processed/serp_summary.json`,
  `processed/competitor_serp_matrix.csv`.

---

## 8. Exact next decision needed from user
1. **Verify the tracking fix?** Approve running the manual form/phone/whatsapp test (GA4 DebugView + Ads) and inspecting GTM version history — this confirms H1/H2 before any optimization.
2. **Hold Ads optimization** until post-05-10 conversion signal matures? (recommended) or adjust now?
3. **SEO:** wait for SERP section before deciding whether `kosten`/local pages need hardening.
4. Approve the low-risk additive code fixes (tel/wa dataLayer tracking, dordrecht index request, alt text) as a **separate** scoped task?

**Hard rule respected:** no "rewrite page" recommendation is made without GSC sustained loss + DataForSEO SERP mismatch + page-audit confirmation + risk assessment. None are issued here.
