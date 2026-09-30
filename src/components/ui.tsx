import Link from 'next/link'
import type { ReactNode } from 'react'
import { isExternal } from '@/lib/links'

export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

export const buttonStyles = {
  primary: `${buttonBase} bg-brand text-white hover:bg-brand-hover`,
  secondary: `${buttonBase} bg-ink text-white hover:bg-ink-hover`,
  outline: `${buttonBase} bg-white text-foreground ring-1 ring-border hover:ring-foreground/40`,
}

export function ButtonLink({
  href,
  variant = 'primary',
  className = '',
  children,
}: {
  href: string
  variant?: keyof typeof buttonStyles
  className?: string
  children: ReactNode
}) {
  const cls = `${buttonStyles[variant]} ${className}`
  if (isExternal(href)) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}

export function SectionHeading({ heading, text, center = true }: { heading?: string | null; text?: string | null; center?: boolean }) {
  if (!heading && !text) return null
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      {heading && <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{heading}</h2>}
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  )
}

/* Rich text styling shared by page content blocks and blog posts. */
export const richTextClass =
  'space-y-5 text-[17px] leading-relaxed text-foreground/90 [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:rounded-xl [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6'
