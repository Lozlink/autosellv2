# Refined B — editable copy on hardcoded marketing pages

Lets you edit the copy on hardcoded `.tsx` marketing pages from the admin UI,
**without** moving them into the generic `[...slug]` CMS and **without** touching
layout, the `<OfferForm>`, or `<LocalBusinessJsonLd>`. Each editable string keeps
its current value as an in-code default, so a page renders identically until an
override is set.

## Why this and not the full CMS migration (A)

The `[...slug]` catch-all template only renders `title + hero_subtitle + markdown
body + CTA`, and links to `/#sell-form` rather than embedding the lead form. The
hardcoded location/brand/type pages embed `<OfferForm>` inline and a per-page
`<LocalBusinessJsonLd>`. Migrating them into the current catch-all would strip the
inline conversion form and the local-SEO schema — a conversion/SEO regression, not
just a layout one. Refined B keeps those in code and only externalises the *copy*.

## Traffic that set the priority (Vercel Web Analytics, last 90 days)

Home `/` dominates (2.1K visitors). Among editable marketing pages:

| Page | Visitors | Notes |
|------|---------:|-------|
| `/` (home) | 2,100 | **done — all sections + arrays editable** |
| `/cash-for-damaged-cars` | 343 | **done — reference implementation** |
| `/sell-toyota` | 110 | **done — brand pattern proven** |
| `/car-valuation-guide` | 78 | **done** |
| `/sell-used-cars` | 65 | type page |
| `/sell-holden` | 63 | brand (compact skeleton) |
| `/how-to-sell-car-fast` | 60 | **done** |
| `/sell-trucks` | 60 | type |
| `/sell-motorcycle` | 53 | type |
| `/sell-nissan` | 45 | brand (compact) |
| `/sell-mazda` `/sell-mercedes` `/sell-bmw` `/sell-volkswagen` `/sell-ford` `/sell-honda` `/sell-audi` `/sell-hyundai` `/sell-kia` `/sell-van` `/sell-suvs` | 18–37 | brands/types |
| `/value-propositions/*` | 16–17 | low |
| `/sell-my-car-<city>` (all 7) | **0** | no measurable traffic in 90 days |

Takeaway: the **city pages get zero traffic** — deprioritise them despite being
the most uniform. Brand and type pages are the volume tier and templatable.

## Status

**All 22 marketing pages are converted, override-aware, and verified** (tsc +
eslint clean across the project; markup byte-diffed against backups — className
sets AND ordered section sequence identical, so only text/list content changed,
nothing reordered):

- home, cash-for-damaged-cars, car-valuation-guide, how-to-sell-car-fast
- all 12 bespoke brand pages: sell-toyota, sell-mazda, sell-ford, sell-hyundai,
  sell-volkswagen, sell-kia (extended cluster) and sell-holden, sell-nissan,
  sell-mercedes, sell-bmw, sell-honda, sell-audi (compact cluster)
- all 6 vehicle-type pages: sell-used-cars, sell-trucks, sell-van, sell-utes,
  sell-suvs, sell-motorcycle

Also fixed a pre-existing copy bug across all pages: `Auto-Sell.ai` was glued to
the following word (`Auto-Sell.aifor`, `Auto-Sell.aibecause`, etc.) — 73
occurrences corrected by inserting the missing space.

All read defaults from the single-source `pageCopyDefaults.ts`; every list-field
default (reviews, FAQ, comparison rows, models, why-choose cards, etc.) shows as a
JSON placeholder in the admin, with per-field and whole-page **Reset to default**.
The migration is applied, so edits in `/admin → Page Copy` go live within ~60s.

The registry **auto-generates** an admin spec for any slug present in
`pageCopyDefaults.ts` without a hand-written spec, so every brand page
self-registers in the Page Copy dropdown. Some brand pages have minor
per-brand extras (e.g. a "trusted way" section, extra pricing paragraphs); the
auto-spec picks up whatever keys each page actually has.

Nothing outstanding on the conversion. Recommended next step: preview the live
site (or `pnpm dev`) and spot-check a couple of pages, since I verified structure
and types but not the rendered pages visually.

Scripts (in `scripts/`): `extract_defaults.py` (initial home/cash text pass),
`extract_list_defaults.py` (home pure-data lists), and `extract_page.py` (general
per-page extractor used for the content + brand pages).

## What was built

- `supabase/migrations/007_create_page_overrides.sql` — `page_overrides` table
  (`slug` PK, `blocks jsonb`, `published`, timestamps; RLS read-published +
  service-role full access). **Not yet applied — see below.**
