import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-16 sm:py-20 lg:py-24">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Label */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Offerte aanvragen
            </span>
            <div className="h-px w-10 bg-primary" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl lg:text-5xl">
            Klaar voor een
            <br />
            <span className="text-primary">moderne gevel?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-background/70 sm:text-lg">
            Plan een gratis inspectie en ontvang binnen 48 uur een vrijblijvende offerte.
            Onze experts denken graag met u mee over de beste oplossing voor uw woning.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/contact/"
              className="group inline-flex items-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <Phone className="h-5 w-5" />
              Plan gratis inspectie
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/gevelisolatie/"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-background/30 bg-transparent px-8 py-4 text-base font-semibold text-background transition-all hover:border-primary hover:text-primary"
            >
              Meer over isolatie
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-background/60 sm:gap-10">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Binnen 24-48 uur offerte</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>15+ jaar ervaring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Garantie op materiaal & werk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
