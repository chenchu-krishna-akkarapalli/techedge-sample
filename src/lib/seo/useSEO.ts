// ============================================================
// SEO Hook - Dynamic Meta Tag Management
// ============================================================

import { useEffect } from 'react';
import {
  DEFAULT_SEO,
  PAGE_SEO,
  SITE_URL,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  generateBreadcrumbSchema,
  type SEOConfig,
} from './config';

interface UseSEOOptions {
  page?: keyof typeof PAGE_SEO;
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  breadcrumbs?: { name: string; url: string }[];
  additionalSchema?: object[];
  noIndex?: boolean;
}

export function useSEO(options: UseSEOOptions = {}) {
  const {
    page,
    customTitle,
    customDescription,
    customImage,
    breadcrumbs,
    additionalSchema = [],
    noIndex = false,
  } = options;

  useEffect(() => {
    // Get page-specific config or use defaults
    const pageConfig = page ? PAGE_SEO[page] : {};
    const config: SEOConfig = {
      ...DEFAULT_SEO,
      ...pageConfig,
    };

    // Apply custom overrides
    const title = customTitle || config.title;
    const description = customDescription || config.description;
    const image = customImage || config.ogImage;
    const canonical = config.canonical;

    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (
      selector: string,
      content: string,
      _attribute: 'name' | 'property' = 'name'
    ) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        const attrName = selector.includes('property=') ? 'property' : 'name';
        const attrValue = selector.match(/(?:name|property)="([^"]+)"/)?.[1];
        if (attrValue) {
          element.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update standard meta tags
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[name="keywords"]', config.keywords.join(', '));

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:image"]', image);
    updateMeta('meta[property="og:url"]', canonical);
    updateMeta('meta[property="og:type"]', config.ogType);

    // Update Twitter Card tags
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', image);
    updateMeta('meta[name="twitter:card"]', config.twitterCard);

    // Update canonical link
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Handle noindex
    let robotsMeta = document.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      'content',
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Build JSON-LD scripts
    const schemas: object[] = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];

    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbSchema(breadcrumbs));
    }

    // Add any additional schemas
    schemas.push(...additionalSchema);

    // Remove existing JSON-LD scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());

    // Add new JSON-LD scripts
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      // JSON-LD will be replaced by next page, no need to remove
    };
  }, [page, customTitle, customDescription, customImage, breadcrumbs, additionalSchema, noIndex]);
}

// Pre-built page SEO hooks for convenience
export const useHomeSEO = () =>
  useSEO({
    page: 'home',
    breadcrumbs: [{ name: 'Home', url: SITE_URL }],
  });

export const useAboutSEO = () =>
  useSEO({
    page: 'about',
    breadcrumbs: [
      { name: 'Home', url: SITE_URL },
      { name: 'About Us', url: `${SITE_URL}/about` },
    ],
  });

export const useServicesSEO = () =>
  useSEO({
    page: 'services',
    breadcrumbs: [
      { name: 'Home', url: SITE_URL },
      { name: 'Services & Solutions', url: `${SITE_URL}/services` },
    ],
  });

export const useContactSEO = () =>
  useSEO({
    page: 'contact',
    breadcrumbs: [
      { name: 'Home', url: SITE_URL },
      { name: 'Contact Us', url: `${SITE_URL}/contact` },
    ],
  });
