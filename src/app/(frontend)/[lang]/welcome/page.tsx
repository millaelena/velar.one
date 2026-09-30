import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, supportEmail } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPlans } from '@/lib/content'
import { getCompletedSession, upsertCustomerFromSession } from '@/lib/customers'
import { getStripe } from '@/lib/stripe'
import { Icon } from '@/components/Icon'
import { OnboardingForm } from './OnboardingForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false } }

type Args = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ session_id?: string }>
}

export default async function WelcomePage({ params, searchParams }: Args) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang).welcome
  const { session_id } = await searchParams

  const stripe = getStripe()
  const session = stripe ? await getCompletedSession(stripe, session_id) : null

  if (!session) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">{t.invalidTitle}</h1>
        <p className="mt-4 text-muted">{t.invalid(supportEmail)}</p>
      </section>
    )
  }

  const customer = await upsertCustomerFromSession(session)
  const planId = typeof customer.plan === 'object' ? customer.plan?.id : customer.plan
  const plan = (await getPlans(lang)).find((p) => p.id === planId)

  if (customer.onboarding?.submittedAt) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
          <Icon name="tick" className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t.done}</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
        <Icon name="tick" className="h-6 w-6" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{plan ? t.intro(plan.name) : t.introNoPlan}</p>

      <OnboardingForm lang={lang} sessionId={session.id} />
    </section>
  )
}
