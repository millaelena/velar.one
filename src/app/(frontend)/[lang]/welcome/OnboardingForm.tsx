import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { buttonStyles } from '@/components/ui'
import { submitOnboarding } from './actions'

const PLATFORMS = ['WordPress', 'Webflow', 'Shopify', 'Wix', 'Squarespace', 'Ghost', 'Velar Cloud']
const input =
  'mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-base shadow-xs focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {hint && <span className="mt-0.5 block text-sm text-muted">{hint}</span>}
      {children}
    </label>
  )
}

function Choice({ name, options, defaultValue }: { name: string; options: Record<string, string>; defaultValue: string }) {
  return (
    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {Object.entries(options).map(([value, label]) => (
        <label
          key={value}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm ring-1 ring-border has-[:checked]:bg-brand-soft has-[:checked]:ring-brand"
        >
          <input type="radio" name={name} value={value} defaultChecked={value === defaultValue} className="accent-brand" />
          {label}
        </label>
      ))}
    </div>
  )
}

export function OnboardingForm({ lang, sessionId }: { lang: Locale; sessionId: string }) {
  const t = getDictionary(lang).welcome
  return (
    <form action={submitOnboarding} className="mt-10 space-y-7 rounded-2xl bg-white p-5 ring-1 ring-border sm:p-8">
      <input type="hidden" name="session_id" value={sessionId} />
      <input type="hidden" name="lang" value={lang} />

      <Field label={t.website} hint={t.websiteHint}>
        <input name="website" type="url" required placeholder="https://" className={input} />
      </Field>

      <Field label={t.platform}>
        <select name="platform" required defaultValue="" className={input}>
          <option value="" disabled>
            —
          </option>
          {PLATFORMS.map((p) => (
            <option key={p}>{p}</option>
          ))}
          <option value="Other">{t.platformOther}</option>
        </select>
      </Field>

      <fieldset>
        <legend className="text-sm font-semibold">{t.language}</legend>
        <Choice name="postLanguage" options={t.languages} defaultValue={lang} />
      </fieldset>

      <Field label={t.topics} hint={t.topicsHint}>
        <textarea name="topics" required rows={4} className={input} />
      </Field>

      <Field label={t.audience}>
        <textarea name="audience" rows={2} className={input} />
      </Field>

      <Field label={t.tone}>
        <select name="tone" defaultValue="friendly" className={input}>
          {Object.entries(t.tones).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <fieldset>
        <legend className="text-sm font-semibold">{t.publishing}</legend>
        <Choice name="publishing" options={t.publishingModes} defaultValue="approval" />
      </fieldset>

      <Field label={t.notes}>
        <textarea name="notes" rows={3} className={input} />
      </Field>

      <button type="submit" className={`${buttonStyles.primary} w-full sm:w-auto`}>
        {t.submit}
      </button>
    </form>
  )
}
