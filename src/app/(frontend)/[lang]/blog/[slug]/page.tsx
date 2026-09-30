import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPost } from '@/lib/content'
import { richTextClass } from '@/components/ui'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const post = await getPost(slug, lang)
  if (!post) return {}
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
    alternates: { canonical: localePath(lang, `/blog/${post.slug}`) },
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      images: image?.url ? [{ url: image.url, alt: image.alt }] : undefined,
    },
  }
}

export default async function PostPage({ params }: Args) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const post = await getPost(slug, lang)
  if (!post) notFound()

  const t = getDictionary(lang).blog
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
  const date = post.publishedAt
    ? new Intl.DateTimeFormat(lang === 'fi' ? 'fi-FI' : 'en-GB', { dateStyle: 'long' }).format(new Date(post.publishedAt))
    : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href={localePath(lang, '/blog')} className="text-sm font-semibold text-brand hover:underline">
        {t.back}
      </Link>
      {date && post.publishedAt && (
        <time dateTime={post.publishedAt} className="mt-8 block text-sm text-muted">
          {date}
        </time>
      )}
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
      {post.excerpt && <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>}
      {image?.url && (
        <Image
          src={image.sizes?.hero?.url ?? image.url}
          alt={image.alt}
          width={image.width ?? 1920}
          height={image.height ?? 1080}
          className="mt-10 h-auto w-full rounded-2xl"
          priority
        />
      )}
      {post.content && <RichText data={post.content} className={`mt-10 ${richTextClass}`} />}
    </article>
  )
}
