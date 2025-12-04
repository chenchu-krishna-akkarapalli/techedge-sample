import { memo, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { NavButton, CTAButton } from '@/components/common';
import { NAV_ITEMS, ANIMATIONS } from '@/lib/constants';
import { scrollToSection, cn } from '@/lib/utils';

// Tech Edge logo (from public folder)
const techedgeLogo = '/assets/techedgelogo.svg';

// ============================================================
// Fixed Navigation Bar (Floating pill)
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

  const location = useLocation();

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
        'fixed z-50 left-1/2',
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
  return (
    <nav 
      className="box-border flex items-center justify-between p-0 relative shrink-0 w-full max-w-[1500px] h-[84px]"
      aria-label="Site navigation"
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center z-10"
        aria-label="Tech Edge - Go to home"
      >
        <img 
          src={techedgeLogo} 
          alt="Tech Edge" 
          className="h-[24px] sm:h-[30px] w-auto"
        />
      </Link>

      {/* Center Nav - Floating pill style (absolutely centered) */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <FloatingNavInline />
      </div>

      {/* CTA Button */}
      <div className="z-10">
        <CTAButton>Learn More</CTAButton>
      </div>
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
