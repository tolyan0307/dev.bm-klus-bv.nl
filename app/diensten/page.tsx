import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight, ChevronRight, Star, Phone, MessageCircle, MapPin } from "lucide-react"

import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"
import TrustStrip from "@/components/trust-strip"
import WaaromBmKlusSection from "@/components/sections/gevelisolatie/waarom-bm-klus-section"

const ProcessSection = dynamic(() => import("@/components/process-section"))
const ServicesRail = dynamic(() => import("@/components/services/ServicesRail"))
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
const StickyCTABar = dynamic(
  () => import("@/components/sections/gevelisolatie/sticky-cta-bar"),
)
const QuoteModal = dynamic(() => import("@/components/quote-modal"))

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20uw%20diensten.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"


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

const base = SITE.canonicalBase

export default function DienstenPage() {
  const breadcrumbsData = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Diensten", item: `${base}/diensten/` },
  ])

  const business = localBusinessSchema()

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diensten BM Klus BV",
    description:
      "Overzicht van geveloplossingen: isolatie, stucwerk, sierpleister, schilderwerk en binnenstucwerk.",
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Buitengevelisolatie (ETICS)",
        url: `${base}/gevelisolatie/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gevel schilderen",
        url: `${base}/gevel-schilderen/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Buiten stucwerk",
        url: `${base}/buiten-stucwerk/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Sierpleister",
        url: `${base}/sierpleister/`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Muren stucen (binnen)",
        url: `${base}/muren-stucen/`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Schoonmaak na verbouwing",
        url: `${base}/contact/`,
      },
    ],
  }

  return (
    <>
      {jsonLdScript(breadcrumbsData)}
      {jsonLdScript(business)}
      {jsonLdScript(faqSchema)}
      {jsonLdScript(itemListSchema)}

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,108,32,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,108,32,0.04)_0%,transparent_40%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Diensten", href: "/diensten/" },
              ].map((item, i, arr) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                  )}
                  {i === arr.length - 1 ? (
                    <span className="font-medium text-white/90">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-10 pb-14 pt-8 sm:pb-16 lg:grid-cols-12 lg:gap-16 lg:pb-20 lg:pt-10">
            {/* Left — main content */}
            <div className="flex flex-col gap-5 lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#EA6C20]">
                Onze Diensten · Regio Rotterdam
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Diensten voor een{" "}
                <span className="text-white/90">sterke</span> en{" "}
                <span className="text-[#EA6C20]">mooie</span> gevel
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                BM Klus BV verzorgt professionele geveloplossingen in regio
                Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende
                regio&apos;s.
              </p>

              <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                <MapPin size={13} className="shrink-0 text-[#EA6C20]" />
                <span className="text-xs text-white/60">
                  Rotterdam, Den Haag, Delft, Dordrecht en omgeving (±80–100 km)
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <a
                  href="#offerte"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA6C20] px-7 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#EA6C20]/20 transition-all hover:bg-[#d0540a] hover:shadow-xl hover:shadow-[#EA6C20]/25"
                >
                  Offerte aanvragen
                  <ArrowRight size={16} />
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/8 px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/14"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366]/15 transition-transform group-hover:scale-110">
                    <MessageCircle
                      size={14}
                      className="text-[#25D366]"
                      strokeWidth={1.5}
                    />
                  </span>
                  WhatsApp
                </a>
              </div>

              {/* Trust proof */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-white/60">
                    4.8/5 · 23+ reviews
                  </span>
                </div>
                <span className="h-3 w-px bg-white/20" />
                <a
                  href="tel:+31612079808"
                  className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
                >
                  <Phone size={12} />
                  +31 6 1207 9808
                </a>
              </div>
            </div>

            {/* Right — highlight stats (lg only) */}
            <div className="hidden lg:col-span-5 lg:flex lg:items-center">
              <div className="grid w-full grid-cols-2 gap-3">
                {[
                  { value: "6", label: "Diensten", desc: "Geveloplossingen" },
                  { value: "21+", label: "Steden", desc: "Zuid-Holland e.o." },
                  { value: "23+", label: "Reviews", desc: "Google · 4.8 ★" },
                  { value: "100%", label: "Garantie", desc: "Op vakmanschap" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-[#EA6C20]/20 hover:bg-white/8"
                  >
                    <span className="text-2xl font-black text-[#EA6C20]">
                      {stat.value}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-white/90">
                      {stat.label}
                    </p>
                    <p className="text-xs text-white/50">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <TrustStrip />

      {/* ══ ARTICLE ══ */}
      <article className="bg-background pb-16 sm:pb-20 lg:pb-24">
        {/* ── Services Rail with Keuzehulp ── */}
        <ServicesRail />

        {/* ── Process Section ── */}
        <ProcessSection />

        {/* ── Waarom BM Klus ── */}
        <WaaromBmKlusSection subtitle="BM Klus BV verzorgt gevelisolatie, stucwerk, sierpleister en schilderwerk voor woningen en bedrijfspanden in de regio Rotterdam en omgeving." />

        {/* ── Reviews ── */}
        <ReviewsSection />

        {/* ── FAQ Section ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="scroll-mt-24 py-16 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
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
                    Heeft u vragen over onze diensten? Hier vindt u de
                    antwoorden op de meest gestelde vragen.
                  </p>
                  <p className="mt-8 text-base text-muted-foreground">
                    Staat uw vraag er niet tussen?{" "}
                    <Link
                      href="/contact/"
                      className="font-semibold text-primary hover:underline"
                    >
                      Neem contact op
                    </Link>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-3">
                  {faqItems.map((faq, i) => (
                    <details
                      key={i}
                      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                      open={i === 0}
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20 [&::-webkit-details-marker]:hidden">
                        <div className="flex items-start gap-4">
                          <span className="mt-0.5 text-lg font-bold tabular-nums text-primary/30 group-open:text-primary">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-base font-semibold text-foreground">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                      </summary>
                      <div className="border-t border-border/50 px-6 pb-6 pt-4">
                        <div className="pl-12">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* ── Sticky CTA bar ── */}
      <StickyCTABar />

      {/* ── Quote modal ── */}
      <QuoteModal dienst="geveloplossingen" />
    </>
  )
}
