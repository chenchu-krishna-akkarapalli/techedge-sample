import { memo } from 'react';
import { motion } from 'motion/react';
import { Section, SecondaryButton } from '@/components/common';
import { STEPS, ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { cn, getStaggerDelay } from '@/lib/utils';
import type { Step } from '@/types';

// ============================================================
// How It Works Section
// ============================================================

export const HowItWorksSection = memo(function HowItWorksSection() {
  return (
    <Section 
      id="how-to"
      className={cn(
        'flex flex-col gap-12 sm:gap-20',
        'items-start pt-16 sm:pt-20'
      )}
      maxWidth="lg"
      topBorder
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative shrink-0 w-full">
        <h2 
          className={cn(
            'font-crimson leading-[0.9]',
            'text-[36px] sm:text-[48px] lg:text-[60px] text-black text-center',
            'tracking-[-1.08px] sm:tracking-[-1.44px] lg:tracking-[-1.8px] whitespace-nowrap'
          )}
        >
          Map Your Success
        </h2>
        <SecondaryButton>Discover More</SecondaryButton>
      </div>

      {/* Steps Grid */}
      <div 
        className={cn(
          'flex flex-col sm:flex-row gap-5',
          'items-start justify-center w-full'
        )}
      >
        {STEPS.map((step, index) => (
          <StepCard 
            key={step.id} 
            step={step} 
            index={index} 
          />
        ))}
      </div>
    </Section>
  );
});

// ============================================================
// Step Card
// ============================================================

interface StepCardProps {
  step: Step;
  index: number;
}

const StepCard = memo(function StepCard({ step, index }: StepCardProps) {
  return (
    <motion.article
      aria-label={`Step ${index + 1} of ${STEPS.length}`}
      className={cn(
        'basis-0 grow min-h-px min-w-[220px] sm:min-w-[240px]',
        'relative shrink-0'
      )}
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      viewport={SCROLL_VIEWPORT}
      transition={{
        ...ANIMATIONS.fadeInUp.transition,
        delay: getStaggerDelay(index),
      }}
    >
      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute border-t border-gray-200 inset-0 pointer-events-none"
      />

      <div className="min-w-inherit size-full">
        <div 
          className={cn(
            'box-border flex flex-col gap-10 sm:gap-[60px]',
            'items-start min-w-inherit',
            'pb-5 pl-0 pr-4 sm:pr-[30px] pt-10 sm:pt-[60px]',
            'relative w-full'
          )}
        >
          {/* Step Number */}
          <p 
            className={cn(
              'font-dm-sans font-normal leading-none',
              'text-gray-400 text-5xl sm:text-[80px]',
              'tracking-[-1.92px] sm:tracking-[-3.2px] w-full'
            )}
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            {step.number}
          </p>

          {/* Step Content */}
          <div className="flex flex-col gap-4 sm:gap-5 items-start relative shrink-0 w-full">
            <h3 
              className={cn(
                'font-crimson leading-none',
                'text-base sm:text-lg text-black tracking-tight w-full'
              )}
            >
              {step.title}
            </h3>
            <p 
              className={cn(
                'font-dm-sans font-normal leading-relaxed',
                'text-gray-500 text-[15px] tracking-tight w-full'
              )}
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
