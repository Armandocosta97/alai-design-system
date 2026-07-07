import type { ComponentType } from 'react'

export type ComponentStatus = 'draft' | 'ready' | 'deprecated'

export type ComponentPropFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'image'
  | 'color'
  | 'link'
  | 'list'

export interface ComponentPropDefinition {
  key: string
  type: ComponentPropFieldType
  label: string
  defaultValue: unknown
  options?: string[]
  description?: string
}

export interface ComponentVariantDefinition {
  id: string
  name: string
  description?: string
}

export type ComponentStyleControlType = 'number' | 'color' | 'boolean' | 'select'

export interface ComponentStyleControlDefinition {
  key: string
  label: string
  type: ComponentStyleControlType
  defaultValue: unknown
  options?: string[]
  description?: string
}

export interface ComponentManifest {
  id: string
  name: string
  category: string
  sourceFolder: string
  description: string
  status: ComponentStatus
  version: string
  tags: string[]
  industries: string[]
  author: string
  createdAt: string
  updatedAt: string
  previewImage: string
  component: ComponentType<any> | null
  props: ComponentPropDefinition[]
  exportFiles: string[]
  variants?: ComponentVariantDefinition[]
  styleControls?: ComponentStyleControlDefinition[]
  // Which ComponentLibrary this manifest belongs to. Individual manifest.ts
  // files never set this themselves — it is injected automatically when
  // componentRegistry is built from `libraries` (see config/libraries.ts).
  libraryId?: string
  // Optional static thumbnail image. When absent, ComponentThumbnail renders
  // the real component live instead.
  thumbnail?: string
}
