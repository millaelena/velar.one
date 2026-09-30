import type { Locale } from './config'

/* UI strings that live in code. Page content (headlines, sections, FAQs, plans)
   lives in Payload and is edited per language in /admin. */

const en = {
  meta: {
    description:
      'velar.one plans, writes and publishes SEO-ready blog posts to your website every week. Blog automation for entrepreneurs and companies.',
  },
  nav: {
    howItWorks: 'How it works',
    pricing: 'Pricing',
    blog: 'Blog',
    cta: 'Choose a plan',
    menu: 'Menu',
    parent: 'a Velar Cloud company',
    language: 'Language',
  },
  footer: {
    tagline: 'Blog automation for entrepreneurs and companies.',
    product: 'Product',
    company: 'Company',
    privacy: 'Privacy policy',
    terms: 'Terms of service',
    contact: 'Contact',
    parent: 'A Velar Cloud company',
    parentLink: 'Visit velarcloud.com',
  },
  calendar: {
    month: 'October',
    weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    scheduled: '8 posts this month',
    published: 'Published',
    upcoming: 'Scheduled',
    nextPost: 'Next post',
    nextPostWhen: 'Tue 09:00',
    postTitles: [
      '5 mistakes first-time founders make',
      'How to price your services',
      'A simple weekly marketing routine',
      'What your customers google before buying',
    ],
  },
  pricing: {
    perMonth: '/ month',
    postsPerMonth: (n: number) => `${n} posts per month`,
    choose: (plan: string) => `Choose ${plan}`,
    recommended: 'Recommended',
    secure: 'Secure card payment with Stripe. Cancel anytime.',
    unavailable: (email: string) => `Online checkout opens soon. Want to start right away? Email ${email}.`,
    canceled: 'Checkout canceled — no payment was made.',
  },
  blog: {
    title: 'Blog',
    intro: 'Content, SEO and growing a business — published by our own blog automation.',
    empty: 'The first posts are on their way.',
    readMore: 'Read post',
    back: '← All posts',
  },
  welcome: {
    title: 'Welcome aboard!',
    intro: (plan: string) => `Your ${plan} plan is active. Tell us about your business so we can plan your first posts.`,
    introNoPlan: 'Your plan is active. Tell us about your business so we can plan your first posts.',
    website: 'Website address',
    websiteHint: 'Where should the posts be published?',
    platform: 'Website platform',
    platformOther: 'Other',
    language: 'Post language',
    languages: { en: 'English', fi: 'Finnish', both: 'Both' },
    topics: 'What should your posts be about?',
    topicsHint: 'Your products or services, and the questions customers ask you.',
    audience: 'Who are your readers?',
    tone: 'Tone of voice',
    tones: { friendly: 'Friendly', professional: 'Professional', expert: 'Expert', casual: 'Casual' },
    publishing: 'Publishing',
    publishingModes: { auto: 'Publish automatically', approval: 'Send each post to me for approval first' },
    notes: 'Anything else we should know?',
    submit: 'Send',
    done: 'Thank you! We’ll build your content plan and contact you by email before your first post goes live.',
    invalidTitle: 'Order not found',
    invalid: (email: string) => `We couldn’t find your order. If you have paid, please contact ${email}.`,
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you’re looking for doesn’t exist or has moved.',
    home: 'Back to home',
  },
  setup: 'No content yet. Run `npm run seed`, or create a page with the slug "home" in /admin.',
}

export type Dictionary = typeof en

