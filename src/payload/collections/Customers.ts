import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

/* Created by Stripe checkout (webhook + welcome page), completed by the
   customer's onboarding form. Admin-only. */
export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'plan', 'status', 'createdAt'],
    group: 'Sales',
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'email', type: 'email' },
    { name: 'name', type: 'text' },
    { name: 'plan', type: 'relationship', relationTo: 'plans' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: ['active', 'trialing', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired', 'paused'].map(
        (v) => ({ label: v, value: v }),
      ),
    },
    {
      name: 'locale',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Finnish', value: 'fi' },
      ],
    },
    {
      name: 'onboarding',
      type: 'group',
      fields: [
        { name: 'website', type: 'text' },
        { name: 'platform', type: 'text' },
        { name: 'postLanguage', type: 'text' },
        { name: 'topics', type: 'textarea' },
        { name: 'audience', type: 'textarea' },
        { name: 'tone', type: 'text' },
        { name: 'publishing', type: 'text' },
        { name: 'notes', type: 'textarea' },
        { name: 'submittedAt', type: 'date' },
      ],
    },
    {
      name: 'checkoutSessionId',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'stripeCustomerId', type: 'text', index: true, admin: { position: 'sidebar', readOnly: true } },
    { name: 'stripeSubscriptionId', type: 'text', index: true, admin: { position: 'sidebar', readOnly: true } },
  ],
}
