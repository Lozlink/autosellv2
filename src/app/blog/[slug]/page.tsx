import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) return { title: 'Post Not Found - Auto-Sell.ai' }

  return {
    title: `${post.title} - Auto-Sell.ai Blog`,
    description: post.excerpt || '',
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
        <Link
          href="/blog"
          className="text-[#FFC325] font-semibold text-sm hover:underline mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <span className="bg-[#FFC325]/20 text-[#FFC325] text-xs font-semibold px-2 py-1 rounded-full">
              {post.category}
            </span>
          )}
          {post.read_time && (
            <span className="text-gray-500 text-sm">{post.read_time}</span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
        )}

        <time className="text-sm text-gray-500 block mb-8">
          {new Date(post.created_at).toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <hr className="border-gray-200 mb-8" />

        <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  )
}
