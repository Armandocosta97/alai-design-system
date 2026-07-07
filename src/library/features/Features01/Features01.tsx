import { useId, type CSSProperties, type ReactNode } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Features01.css'

export type Features01Variant = 'grid' | 'minimal' | 'icon-left'

export type Features01IconStyle = 'tinted' | 'outline' | 'solid'

export type Features01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  iconStyle?: Features01IconStyle
  cardBorder?: boolean
}

export type Features01Props = {
  eyebrow: string
  title: string
  subtitle: string
  feature1Icon: string
  feature1Title: string
  feature1Description: string
  feature2Icon: string
  feature2Title: string
  feature2Description: string
  feature3Icon: string
  feature3Title: string
  feature3Description: string
  theme?: ProjectTheme
  variantId?: string
  style?: Features01Style
}

export const features01DefaultProps: Features01Props = {
  eyebrow: 'Why teams switch',
  title: "Everything you need, nothing you don't",
  subtitle: 'Built for teams who care about craft as much as speed.',
  feature1Icon: 'bolt',
  feature1Title: 'Fast by default',
  feature1Description:
    'Every interaction responds instantly, without spinners or skeleton screens getting in the way.',
  feature2Icon: 'shield',
  feature2Title: 'Secure from day one',
  feature2Description:
    'Enterprise-grade protections are built in, not bolted on as an afterthought.',
  feature3Icon: 'layers',
  feature3Title: 'Composable by design',
  feature3Description: 'Every piece works on its own or together, so you never outgrow the system.',
}

export const features01DefaultStyle: Required<Features01Style> = {
  containerWidth: 1200,
  paddingTop: 64,
  paddingBottom: 64,
  iconStyle: 'tinted',
  cardBorder: true,
}

const features01Variants: Features01Variant[] = ['grid', 'minimal', 'icon-left']

function resolveFeatures01Variant(variantId?: string): Features01Variant {
  return features01Variants.find((variant) => variant === variantId) ?? 'grid'
}

// Local inline SVG icon set — deliberately not a shared/global icon system.
// Only this component references it (Simplicity Rule: local until 3+
// components would benefit from sharing).
const featureIcons: Record<string, ReactNode> = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20V10M12 20V4M20 20v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="m12 3 9 5-9 5-9-5 9-5Z M3 13l9 5 9-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        strokeLinecap="round"
      />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
    </svg>
  ),
  puzzle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M9 4h4a1 1 0 0 1 1 1v2.2a1.8 1.8 0 1 0 0 3.6V13a1 1 0 0 1-1 1h-2.2a1.8 1.8 0 1 1-3.6 0H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2.2a1.8 1.8 0 1 0 3.6 0V5a1 1 0 0 1 1-1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

function getFeatureIcon(iconId: string): ReactNode {
  return featureIcons[iconId] ?? featureIcons.bolt
}

function Features01({
  eyebrow = features01DefaultProps.eyebrow,
  title = features01DefaultProps.title,
  subtitle = features01DefaultProps.subtitle,
  feature1Icon = features01DefaultProps.feature1Icon,
  feature1Title = features01DefaultProps.feature1Title,
  feature1Description = features01DefaultProps.feature1Description,
  feature2Icon = features01DefaultProps.feature2Icon,
  feature2Title = features01DefaultProps.feature2Title,
  feature2Description = features01DefaultProps.feature2Description,
  feature3Icon = features01DefaultProps.feature3Icon,
  feature3Title = features01DefaultProps.feature3Title,
  feature3Description = features01DefaultProps.feature3Description,
  theme: _theme,
  variantId,
  style,
}: Features01Props) {
  const titleId = useId()
  const variant = resolveFeatures01Variant(variantId)
  const resolvedStyle = { ...features01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const itemStyle: CSSProperties = {
    border: resolvedStyle.cardBorder ? undefined : 'none',
    boxShadow: resolvedStyle.cardBorder ? undefined : 'none',
  }

  const features = [
    { icon: feature1Icon, title: feature1Title, description: feature1Description },
    { icon: feature2Icon, title: feature2Title, description: feature2Description },
    { icon: feature3Icon, title: feature3Title, description: feature3Description },
  ]

  return (
    <section
      className={`features01 features01--${variant} features01--icon-${resolvedStyle.iconStyle}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="features01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="features01__header">
          <p className="features01__eyebrow">{eyebrow}</p>
          <h2 className="features01__title" id={titleId}>
            {title}
          </h2>
          <p className="features01__subtitle">{subtitle}</p>
        </div>

        <div className="features01__grid">
          {features.map((feature, index) => (
            <article key={index} className="features01__item" style={itemStyle}>
              <span className="features01__icon" aria-hidden="true">
                {getFeatureIcon(feature.icon)}
              </span>
              <div className="features01__item-content">
                <h3 className="features01__item-title">{feature.title}</h3>
                <p className="features01__item-description">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features01
