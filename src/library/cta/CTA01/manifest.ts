import type { ComponentManifest } from '../../../config/componentManifest'
import CTA01 from './CTA01'
import { cta01DefaultProps, cta01DefaultStyle } from './CTA01'

const CTA01Manifest: ComponentManifest = {
  id: 'CTA01',
  name: 'CTA 01',
  category: 'cta',
  sourceFolder: 'src/library/cta/CTA01',
  description: 'Premium editorial closing call-to-action with primary and secondary actions.',
  status: 'ready',
  version: '1.0.0',
  tags: ['editorial', 'closing', 'premium'],
  industries: ['saas', 'product', 'professional'],
  author: 'ALai Design System',
  createdAt: '2026-07-04',
  updatedAt: '2026-07-04',
  previewImage: '',
  component: CTA01,
  props: [
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: cta01DefaultProps.eyebrow,
    },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: cta01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: cta01DefaultProps.subtitle,
    },
    {
      key: 'primaryLabel',
      type: 'text',
      label: 'Primary Label',
      defaultValue: cta01DefaultProps.primaryLabel,
    },
    {
      key: 'primaryHref',
      type: 'text',
      label: 'Primary Link',
      defaultValue: cta01DefaultProps.primaryHref,
    },
    {
      key: 'secondaryLabel',
      type: 'text',
      label: 'Secondary Label',
      defaultValue: cta01DefaultProps.secondaryLabel,
    },
    {
      key: 'secondaryHref',
      type: 'text',
      label: 'Secondary Link',
      defaultValue: cta01DefaultProps.secondaryHref,
    },
  ],
  exportFiles: ['CTA01.tsx', 'CTA01.css', 'index.ts'],
  variants: [
    { id: 'centered', name: 'Centered', description: 'Everything centered, single column, no surface.' },
    { id: 'boxed', name: 'Boxed', description: 'Content inset into a bordered, surfaced card.' },
    { id: 'split', name: 'Split', description: 'Content left, actions right, stacks on narrow widths.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: cta01DefaultStyle.containerWidth,
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: cta01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: cta01DefaultStyle.paddingBottom,
    },
    {
      key: 'surface',
      type: 'boolean',
      label: 'Background Surface',
      defaultValue: cta01DefaultStyle.surface,
    },
    {
      key: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: cta01DefaultStyle.alignment,
      options: ['center', 'left'],
    },
  ],
}

export default CTA01Manifest
