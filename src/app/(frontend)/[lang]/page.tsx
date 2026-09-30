import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, localeAlternates } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPage } from '@/lib/content'
import { RenderBlocks, checkoutNotice } from '@/components/blocks/RenderBlocks'
import { container } from '@/components/ui'

// Content comes from Payload at request time — no database needed at build.
export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ checkout?: string | string[] }>
}

export async function generateMetadata({ params }: Pick<Args, 'params'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const page = await getPage('home', lang)
  return {
    title: { absolute: page ? `velar.one — ${page.title}` : 'velar.one' },
    description: page?.description ?? undefined,
    alternates: localeAlternates(lang, '/'),
  }
}

export default async function HomePage({ params, searchParams }: Args) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const page = await getPage('home', lang)
  if (!page) {
    return <p className={`${container} py-24 text-center text-muted`}>{getDictionary(lang).setup}</p>
  }

  return <RenderBlocks blocks={page.layout} lang={lang} notice={checkoutNotice((await searchParams).checkout)} />
}
