export type PlannedRoute = {
  path: string
  title?: string
  description?: string
  changefreq?: "weekly" | "monthly" | "yearly"
  priority?: number
  enabled?: boolean
}

/**
 * Returns the site base URL from NEXT_PUBLIC_SITE_URL env var,
 * falling back to the production canonical URL.
 * Trailing slash is stripped so callers can append paths safely.
 */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://bm-klus-bv.nl"
  )
}

export const PLANNED_ROUTES = [
  // ── Core pages ────────────────────────────────────────────────────────────
  {
    path: "/",
    title: "BM Klus BV — Gevelspecialist regio Rotterdam",
    description:
      "Professionele gevelisolatie, stucwerk, sierpleister en gevel schilderen in regio Rotterdam. Gratis inspectie en offerte binnen 24–48 uur.",
    changefreq: "monthly",
    priority: 1.0,
  },
  {
    path: "/diensten/",
    title: "Diensten | BM Klus BV",
    description:
      "Overzicht van onze geveloplossingen: buitengevelisolatie, stucwerk, sierpleister, gevel schilderen en meer in regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/onze-werken/",
    title: "Onze werken | BM Klus BV",
    description:
      "Bekijk recente projecten met buitengevelisolatie (ETICS) en gevelafwerking. Per project: plaats, aanpak en afwerking. Regio Rotterdam en omgeving.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/over-ons/",
    title: "Over ons | BM Klus BV",
    description:
      "BM Klus BV: specialist in buitengevelisolatie (ETICS) en gevelafwerking (stuc, sierpleister, schilderwerk) in regio Rotterdam en omgeving.",
    changefreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/contact/",
    title: "Contact & offerte aanvragen | BM Klus BV",
    description:
      "Neem contact op met BM Klus BV voor een offerte of advies. Telefoon/WhatsApp, e-mail, adres in Rotterdam en openingstijden.",
    changefreq: "yearly",
    priority: 0.5,
  },
  {
    path: "/privacybeleid/",
    title: "Privacybeleid & Cookiebeleid | BM Klus BV",
    description:
      "Lees hoe BM Klus BV omgaat met persoonsgegevens en cookies. Informatie over Google Analytics/Ads, cookievoorkeuren, bewaartermijnen en uw rechten.",
    changefreq: "yearly",
    priority: 0.2,
  },

  // ── Money pages (services) ────────────────────────────────────────────────
  {
    path: "/gevelisolatie/",
    title: "Gevelisolatie buitenkant (ETICS) – prijs per m² | BM Klus BV",
    description:
      "Gevelisolatie aan de buitenkant (ETICS) met afwerking: stuc, sierpleister/crepi of steenstrips. Heldere prijs per m² na gratis opname.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/gevel-schilderen/",
    title: "Gevel schilderen: kosten per m² & offerte | BM Klus BV",
    description:
      "Gevel schilderen (buitenmuur verven) in regio Rotterdam. Dampopen systemen (silicaat/KEIM of siloxaan), voorbereiding, kosten per m², onderhoud & FAQ.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/buiten-stucwerk/",
    title: "Buitenmuur stucen (gevel stucen) – prijs per m² | BM Klus BV",
    description:
      "Buitenmuur stucen / gevel stucen in regio Rotterdam. Cementpleister, betonstuc, spachtelputz, crepi. Kosten per m² na gratis opname.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/sierpleister/",
    title: "Gevel sierpleister (spachtelputz/crepi) – prijs | BM Klus BV",
    description:
      "Gevel sierpleister: spachtelputz of crepi met korrel 1,5–3 mm. Richtprijzen per m², werkwijze, details (plint/dagkanten) en onderhoud. Regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/muren-stucen/",
    title: "Muren stucen (binnen) – sausklaar stucwerk | BM Klus BV",
    description:
      "Binnenmuren stucen: behangklaar of sausklaar. Richtprijzen per m², werkwijze, voorbereiding en droogtijd. Regio Rotterdam (±80–100 km).",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/schoonmaak-na-verbouwing/",
    title: "Schoonmaak na verbouwing | BM Klus BV",
    description:
      "Professionele schoonmaak na verbouwing of renovatie in regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.6,
    enabled: false,
  },

  // ── Gevelisolatie cluster ─────────────────────────────────────────────────
  {
    path: "/gevelisolatie/kosten/",
    title: "Kosten gevelisolatie buiten – prijs per m² | BM Klus BV",
    description:
      "Wat kost buitengevelisolatie per m²? Kostenfactoren, afwerking (stuc/steenstrips) en voorbeeldranges. Gratis opname in Regio Rotterdam (±80–100 km).",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/materialen/",
    title: "Gevelisolatie platen – EPS, PIR & minerale wol | BM Klus BV",
    description:
      "Vergelijk gevelisolatie platen (EPS, PIR, minerale wol): diktes, brandklasse, dampopenheid en afwerking op ETICS. Advies op locatie.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/afwerkingen/",
    title: "Afwerking gevelisolatie – stuc, crepi, strips | BM Klus BV",
    description:
      "Welke afwerking past bij buitengevelisolatie? Stucwerk, sierpleister/crepi, steenstrips of schilderwerk. Keuzes, voor- en nadelen.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/rc-waarde-dikte/",
    title: "Rc-waarde & dikte gevelisolatie (buiten) | BM Klus BV",
    description:
      "Welke Rc/Rd-waarde en dikte past bij jouw gevel? Uitleg EPS/PIR/wol, typische ranges en aandacht voor details. Gratis opname.",
    changefreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/gevelisolatie/subsidie-vergunning/",
    title: "Subsidie & vergunning gevelisolatie | BM Klus BV",
    description:
      "ISDE-subsidie en vergunningen bij buitengevelisolatie: voorwaarden op hoofdlijnen, stappenplan en praktische checklist.",
    changefreq: "yearly",
    priority: 0.6,
  },

  // ── Gevelisolatie location pages ─────────────────────────────────────────
  {
    path: "/gevelisolatie/rotterdam/",
    title: "Gevelisolatie Rotterdam – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Gratis opname en offerte per m². VCA-gecertificeerd.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/gevelisolatie/den-haag/",
    title: "Gevelisolatie Den Haag – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Den Haag en omgeving. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist uit Rotterdam.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/gevelisolatie/delft/",
    title: "Gevelisolatie Delft – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Delft. Sierpleister, stucwerk of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/gevelisolatie/dordrecht/",
    title: "Gevelisolatie Dordrecht – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Dordrecht en omgeving. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    changefreq: "monthly",
    priority: 0.7,
  },

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
