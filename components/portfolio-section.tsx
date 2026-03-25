import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import ResponsiveImage from "@/components/responsive-image"

const projects = [
  {
    id: "rotterdam-julianastraat-aanbouw-isolatie-4cm-2026",
    baseName: "rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026-na-01",
    city: "Rotterdam",
    service: "Aanbouw isolatie 4 cm & sierpleister",
    highlight: "Isolatie + sierpleister 1,5 mm + plint antraciet",
    href: "/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/",
  },
  {
    id: "etten-leur-gevelisolatie-6cm-2025",
    baseName: "etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01",
    city: "Etten-Leur",
    service: "Gevelisolatie 6 cm & sierpleister",
    highlight: "Strikolith isolatie + profielafwerking",
    href: "/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/",
  },
  {
    id: "etten-leur-gevelisolatie-10cm-2025",
    baseName: "etten-leur-gevelisolatie-10cm-ral9010-2025/etten-leur-gevelisolatie-10cm-ral9010-2025-na-01",
    city: "Etten-Leur",
    service: "Gevelisolatie 10 cm & RAL 9010",
    highlight: "Volledige gevelisolatie + schilderwerk",
    href: "/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/",
  },
  {
    id: "halsteren-buitenstucwerk-2025",
    baseName: "halsteren-buitenstucwerk-na-01",
    city: "Halsteren",
    service: "Buitenstucwerk & sierpleister",
    highlight: "Volledige gevelrenovatie",
    href: "/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/",
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
                <ResponsiveImage
                  baseName={project.baseName}
                  dir="/images/projects"
                  preset="card"
                  alt={`Gevelproject in ${project.city}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
