# Legacy / Indexation Review v1

**Generated:** 2026-04-07 12:59 UTC
**Scope:** All URLs appearing in page_inventory, GSC (last 90d), or GA4 (last 90d)
**Status:** Recommendation-only — no changes applied

## 1. Executive Summary

- **URLs analyzed:** 75
- **OK (no action):** 53
- **Issues found:** 22
- **GSC impressions on issue URLs:** 2,181
- **GA4 sessions on issue URLs:** 131

**Overall severity: HIGH** — multiple legacy URLs receiving significant impressions/traffic.

**Biggest risk:** `/schoonmaak-na-verbouwing/` — 1,143 GSC impressions on a disabled page receiving traffic URL.

**Top traffic leak:** `(not set)` — 84 GA4 sessions (measurement issue).

**Category breakdown:**

| Category | Count |
|----------|-------|
| likely_old_project_slug | 9 |
| suspicious_slug | 4 |
| possible_redirect_candidate | 4 |
| likely_old_utility_slug | 2 |
| disabled_page_receiving_traffic | 1 |
| legacy_url | 1 |
| measurement_issue | 1 |

## 2. Legacy / Unmapped URL Findings

### Top issue URLs by GSC impressions

| URL | GSC Impr | GSC Clicks | Category | Severity |
|-----|----------|------------|----------|----------|
| `/schoonmaak-na-verbouwing/` | 1,143 | 0 | disabled_page_receiving_traffic | high |
| `/gevelisolatie-woning-almere-35m2-sierpleister/` | 828 | 0 | likely_old_project_slug | high |
| `/over_ons/` | 152 | 1 | possible_redirect_candidate | high |
| `/muren-stucen-2/` | 32 | 0 | possible_redirect_candidate | medium |
| `/vlaardingen-gevelisolatie-6cm-sierpleister-15mm/` | 18 | 0 | likely_old_project_slug | medium |
| `/object7/` | 3 | 0 | likely_old_project_slug | low |
| `/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` | 1 | 0 | likely_old_project_slug | medium |
| `/images/muren-stucen-voordelen.webp` | 1 | 0 | likely_old_utility_slug | low |
| `/images/projects/halsteren-buitenstucwerk-na-01.webp` | 1 | 0 | likely_old_utility_slug | low |
| `/object6/` | 1 | 0 | likely_old_project_slug | low |
| `/wp-content/uploads/2025/10/stuc-gladde-strakke-afwerking.jpg` | 1 | 0 | legacy_url | low |

### Top issue URLs by GA4 sessions

| URL | Sessions | Engaged | Key Events | Category |
|-----|----------|---------|------------|----------|
| `(not set)` | 84 | 1 | 0 | measurement_issue |
| `/✅️/` | 10 | 4 | 0 | suspicious_slug |
| `/object13/` | 6 | 2 | 0 | likely_old_project_slug |
| `/object9/` | 6 | 3 | 0 | likely_old_project_slug |
| `/over_ons/` | 6 | 3 | 0 | possible_redirect_candidate |
| `/buitenstucwerk-woning-halsteren-sierpleister-schilderwerk-2025/` | 5 | 3 | 0 | likely_old_project_slug |
| `/schoonmaak-na-verbouwing/` | 3 | 3 | 0 | disabled_page_receiving_traffic |
| `/muren-stucen-2/` | 2 | 1 | 0 | possible_redirect_candidate |
| `/✅️👍/` | 2 | 1 | 0 | suspicious_slug |
| `//onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` | 1 | 1 | 0 | suspicious_slug |
| `/gevelisolatie-woning-klaaswaal-6cm-sierpleister/` | 1 | 1 | 0 | likely_old_project_slug |
| `/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` | 1 | 0 | 0 | likely_old_project_slug |
| `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2024/` | 1 | 1 | 0 | possible_redirect_candidate |
| `/onze-werken/nieuw-/` | 1 | 1 | 1 | suspicious_slug |
| `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2024/` | 1 | 1 | 0 | possible_redirect_candidate |

### URLs in both GSC and GA4 but absent from page_inventory

These are the strongest legacy/orphan signals — pages that are both indexed and receiving real visits.

| URL | GSC Impr | GA4 Sessions | Category |
|-----|----------|--------------|----------|
| `/over_ons/` | 152 | 6 | possible_redirect_candidate |
| `/muren-stucen-2/` | 32 | 2 | possible_redirect_candidate |
| `/vlaardingen-gevelisolatie-6cm-sierpleister-15mm/` | 18 | 1 | likely_old_project_slug |
| `/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` | 1 | 1 | likely_old_project_slug |

### Disabled pages still receiving traffic

| URL | is_indexable | GSC Impr | GA4 Sessions | Page Type |
|-----|-------------|----------|--------------|-----------|
| `/schoonmaak-na-verbouwing/` | False | 1,143 | 3 | service |

## 3. Recommended Action Buckets

### Review for 301 redirect

