// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")

export const beforeImages = Array.from({ length: 5 }, (_, i) => ({
  src: `/images/projects/rotterdam-buitenstucwerk-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Rotterdam buitenstucwerk cementpleister – voor de werken foto ${pad(i + 1)} (2025)`,
}))

export const afterImages = Array.from({ length: 7 }, (_, i) => ({
  src: `/images/projects/rotterdam-buitenstucwerk-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Rotterdam buitenstucwerk cementpleister – na de werken foto ${pad(i + 1)} (2025)`,
}))
