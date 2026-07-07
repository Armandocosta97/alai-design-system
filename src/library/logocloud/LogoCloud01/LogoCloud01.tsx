import { useId, type CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './LogoCloud01.css'

export type LogoCloud01Variant = 'grid' | 'centered-strip'

export type LogoCloud01Treatment = 'color' | 'grayscale'
export type LogoCloud01Size = 'small' | 'medium' | 'large'

export type LogoCloud01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  logoTreatment?: LogoCloud01Treatment
  showCaptions?: boolean
  logoSize?: LogoCloud01Size
}

export type LogoCloud01Props = {
  eyebrow: string
  title: string
  subtitle: string
  logo1AssetId: string
  logo1CompanyName: string
  logo2AssetId: string
  logo2CompanyName: string
  logo3AssetId: string
  logo3CompanyName: string
  logo4AssetId: string
  logo4CompanyName: string
  logo5AssetId: string
  logo5CompanyName: string
  logo6AssetId: string
  logo6CompanyName: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: LogoCloud01Style
}

export const logoCloud01DefaultProps: LogoCloud01Props = {
  eyebrow: 'Trusted by',
  title: 'Teams who rely on us every day',
  subtitle: 'A few of the businesses we work alongside.',
  logo1AssetId: '',
  logo1CompanyName: 'Northwind',
  logo2AssetId: '',
  logo2CompanyName: 'Fieldnote',
  logo3AssetId: '',
  logo3CompanyName: 'Lumen',
  logo4AssetId: '',
  logo4CompanyName: 'Aldercroft',
  logo5AssetId: '',
  logo5CompanyName: 'Harborview',
  logo6AssetId: '',
  logo6CompanyName: 'Greystone',
}

export const logoCloud01DefaultStyle: Required<LogoCloud01Style> = {
  containerWidth: 1100,
  paddingTop: 48,
  paddingBottom: 48,
  logoTreatment: 'grayscale',
  showCaptions: false,
  logoSize: 'medium',
}

const logoCloud01Variants: LogoCloud01Variant[] = ['grid', 'centered-strip']

function resolveLogoCloud01Variant(variantId?: string): LogoCloud01Variant {
  return logoCloud01Variants.find((variant) => variant === variantId) ?? 'grid'
}

function initialsFor(companyName: string): string {
  const trimmed = companyName.trim()
  return trimmed ? trimmed[0].toUpperCase() : '?'
}

function LogoCloud01({
  eyebrow = logoCloud01DefaultProps.eyebrow,
  title = logoCloud01DefaultProps.title,
  subtitle = logoCloud01DefaultProps.subtitle,
  logo1AssetId = logoCloud01DefaultProps.logo1AssetId,
  logo1CompanyName = logoCloud01DefaultProps.logo1CompanyName,
  logo2AssetId = logoCloud01DefaultProps.logo2AssetId,
  logo2CompanyName = logoCloud01DefaultProps.logo2CompanyName,
  logo3AssetId = logoCloud01DefaultProps.logo3AssetId,
  logo3CompanyName = logoCloud01DefaultProps.logo3CompanyName,
  logo4AssetId = logoCloud01DefaultProps.logo4AssetId,
  logo4CompanyName = logoCloud01DefaultProps.logo4CompanyName,
  logo5AssetId = logoCloud01DefaultProps.logo5AssetId,
  logo5CompanyName = logoCloud01DefaultProps.logo5CompanyName,
  logo6AssetId = logoCloud01DefaultProps.logo6AssetId,
  logo6CompanyName = logoCloud01DefaultProps.logo6CompanyName,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: LogoCloud01Props) {
  const titleId = useId()
  const variant = resolveLogoCloud01Variant(variantId)
  const resolvedStyle = { ...logoCloud01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const logos = [
    { assetId: logo1AssetId, companyName: logo1CompanyName },
    { assetId: logo2AssetId, companyName: logo2CompanyName },
    { assetId: logo3AssetId, companyName: logo3CompanyName },
    { assetId: logo4AssetId, companyName: logo4CompanyName },
    { assetId: logo5AssetId, companyName: logo5CompanyName },
    { assetId: logo6AssetId, companyName: logo6CompanyName },
  ]

  return (
    <section
      className={`logocloud01 logocloud01--${variant} logocloud01--${resolvedStyle.logoSize} logocloud01--${resolvedStyle.logoTreatment}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="logocloud01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="logocloud01__header">
          <p className="logocloud01__eyebrow">{eyebrow}</p>
          <h2 className="logocloud01__title" id={titleId}>
            {title}
          </h2>
          <p className="logocloud01__subtitle">{subtitle}</p>
        </div>

        <ul className="logocloud01__grid">
          {logos.map((logo, index) => {
            const asset = assets.find((item) => item.id === logo.assetId)

            return (
              <li key={index} className="logocloud01__item">
                {asset ? (
                  <img
                    className="logocloud01__logo"
                    src={asset.url}
                    alt={`${logo.companyName} logo`}
                  />
                ) : (
                  <div
                    className="logocloud01__logo logocloud01__logo--placeholder"
                    role="img"
                    aria-label={`${logo.companyName} logo`}
                  >
                    <span aria-hidden="true">{initialsFor(logo.companyName)}</span>
                  </div>
                )}
                {resolvedStyle.showCaptions ? (
                  <span className="logocloud01__caption">{logo.companyName}</span>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default LogoCloud01
