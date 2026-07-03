import { useState } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Header01.css'

type Header01Link = {
  label: string
  href: string
}

export type Header01Props = {
  logoText: string
  logoHref: string
  ctaText: string
  ctaHref: string
  theme?: ProjectTheme
}

export const header01DefaultProps: Header01Props = {
  logoText: 'ALai',
  logoHref: '/',
  ctaText: 'Get Started',
  ctaHref: '#get-started',
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
}: Header01Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header01">
      <div className="header01__inner">
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
