import { useId, type CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './CTA01.css'

export type CTA01Variant = 'centered' | 'boxed' | 'split'

export type CTA01Alignment = 'center' | 'left'

export type CTA01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  surface?: boolean
  alignment?: CTA01Alignment
}

export type CTA01Props = {
  eyebrow: string
  title: string
  subtitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  theme?: ProjectTheme
  variantId?: string
  style?: CTA01Style
}

export const cta01DefaultProps: CTA01Props = {
  eyebrow: 'Get started',
  title: 'Ready to build something people remember?',
  subtitle: 'Set up your first project in minutes, no credit card required.',
  primaryLabel: 'Start for free',
  primaryHref: '#get-started',
  secondaryLabel: 'Talk to sales',
  secondaryHref: '#contact',
}

export const cta01DefaultStyle: Required<CTA01Style> = {
  containerWidth: 960,
  paddingTop: 64,
  paddingBottom: 64,
  surface: false,
  alignment: 'center',
}

const cta01Variants: CTA01Variant[] = ['centered', 'boxed', 'split']

function resolveCTA01Variant(variantId?: string): CTA01Variant {
  return cta01Variants.find((variant) => variant === variantId) ?? 'centered'
}

function CTA01({
  eyebrow = cta01DefaultProps.eyebrow,
  title = cta01DefaultProps.title,
  subtitle = cta01DefaultProps.subtitle,
  primaryLabel = cta01DefaultProps.primaryLabel,
  primaryHref = cta01DefaultProps.primaryHref,
  secondaryLabel = cta01DefaultProps.secondaryLabel,
  secondaryHref = cta01DefaultProps.secondaryHref,
  theme: _theme,
  variantId,
  style,
}: CTA01Props) {
  const titleId = useId()
  const variant = resolveCTA01Variant(variantId)
  const resolvedStyle = { ...cta01DefaultStyle, ...style }
  const hasSecondary = secondaryLabel.trim().length > 0

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  return (
    <section
      className={`cta01 cta01--${variant} cta01--align-${resolvedStyle.alignment}${resolvedStyle.surface ? ' cta01--surface' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="cta01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="cta01__content">
          <p className="cta01__eyebrow">{eyebrow}</p>
          <h2 className="cta01__title" id={titleId}>
            {title}
          </h2>
          <p className="cta01__subtitle">{subtitle}</p>
        </div>

        <div className="cta01__actions">
          <a className="cta01__button cta01__button--primary" href={primaryHref}>
            {primaryLabel}
          </a>
          {hasSecondary ? (
            <a className="cta01__button cta01__button--secondary" href={secondaryHref}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default CTA01
