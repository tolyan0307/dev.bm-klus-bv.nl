/** Image attributes resolved from the manifest on the server (resolveImage in lib/responsive-image.ts). */
export interface ResolvedImage {
  src: string
  srcSet: string
  width?: number | string
  height?: number | string
}
