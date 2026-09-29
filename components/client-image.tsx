import type { ResolvedImage } from "@/lib/types/images"

// <img> with the same markup as ResponsiveImage, but for "use client" components:
// src/srcSet come in as props (resolveImage in the server parent), so the image
// manifest stays out of the client bundle.
interface ClientImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> {
  image: ResolvedImage
  alt: string
  sizes: string
  priority?: boolean
}

export default function ClientImage({
  image,
  alt,
  sizes,
  priority = false,
  className,
  ...rest
}: ClientImageProps) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet || undefined}
      sizes={sizes}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={className}
      {...rest}
    />
  )
}
