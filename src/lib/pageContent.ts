import { cache } from 'react'
import { supabase } from '@/lib/supabaseClient'

// Copy overrides for hardcoded marketing pages. A page reads its overrides via
// getPageOverrides(slug) and renders each editable string with text()/list(),
// always falling back to the in-code default. This means:
//   - Before the 007 migration is applied (table missing) -> {} -> defaults.
//   - When no published override row exists                -> {} -> defaults.
//   - When a key is absent or the wrong type               -> defaults.
// So default output is provably identical until a valid override is set.

export type PageBlocks = Record<string, unknown>

/**
 * Fetch published copy overrides for a slug. Resilient by design: any error
 * (including the table not existing yet) resolves to {} so the page renders
 * its hardcoded defaults rather than failing.
 */
export async function getPageOverrides(slug: string): Promise<PageBlocks> {
  try {
    const { data, error } = await supabase
      .from('page_overrides')
      .select('blocks')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error || !data || typeof data.blocks !== 'object' || data.blocks === null) {
      return {}
    }
    return data.blocks as PageBlocks
  } catch {
    return {}
  }
}

/**
 * Request-memoised variant. Multiple components on the same page can call this
 * for the same slug within one render and only trigger a single Supabase query.
 */
export const getPageOverridesCached = cache(getPageOverrides)

/** Return the override string for `key` if it's a non-empty string, else fallback. */
export function text(blocks: PageBlocks, key: string, fallback: string): string {
  const v = blocks[key]
  return typeof v === 'string' && v.trim().length > 0 ? v : fallback
}

/** Return the override array for `key` if it's a non-empty array, else fallback. */
export function list<T>(blocks: PageBlocks, key: string, fallback: T[]): T[] {
  const v = blocks[key]
  return Array.isArray(v) && v.length > 0 ? (v as T[]) : fallback
}
