import { useId, type CSSProperties, type FormEvent } from 'react'
import type { ProjectTheme } from '../../../config/theme'
import './Form01.css'

export type Form01Variant = 'split' | 'card' | 'stacked'

export type Form01Alignment = 'center' | 'left'
export type Form01FieldStyle = 'outline' | 'filled' | 'underline'

export type Form01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  alignment?: Form01Alignment
  surface?: boolean
  fieldStyle?: Form01FieldStyle
  showSidePanel?: boolean
}

export type Form01Props = {
  eyebrow: string
  title: string
  subtitle: string
  formTitle: string
  formDescription: string
  nameLabel: string
  emailLabel: string
  phoneLabel: string
  messageLabel: string
  submitLabel: string
  formAction: string
  helperNote: string
  sideTitle: string
  sideDescription: string
  email: string
  phone: string
  address: string
  openingHours: string
  theme?: ProjectTheme
  variantId?: string
  style?: Form01Style
}

export const form01DefaultProps: Form01Props = {
  eyebrow: 'Contact',
  title: 'Let’s start a conversation',
  subtitle: 'Tell us a bit about your project and we will get back to you shortly.',
  formTitle: 'Send a message',
  formDescription: 'Fill in the form and our team will respond within one business day.',
  nameLabel: 'Full name',
  emailLabel: 'Email address',
  phoneLabel: 'Phone number',
  messageLabel: 'Message',
  submitLabel: 'Send Message',
  formAction: '',
  helperNote: 'We typically reply within one business day.',
  sideTitle: 'Prefer to reach out directly?',
  sideDescription: 'Our team is available during business hours to answer any questions.',
  email: 'hello@studio.com',
  phone: '+1 (555) 012-3456',
  address: '128 Wren Street, Suite 4\nLondon, WC1X 9NL',
  openingHours: 'Monday – Friday, 9:00 – 18:00',
}

export const form01DefaultStyle: Required<Form01Style> = {
  containerWidth: 1100,
  paddingTop: 72,
  paddingBottom: 72,
  alignment: 'center',
  surface: false,
  fieldStyle: 'outline',
  showSidePanel: true,
}

const form01Variants: Form01Variant[] = ['split', 'card', 'stacked']

function resolveForm01Variant(variantId?: string): Form01Variant {
  return form01Variants.find((variant) => variant === variantId) ?? 'split'
}

