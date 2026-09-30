import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, localeAlternates, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPosts } from '@/lib/content'
import { Icon } from '@/components/Icon'
import { container } from '@/components/ui'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = getDictionary(lang).blog
  return { title: t.title, description: t.intro, alternates: localeAlternates(lang, '/blog') }
}

export default async function BlogPage({ params }: Args) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = getDictionary(lang).blog
  const posts = await getPosts(lang)
  const dateFormat = new Intl.DateTimeFormat(lang === 'fi' ? 'fi-FI' : 'en-GB', { dateStyle: 'long' })

  return (
    <section className={`${container} py-16 sm:py-20`}>
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.intro}</p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-2xl bg-surface px-6 py-16 text-center text-muted ring-1 ring-border">{t.empty}</p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
            return (
              <article key={post.id} className="group flex flex-col">
                <Link href={localePath(lang, `/blog/${post.slug}`)} className="flex flex-1 flex-col">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-brand-soft ring-1 ring-border">
                    {image?.url && (
                      <Image
                        src={image.sizes?.card?.url ?? image.url}
                        alt={image.alt}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    )}
                  </div>
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt} className="mt-4 text-xs font-medium text-muted">
                      {dateFormat.format(new Date(post.publishedAt))}
                    </time>
                  )}
                  <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-brand">{post.title}</h2>
                  {post.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {t.readMore} <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
