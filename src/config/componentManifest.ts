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

export interface ComponentManifest {
  id: string
  name: string
  category: string
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
}
