import { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { NavButton, CTAButton } from '@/components/common';
import { NAV_ITEMS, ANIMATIONS } from '@/lib/constants';
import { scrollToSection, cn } from '@/lib/utils';

// Tech Edge logo (from public folder)
const techedgeLogo = '/assets/techedgelogo.svg';

// Hook to detect mobile/tablet
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// ============================================================
// Fixed Navigation Bar (Floating pill - Desktop only)
// ============================================================

export const FloatingNav = memo(function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show after scrolling past the top navigation (around 150px)
      if (currentScrollY < 150) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setIsVisible(true);
      } else {
        // Scrolling down - hide
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = useCallback((item: typeof NAV_ITEMS[0]) => {
    if (item.route) {
      // Navigation handled by Link component
      return;
    }
    scrollToSection(item.sectionId);
  }, []);

  return (
    <motion.nav
      className={cn(
        'hidden md:flex fixed z-50 left-1/2',
        'backdrop-blur-[15px] bg-white/40',
        'px-4 py-3 sm:px-6 sm:py-5 rounded-full',
        'flex items-center gap-4 sm:gap-[27px]',
        'font-dm-sans font-bold text-sm text-black tracking-tight',
        'top-4'
      )}
      style={{ translateX: '-50%' }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={ANIMATIONS.navHide.transition}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => (
        item.route ? (
          <Link
            key={item.sectionId}
            to={item.route}
            className="hover:opacity-70 transition-opacity"
            aria-label={item.ariaLabel}
          >
            <span className="hidden sm:inline">{item.label}</span>
            <span className="sm:hidden">{item.label.split(' ')[0]}</span>
          </Link>
        ) : (
          <NavButton
            key={item.sectionId}
            onClick={() => handleNavClick(item)}
            aria-label={item.ariaLabel}
          >
            <span className="hidden sm:inline">{item.label}</span>
            <span className="sm:hidden">{item.label.split(' ')[0]}</span>
          </NavButton>
        )
      ))}
    </motion.nav>
  );
});

// ============================================================
// Top Navigation (Logo + Floating Nav + CTA)
// ============================================================

export const TopNavigation = memo(function TopNavigation() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = useCallback((item: typeof NAV_ITEMS[0]) => {
    if (item.route) {
      setMobileMenuOpen(false);
      return;
    }
    scrollToSection(item.sectionId);
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav 
      className="box-border flex items-center justify-between px-4 sm:px-6 md:p-0 relative shrink-0 w-full h-auto md:h-[84px]"
      aria-label="Site navigation"
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center z-10 py-4 md:py-0"
        aria-label="Tech Edge - Go to home"
      >
        <img 
          src={techedgeLogo} 
          alt="Tech Edge" 
          className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto transition-all"
        />
      </Link>

      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-20 p-2 hover:opacity-70 transition-opacity"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      )}

      {/* Center Nav - Floating pill style (desktop) or Mobile menu */}
      {!isMobile ? (
        <div className="absolute left-1/2 -translate-x-1/2">
          <FloatingNavInline />
        </div>
      ) : (
        <>
          {/* Mobile Menu Backdrop */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
              />
            )}
          </AnimatePresence>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/90 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl px-4 py-4 z-20"
              >
                <div className="flex flex-col gap-3">
                  {NAV_ITEMS.map((item) => (
                    item.route ? (
                      <Link
                        key={item.sectionId}
                        to={item.route}
                        className="px-4 py-3 hover:bg-white/60 rounded-lg transition-all text-sm font-dm-sans font-bold active:scale-95"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={item.sectionId}
                        onClick={() => handleNavClick(item)}
                        className="px-4 py-3 hover:bg-white/60 rounded-lg transition-all text-sm font-dm-sans font-bold text-left active:scale-95"
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* CTA Button - Hidden on mobile, visible on tablet+ */}
      {!isMobile && (
        <div className="z-10">
          <CTAButton>Learn More</CTAButton>
        </div>
      )}
    </nav>
  );
});

// ============================================================
// Inline Floating Nav (for TopNavigation center)
// ============================================================

const FloatingNavInline = memo(function FloatingNavInline() {
  const handleNavClick = useCallback((item: typeof NAV_ITEMS[0]) => {
    if (item.route) {
      return;
    }
    scrollToSection(item.sectionId);
  }, []);

  return (
    <div
      className={cn(
        'backdrop-blur-[15px] bg-white/40',
        'px-4 py-3 sm:px-6 sm:py-5 rounded-full',
        'flex items-center gap-4 sm:gap-[27px]',
        'font-dm-sans font-bold text-sm text-black tracking-tight'
      )}
    >
      {NAV_ITEMS.map((item) => (
        item.route ? (
          <Link
            key={item.sectionId}
            to={item.route}
            className="hover:opacity-70 transition-opacity"
            aria-label={item.ariaLabel}
          >
            {item.label}
          </Link>
        ) : (
          <NavButton
            key={item.sectionId}
            onClick={() => handleNavClick(item)}
            aria-label={item.ariaLabel}
          >
            {item.label}
          </NavButton>
        )
      ))}
    </div>
  );
});

// ============================================================
// Combined Navigation Export
// ============================================================

export const Navigation = memo(function Navigation() {
  return (
    <>
      <FloatingNav />
      <TopNavigation />
    </>
  );
});
