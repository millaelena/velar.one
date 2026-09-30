'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { DesignChoices } from '@/lib/design-choices'

const FONT = {
  poppins: "'Poppins', ui-sans-serif, system-ui, sans-serif",
  inter: "'Inter', ui-sans-serif, system-ui, sans-serif",
  fraunces: "'Fraunces', ui-serif, Georgia, serif",
}
const NAVY = '#0b1f45'
const VELAR_BLUE = '#3b82f6'

type Option = { id: string; label: string; description: string; recommended?: boolean; preview?: ReactNode }
type Question = { id: string; title: string; why: string; multi?: boolean; options: Option[] }

// ─── Preview building blocks ────────────────────────────────────────────────

function VelarWordmark({ color }: { color: string }) {
  return (
    <span className="flex flex-col items-center leading-none" style={{ color, fontFamily: FONT.poppins }}>
      <span className="text-[15px] font-semibold tracking-[0.25em]">VELAR</span>
      <span className="mt-0.5 text-[7px] tracking-[0.55em]">ONE</span>
    </span>
  )
}

function Lines({ color, widths = ['100%', '92%', '70%'] }: { color: string; widths?: string[] }) {
  return (
    <div className="space-y-1.5">
      {widths.map((w, i) => (
        <div key={i} className="h-1.5 rounded-full" style={{ width: w, background: color }} />
      ))}
    </div>
  )
}

function Frame({ children, style, className = '' }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div className={`relative h-48 overflow-hidden rounded-lg border border-slate-200 ${className}`} style={style}>
      {children}
    </div>
  )
}

// Q1 — brand relationship
const BrandFamily = (
  <Frame style={{ background: NAVY, fontFamily: FONT.poppins }} className="text-white">
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
      <VelarWordmark color="#fff" />
      <span className="rounded-full px-3 py-1.5 text-[10px] font-semibold" style={{ background: VELAR_BLUE }}>
        Get started
      </span>
    </div>
    <div className="px-4 py-5 text-center">
      <div className="text-lg font-bold tracking-wide">BLOG ON AUTOPILOT</div>
      <div className="mx-auto mt-2 h-px w-24" style={{ background: VELAR_BLUE }} />
      <p className="mt-2 text-[10px] text-white/70">Same look as velarcloud.com</p>
    </div>
  </Frame>
)

const BrandSister = (
  <Frame style={{ background: '#fff', fontFamily: FONT.inter }}>
    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
      <div className="flex items-center gap-2">
        <VelarWordmark color="#0f172a" />
        <span className="whitespace-nowrap rounded-full border border-slate-200 px-2 py-0.5 text-[8px] text-slate-500">
          a Velar Cloud company
        </span>
      </div>
      <span className="whitespace-nowrap rounded-md px-3 py-1.5 text-[10px] font-semibold text-white" style={{ background: '#0d9488' }}>
        Get started
      </span>
    </div>
    <div className="px-4 py-5">
      <div className="text-lg font-bold text-slate-900">Your blog, on autopilot.</div>
      <p className="mt-1 text-[10px] text-slate-500">Own accent color, shares the VELAR name and navy.</p>
      <div className="mt-3 h-1.5 w-20 rounded-full" style={{ background: NAVY }} />
    </div>
  </Frame>
)

const BrandIndependent = (
  <Frame style={{ background: '#fafafa', fontFamily: FONT.inter }}>
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-[15px] font-bold tracking-tight text-black">velar.one</span>
      <span className="rounded-md bg-black px-3 py-1.5 text-[10px] font-semibold text-white">Get started</span>
    </div>
    <div className="px-4 py-5">
      <div className="text-lg font-bold text-black">Your blog, on autopilot.</div>
      <p className="mt-1 text-[10px] text-neutral-500">No visible link to Velar Cloud (only in legal/footer).</p>
    </div>
  </Frame>
)

// Q2 — look & feel
const LookDark = (
  <Frame
    className="p-4 text-white"
    style={{ background: `radial-gradient(120% 90% at 90% 0%, #1d4ed8 0%, transparent 55%), ${NAVY}`, fontFamily: FONT.poppins }}
  >
    <div className="text-[9px] uppercase tracking-[0.2em] text-blue-200">Blog automation</div>
    <div className="mt-2 text-xl font-bold leading-tight">
      Your blog,
      <br />
      on autopilot.
    </div>
    <p className="mt-2 max-w-[60%] text-[10px] text-blue-100/80">SEO-ready posts written and published for you.</p>
    <span className="mt-3 inline-block rounded-full px-3 py-1.5 text-[10px] font-semibold" style={{ background: VELAR_BLUE }}>
      Get started
    </span>
    <div className="absolute bottom-4 right-4 w-28 rounded-md border border-white/15 bg-white/5 p-2.5">
      <Lines color="rgba(255,255,255,0.35)" />
    </div>
  </Frame>
)

