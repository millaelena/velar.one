import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { updateSubscriptionStatus, upsertCustomerFromSession } from '@/lib/customers'
import { getPayloadClient } from '@/lib/payload'
import { getStripe } from '@/lib/stripe'

/* Stripe → Dashboard → Webhooks → endpoint https://<domain>/api/stripe/webhook
   Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted */
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(await req.text(), req.headers.get('stripe-signature') ?? '', secret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        if (event.data.object.mode === 'subscription') await upsertCustomerFromSession(event.data.object)
        break
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await updateSubscriptionStatus(event.data.object)
        break
    }
  } catch (error) {
    const payload = await getPayloadClient()
    payload.logger.error({ err: error, msg: `Stripe webhook ${event.type} failed` })
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 }) // Stripe retries
  }

  return NextResponse.json({ received: true })
}
