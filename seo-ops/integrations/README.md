# SEO Integrations — Local Connector Layer

Read-only connector layer for Google Search Console API and GA4 Data API.
Base layer for Claude / Cursor analysis and future MCP integration.

## Architecture

```
seo-ops/integrations/
  test_gsc_access.py          # Smoke test: GSC OAuth
  test_ga4_access.py          # Smoke test: GA4 service account
  run_combined_snapshot.py     # CLI: full snapshot -> JSON
  google_clients/
    config.py                  # Env var loader + validation
    gsc_client.py              # GSC read-only functions
    ga4_client.py              # GA4 read-only functions
    combined_snapshot.py       # Orchestrator
```

## Prerequisites

- Python 3.10+
- Google Cloud project with Search Console API and Analytics Data API enabled
- GSC: OAuth 2.0 Desktop Client credentials JSON
- GA4: Service Account credentials JSON (Viewer role on the GA4 property)

## Setup

```bash
cd seo-ops/integrations
python -m venv .venv
```

Activate:

```bash
# Linux / macOS
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1
```

Install:

```bash
pip install -r requirements.txt
```

## Environment variables

Copy `.env.example` and adjust paths. Do **not** commit credentials.

| Variable | Description |
|----------|-------------|
| `BMKLUS_GSC_SITE_URL` | GSC property URL |
| `BMKLUS_GSC_OAUTH_CLIENT_JSON` | Path to OAuth Desktop Client JSON |
| `BMKLUS_GSC_TOKEN_JSON` | Path where OAuth token will be saved |
| `BMKLUS_GA4_PROPERTY_ID` | GA4 numeric property ID |
| `BMKLUS_GA4_SERVICE_ACCOUNT_JSON` | Path to service account JSON |

Load env vars:

```bash
# Linux / macOS
set -a; source .env.example; set +a

# Windows PowerShell
Get-Content .env.example | ForEach-Object {
  if ($_ -match '^([^#]\S+?)=(.*)$') {
    [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
  }
}
```

## Running

### 1. Smoke tests (verify access)

```bash
python test_gsc_access.py    # First run opens browser for OAuth
python test_ga4_access.py    # Service account, no browser
```

### 2. Combined snapshot

```bash
python run_combined_snapshot.py
```

This will:
- Query GSC for top pages, top queries, and 28d-vs-28d comparison
- Query GA4 for landing pages, key events, traffic acquisition, daily sessions
- Print a readable summary to console
- Save full JSON to `seo-ops/data/processed/latest_combined_snapshot.json`

## Output JSON sections

| Section | Source | Contents |
|---------|--------|----------|
| `gsc_top_pages` | GSC | Top 20 pages by clicks (28d) |
| `gsc_top_queries` | GSC | Top 20 queries by clicks (28d) |
| `gsc_page_comparison` | GSC | Page metrics current 28d vs previous 28d with deltas |
| `ga4_landing_pages` | GA4 | Sessions + engagement by landing page (28d) |
| `ga4_key_events_by_page` | GA4 | Contact_Form_Site / Phone / Whatsapp counts by page |
| `ga4_traffic_acquisition` | GA4 | Sessions by source/medium (28d) |
| `ga4_daily_sessions` | GA4 | Daily session counts (28d) |

## Next steps

1. Run `run_combined_snapshot.py` to generate baseline data
2. Feed `latest_combined_snapshot.json` to Claude using prompts from `seo-ops/prompts/`
3. When ready, wrap as MCP tool for direct Claude Code integration
