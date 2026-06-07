# Output Contracts V1 — BM klus BV Search Analysis System

This document defines the structure of analysis outputs. All outputs are
JSON objects written to `reports/` or `outputs/`. Claude reads these contracts
when generating reports.

---

## 1. PPC Review

**Output path:** `reports/ppc/ppc_review_{date}.json`

```json
{
  "report_type": "ppc_review",
  "generated_at": "ISO-8601",
  "period": {
    "start": "YYYY-MM-DD",
    "end": "YYYY-MM-DD",
    "comparison_start": "YYYY-MM-DD",
    "comparison_end": "YYYY-MM-DD"
  },
  "summary": {
    "total_cost": 0.00,
    "total_conversions": 0,
    "cost_per_conversion": 0.00,
    "total_clicks": 0,
    "total_impressions": 0,
    "avg_cpc": 0.00,
    "change_vs_previous": {}
  },
  "campaigns": [
    {
      "name": "",
      "status": "ENABLED|PAUSED",
      "cost": 0.00,
      "conversions": 0,
      "clicks": 0,
      "impressions": 0,
      "ctr": 0.00,
      "avg_cpc": 0.00,
      "recommendation": "",
      "confidence": "low|medium|high"
    }
  ],
  "search_terms": {
    "waste": [
      {
        "term": "",
        "cost": 0.00,
        "conversions": 0,
        "action": "negative_keyword|review",
        "confidence": "low|medium|high"
      }
    ],
    "opportunities": [
      {
        "term": "",
        "impressions": 0,
        "ctr": 0.00,
        "action": "add_as_keyword|increase_bid",
        "confidence": "low|medium|high"
      }
    ]
  },
  "keyword_performance": [
    {
      "keyword": "",
      "match_type": "EXACT|PHRASE|BROAD",
      "quality_score": 0,
      "cost": 0.00,
      "conversions": 0,
      "recommendation": "",
      "confidence": "low|medium|high"
    }
  ],
  "actions": [
    {
      "priority": "high|medium|low",
      "category": "budget|bidding|keywords|negatives|ad_copy",
      "description": "",
      "expected_impact": "",
      "confidence": "low|medium|high"
    }
  ]
}
```

---

## 2. SEO Review

**Output path:** `reports/seo/seo_review_{date}.json`

```json
{
  "report_type": "seo_review",
  "generated_at": "ISO-8601",
  "period": {
    "start": "YYYY-MM-DD",
    "end": "YYYY-MM-DD"
  },
  "summary": {
    "total_clicks": 0,
    "total_impressions": 0,
    "avg_position": 0.0,
    "avg_ctr": 0.00,
    "indexed_pages": 0,
    "change_vs_previous": {}
  },
  "opportunities": {
    "striking_distance": [
      {
        "page": "",
        "query": "",
        "position": 0.0,
        "impressions": 0,
        "ctr": 0.00,
        "action": "optimize_content|improve_title|add_internal_links",
        "confidence": "low|medium|high"
      }
    ],
    "ctr_gaps": [
      {
        "page": "",
        "query": "",
        "position": 0.0,
        "expected_ctr": 0.00,
        "actual_ctr": 0.00,
        "action": "",
        "confidence": "low|medium|high"
      }
    ],
    "momentum": [
      {
        "page": "",
        "click_change_pct": 0.0,
        "impression_change_pct": 0.0,
        "action": "",
        "confidence": "low|medium|high"
      }
    ]
  },
  "risks": {
    "declining_pages": [
      {
        "page": "",
        "click_change_pct": 0.0,
        "impression_change_pct": 0.0,
        "possible_cause": "",
        "action": "",
        "confidence": "low|medium|high"
      }
    ]
  },
  "cluster_gevelisolatie": {
    "pages": [],
    "findings": [],
    "actions": []
  },
  "actions": [
    {
      "priority": "high|medium|low",
      "category": "content|technical|linking|metadata",
      "description": "",
      "expected_impact": "",
      "confidence": "low|medium|high"
    }
  ]
}
```

---

## 3. Keyword Intelligence Review

**Output path:** `reports/keywords/keyword_review_{date}.json`

