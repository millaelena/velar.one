/* Starting content for velar.one, in both languages. Each text is { en, fi };
   the seed splits it per locale. After seeding, edit everything in /admin. */

type T = { en: string; fi: string }

const t = (en: string, fi: string): T => ({ en, fi })

export const SUPPORT_EMAIL = 'support@velarcloud.com'

const lexical = (heading: T, paragraphs: T[]) => {
  const text = (value: string) => ({ type: 'text', text: value, format: 0, style: '', mode: 'normal', detail: 0, version: 1 })
  const node = (lang: 'en' | 'fi') => ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        { type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr', children: [text(heading[lang])] },
        ...paragraphs.map((p) => ({
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
          children: [text(p[lang])],
        })),
      ],
    },
  })
  // Rich text is localized as a whole document.
  return { en: node('en'), fi: node('fi') }
}

// PLACEHOLDER prices and features — set the real ones in /admin → Plans (and matching Stripe prices).
export const plans = [
  {
    key: 'starter',
    name: t('Starter', 'Starter'),
    tagline: t('Get your blog going', 'Blogi käyntiin'),
    price: 49,
    postsPerMonth: 4,
    sortOrder: 1,
    highlighted: false,
    features: [
      t('SEO-ready posts with meta title and description', 'Hakukoneystävälliset kirjoitukset metaotsikoineen ja -kuvauksineen'),
      t('Featured image for every post', 'Pääkuva jokaiseen kirjoitukseen'),
      t('Auto-publishing or approval first', 'Automaattinen julkaisu tai hyväksyntä ensin'),
      t('Email support', 'Sähköpostituki'),
    ].map((text) => ({ text })),
  },
  {
    key: 'growth',
    name: t('Growth', 'Growth'),
    tagline: t('A new post every week, or more', 'Uusi kirjoitus joka viikko – tai useammin'),
    price: 89,
    postsPerMonth: 8,
    sortOrder: 2,
    highlighted: true,
    features: [
      t('Everything in Starter', 'Kaikki Starter-paketin ominaisuudet'),
      t('Monthly content plan based on your keywords', 'Kuukausittainen sisältösuunnitelma avainsanojesi pohjalta'),
      t('Images inside posts, not just the cover', 'Kuvat myös tekstin sisällä, ei vain kansikuva'),
      t('Priority email support', 'Ensisijainen sähköpostituki'),
    ].map((text) => ({ text })),
  },
  {
    key: 'pro',
    name: t('Pro', 'Pro'),
    tagline: t('Own your niche in search', 'Oman alasi kärkeen hakutuloksissa'),
    price: 159,
    postsPerMonth: 16,
    sortOrder: 3,
    highlighted: false,
    features: [
      t('Everything in Growth', 'Kaikki Growth-paketin ominaisuudet'),
      t('Publish in two languages (EN + FI)', 'Julkaisu kahdella kielellä (EN + FI)'),
      t('Topic requests anytime', 'Aihetoiveet milloin tahansa'),
      t('Priority email support', 'Ensisijainen sähköpostituki'),
    ].map((text) => ({ text })),
  },
]

