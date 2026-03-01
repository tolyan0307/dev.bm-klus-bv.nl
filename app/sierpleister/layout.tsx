import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/sierpleister/", {
  image: "/images/og-sierpleister.jpg",
})

export default function SierpleisterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
