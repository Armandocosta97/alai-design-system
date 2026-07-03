import type { ComponentManifest } from '../../../config/componentManifest'
import Footer01 from './Footer01'
import { footer01DefaultProps } from './Footer01'

const Footer01Manifest: ComponentManifest = {
  id: 'Footer01',
  name: 'Footer 01',
  category: 'footers',
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
}

export default Footer01Manifest
