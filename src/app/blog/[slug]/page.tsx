import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export const revalidate = 60

/**
 * Lightweight markdown-to-HTML converter for plain-text posts where the
 * author wrote in markdown conventions but never wrapped anything in proper
 * HTML tags. Handles:
 *   - `# Heading` and `## Subheading` and `### Sub-subheading` → <h2> / <h3>
 *   - `- item` / `* item` lines → <ul><li>
 *   - `1. item` lines → <ol><li>
 *   - `> quote` lines → <blockquote>
 *   - `**bold**` → <strong>
 *   - `*italic*` / `_italic_` → <em>
 *   - `[label](url)` → <a>
 *
 * Line-based scan: structural prefixes (`##`, `-`, `1.`, `>`) start a new
 * block without requiring a blank line above them. Blank lines also act as
 * block separators. Paragraphs absorb consecutive plain lines and join them
 * with a space (markdown convention) — not <br />, so re-flowed text doesn't
 * produce ragged output.
 *
 * Real WYSIWYG/HTML-authored content with proper tags bypasses this entirely
 * via the looksLikeHtml check below.
 */
function markdownLiteToHtml(input: string): string {
  const inline = (s: string): string =>
    s
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/(?<!_)_([^_\n]+)_(?!_)/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_, label, url) => `<a href="${url}">${label}</a>`
      )

  type Block =
    | { kind: 'ul'; items: string[] }
    | { kind: 'ol'; items: string[] }
    | { kind: 'quote'; lines: string[] }
    | { kind: 'p'; lines: string[] }

  const lines = input.replace(/\r\n/g, '\n').split('\n')
  const out: string[] = []
  let current: Block | null = null

  const flush = () => {
    if (!current) return
    if (current.kind === 'ul') {
      out.push(`<ul>${current.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`)
    } else if (current.kind === 'ol') {
      out.push(`<ol>${current.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`)
    } else if (current.kind === 'quote') {
      out.push(`<blockquote>${inline(current.lines.join(' '))}</blockquote>`)
    } else if (current.kind === 'p') {
      out.push(`<p>${inline(current.lines.join(' '))}</p>`)
    }
    current = null
  }

  for (const raw of lines) {
    const line = raw.trim()

    if (!line) {
      flush()
      continue
    }

    // Heading: 1–3 leading hashes followed by space + text. Standalone block.
    const h = line.match(/^(#{1,3})\s+(.*)$/)
    if (h) {
      flush()
      const level = h[1].length === 3 ? 'h3' : 'h2'
      out.push(`<${level}>${inline(h[2])}</${level}>`)
      continue
    }

    // Bulleted list item
    const ul = line.match(/^[-*]\s+(.*)$/)
    if (ul) {
      if (current?.kind !== 'ul') {
        flush()
        current = { kind: 'ul', items: [] }
      }
      current.items.push(ul[1])
      continue
    }

    // Numbered list item
    const ol = line.match(/^\d+\.\s+(.*)$/)
    if (ol) {
      if (current?.kind !== 'ol') {
        flush()
        current = { kind: 'ol', items: [] }
      }
      current.items.push(ol[1])
      continue
    }

    // Blockquote line
    const q = line.match(/^>\s?(.*)$/)
    if (q) {
      if (current?.kind !== 'quote') {
        flush()
        current = { kind: 'quote', lines: [] }
      }
      current.lines.push(q[1])
      continue
    }

    // Plain paragraph line
    if (current?.kind !== 'p') {
      flush()
      current = { kind: 'p', lines: [] }
    }
    current.lines.push(line)
  }

  flush()
  return out.join('\n')
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, meta_title, meta_description')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) return { title: 'Post Not Found - Auto-Sell.ai' }

  const title = post.meta_title?.trim()
    ? post.meta_title
    : `${post.title} - Auto-Sell.ai Blog`
  const description = post.meta_description?.trim() || post.excerpt || ''

  return {
    title,
    description,
    alternates: {
      canonical: `https://auto-sell.ai/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://auto-sell.ai/blog/${slug}`,
      type: 'article',
    },
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

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(post.content)
  const html = looksLikeHtml ? post.content : markdownLiteToHtml(post.content)

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

        <div
          className="blog-content prose prose-gray max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  )
}
