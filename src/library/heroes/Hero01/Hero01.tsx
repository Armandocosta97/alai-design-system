import { useId, type CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './Hero01.css'

export type Hero01Variant = 'split' | 'centered'

export type Hero01Style = {
  contentMaxWidth?: number
  textAlign?: 'left' | 'center' | 'right'
  paddingTop?: number
  paddingBottom?: number
}

export type Hero01Props = {
  eyebrow: string
  title: string
  subtitle: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  backgroundColor: string
  heroImageAssetId: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: Hero01Style
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
  heroImageAssetId: '',
}

export const hero01DefaultStyle: Required<Hero01Style> = {
  contentMaxWidth: 640,
  textAlign: 'left',
  paddingTop: 48,
  paddingBottom: 48,
}

const hero01Variants: Hero01Variant[] = ['split', 'centered']

function resolveHero01Variant(variantId?: string): Hero01Variant {
  return hero01Variants.find((variant) => variant === variantId) ?? 'split'
}

const hero01JustifyContentByTextAlign: Record<NonNullable<Hero01Style['textAlign']>, CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
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
  heroImageAssetId = hero01DefaultProps.heroImageAssetId,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: Hero01Props) {
  const titleId = useId()
  const heroImage = assets.find((asset) => asset.id === heroImageAssetId)
  const variant = resolveHero01Variant(variantId)
  const resolvedStyle = { ...hero01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    ...((backgroundColor ? { '--hero01-background': backgroundColor } : {}) as CSSProperties),
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  return (
    <section className={`hero01 hero01--${variant}`} style={rootStyle} aria-labelledby={titleId}>
      <div
        className="hero01__content"
        style={{ maxWidth: resolvedStyle.contentMaxWidth, textAlign: resolvedStyle.textAlign }}
      >
        <p className="hero01__eyebrow">{eyebrow}</p>
        <h1 className="hero01__title" id={titleId}>
          {title}
        </h1>
        <p className="hero01__subtitle">{subtitle}</p>
        <div
          className="hero01__actions"
          style={{ justifyContent: hero01JustifyContentByTextAlign[resolvedStyle.textAlign] }}
        >
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
          {heroImage ? (
            <div className="hero01__visual-image-wrap">
              <img className="hero01__visual-image" src={heroImage.url} alt={heroImage.name} />
            </div>
          ) : (
            <div className="hero01__visual-grid">
              <span className="hero01__visual-card" />
              <span className="hero01__visual-card hero01__visual-card--accent" />
              <span className="hero01__visual-card hero01__visual-card--wide" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero01
