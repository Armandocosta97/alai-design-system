export type ComponentCreatorInput = {
  category: string
  componentName: string
  description: string
  libraryId: string
  libraryName: string
}

export type GeneratedComponentFiles = {
  tsx: string
  css: string
  manifest: string
  readme: string
  index: string
}

export type QualityCheckItem = {
  id: string
  label: string
  passed: boolean
}

export type ComponentScaffoldResult = {
  isValid: boolean
  errors: string[]
  sourceFolder: string
  categoryFolder: string
  folderTree: string[]
  files: GeneratedComponentFiles
  qualityChecks: QualityCheckItem[]
  qualityScore: number
}

const categoryFolderNames: Record<string, string> = {
  Header: 'headers',
  Hero: 'heroes',
  Footer: 'footers',
  Pricing: 'pricing',
  Gallery: 'gallery',
  FAQ: 'faq',
  CTA: 'cta',
  Features: 'features',
  Team: 'team',
  Contact: 'contact',
}

export const componentCreatorCategories = Object.keys(categoryFolderNames)

export function toCategoryFolder(category: string): string {
  return categoryFolderNames[category] ?? `${category.trim().toLowerCase()}s`
}

/** "Header05" -> "Header 05", matching the existing "Header 01" naming convention. */
function toDisplayName(componentName: string): string {
  return componentName.replace(/([a-zA-Z])(\d)/, '$1 $2')
}

function toClassPrefix(componentName: string): string {
  return componentName.charAt(0).toLowerCase() + componentName.slice(1)
}

function isValidComponentName(componentName: string): boolean {
  return /^[A-Z][A-Za-z0-9]*$/.test(componentName)
}

function generateTsxFile(componentName: string, description: string): string {
  const classPrefix = toClassPrefix(componentName)

  return `import type { CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './${componentName}.css'

export type ${componentName}Variant = 'classic'

export type ${componentName}Style = {
  padding?: number
  borderRadius?: boolean
}

export type ${componentName}Props = {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  imageAssetId: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: ${componentName}Style
}

export const ${classPrefix}DefaultProps: ${componentName}Props = {
  title: '${componentName} title',
  description: ${JSON.stringify(description)},
  ctaText: 'Learn More',
  ctaHref: '#',
  imageAssetId: '',
}

export const ${classPrefix}DefaultStyle: Required<${componentName}Style> = {
  padding: 32,
  borderRadius: true,
}

const ${classPrefix}Variants: ${componentName}Variant[] = ['classic']

function resolve${componentName}Variant(variantId?: string): ${componentName}Variant {
  return ${classPrefix}Variants.find((variant) => variant === variantId) ?? 'classic'
}

function ${componentName}({
  title = ${classPrefix}DefaultProps.title,
  description = ${classPrefix}DefaultProps.description,
  ctaText = ${classPrefix}DefaultProps.ctaText,
  ctaHref = ${classPrefix}DefaultProps.ctaHref,
  imageAssetId = ${classPrefix}DefaultProps.imageAssetId,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: ${componentName}Props) {
  const variant = resolve${componentName}Variant(variantId)
  const resolvedStyle = { ...${classPrefix}DefaultStyle, ...style }
  const image = assets.find((asset) => asset.id === imageAssetId)

  const rootStyle: CSSProperties = {
    padding: resolvedStyle.padding,
    borderRadius: resolvedStyle.borderRadius ? undefined : '0',
  }

  return (
    <section className={\`${classPrefix} ${classPrefix}--\${variant}\`} style={rootStyle}>
      <div className="${classPrefix}__content">
        <h2 className="${classPrefix}__title">{title}</h2>
        <p className="${classPrefix}__description">{description}</p>
        <a className="${classPrefix}__cta" href={ctaHref}>
          {ctaText}
        </a>
      </div>

      {image ? (
        <div className="${classPrefix}__media">
          <img className="${classPrefix}__image" src={image.url} alt={image.name} />
        </div>
      ) : null}
    </section>
  )
}

export default ${componentName}
`
}

function generateCssFile(componentName: string): string {
  const classPrefix = toClassPrefix(componentName)

  return `.${classPrefix} {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid color-mix(in srgb, var(--color-text) 8%, transparent);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow);
  font-family: var(--font-family);
}

.${classPrefix}__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 40rem;
}

.${classPrefix}__title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.${classPrefix}__description {
  margin: 0;
  color: var(--color-muted);
}

.${classPrefix}__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border-radius: 999px;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-primary);
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
  transition: background-color var(--transition-base);
}

.${classPrefix}__media {
  overflow: hidden;
  border-radius: var(--radius-md);
}

.${classPrefix}__image {
  display: block;
  width: 100%;
  object-fit: cover;
}

.${classPrefix}--classic {
  /* Default layout — no overrides needed. */
}
`
}

