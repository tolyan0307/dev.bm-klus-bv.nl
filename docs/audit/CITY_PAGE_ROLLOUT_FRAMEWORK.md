# City Page Rollout Framework
**Date:** 2026-03-20
**Source:** Pilot pass on Dordrecht, Zoetermeer, Breda (deep-pass + Dutch refinement)
**Purpose:** Reusable process for improving remaining 18 gevelisolatie location pages

> This is a working document. Update after each wave.

---

## Governance linkage

This framework operates within the project's governance system:

| Rule source | How it applies here |
|-------------|-------------------|
| `docs/governance/10-language-and-content-rules.md` | Dutch style, forbidden patterns (superlatives, guarantees), conditional claims for energy savings |
| `docs/governance/30-architecture-and-code-rules.md` | Page template structure, below-fold, design tokens — not touched by city pass |
| `docs/governance/60-decisions-and-bans.md` | Hardcoded prices (do not localize), banned phrases, no fabricated claims |
| `docs/governance/70-page-type-checklists.md §Location page` | Required/forbidden sections, hero image, FAQ structure |
| `seo-system/GLOBAL_SEO_CONTENT_RULES.md §4` | Anti-cannibalization map — location pages must not duplicate pillar content |
| `seo-system/GLOBAL_SEO_CONTENT_RULES.md §7` | Uncertainty flags — use `[CLAIM_NEEDS_CONFIRMATION]` for unverified local facts |

**Key governance rules for city pass:**
- Energy savings: always conditional ("kan leiden tot", never "leidt tot")
- No superlatives without proof ("slechtst geïsoleerde", "beste isolatie")
- No fabricated project counts, certifications, or guarantees
- All public content in Dutch (nl-NL) only
- Prices are site-wide — never localize pricing per city

---

## What worked in the pilot

### High-impact patterns (replicate)

1. **localContext ≠ intro** — the single biggest quality gain. All 3 pilot cities had localContext that duplicated intro. Rewriting localContext with a different angle (constructief verschil per wijk, klimaat/vocht, bouwtype) immediately made the page more useful.

2. **energieTip as unique local angle** — replacing generic "enkelsteens woningen profiteren" with city-specific insight (waterrijke ligging, systeembouw aandachtspunten, VvE-schaalvoordeel) added real content value without new claims.

3. **vergunningTip differentiation** — cities without beschermde stadsgezichten in woonwijken benefit from stating this explicitly ("in de meeste woonwijken spelen beschermde stadsgezichten geen rol"). Cities with beschermde gezichten already had this covered.

4. **FAQ #3 replace generic → local** — every city had a generic VvE FAQ or werkgebied FAQ. Replacing with a city-specific practical question (steigerhoogte, systeembouw, beschermd stadsgezicht, waterrijke ligging) added genuine search-intent coverage.

5. **FAQ #4 add** — one new FAQ per city targeting an unmet SERP intent. Works best when the question is something a local woningeigenaar would actually ask.

6. **Project reference in afstanden** — where BM klus has a nearby project, mentioning it in afstanden adds E-E-A-T signal without being sales-heavy.

### Dutch refinement lessons

7. **Jargon removal pass is essential** — first-pass content consistently introduced technical terms (warmteweerstand, dampopen, spatwaterdetails, vochthuishouding, gevelconstructie) that a woningeigenaar doesn't recognize. Second-pass replaced these with gewone taal.

8. **Parenthetical overload** — first-pass content used too many parentheses for technical specs: "(3–4 verdiepingen, enkelsteens)", "(de onderste 30 cm)". Better to weave info into the sentence naturally.

9. **Cross-field repetition** — localContext, energieTip, and FAQ answers must be checked as a group. The same fact (waterrijke ligging, systeembouw, enkelsteens gevels) repeated 3-4 times across fields sounds robotic. Each field should approach the topic from a different angle.

10. **Length proportionality** — localContext should be 2-4 sentences (matching Rotterdam/Den Haag baseline). Pilot initially produced 5-sentence localContext for Zoetermeer — too long relative to other cities.

