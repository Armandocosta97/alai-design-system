import { useId, type CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Pricing01.css'

export type Pricing01Variant = 'cards' | 'featured-center' | 'compact'

export type Pricing01Alignment = 'center' | 'left'

export type Pricing01CardStyle = 'flat' | 'bordered' | 'elevated'

export type Pricing01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  alignment?: Pricing01Alignment
  surface?: boolean
  showDivider?: boolean
  cardStyle?: Pricing01CardStyle
}

export type Pricing01Props = {
  eyebrow: string
  title: string
  subtitle: string
  plan1Name: string
  plan1Price: string
  plan1BillingLabel: string
  plan1Description: string
  plan1CtaLabel: string
  plan1CtaHref: string
  plan1Feature1: string
  plan1Feature2: string
  plan1Feature3: string
  plan1Feature4: string
  plan1Feature5: string
  plan1Highlighted: boolean
  plan2Name: string
  plan2Price: string
  plan2BillingLabel: string
  plan2Description: string
  plan2CtaLabel: string
  plan2CtaHref: string
  plan2Feature1: string
  plan2Feature2: string
  plan2Feature3: string
  plan2Feature4: string
  plan2Feature5: string
  plan2Highlighted: boolean
  plan3Name: string
  plan3Price: string
  plan3BillingLabel: string
  plan3Description: string
  plan3CtaLabel: string
  plan3CtaHref: string
  plan3Feature1: string
  plan3Feature2: string
  plan3Feature3: string
  plan3Feature4: string
  plan3Feature5: string
  plan3Highlighted: boolean
  theme?: ProjectTheme
  variantId?: string
  style?: Pricing01Style
}

export const pricing01DefaultProps: Pricing01Props = {
  eyebrow: 'Pricing',
  title: 'Plans that grow with your team',
  subtitle: 'Start free, upgrade when you need to. No hidden fees, cancel any time.',
  plan1Name: 'Starter',
  plan1Price: '$19',
  plan1BillingLabel: 'per month',
  plan1Description: 'For individuals getting started.',
  plan1CtaLabel: 'Start Free Trial',
  plan1CtaHref: '#get-started',
  plan1Feature1: 'Up to 3 projects',
  plan1Feature2: '1 team member',
  plan1Feature3: 'Basic analytics',
  plan1Feature4: 'Community support',
  plan1Feature5: '',
  plan1Highlighted: false,
  plan2Name: 'Growth',
  plan2Price: '$49',
  plan2BillingLabel: 'per month',
  plan2Description: 'For growing teams that need more.',
  plan2CtaLabel: 'Start Free Trial',
  plan2CtaHref: '#get-started',
  plan2Feature1: 'Unlimited projects',
  plan2Feature2: 'Up to 10 team members',
  plan2Feature3: 'Advanced analytics',
  plan2Feature4: 'Priority support',
  plan2Feature5: 'Custom integrations',
  plan2Highlighted: true,
  plan3Name: 'Scale',
  plan3Price: '$99',
  plan3BillingLabel: 'per month',
  plan3Description: 'For teams that need it all.',
  plan3CtaLabel: 'Contact Sales',
  plan3CtaHref: '#contact',
  plan3Feature1: 'Unlimited everything',
  plan3Feature2: 'Unlimited team members',
  plan3Feature3: 'Advanced analytics',
  plan3Feature4: 'Dedicated support',
  plan3Feature5: 'Custom contracts & SLAs',
  plan3Highlighted: false,
}

export const pricing01DefaultStyle: Required<Pricing01Style> = {
  containerWidth: 1120,
  paddingTop: 72,
  paddingBottom: 72,
  alignment: 'center',
  surface: false,
  showDivider: false,
  cardStyle: 'bordered',
}

const pricing01Variants: Pricing01Variant[] = ['cards', 'featured-center', 'compact']

function resolvePricing01Variant(variantId?: string): Pricing01Variant {
  return pricing01Variants.find((variant) => variant === variantId) ?? 'cards'
}

type ResolvedPlan = {
  name: string
  price: string
  billingLabel: string
  description: string
  ctaLabel: string
  ctaHref: string
  features: string[]
  highlighted: boolean
}

