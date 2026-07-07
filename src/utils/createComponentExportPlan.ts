import { componentRegistry } from '../config/componentRegistry'
import type { Project } from '../config/project'

export type ComponentExportPlanItem = {
  componentId: string
  sourceFolder: string
  destinationFolder: string
  exportFiles: string[]
}

export function createComponentExportPlan(
  project: Project,
): ComponentExportPlanItem[] {
  const usedComponentIds = Array.from(
    new Set(
      project.pages.flatMap((page) =>
        page.sections
          .map((section) => section.componentId)
          .filter((componentId): componentId is string => Boolean(componentId)),
      ),
    ),
  )

  return usedComponentIds
    .map((componentId) => {
      const manifest = componentRegistry.find((item) => item.id === componentId)

      if (!manifest) {
        return null
      }

      return {
        componentId: manifest.id,
        sourceFolder: manifest.sourceFolder,
        destinationFolder: `src/components/${manifest.id}`,
        exportFiles: manifest.exportFiles,
      }
    })
    .filter((item): item is ComponentExportPlanItem => item !== null)
}
