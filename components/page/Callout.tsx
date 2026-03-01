import type { ReactNode } from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

type CalloutVariant = "info" | "warning" | "tip" | "orange"

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

const variantStyles: Record<CalloutVariant, string> = {
  info:    "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  tip:     "border-green-200 bg-green-50 text-green-800",
  orange:  "border-primary/30 bg-primary/8 text-foreground",
}

const iconStyles: Record<CalloutVariant, string> = {
  info:    "text-blue-500",
  warning: "text-amber-500",
  tip:     "text-green-500",
  orange:  "text-primary",
}

export default function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-5",
        variantStyles[variant],
        className
      )}
      role="note"
    >
      <Info className={cn("mt-0.5 h-4 w-4 shrink-0", iconStyles[variant])} aria-hidden="true" />
      <div className="text-sm leading-relaxed">
        {title && (
          <p className="mb-1 font-semibold">{title}</p>
        )}
        {children}
      </div>
    </div>
  )
}
