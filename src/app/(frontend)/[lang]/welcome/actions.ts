'use server'

import { redirect } from 'next/navigation'
import { isLocale, localePath } from '@/i18n/config'
import { getCompletedSession, upsertCustomerFromSession } from '@/lib/customers'
import { getPayloadClient } from '@/lib/payload'
import { getStripe } from '@/lib/stripe'

/** Saves the post-checkout onboarding form onto the customer. Only works for a completed Stripe checkout. */
export async function submitOnboarding(formData: FormData) {
  const lang = isLocale(formData.get('lang')) ? (formData.get('lang') as 'en' | 'fi') : 'en'
  const welcome = localePath(lang, '/welcome')

  const stripe = getStripe()
  const session = stripe ? await getCompletedSession(stripe, String(formData.get('session_id') ?? '')) : null
  if (!session) redirect(welcome)

  const text = (name: string, max = 2000) => String(formData.get(name) ?? '').trim().slice(0, max)
  const customer = await upsertCustomerFromSession(session)
  const payload = await getPayloadClient()
  await payload.update({
    collection: 'customers',
    id: customer.id,
    data: {
      onboarding: {
        website: text('website', 300),
        platform: text('platform', 100),
        postLanguage: text('postLanguage', 20),
        topics: text('topics'),
        audience: text('audience'),
        tone: text('tone', 50),
        publishing: text('publishing', 20),
        notes: text('notes'),
        submittedAt: new Date().toISOString(),
      },
    },
  })

  redirect(`${welcome}?session_id=${encodeURIComponent(session.id)}`)
}
