import { createElement } from "react"

import { SITE } from "@/lib/seo/routes"

const AREA_SERVED = [
  "Rotterdam",
  "Den Haag",
  "Delft",
  "Dordrecht",
  "Schiedam",
  "Vlaardingen",
  "Leiden",
  "Gouda",
  "Zoetermeer",
  "Capelle aan den IJssel",
  "Spijkenisse",
  "Barendrecht",
  "Ridderkerk",
  "Alphen aan den Rijn",
  "Maassluis",
  "Hellevoetsluis",
  "Breda",
  "Bergen op Zoom",
  "Roosendaal",
  "Leidschendam-Voorburg",
  "Hendrik-Ido-Ambacht",
].map((name) => ({ "@type": "City" as const, name }))

export function jsonLdScript(data: object) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  })
}

export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE.canonicalBase}/#business`,
    name: SITE.siteName,
    url: SITE.canonicalBase,
    telephone: "+31612079808",
    email: "info@bm-klus-bv.nl",
    inLanguage: SITE.lang,
    image: `${SITE.canonicalBase}/images/logo-bm-klus.webp`,
    logo: `${SITE.canonicalBase}/images/logo-bm-klus.webp`,
    description:
      "Specialist in buitengevelisolatie (ETICS), stucwerk, sierpleister en gevel schilderen in regio Rotterdam en Zuid-Holland.",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bonaventurastraat 58B",
      postalCode: "3081 HE",
      addressLocality: "Rotterdam",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.9225,
      longitude: 4.4792,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" },
    ],
    areaServed: AREA_SERVED,
    sameAs: [
      "https://www.instagram.com/bm_klus_bv",
      "https://www.facebook.com/profile.php?id=61556805434705",
      "https://www.linkedin.com/in/boris-mitov-a436902b9",
      "https://nl.pinterest.com/bmklusbv/",
      "https://www.youtube.com/@bm-klus-bv",
    ],
  }
}

export function serviceSchema(opts: {
  name: string
  description: string
  url: string
  lowPrice?: string
  highPrice?: string
  unitText?: string
}): Record<string, unknown> {
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": `${SITE.canonicalBase}/#business` },
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gevelisolatie diensten",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "ETICS + pleisterafwerking",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gevelisolatie met stucwerk" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gevelisolatie met sierpleister" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gevelisolatie met crepi" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "ETICS + steenstrips",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gevelisolatie met steenstrips" } },
          ],
        },
      ],
    },
  }

  if (opts.lowPrice !== undefined && opts.highPrice !== undefined) {
    base.offers = {
      "@type": "AggregateOffer",
      lowPrice: opts.lowPrice,
      highPrice: opts.highPrice,
      priceCurrency: "EUR",
      unitText: opts.unitText ?? "per m²",
    }
  }

  return base
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

export function videoSchema(opts: {
  name: string
  description: string
  videoId: string
  thumbnailUrl: string
  /** ISO 8601 with timezone, e.g. "2026-03-26T00:00:00+01:00" */
  uploadDate: string
  duration: string
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: opts.name,
    description: opts.description,
    thumbnailUrl: opts.thumbnailUrl,
    uploadDate: opts.uploadDate,
    duration: opts.duration,
    embedUrl: `https://www.youtube.com/embed/${opts.videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${opts.videoId}`,
    publisher: { "@id": `${SITE.canonicalBase}/#business` },
  }
}

export function projectPageSchema(opts: {
  title: string
  description: string
  url: string
  image: string
  city: string
  year: number
  serviceTypes: string[]
}): Record<string, unknown>[] {
  const base = SITE.canonicalBase

  return [
    breadcrumbSchema([
      { name: "Home", item: `${base}/` },
      { name: "Onze werken", item: `${base}/onze-werken/` },
      { name: opts.title, item: opts.url },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: opts.title,
      description: opts.description,
      url: opts.url,
      image: `${base}${opts.image}`,
      author: { "@id": `${base}/#business` },
      publisher: { "@id": `${base}/#business` },
      datePublished: `${opts.year}-01-01`,
      about: opts.serviceTypes.map((s) => ({
        "@type": "Service",
        name: s,
      })),
      contentLocation: {
        "@type": "Place",
        name: opts.city,
        address: { "@type": "PostalAddress", addressCountry: "NL" },
      },
    },
  ]
}