const faqGeneral = [
  {
    question: t('Do I need to write anything?', 'Pitääkö minun kirjoittaa mitään?'),
    answer: t(
      'No. You tell us about your business once. After that, topics, writing, images and publishing are handled for you.',
      'Ei. Kerrot yrityksestäsi kerran. Sen jälkeen aiheet, kirjoittaminen, kuvat ja julkaisu hoituvat puolestasi.',
    ),
  },
  {
    question: t('Which website platforms do you support?', 'Mitä sivustoalustoja tuette?'),
    answer: t(
      `WordPress, Webflow, Shopify, Wix, Squarespace, Ghost and Velar Cloud. If your platform isn’t listed, email ${SUPPORT_EMAIL} before ordering.`,
      `WordPress, Webflow, Shopify, Wix, Squarespace, Ghost ja Velar Cloud. Jos alustasi puuttuu listalta, lähetä viesti osoitteeseen ${SUPPORT_EMAIL} ennen tilaamista.`,
    ),
  },
  {
    question: t('Can I check posts before they go live?', 'Voinko tarkistaa kirjoitukset ennen julkaisua?'),
    answer: t(
      'Yes. Choose auto-publishing or approval first when you get started, and switch whenever you like.',
      'Kyllä. Valitse aloittaessasi automaattinen julkaisu tai hyväksyntä ensin – voit vaihtaa milloin tahansa.',
    ),
  },
  {
    question: t('Are the posts written with AI?', 'Kirjoitetaanko tekstit tekoälyllä?'),
    answer: t(
      'Yes. AI does the heavy lifting, guided by your content plan, your topics and your tone of voice.',
      'Kyllä. Tekoäly tekee raskaan työn sisältösuunnitelmasi, aiheidesi ja äänensävysi ohjaamana.',
    ),
  },
  {
    question: t('Can I cancel?', 'Voinko perua?'),
    answer: t(
      'Yes, anytime. Your plan runs until the end of the paid month, and the posts already published stay yours.',
      'Kyllä, milloin tahansa. Paketti on voimassa maksetun kuukauden loppuun, ja jo julkaistut kirjoitukset jäävät sinulle.',
    ),
  },
  {
    question: t('Who is behind velar.one?', 'Kuka velar.onen takana on?'),
    answer: t(
      'velar.one is a Velar Cloud company. Velar Cloud builds CRM, marketing and automation tools for small businesses.',
      'velar.one on Velar Cloudin yhtiö. Velar Cloud tekee CRM-, markkinointi- ja automaatiotyökaluja pienyrityksille.',
    ),
  },
]

const faqBilling = [
  {
    question: t('How does billing work?', 'Miten laskutus toimii?'),
    answer: t(
      'You pay monthly by card through Stripe, our secure payment provider. Your plan starts the day you order.',
      'Maksat kuukausittain kortilla turvallisen maksunvälittäjämme Stripen kautta. Paketti alkaa tilauspäivästä.',
    ),
  },
  {
    question: t('What happens after I pay?', 'Mitä tapahtuu maksun jälkeen?'),
    answer: t(
      'You get a short form about your website, topics and tone of voice. We build your content plan from it and email you before your first post goes live.',
      'Saat lyhyen lomakkeen verkkosivuistasi, aiheistasi ja äänensävystäsi. Laadimme sen pohjalta sisältösuunnitelmasi ja olemme yhteydessä sähköpostitse ennen ensimmäisen kirjoituksen julkaisua.',
    ),
  },
  {
    question: t('Can I change my plan later?', 'Voinko vaihtaa pakettia myöhemmin?'),
    answer: t(
      `Yes. Email ${SUPPORT_EMAIL} and we’ll switch it from your next billing period.`,
      `Kyllä. Lähetä viesti osoitteeseen ${SUPPORT_EMAIL}, niin vaihdamme paketin seuraavasta laskutusjaksosta alkaen.`,
    ),
  },
  faqGeneral[4],
]

