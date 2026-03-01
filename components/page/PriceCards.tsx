export interface PriceCard {
  title: string
  range: string
  note?: string
  highlighted?: boolean
}

interface NoteLineProps {
  lines: string[]
}

interface PriceCardsProps {
  cards: PriceCard[]
  noteLines?: string[]
}

export default function PriceCards({ cards, noteLines = [] }: PriceCardsProps) {
  return (
    <div>
      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex flex-col justify-between gap-4 rounded-xl border p-6 transition-all ${
              card.highlighted
                ? "border-primary/50 bg-primary/5 shadow-md"
                : "border-border bg-card shadow-sm"
            }`}
          >
            <p className="text-sm leading-snug text-foreground/80">{card.title}</p>
            <div>
              <p className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                {card.range}
              </p>
              {card.note && (
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {card.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer lines */}
      {noteLines.length > 0 && (
        <div className="mt-4 space-y-1 rounded-lg bg-muted/40 px-4 py-3">
          {noteLines.map((line, i) => (
            <p key={i} className="text-[11px] leading-relaxed text-muted-foreground/80">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
