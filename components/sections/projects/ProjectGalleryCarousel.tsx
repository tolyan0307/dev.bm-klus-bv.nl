"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface ProjectGalleryCarouselProps {
  title: string
  images: GalleryImage[]
  variant: "voor" | "na"
}

export default function ProjectGalleryCarousel({
  title,
  images,
  variant,
}: ProjectGalleryCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  const total = images.length

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total]
  )
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % total),
    [total]
  )

  // Scroll active thumbnail into view (skip initial render to prevent page jump)
  const isInitialRender = useRef(true)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    const container = thumbnailsRef.current
    if (!container) return
    const thumb = container.children[current] as HTMLElement | undefined
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }
  }, [current])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxOpen])

  const accentColor = variant === "voor" ? "border-amber-500" : "border-primary"
  const badgeColor =
    variant === "voor"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-primary/10 text-primary border-primary/20"

  return (
    <div className="flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${badgeColor}`}>
            {variant === "voor" ? "Voor" : "Na"}
          </span>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>
        <span className="text-sm font-medium text-muted-foreground tabular-nums">
          Foto {current + 1}/{total}
        </span>
      </div>

      {/* Main image */}
      <div
        className={`relative overflow-hidden rounded-xl border-2 bg-muted aspect-[4/3] cursor-zoom-in ${accentColor}`}
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label="Vergroot afbeelding"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
      >
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
          priority={current === 0}
        />

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-foreground/60 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <ZoomIn className="h-3.5 w-3.5" />
          Vergroten
        </div>

        {/* Prev / Next overlay buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Vorige foto"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/50 text-white backdrop-blur-sm transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Volgende foto"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/50 text-white backdrop-blur-sm transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={thumbnailsRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
        role="list"
        aria-label="Fotominiaturen"
      >
        {images.map((img, idx) => (
          <button
            key={img.src}
            role="listitem"
            onClick={() => setCurrent(idx)}
            aria-label={`Ga naar foto ${idx + 1}`}
            aria-current={idx === current ? "true" : undefined}
            className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              idx === current
                ? `${accentColor} opacity-100 shadow-md`
                : "border-border opacity-60 hover:opacity-90"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="80px"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Vergrote afbeelding"
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Sluit vergrote weergave"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            {current + 1} / {total}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Vorige foto"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main lightbox image */}
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={images[current].src}
                alt={images[current].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/70">{images[current].alt}</p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Volgende foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
}
