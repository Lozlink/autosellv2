'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Counts {
  posts: number
  publishedPosts: number
  pages: number
  publishedPages: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [counts, setCounts] = useState<Counts>({
    posts: 0,
    publishedPosts: 0,
    pages: 0,
    publishedPages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        // pageSize=1 keeps the payload tiny — we only need the `total` field for each query.
        const [postsAll, postsPub, pagesAll, pagesPub] = await Promise.all([
          fetch('/api/admin/posts?pageSize=1'),
          fetch('/api/admin/posts?pageSize=1&status=published'),
          fetch('/api/admin/pages?pageSize=1'),
          fetch('/api/admin/pages?pageSize=1&status=published'),
        ])
        if ([postsAll, postsPub, pagesAll, pagesPub].some((r) => r.status === 401)) {
          router.replace('/admin/login')
          return
        }
        const [a, b, c, d] = await Promise.all([
          postsAll.ok ? postsAll.json() : { total: 0 },
          postsPub.ok ? postsPub.json() : { total: 0 },
          pagesAll.ok ? pagesAll.json() : { total: 0 },
          pagesPub.ok ? pagesPub.json() : { total: 0 },
        ])
        setCounts({
          posts: a.total ?? 0,
          publishedPosts: b.total ?? 0,
          pages: c.total ?? 0,
          publishedPages: d.total ?? 0,
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const tiles = [
    {
      title: 'Blog Posts',
      description: 'Create, edit, and publish blog content. Manage SEO meta and internal links.',
      countLabel: loading ? '…' : `${counts.publishedPosts} published / ${counts.posts} total`,
      href: '/admin/posts',
      newHref: '/admin/posts/new',
    },
    {
      title: 'Pages',
      description: 'Custom landing pages with hero, content, and CTA sections.',
      countLabel: loading ? '…' : `${counts.publishedPages} published / ${counts.pages} total`,
      href: '/admin/pages',
      newHref: '/admin/pages/new',
    },
    {
      title: 'Leads',
      description: 'Customer enquiries and form submissions.',
      countLabel: 'View all leads',
      href: '/admin/leads',
      newHref: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage blog posts, pages, and leads.</p>
          </div>
          <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.title}
              className="bg-white border border-yellow-300 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-1">{tile.title}</h2>
              <p className="text-sm text-gray-500 mb-3 flex-1">{tile.description}</p>
              <p className="text-xs font-semibold text-yellow-700 mb-4 uppercase tracking-wide">
                {tile.countLabel}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(tile.href)}
                  className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm"
                >
                  Manage
                </button>
                {tile.newHref && (
                  <button
                    onClick={() => router.push(tile.newHref!)}
                    className="text-sm text-gray-500 hover:text-gray-700 font-semibold"
                  >
                    + New
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
