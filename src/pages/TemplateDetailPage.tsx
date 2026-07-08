import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProject } from '../app/ProjectContext'
import { componentRegistry } from '../config/componentRegistry'
import { templates, type Template } from '../config/templates'
import { loadTemplate } from '../utils/loadTemplate'

/**
 * Same fallback behavior as TemplatesPage's card thumbnail (thumbnailPath is
 * presentational metadata only — see config/templates/index.ts) — just
 * rendered larger for the detail view.
 */
function TemplateDetailThumbnail({ template }: { template: Template }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(template.thumbnailPath) && !imageFailed

  if (!showImage) {
    return <div className="template-detail-page__thumbnail" aria-hidden="true" />
  }

  return (
    <img
      className="template-detail-page__thumbnail template-detail-page__thumbnail--image"
      src={template.thumbnailPath}
      alt=""
      aria-hidden="true"
      onError={() => setImageFailed(true)}
    />
  )
}

function getSectionLabel(componentId: string | null): string {
  if (!componentId) {
    return 'Empty section'
  }

  const manifest = componentRegistry.find((item) => item.id === componentId)
  return manifest?.name ?? componentId
}

function TemplateDetailPage() {
  const { templateId } = useParams()
  const { setProject } = useProject()
  const navigate = useNavigate()

  const template = templates.find((item) => item.id === templateId)

  if (!template) {
    return (
      <section className="template-detail-page">
        <div className="template-detail-page__not-found">
          <p className="template-detail-page__eyebrow">Templates</p>
          <h2 className="template-detail-page__title">Template not found</h2>
          <p className="template-detail-page__description">
            &ldquo;{templateId}&rdquo; is not a known template.
          </p>
          <Link className="builder-panel__button" to="/templates">
            Back to Templates
          </Link>
        </div>
      </section>
    )
  }

  const handleUseTemplate = () => {
    setProject(loadTemplate(template))
    navigate('/builder')
  }

  const sections = template.project.pages[0]?.sections ?? []
  const useCase = `Best suited for ${template.industry.toLowerCase()} businesses working in the ${template.category.toLowerCase()} category.`

  return (
    <section className="template-detail-page">
      <Link className="template-detail-page__back" to="/templates">
        ← Back to Templates
      </Link>

      <div className="template-detail-page__layout">
        <TemplateDetailThumbnail template={template} />

        <div className="template-detail-page__content">
          <p className="template-detail-page__eyebrow">
            {template.category} · {template.industry}
          </p>
          <h2 className="template-detail-page__title">{template.name}</h2>
          <p className="template-detail-page__description">{template.description}</p>
          <p className="template-detail-page__use-case">{useCase}</p>

          <ul className="template-card__tags">
            {template.tags.map((tag) => (
              <li key={tag} className="template-card__tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="template-detail-page__actions">
            <button
              className="builder-panel__button builder-panel__button--primary"
              type="button"
              onClick={handleUseTemplate}
            >
              Use Template
            </button>
          </div>

          <div className="template-detail-page__sections">
            <p className="template-detail-page__sections-label">Sections included ({sections.length})</p>
            <ol className="template-detail-page__section-list">
              {sections.map((section) => (
                <li key={section.id} className="template-detail-page__section-item">
                  {getSectionLabel(section.componentId)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TemplateDetailPage
