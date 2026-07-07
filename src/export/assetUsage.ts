import { componentRegistry } from '../config/componentRegistry'
import type { Project, ProjectAsset } from '../config/project'

export function sectionNeedsAssets(componentId: string): boolean {
  const manifest = componentRegistry.find((item) => item.id === componentId)
  return manifest?.props.some((prop) => prop.type === 'image') ?? false
}

export function resolveSectionAssets(
  project: Project,
  sectionProps: Record<string, unknown>,
): ProjectAsset[] {
  const referencedIds = new Set(
    Object.values(sectionProps).filter(
      (value): value is string => typeof value === 'string' && value.length > 0,
    ),
  )

  return project.assets.filter((asset) => referencedIds.has(asset.id))
}

export function getAllUsedAssets(project: Project): ProjectAsset[] {
  const usedIds = new Set<string>()

  project.pages.forEach((page) => {
    page.sections.forEach((section) => {
      if (!section.componentId || !sectionNeedsAssets(section.componentId)) {
        return
      }

      resolveSectionAssets(project, section.props).forEach((asset) => usedIds.add(asset.id))
    })
  })

  return project.assets.filter((asset) => usedIds.has(asset.id))
}
