import type { Locale } from '@/i18n/config'
import { localizeHref } from '@/lib/links'
import type { HeroBlock } from '@/payload/payload-types'
import { Icon } from '@/components/Icon'
import { ButtonLink, container } from '@/components/ui'
import { CalendarVisual } from './CalendarVisual'

function Heading({ text, highlight }: { text: string; highlight?: string | null }) {
  const at = highlight ? text.indexOf(highlight) : -1
  if (!highlight || at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="text-brand">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  )
}

export function Hero({ block, lang }: { block: HeroBlock; lang: Locale }) {
  const withVisual = block.visual !== 'none'
  return (
    <section id={block.anchor ?? undefined} className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_10%,var(--color-brand-soft),transparent_70%)]"
      />
      <div
        className={`${container} grid items-center gap-12 py-14 sm:py-20 lg:gap-16 lg:py-24 ${withVisual ? 'lg:grid-cols-[1.05fr_1fr]' : 'text-center'}`}
      >
        <div>
          {block.eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {block.eyebrow}
            </p>
          )}
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            <Heading text={block.heading} highlight={block.highlight} />
          </h1>
          {block.text && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{block.text}</p>}
          <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${withVisual ? '' : 'sm:justify-center'}`}>
            {block.primary?.label && (
              <ButtonLink href={localizeHref(lang, block.primary.href)}>
                {block.primary.label}
                <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
            )}
            {block.secondary?.label && (
              <ButtonLink href={localizeHref(lang, block.secondary.href)} variant="secondary">
                {block.secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
        {withVisual && <CalendarVisual lang={lang} />}
      </div>
    </section>
  )
}
