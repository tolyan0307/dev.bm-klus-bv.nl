import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"

const DIR = "/images/projects"

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
    const baseName =
      img.baseName ??
      img.src.replace(/^\/images\/projects\//, "").replace(/\.\w+$/, "")
    return {
      src: getFallbackSrc(baseName, DIR, "gallery"),
      srcSet: buildSrcSet(baseName, DIR, "gallery"),
      thumbSrcSet: buildSrcSet(baseName, DIR, "thumbnail"),
      alt: img.alt,
    }
  })
}
