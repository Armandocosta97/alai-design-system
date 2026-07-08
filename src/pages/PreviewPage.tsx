import { Link } from 'react-router-dom'
import { useProject } from '../app/ProjectContext'
import PreviewShell from '../components/preview/PreviewShell'

function PreviewPage() {
  const { project } = useProject()
  const hasContent = project.pages.some((page) =>
    page.sections.some((section) => section.componentId),
  )

  if (!hasContent) {
    return (
      <section className="preview-page__empty-state">
        <p className="preview-page__eyebrow">Preview</p>
        <h2 className="preview-page__title">Nothing to preview yet</h2>
        <p className="preview-page__empty-copy">
          Add a component to your project in the Builder, or start from a template, then come
          back here for an interactive preview.
        </p>
        <div className="preview-page__empty-actions">
          <Link className="builder-panel__button builder-panel__button--primary" to="/builder">
            Go to Builder
          </Link>
          <Link className="builder-panel__button" to="/templates">
            Browse Templates
          </Link>
        </div>
      </section>
    )
  }

  return (
    <PreviewShell
      eyebrow="Preview"
      title={project.name}
      backHref="/builder"
      backLabel="Back to Builder"
      project={project}
    />
  )
}

export default PreviewPage
