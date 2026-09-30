import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Icon } from '@/components/Icon'

/* Hero illustration: a month filling up with posts. Static, CSS-animated.
   October starting on a Thursday; posts on Tuesdays and Fridays; "today" is the 18th. */
const START_OFFSET = 3
const DAYS = 31
const TODAY = 18
const POST_DAYS = [2, 6, 9, 13, 16, 20, 23, 27]

export function CalendarVisual({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).calendar
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - START_OFFSET + 1
    return day >= 1 && day <= DAYS ? day : null
  })

  return (
    <div className="relative mx-auto w-full max-w-lg pt-12 pb-14 lg:max-w-none" aria-hidden>
      <div className="rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/5 ring-1 ring-border sm:p-6">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">{t.month}</div>
          <div className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">{t.scheduled}</div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted sm:gap-1.5">
          {t.weekdays.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-1.5">
          {cells.map((day, i) => {
            const post = day !== null && POST_DAYS.includes(day)
            const published = post && day <= TODAY
            return (
              <div
                key={i}
                className={`flex h-11 flex-col rounded-md p-1 sm:h-14 ${
                  day === null ? '' : day === TODAY ? 'bg-white ring-2 ring-brand/30' : 'bg-surface ring-1 ring-border/70'
                }`}
              >
                {day !== null && <span className="text-[9px] font-medium text-muted sm:text-[10px]">{day}</span>}
                {post && (
                  <span
                    className={`mt-auto flex h-3.5 items-center justify-center rounded-sm animate-pop-in sm:h-4 ${
                      published ? 'bg-success text-white' : 'bg-brand text-white'
                    }`}
                    style={{ animationDelay: `${300 + POST_DAYS.indexOf(day) * 140}ms` }}
                  >
                    {published && <Icon name="tick" className="h-2.5 w-2.5" />}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-success" /> {t.published}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-brand" /> {t.upcoming}
          </span>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute top-0 right-2 w-52 animate-float rounded-xl bg-white p-3 shadow-lg shadow-slate-900/10 ring-1 ring-border sm:-right-4 sm:w-60">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-brand to-sky-400" />
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[10px] font-semibold text-success">
              <Icon name="tick" className="h-3 w-3" /> {t.published}
            </div>
            <div className="truncate text-xs font-semibold">{t.postTitles[0]}</div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-2 w-56 animate-float rounded-xl bg-ink p-3 text-white shadow-lg shadow-slate-900/20 sm:-left-6 sm:w-64"
        style={{ animationDelay: '-3s' }}
      >
        <div className="flex items-center justify-between text-[10px] font-semibold text-white/60">
          <span>{t.nextPost}</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-white">{t.nextPostWhen}</span>
        </div>
        <div className="mt-1.5 truncate text-xs font-semibold">{t.postTitles[1]}</div>
      </div>
    </div>
  )
}
