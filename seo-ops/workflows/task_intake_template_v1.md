# Task Intake Template v1

Use this template to define analysis tasks before execution.
Copy the block below and fill in the fields.

---

```yaml
# Task Intake
task_id: ""                         # Short unique ID, e.g. "audit-gevel-2026w15"
date: ""                            # YYYY-MM-DD
requested_by: ""                    # Who is asking

# Objective
objective: ""                       # What do you want to learn or decide?
                                    # Examples:
                                    #   "Understand why /gevelisolatie/ gets impressions but no clicks"
                                    #   "Review PPC spend efficiency for last month"
                                    #   "Find keyword gaps before content update"

# Scope
scope: ""                           # site-wide | single-page | single-campaign | cluster
route: ""                           # If single-page: /route/ (e.g. /gevelisolatie/)
campaign_id: ""                     # If PPC: campaign ID (e.g. 23271040037)
cluster: ""                         # If cluster: cluster name (e.g. gevelisolatie)

# Period
period: "last_90d"                  # last_30d | last_90d | custom
custom_start: ""                    # If custom: YYYY-MM-DD
custom_end: ""                      # If custom: YYYY-MM-DD

# Data freshness
max_data_age_days: 7                # Maximum acceptable age for snapshots
rebuild_if_stale: true              # Auto-rebuild stale sources? (true/false)

# Desired output
output_type: "report"               # report | json | both
output_detail: "standard"           # summary | standard | detailed
sections_wanted: []                 # Leave empty for all, or list specific:
                                    #   [exec_summary, query_fit, recommendations]

# Constraints
constraints:
  - "read-only — no site/ads changes"
  # Add any task-specific constraints:
  # - "focus only on nonbrand queries"
  # - "exclude location pages"
  # - "compare with previous period"

# Context (optional)
context: ""                         # Background info that helps interpret results
                                    # e.g. "We just added 3 new FAQ items to this page"
                                    #      "PPC budget was reduced 20% last week"

# Expected workflow
workflow: ""                        # If known: ppc_review_v1 | seo_page_vs_query_gap_v1 | page_audit_v1
                                    # Leave empty to let the operator decide
```

---

## Example: filled intake

```yaml
task_id: "audit-gevel-2026w15"
date: "2026-04-07"
requested_by: "Anatoliy"

objective: "Understand why /gevelisolatie/ has 2900+ impressions but only 7 clicks"
scope: "single-page"
route: "/gevelisolatie/"
campaign_id: ""
cluster: "gevelisolatie"

period: "last_90d"
custom_start: ""
custom_end: ""

max_data_age_days: 7
rebuild_if_stale: true

output_type: "both"
output_detail: "standard"
sections_wanted: []

constraints:
  - "read-only — no site/ads changes"
  - "focus on striking-distance queries"

context: "Page was recently updated with new FAQ items and ETICS terminology"

workflow: "page_audit_v1"
```
