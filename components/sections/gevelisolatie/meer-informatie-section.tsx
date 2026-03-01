import Link from "next/link"
import { ArrowRight, Layers, Paintbrush2, Palette, Images, LayoutGrid, MapPin } from "lucide-react"

const links = [
  {
    label: "Al onze diensten",
    description: "Bekijk het volledige aanbod van BM Klus BV",
    href: "/diensten/",
    icon: LayoutGrid,
  },
  {
    label: "Buiten stucwerk",
    description: "Glad stucwerk op de buitengevel, duurzaam en strak",
    href: "/buiten-stucwerk/",
    icon: Layers,
  },
  {
    label: "Sierpleister (gevel)",
    description: "Decoratieve afwerking in diverse structuren en kleuren",
    href: "/sierpleister/",
    icon: Palette,
  },
  {
    label: "Gevel schilderen",
    description: "Verflaag als bescherming en opfrisbeurt voor de gevel",
    href: "/gevel-schilderen/",
    icon: Paintbrush2,
  },
  {
    label: "Onze projecten",
    description: "Zie uitgevoerde renovaties in de regio Rotterdam",
    href: "/onze-werken/",
    icon: Images,
  },
]

const locationLinks = [
  { label: "Rotterdam", href: "/gevelisolatie/rotterdam/" },
  { label: "Den Haag", href: "/gevelisolatie/den-haag/" },
  { label: "Delft", href: "/gevelisolatie/delft/" },
  { label: "Dordrecht", href: "/gevelisolatie/dordrecht/" },
]

export default function MeerInformatieSection() {
  return (
    <nav aria-label="Gerelateerde pagina's" className="py-16 sm:py-20 lg:py-24">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Gerelateerde pagina's
        </span>
      </div>

      {/* Cards grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">
                  {link.label}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {link.description}
                </p>
              </div>
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          )
        })}
      </div>

      {/* Location links */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Gevelisolatie per regio
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {locationLinks.map((loc) => (
            <Link
              key={loc.href}
              href={loc.href}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              {loc.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
