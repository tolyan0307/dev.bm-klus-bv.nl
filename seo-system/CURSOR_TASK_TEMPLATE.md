# CURSOR TASK TEMPLATE — BM klus BV

> 3-step workflow for SEO content tasks. Always follow this order.
> Before every task, attach: `GLOBAL_SEO_CONTENT_RULES.md` + page brief + current page file.

---

## Before you start — checklist

Verify you have:
- [ ] `seo-system/GLOBAL_SEO_CONTENT_RULES.md` in context
- [ ] Page brief (`seo-system/briefs/<slug>.yaml`) in context
- [ ] Current page file (`app/<slug>/page.tsx`) in context
- [ ] Content file (`lib/content/<slug>.ts`) if it exists
- [ ] Task type clear: **improve** | **rewrite** | **create** | **qa-only**

Sibling pages for anti-cannibalization: listed in the brief under `cannibalization.siblingPages`. Read them if needed — do not require manual attachment every time.

---
## Response language policy

- All website copy (H1/H2/H3, body text, CTA, FAQ, meta title/description) must be in Dutch (NL).
- All communication to me (analysis, explanations, QA report, risk notes, checklists, comments) must be in Russian (RU).
- Do not translate Dutch page copy into Russian unless explicitly requested.

## Step 1 — Analyze + Outline

> Combined analysis and structure. No content writing yet.

```text
Use GLOBAL_SEO_CONTENT_RULES.md and the page brief as source of truth.
Do NOT write content yet.

Part A — Gap analysis:
1) Intent match: does current content match the brief's searchIntent and pageGoal?
2) Missing/weak sections vs brief's requiredSections
3) Cannibalization risk vs siblingPages listed in the brief
4) Weak or risky claims (fabricated prices/guarantees/timelines)
5) Internal linking gaps (content-level only, do not redesign architecture)
6) SERP alignment: does the page format match what top results show? (use brief's serp section)
7) E-E-A-T gaps: missing experience signals, trust elements, expertise demonstration

Part B — Proposed outline:
- H1 (exact text)
- H2/H3 structure
- Purpose of each section (1–2 lines)
- FAQ intents
- CTA placement
- Content-level internal link placement suggestions

Output language for internal analysis: Russian (RU).
```

### What you (the user) check after Step 1:
- Does the outline have commercial focus? (money pages)
- Is there a CTA?
- Is the page trying to cover too much?
- Does the structure make logical sense?
- Are sibling page overlaps avoided?

---

## Step 2 — Write / Edit content (by section)

> Only after Step 1 is approved. Write in Dutch, section by section.

### For IMPROVING existing page:

```text
Use GLOBAL_SEO_CONTENT_RULES.md and the page brief as source of truth.
Task: improve the existing page content based on the gap analysis and approved outline.

Edit section by section. For each section:
- Show what changes and why (brief justification)
- Preserve existing good content — do not rewrite what works
- Fix identified gaps, weak claims, and cannibalization risks

Constraints:
- Native-sounding professional Dutch (not translated AI text)
- No fluff, no keyword stuffing
- No fabricated claims/prices/guarantees
- Flag uncertainty: [UNCERTAIN_TERM], [CLAIM_NEEDS_CONFIRMATION], [CHECK_LOCAL_WORDING], [MISSING_BUSINESS_INPUT]
- Respect existing component structure (do not restructure page.tsx architecture)
- Edit content in lib/content/*.ts when content lives there, inline in page.tsx when inline

After all sections, provide:
- Meta title (3 variants, ≤60 chars)
- Meta description (3 variants, ≤160 chars)
```

### For CREATING new page:

