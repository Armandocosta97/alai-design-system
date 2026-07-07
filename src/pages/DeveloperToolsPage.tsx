import { Link } from 'react-router-dom'
import { libraries } from '../config/libraries'

const intakeChecklist = [
  'Choose category',
  'Choose component ID',
  'Create component folder',
  'Create TSX file',
  'Create CSS file',
  'Create manifest.ts',
  'Create README.md',
  'Create index.ts',
  'Add exportFiles',
  'Register manifest in componentRegistry',
  'Verify in category page',
  'Verify in Builder',
  'Verify props in Inspector',
  'Verify ZIP export',
  'Verify exported project build',
]

const namingExamples = ['Header01, Header02...', 'Hero01, Hero02...', 'Services01...', 'CTA01...', 'Footer01...']

function DeveloperToolsPage() {
  return (
    <section className="dev-tools-page">
      <div className="dev-tools-page__header">
        <p className="dev-tools-page__eyebrow">Developer Tools</p>
        <h2 className="dev-tools-page__title">Component Intake Checklist</h2>
        <p className="dev-tools-page__description">
          A repeatable checklist for bringing new components, inspired by external websites, into
          ALai Studio cleanly and consistently.
        </p>
      </div>

      <ol className="intake-checklist">
        {intakeChecklist.map((step, index) => (
          <li key={step} className="intake-checklist__item">
            <span className="intake-checklist__index">{index + 1}</span>
            <span className="intake-checklist__label">{step}</span>
          </li>
        ))}
      </ol>

      <div className="naming-rules-box">
        <p className="naming-rules-box__title">Component naming rules</p>
        <ul className="naming-rules-box__list">
          {namingExamples.map((example) => (
            <li key={example} className="naming-rules-box__item">
              {example}
            </li>
          ))}
        </ul>
      </div>

      <div className="dev-tools-page__header">
        <h2 className="dev-tools-page__title">Plugin Manager</h2>
        <p className="dev-tools-page__description">
          Installed component libraries. Install/remove is not implemented yet — this milestone
          only lists what is currently registered.
        </p>
      </div>

      <div className="plugin-list">
        {libraries.map((library) => (
          <article key={library.id} className="plugin-card">
            <p className="plugin-card__title">✓ {library.name}</p>
            <p className="plugin-card__description">{library.description}</p>
            <dl className="plugin-card__meta">
              <div className="plugin-card__meta-row">
                <dt>Version</dt>
                <dd>{library.version}</dd>
              </div>
              <div className="plugin-card__meta-row">
                <dt>Author</dt>
                <dd>{library.author}</dd>
              </div>
              <div className="plugin-card__meta-row">
                <dt>Components</dt>
                <dd>{library.manifests.length}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="dev-tools-page__header">
        <h2 className="dev-tools-page__title">Component Creator</h2>
        <p className="dev-tools-page__description">
          Scaffold a new component that follows every current ALai convention —
          in memory, nothing written to disk and nothing auto-registered.
        </p>
        <Link className="builder-panel__button" to="/component-creator">
          Open Component Creator
        </Link>
      </div>
    </section>
  )
}

export default DeveloperToolsPage
