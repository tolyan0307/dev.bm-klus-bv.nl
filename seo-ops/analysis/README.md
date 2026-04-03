# SEO Analysis Layer

Rule-based analysis engine that reads the combined snapshot JSON
from the integrations layer and produces prioritised findings.

## How it works

```
seo-ops/data/processed/latest_combined_snapshot.json
  → snapshot_loader.py   (load + validate)
  → rules.py             (conservative rule engine)
  → report_builder.py    (structured report + markdown)
  → run_analysis_report.py  (CLI entry point)
```

## Output files

| File | Format | Description |
|------|--------|-------------|
| `seo-ops/data/processed/latest_analysis_report.json` | JSON | Full structured report |
| `seo-ops/reports/weekly/latest_analysis_report.md` | Markdown | Operator-friendly report |

## Running

Make sure the snapshot exists first:

```bash
cd seo-ops/integrations
python run_combined_snapshot.py
```

Then run the analysis:

```bash
cd seo-ops/analysis
python run_analysis_report.py
```

## Report sections

- **Executive summary** — counts and breakdown
- **Top SEO opportunities** — striking distance, CTR gaps, momentum
- **SEO risks** — declining pages
- **Conversion opportunities** — traffic without lead signals
- **Measurement issues** — (not set) pages, missing events, suspicious sources
- **Gevelisolatie cluster review** — dedicated cluster health check
- **Pages to watch** — medium/high confidence pages to monitor
- **Next actions (7–14 days)** — deduplicated action list

## Confidence levels

- **low** — signal exists but data volume is thin; do not act without more data
- **medium** — pattern is visible; worth investigating
- **high** — clear signal; act on it

## Next steps

1. Feed the markdown report to Claude via `seo-ops/prompts/` for deeper analysis
2. When ready, wrap as MCP tool for direct Claude Code integration
