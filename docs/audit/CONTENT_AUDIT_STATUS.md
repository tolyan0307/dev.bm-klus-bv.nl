# Content Audit — Full Project
**Date:** 2026-03-19
**Scope:** All pages — content quality, SEO alignment, Dutch compliance, claims safety, cannibalization, section logic, CTA consistency
**Status:** Complete — findings recorded, no code changes made
**Source rules:** `seo-system/GLOBAL_SEO_CONTENT_RULES.md`, `docs/governance/10-language-and-content-rules.md`, `docs/governance/70-page-type-checklists.md`, page briefs

> This is a snapshot. Check dates before acting.
> For technical findings → `docs/audit/TECH_AUDIT_STATUS.md`

---

## Severity summary

| Severity | Count | Description |
|----------|-------|-------------|
| CRITICAL | 2 | Banned phrases / fabricated trust claims — governance violation |
| MAJOR | 5 | Content accuracy risks, CTA mismatch, boilerplate, FAQ conflict |
| MEDIUM | 6 | Cannibalization overlap, template drift, structural inconsistency |
| MINOR | 4 | Naming inconsistency, minor content gaps |

---

## CRITICAL findings

### CC-1 — "100% Garantie" stat badge on `/diensten/`
- **Where:** `app/diensten/page.tsx` line 254
- **What:** Hero stats section shows `{ value: "100%", label: "Garantie", desc: "Op vakmanschap" }` as a prominent badge alongside "6 Diensten" and "21+ Steden"
- **Why it matters:** Governance rule `10-language-and-content-rules.md §7` explicitly bans "garanderen" without qualification. `seo-system/GLOBAL_SEO_CONTENT_RULES.md §3c` bans fabricated guarantees. The homepage FAQ explicitly states guarantee terms vary per project and are "per project schriftelijk vastgelegd in de offerte". A "100% Garantie" badge contradicts this and creates legal exposure. Dutch ACM (advertising authority) treats unqualified guarantee claims as misleading.
- **Safe to fix now:** Yes — change stat text only
- **Fix direction:** Replace with a verifiable trust signal, e.g. `{ value: "VCA*", label: "Gecertificeerd", desc: "Veiligheid & kwaliteit" }` or remove the stat entirely. Do NOT invent an alternative guarantee claim.

### CC-2 — "Snelle reactie tijdens openingstijden" on `/gevel-schilderen/`
- **Where:** `app/gevel-schilderen/page.tsx` line 626
- **What:** This exact phrase appears in the WaaromBmKlusSection subtitle or trust bullet area
- **Why it matters:** Governance rule `10-language-and-content-rules.md §7` explicitly lists "Snelle reactie tijdens openingstijden" as a **banned phrase** (overpromising). It was specifically identified as problematic and documented in the ban list.
- **Safe to fix now:** Yes — text change only
- **Fix direction:** Replace with a factual, verifiable statement. E.g., "Persoonlijk contact via telefoon of WhatsApp" or remove it. Do not replace with another time-based promise.

---

## MAJOR findings

### CM-1 — Homepage hero CTA targets `/contact/` instead of `#offerte`
- **Where:** `components/hero-section.tsx` line 101
- **What:** Primary CTA button "Offerte aanvragen" links to `/contact/` (full page navigation). Secondary button links to `/diensten/`.
- **Why it matters:** Governance checklist `70-page-type-checklists.md §Service page` requires "Primary CTA: `#offerte` (not `/contact/`)". All other money/service pages use `#offerte` which opens QuoteModal inline without page navigation. The homepage sends users away to a separate page, breaking the conversion funnel that works on every other page.
- **Safe to fix now:** Yes — change href only
- **Fix direction:** Change `href="/contact/"` to `href="#offerte"` on the primary CTA. Verify QuoteModal is rendered on homepage (confirmed: `<QuoteModal dienst="geveloplossingen" />` at line 70 of `app/page.tsx`).

