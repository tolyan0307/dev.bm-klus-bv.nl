import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ResponsiveImage from "@/components/responsive-image"
import { projects } from "@/lib/content/projects"

function srcToBaseName(src: string): string {
  return src.replace(/^\/images\/projects\//, "").replace(/\.\w+$/, "")
}

interface RelatedProjectsProps {
  serviceFilter: string
  max?: number
}

export default function RelatedProjects({
  serviceFilter,
  max = 3,
}: RelatedProjectsProps) {
  const matched = projects
    .filter((p) => p.projectUrl && p.serviceTypes.includes(serviceFilter))
    .slice(0, max)

  if (matched.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" aria-hidden />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Recente projecten
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bekijk onze <span className="text-primary">werken</span>
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Voorbeelden van recent uitgevoerde projecten met{" "}
          {serviceFilter.toLowerCase()}.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matched.map((project) => (
            <Link
              key={project.slug}
              href={project.projectUrl}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/60">
                <ResponsiveImage
                  baseName={srcToBaseName(project.coverImage.src)}
                  dir="/images/projects"
                  preset="card"
                  alt={project.coverImage.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
              </div>
              <div className="flex flex-col gap-1.5 p-4">
                <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
                  {project.meta.city} · {project.meta.objectType}
                </p>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                  {project.title}
                </h3>
                <p className="mt-auto pt-1 text-xs font-semibold text-primary">
                  Bekijk details →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/onze-werken/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Alle projecten bekijken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
