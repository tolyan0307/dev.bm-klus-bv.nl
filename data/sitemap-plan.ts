export type PlannedRoute = {
  /**
   * Page URL path.
   * Must be a page path that ends with "/" (including "/").
   */
  path: string
  changefreq?: "weekly" | "monthly" | "yearly"
  priority?: number
  /**
   * Default is enabled (included in sitemap).
   * Disable routes until real page content exists.
   */
  enabled?: boolean
}

export const PLANNED_ROUTES = [
  // Core pages (FINAL SITE MAP v1)
  { path: "/", changefreq: "monthly", priority: 1.0 },
  // TODO: Enable when the real page exists in app/
  { path: "/diensten/", changefreq: "monthly", priority: 0.8, enabled: false },
  // TODO: Enable when the real page exists in app/
  { path: "/onze-werken/", changefreq: "monthly", priority: 0.7, enabled: false },
  // TODO: Enable when the real page exists in app/
  { path: "/over-ons/", changefreq: "yearly", priority: 0.4, enabled: false },
  // TODO: Enable when the real page exists in app/
  { path: "/contact/", changefreq: "yearly", priority: 0.5, enabled: false },
  // TODO: Enable when the real page exists in app/
  { path: "/privacybeleid/", changefreq: "yearly", priority: 0.2, enabled: false },

  // Money pages (services)
  // TODO: Enable when each service page is ready (real content)
  { path: "/gevelisolatie/", changefreq: "monthly", priority: 0.9, enabled: false },
  { path: "/gevel-schilderen/", changefreq: "monthly", priority: 0.8, enabled: false },
  { path: "/buiten-stucwerk/", changefreq: "monthly", priority: 0.8, enabled: false },
  { path: "/sierpleister/", changefreq: "monthly", priority: 0.8, enabled: false },
  { path: "/muren-stucen/", changefreq: "monthly", priority: 0.8, enabled: false },

  // Include only if actually sold; otherwise keep disabled.
  { path: "/schoonmaak-na-verbouwing/", changefreq: "monthly", priority: 0.6, enabled: false },

  // Gevelisolatie cluster (later; keep disabled until content exists)
  { path: "/gevelisolatie/kosten/", changefreq: "yearly", priority: 0.6, enabled: false },
  { path: "/gevelisolatie/materialen/", changefreq: "yearly", priority: 0.6, enabled: false },
  { path: "/gevelisolatie/afwerkingen/", changefreq: "yearly", priority: 0.6, enabled: false },
  { path: "/gevelisolatie/rc-waarde-dikte/", changefreq: "yearly", priority: 0.6, enabled: false },
  { path: "/gevelisolatie/subsidie-vergunning/", changefreq: "yearly", priority: 0.6, enabled: false },

  // Projects (dynamic)
  // TODO: Do NOT enumerate /onze-werken/<project-slug>/ until we have a data source.
  // Slug format: plaats-werkzaamheden-jaar

  // Optional booster/filter page (disabled by default)
  { path: "/onze-werken/gevelisolatie/", changefreq: "monthly", priority: 0.5, enabled: false },
] satisfies readonly PlannedRoute[]

