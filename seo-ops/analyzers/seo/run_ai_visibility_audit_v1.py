"""
run_ai_visibility_audit_v1.py

AI visibility (GEO/AEO) audit for BM klus BV: submits realistic Dutch
consumer prompts to LLMs via the DataForSEO AI Optimization API
(LLM Responses, live) and reports whether the brand is mentioned,
which domains get cited, and who is recommended instead.

Source discipline: this is [DataForSEO enrichment] — directional evidence
about LLM answer behavior at a point in time. LLM answers are stochastic;
a single run is a sample, not a measurement.

Usage (from seo-ops/):
    integrations/.venv/Scripts/python analyzers/seo/run_ai_visibility_audit_v1.py --dry-run
    integrations/.venv/Scripts/python analyzers/seo/run_ai_visibility_audit_v1.py
    integrations/.venv/Scripts/python analyzers/seo/run_ai_visibility_audit_v1.py --provider perplexity
    integrations/.venv/Scripts/python analyzers/seo/run_ai_visibility_audit_v1.py --no-web-search
    integrations/.venv/Scripts/python analyzers/seo/run_ai_visibility_audit_v1.py --list-models

Outputs:
    snapshots/raw/dataforseo/ai_visibility_audit_v1_raw.json
    snapshots/normalized/dataforseo/ai_visibility_v1.json
    reports/dataforseo/ai_visibility_audit_v1_{date}.md
    outputs/ai_visibility_audit_v1.json

Cost guardrail:
    Base $0.0006/request + LLM provider fee (+ web search fee if enabled).
    Default: 5 prompts, one provider => well under $0.25/run with a mini model.
    HARD_LIMIT caps prompts per run. Actual cost recorded via cost_tracker.
"""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

SEO_OPS = Path(__file__).resolve().parents[2]
INTEGRATIONS = SEO_OPS / "integrations"
sys.path.insert(0, str(INTEGRATIONS))

RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "ai_visibility_audit_v1_raw.json"
NORM_OUTPUT = SEO_OPS / "snapshots" / "normalized" / "dataforseo" / "ai_visibility_v1.json"
OUTPUT_JSON = SEO_OPS / "outputs" / "ai_visibility_audit_v1.json"

# Realistic Dutch consumer prompts (service x geography of BM klus)
DEFAULT_PROMPTS = [
    "Welk bedrijf kun je aanraden voor gevelisolatie in Rotterdam?",
    "Ik zoek een goede stukadoor voor mijn buitenmuur in Rotterdam, wie raad je aan?",
    "Beste bedrijf voor buitengevelisolatie in Zuid-Holland?",
    "Wie kan mijn gevel isoleren en afwerken met sierpleister in de omgeving van Rotterdam?",
    "Wat kost gevelisolatie en welk bedrijf in Rotterdam is betrouwbaar?",
]

BRAND_TOKENS = ["bm klus", "bm-klus", "bmklus", "bm-klus-bv"]
OWN_DOMAIN = "bm-klus-bv.nl"

PROVIDERS = {
    "chat_gpt": {"default_model": "gpt-4.1-mini", "web_search": True},
    "perplexity": {"default_model": "sonar", "web_search": True},   # perplexity always searches
    "gemini": {"default_model": "gemini-2.5-flash", "web_search": True},
    "claude": {"default_model": "claude-3-5-haiku-20241022", "web_search": True},
}

HARD_LIMIT = 8          # max prompts per run
MAX_OUTPUT_TOKENS = 1024
TEMPERATURE = 0.3       # lower randomness => more reproducible sample
EST_COST_PER_CALL = 0.03  # observed 2026-09-03: ~$0.029/call (gpt-4.1-mini + web search)


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
# API
# ---------------------------------------------------------------------------
def list_models(provider: str) -> list[str]:
    from dataforseo.client import DataForSEOClient
    client = DataForSEOClient()
    resp = client.get(f"/ai_optimization/{provider}/llm_responses/models")
    models = []
    for task in resp.get("tasks", []):
        for result in task.get("result") or []:
            name = result.get("model_name") or result.get("name")
            if name:
                models.append(name)
            for item in result.get("items") or []:
                name = item.get("model_name") or item.get("name")
                if name:
                    models.append(name)
    return sorted(set(models))


