from pathlib import Path
import json

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/business.manage"]

client_secret_file = Path(r"D:\projects\bmklus\google\bmklus-gbp-oauth-client.json")
token_out = Path(r"D:\projects\bmklus\google\gbp_token.json")

flow = InstalledAppFlow.from_client_secrets_file(str(client_secret_file), SCOPES)
creds = flow.run_local_server(port=0)

token_out.parent.mkdir(parents=True, exist_ok=True)
token_out.write_text(creds.to_json(), encoding="utf-8")

print(f"Saved token to: {token_out}")