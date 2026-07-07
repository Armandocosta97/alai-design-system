import type { ComponentManifest } from '../../../config/componentManifest'
import FAQ01 from './FAQ01'
import { faq01DefaultProps, faq01DefaultStyle } from './FAQ01'

const FAQ01Manifest: ComponentManifest = {
  id: 'FAQ01',
  name: 'FAQ 01',
  category: 'faq',
  sourceFolder: 'src/library/faq/FAQ01',
  description: 'Calm editorial FAQ accordion with six questions, one open at a time.',
  status: 'ready',
  version: '1.0.0',
  tags: ['editorial', 'accordion', 'premium'],
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
  component: FAQ01,
  props: [
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: faq01DefaultProps.eyebrow,
    },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: faq01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: faq01DefaultProps.subtitle,
    },
    {
      key: 'faq1Question',
      type: 'text',
      label: 'FAQ 1 Question',
      defaultValue: faq01DefaultProps.faq1Question,
    },
    {
      key: 'faq1Answer',
      type: 'textarea',
      label: 'FAQ 1 Answer',
      defaultValue: faq01DefaultProps.faq1Answer,
    },
    {
      key: 'faq2Question',
      type: 'text',
      label: 'FAQ 2 Question',
      defaultValue: faq01DefaultProps.faq2Question,
    },
    {
      key: 'faq2Answer',
      type: 'textarea',
      label: 'FAQ 2 Answer',
      defaultValue: faq01DefaultProps.faq2Answer,
    },
    {
      key: 'faq3Question',
      type: 'text',
      label: 'FAQ 3 Question',
      defaultValue: faq01DefaultProps.faq3Question,
    },
    {
      key: 'faq3Answer',
      type: 'textarea',
      label: 'FAQ 3 Answer',
      defaultValue: faq01DefaultProps.faq3Answer,
    },
    {
      key: 'faq4Question',
      type: 'text',
      label: 'FAQ 4 Question',
      defaultValue: faq01DefaultProps.faq4Question,
    },
    {
      key: 'faq4Answer',
      type: 'textarea',
      label: 'FAQ 4 Answer',
      defaultValue: faq01DefaultProps.faq4Answer,
    },
    {
      key: 'faq5Question',
      type: 'text',
      label: 'FAQ 5 Question',
      defaultValue: faq01DefaultProps.faq5Question,
    },
    {
      key: 'faq5Answer',
      type: 'textarea',
      label: 'FAQ 5 Answer',
      defaultValue: faq01DefaultProps.faq5Answer,
    },
    {
      key: 'faq6Question',
      type: 'text',
      label: 'FAQ 6 Question',
      defaultValue: faq01DefaultProps.faq6Question,
    },
    {
      key: 'faq6Answer',
      type: 'textarea',
      label: 'FAQ 6 Answer',
      defaultValue: faq01DefaultProps.faq6Answer,
    },
  ],
  exportFiles: ['FAQ01.tsx', 'FAQ01.css', 'index.ts'],
  variants: [
    { id: 'centered', name: 'Centered', description: 'Header and list centered, single column.' },
    { id: 'split', name: 'Split', description: 'Header left, list right, stacks on narrow widths.' },
    { id: 'minimal-list', name: 'Minimal List', description: 'Tighter rhythm, quietest possible treatment.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: faq01DefaultStyle.containerWidth,
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: faq01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: faq01DefaultStyle.paddingBottom,
    },
    {
      key: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: faq01DefaultStyle.alignment,
      options: ['center', 'left'],
    },
    {
      key: 'showDivider',
      type: 'boolean',
      label: 'Show Divider',
      defaultValue: faq01DefaultStyle.showDivider,
    },
  ],
}

export default FAQ01Manifest
