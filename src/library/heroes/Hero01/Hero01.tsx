import type { CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Hero01.css'

export type Hero01Props = {
  eyebrow: string
  title: string
  subtitle: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  backgroundColor: string
  theme?: ProjectTheme
}

export const hero01DefaultProps: Hero01Props = {
  eyebrow: 'ALai Design System',
  title: 'Build premium websites from a living system.',
  subtitle:
    'Compose polished marketing experiences with modular sections, clear editing controls, and a scalable component library.',
  primaryCtaText: 'Start Building',
  primaryCtaHref: '#start-building',
  secondaryCtaText: 'Explore Components',
  secondaryCtaHref: '#explore-components',
  backgroundColor: '#fff6f0',
}

function Hero01({
  eyebrow = hero01DefaultProps.eyebrow,
  title = hero01DefaultProps.title,
  subtitle = hero01DefaultProps.subtitle,
  primaryCtaText = hero01DefaultProps.primaryCtaText,
  primaryCtaHref = hero01DefaultProps.primaryCtaHref,
  secondaryCtaText = hero01DefaultProps.secondaryCtaText,
  secondaryCtaHref = hero01DefaultProps.secondaryCtaHref,
  backgroundColor = hero01DefaultProps.backgroundColor,
  theme: _theme,
}: Hero01Props) {
  return (
    <section
      className="hero01"
      style={{ '--hero01-background': backgroundColor } as CSSProperties}
    >
      <div className="hero01__content">
        <p className="hero01__eyebrow">{eyebrow}</p>
        <h1 className="hero01__title">{title}</h1>
        <p className="hero01__subtitle">{subtitle}</p>
        <div className="hero01__actions">
          <a className="hero01__cta hero01__cta--primary" href={primaryCtaHref}>
            {primaryCtaText}
          </a>
          <a className="hero01__cta hero01__cta--secondary" href={secondaryCtaHref}>
            {secondaryCtaText}
          </a>
        </div>
      </div>

      <div className="hero01__visual" aria-hidden="true">
        <div className="hero01__visual-panel">
          <div className="hero01__visual-badge">Visual Panel</div>
          <div className="hero01__visual-grid">
            <span className="hero01__visual-card" />
            <span className="hero01__visual-card hero01__visual-card--accent" />
            <span className="hero01__visual-card hero01__visual-card--wide" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero01
