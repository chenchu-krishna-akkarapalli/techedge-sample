import { memo, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';

// ============================================================
// Section Wrapper Component
// ============================================================

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Maximum width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  /** Vertical padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to add a top border */
  topBorder?: boolean;
  /** ARIA label for the section */
  'aria-label'?: string;
  /** Semantic HTML element */
  as?: 'section' | 'div' | 'article';
}

const maxWidthStyles: Record<string, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-[1500px]',
  xl: 'max-w-[1600px]',
  full: 'w-full',
  none: '',
};

const paddingStyles: Record<string, string> = {
  none: 'py-0',
  sm: 'py-10',
  md: 'py-20',
  lg: 'pb-[120px] pt-0',
  xl: 'py-[120px]',
};

export const Section = memo(function Section({
  id,
  children,
  className,
  maxWidth = 'lg',
  padding = 'lg',
  topBorder = false,
  'aria-label': ariaLabel,
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        'box-border relative shrink-0 w-full',
        maxWidthStyles[maxWidth],
        paddingStyles[padding],
        className
      )}
      aria-label={ariaLabel}
    >
      {topBorder && (
        <div
          aria-hidden="true"
          className="absolute border-t border-gray-200 inset-0 pointer-events-none"
        />
      )}
      {children}
    </Component>
  );
});

// ============================================================
// Animated Section Wrapper
// ============================================================

interface AnimatedSectionProps extends SectionProps {
  /** Animation type */
  animation?: 'fadeInUp' | 'fadeInScale' | 'fadeInRight';
  /** Animation delay in seconds */
  delay?: number;
}

export const AnimatedSection = memo(function AnimatedSection({
  animation = 'fadeInUp',
  delay = 0,
  children,
  ...props
}: AnimatedSectionProps) {
  const animConfig = ANIMATIONS[animation];
  
  return (
    <Section {...props}>
      <motion.div
        initial={animConfig.initial}
        whileInView={animConfig.animate}
        viewport={SCROLL_VIEWPORT}
        transition={{ ...animConfig.transition, delay }}
      >
        {children}
      </motion.div>
    </Section>
  );
});

// ============================================================
// Section Header Component
// ============================================================

interface SectionHeaderProps {
  /** Small label above the title */
  label?: string;
  /** Main title */
  title: string;
  /** Description text */
  description?: string;
  /** Center the text */
  centered?: boolean;
  /** Additional className */
  className?: string;
}

export const SectionHeader = memo(function SectionHeader({
  label,
  title,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[40px] lg:gap-[50px] relative shrink-0 w-full',
        centered && 'items-center text-center',
        !centered && 'items-start',
        className
      )}
    >
      {label && (
        <h2 className="font-roboto-mono font-normal leading-relaxed text-brand-green text-xs tracking-tight">
          {label}
        </h2>
      )}
      
      {/* Title and Description Row */}
      <div className={cn(
        'flex flex-col lg:flex-row gap-6 lg:gap-[80px] w-full',
        centered ? 'items-center justify-center' : 'items-start justify-between'
      )}>
        <p className={cn(
          'font-crimson leading-[0.9] text-black tracking-tight shrink-0',
          // Responsive font size
          'text-[36px] md:text-[48px] lg:text-[60px]',
          'tracking-[-1.08px] md:tracking-[-1.44px] lg:tracking-[-1.8px]',
          !centered && 'lg:max-w-[60%]'
        )}>
          {title}
        </p>
        
        {description && (
          <p
            className={cn(
              'font-dm-sans font-normal leading-relaxed text-gray-500 text-[15px] tracking-tight',
              centered ? 'max-w-2xl' : 'lg:max-w-[300px] lg:pt-2'
            )}
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

// ============================================================
// Container Component
// ============================================================

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Maximum width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** Center the container */
  centered?: boolean;
}

export const Container = memo(function Container({
  children,
  className,
  maxWidth = 'lg',
  centered = true,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-4 sm:px-6 lg:px-10',
        maxWidthStyles[maxWidth],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
});

// ============================================================
// Decorative Border Component
// ============================================================

interface BorderProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: 'light' | 'medium' | 'dark';
}

export const DecorativeBorder = memo(function DecorativeBorder({
  position = 'top',
  color = 'light',
}: BorderProps) {
  const positionStyles = {
    top: 'border-t',
    bottom: 'border-b',
    left: 'border-l',
    right: 'border-r',
  };

  const colorStyles = {
    light: 'border-gray-200',
    medium: 'border-gray-400',
    dark: 'border-gray-600',
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 pointer-events-none',
        positionStyles[position],
        colorStyles[color]
      )}
    />
  );
});
