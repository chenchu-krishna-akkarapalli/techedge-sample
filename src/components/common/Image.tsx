import { memo, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// Optimized Image Component
// ============================================================

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  /** Object fit mode */
  fit?: 'cover' | 'contain' | 'fill';
  /** Object position */
  position?: string;
  /** Whether the image is decorative (no alt needed) */
  decorative?: boolean;
  /** Lazy load the image */
  lazy?: boolean;
  /** Image aspect ratio (e.g., "16/9", "1/1") */
  aspectRatio?: string;
}

/**
 * Optimized image component with lazy loading and proper accessibility
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  fit = 'cover',
  position = '50% 50%',
  decorative = false,
  lazy = true,
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const imageStyles = cn(
    'max-w-none size-full',
    fit === 'cover' && 'object-cover',
    fit === 'contain' && 'object-contain',
    fit === 'fill' && 'object-fill',
    className
  );

  return (
    <div 
      className={cn('relative overflow-hidden', containerClassName)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt={decorative ? '' : alt}
        className={imageStyles}
        style={{ objectPosition: position }}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        aria-hidden={decorative}
        {...props}
      />
    </div>
  );
});

// ============================================================
// Hero Image Component
// ============================================================

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  rounded?: boolean | string;
}

export const HeroImage = memo(function HeroImage({
  src,
  alt,
  className,
  overlay = false,
  rounded = true,
}: HeroImageProps) {
  const roundedClass = typeof rounded === 'string' 
    ? rounded 
    : rounded 
      ? 'rounded-[30px]' 
      : '';

  return (
    <div className={cn('relative w-full h-full', roundedClass, className)}>
      <img
        src={src}
        alt={alt}
        className={cn(
          'absolute inset-0 size-full object-cover object-center pointer-events-none',
          roundedClass
        )}
        loading="lazy"
        decoding="async"
      />
      {overlay && (
        <div 
          className={cn('absolute inset-0 bg-black/5', roundedClass)} 
          aria-hidden="true" 
        />
      )}
    </div>
  );
});

// ============================================================
// Partner Logo Component
// ============================================================

interface PartnerLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export const PartnerLogo = memo(function PartnerLogo({
  src,
  alt,
  className,
}: PartnerLogoProps) {
  return (
    <div 
      className={cn(
        'box-border flex flex-col gap-2.5 h-[84px] items-start justify-center',
        'overflow-clip p-5 relative shrink-0 w-[154px]',
        className
      )}
    >
      <div className="basis-0 grow min-h-px min-w-px mix-blend-exclusion opacity-60 relative shrink-0 w-full">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 max-w-none object-contain object-center pointer-events-none size-full"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
});

// ============================================================
// Device Frame Image (iPad mockup)
// ============================================================

interface DeviceFrameImageProps {
  innerSrc: string;
  innerAlt: string;
  className?: string;
}

export const DeviceFrameImage = memo(function DeviceFrameImage({
  innerSrc,
  innerAlt,
  className,
}: DeviceFrameImageProps) {
  return (
    <div
      aria-label="Visual chart illustrating a 78% increase in efficiency across 33 regions between 2021 and 2024, with clear upward trends year over year"
      className={cn(
        'absolute bg-black rounded-3xl overflow-clip',
        'border-2 border-white/50 border-solid',
        'shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]',
        'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-[907px] h-[644px]',
        // Responsive sizing
        'max-w-[calc(100%-2rem)] sm:max-w-none',
        className
      )}
    >
      <div className="absolute h-[607.439px] left-1/2 -translate-x-1/2 top-[16.5px] w-[869.742px] max-w-[calc(100%-2rem)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <img
            src={innerSrc}
            alt={innerAlt}
            className="absolute left-0 top-0 size-full max-w-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
});
