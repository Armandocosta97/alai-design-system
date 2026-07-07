import type { Project } from '../config/project'
import type { VirtualProjectFile } from './types'
import { resolveSectionAssets, sectionNeedsAssets } from './assetUsage'

export function toComponentName(pageName: string): string {
  return pageName
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export function toPageFileName(pageName: string): string {
  return `${toComponentName(pageName)}.tsx`
}

function serializeProps(props: Record<string, unknown>): string {
  const entries = Object.entries(props)

  if (entries.length === 0) {
    return '{}'
  }

  const body = entries
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value, null, 2)}`)
    .join(',\n')

  return `{\n${body}\n}`
}

function generatePageFile(page: Project['pages'][number], project: Project): VirtualProjectFile {
  const populatedSections = page.sections.filter(
    (section): section is typeof section & { componentId: string } => Boolean(section.componentId),
  )

  const usedComponentIds = Array.from(
    new Set(populatedSections.map((section) => section.componentId)),
  )
  const sectionAssets = populatedSections.map((section) =>
    sectionNeedsAssets(section.componentId) ? resolveSectionAssets(project, section.props) : [],
  )
  const needsAssetsImport = sectionAssets.some((assets) => assets.length > 0)

  const importLines = [
    ...usedComponentIds.map(
      (componentId) => `import ${componentId} from '../components/${componentId}/${componentId}'`,
    ),
    ...(populatedSections.length > 0 ? ["import { theme } from '../config/theme'"] : []),
    ...(needsAssetsImport ? ["import { assetsById } from '../assets'"] : []),
  ]

  const sectionElements = populatedSections
    .map((section, index) => {
      const resolvedAssets = sectionAssets[index]
      const exportedProps = {
        ...section.props,
        ...(section.variantId !== undefined ? { variantId: section.variantId } : {}),
        ...(section.style !== undefined ? { style: section.style } : {}),
      }

      const lines = [
        `      <${section.componentId}`,
        `        {...${serializeProps(exportedProps)}}`,
        '        theme={theme}',
      ]

      if (resolvedAssets.length > 0) {
        const assetRefs = resolvedAssets.map((asset) => `assetsById['${asset.id}']`).join(', ')
        lines.push(`        assets={[${assetRefs}]}`)
      }

      lines.push('      />')
      return lines.join('\n')
    })
    .join('\n')

  const componentName = toComponentName(page.name)
  const importBlock = importLines.length > 0 ? `${importLines.join('\n')}\n\n` : ''
  const content = `${importBlock}function ${componentName}Page() {\n  return (\n    <main>\n${sectionElements}\n    </main>\n  )\n}\n\nexport default ${componentName}Page\n`

  return { path: `src/pages/${toPageFileName(page.name)}`, content }
}

export function generatePages(project: Project): VirtualProjectFile[] {
  return project.pages.map((page) => generatePageFile(page, project))
}
