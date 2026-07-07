import type { ComponentManifest } from './componentManifest'
import { libraries } from './libraries'

export type DesignSystemComponent = ComponentManifest

export { libraries }

export const componentRegistry: DesignSystemComponent[] = libraries.flatMap((library) =>
  library.manifests.map((manifest) =>
    manifest.libraryId ? manifest : { ...manifest, libraryId: library.id },
  ),
)
