import type { ReactNode } from "react"
import { buildSrcSet } from "@/lib/responsive-image"

const heroSrcSet = buildSrcSet("bruinisse-gevelisolatie-6cm-na-04", "/images/projects", "hero")

export default function AfwerkingenLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={heroSrcSet}
        imageSizes="100vw"
      />
      {children}
    </>
  )
}
