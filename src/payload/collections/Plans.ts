import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Plans: CollectionConfig = {
  slug: 'plans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'postsPerMonth', 'highlighted', 'stripePriceId'],
    description:
      'Pricing plans shown in every pricing table. The price shown here must match the Stripe price the plan links to.',
    group: 'Sales',
  },
  defaultSort: 'sortOrder',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Stable id, e.g. "starter". Not shown to visitors.' },
    },
    { name: 'tagline', type: 'text', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', required: true, min: 0, admin: { description: 'EUR per month' } },
        { name: 'postsPerMonth', type: 'number', required: true, min: 1 },
        { name: 'sortOrder', type: 'number', defaultValue: 0 },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    { name: 'highlighted', type: 'checkbox', defaultValue: false, admin: { description: 'Show as the recommended plan.' } },
    {
      name: 'stripePriceId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description:
          'Stripe recurring price id (price_…). Without it the plan is shown but checkout is not available.',
      },
    },
  ],
}
