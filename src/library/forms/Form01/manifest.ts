import type { ComponentManifest } from '../../../config/componentManifest'
import Form01 from './Form01'
import { form01DefaultProps, form01DefaultStyle } from './Form01'

const Form01Manifest: ComponentManifest = {
  id: 'Form01',
  name: 'Form 01',
  category: 'forms',
  sourceFolder: 'src/library/forms/Form01',
  description: 'Contact/lead form section with name, email, phone, and message fields, plus an optional side contact panel.',
  status: 'ready',
  version: '1.0.0',
  tags: ['form', 'contact', 'lead-gen'],
  industries: ['saas', 'agency', 'freelancer', 'consultant', 'local business', 'professional'],
  author: 'ALai Design System',
  createdAt: '2026-07-08',
  updatedAt: '2026-07-08',
  previewImage: '',
  component: Form01,
  props: [
    {
      key: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: form01DefaultProps.eyebrow,
    },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: form01DefaultProps.title,
    },
    {
      key: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: form01DefaultProps.subtitle,
    },
    {
      key: 'formTitle',
      type: 'text',
      label: 'Form Title',
      defaultValue: form01DefaultProps.formTitle,
    },
    {
      key: 'formDescription',
      type: 'textarea',
      label: 'Form Description',
      defaultValue: form01DefaultProps.formDescription,
      description: 'Optional. Left empty, no description renders above the fields.',
    },
    {
      key: 'nameLabel',
      type: 'text',
      label: 'Name Field Label',
      defaultValue: form01DefaultProps.nameLabel,
    },
    {
      key: 'emailLabel',
      type: 'text',
      label: 'Email Field Label',
      defaultValue: form01DefaultProps.emailLabel,
    },
    {
      key: 'phoneLabel',
      type: 'text',
      label: 'Phone Field Label',
      defaultValue: form01DefaultProps.phoneLabel,
    },
    {
      key: 'messageLabel',
      type: 'text',
      label: 'Message Field Label',
      defaultValue: form01DefaultProps.messageLabel,
    },
    {
      key: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: form01DefaultProps.submitLabel,
    },
    {
      key: 'formAction',
      type: 'text',
      label: 'Form Action (optional)',
      defaultValue: form01DefaultProps.formAction,
      description:
        'Optional. A real form endpoint URL (e.g. a Formspree or Netlify Forms action). Left empty, the form is a static demo: submit is intercepted so the page never navigates away or implies a message was sent.',
    },
    {
      key: 'helperNote',
      type: 'text',
      label: 'Helper Note',
      defaultValue: form01DefaultProps.helperNote,
      description:
        'Optional text shown below the submit button once a Form Action is configured. Ignored while no Form Action is set — a fixed demo notice renders there instead.',
    },
    {
      key: 'sideTitle',
      type: 'text',
      label: 'Side Panel Title',
      defaultValue: form01DefaultProps.sideTitle,
    },
    {
      key: 'sideDescription',
      type: 'textarea',
      label: 'Side Panel Description',
      defaultValue: form01DefaultProps.sideDescription,
      description: 'Optional. Left empty, no description renders in the side panel.',
    },
    {
      key: 'email',
      type: 'text',
      label: 'Email',
      defaultValue: form01DefaultProps.email,
      description: 'Optional. Left empty, no email link renders in the side panel.',
    },
    {
      key: 'phone',
      type: 'text',
      label: 'Phone',
      defaultValue: form01DefaultProps.phone,
      description: 'Optional. Left empty, no phone link renders in the side panel.',
    },
    {
      key: 'address',
      type: 'textarea',
      label: 'Address',
      defaultValue: form01DefaultProps.address,
      description: 'Optional. Left empty, no address renders in the side panel.',
    },
    {
      key: 'openingHours',
      type: 'text',
      label: 'Opening Hours',
      defaultValue: form01DefaultProps.openingHours,
      description: 'Optional. Left empty, no opening hours render in the side panel.',
    },
  ],
  exportFiles: ['Form01.tsx', 'Form01.css', 'index.ts'],
  variants: [
    { id: 'split', name: 'Split', description: 'Form and side panel side by side, stacks on narrow widths.' },
    { id: 'card', name: 'Card', description: 'Form inset into a bordered/surfaced card, single column.' },
    { id: 'stacked', name: 'Stacked', description: 'Single column, form above the side panel.' },
  ],
  styleControls: [
    {
      key: 'containerWidth',
      type: 'number',
      label: 'Container Width',
      defaultValue: form01DefaultStyle.containerWidth,
    },
    {
      key: 'paddingTop',
      type: 'number',
      label: 'Padding Top',
      defaultValue: form01DefaultStyle.paddingTop,
    },
    {
      key: 'paddingBottom',
      type: 'number',
      label: 'Padding Bottom',
      defaultValue: form01DefaultStyle.paddingBottom,
    },
    {
      key: 'alignment',
      type: 'select',
      label: 'Header Alignment',
      defaultValue: form01DefaultStyle.alignment,
      options: ['center', 'left'],
    },
    {
      key: 'surface',
      type: 'boolean',
      label: 'Background Surface',
      defaultValue: form01DefaultStyle.surface,
    },
    {
      key: 'fieldStyle',
      type: 'select',
      label: 'Field Style',
      defaultValue: form01DefaultStyle.fieldStyle,
      options: ['outline', 'filled', 'underline'],
    },
    {
      key: 'showSidePanel',
      type: 'boolean',
      label: 'Show Side Panel',
      defaultValue: form01DefaultStyle.showSidePanel,
    },
  ],
}

export default Form01Manifest
