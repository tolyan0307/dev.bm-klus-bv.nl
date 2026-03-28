export interface PriceCard {
  title: string
  range: string
  note?: string
  highlighted?: boolean
}

interface PriceCardsProps {
  cards: PriceCard[]
  noteLines?: string[]
}

export default function PriceCards({ cards, noteLines = [] }: PriceCardsProps) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border bg-linear-to-br from-card via-card to-secondary/30 transition-all ${
              card.highlighted
                ? "border-primary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
                : "border-border/50 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]"
            }`}
          >
            <div
              className={`h-[3px] bg-linear-to-r ${
                card.highlighted
                  ? "from-primary via-primary/40 to-transparent"
                  : "from-primary/70 via-primary/25 to-transparent"
              }`}
            />
            <div className="flex flex-col justify-between gap-4 p-6 sm:p-8">
              <p className="text-sm font-medium leading-snug text-foreground/80">
                {card.title}
              </p>
              <div>
                <p className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                  {card.range}
                </p>
                {card.note && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {card.note}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {noteLines.length > 0 && (
        <div className="mt-5 space-y-1 rounded-xl border border-border/40 bg-secondary/20 px-5 py-4">
          {noteLines.map((line, i) => (
            <p key={i} className="text-[11px] leading-relaxed text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
