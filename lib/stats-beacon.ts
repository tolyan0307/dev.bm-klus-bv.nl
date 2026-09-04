/**
 * Fire-and-forget event beacon for the server-side stats plugin
 * (POST /wp-json/bm-stats/v1/event). No cookies, no identifiers: only the
 * event type, the current URL, the referrer and, for CTA clicks, the channel.
 * Page views keep using components/pageview-beacon.tsx.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_CONTACT_API_BASE?.replace(/\/+$/, "") ?? ""
const ENDPOINT = `${API_BASE}/wp-json/bm-stats/v1/event`

export type StatsEventType = "cta_click"
export type StatsCta = "whatsapp" | "phone" | "email"

export function sendStatsEvent(type: StatsEventType, cta?: StatsCta): void {
  if (typeof window === "undefined") return

  const body = JSON.stringify({
    type,
    cta: cta ?? null,
    url: window.location.href,
    referrer: typeof document !== "undefined" ? document.referrer : "",
  })

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" })
      if (navigator.sendBeacon(ENDPOINT, blob)) return
    }
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* never block the click */
  }
}
