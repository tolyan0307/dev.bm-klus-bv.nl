import type { ResolvedImage } from "@/lib/types/images"

export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectCard {
  slug: string
  serviceType: string
  serviceTypes: string[]
  title: string
  subtitle: string
  meta: {
    city: string
    objectType: string
    highlight: string
    year?: number
    yearDisplay?: string
  }
  projectUrl: string
  cardAlt: string
  coverImage: ProjectImage
  beforeThumb?: ProjectImage
}

/** ProjectCard with card images resolved on the server (resolveProjectCards in lib/gallery-utils.ts). */
export interface ResolvedProjectCard extends ProjectCard {
  resolved: {
    cover: ResolvedImage
    beforeThumb?: ResolvedImage
  }
}
