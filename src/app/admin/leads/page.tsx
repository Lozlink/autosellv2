'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// Lead management fields shared by leads and inquiries (migration 009).
interface Managed {
  contacted_at?: string | null
  admin_notes?: string | null
  notes_updated_at?: string | null
}

interface Lead extends Managed {
  id: string
  name: string
  email: string
  phone: string
  vin_or_reg?: string
  enquiry_type?: string
  message?: string
  created_at: string
}

interface Inquiry extends Managed {
  id: string
  name: string
  email: string
  phone: string
  postcode?: string
  enquiry_type?: string
  vehicle_make?: string
  vehicle_model?: string
  vehicle_year?: string
  vehicle_odometer?: string
  vehicle_condition?: string
  vehicle_description?: string
  message?: string
  budget?: string
  preferred_location?: string
  vin_or_reg?: string
  created_at: string
}

interface ConversationMessage {
  id: string
  phone_number: string
  incoming_message?: string
  outgoing_message?: string
  platform: string
  should_escalate?: boolean
  created_at: string
}

interface ConversationThread {
  sessionId: string
  platform: string
  messages: ConversationMessage[]
  firstAt: string
  lastAt: string
  messageCount: number
  escalated: boolean
}

type Tab = 'inquiries' | 'leads' | 'conversations'
type Range = '30' | '90' | '365' | 'all'
type Status = 'all' | 'new' | 'contacted'

interface Counts {
  leads: number
  inquiries: number
  conversations: number
}

const PAGE_SIZE = 50
const VALID_TABS: Tab[] = ['inquiries', 'leads', 'conversations']
const VALID_RANGES: Range[] = ['30', '90', '365', 'all']
const VALID_STATUSES: Status[] = ['all', 'new', 'contacted']

const RANGE_OPTIONS: { value: Range; label: string }[] = [
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '365', label: 'Last 12 months' },
  { value: 'all', label: 'All time' },
]

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
]

export default function AdminLeadsPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <AdminLeadsInner />
    </Suspense>
  )
}

function LoadingShell() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-6xl mx-auto text-center py-12 text-gray-400">Loading...</div>
    </div>
  )
}

function AdminLeadsInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // ── URL-driven state ─────────────────────────────────────────────────
  const tab: Tab = useMemo(() => {
    const raw = searchParams.get('tab')
    return (VALID_TABS as string[]).includes(raw ?? '') ? (raw as Tab) : 'inquiries'
  }, [searchParams])
  const range: Range = useMemo(() => {
    const raw = searchParams.get('range')
    return (VALID_RANGES as string[]).includes(raw ?? '') ? (raw as Range) : '90'
  }, [searchParams])
  const page: number = useMemo(() => {
    const raw = parseInt(searchParams.get('page') ?? '1', 10)
    return Number.isFinite(raw) && raw > 0 ? raw : 1
  }, [searchParams])
  const q: string = useMemo(() => searchParams.get('q') ?? '', [searchParams])
  const status: Status = useMemo(() => {
    const raw = searchParams.get('status')
    return (VALID_STATUSES as string[]).includes(raw ?? '') ? (raw as Status) : 'all'
  }, [searchParams])

  const updateParams = useCallback(
    (patch: Partial<{ tab: Tab; range: Range; page: number; q: string; status: Status }>) => {
      const next = new URLSearchParams(searchParams.toString())
      // tab/range/q/status changes always reset to page 1 unless explicitly setting page.
      if (patch.tab !== undefined) {
        next.set('tab', patch.tab)
        next.set('page', '1')
      }
      if (patch.range !== undefined) {
        next.set('range', patch.range)
        next.set('page', '1')
      }
      if (patch.status !== undefined) {
        if (patch.status === 'all') next.delete('status')
        else next.set('status', patch.status)
        next.set('page', '1')
      }
      if (patch.q !== undefined) {
        if (patch.q) next.set('q', patch.q)
        else next.delete('q')
        next.set('page', '1')
      }
      if (patch.page !== undefined) {
        next.set('page', String(patch.page))
      }
      router.replace(`/admin/leads?${next.toString()}`)
    },
    [router, searchParams],
  )

  // ── Local input state for debounced search ───────────────────────────
  const [searchInput, setSearchInput] = useState(q)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Sync the input if URL state changes externally (e.g. browser back).
  useEffect(() => {
    setSearchInput(q)
  }, [q])
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

  // ── Server data ──────────────────────────────────────────────────────
  const [leads, setLeads] = useState<Lead[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [threads, setThreads] = useState<ConversationThread[]>([])
  const [counts, setCounts] = useState<Counts>({ leads: 0, inquiries: 0, conversations: 0 })
  const [total, setTotal] = useState(0)
  const [threadsAggregated, setThreadsAggregated] = useState(true)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    setExpandedId(null)
    const params = new URLSearchParams({
      tab,
      range,
      page: String(page),
      pageSize: String(PAGE_SIZE),
    })
    if (q) params.set('q', q)
    if (status !== 'all') params.set('status', status)
    const res = await fetch(`/api/admin/leads?${params.toString()}`)
    if (!res.ok) {
      setError('Failed to load data')
      setLoading(false)
      return
    }
    const data = await res.json()
    setCounts(data.counts ?? { leads: 0, inquiries: 0, conversations: 0 })
    setTotal(data.total ?? 0)
    setThreadsAggregated(data.threadsAggregated !== false)

    if (tab === 'leads') {
      setLeads((data.data ?? []) as Lead[])
    } else if (tab === 'inquiries') {
      setInquiries((data.data ?? []) as Inquiry[])
    } else {
      // Conversations: server may return aggregated threads or raw messages (fallback).
      if (data.threadsAggregated) {
        setThreads((data.data ?? []) as ConversationThread[])
      } else {
        const rawConvos: ConversationMessage[] = data.data ?? []
        const grouped = new Map<string, ConversationMessage[]>()
        for (const c of rawConvos) {
          const key = c.phone_number
          if (!grouped.has(key)) grouped.set(key, [])
          grouped.get(key)!.push(c)
        }
        const built: ConversationThread[] = Array.from(grouped.entries()).map(
          ([sessionId, msgs]) => {
            const sorted = msgs.sort(
              (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            )
            return {
              sessionId,
              platform: sorted[0].platform,
              messages: sorted,
              firstAt: sorted[0].created_at,
              lastAt: sorted[sorted.length - 1].created_at,
              messageCount: sorted.length,
              escalated: sorted.some((m) => m.should_escalate),
            }
          },
        )
        built.sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime())
        setThreads(built)
      }
    }
    setLoading(false)
  }, [tab, range, page, q, status])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Merge a PATCHed row back into the active list without a full refetch,
  // so expanded cards and scroll position are preserved.
  const applyUpdate = useCallback(
    (updated: Managed & { id: string }) => {
      if (tab === 'leads') {
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? { ...l, ...updated } : l)))
      } else if (tab === 'inquiries') {
        setInquiries((prev) => prev.map((i) => (i.id === updated.id ? { ...i, ...updated } : i)))
      }
    },
    [tab],
  )

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const formatDate = (d: string) => {
    const date = new Date(d)
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const showingStart = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const showingEnd = tab === 'conversations' && !threadsAggregated
    ? threads.length
    : Math.min(page * PAGE_SIZE, total)

  const activeListCount =
    tab === 'leads' ? leads.length : tab === 'inquiries' ? inquiries.length : threads.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leads &amp; Inquiries</h1>
            <p className="text-sm text-gray-500 mt-1">
              {total} total {tab}
              {q && <span> matching &ldquo;{q}&rdquo;</span>}
              {range !== 'all' && (
                <span className="text-gray-400">
                  {' '}· {RANGE_OPTIONS.find((r) => r.value === range)?.label}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => router.push('/admin')} className="text-sm text-gray-500 hover:text-gray-700">Dashboard</button>
            <button onClick={() => router.push('/admin/posts')} className="text-sm text-gray-500 hover:text-gray-700">Posts</button>
            <button onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">Pages</button>
            <button onClick={logout} className="text-sm text-yellow-600 hover:text-yellow-500">Logout</button>
          </div>
        </div>

        {/* Tabs + Filters */}
        <div className="bg-white border border-yellow-300 rounded-xl p-4 mb-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 flex-wrap">
                <button
                  onClick={() => updateParams({ tab: 'inquiries' })}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    tab === 'inquiries' ? 'bg-[#FFC325] text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Inquiries ({counts.inquiries})
                </button>
                <button
                  onClick={() => updateParams({ tab: 'leads' })}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    tab === 'leads' ? 'bg-[#FFC325] text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Leads ({counts.leads})
                </button>
                <button
                  onClick={() => updateParams({ tab: 'conversations' })}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    tab === 'conversations' ? 'bg-[#FFC325] text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Chats ({counts.conversations})
                </button>
              </div>

              <div className="flex items-center gap-2">
                {tab !== 'conversations' && (
                  <select
                    value={status}
                    onChange={(e) => updateParams({ status: e.target.value as Status })}
                    className="px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}
                <label className="text-xs text-gray-500 whitespace-nowrap">Range:</label>
                <select
                  value={range}
                  onChange={(e) => updateParams({ range: e.target.value as Range })}
                  className="px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
                >
                  {RANGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, phone, vehicle, message..."
                value={searchInput}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
              />
              {searchInput && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Search runs across all matching rows in the selected date range. Updates as you type.
              </p>
            </div>
          </div>
        </div>

        {!threadsAggregated && tab === 'conversations' && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 mb-4 text-sm">
            <strong>Conversation pagination unavailable.</strong> Apply migration{' '}
            <code className="bg-yellow-100 px-1 rounded">006_conversation_threads_function.sql</code> to enable
            server-side thread pagination. Currently showing up to 2,000 messages within range.
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        )}

        {/* Empty */}
        {!loading && activeListCount === 0 && (
          <div className="text-center py-12 text-gray-400">
            {q
              ? `No ${tab} match "${q}" in this date range.`
              : `No ${tab} in this date range.`}
          </div>
        )}

        {/* Data cards */}
        {!loading && activeListCount > 0 && (
          <div className="space-y-3">
            {tab === 'inquiries' &&
              inquiries.map((item) => (
                <InquiryCard
                  key={item.id}
                  item={item}
                  expanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  formatDate={formatDate}
                  onUpdated={applyUpdate}
                />
              ))}
            {tab === 'leads' &&
              leads.map((item) => (
                <LeadCard
                  key={item.id}
                  item={item}
                  expanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  formatDate={formatDate}
                  onUpdated={applyUpdate}
                />
              ))}
            {tab === 'conversations' &&
              threads.map((thread) => (
                <ConversationCard
                  key={thread.sessionId}
                  thread={thread}
                  expanded={expandedId === thread.sessionId}
                  onToggle={() =>
                    setExpandedId(expandedId === thread.sessionId ? null : thread.sessionId)
                  }
                  formatDate={formatDate}
                />
              ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && total > 0 && (tab !== 'conversations' || threadsAggregated) && (
          <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-700">{showingStart}–{showingEnd}</span> of{' '}
              <span className="font-semibold text-gray-700">{total}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateParams({ page: 1 })}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                onClick={() => updateParams({ page: Math.max(1, page - 1) })}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <span className="px-3 py-1.5 text-sm font-semibold text-gray-700 bg-yellow-50 rounded-lg">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => updateParams({ page: Math.min(totalPages, page + 1) })}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
              <button
                onClick={() => updateParams({ page: totalPages })}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InquiryCard({
  item,
  expanded,
  onToggle,
  formatDate,
  onUpdated,
}: {
  item: Inquiry
  expanded: boolean
  onToggle: () => void
  formatDate: (d: string) => string
  onUpdated: (row: Managed & { id: string }) => void
}) {
  return (
    <div className="bg-white border border-yellow-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-yellow-50/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm truncate">{item.name}</span>
            <StatusBadge item={item} />
            {item.vehicle_make && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                {item.vehicle_year} {item.vehicle_make} {item.vehicle_model}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>{item.email}</span>
            <span>{item.phone}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 whitespace-nowrap">{formatDate(item.created_at)}</div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-yellow-100">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
            <Detail label="Postcode" value={item.postcode} />
            <Detail label="Type" value={item.enquiry_type} />
            <Detail label="Rego/VIN" value={item.vin_or_reg} />
            <Detail label="Odometer" value={item.vehicle_odometer} />
            <Detail label="Condition" value={item.vehicle_condition} />
            <Detail label="Budget" value={item.budget} />
            <Detail label="Location" value={item.preferred_location} />
          </div>
          {item.vehicle_description && (
            <div className="mt-3">
              <span className="text-xs text-gray-400 block mb-1">Vehicle Description</span>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">{item.vehicle_description}</p>
            </div>
          )}
          {item.message && (
            <div className="mt-3">
              <span className="text-xs text-gray-400 block mb-1">Message</span>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">{item.message}</p>
            </div>
          )}
          <LeadManagement table="inquiries" item={item} onUpdated={onUpdated} formatDate={formatDate} />
        </div>
      )}
    </div>
  )
}

function LeadCard({
  item,
  expanded,
  onToggle,
  formatDate,
  onUpdated,
}: {
  item: Lead
  expanded: boolean
  onToggle: () => void
  formatDate: (d: string) => string
  onUpdated: (row: Managed & { id: string }) => void
}) {
  return (
    <div className="bg-white border border-yellow-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-yellow-50/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm truncate">{item.name}</span>
            <StatusBadge item={item} />
            {item.enquiry_type && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {item.enquiry_type}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>{item.email}</span>
            <span>{item.phone}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 whitespace-nowrap">{formatDate(item.created_at)}</div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-yellow-100">
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <Detail label="Rego/VIN" value={item.vin_or_reg} />
            <Detail label="Type" value={item.enquiry_type} />
          </div>
          {item.message && (
            <div className="mt-3">
              <span className="text-xs text-gray-400 block mb-1">Message</span>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">{item.message}</p>
            </div>
          )}
          <LeadManagement table="leads" item={item} onUpdated={onUpdated} formatDate={formatDate} />
        </div>
      )}
    </div>
  )
}

function ConversationCard({
  thread,
  expanded,
  onToggle,
  formatDate,
}: {
  thread: ConversationThread
  expanded: boolean
  onToggle: () => void
  formatDate: (d: string) => string
}) {
  const platformLabel =
    thread.platform === 'web'
      ? 'Web Chat'
      : thread.platform === 'whatsapp'
        ? 'WhatsApp'
        : 'SMS'

  return (
    <div className="bg-white border border-yellow-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-yellow-50/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm truncate">
              {thread.sessionId.startsWith('web_') ? `Web Session` : thread.sessionId}
            </span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {platformLabel}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {thread.messageCount} messages
            </span>
            {thread.escalated && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Escalated</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>{thread.sessionId.startsWith('web_') ? 'Website visitor' : thread.sessionId}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 whitespace-nowrap">{formatDate(thread.lastAt)}</div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-yellow-100">
          <div className="mt-3 space-y-2 max-h-96 overflow-y-auto">
            {thread.messages.map((msg) => (
              <div key={msg.id}>
                {msg.incoming_message && (
                  <div className="flex justify-end">
                    <div className="bg-[#FFC325] text-gray-900 rounded-2xl rounded-br-md px-3 py-2 max-w-[75%] text-sm">
                      <p className="whitespace-pre-wrap">{msg.incoming_message}</p>
                      <p className="text-[10px] text-gray-600 mt-1 text-right">
                        {formatDate(msg.created_at)}
                      </p>
                    </div>
                  </div>
                )}
                {msg.outgoing_message && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-3 py-2 max-w-[75%] text-sm">
                      <p className="whitespace-pre-wrap">{msg.outgoing_message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{formatDate(msg.created_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <span className="text-xs text-gray-400 block">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  )
}

function StatusBadge({ item }: { item: Managed }) {
  return (
    <>
      {item.contacted_at ? (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Contacted</span>
      ) : (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">New</span>
      )}
      {item.admin_notes && (
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Notes</span>
      )}
    </>
  )
}

function LeadManagement({
  table,
  item,
  onUpdated,
  formatDate,
}: {
  table: 'leads' | 'inquiries'
  item: Managed & { id: string }
  onUpdated: (row: Managed & { id: string }) => void
  formatDate: (d: string) => string
}) {
  const [notes, setNotes] = useState(item.admin_notes ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [justSaved, setJustSaved] = useState(false)
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
    }
  }, [])

  const contacted = Boolean(item.contacted_at)
  const notesDirty = notes.trim() !== (item.admin_notes ?? '')

  const patch = async (body: { contacted?: boolean; notes?: string }): Promise<boolean> => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id: item.id, ...body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Update failed')
      onUpdated(data.data as Managed & { id: string })
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed')
      return false
    } finally {
      setBusy(false)
    }
  }

  const toggleContacted = () => patch({ contacted: !contacted })

  const saveNotes = async () => {
    const ok = await patch({ notes })
    if (ok) {
      setJustSaved(true)
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current)
      savedTimerRef.current = setTimeout(() => setJustSaved(false), 2000)
    }
  }

  return (
    <div className="mt-4 pt-3 border-t border-dashed border-yellow-200">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Lead management
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {contacted && item.contacted_at && (
            <span className="text-xs text-gray-400">Contacted {formatDate(item.contacted_at)}</span>
          )}
          <button
            onClick={toggleContacted}
            disabled={busy}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 ${
              contacted
                ? 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                : 'bg-green-600 text-white hover:bg-green-500'
            }`}
          >
            {contacted ? 'Mark as not contacted' : 'Mark as contacted'}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes — e.g. called 3pm, wants pickup Saturday, offered $8,500..."
          rows={3}
          className="w-full px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC325] resize-y"
        />
        <div className="flex items-center justify-between mt-1 gap-3">
          <span className="text-xs text-gray-400">
            {justSaved
              ? 'Saved'
              : item.notes_updated_at
                ? `Notes updated ${formatDate(item.notes_updated_at)}`
                : ''}
          </span>
          <button
            onClick={saveNotes}
            disabled={busy || !notesDirty}
            className="px-3 py-1.5 text-sm font-medium bg-[#FFC325] text-gray-900 rounded-lg hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? 'Saving...' : 'Save notes'}
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  )
}
