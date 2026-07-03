import type { ComponentManifest } from '../../../config/componentManifest'
import Header01 from './Header01'
import { header01DefaultProps } from './Header01'

const Header01Manifest: ComponentManifest = {
  id: 'Header01',
  name: 'Header 01',
  category: 'headers',
  description: 'Minimal responsive header with navigation, logo area, CTA, and mobile menu.',
  status: 'ready',
  version: '1.0.0',
  tags: ['minimal', 'responsive', 'premium'],
  industries: ['local business', 'restaurant', 'professional'],
  author: 'ALai Design System',
  createdAt: '2026-07-04',
  updatedAt: '2026-07-04',
  previewImage: '',
  component: Header01,
  props: [
    {
      key: 'logoText',
      type: 'text',
      label: 'Logo Text',
      defaultValue: header01DefaultProps.logoText,
    },
    {
      key: 'logoHref',
      type: 'text',
      label: 'Logo Link',
      defaultValue: header01DefaultProps.logoHref,
    },
    {
      key: 'ctaText',
      type: 'text',
      label: 'CTA Text',
      defaultValue: header01DefaultProps.ctaText,
    },
    {
      key: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
      defaultValue: header01DefaultProps.ctaHref,
    },
  ],
}

export default Header01Manifest
