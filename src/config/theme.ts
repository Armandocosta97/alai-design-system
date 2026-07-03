export interface ProjectTheme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  surfaceColor: string
  textColor: string
  mutedColor: string
  borderRadius: string
  containerWidth: string
  fontFamily: string
  shadow: string
}

export const defaultProjectTheme: ProjectTheme = {
  primaryColor: '#ff6a1a',
  secondaryColor: '#111111',
  backgroundColor: '#f5f5f3',
  surfaceColor: '#ffffff',
  textColor: '#111111',
  mutedColor: 'rgba(17, 17, 17, 0.5)',
  borderRadius: '24px',
  containerWidth: '1200px',
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  shadow: '0 20px 60px rgba(17, 17, 17, 0.06)',
}