### CM-2 — Rc-waarde-dikte FAQ contradicts itself between layout.tsx and page.tsx
- **Where:** `app/gevelisolatie/rc-waarde-dikte/layout.tsx` line 43 vs `app/gevelisolatie/rc-waarde-dikte/page.tsx` line 62
- **What:** FAQ question 6 ("Geldt er een subsidie- of vergunningsvereiste voor een minimale Rc?") has **contradictory answers**:
  - **layout.tsx:** "Een omgevingsvergunning is in de meeste gevallen **niet nodig** bij isolatie aan de eigen buitengevel"
  - **page.tsx:** "Voor buitengevelisolatie (ETICS) is doorgaans een omgevingsvergunning **nodig**, omdat het uiterlijk van de gevel verandert"
- **Why it matters:** Google renders both FAQ answers in rich results (layout generates JSON-LD, page renders visible FAQ). Users see contradictory permit advice on the same page. This undermines E-E-A-T trust and could be misleading for homeowners making permit decisions. The page.tsx version is factually more accurate.
- **Safe to fix now:** Yes — align to single correct answer
- **Fix direction:** Delete the FAQ array from `layout.tsx`. Move JSON-LD FAQ schema generation to `page.tsx` using the page's FAQ array (which has the correct content). This also resolves tech audit finding MA-2.

### CM-3 — Location pages: ISDE subsidy amounts hardcoded without date or disclaimer
- **Where:** `lib/content/gevelisolatie-locations.ts` — `subsidieInfo` field, all 21 cities
- **What:** Every location page states: "ISDE-subsidie voor gevelisolatie: **€20,25/m²** (bij één maatregel) of **€40,50/m²** (bij combinatie). Min. 10 m², Rd ≥ 3,5 m²K/W." This is:
  1. Verbatim identical across all 21 cities (boilerplate)
  2. Contains specific euro amounts with no "last updated" date
  3. Has no disclaimer like the `/subsidie-vergunning/` page has
- **Why it matters:** ISDE amounts change annually. Governance rule §3c bans fabricated prices/subsidies. While these amounts may have been correct at writing, they will inevitably become stale. The `/subsidie-vergunning/` page correctly uses 4 disclaimer boxes and says "raadpleeg altijd rvo.nl"; the location pages present the same amounts as fact without qualification. A wrong subsidy amount could lead to homeowner frustration and damage trust.
- **Safe to fix now:** Yes — text change only
- **Fix direction:** (1) Add conditional language: "De ISDE-subsidie bedraagt indicatief €20,25–€40,50/m² — raadpleeg rvo.nl voor actuele bedragen." (2) Add `[CLAIM_NEEDS_CONFIRMATION]` tag for next owner review. (3) Long-term: create a single shared subsidy snippet that all pages reference.

### CM-4 — Location pages: subsidy info is verbatim boilerplate across 21 cities
- **Where:** `lib/content/gevelisolatie-locations.ts` — `subsidieInfo` field
- **What:** ISDE sentence is character-for-character identical across all 21 locations. Only the local supplement name varies (e.g., "Duurzaam 010" for Rotterdam, "Energietransitiefonds" for Den Haag). The core ISDE text is copy-pasted.
- **Why it matters:** Governance rule `10-language-and-content-rules.md §6` bans "Boilerplate text copy-pasted across pages." Google's Helpful Content system detects near-identical blocks across many pages and may demote thin/duplicate location pages. The unique local supplement names partially mitigate this, but the shared ISDE block is still a risk factor.
- **Safe to fix now:** With care — need to vary phrasing per city while keeping facts correct
- **Fix direction:** Rewrite the ISDE reference differently per city or per city-cluster (Rotterdam-area vs. Den Haag-area vs. Drechtsteden vs. West-Brabant). Keep facts identical but vary sentence structure and emphasis. Add local subsidy names as the lead rather than the generic ISDE text.

