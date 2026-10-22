// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "etten-leur-bankenstraat-stucwerk-sierpleister-2024"
const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 5 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur Bankenstraat buitenstucwerk en sierpleister – voor de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 11 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Etten-Leur Bankenstraat buitenstucwerk en sierpleister – na de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
