import { useId, type CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Process01.css'

export type Process01Variant = 'horizontal' | 'vertical' | 'editorial'

export type Process01NumberStyle = 'badge' | 'plain' | 'outline'
export type Process01Alignment = 'center' | 'left'

export type Process01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  showDivider?: boolean
  stepNumberStyle?: Process01NumberStyle
  alignment?: Process01Alignment
}

export type Process01Props = {
  eyebrow: string
  title: string
  subtitle: string
  step1Number: string
  step1Title: string
  step1Description: string
  step2Number: string
  step2Title: string
  step2Description: string
  step3Number: string
  step3Title: string
  step3Description: string
  step4Number: string
  step4Title: string
  step4Description: string
  theme?: ProjectTheme
  variantId?: string
  style?: Process01Style
}

// stepNumber is always plain text — never validated, parsed, or
// auto-generated. "01"/"02"/"03"/"04" is the recommended format (see
// README), but any text ("Step One", "First", etc.) is equally valid.
export const process01DefaultProps: Process01Props = {
  eyebrow: 'How we work',
  title: 'A process built for clarity, not surprises',
  subtitle: 'Four steps, the same way every time.',
  step1Number: '01',
  step1Title: 'Discovery',
  step1Description: 'We learn about your business, your goals, and what success actually looks like.',
  step2Number: '02',
  step2Title: 'Plan',
  step2Description: 'A clear scope and timeline, agreed before any work begins.',
  step3Number: '03',
  step3Title: 'Build',
  step3Description: 'Steady progress, with regular check-ins so nothing arrives as a surprise.',
  step4Number: '04',
  step4Title: 'Deliver',
  step4Description: 'A final review, a handover, and ongoing support if you need it.',
}

export const process01DefaultStyle: Required<Process01Style> = {
  containerWidth: 1100,
  paddingTop: 64,
  paddingBottom: 64,
  showDivider: true,
  stepNumberStyle: 'plain',
  alignment: 'center',
}

// The first step is always the emphasized one in the Editorial variant.
// There is no featuredStepIndex prop — reordering which step reads as
// "featured" is a content edit (swap which prop group holds which step),
// never a new capability.
const process01Variants: Process01Variant[] = ['horizontal', 'vertical', 'editorial']

function resolveProcess01Variant(variantId?: string): Process01Variant {
  return process01Variants.find((variant) => variant === variantId) ?? 'horizontal'
}

function Process01({
  eyebrow = process01DefaultProps.eyebrow,
  title = process01DefaultProps.title,
  subtitle = process01DefaultProps.subtitle,
  step1Number = process01DefaultProps.step1Number,
  step1Title = process01DefaultProps.step1Title,
  step1Description = process01DefaultProps.step1Description,
  step2Number = process01DefaultProps.step2Number,
  step2Title = process01DefaultProps.step2Title,
  step2Description = process01DefaultProps.step2Description,
  step3Number = process01DefaultProps.step3Number,
  step3Title = process01DefaultProps.step3Title,
  step3Description = process01DefaultProps.step3Description,
  step4Number = process01DefaultProps.step4Number,
  step4Title = process01DefaultProps.step4Title,
  step4Description = process01DefaultProps.step4Description,
  theme: _theme,
  variantId,
  style,
}: Process01Props) {
  const titleId = useId()
  const variant = resolveProcess01Variant(variantId)
  const resolvedStyle = { ...process01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const steps = [
    { number: step1Number, title: step1Title, description: step1Description },
    { number: step2Number, title: step2Title, description: step2Description },
    { number: step3Number, title: step3Title, description: step3Description },
    { number: step4Number, title: step4Title, description: step4Description },
  ]

  return (
    <section
      className={`process01 process01--${variant} process01--align-${resolvedStyle.alignment} process01--number-${resolvedStyle.stepNumberStyle}${resolvedStyle.showDivider ? ' process01--divider' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="process01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="process01__header">
          <p className="process01__eyebrow">{eyebrow}</p>
          <h2 className="process01__title" id={titleId}>
            {title}
          </h2>
          <p className="process01__subtitle">{subtitle}</p>
        </div>

        <ol className="process01__grid">
          {steps.map((step, index) => (
            <li key={index} className="process01__item">
              <p className="process01__number">{step.number}</p>
              <h3 className="process01__step-title">{step.title}</h3>
              <p className="process01__description">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process01
