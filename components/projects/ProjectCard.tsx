import Link from "next/link"
import ClientImage from "@/components/client-image"
import type { ResolvedProjectCard } from "@/lib/types/projects"

// Rendered inside the client ProjectsSection too, so images come resolved
// (resolveProjectCards) instead of through ResponsiveImage and the manifest.
interface ProjectCardProps {
  project: ResolvedProjectCard
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { serviceType, serviceTypes, title, meta, cardAlt, coverImage, beforeThumb, projectUrl, resolved } =
    project

  const secondaryChips = serviceTypes.filter((s) => s !== serviceType)
  const visibleChips = secondaryChips.slice(0, 2)
  const overflowCount = secondaryChips.length - visibleChips.length

  const inner = (
    <div
      aria-label={cardAlt}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/60">
        <ClientImage
          image={resolved.cover}
          alt={coverImage.alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {serviceType}
          </span>
        </div>
        {(meta.yearDisplay ?? meta.year) && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center rounded-full bg-black/30 px-2 py-0.5 text-[9px] font-medium text-white/70 backdrop-blur-sm">
              {meta.yearDisplay ?? meta.year}
            </span>
          </div>
        )}
        {beforeThumb && resolved.beforeThumb && (
          <div className="absolute bottom-3 left-3 overflow-hidden rounded-md border-2 border-white/70 shadow-md">
            <div className="relative h-14 w-14">
              <ClientImage
                image={resolved.beforeThumb}
                alt={beforeThumb.alt}
                sizes="56px"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-center text-[8px] font-bold uppercase tracking-wider text-white">
                Voor
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
          {meta.city} · {meta.objectType}
        </p>
        {visibleChips.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {visibleChips.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/60"
              >
                {s}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground/60">
                +{overflowCount}
              </span>
            )}
          </div>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {meta.highlight}
        </p>
        <p className="mt-auto pt-2 text-xs font-semibold text-primary">
          {projectUrl ? "Bekijk details \u2192" : "Binnenkort beschikbaar"}
        </p>
      </div>
    </div>
  )

  if (projectUrl) {
    return <Link href={projectUrl}>{inner}</Link>
  }

  return inner
}
