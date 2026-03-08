"use client"

import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  fetchPlace,
  type PlaceReview as ReviewCard,
  type PlaceData,
} from "@/lib/google-place-cache"

type LoadState = "idle" | "loading" | "done" | "error"

const GOOGLE_COLORS = [
  "bg-[#4285F4]",
  "bg-[#34A853]",
  "bg-[#EA4335]",
  "bg-[#FBBC05]",
]

function initialColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return GOOGLE_COLORS[Math.abs(hash) % GOOGLE_COLORS.length]
}

/* ------------------------------------------------------------------ */
/*  Google badge SVG                                                   */
/* ------------------------------------------------------------------ */

function GoogleBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Stars                                                              */
/* ------------------------------------------------------------------ */

function FullStars({ count, size = "h-4 w-4" }: { count: number; size?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${size} fill-[#FBBC05] text-[#FBBC05]`} />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Single review card                                                 */
/* ------------------------------------------------------------------ */

function ReviewCardEl({ review }: { review: ReviewCard }) {
  const [expanded, setExpanded] = useState(false)
  const needsTruncation = review.text.length > 120

  return (
    <div className="flex w-[95%] shrink-0 flex-col snap-center sm:w-[calc(50%-12px)] sm:snap-start lg:w-[calc(25%-18px)]">
      <div className="relative flex flex-1 flex-col pt-10">
        {/* Avatar */}
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <div className="relative">
            {review.photoUri ? (
              <img
                src={review.photoUri}
                alt={review.author}
                className="h-[72px] w-[72px] rounded-full object-cover shadow-lg"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg ${initialColor(review.author)}`}
              >
                {review.initial}
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-sm">
              <GoogleBadge />
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col rounded-xl border border-border bg-card px-6 pb-6 pt-12 text-center shadow-md transition-shadow hover:shadow-lg">
          <h3 className="text-base font-bold text-foreground">
            {review.authorUri ? (
              <a
                href={review.authorUri}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {review.author}
              </a>
            ) : (
              review.author
            )}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {review.relativeTime}
          </p>

          <div className="mt-3 flex items-center justify-center gap-1">
            <FullStars count={review.rating} />
          </div>

          <div className="relative mt-4 flex-1">
            <p className="text-sm leading-relaxed text-foreground/80">
              {needsTruncation && !expanded
                ? review.text.slice(0, 120) + "…"
                : review.text}
            </p>
            {needsTruncation && !expanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-linear-to-t from-card to-transparent" />
            )}
          </div>

          {needsTruncation && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-sm font-medium text-primary transition-colors hover:underline"
            >
              {expanded ? "Minder tonen" : "Lees verder"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section header                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader() {
  return (
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
        <span className="whitespace-nowrap text-primary">BM klus BV</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Lees wat onze tevreden klanten over ons vertellen.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Google Maps link                                                   */
/* ------------------------------------------------------------------ */

function GoogleMapsLink({ uri }: { uri?: string }) {
  if (!uri) return null
  return (
    <a
      href={uri}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary"
    >
      <GoogleBadge />
      Bekijk alle reviews op Google
      <ExternalLink className="h-4 w-4" />
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  Fallback state                                                     */
/* ------------------------------------------------------------------ */

function FallbackState({ googleMapsUri }: { googleMapsUri?: string }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-base text-muted-foreground">
            Bekijk onze reviews op Google.
          </p>
          <GoogleMapsLink uri={googleMapsUri} />
          <p className="text-xs text-muted-foreground/60">
            Reviews van Google Maps
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Loading skeleton                                                   */
/* ------------------------------------------------------------------ */

function LoadingSkeleton() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <div className="flex items-center justify-center gap-3">
          <div className="h-5 w-24 animate-pulse rounded bg-muted" />
          <div className="h-5 w-48 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-10 flex gap-5 overflow-hidden pl-[2.5%] sm:gap-6 sm:pl-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[95%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="pt-10">
                <div className="rounded-xl border border-border bg-card px-6 pb-6 pt-12 shadow-md">
                  <div className="mx-auto h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="mx-auto mt-2 h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="mx-auto mt-4 h-3 w-20 animate-pulse rounded bg-muted" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function GoogleReviews() {
  const [state, setState] = useState<LoadState>("idle")
  const [place, setPlace] = useState<PlaceData | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const fetchedRef = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafId = useRef(0)

  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const dragMoved = useRef(false)

  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""

  const fallbackMapsUri = placeId
    ? `https://search.google.com/local/reviews?placeid=${placeId}`
    : undefined

  /* ---- data fetch (shared singleton via google-place-cache) ---- */
  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    setState("loading")

    fetchPlace()
      .then((data) => {
        if (!data) {
          setState("error")
          return
        }
        setPlace(data)
        setState("done")
      })
      .catch(() => {
        setState("error")
      })
  }, [])

  /* ---- scroll state sync ---- */
  const syncScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || el.children.length === 0) return

    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
    )

    const firstCard = el.children[0] as HTMLElement
    const cardWidth = firstCard.offsetWidth
    const gap = parseFloat(getComputedStyle(el).gap) || 0
    const step = cardWidth + gap
    const idx = step > 0 ? Math.round(el.scrollLeft / step) : 0
    setActiveIndex(
      Math.max(0, Math.min(idx, el.children.length - 1)),
    )
  }, [])

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(syncScroll)
  }, [syncScroll])

  useEffect(() => {
    if (state !== "done") return
    const timer = setTimeout(syncScroll, 60)
    window.addEventListener("resize", syncScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", syncScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [state, syncScroll])

  /* ---- mouse drag (pointer events on window) ---- */
  useEffect(() => {
    if (state !== "done") return

    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - dragStartX.current
      if (Math.abs(dx) > 3) dragMoved.current = true
      const el = scrollRef.current
      if (el) el.scrollLeft = dragStartScroll.current - dx
    }

    const onUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      const el = scrollRef.current
      if (el) {
        el.style.scrollSnapType = ""
        el.style.cursor = ""
        el.style.userSelect = ""
      }
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [state])

  /* ---- handlers ---- */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return
    const el = scrollRef.current
    if (!el) return
    isDragging.current = true
    dragMoved.current = false
    dragStartX.current = e.clientX
    dragStartScroll.current = el.scrollLeft
    el.style.scrollSnapType = "none"
    el.style.cursor = "grabbing"
    el.style.userSelect = "none"
  }, [])

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragMoved.current) {
      e.stopPropagation()
      e.preventDefault()
      dragMoved.current = false
    }
  }, [])

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el || el.children.length === 0) return
    const firstCard = el.children[0] as HTMLElement
    const cardWidth = firstCard.offsetWidth
    const gap = parseFloat(getComputedStyle(el).gap) || 0
    el.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" })
  }, [])

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[index] as HTMLElement | undefined
    if (!card) return
    const containerRect = el.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const offset =
      cardRect.left - containerRect.left + el.scrollLeft
    const target = offset - (el.clientWidth - card.offsetWidth) / 2
    el.scrollTo({
      left: Math.max(0, target),
      behavior: "smooth",
    })
  }, [])

  /* ---- render gates ---- */
  if (state === "idle" || state === "loading") return <LoadingSkeleton />
  if (state === "error" || !place || place.reviews.length === 0) {
    return (
      <FallbackState
        googleMapsUri={place?.googleMapsUri ?? fallbackMapsUri}
      />
    )
  }

  const mapsUri = place.googleMapsUri ?? fallbackMapsUri

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {/* Aggregate rating */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1">
            <FullStars count={Math.round(place.rating)} size="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-foreground">
            {place.rating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            op basis van {place.reviewCount} Google reviews
          </span>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="absolute -left-5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-3 shadow-lg transition-all hover:bg-secondary hover:shadow-xl disabled:opacity-30 sm:-left-6 lg:flex"
            aria-label="Vorige reviews"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-3 shadow-lg transition-all hover:bg-secondary hover:shadow-xl disabled:opacity-30 sm:-right-6 lg:flex"
            aria-label="Volgende reviews"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Scroll container — native overflow + snap */}
          <div
            ref={scrollRef}
            className="no-scrollbar flex cursor-grab items-stretch gap-5 overflow-x-auto pl-[2.5%] pr-[2.5%] snap-x snap-mandatory active:cursor-grabbing sm:gap-6 sm:pl-0 sm:pr-0"
            onScroll={handleScroll}
            onPointerDown={onPointerDown}
            onClickCapture={onClickCapture}
            tabIndex={0}
            role="region"
            aria-label="Google reviews carousel"
            aria-roledescription="carousel"
          >
            {place.reviews.map((review, idx) => (
              <ReviewCardEl
                key={`${review.author}-${idx}`}
                review={review}
              />
            ))}
          </div>

          {/* Dots — visible on all breakpoints */}
          <div className="mt-8 flex justify-center gap-2">
            {place.reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-primary/50"
                }`}
                aria-label={`Ga naar review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Subtitle + external link + attribution */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Een selectie van recente Google reviews.
          </p>
          <GoogleMapsLink uri={mapsUri} />
          <p className="text-xs text-muted-foreground/60">
            Reviews van Google Maps
          </p>
        </div>
      </div>
    </section>
  )
}
