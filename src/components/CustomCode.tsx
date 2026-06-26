'use client'

import { useEffect } from 'react'

/**
 * Injects per-page Custom JS/HTML (pages.custom_js) into the document.
 *
 * Re-creates any <script> elements so they actually execute (scripts set via
 * innerHTML don't run), and appends other markup verbatim — e.g.
 * <script type="application/ld+json"> structured data, which Google reads after
 * render. This runs arbitrary author code by design; the field is admin-only.
 */
export default function CustomCode({ code }: { code: string }) {
  useEffect(() => {
    if (!code) return
    const tpl = document.createElement('template')
    tpl.innerHTML = code

    const added: ChildNode[] = []
    Array.from(tpl.content.childNodes).forEach((node) => {
      let el: ChildNode
      if (node.nodeName === 'SCRIPT') {
        // A cloned/innerHTML script won't execute — rebuild it so it does.
        const src = node as HTMLScriptElement
        const s = document.createElement('script')
        Array.from(src.attributes).forEach((attr) => s.setAttribute(attr.name, attr.value))
        s.textContent = src.textContent
        el = s
      } else {
        el = node.cloneNode(true) as ChildNode
      }
      document.body.appendChild(el)
      added.push(el)
    })

    return () => {
      added.forEach((n) => n.parentNode?.removeChild(n))
    }
  }, [code])

  return null
}
