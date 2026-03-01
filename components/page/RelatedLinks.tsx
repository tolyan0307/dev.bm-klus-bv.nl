import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface RelatedLinkItem {
  label: string
  description: string
  href: string
}

interface RelatedLinksProps {
  title?: string
  items: RelatedLinkItem[]
}

export default function RelatedLinks({
  title = "Gerelateerde pagina's",
  items,
}: RelatedLinksProps) {
  return (
    <div>
      {title && (
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-10 bg-primary" />
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {title}
          </span>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
            <ArrowRight
              className="mt-0.5 h-4 w-4 shrink-0 text-border transition-all group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
