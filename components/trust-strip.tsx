import { Star, Award, CheckCircle2, Calculator } from "lucide-react"

const trustItems = [
  { icon: Star, text: "4.8★ Google reviews" },
  { icon: Award, text: "KVK geregistreerd" },
  { icon: CheckCircle2, text: "VCA gecertificeerd" },
  { icon: Calculator, text: "Offerte per m²" },
]

export default function TrustStrip() {
  return (
    <section className="border-b border-border/50 bg-secondary/30 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-8 lg:gap-12">
          {trustItems.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-foreground/80">
              <item.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
