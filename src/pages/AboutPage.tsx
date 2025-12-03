import { memo, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';

// Layout Components
import { FloatingNav, TopNavigation, Footer } from '@/components/layout';

// Import Tech Edge logo
import techedgeLogo from '@/assets/techedgelogo.svg';

// Import about assets
import visionImage from '@/assets/about-asset/visionrightside.svg';
import missionImage from '@/assets/about-asset/missionleftside.svg';

// Lazy-loaded sections for reuse
const FeaturesSection = lazy(() => import('@/components/sections/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
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
// About Page Component
// ============================================================
export const AboutPage = memo(function AboutPage() {
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

          {/* Who We Are Section */}
          <WhoWeAreSection />

          {/* Vision Section */}
          <VisionSection />

          {/* Mission Section */}
          <MissionSection />

          {/* Our Goals Section (Reused) */}
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSection />
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

// ============================================================
// Who We Are Section
// ============================================================
const WhoWeAreSection = memo(function WhoWeAreSection() {
  return (
    <motion.section
      id="about"
      className={cn(
        'w-full py-16 sm:py-24',
        'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'
      )}
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      viewport={SCROLL_VIEWPORT}
      transition={ANIMATIONS.fadeInUp.transition}
    >
      {/* Left Side - Logo (same width as Mission/Vision images) */}
      <div className="flex items-center justify-center">
        <img 
          src={techedgeLogo} 
          alt="Tech Edge" 
          className="w-[280px] sm:w-[350px] lg:w-[400px] h-auto"
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex flex-col justify-center">
        <h2 className={cn(
          'font-crimson font-normal italic',
          'text-2xl sm:text-3xl text-black',
          'mb-6 border-b border-gray-300 pb-2 inline-block'
        )}>
          Who We Are?
        </h2>

        <div className="space-y-6">
          <p className={cn(
            'font-dm-sans font-normal leading-relaxed',
            'text-gray-700 text-[15px] sm:text-base'
          )}
          style={{ fontVariationSettings: "'opsz' 14" }}
          >
            At Tech Edge, we believe technology is more than systems and software it's the 
            edge that transforms businesses, empowers people, and shapes the future.
          </p>

          <p className={cn(
            'font-dm-sans font-normal leading-relaxed',
            'text-gray-700 text-[15px] sm:text-base'
          )}
          style={{ fontVariationSettings: "'opsz' 14" }}
          >
            We partner with enterprises worldwide to modernize applications, harness the cloud, 
            unlock data intelligence, and secure digital operations with confidence. Our solutions 
            are crafted to align seamlessly with the digital transformation goals of Saudi 
            Vision 2030, empowering organizations to innovate sustainably, operate efficiently, 
            and lead with resilience.
          </p>

          <p className={cn(
            'font-dm-sans font-normal leading-relaxed',
            'text-gray-700 text-[15px] sm:text-base'
          )}
          style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Backed by a global team of certified experts in cloud platforms, ServiceNow, AI, and 
            cybersecurity, Tech Edge ensures every solution is engineered for growth and 
            designed for the future. We help organizations embrace change, scale with 
            confidence, and move forward with the edge that defines tomorrow's technology 
            leaders.
          </p>
        </div>
      </div>
    </motion.section>
  );
});

// ============================================================
// Vision Section
// ============================================================
const VisionSection = memo(function VisionSection() {
  return (
    <motion.section
      className={cn(
        'w-full',
        'grid grid-cols-1 lg:grid-cols-2 gap-0',
        'overflow-hidden',
        'mb-16'
      )}
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      viewport={SCROLL_VIEWPORT}
      transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.1 }}
    >
      {/* Left Side - Text Content */}
      <div className={cn(
        'flex flex-col justify-center',
        'bg-[#f0efeb] p-8 sm:p-12 lg:p-16',
        'order-2 lg:order-1',
        'h-[300px] sm:h-[400px] lg:h-full'
      )}>
        <h3 className={cn(
          'font-crimson font-normal italic',
          'text-2xl sm:text-3xl text-black text-center',
          'mb-6'
        )}>
          Our Vision
        </h3>
        <p className={cn(
          'font-dm-sans font-normal leading-relaxed',
          'text-gray-700 text-[15px] sm:text-base text-center',
          'max-w-md mx-auto'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
        >
          To be recognized as the global partner of choice for enterprises 
          navigating digital transformation — enabling organizations to innovate 
          confidently, operate efficiently, and lead with resilience.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-full">
        <img 
          src={visionImage} 
          alt="Our Vision - Digital city transformation"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.section>
  );
});

// ============================================================
// Mission Section
// ============================================================
const MissionSection = memo(function MissionSection() {
  return (
    <motion.section
      className={cn(
        'w-full',
        'grid grid-cols-1 lg:grid-cols-2 gap-0',
        'overflow-hidden',
        'mb-26'
      )}
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      viewport={SCROLL_VIEWPORT}
      transition={{ ...ANIMATIONS.fadeInUp.transition, delay: 0.2 }}
    >
      {/* Left Side - Image */}
      <div className="h-[300px] sm:h-[400px] lg:h-full">
        <img 
          src={missionImage} 
          alt="Our Mission - Sustainable growth"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className={cn(
        'flex flex-col justify-center',
        'bg-[#f0efeb] p-8 sm:p-12 lg:p-16',
        'h-[300px] sm:h-[400px] lg:h-full'
      )}>
        <h3 className={cn(
          'font-crimson font-normal italic',
          'text-2xl sm:text-3xl text-black text-center',
          'mb-6'
        )}>
          Our Mission
        </h3>
        <p className={cn(
          'font-dm-sans font-normal leading-relaxed',
          'text-gray-700 text-[15px] sm:text-base text-center',
          'max-w-md mx-auto'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
        >
          To empower enterprises to achieve sustainable growth through 
          technology that is innovative, secure, and scalable. We bridge the 
          gap between business strategy and IT by delivering solutions 
          engineered for trust, agility, and long-term success.
        </p>
      </div>
    </motion.section>
  );
});

export default AboutPage;
