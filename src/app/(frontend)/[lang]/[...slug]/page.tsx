import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { isLocale, localeAlternates, localePath } from '@/i18n/config'
import { getPage } from '@/lib/content'
import { RenderBlocks, checkoutNotice } from '@/components/blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ lang: string; slug: string[] }>
  searchParams: Promise<{ checkout?: string | string[] }>
}

// Catch-all so every unknown URL under a language renders the localized not-found page.
async function resolve(params: Args['params']) {
  const { lang, slug } = await params
  if (!isLocale(lang) || slug.length !== 1) return null
  return { lang, slug: slug[0] }
}

export async function generateMetadata({ params }: Pick<Args, 'params'>): Promise<Metadata> {
  const route = await resolve(params)
  if (!route) return {}
  const page = await getPage(route.slug, route.lang)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description ?? undefined,
    alternates: localeAlternates(route.lang, `/${route.slug}`),
  }
}

export default async function SlugPage({ params, searchParams }: Args) {
  const route = await resolve(params)
  if (!route) notFound()
  // The "home" page lives at "/", not "/home".
  if (route.slug === 'home') permanentRedirect(localePath(route.lang))

  const page = await getPage(route.slug, route.lang)
  if (!page) notFound()

  const isPricing = page.layout?.some((b) => b.blockType === 'pricing')
  return (
    <>
      {!page.layout?.some((b) => b.blockType === 'hero') && <h1 className="sr-only">{page.title}</h1>}
      <RenderBlocks
        blocks={page.layout}
        lang={route.lang}
        notice={isPricing ? checkoutNotice((await searchParams).checkout) : undefined}
      />
    </>
  )
}
