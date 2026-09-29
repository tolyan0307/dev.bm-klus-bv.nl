"use client"

import ClientImage from "@/components/client-image"

// Above-the-fold image of ResponsiveImage (priority). It is a client component on
// purpose: for every non-lazy <img> of a Server Component React puts a preload hint
// into the route's RSC payload, Next ships that payload with <Link> prefetches, and
// every visible link then downloaded the hero of its target page. Rendered here, the
// <img> and its <head> preload stay in this page's HTML only.
export default function PriorityImage(
  props: Omit<React.ComponentProps<typeof ClientImage>, "priority">,
) {
  return <ClientImage {...props} priority />
}
