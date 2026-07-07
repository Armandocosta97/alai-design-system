import { useMemo, useState } from 'react'
import type { ComponentManifest } from '../config/componentManifest'
import { libraries } from '../config/libraries'
import ComponentThumbnail from './ComponentThumbnail'

type ProjectPage = {
  id: string
  name: string
  sections: { id: string; componentId: string | null; props: Record<string, unknown> }[]
}

type BuilderSidebarProps = {
  pages: ProjectPage[]
  selectedPageId: string | null
  componentsByCategory: Record<string, ComponentManifest[]>
  onSelectPage: (pageId: string) => void
  onAddPage: () => void
  onRenamePage: (pageId: string) => void
  onDeletePage: (pageId: string) => void
  onDuplicatePage: (pageId: string) => void
  onMovePageUp: (pageId: string) => void
  onMovePageDown: (pageId: string) => void
  onSelectComponent: (component: ComponentManifest) => void
}

function formatCategoryName(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

function BuilderSidebar({
  pages,
  selectedPageId,
  componentsByCategory,
  onSelectPage,
  onAddPage,
  onRenamePage,
  onDeletePage,
  onDuplicatePage,
  onMovePageUp,
  onMovePageDown,
  onSelectComponent,
}: BuilderSidebarProps) {
  const [isProjectOpen, setIsProjectOpen] = useState(true)
  const [isLibraryOpen, setIsLibraryOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLibraryId, setSelectedLibraryId] = useState('all')

  const filteredComponents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return Object.entries(componentsByCategory).reduce<Record<string, ComponentManifest[]>>(
      (groups, [category, items]) => {
        const matchingItems = items.filter((item) => {
          if (selectedLibraryId !== 'all' && item.libraryId !== selectedLibraryId) {
            return false
          }

          if (!normalizedQuery) {
            return true
          }

          const haystack = [
            item.id,
            item.name,
            item.category,
            item.description,
            ...item.tags,
          ]
            .join(' ')
            .toLowerCase()

          return haystack.includes(normalizedQuery)
        })

        if (matchingItems.length > 0) {
          groups[category] = matchingItems
        }

        return groups
      },
      {},
    )
  }, [componentsByCategory, searchQuery, selectedLibraryId])

  const categories = Object.entries(filteredComponents)

  return (
    <section className="builder-panel builder-sidebar">
      <div className="builder-sidebar__stack">
        <div className="builder-panel__header">
          <button
            className="builder-sidebar__panel-toggle"
            type="button"
            onClick={() => setIsProjectOpen((value) => !value)}
          >
            <span>Project</span>
            <span>{isProjectOpen ? '−' : '+'}</span>
          </button>
          {isProjectOpen ? (
            <div className="builder-sidebar__project">
              <div className="builder-sidebar__project-top">
                <p className="builder-panel__eyebrow">Project</p>
                <button className="builder-panel__button" type="button" onClick={onAddPage}>
                  + Add Page
                </button>
              </div>
              <div className="builder-sidebar__pages">
                {pages.map((page, index) => (
                  <article
                    key={page.id}
                    className={`builder-sidebar__page${
                      selectedPageId === page.id ? ' builder-sidebar__page--active' : ''
                    }`}
                  >
                    <button
                      className="builder-sidebar__page-select"
                      type="button"
                      onClick={() => onSelectPage(page.id)}
                    >
                      <span className="builder-sidebar__page-name">{page.name}</span>
                      <span className="builder-sidebar__page-meta">
                        {page.sections.length} sections
                      </span>
                    </button>
                    <div className="builder-sidebar__page-actions">
                      <button type="button" onClick={() => onMovePageUp(page.id)} disabled={index === 0}>
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => onMovePageDown(page.id)}
                        disabled={index === pages.length - 1}
                      >
                        ↓
                      </button>
                      <button type="button" onClick={() => onRenamePage(page.id)}>
                        Rename
                      </button>
                      <button type="button" onClick={() => onDuplicatePage(page.id)}>
                        Duplicate
                      </button>
                      <button type="button" onClick={() => onDeletePage(page.id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="builder-panel__header">
          <button
            className="builder-sidebar__panel-toggle"
            type="button"
            onClick={() => setIsLibraryOpen((value) => !value)}
          >
            <span>Component Library</span>
            <span>{isLibraryOpen ? '−' : '+'}</span>
          </button>
          {isLibraryOpen ? (
            <>
              <div className="builder-sidebar__search-wrap">
                <select
                  className="builder-sidebar__library-select"
                  value={selectedLibraryId}
                  onChange={(event) => setSelectedLibraryId(event.target.value)}
                  aria-label="Filter by library"
                >
                  <option value="all">All Libraries</option>
                  {libraries.map((library) => (
                    <option key={library.id} value={library.id}>
                      {library.name}
                    </option>
                  ))}
                </select>
                <input
                  className="builder-sidebar__search"
                  type="search"
                  placeholder="Search components"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <div className="builder-sidebar__groups">
                {categories.map(([category, items]) => (
                  <div key={category} className="builder-sidebar__group">
                    <h3 className="builder-sidebar__group-title">
                      {formatCategoryName(category)}
                    </h3>
                    <div className="builder-sidebar__list">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="builder-sidebar__item"
                          role="button"
                          tabIndex={0}
                          onClick={() => onSelectComponent(item)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              onSelectComponent(item)
                            }
                          }}
                        >
                          <ComponentThumbnail manifest={item} />
                          <span className="builder-sidebar__item-name">{item.id}</span>
                          <span className="builder-sidebar__item-label">{item.name}</span>
                          <span className="builder-sidebar__item-meta">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {categories.length === 0 ? (
                  <p className="builder-sidebar__empty">No matching components found.</p>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default BuilderSidebar
