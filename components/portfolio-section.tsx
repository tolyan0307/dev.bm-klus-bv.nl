import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    image: "/images/portfolio-hero.webp",
    city: "Rotterdam Centrum",
    service: "Complete geveltransformatie",
    highlight: "ETICS isolatie + moderne afwerking",
  },
  {
    image: "/images/projects/halsteren-buitenstucwerk-na-02.webp",
    city: "Halsteren",
    service: "Buitenstucwerk & sierpleister",
    highlight: "Volledige gevelrenovatie",
  },
  {
    image: "/images/projects/halsteren-buitenstucwerk-na-05.webp",
    city: "Halsteren",
    service: "Stucwerk + schilderwerk",
    highlight: "Strakke moderne afwerking",
  },
  {
    image: "/images/projects/halsteren-buitenstucwerk-na-08.webp",
    city: "Halsteren",
    service: "Sierpleister afwerking",
    highlight: "Duurzaam & onderhoudsarm",
  },
]

export default function PortfolioSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — centered */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Portfolio
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Onze <span className="text-primary">werken</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bekijk een selectie van onze recent afgeronde projecten in de regio Rotterdam. Elk project is met zorg en vakmanschap uitgevoerd.
          </p>
        </div>

        {/* Project grid - all same size */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <Link
              key={index}
              href="/onze-werken/"
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={`Gevelproject in ${project.city}`}
                  width={480}
                  height={360}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{project.city}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{project.service}</h3>
                <p className="mt-0.5 text-xs font-medium text-primary">{project.highlight}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA buttons below grid */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/onze-werken/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Alle projecten bekijken
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
