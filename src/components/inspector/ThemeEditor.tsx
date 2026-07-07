import type { ProjectTheme } from '../../config/theme'

type ThemeEditorProps = {
  theme: ProjectTheme
  onChange: <Key extends keyof ProjectTheme>(key: Key, value: ProjectTheme[Key]) => void
}

/** The fixed set of theme fields every project/playground exposes. */
function ThemeEditor({ theme, onChange }: ThemeEditorProps) {
  return (
    <div className="builder-inspector__props">
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Primary Color</p>
        <input
          className="builder-inspector__input builder-inspector__input--color"
          type="color"
          value={theme.primaryColor}
          onChange={(event) => onChange('primaryColor', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Secondary Color</p>
        <input
          className="builder-inspector__input builder-inspector__input--color"
          type="color"
          value={theme.secondaryColor}
          onChange={(event) => onChange('secondaryColor', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Background Color</p>
        <input
          className="builder-inspector__input builder-inspector__input--color"
          type="color"
          value={theme.backgroundColor}
          onChange={(event) => onChange('backgroundColor', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Surface Color</p>
        <input
          className="builder-inspector__input builder-inspector__input--color"
          type="color"
          value={theme.surfaceColor}
          onChange={(event) => onChange('surfaceColor', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Text Color</p>
        <input
          className="builder-inspector__input builder-inspector__input--color"
          type="color"
          value={theme.textColor}
          onChange={(event) => onChange('textColor', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Muted Color</p>
        <input
          className="builder-inspector__input"
          type="text"
          value={theme.mutedColor}
          onChange={(event) => onChange('mutedColor', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Border Radius</p>
        <input
          className="builder-inspector__input"
          type="text"
          value={theme.borderRadius}
          onChange={(event) => onChange('borderRadius', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Container Width</p>
        <input
          className="builder-inspector__input"
          type="text"
          value={theme.containerWidth}
          onChange={(event) => onChange('containerWidth', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Font Family</p>
        <input
          className="builder-inspector__input"
          type="text"
          value={theme.fontFamily}
          onChange={(event) => onChange('fontFamily', event.target.value)}
        />
      </article>
      <article className="builder-inspector__prop-card">
        <p className="builder-inspector__prop-label">Shadow</p>
        <textarea
          className="builder-inspector__textarea"
          value={theme.shadow}
          onChange={(event) => onChange('shadow', event.target.value)}
          rows={3}
        />
      </article>
    </div>
  )
}

export default ThemeEditor
