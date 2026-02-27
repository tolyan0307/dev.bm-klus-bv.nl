import { createElement } from "react"

import { SITE } from "@/lib/seo/routes"

export function jsonLdScript(data: object) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  })
}

export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.siteName,
    url: SITE.canonicalBase,
    inLanguage: SITE.lang,
    areaServed: [
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Place", name: SITE.regionText },
    ],
    sameAs: [], // TODO: add social profile URLs
    // TODO: Add telephone, email, address, and openingHours once confirmed.
  }
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE.canonicalBase,
    name: SITE.siteName,
    inLanguage: SITE.lang,
    // TODO: Add SearchAction only if site search is available.
  }
}

export type BreadcrumbSchemaItem = {
  name: string
  item: string
}

export function breadcrumbSchema(items: BreadcrumbSchemaItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  }
}

