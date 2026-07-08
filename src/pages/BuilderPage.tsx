import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProject } from '../app/ProjectContext'
import BuilderCanvas from '../components/BuilderCanvas'
import BuilderInspector from '../components/BuilderInspector'
import BuilderSidebar from '../components/BuilderSidebar'
import {
  componentRegistry,
  type DesignSystemComponent,
} from '../config/componentRegistry'
import { createInitialSections, createSection, type BuilderSection, type ProjectPage } from '../config/project'
import { BREAKPOINTS, BREAKPOINT_LABELS, DEFAULT_BREAKPOINT, type Breakpoint } from '../config/responsive'
import type { ProjectTheme } from '../config/theme'
import { resolveSectionProps, setResponsiveValue } from '../utils/responsiveProps'
import { toggleVisibility } from '../utils/responsiveVisibility'

function cloneSections(sections: BuilderSection[]) {
  return sections.map((section) => ({
    ...section,
    id: `section-${crypto.randomUUID()}`,
    props: { ...section.props },
  }))
}

function cloneSection(section: BuilderSection): BuilderSection {
  return {
    ...section,
    id: `section-${crypto.randomUUID()}`,
    props: { ...section.props },
  }
}

function BuilderPage() {
  const { project, setProject, undo, redo, canUndo, canRedo } = useProject()
  const [selectedPageId, setSelectedPageId] = useState<string>('page-home')
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>(DEFAULT_BREAKPOINT)

  const componentsByCategory = componentRegistry.reduce<
    Record<string, DesignSystemComponent[]>
  >((groups, item) => {
    const existingItems = groups[item.category] ?? []
    groups[item.category] = [...existingItems, item]
    return groups
  }, {})

  const componentsById = componentRegistry.reduce<Record<string, DesignSystemComponent>>(
    (registryMap, item) => {
      registryMap[item.id] = item
      return registryMap
    },
    {},
  )

  const selectedPage =
    project.pages.find((page) => page.id === selectedPageId) ?? project.pages[0]
  const sections = selectedPage?.sections ?? []
  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? null
  const selectedComponent =
    selectedSection?.componentId
      ? componentsById[selectedSection.componentId] ?? null
      : null

  function getDefaultProps(componentItem: DesignSystemComponent) {
    return componentItem.props.reduce<Record<string, unknown>>((defaults, prop) => {
      defaults[prop.key] = prop.defaultValue
      return defaults
    }, {})
  }

  function getDefaultVariantId(componentItem: DesignSystemComponent) {
    return componentItem.variants?.[0]?.id
  }

  function getDefaultStyle(componentItem: DesignSystemComponent) {
    return (componentItem.styleControls ?? []).reduce<Record<string, unknown>>(
      (defaults, control) => {
        defaults[control.key] = control.defaultValue
        return defaults
      },
      {},
    )
  }

  function updateSelectedPageSections(
    updater: (sections: BuilderSection[]) => BuilderSection[],
  ) {
    setProject((currentProject) => ({
      ...currentProject,
      pages: currentProject.pages.map((page) =>
        page.id === selectedPageId
          ? { ...page, sections: updater(page.sections) }
          : page,
      ),
    }))
  }

  function insertSectionAt(index: number, componentId: string) {
    const componentItem = componentsById[componentId]
    const nextSection: BuilderSection = {
      id: `section-${crypto.randomUUID()}`,
      componentId,
      props: componentItem ? getDefaultProps(componentItem) : {},
      variantId: componentItem ? getDefaultVariantId(componentItem) : undefined,
      style: componentItem ? getDefaultStyle(componentItem) : {},
    }

    updateSelectedPageSections((currentSections) => {
      const nextSections = [...currentSections]
      nextSections.splice(index, 0, nextSection)
      return nextSections
    })
    setSelectedSectionId(nextSection.id)
  }

  function removeSection(sectionId: string) {
    const nextSections = sections.filter((section) => section.id !== sectionId)

    if (nextSections.length === 0) {
      const fallbackSection = createSection()
      updateSelectedPageSections(() => [fallbackSection])
      setSelectedSectionId(fallbackSection.id)
      return
    }

    updateSelectedPageSections(() => nextSections)

    if (selectedSectionId === sectionId) {
      setSelectedSectionId(nextSections[0].id)
    }
  }

  function reorderSections(orderedSectionIds: string[]) {
    updateSelectedPageSections((currentSections) => {
      const sectionsById = new Map(
        currentSections.map((section) => [section.id, section] as const),
      )
      return orderedSectionIds.map((sectionId) => sectionsById.get(sectionId)!)
    })
  }

  function duplicateSection(sectionId: string) {
    const currentIndex = sections.findIndex((section) => section.id === sectionId)

    if (currentIndex === -1) {
      return
    }

    const duplicatedSection = cloneSection(sections[currentIndex])

    updateSelectedPageSections((currentSections) => {
      const nextSections = [...currentSections]
      nextSections.splice(currentIndex + 1, 0, duplicatedSection)
      return nextSections
    })
    setSelectedSectionId(duplicatedSection.id)
  }

  function handleSelectComponent(componentItem: DesignSystemComponent) {
    const targetSectionId =
      selectedSectionId ?? sections.find((section) => section.componentId === null)?.id ?? null

    if (!targetSectionId) {
      const nextSection: BuilderSection = {
        ...createSection(),
        componentId: componentItem.id,
        props: getDefaultProps(componentItem),
        variantId: getDefaultVariantId(componentItem),
        style: getDefaultStyle(componentItem),
      }

      updateSelectedPageSections((currentSections) => [...currentSections, nextSection])
      setSelectedSectionId(nextSection.id)
      return
    }

    updateSelectedPageSections((currentSections) =>
      currentSections.map((section) =>
        section.id === targetSectionId
          ? {
              ...section,
              componentId: componentItem.id,
              props: getDefaultProps(componentItem),
              variantId: getDefaultVariantId(componentItem),
              style: getDefaultStyle(componentItem),
            }
          : section,
      ),
    )
    setSelectedSectionId(targetSectionId)
  }

  function updateSelectedSectionProp(propKey: string, value: unknown) {
    if (!selectedSectionId) {
      return
    }

    updateSelectedPageSections((currentSections) =>
      currentSections.map((section) =>
        section.id === selectedSectionId
          ? setResponsiveValue(section, propKey, activeBreakpoint, value)
          : section,
      ),
    )
  }

  function updateSelectedSectionVariant(variantId: string) {
    if (!selectedSectionId) {
      return
    }

    updateSelectedPageSections((currentSections) =>
      currentSections.map((section) =>
        section.id === selectedSectionId ? { ...section, variantId } : section,
      ),
    )
  }

  function updateSelectedSectionStyle(styleKey: string, value: unknown) {
    if (!selectedSectionId) {
      return
    }

    updateSelectedPageSections((currentSections) =>
      currentSections.map((section) =>
        section.id === selectedSectionId
          ? { ...section, style: { ...section.style, [styleKey]: value } }
          : section,
      ),
    )
  }

  function toggleSelectedSectionVisibility(breakpoint: Breakpoint) {
    if (!selectedSectionId) {
      return
    }

    updateSelectedPageSections((currentSections) =>
      currentSections.map((section) =>
        section.id === selectedSectionId ? toggleVisibility(section, breakpoint) : section,
      ),
    )
  }

  function handleSelectPage(pageId: string) {
    setSelectedPageId(pageId)
    setSelectedSectionId(null)
  }

  function handleAddPage() {
    const pageName = window.prompt('Page name', `Page ${project.pages.length + 1}`)?.trim()
    if (!pageName) {
      return
    }

    const nextPage: ProjectPage = {
      id: `page-${crypto.randomUUID()}`,
      name: pageName,
      sections: createInitialSections(),
    }

    setProject((currentProject) => ({
      ...currentProject,
      pages: [...currentProject.pages, nextPage],
    }))
    setSelectedPageId(nextPage.id)
    setSelectedSectionId(null)
  }

  function handleRenamePage(pageId: string) {
    const currentPage = project.pages.find((page) => page.id === pageId)
    if (!currentPage) {
      return
    }

    const nextName = window.prompt('Rename page', currentPage.name)?.trim()
    if (!nextName) {
      return
    }

    setProject((currentProject) => ({
      ...currentProject,
      pages: currentProject.pages.map((page) =>
        page.id === pageId ? { ...page, name: nextName } : page,
      ),
    }))
  }

  function handleDeletePage(pageId: string) {
    const nextPages = project.pages.filter((page) => page.id !== pageId)

    if (nextPages.length === 0) {
      const fallbackPage: ProjectPage = {
        id: `page-${crypto.randomUUID()}`,
        name: 'Home',
        sections: createInitialSections(),
      }
      setProject((currentProject) => ({ ...currentProject, pages: [fallbackPage] }))
      setSelectedPageId(fallbackPage.id)
      setSelectedSectionId(null)
      return
    }

    setProject((currentProject) => ({ ...currentProject, pages: nextPages }))

    if (selectedPageId === pageId) {
      setSelectedPageId(nextPages[0].id)
      setSelectedSectionId(null)
    }
  }

  function handleDuplicatePage(pageId: string) {
    const currentPage = project.pages.find((page) => page.id === pageId)
    if (!currentPage) {
      return
    }

    const duplicatedPage: ProjectPage = {
      id: `page-${crypto.randomUUID()}`,
      name: `${currentPage.name} Copy`,
      sections: cloneSections(currentPage.sections),
    }

    setProject((currentProject) => {
      const currentIndex = currentProject.pages.findIndex((page) => page.id === pageId)
      const nextPages = [...currentProject.pages]
      nextPages.splice(currentIndex + 1, 0, duplicatedPage)
      return { ...currentProject, pages: nextPages }
    })
    setSelectedPageId(duplicatedPage.id)
    setSelectedSectionId(null)
  }

  function movePage(pageId: string, direction: -1 | 1) {
    setProject((currentProject) => {
      const currentIndex = currentProject.pages.findIndex((page) => page.id === pageId)
      if (currentIndex === -1) {
        return currentProject
      }

      const nextIndex = currentIndex + direction
      if (nextIndex < 0 || nextIndex >= currentProject.pages.length) {
        return currentProject
      }

      const nextPages = [...currentProject.pages]
      const [movedPage] = nextPages.splice(currentIndex, 1)
      nextPages.splice(nextIndex, 0, movedPage)

      return { ...currentProject, pages: nextPages }
    })
  }

  function updateProjectTheme<Key extends keyof ProjectTheme>(
    key: Key,
    value: ProjectTheme[Key],
  ) {
    setProject((currentProject) => ({
      ...currentProject,
      theme: {
        ...currentProject.theme,
        [key]: value,
      },
    }))
  }

  return (
    <section className="builder-page">
      <div className="builder-page__intro">
        <div>
          <p className="builder-page__eyebrow">Internal Composer</p>
          <h2 className="builder-page__title">Build a website visually.</h2>
          <p className="builder-page__description">
            Compose multiple pages inside one project. Select a page from the project
            explorer, build its sections on canvas, and inspect each component on the right.
          </p>
        </div>

        <div className="builder-toolbar">
          <div className="builder-toolbar__group" role="group" aria-label="Responsive breakpoint">
            {BREAKPOINTS.map((breakpoint) => (
              <button
                key={breakpoint}
                className={`builder-toolbar__button${
                  activeBreakpoint === breakpoint ? ' builder-toolbar__button--active' : ''
                }`}
                type="button"
                onClick={() => setActiveBreakpoint(breakpoint)}
                aria-pressed={activeBreakpoint === breakpoint}
              >
                {BREAKPOINT_LABELS[breakpoint]}
              </button>
            ))}
          </div>

          <div className="builder-toolbar__group">
            <button
              className="builder-toolbar__button"
              type="button"
              onClick={undo}
              disabled={!canUndo}
              aria-label="Undo"
              title="Undo (⌘Z / Ctrl+Z)"
            >
              Undo
            </button>
            <button
              className="builder-toolbar__button"
              type="button"
              onClick={redo}
              disabled={!canRedo}
              aria-label="Redo"
              title="Redo (⇧⌘Z / Ctrl+Shift+Z)"
            >
              Redo
            </button>
          </div>

          <div className="builder-toolbar__group">
            <Link className="builder-toolbar__button" to="/preview">
              Preview
            </Link>
          </div>
        </div>
      </div>

      <div className="builder-layout">
        <BuilderSidebar
          pages={project.pages}
          selectedPageId={selectedPageId}
          componentsByCategory={componentsByCategory}
          onSelectPage={handleSelectPage}
          onAddPage={handleAddPage}
          onRenamePage={handleRenamePage}
          onDeletePage={handleDeletePage}
          onDuplicatePage={handleDuplicatePage}
          onMovePageUp={(pageId) => movePage(pageId, -1)}
          onMovePageDown={(pageId) => movePage(pageId, 1)}
          onSelectComponent={handleSelectComponent}
        />
        <BuilderCanvas
          pageName={selectedPage?.name ?? 'Page'}
          sections={sections}
          componentsById={componentsById}
          componentsByCategory={componentsByCategory}
          assets={project.assets}
          theme={project.theme}
          activeBreakpoint={activeBreakpoint}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          onReorderSections={reorderSections}
          onDuplicateSection={duplicateSection}
          onRemoveSection={removeSection}
          onInsertComponent={insertSectionAt}
        />
        <BuilderInspector
          componentItem={selectedComponent}
          sectionProps={selectedSection ? resolveSectionProps(selectedSection, activeBreakpoint) : {}}
          onPropChange={updateSelectedSectionProp}
          theme={project.theme}
          assets={project.assets}
          onThemeChange={updateProjectTheme}
          project={project}
          activeBreakpoint={activeBreakpoint}
          sectionVisibility={selectedSection?.visibility}
          onToggleVisibility={toggleSelectedSectionVisibility}
          sectionVariantId={selectedSection?.variantId}
          onVariantChange={updateSelectedSectionVariant}
          sectionStyle={selectedSection?.style}
          onStyleChange={updateSelectedSectionStyle}
        />
      </div>
    </section>
  )
}

export default BuilderPage
