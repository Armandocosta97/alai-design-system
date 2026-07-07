import { useId, type CSSProperties } from 'react'
import type { ProjectAsset } from '../../../config/project'
import type { ProjectTheme } from '../../../config/theme'
import './Gallery01.css'

export type Gallery01Variant = 'grid' | 'editorial' | 'featured'

export type Gallery01Ratio = 'square' | 'portrait' | 'landscape' | 'original'

export type Gallery01Style = {
  containerWidth?: number
  paddingTop?: number
  paddingBottom?: number
  imageRadius?: number
  imageGap?: number
  imageRatio?: Gallery01Ratio
  showBorder?: boolean
}

export type Gallery01Props = {
  eyebrow: string
  title: string
  subtitle: string
  image1AssetId: string
  image1Alt: string
  image2AssetId: string
  image2Alt: string
  image3AssetId: string
  image3Alt: string
  image4AssetId: string
  image4Alt: string
  image5AssetId: string
  image5Alt: string
  image6AssetId: string
  image6Alt: string
  assets?: ProjectAsset[]
  theme?: ProjectTheme
  variantId?: string
  style?: Gallery01Style
}

export const gallery01DefaultProps: Gallery01Props = {
  eyebrow: 'Our work',
  title: 'A closer look at what we make',
  subtitle: 'A small selection, chosen to show range rather than volume.',
  image1AssetId: '',
  image1Alt: '',
  image2AssetId: '',
  image2Alt: '',
  image3AssetId: '',
  image3Alt: '',
  image4AssetId: '',
  image4Alt: '',
  image5AssetId: '',
  image5Alt: '',
  image6AssetId: '',
  image6Alt: '',
}

export const gallery01DefaultStyle: Required<Gallery01Style> = {
  containerWidth: 1200,
  paddingTop: 64,
  paddingBottom: 64,
  imageRadius: 12,
  imageGap: 16,
  imageRatio: 'landscape',
  showBorder: false,
}

// The first image is always the emphasized one in the Featured variant.
// There is no featuredImageIndex prop — reordering which photo reads as
// "featured" is a content edit (swap which prop group holds which image),
// never a new capability.
const gallery01Variants: Gallery01Variant[] = ['grid', 'editorial', 'featured']

function resolveGallery01Variant(variantId?: string): Gallery01Variant {
  return gallery01Variants.find((variant) => variant === variantId) ?? 'grid'
}

const ratioValueByOption: Record<Exclude<Gallery01Ratio, 'original'>, string> = {
  square: '1 / 1',
  portrait: '4 / 5',
  landscape: '3 / 2',
}

function Gallery01({
  eyebrow = gallery01DefaultProps.eyebrow,
  title = gallery01DefaultProps.title,
  subtitle = gallery01DefaultProps.subtitle,
  image1AssetId = gallery01DefaultProps.image1AssetId,
  image1Alt = gallery01DefaultProps.image1Alt,
  image2AssetId = gallery01DefaultProps.image2AssetId,
  image2Alt = gallery01DefaultProps.image2Alt,
  image3AssetId = gallery01DefaultProps.image3AssetId,
  image3Alt = gallery01DefaultProps.image3Alt,
  image4AssetId = gallery01DefaultProps.image4AssetId,
  image4Alt = gallery01DefaultProps.image4Alt,
  image5AssetId = gallery01DefaultProps.image5AssetId,
  image5Alt = gallery01DefaultProps.image5Alt,
  image6AssetId = gallery01DefaultProps.image6AssetId,
  image6Alt = gallery01DefaultProps.image6Alt,
  assets = [],
  theme: _theme,
  variantId,
  style,
}: Gallery01Props) {
  const titleId = useId()
  const variant = resolveGallery01Variant(variantId)
  const resolvedStyle = { ...gallery01DefaultStyle, ...style }

  const rootStyle: CSSProperties = {
    paddingTop: resolvedStyle.paddingTop,
    paddingBottom: resolvedStyle.paddingBottom,
  }

  const gridStyle: CSSProperties = {
    gap: resolvedStyle.imageGap,
  }

  const imageStyle: CSSProperties = {
    borderRadius: resolvedStyle.imageRadius,
    aspectRatio:
      resolvedStyle.imageRatio === 'original' ? undefined : ratioValueByOption[resolvedStyle.imageRatio],
    border: resolvedStyle.showBorder ? undefined : 'none',
  }

  const images = [
    { assetId: image1AssetId, alt: image1Alt },
    { assetId: image2AssetId, alt: image2Alt },
    { assetId: image3AssetId, alt: image3Alt },
    { assetId: image4AssetId, alt: image4Alt },
    { assetId: image5AssetId, alt: image5Alt },
    { assetId: image6AssetId, alt: image6Alt },
  ]

  return (
    <section
      className={`gallery01 gallery01--${variant} gallery01--ratio-${resolvedStyle.imageRatio}${resolvedStyle.showBorder ? ' gallery01--border' : ''}`}
      style={rootStyle}
      aria-labelledby={titleId}
    >
      <div
        className="gallery01__inner"
        style={{ maxWidth: resolvedStyle.containerWidth, marginInline: 'auto' }}
      >
        <div className="gallery01__header">
          <p className="gallery01__eyebrow">{eyebrow}</p>
          <h2 className="gallery01__title" id={titleId}>
            {title}
          </h2>
          <p className="gallery01__subtitle">{subtitle}</p>
        </div>

        <ul className="gallery01__grid" style={gridStyle}>
          {images.map((image, index) => {
            const asset = assets.find((item) => item.id === image.assetId)
            const hasAlt = image.alt.trim().length > 0

            return (
              <li key={index} className="gallery01__item">
                {asset ? (
                  <img
                    className="gallery01__image"
                    style={imageStyle}
                    src={asset.url}
                    alt={hasAlt ? image.alt : ''}
                  />
                ) : (
                  <div
                    className="gallery01__image gallery01__image--placeholder"
                    style={imageStyle}
                    role={hasAlt ? 'img' : undefined}
                    aria-label={hasAlt ? image.alt : undefined}
                    aria-hidden={hasAlt ? undefined : true}
                  >
                    <svg
                      className="gallery01__placeholder-glyph"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="8.5" cy="9.5" r="1.5" />
                      <path d="m4 17 5-5 3 3 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Gallery01
