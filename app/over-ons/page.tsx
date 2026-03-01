import Link from "next/link"
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  HardHat,
  CheckSquare,
  MapPin,
  FileCheck,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { buildPageMetadata } from "@/lib/seo/meta"
import OverOnsAccordion from "@/components/sections/over-ons/faq-accordion"

export const metadata = buildPageMetadata("/over-ons/")

const valueCards = [
  {
    icon: FileCheck,
    title: "Duidelijke offerte",
    body: "U weet exact wat wel en niet is inbegrepen — met duidelijke scope en heldere afspraken.",
  },
  {
    icon: Sparkles,
    title: "Nette detaillering",
    body: "Strakke aansluitingen bij kozijnen, hoeken en plint. Elk detail dat de kwaliteit bepaalt.",
  },
  {
    icon: Layers,
    title: "Kwaliteitsmaterialen",
    body: "Gecertificeerde materialen volgens ETICS-principes. Duurzame afwerking die jarenlang meegaat.",
  },
  {
    icon: ShieldCheck,
    title: "Rust op de werkplek",
    body: "Zorgvuldig afplakken en dagelijks opruimen. Wij respecteren uw woning en omgeving.",
  },
]

const steps = [
  {
    n: "01",
    title: "Opname & inventarisatie",
    icon: ClipboardList,
    body: "Wij beoordelen de ondergrond, de details en uw wensen op locatie, zodat we een volledig beeld hebben van de situatie.",
  },
  {
    n: "02",
    title: "Advies & offerte",
    icon: FileText,
    body: "Op basis van de opname stellen wij een duidelijke offerte op met keuze voor materiaal en afwerking, met duidelijke scope.",
  },
  {
    n: "03",
    title: "Uitvoering",
    icon: HardHat,
    body: "Zorgvuldige opbouw van het systeem met aandacht voor elke detaillering: plint, dagkanten, hoeken en profielen.",
  },
  {
    n: "04",
    title: "Oplevering",
    icon: CheckSquare,
    body: "Na afronding controleren wij alle aansluitingen en de afwerking, zodat het resultaat voldoet aan de afgesproken kwaliteit.",
  },
]

