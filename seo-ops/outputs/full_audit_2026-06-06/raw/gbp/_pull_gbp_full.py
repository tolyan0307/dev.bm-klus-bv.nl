"""READ-ONLY GBP pull (performance daily series + reviews) for 2026-06-06 audit."""
from __future__ import annotations
import json, sys
from pathlib import Path
INTEG = Path("D:/projects/bmklus/v0-site/site/seo-ops/integrations")
OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/gbp")
sys.path.insert(0, str(INTEG))

from gbp.performance_loader import load_gbp_performance
from gbp.reviews_loader import load_gbp_reviews

# ~85 days back covers full post-cutover (2026-03-08+)
perf = load_gbp_performance(days=85)
(OUT/"performance_85d.json").write_text(json.dumps(perf, indent=2, ensure_ascii=False, default=str), encoding="utf-8")
print("performance:", perf.get("status"), perf.get("error") or "")

try:
    rev = load_gbp_reviews()
except TypeError:
    rev = load_gbp_reviews
    rev = rev()
(OUT/"reviews.json").write_text(json.dumps(rev, indent=2, ensure_ascii=False, default=str), encoding="utf-8")
print("reviews:", rev.get("status"), rev.get("error") or "")
print("DONE GBP.")
