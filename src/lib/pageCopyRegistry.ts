// Registry of hardcoded marketing pages whose copy can be overridden from the
// `page_overrides` table (see migration 007). This file is intentionally free of
// any server/client-only imports so it can be shared by both the server-side
// rendering path (pageContent.ts) and the client-side admin editor.
//
// Each field maps a stable `key` (stored in page_overrides.blocks) to a label
// and an input type. The hardcoded page supplies the *fallback* value, so a
// page renders identically until an override row exists for that key.
//   - 'text' / 'textarea' -> a string override.
//   - 'list'              -> an array override (of strings or objects). The
//                            admin edits it as JSON; itemFields documents shape.

import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'

export type CopyFieldType = 'text' | 'textarea' | 'list'
export type ItemFieldType = 'text' | 'textarea' | 'boolean'

export interface ItemField {
  key: string
  label: string
  type: ItemFieldType
}

export interface CopyField {
  key: string
  label: string
  type: CopyFieldType
  group: string
  /** For type 'list': describes each item's shape (hint for the admin editor). */
  itemFields?: ItemField[]
}

export interface PageCopySpec {
  /** page_overrides.slug */
  slug: string
  /** Human label shown in the admin list */
  label: string
  /** Public path, for "view live" links */
  path: string
  fields: CopyField[]
}

const T = (key: string, label: string, group: string): CopyField => ({ key, label, type: 'text', group })
const TA = (key: string, label: string, group: string): CopyField => ({ key, label, type: 'textarea', group })
const L = (key: string, label: string, group: string, itemFields?: ItemField[]): CopyField => ({
  key,
  label,
  type: 'list',
  group,
  itemFields,
})

// The bespoke sell-<brand> pages share the same structure, so one field-set
// describes them all. Register a brand by adding `...brandSpec('sell-x', …)`.
function brandSpec(slug: string, label: string, path: string): PageCopySpec {
  return {
    slug,
    label,
    path,
    fields: [
      T('meta_title', 'SEO title', 'SEO'),
      TA('meta_description', 'SEO description', 'SEO'),

      T('hero_h1_line1', 'Hero heading (line 1)', 'Hero'),
      T('hero_h1_line2', 'Hero heading (line 2)', 'Hero'),
      TA('hero_intro', 'Hero intro paragraph', 'Hero'),

      T('showcase_h2', 'Showcase heading', 'Showcase'),
      TA('showcase_body', 'Showcase paragraph', 'Showcase'),

      TA('intro_para1', 'Intro paragraph 1', 'Intro'),
      TA('intro_para2', 'Intro paragraph 2', 'Intro'),

      T('models_h2', 'Models heading', 'Models'),
      TA('models_sub', 'Models subheading', 'Models'),
      L('models', 'Models (list of strings)', 'Models'),
      TA('models_footnote', 'Models footnote', 'Models'),

      T('process_h2', 'Process heading', 'Process'),
      TA('process_intro', 'Process intro', 'Process'),
      T('process_step1_title', 'Step 1 title', 'Process'),
      TA('process_step1_body', 'Step 1 body', 'Process'),
      T('process_step2_title', 'Step 2 title', 'Process'),
      TA('process_step2_body', 'Step 2 body', 'Process'),

      T('pricing_h2', 'Pricing heading', 'Pricing'),
      TA('pricing_intro', 'Pricing intro', 'Pricing'),
      TA('pricing_callout', 'Pricing callout', 'Pricing'),
      L('pricing_factors', 'Pricing factors (list of strings)', 'Pricing'),

      T('aus_h2', 'Australia-wide heading', 'Australia-wide'),
      TA('aus_intro', 'Australia-wide paragraph', 'Australia-wide'),
      L('aus_cards', 'Australia-wide cards', 'Australia-wide', [
        { key: 'icon', label: 'Icon (emoji)', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]),

      T('why_h2', 'Why-choose heading', 'Why choose us'),
      TA('why_sub', 'Why-choose subheading', 'Why choose us'),
      L('benefits', 'Benefit cards', 'Why choose us', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]),

      T('cta_h2', 'CTA heading', 'CTA'),
      TA('cta_para', 'CTA paragraph', 'CTA'),
      T('cta_button', 'CTA button label', 'CTA'),
    ],
  }
}

