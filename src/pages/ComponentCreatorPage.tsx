import { useMemo, useState } from 'react'
import { libraries } from '../config/libraries'
import {
  componentCreatorCategories,
  generateComponentScaffold,
  type GeneratedComponentFiles,
} from '../utils/componentScaffold'

type FileTabId = keyof GeneratedComponentFiles

const fileTabs: { id: FileTabId; label: string; fileNameSuffix: string }[] = [
  { id: 'tsx', label: 'TSX', fileNameSuffix: '.tsx' },
  { id: 'css', label: 'CSS', fileNameSuffix: '.css' },
  { id: 'manifest', label: 'Manifest', fileNameSuffix: '.manifest.ts' },
  { id: 'readme', label: 'README', fileNameSuffix: '.README.md' },
  { id: 'index', label: 'Index', fileNameSuffix: '.index.ts' },
]

function downloadTextFile(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function ComponentCreatorPage() {
  const [category, setCategory] = useState(componentCreatorCategories[0])
  const [componentName, setComponentName] = useState('Header05')
  const [description, setDescription] = useState('A new header component.')
  const [libraryId, setLibraryId] = useState(libraries[0]?.id ?? 'core')
  const [activeTab, setActiveTab] = useState<FileTabId>('tsx')
  const [copyStatus, setCopyStatus] = useState<string | null>(null)

  const selectedLibrary = libraries.find((library) => library.id === libraryId) ?? libraries[0]

  const scaffold = useMemo(
    () =>
      generateComponentScaffold({
        category,
        componentName,
        description,
        libraryId: selectedLibrary?.id ?? 'core',
        libraryName: selectedLibrary?.name ?? 'Unknown Library',
      }),
    [category, componentName, description, selectedLibrary],
  )

  const activeFileContent = scaffold.files[activeTab]
  const activeFileTab = fileTabs.find((tab) => tab.id === activeTab)!

  async function handleCopy() {
    await navigator.clipboard.writeText(activeFileContent)
    setCopyStatus(activeFileTab.label)
  }

  function handleDownload() {
    const fileName =
      activeTab === 'manifest'
        ? 'manifest.ts'
        : activeTab === 'readme'
          ? 'README.md'
          : activeTab === 'index'
            ? 'index.ts'
            : `${componentName}${activeFileTab.fileNameSuffix}`

    downloadTextFile(fileName, activeFileContent)
  }

  return (
    <section className="creator-page">
      <div className="creator-page__header">
        <p className="creator-page__eyebrow">Developer → Component Creator</p>
        <h2 className="creator-page__title">Component Creator</h2>
        <p className="creator-page__description">
          Scaffolds a new component following every current ALai convention — manifest, theme,
          design tokens, variants, style controls, and README. Everything stays in memory: no
          files are written and nothing is registered automatically.
        </p>
      </div>

      <div className="creator-page__layout">
        <div className="creator-form">
          <label className="creator-form__field">
            <span className="builder-inspector__label">Category</span>
            <select
              className="builder-inspector__select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {componentCreatorCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="creator-form__field">
            <span className="builder-inspector__label">Component Name</span>
            <input
              className="builder-inspector__input"
              type="text"
              value={componentName}
              onChange={(event) => setComponentName(event.target.value)}
              placeholder="Header05"
            />
          </label>

          <label className="creator-form__field">
            <span className="builder-inspector__label">Description</span>
            <textarea
              className="builder-inspector__textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
            />
          </label>

          <label className="creator-form__field">
            <span className="builder-inspector__label">Library</span>
            <select
              className="builder-inspector__select"
              value={libraryId}
              onChange={(event) => setLibraryId(event.target.value)}
            >
              {libraries.map((library) => (
                <option key={library.id} value={library.id}>
                  {library.name}
                </option>
              ))}
            </select>
          </label>

          {scaffold.errors.length > 0 ? (
            <div className="creator-form__errors">
              {scaffold.errors.map((error) => (
                <p key={error} className="creator-form__error">
                  {error}
                </p>
              ))}
            </div>
          ) : null}

          <div className="creator-form__field">
            <span className="builder-inspector__label">Folder Structure</span>
            <pre className="creator-tree">
              {scaffold.folderTree.length > 0
                ? scaffold.folderTree.join('\n')
                : 'Enter a valid component name to preview the folder structure.'}
            </pre>
          </div>

          {scaffold.isValid ? (
            <div className="creator-form__field">
              <span className="builder-inspector__label">
                Quality Score <span className="creator-quality__score">{scaffold.qualityScore}%</span>
              </span>
              <ul className="creator-quality">
                {scaffold.qualityChecks.map((check) => (
                  <li key={check.id} className="creator-quality__item">
                    {check.passed ? '✓' : '✗'} {check.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="creator-preview">
          <div className="creator-tabs" role="tablist">
            {fileTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`creator-tab${activeTab === tab.id ? ' creator-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="creator-file-actions">
            <button
              className="builder-panel__button"
              type="button"
              onClick={handleCopy}
              disabled={!scaffold.isValid}
            >
              Copy
            </button>
            <button
              className="builder-panel__button"
              type="button"
              onClick={handleDownload}
              disabled={!scaffold.isValid}
            >
              Download
            </button>
            {copyStatus ? (
              <span className="builder-inspector__value builder-inspector__value--muted">
                Copied {copyStatus} to clipboard.
              </span>
            ) : null}
          </div>

          <pre className="creator-file-content">
            {scaffold.isValid ? activeFileContent : 'Fix the errors on the left to generate files.'}
          </pre>
        </div>
      </div>
    </section>
  )
}

export default ComponentCreatorPage
