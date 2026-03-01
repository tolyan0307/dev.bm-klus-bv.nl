// FUTURE EXTRACTION TARGET: /gevelisolatie/subsidie-vergunning/
import Link from "next/link"
import Image from "next/image"
import { subsidieVergunningContent } from "@/lib/content/gevelisolatie"
import { FileCheck, Euro, Check, ArrowRight } from "lucide-react"

const blocks = [
  {
    icon: FileCheck,
    label: "Omgevingsvergunning",
    badge: { text: "Per gemeente", cls: "bg-amber-100 text-amber-700" },
    tekst:
      "Bij buitengevelisolatie kan een omgevingsvergunning nodig zijn, met name wanneer het uiterlijk van de gevel verandert. Dit verschilt per gemeente en per situatie. Wij checken dit vooraf en adviseren u over de te volgen route.",
    bullets: [
      "Verandert het gevelbeeld zichtbaar?",
      "Beschermd stads- of dorpsgezicht?",
      "Vooraf toetsing bij gemeente door ons",
    ],
  },
  {
    icon: Euro,
    label: "Subsidie & regelingen",
    badge: { text: "ISDE / SEEH", cls: "bg-green-100 text-green-700" },
    tekst:
      "Er bestaan diverse regelingen voor woningisolatie. Of u in aanmerking komt, hangt af van het type woning, de behaalde RC-waarde en de geldende subsidieregelingen. Wij helpen u bij het uitzoeken van de mogelijkheden en de benodigde documentatie.",
    bullets: [
      "Minimaal RC 3,5 m²K/W vereist (ISDE)",
      "Subsidie aanvragen vóór uitvoering",
      "Wij ondersteunen bij documentatie",
    ],
  },
]

export default function SubsidieVergunningSection() {
  const data = subsidieVergunningContent

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header — стандарт ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Subsidie & vergunning
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Waar moet u{" "}
        <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
          op letten?
        </span>
      </h2>

      {/* ── Main layout: photo + two info blocks ── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">

        {/* Photo */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/images/subsidie-vergunning.webp"
            alt="Subsidie en vergunning documentatie"
            width={380}
            height={480}
            className="h-64 w-full object-cover lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">Wist u dat</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              Wij vooraf controleren of een vergunning nodig is — zonder extra kosten.
            </p>
          </div>
        </div>

        {/* Two info cards */}
        <div className="flex flex-col gap-4">
          {blocks.map((block) => {
            const Icon = block.icon
            return (
              <div key={block.label} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
                {/* card header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">{block.label}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${block.badge.cls}`}>
                      {block.badge.text}
                    </span>
                  </div>
                </div>
                {/* tekst */}
                <p className="text-sm leading-relaxed text-muted-foreground">{block.tekst}</p>
                {/* bullets */}
                <ul className="space-y-2">
                  {block.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                      </div>
                      <span className="text-sm leading-snug text-foreground/70">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Checklist banner ── */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted/30">
        <div className="border-b border-border px-5 py-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Wat wij controleren bij de opname
          </p>
        </div>
        <div className="grid gap-0 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {data.checklist.map((item, i) => (
            <div key={item} className="flex items-start gap-3 px-5 py-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary">
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-foreground/70">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Info strip ── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5">
        <p className="text-sm leading-relaxed text-foreground/80">
          Wilt u weten wat er in uw situatie speelt? Wij checken gratis of een vergunning nodig is en welke subsidie van toepassing is.
        </p>
        <Link
          href="/gevelisolatie/subsidie-vergunning/"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          Uitgebreide checklist bekijken
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

    </section>
  )
}
