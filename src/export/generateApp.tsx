import type { Project } from '../config/project'
import type { VirtualProjectFile } from './types'
import { toComponentName, toPageFileName } from './generatePages'

export function generateApp(project: Project): VirtualProjectFile {
  const imports = project.pages
    .map((page) => {
      const importPath = toPageFileName(page.name).replace(/\.tsx$/, '')
      return `import ${toComponentName(page.name)}Page from './pages/${importPath}'`
    })
    .join('\n')

  const elements = project.pages
    .map((page) => `      <${toComponentName(page.name)}Page />`)
    .join('\n')

  const content = `${imports}\n\nfunction App() {\n  return (\n    <>\n${elements}\n    </>\n  )\n}\n\nexport default App\n`

  return { path: 'src/App.tsx', content }
}
