import { useState, type CSSProperties } from 'react'
import { staticZIndexTokens } from '../../../config/designTokens'
import type { ProjectTheme } from '../../../config/theme'
import './Header01.css'

type Header01Link = {
  label: string
  href: string
}

export type Header01Variant = 'classic' | 'centered' | 'minimal'

export type Header01Style = {
  containerWidth?: number
  sticky?: boolean
  transparent?: boolean
  shadow?: boolean
  borderBottom?: boolean
}

export type Header01Props = {
  logoText: string
  logoHref: string
  ctaText: string
  ctaHref: string
  theme?: ProjectTheme
  variantId?: string
  style?: Header01Style
}

export const header01DefaultProps: Header01Props = {
  logoText: 'ALai',
  logoHref: '/',
  ctaText: 'Get Started',
  ctaHref: '#get-started',
}

export const header01DefaultStyle: Required<Header01Style> = {
  containerWidth: 1200,
  sticky: false,
  transparent: false,
  shadow: true,
  borderBottom: true,
}

const header01Variants: Header01Variant[] = ['classic', 'centered', 'minimal']

function resolveHeader01Variant(variantId?: string): Header01Variant {
  return header01Variants.find((variant) => variant === variantId) ?? 'classic'
}

const defaultLinks: Header01Link[] = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

function Header01({
  logoText = header01DefaultProps.logoText,
  logoHref = header01DefaultProps.logoHref,
  ctaText = header01DefaultProps.ctaText,
  ctaHref = header01DefaultProps.ctaHref,
  theme: _theme,
  variantId,
  style,
}: Header01Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const variant = resolveHeader01Variant(variantId)
  const resolvedStyle = { ...header01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    position: resolvedStyle.sticky ? 'sticky' : undefined,
    top: resolvedStyle.sticky ? 0 : undefined,
    zIndex: resolvedStyle.sticky ? staticZIndexTokens.sticky : undefined,
    background: resolvedStyle.transparent ? 'transparent' : undefined,
    boxShadow: resolvedStyle.shadow ? undefined : 'none',
    borderBottom: resolvedStyle.borderBottom ? undefined : 'none',
  }

  return (
    <header className={`header01 header01--${variant}`} style={rootStyle}>
      <div className="header01__inner" style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}>
        <a className="header01__brand" href={logoHref}>
          <span className="header01__brand-mark">A</span>
          <span className="header01__brand-text">{logoText}</span>
        </a>

        <button
          aria-controls="header01-navigation"
          aria-expanded={isMenuOpen}
          className="header01__menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
        >
          Menu
        </button>

        <div
          className={`header01__panel${isMenuOpen ? ' header01__panel--open' : ''}`}
        >
          <nav className="header01__nav" id="header01-navigation" aria-label="Primary">
            {defaultLinks.map((link) => (
              <a key={link.label} className="header01__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="header01__cta" href={ctaHref}>
            {ctaText}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header01
