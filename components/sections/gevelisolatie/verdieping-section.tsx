import Link from "next/link"
import { ArrowRight, Euro, Layers, Package, Gauge, FileCheck } from "lucide-react"
import ResponsiveImage from "@/components/responsive-image"

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
    description: "ISDE-subsidie en omgevingsvergunning — checklist op maat.",
    href: "/gevelisolatie/subsidie-vergunning/",
  },
]

export default function VerdiepingSection() {
  return (
    <section aria-label="Verdieping" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
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

      <div className="mt-12 overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-card via-card to-secondary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]">
        <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Image half */}
          <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-0">
            <ResponsiveImage
              baseName="verdieping-gevelwerk-proces"
              preset="card"
              alt="Gevelisolatie werkzaamheden"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent lg:bg-linear-to-l lg:from-transparent lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
              <div className="inline-flex items-center gap-2 rounded-xl bg-black/30 px-4 py-2.5 backdrop-blur-md ring-1 ring-white/10">
                <span className="h-2 w-2 rounded-full bg-[#EA6C20]" />
                <span className="text-[13px] font-medium text-white/90">
                  ETICS isolatie &amp; afwerking
                </span>
              </div>
            </div>
          </div>

          {/* Links half */}
          <div className="border-t border-border/30 lg:border-l lg:border-t-0">
            <div className="divide-y divide-border/25">
              {cards.map((card) => {
                const Icon = card.icon
                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group flex items-center gap-4 px-5 py-[18px] transition-colors hover:bg-primary/4 sm:px-7"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/7 ring-1 ring-primary/10 transition-all group-hover:bg-primary/12 group-hover:ring-primary/25 group-hover:shadow-[0_0_16px_rgba(234,108,32,0.1)]">
                      <Icon className="h-[18px] w-[18px] text-primary/70 transition-colors group-hover:text-primary" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {card.title}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground/60">
                        {card.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary/25 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
