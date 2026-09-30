import Link from "next/link"
import { projects } from "@/lib/content/projects"
import { resolveProjectCards } from "@/lib/gallery-utils"
import { ProjectCard } from "@/components/projects/ProjectCard"
import type { ProjectCard as ProjectCardData } from "@/lib/types/projects"

// Project cards for a service or a city, picked from lib/content/projects.ts,
// so new projects show up on the matching pages without extra wiring.

/**
 * Projects with this service: primary service first, then projects whose slug
 * names the keyword (e.g. "sierpleister"), otherwise the curated order of projects.ts.
 */
export function projectsForService(service: string, keyword?: string): ProjectCardData[] {
  const score = (p: ProjectCardData) =>
    (p.serviceType === service ? 2 : 0) + (keyword && p.slug.includes(keyword) ? 1 : 0)
  return projects
    .filter((p) => p.serviceTypes.includes(service))
    .map((p, i) => ({ p, i, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map(({ p }) => p)
}

// Villages that belong to a city page's municipality.
const CITY_ALIASES: Record<string, string[]> = {
  "Bergen op Zoom": ["Halsteren"],
}

/** Projects located in this city (meta.city starts with the city name or an alias). */
export function projectsForCity(city: string): ProjectCardData[] {
  const names = [city, ...(CITY_ALIASES[city] ?? [])].map((n) => n.toLowerCase())
  return projects.filter((p) => {
    const c = p.meta.city.toLowerCase()
    return names.some((n) => c === n || c.startsWith(`${n} `))
  })
}

interface RelatedProjectsProps {
  items: ProjectCardData[]
  tagline: string
  heading: string
  accent: string
  lead?: string
  limit?: number
  id?: string
}

export function RelatedProjects({
  items,
  tagline,
  heading,
  accent,
  lead,
  limit = 3,
  id = "projecten",
}: RelatedProjectsProps) {
  const cards = resolveProjectCards(items.slice(0, limit))
  if (cards.length === 0) return null

  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">{tagline}</span>
        </div>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading} <span className="text-primary">{accent}</span>
        </h2>
        {lead && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href="/onze-werken/" className="font-semibold text-primary underline-offset-2 hover:underline">
            Bekijk al onze projecten →
          </Link>
        </p>
      </div>
    </section>
  )
}
