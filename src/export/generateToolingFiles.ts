import type { VirtualProjectFile } from './types'

function generateViteConfig(): VirtualProjectFile {
  const content =
    "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})\n"

  return { path: 'vite.config.ts', content }
}

function generateTsconfig(): VirtualProjectFile {
  const content = JSON.stringify(
    {
      files: [],
      references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
    },
    null,
    2,
  ).concat('\n')

  return { path: 'tsconfig.json', content }
}

function generateTsconfigApp(): VirtualProjectFile {
  const content = JSON.stringify(
    {
      compilerOptions: {
        target: 'es2023',
        lib: ['ES2023', 'DOM'],
        module: 'esnext',
        types: ['vite/client'],
        allowArbitraryExtensions: true,
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        verbatimModuleSyntax: true,
        moduleDetection: 'force',
        noEmit: true,
        jsx: 'react-jsx',
        noUnusedLocals: true,
        noUnusedParameters: true,
        erasableSyntaxOnly: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
    },
    null,
    2,
  ).concat('\n')

  return { path: 'tsconfig.app.json', content }
}

function generateTsconfigNode(): VirtualProjectFile {
  const content = JSON.stringify(
    {
      compilerOptions: {
        target: 'es2023',
        lib: ['ES2023'],
        skipLibCheck: true,
        module: 'nodenext',
        allowImportingTsExtensions: true,
        verbatimModuleSyntax: true,
        moduleDetection: 'force',
        noEmit: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        erasableSyntaxOnly: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['vite.config.ts'],
    },
    null,
    2,
  ).concat('\n')

  return { path: 'tsconfig.node.json', content }
}

function generateGitignore(): VirtualProjectFile {
  return { path: '.gitignore', content: 'node_modules\ndist\n.DS_Store\n' }
}

export function generateToolingFiles(): VirtualProjectFile[] {
  return [generateViteConfig(), generateTsconfig(), generateTsconfigApp(), generateTsconfigNode(), generateGitignore()]
}
