import type { Metadata } from "next"

import { SITE, absUrl, normalizePath } from "@/lib/seo/routes"

export type MetaInput = {
  title: string
  description: string
  path: string
  noindex?: boolean
  ogImage?: string
}

function normalizeText(value: string): string {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function truncateWithEllipsis(value: string, maxLen: number): string {
  const text = normalizeText(value)
  if (text.length <= maxLen) return text
  if (maxLen <= 1) return text.slice(0, maxLen)
  return `${text.slice(0, maxLen - 1).trimEnd()}…`
}

export function makeMetadata(input: MetaInput): Metadata {
  const baseTitle = truncateWithEllipsis(input.title, 60)
  const withSuffix = `${baseTitle} | ${SITE.siteName}`

  const finalTitle =
    withSuffix.length <= 60 ? withSuffix : truncateWithEllipsis(baseTitle, 60)

  const finalDescription = truncateWithEllipsis(input.description, 160)
  const canonical = absUrl(normalizePath(input.path))

  const ogImageUrl = absUrl(input.ogImage ?? SITE.defaultOgImage)
  const isNoIndex = Boolean(input.noindex)

  return {
    metadataBase: new URL(SITE.canonicalBase),
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical },
    robots: isNoIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: SITE.siteName,
      locale: SITE.locale,
      type: "website",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [ogImageUrl],
    },
  }
}

