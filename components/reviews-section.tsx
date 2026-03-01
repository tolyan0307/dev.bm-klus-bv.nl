"use client"

import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useCallback } from "react"

const reviews = [
  {
    name: "Marcel V",
    date: "11 Maart 2025",
    initial: "M",
    color: "bg-muted-foreground",
    rating: 5,
    text: "Door BM klus BV een gevel laten isoleren en afwerken. Komen op afgesproken tijden en dagen en werken zeer netjes en...",
    verified: true,
  },
  {
    name: "Geert de Leeuw",
    date: "12 Februari 2025",
    initial: "G",
    color: "bg-emerald-600",
    rating: 5,
    text: "Heel tevreden over de samenwerking en resultaat! Wij hadden last van flinke vochtdoorslag door de...",
    verified: true,
  },
  {
    name: "Fieke Boswinkel",
    date: "6 Januari 2025",
    initial: "F",
    color: "bg-primary",
    rating: 5,
    text: "Boris en zijn mannen hebben fantastisch werk geleverd! De grote vochtproblemen die wij in de gevels en buitentrappen van ons...",
    verified: true,
  },
  {
    name: "Natasja Mikos",
    date: "1 September 2024",
    initial: "N",
    color: "bg-muted-foreground",
    rating: 5,
    text: "Spijkenisse 01-09-2024 Boris en zijn mannen hebben mooi en vakkundig werk afgeleverd. Onze buiten gevel is gerepareerd,...",
    verified: true,
  },
]

export default function ReviewsSection() {
  const [scrollOffset, setScrollOffset] = useState(0)
  const maxScroll = Math.max(0, reviews.length - 3)

  const scrollPrev = useCallback(() => {
    setScrollOffset((prev) => Math.max(0, prev - 1))
  }, [])

  const scrollNext = useCallback(() => {
    setScrollOffset((prev) => Math.min(maxScroll, prev + 1))
  }, [maxScroll])

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — centered for visual variety */}
        <div className="mb-12 text-center lg:mb-16">
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Reviews
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Klanten over{" "}
            <span className="text-primary">BM Klus BV</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Lees wat onze tevreden klanten over ons vertellen.
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={scrollPrev}
            disabled={scrollOffset === 0}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2.5 shadow-md transition-all hover:bg-secondary hover:shadow-lg disabled:opacity-30 sm:-left-5 lg:flex"
            aria-label="Vorige reviews"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollNext}
            disabled={scrollOffset >= maxScroll}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2.5 shadow-md transition-all hover:bg-secondary hover:shadow-lg disabled:opacity-30 sm:-right-5 lg:flex"
            aria-label="Volgende reviews"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out sm:gap-6"
              style={{
                transform: `translateX(-${scrollOffset * (100 / 4 + 1.5)}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="w-[85%] shrink-0 sm:w-[46%] lg:w-[calc(25%-18px)]"
                >
                  {/* Card with avatar sticking out */}
                  <div className="relative pt-10">
                    {/* Avatar */}
                    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
                      <div className="relative">
                        <div
                          className={`flex h-[72px] w-[72px] items-center justify-center rounded-full text-2xl font-bold text-primary-foreground shadow-lg ${review.color}`}
                        >
                          {review.initial}
                        </div>
                        {/* Google badge */}
                        <div className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-sm">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="rounded-xl border border-border bg-card px-6 pb-6 pt-12 text-center shadow-sm transition-shadow hover:shadow-md">
                      <h3 className="text-base font-bold text-foreground">
                        {review.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {review.date}
                      </p>

                      {/* Stars + verified */}
                      <div className="mt-3 flex items-center justify-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]"
                          />
                        ))}
                        {review.verified && (
                          <svg
                            className="ml-1 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle cx="12" cy="12" r="10" fill="#4285F4" />
                            <path
                              d="M9 12.5l2 2 4-4.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                        {review.text}
                      </p>

                      <button className="mt-3 text-sm font-medium text-primary transition-colors hover:underline">
                        Lees verder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile navigation dots */}
          <div className="mt-8 flex justify-center gap-2 lg:hidden">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setScrollOffset(index)}
                className={`h-2 rounded-full transition-all ${
                  index === scrollOffset
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-primary/50"
                }`}
                aria-label={`Ga naar review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
