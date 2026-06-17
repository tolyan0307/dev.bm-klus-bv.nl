export const IMAGE_EXT = "webp"

const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "hendrik-ido-ambacht-gevelrenovatie-2024"

const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: 11 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Hendrik-Ido-Ambacht gevelrenovatie – voor de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: 16 }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `Hendrik-Ido-Ambacht gevelrenovatie – na de werken foto ${pad(i + 1)} (2024)`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
