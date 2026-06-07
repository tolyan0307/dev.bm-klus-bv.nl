"""
run_query_intelligence_review_v1.py -- Query intelligence review v1.

Structured query intelligence review for SEO/PPC/operator tasks.
Classifies queries by intent and commercial role using deterministic
taxonomy, identifies page-query fit mismatches, and produces
operator-grade reports.

READ-ONLY: does not modify site pages, Google Ads, or any source artifacts.

Contract: contracts/query_intelligence_rules_v1.md
Taxonomy: config/mappings/query_intent_taxonomy_v1.yaml

Usage:
    python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope site
    python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope page --page /gevelisolatie/
    python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope query-set --queries-file queries.txt
    python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope site --prefer-window 90
    python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --help
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS = SCRIPT_DIR.parents[1]
PROJECT_ROOT = SEO_OPS.parent

# Source artifacts
KW_MASTER_V3 = SEO_OPS / "snapshots/normalized/keyword_master/keyword_master_v3.csv"
KW_MASTER_V2 = SEO_OPS / "snapshots/normalized/keyword_master/keyword_master_v2.csv"
PAGE_INVENTORY = SEO_OPS / "snapshots/normalized/pages/page_inventory_v1.csv"

GSC_QP_28 = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_last28d.csv"
GSC_QP_90 = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_last90d.csv"
GSC_AGG_Q_28 = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_queries_last28d.csv"
GSC_AGG_Q_90 = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv"
GSC_AGG_P_28 = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_pages_last28d.csv"
GSC_AGG_P_90 = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv"

TAXONOMY_PATH = SEO_OPS / "config/mappings/query_intent_taxonomy_v1.yaml"
SERVICE_TAXONOMY = SEO_OPS / "config/service_taxonomy_v1.yaml"

# Output paths
OUTPUT_DIR = SEO_OPS / "outputs"
REPORT_DIR = SEO_OPS / "reports/keywords"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _si(v) -> int:
    try:
        return int(float(v))
    except (ValueError, TypeError):
        return 0


def _sf(v) -> float:
    try:
        return float(v)
    except (ValueError, TypeError):
        return 0.0


def _s(v) -> str:
    return str(v).strip() if v else ""


def _load_yaml_simple(path: Path) -> dict:
    """Minimal YAML loader — handles our simple config files without PyYAML dependency."""
    if not path.is_file():
        return {}
    try:
        import yaml
        with open(path, encoding="utf-8") as f:
            return yaml.safe_load(f) or {}
    except ImportError:
        # Fallback: not available, return empty
        print(f"  WARN: PyYAML not installed, cannot load {path.name}")
        return {}


# ---------------------------------------------------------------------------
# Taxonomy loader
# ---------------------------------------------------------------------------


def load_taxonomy(path: Path) -> dict:
    """Load intent taxonomy config."""
    tax = _load_yaml_simple(path)
    if not tax:
        print("  WARN: Taxonomy not loaded, using built-in fallback signals")
        return _builtin_taxonomy()
    return tax


def _builtin_taxonomy() -> dict:
    """Minimal built-in taxonomy when YAML is not loadable."""
    return {
        "signal_modifiers": {
            "brand_modifiers": {"terms": ["bm klus", "bm-klus", "bmklus", "bm klus bv"]},
            "noise_terms": {"terms": [
                "dakisolatie", "vloerisolatie", "spouwmuurisolatie",
                "binnenisolatie", "kozijnen", "dakgoot",
            ]},
            "local_modifiers": {"terms": [
                "rotterdam", "almere", "zoetermeer", "leiden", "den haag",
                "delft", "dordrecht", "schiedam", "vlaardingen", "capelle",
                "ridderkerk", "barendrecht", "spijkenisse", "gouda", "alphen",
                "berkel", "pijnacker", "maassluis", "hendrik-ido-ambacht",
                "zwijndrecht", "papendrecht", "regio rotterdam", "zuid-holland",
                "in de buurt",
            ]},
            "commercial_modifiers": {"terms": [
                "kosten", "prijs", "prijs per m2", "offerte", "tarieven",
                "richtprijs", "laten doen", "inhuren", "bedrijf", "specialist",
                "aannemer", "subsidie",
            ]},
            "comparison_modifiers": {"terms": [
                "verschil tussen", "vs", "vergelijken", "beste", "welke",
                "voordelen", "nadelen", "ervaringen", "review",
            ]},
            "informational_modifiers": {"terms": [
                "wat is", "hoe werkt", "hoe", "waarom", "zelf doen",
                "uitleg", "informatie", "tips",
            ]},
            "service_terms": {"terms": [
                "gevelisolatie", "buitengevelisolatie", "buitenmuur isoleren",
                "buiten stucwerk", "sierpleister", "muren stucen",
                "gevel schilderen", "gevel stucen",
            ]},
        },
        "classification_priority": {
            "order": [
                "brand_modifiers", "noise_terms", "local_modifiers",
                "commercial_modifiers", "comparison_modifiers",
                "informational_modifiers", "service_terms",
            ],
            "fallback": "unclear_mixed",
        },
    }


# ---------------------------------------------------------------------------
# Classification engine
# ---------------------------------------------------------------------------

# Mapping from signal group to intent class
_SIGNAL_TO_INTENT = {
    "brand_modifiers": "navigational_brand",
    "noise_terms": "_noise",  # special: filtered out
    "local_modifiers": "local_service",
    "commercial_modifiers": "transactional_service",
    "comparison_modifiers": "commercial_comparison",
    "informational_modifiers": "informational_support",
    "service_terms": "transactional_service",
}

# Mapping from intent to action bucket
_INTENT_TO_BUCKET = {
    "transactional_service": "core_service_opportunity",
    "local_service": "local_service_opportunity",
    "commercial_comparison": "comparison_support_opportunity",
    "informational_support": "paid_negative_or_containment_candidate",
    "navigational_brand": "low_signal_or_unclear",
    "unclear_mixed": "low_signal_or_unclear",
    "_noise": "paid_negative_or_containment_candidate",
}


def classify_query(query: str, taxonomy: dict) -> dict:
    """Classify a single query using deterministic taxonomy rules.

    Returns dict with: intent, bucket, matched_signals, is_noise, confidence_note.
    """
    q = query.lower().strip()
    modifiers = taxonomy.get("signal_modifiers", {})
    priority = taxonomy.get("classification_priority", {})
    order = priority.get("order", list(modifiers.keys()))
    fallback = priority.get("fallback", "unclear_mixed")

    matched_signals = []
    has_service_term = False

    # Check if query contains a service term (needed for local classification)
    service_terms = [t.lower() for t in modifiers.get("service_terms", {}).get("terms", [])]
    for st in service_terms:
        if st in q:
            has_service_term = True
            break

    # Walk priority order
    for group_name in order:
        group = modifiers.get(group_name, {})
        terms = [t.lower() for t in group.get("terms", [])]
        for term in terms:
            if term in q:
                matched_signals.append((group_name, term))
                intent = _SIGNAL_TO_INTENT.get(group_name, fallback)

                # Local modifier needs a service term to count as local_service
                if group_name == "local_modifiers" and not has_service_term:
                    continue  # skip, try next group

                is_noise = (intent == "_noise")
                bucket = _INTENT_TO_BUCKET.get(intent, "low_signal_or_unclear")

                confidence = "medium"
                if len(q.split()) <= 1:
                    confidence = "low"

                return {
                    "intent": intent if not is_noise else "unclear_mixed",
                    "bucket": bucket,
                    "matched_signals": matched_signals,
                    "is_noise": is_noise,
                    "confidence_note": f"heuristic ({confidence})" if not is_noise else "noise term detected",
                }

    # Fallback: check if it's a bare service term (no modifiers)
    if has_service_term:
        return {
            "intent": "transactional_service",
            "bucket": "core_service_opportunity",
            "matched_signals": [("service_terms", "bare service term")],
            "is_noise": False,
            "confidence_note": "heuristic (low) — bare service term without modifiers",
        }

    return {
        "intent": fallback,
        "bucket": "low_signal_or_unclear",
        "matched_signals": [],
        "is_noise": False,
        "confidence_note": "no signal matched — manual review recommended",
    }


# ---------------------------------------------------------------------------
# Source loading
# ---------------------------------------------------------------------------


def load_sources(prefer_window: int) -> dict:
    """Load all source artifacts. Returns metadata about what was loaded."""
    sources = {}

    # Keyword master
    kw_rows = _load_csv(KW_MASTER_V3)
    kw_path = KW_MASTER_V3
    kw_version = "v3"
    if not kw_rows:
        kw_rows = _load_csv(KW_MASTER_V2)
        kw_path = KW_MASTER_V2
        kw_version = "v2"
    sources["keyword_master"] = {
        "rows": kw_rows,
        "path": str(kw_path),
        "version": kw_version,
        "loaded": bool(kw_rows),
        "count": len(kw_rows),
    }

    # GSC query-page (row-level)
    gsc_qp_path = GSC_QP_28 if prefer_window == 28 else GSC_QP_90
    gsc_qp_rows = _load_csv(gsc_qp_path)
    if not gsc_qp_rows and prefer_window == 28:
        gsc_qp_rows = _load_csv(GSC_QP_90)
        gsc_qp_path = GSC_QP_90
    sources["gsc_query_page"] = {
        "rows": gsc_qp_rows,
        "path": str(gsc_qp_path),
        "loaded": bool(gsc_qp_rows),
        "count": len(gsc_qp_rows),
    }

    # GSC aggregated queries
    gsc_q_path = GSC_AGG_Q_28 if prefer_window == 28 else GSC_AGG_Q_90
    gsc_q_rows = _load_csv(gsc_q_path)
    if not gsc_q_rows and prefer_window == 28:
        gsc_q_rows = _load_csv(GSC_AGG_Q_90)
        gsc_q_path = GSC_AGG_Q_90
    sources["gsc_agg_queries"] = {
        "rows": gsc_q_rows,
        "path": str(gsc_q_path),
        "loaded": bool(gsc_q_rows),
        "count": len(gsc_q_rows),
    }

    # Page inventory
    pi_rows = _load_csv(PAGE_INVENTORY)
    sources["page_inventory"] = {
        "rows": pi_rows,
        "path": str(PAGE_INVENTORY),
        "loaded": bool(pi_rows),
        "count": len(pi_rows),
    }

    return sources


# ---------------------------------------------------------------------------
# Query set builders
# ---------------------------------------------------------------------------


def build_query_set_site(sources: dict) -> list[dict]:
    """Build query set for site scope: union of keyword_master queries + GSC queries."""
    seen = {}

    # From keyword_master
    for row in sources["keyword_master"]["rows"]:
        kw = _s(row.get("keyword", row.get("query", "")))
        if not kw:
            continue
        if kw not in seen:
            seen[kw] = {
                "query": kw,
                "source": "keyword_master",
                "impressions": _si(row.get("impressions", row.get("gsc_impressions", 0))),
                "clicks": _si(row.get("clicks", row.get("gsc_clicks", 0))),
                "position": _sf(row.get("position", row.get("gsc_position", 0))),
                "theme": _s(row.get("theme", "")),
                "mapped_page": _s(row.get("mapped_page", row.get("best_page", ""))),
            }

    # From GSC aggregated queries
    for row in sources["gsc_agg_queries"]["rows"]:
        q = _s(row.get("query", ""))
        if not q:
            continue
        if q not in seen:
            seen[q] = {
                "query": q,
                "source": "gsc",
                "impressions": _si(row.get("impressions", 0)),
                "clicks": _si(row.get("clicks", 0)),
                "position": _sf(row.get("position", 0)),
                "theme": "",
                "mapped_page": "",
            }
        else:
            # Enrich with GSC data if not already set
            entry = seen[q]
            if entry["impressions"] == 0:
                entry["impressions"] = _si(row.get("impressions", 0))
            if entry["clicks"] == 0:
                entry["clicks"] = _si(row.get("clicks", 0))
            if entry["position"] == 0:
                entry["position"] = _sf(row.get("position", 0))

    return list(seen.values())


def build_query_set_page(sources: dict, target_page: str) -> list[dict]:
    """Build query set for page scope: queries associated with target page."""
    queries = []
    target = target_page.rstrip("/").lower()

    for row in sources["gsc_query_page"]["rows"]:
        page = _s(row.get("page", "")).lower()
        # Normalize: extract path from full URL
        if "bm-klus-bv.nl" in page:
            page = page.split("bm-klus-bv.nl")[-1]
        page = page.rstrip("/")

        if page == target:
            q = _s(row.get("query", ""))
            if q:
                queries.append({
                    "query": q,
                    "source": "gsc_page",
                    "impressions": _si(row.get("impressions", 0)),
                    "clicks": _si(row.get("clicks", 0)),
                    "position": _sf(row.get("position", 0)),
                    "theme": "",
                    "mapped_page": target_page,
                })

    return queries


def build_query_set_file(queries_file: Path) -> list[dict]:
    """Build query set from a user-supplied file (one query per line)."""
    if not queries_file.is_file():
        return []
    queries = []
    with open(queries_file, encoding="utf-8") as f:
        for line in f:
            q = line.strip()
            if q and not q.startswith("#"):
                queries.append({
                    "query": q,
                    "source": "user_supplied",
                    "impressions": 0,
                    "clicks": 0,
                    "position": 0,
                    "theme": "",
                    "mapped_page": "",
                })
    return queries


# ---------------------------------------------------------------------------
# Page-fit analysis
# ---------------------------------------------------------------------------


def build_page_role_map(sources: dict) -> dict[str, str]:
    """Build a map of page path -> page type/role from page inventory."""
    role_map = {}
    for row in sources["page_inventory"]["rows"]:
        route = _s(row.get("route", ""))
        page_type = _s(row.get("page_type", row.get("type", "")))
        if route:
            role_map[route.rstrip("/")] = page_type
    return role_map


def assess_page_fit(query_entry: dict, classification: dict, page_roles: dict) -> str | None:
    """Check if the query's intent matches the ranking page's role.

    Returns a mismatch note or None if no mismatch detected.
    """
    mapped = _s(query_entry.get("mapped_page", ""))
    if not mapped:
        return None

    mapped_key = mapped.rstrip("/")
    page_role = page_roles.get(mapped_key, "")
    if not page_role:
        return None

    intent = classification["intent"]

    # Simple mismatch rules
    if intent == "informational_support" and page_role in ("money_page", "service_page"):
        return f"Informational query ranking on {page_role} page ({mapped})"
    if intent == "transactional_service" and page_role in ("support_page", "info_page", "blog"):
        return f"Transactional query ranking on {page_role} page ({mapped})"
    if intent == "local_service" and "city" not in page_role and "location" not in page_role:
        if page_role in ("support_page", "info_page"):
            return f"Local service query ranking on {page_role} page ({mapped})"

    return None


# ---------------------------------------------------------------------------
# Analysis core
# ---------------------------------------------------------------------------


def run_analysis(query_set: list[dict], taxonomy: dict, page_roles: dict, scope: str) -> dict:
    """Run classification and bucket assignment on the query set."""
    results = []
    intent_counts = Counter()
    bucket_counts = Counter()
    mismatches = []

    for entry in query_set:
        q = entry["query"]
        cls = classify_query(q, taxonomy)

        intent_counts[cls["intent"]] += 1
        bucket_counts[cls["bucket"]] += 1

        # Page fit check
        mismatch_note = assess_page_fit(entry, cls, page_roles)
        if mismatch_note:
            cls["bucket"] = "page_fit_mismatch"
            cls["mismatch_note"] = mismatch_note
            bucket_counts["page_fit_mismatch"] += 1
            bucket_counts[_INTENT_TO_BUCKET.get(cls["intent"], "low_signal_or_unclear")] -= 1
            mismatches.append({"query": q, "note": mismatch_note})

        results.append({
            **entry,
            **cls,
        })

    # Sort by impressions descending for top findings
    results.sort(key=lambda r: r.get("impressions", 0), reverse=True)

    # Top findings per bucket
    top_per_bucket = defaultdict(list)
    for r in results:
        b = r["bucket"]
        if len(top_per_bucket[b]) < 10:
            top_per_bucket[b].append(r)

    return {
        "scope": scope,
        "total_queries": len(query_set),
        "intent_counts": dict(intent_counts),
        "bucket_counts": dict(bucket_counts),
        "mismatches": mismatches,
        "top_per_bucket": dict(top_per_bucket),
        "all_results": results,
    }


# ---------------------------------------------------------------------------
# JSON output
# ---------------------------------------------------------------------------


def write_json(analysis: dict, sources: dict, taxonomy_version: str,
               scope: str, label: str, output_path: Path) -> None:
    """Write structured JSON output."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    # Slim down all_results for JSON (remove large matched_signals detail)
    slim_results = []
    for r in analysis["all_results"]:
        slim_results.append({
            "query": r["query"],
            "intent": r["intent"],
            "bucket": r["bucket"],
            "impressions": r.get("impressions", 0),
            "clicks": r.get("clicks", 0),
            "position": r.get("position", 0),
            "is_noise": r.get("is_noise", False),
            "confidence_note": r.get("confidence_note", ""),
            "mismatch_note": r.get("mismatch_note", ""),
            "source": r.get("source", ""),
        })

    obj = {
        "_meta": {
            "generated_at": now,
            "generator": "run_query_intelligence_review_v1.py",
            "contract": "contracts/query_intelligence_rules_v1.md",
            "taxonomy_version": taxonomy_version,
            "scope": scope,
            "label": label or scope,
        },
        "artifact_provenance": {
            src_name: {
                "path": src_data["path"],
                "loaded": src_data["loaded"],
                "count": src_data["count"],
            }
            for src_name, src_data in sources.items()
        },
        "summary": {
            "total_queries": analysis["total_queries"],
            "intent_counts": analysis["intent_counts"],
            "bucket_counts": analysis["bucket_counts"],
            "mismatch_count": len(analysis["mismatches"]),
        },
        "top_findings": {
            bucket: [
                {
                    "query": r["query"],
                    "impressions": r.get("impressions", 0),
                    "clicks": r.get("clicks", 0),
                    "confidence_note": r.get("confidence_note", ""),
                }
                for r in items[:5]
            ]
            for bucket, items in analysis["top_per_bucket"].items()
        },
        "mismatches": analysis["mismatches"][:20],
        "classified_queries": slim_results,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
    print(f"  JSON -> {output_path}")


# ---------------------------------------------------------------------------
# Markdown report
# ---------------------------------------------------------------------------


def write_report(analysis: dict, sources: dict, taxonomy_version: str,
                 scope: str, label: str, report_path: Path) -> None:
    """Write operator-grade markdown report."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = []

    def w(line=""):
        lines.append(line)

    w("# Query Intelligence Review")
    w()
    w(f"**Generated:** {now}")
    w(f"**Report mode:** preliminary")
    w(f"**Workflow:** query_intelligence_review_v1")
    w(f"**Contract:** contracts/query_intelligence_rules_v1.md")
    w(f"**Scope:** {scope}" + (f" (label: {label})" if label else ""))
    w()
    w("> Intent classification is heuristic — based on keyword signal matching")
    w("> against `query_intent_taxonomy_v1.yaml`. It does not represent confirmed user intent.")
    w()
    w("---")
    w()

    # Sources
    w("## 1. Sources used")
    w()
    w("| Source | Path | Status | Rows |")
    w("|--------|------|--------|------|")
    for name, src in sources.items():
        status = "loaded" if src["loaded"] else "not found"
        w(f"| {name} | `{src['path']}` | {status} | {src['count']} |")
    w()
    w(f"**Taxonomy version:** {taxonomy_version}")
    w()

    # Limited mode warning
    missing = [n for n, s in sources.items() if not s["loaded"]]
    if missing:
        w(f"> **Limited mode:** {', '.join(missing)} not available. Classification may be incomplete.")
        w()

    w("---")
    w()

    # Summary
    w("## 2. Classification summary")
    w()
    w(f"**Total queries analyzed:** {analysis['total_queries']}")
    w()

    w("### By intent")
    w()
    w("| Intent | Count |")
    w("|--------|-------|")
    for intent, count in sorted(analysis["intent_counts"].items(), key=lambda x: -x[1]):
        w(f"| {intent} | {count} |")
    w()

    w("### By action bucket")
    w()
    w("| Bucket | Count |")
    w("|--------|-------|")
    for bucket, count in sorted(analysis["bucket_counts"].items(), key=lambda x: -x[1]):
        w(f"| {bucket} | {count} |")
    w()

    w("---")
    w()

    # Top findings per bucket
    w("## 3. Top findings by bucket")
    w()

    bucket_order = [
        "core_service_opportunity",
        "local_service_opportunity",
        "comparison_support_opportunity",
        "page_fit_mismatch",
        "paid_negative_or_containment_candidate",
        "low_signal_or_unclear",
    ]

    for bucket in bucket_order:
        items = analysis["top_per_bucket"].get(bucket, [])
        if not items:
            continue

        w(f"### {bucket}")
        w()
        w("| Query | Impressions | Clicks | Position | Confidence |")
        w("|-------|-------------|--------|----------|------------|")
        for r in items[:10]:
            pos = f"{r.get('position', 0):.1f}" if r.get("position") else "—"
            w(f"| {r['query']} | {r.get('impressions', 0)} | {r.get('clicks', 0)} | {pos} | {r.get('confidence_note', '')} |")
        w()

        if bucket == "page_fit_mismatch":
            w("**Mismatch details:**")
            for m in analysis["mismatches"][:10]:
                w(f"- `{m['query']}` — {m['note']}")
            w()

    w("---")
    w()

    # Interpretation boundaries
    w("## 4. Interpretation boundaries")
    w()
    w("- Intent classification is deterministic and heuristic — based on keyword signal patterns")
    w("- Classification does NOT prove user intent or conversion likelihood")
    w("- Page-query fit assessment compares inferred intent against page_inventory roles")
    w("- Low-volume queries (< 10 impressions) have reduced classification confidence")
    w("- External enrichment data, if present, is supplementary context only")
    w()

    w("---")
    w()

    # Recommended actions
    w("## 5. Recommended manual actions")
    w()
    w("| Priority | Action | Bucket | Confidence |")
    w("|----------|--------|--------|------------|")

    core = analysis["top_per_bucket"].get("core_service_opportunity", [])
    if core:
        w(f"| high | Review top {min(5, len(core))} core service queries for page coverage | core_service_opportunity | medium |")

    local = analysis["top_per_bucket"].get("local_service_opportunity", [])
    if local:
        w(f"| high | Check city page coverage for {min(5, len(local))} local queries | local_service_opportunity | medium |")

    mm = analysis["mismatches"]
    if mm:
        w(f"| high | Investigate {len(mm)} page-query fit mismatches | page_fit_mismatch | medium |")

    neg = analysis["top_per_bucket"].get("paid_negative_or_containment_candidate", [])
    if neg:
        w(f"| medium | Review {min(10, len(neg))} PPC negative/containment candidates | paid_negative_or_containment_candidate | low |")

    comp = analysis["top_per_bucket"].get("comparison_support_opportunity", [])
    if comp:
        w(f"| medium | Assess content coverage for {min(5, len(comp))} comparison queries | comparison_support_opportunity | low |")

    unclear = analysis["top_per_bucket"].get("low_signal_or_unclear", [])
    if unclear:
        w(f"| low | Manual review of {min(10, len(unclear))} unclear/low-signal queries | low_signal_or_unclear | low |")
    w()

    w("---")
    w()

    # Excluded context
    w("## 6. Excluded context")
    w()
    w("- Competitor SERP analysis not performed (no DataForSEO SERP snapshot in this workflow)")
    w("- Conversion data not assessed (intent ≠ conversion)")
    w("- Ad copy or landing page quality not evaluated")
    if not sources["page_inventory"]["loaded"]:
        w("- Page inventory not available — page-query fit assessment skipped")
    if not sources["keyword_master"]["loaded"]:
        w("- Keyword master not available — using GSC queries only")
    w()

    w("---")
    w()

    # Provenance
    w("## Provenance")
    w()
    w(f"- **Generated:** {now}")
    w("- **Report mode:** preliminary")
    w("- **Generator:** run_query_intelligence_review_v1.py")
    w("- **Contract:** contracts/query_intelligence_rules_v1.md")
    w(f"- **Taxonomy:** query_intent_taxonomy_v1.yaml (v{taxonomy_version})")
    w("- **Primary truth:** keyword_master + GSC query/page snapshots")
    w("- **Supporting data:** page_inventory (for fit assessment)")
    w(f"- **Known limitations:** heuristic classification, no conversion data, no SERP analysis")

    report_path.parent.mkdir(parents=True, exist_ok=True)
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"  Report -> {report_path}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Query Intelligence Review v1 — deterministic query classification for SEO/PPC",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python %(prog)s --scope site
  python %(prog)s --scope page --page /gevelisolatie/
  python %(prog)s --scope query-set --queries-file queries.txt
  python %(prog)s --scope site --prefer-window 90 --label weekly_check
        """,
    )
    p.add_argument("--scope", required=True, choices=["site", "page", "query-set"],
                    help="Analysis scope: site (all queries), page (single page), query-set (custom file)")
    p.add_argument("--page", default=None,
                    help="Target page path for page scope (e.g. /gevelisolatie/)")
    p.add_argument("--queries-file", default=None,
                    help="Path to file with queries (one per line) for query-set scope")
    p.add_argument("--prefer-window", type=int, default=28, choices=[28, 90],
                    help="Preferred GSC data window (default: 28)")
    p.add_argument("--label", default=None,
                    help="Optional label for output naming")
    p.add_argument("--output-json", default=None,
                    help="Override JSON output path")
    p.add_argument("--output-report", default=None,
                    help="Override markdown report output path")
    return p.parse_args()


