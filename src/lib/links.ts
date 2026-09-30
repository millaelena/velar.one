import { type Locale, localePath } from '@/i18n/config'

/** CMS links are stored without a language prefix; add it for internal paths. */
export function localizeHref(locale: Locale, href: string | null | undefined): string {
  if (!href) return localePath(locale, '/')
  if (href.startsWith('#')) return href
  if (!href.startsWith('/')) return href // external URL, mailto:, tel:

  const hashAt = href.indexOf('#')
  const path = hashAt === -1 ? href : href.slice(0, hashAt)
  const hash = hashAt === -1 ? '' : href.slice(hashAt)
  return localePath(locale, path || '/') + hash
}

export const isExternal = (href: string) => /^[a-z]+:/i.test(href)

/** Public base URL of the site (Stripe redirects, sitemap). Behind Dokploy's proxy the request origin may be internal. */
export function siteUrl(req?: Request): string {
  return (process.env.NEXT_PUBLIC_SERVER_URL || (req ? new URL(req.url).origin : 'http://localhost:3000')).replace(
    /\/$/,
    '',
  )
}
