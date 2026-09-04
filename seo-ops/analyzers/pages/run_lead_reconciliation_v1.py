"""
run_lead_reconciliation_v1.py — Reconcile the WP lead log (truth) with GA4 key events and Google Ads conversions.

Answers: how many leads does GA4 see vs. what the site actually received, per week and per source,
and what the GA4 undercount factor is. WP is the primary truth for leads (server-side, no consent gate);
GA4 and Ads are consent- and tag-dependent.

Inputs:
  - WP:  live pull via integrations/wp/stats_loader.py (leads with status/source, daily views/cta)
  - GA4: live pull of key events by date (Contact_Form_Site, Phone, Whatsapp + bm_* click events)
  - Ads: optional CSV D:/projects/bmklus/google/outputs/campaign_23271040037_last30d.csv (date, conversions)

Outputs:
  snapshots/normalized/wp/lead_reconciliation_weekly_last{N}d.csv
  reports/audits/lead_reconciliation_{YYYY-MM-DD}.md

Usage:
  python seo-ops/analyzers/pages/run_lead_reconciliation_v1.py --days 90
Run with integrations/.venv Python. Needs BMKLUS_WP_STATS_TOKEN and GA4 service account in .env.local.
"""

from __future__ import annotations

import csv
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.wp.stats_loader import pull_wp_window  # noqa: E402
from integrations.ga4.landing_page_loader import pull_key_events_by_date  # noqa: E402

ADS_CSV = Path("D:/projects/bmklus/google/outputs/campaign_23271040037_last30d.csv")
NORM_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "wp"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "audits"

EVENTS_SINCE = date(2026, 9, 4)
GA4_FORM_EVENT = "Contact_Form_Site"
GA4_CTA_EVENTS = ["Phone", "Whatsapp", "Email"]  # fired by GTM link-click triggers (tel:, wa.me, mailto:)
GA4_NEW_EVENTS = ["bm_lead_form_success", "bm_whatsapp_click", "bm_phone_click", "bm_email_click"]


def week_start(d: date) -> date:
    return d - timedelta(days=d.weekday())


def parse_date(s: str) -> date:
    return datetime.fromisoformat(s[:10]).date()


