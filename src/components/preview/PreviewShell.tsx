import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../../config/project'
import PreviewFrame from './PreviewFrame'
import ProjectPreviewRenderer from './ProjectPreviewRenderer'

type PreviewViewport = 'desktop' | 'tablet' | 'mobile' | 'full'

const VIEWPORT_WIDTHS: Record<PreviewViewport, string> = {
  desktop: '1440px',
  tablet: '1024px',
  mobile: '390px',
  full: '100%',
}

const VIEWPORT_LABELS: Record<PreviewViewport, string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
  full: 'Full width',
}

const VIEWPORTS: PreviewViewport[] = ['desktop', 'tablet', 'mobile', 'full']

type PreviewShellProps = {
  eyebrow: string
  title: string
  backHref: string
  backLabel: string
  project: Project
}

/**
 * Toolbar (back link + viewport controls) and preview frame, shared by the
 * current-project preview (/preview) and per-template preview
 * (/templates/:id/preview) — the two pages only differ in which Project
 * they pass in and where "back" goes.
 */
function PreviewShell({ eyebrow, title, backHref, backLabel, project }: PreviewShellProps) {
  const [viewport, setViewport] = useState<PreviewViewport>('desktop')

  return (
    <section className="preview-page">
      <div className="preview-page__toolbar">
        <div>
          <p className="preview-page__eyebrow">{eyebrow}</p>
          <h2 className="preview-page__title">{title}</h2>
        </div>

        <div className="preview-page__toolbar-actions">
          <div className="builder-toolbar__group" role="group" aria-label="Preview viewport">
            {VIEWPORTS.map((option) => (
              <button
                key={option}
                className={`builder-toolbar__button${
                  viewport === option ? ' builder-toolbar__button--active' : ''
                }`}
                type="button"
                onClick={() => setViewport(option)}
                aria-pressed={viewport === option}
              >
                {VIEWPORT_LABELS[option]}
              </button>
            ))}
          </div>

          <Link className="builder-panel__button" to={backHref}>
            {backLabel}
          </Link>
        </div>
      </div>

      <div className="preview-page__stage">
        <PreviewFrame title={title} width={VIEWPORT_WIDTHS[viewport]}>
          <ProjectPreviewRenderer project={project} />
        </PreviewFrame>
      </div>
    </section>
  )
}

export default PreviewShell
