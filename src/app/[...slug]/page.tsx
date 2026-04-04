import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{page.title}</h1>
            {page.hero_subtitle && (
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
                {page.hero_subtitle}
              </p>
            )}
            <Link
              href={page.cta_button_link || '/#sell-form'}
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Sell Your Car Now
            </Link>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <section className="py-16 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {page.cta_heading || 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            {page.cta_description || 'Get a fair quote in ~30 minutes with same-day OSKO payment across Australia.'}
          </p>
          <Link
            href={page.cta_button_link || '/#sell-form'}
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
