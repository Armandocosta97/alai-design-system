import { createElement, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropsEditor from '../components/inspector/PropsEditor'
import StyleEditor from '../components/inspector/StyleEditor'
import ThemeEditor from '../components/inspector/ThemeEditor'
import VariantSelect from '../components/inspector/VariantSelect'
import { componentRegistry } from '../config/componentRegistry'
import { libraries } from '../config/libraries'
import type { ProjectAsset } from '../config/project'
import { defaultProjectTheme, type ProjectTheme } from '../config/theme'
import { getLibrarySource } from '../utils/librarySources'
import { toThemeStyle } from '../utils/themeStyle'

const placeholderAssetTemplates = [
  { name: 'Logo.svg', type: 'image/svg+xml', url: '/assets/logo.svg', size: 18432 },
  { name: 'Hero.jpg', type: 'image/jpeg', url: '/assets/hero.jpg', size: 482331 },
]

function getDefaultProps(props: { key: string; defaultValue: unknown }[]) {
  return props.reduce<Record<string, unknown>>((defaults, prop) => {
    defaults[prop.key] = prop.defaultValue
    return defaults
  }, {})
}

function getDefaultStyle(styleControls: { key: string; defaultValue: unknown }[]) {
  return styleControls.reduce<Record<string, unknown>>((defaults, control) => {
    defaults[control.key] = control.defaultValue
    return defaults
  }, {})
}

function serializePropValue(value: unknown): string {
  if (typeof value === 'string') {
    return JSON.stringify(value)
  }
  return `{${JSON.stringify(value)}}`
}

function buildJsxSnippet(
  componentId: string,
  props: Record<string, unknown>,
  variantId: string | undefined,
  style: Record<string, unknown>,
) {
  const lines = Object.entries(props).map(([key, value]) => `  ${key}=${serializePropValue(value)}`)
  if (variantId) {
    lines.push(`  variantId="${variantId}"`)
  }
  if (Object.keys(style).length > 0) {
    lines.push(`  style={${JSON.stringify(style, null, 2).split('\n').join('\n  ')}}`)
  }

  return `<${componentId}\n${lines.join('\n')}\n/>`
}

function PlaygroundPage() {
  const { componentId } = useParams()
  const manifest = useMemo(
    () => componentRegistry.find((item) => item.id === componentId) ?? null,
    [componentId],
  )

  const [props, setProps] = useState<Record<string, unknown>>(() =>
    manifest ? getDefaultProps(manifest.props) : {},
  )
  const [variantId, setVariantId] = useState<string | undefined>(() => manifest?.variants?.[0]?.id)
  const [style, setStyle] = useState<Record<string, unknown>>(() =>
    manifest ? getDefaultStyle(manifest.styleControls ?? []) : {},
  )
  const [theme, setTheme] = useState<ProjectTheme>(defaultProjectTheme)
  const [assets, setAssets] = useState<ProjectAsset[]>([])
  const [isReadmeOpen, setIsReadmeOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState<string | null>(null)

  if (!manifest) {
    return (
      <section className="playground-page">
        <div className="playground-page__not-found">
          <p className="playground-page__eyebrow">Playground</p>
          <h2 className="playground-page__title">Component not found</h2>
          <p className="playground-page__description">
            &ldquo;{componentId}&rdquo; is not registered in any installed library.
          </p>
          <Link className="builder-panel__button" to="/builder">
            Back to Builder
          </Link>
        </div>
      </section>
    )
  }

  function handlePropChange(key: string, value: unknown) {
    setProps((current) => ({ ...current, [key]: value }))
  }

  function handleStyleChange(key: string, value: unknown) {
    setStyle((current) => ({ ...current, [key]: value }))
  }

  function handleThemeChange<Key extends keyof ProjectTheme>(key: Key, value: ProjectTheme[Key]) {
    setTheme((current) => ({ ...current, [key]: value }))
  }

  function handleAddPlaceholderAsset() {
    const createdAt = new Date().toISOString()
    setAssets((current) => [
      ...current,
      ...placeholderAssetTemplates.map((asset) => ({
        ...asset,
        id: `asset-${crypto.randomUUID()}`,
        createdAt,
      })),
    ])
  }

  async function copyToClipboard(text: string, label: string) {
    await navigator.clipboard.writeText(text)
    setCopyStatus(label)
  }

  const readmeContent = getLibrarySource(manifest.sourceFolder, 'README.md')
  const libraryName = libraries.find((library) => library.id === manifest.libraryId)?.name

  return (
    <section className="playground-page">
      <div className="playground-page__header">
        <p className="playground-page__eyebrow">Playground</p>
        <h2 className="playground-page__title">{manifest.name}</h2>
        <p className="playground-page__description">
          {manifest.id} · {libraryName ?? 'Unknown Library'} · Local-only state, no Builder or
          Project involved.
        </p>
      </div>

      <div className="playground-page__layout">
        <div className="playground-page__stage" style={toThemeStyle(theme)}>
          {manifest.component
            ? createElement(manifest.component, { ...props, theme, assets, variantId, style })
            : 'No Preview'}
        </div>

        <aside className="builder-panel builder-inspector playground-page__panel">
          <div className="builder-panel__header">
            <p className="builder-panel__eyebrow">Editors</p>
            <h2 className="builder-panel__title">{manifest.name}</h2>
          </div>

          <div className="builder-inspector__content">
            {manifest.variants && manifest.variants.length > 0 ? (
              <div className="builder-inspector__group">
                <p className="builder-inspector__label">Variant</p>
                <VariantSelect variants={manifest.variants} value={variantId} onChange={setVariantId} />
              </div>
            ) : null}

            <div className="builder-inspector__group">
              <p className="builder-inspector__label">Props</p>
              <PropsEditor
                props={manifest.props}
                values={props}
                assets={assets}
                onChange={handlePropChange}
              />
            </div>

            {manifest.styleControls && manifest.styleControls.length > 0 ? (
              <div className="builder-inspector__group">
                <p className="builder-inspector__label">Style</p>
                <StyleEditor
                  controls={manifest.styleControls}
                  values={style}
                  onChange={handleStyleChange}
                />
              </div>
            ) : null}

            <div className="builder-inspector__group">
              <p className="builder-inspector__label">Theme</p>
              <ThemeEditor theme={theme} onChange={handleThemeChange} />
            </div>

            <div className="builder-inspector__group">
              <p className="builder-inspector__label">Assets</p>
              <button className="builder-panel__button" type="button" onClick={handleAddPlaceholderAsset}>
                Add Placeholder Asset
              </button>
              <div className="builder-inspector__list">
                {assets.length === 0 ? (
                  <p className="builder-inspector__value builder-inspector__value--muted">
                    No local assets yet.
                  </p>
                ) : (
                  assets.map((asset) => (
                    <p key={asset.id} className="builder-inspector__list-item">
                      {asset.name}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div className="builder-inspector__group">
              <p className="builder-inspector__label">Developer Utilities</p>
              <div className="playground-page__dev-buttons">
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={() =>
                    copyToClipboard(buildJsxSnippet(manifest.id, props, variantId, style), 'JSX')
                  }
                >
                  Copy JSX
                </button>
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={() =>
                    copyToClipboard(JSON.stringify({ ...manifest, component: undefined }, null, 2), 'Manifest JSON')
                  }
                >
                  Copy Manifest JSON
                </button>
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={() => copyToClipboard(manifest.sourceFolder, 'Source Folder Path')}
                >
                  Open Source Folder
                </button>
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={() => setIsReadmeOpen((value) => !value)}
                >
                  README
                </button>
              </div>
              {copyStatus ? (
                <p className="builder-inspector__value builder-inspector__value--muted">
                  Copied {copyStatus} to clipboard.
                </p>
              ) : null}
              {isReadmeOpen ? (
                <pre className="builder-inspector__debug-json">
                  {readmeContent ?? 'No README found for this component.'}
                </pre>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default PlaygroundPage
