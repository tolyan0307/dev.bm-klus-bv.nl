import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/contact/")

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
