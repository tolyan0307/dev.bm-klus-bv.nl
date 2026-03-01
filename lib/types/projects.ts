export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectCard {
  slug: string
  serviceType: string
  serviceTypes: string[]
  title: string
  subtitle: string
  meta: {
    city: string
    objectType: string
    highlight: string
    year?: number
  }
  projectUrl: string
  cardAlt: string
  coverImage: ProjectImage
  beforeThumb?: ProjectImage
}
