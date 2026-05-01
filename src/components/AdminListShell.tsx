'use client'

import type { ReactNode } from 'react'

export type AdminRange = '30' | '90' | '365' | 'all'
export type AdminStatus = 'all' | 'published' | 'draft'

export const ADMIN_RANGE_OPTIONS: { value: AdminRange; label: string }[] = [
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '365', label: 'Last 12 months' },
  { value: 'all', label: 'All time' },
]

interface AdminListShellProps {
  searchInput: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string

  range: AdminRange
  onRangeChange: (range: AdminRange) => void

  status: AdminStatus
  onStatusChange: (status: AdminStatus) => void

  loading: boolean
  onRefresh: () => void

  children: ReactNode
}

export default function AdminListShell({
  searchInput,
  onSearchChange,
  searchPlaceholder = 'Search...',
  range,
  onRangeChange,
  status,
  onStatusChange,
  loading,
  onRefresh,
  children,
}: AdminListShellProps) {
  return (
    <>
      <div className="bg-white border border-yellow-300 rounded-xl p-4 mb-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 flex-wrap">
              {(['all', 'published', 'draft'] as AdminStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(s)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                    status === s
                      ? 'bg-[#FFC325] text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 whitespace-nowrap">Range:</label>
              <select
                value={range}
                onChange={(e) => onRangeChange(e.target.value as AdminRange)}
                className="px-3 py-2 bg-gray-50 border border-yellow-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC325]"
              >
                {ADMIN_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                onClick={onRefresh}
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
              placeholder={searchPlaceholder}
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
          </div>
        </div>
      </div>

      {children}
    </>
  )
}

interface AdminPaginationProps {
  page: number
  totalPages: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export function AdminPagination({ page, totalPages, total, pageSize, onChange }: AdminPaginationProps) {
  if (total === 0) return null
  const showingStart = (page - 1) * pageSize + 1
  const showingEnd = Math.min(page * pageSize, total)
  return (
    <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-700">{showingStart}–{showingEnd}</span> of{' '}
        <span className="font-semibold text-gray-700">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(1)}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          First
        </button>
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        <span className="px-3 py-1.5 text-sm font-semibold text-gray-700 bg-yellow-50 rounded-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
        <button
          onClick={() => onChange(totalPages)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-sm bg-white border border-yellow-300 rounded-lg text-gray-700 hover:bg-yellow-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Last
        </button>
      </div>
    </div>
  )
}
