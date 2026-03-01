import type { Metadata } from "next"

import { getPagePlan, getSiteUrl } from "@/data/sitemap-plan"
import { SITE } from "@/lib/seo/routes"

function normalizeText(value: string): string {
  return (value ?? "").replace(/\s+/g, " ").trim()
}

function truncateWithEllipsis(value: string, maxLen: number): string {
  const text = normalizeText(value)
  if (text.length <= maxLen) return text
  if (maxLen <= 1) return text.slice(0, maxLen)
  return `${text.slice(0, maxLen - 1).trimEnd()}…`
}

// ── buildPageMetadata ──────────────────────────────────────────────────────────

type PageMetaOverrides = Partial<{
  title: string
  description: string
  image: string
}>

function ensureTrailingSlash(p: string): string {
  if (!p || p === "/") return "/"
  return p.endsWith("/") ? p : `${p}/`
}

/**
 * High-level metadata builder: pulls title/description from PLANNED_ROUTES
 * in data/sitemap-plan.ts, applies optional overrides, and returns a
 * complete Next.js Metadata object.
 *
 * Uses getSiteUrl() (NEXT_PUBLIC_SITE_URL) for the base URL so dev builds
 * produce dev-prefixed canonical/OG URLs automatically.
 */
export function buildPageMetadata(
  path: string,
  overrides?: PageMetaOverrides,
): Metadata {
  const baseUrl = getSiteUrl()
  const normalizedPath = ensureTrailingSlash(path)
  const plan = getPagePlan(normalizedPath)

  const title = overrides?.title ?? plan?.title ?? ""
  const description = overrides?.description ?? plan?.description ?? ""
  const canonical = `${baseUrl}${normalizedPath}`

  const finalTitle = title ? truncateWithEllipsis(title, 60) : undefined
  const finalDescription = description
    ? truncateWithEllipsis(description, 160)
    : undefined

  const ogImage = overrides?.image
    ? `${baseUrl}${overrides.image}`
    : `${baseUrl}${SITE.defaultOgImage}`

  const meta: Metadata = {
    metadataBase: new URL(baseUrl),
    alternates: { canonical },
  }

  if (finalTitle) meta.title = finalTitle
  if (finalDescription) meta.description = finalDescription

  if (finalTitle || finalDescription) {
    meta.openGraph = {
      ...(finalTitle && { title: finalTitle }),
      ...(finalDescription && { description: finalDescription }),
      url: canonical,
      siteName: SITE.siteName,
      locale: SITE.locale,
      type: "website",
      images: [{ url: ogImage }],
    }
    meta.twitter = {
      card: "summary_large_image",
      ...(finalTitle && { title: finalTitle }),
      ...(finalDescription && { description: finalDescription }),
      images: [ogImage],
    }
  }

  return meta
}

