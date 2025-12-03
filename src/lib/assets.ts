// ============================================================
// Asset Imports - Centralized image imports
// ============================================================

// Hero Section
import imgInnerScreenImport from 'figma:asset/2b19803f6c5e3c26b39f607fe129d1919300df81.png';
import imgHeroImageImport from 'figma:asset/27594e92b9b432843319210cddc6514b6ee87450.png';

// Partner Logos
import imgLogo1Import from 'figma:asset/7e2cb6a493f6974234a10a9155f5a9e61358668d.png';
import imgLogo2Import from 'figma:asset/4ec63af28a6d626d15af88690afce1177f7da2aa.png';
import imgLogo3Import from 'figma:asset/22502dfc1e4e8a242285d42db1a38e6e853633fc.png';
import imgLogo4Import from 'figma:asset/ab60fb89b643e72e94769301b2a7ea53c2788495.png';
import imgLogo5Import from 'figma:asset/5353f37898f8daa86c3f3f525e94362e62de8b6a.png';
import imgLogo6Import from 'figma:asset/262ae2257b7f47685a1fd90f0f27d6372a2bca23.png';

// Feature Images
import imgColumnsRenderImport from 'figma:asset/8c5a21adadebacbd69375684275fb89819b4d967.png';

// Testimonial Image
import imgTestimonialImport from 'figma:asset/7d21c327f1e7740ce9c46cd595065dccfdcec99a.png';

// CTA Section Image
import imgLandscapeImport from 'figma:asset/de5a74711b655d5394631256a2e65f4f4b7e3f42.png';

// Re-export with cleaner names
export const imgInnerScreen = imgInnerScreenImport;
export const imgHeroImage = imgHeroImageImport;
export const imgLogo1 = imgLogo1Import;
export const imgLogo2 = imgLogo2Import;
export const imgLogo3 = imgLogo3Import;
export const imgLogo4 = imgLogo4Import;
export const imgLogo5 = imgLogo5Import;
export const imgLogo6 = imgLogo6Import;
export const imgColumnsRender = imgColumnsRenderImport;
export const imgTestimonial = imgTestimonialImport;
export const imgLandscape = imgLandscapeImport;

// Partner logos array for easy mapping
export const partnerLogos = [
  { id: 'logo-1', src: imgLogo1, alt: 'Partner Logo 1' },
  { id: 'logo-2', src: imgLogo2, alt: 'Partner Logo 2' },
  { id: 'logo-3', src: imgLogo3, alt: 'Partner Logo 3' },
  { id: 'logo-4', src: imgLogo4, alt: 'Partner Logo 4' },
  { id: 'logo-5', src: imgLogo5, alt: 'Partner Logo 5' },
  { id: 'logo-6', src: imgLogo6, alt: 'Partner Logo 6' },
] as const;
