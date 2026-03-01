"use client"

import { useState } from "react"
import type { ProjectCard } from "@/lib/types/projects"
import { ProjectsGrid } from "./ProjectsGrid"

interface ProjectsSectionProps {
  projects: ProjectCard[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [active, setActive] = useState<string | null>(null)

  const allTags = Array.from(new Set(projects.flatMap((p) => p.serviceTypes)))

  const filtered =
    active === null
      ? projects
      : projects.filter((p) => p.serviceTypes.includes(active))

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Filter op:
        </span>
        <button
          onClick={() => setActive(null)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
            active === null
              ? "border-primary bg-primary text-white"
              : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
          }`}
        >
          Alle
        </button>
        {allTags.map((type) => (
          <button
            key={type}
            onClick={() => setActive(active === type ? null : type)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
              active === type
                ? "border-primary bg-primary text-white"
                : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <ProjectsGrid projects={filtered} />
      </div>
    </>
  )
}