const LookLight = (
  <Frame className="p-4" style={{ background: '#fff', fontFamily: FONT.inter }}>
    <div className="text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: VELAR_BLUE }}>
      Blog automation
    </div>
    <div className="mt-2 text-xl font-bold leading-tight text-slate-900">
      Your blog,
      <br />
      on <span style={{ color: VELAR_BLUE }}>autopilot</span>.
    </div>
    <p className="mt-2 max-w-[60%] text-[10px] text-slate-500">SEO-ready posts written and published for you.</p>
    <span className="mt-3 inline-block rounded-md px-3 py-1.5 text-[10px] font-semibold text-white" style={{ background: VELAR_BLUE }}>
      Get started
    </span>
    <div className="absolute bottom-4 right-4 w-28 rounded-lg bg-slate-50 p-2.5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-2 h-8 rounded bg-slate-200" />
      <Lines color="#e2e8f0" />
    </div>
  </Frame>
)

const LookEditorial = (
  <Frame className="p-4" style={{ background: '#faf7f2', fontFamily: FONT.inter }}>
    <div className="flex justify-between border-b border-black/80 pb-1 text-[8px] uppercase tracking-[0.2em] text-black/70">
      <span>The velar.one journal</span>
      <span>Published today</span>
    </div>
    <div className="mt-3 text-2xl leading-tight text-black" style={{ fontFamily: FONT.fraunces, fontWeight: 600 }}>
      Your blog,
      <br />
      <em>on autopilot.</em>
    </div>
    <p className="mt-2 max-w-[60%] text-[10px] text-black/60">SEO-ready posts written and published for you.</p>
    <span className="mt-3 inline-block border-b-2 border-black text-[10px] font-semibold text-black">Start your blog →</span>
    <div className="absolute bottom-4 right-4 w-24 border-l border-black/20 pl-2.5">
      <Lines color="rgba(0,0,0,0.15)" widths={['100%', '100%', '85%', '60%']} />
    </div>
  </Frame>
)

// Q3 — accent color
function AccentPreview({ color, textOnColor = '#fff' }: { color: string; textOnColor?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="bg-white p-3" style={{ fontFamily: FONT.inter }}>
        <div className="text-sm font-bold text-slate-900">
          Your blog, on <span style={{ color }}>autopilot</span>.
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-md px-2.5 py-1 text-[10px] font-semibold" style={{ background: color, color: textOnColor }}>
            Get started
          </span>
          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ background: `${color}22`, color }}>
            12 posts / month
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-3" style={{ background: NAVY }}>
        <span className="text-[10px] text-white/80">On dark</span>
        <span className="rounded-md px-2.5 py-1 text-[10px] font-semibold" style={{ background: color, color: textOnColor }}>
          Get started
        </span>
      </div>
    </div>
  )
}

// Q4 — headline font
function FontPreview({ family, weight = 700, note }: { family: string; weight?: number; note: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="text-2xl leading-tight text-slate-900" style={{ fontFamily: family, fontWeight: weight }}>
        Your blog, on autopilot.
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500" style={{ fontFamily: FONT.inter }}>
        Fresh, SEO-ready posts every week — written in your tone and published to your site.
      </p>
      <p className="mt-3 text-[10px] text-slate-400">{note}</p>
    </div>
  )
}

// Q5 — hero concept
const HeroWriting = (
  <Frame className="flex items-center justify-center bg-slate-50 p-4">
    <div className="w-full max-w-[220px] rounded-lg bg-white p-3 shadow-md ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-slate-400">NEW POST</span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold text-emerald-700">
          Published ✓ 09:00
        </span>
      </div>
      <div className="mt-2 text-[11px] font-bold text-slate-900">5 ways to cut your energy bill this winter</div>
      <div className="mt-2">
        <Lines color="#e2e8f0" widths={['100%', '95%']} />
        <div className="mt-1.5 flex items-center gap-0.5">
          <div className="h-1.5 w-1/2 rounded-full bg-slate-200" />
          <div className="h-2.5 w-0.5 animate-pulse bg-slate-900" />
        </div>
      </div>
    </div>
  </Frame>
)

