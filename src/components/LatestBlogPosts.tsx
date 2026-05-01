import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  read_time: string | null
  image_url: string | null
  created_at: string
}

export default async function LatestBlogPosts() {
  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, read_time, image_url, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const posts = (data ?? []) as Post[]

  if (posts.length === 0) return null

  return (
    <section id="latest-blog" className="py-8 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 md:mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Latest from the Blog
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Tips and guides to help you sell smarter
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#FFC325] hover:underline self-center md:self-end whitespace-nowrap"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const date = new Date(post.created_at).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            return (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#FFC325] hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-40 relative flex items-center justify-center bg-gray-50">
                  {post.image_url ? (
                    // Using <img> rather than next/image since image URLs are user-provided
                    // and may not be in the remotePatterns allowlist.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#FFC325' }}
                    >
                      <span className="text-white text-xl font-bold">
                        {(post.category ?? 'A').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    {post.category && (
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: 'rgba(255, 195, 37, 0.15)', color: '#d4a017' }}
                      >
                        {post.category}
                      </span>
                    )}
                    {post.read_time && (
                      <span className="text-gray-500 text-xs">{post.read_time}</span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#FFC325] transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <time className="text-xs text-gray-500">{date}</time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold text-sm hover:underline"
                      style={{ color: '#FFC325' }}
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
