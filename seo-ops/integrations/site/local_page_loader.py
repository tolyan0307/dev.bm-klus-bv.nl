"""
local_page_loader.py — Extract page inventory from the local BM klus BV project.

Reads:
  - app/ directory tree (Next.js App Router file-based routes)
  - data/sitemap-plan.ts (PLANNED_ROUTES with title/description)
  - lib/content/projects.ts (project cards)
  - lib/content/gevelisolatie-locations.ts (location data with title/h1/description)
  - lib/content/*.ts (service page meta + h1)

Outputs a list of PageRecord dicts ready for build_page_inventory.py.
"""

from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Optional


# ── Paths ────────────────────────────────────────────────────────────────────

SITE_ROOT = Path(__file__).resolve().parents[3]  # seo-ops/integrations/site/ → site/
APP_DIR = SITE_ROOT / "app"
CONTENT_DIR = SITE_ROOT / "lib" / "content"
DATA_DIR = SITE_ROOT / "data"
SITEMAP_PLAN = DATA_DIR / "sitemap-plan.ts"
PROJECTS_TS = CONTENT_DIR / "projects.ts"
LOCATIONS_TS = CONTENT_DIR / "gevelisolatie-locations.ts"


# ── Data class ───────────────────────────────────────────────────────────────

@dataclass
class PageRecord:
    page_id: str = ""
    route_path: str = ""
    source_file: str = ""
    page_type: str = "other"
    is_dynamic: bool = False
    is_indexable_guess: bool = True
    title_guess: str = ""
    meta_title_guess: str = ""
    meta_description_guess: str = ""
    h1_guess: str = ""
    primary_topic_guess: str = ""
    city_guess: str = ""
    service_guess: str = ""
    has_faq: bool = False
    has_schema_hint: bool = False
    has_internal_links_section: bool = False
    section_headings: str = ""
    notes: str = ""


# ── Helpers ──────────────────────────────────────────────────────────────────

def _read_text(path: Path) -> str:
    """Read file as UTF-8, return empty string on failure."""
    try:
        return path.read_text(encoding="utf-8")
    except Exception:
        return ""


def _extract_ts_string(text: str, key: str) -> str:
    """Extract a string value for a given key from TS source (simple heuristic)."""
    # Match: key: "value" or key: 'value' or key:\n  "value"
    patterns = [
        rf'{key}\s*:\s*"([^"]*)"',
        rf"{key}\s*:\s*'([^']*)'",
        rf'{key}\s*:\s*`([^`]*)`',
    ]
    for pat in patterns:
        m = re.search(pat, text)
        if m:
            return m.group(1).strip()
    return ""


def _slugify(route: str) -> str:
    """Turn a route path into a slug-like page_id."""
    s = route.strip("/")
    return s.replace("/", "__") if s else "home"


# ── Loaders ──────────────────────────────────────────────────────────────────

def load_planned_routes() -> dict[str, dict]:
    """Parse PLANNED_ROUTES from data/sitemap-plan.ts. Returns {path: {title, description, enabled}}."""
    text = _read_text(SITEMAP_PLAN)
    if not text:
        return {}

    routes = {}
    # Split by object boundaries
    blocks = re.split(r'\{\s*\n', text)
    for block in blocks[1:]:  # skip text before first {
        path = _extract_ts_string(block, "path")
        if not path:
            continue
        title = _extract_ts_string(block, "title")
        description = _extract_ts_string(block, "description")
        enabled_match = re.search(r'enabled\s*:\s*(true|false)', block)
        enabled = True
        if enabled_match:
            enabled = enabled_match.group(1) == "true"
        routes[path] = {"title": title, "description": description, "enabled": enabled}
    return routes


def load_locations() -> list[dict]:
    """Parse location objects from gevelisolatie-locations.ts."""
    text = _read_text(LOCATIONS_TS)
    if not text:
        return []

    locations = []
    # Each location block starts with { slug: "xxx"
    blocks = re.split(r'(?<=\}),?\s*\n\s*\{', text)
    for block in blocks:
        slug = _extract_ts_string(block, "slug")
        if not slug:
            continue
        city = _extract_ts_string(block, "city")
        title = _extract_ts_string(block, "title")
        description = _extract_ts_string(block, "description")
        h1 = _extract_ts_string(block, "h1")
        has_faq = "faq:" in block or "faq :" in block
        locations.append({
            "slug": slug,
            "city": city,
            "title": title,
            "description": description,
            "h1": h1,
            "has_faq": has_faq,
        })
    return locations


