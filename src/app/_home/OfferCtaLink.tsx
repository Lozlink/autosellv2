'use client'

/**
 * OfferCtaLink — anchor to the hero offer form that scrolls to the form's
 * BOTTOM edge on mobile, so the whole panel (fields + submit button) fills
 * the screen. A plain `href="#offer"` can only align the target's top edge,
 * which left the submit button below the fold on small screens.
 *
 * Desktop (lg+) keeps native anchor behaviour: the form sits beside the
 * headline inside the hero, so top-aligning the section is already correct.
 *
 * The `#offer-form` container carries a `scroll-mb-*` class so the fixed
 * MobileBottomBar doesn't cover the submit button after the scroll.
 */
export default function OfferCtaLink({
  className,
  style,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <a
      href="#offer"
      className={className}
      style={style}
      onClick={(e) => {
        // lg breakpoint (1024px) — matches the layout switch in the hero.
        if (window.matchMedia('(min-width: 1024px)').matches) return
        const form = document.getElementById('offer-form')
        if (!form) return
        e.preventDefault()
        form.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }}
    >
      {children}
    </a>
  )
}
