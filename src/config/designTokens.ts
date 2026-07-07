export interface ColorTokens {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  muted: string
}

export interface SpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

export interface TypographyTokens {
  fontFamily: string
}

export interface RadiusTokens {
  sm: string
  md: string
  lg: string
}

export interface ShadowTokens {
  sm: string
  lg: string
}

export interface TransitionTokens {
  fast: string
  base: string
}

export interface ZIndexTokens {
  base: number
  sticky: number
  overlay: number
}

export interface ContainerTokens {
  width: string
}

export interface DesignTokens {
  colors: ColorTokens
  spacing: SpacingTokens
  typography: TypographyTokens
  radius: RadiusTokens
  shadows: ShadowTokens
  transitions: TransitionTokens
  zIndex: ZIndexTokens
  container: ContainerTokens
}

// Fixed defaults for token dimensions the editable Theme doesn't expose a
// control for (yet). These are not derived from ProjectTheme — there is no
// corresponding theme field — so every project gets the same values today.
export const staticSpacingTokens: SpacingTokens = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
}

export const staticTransitionTokens: TransitionTokens = {
  fast: '120ms ease',
  base: '160ms ease',
}

export const staticZIndexTokens: ZIndexTokens = {
  base: 1,
  sticky: 20,
  overlay: 50,
}
