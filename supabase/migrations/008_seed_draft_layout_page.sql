-- Seed a reusable "Draft Layout" landing page into the CMS `pages` table.
--
-- This is the template the marketing team duplicates (via the Duplicate button
-- in /admin/pages) to spin up new SEO landing pages for grouped target keywords.
-- It renders through the [...slug] catch-all, mirroring the section structure of
-- the hardcoded brand/type pages (intro, what we buy, how it works, valuation,
-- Australia-wide, why-choose, FAQ) using markdown-lite in the body.
--
-- Placeholders to find-and-replace per page:
--   {{TOPIC}}     – the subject of the page, Title Case (e.g. "Toyota HiLux",
--                   "Family SUVs", "Cars in Newcastle")
--   {{LOCATION}}  – the area served (e.g. "Sydney", "Australia")
--
-- Seeded with published = false, so it stays a private draft (the catch-all only
-- serves published rows) until someone explicitly publishes it. Idempotent.

insert into pages (
  slug,
  title,
  hero_subtitle,
  content,
  cta_heading,
  cta_description,
  cta_button_text,
  cta_button_link,
  meta_title,
  meta_description,
  meta_keywords,
  published
) values (
  'draft-layout',
  'Draft Layout',
  $hs$Get a fair offer for {{TOPIC}} in about 30 minutes — free pickup and same-day OSKO payment across {{LOCATION}}.$hs$,
  $md$## Why Sell {{TOPIC}} to Auto-Sell.ai

Selling {{TOPIC}} privately can take weeks of messages, time-wasters and uncertain offers. Auto-Sell.ai gives you a clear, fair offer and same-day payment, so you can move on fast.

We come to you, handle the paperwork, and pay by same-day OSKO bank transfer once you accept. No haggling, no hidden fees, no drama.

## What We Buy

We buy {{TOPIC}} in almost any condition across {{LOCATION}}:

- Near-new and late-model vehicles
- Older vehicles with high kilometres
- Cars with finance still owing
- Damaged, written-off or non-running vehicles

## How It Works

1. **Get your instant offer.** Enter your rego and a few details to receive a quote, usually within 24 hours.
2. **Book a free inspection.** We come to you anywhere in {{LOCATION}} at a time that suits.
3. **Get paid the same day.** Accept the offer and we pay by OSKO bank transfer and handle the paperwork.

## What Your {{TOPIC}} Is Worth

A few things affect the price we can offer for {{TOPIC}}:

- Make, model, year and variant
- Kilometres on the odometer
- Service history and overall condition
- Whether there is finance owing
- Current market demand

Tell us as much as you can up front and we will give you our strongest offer first — no lowball, no back-and-forth.

## We Come to You Across {{LOCATION}}

Whether you are in a major city or a regional town, our team can come to you for inspection, payment and pickup. It is the fastest and most convenient way to sell {{TOPIC}} without setting foot in a dealership.

## Why Choose Auto-Sell.ai

- **Fast offers** — a quote in around 30 minutes, not days.
- **Same-day payment** — secure OSKO bank transfer once you accept.
- **Free pickup** — we collect the vehicle Australia-wide at no cost.
- **No hidden fees** — the price we agree is the price you get.
- **We handle the paperwork** — including transfer and notification of disposal.

## {{TOPIC}} — Frequently Asked Questions

**How quickly can I sell {{TOPIC}}?**
Most customers get an offer within 24 hours and can be paid the same day once they accept.

**Do you buy {{TOPIC}} with finance owing?**
Yes. We can settle the finance directly and pay you any remaining balance.

**Is pickup really free?**
Yes — free vehicle pickup is included anywhere in {{LOCATION}}.$md$,
  $ch$Ready to sell {{TOPIC}}?$ch$,
  $cd$Get a fair, no-obligation offer in around 30 minutes — free pickup and same-day OSKO payment across {{LOCATION}}.$cd$,
  $cb$Get My Instant Offer$cb$,
  '/#sell-form',
  $mt$Sell {{TOPIC}} Fast | Instant Offer & Same-Day Payment | Auto-Sell.ai$mt$,
  $mds$Sell {{TOPIC}} the easy way. Get an instant offer in ~30 minutes, free pickup across {{LOCATION}} and same-day OSKO payment. No fees, no haggling.$mds$,
  $mk$sell {{TOPIC}}, {{TOPIC}} cash offer, sell my {{TOPIC}}, car buyers {{LOCATION}}$mk$,
  false
)
on conflict (slug) do nothing;
