import type { Breakpoint } from '../config/responsive'
import type { BuilderSection } from '../config/project'

type SectionLike = Pick<BuilderSection, 'visibility'>

/** Whether a section is visible at the given breakpoint. Defaults to true. */
export function isVisible(section: SectionLike, breakpoint: Breakpoint): boolean {
  return section.visibility?.[breakpoint] ?? true
}

/** Returns a new section with the given breakpoint's visibility flipped. */
export function toggleVisibility(section: BuilderSection, breakpoint: Breakpoint): BuilderSection {
  return {
    ...section,
    visibility: {
      ...section.visibility,
      [breakpoint]: !isVisible(section, breakpoint),
    },
  }
}
