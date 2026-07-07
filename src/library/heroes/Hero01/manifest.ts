import type { ComponentManifest } from '../../../config/componentManifest'
import Hero01 from './Hero01'
import { hero01DefaultProps, hero01DefaultStyle } from './Hero01'

const Hero01Manifest: ComponentManifest = {
  id: 'Hero01',
  name: 'Hero 01',
  category: 'heroes',
  sourceFolder: 'src/library/heroes/Hero01',
  description: 'Large premium hero section with dual call-to-actions and a visual panel.',
  status: 'ready',
  version: '1.0.0',
  tags: ['premium', 'editorial', 'responsive'],
  industries: ['local business', 'restaurant', 'professional'],
  author: 'ALai Design System',
  createdAt: '2026-07-04',
  updatedAt: '2026-07-04',
  previewImage: '',
  component: Hero01,
  props: [
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: hero01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: hero01DefaultProps.subtitle,
    },
    {
      key: 'primaryCtaText',
      type: 'text',
      label: 'Primary CTA Text',
      defaultValue: hero01DefaultProps.primaryCtaText,
    },
    {
      key: 'primaryCtaHref',
      type: 'text',
      label: 'Primary CTA Link',
      defaultValue: hero01DefaultProps.primaryCtaHref,
    },
    {
      key: 'secondaryCtaText',
      type: 'text',
      label: 'Secondary CTA Text',
      defaultValue: hero01DefaultProps.secondaryCtaText,
    },
    {
      key: 'secondaryCtaHref',
      type: 'text',
      label: 'Secondary CTA Link',
      defaultValue: hero01DefaultProps.secondaryCtaHref,
    },
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: hero01DefaultProps.eyebrow,
    },
    {
      key: 'backgroundColor',
      type: 'color',
      label: 'Background Color',
      defaultValue: hero01DefaultProps.backgroundColor,
    },
    {
      key: 'heroImageAssetId',
      type: 'image',
      label: 'Hero Image',
      defaultValue: hero01DefaultProps.heroImageAssetId,
    },
  ],
  exportFiles: ['Hero01.tsx', 'Hero01.css', 'index.ts'],
  variants: [
    { id: 'split', name: 'Split', description: 'Content and visual panel side by side.' },
    { id: 'centered', name: 'Centered', description: 'Centered content, visual panel hidden.' },
  ],
  styleControls: [
    {
      key: 'contentMaxWidth',
      type: 'number',
      label: 'Content Max Width',
      defaultValue: hero01DefaultStyle.contentMaxWidth,
    },
    {
      key: 'textAlign',
      type: 'select',
      label: 'Text Align',
      defaultValue: hero01DefaultStyle.textAlign,
      options: ['left', 'center', 'right'],
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: hero01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: hero01DefaultStyle.paddingBottom,
    },
  ],
}

export default Hero01Manifest
