/**
 * First-touch attribution for lead forms.
 *
 * Captures the landing URL, referrer and any utm_* / gclid parameters of the
 * first page view of this tab and exposes them so the contact form and quote
 * modal can send them along with the lead.
 *
 * Kept in a module-level variable only: nothing is written to cookies,
 * localStorage or sessionStorage. Next.js App Router navigates client-side
 * after the first load, so the value survives internal navigation and is
 * reset on a hard reload or in a new tab (then the current page becomes the
 * first touch).
 */

export interface Attribution {
  landing_url: string
  referrer: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  gclid: string | null
  first_seen_at: string
}

const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const

let firstTouch: Attribution | null = null

function readParams(url: string): Record<(typeof PARAMS)[number], string | null> {
  const out = {} as Record<(typeof PARAMS)[number], string | null>
  let sp: URLSearchParams | null = null
  try {
    sp = new URL(url).searchParams
  } catch {
    sp = null
  }
  for (const p of PARAMS) out[p] = sp?.get(p) || null
  return out
}

function hasCampaignParams(a: Pick<Attribution, (typeof PARAMS)[number]>): boolean {
  return PARAMS.some((p) => Boolean(a[p]))
}

function fromLocation(): Attribution {
  const url = typeof window !== "undefined" ? window.location.href : ""
  const referrer = typeof document !== "undefined" ? document.referrer : ""
  return {
    landing_url: url,
    referrer,
    ...readParams(url),
    first_seen_at: new Date().toISOString(),
  }
}

/**
 * Call on every route change. Remembers the first page view of this tab;
 * if a later page view carries campaign parameters while the stored one has
 * none (e.g. a same-tab return via an ad), the campaign fields are updated.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return
  const current = fromLocation()
  if (!firstTouch) {
    firstTouch = current
    return
  }
  if (!hasCampaignParams(firstTouch) && hasCampaignParams(current)) {
    firstTouch = { ...firstTouch, ...readParams(current.landing_url) }
  }
}

/** Attribution to attach to a lead payload. Never throws. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {
      landing_url: "",
      referrer: "",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
      gclid: null,
      first_seen_at: "",
    }
  }
  return firstTouch ?? fromLocation()
}
