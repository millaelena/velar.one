import { type Locale, supportEmail } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPlans } from '@/lib/content'
import type { PricingBlock } from '@/payload/payload-types'
import { Icon } from '@/components/Icon'
import { SectionHeading, buttonStyles, container } from '@/components/ui'

export type CheckoutNotice = 'unavailable' | 'canceled' | undefined

const formatPrice = (price: number, lang: Locale) =>
  new Intl.NumberFormat(lang === 'fi' ? 'fi-FI' : 'en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price)

export async function Pricing({ block, lang, notice }: { block: PricingBlock; lang: Locale; notice?: CheckoutNotice }) {
  const t = getDictionary(lang).pricing
  const plans = await getPlans(lang)

  return (
    <section id={block.anchor ?? undefined} className="scroll-mt-20">
      <div className={`${container} py-20 sm:py-24`}>
        <SectionHeading heading={block.heading} text={block.text} />

        {notice && (
          <p
            role="status"
            className="mx-auto mt-8 max-w-2xl rounded-xl bg-brand-soft px-4 py-3 text-center text-sm font-medium text-brand"
          >
            {notice === 'canceled' ? t.canceled : t.unavailable(supportEmail)}
          </p>
        )}

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3 lg:items-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl bg-white p-7 ${
                plan.highlighted ? 'shadow-xl shadow-brand/10 ring-2 ring-brand lg:py-10' : 'ring-1 ring-border'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  {t.recommended}
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {plan.tagline && <p className="mt-1 text-sm text-muted">{plan.tagline}</p>}
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight">{formatPrice(plan.price, lang)}</span>
                <span className="text-sm text-muted">{t.perMonth}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-brand">{t.postsPerMonth(plan.postsPerMonth)}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features?.map((f) => (
                  <li key={f.id} className="flex gap-2.5">
                    <Icon name="tick" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <form action="/api/checkout" method="post" className="mt-8">
                <input type="hidden" name="plan" value={plan.id} />
                <input type="hidden" name="lang" value={lang} />
                <button type="submit" className={`${plan.highlighted ? buttonStyles.primary : buttonStyles.secondary} w-full`}>
                  {t.choose(plan.name)}
                </button>
              </form>
            </div>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted">
          <Icon name="lock" className="h-4 w-4" />
          {t.secure}
        </p>
      </div>
    </section>
  )
}
