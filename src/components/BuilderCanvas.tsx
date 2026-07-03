import { createElement, useMemo, useState } from 'react'
import type { ComponentManifest } from '../config/componentManifest'
import type { ProjectTheme } from '../config/theme'

type BuilderCanvasProps = {
  pageName: string
  sections: { id: string; componentId: string | null; props: Record<string, unknown> }[]
  componentsById: Record<string, ComponentManifest>
  componentsByCategory: Record<string, ComponentManifest[]>
  theme: ProjectTheme
  selectedSectionId: string | null
  onSelectSection: (sectionId: string) => void
  onMoveSectionUp: (sectionId: string) => void
  onMoveSectionDown: (sectionId: string) => void
  onDuplicateSection: (sectionId: string) => void
  onRemoveSection: (sectionId: string) => void
  onInsertComponent: (index: number, componentId: string) => void
}

function BuilderCanvas({
  pageName,
  sections,
  componentsById,
  componentsByCategory,
  theme,
  selectedSectionId,
  onSelectSection,
  onMoveSectionUp,
  onMoveSectionDown,
  onDuplicateSection,
  onRemoveSection,
  onInsertComponent,
}: BuilderCanvasProps) {
  const [openInsertIndex, setOpenInsertIndex] = useState<number | null>(null)
  const [openSectionMenuId, setOpenSectionMenuId] = useState<string | null>(null)
  const availableComponents = useMemo(
    () => Object.entries(componentsByCategory),
    [componentsByCategory],
  )

  function handleInsert(componentId: string) {
    if (openInsertIndex === null) {
      return
    }

    onInsertComponent(openInsertIndex, componentId)
    setOpenInsertIndex(null)
  }

  return (
    <section className="builder-panel builder-canvas">
      <div className="builder-panel__header">
        <p className="builder-panel__eyebrow">Composer</p>
        <h2 className="builder-panel__title">{pageName}</h2>
      </div>

      <div className="builder-canvas__flow">
        {sections.map((section, index) => {
          const componentItem = section.componentId
            ? componentsById[section.componentId] ?? null
            : null

          return (
            <div key={section.id} className="builder-canvas__node">
              <article
                className={`builder-composer-section${
                  selectedSectionId === section.id
                    ? ' builder-composer-section--selected'
                    : ''
                }`}
                onClick={() => onSelectSection(section.id)}
              >
                <div className="builder-composer-section__chrome">
                  <button
                    className="builder-composer-section__menu-trigger"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setOpenSectionMenuId((currentValue) =>
                        currentValue === section.id ? null : section.id,
                      )
                    }}
                  >
                    •••
                  </button>

                  {openSectionMenuId === section.id ? (
                    <div
                      className="builder-composer-section__menu"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        className="builder-composer-section__menu-item"
                        type="button"
                        onClick={() => {
                          onMoveSectionUp(section.id)
                          setOpenSectionMenuId(null)
                        }}
                        disabled={index === 0}
                      >
                        Move Up
                      </button>
                      <button
                        className="builder-composer-section__menu-item"
                        type="button"
                        onClick={() => {
                          onMoveSectionDown(section.id)
                          setOpenSectionMenuId(null)
                        }}
                        disabled={index === sections.length - 1}
                      >
                        Move Down
                      </button>
                      <button
                        className="builder-composer-section__menu-item"
                        type="button"
                        onClick={() => {
                          onSelectSection(section.id)
                          setOpenSectionMenuId(null)
                        }}
                      >
                        Configure
                      </button>
                      <button
                        className="builder-composer-section__menu-item"
                        type="button"
                        onClick={() => {
                          onDuplicateSection(section.id)
                          setOpenSectionMenuId(null)
                        }}
                      >
                        Duplicate
                      </button>
                      <button
                        className="builder-composer-section__menu-item builder-composer-section__menu-item--danger"
                        type="button"
                        onClick={() => {
                          onRemoveSection(section.id)
                          setOpenSectionMenuId(null)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>

                {componentItem?.component ? (
                  <div className="builder-composer-section__content">
                    {createElement(componentItem.component, {
                      ...section.props,
                      theme,
                    })}
                  </div>
                ) : (
                  <div className="builder-composer-section__empty">
                    <p className="builder-composer-section__empty-title">
                      Empty section
                    </p>
                    <p className="builder-composer-section__empty-copy">
                      Select this section and choose a component from the library,
                      or use the insert control above.
                    </p>
                  </div>
                )}
              </article>

              <button
                className="builder-canvas__insert"
                type="button"
                onClick={() =>
                  setOpenInsertIndex((currentValue) =>
                    currentValue === index + 1 ? null : index + 1,
                  )
                }
              >
                +
              </button>

              {openInsertIndex === index + 1 ? (
                <div className="builder-canvas__insert-menu">
                  {availableComponents.length === 0 ? (
                    <p className="builder-canvas__insert-empty">
                      No registered components available.
                    </p>
                  ) : (
                    availableComponents.map(([category, items]) => (
                      <div key={category} className="builder-canvas__insert-group">
                        <p className="builder-canvas__insert-group-title">{category}</p>
                        <div className="builder-canvas__insert-list">
                          {items.map((item) => (
                            <button
                              key={item.id}
                              className="builder-canvas__insert-item"
                              type="button"
                              onClick={() => handleInsert(item.id)}
                            >
                              {item.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BuilderCanvas
