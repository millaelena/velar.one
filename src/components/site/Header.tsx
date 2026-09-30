import Link from 'next/link'
import { type Locale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { localizeHref } from '@/lib/links'
import { Wordmark } from '@/components/Wordmark'
import { buttonStyles, container } from '@/components/ui'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

export function Header({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).nav
  const links = [
    { href: localizeHref(lang, '/#how-it-works'), label: t.howItWorks },
    { href: localePath(lang, '/pricing'), label: t.pricing },
    { href: localePath(lang, '/blog'), label: t.blog },
  ]
  const cta = { href: localizeHref(lang, '/pricing#plans'), label: t.cta }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/90 backdrop-blur">
      <div className={`${container} relative flex h-16 items-center justify-between gap-4`}>
        <div className="flex items-center gap-4">
          <Link href={localePath(lang)} aria-label="velar.one" className="text-foreground">
            <Wordmark />
          </Link>
          <a
            href="https://velarcloud.com"
            className="hidden rounded-full px-2.5 py-1 text-[11px] font-medium text-muted ring-1 ring-border transition hover:text-foreground lg:inline-block"
          >
            {t.parent}
          </a>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} label={t.language} />
          <span className="hidden sm:block">
            <Link href={cta.href} className={`${buttonStyles.primary} px-4! py-2!`}>
              {cta.label}
            </Link>
          </span>
          <MobileMenu links={links} cta={cta} label={t.menu} />
        </div>
      </div>
    </header>
  )
}
