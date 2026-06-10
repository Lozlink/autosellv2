/**
 * markdown-lite — shared lightweight markdown-to-HTML converter.
 *
 * Single source of truth used by:
 *   - src/app/blog/[slug]/page.tsx        (public blog post rendering)
 *   - src/app/[...slug]/page.tsx          (public CMS page rendering)
 *   - src/components/BlogEditor.tsx        (admin editor live preview)
 *
 * Handles:
 *   - `# Heading` / `## Subheading` / `### Sub-subheading` → <h2> / <h3>
 *   - `- item` / `* item` lines → <ul><li>
 *   - `1. item` lines → <ol><li>
 *   - `> quote` lines → <blockquote>
 *   - `**bold**` / `__bold__` → <strong>
 *   - `*italic*` / `_italic_` → <em>
 *   - `[label](url)` → <a>
 *   - trailing `::center` on a heading/paragraph line → centered block
 *
 * Line-based scan: structural prefixes (`##`, `-`, `1.`, `>`) start a new
 * block without requiring a blank line above them. Blank lines also act as
 * block separators. Each plain line becomes its own <p> — content is authored
 * one paragraph per line with single newlines, so folding consecutive lines
 * into one <p> would produce a wall of text.
 *
 * This is a pure module (no React/DOM) so it can be imported by both server
 * components and the client editor.
 */

/**
 * Decide whether content is already pre-rendered HTML and should bypass the
 * converter. Only BLOCK-LEVEL tags count — a bare inline tag (e.g. a single
 * <a> link inside otherwise-markdown copy) must still route through the
 * converter, otherwise `##` headings and line breaks render literally. Inline
 * tags pass through the converter untouched inside <p>.
 */
export function looksLikeBlockHtml(content: string): boolean {
  return /<(?:p|div|h[1-6]|ul|ol|li|blockquote|section|article|table|thead|tbody|tr|td|pre|figure|img|hr|br)\b[^>]*>/i.test(
    content
  )
}

