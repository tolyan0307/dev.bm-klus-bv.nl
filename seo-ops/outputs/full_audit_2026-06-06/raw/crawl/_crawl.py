"""READ-ONLY technical crawl of all 52 sitemap URLs for the 2026-06-06 audit."""
from __future__ import annotations
import json, re, time, urllib.request, urllib.error
from html import unescape
from pathlib import Path

OUT = Path("D:/projects/bmklus/v0-site/site/seo-ops/outputs/full_audit_2026-06-06/raw/crawl")
UA = {"User-Agent": "Mozilla/5.0 (audit read-only) bmklus-seo-ops"}

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    try:
        r = urllib.request.urlopen(req, timeout=25)
        return r.getcode(), r.geturl(), r.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, url, ""
    except Exception as e:
        return None, url, f"__ERR__{type(e).__name__}: {e}"

def first(pat, html, flags=re.I|re.S):
    m = re.search(pat, html, flags); return m.group(1).strip() if m else None

def alltext(pat, html, flags=re.I|re.S):
    return [m.strip() for m in re.findall(pat, html, flags)]

def analyze(url, html):
    title = first(r"<title[^>]*>(.*?)</title>", html)
    title = unescape(title) if title else None
    desc = first(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', html) \
        or first(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']', html)
    desc = unescape(desc) if desc else None
    canonical = first(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', html)
    robots = first(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'](.*?)["\']', html)
    h1 = [unescape(re.sub("<[^>]+>","",x)).strip() for x in alltext(r"<h1[^>]*>(.*?)</h1>", html)]
    h2 = [unescape(re.sub("<[^>]+>","",x)).strip() for x in alltext(r"<h2[^>]*>(.*?)</h2>", html)]
    # JSON-LD types
    ld_types = set()
    faq_questions = 0
    for block in alltext(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html):
        ld_types.update(re.findall(r'"@type"\s*:\s*"([^"]+)"', block))
        faq_questions += len(re.findall(r'"@type"\s*:\s*"Question"', block))
    # body word count (strip scripts/styles/tags)
    body = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.I|re.S)
    text = re.sub(r"<[^>]+>", " ", body)
    words = len(re.findall(r"\w+", text))
    # links
    links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html, re.I)
    internal = [l for l in links if l.startswith("/") or "bm-klus-bv.nl" in l]
    # images / alt
    imgs = re.findall(r"<img\b[^>]*>", html, re.I)
    no_alt = [t for t in imgs if not re.search(r'\balt=["\'][^"\']+["\']', t, re.I)]
    img_srcs = [first(r'src=["\'](.*?)["\']', t) for t in imgs]
    path = re.sub(r"^https?://[^/]+", "", url)
    if path == "/" or path == "": cat = "homepage"
    elif path.startswith("/onze-werken/") and path != "/onze-werken/": cat = "project"
    elif re.match(r"^/gevelisolatie/[a-z-]+/$", path) and path not in ("/gevelisolatie/kosten/","/gevelisolatie/materialen/","/gevelisolatie/afwerkingen/","/gevelisolatie/rc-waarde-dikte/","/gevelisolatie/subsidie-vergunning/"): cat = "city"
    elif path in ("/gevelisolatie/","/gevel-schilderen/","/buiten-stucwerk/","/sierpleister/","/muren-stucen/"): cat = "money"
    elif path.startswith("/gevelisolatie/"): cat = "cluster"
    else: cat = "other"
    return {
        "url": url, "path": path, "category": cat,
        "title": title, "title_len": len(title) if title else 0,
        "meta_description": desc, "desc_len": len(desc) if desc else 0,
        "canonical": canonical, "robots": robots,
        "h1": h1, "h1_count": len(h1), "h2_count": len(h2),
        "schema_types": sorted(ld_types), "faq_questions": faq_questions,
        "word_count": words,
        "internal_links": len(internal), "total_links": len(links),
        "img_count": len(imgs), "img_missing_alt": len(no_alt),
        "img_srcs": img_srcs,
        "has_form_endpoint": "wp-json/bm/v1/contact" in html or "Versturen" in html,
        "has_tel": "tel:+31612079808" in html,
        "has_whatsapp": "wa.me/31612079808" in html,
    }

# load URLs from sitemap
import urllib.request as ur
sm = ur.urlopen(ur.Request("https://bm-klus-bv.nl/sitemap.xml", headers=UA), timeout=20).read().decode("utf-8","ignore")
URLS = re.findall(r"<loc>(.*?)</loc>", sm)
print(f"Crawling {len(URLS)} URLs")
rows = []
for u in URLS:
    code, final, html = fetch(u)
    if html.startswith("__ERR__"):
        rows.append({"url": u, "status": code, "error": html}); print(f"  ERR {u}"); continue
    rec = analyze(final, html)
    rec["status"] = code; rec["final_url"] = final; rec["redirected"] = (final != u)
    rows.append(rec)
    print(f"  {code} {rec['category']:<8} t={rec['title_len']:<3} d={rec['desc_len']:<3} h1={rec['h1_count']} faq={rec['faq_questions']} w={rec['word_count']} alt_miss={rec['img_missing_alt']}  {rec['path']}")
    time.sleep(0.25)

(OUT/"crawl_full.json").write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"\nsaved crawl_full.json ({len(rows)} pages)")
