import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    location: "Rotterdam-Zuid",
    type: "Rijtjeshuis · 65 m²",
    afwerking: "Sierpleister (korrel 1,5 mm)",
    before: "/images/before-after/rotterdam-zuid-before.webp",
    after: "/images/before-after/rotterdam-zuid-after.webp",
  },
  {
    location: "Schiedam",
    type: "Hoekwoning · 85 m²",
    afwerking: "Glad stucwerk",
    before: "/images/before-after/schiedam-before.webp",
    after: "/images/before-after/schiedam-after.webp",
  },
  {
    location: "Halsteren",
    type: "2-onder-1-kap · 110 m²",
    afwerking: "Sierpleister + schilderwerk",
    before: "/images/before-after/halsteren-before.webp",
    after: "/images/before-after/halsteren-after.webp",
  },
]

export default function BeforeAfterSection() {
  return (
    <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Resultaten
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Voor &{" "}
          <span className="text-primary">na</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Bekijk het verschil: enkele recente projecten in de regio Rotterdam.
        </p>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.location}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Images */}
              <div className="grid grid-cols-2">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={project.before}
                    alt={`Gevel vóór isolatie — ${project.location}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Voor
                  </span>
                </div>
                <div className="relative h-40 overflow-hidden border-l border-border">
                  <Image
                    src={project.after}
                    alt={`Gevel na isolatie en afwerking — ${project.location}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-primary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Na
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-bold text-foreground">
                  {project.location}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {project.type}
                </p>
                <p className="mt-1 text-xs text-primary font-medium">
                  {project.afwerking}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
          <p className="text-sm font-bold text-foreground">
            Meer projecten bekijken?
          </p>
          <Link
            href="/onze-werken/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#d46218]"
          >
            Bekijk alle projecten
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
