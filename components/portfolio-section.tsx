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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    city: "Rotterdam",
    service: "Gevelisolatie ETICS",
    highlight: "40% energiebesparing",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    city: "Schiedam",
    service: "Stucwerk + Isolatie",
    highlight: "Complete renovatie",
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
    city: "Capelle aan den IJssel",
    service: "Steenstrips",
    highlight: "Modern & onderhoudsvriendelijk",
  },
]

export default function PortfolioSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Onze <span className="text-primary">werken</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bekijk een selectie van onze recent afgeronde projecten in de regio Rotterdam. Elk project is met zorg en vakmanschap uitgevoerd.
          </p>
        </div>

        {/* Project grid - all same size */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
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
            </div>
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
