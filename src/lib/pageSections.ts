// Typed content sections for CMS pages (`pages.sections` jsonb column).
//
// A page body can be composed of these blocks instead of (or in addition to)
// the single markdown `content` field. The renderer lives in
// src/components/PageSections.tsx and reuses the hand-built brand-page markup,
// so CMS pages can look like proper service pages rather than articles.
//
// The jsonb column is untyped at the DB layer, so everything that reads it
// must go through parsePageSections(), which validates tolerantly: unknown
// section types and malformed entries are dropped rather than crashing the
// page, and string fields are coerced/trimmed.

export type SectionBackground = 'white' | 'cream'

export interface CardItem {
  icon?: string
  title: string
  description?: string
}

export interface StepItem {
  title: string
  body?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface MarkdownSection {
  type: 'markdown'
  heading?: string
  content: string
  background?: SectionBackground
}

export interface CardGridSection {
  type: 'cardGrid'
  heading?: string
  subheading?: string
  cards: CardItem[]
  footnote?: string
  background?: SectionBackground
}

export interface StepsSection {
  type: 'steps'
  heading?: string
  intro?: string
  steps: StepItem[]
  background?: SectionBackground
}

export interface ChecklistSection {
  type: 'checklist'
  heading?: string
  intro?: string
  items: string[]
  background?: SectionBackground
}

export interface FaqSection {
  type: 'faq'
  heading?: string
  items: FaqItem[]
  background?: SectionBackground
}

export interface ComparisonRow {
  /** Optional bold lead-in, e.g. "The upside" */
  label?: string
  text: string
}

export interface ComparisonColumn {
  title: string
  rows: ComparisonRow[]
  /** Visually emphasise this column (gold border) — e.g. the recommended option. */
  highlight?: boolean
}

export interface ComparisonSection {
  type: 'comparison'
  heading?: string
  intro?: string
  columns: ComparisonColumn[]
  background?: SectionBackground
}

export interface ButtonSection {
  type: 'button'
  text: string
  /** Defaults to #sell-form (the on-page quote form). */
  link?: string
  background?: SectionBackground
}

export interface ImageTextSection {
  type: 'imageText'
  heading?: string
  /** Markdown-lite body shown beside the image. */
  body?: string
  /** Optional tick list below the body (✓ rows, like the brand showcase). */
  items?: string[]
  /**
   * Image path or URL. Local public assets ("/images/...") always work;
   * remote hosts must be whitelisted in next.config (currently clearbit
   * and unsplash).
   */
  image: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  background?: SectionBackground
}

// Note: no CTA block type — every page already renders the built-in CTA
// section (cta_heading / cta_description / cta_button_*) below the sections.

export type PageSection =
  | MarkdownSection
  | CardGridSection
  | StepsSection
  | ChecklistSection
  | FaqSection
  | ComparisonSection
  | ImageTextSection
  | ButtonSection

export const SECTION_TYPES = [
  'markdown',
  'cardGrid',
  'steps',
  'checklist',
  'faq',
  'comparison',
  'imageText',
  'button',
] as const

export const SECTION_TYPE_LABELS: Record<PageSection['type'], string> = {
  markdown: 'Text',
  cardGrid: 'Card Grid',
  steps: 'Numbered Steps',
  checklist: 'Checklist',
  faq: 'FAQ',
  comparison: 'Comparison',
  imageText: 'Image + Text',
  button: 'CTA Button',
}

// Safety net shared with the catch-all route: swap unreplaced Draft Layout
// placeholders for generic values so visitors never see a raw token.
export function fillPlaceholders(s: string | null | undefined): string {
  if (!s) return ''
  return s
    .replace(/\{\{\s*TOPIC\s*\}\}/gi, 'your car')
    .replace(/\{\{\s*LOCATION\s*\}\}/gi, 'Australia')
}

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function optStr(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v : undefined
}

function background(v: unknown): SectionBackground | undefined {
  return v === 'white' || v === 'cream' ? v : undefined
}

/**
 * Validate an untyped jsonb value into PageSection[].
 * Tolerant by design: malformed entries and unknown types are dropped so a
 * bad row in the DB degrades to "section missing", never a crashed page.
 */
export function parsePageSections(value: unknown): PageSection[] {
  if (!Array.isArray(value)) return []
  const sections: PageSection[] = []

  for (const raw of value) {
    if (!raw || typeof raw !== 'object') continue
    const s = raw as Record<string, unknown>

    switch (s.type) {
      case 'markdown': {
        const content = str(s.content)
        if (!content.trim()) continue
        sections.push({
          type: 'markdown',
          heading: optStr(s.heading),
          content,
          background: background(s.background),
        })
        break
      }
      case 'cardGrid': {
        const cards: CardItem[] = (Array.isArray(s.cards) ? s.cards : [])
          .filter((c): c is Record<string, unknown> => !!c && typeof c === 'object')
          .map((c) => ({
            icon: optStr(c.icon),
            title: str(c.title),
            description: optStr(c.description),
          }))
          .filter((c) => c.title.trim() !== '')
        if (cards.length === 0) continue
        sections.push({
          type: 'cardGrid',
          heading: optStr(s.heading),
          subheading: optStr(s.subheading),
          cards,
          footnote: optStr(s.footnote),
          background: background(s.background),
        })
        break
      }
      case 'steps': {
        const steps: StepItem[] = (Array.isArray(s.steps) ? s.steps : [])
          .filter((c): c is Record<string, unknown> => !!c && typeof c === 'object')
          .map((c) => ({ title: str(c.title), body: optStr(c.body) }))
          .filter((c) => c.title.trim() !== '')
        if (steps.length === 0) continue
        sections.push({
          type: 'steps',
          heading: optStr(s.heading),
          intro: optStr(s.intro),
          steps,
          background: background(s.background),
        })
        break
      }
      case 'checklist': {
        const items = (Array.isArray(s.items) ? s.items : [])
          .map((i) => str(i).trim())
          .filter(Boolean)
        if (items.length === 0) continue
        sections.push({
          type: 'checklist',
          heading: optStr(s.heading),
          intro: optStr(s.intro),
          items,
          background: background(s.background),
        })
        break
      }
      case 'faq': {
        const items: FaqItem[] = (Array.isArray(s.items) ? s.items : [])
          .filter((c): c is Record<string, unknown> => !!c && typeof c === 'object')
          .map((c) => ({ question: str(c.question).trim(), answer: str(c.answer).trim() }))
          .filter((c) => c.question !== '' && c.answer !== '')
        if (items.length === 0) continue
        sections.push({
          type: 'faq',
          heading: optStr(s.heading),
          items,
          background: background(s.background),
        })
        break
      }
      case 'comparison': {
        const columns: ComparisonColumn[] = (Array.isArray(s.columns) ? s.columns : [])
          .filter((c): c is Record<string, unknown> => !!c && typeof c === 'object')
          .map((c) => ({
            title: str(c.title),
            highlight: c.highlight === true ? true : undefined,
            rows: (Array.isArray(c.rows) ? c.rows : [])
              .filter((r): r is Record<string, unknown> => !!r && typeof r === 'object')
              .map((r) => ({ label: optStr(typeof r.label === 'string' ? r.label.trim() : undefined), text: str(r.text).trim() }))
              .filter((r) => r.text !== '' || r.label !== undefined),
          }))
          .filter((c) => c.title.trim() !== '')
        if (columns.length === 0) continue
        sections.push({
          type: 'comparison',
          heading: optStr(s.heading),
          intro: optStr(s.intro),
          columns,
          background: background(s.background),
        })
        break
      }
      case 'imageText': {
        const image = str(s.image).trim()
        if (!image) continue
        const items = (Array.isArray(s.items) ? s.items : [])
          .map((i) => str(i).trim())
          .filter(Boolean)
        sections.push({
          type: 'imageText',
          heading: optStr(s.heading),
          body: optStr(s.body),
          items: items.length > 0 ? items : undefined,
          image,
          imageAlt: optStr(s.imageAlt),
          imagePosition: s.imagePosition === 'left' ? 'left' : undefined,
          background: background(s.background),
        })
        break
      }
      case 'button': {
        const text = str(s.text).trim()
        if (!text) continue
        sections.push({
          type: 'button',
          text,
          link: optStr(s.link),
          background: background(s.background),
        })
        break
      }
      default:
        // Unknown type — drop silently so future types degrade gracefully.
        break
    }
  }

  return sections
}

/** Apply a string transform (e.g. fillPlaceholders) to every text field. */
export function mapSectionStrings(
  sections: PageSection[],
  fn: (s: string) => string,
): PageSection[] {
  const opt = (v: string | undefined) => (v === undefined ? undefined : fn(v))
  return sections.map((section): PageSection => {
    switch (section.type) {
      case 'markdown':
        return { ...section, heading: opt(section.heading), content: fn(section.content) }
      case 'cardGrid':
        return {
          ...section,
          heading: opt(section.heading),
          subheading: opt(section.subheading),
          footnote: opt(section.footnote),
          cards: section.cards.map((c) => ({
            ...c,
            title: fn(c.title),
            description: opt(c.description),
          })),
        }
      case 'steps':
        return {
          ...section,
          heading: opt(section.heading),
          intro: opt(section.intro),
          steps: section.steps.map((s) => ({ ...s, title: fn(s.title), body: opt(s.body) })),
        }
      case 'checklist':
        return {
          ...section,
          heading: opt(section.heading),
          intro: opt(section.intro),
          items: section.items.map(fn),
        }
      case 'faq':
        return {
          ...section,
          heading: opt(section.heading),
          items: section.items.map((i) => ({ question: fn(i.question), answer: fn(i.answer) })),
        }
      case 'comparison':
        return {
          ...section,
          heading: opt(section.heading),
          intro: opt(section.intro),
          columns: section.columns.map((c) => ({
            ...c,
            title: fn(c.title),
            rows: c.rows.map((r) => ({ label: opt(r.label), text: fn(r.text) })),
          })),
        }
      case 'imageText':
        return {
          ...section,
          heading: opt(section.heading),
          body: opt(section.body),
          items: section.items?.map(fn),
          imageAlt: opt(section.imageAlt),
        }
      case 'button':
        return { ...section, text: fn(section.text) }
    }
  })
}

/** Collect structured FAQ items across sections for FAQPage JSON-LD. */
export function collectSectionFaqItems(sections: PageSection[]): FaqItem[] {
  return sections.flatMap((s) => (s.type === 'faq' ? s.items : []))
}
