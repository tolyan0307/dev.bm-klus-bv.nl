"""
build_url_inspection_snapshot.py — Collect and normalize URL Inspection data.

Calls GSC URL Inspection API for one or more URLs, saves raw and normalized
snapshots for downstream indexation analysis.

Usage:
  python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --url https://bm-klus-bv.nl/gevelisolatie/
  python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --urls-file urls.txt --label cluster_check
  python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --url https://bm-klus-bv.nl/gevelisolatie/ --site-url https://bm-klus-bv.nl/
"""

from __future__ import annotations

import argparse
import io
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Windows UTF-8 stdout
# ---------------------------------------------------------------------------
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
elif sys.stdout and sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(
        sys.stdout.buffer, encoding="utf-8", errors="replace"
    )

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.gsc.url_inspection_loader import inspect_url

RAW_DIR = SEO_OPS_ROOT / "snapshots" / "raw" / "gsc"
NORM_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "seo"

# ---------------------------------------------------------------------------
# Site URL fallback
# ---------------------------------------------------------------------------

def _load_site_url_from_config() -> str | None:
    """Try to load site_url from config/site.yaml."""
    site_yaml = SEO_OPS_ROOT / "config" / "site.yaml"
    if not site_yaml.is_file():
        return None
    try:
        import yaml  # noqa: F811
        data = yaml.safe_load(site_yaml.read_text(encoding="utf-8"))
        return data.get("gsc_property") or data.get("primary_domain")
    except Exception:
        pass
    # Fallback: simple text parse for gsc_property
    try:
        for line in site_yaml.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("gsc_property:"):
                val = line.split(":", 1)[1].strip().strip('"').strip("'")
                if val:
                    return val
            if line.startswith("primary_domain:"):
                val = line.split(":", 1)[1].strip().strip('"').strip("'")
                if val:
                    return val
    except Exception:
        pass
    return None


# ---------------------------------------------------------------------------
# Normalization
# ---------------------------------------------------------------------------

def normalize_inspection(raw: dict, inspection_url: str, site_url: str, fetch_ts: str) -> dict:
    """
    Extract a flat, analyzer-friendly record from raw inspection response.
    Fields that the API does not provide are set to None.
    """
    ir = raw.get("inspectionResult", {})
    index_status = ir.get("indexStatusResult", {})
    mobile = ir.get("mobileUsabilityResult", {})

    # Coverage / indexing state
    coverage_state = index_status.get("coverageState", None)
    indexing_state = index_status.get("indexingState", None)
    verdict = index_status.get("verdict", None)

    # Canonical
    user_canonical = index_status.get("userCanonical", None)
    google_canonical = index_status.get("googleCanonical", None)

    # Crawl details
    last_crawl_time = index_status.get("lastCrawlTime", None)
    page_fetch_state = index_status.get("pageFetchState", None)
    robots_txt_state = index_status.get("robotsTxtState", None)
    crawled_as = index_status.get("crawledAs", None)

    # Indexing allowed
    indexing_allowed = index_status.get("indexingAllowed", None)

    # Sitemap
    sitemap = index_status.get("sitemap", None)
    referring_urls = index_status.get("referringUrls", None)

    return {
        "inspection_url": inspection_url,
        "site_url": site_url,
        "fetch_timestamp": fetch_ts,
        "verdict_raw": verdict,
        "indexing_state": indexing_state,
        "coverage_state": coverage_state,
        "user_canonical": user_canonical,
        "google_canonical": google_canonical,
        "last_crawl_time": last_crawl_time,
        "page_fetch_state": page_fetch_state,
        "robots_txt_state": robots_txt_state,
        "crawled_as": crawled_as,
        "indexing_allowed": indexing_allowed,
        "sitemap": json.dumps(sitemap) if sitemap else None,
        "referring_urls": json.dumps(referring_urls) if referring_urls else None,
        "mobile_usability_verdict": mobile.get("verdict", None),
        "raw_reference": None,  # set by caller after raw file is written
        "notes": None,
    }


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------

def write_json(data: dict | list, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False, default=str),
        encoding="utf-8",
    )