11. **Vary the localContext angle** (added after wave 2) — "constructief verschil per wijk" is the proven format, but not every city should use the same frame (portiekflat X hoog vs laagbouw Y lagen). Vary by city character: steigerhoogte (Breda/Schiedam), water/vocht (Dordrecht), systeembouw (Zoetermeer), massief metselwerk (Leiden), uniformiteit/collectief (Spijkenisse), VvE-schaal (Capelle), projectreferentie (Vlaardingen). Repetitive structure across 21 cities defeats the purpose.

---

## What can be scaled mechanically

These patterns apply to all 18 remaining cities with minimal per-city research:

| Pattern | Applies to | Effort per city |
|---------|-----------|----------------|
| Check localContext ≠ intro (no duplicate content) | All cities — audit first | 5 min analysis |
| Check energieTip ≠ localContext (no repetition) | All cities | 5 min analysis |
| Check FAQ for generic VvE/werkgebied items | All cities | 5 min analysis |
| Remove governance violations (superlatives, guarantees) | Scan once for all | 10 min total |
| woningTypes: remove "Bedrijfspanden" if present | Scan once | 5 min total |

---

## What CANNOT be transferred mechanically

These require per-city research or judgment:

| Aspect | Why it's city-specific |
|--------|----------------------|
| Local differentiator angle | Each city has a unique story: groeikern, waterrijk, historisch, kustligging, VvE-dominant |
| vergunningTip differentiation | Depends on whether the city has beschermde stadsgezichten in woonwijken |
| New FAQ topic | Must match a real local search intent, not be forced |
| Project reference in afstanden | Only add if BM klus has a confirmed project nearby |
| Constructief verschil per wijk | Requires knowing which wijken have portiekflats vs laagbouw |

---

## Fields to analyze per city

Standard checklist for each city pass:

### Always analyze (change if needed)
- [ ] `localContext` — does it duplicate intro? Does it add new information?
- [ ] `energieTip` — does it repeat localContext or intro? Is it a unique local fact?
- [ ] `faq` — any generic items (werkgebied, VvE copy-paste)? Room for 1 local FAQ?
- [ ] `woningTypes` — any irrelevant items (Bedrijfspanden)? Can items be more specific?

### Analyze but change only if clearly wrong
- [ ] `vergunningTip` — is it the generic template? Can it be differentiated (beschermd stadsgezicht status)?
- [ ] `afstanden` — is there a nearby BM klus project to reference?

### Never change in city pass
- [ ] `intro` — already reviewed and approved
- [ ] `title`, `description`, `h1`, `slug` — SEO metadata, separate concern
- [ ] `bouwperiode` — factual, already correct
- [ ] `gemiddeldBesparing` — hardcoded per governance
- [ ] `subsidieInfo` — already batch-updated
- [ ] `gemeenteWebsite` — external URL, separate verification
- [ ] `nearbyLocations` — template-level data

---

## Process per wave (3 cities)

