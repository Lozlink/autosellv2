'use client'

import BlogEditor from '@/components/BlogEditor'
import type { PageSection, SectionBackground } from '@/lib/pageSections'
import { SECTION_TYPE_LABELS } from '@/lib/pageSections'

// Admin builder for pages.sections. Works on draft state directly (empty rows
// allowed while editing); the API parses and drops incomplete entries on save,
// so the DB only ever stores clean sections.

// Width-less base so fixed-width variants (e.g. the icon input) can set their
// own width — appending `w-16` after `w-full` does NOT reliably override it,
// since Tailwind resolves conflicts by stylesheet order, not class order.
const inputBaseCls =
  'px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]'
const inputCls = `w-full ${inputBaseCls}`
const smallBtnCls =
  'text-xs px-2 py-1 rounded border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 disabled:opacity-30 disabled:hover:text-gray-500 disabled:hover:border-gray-200'

function newSection(type: PageSection['type']): PageSection {
  switch (type) {
    case 'markdown':
      return { type, heading: '', content: '' }
    case 'cardGrid':
      return { type, heading: '', subheading: '', cards: [{ icon: '', title: '', description: '' }], footnote: '' }
    case 'steps':
      return { type, heading: '', intro: '', steps: [{ title: '', body: '' }] }
    case 'checklist':
      return { type, heading: '', intro: '', items: [] }
    case 'faq':
      return { type, heading: '', items: [{ question: '', answer: '' }] }
    case 'comparison':
      return {
        type,
        heading: '',
        intro: '',
        columns: [
          { title: '', rows: [{ label: '', text: '' }] },
          { title: '', rows: [{ label: '', text: '' }] },
        ],
      }
    case 'imageText':
      return { type, heading: '', body: '', items: [], image: '', imageAlt: '' }
    case 'button':
      return { type, text: '', link: '' }
  }
}