export function markdownLiteToHtml(input: string): string {
  const inline = (s: string): string =>
    s
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/(?<!_)_([^_\n]+)_(?!_)/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        (_, label, url) => `<a href="${url}">${label}</a>`
      )

  /**
   * Normalize content where the author embedded markdown markers inline
   * without surrounding newlines (common with AI-generated text pasted as
   * a single block):
   *   1. Insert a newline before any `##`/`###` that appears mid-paragraph.
   *   2. Insert a newline before any `- ` or `* ` bullet that follows
   *      sentence-ending punctuation rather than a line break.
   */
  const normalize = (s: string): string => {
    let r = s.replace(/\r\n/g, '\n')
    // 1. Newline before mid-line ##/### markers (any non-newline + space + ## space)
    r = r.replace(/([^\n])[ \t]+(?=#{2,3}\s+\S)/g, '$1\n')
    // 2. Newline before mid-line bullet markers (only after sentence-ending punctuation,
    //    so we don't break "test - thing" or em-dash-style content)
    r = r.replace(/([.!?:])[ \t]+(?=[-*][ \t]+\S)/g, '$1\n')
    return r
  }

  /**
   * Given a heading line "## Foo Bar Baz Then more text...", try to split
   * the heading title from the body that follows it on the same line.
   * Heuristic: a heading is a short title-case-ish phrase. We look for the
   * first sentence boundary (period followed by capital-then-lowercase) OR
   * a transition from Title Case → sentence case (capital word followed by
   * a lowercase word that isn't a common article like "of/the/in/on/a").
   * Returns [headingText, restOfLine | null].
   */
  const splitInlineHeading = (text: string): [string, string | null] => {
    // First try: split at sentence boundary "[.!?] [A-Z]"
    const sent = text.match(/^([^.!?\n]{3,120}?[.!?])\s+([A-Z].*)$/)
    if (sent) return [sent[1].replace(/[.!?]$/, ''), sent[2]]

    // Second try: detect Title Case run → sentence case
    const stopWords = new Set([
      'of', 'the', 'in', 'on', 'a', 'an', 'and', 'or', 'to', 'for', 'with', 'at', 'by',
      'from', 'as', 'is', 'it', 'be',
    ])
    const tokens = text.split(/(\s+)/)
    let titleEnd = -1
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i]
      if (/^\s+$/.test(tok)) continue
      // First word after at least 2 capitalized words that's lowercase and not a stopword
      if (/^[a-z]/.test(tok) && !stopWords.has(tok.toLowerCase()) && i >= 4) {
        const prevWords: string[] = []
        for (let j = i - 1; j >= 0 && prevWords.length < 6; j--) {
          if (!/^\s+$/.test(tokens[j])) prevWords.push(tokens[j])
        }
        const titleCaseCount = prevWords.filter((w) => /^[A-Z]/.test(w)).length
        if (titleCaseCount >= 2) {
          titleEnd = i
          break
        }
      }
    }
    if (titleEnd > 0) {
      // If the immediately preceding title-case word is a common sentence-starter
      // verb (e.g. "Think about", "Look at", "Get started"), back off — the verb
      // is actually the first word of the body sentence, not the last word of the title.
      const sentenceStarters = new Set([
        'think', 'look', 'consider', 'see', 'find', 'read', 'learn',
        'discover', 'get', 'check', 'try', 'imagine', 'remember', 'note',
        'observe', 'compare', 'review', 'understand', 'know',
      ])
      let adjusted = titleEnd
      for (let j = titleEnd - 1; j >= 0; j--) {
        if (!/^\s+$/.test(tokens[j])) {
          const wordLower = tokens[j].toLowerCase().replace(/[^a-z]/g, '')
          if (sentenceStarters.has(wordLower)) adjusted = j
          break
        }
      }
      const title = tokens.slice(0, adjusted).join('').trim().replace(/[.!?,;:]$/, '')
      const rest = tokens.slice(adjusted).join('').trim()
      if (title.length > 0 && rest.length > 0) return [title, rest]
    }

    return [text, null]
  }

  type Block =
    | { kind: 'ul'; items: string[] }
    | { kind: 'ol'; items: string[] }
    | { kind: 'quote'; lines: string[] }

  const lines = normalize(input).split('\n')
  const out: string[] = []
  let current: Block | null = null

  const flush = () => {
    if (!current) return
    if (current.kind === 'ul') {
      out.push(`<ul>${current.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`)
    } else if (current.kind === 'ol') {
      out.push(`<ol>${current.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`)
    } else if (current.kind === 'quote') {
      out.push(`<blockquote>${inline(current.lines.join(' '))}</blockquote>`)
    }
    current = null
  }

  for (const raw of lines) {
    let line = raw.trim()

    if (!line) {
      flush()
      continue
    }

    // Trailing `::center` marker centers the block (headings and paragraphs).
    // Stripped from all line kinds so it never renders literally.
    const centerMatch = line.match(/^(.*?)\s*::center$/i)
    const centered = centerMatch !== null
    if (centerMatch) {
      line = centerMatch[1]
      if (!line) {
        flush()
        continue
      }
    }
    const centerAttr = centered ? ' style="text-align:center"' : ''

    // Heading: 1–3 leading hashes followed by space + text. Standalone block.
    // If the line contains both a heading AND following body text, split them.
    const h = line.match(/^(#{1,3})\s+(.*)$/)
    if (h) {
      flush()
      const level = h[1].length === 3 ? 'h3' : 'h2'
      const [titleText, restText] = splitInlineHeading(h[2])
      out.push(`<${level}${centerAttr}>${inline(titleText)}</${level}>`)
      if (restText) out.push(`<p>${inline(restText)}</p>`)
      continue
    }

    // Bulleted list item
    const ul = line.match(/^[-*]\s+(.*)$/)
    if (ul) {
      if (current?.kind !== 'ul') {
        flush()
        current = { kind: 'ul', items: [] }
      }
      current.items.push(ul[1])
      continue
    }

    // Numbered list item
    const ol = line.match(/^\d+\.\s+(.*)$/)
    if (ol) {
      if (current?.kind !== 'ol') {
        flush()
        current = { kind: 'ol', items: [] }
      }
      current.items.push(ol[1])
      continue
    }

    // Blockquote line
    const q = line.match(/^>\s?(.*)$/)
    if (q) {
      if (current?.kind !== 'quote') {
        flush()
        current = { kind: 'quote', lines: [] }
      }
      current.lines.push(q[1])
      continue
    }

    // Plain paragraph line — one <p> per source line.
    flush()
    out.push(`<p${centerAttr}>${inline(line)}</p>`)
  }

  flush()
  return out.join('\n')
}