const fi: Dictionary = {
  meta: {
    description:
      'velar.one suunnittelee, kirjoittaa ja julkaisee hakukoneystävälliset blogikirjoitukset sivustollesi joka viikko. Blogiautomaatio yrittäjille ja yrityksille.',
  },
  nav: {
    howItWorks: 'Näin se toimii',
    pricing: 'Hinnat',
    blog: 'Blogi',
    cta: 'Valitse paketti',
    menu: 'Valikko',
    parent: 'Velar Cloud -yhtiö',
    language: 'Kieli',
  },
  footer: {
    tagline: 'Blogiautomaatio yrittäjille ja yrityksille.',
    product: 'Palvelu',
    company: 'Yritys',
    privacy: 'Tietosuojaseloste',
    terms: 'Käyttöehdot',
    contact: 'Yhteystiedot',
    parent: 'Velar Cloud -yhtiö',
    parentLink: 'Siirry velarcloud.comiin',
  },
  calendar: {
    month: 'Lokakuu',
    weekdays: ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'],
    scheduled: '8 kirjoitusta tässä kuussa',
    published: 'Julkaistu',
    upcoming: 'Ajastettu',
    nextPost: 'Seuraava kirjoitus',
    nextPostWhen: 'ti 9.00',
    postTitles: [
      '5 virhettä, joita uusi yrittäjä tekee',
      'Näin hinnoittelet palvelusi',
      'Yksinkertainen viikoittainen markkinointirutiini',
      'Mitä asiakkaasi googlaavat ennen ostopäätöstä',
    ],
  },
  pricing: {
    perMonth: '/ kk',
    postsPerMonth: (n: number) => `${n} kirjoitusta kuukaudessa`,
    choose: (plan: string) => `Valitse ${plan}`,
    recommended: 'Suosittelemme',
    secure: 'Turvallinen korttimaksu Stripen kautta. Voit perua milloin tahansa.',
    unavailable: (email: string) => `Verkkomaksu avautuu pian. Haluatko aloittaa heti? Lähetä viesti osoitteeseen ${email}.`,
    canceled: 'Maksu keskeytettiin – veloitusta ei tehty.',
  },
  blog: {
    title: 'Blogi',
    intro: 'Sisällöstä, hakukoneoptimoinnista ja yrityksen kasvattamisesta – julkaissut oma blogiautomaatiomme.',
    empty: 'Ensimmäiset kirjoitukset ovat tulossa.',
    readMore: 'Lue kirjoitus',
    back: '← Kaikki kirjoitukset',
  },
  welcome: {
    title: 'Tervetuloa mukaan!',
    intro: (plan: string) => `${plan}-pakettisi on aktiivinen. Kerro yrityksestäsi, niin suunnittelemme ensimmäiset kirjoituksesi.`,
    introNoPlan: 'Pakettisi on aktiivinen. Kerro yrityksestäsi, niin suunnittelemme ensimmäiset kirjoituksesi.',
    website: 'Verkkosivujen osoite',
    websiteHint: 'Mihin kirjoitukset julkaistaan?',
    platform: 'Sivuston alusta',
    platformOther: 'Muu',
    language: 'Kirjoitusten kieli',
    languages: { en: 'Englanti', fi: 'Suomi', both: 'Molemmat' },
    topics: 'Mistä kirjoitusten pitäisi kertoa?',
    topicsHint: 'Tuotteesi tai palvelusi ja kysymykset, joita asiakkaat sinulta kysyvät.',
    audience: 'Keitä lukijasi ovat?',
    tone: 'Äänensävy',
    tones: { friendly: 'Ystävällinen', professional: 'Asiallinen', expert: 'Asiantunteva', casual: 'Rento' },
    publishing: 'Julkaisu',
    publishingModes: { auto: 'Julkaise automaattisesti', approval: 'Lähetä jokainen kirjoitus ensin minulle hyväksyttäväksi' },
    notes: 'Onko jotain muuta, mitä meidän pitäisi tietää?',
    submit: 'Lähetä',
    done: 'Kiitos! Laadimme sisältösuunnitelmasi ja olemme yhteydessä sähköpostitse ennen ensimmäisen kirjoituksen julkaisua.',
    invalidTitle: 'Tilausta ei löytynyt',
    invalid: (email: string) => `Tilaustasi ei löytynyt. Jos olet jo maksanut, ota yhteyttä osoitteeseen ${email}.`,
  },
  notFound: {
    title: 'Sivua ei löytynyt',
    text: 'Etsimääsi sivua ei ole olemassa tai se on siirretty.',
    home: 'Takaisin etusivulle',
  },
  setup: 'Ei vielä sisältöä. Aja `npm run seed` tai luo /adminissa sivu, jonka slug on "home".',
}

const dictionaries: Record<Locale, Dictionary> = { en, fi }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
