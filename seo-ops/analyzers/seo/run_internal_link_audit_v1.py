"""
run_internal_link_audit_v1.py

READ-ONLY internal linking + broken link audit for bm-klus-bv.nl.
Crawls all sitemap URLs on the live site, builds the internal link graph,
and reports: orphan pages, dead ends, weak anchor text, broken internal
links, redirected link targets, over-linked pages, dead external links.

Method notes:
    - "Template" links (nav/footer/breadcrumb) are separated from
      "contextual" (in-body) links heuristically: a (target, anchor) pair
      that appears on >= TEMPLATE_SHARE of all pages is template.
      Orphan/dead-end verdicts use contextual links only — a page reachable
      only through sitewide nav still counts as an orphan for link equity.
    - stdlib only (urllib), same crawl pattern as the 2026-06-06 audit crawl.

Usage (from site/ root):
    python seo-ops/analyzers/seo/run_internal_link_audit_v1.py
    python seo-ops/analyzers/seo/run_internal_link_audit_v1.py --skip-external
    python seo-ops/analyzers/seo/run_internal_link_audit_v1.py --max-external 30

Outputs:
    seo-ops/snapshots/raw/crawl/internal_link_audit_v1_raw.json
    seo-ops/snapshots/normalized/seo/internal_link_graph_v1.json
    seo-ops/reports/seo/internal_link_audit_v1_{date}.md
    seo-ops/outputs/internal_link_audit_v1.json

Cost: free (own-site HTTP crawl, ~55 pages + link target checks).
"""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html import unescape
from pathlib import Path

SEO_OPS = Path(__file__).resolve().parents[2]
RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "crawl" / "internal_link_audit_v1_raw.json"
NORM_OUTPUT = SEO_OPS / "snapshots" / "normalized" / "seo" / "internal_link_graph_v1.json"
OUTPUT_JSON = SEO_OPS / "outputs" / "internal_link_audit_v1.json"

SITE = "https://bm-klus-bv.nl"
OWN_HOSTS = ("bm-klus-bv.nl", "www.bm-klus-bv.nl")
UA = {"User-Agent": "Mozilla/5.0 (audit read-only) bmklus-seo-ops internal-link-audit"}

CRAWL_DELAY_S = 0.25
TEMPLATE_SHARE = 0.8   # (target, anchor) on >= 80% of pages => template link
OVERLINK_THRESHOLD = 100
WEAK_ANCHORS = {
    "lees meer", "lees verder", "klik hier", "hier", "meer info",
    "meer informatie", "bekijk", "link", "meer", "read more", "click here",
}
MAX_EXTERNAL_CHECKS = 50


def _fix_console_encoding():
    if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
        sys.stdout = io.TextIOWrapper(
            sys.stdout.buffer, encoding="utf-8", errors="replace", line_buffering=True
        )
    if sys.stderr.encoding and sys.stderr.encoding.lower() not in ("utf-8", "utf8"):
        sys.stderr = io.TextIOWrapper(
            sys.stderr.buffer, encoding="utf-8", errors="replace", line_buffering=True
        )


# ---------------------------------------------------------------------------
# Fetching
# ---------------------------------------------------------------------------
def fetch(url: str, timeout: int = 25) -> tuple[int | None, str, str]:
    """Return (status, final_url, html_or_error)."""
    req = urllib.request.Request(url, headers=UA)
    try:
        r = urllib.request.urlopen(req, timeout=timeout)
        return r.getcode(), r.geturl(), r.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, url, ""
    except Exception as e:
        return None, url, f"__ERR__{type(e).__name__}: {e}"


def fetch_status(url: str, timeout: int = 12) -> tuple[int | None, str]:
    """Return (status, final_url) without keeping the body. Follows redirects."""
    req = urllib.request.Request(url, headers=UA)
    try:
        r = urllib.request.urlopen(req, timeout=timeout)
        r.read(0)
        return r.getcode(), r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, url
    except Exception:
        return None, url


