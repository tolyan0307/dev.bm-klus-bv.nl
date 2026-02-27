"use client"

import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const cities = [
  { name: "Rotterdam", x: 50, y: 50, main: true },
  { name: "Schiedam", x: 43, y: 48 },
  { name: "Vlaardingen", x: 36, y: 44 },
  { name: "Capelle a/d IJssel", x: 60, y: 44 },
  { name: "Delft", x: 38, y: 56 },
  { name: "Den Haag", x: 28, y: 44 },
  { name: "Spijkenisse", x: 42, y: 64 },
  { name: "Ridderkerk", x: 62, y: 58 },
  { name: "Barendrecht", x: 56, y: 60 },
  { name: "Dordrecht", x: 66, y: 70 },
  { name: "Zoetermeer", x: 42, y: 36 },
  { name: "Gouda", x: 58, y: 30 },
  { name: "Leiden", x: 30, y: 30 },
  { name: "Utrecht", x: 68, y: 22 },
  { name: "Breda", x: 74, y: 78 },
  { name: "Alphen a/d Rijn", x: 42, y: 24 },
  { name: "Hellevoetsluis", x: 30, y: 72 },
  { name: "Gorinchem", x: 78, y: 60 },
  { name: "Hoek van Holland", x: 22, y: 52 },
  { name: "Krimpen a/d IJssel", x: 58, y: 50 },
]

export default function WorkAreaSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <section className="bg-secondary/20 py-16 sm:py-20 lg:py-28">
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
                      ? "border-primary bg-primary text-primary-foreground"
                      : hoveredCity === city.name
                        ? "border-primary/50 bg-primary/10 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:underline"
            >
              Staat uw locatie er niet bij? Neem contact op
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Stylized SVG Map */}
          <div className="flex items-start justify-center lg:items-center">
            <div className="relative w-full">
              <svg
                viewBox="-5 5 110 95"
                className="h-auto w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background shape - Zuid-Holland simplified */}
                <path
                  d="M4 12 Q14 6, 35 8 Q50 3, 70 8 Q88 12, 96 24 Q102 38, 100 54 Q96 70, 86 82 Q72 92, 55 94 Q38 96, 22 90 Q10 84, 4 72 Q0 58, 0 44 Q0 26, 4 12 Z"
                  className="fill-secondary/60 stroke-border"
                  strokeWidth="0.4"
                />

                {/* Coverage radius circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  className="stroke-primary/15"
                  strokeWidth="0.3"
                  strokeDasharray="2 1.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  fill="none"
                  className="stroke-primary/25"
                  strokeWidth="0.3"
                  strokeDasharray="1.5 1"
                />

                {/* Connection lines from Rotterdam to other cities */}
                {cities.filter(c => !c.main).map((city) => (
                  <line
                    key={`line-${city.name}`}
                    x1="50"
                    y1="50"
                    x2={city.x}
                    y2={city.y}
                    className={`transition-all duration-300 ${
                      hoveredCity === city.name
                        ? "stroke-primary/40"
                        : "stroke-border/40"
                    }`}
                    strokeWidth="0.25"
                    strokeDasharray="1 0.8"
                  />
                ))}

                {/* City markers */}
                {cities.map((city) => {
                  const isHovered = hoveredCity === city.name
                  const isMain = city.main

                  return (
                    <g
                      key={city.name}
                      onMouseEnter={() => setHoveredCity(city.name)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="cursor-pointer"
                    >
                      {/* Pulse ring for main city */}
                      {isMain && (
                        <>
                          <circle
                            cx={city.x}
                            cy={city.y}
                            r="4"
                            className="fill-primary/10"
                          >
                            <animate
                              attributeName="r"
                              values="3;6;3"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.3;0;0.3"
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </>
                      )}

                      {/* Hover glow */}
                      {isHovered && !isMain && (
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r="3.5"
                          className="fill-primary/10"
                        />
                      )}

                      {/* Marker dot */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isMain ? 2.2 : 1.4}
                        className={`transition-all duration-200 ${
                          isMain
                            ? "fill-primary stroke-primary-foreground"
                            : isHovered
                              ? "fill-primary stroke-primary-foreground"
                              : "fill-foreground/60 stroke-background"
                        }`}
                        strokeWidth={isMain ? "0.6" : "0.4"}
                      />

                      {/* City label */}
                      <text
                        x={city.x}
                        y={city.y - (isMain ? 4 : 3)}
                        textAnchor="middle"
                        className={`select-none font-sans transition-all duration-200 ${
                          isMain
                            ? "fill-foreground text-[3.2px] font-bold"
                            : isHovered
                              ? "fill-foreground text-[2.6px] font-semibold"
                              : "fill-muted-foreground text-[2.4px] font-medium"
                        }`}
                      >
                        {city.name}
                      </text>

                      {/* Distance tag on hover */}
                      {isHovered && !isMain && (
                        <g>
                          <rect
                            x={city.x - 5}
                            y={city.y + 2.5}
                            width="10"
                            height="3.5"
                            rx="1"
                            className="fill-foreground/80"
                          />
                          <text
                            x={city.x}
                            y={city.y + 4.8}
                            textAnchor="middle"
                            className="fill-background text-[2px] font-medium"
                          >
                            {Math.round(Math.sqrt(
                              Math.pow(city.x - 50, 2) + Math.pow(city.y - 50, 2)
                            ) * 2.5)} km
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Radius label */}
                <text
                  x="90"
                  y="16"
                  textAnchor="middle"
                  className="fill-primary/50 text-[2.5px] font-medium"
                >
                  80-100 km
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
