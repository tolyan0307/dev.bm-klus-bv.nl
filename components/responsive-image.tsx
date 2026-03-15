import {
  buildSrcSet,
  getFallbackSrc,
  getOriginalDimensions,
  type ImagePreset,
} from "@/lib/responsive-image"

interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  baseName: string
  dir?: string
  preset: ImagePreset
  alt: string
  sizes: string
  priority?: boolean
  fallbackSrc?: string
}

export default function ResponsiveImage({
  baseName,
  dir = "/images",
  preset,
  alt,
  sizes,
  priority = false,
  fallbackSrc,
  width,
  height,
  className,
  ...rest
}: ResponsiveImageProps) {
  const srcSet = buildSrcSet(baseName, dir, preset)
  const src = fallbackSrc ?? getFallbackSrc(baseName, dir, preset)

  let w = width
  let h = height
  if (!w || !h) {
    const dims = getOriginalDimensions(baseName, dir)
    if (dims) {
      w = w ?? dims.width
      h = h ?? dims.height
    }
  }

  return (
    <img
      src={src}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={className}
      {...rest}
    />
  )
}