def ask_llm(provider: str, model: str, prompt: str, web_search: bool) -> dict:
    from dataforseo.client import DataForSEOClient
    client = DataForSEOClient()
    task: dict = {
        "user_prompt": prompt,
        "model_name": model,
        "max_output_tokens": MAX_OUTPUT_TOKENS,
        "temperature": TEMPERATURE,
        "tag": "ai_visibility_audit_v1",
    }
    if web_search:
        task["web_search"] = True
        task["web_search_country_iso_code"] = "NL"
    return client.post(f"/ai_optimization/{provider}/llm_responses/live", payload=[task])


# ---------------------------------------------------------------------------
# Normalization / analysis
# ---------------------------------------------------------------------------
def extract_answer(resp: dict) -> dict:
    """Pull text, citations and spend out of a raw LLM Responses payload."""
    out = {"text": "", "citations": [], "money_spent": None, "model": None,
           "task_status": None, "task_error": None}
    tasks = resp.get("tasks") or []
    if not tasks:
        out["task_error"] = "no tasks in response"
        return out
    task = tasks[0]
    out["task_status"] = task.get("status_code")
    if task.get("status_code") and task["status_code"] >= 40000:
        out["task_error"] = task.get("status_message")
        return out
    results = task.get("result") or []
    if not results:
        out["task_error"] = "empty result"
        return out
    result = results[0]
    out["money_spent"] = result.get("money_spent")
    out["model"] = result.get("model_name")
    texts, cites = [], []
    for item in result.get("items") or []:
        for section in item.get("sections") or []:
            if section.get("text"):
                texts.append(section["text"])
            for ann in section.get("annotations") or []:
                url = ann.get("url") or ann.get("source")
                title = ann.get("title")
                if url:
                    cites.append({"url": url, "title": title})
    out["text"] = "\n".join(texts)
    # dedupe citations by url
    seen = set()
    out["citations"] = [c for c in cites if not (c["url"] in seen or seen.add(c["url"]))]
    return out


def domain_of(url: str) -> str:
    m = re.match(r"https?://(?:www\.)?([^/]+)", url or "")
    return m.group(1).lower() if m else ""


