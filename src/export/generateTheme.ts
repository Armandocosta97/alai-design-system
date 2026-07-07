import type { Project } from '../config/project'
import { getThemeCssEntries } from '../utils/themeStyle'
import type { VirtualProjectFile } from './types'

function generateThemeTsFile(project: Project): VirtualProjectFile {
  const { theme } = project
  const entries = (Object.entries(theme) as [string, string][])
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
    .join('\n')

  const content = `export type ProjectTheme = {\n  primaryColor: string\n  secondaryColor: string\n  backgroundColor: string\n  surfaceColor: string\n  textColor: string\n  mutedColor: string\n  borderRadius: string\n  containerWidth: string\n  fontFamily: string\n  shadow: string\n}\n\nexport const theme: ProjectTheme = {\n${entries}\n}\n`

  return { path: 'src/config/theme.ts', content }
}

function generateThemeCssFile(project: Project): VirtualProjectFile {
  const entries = getThemeCssEntries(project.theme)
  const body = entries.map(([name, value]) => `  ${name}: ${value};`).join('\n')

  // theme.css is the only global stylesheet in a generated project (see
  // generateMain.tsx). Applying the theme's background/text/font at the
  // page-shell level here — generically, via the same CSS variables every
  // component already reads — means the exported canvas matches the theme
  // instead of showing the browser's default white between/around sections.
  const shell = `html,\nbody,\n#root {\n  min-height: 100%;\n}\n\nbody {\n  margin: 0;\n  background: var(--color-background);\n  color: var(--color-text);\n  font-family: var(--font-family);\n}\n`

  return { path: 'src/styles/theme.css', content: `:root {\n${body}\n}\n\n${shell}` }
}

// Static token defaults/types components may import directly (e.g. Header01's
// sticky z-index). Content is project-independent, mirroring src/config/designTokens.ts.
function generateDesignTokensTsFile(): VirtualProjectFile {
  const content = `export interface ZIndexTokens {
  base: number
  sticky: number
  overlay: number
}

export const staticZIndexTokens: ZIndexTokens = {
  base: 1,
  sticky: 20,
  overlay: 50,
}
`

  return { path: 'src/config/designTokens.ts', content }
}

export function generateTheme(project: Project): VirtualProjectFile[] {
  return [generateThemeTsFile(project), generateThemeCssFile(project), generateDesignTokensTsFile()]
}
