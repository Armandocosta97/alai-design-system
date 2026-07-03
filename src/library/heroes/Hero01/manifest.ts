import type { ComponentManifest } from '../../../config/componentManifest'
import Hero01 from './Hero01'
import { hero01DefaultProps } from './Hero01'

const Hero01Manifest: ComponentManifest = {
  id: 'Hero01',
  name: 'Hero 01',
  category: 'heroes',
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
  ],
}

export default Hero01Manifest