def analyze_answer(answer: dict, prompt: str) -> dict:
    text_l = (answer["text"] or "").lower()
    brand_in_text = any(tok in text_l for tok in BRAND_TOKENS)
    cited_domains = sorted({domain_of(c["url"]) for c in answer["citations"] if c.get("url")})
    brand_cited = any(OWN_DOMAIN in d for d in cited_domains)
    # crude extraction of recommended company names: capitalized phrases before "B.V." + cited domains
    bv_names = re.findall(r"([A-Z][\w&'.-]*(?:\s+[A-Z][\w&'.-]*){0,3})\s+B\.?V\.?", answer["text"] or "")
    return {
        "prompt": prompt,
        "brand_mentioned_in_text": brand_in_text,
        "brand_cited_as_source": brand_cited,
        "cited_domains": cited_domains,
        "companies_named_bv": sorted(set(n.strip() for n in bv_names)),
        "answer_chars": len(answer["text"] or ""),
        "money_spent_usd": answer["money_spent"],
        "error": answer["task_error"],
    }


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
def write_report(findings: list[dict], answers: list[dict], meta: dict, ts: str, date_tag: str) -> Path:
    path = SEO_OPS / "reports" / "dataforseo" / f"ai_visibility_audit_v1_{date_tag}.md"
    L = []
    L.append("# AI Visibility Audit v1 (LLM Responses)\n")
    L.append(f"**Generated:** {ts}")
    L.append("**Report mode:** enrichment_only")
    L.append("**Generator:** `run_ai_visibility_audit_v1.py`")
    L.append(f"**Provider / model:** {meta['provider']} / {meta['model']} `[DataForSEO enrichment]`")
    L.append(f"**Web search:** {'on (NL)' if meta['web_search'] else 'off (training-data only)'}")
    L.append(f"**Prompts:** {meta['prompt_count']}")
    L.append(f"**Actual API spend this run:** ${meta['actual_cost_usd']:.4f}" if meta.get("actual_cost_usd") is not None else "**Actual API spend this run:** n/a")
    L.append("")
    L.append("## Provenance\n")
    L.append(f"- **Generated:** {ts}")
    L.append("- **Report mode:** enrichment_only")
    L.append("- **Generator:** run_ai_visibility_audit_v1.py")
    L.append("- **Workflow:** ai_visibility_audit_v1")
    L.append(f"- **Primary truth:** none — this is [DataForSEO enrichment], directional context only")
    L.append(f"- **Live API calls:** yes — DataForSEO ai_optimization/{meta['provider']}/llm_responses/live, {meta['prompt_count']} calls, actual spend ${meta.get('actual_cost_usd') or 0:.4f} (logged in outputs/dataforseo_cost_log.json)")
    L.append("- **Known limitations:** stochastic LLM output; one provider per run; heuristic company-name extraction")
    L.append("")
    L.append("## Interpretation guardrails\n")
    L.append("- `[DataForSEO enrichment]` — directional only. LLM answers are stochastic; one run is a sample, not a measurement.")
    L.append("- Web-search answers reflect live retrieval (close to what a ChatGPT user sees today); no-web answers reflect training-data memory of the brand.")
    L.append("- Absence of a brand mention for a small local business is the expected baseline, not an anomaly. Watch the trend across runs.")
    L.append("")

    mentioned = [f for f in findings if f["brand_mentioned_in_text"] or f["brand_cited_as_source"]]
    L.append("## Summary\n")
    L.append(f"- Brand mentioned or cited: **{len(mentioned)}/{len(findings)}** prompts")
    all_domains: dict[str, int] = {}
    for f in findings:
        for d in f["cited_domains"]:
            all_domains[d] = all_domains.get(d, 0) + 1
    top = sorted(all_domains.items(), key=lambda x: -x[1])[:15]
    if top:
        L.append(f"- Most-cited domains across answers: " + ", ".join(f"{d} ({n})" for d, n in top[:8]))
    L.append("")

    L.append("## Per-prompt results\n")
    L.append("| Prompt | Brand in text | Brand cited | Cited domains | Named companies |")
    L.append("|---|---|---|---|---|")
    for f in findings:
        if f.get("error"):
            L.append(f"| {f['prompt'][:60]} | ERROR | — | {f['error'][:60]} | — |")
            continue
        L.append("| {p} | {bt} | {bc} | {cd} | {co} |".format(
            p=f["prompt"][:60],
            bt="YES" if f["brand_mentioned_in_text"] else "no",
            bc="YES" if f["brand_cited_as_source"] else "no",
            cd=", ".join(f["cited_domains"][:6]) or "—",
            co=", ".join(f["companies_named_bv"][:4]) or "—",
        ))
    L.append("")

    L.append("## Full answers (verbatim)\n")
    for f, a in zip(findings, answers):
        L.append(f"### {f['prompt']}\n")
        if f.get("error"):
            L.append(f"ERROR: {f['error']}\n")
            continue
        L.append("```")
        L.append((a["text"] or "").strip()[:4000])
        L.append("```")
        if a["citations"]:
            L.append("\nCitations:")
            for c in a["citations"][:10]:
                L.append(f"- {c['url']}" + (f" — {c['title']}" if c.get("title") else ""))
        L.append("")

    L.append("## Limitations\n")
    L.append("1. Single provider per run; cross-provider consistency needs separate runs.")
    L.append("2. Stochastic output — rerun before concluding a change happened.")
    L.append("3. Company-name extraction is heuristic (B.V. pattern + cited domains).")
    L.append("4. No sentiment scoring in v1.")
    L.append("")
    L.append(f"---\n_Generated by `run_ai_visibility_audit_v1.py` at {ts}_")

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(L), encoding="utf-8")
    print(f"  Report: {path}")
    return path


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    _fix_console_encoding()
    parser = argparse.ArgumentParser(description="AI visibility audit via DataForSEO LLM Responses")
    parser.add_argument("--dry-run", action="store_true", help="Print plan without API calls")
    parser.add_argument("--provider", choices=sorted(PROVIDERS), default="chat_gpt")
    parser.add_argument("--model", type=str, default=None, help="Override model_name")
    parser.add_argument("--prompts-file", type=str, default=None, help="File with one prompt per line")
    parser.add_argument("--limit", type=int, default=None, help=f"Max prompts (hard limit {HARD_LIMIT})")
    parser.add_argument("--no-web-search", action="store_true", help="Disable web search (training-data-only mode)")
    parser.add_argument("--list-models", action="store_true", help="List available models for provider and exit")
    args = parser.parse_args()

    if args.list_models:
        print(f"Models for {args.provider}:")
        for m in list_models(args.provider):
            print(f"  {m}")
        return

    prompts = list(DEFAULT_PROMPTS)
    if args.prompts_file:
        prompts = [l.strip() for l in Path(args.prompts_file).read_text(encoding="utf-8").splitlines() if l.strip()]
    limit = min(args.limit or len(prompts), HARD_LIMIT)
    prompts = prompts[:limit]

    model = args.model or PROVIDERS[args.provider]["default_model"]
    web_search = PROVIDERS[args.provider]["web_search"] and not args.no_web_search
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")
    date_tag = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    print("\n=== AI Visibility Audit v1 ===")
    print(f"  Provider: {args.provider} | model: {model} | web_search: {web_search}")
    print(f"  Prompts: {len(prompts)} (hard limit {HARD_LIMIT})")
    print(f"  Estimated cost: <= ${len(prompts) * EST_COST_PER_CALL:.2f} (actual recorded from API)")

    if args.dry_run:
        print("\n  DRY RUN — no API calls. Prompts that would be sent:")
        for i, p in enumerate(prompts, 1):
            print(f"    {i}. {p}")
        print("\n  Output files that would be created:")
        for p in (RAW_SNAPSHOT, NORM_OUTPUT, OUTPUT_JSON):
            print(f"    - {p}")
        print(f"    - reports/dataforseo/ai_visibility_audit_v1_{date_tag}.md")
        return

    from dataforseo.cost_tracker import record_task_cost

    raw_entries, answers, findings = [], [], []
    total_cost = 0.0
    for i, prompt in enumerate(prompts, 1):
        print(f"\n  [{i}/{len(prompts)}] {prompt}")
        try:
            resp = ask_llm(args.provider, model, prompt, web_search)
        except Exception as e:
            print(f"    ERROR: {e}")
            raw_entries.append({"prompt": prompt, "response": None, "error": str(e)})
            answers.append({"text": "", "citations": [], "money_spent": None,
                            "model": model, "task_status": None, "task_error": str(e)})
            findings.append(analyze_answer(answers[-1], prompt))
            continue
        raw_entries.append({"prompt": prompt, "response": resp, "error": None})
        entry = record_task_cost(
            analyzer="run_ai_visibility_audit_v1",
            keyword_or_scope=prompt[:80],
            api_response=resp,
            estimated_cost_usd=EST_COST_PER_CALL,
            note=f"{args.provider}/{model} web_search={web_search}",
        )
        if entry.get("actual_task_cost_usd"):
            total_cost += entry["actual_task_cost_usd"]
        answer = extract_answer(resp)
        answers.append(answer)
        finding = analyze_answer(answer, prompt)
        findings.append(finding)
        flag = "BRAND MENTIONED" if (finding["brand_mentioned_in_text"] or finding["brand_cited_as_source"]) else "no brand mention"
        print(f"    {flag} | citations: {len(answer['citations'])} | spend: {answer['money_spent']}")

    meta = {
        "provider": args.provider, "model": model, "web_search": web_search,
        "prompt_count": len(prompts), "actual_cost_usd": round(total_cost, 4),
    }

    print("\n  Writing outputs...")
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    RAW_SNAPSHOT.write_text(json.dumps({"generated": ts, "meta": meta, "results": raw_entries},
                                       indent=2, ensure_ascii=False, default=str), encoding="utf-8")
    print(f"  Raw snapshot: {RAW_SNAPSHOT}")

    NORM_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    NORM_OUTPUT.write_text(json.dumps(
        {"generated": ts, "meta": meta,
         "answers": [{"prompt": f["prompt"], "text": a["text"], "citations": a["citations"],
                      "money_spent": a["money_spent"], "error": a["task_error"]}
                     for f, a in zip(findings, answers)]},
        indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Normalized: {NORM_OUTPUT}")

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(
        {"_meta": {"generated": ts, "generator": "run_ai_visibility_audit_v1.py", **meta,
                   "guardrails": {"hard_limit": HARD_LIMIT,
                                  "evidence_tier": "dataforseo_enrichment",
                                  "interpretation": "directional_only"}},
         "findings": findings}, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  JSON output: {OUTPUT_JSON}")

    write_report(findings, answers, meta, ts, date_tag)

    mentioned = sum(1 for f in findings if f["brand_mentioned_in_text"] or f["brand_cited_as_source"])
    print("\n=== Done ===")
    print(f"  Prompts: {len(findings)} | brand mentioned/cited: {mentioned}")
    print(f"  Actual API spend: ${total_cost:.4f}")


if __name__ == "__main__":
    main()
