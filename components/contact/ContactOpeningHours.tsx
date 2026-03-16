"use client"

const SCHEDULE = [
  { day: "Maandag", jsDay: 1, open: "9:00", close: "18:00" },
  { day: "Dinsdag", jsDay: 2, open: "9:00", close: "18:00" },
  { day: "Woensdag", jsDay: 3, open: "9:00", close: "18:00" },
  { day: "Donderdag", jsDay: 4, open: "9:00", close: "18:00" },
  { day: "Vrijdag", jsDay: 5, open: "9:00", close: "18:00" },
  { day: "Zaterdag", jsDay: 6, open: "9:00", close: "18:00" },
  { day: "Zondag", jsDay: 0, open: null, close: null },
] as const

function OpenStatusBadge() {
  const now = new Date()
  const todayJs = now.getDay()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const today = SCHEDULE.find((s) => s.jsDay === todayJs)
  const isOpenNow = (() => {
    if (!today?.open || !today?.close) return false
    const [oh, om] = today.open.split(":").map(Number)
    const [ch, cm] = today.close.split(":").map(Number)
    return currentMinutes >= oh * 60 + om && currentMinutes < ch * 60 + cm
  })()

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
        isOpenNow
          ? "bg-green-500/12 text-green-700"
          : "bg-muted text-muted-foreground"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isOpenNow ? "bg-green-500 animate-pulse" : "bg-muted-foreground/40"
        }`}
      />
      {isOpenNow ? "Nu open" : "Gesloten"}
    </span>
  )
}

export default function ContactOpeningHours() {
  const todayJs = new Date().getDay()

  return (
    <div className="bg-secondary/40 px-5 pt-3 pb-4 border-t border-border flex-1">
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Openingstijden
        </p>
        <OpenStatusBadge />
      </div>
      <div className="flex flex-col gap-0.5">
        {SCHEDULE.map(({ day, jsDay, open, close }) => {
          const isToday = jsDay === todayJs
          return (
            <div
              key={day}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                isToday
                  ? "bg-primary/8 ring-1 ring-primary/20"
                  : "hover:bg-secondary"
              }`}
            >
              <span
                className={`font-medium ${
                  isToday ? "text-primary" : "text-foreground"
                }`}
              >
                {day}
                {isToday && (
                  <span className="ml-1.5 text-[9px] uppercase tracking-wide text-primary/60">
                    vandaag
                  </span>
                )}
              </span>
              <span
                className={`tabular-nums font-semibold ${
                  open
                    ? isToday
                      ? "text-primary"
                      : "text-muted-foreground"
                    : "text-muted-foreground/40"
                }`}
              >
                {open ? `${open} – ${close}` : "Gesloten"}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
