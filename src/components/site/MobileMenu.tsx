'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { buttonStyles } from '@/components/ui'

type NavLink = { href: string; label: string }

export function MobileMenu({ links, cta, label }: { links: NavLink[]; cta: NavLink; label: string }) {
  const pathname = usePathname()
  const [openAt, setOpenAt] = useState<string | null>(null)
  // Closes itself on navigation: it is only open for the path it was opened on.
  const open = openAt === pathname

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpenAt(open ? null : pathname)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground ring-1 ring-border"
      >
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-white shadow-lg">
          <nav className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpenAt(null)}
                className="rounded-lg px-2 py-3 text-base font-medium text-foreground hover:bg-surface"
              >
                {l.label}
              </Link>
            ))}
            <Link href={cta.href} onClick={() => setOpenAt(null)} className={`${buttonStyles.primary} mt-2`}>
              {cta.label}
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
