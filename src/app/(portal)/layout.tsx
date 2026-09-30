/* Dev-only design portal (/design). Separate root layout so it doesn't share the
   public site's header/footer while the site design is still being decided. */

import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'velar.one — design questions',
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
