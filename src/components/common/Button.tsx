import { memo, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowIcon } from './Icon';
import { ANIMATIONS } from '@/lib/constants';

// ============================================================
// Button Types
// ============================================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

// ============================================================
// Style Configurations
// ============================================================

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-green text-white hover:bg-brand-green/90',
  secondary: 'bg-brand-cream text-black hover:bg-brand-cream/90',
  ghost: 'bg-transparent text-black hover:bg-gray-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-[22px] py-[14px] text-sm',
  lg: 'px-8 py-4 text-base',
};

// ============================================================
// Button Component
// ============================================================

/**
 * Animated button component with multiple variants
 * Uses Framer Motion for hover/tap animations
 */
export const Button = memo(function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  showArrow = false,
  href,
  external = false,
}: ButtonLinkProps) {
  const baseStyles = cn(
    // Base styles
    'inline-flex items-center justify-center gap-0.5',
    'rounded-full cursor-pointer',
    'font-dm-sans font-bold leading-relaxed tracking-tight',
    'transition-colors duration-200',
    // Variant & size
    variantStyles[variant],
    sizeStyles[size],
    // Full width on mobile for certain contexts
    className
  );

  return (
    <motion.a
      href={href}
      className={baseStyles}
      whileHover={ANIMATIONS.buttonHover.whileHover}
      whileTap={ANIMATIONS.buttonHover.whileTap}
      transition={ANIMATIONS.buttonHover.transition}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span className="whitespace-nowrap">{children}</span>
      {showArrow && (
        <span className="flex items-center self-stretch ml-0.5">
          <ArrowIcon color={variant === 'primary' ? 'white' : 'black'} />
        </span>
      )}
    </motion.a>
  );
});

// ============================================================
// Specialized Button Variants
// ============================================================

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Primary CTA button with arrow icon
 */
export const CTAButton = memo(function CTAButton({
  children,
  href = 'https://www.techedge.sa',
  className,
  fullWidth = false,
}: CTAButtonProps) {
  return (
    <Button
      variant="primary"
      href={href}
      external
      showArrow
      className={cn(fullWidth && 'w-full', className)}
    >
      {children}
    </Button>
  );
});

/**
 * Secondary button without arrow
 */
export const SecondaryButton = memo(function SecondaryButton({
  children,
  href = 'https://www.figma.com/sites',
  className,
}: CTAButtonProps) {
  return (
    <Button
      variant="secondary"
      href={href}
      external
      className={className}
    >
      {children}
    </Button>
  );
});

// ============================================================
// Navigation Button (for scroll navigation)
// ============================================================

interface NavButtonProps {
  children: ReactNode;
  onClick: () => void;
  'aria-label'?: string;
  className?: string;
}

export const NavButton = memo(function NavButton({
  children,
  onClick,
  'aria-label': ariaLabel,
  className,
}: NavButtonProps) {
  return (
    <motion.button
      className={cn(
        'font-dm-sans font-bold text-sm text-black leading-relaxed tracking-tight',
        'whitespace-nowrap cursor-pointer',
        className
      )}
      style={{ fontVariationSettings: "'opsz' 14" }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
});
