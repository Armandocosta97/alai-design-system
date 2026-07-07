import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../app/ProjectContext'
import { templates, type Template } from '../config/templates'
import { loadTemplate } from '../utils/loadTemplate'

/**
 * Renders the template's thumbnailPath image when one is set, falling back
 * to the original gradient placeholder if thumbnailPath is empty or the
 * image fails to load (e.g. a missing file). thumbnailPath is presentational
 * metadata only — see config/templates/index.ts.
 */
function TemplateThumbnail({ template }: { template: Template }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(template.thumbnailPath) && !imageFailed

  if (!showImage) {
    return <div className="template-card__thumbnail" aria-hidden="true" />
  }

  return (
    <img
      className="template-card__thumbnail template-card__thumbnail--image"
      src={template.thumbnailPath}
      alt=""
      aria-hidden="true"
      onError={() => setImageFailed(true)}
    />
  )
}

function TemplatesPage() {
  const { setProject } = useProject()
  const navigate = useNavigate()

  function handleUseTemplate(template: Template) {
    setProject(loadTemplate(template))
    navigate('/builder')
  }

  return (
    <section className="templates-page">
      <div className="templates-page__header">
        <p className="templates-page__eyebrow">Starter Projects</p>
        <h2 className="templates-page__title">Templates</h2>
        <p className="templates-page__description">
          Instantly generate a complete starter website with theme, pages, variants, and styles
          already applied. Using a template replaces the current project. The template itself is
          never modified — you're always editing an independent copy.
        </p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <article key={template.id} className="template-card">
            <TemplateThumbnail template={template} />
            <p className="template-card__meta">
              {template.category} · {template.industry}
            </p>
            <h3 className="template-card__title">{template.name}</h3>
            <p className="template-card__description">{template.description}</p>
            <ul className="template-card__tags">
              {template.tags.map((tag) => (
                <li key={tag} className="template-card__tag">
                  {tag}
                </li>
              ))}
            </ul>
            <button
              className="builder-panel__button"
              type="button"
              onClick={() => handleUseTemplate(template)}
            >
              Use Template
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TemplatesPage
