"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Welke werkzaamheden voert BM Klus BV uit?",
    answer:
      "We voeren buitengevelisolatie (ETICS), gevelafwerking (sierpleister, stucwerk, crepi, steenstrips) en gevelrenovatie uit. De meeste projecten combineren meerdere diensten tegelijkertijd.",
    link: false,
  },
  {
    question: "In welk gebied werkt u?",
    answer:
      "Ons werkgebied is regio Rotterdam en omgeving — ruwweg een straal van 80–100 km. Denk aan Zuid-Holland, delen van Utrecht en Noord-Brabant. Twijfelt u? Neem gerust contact op.",
    link: true,
  },
  {
    question: "Kan ik een project indienen voor publicatie?",
    answer:
      "We publiceren projecten waarbij wij de werkzaamheden zelf hebben uitgevoerd. Bent u een van onze opdrachtgevers en wilt u uw project hier zien staan? Neem contact op.",
    link: true,
  },
  {
    question: "Worden de projecten gefilterd op type werk?",
    answer:
      "Voorlopig tonen we projecten per object zonder harde categoriefilter, omdat de meeste opdrachten een combinatie van diensten omvatten. Filteropties voegen we toe zodra er voldoende projecten staan.",
    link: false,
  },
  {
    question: "Hoe vraag ik een offerte aan?",
    answer:
      "U kunt via de contactpagina een gratis inspectie of offerte aanvragen. We nemen binnen één werkdag contact met u op.",
    link: true,
  },
];

export default function OnzeWerkenFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Left sticky header */}
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
            Heeft u een vraag over onze projecten of aanpak? Hier vindt u de meest gestelde vragen.
          </p>
          <p className="mt-8 text-base text-muted-foreground">
            Staat uw vraag er niet tussen?{" "}
            <Link href="/contact/" className="font-semibold text-primary hover:underline">
              Neem contact op
            </Link>
          </p>
        </div>
      </div>

      {/* Right accordion */}
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
                              href="/contact/"
                              className="font-medium text-primary hover:underline"
                            >
                              Neem contact op
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
  );
}
