"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Sparkles, Shield, Home, PackageCheck } from "lucide-react"

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type OutcomeKey = "energie" | "look" | "beschermen" | "binnen" | "oplevering"

interface Service {
  id: string
  label: string
  title: string
  subtitle: string
  href: string
  imageSrc: string
  badge?: string
  chips: [string, string, string]
  outcomeKey: OutcomeKey
  /** Short "what is this" — shown in the preview card */
  previewText: string
  /** Practical tip — shown in the keuzehulp panel */
  keuzehulpText: string
  /** If true: list item shows "Contact opnemen" instead of "Meer info" */
  contactOnly?: boolean
}

interface Outcome {
  key: OutcomeKey
  title: string
  subtitle: string
  icon: React.ElementType
  serviceIds: string[]
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const SERVICES: Service[] = [
  {
    id: "01",
    label: "ENERGIEBESPARING & COMFORT",
    title: "Buitengevelisolatie (ETICS)",
    subtitle: "Energiezuinige gevel + nieuwe uitstraling",
    href: "/gevelisolatie/",
    imageSrc: "/images/dienst-isolatie.webp",
    badge: "Meest gekozen",
    chips: ["Energie-label", "Comfort", "Nette details"],
    outcomeKey: "energie",
    previewText:
      "Combineert gevelisolatie met een duurzame afwerking. Verlaagt stookkosten en verbetert uw energie-label in één project.",
    keuzehulpText:
      "Kies ETICS als u structureel wilt besparen op energie. Let op: de prijs hangt af van de afwerking en detaillering (dagkanten, plint). Na een gratis opname ontvangt u een heldere offerte per m².",
  },
  {
    id: "02",
    label: "BESCHERMING & UITSTRALING",
    title: "Gevel schilderen",
    subtitle: "Beschermt en verfrist uw gevel",
    href: "/gevel-schilderen/",
    imageSrc: "/images/dienst-schilderen.webp",
    chips: ["Duurzame verf", "Reparaties", "Strakke afwerking"],
    outcomeKey: "beschermen",
    previewText:
      "Beschermt de gevel tegen vocht en veroudering. Ideaal wanneer de constructie goed is maar de uitstraling een opfrisbeurt vraagt.",
    keuzehulpText:
      "Goede keuze als de gevel structureel intact is. Kleine scheurtjes worden vooraf gerepareerd. Prijs hangt af van oppervlak en staat van de huidige afwerking.",
  },
  {
    id: "03",
    label: "STRAKKE GEVELAFWERKING",
    title: "Buiten stucwerk",
    subtitle: "Gevel stucen voor een strak resultaat",
    href: "/buiten-stucwerk/",
    imageSrc: "/images/dienst-stucwerk.webp",
    chips: ["Weerbestendig", "Scheurherstel", "Netjes opgeleverd"],
    outcomeKey: "look",
    previewText:
      "Geeft de gevel een egale, moderne uitstraling. Geschikt bij renovatie of wanneer u de gevel een compleet nieuwe look wilt geven.",
    keuzehulpText:
      "Kies buiten stucwerk voor een strakke, moderne gevel. Combineerbaar met schilderen. Prijs hangt af van staat van de ondergrond en oppervlak.",
  },
  {
    id: "04",
    label: "DECORATIEVE AFWERKING",
    title: "Sierpleister (gevel)",
    subtitle: "Spachtelputz/crepi met karakter",
    href: "/sierpleister/",
    imageSrc: "/images/dienst-sierpleister.webp",
    chips: ["Structuurkeuze", "Kleuren", "Onderhoudsvriendelijk"],
    outcomeKey: "look",
    previewText:
      "Decoratieve toplaag met structuur (spachtelputz of crepi). Geeft karakter aan de gevel én verbergt kleine oneffenheden.",
    keuzehulpText:
      "Combineerbaar met buiten stucwerk als onderlaag. Keuze uit structuren en kleuren op maat. Onderhoudsvriendelijk en weerbestendig voor de lange termijn.",
  },
  {
    id: "05",
    label: "BINNEN STRAK & SAUSKLAAR",
    title: "Muren stucen (binnen)",
    subtitle: "Behangklaar of sausklaar stucwerk",
    href: "/muren-stucen/",
    imageSrc: "/images/dienst-muren.webp",
    chips: ["Sausklaar", "Strakke wanden", "Renovatie"],
    outcomeKey: "binnen",
    previewText:
      "Voor strakke, behangklare of sausklare binnenwanden. Perfect bij renovatie, verbouwing of nieuwbouw.",
    keuzehulpText:
      "Duidelijk resultaat: vlakke wand, direct sausklaar. Prijs per m², afhankelijk van de staat van de bestaande ondergrond en het aantal lagen.",
  },
  {
    id: "06",
    label: "OPLEVERING",
    title: "Schoonmaak na verbouwing",
    subtitle: "Op aanvraag (vraag naar de mogelijkheden)",
    href: "/contact/",
    imageSrc: "/images/dienst-schoonmaak.webp",
    badge: "Op aanvraag",
    chips: ["Stofvrij", "Oplevering", "Snel gepland"],
    outcomeKey: "oplevering",
    contactOnly: true,
    previewText:
      "Opleveringsschoonmaak na renovatie of verbouwing, op aanvraag. Zodat u het resultaat direct kunt bewonderen.",
    keuzehulpText:
      "Neem contact op voor beschikbaarheid en prijsindicatie. Wij plannen snel in zodat uw oplevering op tijd verloopt.",
  },
]

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

export default function ServicesRail() {
  // activeIndex: which card is open in the right panel
  const [activeIndex, setActiveIndex] = useState(0)
  // activeOutcome: which filter button is pressed (null = filter not engaged)
  const [activeOutcome, setActiveOutcome] = useState<OutcomeKey | null>(null)

  const active = SERVICES[activeIndex]

  // Clicking a service row: open its card, but do NOT auto-engage the filter
  const handleSelectService = useCallback((index: number) => {
    setActiveIndex(index)
    // Disengage any filter so the filter logic doesn't override the manual selection
    setActiveOutcome(null)
  }, [])

  // Clicking a filter button: toggle it; if activating, auto-open the first
  // service that belongs to this outcome
  const handleSelectOutcome = useCallback((key: OutcomeKey) => {
    setActiveOutcome((prev) => {
      if (prev === key) return null // toggle off
      // Engage filter — auto-open first matching service
      const outcome = OUTCOMES.find((o) => o.key === key)
      if (outcome) {
        const firstMatch = SERVICES.findIndex((s) => outcome.serviceIds.includes(s.id))
        if (firstMatch !== -1) setActiveIndex(firstMatch)
      }
      return key
    })
  }, [])

  // Returns true when the filter is active AND this service belongs to the
  // selected outcome → highlighted with a ring
  const isHighlighted = (service: Service) => {
    if (!activeOutcome) return false
    const outcome = OUTCOMES.find((o) => o.key === activeOutcome)
    return outcome?.serviceIds.includes(service.id) ?? false
  }

  // Returns true when the filter is active AND this service does NOT belong →
  // slightly dimmed, but still very readable
  const isDeemphasized = (service: Service) => {
    if (!activeOutcome) return false
    return !isHighlighted(service)
  }

  const currentOutcome = OUTCOMES.find((o) => o.key === activeOutcome) ?? null
  // All services highlighted by the current filter
  const highlightedServices = currentOutcome
    ? SERVICES.filter((s) => currentOutcome.serviceIds.includes(s.id))
    : []

  // The outcome that the currently selected service belongs to (for passive outline on filter button)
  const activeServiceOutcomeKey = active.outcomeKey

  // Services to show in the keuzehulp text panel:
  // — if filter is explicitly pressed → show all matched services
  // — if no filter pressed → show the services belonging to the selected row's outcome (passive hint)
  const passiveOutcome = !activeOutcome
    ? OUTCOMES.find((o) => o.key === activeServiceOutcomeKey) ?? null
    : null
  const keuzehulpServices = activeOutcome
    ? highlightedServices
    : passiveOutcome
    ? SERVICES.filter((s) => passiveOutcome.serviceIds.includes(s.id))
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Selecteer een dienst of gebruik de keuzehulp hieronder.{" "}
            <span className="text-foreground/80">
              Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's.
            </span>
          </p>
        </div>

        {/* ── Desktop: Rail + Preview ──────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_420px] lg:items-stretch lg:gap-8 xl:grid-cols-[1fr_460px]">

          {/* LEFT — Timeline rail */}
          <div className="lg:self-start">
            <ol className="relative flex flex-col" aria-label="Diensten lijst">
              {/* Track line */}
              <div
                className="pointer-events-none absolute bottom-0 left-[19px] top-0 w-px bg-border"
                aria-hidden
              />
              {/* Fill line */}
              <div
                className="pointer-events-none absolute left-[19px] top-0 w-px bg-primary transition-all duration-300 ease-out"
                style={{ height: `${(activeIndex / (SERVICES.length - 1)) * 100}%` }}
                aria-hidden
              />

              {SERVICES.map((service, index) => {
                const isActive = index === activeIndex
                const highlighted = isHighlighted(service)
                const deemphasized = isDeemphasized(service)

                return (
                  <li
                    key={service.id}
                    className={`relative pl-11 transition-opacity duration-200 ${
                      // Only slightly dim (not ghost) when filter is active and not matching
                      deemphasized ? "opacity-60" : "opacity-100"
                    }`}
                  >
                    {/* Dot — active: filled orange; highlighted by filter: orange ring;
                        rest: grey border, no fill */}
                    <div
                      className={`absolute left-[14px] top-[18px] h-[11px] w-[11px] rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "scale-[1.25] border-primary bg-primary shadow-[0_0_0_3px_rgba(232,96,10,0.15)]"
                          : highlighted
                          ? "border-primary bg-primary/20"
                          : index < activeIndex
                          ? "border-primary/40 bg-primary/10"
                          : "border-border bg-background"
                      }`}
                      aria-hidden
                    />

                    {/* Row */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(e) => {
                        // If click originated from an anchor tag, let the link navigate — don't just select
                        if ((e.target as HTMLElement).closest("a")) return
                        handleSelectService(index)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          handleSelectService(index)
                        }
                      }}
                      className={`group mb-1 flex cursor-pointer items-start gap-3 rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? "border border-primary/25 bg-card shadow-sm"
                          : highlighted
                          ? "border border-primary/15 bg-primary/[0.03] hover:border-primary/30"
                          : "border border-transparent hover:border-border hover:bg-card/50"
                      }`}
                    >
                      {/* Number */}
                      <span
                        className={`mt-0.5 shrink-0 text-sm font-bold tabular-nums leading-none transition-colors ${
                          isActive
                            ? "text-primary"
                            : highlighted
                            ? "text-primary/60"
                            : "text-muted-foreground/70 group-hover:text-muted-foreground"
                        }`}
                      >
                        {service.id}
                      </span>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={service.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`block text-sm font-semibold leading-snug underline-offset-2 transition-colors hover:text-primary hover:underline focus:outline-none ${
                            isActive
                              ? "text-foreground"
                              : highlighted
                              ? "text-foreground"
                              : "text-foreground/85 group-hover:text-foreground"
                          }`}
                        >
                          {service.title}
                        </Link>
                        <p
                          className={`mt-0.5 text-xs leading-relaxed transition-colors ${
                            isActive
                              ? "text-primary/80"
                              : highlighted
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {service.subtitle}
                        </p>
                        {/* CTA below title */}
                        {service.contactOnly ? (
                          <Link
                            href="/contact/"
                            onClick={(e) => e.stopPropagation()}
                            className={`mt-1 inline-flex items-center gap-1 text-xs font-medium underline-offset-2 transition-colors hover:underline ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground/70 group-hover:text-primary/70"
                            }`}
                          >
                            Contact opnemen <ArrowRight size={11} />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectService(index)
                            }}
                            className={`mt-1 inline-flex items-center gap-1 text-xs font-medium underline-offset-2 transition-colors hover:underline cursor-default ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground/70 group-hover:text-primary/70"
                            }`}
                          >
                            Meer info <ArrowRight size={11} />
                          </button>
                        )}
                      </div>

                      {/* Badge */}
                      {service.badge && (
                        <span
                          className={`shrink-0 self-start rounded-full px-2 py-0.5 text-[11px] font-bold transition-all ${
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
                  </li>
                )
              })}
            </ol>
          </div>

