import type { ProjectCard as ProjectCardType } from "@/lib/types/projects"
import { ProjectCard } from "./ProjectCard"

interface ProjectsGridProps {
  projects: ProjectCardType[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-8 py-16 text-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
            Projecten worden momenteel toegevoegd
          </p>
          <p className="mt-2 text-sm text-muted-foreground/60">
            Binnenkort verschijnen hier projectkaarten met voor/na foto&apos;s.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
