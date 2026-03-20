# AI Changelog — BM klus BV
**Purpose:** Record of all changes applied by AI agents (Claude, Cursor, etc.) to this codebase.
**Format:** newest first. Each entry: date, files changed, what changed, why.

> Do NOT record human changes here — use git log for that.
> Do NOT record governance/doc-only changes as code changes.

---

## 2026-03-20 — Safe technical SEO batch (3 files)
**Agent:** Claude Code
**Files changed:**
- `app/gevelisolatie/materialen/page.tsx` — added `export const metadata = buildPageMetadata(...)`, BreadcrumbList JSON-LD, FAQPage JSON-LD (7/8 items — 1 JSX-antwoord filtered for schema)
- `app/gevelisolatie/rc-waarde-dikte/page.tsx` — added `export const metadata = buildPageMetadata(...)`, BreadcrumbList JSON-LD (FAQPage already existed)
- `components/google-aggregate-rating-jsonld.tsx` — replaced hardcoded `BUSINESS_ID = "https://bm-klus-bv.nl/#business"` with dynamic `` `${SITE.canonicalBase}/#business` ``

**Why:** Site-wide technical SEO audit found 2 cluster pages without metadata/canonical/OG (in sitemap but rendering default Next.js title) and 1 hardcoded business @id not using central config. All 3 are governance-required (§20-seo-and-url-rules: cluster page = BreadcrumbList + FAQPage).
**Verification:** `npx tsc --noEmit` — zero errors. Only 3 target files changed.

---

## 2026-03-20 — Metadata title fix batch: 6 long-city-name city pages
**Agent:** Claude Code
**File:** `lib/content/gevelisolatie-locations.ts` — 6 city entries (title field only)

**What:** Shortened meta titles for cities whose full title exceeded 60-character governance limit (§20-seo-and-url-rules: title ≤ 60 chars). Adjusted title wording while preserving primary keyword and city name.
**Cities affected:** 6 city pages with long compound names (exact list in git diff)
**Not touched:** description, h1, slug, content, FAQ, schema, any other field
**Verification:** `npx tsc --noEmit` — zero errors

---

## 2026-03-20 — City pages rollout complete: Waves 4–7 (remaining 11 cities)
**Agent:** Claude Code
**File:** `lib/content/gevelisolatie-locations.ts` — 11 city entries

**Cities:** Rotterdam, Den Haag, Delft, Barendrecht, Ridderkerk, Alphen aan den Rijn, Hellevoetsluis, Bergen op Zoom, Roosendaal, Leidschendam-Voorburg, Hendrik-Ido-Ambacht

**Applied per city (same framework as Waves 1–3):**
- `localContext` rewrite: unique constructief/wijk-level differentiator, no intro duplication
- `energieTip`: unique per city, no Rc-jargon, user-perspective language
- `vergunningTip`: differentiator where applicable (beschermd stadsgezicht, geen beschermde stadsgezichten, etc.)
- FAQ edits: replaced generic werkgebied FAQ with city-specific question, added 1 local FAQ where applicable
- `afstanden`: project references where available

**Not touched:** intro, title, description, h1, slug, bouwperiode, gemiddeldBesparing, subsidieInfo, gemeenteWebsite, nearbyLocations, pricing, calculator, CTA, page template
**Verification:** `npx tsc --noEmit` — zero errors

**Status:** All 21/21 city pages now have unique localContext, energieTip, vergunningTip, and at least 1 city-specific FAQ. City pages content rollout is complete.

---

## 2026-03-20 — Wave 3: Capelle a/d IJssel, Vlaardingen, Maassluis, Gouda
**Agent:** Claude Code
**File:** `lib/content/gevelisolatie-locations.ts` — 4 city entries

