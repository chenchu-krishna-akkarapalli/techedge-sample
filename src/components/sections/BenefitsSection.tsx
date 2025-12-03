import { memo } from 'react';
import { motion } from 'motion/react';
import { Section, SectionHeader, BenefitIcon, Button } from '@/components/common';
import { BENEFITS, ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { cn, getStaggerDelay } from '@/lib/utils';
import type { Benefit } from '@/types';

// ============================================================
// Benefits Section
// ============================================================

export const BenefitsSection = memo(function BenefitsSection() {
  return (
    <Section 
      id="benefits"
      className="flex flex-col items-start gap-0"
      maxWidth="lg"
    >
      {/* Headline and Icons Grid */}
      <section 
        className={cn(
          'box-border flex flex-col gap-[30px] sm:gap-[50px]',
          'items-start pb-10 sm:pb-[60px] pt-16 sm:pt-20',
          'px-0 relative shrink-0 w-full'
        )}
      >
        {/* Top border */}
        <div
          aria-hidden="true"
          className="absolute border-t-[0.5px] border-gray-200 inset-0 pointer-events-none"
        />

        {/* Section Header */}
        <SectionHeader
          // label="Benefits"
          title="Our Services & Solutions."
          // description="Area provides real insights, without the data overload."
        />

        {/* Benefits Grid */}
        <BenefitsGrid />

        {/* Explore More Button */}
        <motion.div
          className="flex justify-center w-full pt-8 sm:pt-12"
          initial={ANIMATIONS.fadeInUp.initial}
          whileInView={ANIMATIONS.fadeInUp.animate}
          viewport={SCROLL_VIEWPORT}
          transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.3 }}
        >
          <Button
            variant="primary"
            href="#contact"
            className="bg-[#485C11] hover:bg-[#3a4a0e] text-white px-8 py-3 rounded-full"
          >
            Explore More
          </Button>
        </motion.div>
      </section>
    </Section>
  );
});

// ============================================================
// Benefits Grid
// ============================================================

const BenefitsGrid = memo(function BenefitsGrid() {
  return (
    <div 
      className={cn(
        'box-border flex flex-wrap gap-4 sm:gap-5',
        'items-start pt-6 sm:pt-10 relative shrink-0 w-full'
      )}
    >
      {BENEFITS.map((benefit, index) => (
        <BenefitCard 
          key={benefit.id} 
          benefit={benefit} 
          index={index} 
        />
      ))}
    </div>
  );
});

// ============================================================
// Individual Benefit Card
// ============================================================

interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

const BenefitCard = memo(function BenefitCard({ benefit, index }: BenefitCardProps) {
  return (
    <motion.article
      aria-label={`Area product benefit ${index + 1} of ${BENEFITS.length}`}
      className={cn(
        'basis-0 grow min-h-px min-w-[240px] sm:min-w-[265px]',
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
            'box-border flex flex-col gap-5 sm:gap-6',
            'items-start min-w-inherit',
            'pl-0 pr-4 sm:pr-5 py-8 sm:py-10',
            'relative w-full'
          )}
        >
          {/* Icon */}
          <BenefitIcon type={benefit.icon as 'cable' | 'earth' | 'account' | 'chart'} />

          {/* Text Content */}
          <div className="flex flex-col gap-4 sm:gap-5 items-start relative shrink-0 w-full">
            <h3 
              className={cn(
                'font-crimson leading-none',
                'text-base sm:text-lg text-black tracking-tight w-full'
              )}
            >
              {benefit.title}
            </h3>
            <p 
              className={cn(
                'font-dm-sans font-normal leading-relaxed',
                'text-gray-500 text-[15px] tracking-tight w-full'
              )}
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              {benefit.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
