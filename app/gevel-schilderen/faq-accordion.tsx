"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/content/gevel-schilderen";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faq.items.map((item, i) => {
        const isOpen = openIndex === i;
        const hasContactCta = item.answer.includes("Voor advies op maat: /contact/");
        const cleanAnswer = item.answer.replace(/\s?Voor advies op maat: \/contact\//g, "");

        return (
          <div
            key={i}
            className={`overflow-hidden rounded-xl border transition-all ${
              isOpen
                ? "border-primary/40 bg-card shadow-md"
                : "border-border bg-card shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`mt-0.5 text-lg font-bold tabular-nums transition-colors ${
                    isOpen ? "text-primary" : "text-border"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold text-foreground sm:text-lg">
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="border-t border-border/50 px-6 pb-6 pt-4"
                >
                  <div className="pl-12">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {cleanAnswer}
                      {hasContactCta && (
                        <>
                          {" "}
                          <Link
                            href="/contact/"
                            className="font-semibold text-primary hover:underline underline-offset-4"
                          >
                            Voor advies op maat, neem contact op.
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
