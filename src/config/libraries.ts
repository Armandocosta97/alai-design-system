import type { ComponentManifest } from './componentManifest'
import Contact01Manifest from '../library/contact/Contact01/manifest'
import CTA01Manifest from '../library/cta/CTA01/manifest'
import FAQ01Manifest from '../library/faq/FAQ01/manifest'
import Features01Manifest from '../library/features/Features01/manifest'
import Footer01Manifest from '../library/footers/Footer01/manifest'
import Gallery01Manifest from '../library/gallery/Gallery01/manifest'
import Header01Manifest from '../library/headers/Header01/manifest'
import Hero01Manifest from '../library/heroes/Hero01/manifest'
import Hero02Manifest from '../library/heroes/Hero02/manifest'
import LogoCloud01Manifest from '../library/logocloud/LogoCloud01/manifest'
import Process01Manifest from '../library/process/Process01/manifest'
import Services01Manifest from '../library/services/Services01/manifest'
import Stats01Manifest from '../library/stats/Stats01/manifest'
import Team01Manifest from '../library/team/Team01/manifest'
import Testimonials01Manifest from '../library/testimonials/Testimonials01/manifest'

export interface ComponentLibrary {
  id: string
  name: string
  description: string
  version: string
  author: string
  manifests: ComponentManifest[]
}

export const coreLibrary: ComponentLibrary = {
  id: 'core',
  name: 'ALai Core',
  description: 'The built-in ALai Design System component library.',
  version: '1.0.0',
  author: 'ALai Design System',
  manifests: [
    Header01Manifest,
    Hero01Manifest,
    Hero02Manifest,
    LogoCloud01Manifest,
    Footer01Manifest,
    Features01Manifest,
    Stats01Manifest,
    Gallery01Manifest,
    Team01Manifest,
    Process01Manifest,
    CTA01Manifest,
    Testimonials01Manifest,
    Services01Manifest,
    Contact01Manifest,
    FAQ01Manifest,
  ],
}

// Future plugin libraries register themselves here. Nothing dynamic yet —
// this milestone is only the architecture for multiple component libraries.
export const libraries: ComponentLibrary[] = [coreLibrary]