export const pages = [
  {
    slug: 'home',
    title: t('Blog automation for entrepreneurs', 'Blogiautomaatio yrittäjille'),
    description: t(
      'velar.one plans, writes and publishes SEO-ready blog posts to your website every week — in your voice, with images.',
      'velar.one suunnittelee, kirjoittaa ja julkaisee hakukoneystävälliset blogikirjoitukset sivustollesi joka viikko – sinun äänelläsi ja kuvien kanssa.',
    ),
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('Blog automation for entrepreneurs', 'Blogiautomaatio yrittäjille'),
        heading: t('Stay visible without writing a word.', 'Pysy näkyvillä kirjoittamatta riviäkään.'),
        highlight: t('without writing a word', 'kirjoittamatta riviäkään'),
        text: t(
          'velar.one plans, writes and publishes SEO-ready blog posts to your website every week — in your voice, with images. You run your business. Your blog keeps working.',
          'velar.one suunnittelee, kirjoittaa ja julkaisee hakukoneystävälliset blogikirjoitukset verkkosivuillesi joka viikko – sinun äänelläsi ja kuvien kanssa. Sinä pyörität yritystäsi, blogisi tekee töitä.',
        ),
        primary: { label: t('See plans & pricing', 'Katso paketit ja hinnat'), href: '/pricing#plans' },
        secondary: { label: t('How it works', 'Näin se toimii'), href: '/#how-it-works' },
        visual: 'calendar',
      },
      {
        blockType: 'integrations',
        heading: t('Publishes straight to your website', 'Julkaisee suoraan verkkosivuillesi'),
        items: ['WordPress', 'Webflow', 'Shopify', 'Wix', 'Squarespace', 'Ghost', 'Velar Cloud'].map((name) => ({ name })),
      },
      {
        blockType: 'steps',
        anchor: 'how-it-works',
        heading: t('How it works', 'Näin se toimii'),
        text: t(
          'Set it up once in about ten minutes. After that, posts just appear.',
          'Käyttöönotto vie noin kymmenen minuuttia. Sen jälkeen kirjoituksia vain ilmestyy.',
        ),
        steps: [
          {
            title: t('Choose a plan', 'Valitse paketti'),
            text: t(
              'Pick how many posts you want each month and pay by card. Cancel anytime.',
              'Valitse, montako kirjoitusta haluat kuukaudessa, ja maksa kortilla. Voit perua milloin tahansa.',
            ),
          },
          {
            title: t('Tell us about your business', 'Kerro yrityksestäsi'),
            text: t(
              'Your website, topics, readers and tone of voice. Your content plan is built from these.',
              'Verkkosivusi, aiheet, lukijat ja äänensävy. Niiden pohjalta syntyy sisältösuunnitelmasi.',
            ),
          },
          {
            title: t('Posts get written', 'Kirjoitukset syntyvät'),
            text: t(
              'Every post is researched, written and optimized for search, with its own featured image.',
              'Jokainen kirjoitus taustoitetaan, kirjoitetaan ja optimoidaan hakukoneille, ja se saa oman pääkuvan.',
            ),
          },
          {
            title: t('Published on schedule', 'Julkaisu aikataulussa'),
            text: t(
              'Posts go live on your site automatically — or wait for your approval first, if you prefer.',
              'Kirjoitukset julkaistaan sivustollasi automaattisesti – tai ne odottavat ensin hyväksyntääsi, jos niin haluat.',
            ),
          },
        ],
      },
      {
        blockType: 'features',
        anchor: 'features',
        heading: t('Everything a good blog needs', 'Kaikki, mitä hyvä blogi tarvitsee'),
        text: t(
          'Consistency is what makes a blog work. That’s exactly the part we take off your plate.',
          'Blogi toimii, kun julkaiseminen on säännöllistä. Juuri sen osan otamme hoitaaksemme.',
        ),
        features: [
          {
            icon: 'calendar',
            title: t('A steady schedule', 'Tasainen tahti'),
            text: t(
              'Search engines and readers reward regular publishing. Your calendar never runs empty.',
              'Hakukoneet ja lukijat palkitsevat säännöllisen julkaisemisen. Kalenterisi ei jää koskaan tyhjäksi.',
            ),
          },
          {
            icon: 'search',
            title: t('SEO built in', 'Hakukoneoptimointi mukana'),
            text: t(
              'Keyword-led topics, clear headings, and a meta title and description on every post.',
              'Avainsanoihin perustuvat aiheet, selkeät väliotsikot sekä metaotsikko ja -kuvaus jokaisessa kirjoituksessa.',
            ),
          },
          {
            icon: 'image',
            title: t('Images included', 'Kuvat mukana'),
            text: t(
              'Every post gets a featured image made for it — no more hunting for stock photos.',
              'Jokainen kirjoitus saa sitä varten tehdyn pääkuvan – ei enää kuvapankkien selaamista.',
            ),
          },
          {
            icon: 'voice',
            title: t('Your voice', 'Sinun äänesi'),
            text: t(
              'Posts follow your tone, your topics and your readers — not generic filler.',
              'Kirjoitukset noudattavat sinun äänensävyäsi, aiheitasi ja lukijoitasi – ei geneeristä täytetekstiä.',
            ),
          },
          {
            icon: 'globe',
            title: t('English and Finnish', 'Suomeksi ja englanniksi'),
            text: t('Publish in English, Finnish or both.', 'Julkaise suomeksi, englanniksi tai molemmilla kielillä.'),
          },
          {
            icon: 'check',
            title: t('You stay in control', 'Pysyt ohjaimissa'),
            text: t(
              'Auto-publish, or review each post before it goes live. Change your topics anytime.',
              'Automaattinen julkaisu tai jokaisen kirjoituksen tarkistus ennen julkaisua. Aiheita voi muuttaa milloin tahansa.',
            ),
          },
        ],
      },
      {
        blockType: 'pricing',
        anchor: 'plans',
        heading: t('Simple monthly plans', 'Selkeät kuukausipaketit'),
        text: t(
          'Pick how many posts you want each month. No contracts — cancel anytime.',
          'Valitse, montako kirjoitusta haluat kuukaudessa. Ei sitoutumista – voit perua milloin tahansa.',
        ),
      },
      { blockType: 'faq', anchor: 'faq', heading: t('Questions', 'Kysymyksiä'), items: faqGeneral },
      {
        blockType: 'cta',
        heading: t('Put your blog on autopilot.', 'Laita blogisi autopilotille.'),
        text: t(
          'Choose a plan, answer a few questions, and your first post is on its way.',
          'Valitse paketti, vastaa muutamaan kysymykseen, ja ensimmäinen kirjoituksesi on tulossa.',
        ),
        button: { label: t('Choose your plan', 'Valitse paketti'), href: '/pricing#plans' },
      },
    ],
  },
  {
    slug: 'pricing',
    title: t('Pricing', 'Hinnat'),
    description: t(
      'Monthly blog automation plans for entrepreneurs. SEO-ready posts with images, published to your site. Cancel anytime.',
      'Blogiautomaation kuukausipaketit yrittäjille. Hakukoneystävälliset kirjoitukset kuvineen suoraan sivustollesi. Voit perua milloin tahansa.',
    ),
    layout: [
      {
        blockType: 'pricing',
        anchor: 'plans',
        heading: t('Plans & pricing', 'Paketit ja hinnat'),
        text: t(
          'Every plan includes writing, images, SEO and publishing. The only difference is how many posts you get.',
          'Jokaisessa paketissa on kirjoittaminen, kuvat, hakukoneoptimointi ja julkaisu. Ero on vain kirjoitusten määrässä.',
        ),
      },
      { blockType: 'faq', anchor: 'faq', heading: t('Billing questions', 'Laskutus'), items: faqBilling },
      {
        blockType: 'cta',
        heading: t('Questions before you order?', 'Kysyttävää ennen tilausta?'),
        text: t('We’re happy to help you pick the right plan.', 'Autamme mielellämme valitsemaan sopivan paketin.'),
        button: { label: t('Email us', 'Lähetä viesti'), href: `mailto:${SUPPORT_EMAIL}` },
      },
    ],
  },
  // PLACEHOLDER legal pages — must be written before taking payments.
  {
    slug: 'privacy',
    title: t('Privacy policy', 'Tietosuojaseloste'),
    description: t('How velar.one handles personal data.', 'Miten velar.one käsittelee henkilötietoja.'),
    layout: [
      {
        blockType: 'content',
        content: lexical(t('Privacy policy', 'Tietosuojaseloste'), [
          t(
            'This page is being written.',
            'Tätä sivua kirjoitetaan parhaillaan.',
          ),
          t(`Questions about privacy: ${SUPPORT_EMAIL}`, `Kysymykset tietosuojasta: ${SUPPORT_EMAIL}`),
        ]),
      },
    ],
  },
  {
    slug: 'terms',
    title: t('Terms of service', 'Käyttöehdot'),
    description: t('Terms for using velar.one.', 'velar.onen käyttöehdot.'),
    layout: [
      {
        blockType: 'content',
        content: lexical(t('Terms of service', 'Käyttöehdot'), [
          t('This page is being written.', 'Tätä sivua kirjoitetaan parhaillaan.'),
          t(`Questions: ${SUPPORT_EMAIL}`, `Kysymykset: ${SUPPORT_EMAIL}`),
        ]),
      },
    ],
  },
]
