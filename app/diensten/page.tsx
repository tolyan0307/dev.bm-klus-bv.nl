"use client"

import Link from "next/link"
import ServicesRail from "@/components/services/ServicesRail"
import { ClipboardCheck, FileText, Wrench, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react"
import { useState } from "react"

const processSteps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Intake & advies",
    description:
      "Wij komen langs voor een gratis inspectie en adviseren u over de beste oplossing voor uw gevel.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Offerte op maat",
      description:
      "Binnen 24–48 uur ontvangt u een duidelijke offerte met gedetailleerde prijsopbouw en planning.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Uitvoering & kwaliteit",
    description:
      "Ons vakkundige team voert het werk uit volgens planning, met oog voor detail en minimale overlast.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Oplevering & nazorg",
    description:
      "Na oplevering blijven wij beschikbaar voor vragen en nazorg. Garantie en klanttevredenheid staan voorop.",
  },
]

const faqItems = [
  {
    question: "Hoe snel kan het werk starten en wat is de doorlooptijd?",
    answer:
      "Na akkoord op de offerte plannen wij het werk meestal binnen 2-4 weken in. De doorlooptijd verschilt per project: van 2-3 dagen voor schilderwerk tot 1-2 weken voor complete gevelisolatie. Wij houden u gedurende het proces op de hoogte.",
  },
  {
    question: "Welke garantie krijg ik op de uitgevoerde werkzaamheden?",
    answer:
      "Wij werken met kwaliteitsmaterialen en voeren elk project zorgvuldig uit. Garantie op vakmanschap en materiaalgebreken wordt per project schriftelijk vastgelegd in de offerte.",
  },
  {
    question: "Moet ik mijn huis voorbereiden voor de werkzaamheden?",
    answer:
      "Wij zorgen voor alle voorbereidingen aan de buitenkant, inclusief steigers en afdekmaterialen. Voor binnen vragen we u alleen om waardevolle spullen nabij de werkplek weg te zetten. Wij adviseren u graag over specifieke voorbereidingen voor uw project.",
  },
  {
    question: "Hoe wordt de prijs bepaald en zijn er verborgen kosten?",
    answer:
      "De prijs is gebaseerd op de oppervlakte, gekozen materialen en complexiteit van het project. Onze offertes zijn all-in: materiaal, arbeid, steiger en afvoer van afval zijn inbegrepen. Geen verrassingen achteraf. Meerwerk wordt altijd vooraf overlegd.",
  },
  {
    question: "In welke regio's zijn jullie actief?",
    answer:
      "Wij werken voornamelijk in Rotterdam en omgeving (±80-100 km), inclusief Zuid-Holland en aangrenzende regio's. Denk aan gemeenten zoals Den Haag, Dordrecht, Delft, Gouda en Schiedam. Voor projecten buiten deze regio kunt u contact met ons opnemen voor de mogelijkheden.",
  },
]

