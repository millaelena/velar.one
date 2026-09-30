'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale, localePath, locales } from '@/i18n/config'

/** Path without language prefix. Blog post slugs differ per language, so they fall back to the blog index. */
function basePath(pathname: string) {
  const path = pathname.replace(/^\/(en|fi)(?=\/|$)/, '') || '/'
  return /^\/blog\/.+/.test(path) ? '/blog' : path
}

export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const path = basePath(usePathname() ?? '/')
  return (
    <nav aria-label={label} className="flex items-center rounded-lg bg-surface p-0.5 ring-1 ring-border">
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          aria-current={l === lang ? 'true' : undefined}
          className={`rounded-md px-2 py-1 text-xs font-semibold uppercase transition ${
            l === lang ? 'bg-white text-foreground shadow-sm ring-1 ring-border' : 'text-muted hover:text-foreground'
          }`}
        >
          {l}
        </Link>
      ))}
    </nav>
  )
}
