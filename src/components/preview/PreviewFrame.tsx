import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type PreviewFrameProps = {
  title: string
  width: string
  children: ReactNode
}

/**
 * Clones every <style>/<link rel="stylesheet"> the host app has loaded into
 * the iframe's own document. An iframe is a separate document with its own
 * CSSOM — content rendered into it via a portal has zero styling unless the
 * relevant stylesheets are copied in explicitly. This is what actually
 * makes component CSS (Hero02.css, FAQ01.css, ...) and the theme CSS custom
 * properties apply inside the frame.
 */
function copyStylesInto(doc: Document) {
  const nodes = document.head.querySelectorAll('style, link[rel="stylesheet"]')

  nodes.forEach((node) => {
    const clone = node.cloneNode(true) as HTMLStyleElement | HTMLLinkElement

    if (clone instanceof HTMLLinkElement) {
      const href = clone.getAttribute('href')
      if (href) {
        clone.href = new URL(href, window.location.href).href
      }
    }

    doc.head.appendChild(clone)
  })
}

/**
 * A same-origin iframe with its content rendered via a React portal — a real
 * isolated browsing context (its own document, its own CSS media-query
 * viewport, its own scroll), not a resized <div>. This is what makes the
 * Desktop/Tablet/Mobile viewport controls actually change component layout
 * (their CSS media queries react to the iframe's real width) instead of
 * just resizing an outer box.
 *
 * Only ever set up once per mount — re-running the setup after the portal
 * has already rendered into it would wipe the mount node out from under
 * React. Changing `width` afterwards just resizes the iframe element; the
 * document and its React tree stay put (FAQ open state, scroll position,
 * etc. survive a viewport switch).
 */
function PreviewFrame({ title, width, children }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    const doc = iframe?.contentDocument
    if (!doc?.body) {
      return
    }

    doc.body.style.margin = '0'
    copyStylesInto(doc)

    const root = doc.createElement('div')
    doc.body.appendChild(root)

    // Same-page hash links (#faq, #contact, ...) should use the iframe's own
    // native anchor-scroll behavior. Anything pointing off-page should open
    // in a new tab rather than navigate the iframe's own browsing context
    // away from the preview (mailto:/tel: are left to normal OS handling).
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest('a')
      const href = anchor?.getAttribute('href')
      if (href && /^https?:\/\//.test(href)) {
        event.preventDefault()
        window.open(href, '_blank', 'noopener,noreferrer')
      }
    }
    doc.body.addEventListener('click', handleClick)

    setMountNode(root)

    return () => {
      doc.body.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      <iframe ref={iframeRef} title={title} className="preview-frame__iframe" style={{ width }} />
      {mountNode ? createPortal(children, mountNode) : null}
    </>
  )
}

export default PreviewFrame
