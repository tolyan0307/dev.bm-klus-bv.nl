"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const cities: { name: string; x: number; y: number; main?: boolean; label?: boolean }[] = [
  { name: "Rotterdam", x: 50, y: 50, main: true, label: true },
  { name: "Schiedam", x: 40, y: 44 },
  { name: "Vlaardingen", x: 32, y: 39 },
  { name: "Capelle a/d IJssel", x: 63, y: 42 },
  { name: "Delft", x: 34, y: 57, label: true },
  { name: "Den Haag", x: 22, y: 36, label: true },
  { name: "Spijkenisse", x: 38, y: 67 },
  { name: "Ridderkerk", x: 64, y: 59 },
  { name: "Barendrecht", x: 56, y: 63 },
  { name: "Dordrecht", x: 70, y: 73, label: true },
  { name: "Zoetermeer", x: 40, y: 31 },
  { name: "Gouda", x: 58, y: 25, label: true },
  { name: "Leiden", x: 26, y: 24, label: true },
  { name: "Utrecht", x: 72, y: 17, label: true },
  { name: "Breda", x: 78, y: 82 },
  { name: "Alphen a/d Rijn", x: 38, y: 18 },
  { name: "Hellevoetsluis", x: 26, y: 75 },
  { name: "Gorinchem", x: 82, y: 60 },
  { name: "Hoek van Holland", x: 17, y: 52 },
  { name: "Krimpen a/d IJssel", x: 61, y: 51 },
  { name: "Maassluis", x: 25, y: 47 },
  { name: "Leidschendam-Voorburg", x: 28, y: 32 },
  { name: "Hendrik-Ido-Ambacht", x: 67, y: 65 },
  { name: "Roosendaal", x: 78, y: 90 },
]