def main() -> None:
    args = parse_args()
    today = datetime.now().strftime("%Y-%m-%d")

    # Validate scope-specific args
    if args.scope == "page" and not args.page:
        print("ERROR: --page is required for page scope")
        sys.exit(1)
    if args.scope == "query-set" and not args.queries_file:
        print("ERROR: --queries-file is required for query-set scope")
        sys.exit(1)
    if args.scope == "query-set":
        qf = Path(args.queries_file)
        if not qf.is_file():
            print(f"ERROR: queries file not found: {qf}")
            sys.exit(1)

    print("=" * 60)
    print("Query Intelligence Review v1")
    print("=" * 60)
    print(f"  Scope: {args.scope}")
    if args.page:
        print(f"  Page: {args.page}")
    if args.queries_file:
        print(f"  Queries file: {args.queries_file}")
    print(f"  Prefer window: {args.prefer_window}d")
    print()

    # Load taxonomy
    print("Loading taxonomy...")
    taxonomy = load_taxonomy(TAXONOMY_PATH)
    tax_meta = taxonomy.get("_meta", {})
    taxonomy_version = tax_meta.get("version", "1.0")
    print(f"  Taxonomy version: {taxonomy_version}")
    print()

    # Load sources
    print("Loading sources...")
    sources = load_sources(args.prefer_window)
    for name, src in sources.items():
        status = f"{src['count']} rows" if src["loaded"] else "NOT FOUND"
        print(f"  {name}: {status}")
    print()

    # Check minimum requirements
    has_any_query_source = (
        sources["keyword_master"]["loaded"] or
        sources["gsc_agg_queries"]["loaded"] or
        sources["gsc_query_page"]["loaded"]
    )
    if not has_any_query_source and args.scope != "query-set":
        print("ERROR: No query/keyword artifacts found. Cannot proceed.")
        print("  Build keyword_master or GSC snapshot first.")
        sys.exit(1)

    # Build query set
    print("Building query set...")
    if args.scope == "site":
        query_set = build_query_set_site(sources)
    elif args.scope == "page":
        query_set = build_query_set_page(sources, args.page)
    else:
        query_set = build_query_set_file(Path(args.queries_file))

    print(f"  {len(query_set)} queries in set")
    if not query_set:
        print("WARN: Empty query set. No analysis to perform.")
        sys.exit(0)
    print()

    # Build page role map
    page_roles = build_page_role_map(sources)

    # Run analysis
    print("Classifying queries...")
    analysis = run_analysis(query_set, taxonomy, page_roles, args.scope)
    print(f"  Intent distribution: {dict(analysis['intent_counts'])}")
    print(f"  Bucket distribution: {dict(analysis['bucket_counts'])}")
    print(f"  Page-query mismatches: {len(analysis['mismatches'])}")
    print()

    # Output paths
    label_slug = args.label or args.scope
    if args.scope == "page" and args.page:
        label_slug = args.page.strip("/").replace("/", "_") or "root"
    json_path = Path(args.output_json) if args.output_json else OUTPUT_DIR / "query_intelligence_review_v1.json"
    report_path = Path(args.output_report) if args.output_report else REPORT_DIR / f"query_intelligence_review_v1_{label_slug}_{today}.md"

    # Write outputs
    print("Writing outputs...")
    write_json(analysis, sources, taxonomy_version, args.scope, args.label or "", json_path)
    write_report(analysis, sources, taxonomy_version, args.scope, args.label or "", report_path)

    print()
    print("Done.")


if __name__ == "__main__":
    main()