**Capelle aan den IJssel** (3 edits):
- `localContext` rewrite: VvE-schaal grote complexen (Schollevaar/Oostgaarde) vs rijtjeshuizen ('s-Gravenland) (was: duplicaat intro)
- `energieTip` replace: projectaanpak bij grote VvE-complexen (was: herhaalde localContext "ongeïsoleerd")
- `vergunningTip` rewrite: "geen beschermde stadsgezichten in woonwijken" differentiator (was: generic template)

**Vlaardingen** (4 edits):
- `localContext` rewrite: compact/efficiënt Holy+Westwijk vs Vettenoordse polder + oud centrum check (was: duplicaat intro)
- `energieTip` replace: eigen projecten als E-E-A-T signal (was: Rc-jargon)
- `faq[2]` antwoord edit: Rc-jargon removal → "weinig isolatiewaarde" + "comfort direct merkbaar"
- `afstanden`: 2 Vlaardingen-projecten referentie toegevoegd

**Maassluis** (3 edits):
- `localContext` rewrite: oud/nieuw onderscheid Sluispolder vs Balkon/Dijkpolder (was: duplicaat intro)
- `energieTip` replace: foutcorrectie ("het Balkon bouwjaar '60–'80" was fout — Balkon is 2007+) + vocht-focus
- `faq[1]` replace: werkgebied (Maasland/HvH) → "Heeft mijn nieuwbouwwoning ook baat bij gevelisolatie?"

**Gouda** (3 edits):
- `localContext` rewrite: standaard ETICS Goverwelle vs smalle percelen/aaneengebouwde gevels binnenstad (was: duplicaat intro)
- `energieTip` replace: Rc-jargon removal → gebruikersperspectief (was: "Rc 0,3–0,6", "Rc 3,5+ conform Bbl")
- `faq[2]` antwoord edit: Rc-jargon removal → "weinig isolatiewaarde" + "wooncomfort + energielabel"

**Not touched:** intro, title, description, h1, slug, bouwperiode, gemiddeldBesparing, subsidieInfo, gemeenteWebsite, nearbyLocations, pricing, calculator, CTA
**Verification:** `npx tsc --noEmit` — zero errors

---

## 2026-03-20 — Wave 2: Leiden, Schiedam, Spijkenisse
**Agent:** Claude Code
**File:** `lib/content/gevelisolatie-locations.ts` — 3 city entries

**Leiden** (4 edits):
- `localContext` rewrite: constructief verschil massief metselwerk (binnenstad) vs enkelsteens (Merenwijk/Stevenshof) (was: duplicaat van intro met hectares)
- `faq[1]` antwoord: "checken" → "controleren" (consistency fix)
- `faq[2]` replace: werkgebied (Leiderdorp/Oegstgeest) → "Is ETICS geschikt voor grachtenpanden met massief metselwerk?"
- `afstanden`: Katwijk-project referentie toegevoegd

**Schiedam** (4 edits):
- `localContext` rewrite: constructief verschil per wijk — Groenoord flats vs Nieuwland rijtjes vs binnenstad beschermd (was: duplicaat intro)
- `energieTip` replace: VvE-schaalvoordeel bij flats (was: herhaalde localContext "ongeïsoleerd")
- `faq[2]` replace: werkgebied (Kethel/Woudhoek) → "Verschilt de aanpak bij portiekflats en rijtjeshuizen?"
- `afstanden`: Vlaardingen-project referentie toegevoegd

**Spijkenisse** (6 edits):
- `localContext` rewrite: uniformiteit groeikernbouw → collectieve efficiëntie (was: duplicaat intro)
- `energieTip` replace: jargon (Rc-waarde, Bbl) → gebruikersperspectief (tocht, temperatuur, stookkosten)
- `vergunningTip` rewrite: "geen beschermde stadsgezichten in woonwijken" differentiator (was: generic template)
- `faq[2]` replace: werkgebied (Nissewaard kernen) → "Kan een hele straat tegelijk gevelisolatie laten uitvoeren?"
- `woningTypes[2]`: "Portiekflats en galerijflats" → + "(de Akkers, Groenewoud)"
- `afstanden`: Nieuw-Beijerland project referentie toegevoegd

**Not touched:** intro, title, description, h1, slug, bouwperiode, gemiddeldBesparing, subsidieInfo, gemeenteWebsite, nearbyLocations, pricing, calculator, CTA
**Verification:** `npx tsc --noEmit` — zero errors

---

## 2026-03-20 — City page rollout framework (doc only)
**Agent:** Claude Code
**File created:** `docs/audit/CITY_PAGE_ROLLOUT_FRAMEWORK.md`
**Why:** Codifies pilot lessons into reusable process for remaining 18 cities. Includes: what worked, what scales, what doesn't, per-city checklist, 5-step process, invariants, wave 2 recommendation (Leiden, Schiedam, Spijkenisse).

---

## 2026-03-20 — Dutch language refinement: Dordrecht, Zoetermeer, Breda
**Agent:** Claude Code
**File:** `lib/content/gevelisolatie-locations.ts` — 3 city entries, language-only

**Dordrecht** (4 edits):
- `localContext`: jargon verwijderd ("vochtbeheersing", "spatwaterdetails", "opbouw"), parentheses verwijderd, kortere zinnen
- `energieTip`: "vochthuishouding"/"dampopen ETICS-opbouw" → gewone taal; redundantie met localContext verminderd
- `faq[2]` antwoord: "spatwaterdetails" → "afwerking onderaan de gevel"; "waterrijke omgeving" → "nabijheid van water"
- `faq[3]` antwoord: andere invalshoek (risico→oplossing) om herhaling met localContext/energieTip te vermijden

**Zoetermeer** (3 edits):
- `localContext`: 5→4 zinnen, "warmteweerstand"/"moderne isolatiewaarden" verwijderd, "aangewezen" → "ontwikkeld"
- `energieTip`: "galerij- en balkonaansluitingen" → "balkons en galerijen", "prefab panelen" → "bouwdelen"
- `faq[3]` antwoord: "mits"-constructie → actieve zin, "gevelelementen" → "geveldelen"

**Breda** (1 edit):
- `faq[3]` antwoord: "checken" → "controleren" (consistent met vergunningTip)

**Not changed:** No facts added/removed, no SEO keywords removed, no pricing/CTA/structure changes.
**Verification:** `npx tsc --noEmit` — zero errors.

---

## 2026-03-20 — Pilot deep-pass: Dordrecht, Zoetermeer, Breda
**Agent:** Claude Code
**File:** `lib/content/gevelisolatie-locations.ts` — 3 city entries

**Dordrecht** (6 edits):
- `localContext` rewrite: waterrijke ligging + plintzone + constructief verschil per wijk (was: duplicaat van intro)
- `woningTypes[3]`: "Bedrijfspanden" → "Laagbouwwoningen (Sterrenburg, Dubbeldam)"
- `energieTip` replace: waterrijke context + dampopen opbouw (was: herhaalde localContext)
- `afstanden`: eigen Dordrecht-project referentie toegevoegd
- `faq[2]` edit: VvE-aanpak Dordrecht-specifiek met waterrijke plintdetails
- `faq[3]` new: "Heeft de waterrijke ligging invloed op gevelisolatie?"

**Zoetermeer** (6 edits):
- `localContext` extend: systeembouw/prefab context + bevestigingsbeoordeling (was: geen systeembouw-vermelding)
- `woningTypes[3]`: "VvE-complexen" → "VvE-complexen (galerijflats Seghwaert, portiekflats Palenstein)"
- `energieTip` replace: systeembouw aandachtspunten (koudebruggen, prefab naden) (was: herhaalde intro)
- `vergunningTip` rewrite: "geen beschermde stadsgezichten in woonwijken" differentiator (was: generic template)
- `faq[2]` edit: VvE specifiek met Seghwaert/Palenstein wijknamen
- `faq[3]` new: "Zijn systeembouwwoningen geschikt voor ETICS?"

**Breda** (6 edits):
- `localContext` rewrite: constructief verschil portiekflat (4-5 hoog) vs laagbouw (2-3 lagen) + beschermd stadsgezicht (was: duplicaat van intro)
- `energieTip` replace: governance fix — superlative "slechtst geïsoleerde" verwijderd → conditional factual (was: §6 violation)
- `afstanden`: Halsteren-project referentie toegevoegd
- `faq[2]` replace: "Oosterhout/Etten-Leur werkgebied" → "portiekflat steigerhoogte + VvE-schaalvoordeel"
- `faq[3]` new: "Mag ik gevelisolatie in beschermd stadsgezicht van Breda?"

**Not touched:** intro, title, description, h1, slug, bouwperiode, gemiddeldBesparing, subsidieInfo, gemeenteWebsite, nearbyLocations, pricing, calculator, CTA, page template
**Verification:** `npx tsc --noEmit` — zero errors

---

## 2026-03-19 — Location pages batch: subsidieInfo + WaaromBmKlus subtitle
**Agent:** Claude Code
**Files changed:**
- `lib/content/gevelisolatie-locations.ts` — all 21 `subsidieInfo` fields rewritten: removed hardcoded ISDE amounts (€20,25/€40,50), restructured to lead with local supplement ("Gemeente X biedt Y"), added conditional ISDE reference ("kunt u mogelijk") + rvo.nl redirect
- `app/gevelisolatie/[location]/page.tsx` line 429 — WaaromBmKlusSection subtitle changed from hardcoded "regio Rotterdam" to dynamic `${data.city} en omgeving`
**Not touched:** gemiddeldBesparing, vergunningTip, energieTip, FAQ, intro, localContext, woningTypes, pricing/cost fields, KostenCalculator, serviceSchema
**Why:** Backlog items #6 (CM-3), #7 (CM-4), #15 (CME-3). Subsidy amounts change annually; conditional language prevents stale claims. City-aware subtitle improves local trust.
**Verification:** `npx tsc --noEmit` — zero errors. Grep confirms 0 occurrences of €20,25/€40,50 remaining. All 21 subsidieInfo now lead with "Gemeente".

---

## 2026-03-19 — 5 priority fixes from unified backlog
**Agent:** Claude Code
**Files changed:**
- `app/diensten/page.tsx` — "100% Garantie" stat → "VCA* Gecertificeerd" (CC-1 CLOSED)
- `app/gevel-schilderen/page.tsx` — "Snelle reactie tijdens openingstijden" → "Persoonlijk contact per telefoon of WhatsApp" (CC-2 CLOSED)
- `app/page.tsx` — ReviewsSection: static import → `dynamic()`, removed `below-fold` wrapper (T:C-1 + T:ME-1 partial CLOSED)
- `components/hero-section.tsx` — Primary CTA `href="/contact/"` → `href="#offerte"` (CM-1 CLOSED)
- `app/gevelisolatie/rc-waarde-dikte/layout.tsx` — Removed contradictory FAQ array + faqSchema; kept breadcrumb/business/service schemas (CM-2 + T:MA-2 partial CLOSED)
- `app/gevelisolatie/rc-waarde-dikte/page.tsx` — Added `jsonLdScript` import + FAQ JSON-LD schema using page-level faqItems (correct version)
- `docs/audit/index.md` — Added fix record row

**Why:** Top 5 priority items from unified backlog (2 CRIT content + 1 CRIT tech + 2 MAJOR content).
**Verification:** `npx tsc --noEmit` — zero errors.

---

## 2026-03-19 — Unified backlog consolidation (docs only)
**Agent:** Claude Code
**Files updated:**
- `docs/audit/NEXT_ACTIONS.md` — complete rewrite: unified backlog from both audits, 4 tiers (Must fix / Should fix / Nice to improve / Deferred), 29 items total
- `docs/audit/CHANGELOG_AI.md` — this entry
**Why:** Both audit files (tech + content) had separate action items. Consolidated into single prioritized backlog with consistent format: type, severity, source ID, next step. Also caught additional stale entry in `60-decisions-and-bans.md:50` (materialen refactor listed as "Priority action" but already done).

---

## 2026-03-19 — Governance system created (docs only, no code changes)
**Agent:** Claude Code
**Files changed (docs):**
- `CLAUDE.md` — rewritten as thin adapter (quick start + commands + governance pointer)
- `AGENTS.md` — rewritten as neutral agent bridge
- `docs/governance/00-project-constitution.md` — created (business facts, stack, hosting, CTAs)
- `docs/governance/10-language-and-content-rules.md` — created (language + Dutch content rules)
- `docs/governance/20-seo-and-url-rules.md` — created (URL/meta/schema invariants)
- `docs/governance/30-architecture-and-code-rules.md` — created (server/client, below-fold, images, tokens)
- `docs/governance/40-workflow-and-change-rules.md` — created (workflow pointers, protected files)
- `docs/governance/50-audit-and-verification-rules.md` — created (QA + performance decisions)
- `docs/governance/60-decisions-and-bans.md` — created (explicit bans + architectural decisions)
- `docs/governance/70-page-type-checklists.md` — created (per-page-type checklists)
- `docs/governance/GOVERNANCE_ARCHITECTURE_PLAN.md` — created (4-layer model + SSoT map)
- `docs/governance/INVENTORY_EXISTING_RULES.md` — created (pre-governance rules inventory)
- `.cursor/rules/00-always.mdc` — created/updated (always-on core bans)
- `.cursor/rules/10-seo-content.mdc` — created/updated (auto for content + page files)
- `.cursor/rules/20-code-changes.mdc` — created/updated (auto for app/, components/, lib/)
- `docs/audit/index.md` — created (audit outputs index)
**Why:** Formalized scattered existing agreements into single-source-of-truth governance docs.

---

## 2026-03-19 — `app/gevelisolatie/page.tsx` — 2 technical fixes
**Agent:** Claude Code
**Files changed:** `app/gevelisolatie/page.tsx`

**Fix 1: `WatIsEticsSection` — added missing `below-fold` wrapper**
- Before: `WatIsEticsSection` was rendered inside the TOC container div without its own `below-fold` wrapper (combined with the TOC nav)
- After: `WatIsEticsSection` has its own `<div className="below-fold"><div className="mx-auto max-w-7xl...">` wrapper, consistent with all other sections
- Why: Missing `below-fold` means the browser does not defer paint for this section, negating the performance benefit

**Fix 2: `WerkwijzeSection` — converted from static to `dynamic()` import**
- Before: `import WerkwijzeSection from "@/components/sections/gevelisolatie/werkwijze-section"` (static)
- After: `const WerkwijzeSection = dynamic(() => import("@/components/sections/gevelisolatie/werkwijze-section"))`
- Why: `werkwijze-section` uses `"use client"` + `useState`. Static import of a client component causes SSR bundle leak — its JS lands in the initial server-rendered bundle.

---

## 2026-03-19 — `app/sierpleister/page.tsx` — 2 content/SEO fixes
**Agent:** Claude Code
**Files changed:** `app/sierpleister/page.tsx`

**Fix 1: `hero.lead[1]` — surfaced second hero paragraph**
- Before: Hero section only rendered `hero.lead[0]`. `hero.lead[1]` existed in the content file but was never rendered (dead content).
- After: Added `<p>` tag rendering `hero.lead[1]` below the first paragraph in the hero
- Why: Content file had a second approved lead paragraph that was invisible to users and search engines. Brief requires hero to surface key selling points.

**Fix 2: `soorten.types[*].bullets` — surfaced comparison bullets on type cards**
- Before: `soorten.types.map(({ name, badge, description }) => ...)` — destructuring omitted `bullets`. The bullets array existed in the content file but was never rendered.
- After: Added `bullets` to destructuring; added `<ul>` with `{label}: {value}` list inside each type card
- Why: Content file had approved comparison data (label/value specs) for each sierpleister type. Brief requires "vergelijking" SERP format. Content was approved but dead.

---

## 2026-03-19 — `docs/audit/index.md` — updated with inline fix records
**Agent:** Claude Code
**Files changed:** `docs/audit/index.md`
- Added row for `app/gevelisolatie/page.tsx` fix (2026-03-19)
- Added row for `app/sierpleister/page.tsx` fix (2026-03-19)

---

## 2026-03-19 — Full content audit (docs only, no code changes)
**Agent:** Claude Code
**Files created:**
- `docs/audit/CONTENT_AUDIT_STATUS.md` — full content/SEO audit (17 issues: 2C / 5MA / 6ME / 4MI)
**Files updated:**
- `docs/audit/CHANGELOG_AI.md` — this entry
- `docs/audit/NEXT_ACTIONS.md` — added content-specific actions
- `docs/audit/index.md` — added content audit row
**Why:** Content quality, claims safety, cannibalization, and Dutch compliance audit across all pages and briefs.

---

## 2026-03-19 — Full technical audit (docs only, no code changes)
**Agent:** Claude Code
**Files created:**
- `docs/audit/TECH_AUDIT_STATUS.md` — full audit findings (14 issues, C/MA/ME/MI severity)
- `docs/audit/CHANGELOG_AI.md` — this file
- `docs/audit/NEXT_ACTIONS.md` — prioritized action list
**Why:** Baseline audit after governance system creation and initial fixes.
