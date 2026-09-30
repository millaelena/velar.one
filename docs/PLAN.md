# velar.one — website plan

velar.one is a Velar Cloud company (velarcloud.com). It sells **blog post automation** to
companies and entrepreneurs: SEO-ready blog posts, with images, written and published to the
customer's own site on a schedule — so their blog stays alive without them writing.

The website's single job: **turn visitors into leads and customers.**

## Decisions (from the design portal, `docs/design/choices.json`)

- Sister brand of Velar Cloud: VELAR / ONE wordmark, "a Velar Cloud company", shared navy footer.
- Light & clean look, Inter, dark blue accent (`#1e40af`) with black as the second color.
- Hero shows a content calendar filling up with posts.
- Front page speaks to entrepreneurs first.
- English default, Finnish at `/fi`.
- Customers buy online: public plans → Stripe Checkout (monthly) → onboarding form.

The portal stays available in dev at http://localhost:3004/design for future questions.

## 1. Offer (what we sell)

- Done-for-you blog posts on a schedule (e.g. weekly), in the customer's language and tone.
- SEO basics built in: keyword-led topics, meta title/description, headings, internal links.
- Featured and in-article images generated per post.
- Auto-publishing to the customer's platform (WordPress, Webflow, Shopify, Wix, Payload,
  Velar Cloud / GoHighLevel blog), or delivery for approval first.
- Plans by volume (posts per month). Prices: to decide.

Proof we already run it: the automation behind `automatisointi.huotari.art` publishes daily.
velar.one's own blog will run on the same automation ("we use it ourselves").

## 2. Audience

- **Companies (SMB):** want organic traffic and fresh content, have no time or writer.
- **Entrepreneurs / solo:** want a consistent personal or business blog without the effort.

## 3. Site map (MVP)

| Route | Purpose |
|---|---|
| `/` | Home: hero, problem → solution, how it works, sample posts, features, integrations, pricing preview, FAQ, final CTA |
| `/pricing` | Plans by posts/month, what's included, FAQ about billing |
| `/api/checkout` → Stripe | "Choose plan" on any pricing table starts a Stripe Checkout subscription |
| `/welcome` | After payment: onboarding form (website, platform, language, topics, readers, tone, publishing mode) saved on the customer |
| `/blog`, `/blog/[slug]` | velar.one's own blog, published by our own automation (SEO + proof) |
| `/privacy`, `/terms` | Legal (Velar Cloud entity) |
| Footer | "A Velar Cloud company" → velarcloud.com |

Phase 2: `/for-companies`, `/for-entrepreneurs`, `/examples` (case studies), self-serve checkout, customer portal.

## 4. Content model (Payload)

Everything editable in `/admin` without code:

- **Pages** with a block-based layout builder: Hero, Steps, Features, SamplePosts, Integrations,
  PricingTable, FAQ, Testimonials, CTA, RichText.
- **Posts** — own blog; one post per language. Categories/authors can be added later.
- **Plans** — pricing tiers (name, posts/month, price, features, highlighted).
- **FAQs** — reusable on home and pricing.
- **Customers** — created by Stripe checkout/webhook, completed by the onboarding form (admin-only).
- Later: email notification on new customers, optional webhook to Velar Cloud CRM, editable
  Header/Footer globals.
- **Media** (exists), **Users** (exists).

## 5. Technical

- Stays on the current stack: Next.js 16 + Payload 3 + Postgres, Dokploy deploy, migrations.
- SEO: per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`, JSON-LD
  (Organization, Product/Offer, FAQPage, BlogPosting).
- Performance: Server Components, `next/image`, fonts via `next/font`, minimal client JS.
- Mobile-first (≤ 390 px first).
- Analytics: privacy-friendly (Plausible/Umami) so no cookie banner is needed — to confirm.
- Email for lead notifications: SMTP or Resend adapter — to decide.
- Languages: decided in the portal. If more than one, Payload localization + `/[locale]` routes,
  set up in phase 1 because it shapes all routes.

## 6. Phases

1. ✅ **Design decisions** — portal answers → tokens, wordmark, font.
2. ✅ **Foundation** — header/footer, components, Payload blocks, EN/FI routing, migration, seed.
3. ✅ **Conversion pages** — Home, Pricing, Stripe checkout, welcome/onboarding, Customers.
4. 🟡 **Blog** — Posts collection and pages done. Next: point the blog automation at this site.
5. ⬜ **Launch** — real prices, Stripe products + webhook, privacy policy and terms,
   new-customer email notification, analytics, Dokploy app + Postgres + domain `velar.one`.
6. ⬜ **Phase 2** — segment pages, case studies, Stripe customer portal (self-serve plan changes).
