'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface PageForm {
  title: string
  slug: string
  hero_subtitle: string
  content: string
  cta_heading: string
  cta_description: string
  cta_button_text: string
  cta_button_link: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  published: boolean
}

export default function EditPageAdmin() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState<PageForm>({
    title: '',
    slug: '',
    hero_subtitle: '',
    content: '',
    cta_heading: '',
    cta_description: '',
    cta_button_text: '',
    cta_button_link: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    published: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetch(`/api/admin/pages/${id}`)
      if (!res.ok) {
        setError('Failed to load page')
        setLoading(false)
        return
      }
      const data = await res.json()
      setForm({
        title: data.title ?? '',
        slug: data.slug ?? '',
        hero_subtitle: data.hero_subtitle ?? '',
        content: data.content ?? '',
        cta_heading: data.cta_heading ?? '',
        cta_description: data.cta_description ?? '',
        cta_button_text: data.cta_button_text ?? '',
        cta_button_link: data.cta_button_link ?? '',
        meta_title: data.meta_title ?? '',
        meta_description: data.meta_description ?? '',
        meta_keywords: data.meta_keywords ?? '',
        published: data.published ?? false,
      })
      setLoading(false)
    }
    fetchPage()
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
    const res = await fetch(`/api/admin/pages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      router.push('/admin/pages')
    } else {
      const data = await res.json().catch(() => ({ error: 'Failed to update page' }))
      setError(data.error || 'Failed to update page')
    }
  }

  const deletePage = async () => {
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/pages')
    } else {
      alert('Failed to delete page')
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Page</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin')} className="text-sm text-gray-500 hover:text-gray-700">Blog Admin</button>
            <button onClick={() => router.push('/admin/leads')} className="text-sm text-gray-500 hover:text-gray-700">Leads</button>
            <button onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">Pages</button>
            <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-6">
          {/* Page Basics */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Page Basics</h2>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input name="title" value={form.title} onChange={onChange} required className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Slug</label>
              <input name="slug" value={form.slug} onChange={onChange} required className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* Hero Banner */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Hero Banner</h2>
            <p className="text-xs text-gray-400">The yellow banner at the top of the page. Title is used as the heading.</p>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Hero Subtitle</label>
              <input name="hero_subtitle" value={form.hero_subtitle} onChange={onChange} placeholder="A short description shown below the title" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* Page Content */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Page Content</h2>
            <p className="text-xs text-gray-400">The main body section. Supports HTML.</p>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Content</label>
              <textarea name="content" value={form.content} onChange={onChange} rows={12} required className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* CTA Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Call to Action</h2>
            <p className="text-xs text-gray-400">The yellow banner at the bottom of the page. Leave blank for defaults.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">CTA Heading</label>
                <input name="cta_heading" value={form.cta_heading} onChange={onChange} placeholder="Ready to Get Started?" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">CTA Button Text</label>
                <input name="cta_button_text" value={form.cta_button_text} onChange={onChange} placeholder="Get Your Quote Now" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">CTA Description</label>
              <input name="cta_description" value={form.cta_description} onChange={onChange} placeholder="Get a fair quote in ~30 minutes with same-day OSKO payment across Australia." className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">CTA Button Link</label>
              <input name="cta_button_link" value={form.cta_button_link} onChange={onChange} placeholder="/#sell-form" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* SEO / Meta */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">SEO / Meta Tags</h2>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Title</label>
              <input name="meta_title" value={form.meta_title} onChange={onChange} placeholder="Defaults to page title if blank" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Description</label>
              <input name="meta_description" value={form.meta_description} onChange={onChange} placeholder="SEO description for search engines" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Keywords</label>
              <input name="meta_keywords" value={form.meta_keywords} onChange={onChange} placeholder="keyword1, keyword2, keyword3" className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]" />
            </div>
          </div>

          <hr className="border-yellow-200" />

          {/* Publish */}
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
            Published
          </label>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="bg-[#FFC325] hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={deletePage}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg border border-red-200 text-sm"
          >
            Delete Page
          </button>
        </div>
      </div>
    </div>
  )
}
