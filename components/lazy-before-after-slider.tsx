"use client"

import { useRef, useState, useEffect } from "react"
import ResponsiveImage from "@/components/responsive-image"

interface LazyBeforeAfterSliderProps {
  beforeBaseName: string
  afterBaseName: string
  beforeAlt: string
  afterAlt: string
  dir?: string
  sizes?: string
  className?: string
}

export default function LazyBeforeAfterSlider(
  props: LazyBeforeAfterSliderProps,
) {
  const {
    afterBaseName,
    afterAlt,
    dir = "/images/projects",
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
          <ResponsiveImage
            baseName={afterBaseName}
            dir={dir}
            preset="card"
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
