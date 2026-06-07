# GBP (Google Business Profile) integration loaders.
# Read-only. No write/update operations.

from pathlib import Path

# Canonical path for GBP OAuth token — stored alongside other Google
# credentials in D:\projects\bmklus\google, not inside the repo.
GBP_TOKEN_PATH = Path(r"D:\projects\bmklus\google\gbp_token.json")
