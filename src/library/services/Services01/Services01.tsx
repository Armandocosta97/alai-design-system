import { useId, type CSSProperties, type ReactNode } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Services01.css'

export type Services01Variant = 'grid' | 'list' | 'two-column'

export type Services01IconStyle = 'line' | 'tinted' | 'none'

export type Services01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  iconStyle?: Services01IconStyle
  divider?: boolean
}

export type Services01Props = {
  eyebrow: string
  title: string
  subtitle: string
  service1Icon: string
  service1Title: string
  service1Description: string
  service2Icon: string
  service2Title: string
  service2Description: string
  service3Icon: string
  service3Title: string
  service3Description: string
  service4Icon: string
  service4Title: string
  service4Description: string
  service5Icon: string
  service5Title: string
  service5Description: string
  service6Icon: string
  service6Title: string
  service6Description: string
  theme?: ProjectTheme
  variantId?: string
  style?: Services01Style
}

export const services01DefaultProps: Services01Props = {
  eyebrow: 'What we do',
  title: 'Services built around how you actually work',
  subtitle: 'Six ways we help, without the jargon or the upsell.',
  service1Icon: 'compass',
  service1Title: 'Strategy',
  service1Description: 'We start with the plan, not the deliverable, so every next step earns its place.',
  service2Icon: 'layers',
  service2Title: 'Design',
  service2Description: 'Considered, restrained design that holds up long after the trend it borrowed from fades.',
  service3Icon: 'tool',
  service3Title: 'Build',
  service3Description: 'Clean implementation with no shortcuts that quietly become someone else’s problem later.',
  service4Icon: 'chart',
  service4Title: 'Growth',
  service4Description: 'Ongoing iteration guided by what the numbers actually say, not by habit.',
  service5Icon: 'shield',
  service5Title: 'Support',
  service5Description: 'A real person to call when something breaks, not a ticket queue that goes quiet.',
  service6Icon: 'spark',
  service6Title: 'Consulting',
  service6Description: 'An outside perspective when you need one, with no obligation to sell you more.',
}

export const services01DefaultStyle: Required<Services01Style> = {
  containerWidth: 1200,
  paddingTop: 64,
  paddingBottom: 64,
  iconStyle: 'line',
  divider: true,
}

const services01Variants: Services01Variant[] = ['grid', 'list', 'two-column']

function resolveServices01Variant(variantId?: string): Services01Variant {
  return services01Variants.find((variant) => variant === variantId) ?? 'grid'
}

// Local inline SVG icon set — deliberately independent from Features01's icon
// map. Only this component references it (Simplicity Rule: local until 3+
// components would benefit from a shared icon system).
const serviceIcons: Record<string, ReactNode> = {
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-3 1.5 2-5 3-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3 13 9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M14.7 6.3a3 3 0 0 0-4.1 3.6L4 16.5V20h3.5l6.6-6.6a3 3 0 0 0 3.6-4.1l-2.1 2.1-2-2 2.1-2.1Z"
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
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"
        strokeLinecap="round"
      />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M20 4C10 4 4 10 4 18c8 0 14-6 14-14Z M8 18c2-4 6-8 10-10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.5" r="3.2" />
    </svg>
  ),
}

function getServiceIcon(iconId: string): ReactNode {
  return serviceIcons[iconId] ?? serviceIcons.compass
}

function Services01({
  eyebrow = services01DefaultProps.eyebrow,
  title = services01DefaultProps.title,
  subtitle = services01DefaultProps.subtitle,
  service1Icon = services01DefaultProps.service1Icon,
  service1Title = services01DefaultProps.service1Title,
  service1Description = services01DefaultProps.service1Description,
  service2Icon = services01DefaultProps.service2Icon,
  service2Title = services01DefaultProps.service2Title,
  service2Description = services01DefaultProps.service2Description,
  service3Icon = services01DefaultProps.service3Icon,
  service3Title = services01DefaultProps.service3Title,
  service3Description = services01DefaultProps.service3Description,
  service4Icon = services01DefaultProps.service4Icon,
  service4Title = services01DefaultProps.service4Title,
  service4Description = services01DefaultProps.service4Description,
  service5Icon = services01DefaultProps.service5Icon,
  service5Title = services01DefaultProps.service5Title,
  service5Description = services01DefaultProps.service5Description,
  service6Icon = services01DefaultProps.service6Icon,
  service6Title = services01DefaultProps.service6Title,
  service6Description = services01DefaultProps.service6Description,
  theme: _theme,
  variantId,
  style,
}: Services01Props) {
  const titleId = useId()
  const variant = resolveServices01Variant(variantId)
  const resolvedStyle = { ...services01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const services = [
    { icon: service1Icon, title: service1Title, description: service1Description },
    { icon: service2Icon, title: service2Title, description: service2Description },
    { icon: service3Icon, title: service3Title, description: service3Description },
    { icon: service4Icon, title: service4Title, description: service4Description },
    { icon: service5Icon, title: service5Title, description: service5Description },
    { icon: service6Icon, title: service6Title, description: service6Description },
  ]

  return (
    <section
      className={`services01 services01--${variant} services01--icon-${resolvedStyle.iconStyle}${resolvedStyle.divider ? ' services01--divider' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="services01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="services01__header">
          <p className="services01__eyebrow">{eyebrow}</p>
          <h2 className="services01__title" id={titleId}>
            {title}
          </h2>
          <p className="services01__subtitle">{subtitle}</p>
        </div>

        <div className="services01__grid">
          {services.map((service, index) => (
            <article key={index} className="services01__item">
              {resolvedStyle.iconStyle !== 'none' ? (
                <span className="services01__icon" aria-hidden="true">
                  {getServiceIcon(service.icon)}
                </span>
              ) : null}
              <h3 className="services01__item-title">{service.title}</h3>
              <p className="services01__item-description">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services01
