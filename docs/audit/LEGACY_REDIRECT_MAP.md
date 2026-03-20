# Legacy Redirect Map — Analysis Only

> **Date:** 2026-03-20
> **Purpose:** Inventory of all legacy URL redirects. Analysis artifact — no code changes.
> **Sources:** `deploy/apache/root.htaccess` (implemented), `PROJECT-STATUS.md` (planning doc)
> **Implementation:** Already live in `deploy/apache/root.htaccess` (Apache, deployed via GitHub Actions)

---

## Summary

| Category | Count |
|----------|-------|
| Total redirect rules in root.htaccess | **48** |
| Confirmed (redirect + target verified) | **47** |
| Needs review (redirect rule) | **1** |
| Separate: verification tasks (not redirect rules) | 4 (see needs-review table items #2, #4, #5, #6) |

---

## 1. Changed URLs (3 rules) — CONFIRMED

| Old URL | New URL | Page type | Priority | Status |
|---------|---------|-----------|----------|--------|
| `/over_ons/` | `/over-ons/` | About | high | Confirmed — page exists |
| `/muren-stucen-2/` | `/muren-stucen/` | Money page | high | Confirmed — page exists |
| `/buitenstucwerk-woning-halsteren-sierpleister-schilderwerk-2025/` | `/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` | Project | high | Confirmed — page exists |

---

## 2. Old WP project pages → new slugs (11 rules) — CONFIRMED

All 11 target pages verified against `app/onze-werken/*/page.tsx`.

| Old URL | New URL | Priority | Status |
|---------|---------|----------|--------|
| `/gevelisolatie-woning-rottekade-10cm-schilderwerk-2024/` | `/onze-werken/rottekade-gevelisolatie-schilderwerk-2024/` | high | Confirmed |
| `/vlaardingen-gevelisolatie-6cm-sierpleister-15mm/` | `/onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/` | high | Confirmed |
| `/gevelisolatie-vrijstaande-woning-nieuw-beijerland-zuidzijdsedijk/` | `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/` | high | Confirmed |
| `/gevelisolatie-woning-bruinisse-6cm-sierpleister/` | `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/` | high | Confirmed |
| `/gevelisolatie-woning-dordrecht-10cm-sierpleister/` | `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/` | high | Confirmed |
| `/gevelisolatie-woning-klaaswaal-6cm-sierpleister/` | `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/` | high | Confirmed |
| `/buitenstucwerk-woning-rotterdam-cementpleister/` | `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/` | high | Confirmed |
| `/gevelisolatie-woning-almere-35m2-sierpleister/` | `/onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/` | high | Confirmed |
| `/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` | `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/` | high | Confirmed |
| `/vught-gevelisolatie-10cm-sierpleister/` | `/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/` | high | Confirmed |
| `/gevelisolatie-woning-katwijk-6cm-sierpleister/` | `/onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/` | high | Confirmed |

**Note:** Slug format differs from PROJECT-STATUS.md planning doc in several cases (year suffixes added, slug wording adjusted). root.htaccess is authoritative — it matches actual deployed pages.

---

## 3. Year correction redirects (6 rules) — CONFIRMED

These handle cases where project slugs were initially created with wrong year, then corrected.

| Old URL | New URL | Priority | Status |
|---------|---------|----------|--------|
| `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2024/` | `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2024/` | `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2024/` | `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2024/` | `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2024/` | `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/` | medium | Confirmed |
| `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2024/` | `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/` | medium | Confirmed |

---

## 4. GSC crawl artifact redirects (8 rules) — CONFIRMED

Old /onze-werken/ slugs that Google crawled before slug normalization.

| Old URL | New URL | Priority | Status |
|---------|---------|----------|--------|
| `/onze-werken/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` | `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/gevelisolatie-woning-klaaswaal-6cm-sierpleister/` | `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/gevelisolatie-woning-katwijk-6cm-sierpleister/` | `/onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/` | medium | Confirmed |
| `/onze-werken/buitenstucwerk-woning-rotterdam-cementpleister/` | `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/` | medium | Confirmed |
| `/onze-werken/gevelisolatie-woning-almere-35m2-sierpleister/` | `/onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/` | medium | Confirmed |
| `/onze-werken/vught-gevelisolatie-10cm-sierpleister/` | `/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/` | medium | Confirmed |
| `/onze-werken/gevelisolatie-woning-dordrecht-10cm-sierpleister/` | `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/` | medium | Confirmed |
| `/onze-werken/gevelisolatie-woning-bruinisse-6cm-sierpleister/` | `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/` | medium | Confirmed |

---

## 5. Disabled future page (1 rule) — NEEDS REVIEW

| Old URL | New URL | Priority | Note |
|---------|---------|----------|------|
| `/onze-werken/gevelisolatie/` | `/onze-werken/` | low | Needs review: unclear origin. Not a WP legacy page; possibly a stray GSC artifact or test path. Currently redirects to portfolio hub. Leave as is unless causing issues. |

---

## 6. Old /object* pages (18 rules) — CONFIRMED

All redirect to `/onze-werken/` (portfolio hub). Image-only pages from old WP site, no text content.

| Old URL | New URL | Priority | Status |
|---------|---------|----------|--------|
| `/object1/` through `/object15/` | `/onze-werken/` | low | Confirmed (15 rules) |
| `/object17/` | `/onze-werken/` | low | Confirmed |
| `/object20/` | `/onze-werken/` | low | Confirmed |
| `/object21/` | `/onze-werken/` | low | Confirmed |

**Note:** All 18 `/object*` URLs are confirmed intentional legacy pages from the old WordPress site. PROJECT-STATUS.md lists 15 (object1–15); root.htaccess includes 3 additional (object17, object20, object21) that were also present on the old site. Gaps in numbering (no object16, 18, 19) — those pages did not exist on the old site; the current set is complete.

---

## 7. Removed service (1 rule) — CONFIRMED

| Old URL | New URL | Priority | Status |
|---------|---------|----------|--------|
| `/schoonmaak-na-verbouwing/` | `/diensten/` | medium | Confirmed — service disabled in sitemap-plan.ts, redirect to services hub |

---

## 8. Attack path blocks (4 rules, 410 Gone) — CONFIRMED

Not redirects, but relevant to crawl hygiene. Already in root.htaccess.

| Path | Response | Note |
|------|----------|------|
| `/xmlrpc.php` | 410 Gone | WordPress attack vector |
| `/main-sitemap.xsl` | 410 Gone | Rank Math artifact |
| `/page-sitemap.xml` | 410 Gone | Rank Math artifact |
| `/locations.kml` | 410 Gone | Stray legacy file found by GSC |

---

## Needs-review items

| # | Item | Why | Suggested action |
|---|------|-----|------------------|
| 1 | `/onze-werken/gevelisolatie/` → `/onze-werken/` | Unclear origin — not a WP page, not in PROJECT-STATUS | Verify in GSC if this URL was ever crawled. If no impressions/clicks, can remove rule |
| 2 | PROJECT-STATUS.md target slugs outdated | Several planned targets in PROJECT-STATUS don't match actual deployed slugs | Update PROJECT-STATUS.md in next housekeeping pass (out of scope for this task) |
| ~~3~~ | ~~`/object16/`, `/object18/`, `/object19/`~~ | ~~Not in htaccess~~ | **Resolved:** confirmed these pages never existed on the old WP site. Current /object* set (18 rules) is complete. |
| 4 | Canonical host redirect: www→non-www | Implemented in root.htaccess (lines 24-29) | Verify live behavior: visit `http://www.bm-klus-bv.nl` and confirm single 301 to `https://bm-klus-bv.nl` |
| 5 | HTTPS enforcement | Implemented in root.htaccess (lines 28-29) | Verify live: `http://bm-klus-bv.nl` → 301 → `https://bm-klus-bv.nl` |
| 6 | WP paths (wp-admin, wp-content, etc.) | Currently NOT blocked — WordPress still active for admin/API | Block after WordPress is fully decommissioned (noted in root.htaccess comment, line 111-113) |

---

## Discrepancies: PROJECT-STATUS.md vs root.htaccess

PROJECT-STATUS.md is a planning document from 2026-03-02. root.htaccess is the deployed implementation. Key differences:

| Area | PROJECT-STATUS.md | root.htaccess (deployed) |
|------|-------------------|--------------------------|
| Total redirect rules | 30 planned | 48 implemented |
| /object* pages | 15 (object1–15) | 18 (adds object17, 20, 21 — confirmed intentional legacy URLs) |
| Project page slugs | Planning-stage names | Final deployed slugs (years added, some wording changed) |
| Year corrections | Not mentioned | 6 rules for 2024→2025 corrections |
| GSC crawl artifacts | Not mentioned | 8 rules for old /onze-werken/ slug variants |
| /onze-werken/gevelisolatie/ | Not mentioned | 1 rule redirecting to /onze-werken/ |

**Recommendation:** PROJECT-STATUS.md redirect section is now significantly outdated. root.htaccess is the SSoT for redirects. A future housekeeping pass should either update PROJECT-STATUS.md or add a cross-reference note pointing to this document.
