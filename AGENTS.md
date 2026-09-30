<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# velar.one — agent rules

## 0. Don't commit or push yourself

Agents never run `git commit`, `git push`, merges, rebases or `gh pr create`. Make the
changes, verify them, leave them uncommitted and list the changed files. The user commits
and pushes. Exception only when the user explicitly asks in that conversation — for that
one time.

Pushing to `main` deploys to production (Dokploy auto-deploy).

## 1. Schema changes go through migrations

Production schema is built from committed migrations in `src/payload/migrations/`
(`entrypoint.sh` → `npm run migrate`, plus `prodMigrations` in `payload.config.ts`).

After changing any collection/global/field:

1. `npm run migrate:create <descriptive_name>`
2. Review the generated SQL.
3. `npm run migrate`
4. Commit the migration files together with the config change.

Never set `PAYLOAD_PUSH=true` in Dokploy or commit it.

## 2. Mobile-first

Design every view for ≤ 390 px first, then scale up.

## 3. Payload admin CSS isolation

`src/app/(payload)/layout.tsx` must NOT import `globals.css` — Tailwind's preflight
breaks the admin UI.

## 4. Two languages

English is the default at `/…`, Finnish at `/fi/…`. `src/proxy.ts` rewrites unprefixed URLs to
`/en/…` internally, so every public route lives under `src/app/(frontend)/[lang]/`.

- Page content, plans and FAQs are localized in Payload (`localized: true` on text fields).
- UI strings in code go in `src/i18n/dictionaries.ts` — always add both `en` and `fi`.
- Build internal links with `localePath()` / `localizeHref()`, never hard-coded `/fi` prefixes.
- Blog posts are not localized: one post = one language (`language` field).

## Stack

- Next.js 16 (App Router) + Payload 3 in the same app, Postgres
- Tailwind v4 (`src/app/globals.css`, tokens in `@theme`)
- Deploy: GitHub `main` → Dokploy (Dockerfile) → `entrypoint.sh` migrates, then `next start`
- Payload versions are pinned exactly — upgrade all `@payloadcms/*` + `payload` together.
- Stripe Checkout (subscriptions) — `src/lib/stripe.ts`, `src/app/api/checkout`, `src/app/api/stripe/webhook`
- Design: light & clean, Inter, dark blue `brand` + black `ink` (tokens in `globals.css`). Decisions in `docs/design/choices.json`.

## Layout

- `payload.config.ts` — Payload config (root)
- `src/payload/collections/` — collections
- `src/payload/access/` — access functions
- `src/payload/migrations/` — committed migrations
- `src/payload/blocks/` — page builder blocks
- `src/seed/` — starting content (`npm run seed`)
- `src/app/(frontend)/[lang]/` — public site (home, `[...slug]` pages, blog, welcome/onboarding)
- `src/components/blocks/` — block renderers · `src/components/site/` — header, footer
- `src/i18n/` — locales, dictionaries · `src/proxy.ts` — locale routing
- `src/app/(portal)/design/` — dev-only design questions portal (404 in production)
- `src/app/(payload)/` — admin + REST/GraphQL (generated boilerplate)
- `src/app/api/health/` — Docker healthcheck
