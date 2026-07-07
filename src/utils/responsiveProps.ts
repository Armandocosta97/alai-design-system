import type { Breakpoint } from '../config/responsive'
import type { BuilderSection } from '../config/project'

type SectionLike = Pick<BuilderSection, 'props' | 'responsiveOverrides'>

/**
 * Effective value of a single prop for the given breakpoint.
 * Desktop always reads from `props` (the legacy/plain value, untouched).
 * Tablet/mobile read their own override if one exists, otherwise inherit desktop.
 */
export function getResponsiveValue(
  section: SectionLike,
  propKey: string,
  breakpoint: Breakpoint,
): unknown {
  if (breakpoint === 'desktop') {
    return section.props[propKey]
  }

  const overridesForBreakpoint = section.responsiveOverrides?.[breakpoint]
  if (overridesForBreakpoint && propKey in overridesForBreakpoint) {
    return overridesForBreakpoint[propKey]
  }

  return section.props[propKey]
}

/**
 * Returns a new section with `propKey` set for the given breakpoint.
 * Desktop writes go straight into `props`, exactly like before responsive
 * editing existed. Tablet/mobile writes are stored separately so `props`
 * (what the Export Engine reads) never changes shape.
 */
export function setResponsiveValue(
  section: BuilderSection,
  propKey: string,
  breakpoint: Breakpoint,
  value: unknown,
): BuilderSection {
  if (breakpoint === 'desktop') {
    return {
      ...section,
      props: { ...section.props, [propKey]: value },
    }
  }

  return {
    ...section,
    responsiveOverrides: {
      ...section.responsiveOverrides,
      [breakpoint]: {
        ...section.responsiveOverrides?.[breakpoint],
        [propKey]: value,
      },
    },
  }
}

/** Whether `propKey` has an explicit override at this breakpoint (desktop always does). */
export function hasResponsiveOverride(
  section: SectionLike,
  propKey: string,
  breakpoint: Breakpoint,
): boolean {
  if (breakpoint === 'desktop') {
    return true
  }

  const overridesForBreakpoint = section.responsiveOverrides?.[breakpoint]
  return Boolean(overridesForBreakpoint && propKey in overridesForBreakpoint)
}

/**
 * Resolves the full props object a component should receive for the given
 * breakpoint. Always a plain, flat Record<string, unknown> — the same shape
 * components and the Export Engine already expect.
 */
export function resolveSectionProps(
  section: SectionLike,
  breakpoint: Breakpoint,
): Record<string, unknown> {
  if (breakpoint === 'desktop') {
    return section.props
  }

  const overridesForBreakpoint = section.responsiveOverrides?.[breakpoint] ?? {}
  return { ...section.props, ...overridesForBreakpoint }
}
