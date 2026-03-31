"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedDotsProps {
  level: number
  total?: number
}

export default function AnimatedDots({ level, total = 4 }: AnimatedDotsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay start so user has time to focus on the block
          const timer = setTimeout(() => {
            setVisible(true)
            observer.disconnect()
          }, 600)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.8 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex gap-1.5 shrink-0">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full transition-all ${
            visible && i < level
              ? "scale-100 bg-primary"
              : visible
                ? "scale-100 bg-border/50"
                : "scale-50 bg-border/20"
          }`}
          style={{
            transitionDuration: visible ? "700ms" : "0ms",
            transitionDelay: visible ? `${i * 250}ms` : "0ms",
          }}
        />
      ))}
    </div>
  )
}
