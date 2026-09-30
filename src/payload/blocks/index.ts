import type { Block, Field } from 'payload'

/* Page builder blocks. Structure is shared between languages; text fields are
   localized, so each block is written once per language in /admin. */

const anchor: Field = {
  name: 'anchor',
  type: 'text',
  admin: { description: 'Optional section id for links, e.g. "how-it-works" → /#how-it-works' },
}

const link = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'label', type: 'text', localized: true },
    {
      name: 'href',
      type: 'text',
      admin: { description: 'Internal path without language prefix (/pricing, /#how-it-works) or a full URL.' },
    },
  ],
})

const heading: Field = { name: 'heading', type: 'text', localized: true }
const intro: Field = { name: 'text', type: 'textarea', localized: true }

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { ...heading, required: true } as Field,
    {
      name: 'highlight',
      type: 'text',
      localized: true,
      admin: { description: 'Part of the heading shown in the accent color. Must match the heading text exactly.' },
    },
    intro,
    link('primary', 'Primary button'),
    link('secondary', 'Secondary button'),
    {
      name: 'visual',
      type: 'select',
      defaultValue: 'calendar',
      options: [
        { label: 'Content calendar', value: 'calendar' },
        { label: 'None', value: 'none' },
      ],
    },
    anchor,
  ],
}

export const IntegrationsBlock: Block = {
  slug: 'integrations',
  interfaceName: 'IntegrationsBlock',
  labels: { singular: 'Integrations', plural: 'Integrations' },
  fields: [heading, { name: 'items', type: 'array', fields: [{ name: 'name', type: 'text', required: true }] }, anchor],
}

export const StepsBlock: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  labels: { singular: 'Steps', plural: 'Steps' },
  fields: [
    heading,
    intro,
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
    anchor,
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: { singular: 'Features', plural: 'Features' },
  fields: [
    heading,
    intro,
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'check',
          options: ['calendar', 'search', 'image', 'voice', 'globe', 'check'].map((v) => ({ label: v, value: v })),
        },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
    anchor,
  ],
}

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: { singular: 'Pricing table', plural: 'Pricing tables' },
  admin: { disableBlockName: true },
  fields: [heading, intro, { ...anchor, defaultValue: 'plans' } as Field],
}

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    heading,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
    anchor,
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [heading, intro, link('button', 'Button'), anchor],
}

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [{ name: 'content', type: 'richText', localized: true }, anchor],
}

export const pageBlocks = [
  HeroBlock,
  IntegrationsBlock,
  StepsBlock,
  FeaturesBlock,
  PricingBlock,
  FAQBlock,
  CTABlock,
  ContentBlock,
]
