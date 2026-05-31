'use client'

import { useRef, useState } from 'react'
import { markdownLiteToHtml } from '@/lib/markdownLite'

/**
 * BlogEditor — markdown editor with toolbar + live preview tab.
 *
 * Why not TipTap / Lexical / etc?
 *   - This sits in the admin only; the audience is the marketing team
 *     entering blog copy occasionally, not a high-volume editing surface.
 *   - The reading side already handles markdown-lite (## headings, lists,
 *     etc.) via blog/[slug]/page.tsx, so saved content stays as plain
 *     markdown — easy to read in the DB, easy to migrate later.
 *   - Avoids dragging in ~30 NPM packages, ProseMirror, and React-19
 *     compatibility risk.
 *
 * Behaviour:
 *   - Toolbar buttons wrap the user's selection in markdown syntax. If no
 *     selection, they insert a placeholder so the user can replace it.
 *   - Preview tab renders the current content using the same markdown-lite
 *     rules used on the public blog page.
 */

type ButtonSpec = {
  label: string
  title: string
  /** Returns { before, after, placeholder } to insert around selection. */
  wrap?: { before: string; after: string; placeholder: string }
  /** Returns the text to insert as a fresh line (e.g. headings, lists). */
  line?: (currentLine: string) => string
}

const BUTTONS: ButtonSpec[] = [
  {
    label: 'H2',
    title: 'Heading',
    line: (line) => (line.startsWith('## ') ? line.slice(3) : `## ${line.replace(/^#+\s*/, '')}`),
  },
  {
    label: 'H3',
    title: 'Subheading',
    line: (line) => (line.startsWith('### ') ? line.slice(4) : `### ${line.replace(/^#+\s*/, '')}`),
  },
  {
    label: 'B',
    title: 'Bold (Ctrl/Cmd + B)',
    wrap: { before: '**', after: '**', placeholder: 'bold text' },
  },
  {
    label: 'I',
    title: 'Italic (Ctrl/Cmd + I)',
    wrap: { before: '_', after: '_', placeholder: 'italic text' },
  },
  {
    label: '• List',
    title: 'Bulleted list',
    line: (line) => (line.startsWith('- ') ? line.slice(2) : `- ${line}`),
  },
  {
    label: '1. List',
    title: 'Numbered list',
    line: (line) => (/^\d+\.\s/.test(line) ? line.replace(/^\d+\.\s/, '') : `1. ${line}`),
  },
  {
    label: 'Link',
    title: 'Insert link',
    wrap: { before: '[', after: '](https://example.com)', placeholder: 'link text' },
  },
  {
    label: '" Quote',
    title: 'Blockquote',
    line: (line) => (line.startsWith('> ') ? line.slice(2) : `> ${line}`),
  },
]

interface BlogEditorProps {
  value: string
  onChange: (next: string) => void
  rows?: number
}

export default function BlogEditor({ value, onChange, rows = 16 }: BlogEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')

  /** Replace the current selection with `replacement` and place the cursor after it. */
  const replaceSelection = (replacement: string, selectStart?: number, selectEnd?: number) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const next = value.slice(0, start) + replacement + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      const fallback = start + replacement.length
      ta.setSelectionRange(selectStart ?? fallback, selectEnd ?? fallback)
    })
  }

  const applyWrap = (before: string, after: string, placeholder: string) => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.slice(start, end)
    const content = selected.length > 0 ? selected : placeholder
    const replacement = `${before}${content}${after}`
    const sStart = start + before.length
    const sEnd = sStart + content.length
    replaceSelection(replacement, sStart, sEnd)
  }

  const applyLine = (fn: (line: string) => string) => {
    const ta = textareaRef.current
    if (!ta) return
    const cursor = ta.selectionStart
    // Find the start and end of the current line
    const before = value.slice(0, cursor)
    const after = value.slice(cursor)
    const lineStart = before.lastIndexOf('\n') + 1
    const lineEndOffset = after.indexOf('\n')
    const lineEnd = lineEndOffset === -1 ? value.length : cursor + lineEndOffset
    const currentLine = value.slice(lineStart, lineEnd)
    const transformed = fn(currentLine)
    const next = value.slice(0, lineStart) + transformed + value.slice(lineEnd)
    onChange(next)
    requestAnimationFrame(() => {
      ta.focus()
      const newCursor = lineStart + transformed.length
      ta.setSelectionRange(newCursor, newCursor)
    })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const mod = e.ctrlKey || e.metaKey
    if (mod && e.key.toLowerCase() === 'b') {
      e.preventDefault()
      applyWrap('**', '**', 'bold text')
    } else if (mod && e.key.toLowerCase() === 'i') {
      e.preventDefault()
      applyWrap('_', '_', 'italic text')
    }
  }

  return (
    <div className="rounded-lg border border-yellow-300 overflow-hidden bg-gray-50">
      {/* Toolbar + tab strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-2 bg-white border-b border-yellow-200">
        <div className="flex flex-wrap items-center gap-1">
          {BUTTONS.map((btn) => (
            <button
              key={btn.label}
              type="button"
              title={btn.title}
              onClick={() => {
                if (btn.wrap) applyWrap(btn.wrap.before, btn.wrap.after, btn.wrap.placeholder)
                else if (btn.line) applyLine(btn.line)
              }}
              className={`px-2 py-1 text-xs font-semibold rounded border border-gray-200 bg-white text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700 transition-colors ${
                btn.label === 'B' ? 'font-bold' : ''
              } ${btn.label === 'I' ? 'italic' : ''}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTab('edit')}
            className={`px-3 py-1 text-xs font-semibold rounded ${
              tab === 'edit'
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`px-3 py-1 text-xs font-semibold rounded ${
              tab === 'preview'
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor or preview */}
      {tab === 'edit' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          rows={rows}
          required
          placeholder={
            'Start typing your post. Use the toolbar above for formatting.\n\nExamples:\n## A heading\n\nA paragraph of body copy.\n\n- A bulleted point\n- Another bulleted point\n\nLink to [our quote form](https://auto-sell.ai).'
          }
          className="w-full px-3 py-3 bg-gray-50 border-0 text-gray-800 placeholder-gray-400 focus:outline-none font-mono text-sm leading-relaxed"
        />
      ) : (
        <div className="px-4 py-4 bg-white min-h-[400px]">
          {value.trim() ? (
            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownLiteToHtml(value) }}
            />
          ) : (
            <p className="text-sm text-gray-400 italic">Nothing to preview yet — switch back to Edit and start typing.</p>
          )}
        </div>
      )}

      {/* Tiny help footer */}
      <div className="px-3 py-2 text-[11px] text-gray-500 bg-gray-50 border-t border-yellow-200">
        Formatting tips: <code className="px-1 bg-white border border-gray-200 rounded">## heading</code>{' '}
        <code className="px-1 bg-white border border-gray-200 rounded">**bold**</code>{' '}
        <code className="px-1 bg-white border border-gray-200 rounded">_italic_</code>{' '}
        <code className="px-1 bg-white border border-gray-200 rounded">- bullet</code>{' '}
        <code className="px-1 bg-white border border-gray-200 rounded">[link](url)</code>. You can also paste raw HTML &amp; it&apos;ll render as-is.
      </div>
    </div>
  )
}
