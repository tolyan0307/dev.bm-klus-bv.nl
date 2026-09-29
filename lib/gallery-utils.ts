import { buildSrcSet, getFallbackSrc, resolveImage } from "@/lib/responsive-image"
import type { ProjectCard, ResolvedProjectCard } from "@/lib/types/projects"

const DIR = "/images/projects"

function srcToBaseName(src: string): string {
  return src.replace(/^\/images\/projects\//, "").replace(/\.\w+$/, "")
}

export interface RawGalleryImage {
  src: string
  alt: string
  baseName?: string
}

export interface ResolvedGalleryImage {
  src: string
  srcSet: string
  thumbSrcSet: string
  alt: string
}

export function resolveGalleryImages(
  images: RawGalleryImage[],
): ResolvedGalleryImage[] {
  return images.map((img) => {
    const baseName = img.baseName ?? srcToBaseName(img.src)
    return {
      src: getFallbackSrc(baseName, DIR, "gallery"),
      srcSet: buildSrcSet(baseName, DIR, "gallery"),
      thumbSrcSet: buildSrcSet(baseName, DIR, "thumbnail"),
      alt: img.alt,
    }
  })
}

export function resolveProjectCards(
  projects: ProjectCard[],
): ResolvedProjectCard[] {
  return projects.map((project) => ({
    ...project,
    resolved: {
      cover: resolveImage(srcToBaseName(project.coverImage.src), DIR, "card"),
      beforeThumb: project.beforeThumb
        ? resolveImage(srcToBaseName(project.beforeThumb.src), DIR, "thumbnail")
        : undefined,
    },
  }))
}
