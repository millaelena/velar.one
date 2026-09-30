import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import '../../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

type Args = { children: React.ReactNode; params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Omit<Args, 'children'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: { default: 'velar.one — blog automation', template: '%s | velar.one' },
    description: getDictionary(lang).meta.description,
    openGraph: { siteName: 'velar.one', type: 'website', locale: lang === 'fi' ? 'fi_FI' : 'en_US' },
  }
}

export default async function FrontendLayout({ children, params }: Args) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={lang} className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