const HAND_WRITTEN: Record<string, PageCopySpec> = {
  'sell-toyota': brandSpec('sell-toyota', 'Sell Toyota', '/sell-toyota'),

  'cash-for-damaged-cars': {
    slug: 'cash-for-damaged-cars',
    label: 'Cash for Damaged Cars',
    path: '/cash-for-damaged-cars',
    fields: [
      T('meta_title', 'SEO title', 'SEO'),
      TA('meta_description', 'SEO description', 'SEO'),

      T('hero_h1_line1', 'Hero heading (line 1)', 'Hero'),
      T('hero_h1_line2', 'Hero heading (line 2, yellow)', 'Hero'),
      TA('hero_intro', 'Hero intro paragraph', 'Hero'),

      T('showcase_h2', 'Showcase heading', 'Showcase'),
      TA('showcase_body', 'Showcase paragraph', 'Showcase'),

      TA('intro_para1', 'Intro paragraph 1', 'Intro'),
      TA('intro_para2', 'Intro paragraph 2', 'Intro'),

      T('damage_h2', 'Damage-types heading', 'Damage types'),
      TA('damage_sub', 'Damage-types subheading', 'Damage types'),

      T('process_h2', 'Process heading', 'Process'),
      TA('process_intro', 'Process intro paragraph', 'Process'),
      T('process_step1_title', 'Step 1 title', 'Process'),
      TA('process_step1_body', 'Step 1 body', 'Process'),
      T('process_step2_title', 'Step 2 title', 'Process'),
      TA('process_step2_body', 'Step 2 body', 'Process'),

      T('valuation_h2', 'Valuation heading', 'Valuation'),
      TA('valuation_intro', 'Valuation intro paragraph', 'Valuation'),
      TA('valuation_outro', 'Valuation closing paragraph', 'Valuation'),

      T('aus_h2', 'Australia-wide heading', 'Australia-wide'),
      TA('aus_body', 'Australia-wide paragraph', 'Australia-wide'),

      T('why_h2', 'Why-choose heading', 'Why choose us'),
      TA('why_sub', 'Why-choose subheading', 'Why choose us'),

      T('cta_h2', 'CTA heading', 'CTA'),
      TA('cta_body', 'CTA paragraph', 'CTA'),
      T('cta_button', 'CTA button label', 'CTA'),
    ],
  },

  home: {
    slug: 'home',
    label: 'Home page',
    path: '/',
    fields: [
      T('meta_title', 'SEO title', 'SEO'),
      TA('meta_description', 'SEO description', 'SEO'),
      TA('meta_keywords', 'SEO keywords', 'SEO'),

      T('hero_pill', 'Pill text', 'Hero'),
      T('hero_h1_line1', 'Headline (line 1)', 'Hero'),
      T('hero_h1_line2', 'Headline (line 2, gold)', 'Hero'),
      T('hero_subhead', 'Sub-headline', 'Hero'),
      TA('hero_subpara', 'Sub-paragraph', 'Hero'),
      T('hero_cta_primary', 'Primary button label', 'Hero'),
      T('hero_cta_secondary', 'Secondary button label', 'Hero'),
      T('hero_rating_value', 'Rating value', 'Hero'),
      T('hero_rating_count', 'Rating count text', 'Hero'),
      L('hero_microtrust', 'Micro-trust items (list of strings)', 'Hero'),
      L('hero_stats', 'Hero stat tiles', 'Hero', [
        { key: 'stat', label: 'Stat', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ]),

      L('trust_items', 'Trust strip cards', 'Trust strip', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'sub', label: 'Subtitle', type: 'text' },
      ]),

      L('stats_banner', 'Stats banner tiles', 'Stats banner', [
        { key: 'stat', label: 'Stat', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ]),

      T('how_eyebrow', 'Eyebrow', 'How it works'),
      T('how_h2', 'Heading', 'How it works'),
      TA('how_intro', 'Intro paragraph', 'How it works'),
      L('how_steps', 'Steps', 'How it works', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]),

      T('why_eyebrow', 'Eyebrow', 'Why choose us'),
      T('why_h2', 'Heading', 'Why choose us'),
      TA('why_intro', 'Intro paragraph', 'Why choose us'),
      L('value_props', 'Value propositions', 'Why choose us', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]),

      T('ai_eyebrow', 'Eyebrow', 'AI advantage'),
      T('ai_h2', 'Heading', 'AI advantage'),
      TA('ai_para1', 'Paragraph 1', 'AI advantage'),
      TA('ai_para2', 'Paragraph 2', 'AI advantage'),
      TA('ai_para3', 'Paragraph 3', 'AI advantage'),

      T('cmp_eyebrow', 'Eyebrow', 'Comparison'),
      T('cmp_h2', 'Heading', 'Comparison'),
      T('cmp_sub', 'Subheading', 'Comparison'),
      T('cmp_col_us', 'Column: us', 'Comparison'),
      T('cmp_col_dealer', 'Column: dealer', 'Comparison'),
      T('cmp_col_priv', 'Column: private', 'Comparison'),
      L('comparison_rows', 'Comparison rows', 'Comparison', [
        { key: 'feat', label: 'Feature', type: 'text' },
        { key: 'us', label: 'Auto-Sell.ai', type: 'boolean' },
        { key: 'dealer', label: 'Dealer', type: 'boolean' },
        { key: 'priv', label: 'Private', type: 'boolean' },
      ]),

      T('marquee_eyebrow', 'Eyebrow', 'Brand marquee'),

      T('buy_eyebrow', 'Eyebrow', 'What we buy'),
      T('buy_h2', 'Heading', 'What we buy'),
      L('what_we_buy', 'Vehicle types (list of strings)', 'What we buy'),

      T('areas_eyebrow', 'Eyebrow', 'Service areas'),
      T('areas_h2', 'Heading', 'Service areas'),
      TA('areas_intro', 'Intro paragraph', 'Service areas'),
      L('service_areas', 'City links', 'Service areas', [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'href', label: 'Link', type: 'text' },
      ]),

      T('reviews_eyebrow', 'Eyebrow', 'Reviews'),
      T('reviews_h2_line1', 'Heading (line 1)', 'Reviews'),
      T('reviews_h2_line2', 'Heading (line 2)', 'Reviews'),
      T('reviews_badge_rating', 'Badge rating', 'Reviews'),
      T('reviews_badge_count', 'Badge count text', 'Reviews'),
      L('reviews', 'Reviews', 'Reviews', [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'when', label: 'When', type: 'text' },
        { key: 'where', label: 'Where', type: 'text' },
        { key: 'quote', label: 'Quote', type: 'textarea' },
      ]),

      T('final_eyebrow', 'Eyebrow', 'Final CTA'),
      T('final_h2_line1', 'Heading (line 1)', 'Final CTA'),
      T('final_h2_line2', 'Heading (line 2, gold)', 'Final CTA'),
      TA('final_para', 'Paragraph', 'Final CTA'),
      T('final_cta_primary', 'Primary button label', 'Final CTA'),
      L('final_cta_stats', 'Stat tiles', 'Final CTA', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'sub', label: 'Subtitle', type: 'text' },
      ]),

      T('faq_eyebrow', 'Eyebrow', 'FAQ'),
      T('faq_h2_pre', 'Heading (before highlight)', 'FAQ'),
      T('faq_h2_highlight', 'Heading (gold highlight)', 'FAQ'),
      T('faq_h2_post', 'Heading (after highlight)', 'FAQ'),
      TA('faq_intro', 'Intro paragraph', 'FAQ'),
      L('faq_items', 'FAQ items (also feeds search snippets)', 'FAQ', [
        { key: 'q', label: 'Question', type: 'text' },
        { key: 'a', label: 'Answer', type: 'textarea' },
      ]),

      T('mbar_call', 'Mobile bar: call label', 'Mobile bar'),
      T('mbar_offer', 'Mobile bar: offer label', 'Mobile bar'),
    ],
  },

  'car-valuation-guide': {
    slug: 'car-valuation-guide',
    label: 'Car Valuation Guide',
    path: '/car-valuation-guide',
    fields: [
      T('meta_title', 'SEO title', 'SEO'),
      TA('meta_description', 'SEO description', 'SEO'),

      T('hero_h1_line1', 'Hero heading (line 1)', 'Hero'),
      T('hero_h1_line2', 'Hero heading (line 2, yellow)', 'Hero'),
      TA('hero_intro', 'Hero intro paragraph', 'Hero'),

      T('factors_h2', 'Key-factors heading', 'Key factors'),
      TA('factors_sub', 'Key-factors subheading', 'Key factors'),
      L('factors', 'Factor cards', 'Key factors', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]),

      T('methods_h2', 'Methods heading', 'Valuation methods'),
      TA('methods_sub', 'Methods subheading', 'Valuation methods'),
      L('methods', 'Method cards', 'Valuation methods', [
        { key: 'method', label: 'Method', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]),

      T('tips_h2', 'Tips heading', 'Tips'),
      TA('tips_sub', 'Tips subheading', 'Tips'),
      L('tips', 'Tip cards', 'Tips', [
        { key: 'tip', label: 'Tip', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ]),

      T('mistakes_h2', 'Mistakes heading', 'Mistakes'),
      TA('mistakes_sub', 'Mistakes subheading', 'Mistakes'),
      T('donts_title', "“What not to do” title", 'Mistakes'),
      L('donts', 'What not to do (list of strings)', 'Mistakes'),
      T('dos_title', "“What to do” title", 'Mistakes'),
      L('dos', 'What to do instead (list of strings)', 'Mistakes'),

      T('cta_h2', 'CTA heading', 'CTA'),
      TA('cta_para', 'CTA paragraph', 'CTA'),
      T('cta_button', 'CTA button label', 'CTA'),
      T('cta_subtext', 'CTA subtext', 'CTA'),
    ],
  },

  'how-to-sell-car-fast': {
    slug: 'how-to-sell-car-fast',
    label: 'How to Sell Car Fast',
    path: '/how-to-sell-car-fast',
    fields: [
      T('meta_title', 'SEO title', 'SEO'),
      TA('meta_description', 'SEO description', 'SEO'),
      TA('meta_keywords', 'SEO keywords', 'SEO'),

      T('hero_h1_line1', 'Hero heading (line 1)', 'Hero'),
      T('hero_h1_line2', 'Hero heading (line 2, yellow)', 'Hero'),
      TA('hero_p1', 'Hero paragraph 1', 'Hero'),
      TA('hero_p2', 'Hero paragraph 2', 'Hero'),
      TA('hero_p3', 'Hero paragraph 3', 'Hero'),
      T('hero_cta', 'Hero button label', 'Hero'),
      L('micro_trust', 'Micro-trust items', 'Hero', [
        { key: 'icon', label: 'Icon (emoji)', type: 'text' },
        { key: 'label', label: 'Label', type: 'text' },
      ]),

      T('problem_h2', 'Heading', 'Problem'),
      TA('problem_sub', 'Subheading', 'Problem'),
      L('problems', 'Problem cards', 'Problem', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]),
      TA('problem_outro', 'Closing line', 'Problem'),

      T('solution_h2', 'Heading', 'Solution'),
      TA('solution_sub', 'Subheading', 'Solution'),
      T('solution_lead', 'Lead-in line', 'Solution'),
      L('solution_steps', 'Steps', 'Solution', [
        { key: 'n', label: 'Number', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]),
      T('solution_cta', 'Button label', 'Solution'),

      T('ai_h2', 'Heading', 'AI difference'),
      L('ai_items', 'AI points', 'AI difference', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]),
      T('callout_trad_label', 'Callout: traditional label', 'AI difference'),
      TA('callout_trad_text', 'Callout: traditional text', 'AI difference'),
      T('callout_us_label', 'Callout: us label', 'AI difference'),
      TA('callout_us_text', 'Callout: us text', 'AI difference'),

      T('compare_h2', 'Heading', 'Comparison'),
      TA('compare_sub', 'Subheading', 'Comparison'),
      TA('compare_p1', 'Closing paragraph 1', 'Comparison'),
      TA('compare_p2', 'Closing paragraph 2', 'Comparison'),

      T('whofor_h2', 'Heading', 'Who it is for'),
      TA('whofor_sub', 'Subheading', 'Who it is for'),
      L('whofor', 'Audience cards', 'Who it is for', [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'body', label: 'Body', type: 'textarea' },
      ]),
      TA('whofor_outro', 'Closing line', 'Who it is for'),
      T('whofor_cta', 'Button label', 'Who it is for'),

      T('local_h2', 'Heading', 'Local trust'),
      TA('local_intro', 'Intro paragraph', 'Local trust'),
      T('local_sydney_title', 'Sydney subheading', 'Local trust'),
      TA('local_sydney_body', 'Sydney paragraph', 'Local trust'),
      T('local_beyond_title', 'Beyond subheading', 'Local trust'),
      TA('local_beyond_body', 'Beyond paragraph', 'Local trust'),
      L('local_cities', 'City links', 'Local trust', [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'href', label: 'Link', type: 'text' },
      ]),

      T('objections_h2', 'Heading', 'Objections'),
      L('objections', 'Objection Q&As', 'Objections', [
        { key: 'q', label: 'Question', type: 'text' },
        { key: 'a', label: 'Answer', type: 'textarea' },
      ]),

      T('faq_h2', 'Heading', 'FAQ'),
      L('faq_items', 'FAQ items (also feeds schema)', 'FAQ', [
        { key: 'question', label: 'Question', type: 'text' },
        { key: 'answer', label: 'Answer', type: 'textarea' },
      ]),

      T('final_h2', 'Heading', 'Final CTA'),
      TA('final_p1', 'Paragraph 1', 'Final CTA'),
      TA('final_p2', 'Paragraph 2', 'Final CTA'),
      TA('final_p3', 'Paragraph 3', 'Final CTA'),
      T('final_cta', 'Button label', 'Final CTA'),
      T('final_call_label', 'Call label', 'Final CTA'),
      TA('final_disclaimer', 'Disclaimer', 'Final CTA'),
    ],
  },
}

