"use client"

import { useRef, useState, useEffect } from "react"
import ClientImage from "@/components/client-image"
import type { ResolvedImage } from "@/lib/types/images"

interface LazyBeforeAfterSliderProps {
  before: ResolvedImage
  after: ResolvedImage
  beforeAlt: string
  afterAlt: string
  sizes?: string
  className?: string
}

export default function LazyBeforeAfterSlider(
  props: LazyBeforeAfterSliderProps,
) {
  const {
    after,
    afterAlt,
    sizes = "(max-width: 640px) 100vw, 360px",
    className,
  } = props

  const ref = useRef<HTMLDivElement>(null)
  const [Slider, setSlider] = useState<React.ComponentType<
    LazyBeforeAfterSliderProps
  > | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          import("@/components/before-after-slider").then((mod) => {
            setSlider(() => mod.default)
          })
        }
      },
      { rootMargin: "200px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {Slider ? (
        <Slider {...props} className="h-full w-full" />
      ) : (
        /* Static placeholder — same dimensions, no JS cost */
        <div className="relative h-full w-full overflow-hidden">
          <ClientImage
            image={after}
            alt={afterAlt}
            sizes={sizes}
            className="h-full w-full object-cover"
          />
          <span className="absolute right-2.5 top-2.5 z-10 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Na
          </span>
        </div>
      )}
    </div>
  )
}
