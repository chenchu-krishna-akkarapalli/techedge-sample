import { memo } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// Footer Navigation Items
// ============================================================

const FOOTER_NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#about' },
  { label: 'SERVICES & SOLUTIONS', href: '#benefits' },
  { label: 'contact us', href: '#contact' },
] as const;

// ============================================================
// Social Media Icons
// ============================================================

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ============================================================
// Location and Email Icons
// ============================================================

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
);

// ============================================================
// Footer Component
// ============================================================

export const Footer = memo(function Footer() {
  return (
    <footer className="w-full bg-[#e8e8e8]">
      {/* Main Footer Content */}
      <div className={cn(
        'max-w-[1500px] mx-auto',
        'px-4 sm:px-6 lg:px-10',
        'py-12 sm:py-16'
      )}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: Tech Edge Info */}
          <div className="flex flex-col gap-6">
            <h3 className={cn(
              'font-dm-sans font-bold uppercase tracking-widest',
              'text-base sm:text-lg text-black'
            )}>
              TECH EDGE
            </h3>
            <p className={cn(
              'font-dm-sans font-normal leading-relaxed',
              'text-gray-600 text-[15px] tracking-tight'
            )}
            style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Empowering enterprises through innovative, secure, and scalable technology solutions aligned with Saudi Vision 2030
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-black transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-700 hover:text-black transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-black transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-black transition-colors">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            {FOOTER_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-2',
                  'font-dm-sans font-normal',
                  'text-gray-700 hover:text-black text-[15px]',
                  'transition-colors'
                )}
              >
                <ChevronRightIcon />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col gap-6">
            <h3 className={cn(
              'font-dm-sans font-bold uppercase tracking-widest',
              'text-base sm:text-lg text-black'
            )}>
              CONTACT US
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <LocationIcon />
                <span className={cn(
                  'font-dm-sans font-normal',
                  'text-gray-700 text-[15px]'
                )}>
                  Riyadh, Saudi Arabia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <EmailIcon />
                <a 
                  href="mailto:info@techedge.sa"
                  className={cn(
                    'font-dm-sans font-normal',
                    'text-gray-700 hover:text-black text-[15px]',
                    'transition-colors'
                  )}
                >
                  info@techedge.sa
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="w-full border-t border-gray-300">
        <div className={cn(
          'max-w-[1500px] mx-auto',
          'px-4 sm:px-6 lg:px-10',
          'py-4 sm:py-6',
          'flex flex-col sm:flex-row items-center justify-between gap-4'
        )}>
          {/* Copyright */}
          <p className={cn(
            'font-dm-sans font-normal uppercase tracking-[0.05em]',
            'text-gray-600 text-xs sm:text-sm'
          )}>
            © ALL RIGHTS RESERVED BY TECH EDGE
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <a 
              href="#privacy"
              className={cn(
                'font-dm-sans font-normal uppercase tracking-[0.05em]',
                'text-gray-600 hover:text-black text-xs sm:text-sm',
                'transition-colors'
              )}
            >
              PRIVACY POLICY
            </a>
            <a 
              href="#terms"
              className={cn(
                'font-dm-sans font-normal uppercase tracking-[0.05em]',
                'text-gray-600 hover:text-black text-xs sm:text-sm',
                'transition-colors'
              )}
            >
              TERM OF USE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

// ============================================================
// Footer Credits (kept for backwards compatibility)
// ============================================================

export const FooterCredits = memo(function FooterCredits() {
  return null;
});
