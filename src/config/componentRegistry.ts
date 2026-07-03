import type { ComponentManifest } from './componentManifest'
import Footer01Manifest from '../library/footers/Footer01/manifest'
import Header01Manifest from '../library/headers/Header01/manifest'
import Hero01Manifest from '../library/heroes/Hero01/manifest'

export type DesignSystemComponent = ComponentManifest

export const componentRegistry: DesignSystemComponent[] = [
  Header01Manifest,
  Hero01Manifest,
  Footer01Manifest,
]
