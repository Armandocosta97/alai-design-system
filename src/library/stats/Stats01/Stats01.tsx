import { useId, type CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Stats01.css'

export type Stats01Variant = 'four-column' | 'two-by-two' | 'featured'

export type Stats01Alignment = 'center' | 'left'

export type Stats01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  alignment?: Stats01Alignment
  showDivider?: boolean
}

export type Stats01Props = {
  eyebrow: string
  title: string
  subtitle: string
  stat1Value: string
  stat1Label: string
  stat1Description: string
  stat2Value: string
  stat2Label: string
  stat2Description: string
  stat3Value: string
  stat3Label: string
  stat3Description: string
  stat4Value: string
  stat4Label: string
  stat4Description: string
  theme?: ProjectTheme
  variantId?: string
  style?: Stats01Style
}

// The value prop is always plain text — it is never parsed, formatted, or
// animated. "12+", "98%", "< 24h", "250+", "24/7", and "#1" are all equally
// valid and are rendered exactly as entered.
export const stats01DefaultProps: Stats01Props = {
  eyebrow: 'By the numbers',
  title: 'A track record you can check',
  subtitle: 'The figures behind the work, not just the claims.',
  stat1Value: '12+',
  stat1Label: 'Years of experience',
  stat1Description: 'Trusted by businesses across Italy since 2014.',
  stat2Value: '250+',
  stat2Label: 'Projects delivered',
  stat2Description: 'Across agencies, restaurants, and healthcare providers.',
  stat3Value: '98%',
  stat3Label: 'Client retention',
  stat3Description: 'Most clients return for their next project.',
  stat4Value: '< 24h',
  stat4Label: 'Average response time',
  stat4Description: 'A real person, not a queue.',
}

export const stats01DefaultStyle: Required<Stats01Style> = {
  containerWidth: 1100,
  paddingTop: 64,
  paddingBottom: 64,
  alignment: 'center',
  showDivider: true,
}

const stats01Variants: Stats01Variant[] = ['four-column', 'two-by-two', 'featured']

function resolveStats01Variant(variantId?: string): Stats01Variant {
  return stats01Variants.find((variant) => variant === variantId) ?? 'four-column'
}

function Stats01({
  eyebrow = stats01DefaultProps.eyebrow,
  title = stats01DefaultProps.title,
  subtitle = stats01DefaultProps.subtitle,
  stat1Value = stats01DefaultProps.stat1Value,
  stat1Label = stats01DefaultProps.stat1Label,
  stat1Description = stats01DefaultProps.stat1Description,
  stat2Value = stats01DefaultProps.stat2Value,
  stat2Label = stats01DefaultProps.stat2Label,
  stat2Description = stats01DefaultProps.stat2Description,
  stat3Value = stats01DefaultProps.stat3Value,
  stat3Label = stats01DefaultProps.stat3Label,
  stat3Description = stats01DefaultProps.stat3Description,
  stat4Value = stats01DefaultProps.stat4Value,
  stat4Label = stats01DefaultProps.stat4Label,
  stat4Description = stats01DefaultProps.stat4Description,
  theme: _theme,
  variantId,
  style,
}: Stats01Props) {
  const titleId = useId()
  const variant = resolveStats01Variant(variantId)
  const resolvedStyle = { ...stats01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const stats = [
    { value: stat1Value, label: stat1Label, description: stat1Description },
    { value: stat2Value, label: stat2Label, description: stat2Description },
    { value: stat3Value, label: stat3Label, description: stat3Description },
    { value: stat4Value, label: stat4Label, description: stat4Description },
  ]

  return (
    <section
      className={`stats01 stats01--${variant} stats01--align-${resolvedStyle.alignment}${resolvedStyle.showDivider ? ' stats01--divider' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="stats01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="stats01__header">
          <p className="stats01__eyebrow">{eyebrow}</p>
          <h2 className="stats01__title" id={titleId}>
            {title}
          </h2>
          <p className="stats01__subtitle">{subtitle}</p>
        </div>

        <ul className="stats01__grid">
          {stats.map((stat, index) => {
            const hasDescription = stat.description.trim().length > 0

            return (
              <li key={index} className="stats01__item">
                <p className="stats01__value">{stat.value}</p>
                <h3 className="stats01__label">{stat.label}</h3>
                {hasDescription ? <p className="stats01__description">{stat.description}</p> : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Stats01
