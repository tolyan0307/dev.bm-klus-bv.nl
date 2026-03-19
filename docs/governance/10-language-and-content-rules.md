# 10 — Language & Content Rules

> Single source of truth for language and tone rules.
> Applies to all agents and all content work.
> Consolidates: DESIGN_SYSTEM.md §13, GLOBAL_SEO_CONTENT_RULES.md §5, CURSOR_TASK_TEMPLATE.md language policy.
> Those source files are NOT changed — this doc is the canonical reference.

---

## 1. Communication language

| Context | Language |
|---------|----------|
| Chat / responses to project owner | **Russian (RU)** |
| Public site content (all pages, all components) | **Dutch (nl-NL) only** |
| SEO analysis, QA reports, outlines, risk notes | **Russian (RU)** |
| Code comments | English (short, technical) |

**Never generate Russian or English text for public site pages unless explicitly asked.**

---

## 2. Dutch style requirements

- **Audience:** homeowners and property managers in the Netherlands
- **Tone:** duidelijk, betrouwbaar, praktisch, lokaal
- **Register:** professional but accessible — not corporate, not casual
- No translated-sounding phrases ("het is belangrijk om te vermelden dat...")
- Short/medium paragraphs with meaningful subheadings
- No superlatives without verifiable proof ("de beste", "nummer 1 in Rotterdam")

---

## 3. Terminology consistency (use these exact terms)

| Concept | Preferred Dutch | Avoid |
|---------|-----------------|-------|
| Exterior insulation system | buitengevelisolatie, ETICS | "gevelisolatie binnenkant" |
| Exterior stucco | gevel stucen, buitenmuur stucen | — |
| Supporting term | buitenstucwerk | (OK as secondary term) |
| Interior plastering | muren stucen (binnen), binnenmuren stucen, stucwerk binnen | — |
| Decorative plaster | gevel sierpleister, spachtelputz, crepi | — |
| Standard region phrase | "Regio Rotterdam en omgeving (±80–100 km)" | other phrasings |

---

## 4. Energy savings claims (legal requirement)

Energy savings are **always conditional** — never absolute guarantees:

- ✅ "kan leiden tot energiebesparing"
- ✅ "tot X% minder energieverbruik mogelijk"
- ❌ "leidt tot besparing"
- ❌ "bespaart u altijd X%"
- ❌ "gegarandeerde terugverdientijd van X jaar"

This applies to all pages, all media, all claims about ETICS benefits.

---

## 5. Uncertainty flags (mandatory in drafts and QA)

When any information is not confirmed by the owner:

| Flag | When to use |
|------|-------------|
| `[CLAIM_NEEDS_CONFIRMATION]` | Price, timeline, subsidy amount, stat |
| `[UNCERTAIN_TERM]` | Unsure if Dutch phrasing is natural |
| `[CHECK_LOCAL_WORDING]` | Regional Dutch variation may apply |
| `[MISSING_BUSINESS_INPUT]` | Needs info from the business owner |

**Flag uncertainty instead of inventing facts. This is non-negotiable.**

---

## 6. Forbidden content patterns

- Keyword stuffing or unnatural term repetition
- Vague superlatives without verifiable proof
- Absolute guarantees on energy savings or outcomes
- Boilerplate text copy-pasted across pages (location pages, sibling service pages)
- Standalone filler sentences with no informational value ("wij staan klaar voor u", "neem gerust contact op" as the *only* content of a section)
- Any language other than Dutch in public-facing content
- Fabricated: project counts, certifications, awards, guarantees, lead times

---

## 7. Tone patterns to avoid (service page copy)

These specific phrases were identified as problematic and must not appear:

| Avoid | Because |
|-------|---------|
| "Snelle reactie tijdens openingstijden" | Overpromising |
| "altijd" in promises | Absolute guarantee |
| "garanderen" without qualification | Legally risky |
| "binnen X uur" response promises | Overpromising |
| "heldere offerte — zonder verplichtingen" | Weak, generic filler |
