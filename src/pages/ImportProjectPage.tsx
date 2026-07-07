import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../app/ProjectContext'
import { importProject } from '../utils/importProject'

type ParsedInput =
  | { ok: true; value: unknown }
  | { ok: false; error: string }
  | { ok: false; error: null }

function parseInput(rawText: string): ParsedInput {
  if (!rawText.trim()) {
    return { ok: false, error: null }
  }

  try {
    return { ok: true, value: JSON.parse(rawText) }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Invalid JSON.' }
  }
}

function ImportProjectPage() {
  const { setProject } = useProject()
  const navigate = useNavigate()
  const [rawText, setRawText] = useState('')

  const parsed = useMemo(() => parseInput(rawText), [rawText])
  const importResult = parsed.ok ? importProject(parsed.value) : null
  const parseError = !parsed.ok ? parsed.error : null

  function handleImport() {
    if (!importResult || !importResult.report.valid) {
      return
    }

    setProject(importResult.project)
    navigate('/builder')
  }

  return (
    <section className="import-page">
      <div className="import-page__header">
        <p className="import-page__eyebrow">AI Project Import</p>
        <h2 className="import-page__title">Import Project</h2>
        <p className="import-page__description">
          Paste a complete Project JSON object generated externally. Missing or unknown values are
          repaired automatically using the same defaults the Builder already relies on.
        </p>
      </div>

      <textarea
        className="import-page__textarea"
        value={rawText}
        onChange={(event) => setRawText(event.target.value)}
        placeholder='{"id": "...", "name": "...", "theme": {...}, "assets": [...], "pages": [...]}'
        rows={16}
        spellCheck={false}
      />

      {parseError ? <p className="import-report__parse-error">Invalid JSON: {parseError}</p> : null}

      {importResult ? (
        <div className="import-report">
          <p
            className={`import-report__status${
              importResult.report.valid
                ? ' import-report__status--valid'
                : ' import-report__status--invalid'
            }`}
          >
            {importResult.report.valid ? 'Valid' : 'Invalid'}
          </p>

          {importResult.report.errors.length > 0 ? (
            <div className="import-report__section">
              <p className="import-report__label">Errors</p>
              <ul className="import-report__list">
                {importResult.report.errors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {importResult.report.warnings.length > 0 ? (
            <div className="import-report__section">
              <p className="import-report__label">Warnings</p>
              <ul className="import-report__list">
                {importResult.report.warnings.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {importResult.report.unknownComponents.length > 0 ? (
            <div className="import-report__section">
              <p className="import-report__label">Unknown Components</p>
              <ul className="import-report__list">
                {importResult.report.unknownComponents.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {importResult.report.unknownProps.length > 0 ? (
            <div className="import-report__section">
              <p className="import-report__label">Unknown Props</p>
              <ul className="import-report__list">
                {importResult.report.unknownProps.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {importResult.report.unknownVariants.length > 0 ? (
            <div className="import-report__section">
              <p className="import-report__label">Unknown Variants</p>
              <ul className="import-report__list">
                {importResult.report.unknownVariants.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <button
        className="builder-panel__button"
        type="button"
        onClick={handleImport}
        disabled={!importResult || !importResult.report.valid}
      >
        Import Project
      </button>
    </section>
  )
}

export default ImportProjectPage
