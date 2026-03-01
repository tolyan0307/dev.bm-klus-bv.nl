import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/gevelisolatie/materialen/")

export default function MaterialenLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