function generateManifestFile(
  componentName: string,
  categoryFolder: string,
  sourceFolder: string,
  description: string,
): string {
  const classPrefix = toClassPrefix(componentName)
  const today = new Date().toISOString().slice(0, 10)

  return `import type { ComponentManifest } from '../../../config/componentManifest'
import ${componentName} from './${componentName}'
import { ${classPrefix}DefaultProps, ${classPrefix}DefaultStyle } from './${componentName}'

const ${componentName}Manifest: ComponentManifest = {
  id: '${componentName}',
  name: '${toDisplayName(componentName)}',
  category: '${categoryFolder}',
  sourceFolder: '${sourceFolder}',
  description: ${JSON.stringify(description)},
  status: 'draft',
  version: '1.0.0',
  tags: [],
  industries: [],
  author: 'ALai Design System',
  createdAt: '${today}',
  updatedAt: '${today}',
  previewImage: '',
  component: ${componentName},
  props: [
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: ${classPrefix}DefaultProps.title,
    },
    {
      key: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: ${classPrefix}DefaultProps.description,
    },
    {
      key: 'ctaText',
      type: 'text',
      label: 'CTA Text',
      defaultValue: ${classPrefix}DefaultProps.ctaText,
    },
    {
      key: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
      defaultValue: ${classPrefix}DefaultProps.ctaHref,
    },
    {
      key: 'imageAssetId',
      type: 'image',
      label: 'Image',
      defaultValue: ${classPrefix}DefaultProps.imageAssetId,
    },
  ],
  exportFiles: ['${componentName}.tsx', '${componentName}.css', 'index.ts'],
  variants: [{ id: 'classic', name: 'Classic', description: 'Default layout.' }],
  styleControls: [
    {
      key: 'padding',
      type: 'number',
      label: 'Padding',
      defaultValue: ${classPrefix}DefaultStyle.padding,
    },
    {
      key: 'borderRadius',
      type: 'boolean',
      label: 'Border Radius',
      defaultValue: ${classPrefix}DefaultStyle.borderRadius,
    },
  ],
}

export default ${componentName}Manifest
`
}

function generateReadmeFile(
  componentName: string,
  categoryFolder: string,
  libraryName: string,
  description: string,
): string {
  return `# ${toDisplayName(componentName)}

${description}

## Category

${categoryFolder}

## Library

${libraryName}

## Variants

- Classic — Default layout.

## Props

- \`title\`
- \`description\`
- \`ctaText\`
- \`ctaHref\`
- \`imageAssetId\`

## Style Controls

- \`padding\`
- \`borderRadius\`
`
}

function generateIndexFile(componentName: string): string {
  const classPrefix = toClassPrefix(componentName)

  return `export { default } from './${componentName}'
export type { ${componentName}Props } from './${componentName}'
export { ${classPrefix}DefaultProps } from './${componentName}'
export { default as ${componentName}Manifest } from './manifest'
`
}

function computeQualityChecks(files: GeneratedComponentFiles): QualityCheckItem[] {
  const hexColorPattern = /#[0-9a-fA-F]{3,8}\b/

  return [
    { id: 'theme', label: 'Theme', passed: files.tsx.includes('theme?: ProjectTheme') },
    {
      id: 'tokens',
      label: 'Tokens',
      passed: files.css.includes('var(--') && !hexColorPattern.test(files.css),
    },
    {
      id: 'manifest',
      label: 'Manifest',
      passed: files.manifest.includes("status: 'draft'") && files.manifest.includes('component:'),
    },
    { id: 'export', label: 'Export', passed: files.manifest.includes('exportFiles:') },
    {
      id: 'playground',
      label: 'Playground',
      passed: files.manifest.includes('props:') && files.manifest.includes('component:'),
    },
    { id: 'readme', label: 'README', passed: files.readme.trim().length > 0 },
    { id: 'variants', label: 'Variants', passed: files.manifest.includes('variants:') },
    {
      id: 'styleControls',
      label: 'Style Controls',
      passed: files.manifest.includes('styleControls:'),
    },
    {
      id: 'responsive',
      label: 'Responsive',
      passed: files.tsx.includes(`Props = {`) && !files.tsx.includes('useEffect'),
    },
  ]
}

export function generateComponentScaffold(input: ComponentCreatorInput): ComponentScaffoldResult {
  const componentName = input.componentName.trim()
  const description = input.description.trim() || `${componentName} component.`
  const categoryFolder = toCategoryFolder(input.category)
  const sourceFolder = `src/library/${categoryFolder}/${componentName}`

  const errors: string[] = []
  if (!componentName) {
    errors.push('Component name is required.')
  } else if (!isValidComponentName(componentName)) {
    errors.push('Component name must be PascalCase, e.g. "Header05".')
  }

  const emptyFiles: GeneratedComponentFiles = { tsx: '', css: '', manifest: '', readme: '', index: '' }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      sourceFolder,
      categoryFolder,
      folderTree: [],
      files: emptyFiles,
      qualityChecks: computeQualityChecks(emptyFiles),
      qualityScore: 0,
    }
  }

  const files: GeneratedComponentFiles = {
    tsx: generateTsxFile(componentName, description),
    css: generateCssFile(componentName),
    manifest: generateManifestFile(componentName, categoryFolder, sourceFolder, description),
    readme: generateReadmeFile(componentName, categoryFolder, input.libraryName, description),
    index: generateIndexFile(componentName),
  }

  const folderTree = [
    'src/',
    ' library/',
    `  ${categoryFolder}/`,
    `   ${componentName}/`,
    `      ${componentName}.tsx`,
    `      ${componentName}.css`,
    '      manifest.ts',
    '      README.md',
    '      index.ts',
  ]

  const qualityChecks = computeQualityChecks(files)
  const qualityScore = Math.round(
    (qualityChecks.filter((check) => check.passed).length / qualityChecks.length) * 100,
  )

  return {
    isValid: true,
    errors: [],
    sourceFolder,
    categoryFolder,
    folderTree,
    files,
    qualityChecks,
    qualityScore,
  }
}