# ---------------------------------------------------------------------------
# Link extraction / normalization
# ---------------------------------------------------------------------------
A_TAG_RE = re.compile(r"<a\b([^>]*)>(.*?)</a>", re.I | re.S)
HREF_RE = re.compile(r'href\s*=\s*["\']([^"\']*)["\']', re.I)


def strip_tags(fragment: str) -> str:
    text = re.sub(r"<[^>]+>", " ", fragment)
    return re.sub(r"\s+", " ", unescape(text)).strip()


def normalize_internal(href: str) -> str | None:
    """Normalize an internal href to a canonical path. None if not internal."""
    href = href.strip()
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    if href.startswith("http://") or href.startswith("https://"):
        m = re.match(r"https?://([^/]+)(/.*)?$", href)
        if not m or m.group(1).lower() not in OWN_HOSTS:
            return None
        path = m.group(2) or "/"
    elif href.startswith("/"):
        path = href
    else:
        return None  # relative links are not used on this site
    path = path.split("#", 1)[0].split("?", 1)[0]
    if not path:
        path = "/"
    # canonical style on this site: trailing slash for routes (no file extension)
    last = path.rsplit("/", 1)[-1]
    if path != "/" and "." not in last and not path.endswith("/"):
        path += "/"
    return path


def extract_links(html: str) -> list[dict]:
    """All <a> links on a page with raw href + visible anchor text."""
    links = []
    for attrs, inner in A_TAG_RE.findall(html):
        m = HREF_RE.search(attrs)
        if not m:
            continue
        href = m.group(1).strip()
        anchor = strip_tags(inner)
        if not anchor:
            # image-only or icon link: try aria-label
            lab = re.search(r'aria-label\s*=\s*["\']([^"\']+)["\']', attrs, re.I)
            anchor = (lab.group(1).strip() if lab else "") or "[no text]"
        internal = normalize_internal(href)
        if internal is not None:
            kind = "internal"
        elif href.startswith(("mailto:", "tel:")) or "wa.me/" in href:
            kind = "cta"
        elif href.startswith(("http://", "https://")):
            kind = "external"
        else:
            kind = "other"
        links.append({"href": href, "target": internal, "anchor": anchor, "kind": kind})
    return links


# ---------------------------------------------------------------------------
# Crawl
# ---------------------------------------------------------------------------
def load_sitemap_paths() -> list[str]:
    code, _, xml = fetch(f"{SITE}/sitemap.xml")
    if code != 200:
        print(f"FAIL: sitemap.xml returned {code}", file=sys.stderr)
        sys.exit(1)
    urls = re.findall(r"<loc>(.*?)</loc>", xml)
    paths = []
    for u in urls:
        p = normalize_internal(u)
        if p:
            paths.append(p)
    return sorted(set(paths))


def crawl(paths: list[str]) -> dict[str, dict]:
    pages: dict[str, dict] = {}
    for i, path in enumerate(paths, 1):
        url = SITE + path
        code, final, html = fetch(url)
        if html.startswith("__ERR__") or code != 200:
            pages[path] = {"status": code, "final_url": final, "error": html[:200] or f"HTTP {code}", "links": []}
            print(f"  [{i}/{len(paths)}] ERR {code} {path}")
        else:
            links = extract_links(html)
            pages[path] = {
                "status": code,
                "final_url": final,
                "redirected": normalize_internal(final) != path,
                "error": None,
                "links": links,
            }
            n_int = sum(1 for l in links if l["kind"] == "internal")
            print(f"  [{i}/{len(paths)}] {code} links={len(links)} int={n_int} {path}")
        time.sleep(CRAWL_DELAY_S)
    return pages


