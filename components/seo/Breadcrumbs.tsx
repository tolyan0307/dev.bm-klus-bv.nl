import Link from "next/link"

import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
  label: string
  href: string
}

export type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items?.length) return null

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center">
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className="px-2 text-muted-foreground/60"
                >
                  /
                </span>
              )}

              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