function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`
}

function toMailtoHref(email: string): string {
  return `mailto:${email.trim()}`
}

// Exported static sites have no server by default. A demo notice always
// takes over the note slot when no real formAction is configured, so an
// exported site can never silently imply a submission was received when
// nothing was actually sent anywhere.
const demoFormNotice =
  'This is a template form — no data is sent yet. Connect a form backend (e.g. Formspree, Netlify Forms) via the Form Action setting to start receiving submissions.'

function Form01({
  eyebrow = form01DefaultProps.eyebrow,
  title = form01DefaultProps.title,
  subtitle = form01DefaultProps.subtitle,
  formTitle = form01DefaultProps.formTitle,
  formDescription = form01DefaultProps.formDescription,
  nameLabel = form01DefaultProps.nameLabel,
  emailLabel = form01DefaultProps.emailLabel,
  phoneLabel = form01DefaultProps.phoneLabel,
  messageLabel = form01DefaultProps.messageLabel,
  submitLabel = form01DefaultProps.submitLabel,
  formAction = form01DefaultProps.formAction,
  helperNote = form01DefaultProps.helperNote,
  sideTitle = form01DefaultProps.sideTitle,
  sideDescription = form01DefaultProps.sideDescription,
  email = form01DefaultProps.email,
  phone = form01DefaultProps.phone,
  address = form01DefaultProps.address,
  openingHours = form01DefaultProps.openingHours,
  theme: _theme,
  variantId,
  style,
}: Form01Props) {
  const titleId = useId()
  const fieldUid = useId()
  const variant = resolveForm01Variant(variantId)
  const resolvedStyle = { ...form01DefaultStyle, ...style }

  const hasFormAction = formAction.trim().length > 0
  const hasFormDescription = formDescription.trim().length > 0
  const hasSideDescription = sideDescription.trim().length > 0
  const hasEmail = email.trim().length > 0
  const hasPhone = phone.trim().length > 0
  const hasAddress = address.trim().length > 0
  const hasOpeningHours = openingHours.trim().length > 0
  const noteText = hasFormAction ? (helperNote.trim().length > 0 ? helperNote : null) : demoFormNotice

  const nameId = `${fieldUid}-name`
  const emailId = `${fieldUid}-email`
  const phoneId = `${fieldUid}-phone`
  const messageId = `${fieldUid}-message`

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!hasFormAction) {
      event.preventDefault()
    }
  }

  return (
    <section
      className={`form01 form01--${variant} form01--align-${resolvedStyle.alignment} form01--field-${resolvedStyle.fieldStyle}${resolvedStyle.surface ? ' form01--surface' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="form01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="form01__header">
          <p className="form01__eyebrow">{eyebrow}</p>
          <h2 className="form01__title" id={titleId}>
            {title}
          </h2>
          <p className="form01__subtitle">{subtitle}</p>
        </div>

        <div className="form01__content">
          <div className="form01__form-panel">
            <h3 className="form01__form-title">{formTitle}</h3>
            {hasFormDescription ? <p className="form01__form-description">{formDescription}</p> : null}

            <form
              className="form01__form"
              action={hasFormAction ? formAction : undefined}
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="form01__field">
                <label className="form01__label" htmlFor={nameId}>
                  {nameLabel}
                </label>
                <input className="form01__input" id={nameId} name="name" type="text" required />
              </div>

              <div className="form01__field">
                <label className="form01__label" htmlFor={emailId}>
                  {emailLabel}
                </label>
                <input className="form01__input" id={emailId} name="email" type="email" required />
              </div>

              <div className="form01__field">
                <label className="form01__label" htmlFor={phoneId}>
                  {phoneLabel}
                </label>
                <input className="form01__input" id={phoneId} name="phone" type="tel" />
              </div>

              <div className="form01__field">
                <label className="form01__label" htmlFor={messageId}>
                  {messageLabel}
                </label>
                <textarea className="form01__textarea" id={messageId} name="message" rows={5} required />
              </div>

              <button className="form01__submit" type="submit">
                {submitLabel}
              </button>

              {noteText ? <p className="form01__note">{noteText}</p> : null}
            </form>
          </div>

          {resolvedStyle.showSidePanel ? (
            <div className="form01__side">
              <h3 className="form01__side-title">{sideTitle}</h3>
              {hasSideDescription ? <p className="form01__side-description">{sideDescription}</p> : null}

              <div className="form01__side-details">
                {hasEmail ? (
                  <div className="form01__side-detail">
                    <p className="form01__side-detail-label">Email</p>
                    <a className="form01__side-detail-value form01__side-detail-link" href={toMailtoHref(email)}>
                      {email}
                    </a>
                  </div>
                ) : null}

                {hasPhone ? (
                  <div className="form01__side-detail">
                    <p className="form01__side-detail-label">Phone</p>
                    <a className="form01__side-detail-value form01__side-detail-link" href={toTelHref(phone)}>
                      {phone}
                    </a>
                  </div>
                ) : null}

                {hasAddress ? (
                  <div className="form01__side-detail">
                    <p className="form01__side-detail-label">Address</p>
                    <p className="form01__side-detail-value">{address}</p>
                  </div>
                ) : null}

                {hasOpeningHours ? (
                  <div className="form01__side-detail">
                    <p className="form01__side-detail-label">Opening Hours</p>
                    <p className="form01__side-detail-value">{openingHours}</p>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Form01
