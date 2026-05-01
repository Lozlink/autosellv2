'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostAdmin() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    read_time: '',
    meta_title: '',
    meta_description: '',
    published: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(false)

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'title' && !slugTouched) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const onSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugTouched(true)
    setForm((prev) => ({ ...prev, slug: e.target.value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin/posts')
    } else {
      const data = await res.json().catch(() => ({ error: 'Failed to create post' }))
      setError(data.error || 'Failed to create post')
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white border border-yellow-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-800">New Blog Post</h1>
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
              <input
                name="slug"
                value={form.slug}
                onChange={onSlugChange}
                placeholder="my-awesome-post"
                required
                className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
              />
              <p className="text-xs text-gray-400 mt-1">Auto-generated from title. Edit to customise the URL.</p>
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
              disabled={loading}
              className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Create Post'}
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
      </div>
    </div>
  )
}
