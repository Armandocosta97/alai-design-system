import type { ComponentStyleControlDefinition } from '../../config/componentManifest'

type StyleEditorProps = {
  controls: ComponentStyleControlDefinition[]
  values: Record<string, unknown> | undefined
  onChange: (styleKey: string, value: unknown) => void
}

/** Renders one editable control per manifest style control. Shared by Builder Inspector and Playground. */
function StyleEditor({ controls, values, onChange }: StyleEditorProps) {
  if (controls.length === 0) {
    return null
  }

  return (
    <div className="builder-inspector__props">
      {controls.map((control) => (
        <article key={control.key} className="builder-inspector__prop-card">
          <p className="builder-inspector__prop-label">{control.label}</p>
          <p className="builder-inspector__prop-meta">key: {control.key}</p>
          <p className="builder-inspector__prop-meta">type: {control.type}</p>
          <div className="builder-inspector__prop-control">
            {control.type === 'number' ? (
              <input
                className="builder-inspector__input"
                type="number"
                value={Number(values?.[control.key] ?? control.defaultValue ?? 0)}
                onChange={(event) => onChange(control.key, Number(event.target.value))}
              />
            ) : null}

            {control.type === 'color' ? (
              <input
                className="builder-inspector__input builder-inspector__input--color"
                type="color"
                value={String(values?.[control.key] ?? control.defaultValue ?? '#000000')}
                onChange={(event) => onChange(control.key, event.target.value)}
              />
            ) : null}

            {control.type === 'boolean' ? (
              <label className="builder-inspector__checkbox">
                <input
                  type="checkbox"
                  checked={Boolean(values?.[control.key] ?? control.defaultValue)}
                  onChange={(event) => onChange(control.key, event.target.checked)}
                />
                <span>Enabled</span>
              </label>
            ) : null}

            {control.type === 'select' ? (
              <select
                className="builder-inspector__select"
                value={String(values?.[control.key] ?? control.defaultValue ?? '')}
                onChange={(event) => onChange(control.key, event.target.value)}
              >
                {(control.options ?? []).map((option) => (
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

export default StyleEditor
