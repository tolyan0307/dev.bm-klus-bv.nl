"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Script from "next/script"

const faqs = [
  {
    question: "Wat is buitengevelisolatie (ETICS)?",
    answer:
      "ETICS staat voor External Thermal Insulation Composite System. Dit is een isolatiemethode waarbij isolatieplaten aan de buitenkant van uw gevel worden aangebracht, gevolgd door een wapening en een decoratieve afwerklaag zoals stucwerk of sierpleister. Het zorgt voor uitstekende isolatie en een frisse uitstraling.",
    link: true,
  },
  {
    question: "Hoeveel kan ik besparen met gevelisolatie?",
    answer:
      "Gemiddeld kunt u tot 40% besparen op uw energiekosten. De precieze besparing hangt af van de huidige staat van uw woning en de gekozen isolatiewaarde. Daarnaast verhoogt gevelisolatie het wooncomfort en de waarde van uw woning.",
    link: false,
  },
  {
    question: "Hoe lang duurt het aanbrengen van gevelisolatie?",
    answer:
      "Voor een gemiddelde woning duurt het project 2 tot 4 weken, afhankelijk van de grootte en complexiteit. We plannen het werk zorgvuldig en houden u tijdens het proces volledig op de hoogte.",
    link: false,
  },
  {
    question: "Krijg ik garantie op het werk?",
    answer:
      "Ja, wij bieden garantie op zowel het materiaal als de uitvoering. De duur van de garantie varieert per type isolatie en afwerking. Dit bespreken we vooraf in de offerte.",
    link: true,
  },
  {
    question: "Kan ik subsidie krijgen voor gevelisolatie?",
    answer:
      "Ja, er zijn verschillende subsidieregelingen beschikbaar voor gevelisolatie. We denken graag met u mee over de mogelijkheden en helpen u bij het aanvragen van subsidies.",
    link: false,
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  Heeft u vragen over gevelisolatie? Hier vindt u de antwoorden op de meest gestelde vragen.
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
                              {faq.answer}
                              {faq.link && (
                                <>
                                  {" "}
                                  <Link
                                    href="/gevelisolatie/"
                                    className="font-medium text-primary hover:underline"
                                  >
                                    Lees meer
                                  </Link>
                                  .
                                </>
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
        </div>
      </section>
    </>
  )
}
