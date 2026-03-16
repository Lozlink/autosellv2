'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  vin_or_reg?: string
  enquiry_type?: string
  message?: string
  created_at: string
}

interface Inquiry {
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

interface Conversation {
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
  messages: Conversation[]
  firstAt: string
  lastAt: string
  messageCount: number
  escalated: boolean
}

type Tab = 'inquiries' | 'leads' | 'conversations'

export default function AdminLeadsPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('inquiries')
  const [leads, setLeads] = useState<Lead[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [conversations, setConversations] = useState<ConversationThread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    const res = await fetch('/api/admin/leads')
    if (!res.ok) {
      setError('Failed to load data')
      setLoading(false)
      return
    }
    const data = await res.json()
    setLeads(data.leads)
    setInquiries(data.inquiries)

    // Group conversation rows into threads by phone_number (session ID)
    const rawConvos: Conversation[] = data.conversations ?? []
    const grouped = new Map<string, Conversation[]>()
    for (const c of rawConvos) {
      const key = c.phone_number
      if (!grouped.has(key)) grouped.set(key, [])
      grouped.get(key)!.push(c)
    }
    const threads: ConversationThread[] = Array.from(grouped.entries()).map(
      ([sessionId, msgs]) => {
        const sorted = msgs.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
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
      }
    )
    threads.sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime())
    setConversations(threads)
    setLoading(false)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase()
    return (
      l.name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.vin_or_reg?.toLowerCase().includes(q)
    )
  })

  const filteredInquiries = inquiries.filter((i) => {
    const q = search.toLowerCase()
    return (
      i.name?.toLowerCase().includes(q) ||
      i.email?.toLowerCase().includes(q) ||
      i.phone?.includes(q) ||
      i.vehicle_make?.toLowerCase().includes(q) ||
      i.vehicle_model?.toLowerCase().includes(q) ||
      i.vin_or_reg?.toLowerCase().includes(q)
    )
  })

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

  const filteredConversations = conversations.filter((t) => {
    const q = search.toLowerCase()
    if (!q) return true
    return (
      t.sessionId.toLowerCase().includes(q) ||
      t.platform.toLowerCase().includes(q) ||
      t.messages.some(
        (m) =>
          m.incoming_message?.toLowerCase().includes(q) ||
          m.outgoing_message?.toLowerCase().includes(q)
      )
    )
  })

  const activeData =
    tab === 'leads'
      ? filteredLeads
      : tab === 'conversations'
        ? filteredConversations
        : filteredInquiries
  const count =
    tab === 'leads'
      ? leads.length
      : tab === 'conversations'
        ? conversations.length
        : inquiries.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-yellow-50 to-yellow-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leads &amp; Inquiries</h1>
            <p className="text-sm text-gray-500 mt-1">{count} total {tab}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Blog Admin
            </button>
            <button onClick={() => router.push('/admin/pages')} className="text-sm text-gray-500 hover:text-gray-700">Pages</button>
            <button
              onClick={logout}
              className="text-sm text-yellow-600 hover:text-yellow-500"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="bg-white border border-yellow-300 rounded-xl p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setTab('inquiries')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === 'inquiries'
                    ? 'bg-[#FFC325] text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Inquiries ({inquiries.length})
              </button>
              <button
                onClick={() => setTab('leads')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === 'leads'
                    ? 'bg-[#FFC325] text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Leads ({leads.length})
              </button>
              <button
                onClick={() => setTab('conversations')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  tab === 'conversations'
                    ? 'bg-[#FFC325] text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Chats ({conversations.length})
              </button>
            </div>
            <input
              type="text"
              placeholder="Search by name, email, phone, vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 w-full sm:w-auto px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
            />
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

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
        {!loading && activeData.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            {search ? 'No results match your search.' : `No ${tab} yet.`}
          </div>
        )}

        {/* Data cards */}
        {!loading && activeData.length > 0 && (
          <div className="space-y-3">
            {tab === 'inquiries'
              ? (filteredInquiries as Inquiry[]).map((item) => (
                  <InquiryCard
                    key={item.id}
                    item={item}
                    expanded={expandedId === item.id}
                    onToggle={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    formatDate={formatDate}
                  />
                ))
              : tab === 'leads'
                ? (filteredLeads as Lead[]).map((item) => (
                    <LeadCard
                      key={item.id}
                      item={item}
                      expanded={expandedId === item.id}
                      onToggle={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                      formatDate={formatDate}
                    />
                  ))
                : (filteredConversations as ConversationThread[]).map((thread) => (
                    <ConversationCard
                      key={thread.sessionId}
                      thread={thread}
                      expanded={expandedId === thread.sessionId}
                      onToggle={() =>
                        setExpandedId(
                          expandedId === thread.sessionId ? null : thread.sessionId
                        )
                      }
                      formatDate={formatDate}
                    />
                  ))}
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
}: {
  item: Inquiry
  expanded: boolean
  onToggle: () => void
  formatDate: (d: string) => string
}) {
  return (
    <div className="bg-white border border-yellow-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-yellow-50/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm truncate">
              {item.name}
            </span>
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
        <div className="text-xs text-gray-400 whitespace-nowrap">
          {formatDate(item.created_at)}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
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
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                {item.vehicle_description}
              </p>
            </div>
          )}
          {item.message && (
            <div className="mt-3">
              <span className="text-xs text-gray-400 block mb-1">Message</span>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                {item.message}
              </p>
            </div>
          )}
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
}: {
  item: Lead
  expanded: boolean
  onToggle: () => void
  formatDate: (d: string) => string
}) {
  return (
    <div className="bg-white border border-yellow-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-yellow-50/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm truncate">
              {item.name}
            </span>
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
        <div className="text-xs text-gray-400 whitespace-nowrap">
          {formatDate(item.created_at)}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
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
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                {item.message}
              </p>
            </div>
          )}
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
              {thread.sessionId.startsWith('web_')
                ? `Web Session`
                : thread.sessionId}
            </span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {platformLabel}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {thread.messageCount} messages
            </span>
            {thread.escalated && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                Escalated
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>{thread.sessionId.startsWith('web_') ? 'Website visitor' : thread.sessionId}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 whitespace-nowrap">
          {formatDate(thread.lastAt)}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
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
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatDate(msg.created_at)}
                      </p>
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
