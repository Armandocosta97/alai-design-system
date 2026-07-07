import {
  Component,
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ComponentManifest } from '../config/componentManifest'
import type { ProjectAsset } from '../config/project'
import { defaultProjectTheme } from '../config/theme'

type ComponentThumbnailProps = {
  manifest: ComponentManifest
}

// A representative "design width" every live preview renders at, then gets
// scaled down to whatever the card's actual width is. Matches the theme's
// own default container width so previews look proportionally correct.
const DESIGN_WIDTH = 1200

const placeholderAssets: ProjectAsset[] = [
  {
    id: 'thumbnail-placeholder-asset',
    name: 'placeholder.jpg',
    type: 'image/jpeg',
    url: '/assets/hero.jpg',
    size: 0,
    createdAt: new Date(0).toISOString(),
  },
]

function getDefaultProps(manifest: ComponentManifest) {
  return manifest.props.reduce<Record<string, unknown>>((defaults, prop) => {
    defaults[prop.key] = prop.defaultValue
    return defaults
  }, {})
}

function getDefaultStyle(manifest: ComponentManifest) {
  return (manifest.styleControls ?? []).reduce<Record<string, unknown>>((defaults, control) => {
    defaults[control.key] = control.defaultValue
    return defaults
  }, {})
}

type ThumbnailErrorBoundaryProps = { children: ReactNode }
type ThumbnailErrorBoundaryState = { hasError: boolean }

class ThumbnailErrorBoundary extends Component<
  ThumbnailErrorBoundaryProps,
  ThumbnailErrorBoundaryState
> {
  state: ThumbnailErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    // Intentionally swallowed — the "No Preview" fallback below communicates this.
  }

  render() {
    if (this.state.hasError) {
      return <div className="component-thumbnail__fallback">No Preview</div>
    }

    return this.props.children
  }
}

function LiveComponentPreview({ manifest }: { manifest: ComponentManifest }) {
  if (!manifest.component) {
    return <div className="component-thumbnail__fallback">No Preview</div>
  }

  const previewProps = {
    ...getDefaultProps(manifest),
    theme: defaultProjectTheme,
    assets: placeholderAssets,
    variantId: manifest.variants?.[0]?.id,
    style: getDefaultStyle(manifest),
  }

  return createElement(manifest.component, previewProps)
}

/**
 * Renders a real, live preview of a component at manifest-default props/theme,
 * scaled down to fit its container. Reusable anywhere a component card is
 * shown (Builder sidebar, category pages, future plugin browsers).
 */
function ComponentThumbnail({ manifest }: ComponentThumbnailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) {
      return
    }

    if (typeof ResizeObserver === 'undefined') {
      setContainerWidth(node.clientWidth)
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      return
    }

    const node = containerRef.current
    if (!node) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true)
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  const scale = containerWidth > 0 ? containerWidth / DESIGN_WIDTH : 0

  return (
    <div ref={containerRef} className="component-thumbnail" aria-hidden="true">
      {manifest.thumbnail ? (
        <img className="component-thumbnail__image" src={manifest.thumbnail} alt="" />
      ) : isVisible && scale > 0 ? (
        <div className="component-thumbnail__stage">
          <div
            className="component-thumbnail__scale"
            style={{ width: DESIGN_WIDTH, transform: `scale(${scale})` }}
          >
            <ThumbnailErrorBoundary>
              <LiveComponentPreview manifest={manifest} />
            </ThumbnailErrorBoundary>
          </div>
        </div>
      ) : (
        <div className="component-thumbnail__placeholder" />
      )}
    </div>
  )
}

export default ComponentThumbnail
