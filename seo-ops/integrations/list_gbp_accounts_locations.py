from pathlib import Path
import json
import requests
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

SCOPES = ["https://www.googleapis.com/auth/business.manage"]
TOKEN_PATH = Path(r"D:\projects\bmklus\google\gbp_token.json")

def load_creds() -> Credentials:
    data = json.loads(TOKEN_PATH.read_text(encoding="utf-8"))
    creds = Credentials.from_authorized_user_info(data, SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
        TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")
    return creds

def get_json(url: str, token: str):
    r = requests.get(url, headers={"Authorization": f"Bearer {token}"}, timeout=30)
    try:
        payload = r.json()
    except Exception:
        payload = {"raw_text": r.text}
    return r.status_code, payload

def main():
    creds = load_creds()
    token = creds.token

    print("=== ACCOUNTS ===")
    status, payload = get_json(
        "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
        token,
    )
    print("HTTP", status)
    print(json.dumps(payload, indent=2, ensure_ascii=False))

    accounts = payload.get("accounts", []) if isinstance(payload, dict) else []
    if not accounts:
        print("\nNo accounts returned. Stop here.")
        return

    first = accounts[0]
    account_name = first.get("name", "")
    print(f"\nUsing first account: {account_name}")

    print("\n=== LOCATIONS ===")
    status, payload = get_json(
        f"https://mybusinessbusinessinformation.googleapis.com/v1/{account_name}/locations?readMask=name,title,storeCode",
        token,
    )
    print("HTTP", status)
    print(json.dumps(payload, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()