def load_projects() -> list[dict]:
    """Parse project cards from lib/content/projects.ts."""
    text = _read_text(PROJECTS_TS)
    if not text:
        return []

    projects = []
    # Split by each project object
    blocks = re.split(r'(?<=\}),?\s*\n\s*\{', text)
    for block in blocks:
        slug = _extract_ts_string(block, "slug")
        if not slug:
            continue
        title = _extract_ts_string(block, "title")
        city = _extract_ts_string(block, "city")
        service_type = _extract_ts_string(block, "serviceType")
        project_url = _extract_ts_string(block, "projectUrl")
        projects.append({
            "slug": slug,
            "title": title,
            "city": city,
            "service_type": service_type,
            "project_url": project_url,
        })
    return projects


def load_service_content(filename: str) -> dict:
    """Load meta + h1 from a service content file in lib/content/."""
    text = _read_text(CONTENT_DIR / filename)
    if not text:
        return {}
    title = _extract_ts_string(text, "title")
    description = _extract_ts_string(text, "description")
    slug = _extract_ts_string(text, "slug")
    h1 = _extract_ts_string(text, "h1")
    has_faq = bool(re.search(r'export\s+(const|function)\s+.*[Ff]aq', text))
    return {
        "title": title,
        "description": description,
        "slug": slug,
        "h1": h1,
        "has_faq": has_faq,
    }


def detect_page_files() -> list[dict]:
    """Walk app/ to find all page.tsx files and their route paths."""
    pages = []
    if not APP_DIR.exists():
        return pages

    for page_file in sorted(APP_DIR.rglob("page.tsx")):
        rel = page_file.relative_to(APP_DIR)
        parts = list(rel.parts[:-1])  # drop page.tsx
        route_parts = []
        is_dynamic = False
        for p in parts:
            if p.startswith("[") and p.endswith("]"):
                is_dynamic = True
                route_parts.append(p)
            else:
                route_parts.append(p)
        route = "/" + "/".join(route_parts) + "/" if route_parts else "/"

        # Read the page file for schema/faq hints
        page_text = _read_text(page_file)
        has_schema = bool(re.search(r'jsonLd|Schema|schema', page_text))
        has_faq_component = bool(re.search(r'[Ff]aq', page_text))

        pages.append({
            "source_file": str(page_file.relative_to(SITE_ROOT)).replace("\\", "/"),
            "route": route,
            "is_dynamic": is_dynamic,
            "has_schema_hint": has_schema,
            "has_faq_hint": has_faq_component,
        })
    return pages


# ── Classification ───────────────────────────────────────────────────────────

def classify_page(route: str, source_info: dict = None) -> str:
    """Classify a route into a page_type."""
    r = route.rstrip("/").lower()

    if r == "" or r == "/":
        return "home"

    if r == "/privacybeleid":
        return "legal"

    if r in ("/contact", "/over-ons"):
        return "utility"

    if r == "/diensten":
        return "service"  # service archive/overview

    if r == "/onze-werken":
        return "archive"

    if r.startswith("/onze-werken/"):
        return "project"

    # Gevelisolatie cluster
    if r == "/gevelisolatie":
        return "service"

    if r.startswith("/gevelisolatie/"):
        segment = r.replace("/gevelisolatie/", "").strip("/")
        if segment in ("kosten", "materialen", "afwerkingen", "rc-waarde-dikte", "subsidie-vergunning"):
            return "cluster"
        if segment.startswith("["):
            return "city"
        # If it's a location slug
        return "city"

    # Other top-level service pages
    if r in ("/gevel-schilderen", "/buiten-stucwerk", "/sierpleister", "/muren-stucen"):
        return "service"

    if r == "/schoonmaak-na-verbouwing":
        return "service"

    return "other"


# ── Main loader ──────────────────────────────────────────────────────────────

SERVICE_CONTENT_MAP = {
    "/gevelisolatie/": "gevelisolatie.ts",
    "/gevel-schilderen/": "gevel-schilderen.ts",
    "/buiten-stucwerk/": "buiten-stucwerk.ts",
    "/sierpleister/": "sierpleister.ts",
    "/muren-stucen/": "muren-stucen.ts",
}


