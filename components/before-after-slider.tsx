"use client"

import { useRef, useState, useCallback } from "react"
import ResponsiveImage from "@/components/responsive-image"

interface BeforeAfterSliderProps {
  beforeBaseName: string
  afterBaseName: string
  beforeAlt: string
  afterAlt: string
  dir?: string
  sizes?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeBaseName,
  afterBaseName,
  beforeAlt,
  afterAlt,
  dir = "/images/projects",
  sizes = "(max-width: 640px) 100vw, 360px",
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100))
    setPosition(pct)
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      updatePosition(e.clientX)
    },
    [updatePosition],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return
      updatePosition(e.clientX)
    },
    [updatePosition],
  )

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - 2))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + 2))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: "pan-y" }}
    >
      {/* After (base layer) */}
      <ResponsiveImage
        baseName={afterBaseName}
        dir={dir}
        preset="card"
        alt={afterAlt}
        sizes={sizes}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* Before (clipped overlay) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <ResponsiveImage
          baseName={beforeBaseName}
          dir={dir}
          preset="card"
          alt={beforeAlt}
          sizes={sizes}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <div
        role="slider"
        aria-label="Vergelijk voor en na"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute z-20 flex h-9 w-9 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-white/90 shadow-lg backdrop-blur-sm transition-shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden"
        style={{
          left: `${position}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-foreground/70"
          aria-hidden
        >
          <path
            d="M4.5 3L1.5 7L4.5 11M9.5 3L12.5 7L9.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        Voor
      </span>
      <span className="absolute right-2.5 top-2.5 z-10 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        Na
      </span>
    </div>
  )
}
