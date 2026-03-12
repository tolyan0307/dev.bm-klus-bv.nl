import { getSiteUrl } from "@/data/sitemap-plan"

export const TITLE_SUFFIX = " | BM klus BV"

export const SITE = {
  siteName: "BM klus BV",
  canonicalBase: getSiteUrl(),
  locale: "nl_NL",
  lang: "nl-NL",
  regionText:
    "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio’s",
  defaultOgImage: "/images/og-default.svg",
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

