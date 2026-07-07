import type { ComponentManifest } from '../../../config/componentManifest'
import Features01 from './Features01'
import { features01DefaultProps, features01DefaultStyle } from './Features01'

const iconOptions = ['bolt', 'shield', 'chart', 'layers', 'globe', 'sparkles', 'lock', 'puzzle']

const Features01Manifest: ComponentManifest = {
  id: 'Features01',
  name: 'Features 01',
  category: 'features',
  sourceFolder: 'src/library/features/Features01',
  description: 'Editorial three-feature section with icon badges and three arrangement variants.',
  status: 'ready',
  version: '1.0.0',
  tags: ['icon-grid', 'editorial', 'premium'],
  industries: ['saas', 'product', 'professional'],
  author: 'ALai Design System',
  createdAt: '2026-07-04',
  updatedAt: '2026-07-04',
  previewImage: '',
  component: Features01,
  props: [
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: features01DefaultProps.eyebrow,
    },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: features01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: features01DefaultProps.subtitle,
    },
    {
      key: 'feature1Icon',
      type: 'select',
      label: 'Feature 1 Icon',
      defaultValue: features01DefaultProps.feature1Icon,
      options: iconOptions,
    },
    {
      key: 'feature1Title',
      type: 'text',
      label: 'Feature 1 Title',
      defaultValue: features01DefaultProps.feature1Title,
    },
    {
      key: 'feature1Description',
      type: 'textarea',
      label: 'Feature 1 Description',
      defaultValue: features01DefaultProps.feature1Description,
    },
    {
      key: 'feature2Icon',
      type: 'select',
      label: 'Feature 2 Icon',
      defaultValue: features01DefaultProps.feature2Icon,
      options: iconOptions,
    },
    {
      key: 'feature2Title',
      type: 'text',
      label: 'Feature 2 Title',
      defaultValue: features01DefaultProps.feature2Title,
    },
    {
      key: 'feature2Description',
      type: 'textarea',
      label: 'Feature 2 Description',
      defaultValue: features01DefaultProps.feature2Description,
    },
    {
      key: 'feature3Icon',
      type: 'select',
      label: 'Feature 3 Icon',
      defaultValue: features01DefaultProps.feature3Icon,
      options: iconOptions,
    },
    {
      key: 'feature3Title',
      type: 'text',
      label: 'Feature 3 Title',
      defaultValue: features01DefaultProps.feature3Title,
    },
    {
      key: 'feature3Description',
      type: 'textarea',
      label: 'Feature 3 Description',
      defaultValue: features01DefaultProps.feature3Description,
    },
  ],
  exportFiles: ['Features01.tsx', 'Features01.css', 'index.ts'],
  variants: [
    { id: 'grid', name: 'Grid', description: 'Three-column card grid, icon above text.' },
    { id: 'minimal', name: 'Minimal', description: 'Plain stacked column, no card framing.' },
    { id: 'icon-left', name: 'Icon Left', description: 'Stacked rows, icon beside text.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: features01DefaultStyle.containerWidth,
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: features01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: features01DefaultStyle.paddingBottom,
    },
    {
      key: 'iconStyle',
      type: 'select',
      label: 'Icon Style',
      defaultValue: features01DefaultStyle.iconStyle,
      options: ['tinted', 'outline', 'solid'],
    },
    {
      key: 'cardBorder',
      type: 'boolean',
      label: 'Card Border',
      defaultValue: features01DefaultStyle.cardBorder,
    },
  ],
}

export default Features01Manifest
