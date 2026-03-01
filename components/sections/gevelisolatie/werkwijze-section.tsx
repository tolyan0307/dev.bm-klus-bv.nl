"use client"

import Link from "next/link"
import { werkwijzeContent } from "@/lib/content/gevelisolatie"
import { Check, ChevronDown, ArrowRight } from "lucide-react"
import { useState } from "react"

// Per-step FAQ questions — SEO-rich long-tail
const stapFaqs: { q: string; a: string }[][] = [
  [
    { q: "Hoe lang duurt de opname?", a: "Gemiddeld 30–45 minuten. Wij meten op, beoordelen de ondergrond en bespreken uw wensen ter plekke." },
    { q: "Moet ik iets voorbereiden?", a: "Nee, wij regelen alles. Zorg alleen dat de gevel toegankelijk is." },
  ],
  [
    { q: "Hoe snel ontvang ik de offerte?", a: "Binnen 2 werkdagen na de opname ontvangt u een gedetailleerde offerte met vaste prijs per m²." },
    { q: "Wat staat er in de offerte?", a: "De RC-waarde, materiaalkeuze, prijs per m², totaalprijs en planning." },
  ],
  [
    { q: "Hoe ver van tevoren wordt gepland?", a: "Doorgaans 1–3 weken na akkoord, afhankelijk van het seizoen en onze bezetting." },
    { q: "Kan ik de startdatum zelf kiezen?", a: "We stemmen de datum altijd af op uw voorkeur en plannen dat schriftelijk in." },
  ],
  [
    { q: "Hoe lang staat de steiger?", a: "Gemiddeld de volledige uitvoeringsperiode, vaak 1–2 weken afhankelijk van de geveloppervlakte." },
    { q: "Worden beschadigingen hersteld?", a: "Ja, scheuren en losstaand metselwerk worden eerst hersteld voordat de isolatie begint." },
  ],
  [
    { q: "Welke isolatiedikte wordt gebruikt?", a: "Minimaal 100 mm EPS of gelijkwaardig, afgestemd op de gewenste RC-waarde (minimaal RC 3,5)." },
    { q: "Hoe lang duurt deze fase?", a: "Afhankelijk van de oppervlakte: 1–3 werkdagen voor een gemiddelde rijwoning." },
  ],
  [
    { q: "Moet ik aanwezig zijn bij oplevering?", a: "We raden het aan. U loopt samen met de uitvoerder het eindresultaat door en tekent af." },
    { q: "Wat als ik niet tevreden ben?", a: "Wij lossen eventuele punten direct op. Uw tevredenheid is onze garantie." },
  ],
]

export default function WerkwijzeSection() {
  const data = werkwijzeContent
  const [activeStep, setActiveStep] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const currentFaqs = stapFaqs[activeStep] ?? []
  const label = (titel: string) => titel.replace(/^\d+\.\s*/, "")

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header — стандарт ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Werkwijze
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Van opname tot{" "}
        <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
          oplevering
        </span>
      </h2>

      {/* ── DESKTOP: horizontal stepper ── */}
      <div className="mt-10 hidden lg:block">

        {/* Step tabs */}
        <div className="relative flex items-start gap-0">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-5 h-px bg-border" />

          {data.stappen.map((stap, i) => {
            const isActive = activeStep === i
            const isDone = i < activeStep
            return (
              <button
                key={i}
                onClick={() => { setActiveStep(i); setOpenFaq(null) }}
                className="group relative flex flex-1 flex-col items-center gap-2 px-2 text-center"
              >
                {/* dot */}
                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-black transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary text-white scale-110"
                      : isDone
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground group-hover:border-primary/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* label */}
                <span
                  className={`text-[11px] font-semibold leading-tight transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {label(stap.titel)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active step content panel */}
        <div className="mt-6 rounded-xl border border-border bg-card p-7">
          <div className="grid grid-cols-[1fr_1px_1fr] gap-8">

            {/* LEFT — step description */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Stap {activeStep + 1}
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground">
                {label(data.stappen[activeStep].titel)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {data.stappen[activeStep].tekst}
              </p>
            </div>

            {/* divider */}
            <div className="bg-border" />

            {/* RIGHT — FAQ */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Veelgestelde vragen
              </p>
              <div className="space-y-2">
                {currentFaqs.map((faq, fi) => (
                  <div key={fi} className="rounded-lg border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === fi ? null : fi)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                          openFaq === fi ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {openFaq === fi && (
                      <div className="border-t border-border bg-muted/30 px-4 py-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: vertical accordion ── */}
      <div className="mt-8 lg:hidden">
        <div className="flex flex-col">
          {data.stappen.map((stap, i) => {
            const isOpen = activeStep === i
            const isLast = i === data.stappen.length - 1
            return (
              <div key={i} className={`flex gap-4 ${!isLast ? "pb-0" : ""}`}>
                {/* line + dot */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => { setActiveStep(isOpen ? -1 : i); setOpenFaq(null) }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black transition-all ${
                      isOpen ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                  {!isLast && <div className="w-px flex-1 bg-border" style={{ minHeight: "24px" }} />}
                </div>

                {/* content */}
                <div className="flex-1 pb-6 pt-1">
                  <button
                    onClick={() => { setActiveStep(isOpen ? -1 : i); setOpenFaq(null) }}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className={`text-sm font-bold ${isOpen ? "text-primary" : "text-foreground"}`}>
                      {label(stap.titel)}
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm leading-relaxed text-muted-foreground">{stap.tekst}</p>
                      {/* FAQ */}
                      {(stapFaqs[i] ?? []).map((faq, fi) => (
                        <div key={fi} className="rounded-lg border border-border overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === fi ? null : fi)}
                            className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
                          >
                            <span className="text-xs font-semibold text-foreground">{faq.q}</span>
                            <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${openFaq === fi ? "rotate-180 text-primary" : ""}`} />
                          </button>
                          {openFaq === fi && (
                            <div className="border-t border-border bg-muted/30 px-3 py-2.5">
                              <p className="text-xs leading-relaxed text-muted-foreground">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Verwachting ── */}
      <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {data.verwachting.h3}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.verwachting.bullets.map((b) => (
            <div key={b} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
              </div>
              <span className="text-sm leading-snug text-foreground/70">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── End-of-section CTA ── */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
        <p className="text-sm font-bold text-foreground">Klaar om te starten?</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#d46218]"
          >
            Plan gratis inspectie
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/onze-werken/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Bekijk onze projecten
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

    </section>
  )
}
