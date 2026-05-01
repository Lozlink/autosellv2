'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface PostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  category: string
  read_time: string
  meta_title: string
  meta_description: string
  published: boolean
}

const EMPTY_FORM: PostForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image_url: '',
  category: '',
  read_time: '',
  meta_title: '',
  meta_description: '',
  published: false,
}

export default function EditPostAdmin() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState<PostForm>(EMPTY_FORM)
  const [originalSlug, setOriginalSlug] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/admin/posts/${id}`)
      if (!res.ok) {
        setError('Failed to load post')
        setLoading(false)
        return
      }
      const data = await res.json()
      setForm({
        title: data.title ?? '',
        slug: data.slug ?? '',
        excerpt: data.excerpt ?? '',
        content: data.content ?? '',
        image_url: data.image_url ?? '',
        category: data.category ?? '',
        read_time: data.read_time ?? '',
        meta_title: data.meta_title ?? '',
        meta_description: data.meta_description ?? '',
        published: data.published ?? false,
      })
      setOriginalSlug(data.slug ?? '')
      setLoading(false)
    }
    fetchPost()
  }, [id])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      router.push('/admin/posts')
    } else {
      const data = await res.json().catch(() => ({ error: 'Failed to update post' }))
      setError(data.error || 'Failed to update post')
    }
  }

  const deletePost = async () => {
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/posts')
    } else {
      alert('Failed to delete post')
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white border border-yellow-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Post</h1>
            {originalSlug && (
              <a
                href={`/blog/${originalSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-600 hover:underline"
              >
                View live → /blog/{originalSlug}
              </a>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => router.push('/admin')} className="text-sm text-gray-500 hover:text-gray-700">Dashboard</button>
            <button onClick={() => router.push('/admin/posts')} className="text-sm text-gray-500 hover:text-gray-700">All Posts</button>
            <button onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">Pages</button>
            <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-6">
          {/* Post Basics */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Post Basics</h2>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input name="title" value={form.title} onChange={onChange} required className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Slug</label>
              <input name="slug" value={form.slug} onChange={onChange} required className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
              <p className="text-xs text-gray-400 mt-1">Changing the slug breaks existing links to this post.</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Excerpt</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={onChange}
                rows={2}
                placeholder="Short summary shown on the blog index and used as fallback meta description"
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Image URL</label>
              <input name="image_url" value={form.image_url} onChange={onChange} placeholder="https://..." className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <input name="category" value={form.category} onChange={onChange} placeholder="Selling Tips" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Read time</label>
                <input name="read_time" value={form.read_time} onChange={onChange} placeholder="5 min read" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
              </div>
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Content</h2>
            <p className="text-xs text-gray-400">
              Supports HTML. For internal links, use:
              <code className="bg-gray-100 px-1.5 py-0.5 rounded ml-1 text-gray-700">{'<a href="/sell-my-car-sydney">cash for cars</a>'}</code>
            </p>
            <div>
              <textarea
                name="content"
                value={form.content}
                onChange={onChange}
                rows={16}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325] font-mono text-sm"
              />
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* SEO Meta */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">SEO / Meta Tags</h2>
            <p className="text-xs text-gray-400">Leave blank to auto-generate from title and excerpt.</p>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Title</label>
              <input
                name="meta_title"
                value={form.meta_title}
                onChange={onChange}
                placeholder="Defaults to post title if blank"
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Description</label>
              <textarea
                name="meta_description"
                value={form.meta_description}
                onChange={onChange}
                rows={2}
                placeholder="Defaults to excerpt if blank. Recommended length: 150–160 characters."
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
              />
            </div>
          </div>

          <hr className="border-yellow-200" />

          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
            Published
          </label>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/posts')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={deletePost}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg border border-red-200 text-sm"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  )
}