- `/over_ons/` — Underscore slug variant; 152 GSC impressions, 6 GA4 sessions; current equivalent: /over-ons/
- `/muren-stucen-2/` — Numbered duplicate slug; 32 GSC impr, 2 GA4 sessions; target: /muren-stucen/
- `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2024/` — Old year variant; newer version exists at /onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/; 1 GA4 sessions
- `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2024/` — Old year variant; newer version exists at /onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/; 1 GA4 sessions

### Review for noindex / deindex cleanup

- `/schoonmaak-na-verbouwing/` — Page exists in inventory but is_indexable=False; still gets 1143 GSC impressions + 3 GA4 sessions

### Legacy project slugs — review for redirect or removal

- `/gevelisolatie-woning-almere-35m2-sierpleister/` — Root-level project slug (should be under /onze-werken/); 828 GSC impressions, 0 GA4 sessions; likely target: /onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/
- `/vlaardingen-gevelisolatie-6cm-sierpleister-15mm/` — Root-level project slug (should be under /onze-werken/); 18 GSC impressions, 1 GA4 sessions; likely target: /onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/
- `/object13/` — Old object slug pattern; 6 GA4 sessions
- `/object9/` — Old object slug pattern; 6 GA4 sessions
- `/buitenstucwerk-woning-halsteren-sierpleister-schilderwerk-2025/` — Root-level project slug (should be under /onze-werken/); 0 GSC impressions, 5 GA4 sessions; likely target: /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/
- `/object7/` — Old object slug pattern; 0 GA4 sessions
- `/gevelisolatie-woning-vlaardingen-10cm-sierpleister/` — Root-level project slug (should be under /onze-werken/); 1 GSC impressions, 1 GA4 sessions; likely target: /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/
- `/gevelisolatie-woning-klaaswaal-6cm-sierpleister/` — Root-level project slug (should be under /onze-werken/); 0 GSC impressions, 1 GA4 sessions; likely target: /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/
- `/object6/` — Old object slug pattern; 0 GA4 sessions

### Monitor only (no immediate action)

- `//onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` — Double-slash URL; likely should be /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/
- `/images/muren-stucen-voordelen.webp` — Image file URL in GSC index; not a page
- `/images/projects/halsteren-buitenstucwerk-na-01.webp` — Image file URL in GSC index; not a page
- `/onze-werken/nieuw-/` — Truncated project URL; 1 GA4 sessions
- `/✅️/` — Emoji characters in URL; 10 GA4 sessions, likely not real user traffic
- `/✅️👍/` — Emoji characters in URL; 2 GA4 sessions, likely not real user traffic
- `(not set)` — GA4 (not set) — 84 sessions with almost no engagement; likely bot or misconfigured tracking

## 4. Priority Recommendations

### Do now (4)

**`/schoonmaak-na-verbouwing/`**
- Category: disabled_page_receiving_traffic
- Rationale: Page exists in inventory but is_indexable=False; still gets 1143 GSC impressions + 3 GA4 sessions
- Action: Review noindex/canonical status; if page is intentionally disabled, ensure proper noindex tag or 301 redirect to parent
- Confidence: high
- Risk if ignored: High

**`/gevelisolatie-woning-almere-35m2-sierpleister/`**
- Category: likely_old_project_slug
- Rationale: Root-level project slug (should be under /onze-werken/); 828 GSC impressions, 0 GA4 sessions; likely target: /onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/
- Action: 301 redirect to /onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/
- Confidence: medium
- Risk if ignored: High

**`/over_ons/`**
- Category: possible_redirect_candidate
- Rationale: Underscore slug variant; 152 GSC impressions, 6 GA4 sessions; current equivalent: /over-ons/
- Action: 301 redirect to /over-ons/
- Confidence: high
- Risk if ignored: High

**`/muren-stucen-2/`**
- Category: possible_redirect_candidate
- Rationale: Numbered duplicate slug; 32 GSC impr, 2 GA4 sessions; target: /muren-stucen/
- Action: 301 redirect to /muren-stucen/
- Confidence: high
- Risk if ignored: Medium

### Monitor (8)

**`(not set)`**
- Category: measurement_issue
- Rationale: GA4 (not set) — 84 sessions with almost no engagement; likely bot or misconfigured tracking
- Action: Investigate GA4 (not set) landing pages — likely missing page_location or referrer
- Confidence: high
- Risk if ignored: Medium

**`/vlaardingen-gevelisolatie-6cm-sierpleister-15mm/`**
- Category: likely_old_project_slug
- Rationale: Root-level project slug (should be under /onze-werken/); 18 GSC impressions, 1 GA4 sessions; likely target: /onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/
- Action: 301 redirect to /onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/
- Confidence: medium
- Risk if ignored: Medium

**`/✅️/`**
- Category: suspicious_slug
- Rationale: Emoji characters in URL; 10 GA4 sessions, likely not real user traffic
- Action: Investigate source of emoji URLs; likely bot/spam traffic — monitor only
- Confidence: medium
- Risk if ignored: Low