### Step 1: Pre-analysis (no code changes)
For each city, read current data and answer:
1. Does localContext duplicate intro? (yes/no + what's duplicated)
2. Does energieTip repeat other fields? (yes/no + which field)
3. Any generic FAQ items? (list them)
4. Any governance violations? (superlatives, guarantees, banned phrases)
5. What is the city's unique local angle? (from existing content + general knowledge)
6. Is there a nearby BM klus project? (check /onze-werken/)

### Step 2: SERP research (optional — only if city has weak differentiation)
Only needed when the city's unique angle isn't obvious from existing content. Skip for cities that already have strong local hooks (e.g., Rotterdam, Den Haag, Delft).

### Step 3: Safe SEO implementation plan
For each city, propose changes to:
- `localContext` (rewrite if duplicates intro)
- `energieTip` (replace if repeats)
- `faq` (edit generic items, add 1 if warranted)
- `woningTypes` (minor edits if needed)
- `vergunningTip` (only if clearly improvable)
- `afstanden` (only if project reference available)

**Classification for every fact:**
- `SAFE_CONFIRMED` — geographic, architectural, or technical fact
- `NEEDS_CONFIRMATION` — specific amounts, dates, program names that may change
- `DROP` — anything that doesn't pass confirmation threshold

### Step 4: Dutch refinement pass
After SEO pass, re-read all changed fields and check:
- [ ] No jargon (warmteweerstand, dampopen, vochthuishouding, gevelconstructie, etc.)
- [ ] No parenthetical overload
- [ ] No cross-field repetition (localContext × energieTip × FAQ)
- [ ] Proportional length (2-4 sentences for localContext)
- [ ] Natural Dutch reading flow
- [ ] No AI-style patterns ("het is belangrijk om...", "dit maakt het...")

### Step 5: Verification
- `npx tsc --noEmit`
- Grep for governance violations (superlatives, banned phrases)
- Check no pricing/CTA/structure changes
- Update audit docs (CHANGELOG_AI.md, index.md)

---

## Invariants (never change in city pass)

| Invariant | Reason |
|-----------|--------|
| Pricing ranges / calculator logic | Shared across all cities — governed by pillar page |
| CTA structure (#offerte, WhatsApp, tel) | Template-level, design system |
| Service promises | Site-wide consistency |
| Tone of voice | Professional, factual, practical — no sales hype |
| Page structure / design system | Template-level ([location]/page.tsx) |
| hero image | Template-level — tracked in IMAGE-SLOT-AUDIT |
| voordelen section | Template-level hardcoded — separate backlog item |
| WaaromBmKlusSection | Already city-aware (subtitle uses data.city) |
| JSON-LD schema structure | Template-level |
| subsidieInfo wording pattern | Already batch-updated to "Gemeente {city} biedt..." |

---

## Second wave recommendation

### Selection criteria
1. **High duplication** — localContext duplicates intro (confirmed by grep)
2. **Weak energieTip** — repeats intro or localContext
3. **Unique local angle available** — city has a story that isn't told yet
4. **Geographic spread** — not all from same cluster

### Recommended wave 2 cities

| City | Why selected | Unique angle | Complexity |
|------|-------------|-------------|------------|
| **Leiden** | Strong existing content (2 beschermde stadsgezichten with hectares, grachtenpanden, Merenwijk/Stevenshof). But: FAQ #2 uses "checken" (inconsistency fix), FAQ #3 is werkgebied. energieTip is already unique (grachtenpanden + massieve gevels). localContext is good but could differentiate more from intro. | Historische universiteitsstad + grachtenpanden vs naoorlogse wijken | Low-Medium |
| **Schiedam** | Direct naast Rotterdam (USP: snelste bereikbaarheid). localContext duplicates intro ("grenst direct aan Rotterdam" + same wijken). energieTip is short but OK. FAQ #3 is werkgebied. Unique angle: historische binnenstad met windmolens (beschermd stadsgezicht 2005) + directe nabijheid Rotterdam. | Kortste afstand + beschermd stadsgezicht windmolens | Low |
| **Spijkenisse** | Groeikern (1966) — same archetype as Zoetermeer but different character. localContext duplicates intro pattern. energieTip uses Rc-value jargon. FAQ structure is OK but #3 is werkgebied. Unique angle: eiland Voorne-Putten, groeikern karakter, Akkers/Groenewoud mass-housing. | Groeikern op eiland Voorne-Putten | Low |

### Why these 3
- **Leiden** — large city, strong existing base, minimal research needed, high SEO value
- **Schiedam** — closest to Rotterdam, easy win, low complexity
- **Spijkenisse** — same archetype as Zoetermeer pilot (groeikern), can reuse pattern

### Why NOT these cities in wave 2
- Rotterdam, Den Haag — already strong, leave for later fine-tuning
- Delft — already has Rc-waarde specifics and 4 beschermde stadsgezichten, relatively strong
- Capelle aan den IJssel — groeikern (like Zoetermeer), but content is already above average
- Bergen op Zoom, Roosendaal — far cities, low search volume, defer
- Hendrik-Ido-Ambacht, Ridderkerk, Barendrecht — small cities, lower priority

---

## Tracking

| Wave | Cities | Status | Date |
|------|--------|--------|------|
| Batch (all 21) | subsidieInfo + WaaromBmKlus subtitle | Done | 2026-03-19 |
| Pilot (wave 1) | Dordrecht, Zoetermeer, Breda | Done (deep-pass + Dutch refinement) | 2026-03-20 |
| Wave 2 | Leiden, Schiedam, Spijkenisse | Done | 2026-03-20 |
| Wave 3 | Capelle a/d IJssel, Vlaardingen, Maassluis, Gouda | Done | 2026-03-20 |
| Wave 4+ | Remaining cities | Planned | — |
