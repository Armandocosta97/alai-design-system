import JSZip from 'jszip'
import { useState } from 'react'
import type { ComponentManifest } from '../config/componentManifest'
import { libraries } from '../config/libraries'
import type { BuilderSection, Project, ProjectAsset } from '../config/project'
import { BREAKPOINTS, BREAKPOINT_LABELS, type Breakpoint } from '../config/responsive'
import type { ProjectTheme } from '../config/theme'
import { isVisible } from '../utils/responsiveVisibility'
import { createExportPlan, type ExportPlan } from '../utils/createExportPlan'
import {
  createComponentExportPlan,
  type ComponentExportPlanItem,
} from '../utils/createComponentExportPlan'
import {
  createProjectSlug,
  generateExport,
  type VirtualProjectFile,
} from '../export/ExportEngine'
import PropsEditor from './inspector/PropsEditor'
import StyleEditor from './inspector/StyleEditor'
import ThemeEditor from './inspector/ThemeEditor'
import VariantSelect from './inspector/VariantSelect'
import Tag from './Tag'

type BuilderInspectorProps = {
  componentItem: ComponentManifest | null
  sectionProps: Record<string, unknown>
  onPropChange: (propKey: string, value: unknown) => void
  theme: ProjectTheme
  assets: ProjectAsset[]
  onThemeChange: <Key extends keyof ProjectTheme>(
    key: Key,
    value: ProjectTheme[Key],
  ) => void
  project: Project
  activeBreakpoint: Breakpoint
  sectionVisibility: BuilderSection['visibility']
  onToggleVisibility: (breakpoint: Breakpoint) => void
  sectionVariantId: BuilderSection['variantId']
  onVariantChange: (variantId: string) => void
  sectionStyle: BuilderSection['style']
  onStyleChange: (styleKey: string, value: unknown) => void
}

