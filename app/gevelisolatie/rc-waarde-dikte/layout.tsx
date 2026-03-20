import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

export const metadata = buildPageMetadata("/gevelisolatie/rc-waarde-dikte/")

const base = SITE.canonicalBase

export default function RcWaardeDikteLayout({
  children,
}: {
  children: ReactNode
}) {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Gevelisolatie", item: `${base}/gevelisolatie/` },
    {
      name: "Rc-waarde & dikte",
      item: `${base}/gevelisolatie/rc-waarde-dikte/`,
    },
  ])

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Rc-waarde & isolatiedikte — buitengevelisolatie",
    description:
      "Bereken hoeveel buitengevelisolatie u nodig heeft. Rc-waarde, lambda en dikte per materiaal.",
    url: `${base}/gevelisolatie/rc-waarde-dikte/`,
  })

  return (
    <>
      {jsonLdScript(breadcrumbs)}
      {jsonLdScript(business)}
      {jsonLdScript(service)}
      {children}
    </>
  )
}
