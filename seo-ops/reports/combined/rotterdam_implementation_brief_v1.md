# Implementation Brief: /gevelisolatie/rotterdam/

**Date:** 2026-04-07
**Type:** Safe, minimal SEO strengthening for query ownership
**Target query:** "gevelisolatie rotterdam" (+ variant "buitengevelisolatie rotterdam")
**Target page:** /gevelisolatie/rotterdam/
**Mode:** Recommendation only — no changes applied

---

## A1. Current state summary

### Source files

| Component | Path |
|-----------|------|
| Page data (Rotterdam entry) | `lib/content/gevelisolatie-locations.ts` lines 23–71 |
| Page template (shared) | `app/gevelisolatie/[location]/page.tsx` (1061 lines) |
| Metadata generation | `app/gevelisolatie/[location]/page.tsx` lines 67–80 |

### Current SEO fields

| Field | Current value |
|-------|---------------|
| **title** | `Gevelisolatie Rotterdam – ETICS prijs per m²` |
| **meta description** | `Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Opname op locatie en offerte per m². VCA-gecertificeerd.` |
| **H1** | `Gevelisolatie in Rotterdam` (rendered with subtitle "opname op locatie & offerte") |
| **Hero subline** | `Gevelisolatie specialist · Rotterdam` (uppercase, pre-H1) |
| **Intro paragraph** | 3 sentences about Rotterdam's housing stock, service area, and free on-site estimate |

### Internal linking to this page

| Source | Mechanism | Anchor text |
|--------|-----------|-------------|
| `/gevelisolatie/` → MeerInformatieSection | Location link list (below-fold) | "Rotterdam" |
| City pages (nearby) | nearbyLocations array (other city pages link back) | "Rotterdam" |
| No other internal links found | — | — |

### JSON-LD structured data

The page generates 4 JSON-LD blocks:
- BreadcrumbList (Home > Diensten > Gevelisolatie > Rotterdam)
- LocalBusiness
- Service (name: "Buitengevelisolatie (ETICS) Rotterdam")
- FAQPage (4 questions)

### Hero image

Uses `dordrecht-gevelisolatie-10cm-na-01` — shared across city pages, not Rotterdam-specific.

---

## A2. Specific weaknesses vs intended query ownership

### 1. Title lacks direct local-service signal
Current: `Gevelisolatie Rotterdam – ETICS prijs per m²`
- "ETICS" is a technical term most searchers don't use
- "prijs per m²" is valid but secondary to local relevance
- Missing: explicit service verb (e.g., "laat uw gevel isoleren")

### 2. Meta description could be more action-oriented
Current description mentions ETICS, materials, and VCA certification — all factual but passive. It doesn't differentiate from the main /gevelisolatie/ page's description strongly enough.

### 3. H1 is correct but generic
`Gevelisolatie in Rotterdam` is accurate and clean. The subtitle "opname op locatie & offerte" adds action. This is adequate — not the main weakness.

### 4. Internal link from /gevelisolatie/ is below-fold only
The MeerInformatieSection is dynamically loaded at the bottom of the main page. The link to Rotterdam is one of 21 city links in a flat list. There is no prominent contextual link higher on the page.

### 5. No cross-linking from project pages
There are Rotterdam project pages (e.g., `rotterdam-julianastraat-aanbouw-isolatie-4cm-2026`) but they don't link to `/gevelisolatie/rotterdam/`. Only the Dordrecht project page links to its city page.

### 6. Hero image is not Rotterdam-specific
Minor issue, not a priority.

---

## A3. Recommended minimal edits

### Edit 1: Improve title tag (HIGH priority)

**File:** `lib/content/gevelisolatie-locations.ts` line 27

**Current:**
```
title: "Gevelisolatie Rotterdam – ETICS prijs per m²"
```

**Suggested direction:**
```
title: "Gevelisolatie Rotterdam – Offerte op maat | BM klus BV"
```

**Rationale:**
- Drops "ETICS" (low search recognition among homeowners)
- Adds "Offerte op maat" — matches commercial search intent
- Adds brand name — matches SERP patterns from competitors
- Keeps "Gevelisolatie Rotterdam" in exact-match position at the start
- Length: ~52 chars (well within 60-char limit)

**Alternative option:**
```
title: "Gevelisolatie Rotterdam – Buitenisolatie specialist | BM klus BV"
```

### Edit 2: Tighten meta description (MEDIUM priority)

**File:** `lib/content/gevelisolatie-locations.ts` lines 28–29

**Current:**
```
description: "Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Opname op locatie en offerte per m². VCA-gecertificeerd."
```

**Suggested direction:**
```
description: "Gevelisolatie in Rotterdam door lokale specialisten. Stuc, sierpleister of steenstrips afwerking. Gratis opname op locatie — vraag uw offerte aan."
```