          {/* RIGHT — Preview card */}
          <div className="flex flex-col">
            <div
              key={active.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md h-full"
              style={{ animation: "rail-fade 0.2s ease" }}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary shrink-0">
                <Image
                  src={active.imageSrc}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 420px, 460px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
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

                {/* Chips */}
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

                {/* Preview text — short "what is this" */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1">
                  {active.previewText}
                </p>

                {/* Actions */}
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

          {/* Service photo cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, index) => {
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
                  {/* Photo */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent" />
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

                  {/* Info */}
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

          {/* Filter block on mobile — just shows which services match each button */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Keuzehulp
            </p>
            <h3 className="mb-4 text-base font-bold text-foreground">
              Kies op resultaat
            </h3>

          {/* Outcome buttons */}
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

          {/* Show matched services when filter is active or a service row is selected */}
            {keuzehulpServices.length > 0 && (
              <div
                key={activeOutcome ?? activeServiceOutcomeKey}
                className="mt-4 flex flex-col gap-2"
                style={{ animation: "rail-fade 0.18s ease" }}
              >
                {keuzehulpServices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/[0.04] px-4 py-3"
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
          {/* Keuzehulp header */}
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

          {/* Outcome buttons */}
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

          {/* Show ALL matched services when filter is active, or passive hint when service row selected */}
          {keuzehulpServices.length > 0 && (
            <div
              key={activeOutcome ?? activeServiceOutcomeKey}
              className="mt-5 flex flex-col gap-3"
              style={{ animation: "rail-fade 0.18s ease" }}
            >
              {keuzehulpServices.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/[0.04] px-4 py-3.5"
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

          {/* Generic fallback when no outcome selected */}
          {keuzehulpServices.length === 0 && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Klik op een resultaat om passende diensten te zien.
            </p>
          )}
        </div>

        {/* ── Bottom CTA strip ─────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
          <p className="text-base font-bold text-foreground">
            Klaar om te starten?
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#d46218]"
            >
              Gratis offerte
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/onze-werken/"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Bekijk projecten <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Hidden SEO nav — all 6 anchors always in DOM */}
        <nav aria-label="Alle diensten" className="sr-only">
          {SERVICES.map((s) => (
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
