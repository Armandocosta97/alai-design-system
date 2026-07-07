import type { ComponentManifest } from '../../../config/componentManifest'
import Process01 from './Process01'
import { process01DefaultProps, process01DefaultStyle } from './Process01'

const numberFormatDescription =
  'Plain text — never validated or auto-generated. Recommended format: "01", "02", "03", "04".'

const Process01Manifest: ComponentManifest = {
  id: 'Process01',
  name: 'Process 01',
  category: 'process',
  sourceFolder: 'src/library/process/Process01',
  description: 'Calm four-step process section, pure typography with no timeline graphics.',
  status: 'ready',
  version: '1.0.0',
  tags: ['editorial', 'process', 'premium'],
  industries: [
    'agency',
    'consultant',
    'freelancer',
    'architect',
    'healthcare',
    'photographer',
    'restaurant',
    'hotel',
    'artisan',
    'local business',
    'saas',
  ],
  author: 'ALai Design System',
  createdAt: '2026-07-07',
  updatedAt: '2026-07-07',
  previewImage: '',
  component: Process01,
  props: [
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: process01DefaultProps.eyebrow,
    },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: process01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: process01DefaultProps.subtitle,
    },
    {
      key: 'step1Number',
      type: 'text',
      label: 'Step 1 Number',
      defaultValue: process01DefaultProps.step1Number,
      description: numberFormatDescription,
    },
    {
      key: 'step1Title',
      type: 'text',
      label: 'Step 1 Title',
      defaultValue: process01DefaultProps.step1Title,
    },
    {
      key: 'step1Description',
      type: 'textarea',
      label: 'Step 1 Description',
      defaultValue: process01DefaultProps.step1Description,
    },
    {
      key: 'step2Number',
      type: 'text',
      label: 'Step 2 Number',
      defaultValue: process01DefaultProps.step2Number,
      description: numberFormatDescription,
    },
    {
      key: 'step2Title',
      type: 'text',
      label: 'Step 2 Title',
      defaultValue: process01DefaultProps.step2Title,
    },
    {
      key: 'step2Description',
      type: 'textarea',
      label: 'Step 2 Description',
      defaultValue: process01DefaultProps.step2Description,
    },
    {
      key: 'step3Number',
      type: 'text',
      label: 'Step 3 Number',
      defaultValue: process01DefaultProps.step3Number,
      description: numberFormatDescription,
    },
    {
      key: 'step3Title',
      type: 'text',
      label: 'Step 3 Title',
      defaultValue: process01DefaultProps.step3Title,
    },
    {
      key: 'step3Description',
      type: 'textarea',
      label: 'Step 3 Description',
      defaultValue: process01DefaultProps.step3Description,
    },
    {
      key: 'step4Number',
      type: 'text',
      label: 'Step 4 Number',
      defaultValue: process01DefaultProps.step4Number,
      description: numberFormatDescription,
    },
    {
      key: 'step4Title',
      type: 'text',
      label: 'Step 4 Title',
      defaultValue: process01DefaultProps.step4Title,
    },
    {
      key: 'step4Description',
      type: 'textarea',
      label: 'Step 4 Description',
      defaultValue: process01DefaultProps.step4Description,
    },
  ],
  exportFiles: ['Process01.tsx', 'Process01.css', 'index.ts'],
  variants: [
    { id: 'horizontal', name: 'Horizontal Steps', description: 'Four equal columns in a single row.' },
    { id: 'vertical', name: 'Vertical Steps', description: 'Four steps stacked in a single column.' },
    { id: 'editorial', name: 'Editorial', description: 'First step emphasized, the other three follow beneath.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: process01DefaultStyle.containerWidth,
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: process01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: process01DefaultStyle.paddingBottom,
    },
    {
      key: 'showDivider',
      type: 'boolean',
      label: 'Show Divider',
      defaultValue: process01DefaultStyle.showDivider,
    },
    {
      key: 'stepNumberStyle',
      type: 'select',
      label: 'Step Number Style',
      defaultValue: process01DefaultStyle.stepNumberStyle,
      options: ['badge', 'plain', 'outline'],
    },
    {
      key: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: process01DefaultStyle.alignment,
      options: ['center', 'left'],
    },
  ],
}

export default Process01Manifest
