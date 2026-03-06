import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "halsteren-buitenstucwerk-2025",
    image: "/images/projects/halsteren-buitenstucwerk-na-01.webp",
    city: "Halsteren",
    service: "Buitenstucwerk & sierpleister",
    highlight: "Volledige gevelrenovatie",
    href: "/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/",
  },
  {
    id: "dordrecht-gevelisolatie-2025",
    image: "/images/projects/dordrecht-gevelisolatie-10cm-na-01.webp",
    city: "Dordrecht",
    service: "Gevelisolatie 10 cm & sierpleister",
    highlight: "ETICS isolatie + steenstrips plint",
    href: "/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2024/",
  },
  {
    id: "bruinisse-gevelisolatie-2025",
    image: "/images/projects/bruinisse-gevelisolatie-6cm-na-01.webp",
    city: "Bruinisse",
    service: "Gevelisolatie 6 cm & sierpleister",
    highlight: "Energiebesparing + nieuwe uitstraling",
    href: "/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2024/",
  },
  {
    id: "rotterdam-buitenstucwerk-2025",
    image: "/images/projects/rotterdam-buitenstucwerk-na-01.webp",
    city: "Rotterdam",
    service: "Buitenstucwerk & cementpleister",
    highlight: "Strakke moderne afwerking",
    href: "/onze-werken/rotterdam-buitenstucwerk-cementpleister-2024/",
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
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-4/3 overflow-hidden">
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
                <p className="mt-0.5 text-sm font-medium text-primary">{project.highlight}</p>
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
