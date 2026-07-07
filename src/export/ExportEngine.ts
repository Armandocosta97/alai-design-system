import type { Project } from '../config/project'
import { generateApp } from './generateApp'
import { generateAssets } from './generateAssets'
import { generateComponents } from './generateComponents'
import { generateIndexHtml } from './generateIndexHtml'
import { generateMain } from './generateMain'
import { generatePackageJson } from './generatePackageJson'
import { generatePages } from './generatePages'
import { generateTheme } from './generateTheme'
import { generateToolingFiles } from './generateToolingFiles'
import type { VirtualProjectFile } from './types'

export type { VirtualProjectFile } from './types'
export { createProjectSlug } from './generatePackageJson'

export function generateExport(project: Project): VirtualProjectFile[] {
  return [
    generatePackageJson(project),
    generateIndexHtml(project),
    ...generateToolingFiles(),
    generateMain(),
    generateApp(project),
    ...generateTheme(project),
    ...generateAssets(project),
    ...generateComponents(project),
    ...generatePages(project),
  ]
}
