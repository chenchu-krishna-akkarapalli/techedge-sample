import { memo } from 'react';
import { svgPaths, type SvgPathKey } from '@/lib/svg-paths';
import { cn } from '@/lib/utils';

// ============================================================
// Icon Component - Renders SVG icons by name
// ============================================================

interface IconProps {
  /** The name of the icon to render */
  name: SvgPathKey;
  /** Size of the icon in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Icon fill color (CSS variable or hex) */
  color?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

/**
 * Renders an SVG icon from the predefined icon set
 * @example
 * <Icon name="check" size={16} color="#485C11" />
 */
export const Icon = memo(function Icon({
  name,
  size = 24,
  className,
  color = 'currentColor',
  'aria-label': ariaLabel,
}: IconProps) {
  const path = svgPaths[name];
  
  if (!path) {
    console.warn(`Icon "${name}" not found in svg-paths`);
    return null;
  }

  // Determine viewBox based on icon type
  const viewBox = name === 'logo' 
    ? '0 0 32 70' 
    : name === 'arrow' 
      ? '0 0 6 7'
      : name === 'check' || name === 'close'
        ? '0 0 14 14'
        : '0 0 24 24';

  return (
    <svg
      className={cn('shrink-0', className)}
      width={size}
      height={name === 'logo' ? size * 2.1875 : size}
      viewBox={viewBox}
      fill="none"
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <path d={path} fill={color} />
    </svg>
  );
});

// ============================================================
// Specific Icon Components for common use cases
// ============================================================

interface SimpleIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const ArrowIcon = memo(function ArrowIcon({ 
  size = 6, 
  className,
  color = 'white' 
}: SimpleIconProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <Icon name="arrow" size={size} color={color} />
    </div>
  );
});

export const CheckIcon = memo(function CheckIcon({ 
  size = 14, 
  className,
  color = '#485C11' 
}: SimpleIconProps) {
  return <Icon name="check" size={size} className={className} color={color} />;
});

export const CloseIcon = memo(function CloseIcon({ 
  size = 14, 
  className,
  color = '#6F6F6F' 
}: SimpleIconProps) {
  return <Icon name="close" size={size} className={className} color={color} />;
});

export const LogoIcon = memo(function LogoIcon({ 
  size = 32, 
  className,
  color = 'black' 
}: SimpleIconProps) {
  return <Icon name="logo" size={size} className={className} color={color} />;
});

// ============================================================
// Benefit Icons - Used in the benefits section
// ============================================================

interface BenefitIconProps {
  type: 'cable' | 'earth' | 'account' | 'chart';
  className?: string;
}

export const BenefitIcon = memo(function BenefitIcon({ 
  type, 
  className 
}: BenefitIconProps) {
  return (
    <div className={cn('relative shrink-0 size-6', className)}>
      <Icon name={type} size={24} color="black" />
    </div>
  );
});
