import type { ComponentPropDefinition } from '../../config/componentManifest'
import type { ProjectAsset } from '../../config/project'

const supportedPropTypes = new Set(['text', 'textarea', 'image', 'color', 'boolean', 'select'])

type PropsEditorProps = {
  props: ComponentPropDefinition[]
  values: Record<string, unknown>
  assets: ProjectAsset[]
  onChange: (propKey: string, value: unknown) => void
}

/** Renders one editable control per manifest prop. Shared by Builder Inspector and Playground. */
function PropsEditor({ props, values, assets, onChange }: PropsEditorProps) {
  const editableProps = props.filter((prop) => supportedPropTypes.has(prop.type))

  if (editableProps.length === 0) {
    return (
      <p className="builder-inspector__value builder-inspector__value--muted">
        No editable props defined yet.
      </p>
    )
  }

  return (
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
            {prop.type === 'text' ? (
              <input
                className="builder-inspector__input"
                type="text"
                value={String(values[prop.key] ?? '')}
                onChange={(event) => onChange(prop.key, event.target.value)}
              />
            ) : null}

            {prop.type === 'image' ? (
              <select
                className="builder-inspector__select"
                value={String(values[prop.key] ?? '')}
                onChange={(event) => onChange(prop.key, event.target.value)}
              >
                <option value="">No asset selected</option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                ))}
              </select>
            ) : null}

            {prop.type === 'textarea' ? (
              <textarea
                className="builder-inspector__textarea"
                value={String(values[prop.key] ?? '')}
                onChange={(event) => onChange(prop.key, event.target.value)}
                rows={4}
              />
            ) : null}

            {prop.type === 'color' ? (
              <input
                className="builder-inspector__input builder-inspector__input--color"
                type="color"
                value={String(values[prop.key] ?? '#000000')}
                onChange={(event) => onChange(prop.key, event.target.value)}
              />
            ) : null}

            {prop.type === 'boolean' ? (
              <label className="builder-inspector__checkbox">
                <input
                  type="checkbox"
                  checked={Boolean(values[prop.key])}
                  onChange={(event) => onChange(prop.key, event.target.checked)}
                />
                <span>Enabled</span>
              </label>
            ) : null}

            {prop.type === 'select' ? (
              <select
                className="builder-inspector__select"
                value={String(values[prop.key] ?? '')}
                onChange={(event) => onChange(prop.key, event.target.value)}
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
  )
}

export default PropsEditor
