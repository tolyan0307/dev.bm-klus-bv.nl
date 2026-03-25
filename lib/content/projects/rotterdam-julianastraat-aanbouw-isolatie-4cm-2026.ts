export const IMAGE_EXT = "webp"

const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "rotterdam-julianastraat-aanbouw-isolatie-4cm-2026"

const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 10 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Rotterdam Julianastraat aanbouw isolatie 4 cm – voor de werken foto ${pad(i + 1)} (2026)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 6 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Rotterdam Julianastraat aanbouw isolatie 4 cm – na de werken foto ${pad(i + 1)} (2026)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
