import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Locale } from '@/i18n/config'
import { localizeHref } from '@/lib/links'
import type { CTABlock, ContentBlock, FAQBlock, FeaturesBlock, IntegrationsBlock, StepsBlock } from '@/payload/payload-types'
import { Icon, type IconName } from '@/components/Icon'
import { ButtonLink, SectionHeading, container, richTextClass } from '@/components/ui'

export function Integrations({ block }: { block: IntegrationsBlock }) {
  return (
    <section id={block.anchor ?? undefined} className="border-y border-border bg-surface">
      <div className={`${container} py-10`}>
        {block.heading && (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">{block.heading}</p>
        )}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {block.items?.map((item) => (
            <li key={item.id} className="text-lg font-semibold tracking-tight text-foreground/55 sm:text-xl">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Steps({ block }: { block: StepsBlock }) {
  return (
    <section id={block.anchor ?? undefined} className="scroll-mt-20">
      <div className={`${container} py-20 sm:py-24`}>
        <SectionHeading heading={block.heading} text={block.text} />
        <div className="relative mt-14">
          <div aria-hidden className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-border lg:block" />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {block.steps?.map((step, i) => (
              <li key={step.id}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                {step.text && <p className="mt-2 leading-relaxed text-muted">{step.text}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function Features({ block }: { block: FeaturesBlock }) {
  return (
    <section id={block.anchor ?? undefined} className="scroll-mt-20 bg-surface">
      <div className={`${container} py-20 sm:py-24`}>
        <SectionHeading heading={block.heading} text={block.text} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {block.features?.map((f) => (
            <div key={f.id} className="rounded-2xl bg-white p-6 ring-1 ring-border">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon name={(f.icon ?? 'check') as IconName} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              {f.text && <p className="mt-2 leading-relaxed text-muted">{f.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ({ block }: { block: FAQBlock }) {
  return (
    <section id={block.anchor ?? undefined} className="scroll-mt-20">
      <div className={`${container} grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_2fr] lg:gap-16`}>
        <SectionHeading heading={block.heading} center={false} />
        <div className="divide-y divide-border border-y border-border">
          {block.items?.map((item) => (
            <details key={item.id} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <Icon name="plus" className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 pr-8 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA({ block, lang }: { block: CTABlock; lang: Locale }) {
  return (
    <section id={block.anchor ?? undefined} className="scroll-mt-20">
      <div className={`${container} pb-20 sm:pb-24`}>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(59,130,246,0.35),transparent_70%)]"
          />
          <div className="relative">
            {block.heading && (
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">{block.heading}</h2>
            )}
            {block.text && <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{block.text}</p>}
            {block.button?.label && (
              <ButtonLink href={localizeHref(lang, block.button.href)} className="mt-8">
                {block.button.label}
                <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Content({ block }: { block: ContentBlock }) {
  if (!block.content) return null
  return (
    <section id={block.anchor ?? undefined}>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <RichText data={block.content} className={richTextClass} />
      </div>
    </section>
  )
}