### CM-5 — `/diensten/` FAQ: 5 items hardcoded inline with no brief
- **Where:** `app/diensten/page.tsx` lines 30-55
- **What:** 5 FAQ items are hardcoded inline in the page component. No SEO brief exists for `/diensten/`. No content file in `lib/content/` for this page.
- **Why it matters:** FAQ items contain claims that need review (e.g., "Geen verrassingen achteraf" in FAQ #4 — while not a guarantee, it's a promise-adjacent phrase). Without a brief, there's no documented search intent or required sections to audit against. Without a content file, FAQ cannot be reused in JSON-LD schema separately from the page.
- **Safe to fix now:** No — needs brief creation first
- **Fix direction:** (1) Create `seo-system/briefs/diensten.yaml` brief. (2) Create `lib/content/diensten.ts` content file. (3) Move FAQ to content file. (4) Review FAQ claims against governance tone rules.

---

## MEDIUM findings

### CME-1 — Cannibalization: `/sierpleister/` vs `/gevelisolatie/afwerkingen/`
- **Where:** Both pages cover sierpleister/spachtelputz vs crepi in detail
- **What:** `/sierpleister/` has full soorten section with spachtelputz vs crepi comparison. `/gevelisolatie/afwerkingen/` has 4 finish option cards (glad stucwerk, sierpleister, crepi, steenstrips) with detailed comparison table, plus a "Stucwerk vs sierpleister/crepi" deep-dive section. Both pages provide full pros/cons and maintenance info for sierpleister.
- **Why it matters:** Brief for `/gevelisolatie/afwerkingen/` says "doNotCoverDeeply: decoratieve sierpleister standalone → /sierpleister/". But the afwerkingen page's "stuc-vs-crepi" section (lines 577-625) goes into detail about when to choose each type — exactly what the sierpleister page covers. Google may see these as competing pages for "spachtelputz of crepi" queries.
- **Safe to fix now:** With care — content reduction on afwerkingen
- **Fix direction:** On `/gevelisolatie/afwerkingen/`: keep the comparison table (brief requires it) but shorten the "stuc-vs-crepi" Section to a summary + prominent link to `/sierpleister/`. The current 3-card deep dive with "body" paragraphs duplicates sierpleister's coverage.

### CME-2 — Location pages: hardcoded voordelen section, identical across 21 cities
- **Where:** `app/gevelisolatie/[location]/page.tsx` — voordelen section (hardcoded 4 benefits)
- **What:** All 21 location pages render the exact same 4 benefit cards. No local variation.
- **Why it matters:** Combined with verbatim subsidy text (CM-4) and hardcoded hero image, this increases the "thin duplicate" signal. Location pages are differentiated by intro, localContext, bouwperiode, woningTypes, FAQ — but the voordelen block is a large identical section in the middle.
- **Safe to fix now:** Low priority — structural change
- **Fix direction:** Either (1) remove voordelen from location pages (it duplicates pillar page) or (2) make 1 benefit dynamic per city (e.g., reference local bouwperiode in the benefit text). Option 1 is simpler and follows the brief's guidance that location pages should NOT include werkwijze or other pillar duplications.

### CME-3 — Location pages: `WaaromBmKlusSection` subtitle hardcoded to "regio Rotterdam"
- **Where:** `app/gevelisolatie/[location]/page.tsx` line 429
- **What:** Subtitle prop is always "gespecialiseerd in buitengevelisolatie (ETICS) en gevelafwerking in de regio Rotterdam en omgeving" — even for cities like Breda, Bergen op Zoom, or Leiden that are 80–100 km from Rotterdam.
- **Why it matters:** A homeowner in Breda searching for local gevelisolatie sees "regio Rotterdam" as the company's stated specialization — this weakens local trust signal. The region phrase is factually correct (governance says "±80–100 km") but feels disconnected from the visitor's city.
- **Safe to fix now:** Yes — make subtitle dynamic
- **Fix direction:** Pass `data.city` or `data.region` into the subtitle: "gespecialiseerd in buitengevelisolatie (ETICS) en gevelafwerking in ${data.city} en omgeving". Falls back to standard phrasing if no city.

### CME-4 — FAQ overlap between pillar `/gevelisolatie/` and cluster `/gevelisolatie/kosten/`
- **Where:** `lib/content/gevelisolatie.ts` FAQ #1 vs `app/gevelisolatie/kosten/page.tsx` FAQ #1
- **What:** Both pages have "Wat kost gevelisolatie (aan de buitenkant) per m²?" as FAQ #1 with similar answers mentioning €110–€200 and €200–€280 ranges. The pillar version is shorter; the kosten version adds steiger/herstelwerk detail.
- **Why it matters:** When both pages have FAQPage JSON-LD schema with near-identical Q&A, Google may show the wrong page in rich results. The kosten page should own this question exclusively; the pillar should defer to it.
- **Safe to fix now:** With care — need to edit content file
- **Fix direction:** On `/gevelisolatie/` (pillar): shorten the kosten FAQ to "Bekijk onze kostenpagina voor richtprijzen per m²" with a link to `/gevelisolatie/kosten/`. Keep the FAQ slot but change the question to something the pillar uniquely answers (e.g., "Hoe lang duurt een compleet ETICS-project?" — currently not in any FAQ).

### CME-5 — `home-faq.ts` uses English field names
- **Where:** `lib/content/home-faq.ts` — `question` / `answer` fields
- **What:** All other content files use `vraag` / `antwoord` for FAQ items. Homepage FAQ uses `question` / `answer`. Also, the type is `HomeFaqItem` instead of a shared type.
- **Why it matters:** Not user-facing, but creates confusion when auditing FAQ consistency across pages. A future agent running a project-wide FAQ audit would need to handle two different field name patterns.
- **Safe to fix now:** Yes — rename fields + update 2 consumer files
- **Fix direction:** Rename `question` → `vraag`, `answer` → `antwoord` in `home-faq.ts`. Update consumers: `app/page.tsx` (JSON-LD map) and `components/faq-section.tsx`.

### CME-6 — Cannibalization risk: `/buiten-stucwerk/` and `/gevelisolatie/afwerkingen/` stucwerk overlap
- **Where:** Both pages cover glad stucwerk in detail
- **What:** `/buiten-stucwerk/` has a full materialen section with 4 stucwerk types (cementpleister, spachtelputz, crepi, betonstuc). `/gevelisolatie/afwerkingen/` has 4 finish option cards including "Glad stucwerk" with pros/cons/maintenance. Both provide comparison tables with overlapping data.
- **Why it matters:** Brief for afwerkingen says "doNotCoverDeeply: exterior stucco standalone → /buiten-stucwerk/". The current afwerkingen content stays within bounds (it focuses on ETICS context), but the combined signal of two pages with stucwerk comparison tables is a cannibalization risk for "stucwerk gevel" queries.
- **Safe to fix now:** Low priority — monitor in Search Console
- **Fix direction:** If cannibalization appears in Search Console data, differentiate by: (1) afwerkingen focuses purely on "after ETICS" context, (2) buiten-stucwerk focuses on "standalone stucwerk without insulation". Current differentiation is adequate but could be sharpened.

---

## MINOR findings

### CMI-1 — Homepage hero lacks price teaser
- **Where:** `components/hero-section.tsx`
- **What:** Homepage hero has no "Vanaf €X/m²" price teaser. All 5 money pages have one. The homepage is not technically a money page, but it targets commercial intent ("gevelisolatie") and the missing price teaser is a gap vs. competitor landing pages.
- **Why it matters:** Price range in hero increases conversion rate (user knows budget fit immediately). Homepage is the highest-traffic page.
- **Safe to fix now:** With owner confirmation — needs a price range decision
- **Fix direction:** Add "Vanaf €110/m²" badge if owner confirms. This matches the gevelisolatie pillar page range.

### CMI-2 — Location pages: hero image always Dordrecht project
- **Where:** `app/gevelisolatie/[location]/page.tsx` — hero uses `baseName="dordrecht-gevelisolatie-10cm-na-01"`
- **What:** All 21 location pages show the same Dordrecht project as hero image, regardless of city. Already documented in `docs/IMAGE-SLOT-AUDIT.md`.
- **Why it matters:** Minor trust signal issue — a Rotterdam visitor sees a Dordrecht photo; a Den Haag visitor sees Dordrecht. Not content-critical but affects local feel.
- **Safe to fix now:** When city-specific images are available
- **Fix direction:** Already tracked in IMAGE-SLOT-AUDIT. Use city-specific project photos when available, or use a generic ETICS process photo that doesn't reference a specific city.

### CMI-3 — `buiten-stucwerk/page.tsx` hero.lead renders only `[0]`
- **Where:** `app/buiten-stucwerk/page.tsx`
- **What:** Hero section renders `{hero.lead[0]}` only. `lib/content/buiten-stucwerk.ts` has `lead: [paragraph1, paragraph2]` (2 paragraphs). Same pattern that was fixed on `/sierpleister/` — but here `lead[1]` is also dead content.
- **Why it matters:** Content file has approved second paragraph about detaillering (plint, hoeken, dagkanten) that is not rendered. Same issue as sierpleister fix from earlier today.
- **Safe to fix now:** Yes — same pattern as sierpleister fix
- **Fix direction:** Add `<p>{hero.lead[1]}</p>` after the first paragraph in the hero section. Matches the fix applied to `/sierpleister/` page.

### CMI-4 — `gevel-schilderen/page.tsx` hero.lead renders only `[0]`
- **Where:** `app/gevel-schilderen/page.tsx`
- **What:** Same pattern — hero renders only `{hero.lead[0]}`. Content file `lib/content/gevel-schilderen.ts` has 2 lead paragraphs. `lead[1]` about dampopen systems is dead content.
- **Why it matters:** Same as CMI-3. Approved content not visible to users or search engines.
- **Safe to fix now:** Yes — same pattern
- **Fix direction:** Add `<p>{hero.lead[1]}</p>` in hero section.

---

## Audit areas with no findings (clean)

| Area | Status |
|------|--------|
| Dutch-only compliance | All public content verified as Dutch (nl-NL). No Russian/English text on any public page. |
| Heading hierarchy | All audited pages have exactly 1 H1. H2/H3 nesting correct. No skipped levels found. |
| JSON-LD FAQPage alignment | FAQ schema matches visible FAQ on all pages except Rc-waarde-dikte (CM-2). |
| Breadcrumb accuracy | All breadcrumbs match actual URL structure. Labels are Dutch. |
| Internal linking coverage | All money pages link to `/contact/` and sibling services. All cluster pages link back to `/gevelisolatie/` pillar. |
| CTA label consistency | All pages use "Offerte aanvragen" as primary CTA label (Dutch). WhatsApp as secondary. |
| Trust bullets pattern | VCA*, opname, richtprijs — consistent across all money page heroes. |
| Reviews section | Same 4.8/5 Google reviews component on all pages — consistent, factual. |
| Privacy policy | `/privacybeleid/` exists, Dutch text, standard compliance language. |
| Energy savings phrasing | All audited pages use conditional language ("kan leiden tot", "mogelijk"). No absolute guarantees found (except diensten "100% Garantie" — CC-1). |
| Price ranges | All prices match `GLOBAL_SEO_CONTENT_RULES.md §10` hardcoded price table. No discrepancies found. |

---

## Files audited in this pass

**Content files:** `lib/content/gevelisolatie.ts`, `lib/content/buiten-stucwerk.ts`, `lib/content/sierpleister.ts`, `lib/content/gevel-schilderen.ts`, `lib/content/muren-stucen.ts`, `lib/content/home-faq.ts`, `lib/content/gevelisolatie-locations.ts`

**Page files:** `app/page.tsx`, `components/hero-section.tsx`, `app/gevelisolatie/page.tsx`, `app/sierpleister/page.tsx`, `app/buiten-stucwerk/page.tsx`, `app/gevel-schilderen/page.tsx`, `app/muren-stucen/page.tsx`, `app/diensten/page.tsx`, `app/gevelisolatie/kosten/page.tsx`, `app/gevelisolatie/afwerkingen/page.tsx`, `app/gevelisolatie/materialen/page.tsx`, `app/gevelisolatie/rc-waarde-dikte/page.tsx`, `app/gevelisolatie/subsidie-vergunning/page.tsx`, `app/gevelisolatie/[location]/page.tsx`, `app/over-ons/page.tsx`, `app/contact/page.tsx`

**Layout files:** `app/gevelisolatie/materialen/layout.tsx`, `app/gevelisolatie/rc-waarde-dikte/layout.tsx`

**SEO briefs:** All 10 briefs in `seo-system/briefs/`

**Data files:** `data/sitemap-plan.ts`