def load_ads_daily() -> dict[date, float]:
    if not ADS_CSV.exists():
        return {}
    out: dict[date, float] = {}
    with open(ADS_CSV, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            try:
                out[parse_date(row["date"])] = float(row.get("conversions") or 0)
            except (KeyError, ValueError):
                continue
    return out


def main() -> None:
    import argparse
    p = argparse.ArgumentParser(description="WP leads vs GA4 key events vs Ads conversions, weekly")
    p.add_argument("--days", type=int, default=90)
    args = p.parse_args()
    days = args.days

    print(f"Lead reconciliation, last {days} days...")
    wp = pull_wp_window(days=days)
    dr = wp["date_range"]
    start, end = parse_date(dr["start"]), parse_date(dr["end"])
    print(f"  WP: {wp['leads'].get('count', 0)} leads, window {dr['start']}..{dr['end']}")

    ga4 = pull_key_events_by_date(days=days, event_names=[GA4_FORM_EVENT] + GA4_CTA_EVENTS + GA4_NEW_EVENTS)
    print(f"  GA4: {ga4['total_rows']} date×event rows, window {ga4['date_range']['start']}..{ga4['date_range']['end']}")

    ads = load_ads_daily()
    ads_in_window = {d: v for d, v in ads.items() if start <= d <= end}
    ads_cov = (min(ads_in_window), max(ads_in_window)) if ads_in_window else None
    print(f"  Ads CSV: {'present, ' + str(len(ads_in_window)) + ' days in window' if ads_in_window else 'absent or outside window'}")

    # ── Weekly aggregation ──
    weeks: dict[date, dict] = defaultdict(lambda: defaultdict(float))

    for l in wp["leads"].get("leads", []):
        d = parse_date(l["created_at"])
        w = weeks[week_start(d)]
        w["wp_leads_total"] += 1
        if l.get("status") != "spam":
            w["wp_leads_real"] += 1
        if l.get("status") in ("qualified", "won", "lost"):
            w["wp_leads_qualified"] += 1
        if l.get("status") == "won":
            w["wp_leads_won"] += 1
        src = l.get("source") or "unknown"
        w[f"wp_src_{src}"] += 1
        if l.get("gclid"):
            w["wp_with_gclid"] += 1

    for r in wp["pageviews_day"].get("rows", []):
        d = parse_date(r["date"])
        w = weeks[week_start(d)]
        w["wp_views"] += r.get("views", 0)
        w["wp_cta"] += r.get("cta", 0)
        if d >= EVENTS_SINCE:
            w["wp_event_days"] += 1

    for r in ga4["rows"]:
        d = parse_date(r["date"])
        w = weeks[week_start(d)]
        name = r["eventName"]
        n = int(float(r.get("eventCount") or 0))
        if name == GA4_FORM_EVENT:
            w["ga4_form"] += n
        elif name in GA4_CTA_EVENTS:
            w["ga4_cta"] += n
            w[f"ga4_{name.lower()}"] += n
        elif name in GA4_NEW_EVENTS:
            w[f"ga4_{name}"] += n

    for d, v in ads_in_window.items():
        weeks[week_start(d)]["ads_conversions"] += v

    # Fill all weeks in window
    cur = week_start(start)
    while cur <= end:
        weeks[cur]  # touch
        cur += timedelta(days=7)

    rows = []
    for ws in sorted(weeks):
        w = weeks[ws]
        we = min(ws + timedelta(days=6), end)
        total = int(w["wp_leads_total"])
        real = int(w["wp_leads_real"])
        ga4_form = int(w["ga4_form"])
        rows.append({
            "week_start": ws.isoformat(),
            "week_end": we.isoformat(),
            "wp_leads_total": total,
            "wp_leads_real": real,
            "wp_leads_qualified": int(w["wp_leads_qualified"]),
            "wp_leads_won": int(w["wp_leads_won"]),
            "wp_leads_ads": int(w["wp_src_ads"]),
            "wp_leads_direct": int(w["wp_src_direct"]),
            "wp_leads_organic": int(w["wp_src_organic"]),
            "wp_leads_other": total - int(w["wp_src_ads"]) - int(w["wp_src_direct"]) - int(w["wp_src_organic"]),
            "wp_with_gclid": int(w["wp_with_gclid"]),
            "ga4_contact_form": ga4_form,
            "ga4_form_vs_wp_pct": round(ga4_form / total * 100, 1) if total else "",
            "ga4_phone": int(w["ga4_phone"]),
            "ga4_whatsapp": int(w["ga4_whatsapp"]),
            "ga4_email": int(w["ga4_email"]),
            "ga4_bm_events": int(sum(w[f"ga4_{n}"] for n in GA4_NEW_EVENTS)),
            "wp_views": int(w["wp_views"]),
            "wp_cta": int(w["wp_cta"]),
            "wp_event_days": int(w["wp_event_days"]),
            "ads_conversions": round(w["ads_conversions"], 1) if ads_in_window else "",
        })

    NORM_DIR.mkdir(parents=True, exist_ok=True)
    csv_path = NORM_DIR / f"lead_reconciliation_weekly_last{days}d.csv"
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        wr = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        wr.writeheader()
        wr.writerows(rows)
    print(f"  Weekly CSV -> {csv_path}")

    # ── Totals ──
    T = lambda k: sum(int(r[k]) if r[k] != "" else 0 for r in rows)  # noqa: E731
    wp_total, wp_real, wp_q = T("wp_leads_total"), T("wp_leads_real"), T("wp_leads_qualified")
    ga4_form_total = T("ga4_contact_form")
    ga4_cta_total = T("ga4_phone") + T("ga4_whatsapp") + T("ga4_email")
    ga4_bm_total = T("ga4_bm_events")
    wp_ads, wp_direct, wp_organic = T("wp_leads_ads"), T("wp_leads_direct"), T("wp_leads_organic")
    wp_gclid = T("wp_with_gclid")
    ads_total = sum(ads_in_window.values()) if ads_in_window else None
    wp_cta_since = sum(int(r["wp_cta"]) for r in rows)
    ga4_cta_since = sum(int(r["ga4_phone"]) + int(r["ga4_whatsapp"]) + int(r["ga4_email"]) for r in rows if parse_date(r["week_end"]) >= EVENTS_SINCE)
    undercount = round(ga4_form_total / wp_total * 100, 1) if wp_total else None
    untriaged = sum(1 for l in wp["leads"].get("leads", []) if (l.get("status") or "new") == "new")

    # Ads-window comparison: WP ads-sourced leads in Ads CSV coverage
    ads_cmp = None
    if ads_cov:
        wp_ads_in_cov = sum(1 for l in wp["leads"].get("leads", []) if l.get("source") == "ads" and ads_cov[0] <= parse_date(l["created_at"]) <= ads_cov[1])
        ads_cmp = (ads_cov, round(ads_total, 1), wp_ads_in_cov)

    L_WP = f"[WP, {days}d, lead-level]"
    L_WPE = f"[WP, since {EVENTS_SINCE.isoformat()}, event-level]"
    L_GA4 = f"[GA4, {days}d, event-level]"
    L_ADS = f"[Ads CSV, {ads_cov[0]}..{ads_cov[1]}, campaign]" if ads_cov else "[Ads CSV, n/a]"
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    today = date.today().isoformat()

    lines = [
        f"# Lead reconciliation: WP lead log vs GA4 vs Google Ads ({dr['start']} .. {dr['end']})",
        "",
        f"**Generated:** {now}",
        "**Report mode:** verified",
        "**Workflow:** lead_reconciliation_v1",
        "**Confidence cap:** high for WP counts, medium for cross-source ratios",
        "",
        "**Sources**",
        f"- WP lead log, BM Stats v2 plugin, server-side, every form submission with owner-set status → `{L_WP}`",
        f"- WP server-side pageviews and CTA clicks, beacon, no consent gate, from {EVENTS_SINCE.isoformat()} → `{L_WPE}`",
        f"- GA4 events by date: `{GA4_FORM_EVENT}` (GTM trigger CE bm_lead_form_success), `Phone` / `Whatsapp` / `Email` (GTM link-click triggers tel: / wa.me / mailto:) → `{L_GA4}`",
        f"- Google Ads campaign conversions by date from the last CSV export → `{L_ADS}`",
        "",
        "---",
        "",
        "## 1. Observations",
        "",
        f"| Metric | Value | Provenance |",
        f"|--------|-------|------------|",
        f"| Form submissions received by the site | {wp_total} | {L_WP} |",
        f"| … excluding status `spam` | {wp_real} | {L_WP} |",
        f"| … triaged (qualified + won + lost) | {wp_q} | {L_WP} |",
        f"| … still status `new` (not triaged) | {untriaged} | {L_WP} |",
        f"| … first-touch source ads / direct / organic / other | {wp_ads} / {wp_direct} / {wp_organic} / {wp_total - wp_ads - wp_direct - wp_organic} | {L_WP} |",
        f"| … with gclid | {wp_gclid} | {L_WP} |",
        f"| GA4 `{GA4_FORM_EVENT}` events | {ga4_form_total} | {L_GA4} |",
        f"| GA4 form events as % of WP submissions | {undercount if undercount is not None else 'n/a'}% | {L_GA4} ÷ {L_WP} |",
        f"| GA4 `Phone` + `Whatsapp` + `Email` events | {ga4_cta_total} | {L_GA4} |",
        f"| GA4 `bm_*` dataLayer events (not tagged in GTM, expected 0) | {ga4_bm_total} | {L_GA4} |",
        f"| WP CTA clicks (WhatsApp / phone / e-mail) | {wp_cta_since} | {L_WPE} |",
        f"| GA4 `Phone` + `Whatsapp` + `Email` in the same days | {ga4_cta_since} | {L_GA4} |",
    ]
    if ads_cmp:
        lines.append(f"| Ads conversions in CSV coverage | {ads_cmp[1]} | {L_ADS} |")
        lines.append(f"| WP leads with first-touch `ads` in the same coverage | {ads_cmp[2]} | {L_WP} |")
    else:
        lines.append(f"| Ads conversions | not available: CSV missing or outside window | {L_ADS} |")

    lines += [
        "",
        "### Weekly table",
        "",
        f"All counts per ISO week (Mon–Sun). WP columns: {L_WP}; views/CTA: {L_WPE}; GA4 columns: {L_GA4}; Ads: {L_ADS}.",
        "",
        "| Week | WP total | WP non-spam | WP triaged | WP ads | WP direct | GA4 form | GA4 form % | GA4 phone | GA4 whatsapp | GA4 email | WP views | WP CTA | Ads conv |",
        "|------|---------:|------------:|-----------:|-------:|----------:|---------:|-----------:|----------:|-------------:|----------:|---------:|-------:|---------:|",
    ]
    for r in rows:
        lines.append(
            f"| {r['week_start']} | {r['wp_leads_total']} | {r['wp_leads_real']} | {r['wp_leads_qualified']} | {r['wp_leads_ads']} | {r['wp_leads_direct']} "
            f"| {r['ga4_contact_form']} | {r['ga4_form_vs_wp_pct'] if r['ga4_form_vs_wp_pct'] != '' else '—'} | {r['ga4_phone']} | {r['ga4_whatsapp']} | {r['ga4_email']} "
            f"| {r['wp_views'] if r['wp_event_days'] else '—'} | {r['wp_cta'] if r['wp_event_days'] else '—'} | {r['ads_conversions'] if r['ads_conversions'] != '' else '—'} |"
        )

    # ── Interpretations ──
    interp = []
    if wp_total and undercount is not None:
        if undercount < 70:
            interp.append(f"- GA4 sees roughly {undercount}% of real form submissions ({L_GA4} ÷ {L_WP}). The gap is consistent with consent-gated tagging: visitors who decline analytics cookies still submit forms, but GA4 never records them. Confidence: **high** on the direction, **medium** on the exact factor (small volumes).")
        else:
            interp.append(f"- GA4 records {undercount}% of real form submissions ({L_GA4} ÷ {L_WP}); undercount is moderate. Confidence: **medium**.")
    if wp_total and wp_ads:
        interp.append(f"- {round(wp_ads / wp_total * 100)}% of submissions carry a first-touch ads signal (gclid or paid UTM) ({L_WP}). This is the ceiling for Ads-attributable leads regardless of what Ads reports. Confidence: **high** for post-{EVENTS_SINCE.isoformat()} leads, **medium** for backfilled ones (source from form-page URL only).")
    if untriaged:
        interp.append(f"- {untriaged} submissions are still `new` ({L_WP}); until the owner triages them, 'qualified' comparisons are not meaningful. Confidence: n/a, data-completeness note.")
    if ga4_cta_total:
        interp.append(f"- Contact clicks are measured twice by design: GA4 `Phone`/`Whatsapp`/`Email` via GTM link-click triggers (consent-gated) and WP `cta_click` via beacon (no consent gate). The `bm_*` dataLayer events are intentionally not tagged in GTM; tagging them would double-count. From {EVENTS_SINCE.isoformat()} the WP/GA4 click ratio becomes the second undercount estimate. Confidence: **high** on the setup, ratio needs 4+ weeks.")
    if ads_cmp and ads_cmp[1] is not None:
        interp.append(f"- Ads reports {ads_cmp[1]} conversions ({L_ADS}) vs {ads_cmp[2]} site submissions with an ads first touch in the same days ({L_WP}). Ads conversions come from GA4 imports, so they inherit the GA4 undercount; do not read them as lead counts. Confidence: **medium**.")
    lines += ["", "---", "", "## 2. Interpretations", ""] + (interp or ["- Not enough data for interpretations in this window."])

    lines += [
        "",
        "---",
        "",
        "## 3. Hypotheses (need more evidence)",
        "",
        "- H1: The GA4/WP gap is mostly consent decline, not tag breakage. Test: compare the gap on days with high vs low paid traffic; tag breakage would show as days with WP submissions and zero GA4 events regardless of channel.",
        "- H2: Part of WP `direct` leads are actually organic returns (first touch in an earlier tab or hard reload resets the in-memory first touch). Test: once 4+ weeks of post-2026-09-04 leads exist, compare `direct` share among leads vs `direct` share among pageviews.",
        "- H3: Leads with `gclid` but status `spam` inflate Ads conversions if imported blindly. Test: after triage, count spam among gclid leads.",
        "- H4: Weeks where GA4 form events exceed WP submissions (ratio above 100%) point to duplicate `Contact_Form_Site` firing (e.g. success screen re-rendered) rather than missing WP rows, since WP writes one row per accepted submission. Test: compare per-day, not per-week, once the `bm_lead_form_success` event is tagged in GTM.",
        "",
        "---",
        "",
        "## 4. Recommended actions (manual)",
        "",
        "1. Triage every `new` lead in WP → BM Stats → Заявки (status qualified / won / lost / spam). Without this the reconciliation stays at 'submissions', not 'leads'.",
        "2. No GTM change needed for clicks: link-click triggers (tel:, wa.me, mailto:) already feed GA4 `Phone`/`Whatsapp`/`Email`. Check in GA4 Admin → Events that `Email` is also marked as a key event if e-mail clicks should count as lead intent (currently only `Contact_Form_Site`, `Phone`, `Whatsapp` are listed in `config/conversions.yaml`).",
        "3. Use the WP lead count as the denominator in every conversion-rate claim; treat GA4 key events as a consent-limited sample. Record the undercount factor in `config/analysis_context_v1.yaml` once 4 weeks of data exist.",
        "4. After one month of triaged data: plan the offline conversion import to Google Ads by gclid for `qualified`/`won` leads (spec §1, later phase).",
        "",
        "---",
        "",
        "## 5. Excluded / stale context",
        "",
        f"- WP pageviews and CTA clicks before {EVENTS_SINCE.isoformat()} do not exist (v1 counters were discarded by owner decision); those weeks show '—'.",
        "- Backfilled leads (before 2026-09-04) have no first-touch referrer and unknown form variant; their source is derived from the form-page URL only.",
        "- Ads conversions come from a manual CSV export; if the file is older than the window, the Ads column is empty rather than estimated.",
        "- Pre-cutover data (before 2026-03-08) is not included in any source.",
        "",
        "---",
        "",
        "## Provenance",
        "",
        f"- **Generated:** {now}",
        "- **Report mode:** verified",
        "- **Generator:** analyzers/pages/run_lead_reconciliation_v1.py",
        "- **Primary truth:** WP lead log (BM Stats v2 API, `/wp-json/bm-stats/v1/leads`, `/pageviews`, `/events`), internal_artifact",
        "- **Supporting data:** GA4 Data API key events by date (`Contact_Form_Site`, `Phone`, `Whatsapp`, `bm_*`), internal_artifact; Google Ads CSV export (optional), internal_artifact",
        f"- **Live API calls:** yes — WP stats API and GA4 Data API were called at generation time for the window {dr['start']}..{dr['end']}; Ads read from local CSV only",
        f"- **Window:** {days} days ending yesterday (site local date, Europe/Amsterdam)",
        "- **Enrichment sources:** none",
        "",
        "## Output files",
        "",
        f"- Weekly CSV: `seo-ops/snapshots/normalized/wp/lead_reconciliation_weekly_last{days}d.csv`",
        f"- This report: `seo-ops/reports/audits/lead_reconciliation_{today}.md`",
    ]

    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    report_path = REPORT_DIR / f"lead_reconciliation_{today}.md"
    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Report -> {report_path}")
    print(f"\n  WP submissions {wp_total} (non-spam {wp_real}), GA4 form events {ga4_form_total}, GA4 share {undercount}%")
    print("  Done.")


if __name__ == "__main__":
    main()
