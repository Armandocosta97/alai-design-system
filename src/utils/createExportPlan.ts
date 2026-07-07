import type { Project } from '../config/project'
import type { ProjectTheme } from '../config/theme'

export type ExportPlan = {
  projectName: string
  pages: string[]
  components: string[]
  assets: { id: string; name: string }[]
  theme: ProjectTheme
  folderStructure: string[]
}

export function createExportPlan(project: Project): ExportPlan {
  const componentIds = new Set<string>()
  const assetIds = new Set<string>()

  project.pages.forEach((page) => {
    page.sections.forEach((section) => {
      if (section.componentId) {
        componentIds.add(section.componentId)
      }

      Object.values(section.props).forEach((value) => {
        if (typeof value !== 'string' || !value) {
          return
        }

        const asset = project.assets.find((item) => item.id === value)
        if (asset) {
          assetIds.add(asset.id)
        }
      })
    })
  })

  const usedAssets = project.assets.filter((asset) => assetIds.has(asset.id))
  const componentFolders = Array.from(componentIds).map(
    (componentId) => `    components/${componentId}/`,
  )
  const assetFolders = usedAssets.map((asset) => `    assets/${asset.name}`)
  const pageFiles = project.pages.map((page) => `    pages/${page.name}.tsx`)

  return {
    projectName: project.name,
    pages: project.pages.map((page) => page.name),
    components: Array.from(componentIds),
    assets: usedAssets.map((asset) => ({ id: asset.id, name: asset.name })),
    theme: project.theme,
    folderStructure: [
      'client-project/',
      '  src/',
      '    pages/',
      ...pageFiles,
      '    components/',
      ...componentFolders,
      '    assets/',
      ...assetFolders,
      '    config/',
      '      site.ts',
      '      theme.ts',
    ],
  }
}
