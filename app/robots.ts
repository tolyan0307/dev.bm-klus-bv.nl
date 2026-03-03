import type { MetadataRoute } from "next"

import { getSiteUrl } from "@/data/sitemap-plan"

export const dynamic = "force-static"

/** Production hostnames that should be indexed. All other hosts get disallow. */
const PRODUCTION_HOSTS = new Set(["bm-klus-bv.nl", "www.bm-klus-bv.nl"])

function isProductionHost(url: string): boolean {
  try {
    return PRODUCTION_HOSTS.has(new URL(url).hostname)
  } catch {
    return false
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()
  const isProd = isProductionHost(baseUrl)

  return {
    rules: {
      userAgent: "*",
      ...(isProd ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
