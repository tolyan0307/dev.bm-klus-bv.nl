export type PlannedRoute = {
  path: string
  title?: string
  description?: string
  changefreq?: "weekly" | "monthly" | "yearly"
  priority?: number
  enabled?: boolean
}

/** Production hostnames that should be indexed (used by robots.ts). */
const PRODUCTION_HOSTS = new Set(["bm-klus-bv.nl", "www.bm-klus-bv.nl"])

const DEFAULT_BASE = "https://bm-klus-bv.nl"

/**
 * Returns true when the given absolute URL belongs to a production hostname.
 * Consumers: robots.ts (Allow vs Disallow), layout.tsx (robots meta).
 */
export function isProductionHost(url: string): boolean {
  try {
    return PRODUCTION_HOSTS.has(new URL(url).hostname)
  } catch {
    return false
  }
}

/**
 * Returns the site base URL for canonical URLs, OG tags, sitemap, etc.
 * Trusts NEXT_PUBLIC_SITE_URL when it is a valid absolute URL;
 * falls back to the production base when unset or invalid.
 * Trailing slash is stripped so callers can append paths safely.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "")
  if (!raw) return DEFAULT_BASE
  try {
    new URL(raw)
    return raw
  } catch {
    return DEFAULT_BASE
  }
}

export const PLANNED_ROUTES = [
  // ── Core pages ────────────────────────────────────────────────────────────
  {
    path: "/",
    description:
      "Professionele gevelisolatie, stucwerk, sierpleister en gevel schilderen in regio Rotterdam. Gratis opname op locatie en offerte binnen 24–48 uur.",
    changefreq: "monthly",
    priority: 1.0,
  },
  {
    path: "/diensten/",
    title: "Onze diensten: gevelisolatie en stucwerk",
    description:
      "Overzicht van onze geveloplossingen: buitengevelisolatie, stucwerk, sierpleister, gevel schilderen en meer in regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/onze-werken/",
    title: "Onze werken – projecten regio Rotterdam",
    description:
      "Bekijk recente projecten met buitengevelisolatie (ETICS) en gevelafwerking. Per project: plaats, aanpak en afwerking. Regio Rotterdam en omgeving.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/over-ons/",
    title: "Over ons – gevelspecialist Rotterdam",
    description:
      "BM klus BV: specialist in buitengevelisolatie (ETICS) en gevelafwerking (stuc, sierpleister, schilderwerk) in regio Rotterdam en omgeving.",
    changefreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/contact/",
    title: "Contact & offerte aanvragen",
    description:
      "Neem contact op met BM klus BV voor een offerte of advies. Telefoon/WhatsApp, e-mail, adres in Rotterdam en openingstijden.",
    changefreq: "yearly",
    priority: 0.5,
  },
  {
    path: "/privacybeleid/",
    title: "Privacybeleid & Cookiebeleid",
    description:
      "Lees hoe BM klus BV omgaat met persoonsgegevens en cookies. Informatie over Google Analytics/Ads, cookievoorkeuren, bewaartermijnen en uw rechten.",
    changefreq: "yearly",
    priority: 0.2,
  },

  // ── Money pages (services) ────────────────────────────────────────────────
  {
    path: "/gevelisolatie/",
    title: "Gevelisolatie buitenkant (ETICS) – prijs per m²",
    description:
      "Gevelisolatie aan de buitenkant (ETICS) met afwerking: stuc, sierpleister/crepi of steenstrips. Heldere prijs per m² na gratis opname op locatie.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/gevel-schilderen/",
    title: "Gevel schilderen: kosten per m² & offerte",
    description:
      "Gevel schilderen (buitenmuur verven) in regio Rotterdam. Dampopen systemen (silicaat/KEIM of siloxaan), voorbereiding, kosten per m², onderhoud & FAQ.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/buiten-stucwerk/",
    title: "Buitenmuur stucen (gevel stucen) – prijs per m²",
    description:
      "Buitenmuur stucen / gevel stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Kosten per m² na gratis opname.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/sierpleister/",
    title: "Gevel sierpleister (spachtelputz/crepi) – prijs",
    description:
      "Gevel sierpleister: spachtelputz of crepi met korrel 1,5–3 mm. Richtprijzen per m², werkwijze, details (plint/dagkanten) en onderhoud. Regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/muren-stucen/",
    title: "Muren stucen (binnen) – sausklaar stucwerk",
    description:
      "Binnenmuren stucen: behangklaar of sausklaar. Richtprijzen per m², werkwijze, voorbereiding en droogtijd. Regio Rotterdam (±80–100 km).",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/schoonmaak-na-verbouwing/",
    title: "Schoonmaak na verbouwing",
    description:
      "Professionele schoonmaak na verbouwing of renovatie in regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.6,
    enabled: false,
  },

  // ── Gevelisolatie cluster ─────────────────────────────────────────────────
  {
    path: "/gevelisolatie/kosten/",
    title: "Kosten gevelisolatie buiten – prijs per m²",
    description:
      "Wat kost buitengevelisolatie per m²? Kostenfactoren, afwerking (stuc/steenstrips) en voorbeeldranges. Opname op locatie in regio Rotterdam (±80–100 km).",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/materialen/",
    title: "Gevelisolatie platen – EPS, PIR & minerale wol",
    description:
      "Vergelijk gevelisolatie platen (EPS, PIR, minerale wol): diktes, brandklasse, dampopenheid en afwerking op ETICS. Advies op locatie.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/afwerkingen/",
    title: "Afwerking gevelisolatie – stuc, crepi, strips",
    description:
      "Welke afwerking past bij buitengevelisolatie? Stucwerk, sierpleister/crepi, steenstrips of schilderwerk. Keuzes, voor- en nadelen.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/rc-waarde-dikte/",
    title: "Rc-waarde & dikte gevelisolatie (buiten)",
    description:
      "Welke Rc/Rd-waarde en dikte past bij jouw gevel? Uitleg EPS/PIR/wol, typische ranges en aandacht voor details. Gratis opname op locatie.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/subsidie-vergunning/",
    title: "Subsidie & vergunning gevelisolatie",
    description:
      "ISDE-subsidie en vergunningen bij buitengevelisolatie: voorwaarden op hoofdlijnen, stappenplan en praktische checklist.",
    changefreq: "yearly",
    priority: 0.6,
  },

  // ── Gevelisolatie location pages ─────────────────────────────────────────
  // Generated dynamically in sitemap.ts from gevelisolatie-locations.ts

  // ── Optional / future pages ───────────────────────────────────────────────
  {
    path: "/onze-werken/gevelisolatie/",
    changefreq: "monthly",
    priority: 0.5,
    enabled: false,
  },
] satisfies readonly PlannedRoute[]

/** O(1) lookup map: path → PlannedRoute */
export const PLAN_BY_PATH: ReadonlyMap<string, PlannedRoute> = new Map(
  PLANNED_ROUTES.map((r) => [r.path, r]),
)

/** Returns the PlannedRoute for an exact path (with trailing slash), or undefined. */
export function getPagePlan(path: string): PlannedRoute | undefined {
  return PLAN_BY_PATH.get(path)
}
