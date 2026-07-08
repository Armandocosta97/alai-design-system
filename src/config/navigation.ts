export type NavigationItem = {
  label: string
  path: string
  category: string
}

export const navigationItems: NavigationItem[] = [
  { label: 'Home', path: '/', category: 'core' },
  { label: 'Builder', path: '/builder', category: 'core' },
  { label: 'Assets', path: '/assets', category: 'core' },
  { label: 'Templates', path: '/templates', category: 'core' },
  { label: 'Import Project', path: '/import', category: 'core' },
  { label: 'Headers', path: '/headers', category: 'sections' },
  { label: 'Heroes', path: '/heroes', category: 'sections' },
  { label: 'Logo Cloud', path: '/logocloud', category: 'sections' },
  { label: 'Services', path: '/services', category: 'sections' },
  { label: 'Features', path: '/features', category: 'sections' },
  { label: 'Stats', path: '/stats', category: 'sections' },
  { label: 'Gallery', path: '/gallery', category: 'sections' },
  { label: 'Team', path: '/team', category: 'sections' },
  { label: 'Process', path: '/process', category: 'sections' },
  { label: 'Testimonials', path: '/testimonials', category: 'sections' },
  { label: 'Pricing', path: '/pricing', category: 'sections' },
  { label: 'FAQ', path: '/faq', category: 'sections' },
  { label: 'CTA', path: '/cta', category: 'sections' },
  { label: 'Forms', path: '/forms', category: 'sections' },
  { label: 'Contact', path: '/contact', category: 'sections' },
  { label: 'Footers', path: '/footers', category: 'sections' },
  { label: 'Navigation', path: '/navigation', category: 'elements' },
  { label: 'Buttons', path: '/buttons', category: 'elements' },
  { label: 'Cards', path: '/cards', category: 'elements' },
  { label: 'Typography', path: '/typography', category: 'foundations' },
  { label: 'Animations', path: '/animations', category: 'foundations' },
  { label: 'Icons', path: '/icons', category: 'foundations' },
  { label: 'Developer Tools', path: '/developer-tools', category: 'foundations' },
  { label: 'Component Creator', path: '/component-creator', category: 'foundations' },
]
