import type { Metadata } from 'next'
import Link from 'next/link'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: { default: 'velar.one', template: '%s | velar.one' },
  description: 'velar.one',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold text-brand">
              velar.one
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
            © {new Date().getFullYear()} velar.one
          </div>
        </footer>
      </body>
    </html>
  )
}
