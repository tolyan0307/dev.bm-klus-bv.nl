import type { MetadataRoute } from "next"

import { getSiteUrl } from "@/data/sitemap-plan"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()
  const isDev = baseUrl.includes("dev.")

  return {
    rules: {
      userAgent: "*",
      ...(isDev ? { disallow: "/" } : { allow: "/" }),
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
