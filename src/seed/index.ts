/* Seeds plans and pages in English and Finnish.
   npm run seed            → creates what's missing, never touches existing content
   npm run seed -- force → overwrites seeded plans/pages with the defaults */

import { getPayload } from 'payload'
import config from '../../payload.config'
import { pages, plans } from './content'

type Lang = 'en' | 'fi'
type Data = Record<string, unknown>

const force = process.argv.includes('force')

const isBilingual = (v: unknown): v is Record<Lang, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).sort().join() === 'en,fi'

/** Resolve every { en, fi } leaf to one language. */
function pick(value: unknown, lang: Lang): unknown {
  if (isBilingual(value)) return value[lang]
  if (Array.isArray(value)) return value.map((v) => pick(v, lang))
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, pick(v, lang)]))
  }
  return value
}

/** Copy array-row and block ids from the saved English doc, so the Finnish text lands on the same rows. */
function withIds(value: unknown, saved: unknown): unknown {
  if (Array.isArray(value) && Array.isArray(saved)) {
    return value.map((v, i) => {
      const row = withIds(v, saved[i])
      const id = (saved[i] as Data | undefined)?.id
      return id && typeof row === 'object' && row !== null ? { ...row, id } : row
    })
  }
  if (typeof value === 'object' && value !== null && typeof saved === 'object' && saved !== null) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withIds(v, (saved as Data)[k])]))
  }
  return value
}

const payload = await getPayload({ config })

async function seed(collection: 'plans' | 'pages', field: 'key' | 'slug', doc: Data) {
  const extra = collection === 'pages' ? { _status: 'published' } : {}
  const existing = (
    await payload.find({ collection, where: { [field]: { equals: doc[field] } }, limit: 1, depth: 0, draft: true })
  ).docs[0]

  if (existing && !force) {
    payload.logger.info(`${collection}/${doc[field]} exists — skipped`)
    return
  }

  const en = { ...(pick(doc, 'en') as Data), ...extra }
  const saved = existing
    ? await payload.update({ collection, id: existing.id, locale: 'en', data: en as never, depth: 0 })
    : await payload.create({ collection, locale: 'en', data: en as never, depth: 0 })

  const fi = { ...(withIds(pick(doc, 'fi'), saved) as Data), ...extra }
  await payload.update({ collection, id: saved.id, locale: 'fi', data: fi as never, depth: 0 })
  payload.logger.info(`${collection}/${doc[field]} ${existing ? 'overwritten' : 'created'} (en + fi)`)
}

for (const plan of plans) await seed('plans', 'key', plan)
for (const page of pages) await seed('pages', 'slug', page)

payload.logger.info('Seed done.')