export default function SectionsEditor({
  value,
  onChange,
}: {
  value: PageSection[]
  onChange: (next: PageSection[]) => void
}) {
  const update = (index: number, next: PageSection) => {
    onChange(value.map((s, i) => (i === index ? next : s)))
  }

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const move = (index: number, delta: -1 | 1) => {
    const target = index + delta
    if (target < 0 || target >= value.length) return
    const next = [...value]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  const add = (type: PageSection['type']) => {
    onChange([...value, newSection(type)])
  }

  return (
    <div className="space-y-4">
      {value.length === 0 && (
        <p className="text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg p-4 text-center">
          No sections yet. Add text blocks, card grids, numbered steps, checklists or FAQs —
          together they make up the page body, styled like the brand pages.
        </p>
      )}

      {value.map((section, i) => (
        <div key={i} className="border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between px-4 py-2 bg-yellow-50 rounded-t-lg">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-semibold text-gray-700">
                {i + 1}. {SECTION_TYPE_LABELS[section.type]}
              </span>
              <code
                className="text-[11px] text-gray-600 bg-white border border-yellow-200 rounded px-1.5 py-0.5 whitespace-nowrap"
                title="Default CSS hook for this section — target it from the page's Custom CSS"
              >
                .cms-section--{section.type}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={smallBtnCls} title="Move up">
                &uarr;
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} className={smallBtnCls} title="Move down">
                &darr;
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs px-2 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <SectionFields section={section} onChange={(next) => update(i, next)} />
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Eyebrow (optional) — small gold label above the heading
              </label>
              <input
                value={section.eyebrow ?? ''}
                onChange={(e) => update(i, { ...section, eyebrow: e.target.value })}
                placeholder="e.g. WHY AUTO-SELL.AI"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                CSS class (optional) — target it from the page&apos;s Custom CSS
              </label>
              <input
                value={section.className ?? ''}
                onChange={(e) => update(i, { ...section, className: e.target.value })}
                placeholder="e.g. dark-faq"
                className={inputCls}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">Add section:</span>
        {(Object.keys(SECTION_TYPE_LABELS) as PageSection['type'][]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => add(type)}
            className="text-sm px-3 py-1.5 rounded-lg border border-yellow-300 text-gray-700 hover:bg-yellow-50"
          >
            + {SECTION_TYPE_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  )
}

function BackgroundSelect({
  value,
  onChange,
}: {
  value: SectionBackground | undefined
  onChange: (next: SectionBackground | undefined) => void
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">Background</label>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value === '' ? undefined : (e.target.value as SectionBackground))}
        className={inputCls}
      >
        <option value="">Default</option>
        <option value="white">White</option>
        <option value="cream">Cream</option>
      </select>
    </div>
  )
}

function SectionFields({
  section,
  onChange,
}: {
  section: PageSection
  onChange: (next: PageSection) => void
}) {
  switch (section.type) {
    case 'markdown':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading (optional)</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <BlogEditor value={section.content} onChange={(content) => onChange({ ...section, content })} rows={8} />
        </>
      )

    case 'cardGrid':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                placeholder="Why Choose Us?"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Subheading</label>
              <input
                value={section.subheading ?? ''}
                onChange={(e) => onChange({ ...section, subheading: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-gray-600">Cards</label>
            {section.cards.map((card, i) => (
              <div key={i} className="flex gap-3 items-start">
                <input
                  value={card.icon ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...section,
                      cards: section.cards.map((c, j) => (j === i ? { ...c, icon: e.target.value } : c)),
                    })
                  }
                  placeholder="🚗"
                  title="Icon (emoji, optional)"
                  className={`${inputBaseCls} w-16 flex-none text-center mt-0.5`}
                />
                <div className="flex-1 space-y-2">
                  <input
                    value={card.title}
                    onChange={(e) =>
                      onChange({
                        ...section,
                        cards: section.cards.map((c, j) => (j === i ? { ...c, title: e.target.value } : c)),
                      })
                    }
                    placeholder="Card title"
                    className={inputCls}
                  />
                  <textarea
                    value={card.description ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...section,
                        cards: section.cards.map((c, j) => (j === i ? { ...c, description: e.target.value } : c)),
                      })
                    }
                    rows={2}
                    placeholder="Short description (optional)"
                    className={inputCls}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ ...section, cards: section.cards.filter((_, j) => j !== i) })}
                  className="text-red-400 hover:text-red-600 px-2 py-2 flex-none"
                  title="Remove card"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                onChange({ ...section, cards: [...section.cards, { icon: '', title: '', description: '' }] })
              }
              className="text-sm text-yellow-600 hover:text-yellow-500"
            >
              + Add card
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Footnote (optional)</label>
              <input
                value={section.footnote ?? ''}
                onChange={(e) => onChange({ ...section, footnote: e.target.value })}
                placeholder="Shown in a card below the grid"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
        </>
      )

    case 'steps':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                placeholder="How It Works"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Intro (optional)</label>
            <input
              value={section.intro ?? ''}
              onChange={(e) => onChange({ ...section, intro: e.target.value })}
              className={inputCls}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-gray-600">Steps</label>
            {section.steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-yellow-400 text-white text-sm font-bold flex-none mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 space-y-2">
                  <input
                    value={step.title}
                    onChange={(e) =>
                      onChange({
                        ...section,
                        steps: section.steps.map((s, j) => (j === i ? { ...s, title: e.target.value } : s)),
                      })
                    }
                    placeholder="Step title"
                    className={inputCls}
                  />
                  <textarea
                    value={step.body ?? ''}
                    onChange={(e) =>
                      onChange({
                        ...section,
                        steps: section.steps.map((s, j) => (j === i ? { ...s, body: e.target.value } : s)),
                      })
                    }
                    rows={2}
                    placeholder="Step description (optional)"
                    className={inputCls}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ ...section, steps: section.steps.filter((_, j) => j !== i) })}
                  className="text-red-400 hover:text-red-600 px-2 py-2 flex-none"
                  title="Remove step"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...section, steps: [...section.steps, { title: '', body: '' }] })}
              className="text-sm text-yellow-600 hover:text-yellow-500"
            >
              + Add step
            </button>
          </div>
        </>
      )

    case 'checklist':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                placeholder="What You Get"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Intro (optional)</label>
            <input
              value={section.intro ?? ''}
              onChange={(e) => onChange({ ...section, intro: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Items — one per line, rendered with a ✓</label>
            <textarea
              value={section.items.join('\n')}
              onChange={(e) => onChange({ ...section, items: e.target.value.split('\n') })}
              rows={4}
              placeholder={'30-minute quote turnaround\nSame-day OSKO payment\nFree Australia-wide pickup'}
              className={inputCls}
            />
          </div>
        </>
      )

    case 'faq':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                placeholder="Frequently Asked Questions"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <div className="space-y-3">
            {section.items.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    value={item.question}
                    onChange={(e) =>
                      onChange({
                        ...section,
                        items: section.items.map((q, j) => (j === i ? { ...q, question: e.target.value } : q)),
                      })
                    }
                    placeholder="Question?"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => onChange({ ...section, items: section.items.filter((_, j) => j !== i) })}
                    className="text-red-400 hover:text-red-600 px-2 flex-none"
                    title="Remove question"
                  >
                    &times;
                  </button>
                </div>
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    onChange({
                      ...section,
                      items: section.items.map((q, j) => (j === i ? { ...q, answer: e.target.value } : q)),
                    })
                  }
                  rows={2}
                  placeholder="Answer"
                  className={inputCls}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...section, items: [...section.items, { question: '', answer: '' }] })}
              className="text-sm text-yellow-600 hover:text-yellow-500"
            >
              + Add question
            </button>
          </div>
          <p className="text-xs text-gray-400">
            FAQ sections automatically emit FAQPage structured data for Google rich results.
          </p>
        </>
      )

    case 'comparison': {
      const setColumn = (i: number, next: (typeof section.columns)[number]) =>
        onChange({ ...section, columns: section.columns.map((c, j) => (j === i ? next : c)) })
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                placeholder="3 Ways to Sell Your Car"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Intro (optional)</label>
            <input
              value={section.intro ?? ''}
              onChange={(e) => onChange({ ...section, intro: e.target.value })}
              className={inputCls}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-gray-600">Columns (rendered side by side)</label>
            {section.columns.map((col, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex gap-3 items-center">
                  <input
                    value={col.title}
                    onChange={(e) => setColumn(i, { ...col, title: e.target.value })}
                    placeholder="Option title"
                    className={inputCls}
                  />
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 flex-none" title="Gold border — use for the recommended option">
                    <input
                      type="checkbox"
                      checked={col.highlight ?? false}
                      onChange={(e) => setColumn(i, { ...col, highlight: e.target.checked || undefined })}
                    />
                    Highlight
                  </label>
                  <input
                    value={col.badge ?? ''}
                    onChange={(e) => setColumn(i, { ...col, badge: e.target.value })}
                    placeholder="Badge (e.g. Recommended)"
                    title="Pill badge shown on the column"
                    className={`${inputBaseCls} w-40 flex-none`}
                  />
                  <button
                    type="button"
                    onClick={() => onChange({ ...section, columns: section.columns.filter((_, j) => j !== i) })}
                    className="text-red-400 hover:text-red-600 px-2 flex-none"
                    title="Remove column"
                  >
                    &times;
                  </button>
                </div>
                {col.rows.map((row, j) => (
                  <div key={j} className="flex gap-2 items-start">
                    <input
                      value={row.label ?? ''}
                      onChange={(e) =>
                        setColumn(i, { ...col, rows: col.rows.map((r, k) => (k === j ? { ...r, label: e.target.value } : r)) })
                      }
                      placeholder="Label (e.g. The upside)"
                      className={`${inputBaseCls} w-44 flex-none`}
                    />
                    <textarea
                      value={row.text}
                      onChange={(e) =>
                        setColumn(i, { ...col, rows: col.rows.map((r, k) => (k === j ? { ...r, text: e.target.value } : r)) })
                      }
                      rows={2}
                      placeholder="Text"
                      className={inputCls}
                    />
                    <select
                      value={row.tone ?? ''}
                      onChange={(e) =>
                        setColumn(i, {
                          ...col,
                          rows: col.rows.map((r, k) =>
                            k === j
                              ? { ...r, tone: (e.target.value || undefined) as 'pro' | 'con' | 'muted' | undefined }
                              : r,
                          ),
                        })
                      }
                      title="Label colour"
                      className={`${inputBaseCls} w-28 flex-none`}
                    >
                      <option value="">Tone</option>
                      <option value="pro">Pro (green)</option>
                      <option value="con">Con (orange)</option>
                      <option value="muted">Muted</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setColumn(i, { ...col, rows: col.rows.filter((_, k) => k !== j) })}
                      className="text-red-400 hover:text-red-600 px-2 py-2 flex-none"
                      title="Remove row"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setColumn(i, { ...col, rows: [...col.rows, { label: '', text: '' }] })}
                  className="text-sm text-yellow-600 hover:text-yellow-500"
                >
                  + Add row
                </button>
              </div>
            ))}
            {section.columns.length < 4 && (
              <button
                type="button"
                onClick={() =>
                  onChange({ ...section, columns: [...section.columns, { title: '', rows: [{ label: '', text: '' }] }] })
                }
                className="text-sm text-yellow-600 hover:text-yellow-500"
              >
                + Add column
              </button>
            )}
          </div>
        </>
      )
    }

    case 'imageText':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heading</label>
              <input
                value={section.heading ?? ''}
                onChange={(e) => onChange({ ...section, heading: e.target.value })}
                placeholder="Any Make, Any Model"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Body (shown beside the image; markdown works)</label>
            <textarea
              value={section.body ?? ''}
              onChange={(e) => onChange({ ...section, body: e.target.value })}
              rows={3}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tick items — one per line (optional)</label>
            <textarea
              value={(section.items ?? []).join('\n')}
              onChange={(e) => onChange({ ...section, items: e.target.value.split('\n') })}
              rows={3}
              placeholder={'Free quote within 24 hours\nSame-day OSKO payment'}
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Image path or URL</label>
              <input
                value={section.image}
                onChange={(e) => onChange({ ...section, image: e.target.value })}
                placeholder="/images/cars/types/damaged-cutout.png"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Image alt text</label>
              <input
                value={section.imageAlt ?? ''}
                onChange={(e) => onChange({ ...section, imageAlt: e.target.value })}
                placeholder="Sell your damaged car"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Image position</label>
            <select
              value={section.imagePosition ?? 'right'}
              onChange={(e) =>
                onChange({ ...section, imagePosition: e.target.value === 'left' ? 'left' : undefined })
              }
              className={inputCls}
            >
              <option value="right">Right (text left)</option>
              <option value="left">Left (text right)</option>
            </select>
          </div>
          <p className="text-xs text-gray-400">
            Use a site image path (e.g. /images/cars/types/damaged-cutout.png) — external images
            only work from approved hosts.
          </p>
        </>
      )

    case 'button':
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Button text</label>
              <input
                value={section.text}
                onChange={(e) => onChange({ ...section, text: e.target.value })}
                placeholder="Get My Offer — It Takes 2 Minutes →"
                className={inputCls}
              />
            </div>
            <BackgroundSelect value={section.background} onChange={(background) => onChange({ ...section, background })} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Link — defaults to #sell-form (the on-page quote form)</label>
            <input
              value={section.link ?? ''}
              onChange={(e) => onChange({ ...section, link: e.target.value })}
              placeholder="#sell-form"
              className={inputCls}
            />
          </div>
        </>
      )
  }
}
