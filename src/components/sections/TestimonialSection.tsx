import { memo } from 'react';
import { motion } from 'motion/react';
import { Section } from '@/components/common';
import { TESTIMONIALS, ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { imgTestimonial } from '@/lib/assets';
import { cn } from '@/lib/utils';

// ============================================================
// Testimonial Section
// ============================================================

export const TestimonialSection = memo(function TestimonialSection() {
  const testimonial = TESTIMONIALS[0]; // Currently only one testimonial

  return (
    <Section 
      as="div"
      className={cn(
        'flex flex-col lg:flex-row gap-5',
        'items-start h-auto lg:h-[789.382px]'
      )}
      maxWidth="lg"
    >
      <motion.div
        className="flex flex-col lg:flex-row gap-5 w-full h-full"
        initial={ANIMATIONS.fadeInUp.initial}
        whileInView={ANIMATIONS.fadeInUp.animate}
        viewport={SCROLL_VIEWPORT}
        transition={ANIMATIONS.fadeInUp.transition}
      >
        {/* Image */}
        <TestimonialImage 
          src={imgTestimonial}
          alt={testimonial.imageAlt}
        />

        {/* Quote */}
        <TestimonialQuote 
          quote={testimonial.quote}
          author={testimonial.author}
          role={testimonial.role}
        />
      </motion.div>
    </Section>
  );
});

// ============================================================
// Testimonial Image
// ============================================================

interface TestimonialImageProps {
  src: string;
  alt: string;
}

const TestimonialImage = memo(function TestimonialImage({ src, alt }: TestimonialImageProps) {
  return (
    <div 
      className={cn(
        'aspect-[550/624] basis-0 grow',
        'min-h-px min-w-px relative rounded-[20px] sm:rounded-[30px]',
        'shrink-0 h-[300px] sm:h-[400px] lg:h-auto'
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          'absolute inset-0 size-full',
          'max-w-none object-cover object-center pointer-events-none',
          'rounded-[inherit]'
        )}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

// ============================================================
// Testimonial Quote
// ============================================================

interface TestimonialQuoteProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialQuote = memo(function TestimonialQuote({ 
  quote, 
  author, 
  role 
}: TestimonialQuoteProps) {
  return (
    <article
      aria-label="Quote from a user about the product Area"
      className={cn(
        'basis-0 grow h-full min-h-px min-w-px',
        'relative shrink-0'
      )}
    >
      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute border-t border-gray-200 inset-0 pointer-events-none"
      />

      <div className="flex flex-col justify-center size-full">
        <div 
          className={cn(
            'box-border flex flex-col gap-8 sm:gap-[50px]',
            'items-start justify-center',
            'pl-0 lg:pl-[50px] pr-0 py-8 lg:py-0',
            'relative size-full'
          )}
        >
          {/* Quote Text */}
          <blockquote 
            className={cn(
              'font-crimson leading-none',
              'text-[24px] sm:text-[32px] lg:text-[40px] text-black',
              'tracking-[-0.96px] sm:tracking-[-1.28px] lg:tracking-[-1.6px] w-full'
            )}
          >
            {`"${quote}"`}
          </blockquote>

          {/* Author Info */}
          <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
            <cite 
              className={cn(
                'font-dm-sans font-normal leading-relaxed not-italic',
                'text-[15px] text-black tracking-tight w-full'
              )}
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              {author}
            </cite>
            <p 
              className={cn(
                'font-roboto-mono font-normal leading-relaxed',
                'text-brand-green text-xs tracking-tight w-full'
              )}
            >
              {role}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
});