- `src/lib/pageCopyRegistry.ts` — declares each page's editable fields (key,
  label, type). No server/client-only imports, so both SSR and the admin share it.
- `src/lib/pageContent.ts` — `getPageOverrides(slug)` (resilient: any error,
  including the table not existing yet, resolves to `{}`), plus `text()`/`list()`
  accessors that fall back to the in-code default for missing/empty/wrong-typed
  values.
- `src/app/cash-for-damaged-cars/page.tsx` — converted to async + `revalidate =
  60`; ~24 copy strings + SEO title/description now read via `text(b, key,
  "<current literal>")`. Output is byte-identical until an override exists.
- `src/app/api/admin/page-overrides/route.ts` — admin GET/PUT (cookie-auth,
  service role); only persists known string keys, drops empties.
- `src/app/admin/page-copy/page.tsx` + a dashboard tile — grouped form to edit a
  page's copy; blank field = built-in default; live in ~60s. List fields (arrays)
  are edited as JSON.
- **Home page (`/`) fully converted** — the #1 page (2.1K visitors). All 14 section
  components + metadata are override-aware via a React-`cache()`d fetch
  (`getPageOverridesCached`, so the 14 sections trigger a single query). ~50 text
  fields (hero, every eyebrow/heading/intro, CTAs, FAQ headings, mobile bar) plus
  12 list fields (trust cards, stats, how-it-works steps, value props, comparison
  rows, service areas, vehicle types, reviews, FAQ items, final-CTA stats). The
  FAQ list now drives both the on-page accordion and the JSON-LD search snippets
  from one source. Icons/markup were left untouched — verified that all SVG paths,
  viewBoxes, and 184 `className` values are byte-identical to the pre-change file,
  so default rendering is unchanged.

Verified: `tsc --noEmit` and `eslint` both pass; no `eslint.ignoreDuringBuilds`,
so the Vercel build's lint gate is satisfied.

## Defaults, placeholders & reset

`src/lib/pageCopyDefaults.ts` is the **single source of truth** for the in-code
default copy (generated by `scripts/extract_defaults.py`). The pages render
`text(b, key, D.key)` and the admin editor reads the same `D` to show each
default as the greyed **placeholder** in its input — so the editor always shows
the current live copy, and the two can't drift. Re-run the script if you change a
default in code.

The admin editor has two reset paths: a per-field **Reset to default** link
(clears that field → the default shows again and renders live), and **Reset all
to defaults** (wipes every override for the page after a confirm). Both work
because a blank field falls back to the in-code default.

Note: list fields (arrays) still show a generic placeholder + the item-shape
hint, not their full default JSON — only text/textarea defaults are surfaced as
placeholders for now.

## One-time setup (you do this)

The migration was **not** applied to the live DB. Apply `007` via the Supabase CLI
or SQL editor, e.g.:

```bash
supabase db push        # or run the SQL in 007_create_page_overrides.sql
```

Until it's applied, `/cash-for-damaged-cars` simply renders its defaults (safe).
After applying, go to `/admin → Page Copy`, edit fields, Save.

## Rollout for the rest (pattern is mechanical)

For each page, in traffic order (`sell-toyota` next):

1. Add a registry entry in `pageCopyRegistry.ts` (slug, label, path, fields).
2. In the page, `const b = await getPageOverrides(SLUG)`, make the component
   async, add `export const revalidate = 60`, and wrap each editable string as
   `text(b, 'key', "<current literal>")`.

Notes:
- **Brand pages** split into two near-identical skeletons: *compact* (holden,
  nissan, mercedes, bmw, honda, audi) and *extended* (toyota, mazda, ford,
  hyundai, volkswagen, kia — extra "trusted way" section). They're a strong
  candidate to collapse into one `BrandLandingTemplate` + a `brandsContent` map
  later; the registry/override layer drops straight into that.
- `next.config.ts` rewrites `/sell-:brand → /brands/:brand`, but that only fires
  for brands **without** a bespoke `src/app/sell-<brand>/page.tsx`. The
  high-traffic brands all have bespoke files, so convert those files (or migrate
  them onto the `brands/[brand]` template and delete the bespoke ones).

## Not yet editable (intentional, phase 2)

Repeatable card arrays (the two damage-type cards, the 6 why-choose benefits, the
hero/valuation tick-lists) stay static for now so the admin form is text-only and
low-risk. To make them editable: add `list`-typed entries to the registry, render
them with `list(b, 'key', [...])`, and add a repeater UI to `admin/page-copy`.
