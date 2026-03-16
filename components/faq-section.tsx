"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { homeFaqItems } from "@/lib/content/home-faq"

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
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
                  </Link>{" "}
                  of lees meer{" "}
                  <Link href="/over-ons/" className="font-semibold text-primary hover:underline">
                    over ons team
                  </Link>.
                </p>
              </div>
            </div>

            {/* Right: Accordion */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {homeFaqItems.map((faq, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-xl border transition-all ${
                      openIndex === index
                        ? "border-primary/40 bg-card shadow-lg"
                        : "border-border/80 bg-card shadow-sm hover:shadow-md"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <span
                          className={`mt-0.5 shrink-0 text-lg font-bold transition-colors ${
                            openIndex === index ? "text-primary" : "text-muted-foreground/50"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 break-words text-base font-semibold text-foreground sm:text-lg">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 transition-all duration-300 ${
                          openIndex === index ? "rotate-180 text-primary" : "text-muted-foreground/70"
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
                                    Meer over gevelisolatie
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
  )
}
