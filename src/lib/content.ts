import { cache } from 'react'
import type { Locale } from '@/i18n/config'
import { getPayloadClient } from './payload'

/** Published page by slug in the given language, or null. Cached per request. */
export const getPage = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    locale,
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
})

export const getPlans = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'plans', locale, sort: 'sortOrder', limit: 20, depth: 0 })
  return docs
})

export const getPosts = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { language: { equals: locale }, _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })
  return docs
})

export const getPost = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, language: { equals: locale }, _status: { equals: 'published' } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
})
