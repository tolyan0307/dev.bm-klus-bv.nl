import Link from "next/link"
import { ArrowRight, Euro, Layers, Package, Gauge, FileCheck } from "lucide-react"

const cards = [
  {
    icon: Euro,
    title: "Kosten & prijs per m²",
    description: "Richtprijzen, kostenfactoren en wat de offerte bepaalt.",
    href: "/gevelisolatie/kosten/",
  },
  {
    icon: Layers,
    title: "Afwerkingen vergelijken",
    description: "Stuc, sierpleister, crepi of steenstrips — advies per type.",
    href: "/gevelisolatie/afwerkingen/",
  },
  {
    icon: Package,
    title: "Materialen (EPS, PIR, wol)",
    description: "Isolatiemateriaal kiezen op lambda, brandklasse en budget.",
    href: "/gevelisolatie/materialen/",
  },
  {
    icon: Gauge,
    title: "Rc-waarde & isolatiedikte",
    description: "Welke dikte past bij uw gewenste energieprestatie?",
    href: "/gevelisolatie/rc-waarde-dikte/",
  },
  {
    icon: FileCheck,
    title: "Subsidie & vergunning",
    description: "ISDE, SEEH en omgevingsvergunning — checklist op maat.",
    href: "/gevelisolatie/subsidie-vergunning/",
  },
]

export default function VerdiepingSection() {
  return (
    <section aria-label="Verdieping" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* Header — matches site-wide section pattern */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-8 bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
          Verdieping
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Meer weten over{" "}
        <span className="text-primary">buitengevelisolatie?</span>
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Gedetailleerde informatie per onderwerp — van kosten tot materiaal en subsidie.
      </p>

      {/* Cards grid */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/15">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                  {card.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Lees meer
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
