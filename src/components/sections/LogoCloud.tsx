import { memo } from 'react';
import { PartnerLogo } from '@/components/common';
import { partnerLogos } from '@/lib/assets';
import { cn } from '@/lib/utils';

// ============================================================
// Logo Cloud / Partner Section
// ============================================================

export const LogoCloud = memo(function LogoCloud() {
  return (
    <section 
      className={cn(
        'box-border flex flex-col gap-6 sm:gap-[30px]',
        'items-center max-w-[1500px] px-0 py-10 sm:py-[50px]',
        'relative shrink-0 w-full'
      )}
      aria-label="Trusted by leading companies"
    >
      {/* Section Label */}
      <p 
        className={cn(
          'font-dm-sans font-normal leading-relaxed',
          'text-gray-500 text-[15px] tracking-tight w-full'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        Trusted by:
      </p>

      {/* Logo Grid */}
      <div 
        className={cn(
          'flex flex-wrap content-center gap-4 sm:gap-10',
          'items-center justify-center w-full'
        )}
      >
        {partnerLogos.map((logo) => (
          <PartnerLogo
            key={logo.id}
            src={logo.src}
            alt={logo.alt}
          />
        ))}
      </div>
    </section>
  );
});
