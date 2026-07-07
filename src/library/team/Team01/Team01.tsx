import { useId, type CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './Team01.css'

export type Team01Variant = 'grid' | 'editorial' | 'compact-list'

export type Team01Ratio = 'square' | 'portrait' | 'original'
export type Team01Radius = 'small' | 'medium' | 'large' | 'full'

export type Team01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  imageRadius?: Team01Radius
  imageRatio?: Team01Ratio
  showBio?: boolean
  showBorder?: boolean
}

export type Team01Props = {
  eyebrow: string
  title: string
  subtitle: string
  member1PhotoAssetId: string
  member1Name: string
  member1Role: string
  member1ShortBio: string
  member2PhotoAssetId: string
  member2Name: string
  member2Role: string
  member2ShortBio: string
  member3PhotoAssetId: string
  member3Name: string
  member3Role: string
  member3ShortBio: string
  member4PhotoAssetId: string
  member4Name: string
  member4Role: string
  member4ShortBio: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: Team01Style
}

export const team01DefaultProps: Team01Props = {
  eyebrow: 'The team',
  title: 'The people behind the work',
  subtitle: 'A small team, directly involved in every project.',
  member1PhotoAssetId: '',
  member1Name: 'Elena Marchetti',
  member1Role: 'Founder & Creative Director',
  member1ShortBio: 'Leads every project from first sketch to final delivery.',
  member2PhotoAssetId: '',
  member2Name: 'Marco Ferrara',
  member2Role: 'Lead Designer',
  member2ShortBio: 'Turns rough ideas into interfaces people actually enjoy using.',
  member3PhotoAssetId: '',
  member3Name: 'Giulia Conti',
  member3Role: 'Client Partner',
  member3ShortBio: 'The first and last person you will talk to on any project.',
  member4PhotoAssetId: '',
  member4Name: 'Davide Romano',
  member4Role: 'Engineering Lead',
  member4ShortBio: 'Makes sure what gets designed also gets shipped, reliably.',
}

export const team01DefaultStyle: Required<Team01Style> = {
  containerWidth: 1100,
  paddingTop: 64,
  paddingBottom: 64,
  imageRadius: 'medium',
  imageRatio: 'square',
  showBio: true,
  showBorder: false,
}

const team01Variants: Team01Variant[] = ['grid', 'editorial', 'compact-list']

function resolveTeam01Variant(variantId?: string): Team01Variant {
  return team01Variants.find((variant) => variant === variantId) ?? 'grid'
}

const ratioValueByOption: Record<Exclude<Team01Ratio, 'original'>, string> = {
  square: '1 / 1',
  portrait: '4 / 5',
}

const radiusValueByOption: Record<Team01Radius, number | string> = {
  small: 8,
  medium: 16,
  large: 24,
  full: '9999px',
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function Team01({
  eyebrow = team01DefaultProps.eyebrow,
  title = team01DefaultProps.title,
  subtitle = team01DefaultProps.subtitle,
  member1PhotoAssetId = team01DefaultProps.member1PhotoAssetId,
  member1Name = team01DefaultProps.member1Name,
  member1Role = team01DefaultProps.member1Role,
  member1ShortBio = team01DefaultProps.member1ShortBio,
  member2PhotoAssetId = team01DefaultProps.member2PhotoAssetId,
  member2Name = team01DefaultProps.member2Name,
  member2Role = team01DefaultProps.member2Role,
  member2ShortBio = team01DefaultProps.member2ShortBio,
  member3PhotoAssetId = team01DefaultProps.member3PhotoAssetId,
  member3Name = team01DefaultProps.member3Name,
  member3Role = team01DefaultProps.member3Role,
  member3ShortBio = team01DefaultProps.member3ShortBio,
  member4PhotoAssetId = team01DefaultProps.member4PhotoAssetId,
  member4Name = team01DefaultProps.member4Name,
  member4Role = team01DefaultProps.member4Role,
  member4ShortBio = team01DefaultProps.member4ShortBio,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: Team01Props) {
  const titleId = useId()
  const variant = resolveTeam01Variant(variantId)
  const resolvedStyle = { ...team01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const photoStyle: CSSProperties = {
    borderRadius: radiusValueByOption[resolvedStyle.imageRadius],
    aspectRatio:
      resolvedStyle.imageRatio === 'original' ? undefined : ratioValueByOption[resolvedStyle.imageRatio],
    border: resolvedStyle.showBorder ? undefined : 'none',
  }

  const members = [
    { photoAssetId: member1PhotoAssetId, name: member1Name, role: member1Role, shortBio: member1ShortBio },
    { photoAssetId: member2PhotoAssetId, name: member2Name, role: member2Role, shortBio: member2ShortBio },
    { photoAssetId: member3PhotoAssetId, name: member3Name, role: member3Role, shortBio: member3ShortBio },
    { photoAssetId: member4PhotoAssetId, name: member4Name, role: member4Role, shortBio: member4ShortBio },
  ]

  return (
    <section
      className={`team01 team01--${variant} team01--radius-${resolvedStyle.imageRadius}${resolvedStyle.showBorder ? ' team01--border' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="team01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="team01__header">
          <p className="team01__eyebrow">{eyebrow}</p>
          <h2 className="team01__title" id={titleId}>
            {title}
          </h2>
          <p className="team01__subtitle">{subtitle}</p>
        </div>

        <ul className="team01__grid">
          {members.map((member, index) => {
            const asset = assets.find((item) => item.id === member.photoAssetId)
            const hasName = member.name.trim().length > 0
            const initials = initialsFor(member.name)

            return (
              <li key={index} className="team01__item">
                {asset ? (
                  <img
                    className="team01__photo"
                    style={photoStyle}
                    src={asset.url}
                    alt={hasName ? `Photo of ${member.name}` : ''}
                  />
                ) : (
                  <div
                    className="team01__photo team01__photo--placeholder"
                    style={photoStyle}
                    role={hasName ? 'img' : undefined}
                    aria-label={hasName ? `Photo of ${member.name}` : undefined}
                    aria-hidden={hasName ? undefined : true}
                  >
                    {hasName ? (
                      <span className="team01__initials" aria-hidden="true">
                        {initials}
                      </span>
                    ) : (
                      <svg
                        className="team01__placeholder-glyph"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="8.5" r="3.5" />
                        <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                )}

                <h3 className="team01__name">{member.name}</h3>
                <p className="team01__role">{member.role}</p>
                {resolvedStyle.showBio ? <p className="team01__bio">{member.shortBio}</p> : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Team01
