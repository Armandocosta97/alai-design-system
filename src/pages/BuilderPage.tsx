import { useState } from 'react'
import BuilderCanvas from '../components/BuilderCanvas'
import BuilderInspector from '../components/BuilderInspector'
import BuilderSidebar from '../components/BuilderSidebar'
import {
  componentRegistry,
  type DesignSystemComponent,
} from '../config/componentRegistry'
import { defaultProjectTheme, type ProjectTheme } from '../config/theme'

type BuilderSection = {
  id: string
  componentId: string | null
  props: Record<string, unknown>
}

type ProjectPage = {
  id: string
  name: string
  sections: BuilderSection[]
}

type Project = {
  id: string
  name: string
  theme: ProjectTheme
  pages: ProjectPage[]
}

function createSection(): BuilderSection {
  return {
    id: `section-${crypto.randomUUID()}`,
    componentId: null,
    props: {},
  }
}

function createInitialSections() {
  return [createSection(), createSection(), createSection()]
}

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
  const [project, setProject] = useState<Project>({
    id: 'project-alai',
    name: 'ALai Website',
    theme: defaultProjectTheme,
    pages: [
      { id: 'page-home', name: 'Home', sections: createInitialSections() },
      { id: 'page-about', name: 'About', sections: createInitialSections() },
      { id: 'page-services', name: 'Services', sections: createInitialSections() },
      { id: 'page-contact', name: 'Contact', sections: createInitialSections() },
    ],
  })
  const [selectedPageId, setSelectedPageId] = useState<string>('page-home')
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)

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
    }

    updateSelectedPageSections((currentSections) => {
      const nextSections = [...currentSections]
      nextSections.splice(index, 0, nextSection)
      return nextSections
    })
    setSelectedSectionId(nextSection.id)
  }

  function removeSection(sectionId: string) {
    updateSelectedPageSections((currentSections) => {
      const nextSections = currentSections.filter((section) => section.id !== sectionId)

      if (nextSections.length === 0) {
        const fallbackSection = createSection()
        setSelectedSectionId(fallbackSection.id)
        return [fallbackSection]
      }

      if (selectedSectionId === sectionId) {
        setSelectedSectionId(nextSections[0].id)
      }

      return nextSections
    })
  }

  function moveSection(sectionId: string, direction: -1 | 1) {
    updateSelectedPageSections((currentSections) => {
      const currentIndex = currentSections.findIndex((section) => section.id === sectionId)

      if (currentIndex === -1) {
        return currentSections
      }

      const nextIndex = currentIndex + direction
      if (nextIndex < 0 || nextIndex >= currentSections.length) {
        return currentSections
      }

      const nextSections = [...currentSections]
      const [movedSection] = nextSections.splice(currentIndex, 1)
      nextSections.splice(nextIndex, 0, movedSection)
      return nextSections
    })
  }

  function duplicateSection(sectionId: string) {
    updateSelectedPageSections((currentSections) => {
      const currentIndex = currentSections.findIndex((section) => section.id === sectionId)

      if (currentIndex === -1) {
        return currentSections
      }

      const duplicatedSection = cloneSection(currentSections[currentIndex])
      const nextSections = [...currentSections]
      nextSections.splice(currentIndex + 1, 0, duplicatedSection)
      setSelectedSectionId(duplicatedSection.id)
      return nextSections
    })
  }

  function handleSelectComponent(componentItem: DesignSystemComponent) {
    updateSelectedPageSections((currentSections) => {
      let targetSectionId = selectedSectionId

      if (!targetSectionId) {
        targetSectionId = currentSections.find((section) => section.componentId === null)?.id ?? null
      }

      if (!targetSectionId) {
        const nextSection = createSection()
        setSelectedSectionId(nextSection.id)
        return [
          ...currentSections,
          {
            ...nextSection,
            componentId: componentItem.id,
            props: getDefaultProps(componentItem),
          },
        ]
      }

      setSelectedSectionId(targetSectionId)

      return currentSections.map((section) =>
        section.id === targetSectionId
          ? {
              ...section,
              componentId: componentItem.id,
              props: getDefaultProps(componentItem),
            }
          : section,
      )
    })
  }

  function updateSelectedSectionProp(propKey: string, value: unknown) {
    if (!selectedSectionId) {
      return
    }

    updateSelectedPageSections((currentSections) =>
      currentSections.map((section) =>
        section.id === selectedSectionId
          ? {
              ...section,
              props: {
                ...section.props,
                [propKey]: value,
              },
            }
          : section,
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
    setProject((currentProject) => {
      const nextPages = currentProject.pages.filter((page) => page.id !== pageId)

      if (nextPages.length === 0) {
        const fallbackPage: ProjectPage = {
          id: `page-${crypto.randomUUID()}`,
          name: 'Home',
          sections: createInitialSections(),
        }
        setSelectedPageId(fallbackPage.id)
        setSelectedSectionId(null)
        return { ...currentProject, pages: [fallbackPage] }
      }

      if (selectedPageId === pageId) {
        setSelectedPageId(nextPages[0].id)
        setSelectedSectionId(null)
      }

      return { ...currentProject, pages: nextPages }
    })
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
        <p className="builder-page__eyebrow">Internal Composer</p>
        <h2 className="builder-page__title">Build a website visually.</h2>
        <p className="builder-page__description">
          Compose multiple pages inside one project. Select a page from the project
          explorer, build its sections on canvas, and inspect each component on the right.
        </p>
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
          theme={project.theme}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
          onMoveSectionUp={(sectionId) => moveSection(sectionId, -1)}
          onMoveSectionDown={(sectionId) => moveSection(sectionId, 1)}
          onDuplicateSection={duplicateSection}
          onRemoveSection={removeSection}
          onInsertComponent={insertSectionAt}
        />
        <BuilderInspector
          componentItem={selectedComponent}
          sectionProps={selectedSection?.props ?? {}}
          onPropChange={updateSelectedSectionProp}
          theme={project.theme}
          onThemeChange={updateProjectTheme}
          project={project}
        />
      </div>
    </section>
  )
}

export default BuilderPage
