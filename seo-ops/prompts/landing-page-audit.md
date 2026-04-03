# Landing Page Audit

## Purpose
Audit priority landing pages by combining GSC visibility data with GA4 engagement and conversion signals. Identify per-page issues and produce actionable recommendations with confidence levels.

## Required inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_28d.csv`
- `seo-ops/data/raw/ga4/YYYY-MM-DD_ga4_landing_pages_28d.csv`

## Optional inputs
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_pages_90d.csv`
- `seo-ops/data/raw/gsc/YYYY-MM-DD_gsc_queries_28d.csv` (to understand which queries drive each page)
- `seo-ops/data/raw/ga4/YYYY-MM-DD_ga4_events_28d.csv` (key events by landing page)
- `seo-ops/config/priority-pages.yaml`

## Priority pages to audit

### Always audit
- `/` (homepage)
- `/gevelisolatie/` (money page, cluster parent)
- `/contact/` (conversion endpoint)

### Core pages
- `/diensten/`
- `/onze-werken/`
- `/over-ons/`

### Money pages
- `/gevel-schilderen/`
- `/buiten-stucwerk/`
- `/sierpleister/`
- `/muren-stucen/`

### Gevelisolatie cluster
- `/gevelisolatie/kosten/`
- `/gevelisolatie/afwerkingen/`
- `/gevelisolatie/materialen/`
- `/gevelisolatie/rc-waarde-dikte/`
- `/gevelisolatie/subsidie-vergunning/`

## Method

1. **For each priority page, collect:**
   - GSC: clicks, impressions, CTR, average position (28d; 90d if available).
   - GA4: sessions, engaged sessions, engagement rate, key events (Contact_Form_Site, Phone, Whatsapp).

2. **Classify page role:**
   - Awareness (informational, cluster support).
   - Consideration (comparison, cost, materials).
   - Conversion (contact, quote).
   - Trust (portfolio, about).

3. **Detect patterns:**
   - Traffic but weak conversions → possible CTA/CRO issue.
   - Visibility but weak CTR → possible title/meta description mismatch.
   - Engagement but no lead signal → possible intent mismatch or missing conversion path.
   - Low visibility for a strategic page → possible SEO gap.
   - Queries landing on wrong page → possible cannibalization or internal linking issue.

4. **For each finding, assign:**
   - Confidence level: **low** / **medium** / **high**.
   - Low = insufficient data or page is too new; medium = pattern visible but needs confirmation; high = clear signal.

5. **Categorise recommended action:**
   - Metadata (title, description).
   - On-page content (headings, body, structure).
   - CTA (placement, copy, prominence).
   - Internal linking (hub-spoke, cross-links).
   - Conversion path (form visibility, friction).
   - Measurement check (tracking gap, event not firing).

## Preferred output sections

For each audited page:

1. **Page** — URL and assigned role.
2. **Current signals** — table with GSC + GA4 metrics.
3. **Likely issue** — one-line diagnosis.
4. **Evidence** — specific metrics supporting the diagnosis.
5. **Confidence** — low / medium / high.
6. **Recommended action** — specific, with action category tag.

After all pages:

7. **Cross-page patterns** — issues that affect multiple pages (e.g., weak internal linking across the cluster).
8. **Priority action list** — deduplicated, sorted by impact.

## Do not
- Invent metrics not present in the provided exports.
- Judge a page harshly if it has fewer than ~50 clicks in 28 days — note the low volume and reduce confidence.
- Assume conversion failure without checking whether key event tracking is confirmed working on that page.
- Recommend content rewrites without grounding in query/intent data.
- Skip `/gevelisolatie/` cluster pages — they are the strategic priority.
- Produce generic advice like "improve your CTAs" without specifying which page and why.
- If any required input is missing, state: **"Missing data needed:"** and list exactly what is absent.
