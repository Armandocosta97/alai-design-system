import { defaultProjectTheme, type ProjectTheme } from './theme'
import type { Breakpoint } from './responsive'

export type BuilderSection = {
  id: string
  componentId: string | null
  props: Record<string, unknown>
  // Optional per-breakpoint prop overrides. Absent for existing/legacy sections,
  // in which case tablet and mobile simply inherit `props` (the desktop value).
  responsiveOverrides?: Partial<Record<Exclude<Breakpoint, 'desktop'>, Record<string, unknown>>>
  // Optional per-breakpoint visibility. Absent (or an absent breakpoint key)
  // means visible everywhere.
  visibility?: Partial<Record<Breakpoint, boolean>>
  // Which of the component's manifest.variants is active. Absent means the
  // component's first declared variant (or its own internal default).
  variantId?: string
  // Fine-grained appearance controls (from manifest.styleControls), completely
  // independent from `props` (content). Absent keys fall back to each
  // component's own defaults.
  style?: Record<string, unknown>
}

export type ProjectPage = {
  id: string
  name: string
  sections: BuilderSection[]
}

export type ProjectAsset = {
  id: string
  name: string
  type: string
  url: string
  size: number
  createdAt: string
}

export type Project = {
  id: string
  name: string
  theme: ProjectTheme
  assets: ProjectAsset[]
  pages: ProjectPage[]
}

export function createSection(): BuilderSection {
  return {
    id: `section-${crypto.randomUUID()}`,
    componentId: null,
    props: {},
  }
}

export function createInitialSections() {
  return [createSection(), createSection(), createSection()]
}

export function createInitialProject(): Project {
  return {
    id: 'project-alai',
    name: 'ALai Website',
    theme: defaultProjectTheme,
    assets: [],
    pages: [
      { id: 'page-home', name: 'Home', sections: createInitialSections() },
      { id: 'page-about', name: 'About', sections: createInitialSections() },
      { id: 'page-services', name: 'Services', sections: createInitialSections() },
      { id: 'page-contact', name: 'Contact', sections: createInitialSections() },
    ],
  }
}
