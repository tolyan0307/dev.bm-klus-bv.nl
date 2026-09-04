/**
 * First-touch attribution for lead forms.
 *
 * Captures, once per browser session, the landing URL, referrer and any
 * utm_* / gclid parameters of the first page view, and exposes them so the
 * contact form and quote modal can send them along with the lead.
 * Stored in sessionStorage (no cookies, no PII). Every access is guarded:
 * if storage is unavailable the functions fall back to the current location.
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

const STORAGE_KEY = "bm_attr_v1"
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const

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

function load(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : null
  } catch {
    return null
  }
}

function save(a: Attribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a))
  } catch {
    /* storage unavailable: nothing to persist */
  }
}

/**
 * Call on every route change. Stores the first page view of the session;
 * if a later page view carries campaign parameters while the stored one has
 * none (e.g. a same-session return via an ad), the campaign fields are updated.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return
  const current = fromLocation()
  const stored = load()
  if (!stored) {
    save(current)
    return
  }
  if (!hasCampaignParams(stored) && hasCampaignParams(current)) {
    save({ ...stored, ...readParams(current.landing_url) })
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
  return load() ?? fromLocation()
}
