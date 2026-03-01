import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Kruimelpad"
      className={`flex flex-wrap items-center gap-1 text-xs text-muted-foreground ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 shrink-0 text-border" aria-hidden="true" />
            )}
            {isLast || !item.href ? (
              <span
                className={isLast ? "font-medium text-foreground/70" : ""}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
