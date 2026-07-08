import { createElement } from 'react'
import { componentRegistry } from '../../config/componentRegistry'
import type { Project } from '../../config/project'
import { toThemeStyle } from '../../utils/themeStyle'

type ProjectPreviewRendererProps = {
  project: Project
}

/**
 * Read-only renderer for a Project's first page — no selection chrome, no
 * drag handles, no Inspector, nothing Builder-specific. Renders each
 * section's real component with the exact same props/variantId/style/
 * theme/assets shape BuilderCanvas and the Export Engine already pass, so
 * this is a faithful preview of what actually exports, not a separate
 * approximation.
 *
 * Deliberately does not apply per-breakpoint `responsiveOverrides`/
 * `visibility` — the Export Engine does not act on those today (they are
 * Builder-only editing conveniences), so honoring them here would make the
 * preview diverge from the real exported site rather than match it. Layout
 * responsiveness at different simulated widths comes from each component's
 * own CSS media queries, which react correctly to the preview frame's real
 * rendered width.
 */
function ProjectPreviewRenderer({ project }: ProjectPreviewRendererProps) {
  const page = project.pages[0]
  const sections = page?.sections ?? []

  return (
    <div style={toThemeStyle(project.theme)}>
      {sections.map((section) => {
        if (!section.componentId) {
          return null
        }

        const manifest = componentRegistry.find((item) => item.id === section.componentId)
        if (!manifest?.component) {
          return null
        }

        return (
          <div key={section.id}>
            {createElement(manifest.component, {
              ...section.props,
              assets: project.assets,
              theme: project.theme,
              variantId: section.variantId,
              style: section.style,
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ProjectPreviewRenderer
