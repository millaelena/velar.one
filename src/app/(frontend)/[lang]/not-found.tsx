'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { buttonStyles, container } from '@/components/ui'

// not-found.tsx gets no params, so the language comes from the URL.
export default function NotFound() {
  const lang = /^\/fi(\/|$)/.test(usePathname() ?? '') ? 'fi' : 'en'
  const t = getDictionary(lang).notFound
  return (
    <section className={`${container} py-28 text-center`}>
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 text-muted">{t.text}</p>
      <Link href={localePath(lang)} className={`${buttonStyles.primary} mt-8`}>
        {t.home}
      </Link>
    </section>
  )
}
