// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")

export const beforeImages = Array.from({ length: 21 }, (_, i) => ({
  src: `/images/projects/halsteren-buitenstucwerk-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Halsteren buitenstucwerk met sierpleister – voor de werken foto ${pad(i + 1)} (2025)`,
}))

export const afterImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/projects/halsteren-buitenstucwerk-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Halsteren buitenstucwerk met sierpleister – na de werken foto ${pad(i + 1)} (2025)`,
}))

// ─── "Onze werken" card object ────────────────────────────────────────────────
export const projectCard = {
  serviceType: "Buitenstucwerk",
  title: "Halsteren – buitenstucwerk, sierpleister & schilderwerk (2025)",
  subtitle:
    "Binnenplaats en centrale gevel: herstel cementstuc, sierpleister 1,5 mm, zinken afdekking en 2 lagen verf",
  meta: {
    city: "Halsteren",
    objectType: "Woning",
    highlight:
      "Herstel buitenstucwerk + sierpleister 1,5 mm, zinken afdekking en antraciet plint",
  },
  projectUrl:
    "/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/",
  cardAlt:
    "Halsteren buitenstucwerk met sierpleister 1,5 mm – woning binnenplaats en gevel, voor/na (2025)",
} as const
