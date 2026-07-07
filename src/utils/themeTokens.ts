import {
  staticSpacingTokens,
  staticTransitionTokens,
  staticZIndexTokens,
  type DesignTokens,
} from '../config/designTokens'
import type { ProjectTheme } from '../config/theme'

function parseLength(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatNumber(value: number): string {
  return Number(value.toFixed(4)).toString()
}

/** Scales a CSS length ("24px", "1.5rem", ...) by a ratio, keeping its unit. */
function scaleLength(value: string, ratio: number): string {
  const unitMatch = value.match(/[a-z%]+$/i)
  const unit = unitMatch ? unitMatch[0] : ''
  return `${formatNumber(parseLength(value) * ratio)}${unit}`
}

/**
 * The Theme stays the editable source of truth (10 simple fields). This
 * derives the full, semantic Design Token set components actually consume —
 * expanding single values (one radius, one shadow) into small scales, and
 * filling in token groups the Theme has no field for with fixed defaults.
 */
export function themeToDesignTokens(theme: ProjectTheme): DesignTokens {
  return {
    colors: {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      background: theme.backgroundColor,
      surface: theme.surfaceColor,
      text: theme.textColor,
      muted: theme.mutedColor,
    },
    spacing: staticSpacingTokens,
    typography: {
      fontFamily: theme.fontFamily,
    },
    radius: {
      sm: scaleLength(theme.borderRadius, 0.6),
      md: scaleLength(theme.borderRadius, 2 / 3),
      lg: theme.borderRadius,
    },
    shadows: {
      sm: '0 8px 20px rgba(17, 17, 17, 0.05)',
      lg: theme.shadow,
    },
    transitions: staticTransitionTokens,
    zIndex: staticZIndexTokens,
    container: {
      width: theme.containerWidth,
    },
  }
}
