import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { pageBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Slug "home" is the front page, other slugs are served at /<slug> (English) and /fi/<slug> (Finnish). Switch language at the top of the editor.',
    group: 'Content',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Shown in search results (about 150 characters).' },
    },
    { name: 'layout', type: 'blocks', blocks: pageBlocks },
  ],
}