export default function DienstenPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  return (
    <main className="min-h-screen bg-background">

      {/* Premium Hero Section */}
      <section className="relative min-h-[600px] w-full overflow-hidden bg-foreground sm:min-h-[650px] lg:min-h-[750px]">
        {/* Sophisticated gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,108,32,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,108,32,0.08)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 via-foreground/90 to-foreground/80" />

        {/* Animated decorative elements */}
        <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(234,108,32,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,108,32,1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Top fade for navbar integration */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-foreground/40 to-transparent" />

        {/* Content container */}
        <div className="relative z-10 flex min-h-[600px] items-center sm:min-h-[650px] lg:min-h-[750px]">
          <div className="container-default w-full pt-36 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
            <div className="mx-auto max-w-4xl text-center">

              {/* Premium eyebrow with icon accent */}
              <div className="mb-6 flex items-center justify-center gap-3 sm:mb-7">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary sm:text-sm">
                  Onze Diensten
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent via-primary to-primary" />
              </div>

              {/* Large, impactful headline with text balance */}
              <h1 className="mb-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-background sm:text-5xl lg:text-6xl xl:text-7xl">
                Diensten voor een{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">sterke</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary/30 blur-sm sm:h-4" />
                </span>
                {" "}en{" "}
                <span className="text-primary">mooie</span> gevel
              </h1>

              {/* Enhanced subtext with better spacing */}
              <p className="mx-auto mb-10 max-w-2xl text-balance text-base leading-relaxed text-background/75 sm:text-lg lg:text-xl">
                BM Klus BV verzorgt professionele geveloplossingen in regio Rotterdam en omgeving (±80-100 km), Zuid-Holland en omliggende regio's.
              </p>

              {/* Premium CTA buttons with enhanced styling */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact/"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-[#d46218] hover:shadow-2xl hover:shadow-primary/30 sm:px-10"
                >
                  Gratis offerte aanvragen
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#diensten"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-background/25 bg-background/10 px-8 py-4 text-base font-semibold text-background backdrop-blur-sm transition-all hover:border-background/40 hover:bg-background/20 sm:px-10"
                >
                  Bekijk alle diensten
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-background/60 sm:gap-8 sm:text-base lg:mt-16">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-medium">Gratis inspectie</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-medium">Duidelijke offerte</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-medium">Offerte binnen 24–48 uur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle animated gradient orb */}
        <div
          className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"
          style={{ animationDuration: "4s" }}
        />
      </section>

      {/* Services Rail with Keuzehulp */}
      <ServicesRail />

      {/* Process Section */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-3 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Ons proces
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Zo <span className="text-primary">werken</span> wij
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Van inspectie tot oplevering: transparant, professioneel en zonder verrassingen.
            </p>
          </div>

          {/* Desktop: Horizontal roadmap */}
          <div className="mt-16 hidden lg:mt-24 lg:block">
            {/* Progress bar */}
            <div className="relative mx-auto mb-16 max-w-5xl">
              <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-border" />
              <div
                className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(activeStepIndex / 3) * 100}%` }}
              />

              <div className="relative flex items-center justify-between">
                {processSteps.map((step, index) => (
                  <button
                    key={step.number}
                    onClick={() => setActiveStepIndex(index)}
                    className="group relative flex flex-col items-center"
                  >
                    <div
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-300 ${
                        index <= activeStepIndex
                          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <step.icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <span
                      className={`mt-4 text-sm font-bold transition-colors ${
                        index <= activeStepIndex ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expanded content for active step */}
            <div className="mx-auto max-w-3xl">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                <div className="flex items-center gap-8 p-10">
                  <span className="text-8xl font-bold leading-none text-primary/10">
                    {processSteps[activeStepIndex].number}
                  </span>
                  <div className="flex-1">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      Stap {processSteps[activeStepIndex].number}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {processSteps[activeStepIndex].title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {processSteps[activeStepIndex].description}
                    </p>
                  </div>
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    {(() => {
                      const Icon = processSteps[activeStepIndex].icon
                      return <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                    })()}
                  </div>
                </div>

                <div className="flex border-t border-border">
                  {processSteps.map((step, index) => (
                    <button
                      key={step.number}
                      onClick={() => setActiveStepIndex(index)}
                      className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${
                        index === activeStepIndex
                          ? "bg-primary/5 text-primary"
                          : "text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
                      }`}
                    >
                      <span className="font-bold">{step.number}</span>
                      <span className="hidden xl:inline">{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet: Stacked accordion style */}
          <div className="mt-12 space-y-3 lg:hidden">
            {processSteps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(index)}
                className={`group w-full rounded-xl border text-left transition-all duration-300 ${
                  activeStepIndex === index
                    ? "border-primary/30 bg-card shadow-md"
                    : "border-border bg-card/60 hover:bg-card hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-4 p-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all ${
                      activeStepIndex === index
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary/60 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    <span className="text-lg font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-base font-bold transition-colors ${
                        activeStepIndex === index ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <step.icon
                    className={`h-5 w-5 shrink-0 transition-colors ${
                      activeStepIndex === index
                        ? "text-primary"
                        : "text-border group-hover:text-primary/40"
                    }`}
                    strokeWidth={2}
                  />
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeStepIndex === index ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-border px-5 pt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-spacing bg-gradient-to-br from-foreground via-foreground to-primary/20">
        <div className="container-default">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-background sm:text-4xl lg:text-5xl">
              Binnen 24–48 uur een duidelijke offerte
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-background/70">
              Plan een gratis inspectie en ontvang snel een transparante offerte op maat voor uw project.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Plan gratis inspectie
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-background">
        <div className="container-default">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Header */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    FAQ
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Veelgestelde
                  <br />
                  <span className="text-primary">vragen</span>
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Heeft u vragen over onze diensten? Hier vindt u de antwoorden op de meest gestelde vragen.
                </p>
                <p className="mt-8 text-base text-muted-foreground">
                  Staat uw vraag er niet tussen?{" "}
                  <Link href="/contact/" className="font-semibold text-primary hover:underline">
                    Neem contact op
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: Accordion */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-xl border transition-all ${
                      openFaqIndex === index
                        ? "border-primary/40 bg-card shadow-md"
                        : "border-border bg-card shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-0.5 text-lg font-bold transition-colors ${
                            openFaqIndex === index ? "text-primary" : "text-border"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-semibold text-foreground sm:text-lg">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                          openFaqIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        openFaqIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-border/50 px-6 pb-6 pt-4">
                          <div className="pl-12">
                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