const HeroCalendar = (
  <Frame className="bg-white p-4">
    <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-slate-700">
      <span>October</span>
      <span className="text-slate-400">8 posts scheduled</span>
    </div>
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 28 }, (_, i) => {
        const post = i % 7 === 1 || i % 7 === 4
        return (
          <div key={i} className="h-7 rounded bg-slate-50 p-0.5 ring-1 ring-slate-100">
            {post && <div className="h-2 rounded-sm" style={{ background: i < 12 ? '#10b981' : VELAR_BLUE }} />}
          </div>
        )
      })}
    </div>
    <div className="mt-2 flex gap-3 text-[8px] text-slate-500">
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> published
      </span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: VELAR_BLUE }} /> scheduled
      </span>
    </div>
  </Frame>
)

const HeroResults = (
  <Frame className="bg-white p-4">
    <div className="text-[9px] font-semibold text-slate-400">Organic visitors (illustration)</div>
    <svg viewBox="0 0 200 80" className="mt-2 h-24 w-full" aria-hidden>
      <path d="M0 72 L25 68 L50 66 L75 58 L100 52 L125 40 L150 30 L175 18 L200 8" fill="none" stroke={VELAR_BLUE} strokeWidth="3" />
      <path d="M0 72 L25 68 L50 66 L75 58 L100 52 L125 40 L150 30 L175 18 L200 8 L200 80 L0 80 Z" fill={`${VELAR_BLUE}1a`} />
    </svg>
    <div className="absolute bottom-3 left-4 flex gap-1.5">
      {['Post #12', 'Post #13', 'Post #14'].map((p) => (
        <span key={p} className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] text-slate-600">
          {p}
        </span>
      ))}
    </div>
  </Frame>
)

