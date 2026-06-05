import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import OfferForm from '@/app/_home/OfferForm'
import { FAQPageJsonLd } from '@/components/JsonLd'
import { markdownLiteToHtml, looksLikeBlockHtml } from '@/lib/markdownLite'

// Pull FAQ pairs out of a markdown body for FAQ rich-result schema. Matches the
// Draft Layout convention: a heading containing "FAQ"/"Frequently Asked", then
// whole-line bold questions (**…?**) each followed by their answer line(s).
// Returns [] when no FAQ is present (e.g. raw-HTML bodies), so it stays silent.
function extractFaqItems(md: string): { question: string; answer: string }[] {
  const lines = md.split('\n')
  const start = lines.findIndex((l) => /^#{1,3}\s+.*(faq|frequently asked)/i.test(l.trim()))
  if (start === -1) return []
  const items: { question: string; answer: string }[] = []
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^#{1,3}\s+/.test(line)) break // next section ends the FAQ block
    const q = line.match(/^\*\*(.+?)\*\*$/)
    if (!q) continue
    const answer: string[] = []
    for (let j = i + 1; j < lines.length; j++) {
      const a = lines[j].trim()
      if (!a || /^\*\*(.+?)\*\*$/.test(a) || /^#{1,3}\s+/.test(a)) break
      answer.push(a)
    }
    if (answer.length) items.push({ question: q[1].trim(), answer: answer.join(' ') })
  }
  return items
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')

  const { data: page } = await supabase
    .from('pages')
    .select('title, meta_title, meta_description, meta_keywords')
    .eq('slug', fullSlug)
    .single()

  if (!page) {
    return { title: 'Not Found' }
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || undefined,
    keywords: page.meta_keywords || undefined,
    alternates: {
      canonical: `https://www.auto-sell.ai/${fullSlug}`,
    },
    openGraph: {
      title: page.meta_title || page.title,
      description: page.meta_description || undefined,
      url: `https://www.auto-sell.ai/${fullSlug}`,
      type: 'website',
      locale: 'en_AU',
      siteName: 'Auto-Sell.ai',
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const fullSlug = slug.join('/')

  const { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', fullSlug)
    .eq('published', true)
    .single()

  if (error || !page) {
    notFound()
  }

  // Pages may store either markdown-lite (toolbar/editor) or raw HTML. Only
  // skip the converter when real block-level HTML is present, so markdown
  // headings/lists render properly while legacy HTML pages keep working.
  const contentHtml = looksLikeBlockHtml(page.content)
    ? page.content
    : markdownLiteToHtml(page.content)

  // Default the CTA to the on-page lead form. Respect an explicit custom link,
  // but treat the legacy "/#sell-form" (points at the home form) as the default
  // so the button scrolls to this page's hero form instead of leaving the page.
  const ctaHref =
    page.cta_button_link && page.cta_button_link !== '/#sell-form'
      ? page.cta_button_link
      : '#sell-form'

  const faqItems = extractFaqItems(page.content)

  return (
    <div className="min-h-screen section-cream">
      {faqItems.length > 0 && <FAQPageJsonLd items={faqItems} />}
      <Header />

      {/* Hero Section with inline lead form (matches brand/type pages) */}
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{page.title}</h1>
              {page.hero_subtitle && (
                <p className="text-xl md:text-2xl text-gray-700 mb-8">
                  {page.hero_subtitle}
                </p>
              )}
              <div className="space-y-4 mt-8 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                    <span style={{ color: '#FFC325' }}>&#10003;</span>
                  </div>
                  <span>30-minute quote turnaround</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                    <span style={{ color: '#FFC325' }}>&#10003;</span>
                  </div>
                  <span>Same-day OSKO payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                    <span style={{ color: '#FFC325' }}>&#10003;</span>
                  </div>
                  <span>Free Australia-wide pickup</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="liquid-glass-form-container rounded-2xl shadow-xl">
                <Suspense fallback={<div className="rounded-2xl p-8 border bg-white/30 animate-pulse h-96" style={{ borderColor: '#FFC325' }}></div>}>
                  <OfferForm heading={page.title} subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <section className="py-16 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="blog-content prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {page.cta_heading || 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            {page.cta_description || 'Get a fair quote in ~30 minutes with same-day OSKO payment across Australia.'}
          </p>
          <Link
            href={ctaHref}
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            {page.cta_button_text || 'Get Your Quote Now'}
          </Link>
        </div>
      </section>
    </div>
  )
}
