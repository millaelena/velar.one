import type { MetadataRoute } from 'next'
import { localePath, locales } from '@/i18n/config'
import { getPayloadClient } from '@/lib/payload'
import { siteUrl } from '@/lib/links'

// Built per request from Payload — no database needed at build time.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const payload = await getPayloadClient()
  const [pages, posts] = await Promise.all([
    payload.find({ collection: 'pages', where: { _status: { equals: 'published' } }, limit: 500, depth: 0 }),
    payload.find({ collection: 'posts', where: { _status: { equals: 'published' } }, limit: 5000, depth: 0 }),
  ])

  const pageEntries = ['/blog', ...pages.docs.map((p) => (p.slug === 'home' ? '/' : `/${p.slug}`))].map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${base}${localePath('en', path)}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${base}${localePath(l, path)}`])) },
    }),
  )

  const postEntries = posts.docs.map(
    (post): MetadataRoute.Sitemap[number] => ({
      url: `${base}${localePath(post.language, `/blog/${post.slug}`)}`,
      lastModified: post.updatedAt,
    }),
  )

  return [...pageEntries, ...postEntries]
}
