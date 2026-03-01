import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { BreadcrumbItem } from "@/components/seo/Breadcrumbs"
import Breadcrumbs from "@/components/seo/Breadcrumbs"

interface TrustBullet {
  text: string
}

interface CtaItem {
  text: string
  href: string
  variant: "primary" | "ghost"
}

interface PageHeroProps {
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  h1: string
  leadParagraphs: string[]
  trustBullets: TrustBullet[]
  ctas: CtaItem[]
}

export default function PageHero({
  breadcrumbs,
  eyebrow,
  h1,
  leadParagraphs,
  trustBullets,
  ctas,
}: PageHeroProps) {
  return (
    <div className="border-b border-border bg-card px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-14">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Eyebrow */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        </div>

        {/* H1 */}
        <h1 className="max-w-3xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {h1}
        </h1>

        {/* Lead paragraphs */}
        <div className="mt-5 max-w-2xl space-y-3">
          {leadParagraphs.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {para}
            </p>
          ))}
        </div>

        {/* Trust bullets */}
        {trustBullets.length > 0 && (
          <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {trustBullets.map((bullet) => (
              <li key={bullet.text} className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-foreground/80">{bullet.text}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTAs */}
        {ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {ctas.map((cta) =>
              cta.variant === "primary" ? (
                <Link
                  key={cta.text}
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                >
                  {cta.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  key={cta.text}
                  href={cta.href}
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {cta.text}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}