const heroChecks = [
  "Specialisatie: ETICS + afwerking (stuc, sierpleister, schilderwerk)",
  "Aandacht voor details (plint, dagkanten, profielen)",
  "Heldere communicatie en duidelijke scope",
]

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #F5EFE6 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 flex-1 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44">
            <div className="flex">
              <div className="flex flex-col gap-6 pb-16 sm:pb-20 lg:pb-24 max-w-2xl">

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-white/60 text-xs">
                  <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                  <ChevronRight size={12} />
                  <span className="text-white/70">Over ons</span>
                </nav>

                <p className="text-[#E8600A] text-xs font-bold tracking-[0.25em] uppercase">
                  Gevelisolatie &amp; Renovatie · Rotterdam
                </p>

                <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                  Over{" "}
                  <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                    ons
                          </span>
                </h1>

                <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
                  BM klus BV is gespecialiseerd in buitengevelisolatie (ETICS) en hoogwaardige gevelafwerking. Wij combineren vakmanschap met duidelijke afspraken en een nette oplevering.
                </p>

                <div className="flex flex-col gap-2.5">
                  {heroChecks.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-[#E8600A] shrink-0" />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="flex items-center gap-2 text-sm text-white/70 leading-relaxed">
                  <MapPin size={14} className="text-[#E8600A] shrink-0" />
                  {"Regio Rotterdam en omgeving (\u00b180\u2013100\u00a0km), Zuid-Holland en omliggende regio\u2019s."}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href="/diensten/"
                    className="text-white/70 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Diensten
                  </Link>
                  <span className="text-white/20">·</span>
                  <Link
                    href="/contact/"
                    className="text-white/70 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Contact
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-background pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
          <div className="space-y-16">

            {/* Waarom BM klus BV */}
            <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24" id="waarom">
              <div className="mb-10 lg:mb-12">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Onze kracht
                  </span>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Waarom{" "}
                    <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                      BM klus BV
                              </span>
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
                    Elk project krijgt de aandacht die het verdient — van eerste opname tot laatste hand.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {valueCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div
                      key={card.title}
                      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {card.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Waar wij in uitblinken */}
            <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24" id="diensten">
              <div className="mb-10 lg:mb-14">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Kernactiviteiten
                  </span>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Waar wij in{" "}
                    <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                      uitblinken
                              </span>
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right">
                    Onze focus ligt op de buitenschil van de woning: isoleren, afwerken en beschermen.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {/* Card: ETICS */}
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/etics-isolatie.webp"
                      alt="ETICS buitengevelisolatie — montage isolatieplaten op gevel"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      width={640}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                      Isolatie
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      Buitengevelisolatie (ETICS)
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Volledig isolatiesysteem voor de buitengevel: minder warmteverlies, lagere energierekening en een vernieuwde uitstraling.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "Isolatieplaten + wapening + afwerklaag",
                        "Advies RC-waarde en dikte isolatie",
                        "Afwerking naar keuze",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground/70">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/gevelisolatie/"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:underline"
                    >
                      Meer over gevelisolatie
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Card: Gevelafwerking */}
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/gevelafwerking.webp"
                      alt="Gevelafwerking — sierpleister aanbrengen op gevel"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      width={640}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                      Afwerking
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      Gevelafwerking
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Na isolatie kiest u de gewenste afwerklaag. Wij werken met diverse systemen afhankelijk van uw voorkeur en de situatie van de gevel.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {["Stuc", "Sierpleister (spachtelputz)", "Crepi", "Steenstrips"].map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-foreground/70">
                          <CheckCircle2 size={14} className="shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card: Schilderwerk */}
                <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/gevel-schilderen.webp"
                      alt="Gevel schilderen — professioneel buitenschilderwerk"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      width={640}
                      height={360}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                      Schilderwerk
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      Gevel schilderen &amp; details
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Voor bestaande gevels verzorgen wij professioneel schilderwerk en detaillering bij kozijnen, hoeken en dagkanten.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {["Gevel schilderen", "Afwerking kozijnen & dagkanten", "Gevelbescherming"].map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-foreground/70">
                          <CheckCircle2 size={14} className="shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/gevel-schilderen/"
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary hover:underline"
                    >
                      Meer over gevel schilderen
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

              </div>
            </section>

            {/* Onze aanpak */}
            <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24" id="aanpak">
              <div className="overflow-hidden rounded-2xl bg-[#111] px-8 py-12 sm:px-12 lg:px-16 lg:py-16">

                <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-px w-10 bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Werkwijze
                      </span>
                    </div>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      Onze{" "}
                      <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                        aanpak
                        <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/50" />
                      </span>
                    </h2>
                  </div>
                  <p className="max-w-xs text-sm leading-relaxed text-white/70 lg:text-right">
                    Zo houden we het overzichtelijk en weet u vooraf waar u aan toe bent.
                  </p>
                </div>

                {/* Desktop: horizontal timeline */}
                <div className="hidden lg:block">
                  <div className="relative mb-10 flex items-center">
                    <div className="absolute left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] top-1/2 h-px bg-white/10" />
                    {steps.map((step, i) => {
                      const Icon = step.icon
                      return (
                        <div key={step.n} className="relative flex flex-1 flex-col items-center">
                          {i > 0 && (
                            <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
                          )}
                          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                            <Icon size={22} className="text-white" />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    {steps.map((step) => (
                      <div key={step.n} className="flex flex-col gap-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[11px] font-black tracking-[0.2em] text-primary/50 tabular-nums">
                            {step.n}
                          </span>
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <h3 className="text-base font-bold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/70">
                          {step.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile: vertical timeline */}
                <div className="flex flex-col gap-0 lg:hidden">
                  {steps.map((step, i) => {
                    const Icon = step.icon
                    const isLast = i === steps.length - 1
                    return (
                      <div key={step.n} className="flex gap-5">
                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                            <Icon size={20} className="text-white" />
                          </div>
                          {!isLast && <div className="mt-2 w-px flex-1 bg-white/10" />}
                        </div>
                        <div className="pb-8 pt-1">
                          <span className="text-[11px] font-black tracking-[0.2em] text-primary/50 tabular-nums">
                            {step.n}
                          </span>
                          <h3 className="mt-1 text-base font-bold tracking-tight text-white">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-white/70">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            </section>

            {/* Over BM klus BV */}
            <section className="scroll-mt-24 py-16 sm:py-20 lg:py-24" id="bedrijf">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Het bedrijf
                </span>
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Over{" "}
                <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                  BM klus BV
                      </span>
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                BM klus BV is een gespecialiseerd bedrijf in buitengevelisolatie en renovatie, actief in de regio Rotterdam en Zuid-Holland. Wij werken met eigen vakkundige medewerkers — geen onderaannemers, één aanspreekpunt per project.
              </p>
            </section>

            {/* FAQ */}
            <div className="scroll-mt-24" id="faq">
              <OverOnsAccordion />
            </div>

          </div>
        </div>
      </main>

    </>
  )
}

