import type { MetadataRoute } from "next"

import { PLANNED_ROUTES } from "@/data/sitemap-plan"
import { absUrl, normalizePath } from "@/lib/seo/routes"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return PLANNED_ROUTES
    .filter((r) => r.enabled !== false)
    .map((r) => ({
      url: absUrl(normalizePath(r.path)),
      lastModified,
      changeFrequency: r.changefreq,
      priority: r.priority,
    }))
}