**Rationale:**
- Starts with "Gevelisolatie in Rotterdam" — exact query match in snippet
- "door lokale specialisten" — differentiates from generic info pages
- "Gratis opname" — conversion-oriented language
- "vraag uw offerte aan" — clear CTA
- Removes "ETICS" and "VCA-gecertificeerd" (valid but not search-oriented)
- Length: ~143 chars (within 155-char limit)

### Edit 3: (Optional) One contextual internal link from /gevelisolatie/ (LOW-MEDIUM priority)

**This is NOT a code change to this page — it's a suggestion for /gevelisolatie/ main page.**

Currently the only link from /gevelisolatie/ to /gevelisolatie/rotterdam/ is in the bottom MeerInformatieSection, buried among 21 cities.

**Suggestion:** In the main /gevelisolatie/ page body, where Rotterdam is mentioned in the WaaromBmKlusSection subtitle ("Lokale vakmensen uit Rotterdam"), consider making "Rotterdam" a hyperlink to `/gevelisolatie/rotterdam/`.

**Important:** This is a minor enhancement. Do NOT restructure the main page or add a prominent "Werkgebied Rotterdam" block. The current below-fold link list already provides basic linking.

---

## A4. Exact fields/sections to change

| # | File | Line(s) | Field | Change type |
|---|------|---------|-------|-------------|
| 1 | `lib/content/gevelisolatie-locations.ts` | 27 | `title` | Replace value |
| 2 | `lib/content/gevelisolatie-locations.ts` | 28–29 | `description` | Replace value |

**That's it.** Two field value changes in one file.

No template changes. No component changes. No structural changes.

---

## A5. Example wording direction

### Title option (recommended)
```
Gevelisolatie Rotterdam – Offerte op maat | BM klus BV
```

### Description option (recommended)
```
Gevelisolatie in Rotterdam door lokale specialisten. Stuc, sierpleister of steenstrips afwerking. Gratis opname op locatie — vraag uw offerte aan.
```

### What this achieves
- "Gevelisolatie Rotterdam" in exact-match position in title
- "Gevelisolatie in Rotterdam" near the start of the description
- Both are action/conversion oriented vs. the current passive/technical tone
- Both stay within character limits
- No overclaiming, no keyword stuffing

---

## A6. What must remain untouched

| Item | Reason |
|------|--------|
| H1 (`Gevelisolatie in Rotterdam`) | Already correct and clean. No change needed. |
| intro text | Already strong — mentions neighborhoods, housing types, local office. Don't rewrite. |
| localContext text | High-quality local content. Do not touch. |
| FAQ entries | 4 well-written, Rotterdam-specific questions. Keep as-is. |
| JSON-LD schemas | Correct as-is (BreadcrumbList, LocalBusiness, Service, FAQPage). |
| Page template (`page.tsx`) | Shared by all 21 city pages. Do NOT modify for Rotterdam only. |
| Main /gevelisolatie/ page | Do NOT add canonical, noindex, or redirect directives. Do NOT remove "Rotterdam" mentions. |
| Other city pages | Out of scope. This brief is Rotterdam-only. |

---

## A7. Validation checklist after implementation

After making the 2 field changes:

- [ ] `pnpm build` completes without errors
- [ ] `npx tsc --noEmit` passes
- [ ] Visit /gevelisolatie/rotterdam/ locally — confirm new title in browser tab
- [ ] View page source — confirm `<title>` and `<meta name="description">` reflect new values
- [ ] Confirm H1, intro, FAQ, and JSON-LD are unchanged
- [ ] Check other city pages (e.g., /gevelisolatie/den-haag/) are NOT affected (they have their own data entries)
- [ ] Confirm title length ≤ 60 characters
- [ ] Confirm description length ≤ 155 characters
- [ ] After deploy: request re-indexing in GSC URL Inspection for /gevelisolatie/rotterdam/
- [ ] After 2–4 weeks: check GSC for position changes on "gevelisolatie rotterdam"

---

## A8. Expected impact

**Conservative estimate:** Title and description changes may improve CTR from current ~0% (26 impressions, 0 clicks at pos 53.73) if/when the page gains visibility. These changes alone will NOT move the page from position 53 to top 10 — that requires Google to re-evaluate which URL to rank.

**What will actually help ranking:** The internal link signal from the main /gevelisolatie/ page, combined with the existing strong content on the Rotterdam page, gives Google a reason to test this URL more often. But this is a gradual process.

**Timeline:** Allow 4–8 weeks for any measurable position change. If no improvement after 8 weeks, consider content depth enhancement as the next step.

---

_Generated: 2026-04-07. Mode: recommendation only. No site changes applied._