def build_inventory() -> list[PageRecord]:
    """Build the full page inventory from all local sources."""
    planned = load_planned_routes()
    locations = load_locations()
    projects = load_projects()
    page_files = detect_page_files()

    # Index locations and projects by route
    loc_by_route = {f"/gevelisolatie/{loc['slug']}/": loc for loc in locations}
    proj_by_route = {}
    for proj in projects:
        url = proj.get("project_url", f"/onze-werken/{proj['slug']}/")
        proj_by_route[url] = proj

    # Load service content
    service_content = {}
    for route, filename in SERVICE_CONTENT_MAP.items():
        service_content[route] = load_service_content(filename)

    records: list[PageRecord] = []
    seen_routes: set[str] = set()

    # 1. Process detected page.tsx files (static routes)
    for pf in page_files:
        route = pf["route"]
        if pf["is_dynamic"]:
            continue  # handle dynamic routes separately
        if route in seen_routes:
            continue
        seen_routes.add(route)

        plan = planned.get(route, {})
        page_type = classify_page(route)
        is_indexable = plan.get("enabled", True) if plan else True

        rec = PageRecord(
            page_id=_slugify(route),
            route_path=route,
            source_file=pf["source_file"],
            page_type=page_type,
            is_dynamic=False,
            is_indexable_guess=is_indexable,
            has_schema_hint=pf.get("has_schema_hint", False),
        )

        # Enrich from planned routes
        if plan:
            rec.meta_title_guess = plan.get("title", "")
            rec.meta_description_guess = plan.get("description", "")

        # Enrich from service content
        if route in service_content:
            sc = service_content[route]
            if sc.get("h1"):
                rec.h1_guess = sc["h1"]
            if sc.get("title") and not rec.meta_title_guess:
                rec.meta_title_guess = sc["title"]
            if sc.get("description") and not rec.meta_description_guess:
                rec.meta_description_guess = sc["description"]
            if sc.get("has_faq"):
                rec.has_faq = True
            rec.service_guess = sc.get("slug", "")

        # Enrich FAQ from page file scan
        if pf.get("has_faq_hint") and not rec.has_faq:
            rec.has_faq = True

        # Enrich from project data
        if route in proj_by_route:
            proj = proj_by_route[route]
            rec.title_guess = proj.get("title", "")
            rec.city_guess = proj.get("city", "")
            rec.service_guess = proj.get("service_type", "")
            rec.primary_topic_guess = proj.get("service_type", "")

        # Service pages topic
        if page_type == "service":
            rec.primary_topic_guess = route.strip("/").split("/")[-1]

        # Cluster pages topic
        if page_type == "cluster":
            segment = route.replace("/gevelisolatie/", "").strip("/")
            rec.primary_topic_guess = f"gevelisolatie-{segment}"
            rec.service_guess = "gevelisolatie"

        # Home page
        if page_type == "home":
            rec.primary_topic_guess = "homepage"
            rec.h1_guess = "BM klus BV — Gevelisolatie, stucwerk en sierpleister"
            rec.has_faq = True
            rec.has_schema_hint = True

        records.append(rec)

    # 2. Expand dynamic location pages
    for loc in locations:
        route = f"/gevelisolatie/{loc['slug']}/"
        if route in seen_routes:
            continue
        seen_routes.add(route)

        plan = planned.get(route, {})
        rec = PageRecord(
            page_id=_slugify(route),
            route_path=route,
            source_file="app/gevelisolatie/[location]/page.tsx",
            page_type="city",
            is_dynamic=True,
            is_indexable_guess=True,
            title_guess=loc.get("title", ""),
            meta_title_guess=loc.get("title", ""),
            meta_description_guess=loc.get("description", ""),
            h1_guess=loc.get("h1", ""),
            primary_topic_guess="gevelisolatie",
            city_guess=loc.get("city", ""),
            service_guess="gevelisolatie",
            has_faq=loc.get("has_faq", False),
            has_schema_hint=True,  # location pages use localBusinessSchema + serviceSchema
        )

        # Override from planned routes if available
        if plan and plan.get("title"):
            rec.meta_title_guess = plan["title"]
        if plan and plan.get("description"):
            rec.meta_description_guess = plan["description"]

        records.append(rec)

    # 3. Check for planned routes not yet detected (disabled or future)
    for route, plan in planned.items():
        if route in seen_routes:
            continue
        if not plan.get("enabled", True):
            seen_routes.add(route)
            rec = PageRecord(
                page_id=_slugify(route),
                route_path=route,
                source_file="",
                page_type=classify_page(route),
                is_dynamic=False,
                is_indexable_guess=False,
                meta_title_guess=plan.get("title", ""),
                meta_description_guess=plan.get("description", ""),
                notes="disabled in sitemap-plan.ts",
            )
            records.append(rec)

    # Sort by route_path for stable output
    records.sort(key=lambda r: r.route_path)
    return records


if __name__ == "__main__":
    inventory = build_inventory()
    print(f"Loaded {len(inventory)} pages")
    for rec in inventory:
        print(f"  {rec.page_type:8s}  {rec.route_path}")
