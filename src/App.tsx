import { lazy, Suspense, memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';
import { SWRProvider, useScrollRecovery } from '@/lib/swr';
import { LenisProvider } from '@/lib/lenis';
import { useHomeSEO } from '@/lib/seo';

// ============================================================
// Lazy-loaded Section Components (Code Splitting)
// ============================================================
const BenefitsSection = lazy(() => import('@/components/sections/BenefitsSection').then(m => ({ default: m.BenefitsSection })));
const FeaturesSection = lazy(() => import('@/components/sections/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const PartnersSection = lazy(() => import('@/components/sections/PartnersSection').then(m => ({ default: m.PartnersSection })));

// Lazy-loaded Pages
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));

// Layout Components (Loaded eagerly for above-the-fold content)
import { FloatingNav, TopNavigation, Header, Footer, FooterCredits } from '@/components/layout';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

// ============================================================
// Loading Fallback Component
// ============================================================
const SectionLoader = memo(function SectionLoader() {
  return (
    <div 
      className={cn(
        'flex items-center justify-center',
        'min-h-[200px] w-full'
      )}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-2xl" />
    </div>
  );
});

// ============================================================
// Scroll Recovery Wrapper - Must be inside BrowserRouter
// ============================================================
const ScrollRecoveryWrapper = memo(function ScrollRecoveryWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // This hook automatically saves and restores scroll position
  useScrollRecovery();
  return <>{children}</>;
});

// ============================================================
// Main App Component
// ============================================================
function App() {
  return (
    <LenisProvider
      options={{
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      <SWRProvider>
        <BrowserRouter>
          <ScrollRecoveryWrapper>
            <FloatingWhatsApp />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={
                <Suspense fallback={<PageLoader />}>
                  <AboutPage />
                </Suspense>
              } />
              <Route path="/services" element={
                <Suspense fallback={<PageLoader />}>
                  <ServicesPage />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<PageLoader />}>
                  <ContactPage />
                </Suspense>
              } />
            </Routes>
          </ScrollRecoveryWrapper>
        </BrowserRouter>
      </SWRProvider>
    </LenisProvider>
  );
}

// ============================================================
// Page Loader
// ============================================================
const PageLoader = memo(function PageLoader() {
  return (
    <div className={cn(
      'flex items-center justify-center',
      'min-h-screen w-full bg-[#EBE9E4]'
    )}>
      <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-64" />
    </div>
  );
});

// ============================================================
// Home Page Component
// ============================================================
const HomePage = memo(function HomePage() {
  // Apply SEO meta tags for homepage
  useHomeSEO();

  return (
    <div 
      className={cn(
        'relative flex flex-col items-center',
        'bg-[#EBE9E4] min-h-screen w-full'
      )}
    >
      {/* Floating Navigation (Sticky) */}
      <FloatingNav />

      {/* Main Content Container */}
      <MainContent />

      {/* Footer Credits */}
      <FooterCredits />
    </div>
  );
});

// ============================================================
// Main Content Area
// ============================================================
const MainContent = memo(function MainContent() {
  return (
    <motion.main
      className={cn(
        'flex flex-col items-center gap-2.5',
        'min-h-min overflow-clip',
        'pb-12 pt-6 sm:pt-10 px-4 sm:px-[30px]',
        'relative w-full max-w-[1500px]'
      )}
      initial={ANIMATIONS.fadeInUp.initial}
      animate={ANIMATIONS.fadeInUp.animate}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background with rounded corners */}
      <div 
        className={cn(
          'absolute bg-[#f9f8f6] inset-0',
          'pointer-events-none rounded-[20px] sm:rounded-[30px]'
        )}
        aria-hidden="true"
      />

      {/* Inner Container */}
      <div 
        className={cn(
          'box-border flex flex-col gap-2.5 items-center',
          'max-w-[1500px] overflow-clip',
          'pt-4 sm:pt-5 px-4 sm:px-5 relative w-full'
        )}
      >
        {/* Top Navigation */}
        <TopNavigation />

        {/* Header / Hero Section */}
        <Header />

        {/* Logo Cloud - Partner Section
        <Suspense fallback={<SectionLoader />}>
          <LogoCloud />
        </Suspense> */}

        {/* Benefits Section */}
        <Suspense fallback={<SectionLoader />}>
          <BenefitsSection />
        </Suspense>

        {/* Features Section */}
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSection />
        </Suspense>

        {/* Partners Section + Footer - flush together */}
        <div className="w-full mt-8">
          <Suspense fallback={<SectionLoader />}>
            <PartnersSection />
          </Suspense>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </motion.main>
  );
});

export default App;
