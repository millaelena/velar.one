import type { Locale } from '@/i18n/config'
import type { Page } from '@/payload/payload-types'
import { Hero } from './Hero'
import { type CheckoutNotice, Pricing } from './Pricing'
import { CTA, Content, FAQ, Features, Integrations, Steps } from './Sections'

export function RenderBlocks({
  blocks,
  lang,
  notice,
}: {
  blocks: Page['layout']
  lang: Locale
  notice?: CheckoutNotice
}) {
  return (
    <>
      {blocks?.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={block.id} block={block} lang={lang} />
          case 'integrations':
            return <Integrations key={block.id} block={block} />
          case 'steps':
            return <Steps key={block.id} block={block} />
          case 'features':
            return <Features key={block.id} block={block} />
          case 'pricing':
            return <Pricing key={block.id} block={block} lang={lang} notice={notice} />
          case 'faq':
            return <FAQ key={block.id} block={block} />
          case 'cta':
            return <CTA key={block.id} block={block} lang={lang} />
          case 'content':
            return <Content key={block.id} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}

export const checkoutNotice = (value: string | string[] | undefined): CheckoutNotice =>
  value === 'unavailable' || value === 'canceled' ? value : undefined
