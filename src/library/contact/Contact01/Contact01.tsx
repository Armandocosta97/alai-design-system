import { useId, type CSSProperties } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Contact01.css'

export type Contact01Variant = 'centered' | 'split' | 'information-card'

export type Contact01Alignment = 'center' | 'left'
export type Contact01DividerStyle = 'none' | 'line'

export type Contact01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  alignment?: Contact01Alignment
  surface?: boolean
  dividerStyle?: Contact01DividerStyle
}

export type Contact01Props = {
  eyebrow: string
  title: string
  subtitle: string
  businessName: string
  address: string
  phone: string
  email: string
  openingHours: string
  ctaLabel: string
  ctaHref: string
  directionsLabel: string
  directionsUrl: string
  theme?: ProjectTheme
  variantId?: string
  style?: Contact01Style
}

export const contact01DefaultProps: Contact01Props = {
  eyebrow: 'Get in touch',
  title: 'We would love to hear from you',
  subtitle: 'Reach out directly, or stop by during opening hours.',
  businessName: 'Aldercroft Studio',
  address: '128 Wren Street, Suite 4\nLondon, WC1X 9NL',
  phone: '+44 20 7946 0958',
  email: 'hello@aldercroft.studio',
  openingHours: 'Monday – Friday, 9:00 – 18:00',
  ctaLabel: 'Book a call',
  ctaHref: '#book-a-call',
  directionsLabel: 'Get directions',
  directionsUrl: 'https://maps.google.com',
}

export const contact01DefaultStyle: Required<Contact01Style> = {
  containerWidth: 1000,
  paddingTop: 64,
  paddingBottom: 64,
  alignment: 'center',
  surface: false,
  dividerStyle: 'line',
}

const contact01Variants: Contact01Variant[] = ['centered', 'split', 'information-card']

function resolveContact01Variant(variantId?: string): Contact01Variant {
  return contact01Variants.find((variant) => variant === variantId) ?? 'centered'
}

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`
}

function toMailtoHref(email: string): string {
  return `mailto:${email.trim()}`
}

function Contact01({
  eyebrow = contact01DefaultProps.eyebrow,
  title = contact01DefaultProps.title,
  subtitle = contact01DefaultProps.subtitle,
  businessName = contact01DefaultProps.businessName,
  address = contact01DefaultProps.address,
  phone = contact01DefaultProps.phone,
  email = contact01DefaultProps.email,
  openingHours = contact01DefaultProps.openingHours,
  ctaLabel = contact01DefaultProps.ctaLabel,
  ctaHref = contact01DefaultProps.ctaHref,
  directionsLabel = contact01DefaultProps.directionsLabel,
  directionsUrl = contact01DefaultProps.directionsUrl,
  theme: _theme,
  variantId,
  style,
}: Contact01Props) {
  const titleId = useId()
  const variant = resolveContact01Variant(variantId)
  const resolvedStyle = { ...contact01DefaultStyle, ...style }
  const hasCta = ctaLabel.trim().length > 0
  const hasDirections = directionsLabel.trim().length > 0

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  return (
    <section
      className={`contact01 contact01--${variant} contact01--align-${resolvedStyle.alignment} contact01--divider-${resolvedStyle.dividerStyle}${resolvedStyle.surface ? ' contact01--surface' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="contact01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="contact01__header">
          <p className="contact01__eyebrow">{eyebrow}</p>
          <h2 className="contact01__title" id={titleId}>
            {title}
          </h2>
          <p className="contact01__subtitle">{subtitle}</p>
        </div>

        <div className="contact01__content">
          <address className="contact01__details">
            <p className="contact01__business-name">{businessName}</p>

            <div className="contact01__detail">
              <p className="contact01__detail-label">Address</p>
              <p className="contact01__detail-value">{address}</p>
            </div>

            <div className="contact01__detail">
              <p className="contact01__detail-label">Phone</p>
              <a className="contact01__detail-value contact01__detail-link" href={toTelHref(phone)}>
                {phone}
              </a>
            </div>

            <div className="contact01__detail">
              <p className="contact01__detail-label">Email</p>
              <a className="contact01__detail-value contact01__detail-link" href={toMailtoHref(email)}>
                {email}
              </a>
            </div>

            <div className="contact01__detail">
              <p className="contact01__detail-label">Opening Hours</p>
              <p className="contact01__detail-value">{openingHours}</p>
            </div>
          </address>

          {hasCta || hasDirections ? (
            <div className="contact01__actions">
              {hasCta ? (
                <a className="contact01__cta" href={ctaHref}>
                  {ctaLabel}
                </a>
              ) : null}
              {hasDirections ? (
                <a className="contact01__directions" href={directionsUrl}>
                  {directionsLabel}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Contact01
