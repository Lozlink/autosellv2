# Draft Layout — spinning up SEO landing pages

A reusable landing-page template lives in the CMS as the **Draft Layout** page
(`/admin → Pages`). Your team duplicates it to create new pages for grouped
target keywords — no code, no deploy. Pages go live within seconds of publishing.

## One-time setup

Apply the seed so the template appears in the Pages list:

```bash
supabase db push   # or run supabase/migrations/008_seed_draft_layout_page.sql in the SQL editor
```

It inserts a single unpublished row (`slug = draft-layout`). Because the public
catch-all only serves published pages, the draft stays private until published.

## Spinning up a new page (the team's workflow)

1. Go to **/admin → Pages**, find **Draft Layout**, click **Duplicate**. That
   creates a new unpublished copy and filters the list to Drafts.
2. Click **Edit** on the copy.
3. Replace the two placeholders everywhere they appear:
   - `{{TOPIC}}` — the page subject in Title Case, e.g. `Toyota HiLux`,
     `Family SUVs`, `Cars in Newcastle`.
   - `{{LOCATION}}` — the area served, e.g. `Sydney`, `Australia`.
   Update the Title and Slug to the real page (e.g. title `Sell My Toyota HiLux`,
   slug `sell-toyota-hilux`), and tune the SEO Meta fields for the keyword group.
4. Tick **Published** and Save. The page is live at `/<slug>`.

Tip: a fast way to fill a page is Find & Replace `{{TOPIC}}` and `{{LOCATION}}`
in each field before editing the finer wording.

## What the template includes

Body sections mirror the hardcoded brand/type pages, authored in the same
markdown the Pages editor already uses: intro, **What We Buy**, **How It Works**
(numbered steps), **What Your {{TOPIC}} Is Worth**, **We Come to You Across
{{LOCATION}}**, **Why Choose Auto-Sell.ai**, and an **FAQ**. Plus hero subtitle,
CTA banner, and SEO title/description/keywords.

Authoring notes for the body:
- `## ` = section heading, `### ` = sub-heading, `- ` = bullet, `1. ` = numbered
  step, `**bold**`, `[label](url)` = link.
- One paragraph per line (a blank line isn't required between paragraphs).
- Keep headings on their own line and Title Case. FAQ questions are written as
  **bold** lines (not headings) on purpose — heading lines that read like a full
  sentence can get mis-split by the markdown converter.

## Lead form & SEO schema (now wired in)

The `[...slug]` template now renders the same two-column hero as the brand/type
pages: page title + subtitle + benefit tick-list on the left, and an inline
**`<OfferForm>`** on the right (section `id="sell-form"`). The bottom CTA scrolls
to that form by default, so visitors convert on the page itself.

Structured data:

- **Organization** JSON-LD is emitted site-wide from `layout.tsx`, so every CMS
  page already carries it (same as the brand/type pages).
- **FAQ** JSON-LD (`FAQPageJsonLd`) is now emitted automatically from the page's
  FAQ section — the renderer parses the template's `**Question?**` + answer
  convention. Keep the FAQ in that format and the page is eligible for FAQ rich
  results in Google. Change the format and the schema simply isn't emitted (no
  errors). Raw-HTML bodies skip it.

Still not auto-emitted: `LocalBusinessJsonLd` (it needs a city and is used by the
dedicated `/sell-my-car-<city>` pages). If you want a CMS page to carry local
business schema for a specific city, that needs a small structured field — say
the word.

The one visual difference that remains vs brand/type pages: the card-grid
sections (image cutout, models/why-choose cards) render as markdown lists/headings
rather than styled card grids, since the CMS body is a single markdown field.
