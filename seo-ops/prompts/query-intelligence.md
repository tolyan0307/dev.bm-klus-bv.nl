# Query Intelligence Review — Operator Prompt

**When to use:** When you need to classify queries by intent and commercial role, identify SEO opportunities vs PPC containment candidates, or detect page-query fit mismatches.

**Contract:** `contracts/query_intelligence_rules_v1.md`
**Taxonomy:** `config/mappings/query_intent_taxonomy_v1.yaml`
**Template:** Template 8 (Query Intelligence Review) from `templates/report_templates_v1.md`

---

## Before you start

1. Run preflight check:
   ```bash
   python seo-ops/tools/run_preflight_check.py query_intelligence_review_v1
   ```

2. Choose scope:
   - `site` — full site query landscape review
   - `page` — single page query fit assessment
   - `query-set` — classify a supplied list of queries

3. Check artifact freshness — keyword_master and GSC snapshots should be <7 days old.

---

## Run the analyzer

```bash
# Site-wide review
python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope site

# Single page review
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope page --page /gevelisolatie/

# Custom query set
python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope query-set --queries-file queries.txt

# With 90d window fallback
python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope site --prefer-window 90
```

---

## What to look for in results

1. **core_service_opportunity** — High-value transactional queries. Check if pages exist and rank.
2. **local_service_opportunity** — Geo-qualified queries. Check city page coverage.
3. **comparison_support_opportunity** — Evaluation queries. Check if content supports decision.
4. **page_fit_mismatch** — Queries ranking on wrong page. Investigate redirect or content fix.
5. **paid_negative_or_containment_candidate** — Queries wasting PPC budget. Review for negative keywords.
6. **low_signal_or_unclear** — Ambiguous queries. Do not act without further evidence.

---

## Key rules

- Intent classification is **heuristic** — always caveat
- Do not claim a keyword "will convert"
- Do not claim a page "owns" a query without multi-source evidence
- External enrichment (DataForSEO) is supplementary, not primary truth
- Low-volume queries need a low-volume caveat
- Recommendations must be manual and conservative — no automatic exclusions
- Separate: query evidence → classification → page fit → action recommendation

---

## After the review

1. Validate report: `python seo-ops/tools/validate_report_provenance.py {report}`
2. Cross-check key findings against GSC artifacts if acting on recommendations
3. For PPC changes: use findings as input to manual review, not automatic implementation
