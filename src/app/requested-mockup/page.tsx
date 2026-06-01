/**
 * /requested-mockup → / redirect.
 *
 * This route used to host the lovable-style replica while it was being
 * iterated on. It's now the canonical home page (src/app/page.tsx), and the
 * associated components live in src/app/_home/. We keep this stub so anyone
 * with a bookmark or external link to /requested-mockup lands on the live
 * home page rather than a 404.
 */

import { permanentRedirect } from 'next/navigation'

export default function RequestedMockupRedirect() {
  // 308 — SEO-friendly redirect. Search engines update their index to /.
  permanentRedirect('/')
}