```text
Use GLOBAL_SEO_CONTENT_RULES.md and the page brief as source of truth.
Task: create new page content based on the approved outline.

Write section by section in this order (skip sections marked irrelevant in the brief):
1) Hero / intro (H1 + lead paragraph + trust bullets)
2) What is this service / when is it needed
3) Werkwijze (process steps)
4) Options / materials / finishes (if relevant)
5) Pricing factors (no fabricated pricing — use ranges with context)
6) Why BM Klus BV (proof-based only: projects, reviews, certifications)
7) FAQ (Dutch, relevant to page intent)
8) CTA (offerte / contact / WhatsApp)

Constraints:
- Native-sounding professional Dutch
- No fluff, no keyword stuffing
- No fabricated claims/prices/guarantees
- Flag uncertainty with tags from GLOBAL_SEO_CONTENT_RULES.md §7
- Follow the content file pattern from existing pages (see lib/content/*.ts for structure)

After all sections, provide:
- Meta title (3 variants, ≤60 chars)
- Meta description (3 variants, ≤160 chars)
- Suggested FAQ (NL)
```

---

## Step 3 — QA + Finalize

> Mandatory. Run as a separate prompt after content is written.

```text
Act as an independent Dutch SEO editor and QA auditor (NOT the original author).
Use GLOBAL_SEO_CONTENT_RULES.md and the page brief as source of truth.

Score (0–100) and report issues for:
1) SEO alignment — intent match, keyword coverage, heading structure
2) Dutch naturalness — professional tone, no AI-sounding phrases, correct terminology (see GLOBAL rules §5)
3) Factual safety — no fabricated claims, all uncertainty flagged
4) Conversion clarity — CTA present, next step obvious, commercial intent appropriate for page type
5) Cannibalization risk — vs siblingPages in the brief
6) On-page constraints — title ≤60, description ≤160, slug ≤75, heading hierarchy

Then provide:
A. Score table (all 6 categories)
B. Exact issues found (quote weak sentences)
C. Corrected versions (NL)
D. Risk summary
E. Final recommendation: PASS | PASS WITH FIXES | FAIL

If PASS WITH FIXES:
- Apply the fixes directly and return the final corrected content
- Return final meta title (best option) and meta description (best option)
- Return short change summary

If FAIL:
- List blocking issues
- Recommend which sections need rewriting
```

---

## One-shot wrapper (optional — for simple pages or minor edits)

> Use only when context is clean and the task is straightforward.
> Preferred workflow is Step 1 → Step 2 → Step 3.

```text
Use GLOBAL_SEO_CONTENT_RULES.md and the page brief as source of truth.
Complete this workflow in order, labeling each stage:

1) Gap analysis + outline (no writing)
2) Content edits/creation in Dutch (by section)
3) Independent QA audit + final corrections

Constraints:
- Dutch only for page copy
- No fabricated facts/claims
- No keyword stuffing
- Respect page role, avoid cannibalization vs siblingPages in brief
- Preserve existing internal linking architecture
- Flag uncertainty instead of inventing facts
- Report QA scores + risks at the end
```

---

## Quick reference: which files to edit

| Content source | Edit in | Pages |
|---------------|---------|-------|
| `lib/content/gevelisolatie.ts` | Content file | `/gevelisolatie/` |
| `lib/content/gevelisolatie-locations.ts` | Content file | `/gevelisolatie/[location]/` (21 cities) |
| `lib/content/gevel-schilderen.ts` | Content file | `/gevel-schilderen/` |
| `lib/content/buiten-stucwerk.ts` | Content file | `/buiten-stucwerk/` |
| `lib/content/sierpleister.ts` | Content file | `/sierpleister/` |
| `lib/content/muren-stucen.ts` | Content file | `/muren-stucen/` |
| `lib/content/projects.ts` | Content file | `/onze-werken/` |
| Inline in `page.tsx` | Page file directly | `/diensten/`, `/contact/`, `/over-ons/`, `/gevelisolatie/kosten/`, `/gevelisolatie/afwerkingen/`, `/gevelisolatie/materialen/`, `/gevelisolatie/rc-waarde-dikte/`, `/gevelisolatie/subsidie-vergunning/`, `/privacybeleid/` |
| `data/sitemap-plan.ts` | Route config | All pages (title, description, priority) |




