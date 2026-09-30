# velar.one

Sales site for velar.one — blog post automation for entrepreneurs and companies, a Velar Cloud company.
Next.js 16 + Payload CMS 3 (Postgres), English + Finnish, Stripe checkout, deployed from GitHub to Dokploy.

This repository is **public** — keep secrets in `.env.local` / Dokploy, never in git.

Plan: [docs/PLAN.md](docs/PLAN.md) · Design decisions: [docs/design/choices.json](docs/design/choices.json)

## Local development

```bash
createdb velar_one_dev        # local Postgres (Homebrew)
cp .env.example .env.local    # fill in DATABASE_URI + PAYLOAD_SECRET (openssl rand -base64 32)
npm install
npm run migrate               # apply committed migrations
npm run seed                  # starting content: plans + home, pricing, privacy, terms (EN + FI)
npm run dev
```

- Site: http://localhost:3000 (English) and http://localhost:3000/fi (Finnish)
- Admin: http://localhost:3000/admin (create the first user on first visit)

`npm run seed` only creates what's missing. `npm run seed -- force` resets the seeded plans and pages to the defaults.

### Content

- **Pages** are built from blocks (hero, steps, features, pricing table, FAQ, call to action, rich text).
  Slug `home` is the front page; other slugs are served at `/<slug>` and `/fi/<slug>`.
  Switch the language at the top of the editor to write the Finnish version.
- **Plans** feed every pricing table. Each plan needs a Stripe price id for checkout.
- **Posts** are the velar.one blog. One post = one language (`language` field).
- **Customers** are created by Stripe checkout and completed by the onboarding form after payment.

### Schema changes

```bash
npm run migrate:create add_something
npm run migrate
```

Commit the generated files in `src/payload/migrations/` with the config change.

## Payments (Stripe)

"Choose plan" → `/api/checkout` → Stripe Checkout (monthly subscription) → `/welcome` onboarding form.
Without `STRIPE_SECRET_KEY` (or a plan without a price id) the pricing table shows "checkout opens soon".

1. Stripe → Products: create one product per plan with a **monthly recurring price** in EUR.
2. Copy each price id (`price_…`) into `/admin` → Plans → Stripe price id. The price shown on the site
   comes from the plan's `price` field — keep them the same.
3. Stripe → Developers → Webhooks: endpoint `https://<your-domain>/api/stripe/webhook`, events
   `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
   Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

Local testing: use test-mode keys and `stripe listen --forward-to localhost:3004/api/stripe/webhook`.

## Deploy (Dokploy)

Push to `main` → Dokploy builds the `Dockerfile` → `entrypoint.sh` runs migrations → `next start`.

One-time setup in Dokploy:

1. **Database:** create a PostgreSQL service. Copy its internal connection URL.
2. **Application:** create an app → Provider: GitHub → repo `millaelena/velar.one`, branch `main`,
   Build type: **Dockerfile**. Enable **Auto Deploy**.
3. **Environment:**
   ```
   DATABASE_URI=<internal postgres URL>
   PAYLOAD_SECRET=<openssl rand -base64 32>
   NEXT_PUBLIC_SERVER_URL=https://<your-domain>
   STRIPE_SECRET_KEY=sk_live_…
   STRIPE_WEBHOOK_SECRET=whsec_…
   ```
   **Build Time Arguments:**
   ```
   NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<openssl rand -base64 32>   # same value every deploy
   NEXT_PUBLIC_SERVER_URL=https://<your-domain>                    # Next bakes it into the build
   ```
4. **Volumes:** mount a volume at `/app/media` (uploaded files).
5. **Domains:** add the domain, container port `3000`, HTTPS on.
6. Deploy, then open `https://<your-domain>/admin` and create the first admin user.
7. Load the starting content once from the app's terminal in Dokploy: `npm run seed`.

Healthcheck: `GET /api/health` → `{"ok":true}`.
