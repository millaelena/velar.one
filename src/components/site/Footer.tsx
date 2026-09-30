import Link from 'next/link'
import { type Locale, localePath, supportEmail } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizeHref } from '@/lib/links'
import { Icon } from '@/components/Icon'
import { Wordmark } from '@/components/Wordmark'
import { container } from '@/components/ui'

export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang)
  const columns = [
    {
      title: t.footer.product,
      links: [
        { href: localizeHref(lang, '/#how-it-works'), label: t.nav.howItWorks },
        { href: localePath(lang, '/pricing'), label: t.nav.pricing },
        { href: localePath(lang, '/blog'), label: t.nav.blog },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { href: `mailto:${supportEmail}`, label: t.footer.contact },
        { href: localePath(lang, '/privacy'), label: t.footer.privacy },
        { href: localePath(lang, '/terms'), label: t.footer.terms },
      ],
    },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-4`}>
        <div className="md:col-span-2">
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{t.footer.tagline}</p>
          <a
            href="https://velarcloud.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 transition hover:text-white"
          >
            {t.footer.parent} · {t.footer.parentLink}
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">{col.title}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith('mailto:') ? (
                    <a href={l.href} className="text-white/80 transition hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-white/80 transition hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className={`${container} flex flex-col gap-1 py-6 text-xs text-white/55 sm:flex-row sm:justify-between`}>
          <span>© {new Date().getFullYear()} velar.one</span>
          <span>{t.footer.parent}</span>
        </div>
      </div>
    </footer>
  )
}
