'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AdminListShell, {
  AdminPagination,
  type AdminRange,
  type AdminStatus,
} from '@/components/AdminListShell'

interface Post {
  id: string
  title: string
  slug: string
  category: string | null
  published: boolean
  created_at: string
  updated_at: string
}

const PAGE_SIZE = 25
const VALID_RANGES: AdminRange[] = ['30', '90', '365', 'all']
const VALID_STATUSES: AdminStatus[] = ['all', 'published', 'draft']

export default function AdminPostsPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <AdminPostsInner />
    </Suspense>
  )
}

function LoadingShell() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-4xl mx-auto text-center py-12 text-gray-400">Loading...</div>
    </div>
  )
}

function AdminPostsInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const range: AdminRange = useMemo(() => {
    const raw = searchParams.get('range')
    return (VALID_RANGES as string[]).includes(raw ?? '') ? (raw as AdminRange) : 'all'
  }, [searchParams])
  const status: AdminStatus = useMemo(() => {
    const raw = searchParams.get('status')
    return (VALID_STATUSES as string[]).includes(raw ?? '') ? (raw as AdminStatus) : 'all'
  }, [searchParams])
  const page: number = useMemo(() => {
    const raw = parseInt(searchParams.get('page') ?? '1', 10)
    return Number.isFinite(raw) && raw > 0 ? raw : 1
  }, [searchParams])
  const q: string = useMemo(() => searchParams.get('q') ?? '', [searchParams])

  const updateParams = useCallback(
    (patch: Partial<{ range: AdminRange; status: AdminStatus; page: number; q: string }>) => {
      const next = new URLSearchParams(searchParams.toString())
      if (patch.range !== undefined) {
        next.set('range', patch.range)
        next.set('page', '1')
      }
      if (patch.status !== undefined) {
        next.set('status', patch.status)
        next.set('page', '1')
      }
      if (patch.q !== undefined) {
        if (patch.q) next.set('q', patch.q)
        else next.delete('q')
        next.set('page', '1')
      }
      if (patch.page !== undefined) next.set('page', String(patch.page))
      router.replace(`/admin/posts?${next.toString()}`)
    },
    [router, searchParams],
  )

  const [searchInput, setSearchInput] = useState(q)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => setSearchInput(q), [q])
  const onSearchChange = (value: string) => {
    setSearchInput(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      updateParams({ q: value })
    }, 300)
  }
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      range,
      status,
    })
    if (q) params.set('q', q)
    const res = await fetch(`/api/admin/posts?${params.toString()}`)
    if (!res.ok) {
      setError('Failed to load posts')
      setLoading(false)
      return
    }
    const data = await res.json()
    setPosts((data.data ?? []) as Post[])
    setTotal(data.total ?? 0)
    setLoading(false)
  }, [page, range, status, q])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    if (res.ok) fetchPosts()
    else alert('Failed to delete post')
  }

  const togglePublished = async (p: Post) => {
    const res = await fetch(`/api/admin/posts/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !p.published }),
    })
    if (res.ok) fetchPosts()
    else alert('Failed to update post')
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
            <p className="text-sm text-gray-500 mt-1">
              {total} total{q && <span> matching &ldquo;{q}&rdquo;</span>}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => router.push('/admin')} className="text-sm text-gray-500 hover:text-gray-700">Dashboard</button>
            <button onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">Pages</button>
            <button onClick={() => router.push('/admin/leads')} className="text-sm text-gray-500 hover:text-gray-700">Leads</button>
            <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/admin/posts/new')}
            className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg"
          >
            + New Post
          </button>
        </div>

        <AdminListShell
          searchInput={searchInput}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search posts by title, slug, excerpt, category..."
          range={range}
          onRangeChange={(r) => updateParams({ range: r })}
          status={status}
          onStatusChange={(s) => updateParams({ status: s })}
          loading={loading}
          onRefresh={fetchPosts}
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>
          )}

          {loading && (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12 bg-white border border-yellow-200 rounded-xl">
              <p className="text-gray-500 mb-4">
                {q ? `No posts match "${q}".` : 'No posts match these filters.'}
              </p>
              {!q && (
                <button
                  onClick={() => router.push('/admin/posts/new')}
                  className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg"
                >
                  Create your first post
                </button>
              )}
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="space-y-3">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-yellow-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-800 truncate">{p.title}</span>
                      <button
                        type="button"
                        onClick={() => togglePublished(p)}
                        title="Click to toggle"
                        className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                          p.published
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {p.published ? 'Published' : 'Draft'}
                      </button>
                      {p.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                          {p.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
                      <a
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-500 hover:underline"
                      >
                        /blog/{p.slug}
                      </a>
                      <span>
                        Updated {new Date(p.updated_at).toLocaleDateString('en-AU', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => router.push(`/admin/posts/${p.id}/edit`)}
                      className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(p.id, p.title)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg text-sm border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <AdminPagination
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={PAGE_SIZE}
            onChange={(p) => updateParams({ page: p })}
          />
        </AdminListShell>
      </div>
    </div>
  )
}
