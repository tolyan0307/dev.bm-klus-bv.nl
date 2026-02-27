export const SITE = {
  siteName: "BM Klus BV",
  canonicalBase: "https://bm-klus-bv.nl",
  locale: "nl_NL",
  lang: "nl-NL",
  regionText:
    "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio’s",
  defaultOgImage: "/images/og-home.jpg", // TODO: add real OG image to /public/images/og-home.jpg
} as const

export type NavRoute = {
  label: string
  path: string
}

export const NAV = {
  home: { label: "Home", path: "/" },
  diensten: { label: "Diensten", path: "/diensten/" },
  onzeWerken: { label: "Onze werken", path: "/onze-werken/" },
  contact: { label: "Contact", path: "/contact/" },
  overOns: { label: "Over ons", path: "/over-ons/" },
  privacybeleid: { label: "Privacybeleid", path: "/privacybeleid/" },
} as const satisfies Record<string, NavRoute>

function isAbsoluteUrl(value: string): boolean {
  return value.startsWith("https://") || value.startsWith("http://")
}

function isFileLikePath(value: string): boolean {
  const clean = value.split("#")[0]?.split("?")[0] ?? value
  const last = clean.split("/").filter(Boolean).pop() ?? ""
  return last.includes(".")
}

function ensureLeadingSlash(value: string): string {
  if (!value) return "/"
  return value.startsWith("/") ? value : `/${value}`
}

/**
 * Normalizes a page path for static export:
 * - ensures leading slash
 * - removes query/hash
 * - enforces trailing slash (except root "/")
 */
export function normalizePath(path: string): string {
  const raw = (path ?? "").trim()
  if (!raw) return "/"

  if (isAbsoluteUrl(raw)) {
    const url = new URL(raw)
    return normalizePath(url.pathname)
  }

  const clean = ensureLeadingSlash(raw).split("#")[0]?.split("?")[0] ?? "/"
  if (clean === "/") return "/"
  return clean.endsWith("/") ? clean : `${clean}/`
}

/**
 * Builds an absolute URL from a path.
 * Page URLs are returned with a trailing slash, file-like URLs without it.
 */
export function absUrl(path: string): string {
  const raw = (path ?? "").trim()
  if (!raw) return `${SITE.canonicalBase}/`
  if (isAbsoluteUrl(raw)) return raw

  const normalized = isFileLikePath(raw)
    ? ensureLeadingSlash(raw)
    : normalizePath(raw)

  return new URL(normalized, SITE.canonicalBase).toString()
}

