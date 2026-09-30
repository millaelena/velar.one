import { notFound } from 'next/navigation'
import { readDesignChoices } from '@/lib/design-choices'
import { DesignPortal } from './DesignPortal'

export const dynamic = 'force-dynamic'

export default async function DesignPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  const initial = await readDesignChoices()
  return (
    <>
      {/* Candidate fonts for the previews only — loaded at runtime so the dev-only
          portal adds no build-time font downloads. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font -- intentionally this page only */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap"
        precedence="default"
      />
      <DesignPortal initial={initial} />
    </>
  )
}
