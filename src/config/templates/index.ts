import type { Project } from '../project'
import { agencyPreset } from './agency'
import { portfolioPreset } from './portfolio'
import { restaurantPreset } from './restaurant'
import { saasPreset } from './saas'

// A Template is a Project plus minimal, presentational metadata — nothing
// more. `project` is a normal Project, identical in shape to the one a user
// builds by hand in the Builder.
//
// Template metadata (id, name, description, category, industry,
// thumbnailPath, tags) is intentionally NOT exported. The Export Engine only
// ever reads `Project` data from ProjectContext; it has no concept of
// templates and needs none. Once a template is loaded, this metadata is
// discarded — it never appears in an exported project.
//
// Templates are immutable. Loading a template always produces a normal,
// independent Project (see loadTemplate / TemplatesPage). Editing that
// Project never modifies the Template definition below — there is no
// back-reference from a live Project to the Template it came from.
export type Template = {
  id: string
  name: string
  description: string
  category: string
  industry: string
  thumbnailPath: string
  tags: string[]
  project: Project
}

export const templates: Template[] = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'A warm, editorial site for a neighborhood restaurant.',
    category: 'Business',
    industry: 'Restaurant',
    thumbnailPath: '/template-thumbnails/restaurant.png',
    tags: ['warm', 'editorial', 'local business'],
    project: restaurantPreset,
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'A bold, dark site for a creative brand and product studio.',
    category: 'Business',
    industry: 'Agency',
    thumbnailPath: '/template-thumbnails/agency.png',
    tags: ['bold', 'dark', 'creative'],
    project: agencyPreset,
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'A clean, conversion-focused site for a software product.',
    category: 'Business',
    industry: 'SaaS',
    thumbnailPath: '/template-thumbnails/saas.png',
    tags: ['clean', 'conversion-focused', 'software'],
    project: saasPreset,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'A minimal, editorial portfolio for an individual creator.',
    category: 'Personal',
    industry: 'Portfolio',
    thumbnailPath: '/template-thumbnails/portfolio.png',
    tags: ['minimal', 'editorial', 'individual'],
    project: portfolioPreset,
  },
]
