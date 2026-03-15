"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Zap, Sparkles, Shield, Home, PackageCheck } from "lucide-react"

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type OutcomeKey = "energie" | "look" | "beschermen" | "binnen" | "oplevering"

export interface ServiceItem {
  id: string
  label: string
  title: string
  subtitle: string
  href: string
  imgSrc: string
  imgSrcSet: string
  badge?: string
  chips: [string, string, string]
  outcomeKey: OutcomeKey
  previewText: string
  keuzehulpText: string
  contactOnly?: boolean
}

interface Outcome {
  key: OutcomeKey
  title: string
  subtitle: string
  icon: React.ElementType
  serviceIds: string[]
}

/* ─── Outcomes (static — no image data needed) ───────────────────────────────── */

const OUTCOMES: Outcome[] = [
  {
    key: "energie",
    title: "Energie besparen",
    subtitle: "Verbeter uw energie-label en verlaag stookkosten",
    icon: Zap,
    serviceIds: ["01"],
  },
  {
    key: "look",
    title: "Nieuwe look voor de gevel",
    subtitle: "Moderniseer uw gevel met een frisse uitstraling",
    icon: Sparkles,
    serviceIds: ["03", "04"],
  },
  {
    key: "beschermen",
    title: "Beschermen & opfrissen",
    subtitle: "Bescherm uw gevel en geef deze een opfrisbeurt",
    icon: Shield,
    serviceIds: ["02"],
  },
  {
    key: "binnen",
    title: "Binnen strak & sausklaar",
    subtitle: "Perfecte muurafwerking voor binnen",
    icon: Home,
    serviceIds: ["05"],
  },
  {
    key: "oplevering",
    title: "Oplevering na verbouwing",
    subtitle: "Nette afronding zonder gedoe",
    icon: PackageCheck,
    serviceIds: ["06"],
  },
]

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function ServicesRailInteractive({ services }: { services: ServiceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeOutcome, setActiveOutcome] = useState<OutcomeKey | null>(null)

  const active = services[activeIndex]

  const handleSelectService = useCallback((index: number) => {
    setActiveIndex(index)
    setActiveOutcome(null)
  }, [])

  const handleSelectOutcome = useCallback((key: OutcomeKey) => {
    setActiveOutcome((prev) => {
      if (prev === key) return null
      const outcome = OUTCOMES.find((o) => o.key === key)
      if (outcome) {
        const firstMatch = services.findIndex((s) => outcome.serviceIds.includes(s.id))
        if (firstMatch !== -1) setActiveIndex(firstMatch)
      }
      return key
    })
  }, [services])

  const isHighlighted = (service: ServiceItem) => {
    if (!activeOutcome) return false
    const outcome = OUTCOMES.find((o) => o.key === activeOutcome)
    return outcome?.serviceIds.includes(service.id) ?? false
  }

  const isDeemphasized = (service: ServiceItem) => {
    if (!activeOutcome) return false
    return !isHighlighted(service)
  }

  const currentOutcome = OUTCOMES.find((o) => o.key === activeOutcome) ?? null
  const highlightedServices = currentOutcome
    ? services.filter((s) => currentOutcome.serviceIds.includes(s.id))
    : []

  const activeServiceOutcomeKey = active.outcomeKey

  const passiveOutcome = !activeOutcome
    ? OUTCOMES.find((o) => o.key === activeServiceOutcomeKey) ?? null
    : null
  const keuzehulpServices = activeOutcome
    ? highlightedServices
    : passiveOutcome
    ? services.filter((s) => passiveOutcome.serviceIds.includes(s.id))
    : []

  return (
    <section
      className="relative bg-background py-14 sm:py-16 lg:py-20"
      aria-label="Diensten overzicht"
    >
      <div className="container-default">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-10 lg:mb-12">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Vergelijk diensten
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Welke dienst past{" "}
            <span className="text-primary">bij u?</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Van buitengevelisolatie (ETICS) en gevel schilderen tot buiten
            stucwerk, sierpleister en binnenstucwerk — selecteer een dienst of
            gebruik de keuzehulp.{" "}
            <span className="text-foreground/80">
              Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en
              omliggende regio&apos;s.
            </span>
          </p>
        </div>

        {/* ── Desktop: Rail + Preview ──────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_420px] lg:items-stretch lg:gap-8 xl:grid-cols-[1fr_460px]">

          {/* LEFT — Service list */}
          <div className="flex flex-col gap-1.5 lg:self-start">
            {services.map((service, index) => {
              const isActive = index === activeIndex
              const highlighted = isHighlighted(service)
              const deemphasized = isDeemphasized(service)

              return (
                <div
                  key={service.id}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) return
                    handleSelectService(index)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleSelectService(index)
                    }
                  }}
                  className={`group relative flex cursor-pointer items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "border border-border bg-card shadow-md"
                      : highlighted
                        ? "border border-primary/20 bg-primary/5 hover:border-primary/35"
                        : "border border-transparent hover:bg-card/60"
                  } ${deemphasized ? "opacity-60" : "opacity-100"}`}
                >
                  {isActive && (
                    <div className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-primary" />
                  )}

                  <span
                    className={`text-xl font-bold transition-colors ${
                      isActive
                        ? "text-primary"
                        : highlighted
                          ? "text-primary/50"
                          : "text-border group-hover:text-primary/40"
                    }`}
                  >
                    {service.id}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-base font-bold transition-colors ${
                        isActive
                          ? "text-foreground"
                          : highlighted
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`mt-0.5 text-xs transition-colors ${
                        isActive
                          ? "text-primary"
                          : highlighted
                            ? "text-muted-foreground"
                            : "text-muted-foreground/60"
                      }`}
                    >
                      {service.subtitle}
                    </p>
                    <Link
                      href={service.href}
                      onClick={(e) => e.stopPropagation()}
                      className={`mt-1.5 inline-flex items-center gap-1 text-xs font-medium underline-offset-2 transition-colors hover:underline ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground/70 group-hover:text-primary/70"
                      }`}
                    >
                      {service.contactOnly ? "Contact opnemen" : "Meer info"}{" "}
                      <ArrowRight size={11} />
                    </Link>
                  </div>

                  {service.badge && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : highlighted
                            ? "bg-primary/10 text-primary/70"
                            : "bg-border/30 text-muted-foreground/60"
                      }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* RIGHT — Preview card */}
          <div className="flex flex-col">
            <div
              key={active.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md h-full"
              style={{ animation: "rail-fade 0.2s ease" }}
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-secondary shrink-0">
                <img
                  src={active.imgSrc}
                  srcSet={active.imgSrcSet}
                  sizes="(max-width: 1280px) 420px, 460px"
                  alt={active.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
                {active.badge && (
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                    {active.badge}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {active.label}
                </p>
                <h3 className="text-xl font-bold leading-snug text-foreground">{active.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {active.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {active.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold text-foreground"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">
                  {active.previewText}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#d46218]"
                  >
                    {active.contactOnly ? "Contact opnemen" : "Meer info"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {!active.contactOnly && (
                    <Link
                      href="/onze-werken/"
                      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Bekijk projecten
                      <ArrowRight size={13} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet: Photo cards + filter block ───────────────────── */}
        <div className="lg:hidden">

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const highlighted = isHighlighted(service)
              const deemphasized = isDeemphasized(service)
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md ${
                    deemphasized
                      ? "opacity-60 border-border"
                      : highlighted
                      ? "border-primary/40 ring-1 ring-primary/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                    <img
                      src={service.imgSrc}
                      srcSet={service.imgSrcSet}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/50 via-foreground/10 to-transparent" />
                    {service.badge && (
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground shadow">
                        {service.badge}
                      </span>
                    )}
                    {highlighted && (
                      <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground shadow">
                        Aanbevolen
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {service.label}
                    </p>
                    <h3 className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-xs leading-relaxed text-muted-foreground">
                      {service.subtitle}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {service.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-foreground"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Filter block on mobile */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Keuzehulp
            </p>
            <h3 className="mb-4 text-base font-bold text-foreground">
              Kies op resultaat
            </h3>

            <div className="flex flex-wrap gap-2">
              {OUTCOMES.map((outcome) => {
                const Icon = outcome.icon
                const isPressed = activeOutcome === outcome.key
                const isRelated = !activeOutcome && outcome.key === activeServiceOutcomeKey
                return (
                  <button
                    key={outcome.key}
                    aria-pressed={isPressed}
                    onClick={() => handleSelectOutcome(outcome.key)}
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isPressed
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : isRelated
                        ? "border-primary text-primary bg-background"
                        : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    <Icon size={13} className="shrink-0" />
                    {outcome.title}
                  </button>
                )
              })}
            </div>

            {keuzehulpServices.length > 0 && (
              <div
                key={activeOutcome ?? activeServiceOutcomeKey}
                className="mt-4 flex flex-col gap-2"
                style={{ animation: "rail-fade 0.18s ease" }}
              >
                {keuzehulpServices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/4 px-4 py-3"
                  >
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {s.keuzehulpText}
                      </p>
                      <Link
                        href={s.href}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-2 hover:underline"
                      >
                        {s.contactOnly ? "Contact opnemen" : `Meer over ${s.title}`} <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {keuzehulpServices.length === 0 && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Klik op een resultaat om passende diensten te zien.
              </p>
            )}
          </div>
        </div>

        {/* ── Desktop Keuzehulp ────────────────────────────────────────────── */}
        <div className="mt-10 hidden rounded-xl border border-border bg-card p-6 sm:p-8 lg:block">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Keuzehulp
              </p>
              <h3 className="text-lg font-bold text-foreground sm:text-xl">
                Kies op resultaat
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Gratis opname · Offerte binnen 24–48 uur (na opname)
            </p>
          </div>

          <div
            role="group"
            aria-label="Kies gewenst resultaat"
            className="flex flex-wrap gap-2"
          >
            {OUTCOMES.map((outcome) => {
              const Icon = outcome.icon
              const isPressed = activeOutcome === outcome.key
              const isRelated = !activeOutcome && outcome.key === activeServiceOutcomeKey
              return (
                <button
                  key={outcome.key}
                  aria-pressed={isPressed}
                  onClick={() => handleSelectOutcome(outcome.key)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isPressed
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : isRelated
                      ? "border-primary text-primary bg-background"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <Icon size={14} className="shrink-0" />
                  {outcome.title}
                </button>
              )
            })}
          </div>

          {keuzehulpServices.length > 0 && (
            <div
              key={activeOutcome ?? activeServiceOutcomeKey}
              className="mt-5 flex flex-col gap-3"
              style={{ animation: "rail-fade 0.18s ease" }}
            >
              {keuzehulpServices.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/4 px-4 py-3.5"
                >
                  <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {s.keuzehulpText}
                    </p>
                    <Link
                      href={s.href}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                    >
                      {s.contactOnly ? "Contact opnemen" : `Meer over ${s.title}`} <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {keuzehulpServices.length === 0 && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Klik op een resultaat om passende diensten te zien.
            </p>
          )}
        </div>

        {/* Hidden SEO nav — all 6 anchors always in DOM */}
        <nav aria-label="Alle diensten" className="sr-only">
          {services.map((s) => (
            <Link key={s.id} href={s.href}>{s.title}</Link>
          ))}
        </nav>

      </div>

      <style>{`
        @keyframes rail-fade {
          from { opacity: 0.3; transform: translateY(5px); }
          to   { opacity: 1;   transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
