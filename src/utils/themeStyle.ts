import type { CSSProperties } from 'react'
import type { ProjectTheme } from '../config/theme'
import { themeToDesignTokens } from './themeTokens'

/**
 * Flattens the full Design Token set (derived from the Theme) into CSS custom
 * property entries. Existing var names (--color-*, --radius, --shadow,
 * --font-family, --container-width) are preserved unchanged for full backward
 * compatibility — everything else here is additive.
 */
export function getThemeCssEntries(theme: ProjectTheme): [string, string | number][] {
  const tokens = themeToDesignTokens(theme)

  return [
    ['--color-primary', tokens.colors.primary],
    ['--color-secondary', tokens.colors.secondary],
    ['--color-background', tokens.colors.background],
    ['--color-surface', tokens.colors.surface],
    ['--color-text', tokens.colors.text],
    ['--color-muted', tokens.colors.muted],
    ['--radius', theme.borderRadius],
    ['--radius-sm', tokens.radius.sm],
    ['--radius-md', tokens.radius.md],
    ['--radius-lg', tokens.radius.lg],
    ['--container-width', tokens.container.width],
    ['--font-family', tokens.typography.fontFamily],
    ['--shadow', theme.shadow],
    ['--shadow-sm', tokens.shadows.sm],
    ['--shadow-lg', tokens.shadows.lg],
    ['--space-xs', tokens.spacing.xs],
    ['--space-sm', tokens.spacing.sm],
    ['--space-md', tokens.spacing.md],
    ['--space-lg', tokens.spacing.lg],
    ['--space-xl', tokens.spacing.xl],
    ['--transition-fast', tokens.transitions.fast],
    ['--transition-base', tokens.transitions.base],
    ['--z-base', tokens.zIndex.base],
    ['--z-sticky', tokens.zIndex.sticky],
    ['--z-overlay', tokens.zIndex.overlay],
  ]
}

/** Maps a ProjectTheme to the CSS custom properties every component reads. */
export function toThemeStyle(theme: ProjectTheme): CSSProperties {
  return Object.fromEntries(getThemeCssEntries(theme)) as CSSProperties
}
