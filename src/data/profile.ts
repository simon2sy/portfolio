/**
 * Central site identity + editable personal details.
 *
 * CONTACT NOTE: no public email or LinkedIn was available at build time.
 * Add them here and the contact section will render the matching links
 * automatically — nothing else needs to change.
 */
export const profile = {
  name: 'Simon Shrestha',
  initials: 'SS',
  role: 'Full-Stack Developer',
  focusLine: 'Backend-focused software developer',
  location: 'Nepal',
  availability: 'Open to internships, freelance work & collaborations',
  domain: 'simonstha.com.np',
  github: 'https://github.com/simon2sy',
  githubHandle: 'simon2sy',
  facebook: 'https://www.facebook.com/simon2sy',
  instagram: 'https://www.instagram.com/simon2sy',
  /** Leave empty until a real address exists — the UI hides it when empty. */
  email: '',
  /** Leave empty until a real profile exists — the UI hides it when empty. */
  linkedin: '',
  /** Hero portrait (WebP — generated from the source photo by scripts/generate-assets.mjs). */
  photo: '/images/projects/simon-shrestha-portrait.webp',
  hero: {
    headlineLead: 'Building useful software',
    headlineAccent: 'for real businesses.',
    intro:
      'I\u2019m Simon Shrestha, a web developer in Nepal building web applications, backend systems, and practical digital products \u2014 from API and database design through to the interfaces people actually use.',
  },
  about: {
    lead:
      'I build practical web applications \u2014 the kind real businesses use to sell products, serve customers, and run day-to-day work.',
    paragraphs: [
      'Most of my work lives on the backend: designing Django applications, shaping REST APIs with Django REST Framework, and modelling data in PostgreSQL so the products on top of them stay reliable. I care about clear interfaces between systems \u2014 well-shaped endpoints, predictable payloads, and authentication that holds up.',
      'I\u2019m equally comfortable wiring those systems into React frontends, so the whole path from database to screen stays in one pair of hands. Everything I know, I\u2019ve learned by shipping real projects: e-commerce stores, business sites, and product frontends that are live and used by actual customers.',
    ],
    facts: [
      { label: 'Based in', value: 'Nepal' },
      { label: 'Focus', value: 'Backend & full-stack web development' },
      { label: 'Toolchain', value: 'Django, DRF, React, PostgreSQL' },
      { label: 'Shipping since', value: '2023' },
    ],
  },
} as const;

export type Profile = typeof profile;
