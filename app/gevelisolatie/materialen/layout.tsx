import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

export const metadata = buildPageMetadata("/gevelisolatie/materialen/")

const base = SITE.canonicalBase

export default function MaterialenLayout({
  children,
}: {
  children: ReactNode
}) {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Gevelisolatie", item: `${base}/gevelisolatie/` },
    { name: "Materialen", item: `${base}/gevelisolatie/materialen/` },
  ])

  const business = localBusinessSchema()

  return (
    <>
      {jsonLdScript(breadcrumbs)}
      {jsonLdScript(business)}
      {children}
    </>
  )
}
