import { memo } from 'react';
import { motion } from 'motion/react';
import { Section } from '@/components/common';
import { OUR_GOALS, ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { cn, getStaggerDelay } from '@/lib/utils';

// ============================================================
// Goal Icons SVG Components
// ============================================================

const GoalIcons = {
  globe: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none"/>
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M6 24h36M24 6v36" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 16h32M8 32h32" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  handshake: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28l6-6 4 2 6-6 4 4-8 8-4-2-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 28l-6-6-4 2-6-6-4 4 8 8 4-2 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 34l4 4M20 36l4 4M30 34l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  lightbulb: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6a12 12 0 00-8 21v5h16v-5a12 12 0 00-8-21z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M18 36h12v4a2 2 0 01-2 2h-8a2 2 0 01-2-2v-4z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 32v-6l4-4 4 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="18" r="2" fill="currentColor"/>
      <path d="M30 8l2-2M18 8l-2-2M36 18h3M9 18h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  leaf: () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 40V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 24c-8-8-8-16 0-18s16 4 16 12-8 14-16 6z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M16 28c-4 4-4 8 0 10s8-2 8-6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M24 24l8-8M24 28l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

// ============================================================
// Our Goals Section
// ============================================================

export const FeaturesSection = memo(function FeaturesSection() {
  return (
    <Section 
      className="relative overflow-hidden"
      maxWidth="full"
    >
      <div className="relative w-full min-h-[700px] lg:min-h-[600px]">
        {/* Dark tech background - positioned behind */}
        <div 
          className={cn(
            'absolute inset-0 bg-[#1a2e1a]'
          )}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(72, 92, 17, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(72, 92, 17, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 100%)
            `,
          }}
        >
          {/* Circuit pattern overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80' stroke='%23485C11' fill='none' stroke-width='0.5'/%3E%3Ccircle cx='90' cy='10' r='3' fill='%23485C11'/%3E%3Ccircle cx='10' cy='90' r='3' fill='%23485C11'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Decorative dots */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#485C11] opacity-60" />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-[#485C11] opacity-40" />
          <div className="absolute bottom-1/3 right-1/2 w-2 h-2 rounded-full bg-[#485C11] opacity-50" />
        </div>

        {/* Left Content: Goals Grid with olive background - overlays on top */}
        <div 
          className={cn(
            'relative z-10 bg-[#a8b896]',
            'py-16 px-8 lg:px-16',
            'w-full lg:w-[65%]',
            'min-h-[700px] lg:min-h-[600px]'
          )}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          }}
        >
          <GoalsContent />
        </div>
      </div>
    </Section>
  );
});

// ============================================================
// Goals Content (Left Side)
// ============================================================

const GoalsContent = memo(function GoalsContent() {
  return (
    <div className="max-w-[650px]">
      {/* Section Title */}
      <motion.h2
        className={cn(
          'font-crimson font-normal uppercase tracking-[0.2em]',
          'text-[28px] sm:text-[36px] lg:text-[42px] text-black',
          'mb-10 lg:mb-12 text-center lg:text-left'
        )}
        initial={ANIMATIONS.fadeInUp.initial}
        whileInView={ANIMATIONS.fadeInUp.animate}
        viewport={SCROLL_VIEWPORT}
        transition={ANIMATIONS.fadeInUp.transition}
      >
        Our Goals
      </motion.h2>

      {/* Goals Grid - 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {OUR_GOALS.map((goal, index) => (
          <GoalCard key={goal.id} goal={goal} index={index} />
        ))}
      </div>
    </div>
  );
});

// ============================================================
// Goal Card
// ============================================================

interface GoalCardProps {
  goal: typeof OUR_GOALS[number];
  index: number;
}

const GoalCard = memo(function GoalCard({ goal, index }: GoalCardProps) {
  const IconComponent = GoalIcons[goal.icon as keyof typeof GoalIcons];

  return (
    <motion.article
      className="flex flex-col items-center lg:items-start text-center lg:text-left"
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      viewport={SCROLL_VIEWPORT}
      transition={{
        ...ANIMATIONS.fadeInUp.transition,
        delay: getStaggerDelay(index),
      }}
    >
      {/* Icon */}
      <div className="text-black mb-4">
        {IconComponent && <IconComponent />}
      </div>

      {/* Title */}
      <h3 
        className={cn(
          'font-crimson leading-none',
          'text-base sm:text-lg text-black tracking-tight w-full'
        )}
      >
        {goal.title}
      </h3>

      {/* Description */}
      <p 
        className={cn(
          'font-dm-sans font-normal leading-relaxed',
          'text-gray-500 text-[15px] tracking-tight w-full mt-4'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        {goal.description}
      </p>
    </motion.article>
  );
});


