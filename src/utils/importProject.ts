import { componentRegistry } from '../config/componentRegistry'
import {
  createSection,
  type BuilderSection,
  type Project,
  type ProjectAsset,
  type ProjectPage,
} from '../config/project'
import { defaultProjectTheme, type ProjectTheme } from '../config/theme'

export type ImportValidationReport = {
  valid: boolean
  errors: string[]
  warnings: string[]
  unknownComponents: string[]
  unknownProps: string[]
  unknownVariants: string[]
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function generateId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`
}

function pushUnique(list: string[], value: string) {
  if (!list.includes(value)) {
    list.push(value)
  }
}

const themeKeys = Object.keys(defaultProjectTheme) as (keyof ProjectTheme)[]

/**
 * Inspects a raw, untrusted value against the existing Project/manifest
 * architecture and reports what is missing, unknown, or malformed — without
 * mutating anything. Only structurally unrecoverable input (not an object,
 * no pages) is a hard error; everything else is auto-repaired by
 * normalizeProject and surfaced here as a warning instead.
 */
export function validateProject(input: unknown): ImportValidationReport {
  const report: ImportValidationReport = {
    valid: true,
    errors: [],
    warnings: [],
    unknownComponents: [],
    unknownProps: [],
    unknownVariants: [],
  }

  if (!isPlainObject(input)) {
    report.valid = false
    report.errors.push('Project must be a JSON object.')
    return report
  }

  if (!Array.isArray(input.pages) || input.pages.length === 0) {
    report.valid = false
    report.errors.push('Project must include a non-empty "pages" array.')
    return report
  }

  if (typeof input.id !== 'string' || !input.id) {
    report.warnings.push('Missing project id — one will be generated.')
  }
  if (typeof input.name !== 'string' || !input.name) {
    report.warnings.push('Missing project name — a default will be used.')
  }
  if (!isPlainObject(input.theme)) {
    report.warnings.push('Missing theme — the default theme will be used.')
  }
  if (!Array.isArray(input.assets)) {
    report.warnings.push('Missing assets — starting with no assets.')
  }

  input.pages.forEach((page, pageIndex) => {
    if (!isPlainObject(page)) {
      report.warnings.push(`Page at index ${pageIndex} is not an object — replaced with an empty page.`)
      return
    }

    if (typeof page.id !== 'string' || !page.id) {
      report.warnings.push(`Page "${pageIndex}" is missing an id — one will be generated.`)
    }

    const sections = Array.isArray(page.sections) ? page.sections : []

    sections.forEach((section, sectionIndex) => {
      if (!isPlainObject(section)) {
        report.warnings.push(
          `Section ${sectionIndex} on page ${pageIndex} is not an object — replaced with an empty section.`,
        )
        return
      }

      if (typeof section.id !== 'string' || !section.id) {
        report.warnings.push(`Section ${sectionIndex} on page ${pageIndex} is missing an id — one will be generated.`)
      }

      const componentId = typeof section.componentId === 'string' ? section.componentId : null
      if (!componentId) {
        return
      }

      const manifest = componentRegistry.find((item) => item.id === componentId)
      if (!manifest) {
        pushUnique(report.unknownComponents, componentId)
        return
      }

      const rawProps = isPlainObject(section.props) ? section.props : {}
      Object.keys(rawProps).forEach((key) => {
        if (!manifest.props.some((propDef) => propDef.key === key)) {
          pushUnique(report.unknownProps, `${manifest.id}.${key}`)
        }
      })

      if (manifest.variants && manifest.variants.length > 0 && typeof section.variantId === 'string') {
        const isKnownVariant = manifest.variants.some((variant) => variant.id === section.variantId)
        if (!isKnownVariant) {
          pushUnique(report.unknownVariants, `${manifest.id}.${section.variantId}`)
        }
      }
    })
  })

  return report
}

function normalizeTheme(value: unknown): ProjectTheme {
  if (!isPlainObject(value)) {
    return { ...defaultProjectTheme }
  }

  return themeKeys.reduce<ProjectTheme>(
    (theme, key) => {
      const rawValue = value[key]
      theme[key] = typeof rawValue === 'string' ? rawValue : defaultProjectTheme[key]
      return theme
    },
    { ...defaultProjectTheme },
  )
}

function normalizeAsset(value: unknown): ProjectAsset | null {
  if (!isPlainObject(value)) {
    return null
  }

  return {
    id: typeof value.id === 'string' && value.id ? value.id : generateId('asset'),
    name: typeof value.name === 'string' ? value.name : 'Untitled asset',
    type: typeof value.type === 'string' ? value.type : 'image/png',
    url: typeof value.url === 'string' ? value.url : '',
    size: typeof value.size === 'number' ? value.size : 0,
    createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString(),
  }
}

function normalizeSection(value: unknown): BuilderSection {
  if (!isPlainObject(value)) {
    return createSection()
  }

  const id = typeof value.id === 'string' && value.id ? value.id : generateId('section')
  const rawComponentId = typeof value.componentId === 'string' ? value.componentId : null
  const manifest = rawComponentId ? componentRegistry.find((item) => item.id === rawComponentId) : null

  if (!manifest) {
    return { id, componentId: null, props: {} }
  }

  const rawProps = isPlainObject(value.props) ? value.props : {}
  const props: Record<string, unknown> = {}
  manifest.props.forEach((propDef) => {
    props[propDef.key] = propDef.key in rawProps ? rawProps[propDef.key] : propDef.defaultValue
  })

  const section: BuilderSection = { id, componentId: manifest.id, props }

  if (manifest.variants && manifest.variants.length > 0) {
    const rawVariantId = typeof value.variantId === 'string' ? value.variantId : undefined
    const matchedVariant = manifest.variants.find((variant) => variant.id === rawVariantId)
    section.variantId = matchedVariant?.id ?? manifest.variants[0].id
  }

  if (manifest.styleControls && manifest.styleControls.length > 0) {
    const rawStyle = isPlainObject(value.style) ? value.style : {}
    const style: Record<string, unknown> = {}
    manifest.styleControls.forEach((control) => {
      style[control.key] = control.key in rawStyle ? rawStyle[control.key] : control.defaultValue
    })
    section.style = style
  }

  if (isPlainObject(value.visibility)) {
    section.visibility = value.visibility as BuilderSection['visibility']
  }

  if (isPlainObject(value.responsiveOverrides)) {
    section.responsiveOverrides = value.responsiveOverrides as BuilderSection['responsiveOverrides']
  }

  return section
}

function normalizePage(value: unknown): ProjectPage {
  if (!isPlainObject(value)) {
    return { id: generateId('page'), name: 'Untitled Page', sections: [createSection()] }
  }

  const id = typeof value.id === 'string' && value.id ? value.id : generateId('page')
  const name = typeof value.name === 'string' && value.name ? value.name : 'Untitled Page'
  const rawSections = Array.isArray(value.sections) ? value.sections : []
  const sections = rawSections.length > 0 ? rawSections.map(normalizeSection) : [createSection()]

  return { id, name, sections }
}

/**
 * Repairs a raw, untrusted value into a fully valid Project, using the same
 * defaults the rest of the app already relies on (manifest default props,
 * first manifest variant, manifest style defaults, default theme, generated
 * ids). Components not present in componentRegistry become empty sections
 * rather than being dropped, so page structure and ordering are preserved.
 */
export function normalizeProject(input: unknown): Project {
  if (!isPlainObject(input)) {
    return {
      id: generateId('project'),
      name: 'Imported Project',
      theme: { ...defaultProjectTheme },
      assets: [],
      pages: [{ id: generateId('page'), name: 'Home', sections: [createSection()] }],
    }
  }

  const rawAssets = Array.isArray(input.assets) ? input.assets : []
  const assets = rawAssets.map(normalizeAsset).filter((asset): asset is ProjectAsset => asset !== null)

  const rawPages = Array.isArray(input.pages) ? input.pages : []
  const pages =
    rawPages.length > 0
      ? rawPages.map(normalizePage)
      : [{ id: generateId('page'), name: 'Home', sections: [createSection()] }]

  return {
    id: typeof input.id === 'string' && input.id ? input.id : generateId('project'),
    name: typeof input.name === 'string' && input.name ? input.name : 'Imported Project',
    theme: normalizeTheme(input.theme),
    assets,
    pages,
  }
}

export type ImportResult = {
  project: Project
  report: ImportValidationReport
}

export function importProject(input: unknown): ImportResult {
  return {
    report: validateProject(input),
    project: normalizeProject(input),
  }
}
