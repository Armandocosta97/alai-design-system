import type { Project } from '../config/project'
import { createComponentExportPlan } from '../utils/createComponentExportPlan'
import { getLibrarySource } from '../utils/librarySources'
import type { VirtualProjectFile } from './types'

function getComponentFileContent(sourceFolder: string, fileName: string): string {
  const sourceContent = getLibrarySource(sourceFolder, fileName)

  if (!sourceContent) {
    throw new Error(`Export source not found for /${sourceFolder}/${fileName}`)
  }

  if (fileName === 'index.ts') {
    return sourceContent
      .split('\n')
      .filter((line) => !line.includes('./manifest') && !line.includes('Manifest'))
      .join('\n')
      .trimEnd()
      .concat('\n')
  }

  return sourceContent
    .replaceAll("'../../../config/theme'", "'../../config/theme'")
    .replaceAll("'../../../config/project'", "'../../config/project'")
    .replaceAll("'../../../config/designTokens'", "'../../config/designTokens'")
}

export function generateComponents(project: Project): VirtualProjectFile[] {
  const plan = createComponentExportPlan(project)

  return plan.flatMap((item) =>
    item.exportFiles.map((fileName) => ({
      path: `${item.destinationFolder}/${fileName}`,
      content: getComponentFileContent(item.sourceFolder, fileName),
    })),
  )
}
