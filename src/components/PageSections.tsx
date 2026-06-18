import Image from 'next/image'
import Link from 'next/link'
import { markdownLiteToHtml, looksLikeBlockHtml } from '@/lib/markdownLite'
import type {
  PageSection,
  ButtonSection,
  CardGridSection,
  ChecklistSection,
  ComparisonSection,
  FaqSection,
  ImageTextSection,
  MarkdownSection,
  SectionBackground,
  StepsSection,
} from '@/lib/pageSections'

// Renders pages.sections blocks using the same markup as the hand-built brand
// pages (sell-toyota et al.), so CMS-managed pages get real service-page
// sections — card grids, numbered steps, tick lists — instead of one long
// article body. Server component; expects sections already passed through
// parsePageSections + placeholder filling.

// Renders **gold** spans inside a heading: "Get a **Fair Offer**" → gold "Fair Offer".
function Accent({ text }: { text?: string }) {
  if (!text) return null
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="cms-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

// Optional gold uppercase eyebrow above a section heading.
function Eyebrow({ text }: { text?: string }) {
  return text ? <div className="cms-eyebrow">{text}</div> : null
}

const DEFAULT_BACKGROUND: Record<PageSection['type'], SectionBackground> = {
  markdown: 'white',
  cardGrid: 'cream',
  steps: 'white',
  checklist: 'white',
  faq: 'white',
  comparison: 'cream',
  imageText: 'white',
  button: 'white',
}

function bgClass(section: PageSection): string {
  const bg = section.background ?? DEFAULT_BACKGROUND[section.type]
  return bg === 'cream' ? 'section-cream' : 'bg-white'
}

function MarkdownBlock({ section }: { section: MarkdownSection }) {
  const html = looksLikeBlockHtml(section.content)
    ? section.content
    : markdownLiteToHtml(section.content)
  return (
    <section className={`py-16 ${bgClass(section)}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow text={section.eyebrow} />
        {section.heading && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            <Accent text={section.heading} />
          </h2>
        )}
        <div
          className="blog-content prose prose-lg prose-gray max-w-none text-gray-900"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  )
}

function CardGridBlock({ section }: { section: CardGridSection }) {
  return (
    <section className={`py-20 ${bgClass(section)}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(section.heading || section.subheading || section.eyebrow) && (
          <div className="text-center mb-12">
            <Eyebrow text={section.eyebrow} />
            {section.heading && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Accent text={section.heading} />
              </h2>
            )}
            {section.subheading && (
              <p className="text-xl text-gray-600">{section.subheading}</p>
            )}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.cards.map((card, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white"
            >
              {card.icon && <div className="text-4xl mb-4">{card.icon}</div>}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
              {card.description && <p className="text-gray-600">{card.description}</p>}
            </div>
          ))}
        </div>
        {section.footnote && (
          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">{section.footnote}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function StepsBlock({ section }: { section: StepsSection }) {
  return (
    <section className={`py-16 ${bgClass(section)}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow text={section.eyebrow} />
        {section.heading && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            <Accent text={section.heading} />
          </h2>
        )}
        {section.intro && (
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{section.intro}</p>
        )}
        <div className="space-y-4">
          {section.steps.map((step, i) => (
            <div key={i} className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                {step.body && <p className="text-gray-700">{step.body}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChecklistBlock({ section }: { section: ChecklistSection }) {
  return (
    <section className={`py-16 ${bgClass(section)}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow text={section.eyebrow} />
        {section.heading && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            <Accent text={section.heading} />
          </h2>
        )}
        {section.intro && (
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{section.intro}</p>
        )}
        <div className="space-y-3">
          {section.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl" style={{ color: '#FFC325' }}>
                &#10003;
              </span>
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqBlock({ section }: { section: FaqSection }) {
  // Native <details>/<summary> accordion — real click-to-expand with zero
  // JavaScript (works in this server component), keyboard-accessible, and the
  // answer text stays in the DOM (collapsed) so SEO + the FAQ JSON-LD are
  // unaffected. The +/- indicator is pure CSS: the vertical bar collapses when
  // the <details> is open.
  return (
    <section className={`py-16 ${bgClass(section)}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow text={section.eyebrow} />
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          <Accent text={section.heading || 'Frequently Asked Questions'} />
        </h2>
        <div className="space-y-4">
          {section.items.map((item, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-gray-200 open:shadow-sm"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                <span
                  className="relative h-4 w-4 flex-shrink-0"
                  style={{ color: '#FFC325' }}
                  aria-hidden="true"
                >
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded bg-current transition-transform duration-200 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="px-6 pb-5 text-gray-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// Static class strings per column count — Tailwind can't see interpolated
// classes, so these must be written out.
const COMPARISON_GRID: Record<number, string> = {
  1: 'grid gap-8 max-w-md mx-auto',
  2: 'grid md:grid-cols-2 gap-8',
  3: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
  4: 'grid md:grid-cols-2 lg:grid-cols-4 gap-8',
}

function ComparisonBlock({ section }: { section: ComparisonSection }) {
  const gridCls = COMPARISON_GRID[Math.min(section.columns.length, 4)]
  return (
    <section className={`py-20 ${bgClass(section)}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(section.heading || section.intro || section.eyebrow) && (
          <div className="text-center mb-12">
            <Eyebrow text={section.eyebrow} />
            {section.heading && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Accent text={section.heading} />
              </h2>
            )}
            {section.intro && <p className="text-xl text-gray-600">{section.intro}</p>}
          </div>
        )}
        <div className={gridCls}>
          {section.columns.map((col, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-xl bg-white ${
                col.highlight ? 'border-2 shadow-lg' : 'border border-gray-200'
              }`}
              style={col.highlight ? { borderColor: '#FFC325' } : undefined}
            >
              {col.badge && <div className="cms-badge">{col.badge}</div>}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                <Accent text={col.title} />
              </h3>
              <div className="space-y-4">
                {col.rows.map((row, j) => (
                  <div key={j}>
                    {row.label && (
                      <p className={`cms-row-label${row.tone ? ` cms-row-label--${row.tone}` : ''}`}>
                        {row.label}
                      </p>
                    )}
                    {row.text && <p className="text-gray-700">{row.text}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageTextBlock({ section }: { section: ImageTextSection }) {
  const imageLeft = section.imagePosition === 'left'
  const bodyHtml = section.body
    ? looksLikeBlockHtml(section.body)
      ? section.body
      : markdownLiteToHtml(section.body)
    : null
  return (
    <section className={`py-16 ${bgClass(section)} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className={imageLeft ? 'lg:order-2' : ''}>
            <Eyebrow text={section.eyebrow} />
            {section.heading && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Accent text={section.heading} />
              </h2>
            )}
            {bodyHtml && (
              <div
                className="text-lg text-gray-600 mb-6 space-y-4"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            )}
            {section.items && (
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl" style={{ color: '#FFC325' }}>
                      &#10003;
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={`flex justify-center items-center ${imageLeft ? 'lg:order-1' : ''}`}>
            <div className="relative w-full max-w-md">
              <Image
                src={section.image}
                alt={section.imageAlt || section.heading || 'Auto-Sell.ai'}
                width={600}
                height={400}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ButtonBlock({ section }: { section: ButtonSection }) {
  return (
    <section className={`py-8 ${bgClass(section)}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href={section.link || '#sell-form'}
          className="btn-pill-gold px-12 py-4 text-xl inline-block"
        >
          {section.text}
        </Link>
      </div>
    </section>
  )
}

function renderBlock(section: PageSection) {
  switch (section.type) {
    case 'markdown':
      return <MarkdownBlock section={section} />
    case 'cardGrid':
      return <CardGridBlock section={section} />
    case 'steps':
      return <StepsBlock section={section} />
    case 'checklist':
      return <ChecklistBlock section={section} />
    case 'faq':
      return <FaqBlock section={section} />
    case 'comparison':
      return <ComparisonBlock section={section} />
    case 'imageText':
      return <ImageTextBlock section={section} />
    case 'button':
      return <ButtonBlock section={section} />
  }
}

// Stable, author-targetable class hooks on every section so page Custom CSS can
// style them: `.cms-section`, `.cms-section--<type>`, `.cms-section--<type>-<n>`
// (n = 1-based index among same-type sections), plus the section's own optional
// `className`. The wrapper is layout-transparent (full-width block).
export default function PageSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section, i) => {
        const typeIndex = sections
          .slice(0, i + 1)
          .filter((s) => s.type === section.type).length
        const cls = [
          'cms-section',
          `cms-section--${section.type}`,
          `cms-section--${section.type}-${typeIndex}`,
          section.className,
        ]
          .filter((c): c is string => Boolean(c))
          .join(' ')
        return (
          <div key={i} className={cls}>
            {renderBlock(section)}
          </div>
        )
      })}
    </>
  )
}
