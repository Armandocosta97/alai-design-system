import { useState } from 'react'
import type { ComponentManifest } from '../config/componentManifest'
import type { ProjectTheme } from '../config/theme'
import Tag from './Tag'

type BuilderInspectorProps = {
  componentItem: ComponentManifest | null
  sectionProps: Record<string, unknown>
  onPropChange: (propKey: string, value: unknown) => void
  theme: ProjectTheme
  onThemeChange: <Key extends keyof ProjectTheme>(
    key: Key,
    value: ProjectTheme[Key],
  ) => void
  project: unknown
}

const supportedPropTypes = new Set([
  'text',
  'textarea',
  'image',
  'color',
  'boolean',
  'select',
])

function BuilderInspector({
  componentItem,
  sectionProps,
  onPropChange,
  theme,
  onThemeChange,
  project,
}: BuilderInspectorProps) {
  const [isJsonOpen, setIsJsonOpen] = useState(false)
  const editableProps = componentItem?.props.filter((prop) =>
    supportedPropTypes.has(prop.type),
  )
  const projectJson = JSON.stringify(project, null, 2)

  async function handleCopyJson() {
    await navigator.clipboard.writeText(projectJson)
  }

  return (
    <aside className="builder-panel builder-inspector">
      <div className="builder-panel__header">
        <p className="builder-panel__eyebrow">Inspector</p>
        <h2 className="builder-panel__title">Component Details</h2>
      </div>

      {componentItem ? (
        <div className="builder-inspector__content">
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Component Name</p>
            <p className="builder-inspector__value">{componentItem.name}</p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Category</p>
            <p className="builder-inspector__value">{componentItem.category}</p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Tags</p>
            <div className="builder-inspector__tags">
              {componentItem.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Description</p>
            <p className="builder-inspector__value builder-inspector__value--muted">
              {componentItem.description}
            </p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Status</p>
            <p className="builder-inspector__value builder-inspector__value--capitalize">
              {componentItem.status}
            </p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Props</p>
            {editableProps && editableProps.length > 0 ? (
              <div className="builder-inspector__props">
                {editableProps.map((prop) => (
                  <article key={prop.key} className="builder-inspector__prop-card">
                    <p className="builder-inspector__prop-label">{prop.label}</p>
                    <p className="builder-inspector__prop-meta">key: {prop.key}</p>
                    <p className="builder-inspector__prop-meta">type: {prop.type}</p>
                    <p className="builder-inspector__prop-meta">
                      default:{' '}
                      {typeof prop.defaultValue === 'string'
                        ? prop.defaultValue || '""'
                        : JSON.stringify(prop.defaultValue)}
                    </p>
                    <div className="builder-inspector__prop-control">
                      {prop.type === 'text' || prop.type === 'image' ? (
                        <input
                          className="builder-inspector__input"
                          type="text"
                          value={String(sectionProps[prop.key] ?? '')}
                          onChange={(event) =>
                            onPropChange(prop.key, event.target.value)
                          }
                        />
                      ) : null}

                      {prop.type === 'textarea' ? (
                        <textarea
                          className="builder-inspector__textarea"
                          value={String(sectionProps[prop.key] ?? '')}
                          onChange={(event) =>
                            onPropChange(prop.key, event.target.value)
                          }
                          rows={4}
                        />
                      ) : null}

                      {prop.type === 'color' ? (
                        <input
                          className="builder-inspector__input builder-inspector__input--color"
                          type="color"
                          value={String(sectionProps[prop.key] ?? '#000000')}
                          onChange={(event) =>
                            onPropChange(prop.key, event.target.value)
                          }
                        />
                      ) : null}

                      {prop.type === 'boolean' ? (
                        <label className="builder-inspector__checkbox">
                          <input
                            type="checkbox"
                            checked={Boolean(sectionProps[prop.key])}
                            onChange={(event) =>
                              onPropChange(prop.key, event.target.checked)
                            }
                          />
                          <span>Enabled</span>
                        </label>
                      ) : null}

                      {prop.type === 'select' ? (
                        <select
                          className="builder-inspector__select"
                          value={String(sectionProps[prop.key] ?? '')}
                          onChange={(event) =>
                            onPropChange(prop.key, event.target.value)
                          }
                        >
                          {(prop.options ?? []).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="builder-inspector__value builder-inspector__value--muted">
                No editable props defined yet.
              </p>
            )}
          </div>
          <div className="builder-inspector__future">
            <p className="builder-inspector__future-title">Upcoming Controls</p>
            <p className="builder-inspector__future-copy">
              Props, theme, images, typography, spacing, and animations will live here.
            </p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Theme</p>
            <div className="builder-inspector__props">
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Primary Color</p>
                <input
                  className="builder-inspector__input builder-inspector__input--color"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(event) => onThemeChange('primaryColor', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Secondary Color</p>
                <input
                  className="builder-inspector__input builder-inspector__input--color"
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(event) => onThemeChange('secondaryColor', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Background Color</p>
                <input
                  className="builder-inspector__input builder-inspector__input--color"
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(event) => onThemeChange('backgroundColor', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Surface Color</p>
                <input
                  className="builder-inspector__input builder-inspector__input--color"
                  type="color"
                  value={theme.surfaceColor}
                  onChange={(event) => onThemeChange('surfaceColor', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Text Color</p>
                <input
                  className="builder-inspector__input builder-inspector__input--color"
                  type="color"
                  value={theme.textColor}
                  onChange={(event) => onThemeChange('textColor', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Muted Color</p>
                <input
                  className="builder-inspector__input"
                  type="text"
                  value={theme.mutedColor}
                  onChange={(event) => onThemeChange('mutedColor', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Border Radius</p>
                <input
                  className="builder-inspector__input"
                  type="text"
                  value={theme.borderRadius}
                  onChange={(event) => onThemeChange('borderRadius', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Container Width</p>
                <input
                  className="builder-inspector__input"
                  type="text"
                  value={theme.containerWidth}
                  onChange={(event) => onThemeChange('containerWidth', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Font Family</p>
                <input
                  className="builder-inspector__input"
                  type="text"
                  value={theme.fontFamily}
                  onChange={(event) => onThemeChange('fontFamily', event.target.value)}
                />
              </article>
              <article className="builder-inspector__prop-card">
                <p className="builder-inspector__prop-label">Shadow</p>
                <textarea
                  className="builder-inspector__textarea"
                  value={theme.shadow}
                  onChange={(event) => onThemeChange('shadow', event.target.value)}
                  rows={3}
                />
              </article>
            </div>
          </div>
          <div className="builder-inspector__debug">
            <button
              className="builder-inspector__debug-toggle"
              type="button"
              onClick={() => setIsJsonOpen((value) => !value)}
            >
              <span>Project JSON</span>
              <span>{isJsonOpen ? '−' : '+'}</span>
            </button>

            {isJsonOpen ? (
              <div className="builder-inspector__debug-panel">
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={handleCopyJson}
                >
                  Copy JSON
                </button>
                <pre className="builder-inspector__debug-json">{projectJson}</pre>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="builder-inspector__empty">
          <p className="builder-inspector__empty-title">No component selected.</p>
          <p className="builder-inspector__empty-copy">
            Select a component in the composer to inspect its metadata.
          </p>
        </div>
      )}

      {!componentItem ? (
        <div className="builder-inspector__debug builder-inspector__debug--standalone">
          <button
            className="builder-inspector__debug-toggle"
            type="button"
            onClick={() => setIsJsonOpen((value) => !value)}
          >
            <span>Project JSON</span>
            <span>{isJsonOpen ? '−' : '+'}</span>
          </button>

          {isJsonOpen ? (
            <div className="builder-inspector__debug-panel">
              <button
                className="builder-panel__button"
                type="button"
                onClick={handleCopyJson}
              >
                Copy JSON
              </button>
              <pre className="builder-inspector__debug-json">{projectJson}</pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </aside>
  )
}

export default BuilderInspector