export default function WorkAreaSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <section className="bg-secondary/10 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Werkgebied
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Regio <span className="text-primary">Rotterdam</span>
              <br />
              en omgeving
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Wij verzorgen gevelisolatie en renovatie in de regio Rotterdam en omgeving
              (circa 80-100 km), Zuid-Holland en omliggende regio{"'"}s.
            </p>

            {/* City list - compact */}
            <div className="mt-8 flex flex-wrap gap-2">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                    city.main
                      ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : hoveredCity === city.name
                        ? "border-primary/50 bg-primary/10 text-foreground shadow-sm"
                        : "border-border/80 bg-card text-foreground/70 shadow-sm hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <Link
              href="/contact/"
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:underline"
            >
              Staat uw locatie er niet bij? Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Premium map (light, seamless) */}
          <div className="flex items-start justify-center lg:items-center">
            <div className="relative w-full max-w-xl">
              <svg viewBox="0 0 200 200" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="heatmap" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#E8600A" stopOpacity="0.22" />
                    <stop offset="30%" stopColor="#E8600A" stopOpacity="0.10" />
                    <stop offset="60%" stopColor="#E8600A" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#E8600A" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="hub-glow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#E8600A" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#E8600A" stopOpacity="0" />
                  </radialGradient>
                  <filter id="blur-lg"><feGaussianBlur stdDeviation="3" /></filter>
                  <filter id="blur-sm"><feGaussianBlur stdDeviation="1.2" /></filter>
                </defs>

                {/* Coastline silhouette */}
                <path
                  d="M32 5 Q28 18, 18 30 Q10 42, 8 55 Q5 65, 12 80 Q18 90, 25 96 L20 100 Q14 92, 6 82 Q0 68, 2 52 Q3 38, 14 24 Q22 12, 32 5 Z"
                  className="fill-border/20 stroke-border/30"
                  strokeWidth="0.5"
                />
                {/* Rivers */}
                <path d="M8 55 Q30 52, 55 48 Q70 46, 90 50" fill="none" className="stroke-border/15" strokeWidth="2.5" />
                <path d="M25 96 Q40 80, 55 70 Q68 62, 85 60" fill="none" className="stroke-border/15" strokeWidth="1.8" />

                {/* Topo contours */}
                {[20, 35, 50, 65, 80].map((r) => (
                  <circle key={`t-${r}`} cx="100" cy="100" r={r} fill="none" className="stroke-foreground/4" strokeWidth="0.2" />
                ))}

                {/* Heatmap glow */}
                <circle cx="100" cy="100" r="90" fill="url(#heatmap)" />

                {/* Coverage rings */}
                <circle cx="100" cy="100" r="56" fill="none" stroke="#E8600A" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 3" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#E8600A" strokeWidth="0.4" opacity="0.1" strokeDasharray="5 4" />

                {/* Crosshairs */}
                <line x1="100" y1="15" x2="100" y2="185" className="stroke-foreground/4" strokeWidth="0.2" />
                <line x1="15" y1="100" x2="185" y2="100" className="stroke-foreground/4" strokeWidth="0.2" />

                {/* Static arcs to key cities */}
                {cities.filter(c => c.label && !c.main).map((city) => {
                  const cx2 = city.x * 2, cy2 = city.y * 2
                  const mx = (100 + cx2) / 2, my = (100 + cy2) / 2
                  const dx = cx2 - 100, dy = cy2 - 100
                  const ox = -dy * 0.15, oy = dx * 0.15
                  return (
                    <path
                      key={`arc-${city.name}`}
                      d={`M100,100 Q${mx + ox},${my + oy} ${cx2},${cy2}`}
                      fill="none"
                      stroke="#E8600A"
                      strokeWidth="0.4"
                      opacity={0.15}
                      className="transition-all duration-300"
                    />
                  )
                })}

                {/* Animated arc to hovered city */}
                {hoveredCity && (() => {
                  const city = cities.find(c => c.name === hoveredCity && !c.main)
                  if (!city) return null
                  const cx2 = city.x * 2, cy2 = city.y * 2
                  const mx = (100 + cx2) / 2, my = (100 + cy2) / 2
                  const dx = cx2 - 100, dy = cy2 - 100
                  const ox = -dy * 0.18, oy = dx * 0.18
                  const arcPath = `M100,100 Q${mx + ox},${my + oy} ${cx2},${cy2}`
                  return (
                    <g key={`arc-active-${city.name}`}>
                      {/* Glow trail */}
                      <path
                        d={arcPath}
                        fill="none"
                        stroke="#E8600A"
                        strokeWidth="3"
                        opacity="0.08"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset="1"
                        strokeLinecap="round"
                      >
                        <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.5s" fill="freeze" />
                      </path>
                      {/* Main arc line */}
                      <path
                        d={arcPath}
                        fill="none"
                        stroke="#E8600A"
                        strokeWidth="1"
                        opacity="0.6"
                        pathLength="1"
                        strokeDasharray="1"
                        strokeDashoffset="1"
                        strokeLinecap="round"
                      >
                        <animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.45s" fill="freeze" />
                      </path>
                      {/* Traveling dot */}
                      <circle r="2.5" fill="#E8600A" opacity="0.9">
                        <animateMotion dur="0.45s" fill="freeze" path={arcPath} />
                        <animate attributeName="opacity" values="0.9;0.9;0" dur="0.45s" fill="freeze" />
                      </circle>
                      <circle r="1" fill="#fff" opacity="0.8">
                        <animateMotion dur="0.45s" fill="freeze" path={arcPath} />
                        <animate attributeName="opacity" values="0.8;0.8;0" dur="0.45s" fill="freeze" />
                      </circle>
                    </g>
                  )
                })()}

                {/* City markers */}
                {cities.map((city) => {
                  const isHovered = hoveredCity === city.name
                  const isMain = city.main
                  const showLabel = city.label || isHovered
                  const cx2 = city.x * 2, cy2 = city.y * 2
                  const dist = Math.sqrt((city.x - 50) ** 2 + (city.y - 50) ** 2)
                  const km = Math.round(dist * 2.2)

                  return (
                    <g
                      key={city.name}
                      onMouseEnter={() => setHoveredCity(city.name)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="cursor-pointer"
                    >
                      {isMain && (
                        <>
                          <circle cx={cx2} cy={cy2} r="14" fill="url(#hub-glow)" filter="url(#blur-lg)" />
                          <circle cx={cx2} cy={cy2} r="6" fill="none" stroke="#E8600A" strokeWidth="0.6" opacity="0.35">
                            <animate attributeName="r" values="6;14;6" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={cx2} cy={cy2} r="10" fill="none" stroke="#E8600A" strokeWidth="0.35" opacity="0.18">
                            <animate attributeName="r" values="10;18;10" dur="3s" begin="0.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.18;0;0.18" dur="3s" begin="0.5s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={cx2} cy={cy2} r="5.5" fill="#E8600A" filter="url(#blur-sm)" opacity="0.5" />
                          <circle cx={cx2} cy={cy2} r="4.5" fill="#E8600A" />
                          <circle cx={cx2} cy={cy2} r="2" fill="#fff" />
                        </>
                      )}

                      {!isMain && (
                        <>
                          {isHovered && <circle cx={cx2} cy={cy2} r="6" fill="#E8600A" opacity="0.1" />}
                          <circle
                            cx={cx2}
                            cy={cy2}
                            r={isHovered ? 3.2 : city.label ? 2.5 : 1.8}
                            fill="#E8600A"
                            opacity={isHovered ? 1 : city.label ? 0.8 : 0.3}
                            className="transition-all duration-200"
                          />
                          {(isHovered || city.label) && (
                            <circle cx={cx2} cy={cy2} r={isHovered ? 1.3 : 1} fill="#fff" opacity={isHovered ? 0.9 : 0.7} />
                          )}
                        </>
                      )}

                      {showLabel && (
                        <text
                          x={cx2}
                          y={cy2 - (isMain ? 11 : 7)}
                          textAnchor="middle"
                          className="select-none"
                          fill={isMain || isHovered ? "var(--color-foreground)" : "#666"}
                          fontSize={isMain ? 7.5 : isHovered ? 6 : 5}
                          fontWeight={isMain ? 800 : isHovered ? 700 : 500}
                          fontFamily="system-ui, sans-serif"
                        >
                          {city.name}
                        </text>
                      )}

                      {isHovered && !isMain && (
                        <g>
                          <rect x={cx2 - 12} y={cy2 + 6} width="24" height="9" rx="2.5" fill="#E8600A" />
                          <text x={cx2} y={cy2 + 12.5} textAnchor="middle" fill="#fff" fontSize="5" fontWeight="600" fontFamily="system-ui, sans-serif">
                            ±{km} km
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Scale */}
                <g opacity="0.5">
                  <line x1="100" y1="100" x2="190" y2="100" stroke="#E8600A" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="190" y1="96" x2="190" y2="104" stroke="#E8600A" strokeWidth="0.5" />
                  <text x="188" y="93" textAnchor="end" fill="#E8600A" fontSize="5" fontWeight="700" fontFamily="system-ui, sans-serif">100 km</text>
                </g>
              </svg>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