function Pricing01({
  eyebrow = pricing01DefaultProps.eyebrow,
  title = pricing01DefaultProps.title,
  subtitle = pricing01DefaultProps.subtitle,
  plan1Name = pricing01DefaultProps.plan1Name,
  plan1Price = pricing01DefaultProps.plan1Price,
  plan1BillingLabel = pricing01DefaultProps.plan1BillingLabel,
  plan1Description = pricing01DefaultProps.plan1Description,
  plan1CtaLabel = pricing01DefaultProps.plan1CtaLabel,
  plan1CtaHref = pricing01DefaultProps.plan1CtaHref,
  plan1Feature1 = pricing01DefaultProps.plan1Feature1,
  plan1Feature2 = pricing01DefaultProps.plan1Feature2,
  plan1Feature3 = pricing01DefaultProps.plan1Feature3,
  plan1Feature4 = pricing01DefaultProps.plan1Feature4,
  plan1Feature5 = pricing01DefaultProps.plan1Feature5,
  plan1Highlighted = pricing01DefaultProps.plan1Highlighted,
  plan2Name = pricing01DefaultProps.plan2Name,
  plan2Price = pricing01DefaultProps.plan2Price,
  plan2BillingLabel = pricing01DefaultProps.plan2BillingLabel,
  plan2Description = pricing01DefaultProps.plan2Description,
  plan2CtaLabel = pricing01DefaultProps.plan2CtaLabel,
  plan2CtaHref = pricing01DefaultProps.plan2CtaHref,
  plan2Feature1 = pricing01DefaultProps.plan2Feature1,
  plan2Feature2 = pricing01DefaultProps.plan2Feature2,
  plan2Feature3 = pricing01DefaultProps.plan2Feature3,
  plan2Feature4 = pricing01DefaultProps.plan2Feature4,
  plan2Feature5 = pricing01DefaultProps.plan2Feature5,
  plan2Highlighted = pricing01DefaultProps.plan2Highlighted,
  plan3Name = pricing01DefaultProps.plan3Name,
  plan3Price = pricing01DefaultProps.plan3Price,
  plan3BillingLabel = pricing01DefaultProps.plan3BillingLabel,
  plan3Description = pricing01DefaultProps.plan3Description,
  plan3CtaLabel = pricing01DefaultProps.plan3CtaLabel,
  plan3CtaHref = pricing01DefaultProps.plan3CtaHref,
  plan3Feature1 = pricing01DefaultProps.plan3Feature1,
  plan3Feature2 = pricing01DefaultProps.plan3Feature2,
  plan3Feature3 = pricing01DefaultProps.plan3Feature3,
  plan3Feature4 = pricing01DefaultProps.plan3Feature4,
  plan3Feature5 = pricing01DefaultProps.plan3Feature5,
  plan3Highlighted = pricing01DefaultProps.plan3Highlighted,
  theme: _theme,
  variantId,
  style,
}: Pricing01Props) {
  const titleId = useId()
  const variant = resolvePricing01Variant(variantId)
  const resolvedStyle = { ...pricing01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const plans: ResolvedPlan[] = [
    {
      name: plan1Name,
      price: plan1Price,
      billingLabel: plan1BillingLabel,
      description: plan1Description,
      ctaLabel: plan1CtaLabel,
      ctaHref: plan1CtaHref,
      features: [plan1Feature1, plan1Feature2, plan1Feature3, plan1Feature4, plan1Feature5],
      highlighted: plan1Highlighted,
    },
    {
      name: plan2Name,
      price: plan2Price,
      billingLabel: plan2BillingLabel,
      description: plan2Description,
      ctaLabel: plan2CtaLabel,
      ctaHref: plan2CtaHref,
      features: [plan2Feature1, plan2Feature2, plan2Feature3, plan2Feature4, plan2Feature5],
      highlighted: plan2Highlighted,
    },
    {
      name: plan3Name,
      price: plan3Price,
      billingLabel: plan3BillingLabel,
      description: plan3Description,
      ctaLabel: plan3CtaLabel,
      ctaHref: plan3CtaHref,
      features: [plan3Feature1, plan3Feature2, plan3Feature3, plan3Feature4, plan3Feature5],
      highlighted: plan3Highlighted,
    },
  ]

  return (
    <section
      className={`pricing01 pricing01--${variant} pricing01--align-${resolvedStyle.alignment} pricing01--card-${resolvedStyle.cardStyle}${resolvedStyle.surface ? ' pricing01--surface' : ''}${resolvedStyle.showDivider ? ' pricing01--divider' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="pricing01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="pricing01__header">
          <p className="pricing01__eyebrow">{eyebrow}</p>
          <h2 className="pricing01__title" id={titleId}>
            {title}
          </h2>
          <p className="pricing01__subtitle">{subtitle}</p>
        </div>

        <div className="pricing01__grid">
          {plans.map((plan, index) => {
            const hasBillingLabel = plan.billingLabel.trim().length > 0
            const hasDescription = plan.description.trim().length > 0
            const hasCta = plan.ctaLabel.trim().length > 0
            const features = plan.features.filter((feature) => feature.trim().length > 0)

            return (
              <article
                key={index}
                className={`pricing01__plan${plan.highlighted ? ' pricing01__plan--highlighted' : ''}`}
              >
                {plan.highlighted ? <p className="pricing01__badge">Most Popular</p> : null}
                <h3 className="pricing01__plan-name">{plan.name}</h3>
                <p className="pricing01__plan-price">
                  <span className="pricing01__plan-price-value">{plan.price}</span>
                  {hasBillingLabel ? (
                    <span className="pricing01__plan-price-label">{plan.billingLabel}</span>
                  ) : null}
                </p>
                {hasDescription ? (
                  <p className="pricing01__plan-description">{plan.description}</p>
                ) : null}
                {features.length > 0 ? (
                  <ul className="pricing01__plan-features">
                    {features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="pricing01__plan-feature">
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {hasCta ? (
                  <a className="pricing01__plan-cta" href={plan.ctaHref}>
                    {plan.ctaLabel}
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing01
