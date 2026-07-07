import { createElement, useMemo, useState, type CSSProperties } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { ComponentManifest } from '../config/componentManifest'
import type { BuilderSection, ProjectAsset } from '../config/project'
import { BREAKPOINT_LABELS, type Breakpoint } from '../config/responsive'
import type { ProjectTheme } from '../config/theme'
import { resolveSectionProps } from '../utils/responsiveProps'
import { isVisible } from '../utils/responsiveVisibility'
import { toThemeStyle } from '../utils/themeStyle'

type CanvasSection = BuilderSection

type BuilderCanvasProps = {
  pageName: string
  sections: CanvasSection[]
  componentsById: Record<string, ComponentManifest>
  componentsByCategory: Record<string, ComponentManifest[]>
  assets: ProjectAsset[]
  theme: ProjectTheme
  activeBreakpoint: Breakpoint
  selectedSectionId: string | null
  onSelectSection: (sectionId: string) => void
  onReorderSections: (orderedSectionIds: string[]) => void
  onDuplicateSection: (sectionId: string) => void
  onRemoveSection: (sectionId: string) => void
  onInsertComponent: (index: number, componentId: string) => void
}

type SortableSectionProps = {
  section: CanvasSection
  isSelected: boolean
  isMenuOpen: boolean
  componentItem: ComponentManifest | null
  assets: ProjectAsset[]
  theme: ProjectTheme
  activeBreakpoint: Breakpoint
  onSelectSection: (sectionId: string) => void
  onToggleMenu: (sectionId: string) => void
  onDuplicateSection: (sectionId: string) => void
  onRemoveSection: (sectionId: string) => void
}

function SortableSection({
  section,
  isSelected,
  isMenuOpen,
  componentItem,
  assets,
  theme,
  activeBreakpoint,
  onSelectSection,
  onToggleMenu,
  onDuplicateSection,
  onRemoveSection,
}: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  const visibleAtActiveBreakpoint = isVisible(section, activeBreakpoint)

  return (
    <div ref={setNodeRef} style={style} className="builder-canvas__node">
      <article
        className={`builder-composer-section${
          isSelected ? ' builder-composer-section--selected' : ''
        }${isDragging ? ' builder-composer-section--dragging' : ''}`}
        onClick={() => onSelectSection(section.id)}
      >
        <button
          className="builder-composer-section__drag-handle"
          type="button"
          aria-label="Drag to reorder section"
          onClick={(event) => event.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          ⋮⋮
        </button>

        <div className="builder-composer-section__chrome">
          <button
            className="builder-composer-section__menu-trigger"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onToggleMenu(section.id)
            }}
          >
            •••
          </button>

          {isMenuOpen ? (
            <div
              className="builder-composer-section__menu"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="builder-composer-section__menu-item"
                type="button"
                onClick={() => onSelectSection(section.id)}
              >
                Configure
              </button>
              <button
                className="builder-composer-section__menu-item"
                type="button"
                onClick={() => onDuplicateSection(section.id)}
              >
                Duplicate
              </button>
              <button
                className="builder-composer-section__menu-item builder-composer-section__menu-item--danger"
                type="button"
                onClick={() => onRemoveSection(section.id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>

        {!visibleAtActiveBreakpoint ? (
          <span className="builder-composer-section__hidden-badge">
            Hidden on {BREAKPOINT_LABELS[activeBreakpoint]}
          </span>
        ) : null}

        {componentItem?.component ? (
          visibleAtActiveBreakpoint ? (
            <div className="builder-composer-section__content">
              {createElement(componentItem.component, {
                ...resolveSectionProps(section, activeBreakpoint),
                assets,
                theme,
                variantId: section.variantId,
                style: section.style,
              })}
            </div>
          ) : (
            <div className="builder-composer-section__hidden">
              <p className="builder-composer-section__hidden-title">
                {componentItem.name} is hidden on {BREAKPOINT_LABELS[activeBreakpoint]}
              </p>
              <p className="builder-composer-section__hidden-copy">
                It still renders on other breakpoints and stays in the project. Toggle it back on
                in the Inspector&rsquo;s Visibility card.
              </p>
            </div>
          )
        ) : (
          <div className="builder-composer-section__empty">
            <p className="builder-composer-section__empty-title">Empty section</p>
            <p className="builder-composer-section__empty-copy">
              Select this section and choose a component from the library, or use the insert
              control above.
            </p>
          </div>
        )}
      </article>
    </div>
  )
}

function BuilderCanvas({
  pageName,
  sections,
  componentsById,
  componentsByCategory,
  assets,
  theme,
  activeBreakpoint,
  selectedSectionId,
  onSelectSection,
  onReorderSections,
  onDuplicateSection,
  onRemoveSection,
  onInsertComponent,
}: BuilderCanvasProps) {
  const [openInsertIndex, setOpenInsertIndex] = useState<number | null>(null)
  const [openSectionMenuId, setOpenSectionMenuId] = useState<string | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const availableComponents = useMemo(
    () => Object.entries(componentsByCategory),
    [componentsByCategory],
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  )

  function handleInsert(componentId: string) {
    if (openInsertIndex === null) {
      return
    }

    onInsertComponent(openInsertIndex, componentId)
    setOpenInsertIndex(null)
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveSectionId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveSectionId(null)

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = sections.findIndex((section) => section.id === active.id)
    const newIndex = sections.findIndex((section) => section.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const nextSections = arrayMove(sections, oldIndex, newIndex)
    onReorderSections(nextSections.map((section) => section.id))
  }

  const activeSection = activeSectionId
    ? sections.find((section) => section.id === activeSectionId) ?? null
    : null
  const activeComponentItem = activeSection?.componentId
    ? componentsById[activeSection.componentId] ?? null
    : null

  return (
    <section className="builder-panel builder-canvas" style={toThemeStyle(theme)}>
      <div className="builder-panel__header">
        <p className="builder-panel__eyebrow">Composer</p>
        <h2 className="builder-panel__title">{pageName}</h2>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveSectionId(null)}
      >
        <SortableContext
          items={sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="builder-canvas__flow">
            {sections.map((section, index) => {
              const componentItem = section.componentId
                ? componentsById[section.componentId] ?? null
                : null

              return (
                <div key={section.id} className="builder-canvas__group">
                  <SortableSection
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    isMenuOpen={openSectionMenuId === section.id}
                    componentItem={componentItem}
                    assets={assets}
                    theme={theme}
                    activeBreakpoint={activeBreakpoint}
                    onSelectSection={onSelectSection}
                    onToggleMenu={(sectionId) =>
                      setOpenSectionMenuId((currentValue) =>
                        currentValue === sectionId ? null : sectionId,
                      )
                    }
                    onDuplicateSection={(sectionId) => {
                      onDuplicateSection(sectionId)
                      setOpenSectionMenuId(null)
                    }}
                    onRemoveSection={(sectionId) => {
                      onRemoveSection(sectionId)
                      setOpenSectionMenuId(null)
                    }}
                  />

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
        </SortableContext>

        <DragOverlay>
          {activeSection ? (
            <div className="builder-composer-section builder-composer-section__drag-preview">
              <p className="builder-composer-section__drag-preview-label">
                {activeComponentItem?.name ?? 'Empty section'}
              </p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  )
}

export default BuilderCanvas
