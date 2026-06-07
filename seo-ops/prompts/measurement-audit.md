# Measurement Audit Prompt

**When to use:** When the question is about measurement quality, not page/SEO performance.

---

## Trigger phrases

- "Can we trust the measurement on this page?"
- "Is this a tracking problem or a weak page?"
- "Why do GSC and GA4 show different numbers?"
- "Is the conversion data reliable for this page?"
- "Do we have enough data to draw conclusions?"
- "Можно ли доверять этим данным?"
- "Это проблема измерения или проблема страницы?"
- "Почему в GSC и GA4 разная картина?"

---

## Quick decision

| Situation | Use measurement audit? |
|-----------|----------------------|
| "Is this page performing well in SEO?" | No → use page_audit_v1 |
| "Can we trust the numbers for this page?" | **Yes** |
| "Why isn't this page indexed?" | No → use indexation_debug_v1 |
| "Is the GA4 data reliable enough to make decisions?" | **Yes** |
| "There's a mismatch between GSC and GA4" | **Yes** |
| "Are conversions being tracked correctly?" | **Yes** (but scope = measurement evidence, not GTM config) |

---

## How to run

### Site-wide measurement check
```bash
python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope site
```

### Single page measurement check
```bash
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope page --page /gevelisolatie/
```

### Multiple pages from file
```bash
python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope pages --pages-file urls.txt
```

---

## What the audit answers

1. Is there sufficient measurement evidence for this scope?
2. Are there suspicious gaps between GSC visibility and GA4 landing data?
3. Could missing/weak GA4 evidence reflect measurement limitations rather than weak performance?
4. Is conversion interpretation too weak due to low volume?
5. Are there page-level blind spots in measurement coverage?

## What the audit does NOT answer

- Whether the page is "good" or "bad" at SEO
- Whether tracking code should be changed
- Whether GTM configuration is correct
- What the actual conversion rate is
- Why a specific user did or didn't convert

---

## Key caveats

- This is an artifact-based audit — it reads existing snapshots, not live data
- It cannot diagnose GTM/tag-level issues
- Low volume is expected for a young, low-traffic site — not automatically a problem
- Post-cutover period limits baseline comparisons

---

## Contract

All outputs governed by `contracts/measurement_audit_rules_v1.md`.