**`/object13/`**
- Category: likely_old_project_slug
- Rationale: Old object slug pattern; 6 GA4 sessions
- Action: Review if these are legacy project stubs; redirect to /onze-werken/ if so
- Confidence: medium
- Risk if ignored: Low

**`/object9/`**
- Category: likely_old_project_slug
- Rationale: Old object slug pattern; 6 GA4 sessions
- Action: Review if these are legacy project stubs; redirect to /onze-werken/ if so
- Confidence: medium
- Risk if ignored: Low

**`/buitenstucwerk-woning-halsteren-sierpleister-schilderwerk-2025/`**
- Category: likely_old_project_slug
- Rationale: Root-level project slug (should be under /onze-werken/); 0 GSC impressions, 5 GA4 sessions; likely target: /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/
- Action: 301 redirect to /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/
- Confidence: medium
- Risk if ignored: Medium

**`/gevelisolatie-woning-vlaardingen-10cm-sierpleister/`**
- Category: likely_old_project_slug
- Rationale: Root-level project slug (should be under /onze-werken/); 1 GSC impressions, 1 GA4 sessions; likely target: /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/
- Action: 301 redirect to /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/
- Confidence: medium
- Risk if ignored: Medium

**`/gevelisolatie-woning-klaaswaal-6cm-sierpleister/`**
- Category: likely_old_project_slug
- Rationale: Root-level project slug (should be under /onze-werken/); 0 GSC impressions, 1 GA4 sessions; likely target: /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/
- Action: 301 redirect to /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/
- Confidence: medium
- Risk if ignored: Medium

### Do later (10)

**`/object7/`**
- Category: likely_old_project_slug
- Rationale: Old object slug pattern; 0 GA4 sessions
- Action: Review if these are legacy project stubs; redirect to /onze-werken/ if so
- Confidence: medium
- Risk if ignored: Low

**`/✅️👍/`**
- Category: suspicious_slug
- Rationale: Emoji characters in URL; 2 GA4 sessions, likely not real user traffic
- Action: Investigate source of emoji URLs; likely bot/spam traffic — monitor only
- Confidence: medium
- Risk if ignored: Low

**`//onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/`**
- Category: suspicious_slug
- Rationale: Double-slash URL; likely should be /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/
- Action: Check server/CDN config for double-slash URL normalization
- Confidence: medium
- Risk if ignored: Low

**`/images/muren-stucen-voordelen.webp`**
- Category: likely_old_utility_slug
- Rationale: Image file URL in GSC index; not a page
- Action: No action needed unless images are showing in web search results
- Confidence: high
- Risk if ignored: Low

**`/images/projects/halsteren-buitenstucwerk-na-01.webp`**
- Category: likely_old_utility_slug
- Rationale: Image file URL in GSC index; not a page
- Action: No action needed unless images are showing in web search results
- Confidence: high
- Risk if ignored: Low

**`/object6/`**
- Category: likely_old_project_slug
- Rationale: Old object slug pattern; 0 GA4 sessions
- Action: Review if these are legacy project stubs; redirect to /onze-werken/ if so
- Confidence: medium
- Risk if ignored: Low

**`/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2024/`**
- Category: possible_redirect_candidate
- Rationale: Old year variant; newer version exists at /onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/; 1 GA4 sessions
- Action: 301 redirect to updated version: /onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/
- Confidence: medium
- Risk if ignored: Low

**`/onze-werken/nieuw-/`**
- Category: suspicious_slug
- Rationale: Truncated project URL; 1 GA4 sessions
- Action: Investigate truncated URL; likely a partial/broken link
- Confidence: medium
- Risk if ignored: Low

**`/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2024/`**
- Category: possible_redirect_candidate
- Rationale: Old year variant; newer version exists at /onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/; 1 GA4 sessions
- Action: 301 redirect to updated version: /onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/
- Confidence: medium
- Risk if ignored: Low

**`/wp-content/uploads/2025/10/stuc-gladde-strakke-afwerking.jpg`**
- Category: legacy_url
- Rationale: WordPress legacy wp-content path; 1 GSC impression, harmless
- Action: Ignore if site is no longer WordPress; will naturally drop from index
- Confidence: high
- Risk if ignored: Low

## 5. Cautions

- **Do not delete pages** solely based on low impression/session counts — some pages may be new or seasonal.
- **Old project slugs at root level** may have external backlinks. Check backlink data before redirecting.
- **Emoji URLs** are almost certainly not real user traffic — do not waste time investigating deeply.
- **Disabled pages** (is_indexable=False) may be intentionally disabled for business reasons; verify before changing.
- **(not set) GA4 entries** are a measurement concern, not a page concern — investigate GA4 tag config, not page structure.
- **Year variants** of project pages (e.g. 2024 vs 2025) should only be redirected if the old year page is truly removed; sometimes both are valid portfolio entries.
- **Confidence ratings are conservative** — 'low' means the signal exists but manual verification is needed before acting.
- This review uses GSC/GA4 data from the last 90 days. URLs not seen in this window may still exist in the index.