def build_output_paths(label: str | None, date_str: str) -> dict[str, Path]:
    tag = f"url_inspection_{label}_{date_str}" if label else f"url_inspection_{date_str}"
    return {
        "raw_json": RAW_DIR / f"{tag}_raw.json",
        "normalized_json": NORM_DIR / f"{tag}_normalized.json",
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Build URL Inspection snapshot (raw + normalized)"
    )
    parser.add_argument("--url", type=str, help="Single URL to inspect")
    parser.add_argument("--urls-file", type=str, help="Path to file with one URL per line")
    parser.add_argument("--site-url", type=str, default=None, help="GSC property URL override")
    parser.add_argument("--label", type=str, default=None, help="Short label for output naming")
    args = parser.parse_args()

    # Validate inputs
    if not args.url and not args.urls_file:
        print("ERROR: Provide --url or --urls-file. Run with --help for usage.", file=sys.stderr)
        sys.exit(1)

    # Collect URLs
    urls: list[str] = []
    if args.url:
        urls.append(args.url.strip())
    if args.urls_file:
        urls_path = Path(args.urls_file)
        if not urls_path.is_file():
            print(f"ERROR: URLs file not found: {urls_path}", file=sys.stderr)
            sys.exit(1)
        for line in urls_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#"):
                urls.append(line)

    if not urls:
        print("ERROR: No URLs to inspect after parsing inputs.", file=sys.stderr)
        sys.exit(1)

    # Resolve site_url
    site_url = args.site_url
    if not site_url:
        site_url = _load_site_url_from_config()
    if not site_url:
        print(
            "WARNING: No --site-url provided and could not load from config/site.yaml. "
            "Will use GSC config default from environment.",
            file=sys.stderr,
        )

    # Output paths
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    paths = build_output_paths(args.label, date_str)

    print(f"URL Inspection snapshot — {len(urls)} URL(s)")
    print(f"  Site URL: {site_url or '(from env config)'}")
    print(f"  Label: {args.label or '(none)'}")
    print()

    # Inspect each URL
    raw_results: list[dict] = []
    normalized_results: list[dict] = []
    errors: list[dict] = []

    for i, url in enumerate(urls, 1):
        print(f"  [{i}/{len(urls)}] Inspecting: {url}")
        fetch_ts = datetime.now(timezone.utc).isoformat()

        try:
            raw = inspect_url(url, site_url=site_url)
            raw_results.append({"url": url, "response": raw})

            norm = normalize_inspection(raw, url, site_url or "", fetch_ts)
            norm["raw_reference"] = str(paths["raw_json"].name)
            normalized_results.append(norm)

            print(f"    → verdict={norm['verdict_raw']}, indexing_state={norm['indexing_state']}")
        except Exception as e:
            error_entry = {
                "url": url,
                "error": str(e),
                "fetch_timestamp": fetch_ts,
            }
            errors.append(error_entry)
            print(f"    → ERROR: {e}", file=sys.stderr)

        # Polite delay between API calls
        if i < len(urls):
            time.sleep(1)

    # Write raw
    raw_output = {
        "_meta": {
            "generator": "build_url_inspection_snapshot.py",
            "generated_at": now.isoformat(),
            "version": "1.0",
            "site_url": site_url,
            "label": args.label,
            "urls_requested": len(urls),
            "urls_succeeded": len(raw_results),
            "urls_failed": len(errors),
        },
        "results": raw_results,
        "errors": errors,
    }
    write_json(raw_output, paths["raw_json"])
    print(f"\n  Raw JSON → {paths['raw_json']}")

    # Write normalized
    norm_output = {
        "_meta": {
            "generator": "build_url_inspection_snapshot.py",
            "generated_at": now.isoformat(),
            "version": "1.0",
            "site_url": site_url,
            "label": args.label,
            "urls_inspected": len(normalized_results),
            "urls_failed": len(errors),
            "raw_reference": str(paths["raw_json"].name),
        },
        "inspections": normalized_results,
        "errors": errors,
    }
    write_json(norm_output, paths["normalized_json"])
    print(f"  Normalized JSON → {paths['normalized_json']}")

    # Summary
    print(f"\n  Summary: {len(normalized_results)} inspected, {len(errors)} errors")
    if errors:
        print(f"  Failed URLs:")
        for e in errors:
            print(f"    - {e['url']}: {e['error']}")

    print("\n  Done.")


if __name__ == "__main__":
    main()
