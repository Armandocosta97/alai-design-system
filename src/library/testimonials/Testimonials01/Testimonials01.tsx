import { useId, type CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './Testimonials01.css'

export type Testimonials01Variant = 'row' | 'stacked' | 'featured'

export type Testimonials01Density = 'compact' | 'comfortable'
export type Testimonials01Alignment = 'left' | 'center'
export type Testimonials01DividerStyle = 'none' | 'line'

export type Testimonials01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  density?: Testimonials01Density
  avatarSize?: number
  alignment?: Testimonials01Alignment
  dividerStyle?: Testimonials01DividerStyle
  showQuoteMark?: boolean
}

export type Testimonials01Props = {
  eyebrow: string
  title: string
  subtitle: string
  testimonial1AvatarAssetId: string
  testimonial1Name: string
  testimonial1Role: string
  testimonial1Company: string
  testimonial1Text: string
  testimonial2AvatarAssetId: string
  testimonial2Name: string
  testimonial2Role: string
  testimonial2Company: string
  testimonial2Text: string
  testimonial3AvatarAssetId: string
  testimonial3Name: string
  testimonial3Role: string
  testimonial3Company: string
  testimonial3Text: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: Testimonials01Style
}

export const testimonials01DefaultProps: Testimonials01Props = {
  eyebrow: 'Loved by teams',
  title: 'What people say after switching',
  subtitle: 'A few words from the people who use it every day.',
  testimonial1AvatarAssetId: '',
  testimonial1Name: 'Sara Novak',
  testimonial1Role: 'Head of Product',
  testimonial1Company: 'Lumen',
  testimonial1Text:
    "We replaced three tools with this one. The team stopped context-switching within a week, and it hasn't slowed us down once.",
  testimonial2AvatarAssetId: '',
  testimonial2Name: 'Marcus Aldana',
  testimonial2Role: 'Engineering Lead',
  testimonial2Company: 'Fieldnote',
  testimonial2Text:
    "It's rare that a design tool actually respects engineering constraints. This one does, and it shows in every export.",
  testimonial3AvatarAssetId: '',
  testimonial3Name: 'Priya Shah',
  testimonial3Role: 'Founder',
  testimonial3Company: 'Northbound',
  testimonial3Text:
    'Our site finally looks as considered as the product itself. Clients notice the difference immediately.',
}

export const testimonials01DefaultStyle: Required<Testimonials01Style> = {
  containerWidth: 1100,
  paddingTop: 64,
  paddingBottom: 64,
  density: 'comfortable',
  avatarSize: 48,
  alignment: 'left',
  dividerStyle: 'line',
  showQuoteMark: true,
}

const testimonials01Variants: Testimonials01Variant[] = ['row', 'stacked', 'featured']

function resolveTestimonials01Variant(variantId?: string): Testimonials01Variant {
  return testimonials01Variants.find((variant) => variant === variantId) ?? 'row'
}

type Testimonial = {
  avatarAssetId: string
  name: string
  role: string
  company: string
  text: string
}

function Testimonials01({
  eyebrow = testimonials01DefaultProps.eyebrow,
  title = testimonials01DefaultProps.title,
  subtitle = testimonials01DefaultProps.subtitle,
  testimonial1AvatarAssetId = testimonials01DefaultProps.testimonial1AvatarAssetId,
  testimonial1Name = testimonials01DefaultProps.testimonial1Name,
  testimonial1Role = testimonials01DefaultProps.testimonial1Role,
  testimonial1Company = testimonials01DefaultProps.testimonial1Company,
  testimonial1Text = testimonials01DefaultProps.testimonial1Text,
  testimonial2AvatarAssetId = testimonials01DefaultProps.testimonial2AvatarAssetId,
  testimonial2Name = testimonials01DefaultProps.testimonial2Name,
  testimonial2Role = testimonials01DefaultProps.testimonial2Role,
  testimonial2Company = testimonials01DefaultProps.testimonial2Company,
  testimonial2Text = testimonials01DefaultProps.testimonial2Text,
  testimonial3AvatarAssetId = testimonials01DefaultProps.testimonial3AvatarAssetId,
  testimonial3Name = testimonials01DefaultProps.testimonial3Name,
  testimonial3Role = testimonials01DefaultProps.testimonial3Role,
  testimonial3Company = testimonials01DefaultProps.testimonial3Company,
  testimonial3Text = testimonials01DefaultProps.testimonial3Text,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: Testimonials01Props) {
  const titleId = useId()
  const variant = resolveTestimonials01Variant(variantId)
  const resolvedStyle = { ...testimonials01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const testimonials: Testimonial[] = [
    {
      avatarAssetId: testimonial1AvatarAssetId,
      name: testimonial1Name,
      role: testimonial1Role,
      company: testimonial1Company,
      text: testimonial1Text,
    },
    {
      avatarAssetId: testimonial2AvatarAssetId,
      name: testimonial2Name,
      role: testimonial2Role,
      company: testimonial2Company,
      text: testimonial2Text,
    },
    {
      avatarAssetId: testimonial3AvatarAssetId,
      name: testimonial3Name,
      role: testimonial3Role,
      company: testimonial3Company,
      text: testimonial3Text,
    },
  ]

  return (
    <section
      className={`testimonials01 testimonials01--${variant} testimonials01--density-${resolvedStyle.density} testimonials01--align-${resolvedStyle.alignment} testimonials01--divider-${resolvedStyle.dividerStyle}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="testimonials01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="testimonials01__header">
          <p className="testimonials01__eyebrow">{eyebrow}</p>
          <h2 className="testimonials01__title" id={titleId}>
            {title}
          </h2>
          <p className="testimonials01__subtitle">{subtitle}</p>
        </div>

        <div className="testimonials01__grid">
          {testimonials.map((testimonial, index) => {
            const avatar = assets.find((asset) => asset.id === testimonial.avatarAssetId)

            return (
              <figure key={index} className="testimonials01__item">
                {resolvedStyle.showQuoteMark ? (
                  <span className="testimonials01__quote-mark" aria-hidden="true">
                    &ldquo;
                  </span>
                ) : null}
                <blockquote className="testimonials01__quote">{testimonial.text}</blockquote>
                <figcaption className="testimonials01__attribution">
                  {avatar ? (
                    <img
                      className="testimonials01__avatar"
                      src={avatar.url}
                      alt={`Photo of ${testimonial.name}`}
                      style={{ width: resolvedStyle.avatarSize, height: resolvedStyle.avatarSize }}
                    />
                  ) : null}
                  <div className="testimonials01__person">
                    <span className="testimonials01__name">{testimonial.name}</span>
                    <span className="testimonials01__role">
                      {testimonial.role}
                      {testimonial.company ? `, ${testimonial.company}` : ''}
                    </span>
                  </div>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Testimonials01
