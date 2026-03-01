import type { MetadataRoute } from "next"

import { PLANNED_ROUTES, getSiteUrl } from "@/data/sitemap-plan"
import { projects } from "@/lib/content/projects"

export const dynamic = "force-static"

function ensureTrailingSlash(p: string): string {
  if (!p || p === "/") return "/"
  return p.endsWith("/") ? p : `${p}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  const planned = PLANNED_ROUTES.filter((r) => r.enabled !== false).map(
    (r) => ({
      url: `${baseUrl}${ensureTrailingSlash(r.path)}`,
      lastModified,
      changeFrequency: r.changefreq,
      priority: r.priority,
    }),
  )

  const projectPages = projects
    .filter((p) => p.projectUrl)
    .map((p) => ({
      url: `${baseUrl}${ensureTrailingSlash(p.projectUrl)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))

  return [...planned, ...projectPages]
}
