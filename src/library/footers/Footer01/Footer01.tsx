import type { CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Footer01.css'

export type Footer01Props = {
  logoText: string
  description: string
  email: string
  phone: string
  copyrightText: string
  backgroundColor: string
  theme?: ProjectTheme
}

export const footer01DefaultProps: Footer01Props = {
  logoText: 'ALai',
  description:
    'A premium design system for composing polished websites with clarity, speed, and consistency.',
  email: 'hello@alai.design',
  phone: '+1 (555) 014-2211',
  copyrightText: '© 2026 ALai Design System. All rights reserved.',
  backgroundColor: '#ffffff',
}

const defaultLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

function Footer01({
  logoText = footer01DefaultProps.logoText,
  description = footer01DefaultProps.description,
  email = footer01DefaultProps.email,
  phone = footer01DefaultProps.phone,
  copyrightText = footer01DefaultProps.copyrightText,
  backgroundColor = footer01DefaultProps.backgroundColor,
  theme: _theme,
}: Footer01Props) {
  return (
    <footer
      className="footer01"
      style={{ '--footer01-background': backgroundColor } as CSSProperties}
    >
      <div className="footer01__top">
        <div className="footer01__brand">
          <span className="footer01__logo-mark">A</span>
          <div>
            <p className="footer01__logo-text">{logoText}</p>
            <p className="footer01__description">{description}</p>
          </div>
        </div>

        <nav className="footer01__nav" aria-label="Footer">
          {defaultLinks.map((link) => (
            <a key={link.label} className="footer01__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer01__bottom">
        <div className="footer01__contact">
          <a className="footer01__contact-link" href={`mailto:${email}`}>
            {email}
          </a>
          <a className="footer01__contact-link" href={`tel:${phone}`}>
            {phone}
          </a>
        </div>

        <p className="footer01__copyright">{copyrightText}</p>
      </div>
    </footer>
  )
}

export default Footer01
