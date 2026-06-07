# Manual Conversion-Flow Test Checklist (run by user)

Purpose: confirm the conversion-tracking chain works end-to-end **today**, and that the
2026-04-24→05-09 outage is fully resolved. READ-ONLY for the auditor — these steps are for **you** to run.
Do **not** submit a real lead that will be treated as a customer; use a clearly-marked test (name "TEST – audit").

Background (why this matters): the site only fires `bm_lead_form_success` in dataLayer; the GA4 events
`Contact_Form_Site`, `Phone`, `Whatsapp` and Consent Mode are produced **inside the GTM container** (not in the
site code). So this test validates GTM + GA4 + Ads, which the repo cannot.

## Prep
1. Open the site in a fresh incognito window.
2. Open **GA4 → Admin → DebugView** (and install/enable GA Debug, or append `?gtm_debug=x`).
3. Open **GTM → Preview** for the container, enter the site URL.
4. Have **Google Ads → Tools → Conversions** open in another tab.
5. **Accept cookies** in the CookieScript banner (so Consent Mode grants analytics/ads storage). Then repeat one test with cookies **rejected** to see what is lost under denial.

## Tests
### A. Organic-like
- Visit `/` directly (no UTM). Interact (scroll) so GTM loads (3.5s delay / first interaction).
- In GTM Preview confirm: GTM loaded, consent state, GA4 config tag fired.

### B. Paid-like UTM
- Visit e.g. `/gevelisolatie/kosten/?utm_source=google&utm_medium=cpc&utm_campaign=test`.
- Confirm GA4 sees source/medium = google / cpc.

### C. Form submit (primary lead)
- Fill the contact form (name "TEST – audit"), pass Turnstile, submit.
- Expect: dataLayer `bm_lead_form_success` → GTM trigger → GA4 event **`Contact_Form_Site`** in DebugView.
- In WP: confirm the lead email arrived (`wp_mail`) and/or the `bm/v1/contact` endpoint logged it.
- In Ads (may take hours): the primary lead conversion increments.

### D. WhatsApp click
- Click a `wa.me/31612079808` link. Expect GA4 event **`Whatsapp`** in DebugView (GTM click trigger).

### E. Phone click
- Click a `tel:+31612079808` link (mobile or desktop). Expect GA4 event **`Phone`** (GTM click trigger).

### F. Consent-denied repeat
- Repeat C–E with cookies **rejected**. Note which events still fire (Consent Mode v2 may send cookieless pings or none). Record the delta — this is the measurement floor under denial.

## Where to look
| Signal | Where |
|--------|-------|
| dataLayer push | GTM Preview → Data Layer tab |
| GA4 events | GA4 DebugView (real-time) |
| Ads conversions | Ads → Conversions (lag up to ~24h) |
| Lead delivery | WP mailbox / `bm/v1/contact` handler |
| Consent state | GTM Preview → Consent tab |

## Record for the auditor
For each of C/D/E, note: dataLayer event seen (Y/N), GA4 event name seen (Y/N), Ads conversion attributed (Y/N), under **accept** and under **reject**. This directly confirms or refutes hypotheses H1/H2.
