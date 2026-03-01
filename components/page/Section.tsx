import type { ReactNode } from "react"

interface SectionProps {
  id: string
  eyebrow?: string
  h2: string
  lead?: string
  accentWord?: string
  className?: string
  children: ReactNode
}

export default function Section({ id, eyebrow, h2, lead, accentWord, className = "", children }: SectionProps) {
  // Split h2 at accentWord so it can be coloured
  const parts = accentWord && h2.includes(accentWord)
    ? h2.split(accentWord)
    : null

  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 lg:py-24 ${className}`}>
      {/* Header */}
      {eyebrow && (
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {parts ? (
          <>
            {parts[0]}
            <span className="text-primary">{accentWord}</span>
            {parts[1]}
          </>
        ) : h2}
      </h2>
      {lead && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}

      {/* Content */}
      <div className="mt-8">{children}</div>
    </section>
  )
}