```json
{
  "report_type": "keyword_intelligence",
  "generated_at": "ISO-8601",
  "scope": "full|cluster|single_page",
  "keywords_analyzed": 0,
  "clusters": [
    {
      "name": "",
      "primary_keyword": "",
      "keywords": [
        {
          "keyword": "",
          "source": "gsc|ads|dataforseo|manual",
          "volume": 0,
          "cpc": 0.00,
          "position": 0.0,
          "intent": "informational|commercial|transactional|navigational",
          "assigned_page": "",
          "cannibalization_flag": false
        }
      ],
      "gap_keywords": [],
      "recommendations": []
    }
  ],
  "cannibalization": [
    {
      "keyword": "",
      "competing_pages": [],
      "recommended_primary": "",
      "action": "",
      "confidence": "low|medium|high"
    }
  ],
  "expansion_ideas": [
    {
      "keyword": "",
      "source": "ads_search_terms|keyword_planner|dataforseo",
      "volume": 0,
      "relevance": "high|medium|low",
      "suggested_page": "",
      "action": "new_page|add_to_existing|target_in_ads"
    }
  ],
  "actions": [
    {
      "priority": "high|medium|low",
      "category": "targeting|content|cannibalization|expansion",
      "description": "",
      "confidence": "low|medium|high"
    }
  ]
}
```

---

## 4. Page Audit Review

**Output path:** `reports/pages/page_audit_{slug}_{date}.json`

```json
{
  "report_type": "page_audit",
  "generated_at": "ISO-8601",
  "page": {
    "url": "",
    "slug": "",
    "title": "",
    "h1": "",
    "description": "",
    "word_count": 0,
    "last_modified": ""
  },
  "organic_performance": {
    "clicks_28d": 0,
    "impressions_28d": 0,
    "avg_position": 0.0,
    "avg_ctr": 0.00,
    "top_queries": [],
    "change_vs_previous": {}
  },
  "analytics_performance": {
    "sessions_28d": 0,
    "engaged_sessions": 0,
    "engagement_rate": 0.00,
    "conversions": {
      "contact_form": 0,
      "phone": 0,
      "whatsapp": 0
    }
  },
  "ads_performance": {
    "clicks": 0,
    "cost": 0.00,
    "conversions": 0,
    "as_landing_page": true
  },
  "on_page_signals": {
    "title_length": 0,
    "description_length": 0,
    "h1_matches_target": true,
    "has_cta": true,
    "internal_links_in": 0,
    "internal_links_out": 0,
    "schema_types": []
  },
  "findings": [
    {
      "category": "seo|cro|content|technical",
      "severity": "high|medium|low",
      "description": "",
      "evidence": "",
      "confidence": "low|medium|high"
    }
  ],
  "actions": [
    {
      "priority": "high|medium|low",
      "category": "content|metadata|cta|linking|technical",
      "description": "",
      "expected_impact": "",
      "confidence": "low|medium|high"
    }
  ]
}
```

---

## General rules for all contracts

1. **All dates are ISO-8601.**
2. **All confidence levels are `low|medium|high`.**
3. **All actions have a `description` (what to do) and `confidence` (how sure).**
4. **No field should contain auto-generated content for direct publishing.** Reports are for analysis; the user writes the final content.
5. **Empty arrays are preferred over omitting fields** — makes downstream parsing reliable.
6. **`generated_at` must always be present** — data freshness is critical.

---

## Post-cutover report guidance

**Reference:** `seo-ops/config/analysis_context_v1.yaml`

While the system is in `post_cutover_preliminary` mode (site live since 2026-03-08), all analysis reports should account for the following:

### Mandatory context disclosures

Reports should explicitly state when relevant:
- The site is in its post-cutover preliminary period — baselines are not established
- Pre-cutover (before 2026-03-08) data reflects the old WordPress site and should not be treated as new-site performance
- Indexed page count is still growing — SEO coverage conclusions are provisional
- PPC budget is 10 EUR/day — conversion volume is low and statistically insignificant for most conclusions

### Confidence adjustments

- Findings based on <30 days of post-cutover data: confidence capped at `medium`
- PPC recommendations requiring >20 conversions for validity: confidence `low` until volume is sufficient
- SEO position/CTR baselines: treat as provisional, not definitive
- Legacy URL signals: do not count as new-site failures

### Recommendation guardrails

- Do not recommend aggressive budget scaling without explicit user request
- Do not recommend major keyword expansion when budget cannot support it
- Do not recommend content deletions based on low early-stage metrics
- Distinguish structural issues (fixable now) from volume issues (need time)