function BuilderInspector({
  componentItem,
  sectionProps,
  onPropChange,
  theme,
  assets,
  onThemeChange,
  project,
  activeBreakpoint,
  sectionVisibility,
  onToggleVisibility,
  sectionVariantId,
  onVariantChange,
  sectionStyle,
  onStyleChange,
}: BuilderInspectorProps) {
  const [isJsonOpen, setIsJsonOpen] = useState(false)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilesOpen, setIsFilesOpen] = useState(false)
  const [isComponentExportPlanOpen, setIsComponentExportPlanOpen] = useState(false)
  const [exportPlan, setExportPlan] = useState<ExportPlan | null>(null)
  const [componentExportPlan, setComponentExportPlan] = useState<
    ComponentExportPlanItem[]
  >([])
  const [generatedFiles, setGeneratedFiles] = useState<VirtualProjectFile[]>([])
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const projectJson = JSON.stringify(project, null, 2)

  async function handleCopyJson() {
    await navigator.clipboard.writeText(projectJson)
  }

  function handleGenerateExportPlan() {
    setExportPlan(createExportPlan(project))
  }

  function handleGenerateFilesPreview() {
    const files = generateExport(project)
    setGeneratedFiles(files)
    setComponentExportPlan(createComponentExportPlan(project))
    setSelectedFilePath(files[0]?.path ?? null)
  }

  async function handleDownloadZip() {
    const files = generateExport(project)
    const zip = new JSZip()

    files.forEach((file) => {
      zip.file(file.path, file.content)
    })

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const downloadUrl = URL.createObjectURL(zipBlob)
    const link = document.createElement('a')

    link.href = downloadUrl
    link.download = `${createProjectSlug(project.name)}.zip`
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(downloadUrl)
  }

  const selectedFile =
    generatedFiles.find((file) => file.path === selectedFilePath) ?? null

  return (
    <aside className="builder-panel builder-inspector">
      <div className="builder-panel__header">
        <p className="builder-panel__eyebrow">Inspector</p>
        <h2 className="builder-panel__title">Component Details</h2>
      </div>

      {componentItem ? (
        <div className="builder-inspector__content">
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Component Name</p>
            <p className="builder-inspector__value">{componentItem.name}</p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Category</p>
            <p className="builder-inspector__value">{componentItem.category}</p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Library</p>
            <p className="builder-inspector__value">
              {libraries.find((library) => library.id === componentItem.libraryId)?.name ??
                'Unknown Library'}
            </p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Tags</p>
            <div className="builder-inspector__tags">
              {componentItem.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Description</p>
            <p className="builder-inspector__value builder-inspector__value--muted">
              {componentItem.description}
            </p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Status</p>
            <p className="builder-inspector__value builder-inspector__value--capitalize">
              {componentItem.status}
            </p>
          </div>
          {componentItem.variants && componentItem.variants.length > 0 ? (
            <div className="builder-inspector__group">
              <p className="builder-inspector__label">Variant</p>
              <VariantSelect
                variants={componentItem.variants}
                value={sectionVariantId}
                onChange={onVariantChange}
              />
            </div>
          ) : null}
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">
              Props <span className="builder-inspector__value--muted">— editing {BREAKPOINT_LABELS[activeBreakpoint]}</span>
            </p>
            <PropsEditor
              props={componentItem.props}
              values={sectionProps}
              assets={assets}
              onChange={onPropChange}
            />
          </div>
          {componentItem.styleControls && componentItem.styleControls.length > 0 ? (
            <div className="builder-inspector__group">
              <p className="builder-inspector__label">Style</p>
              <StyleEditor
                controls={componentItem.styleControls}
                values={sectionStyle}
                onChange={onStyleChange}
              />
            </div>
          ) : null}
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Visibility</p>
            <div className="builder-inspector__props">
              <article className="builder-inspector__prop-card">
                {BREAKPOINTS.map((breakpoint) => (
                  <label key={breakpoint} className="builder-inspector__checkbox">
                    <input
                      type="checkbox"
                      checked={isVisible({ visibility: sectionVisibility }, breakpoint)}
                      onChange={() => onToggleVisibility(breakpoint)}
                    />
                    <span>{BREAKPOINT_LABELS[breakpoint]}</span>
                  </label>
                ))}
              </article>
            </div>
          </div>
          <div className="builder-inspector__future">
            <p className="builder-inspector__future-title">Upcoming Controls</p>
            <p className="builder-inspector__future-copy">
              Props, theme, images, typography, spacing, and animations will live here.
            </p>
          </div>
          <div className="builder-inspector__group">
            <p className="builder-inspector__label">Theme</p>
            <ThemeEditor theme={theme} onChange={onThemeChange} />
          </div>
          <div className="builder-inspector__debug">
            <button
              className="builder-inspector__debug-toggle"
              type="button"
              onClick={() => setIsJsonOpen((value) => !value)}
            >
              <span>Project JSON</span>
              <span>{isJsonOpen ? '−' : '+'}</span>
            </button>

            {isJsonOpen ? (
              <div className="builder-inspector__debug-panel">
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={handleCopyJson}
                >
                  Copy JSON
                </button>
                <pre className="builder-inspector__debug-json">{projectJson}</pre>
              </div>
            ) : null}
          </div>
          <div className="builder-inspector__debug">
            <button
              className="builder-inspector__debug-toggle"
              type="button"
              onClick={() => setIsExportOpen((value) => !value)}
            >
              <span>Export</span>
              <span>{isExportOpen ? '−' : '+'}</span>
            </button>

            {isExportOpen ? (
              <div className="builder-inspector__debug-panel">
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={handleGenerateExportPlan}
                >
                  Generate Export Plan
                </button>

                {exportPlan ? (
                  <div className="builder-inspector__export">
                    <div className="builder-inspector__group">
                      <p className="builder-inspector__label">Project Name</p>
                      <p className="builder-inspector__value">{exportPlan.projectName}</p>
                    </div>
                    <div className="builder-inspector__group">
                      <p className="builder-inspector__label">Pages</p>
                      <div className="builder-inspector__list">
                        {exportPlan.pages.map((page) => (
                          <p key={page} className="builder-inspector__list-item">
                            {page}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="builder-inspector__group">
                      <p className="builder-inspector__label">Components Used</p>
                      <div className="builder-inspector__list">
                        {exportPlan.components.map((componentId) => (
                          <p key={componentId} className="builder-inspector__list-item">
                            {componentId}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="builder-inspector__group">
                      <p className="builder-inspector__label">Assets Used</p>
                      <div className="builder-inspector__list">
                        {exportPlan.assets.length > 0 ? (
                          exportPlan.assets.map((asset) => (
                            <p key={asset.id} className="builder-inspector__list-item">
                              {asset.name}
                            </p>
                          ))
                        ) : (
                          <p className="builder-inspector__list-item">No assets referenced yet.</p>
                        )}
                      </div>
                    </div>
                    <div className="builder-inspector__group">
                      <p className="builder-inspector__label">Estimated Folder Structure</p>
                      <pre className="builder-inspector__debug-json">
                        {exportPlan.folderStructure.join('\n')}
                      </pre>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="builder-inspector__debug">
            <button
              className="builder-inspector__debug-toggle"
              type="button"
              onClick={() => setIsFilesOpen((value) => !value)}
            >
              <span>Generated Files Preview</span>
              <span>{isFilesOpen ? '−' : '+'}</span>
            </button>

            {isFilesOpen ? (
              <div className="builder-inspector__debug-panel">
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={handleGenerateFilesPreview}
                >
                  Generate Files Preview
                </button>
                <button
                  className="builder-panel__button"
                  type="button"
                  onClick={handleDownloadZip}
                >
                  Download ZIP
                </button>

                {generatedFiles.length > 0 ? (
                  <div className="builder-inspector__files">
                    <div className="builder-inspector__debug-subsection">
                      <button
                        className="builder-inspector__debug-toggle"
                        type="button"
                        onClick={() =>
                          setIsComponentExportPlanOpen((value) => !value)
                        }
                      >
                        <span>Component Export Plan</span>
                        <span>{isComponentExportPlanOpen ? '−' : '+'}</span>
                      </button>

                      {isComponentExportPlanOpen ? (
                        <div className="builder-inspector__debug-panel">
                          {componentExportPlan.map((item) => (
                            <div key={item.componentId} className="builder-inspector__group">
                              <p className="builder-inspector__prop-label">
                                {item.componentId}
                              </p>
                              <p className="builder-inspector__label">Source</p>
                              <p className="builder-inspector__list-item">
                                {item.sourceFolder}
                              </p>
                              <p className="builder-inspector__label">Destination</p>
                              <p className="builder-inspector__list-item">
                                {item.destinationFolder}
                              </p>
                              <p className="builder-inspector__label">Files</p>
                              <div className="builder-inspector__list">
                                {item.exportFiles.map((fileName) => (
                                  <p
                                    key={fileName}
                                    className="builder-inspector__list-item"
                                  >
                                    ✓ {fileName}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="builder-inspector__file-list">
                      {generatedFiles.map((file) => (
                        <button
                          key={file.path}
                          className={`builder-inspector__file-button${
                            selectedFilePath === file.path
                              ? ' builder-inspector__file-button--active'
                              : ''
                          }`}
                          type="button"
                          onClick={() => setSelectedFilePath(file.path)}
                        >
                          {file.path}
                        </button>
                      ))}
                    </div>
                    {selectedFile ? (
                      <pre className="builder-inspector__debug-json">
                        {selectedFile.content}
                      </pre>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="builder-inspector__empty">
          <p className="builder-inspector__empty-title">No component selected.</p>
          <p className="builder-inspector__empty-copy">
            Select a component in the composer to inspect its metadata.
          </p>
        </div>
      )}

      {!componentItem ? (
        <div className="builder-inspector__debug builder-inspector__debug--standalone">
          <button
            className="builder-inspector__debug-toggle"
            type="button"
            onClick={() => setIsJsonOpen((value) => !value)}
          >
            <span>Project JSON</span>
            <span>{isJsonOpen ? '−' : '+'}</span>
          </button>

          {isJsonOpen ? (
            <div className="builder-inspector__debug-panel">
              <button
                className="builder-panel__button"
                type="button"
                onClick={handleCopyJson}
              >
                Copy JSON
              </button>
              <pre className="builder-inspector__debug-json">{projectJson}</pre>
            </div>
          ) : null}
        </div>
      ) : null}

      {!componentItem ? (
        <div className="builder-inspector__debug builder-inspector__debug--standalone">
          <button
            className="builder-inspector__debug-toggle"
            type="button"
            onClick={() => setIsExportOpen((value) => !value)}
          >
            <span>Export</span>
            <span>{isExportOpen ? '−' : '+'}</span>
          </button>

          {isExportOpen ? (
            <div className="builder-inspector__debug-panel">
              <button
                className="builder-panel__button"
                type="button"
                onClick={handleGenerateExportPlan}
              >
                Generate Export Plan
              </button>

              {exportPlan ? (
                <pre className="builder-inspector__debug-json">
                  {JSON.stringify(exportPlan, null, 2)}
                </pre>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {!componentItem ? (
        <div className="builder-inspector__debug builder-inspector__debug--standalone">
          <button
            className="builder-inspector__debug-toggle"
            type="button"
            onClick={() => setIsFilesOpen((value) => !value)}
          >
            <span>Generated Files Preview</span>
            <span>{isFilesOpen ? '−' : '+'}</span>
          </button>

          {isFilesOpen ? (
            <div className="builder-inspector__debug-panel">
              <button
                className="builder-panel__button"
                type="button"
                onClick={handleGenerateFilesPreview}
              >
                Generate Files Preview
              </button>
              <button
                className="builder-panel__button"
                type="button"
                onClick={handleDownloadZip}
              >
                Download ZIP
              </button>

              {generatedFiles.length > 0 ? (
                <div className="builder-inspector__files">
                  <div className="builder-inspector__debug-subsection">
                    <button
                      className="builder-inspector__debug-toggle"
                      type="button"
                      onClick={() =>
                        setIsComponentExportPlanOpen((value) => !value)
                      }
                    >
                      <span>Component Export Plan</span>
                      <span>{isComponentExportPlanOpen ? '−' : '+'}</span>
                    </button>

                    {isComponentExportPlanOpen ? (
                      <div className="builder-inspector__debug-panel">
                        {componentExportPlan.map((item) => (
                          <div key={item.componentId} className="builder-inspector__group">
                            <p className="builder-inspector__prop-label">
                              {item.componentId}
                            </p>
                            <p className="builder-inspector__label">Source</p>
                            <p className="builder-inspector__list-item">
                              {item.sourceFolder}
                            </p>
                            <p className="builder-inspector__label">Destination</p>
                            <p className="builder-inspector__list-item">
                              {item.destinationFolder}
                            </p>
                            <p className="builder-inspector__label">Files</p>
                            <div className="builder-inspector__list">
                              {item.exportFiles.map((fileName) => (
                                <p
                                  key={fileName}
                                  className="builder-inspector__list-item"
                                >
                                  ✓ {fileName}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="builder-inspector__file-list">
                    {generatedFiles.map((file) => (
                      <button
                        key={file.path}
                        className={`builder-inspector__file-button${
                          selectedFilePath === file.path
                            ? ' builder-inspector__file-button--active'
                            : ''
                        }`}
                        type="button"
                        onClick={() => setSelectedFilePath(file.path)}
                      >
                        {file.path}
                      </button>
                    ))}
                  </div>
                  {selectedFile ? (
                    <pre className="builder-inspector__debug-json">
                      {selectedFile.content}
                    </pre>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </aside>
  )
}

export default BuilderInspector
