import type { ComponentManifest } from '../../../config/componentManifest'
import Contact01 from './Contact01'
import { contact01DefaultProps, contact01DefaultStyle } from './Contact01'

const Contact01Manifest: ComponentManifest = {
  id: 'Contact01',
  name: 'Contact 01',
  category: 'contact',
  sourceFolder: 'src/library/contact/Contact01',
  description: 'Premium editorial contact section with business details, tel/mailto links, and optional CTA.',
  status: 'ready',
  version: '1.0.0',
  tags: ['editorial', 'contact', 'premium'],
  industries: [
    'agency',
    'freelancer',
    'restaurant',
    'hotel',
    'healthcare',
    'consultant',
    'artisan',
    'photographer',
    'local business',
  ],
  author: 'ALai Design System',
  createdAt: '2026-07-05',
  updatedAt: '2026-07-05',
  previewImage: '',
  component: Contact01,
  props: [
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: contact01DefaultProps.eyebrow,
    },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: contact01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: contact01DefaultProps.subtitle,
    },
    {
      key: 'businessName',
      type: 'text',
      label: 'Business Name',
      defaultValue: contact01DefaultProps.businessName,
    },
    {
      key: 'address',
      type: 'textarea',
      label: 'Address',
      defaultValue: contact01DefaultProps.address,
    },
    {
      key: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: contact01DefaultProps.phone,
    },
    {
      key: 'email',
      type: 'text',
      label: 'Email',
      defaultValue: contact01DefaultProps.email,
    },
    {
      key: 'openingHours',
      type: 'textarea',
      label: 'Opening Hours',
      defaultValue: contact01DefaultProps.openingHours,
    },
    {
      key: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
      defaultValue: contact01DefaultProps.ctaLabel,
    },
    {
      key: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
      defaultValue: contact01DefaultProps.ctaHref,
    },
    {
      key: 'directionsLabel',
      type: 'text',
      label: 'Directions Label',
      defaultValue: contact01DefaultProps.directionsLabel,
    },
    {
      key: 'directionsUrl',
      type: 'text',
      label: 'Directions Link',
      defaultValue: contact01DefaultProps.directionsUrl,
    },
  ],
  exportFiles: ['Contact01.tsx', 'Contact01.css', 'index.ts'],
  variants: [
    { id: 'centered', name: 'Centered', description: 'Header and details centered, single column.' },
    { id: 'split', name: 'Split', description: 'Header left, details right, stacks on narrow widths.' },
    { id: 'information-card', name: 'Information Card', description: 'Details inset into a bordered, surfaced panel.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: contact01DefaultStyle.containerWidth,
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: contact01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: contact01DefaultStyle.paddingBottom,
    },
    {
      key: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: contact01DefaultStyle.alignment,
      options: ['center', 'left'],
    },
    {
      key: 'surface',
      type: 'boolean',
      label: 'Background Surface',
      defaultValue: contact01DefaultStyle.surface,
    },
    {
      key: 'dividerStyle',
      type: 'select',
      label: 'Divider Style',
      defaultValue: contact01DefaultStyle.dividerStyle,
      options: ['none', 'line'],
    },
  ],
}

export default Contact01Manifest
