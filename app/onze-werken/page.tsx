import Link from "next/link"
import { MapPin, ChevronRight, ArrowRight } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import OnzeWerkenFaq from "./faq"
import { ProjectsSection } from "@/components/projects/ProjectsSection"
import { projects } from "@/lib/content/projects"

export const metadata = buildPageMetadata("/onze-werken/")

const expectations = [
  "Plaats en type woning",
  "Werkzaamheden en gekozen afwerking",
  "Belangrijke details (plint, dagkanten, profielen)",
  "Resultaat (voor/na)",
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-10 bg-primary" aria-hidden="true" />
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {children}
      </span>
    </div>
  )
}

function OrangeWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
      {children}
    </span>
  )
}

export default function OnzeWerkenPage() {
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
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pt-40 sm:pb-20 lg:pb-24 lg:pt-44 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li><ChevronRight className="h-3.5 w-3.5 text-white/50" aria-hidden="true" /></li>
              <li className="font-medium text-white/80" aria-current="page">Onze werken</li>
            </ol>
          </nav>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Gevelisolatie &amp; Renovatie · Rotterdam
          </p>

          <h1 className="max-w-2xl text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
            Onze{" "}
            <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
              werken
              </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Bekijk recente projecten met buitengevelisolatie (ETICS) en gevelafwerking.
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">
            Veel projecten combineren meerdere werkzaamheden. Per project ziet u plaats, aanpak en afwerking.
          </p>

          <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
            >
              Plan gratis inspectie
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/diensten/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
            >
              Bekijk onze diensten
            </Link>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
            <span className="text-sm text-white/70">
              Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio&apos;s.
            </span>
          </div>
        </div>
      </section>

      <main className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">

          {/* Table of contents */}
          <nav aria-label="Inhoud" className="relative mb-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Inhoud</span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "projecten", label: "Onze projecten" },
                { id: "faq", label: "Veelgestelde vragen" },
                { id: "werkgebied", label: "Werkgebied" },
              ].map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 transition-all hover:border-primary hover:bg-primary/5"
                >
                  <span className="text-[9px] font-bold tabular-nums text-primary/40 transition-colors group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-16">

            {/* Wat u kunt verwachten */}
            <section className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
                <div className="lg:w-72 lg:shrink-0">
                  <SectionLabel>Per project</SectionLabel>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Wat u kunt <OrangeWord>verwachten</OrangeWord>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Elke projectpagina toont een volledig beeld van de uitgevoerde werkzaamheden.
                  </p>
                </div>
                <div className="flex-1 divide-y divide-border">
                  {expectations.map((item, i) => (
                    <div key={item} className="group flex items-center gap-4 py-3">
                      <span className="w-6 shrink-0 text-right text-xs font-bold tabular-nums text-primary/30 transition-colors group-hover:text-primary/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-3.5 w-px shrink-0 bg-border" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                  <p className="pt-3 text-[11px] italic text-muted-foreground/50">
                    Projecten worden stap voor stap toegevoegd.
                  </p>
                </div>
              </div>
            </section>

            {/* Projecten */}
            <section id="projecten" className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <SectionLabel>Projecten</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Onze <OrangeWord>projecten</OrangeWord>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Voorbeelden van buitengevel renovatie, afwerking en schilderwerk.
              </p>
              <ProjectsSection projects={projects} />
            </section>

            {/* Populaire diensten */}
            <section className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <SectionLabel>Populaire diensten</SectionLabel>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Onze <OrangeWord>diensten</OrangeWord>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Bekijk de diensten die wij het meest uitvoeren in regio Rotterdam en omgeving.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Buitengevelisolatie (ETICS)", sub: "Energiebesparing & comfort", href: "/gevelisolatie/" },
                  { label: "Gevel schilderen", sub: "Bescherming & uitstraling", href: "/gevel-schilderen/" },
                  { label: "Buiten stucwerk", sub: "Strakke gevelafwerking", href: "/buiten-stucwerk/" },
                  { label: "Sierpleister", sub: "Decoratieve afwerking", href: "/sierpleister/" },
                  { label: "Muren stucen", sub: "Binnen & buiten", href: "/muren-stucen/" },
                  { label: "Alle diensten", sub: "Volledig overzicht", href: "/diensten/" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-border transition-colors group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <OnzeWerkenFaq />
            </section>

            {/* Werkgebied */}
            <section id="werkgebied" className="scroll-mt-24 border-b border-border py-16 sm:py-20 lg:py-24">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
                <div className="lg:w-72 lg:shrink-0">
                  <SectionLabel>Werkgebied</SectionLabel>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    Ons <OrangeWord>werkgebied</OrangeWord>
                  </h2>
                </div>
                <div className="flex-1 space-y-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Wij werken voornamelijk in de regio Rotterdam en omgeving — Zuid-Holland en aangrenzende regio&apos;s, tot circa 80–100&nbsp;km.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Rotterdam", "Schiedam", "Vlaardingen", "Capelle a/d IJssel", "Spijkenisse", "Barendrecht", "Ridderkerk", "Dordrecht"].map((city) => (
                      <span
                        key={city}
                        className="rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-foreground"
                      >
                        {city}
                      </span>
                    ))}
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary">
                      + omliggende regio&apos;s
                    </span>
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Twijfelt u of uw locatie binnen ons werkgebied valt?{" "}
                      <Link href="/contact/" className="font-medium text-primary underline-offset-4 hover:underline">
                        Neem contact op
                      </Link>
                      {" "}— we denken graag mee.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Bottom micro-links */}
        <div className="border-t border-border py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-muted-foreground">
              <Link href="/diensten/" className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">Diensten</Link>
              <span className="mx-2 text-border">•</span>
              <Link href="/gevelisolatie/" className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">Gevelisolatie</Link>
              <span className="mx-2 text-border">•</span>
              <Link href="/contact/" className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">Contact</Link>
            </p>
          </div>
        </div>
      </main>

    </>
  )
}
