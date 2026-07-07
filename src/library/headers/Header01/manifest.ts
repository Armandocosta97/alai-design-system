import type { ComponentManifest } from '../../../config/componentManifest'
import Header01 from './Header01'
import { header01DefaultProps, header01DefaultStyle } from './Header01'

const Header01Manifest: ComponentManifest = {
  id: 'Header01',
  name: 'Header 01',
  category: 'headers',
  sourceFolder: 'src/library/headers/Header01',
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
  exportFiles: ['Header01.tsx', 'Header01.css', 'index.ts'],
  variants: [
    { id: 'classic', name: 'Classic', description: 'Logo left, nav and CTA right.' },
    { id: 'centered', name: 'Centered', description: 'Logo, nav, and CTA centered.' },
    { id: 'minimal', name: 'Minimal', description: 'Logo and CTA only, nav hidden.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: header01DefaultStyle.containerWidth,
    },
    {
      key: 'sticky',
      type: 'boolean',
      label: 'Sticky',
      defaultValue: header01DefaultStyle.sticky,
    },
    {
      key: 'transparent',
      type: 'boolean',
      label: 'Transparent',
      defaultValue: header01DefaultStyle.transparent,
    },
    {
      key: 'shadow',
      type: 'boolean',
      label: 'Shadow',
      defaultValue: header01DefaultStyle.shadow,
    },
    {
      key: 'borderBottom',
      type: 'boolean',
      label: 'Border Bottom',
      defaultValue: header01DefaultStyle.borderBottom,
    },
  ],
}

export default Header01Manifest
