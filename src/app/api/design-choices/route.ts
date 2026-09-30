import { NextResponse } from 'next/server'
import { type DesignChoices, writeDesignChoices } from '@/lib/design-choices'

// Dev-only: saves answers from the /design portal to docs/design/choices.json.
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const body = (await req.json()) as Partial<DesignChoices>
  if (typeof body !== 'object' || body === null || typeof body.answers !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const saved = await writeDesignChoices({ answers: body.answers ?? {}, extra: body.extra ?? '' })
  return NextResponse.json({ ok: true, savedAt: saved.savedAt })
}
