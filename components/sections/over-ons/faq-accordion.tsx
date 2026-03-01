"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "In welke regio werken jullie?",
    answer:
      "Wij zijn actief in de regio Rotterdam en omgeving, met een werkgebied van circa 80–100 km. Dat omvat groot deel van Zuid-Holland en omliggende regio's. Neem contact op als u wilt weten of uw locatie binnen ons werkgebied valt.",
    link: { href: "/contact/", label: "Neem contact op" },
  },
  {
    question: "Doen jullie ook alleen afwerking zonder isolatie?",
    answer:
      "Ja, wij voeren ook afwerking uit op bestaande gevels zonder isolatie. Denk aan stucwerk, sierpleister (spachtelputz), crepi of schilderwerk.",
    link: { href: "/diensten/", label: "Bekijk alle diensten" },
  },
  {
    question: "Welke afwerkingen zijn mogelijk na ETICS?",
    answer:
      "Na het aanbrengen van het ETICS-systeem zijn verschillende afwerklagen mogelijk: minerale stuc, sierpleister, crepi of steenstrips. De keuze hangt af van uw voorkeur en de situatie van de gevel.",
    link: { href: "/gevelisolatie/", label: "Meer over gevelisolatie" },
  },
  {
    question: "Hoe verloopt een offerteaanvraag?",
    answer:
      "U neemt contact met ons op via het contactformulier of telefonisch. Wij plannen een vrijblijvende opname op locatie en stellen een duidelijke offerte op met een heldere scope en prijs per m².",
    link: { href: "/contact/", label: "Plan een opname" },
  },
]

export default function OverOnsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

        {/* Left: sticky header */}
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
              Heeft u vragen over onze werkwijze of diensten? Hier vindt u de antwoorden.
            </p>
            <p className="mt-8 text-base text-muted-foreground">
              Staat uw vraag er niet tussen?{" "}
              <Link href="/contact/" className="font-semibold text-primary hover:underline">
                Neem contact op
              </Link>
            </p>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border transition-all ${
                  openIndex === index
                    ? "border-primary/40 bg-card shadow-md"
                    : "border-border bg-card shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 text-lg font-bold transition-colors ${
                        openIndex === index ? "text-primary" : "text-border"
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
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border/50 px-6 pb-6 pt-4">
                      <div className="pl-12">
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {faq.answer}{" "}
                          {faq.link && (
                            <Link
                              href={faq.link.href}
                              className="font-medium text-primary hover:underline"
                            >
                              {faq.link.label}
                            </Link>
                          )}
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
    </section>
  )
}