# ---------------------------------------------------------------------------
# Graph analysis
# ---------------------------------------------------------------------------
def build_graph(pages: dict[str, dict]) -> dict:
    total_pages = sum(1 for p in pages.values() if not p.get("error"))

    # Template detection: (target, anchor) pairs by number of distinct source pages
    pair_sources: dict[tuple[str, str], set[str]] = {}
    for src, page in pages.items():
        if page.get("error"):
            continue
        seen_pairs = set()
        for l in page["links"]:
            if l["kind"] != "internal":
                continue
            key = (l["target"], l["anchor"].lower())
            if key in seen_pairs:
                continue
            seen_pairs.add(key)
            pair_sources.setdefault(key, set()).add(src)
    template_pairs = {
        key for key, sources in pair_sources.items()
        if total_pages and len(sources) / total_pages >= TEMPLATE_SHARE
    }

    inlinks: dict[str, dict] = {p: {"contextual": [], "template": 0} for p in pages}
    outlinks: dict[str, dict] = {}
    all_internal_targets: set[str] = set()

    for src, page in pages.items():
        ctx_out, tpl_out = [], 0
        if not page.get("error"):
            for l in page["links"]:
                if l["kind"] != "internal":
                    continue
                target, anchor = l["target"], l["anchor"]
                all_internal_targets.add(target)
                is_template = (target, anchor.lower()) in template_pairs
                if target == src:
                    continue  # self-link (logo on homepage etc.)
                if is_template:
                    tpl_out += 1
                    if target in inlinks:
                        inlinks[target]["template"] += 1
                else:
                    ctx_out.append({"target": target, "anchor": anchor})
                    inlinks.setdefault(target, {"contextual": [], "template": 0})
                    inlinks[target]["contextual"].append({"source": src, "anchor": anchor})
        outlinks[src] = {
            "contextual": ctx_out,
            "template_count": tpl_out,
            "total_links_on_page": len(page.get("links", [])),
        }

    return {
        "total_pages": total_pages,
        "template_pairs": sorted(f"{t} | {a}" for t, a in template_pairs),
        "inlinks": inlinks,
        "outlinks": outlinks,
        "all_internal_targets": sorted(all_internal_targets),
    }


def find_issues(pages: dict[str, dict], graph: dict, external_results: dict[str, dict],
                internal_target_status: dict[str, dict]) -> dict:
    sitemap_paths = set(pages.keys())

    orphans_hard, orphans_contextual, dead_ends, weak_anchors, overlinked = [], [], [], [], []

    for path in sorted(sitemap_paths):
        if pages[path].get("error"):
            continue
        inl = graph["inlinks"].get(path, {"contextual": [], "template": 0})
        outl = graph["outlinks"].get(path, {})
        ctx_in = len(inl["contextual"])
        if ctx_in == 0 and inl["template"] == 0 and path != "/":
            orphans_hard.append({"page": path})
        elif ctx_in == 0 and path != "/":
            orphans_contextual.append({"page": path, "template_inlinks": inl["template"]})
        if not outl.get("contextual"):
            dead_ends.append({"page": path, "template_outlinks": outl.get("template_count", 0)})
        if outl.get("total_links_on_page", 0) > OVERLINK_THRESHOLD:
            overlinked.append({"page": path, "total_links": outl["total_links_on_page"]})

    for src, page in pages.items():
        if page.get("error"):
            continue
        for l in page["links"]:
            if l["kind"] == "internal" and l["anchor"].lower().strip() in WEAK_ANCHORS:
                weak_anchors.append({"source": src, "target": l["target"], "anchor": l["anchor"]})

    # Broken / redirected internal link targets
    broken_internal, redirected_internal = [], []
    for target, info in sorted(internal_target_status.items()):
        status = info.get("status")
        sources = info.get("sources", [])
        if status in (404, 410) or status is None:
            broken_internal.append({"target": target, "status": status, "linked_from": sources[:10]})
        elif info.get("redirected_to") and info["redirected_to"] != target:
            redirected_internal.append({
                "target": target, "final": info["redirected_to"], "linked_from": sources[:10],
            })

    # 403/429/999 are typically bot-protection (LinkedIn, Instagram, some gov sites):
    # verified manually 2026-09-03 that such URLs open fine in a browser.
    BOT_BLOCK_STATUSES = {403, 429, 999}
    broken_external, blocked_external = [], []
    for url, info in sorted(external_results.items()):
        if not info.get("checked"):
            continue
        status = info.get("status")
        row = {"url": url, "status": status, "linked_from": info.get("sources", [])[:5]}
        if status in BOT_BLOCK_STATUSES:
            blocked_external.append(row)
        elif status is None or status >= 400:
            broken_external.append(row)

    return {
        "orphans_hard": orphans_hard,
        "orphans_contextual": orphans_contextual,
        "dead_ends": dead_ends,
        "weak_anchors": weak_anchors,
        "overlinked": overlinked,
        "broken_internal": broken_internal,
        "redirected_internal": redirected_internal,
        "broken_external": broken_external,
        "blocked_external": blocked_external,
    }


