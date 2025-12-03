import { memo } from 'react';
import { motion } from 'motion/react';
import { Section, CTAButton } from '@/components/common';
import { ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { imgLandscape } from '@/lib/assets';
import { cn } from '@/lib/utils';

// ============================================================
// CTA Section (Hero Image + Call to Action)
// ============================================================

export const CTASection = memo(function CTASection() {
  return (
    <>
      {/* Hero Image */}
      <HeroImageCTA />

      {/* Centered CTA */}
      <CenteredCTA />
    </>
  );
});

// ============================================================
// Hero Image for CTA
// ============================================================

const HeroImageCTA = memo(function HeroImageCTA() {
  return (
    <div 
      className={cn(
        'box-border flex flex-col gap-2.5',
        'items-center pb-8 sm:pb-10 pt-0 px-0',
        'relative shrink-0 w-full'
      )}
    >
      <motion.div
        aria-label="Image showing a winding path going up a mountain"
        className={cn(
          'aspect-[1120/620] flex gap-2.5',
          'items-start max-h-[600px] sm:max-h-[830.357px] max-w-[1500px]',
          'overflow-clip relative rounded-[20px] sm:rounded-[30px]',
          'shrink-0 w-full'
        )}
        initial={ANIMATIONS.fadeInScale.initial}
        whileInView={ANIMATIONS.fadeInScale.animate}
        viewport={SCROLL_VIEWPORT}
        transition={ANIMATIONS.fadeInScale.transition}
      >
        <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
          <img
            src={imgLandscape}
            alt="An eye-catching landscape of green"
            className={cn(
              'absolute inset-0 size-full',
              'max-w-none object-cover object-center pointer-events-none'
            )}
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </div>
  );
});

// ============================================================
// Centered CTA Section
// ============================================================

const CenteredCTA = memo(function CenteredCTA() {
  return (
    <Section 
      id="contact"
      maxWidth="lg"
      padding="none"
      className="relative"
    >
      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute border-t-[0.5px] border-gray-200 inset-0 pointer-events-none"
      />

      <div className="flex flex-col items-center max-w-inherit size-full">
        <div 
          className={cn(
            'box-border flex flex-col gap-8 sm:gap-10',
            'items-center max-w-inherit',
            'px-4 sm:px-20 lg:px-[300px] py-16 sm:py-20 lg:py-[120px]',
            'relative w-full'
          )}
        >
          {/* Title */}
          <h2 
            className={cn(
              'font-crimson leading-[0.9]',
              'text-[36px] sm:text-[48px] lg:text-[60px] text-black text-center',
              'tracking-[-1.08px] sm:tracking-[-1.44px] lg:tracking-[-1.8px] w-full'
            )}
          >
            Connect with us
          </h2>

          {/* Description */}
          <p 
            className={cn(
              'font-dm-sans font-normal leading-relaxed',
              'text-gray-500 text-[15px] text-center tracking-tight w-full',
              'max-w-xl'
            )}
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Schedule a quick call to learn how Area can turn your regional data into a powerful advantage.
          </p>

          {/* CTA Button - Full Width */}
          <CTAButton fullWidth className="max-w-md">
            Learn More
          </CTAButton>
        </div>
      </div>
    </Section>
  );
});
