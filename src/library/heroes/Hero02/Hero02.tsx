import { useId, type CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './Hero02.css'

export type Hero02Variant = 'split-image' | 'image-first' | 'editorial-overlay'

export type Hero02Radius = 'small' | 'medium' | 'large' | 'full'
export type Hero02Ratio = 'square' | 'portrait' | 'landscape' | 'original'
export type Hero02ContentAlignment = 'left' | 'center'

export type Hero02Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  imageRadius?: Hero02Radius
  imageRatio?: Hero02Ratio
  contentAlignment?: Hero02ContentAlignment
  showImageBorder?: boolean
  contentSurface?: boolean
}

export type Hero02Props = {
  eyebrow: string
  title: string
  subtitle: string
  primaryCtaText: string
  primaryCtaHref: string
  secondaryCtaText: string
  secondaryCtaHref: string
  heroImageAssetId: string
  heroImageAlt: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: Hero02Style
}

export const hero02DefaultProps: Hero02Props = {
  eyebrow: 'Est. 2014',
  title: 'A place people remember',
  subtitle: 'Considered spaces, considered service — built around the details most places skip.',
  primaryCtaText: 'Book now',
  primaryCtaHref: '#book',
  secondaryCtaText: 'View the space',
  secondaryCtaHref: '#gallery',
  heroImageAssetId: '',
  heroImageAlt: '',
}

export const hero02DefaultStyle: Required<Hero02Style> = {
  containerWidth: 1200,
  paddingTop: 0,
  paddingBottom: 0,
  imageRadius: 'medium',
  imageRatio: 'landscape',
  contentAlignment: 'left',
  showImageBorder: false,
  contentSurface: false,
}

const hero02Variants: Hero02Variant[] = ['split-image', 'image-first', 'editorial-overlay']

function resolveHero02Variant(variantId?: string): Hero02Variant {
  return hero02Variants.find((variant) => variant === variantId) ?? 'split-image'
}

const ratioValueByOption: Record<Exclude<Hero02Ratio, 'original'>, string> = {
  square: '1 / 1',
  portrait: '4 / 5',
  landscape: '3 / 2',
}

const radiusValueByOption: Record<Hero02Radius, number | string> = {
  small: 8,
  medium: 16,
  large: 24,
  full: '9999px',
}

function Hero02({
  eyebrow = hero02DefaultProps.eyebrow,
  title = hero02DefaultProps.title,
  subtitle = hero02DefaultProps.subtitle,
  primaryCtaText = hero02DefaultProps.primaryCtaText,
  primaryCtaHref = hero02DefaultProps.primaryCtaHref,
  secondaryCtaText = hero02DefaultProps.secondaryCtaText,
  secondaryCtaHref = hero02DefaultProps.secondaryCtaHref,
  heroImageAssetId = hero02DefaultProps.heroImageAssetId,
  heroImageAlt = hero02DefaultProps.heroImageAlt,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: Hero02Props) {
  const titleId = useId()
  const variant = resolveHero02Variant(variantId)
  const resolvedStyle = { ...hero02DefaultStyle, ...style }
  const hasSecondaryCta = secondaryCtaText.trim().length > 0
  const hasImageAlt = heroImageAlt.trim().length > 0
  const asset = assets.find((item) => item.id === heroImageAssetId)

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const imageStyle: CSSProperties = {
    borderRadius: radiusValueByOption[resolvedStyle.imageRadius],
    aspectRatio:
      resolvedStyle.imageRatio === 'original' ? undefined : ratioValueByOption[resolvedStyle.imageRatio],
    border: resolvedStyle.showImageBorder ? undefined : 'none',
  }

  return (
    <section
      className={`hero02 hero02--${variant} hero02--align-${resolvedStyle.contentAlignment}${resolvedStyle.contentSurface ? ' hero02--surface' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="hero02__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="hero02__content">
          <p className="hero02__eyebrow">{eyebrow}</p>
          <h1 className="hero02__title" id={titleId}>
            {title}
          </h1>
          <p className="hero02__subtitle">{subtitle}</p>
          <div className="hero02__actions">
            <a className="hero02__cta hero02__cta--primary" href={primaryCtaHref}>
              {primaryCtaText}
            </a>
            {hasSecondaryCta ? (
              <a className="hero02__cta hero02__cta--secondary" href={secondaryCtaHref}>
                {secondaryCtaText}
              </a>
            ) : null}
          </div>
        </div>

        <div className="hero02__visual">
          {asset ? (
            <img className="hero02__image" style={imageStyle} src={asset.url} alt={hasImageAlt ? heroImageAlt : ''} />
          ) : (
            <div
              className="hero02__image hero02__image--placeholder"
              style={imageStyle}
              role={hasImageAlt ? 'img' : undefined}
              aria-label={hasImageAlt ? heroImageAlt : undefined}
              aria-hidden={hasImageAlt ? undefined : true}
            >
              <svg
                className="hero02__placeholder-glyph"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="m4 17 5-5 3 3 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero02