# ---------------------------------------------------------------------------
# Target checks
# ---------------------------------------------------------------------------
def check_internal_targets(pages: dict[str, dict], graph: dict) -> dict[str, dict]:
    """Status of every linked internal target that is NOT a crawled 200 page."""
    sitemap_paths = set(pages.keys())
    target_sources: dict[str, list[str]] = {}
    for src, page in pages.items():
        if page.get("error"):
            continue
        for l in page["links"]:
            if l["kind"] == "internal":
                target_sources.setdefault(l["target"], []).append(src)

    results: dict[str, dict] = {}
    to_check = [t for t in target_sources if t not in sitemap_paths]
    # linked targets inside sitemap already have crawl status
    for t, sources in target_sources.items():
        if t in sitemap_paths:
            page = pages[t]
            results[t] = {
                "status": page.get("status"),
                "redirected_to": normalize_internal(page.get("final_url") or "") if page.get("redirected") else None,
                "sources": sorted(set(sources)),
                "in_sitemap": True,
            }
    print(f"  Internal link targets outside sitemap: {len(to_check)}")
    for t in sorted(to_check):
        status, final = fetch_status(SITE + t)
        results[t] = {
            "status": status,
            "redirected_to": normalize_internal(final) if final else None,
            "sources": sorted(set(target_sources[t])),
            "in_sitemap": False,
        }
        print(f"    {status} {t}")
        time.sleep(CRAWL_DELAY_S)
    return results


def check_external_links(pages: dict[str, dict], max_checks: int) -> dict[str, dict]:
    ext_sources: dict[str, list[str]] = {}
    for src, page in pages.items():
        if page.get("error"):
            continue
        for l in page["links"]:
            if l["kind"] == "external":
                ext_sources.setdefault(l["href"], []).append(src)
    results: dict[str, dict] = {}
    urls = sorted(ext_sources.keys())
    print(f"  Unique external links: {len(urls)} (checking up to {max_checks})")
    for url in urls[:max_checks]:
        status, _ = fetch_status(url)
        results[url] = {"status": status, "sources": sorted(set(ext_sources[url])), "checked": True}
        print(f"    {status} {url[:90]}")
        time.sleep(0.15)
    for url in urls[max_checks:]:
        results[url] = {"status": None, "sources": sorted(set(ext_sources[url])), "checked": False}
    return results


