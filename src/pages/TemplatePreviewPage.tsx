import { Link, useParams } from 'react-router-dom'
import PreviewShell from '../components/preview/PreviewShell'
import { templates } from '../config/templates'
import { loadTemplate } from '../utils/loadTemplate'

/**
 * Loads the template read-only via the same `loadTemplate` used by "Use
 * Template" — but never calls `setProject`, so the current Builder project
 * (in ProjectContext) is never touched. Each render produces an independent
 * Project object; there is nothing here that could leak back into the
 * user's in-progress project.
 */
function TemplatePreviewPage() {
  const { templateId } = useParams()
  const template = templates.find((item) => item.id === templateId)

  if (!template) {
    return (
      <section className="preview-page__empty-state">
        <p className="preview-page__eyebrow">Templates</p>
        <h2 className="preview-page__title">Template not found</h2>
        <p className="preview-page__empty-copy">
          &ldquo;{templateId}&rdquo; is not a known template.
        </p>
        <div className="preview-page__empty-actions">
          <Link className="builder-panel__button builder-panel__button--primary" to="/templates">
            Back to Templates
          </Link>
        </div>
      </section>
    )
  }

  const project = loadTemplate(template)

  return (
    <PreviewShell
      eyebrow={`${template.category} · ${template.industry}`}
      title={template.name}
      backHref={`/templates/${template.id}`}
      backLabel="Back to Template"
      project={project}
    />
  )
}

export default TemplatePreviewPage
