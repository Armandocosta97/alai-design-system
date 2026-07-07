import type { ComponentManifest } from '../../../config/componentManifest'
import Footer01 from './Footer01'
import { footer01DefaultProps, footer01DefaultStyle } from './Footer01'

const Footer01Manifest: ComponentManifest = {
  id: 'Footer01',
  name: 'Footer 01',
  category: 'footers',
  sourceFolder: 'src/library/footers/Footer01',
  description: 'Premium minimal footer with contact details, static navigation, and brand summary.',
  status: 'ready',
  version: '1.0.0',
  tags: ['minimal', 'responsive', 'premium'],
  industries: ['local business', 'restaurant', 'professional'],
  author: 'ALai Design System',
  createdAt: '2026-07-04',
  updatedAt: '2026-07-04',
  previewImage: '',
  component: Footer01,
  props: [
    {
      key: 'logoText',
      type: 'text',
      label: 'Logo Text',
      defaultValue: footer01DefaultProps.logoText,
    },
    {
      key: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: footer01DefaultProps.description,
    },
    {
      key: 'email',
      type: 'text',
      label: 'Email',
      defaultValue: footer01DefaultProps.email,
    },
    {
      key: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: footer01DefaultProps.phone,
    },
    {
      key: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: footer01DefaultProps.copyrightText,
    },
    {
      key: 'backgroundColor',
      type: 'color',
      label: 'Background Color',
      defaultValue: footer01DefaultProps.backgroundColor,
    },
  ],
  exportFiles: ['Footer01.tsx', 'Footer01.css', 'index.ts'],
  variants: [
    { id: 'classic', name: 'Classic', description: 'Brand and nav row, contact and copyright row.' },
    { id: 'minimal', name: 'Minimal', description: 'Centered brand and copyright only.' },
  ],
  styleControls: [
    {
      key: 'padding',
      type: 'number',
      label: 'Padding',
      defaultValue: footer01DefaultStyle.padding,
    },
    {
      key: 'borderTop',
      type: 'boolean',
      label: 'Border Top',
      defaultValue: footer01DefaultStyle.borderTop,
    },
  ],
}

export default Footer01Manifest