# ---------------------------------------------------------------------------
# Outputs
# ---------------------------------------------------------------------------
def write_report(issues: dict, graph: dict, pages: dict, ts: str, date_tag: str,
                 external_checked: int, external_total: int) -> Path:
    report_path = SEO_OPS / "reports" / "seo" / f"internal_link_audit_v1_{date_tag}.md"
    L = []
    L.append("# Internal Link Audit v1\n")
    L.append(f"**Generated:** {ts}")
    L.append("**Report mode:** preliminary")
    L.append("**Generator:** `run_internal_link_audit_v1.py`")
    L.append(f"**Pages crawled:** {graph['total_pages']} `[live crawl, sitemap.xml]`")
    L.append(f"**External links checked:** {external_checked}/{external_total}")
    L.append("")
    L.append("## Provenance\n")
    L.append(f"- **Generated:** {ts}")
    L.append("- **Report mode:** preliminary")
    L.append("- **Generator:** run_internal_link_audit_v1.py")
    L.append("- **Workflow:** internal_link_audit_v1")
    L.append("- **Primary truth:** live read-only HTTP crawl of https://bm-klus-bv.nl (sitemap.xml pages + linked targets)")
    L.append("- **Live API calls:** none (own-site HTTP crawl only, free)")
    L.append("- **Known limitations:** template/contextual split is heuristic; regex HTML parsing; crawls deployed site, not local tree")
    L.append("")
    L.append("## Method\n")
    L.append(f"- Template links = (target, anchor) pairs present on >= {int(TEMPLATE_SHARE*100)}% of pages (nav/footer/breadcrumb).")
    L.append("- Orphan/dead-end verdicts count **contextual (in-body) links only** — sitewide nav does not pass topical link equity.")
    L.append("- All data from a live read-only crawl; no site changes made.")
    L.append("")

    L.append("## Summary\n")
    L.append("| Issue | Count |")
    L.append("|-------|-------|")
    L.append(f"| Hard orphans (zero inlinks incl. nav) | {len(issues['orphans_hard'])} |")
    L.append(f"| Contextual orphans (nav-only inlinks) | {len(issues['orphans_contextual'])} |")
    L.append(f"| Dead ends (no contextual outlinks) | {len(issues['dead_ends'])} |")
    L.append(f"| Broken internal link targets | {len(issues['broken_internal'])} |")
    L.append(f"| Internal links hitting redirects | {len(issues['redirected_internal'])} |")
    L.append(f"| Weak anchor texts | {len(issues['weak_anchors'])} |")
    L.append(f"| Over-linked pages (>{OVERLINK_THRESHOLD} links) | {len(issues['overlinked'])} |")
    L.append(f"| Broken external links | {len(issues['broken_external'])} |")
    L.append(f"| External links unverifiable (bot protection) | {len(issues.get('blocked_external', []))} |")
    L.append("")

    def section(title, rows, header, fmt):
        L.append(f"## {title}\n")
        if not rows:
            L.append("None found.\n")
            return
        L.append(header)
        L.append("|" + "|".join(["---"] * (header.count("|") - 1)) + "|")
        for r in rows:
            L.append(fmt(r))
        L.append("")

    section("Hard orphans", issues["orphans_hard"],
            "| Page |", lambda r: f"| {r['page']} |")
    section("Contextual orphans (reachable only via nav/footer)", issues["orphans_contextual"],
            "| Page | Template inlinks |",
            lambda r: f"| {r['page']} | {r['template_inlinks']} |")
    section("Dead ends (no in-body outlinks)", issues["dead_ends"],
            "| Page | Template outlinks |",
            lambda r: f"| {r['page']} | {r['template_outlinks']} |")
    section("Broken internal link targets", issues["broken_internal"],
            "| Target | Status | Linked from |",
            lambda r: f"| {r['target']} | {r['status']} | {', '.join(r['linked_from'])} |")
    section("Internal links hitting redirects (update link to final URL)", issues["redirected_internal"],
            "| Linked target | Redirects to | Linked from |",
            lambda r: f"| {r['target']} | {r['final']} | {', '.join(r['linked_from'])} |")
    section("Weak anchor texts", issues["weak_anchors"],
            "| Source | Target | Anchor |",
            lambda r: f"| {r['source']} | {r['target']} | {r['anchor']} |")
    section("Over-linked pages", issues["overlinked"],
            "| Page | Total links |",
            lambda r: f"| {r['page']} | {r['total_links']} |")
    section("Broken external links", issues["broken_external"],
            "| URL | Status | Linked from |",
            lambda r: f"| {r['url'][:80]} | {r['status']} | {', '.join(r['linked_from'])} |")
    section("External links unverifiable (bot protection — likely fine in a browser)", issues.get("blocked_external", []),
            "| URL | Status | Linked from |",
            lambda r: f"| {r['url'][:80]} | {r['status']} | {', '.join(r['linked_from'])} |")

    # Contextual inlink distribution
    L.append("## Contextual inlinks per page\n")
    L.append("| Page | Contextual in | Template in | Contextual out |")
    L.append("|------|---------------|-------------|----------------|")
    rows = []
    for path in pages:
        if pages[path].get("error"):
            continue
        inl = graph["inlinks"].get(path, {"contextual": [], "template": 0})
        outl = graph["outlinks"].get(path, {})
        rows.append((len(inl["contextual"]), inl["template"], len(outl.get("contextual", [])), path))
    for cin, tin, cout, path in sorted(rows):
        L.append(f"| {path} | {cin} | {tin} | {cout} |")
    L.append("")

    L.append("## Limitations\n")
    L.append("1. Template detection is heuristic (share threshold), a sitewide contextual block would be misclassified as template.")
    L.append("2. Anchor extraction is regex-based; JS-injected links are not seen (site is static export, impact low).")
    L.append(f"3. External checks capped at {MAX_EXTERNAL_CHECKS} unique URLs per run.")
    L.append("4. Point-in-time crawl of the live site; local uncommitted changes are not reflected.")
    L.append("")
    L.append(f"---\n_Generated by `run_internal_link_audit_v1.py` at {ts}_")

    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(L), encoding="utf-8")
    print(f"  Report: {report_path}")
    return report_path