// Q6 — audience
function AudiencePreview({ headline, sub, buttons }: { headline: string; sub: string; buttons: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4" style={{ fontFamily: FONT.inter }}>
      <div className="text-sm font-bold text-slate-900">{headline}</div>
      <p className="mt-1 text-[10px] text-slate-500">{sub}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {buttons.map((b, i) => (
          <span
            key={b}
            className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${i === 0 ? 'text-white' : 'text-slate-700 ring-1 ring-slate-300'}`}
            style={i === 0 ? { background: NAVY } : undefined}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

// Q7 — language
function LanguagePreview({ tabs, active, headline }: { tabs: string[]; active: string; headline: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4" style={{ fontFamily: FONT.inter }}>
      <div className="flex justify-end gap-1">
        {tabs.map((t) => (
          <span
            key={t}
            className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${t === active ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 text-sm font-bold text-slate-900">{headline}</div>
    </div>
  )
}

// Q8 — how customers buy
function CtaPreview({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-24 flex-col items-start justify-center gap-2 rounded-lg border border-slate-200 bg-white p-4" style={{ fontFamily: FONT.inter }}>
      {children}
    </div>
  )
}
const ctaBtn = 'whitespace-nowrap rounded-md px-3 py-1.5 text-[10px] font-semibold text-white'

// Q9 — pricing display
function MiniPlan({ name, price, highlight = false }: { name: string; price: string; highlight?: boolean }) {
  return (
    <div className={`flex-1 rounded-md p-2 text-center ${highlight ? 'text-white' : 'bg-slate-50 ring-1 ring-slate-200'}`} style={highlight ? { background: NAVY } : undefined}>
      <div className="text-[8px] font-semibold uppercase opacity-70">{name}</div>
      <div className="mt-1 text-[11px] font-bold">{price}</div>
    </div>
  )
}

// ─── Questions ──────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 'brand',
    title: 'How closely should velar.one look like Velar Cloud?',
    why: 'Sets the logo, colors and how visible the parent brand is.',
    options: [
      { id: 'family', label: 'Same family', description: 'Same navy, bright blue and Poppins as velarcloud.com. Instantly recognisable as Velar.', preview: BrandFamily },
      { id: 'sister', label: 'Sister brand', description: 'Shares the VELAR name and navy, but has its own accent color and a "a Velar Cloud company" badge.', recommended: true, preview: BrandSister },
      { id: 'independent', label: 'Independent', description: 'Own look entirely. Velar Cloud only mentioned in the footer and legal pages.', preview: BrandIndependent },
    ],
  },
  {
    id: 'look',
    title: 'Overall look and feel',
    why: 'The biggest visual choice — everything else follows from it.',
    options: [
      { id: 'dark', label: 'Dark tech', description: 'Navy background, glowing blue. Close to velarcloud.com, feels like software.', preview: LookDark },
      { id: 'light', label: 'Light & clean', description: 'White, lots of space, one strong accent. Classic modern SaaS.', preview: LookLight },
      { id: 'editorial', label: 'Editorial', description: 'Warm paper tone and serif headlines, like a magazine. Fits a product that makes blogs.', preview: LookEditorial },
    ],
  },
  {
    id: 'accent',
    title: 'Accent color',
    why: 'Used for buttons, links and highlights.',
    options: [
      { id: 'blue', label: 'Velar blue', description: 'Same blue as velarcloud.com (#3B82F6).', preview: <AccentPreview color="#3b82f6" /> },
      { id: 'violet', label: 'Violet', description: 'Creative, "AI" feel (#7C3AED).', preview: <AccentPreview color="#7c3aed" /> },
      { id: 'emerald', label: 'Emerald', description: 'Growth, fresh, calm (#10B981).', preview: <AccentPreview color="#10b981" /> },
      { id: 'amber', label: 'Amber', description: 'Warm and energetic (#F59E0B).', preview: <AccentPreview color="#f59e0b" textOnColor="#111827" /> },
    ],
  },
  {
    id: 'font',
    title: 'Headline font',
    why: 'Body text will be a clean sans-serif either way.',
    options: [
      { id: 'poppins', label: 'Poppins', description: 'Same as velarcloud.com. Round and friendly.', preview: <FontPreview family={FONT.poppins} note="Poppins + Inter body" /> },
      { id: 'inter', label: 'Inter', description: 'Neutral, modern, very readable.', preview: <FontPreview family={FONT.inter} note="Inter everywhere" /> },
      { id: 'fraunces', label: 'Fraunces (serif)', description: 'Editorial, premium, "writing" feel.', preview: <FontPreview family={FONT.fraunces} weight={600} note="Fraunces headlines + Inter body" /> },
    ],
  },
  {
    id: 'hero',
    title: 'What should the first screen show?',
    why: 'The visual next to the main headline — it has seconds to explain the product.',
    options: [
      { id: 'writing', label: 'A post being written', description: 'A post writes itself and gets a "Published" badge. Shows the magic directly.', preview: HeroWriting },
      { id: 'calendar', label: 'Content calendar', description: 'A month filling up with scheduled posts. Shows consistency, "set and forget".', preview: HeroCalendar },
      { id: 'results', label: 'Traffic growth', description: 'A growing traffic line with posts along it. Sells the outcome, not the tool.', preview: HeroResults },
    ],
  },
  {
    id: 'audience',
    title: 'Who does the front page speak to first?',
    why: 'Decides the headline and wording on the home page.',
    options: [
      {
        id: 'companies',
        label: 'Companies first',
        description: 'Focus on organic traffic, leads and saving staff time.',
        preview: <AudiencePreview headline="More organic traffic, zero writing." sub="Your company blog, published every week." buttons={['Get started']} />,
      },
      {
        id: 'entrepreneurs',
        label: 'Entrepreneurs first',
        description: 'Focus on staying visible and consistent without effort.',
        preview: <AudiencePreview headline="Stay visible without writing a word." sub="Your blog keeps working while you do." buttons={['Get started']} />,
      },
      {
        id: 'both',
        label: 'Both, two paths',
        description: 'One general headline, then "For companies" / "For entrepreneurs" choices.',
        preview: <AudiencePreview headline="Your blog, on autopilot." sub="Pick what fits you:" buttons={['For companies', 'For entrepreneurs']} />,
      },
    ],
  },
  {
    id: 'language',
    title: 'Website language',
    why: 'Must be decided before building pages — it changes every URL.',
    options: [
      { id: 'fi', label: 'Finnish only', description: 'Finnish market first.', preview: <LanguagePreview tabs={['FI']} active="FI" headline="Blogisi autopilotilla." /> },
      { id: 'en', label: 'English only', description: 'International from day one, like velarcloud.com.', preview: <LanguagePreview tabs={['EN']} active="EN" headline="Your blog, on autopilot." /> },
      { id: 'fi-en', label: 'Finnish + English', description: 'Finnish is the default, English at /en.', preview: <LanguagePreview tabs={['FI', 'EN']} active="FI" headline="Blogisi autopilotilla." /> },
      { id: 'en-fi', label: 'English + Finnish', description: 'English is the default, Finnish at /fi.', preview: <LanguagePreview tabs={['EN', 'FI']} active="EN" headline="Your blog, on autopilot." /> },
    ],
  },
  {
    id: 'buying',
    title: 'How should customers start? (pick all you want)',
    why: 'The main button on every page. We can launch with some and add others later.',
    multi: true,
    options: [
      {
        id: 'sample',
        label: 'Free sample post',
        description: 'Visitor gives their website, gets one free post written for their business. Strong lead magnet.',
        recommended: true,
        preview: (
          <CtaPreview>
            <span className="w-full rounded-md bg-slate-50 px-2 py-1.5 text-[10px] text-slate-400 ring-1 ring-slate-200">yourcompany.com</span>
            <span className={ctaBtn} style={{ background: NAVY }}>Get my free sample post</span>
          </CtaPreview>
        ),
      },
      {
        id: 'call',
        label: 'Book a call',
        description: 'Short intro call, booked in the Velar Cloud calendar.',
        recommended: true,
        preview: (
          <CtaPreview>
            <span className={ctaBtn} style={{ background: NAVY }}>Book a free call</span>
          </CtaPreview>
        ),
      },
      {
        id: 'checkout',
        label: 'Buy online',
        description: 'Pick a plan and pay by card, monthly subscription (Stripe). No sales call needed.',
        preview: (
          <CtaPreview>
            <span className={ctaBtn} style={{ background: NAVY }}>Choose plan →</span>
            <span className="text-[9px] text-slate-400">Card payment · cancel anytime</span>
          </CtaPreview>
        ),
      },
      {
        id: 'trial',
        label: 'Free trial',
        description: 'E.g. 14 days free, like Velar Cloud. Needs automatic onboarding.',
        preview: (
          <CtaPreview>
            <span className={ctaBtn} style={{ background: NAVY }}>Start 14-day free trial</span>
          </CtaPreview>
        ),
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Show prices on the site?',
    why: 'Public prices help small businesses decide alone; hidden prices push them to contact you.',
    options: [
      {
        id: 'public',
        label: 'Public plans',
        description: 'Clear plans with prices, e.g. by posts per month.',
        recommended: true,
        preview: (
          <CtaPreview>
            <div className="flex w-full gap-1.5">
              <MiniPlan name="Starter" price="€XX" />
              <MiniPlan name="Growth" price="€XX" highlight />
              <MiniPlan name="Pro" price="€XX" />
            </div>
          </CtaPreview>
        ),
      },
      {
        id: 'from',
        label: '"From €XX / month"',
        description: 'A starting price, details in a call or quote.',
        preview: (
          <CtaPreview>
            <div className="text-sm font-bold text-slate-900">From €XX / month</div>
            <span className="text-[10px] font-semibold text-slate-600 underline">Get a quote</span>
          </CtaPreview>
        ),
      },
      {
        id: 'hidden',
        label: 'No prices',
        description: 'Everything by quote. Fits bigger, custom deals.',
        preview: (
          <CtaPreview>
            <span className={ctaBtn} style={{ background: NAVY }}>Contact us for pricing</span>
          </CtaPreview>
        ),
      },
    ],
  },
]

const gridCols: Record<number, string> = {
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 xl:grid-cols-4',
}

// ─── Portal ─────────────────────────────────────────────────────────────────

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export function DesignPortal({ initial }: { initial: DesignChoices }) {
  const [answers, setAnswers] = useState(initial.answers)
  const [extra, setExtra] = useState(initial.extra)
  const [saveState, setSaveState] = useState<SaveState>(initial.savedAt ? 'saved' : 'idle')
  const [savedAt, setSavedAt] = useState(initial.savedAt)
  const firstRender = useRef(true)

  const answered = QUESTIONS.filter((q) => (answers[q.id]?.picks.length ?? 0) > 0).length

  function toggle(q: Question, optionId: string) {
    setAnswers((prev) => {
      const current = prev[q.id] ?? { picks: [], note: '' }
      const picks = q.multi
        ? current.picks.includes(optionId)
          ? current.picks.filter((p) => p !== optionId)
          : [...current.picks, optionId]
        : [optionId]
      return { ...prev, [q.id]: { ...current, picks } }
    })
  }

  function setNote(qid: string, note: string) {
    setAnswers((prev) => ({ ...prev, [qid]: { picks: prev[qid]?.picks ?? [], note } }))
  }

  // Autosave shortly after every change.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setSaveState('saving')
    const t = setTimeout(async () => {
      try {
        const res = await fetch('/api/design-choices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, extra }),
        })
        if (!res.ok) throw new Error(String(res.status))
        const data = (await res.json()) as { savedAt: string }
        setSavedAt(data.savedAt)
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    }, 600)
    return () => clearTimeout(t)
  }, [answers, extra])

  return (
    <div className="pb-28">
      <header className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">velar.one · design portal</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">Design questions</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Pick the option you like for each question. Add a note if none fits or you want a mix. Answers save
            automatically — when you&apos;re done, tell Claude in the chat.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">What we&apos;re building</div>
              <p className="mt-2 text-sm text-slate-700">
                A sales site for velar.one — a Velar Cloud company selling blog post automation to companies and
                entrepreneurs. Goal: visitors → leads → customers.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pages at launch</div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                {['Home', 'Pricing', 'Get started', 'Blog (our own automation)', 'Privacy & terms'].map((p) => (
                  <span key={p} className="rounded-full bg-white px-2.5 py-1 ring-1 ring-slate-200">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phases</div>
              <ol className="mt-2 list-decimal space-y-0.5 pl-4 text-sm text-slate-700">
                <li className="font-semibold">Design decisions (you are here)</li>
                <li>Foundation: header, footer, components, CMS blocks</li>
                <li>Home, Pricing, Get started + leads</li>
                <li>Blog on our own automation</li>
                <li>Launch: SEO, legal, Dokploy, domain</li>
              </ol>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        {QUESTIONS.map((q, i) => {
          const picks = answers[q.id]?.picks ?? []
          return (
            <section key={q.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    picks.length ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {picks.length ? '✓' : i + 1}
                </span>
                <div>
                  <h2 className="text-lg font-bold leading-snug sm:text-xl">{q.title}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">{q.why}</p>
                </div>
              </div>

              <div className={`mt-5 grid gap-3 ${gridCols[q.options.length]}`}>
                {q.options.map((o) => {
                  const selected = picks.includes(o.id)
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggle(q, o.id)}
                      className={`group flex flex-col rounded-xl p-3 text-left transition ${
                        selected ? 'bg-slate-50 ring-2 ring-slate-900' : 'ring-1 ring-slate-200 hover:ring-slate-400'
                      }`}
                    >
                      {o.preview}
                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center border text-[10px] ${
                            q.multi ? 'rounded' : 'rounded-full'
                          } ${selected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'}`}
                        >
                          {selected && '✓'}
                        </span>
                        <span className="font-semibold">{o.label}</span>
                        {o.recommended && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{o.description}</p>
                    </button>
                  )
                })}
              </div>

              <label className="mt-4 block">
                <span className="text-xs font-semibold text-slate-500">Note (optional) — something else, a mix, or why</span>
                <input
                  type="text"
                  value={answers[q.id]?.note ?? ''}
                  onChange={(e) => setNote(q.id, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  placeholder="e.g. like option 2 but darker"
                />
              </label>
            </section>
          )
        })}

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h2 className="text-lg font-bold sm:text-xl">Anything else?</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Price ideas, a logo you already have, websites you like, words to use or avoid, competitors…
          </p>
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            rows={5}
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          />
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-3 pl-16 pr-4">
          <div>
            <div className="text-sm font-semibold">
              {answered} / {QUESTIONS.length} answered
            </div>
            <div className="mt-1 h-1.5 w-40 overflow-hidden rounded-full bg-slate-100 sm:w-64">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
            </div>
          </div>
          <div className="text-right text-xs text-slate-500" aria-live="polite">
            {saveState === 'saving' && 'Saving…'}
            {saveState === 'saved' && savedAt && `Saved ${new Date(savedAt).toLocaleTimeString()}`}
            {saveState === 'error' && <span className="text-red-600">Couldn&apos;t save — is the dev server running?</span>}
            {saveState === 'idle' && 'Answers save automatically'}
          </div>
        </div>
      </div>
    </div>
  )
}
