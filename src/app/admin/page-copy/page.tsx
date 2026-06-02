'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  PAGE_COPY_REGISTRY,
  PAGE_COPY_SLUGS,
  type CopyField,
} from '@/lib/pageCopyRegistry'
import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'

const DEFAULTS = PAGE_COPY_DEFAULTS as Record<string, Record<string, unknown>>

export default function AdminPageCopy() {
  const router = useRouter()
  const [slug, setSlug] = useState<string>(PAGE_COPY_SLUGS[0] ?? '')
  // Text/textarea fields are plain strings; list fields are edited as JSON text.
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  const spec = useMemo(() => PAGE_COPY_REGISTRY[slug], [slug])
  const defaults = useMemo(() => DEFAULTS[slug] ?? {}, [slug])

  const groups = useMemo(() => {
    const out: { group: string; fields: CopyField[] }[] = []
    if (!spec) return out
    for (const field of spec.fields) {
      let bucket = out.find((g) => g.group === field.group)
      if (!bucket) {
        bucket = { group: field.group, fields: [] }
        out.push(bucket)
      }
      bucket.fields.push(field)
    }
    return out
  }, [spec])

  const load = useCallback(async (s: string) => {
    setLoading(true)
    setError(null)
    setSavedAt(null)
    const res = await fetch(`/api/admin/page-overrides?slug=${encodeURIComponent(s)}`)
    if (res.status === 401) {
      router.replace('/admin/login')
      return
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Failed to load' }))
      setError(data.error || 'Failed to load')
      setLoading(false)
      return
    }
    const data = await res.json()
    const blocks = (data.blocks ?? {}) as Record<string, unknown>
    const next: Record<string, string> = {}
    for (const field of PAGE_COPY_REGISTRY[s]?.fields ?? []) {
      const v = blocks[field.key]
      if (field.type === 'list') {
        next[field.key] = Array.isArray(v) ? JSON.stringify(v, null, 2) : ''
      } else {
        next[field.key] = typeof v === 'string' ? v : ''
      }
    }
    setValues(next)
    setLoading(false)
  }, [router])

  useEffect(() => {
    if (slug) load(slug)
  }, [slug, load])

  const onField = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))

  const resetField = (key: string) =>
    setValues((prev) => ({ ...prev, [key]: '' }))

  // Build the blocks payload from current values (drops empties → page falls
  // back to its in-code default). Returns null on a JSON error (already shown).
  const buildBlocks = (): Record<string, unknown> | null => {
    const blocks: Record<string, unknown> = {}
    for (const field of spec?.fields ?? []) {
      const raw = values[field.key] ?? ''
      if (field.type === 'list') {
        if (!raw.trim()) continue
        try {
          const parsed = JSON.parse(raw)
          if (!Array.isArray(parsed)) {
            setError(`"${field.label}" must be a JSON array.`)
            return null
          }
          blocks[field.key] = parsed
        } catch {
          setError(`"${field.label}" is not valid JSON.`)
          return null
        }
      } else if (raw.trim()) {
        blocks[field.key] = raw
      }
    }
    return blocks
  }

  const put = async (blocks: Record<string, unknown>) => {
    const res = await fetch('/api/admin/page-overrides', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, blocks }),
    })
    if (res.status === 401) {
      router.replace('/admin/login')
      return false
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Failed to save' }))
      setError(data.error || 'Failed to save')
      return false
    }
    return true
  }

  const save = async () => {
    setError(null)
    setSavedAt(null)
    const blocks = buildBlocks()
    if (blocks === null) return
    setSaving(true)
    const ok = await put(blocks)
    setSaving(false)
    if (ok) setSavedAt(new Date().toLocaleTimeString())
  }

  // Clear every override for this page so it renders the in-code defaults.
  const resetAll = async () => {
    if (!window.confirm('Reset every field on this page back to the built-in defaults? This clears all saved overrides.')) {
      return
    }
    setError(null)
    setSavedAt(null)
    setSaving(true)
    const ok = await put({})
    setSaving(false)
    if (ok) {
      const cleared: Record<string, string> = {}
      for (const field of spec?.fields ?? []) cleared[field.key] = ''
      setValues(cleared)
      setSavedAt(new Date().toLocaleTimeString())
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white border border-yellow-300 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Page Copy</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin')} className="text-sm text-gray-500 hover:text-gray-700">Dashboard</button>
            <button onClick={() => router.push('/admin/leads')} className="text-sm text-gray-500 hover:text-gray-700">Leads</button>
            <button onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">Pages</button>
            <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          Edit copy on hardcoded marketing pages without touching code. The greyed text in each box is the
          current built-in default — leave a field blank (or hit Reset) to use it. List fields are edited as
          JSON. Changes go live within ~60 seconds.
        </p>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Page</label>
          <div className="flex items-center gap-3">
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
            >
              {PAGE_COPY_SLUGS.map((s) => (
                <option key={s} value={s}>{PAGE_COPY_REGISTRY[s].label}</option>
              ))}
            </select>
            {spec && (
              <a
                href={spec.path}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-sm text-yellow-600 hover:text-yellow-500"
              >
                View live ↗
              </a>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="py-12 text-center text-gray-400">Loading…</div>
        ) : (
          <div className="space-y-8">
            {groups.map((g) => (
              <div key={g.group} className="space-y-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{g.group}</h2>
                {g.fields.map((field) => {
                  const d = defaults[field.key]
                  const placeholder =
                    field.type === 'list'
                      ? d !== undefined
                        ? JSON.stringify(d, null, 2)
                        : 'Using built-in default list'
                      : typeof d === 'string' && d
                        ? d
                        : 'Using built-in default'
                  const hasValue = (values[field.key] ?? '').length > 0
                  return (
                    <div key={field.key}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm text-gray-600">
                          {field.label}
                          {field.type === 'list' && <span className="ml-2 text-xs text-gray-400">(JSON array)</span>}
                        </label>
                        {hasValue && (
                          <button
                            type="button"
                            onClick={() => resetField(field.key)}
                            className="text-xs text-gray-400 hover:text-yellow-600"
                          >
                            Reset to default
                          </button>
                        )}
                      </div>
                      {field.type === 'list' ? (
                        <>
                          {field.itemFields && (
                            <p className="text-[11px] text-gray-400 mb-1">
                              Each item: {field.itemFields.map((f) => `${f.key} (${f.type})`).join(', ')}
                            </p>
                          )}
                          <textarea
                            value={values[field.key] ?? ''}
                            onChange={(e) => onField(field.key, e.target.value)}
                            rows={8}
                            placeholder={placeholder}
                            spellCheck={false}
                            className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
                          />
                        </>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={values[field.key] ?? ''}
                          onChange={(e) => onField(field.key, e.target.value)}
                          rows={3}
                          placeholder={placeholder}
                          className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
                        />
                      ) : (
                        <input
                          value={values[field.key] ?? ''}
                          onChange={(e) => onField(field.key, e.target.value)}
                          placeholder={placeholder}
                          className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            ))}

            <div className="flex items-center gap-4 pt-2 border-t border-yellow-100">
              <button
                onClick={save}
                disabled={saving}
                className="px-6 py-2 rounded-lg font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: '#FFC325' }}
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button
                onClick={resetAll}
                disabled={saving}
                className="px-4 py-2 rounded-lg font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
              >
                Reset all to defaults
              </button>
              {savedAt && <span className="text-sm text-green-600">Saved at {savedAt}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
