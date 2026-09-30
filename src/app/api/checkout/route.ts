import { NextResponse } from 'next/server'
import { isLocale, localePath } from '@/i18n/config'
import { getPayloadClient } from '@/lib/payload'
import { siteUrl } from '@/lib/links'
import { getStripe } from '@/lib/stripe'

// Pricing table "Choose plan" forms post here → Stripe Checkout (subscription).
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const form = await req.formData()
  const lang = isLocale(form.get('lang')) ? (form.get('lang') as 'en' | 'fi') : 'en'
  const planId = Number(form.get('plan'))
  const base = siteUrl(req)
  const back = (reason: string) =>
    NextResponse.redirect(`${base}${localePath(lang, '/pricing')}?checkout=${reason}#plans`, 303)

  const stripe = getStripe()
  if (!stripe || !planId) return back('unavailable')

  const payload = await getPayloadClient()
  const plan = await payload.findByID({ collection: 'plans', id: planId, depth: 0 }).catch(() => null)
  if (!plan?.stripePriceId) return back('unavailable')

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      success_url: `${base}${localePath(lang, '/welcome')}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}${localePath(lang, '/pricing')}?checkout=canceled#plans`,
      locale: lang,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: { planId: String(plan.id), lang },
      subscription_data: { metadata: { planId: String(plan.id) } },
    })
    if (!session.url) return back('unavailable')
    return NextResponse.redirect(session.url, 303)
  } catch (error) {
    payload.logger.error({ err: error, msg: 'Stripe checkout session failed' })
    return back('unavailable')
  }
}
