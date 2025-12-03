import { memo, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';

// Layout Components
import { FloatingNav, TopNavigation, Footer } from '@/components/layout';

// Lazy-loaded sections
const BenefitsSection = lazy(() => import('@/components/sections/BenefitsSection').then(m => ({ default: m.BenefitsSection })));
const PartnersSection = lazy(() => import('@/components/sections/PartnersSection').then(m => ({ default: m.PartnersSection })));

// ============================================================
// Loading Fallback
// ============================================================
const SectionLoader = memo(function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-2xl" />
    </div>
  );
});

// ============================================================
// Services Page Component
// ============================================================
export const ServicesPage = memo(function ServicesPage() {
  return (
    <div className={cn(
      'relative flex flex-col items-center',
      'bg-[#EBE9E4] min-h-screen w-full'
    )}>
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Main Content */}
      <motion.main
        className={cn(
          'flex flex-col items-center gap-2.5',
          'min-h-min overflow-clip',
          'pt-6 sm:pt-10 px-4 sm:px-[30px]',
          'relative w-full max-w-[1500px]'
        )}
        initial={ANIMATIONS.fadeInUp.initial}
        animate={ANIMATIONS.fadeInUp.animate}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background */}
        <div 
          className={cn(
            'absolute bg-[#f9f8f6] inset-0',
            'pointer-events-none rounded-[20px] sm:rounded-[30px]'
          )}
          aria-hidden="true"
        />

        {/* Inner Container */}
        <div className={cn(
          'box-border flex flex-col items-center',
          'max-w-[1500px] overflow-clip',
          'pt-4 sm:pt-5 px-4 sm:px-5 relative w-full'
        )}>
          {/* Top Navigation */}
          <TopNavigation />

          {/* Services & Solutions Section (BenefitsSection) */}
          <Suspense fallback={<SectionLoader />}>
            <BenefitsSection />
          </Suspense>

          {/* Partners Section + Footer */}
          <div className="w-full mt-8">
            <Suspense fallback={<SectionLoader />}>
              <PartnersSection />
            </Suspense>
            <Footer />
          </div>
        </div>
      </motion.main>
    </div>
  );
});

export default ServicesPage;
