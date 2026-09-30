import type Stripe from 'stripe'
import { isLocale } from '@/i18n/config'
import type { Customer } from '@/payload/payload-types'
import { getPayloadClient } from './payload'

const idOf = (value: string | { id: string } | null | undefined) =>
  typeof value === 'string' ? value : (value?.id ?? undefined)

const findBySession = async (sessionId: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'customers',
    where: { checkoutSessionId: { equals: sessionId } },
    limit: 1,
    depth: 0,
  })
  return docs[0] ?? null
}

/**
 * Create or update the customer for a completed checkout. Called from both the
 * Stripe webhook and the welcome page, so it must be idempotent.
 */
export async function upsertCustomerFromSession(session: Stripe.Checkout.Session): Promise<Customer> {
  const payload = await getPayloadClient()
  const planId = Number(session.metadata?.planId) || undefined
  const lang = session.metadata?.lang
  const data = {
    email: session.customer_details?.email ?? session.customer_email ?? undefined,
    name: session.customer_details?.name ?? undefined,
    plan: planId,
    stripeCustomerId: idOf(session.customer),
    stripeSubscriptionId: idOf(session.subscription),
    locale: isLocale(lang) ? lang : undefined,
  }

  const existing = await findBySession(session.id)
  if (existing) return payload.update({ collection: 'customers', id: existing.id, data })

  try {
    return await payload.create({
      collection: 'customers',
      data: { ...data, checkoutSessionId: session.id, status: 'active' },
    })
  } catch (error) {
    // Webhook and welcome page raced; the other one created it first.
    const created = await findBySession(session.id)
    if (!created) throw error
    return payload.update({ collection: 'customers', id: created.id, data })
  }
}

type Status = NonNullable<Customer['status']>
const statuses: readonly string[] = ['active', 'trialing', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired', 'paused'] satisfies Status[]

export async function updateSubscriptionStatus(subscription: Stripe.Subscription) {
  if (!statuses.includes(subscription.status)) return
  const payload = await getPayloadClient()
  await payload.update({
    collection: 'customers',
    where: { stripeSubscriptionId: { equals: subscription.id } },
    data: { status: subscription.status as Status },
  })
}

/** The paid checkout session behind a welcome-page link, or null if it isn't a completed checkout. */
export async function getCompletedSession(stripe: Stripe, sessionId: string | undefined) {
  if (!sessionId || !sessionId.startsWith('cs_')) return null
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return session.status === 'complete' ? session : null
  } catch {
    return null
  }
}