def main():
    _fix_console_encoding()
    parser = argparse.ArgumentParser(description="Internal link + broken link audit (live crawl)")
    parser.add_argument("--skip-external", action="store_true", help="Skip external link status checks")
    parser.add_argument("--max-external", type=int, default=MAX_EXTERNAL_CHECKS,
                        help=f"Max unique external URLs to check (default {MAX_EXTERNAL_CHECKS})")
    args = parser.parse_args()

    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")
    date_tag = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    print("\n=== Internal Link Audit v1 ===")
    print("  Loading sitemap...")
    paths = load_sitemap_paths()
    print(f"  Sitemap URLs: {len(paths)}\n  Crawling...")
    pages = crawl(paths)

    print("\n  Building link graph...")
    graph = build_graph(pages)
    print(f"  Template link pairs: {len(graph['template_pairs'])}")

    print("\n  Checking internal link targets...")
    internal_target_status = check_internal_targets(pages, graph)

    if args.skip_external:
        external_results = {}
    else:
        print("\n  Checking external links...")
        external_results = check_external_links(pages, args.max_external)
    ext_checked = sum(1 for v in external_results.values() if v.get("checked"))

    issues = find_issues(pages, graph, external_results, internal_target_status)

    print("\n  Writing outputs...")
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    RAW_SNAPSHOT.write_text(json.dumps(
        {"generated": ts, "pages": pages, "internal_target_status": internal_target_status,
         "external_results": external_results},
        indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Raw snapshot: {RAW_SNAPSHOT}")

    NORM_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    NORM_OUTPUT.write_text(json.dumps(
        {"generated": ts, "graph": {
            "total_pages": graph["total_pages"],
            "template_pairs": graph["template_pairs"],
            "inlinks": graph["inlinks"],
            "outlinks": graph["outlinks"],
        }}, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Normalized graph: {NORM_OUTPUT}")

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(
        {"_meta": {"generated": ts, "generator": "run_internal_link_audit_v1.py",
                   "pages_crawled": graph["total_pages"],
                   "external_checked": ext_checked,
                   "external_total": len(external_results)},
         "issues": issues}, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  JSON output: {OUTPUT_JSON}")

    write_report(issues, graph, pages, ts, date_tag, ext_checked, len(external_results))

    print("\n=== Done ===")
    print(f"  Pages: {graph['total_pages']}")
    print(f"  Hard orphans: {len(issues['orphans_hard'])} | contextual orphans: {len(issues['orphans_contextual'])}")
    print(f"  Dead ends: {len(issues['dead_ends'])}")
    print(f"  Broken internal: {len(issues['broken_internal'])} | redirect-hitting links: {len(issues['redirected_internal'])}")
    print(f"  Weak anchors: {len(issues['weak_anchors'])} | broken external: {len(issues['broken_external'])}")


if __name__ == "__main__":
    main()