// Any slug that has defaults in pageCopyDefaults.ts but no hand-written spec
// above (i.e. the bespoke sell-<brand> pages) gets an admin spec derived from
// its keys, so converting a page is enough to make it editable — no registry
// edit required.
function humanize(s: string): string {
  return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function autoField(key: string, value: unknown): CopyField {
  const group = humanize(key.split('_')[0])
  if (Array.isArray(value)) {
    let itemFields: ItemField[] | undefined
    const first = value[0]
    if (first && typeof first === 'object' && !Array.isArray(first)) {
      itemFields = Object.entries(first as Record<string, unknown>).map(([k, v]) => ({
        key: k,
        label: humanize(k),
        type:
          typeof v === 'boolean'
            ? 'boolean'
            : typeof v === 'string' && v.length > 60
              ? 'textarea'
              : 'text',
      }))
    }
    return { key, label: humanize(key), type: 'list', group, itemFields }
  }
  const str = typeof value === 'string' ? value : ''
  const longish = str.length > 60 || /(body|intro|para|_sub|desc|footnote|outro|callout|answer)/.test(key)
  return { key, label: humanize(key), type: longish ? 'textarea' : 'text', group }
}

// Canonical top-to-bottom order of the bespoke sell-<brand> / type-page keys so
// the admin form follows the page's visual flow (the extractor inserts keys in
// an arbitrary order). Keys not listed fall to the end in their original order.
const FIELD_ORDER = [
  'meta_title', 'meta_description', 'meta_keywords',
  'hero_h1_line1', 'hero_h1_line2', 'hero_intro',
  'showcase_h2', 'showcase_body',
  'intro_para1', 'intro_para2',
  'models_h2', 'models_sub', 'models', 'models_footnote', 'models_closing',
  'types_h2', 'types_sub', 'types',
  'process_h2', 'process_intro', 'process_step1_title', 'process_step1_body', 'process_step2_title', 'process_step2_body',
  'pricing_h2', 'pricing_intro', 'pricing_intro2', 'pricing_factors_title', 'pricing_card_intro', 'pricing_callout', 'pricing_callout2', 'pricing_factors', 'pricing_closing',
  'valuation_h2', 'valuation_para1', 'valuation_para2', 'valuation_lead', 'valuation_factors', 'valuation_closing',
  'aus_h2', 'aus_intro', 'aus_intro2', 'aus_body', 'aus_cards',
  'why_h2', 'why_sub', 'benefits', 'why_choose',
  'trusted_h2', 'trusted_para1', 'trusted_para2',
  'cta_h2', 'cta_para', 'cta_para2', 'cta_button', 'cta_subtext',
]
function orderRank(key: string): number {
  const i = FIELD_ORDER.indexOf(key)
  return i === -1 ? FIELD_ORDER.length : i
}

function autoGenerated(): Record<string, PageCopySpec> {
  const out: Record<string, PageCopySpec> = {}
  const defaults = PAGE_COPY_DEFAULTS as Record<string, Record<string, unknown>>
  for (const [slug, defs] of Object.entries(defaults)) {
    if (slug in HAND_WRITTEN) continue
    const entries = Object.entries(defs)
      .map((e, i) => [e, i] as const)
      .sort((a, b) => orderRank(a[0][0]) - orderRank(b[0][0]) || a[1] - b[1])
      .map(([e]) => e)
    out[slug] = {
      slug,
      label: humanize(slug),
      path: '/' + slug,
      fields: entries.map(([k, v]) => autoField(k, v)),
    }
  }
  return out
}

export const PAGE_COPY_REGISTRY: Record<string, PageCopySpec> = {
  ...autoGenerated(),
  ...HAND_WRITTEN,
}

export const PAGE_COPY_SLUGS = Object.keys(PAGE_COPY_REGISTRY)

export function isKnownCopySlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(PAGE_COPY_REGISTRY, slug)
}
