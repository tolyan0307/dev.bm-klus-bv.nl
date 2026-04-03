"""
Test harness: verify read-only access to Google Search Console API.

First run opens a browser for OAuth consent and saves the token.
Subsequent runs reuse the saved token.

Usage:
    python test_gsc_access.py
"""

import os
import sys
from datetime import date, timedelta
from pathlib import Path


def main() -> int:
    # --- Read env vars ---------------------------------------------------
    site_url = os.environ.get("BMKLUS_GSC_SITE_URL", "").strip()
    client_json = os.environ.get("BMKLUS_GSC_OAUTH_CLIENT_JSON", "").strip()
    token_json = os.environ.get("BMKLUS_GSC_TOKEN_JSON", "").strip()

    missing = []
    if not site_url:
        missing.append("BMKLUS_GSC_SITE_URL")
    if not client_json:
        missing.append("BMKLUS_GSC_OAUTH_CLIENT_JSON")
    if not token_json:
        missing.append("BMKLUS_GSC_TOKEN_JSON")
    if missing:
        print(f"FAIL: missing env vars: {', '.join(missing)}", file=sys.stderr)
        return 1

    if not Path(client_json).is_file():
        print(f"FAIL: OAuth client JSON not found: {client_json}", file=sys.stderr)
        return 1

    # --- Auth ------------------------------------------------------------
    try:
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build
    except ImportError as e:
        print(f"FAIL: missing dependency — {e}", file=sys.stderr)
        print("Run: pip install -r requirements.txt", file=sys.stderr)
        return 1

    SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
    creds = None

    # Load existing token if available
    if Path(token_json).is_file():
        creds = Credentials.from_authorized_user_file(token_json, SCOPES)

    # Refresh or run OAuth flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception as e:
                print(f"Token refresh failed ({e}), re-authenticating...")
                creds = None

        if not creds:
            flow = InstalledAppFlow.from_client_secrets_file(client_json, SCOPES)
            creds = flow.run_local_server(port=0)

        # Save token for next run
        Path(token_json).parent.mkdir(parents=True, exist_ok=True)
        Path(token_json).write_text(creds.to_json())
        print(f"Token saved to {token_json}")

    # --- Query -----------------------------------------------------------
    service = build("searchconsole", "v1", credentials=creds)

    end_date = date.today() - timedelta(days=1)
    start_date = end_date - timedelta(days=6)

    request_body = {
        "startDate": start_date.isoformat(),
        "endDate": end_date.isoformat(),
        "dimensions": ["page"],
        "rowLimit": 10,
    }

    try:
        response = (
            service.searchanalytics()
            .query(siteUrl=site_url, body=request_body)
            .execute()
        )
    except Exception as e:
        print(f"FAIL: API request error — {e}", file=sys.stderr)
        return 1

    rows = response.get("rows", [])

    # --- Output ----------------------------------------------------------
    print(f"\nOK — GSC access verified")
    print(f"Site:       {site_url}")
    print(f"Date range: {start_date} -> {end_date}")
    print(f"Rows returned: {len(rows)}")

    if rows:
        print(f"\nTop pages:")
        for row in rows[:5]:
            page = row["keys"][0]
            clicks = row.get("clicks", 0)
            impressions = row.get("impressions", 0)
            ctr = row.get("ctr", 0)
            position = row.get("position", 0)
            print(f"  {page}")
            print(
                f"    clicks={clicks}  impressions={impressions}"
                f"  ctr={ctr:.2%}  pos={position:.1f}"
            )
    else:
        print(
            "No data returned"
            " (this may be normal for a new or low-traffic property)."
        )

    return 0


if __name__ == "__main__":
    sys.exit(main())
