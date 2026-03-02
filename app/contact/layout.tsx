import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

export const metadata = buildPageMetadata("/contact/")

const base = SITE.canonicalBase

export default function ContactLayout({ children }: { children: ReactNode }) {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Contact", item: `${base}/contact/` },
  ])

  const business = localBusinessSchema()

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact & offerte aanvragen",
    description:
      "Neem contact op met BM Klus BV voor een offerte of advies. Telefoon/WhatsApp, e-mail, adres in Rotterdam en openingstijden.",
    url: `${base}/contact/`,
    mainEntity: {
      "@type": "Organization",
      name: "BM Klus BV",
      telephone: "+31612079808",
      email: "info@bm-klus-bv.nl",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bonaventurastraat 58B",
        postalCode: "3081 HE",
        addressLocality: "Rotterdam",
        addressRegion: "Zuid-Holland",
        addressCountry: "NL",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+31612079808",
        contactType: "customer service",
        availableLanguage: ["Dutch"],
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 51.9225,
            longitude: 4.4792,
          },
          geoRadius: "100000",
        },
      },
    },
  }

  return (
    <>
      {jsonLdScript(breadcrumbs)}
      {jsonLdScript(business)}
      {jsonLdScript(contactPageSchema)}
      {children}
    </>
  )
}
