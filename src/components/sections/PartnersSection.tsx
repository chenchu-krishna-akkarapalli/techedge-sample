import { memo } from 'react';
import { motion } from 'motion/react';
import { Section } from '@/components/common';
import { ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Import partner logos
import bankAlbiladLogo from '@/assets/clients-asset/bankalbilad.svg';
import bupaLogo from '@/assets/clients-asset/bupa.svg';
import indianBankLogo from '@/assets/clients-asset/indianbank.svg';
import nseLogo from '@/assets/clients-asset/nse.svg';

// ============================================================
// Partner Logos Data
// ============================================================

const PARTNER_LOGOS = [
  { id: 'bank-albilad', src: bankAlbiladLogo, alt: 'Bank Albilad' },
  { id: 'bupa', src: bupaLogo, alt: 'Bupa Arabia' },
  { id: 'indian-bank', src: indianBankLogo, alt: 'Indian Bank' },
  { id: 'nse', src: nseLogo, alt: 'NSE' },
] as const;

// ============================================================
// Partners Section
// ============================================================

export const PartnersSection = memo(function PartnersSection() {
  return (
    <Section
      id="partners"
      className="flex flex-col items-center gap-0 pb-0!"
      maxWidth="lg"
    >
      {/* Section Title */}
      <motion.h2
        className={cn(
          'font-crimson font-normal uppercase tracking-[0.15em]',
          'text-[32px] sm:text-[40px] lg:text-[48px] text-black',
          'mb-12 lg:mb-16 text-center'
        )}
        initial={ANIMATIONS.fadeInUp.initial}
        whileInView={ANIMATIONS.fadeInUp.animate}
        viewport={SCROLL_VIEWPORT}
        transition={ANIMATIONS.fadeInUp.transition}
      >
        Our Partners
      </motion.h2>

      {/* Partner Logos with olive tab behind */}
      <motion.div
        className="w-full relative"
        initial={ANIMATIONS.fadeInUp.initial}
        whileInView={ANIMATIONS.fadeInUp.animate}
        viewport={SCROLL_VIEWPORT}
        transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.2 }}
      >
        {/* Olive background tab that extends up behind logos */}
        <div 
          className={cn(
            'absolute left-0 right-0 bottom-0',
            'bg-[#a8b896]',
            'h-[60%] rounded-t-[30px]'
          )}
          aria-hidden="true"
        />
        
        {/* Logos container */}
        <div
          className={cn(
            'relative z-10',
            'flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16',
            'w-full py-8 sm:py-12',
            'bg-[#f9f8f6] rounded-[20px]',
            'mx-auto max-w-[90%]'
          )}
        >
          {PARTNER_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center h-12 sm:h-16"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain max-w-[120px] sm:max-w-[150px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section with olive background */}
      <motion.div
        className={cn(
          'w-full',
          'bg-[#a8b896]',
          'px-8 sm:px-12 lg:px-16 py-12 sm:py-16'
        )}
        initial={ANIMATIONS.fadeInUp.initial}
        whileInView={ANIMATIONS.fadeInUp.animate}
        viewport={SCROLL_VIEWPORT}
        transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.3 }}
      >
        <div className="max-w-[900px]">
          {/* CTA Heading */}
          <h3
            className={cn(
              'font-dm-sans font-medium uppercase tracking-widest',
              'text-sm sm:text-base text-black/80',
              'mb-2'
            )}
          >
            LET'S BUILD THE EDGE OF YOUR DIGITAL FUTURE.
          </h3>
          <p
            className={cn(
              'font-dm-sans font-normal uppercase tracking-[0.05em]',
              'text-sm sm:text-base text-black/70',
              'mb-8'
            )}
          >
            TALK TO OUR TEAM TODAY TO EXPLORE SOLUTIONS ENGINEERED FOR INNOVATION,
            SECURITY, AND GROWTH.
          </p>

          {/* Contact Button */}
          <a
            href="#contact"
            className={cn(
              'inline-flex items-center justify-center',
              'bg-white hover:bg-gray-100 text-black',
              'px-8 py-3',
              'border border-black/20 rounded-md',
              'font-dm-sans font-medium uppercase tracking-widest text-sm',
              'transition-colors'
            )}
          >
            Contact Us
          </a>
        </div>
      </motion.div>
    </Section>
  );
});
