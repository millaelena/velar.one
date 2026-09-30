import { NextResponse, type NextRequest } from 'next/server'

/* Locale routing. Every public page lives under app/(frontend)/[lang]/.
   English is the default and has no prefix: /pricing is served from /en/pricing.
   Finnish keeps its prefix: /fi/pricing. /en/... redirects to the unprefixed URL. */

const passThrough = ['/api', '/admin', '/design', '/fi']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/_') || passThrough.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }

  url.pathname = pathname === '/' ? '/en' : `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals and files with an extension (favicon.ico, robots.txt, sitemap.xml…).
  matcher: ['/((?!_next/|.*\\.[^/]+$).*)'],
}
