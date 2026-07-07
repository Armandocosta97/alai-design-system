import { useId, useState, type CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './FAQ01.css'

export type FAQ01Variant = 'centered' | 'split' | 'minimal-list'

export type FAQ01Alignment = 'center' | 'left'

export type FAQ01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  alignment?: FAQ01Alignment
  showDivider?: boolean
}

export type FAQ01Props = {
  eyebrow: string
  title: string
  subtitle: string
  faq1Question: string
  faq1Answer: string
  faq2Question: string
  faq2Answer: string
  faq3Question: string
  faq3Answer: string
  faq4Question: string
  faq4Answer: string
  faq5Question: string
  faq5Answer: string
  faq6Question: string
  faq6Answer: string
  theme?: ProjectTheme
  variantId?: string
  style?: FAQ01Style
}

export const faq01DefaultProps: FAQ01Props = {
  eyebrow: 'Questions',
  title: 'Answers before you ask',
  subtitle: 'The things people usually want to know before reaching out.',
  faq1Question: 'How quickly can we get started?',
  faq1Answer:
    'Most projects kick off within a week of signing.\n\nWe start with a short discovery call to confirm scope, then move straight into the first working draft.',
  faq2Question: 'Do you work with businesses outside your usual industry?',
  faq2Answer:
    'Yes. The process stays the same regardless of industry — we adapt the details, not the approach.',
  faq3Question: 'What happens if we need changes after launch?',
  faq3Answer:
    'Small adjustments are included for the first 30 days.\n\nAnything larger is scoped and quoted separately, with no pressure to commit upfront.',
  faq4Question: 'Can we see examples before committing?',
  faq4Answer: 'Always. We share relevant past work during the first conversation, matched to your industry where possible.',
  faq5Question: 'How do payments work?',
  faq5Answer: 'A deposit to begin, a milestone payment partway through, and a final payment at delivery. No surprises in between.',
  faq6Question: 'What if we are not sure this is the right fit yet?',
  faq6Answer:
    'That is what the first call is for. No obligation, no pressure — just a conversation to find out together.',
}

export const faq01DefaultStyle: Required<FAQ01Style> = {
  containerWidth: 880,
  paddingTop: 64,
  paddingBottom: 64,
  alignment: 'center',
  showDivider: true,
}

// Fixed internal default for which item opens on mount. Not a prop, not a
// style control — -1 means every item starts collapsed, any other index
// opens that item by default.
export const faq01DefaultOpenIndex = 0

const faq01Variants: FAQ01Variant[] = ['centered', 'split', 'minimal-list']

function resolveFAQ01Variant(variantId?: string): FAQ01Variant {
  return faq01Variants.find((variant) => variant === variantId) ?? 'centered'
}

function FAQ01({
  eyebrow = faq01DefaultProps.eyebrow,
  title = faq01DefaultProps.title,
  subtitle = faq01DefaultProps.subtitle,
  faq1Question = faq01DefaultProps.faq1Question,
  faq1Answer = faq01DefaultProps.faq1Answer,
  faq2Question = faq01DefaultProps.faq2Question,
  faq2Answer = faq01DefaultProps.faq2Answer,
  faq3Question = faq01DefaultProps.faq3Question,
  faq3Answer = faq01DefaultProps.faq3Answer,
  faq4Question = faq01DefaultProps.faq4Question,
  faq4Answer = faq01DefaultProps.faq4Answer,
  faq5Question = faq01DefaultProps.faq5Question,
  faq5Answer = faq01DefaultProps.faq5Answer,
  faq6Question = faq01DefaultProps.faq6Question,
  faq6Answer = faq01DefaultProps.faq6Answer,
  theme: _theme,
  variantId,
  style,
}: FAQ01Props) {
  const titleId = useId()
  const idBase = useId()
  const variant = resolveFAQ01Variant(variantId)
  const resolvedStyle = { ...faq01DefaultStyle, ...style }
  const [openIndex, setOpenIndex] = useState<number>(faq01DefaultOpenIndex)

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const items = [
    { question: faq1Question, answer: faq1Answer },
    { question: faq2Question, answer: faq2Answer },
    { question: faq3Question, answer: faq3Answer },
    { question: faq4Question, answer: faq4Answer },
    { question: faq5Question, answer: faq5Answer },
    { question: faq6Question, answer: faq6Answer },
  ]

  function toggleItem(index: number) {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section
      className={`faq01 faq01--${variant} faq01--align-${resolvedStyle.alignment}${resolvedStyle.showDivider ? ' faq01--divider' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="faq01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="faq01__header">
          <p className="faq01__eyebrow">{eyebrow}</p>
          <h2 className="faq01__title" id={titleId}>
            {title}
          </h2>
          <p className="faq01__subtitle">{subtitle}</p>
        </div>

        <div className="faq01__list">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const buttonId = `${idBase}-button-${index}`
            const panelId = `${idBase}-panel-${index}`

            return (
              <div key={index} className="faq01__item">
                <h3 className="faq01__item-heading">
                  <button
                    type="button"
                    className="faq01__trigger"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="faq01__question">{item.question}</span>
                    <span className={`faq01__chevron${isOpen ? ' faq01__chevron--open' : ''}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  className="faq01__panel"
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p className="faq01__answer">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ01
