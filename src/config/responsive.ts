export type Breakpoint = 'desktop' | 'tablet' | 'mobile'

export const BREAKPOINTS: Breakpoint[] = ['desktop', 'tablet', 'mobile']

export const DEFAULT_BREAKPOINT: Breakpoint = 'desktop'

export const BREAKPOINT_LABELS: Record<Breakpoint, string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
}
