import type { VirtualProjectFile } from './types'

export function generateMain(): VirtualProjectFile {
  const content =
    "import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport App from './App'\nimport './styles/theme.css'\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n)\n"

  return { path: 'src/main.tsx', content }
}
