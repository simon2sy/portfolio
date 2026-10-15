export type ProjectSpan = 'wide' | 'narrow' | 'full';

export interface Project {
  id: string;
  index: string;
  name: string;
  kind: string;
  description: string;
  highlights: string[];
  tech: string[];
  liveUrl: string;
  /** Repository link — present only where the matching repo was verified. */
  repoUrl: string | null;
  image: {
    src: string;
    alt: string;
  };
  span: ProjectSpan;
}

/**
 * Every fact below was verified against the live sites and the matching
 * public repositories on github.com/simon2sy (Oct 2026).
 */
export const projects: Project[] = [
  {
    id: 'nismita-craft-studio',
    index: '01',
    name: 'Nismita Craft Studio',
    kind: 'E-commerce platform',
    description:
      'A full storefront for a Kathmandu candle-supplies studio \u2014 catalogue with live stock, wishlists, cart, customer accounts, and order handling behind a Django REST API.',
    highlights: [
      'Catalogue, cart and wishlists with per-product stock counts',
      'Customer accounts secured with JWT (SimpleJWT)',
      'Orders, accounts and catalog split into Django apps',
    ],
    tech: ['Django', 'Django REST Framework', 'PostgreSQL', 'JWT', 'Python'],
    liveUrl: 'https://nismitacraftstudio.com/',
    repoUrl: 'https://github.com/simon2sy/candleproject',
    image: {
      src: '/images/projects/nismita-craft-studio.webp',
      alt: 'Nismita Craft Studio homepage \u2014 candle-making supplies shop built with Django',
    },
    span: 'wide',
  },
  {
    id: 'daju-bhai-grill-udyog',
    index: '02',
    name: 'Daju Bhai Grill Udyog',
    kind: 'Product & enquiry site',
    description:
      'Website for a Jhapa thresher manufacturer \u2014 interactive 3D machine scene, real pricing and enquiry flow, wrapped in local-business SEO.',
    highlights: [
      '3D thresher rendered with React Three Fiber',
      'Structured data (LocalBusiness / Product) for local search',
      'Typed Vite + React frontend with Tailwind',
    ],
    tech: ['React', 'Three.js', 'R3F', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://dajubhaigrilludyog.duckdns.org/',
    repoUrl: 'https://github.com/simon2sy/thresherproject',
    image: {
      src: '/images/projects/daju-bhai-grill-udyog.webp',
      alt: 'Daju Bhai Grill Udyog website \u2014 thresher machines for sale in Jhapa, Nepal',
    },
    span: 'narrow',
  },
  {
    id: 'trust-nepal-suppliers',
    index: '03',
    name: 'Trust Nepal Suppliers',
    kind: 'Business website',
    description:
      'Marketing site for a Bhadrapur-based import company \u2014 services, an import price calculator, FAQs, reviews and enquiry forms built around search intent.',
    highlights: [
      'Import price calculator with live estimates',
      'Services, FAQ and review sections with enquiry forms',
      'SEO structure targeting import/export searches',
    ],
    tech: ['JavaScript', 'Bootstrap', 'Three.js', 'SEO'],
    liveUrl: 'https://trustnepalsuppliers.com/',
    repoUrl: 'https://github.com/simon2sy/trustnepal',
    image: {
      src: '/images/projects/trust-nepal-suppliers.webp',
      alt: 'Trust Nepal Suppliers website \u2014 import company based in Bhadrapur, Jhapa',
    },
    span: 'narrow',
  },
  {
    id: 'lachi-by-pradhan',
    index: '04',
    name: 'Lachi by Pradhan',
    kind: 'Restaurant website',
    description:
      'Single-page restaurant site for Lachi in Bhadrapur \u2014 menu, gallery and contact, with Restaurant schema markup and scroll-driven reveals.',
    highlights: [
      'Menu, gallery and reservation details in one page',
      'Restaurant +Breadcrumb schema for local search',
      'Scroll-reveal motion tuned for mobile',
    ],
    tech: ['React', 'Vite', 'JSON-LD', 'AOS'],
    liveUrl: 'https://lachibypradhan.netlify.app/',
    repoUrl: 'https://github.com/simon2sy/Lachi',
    image: {
      src: '/images/projects/lachi-by-pradhan.webp',
      alt: 'Lachi by Pradhan restaurant website \u2014 authentic Nepali flavours in Bhadrapur',
    },
    span: 'wide',
  },
  {
    id: 'trust-nepal-technologies',
    index: '05',
    name: 'Trust Nepal Technologies',
    kind: 'Studio website',
    description:
      'Public site for Trust Nepal Technologies \u2014 the small studio behind several of these projects, building websites, apps and custom software for businesses.',
    highlights: [
      'Service-led landing page for web, app and software work',
      'Project showcase with social preview image',
      'Deployed on Vercel with atomic builds',
    ],
    tech: ['React', 'Vite', 'JavaScript'],
    liveUrl: 'https://trust-nepal-technologies.vercel.app/',
    repoUrl: 'https://github.com/simon2sy/TrustNepalTechnologies',
    image: {
      src: '/images/projects/trust-nepal-technologies.webp',
      alt: 'Trust Nepal Technologies website \u2014 web, app and software development studio',
    },
    span: 'full',
  },
];
