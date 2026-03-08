import { Star, Award, CheckCircle2, Calculator, type LucideIcon } from "lucide-react"
import GoogleRatingBadge from "@/components/google-rating-badge"
import type { ReactNode } from "react"

const trustItems: { key: string; icon: LucideIcon; text: ReactNode }[] = [
  { key: "reviews", icon: Star, text: <GoogleRatingBadge format="trust" /> },
  { key: "kvk", icon: Award, text: "KVK geregistreerd" },
  { key: "vca", icon: CheckCircle2, text: "VCA gecertificeerd" },
  { key: "prijs", icon: Calculator, text: "Prijs per m²" },
]

export default function TrustStrip() {
  return (
    <section className="border-b border-border/50 bg-secondary/30 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-8 lg:gap-12">
          {trustItems.map((item) => (
            <div key={item.key} className="flex items-center gap-2 text-sm text-foreground/80">
              <item.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
