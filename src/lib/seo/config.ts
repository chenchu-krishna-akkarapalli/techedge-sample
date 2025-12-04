// ============================================================
// SEO Configuration - Tech Edge
// Comprehensive SEO metadata for all pages
// ============================================================

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article' | 'product';
  twitterCard: 'summary' | 'summary_large_image';
  jsonLd: object;
}

// Base URL for the website
export const SITE_URL = 'https://www.techedge.sa';

// Default SEO configuration
export const DEFAULT_SEO: SEOConfig = {
  title: 'Tech Edge | Digital Transformation & IT Solutions in Saudi Arabia',
  description: 'Tech Edge is a leading digital transformation and IT consulting company in Saudi Arabia. We specialize in SaaS development, cloud solutions, API integration, microservices architecture, and enterprise digital solutions. Transform your business with our expert technology services.',
  keywords: [
    'Tech Edge',
    'digital transformation',
    'IT consulting',
    'Saudi Arabia',
    'SaaS development',
    'cloud solutions',
    'API integration',
    'microservices',
    'enterprise solutions',
    'software development',
    'DevOps',
    'cloud migration',
    'Riyadh',
    'KSA',
    'technology partner',
    'IT services',
    'business automation',
    'digital strategy',
  ],
  canonical: SITE_URL,
  ogImage: `${SITE_URL}/og-image.jpg`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  jsonLd: {},
};

// Page-specific SEO configurations
export const PAGE_SEO: Record<string, Partial<SEOConfig>> = {
  home: {
    title: 'Tech Edge | Digital Transformation & IT Solutions in Saudi Arabia',
    description: 'Transform your business with Tech Edge - Saudi Arabia\'s premier digital transformation partner. Expert SaaS development, cloud solutions, API integration, and enterprise IT services.',
    canonical: SITE_URL,
  },
  about: {
    title: 'About Tech Edge | Our Mission, Vision & Values | IT Company Saudi Arabia',
    description: 'Learn about Tech Edge\'s mission to drive digital transformation in Saudi Arabia. Discover our experienced team, core values, and commitment to delivering innovative IT solutions.',
    keywords: [
      ...DEFAULT_SEO.keywords,
      'about Tech Edge',
      'IT company history',
      'technology team',
      'company values',
      'Saudi tech company',
    ],
    canonical: `${SITE_URL}/about`,
  },
  services: {
    title: 'IT Services & Solutions | SaaS, Cloud, API Integration | Tech Edge',
    description: 'Explore Tech Edge\'s comprehensive IT services: SaaS product development, API & microservices architecture, cloud implementation, digital transformation consulting, and staff augmentation.',
    keywords: [
      ...DEFAULT_SEO.keywords,
      'SaaS product development',
      'API development',
      'microservices architecture',
      'cloud implementation',
      'digital consulting',
      'staff augmentation',
      'QA testing',
      'iPaaS solutions',
    ],
    canonical: `${SITE_URL}/services`,
  },
  contact: {
    title: 'Contact Tech Edge | Get in Touch | IT Consulting Saudi Arabia',
    description: 'Contact Tech Edge for your digital transformation needs. Reach our team in Riyadh, Saudi Arabia for SaaS development, cloud solutions, and IT consulting services.',
    keywords: [
      ...DEFAULT_SEO.keywords,
      'contact Tech Edge',
      'IT consulting contact',
      'Riyadh IT company',
      'get quote',
      'technology consultation',
    ],
    canonical: `${SITE_URL}/contact`,
  },
};

// Organization Schema.org JSON-LD
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Tech Edge',
  alternateName: 'TechEdge',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description: DEFAULT_SEO.description,
  email: 'info@techedge.sa',
  telephone: '+966-XX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressRegion: 'Riyadh Province',
    addressCountry: 'SA',
    postalCode: '12345',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.7136,
    longitude: 46.6753,
  },
  sameAs: [
    'https://www.linkedin.com/company/techedge-sa',
    'https://twitter.com/techedge_sa',
    'https://www.facebook.com/techedgesa',
  ],
  foundingDate: '2020',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 50,
    maxValue: 200,
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 24.7136,
        longitude: 46.6753,
      },
      geoRadius: '2000',
    },
  ],
  knowsAbout: [
    'Digital Transformation',
    'SaaS Development',
    'Cloud Computing',
    'API Integration',
    'Microservices Architecture',
    'DevOps',
    'IT Consulting',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SaaS Product Development',
          description: 'Build scalable, cloud-native SaaS applications with modern architecture and best practices.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'API & Microservices Architecture',
          description: 'Design and implement robust APIs and microservices for seamless system integration.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cloud Environment Implementation',
          description: 'Multi-cloud management, DevOps excellence, and infrastructure automation.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Transformation Consulting',
          description: 'Business-aligned roadmaps, process automation, and compliance solutions.',
        },
      },
    ],
  },
};

// Website Schema.org JSON-LD
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Tech Edge',
  description: DEFAULT_SEO.description,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  ],
  inLanguage: ['en', 'ar'],
};

// Breadcrumb generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Service Schema generator
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.name,
  name: service.name,
  description: service.description,
  url: service.url,
  provider: {
    '@id': `${SITE_URL}/#organization`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Saudi Arabia',
  },
});

// FAQ Schema generator
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Local Business Schema (for contact page)
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Tech Edge',
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: '+966-XX-XXX-XXXX',
  email: 'info@techedge.sa',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'King Fahd Road',
    addressLocality: 'Riyadh',
    addressRegion: 'Riyadh Province',
    postalCode: '12345',
    addressCountry: 'SA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 24.7136,
    longitude: 46.6753,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$$',
};
