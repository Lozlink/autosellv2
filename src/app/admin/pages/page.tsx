'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Page {
  id: string
  title: string
  slug: string
  published: boolean
}

export default function AdminPagesPage() {
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setLoading(true)
    setError(null)
    const res = await fetch('/api/admin/pages')
    if (!res.ok) {
      setError('Failed to load pages')
      setLoading(false)
      return
    }
    const data = await res.json()
    setPages(data)
    setLoading(false)
  }

  const deletePage = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchPages()
    } else {
      alert('Failed to delete page')
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pages</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin')} className="text-sm text-gray-500 hover:text-gray-700">Blog Admin</button>
            <button onClick={() => router.push('/admin/leads')} className="text-sm text-gray-500 hover:text-gray-700">Leads</button>
            <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/admin/pages/new')}
            className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg"
          >
            + New Page
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>
        )}

        {loading && (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        )}

        {!loading && pages.length === 0 && (
          <div className="text-center py-12 text-gray-400">No pages yet.</div>
        )}

        {!loading && pages.length > 0 && (
          <div className="space-y-3">
            {pages.map((page) => (
              <div key={page.id} className="bg-white border border-yellow-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-800">{page.title}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        page.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-600 hover:text-yellow-500 hover:underline mt-1 inline-block">/{page.slug}</a>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => router.push(`/admin/pages/${page.id}/edit`)}
                    className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePage(page.id, page.title)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg text-sm border border-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
