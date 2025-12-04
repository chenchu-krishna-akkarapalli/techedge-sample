// ============================================================
// Lenis Smooth Scroll Provider
// https://lenis.darkroom.engineering/
// ============================================================

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

// ============================================================
// Types
// ============================================================
interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
}

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    smoothWheel?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
    autoResize?: boolean;
  };
}

// ============================================================
// Context
// ============================================================
const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

/**
 * Hook to access Lenis instance and scrollTo function
 */
export function useLenis() {
  return useContext(LenisContext);
}

// ============================================================
// Default easing function (ease-out-expo)
// ============================================================
const defaultEasing = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// ============================================================
// Lenis Provider Component
// ============================================================
export function LenisProvider({ children, options = {} }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis with production-optimized settings
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? defaultEasing,
      orientation: options.orientation ?? 'vertical',
      gestureOrientation: options.gestureOrientation ?? 'vertical',
      smoothWheel: options.smoothWheel ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
      touchMultiplier: options.touchMultiplier ?? 2,
      infinite: options.infinite ?? false,
      autoResize: options.autoResize ?? true,
    });

    lenisRef.current = lenis;
    
    // Expose Lenis instance globally for utility functions
    (window as any).__lenis = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, [options]);

  // Scroll to function
  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOptions?: ScrollToOptions
  ) => {
    lenisRef.current?.scrollTo(target, {
      offset: scrollOptions?.offset ?? 0,
      duration: scrollOptions?.duration ?? 1.2,
      easing: scrollOptions?.easing ?? defaultEasing,
      immediate: scrollOptions?.immediate ?? false,
      lock: scrollOptions?.lock ?? false,
      onComplete: scrollOptions?.onComplete,
    });
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

// ============================================================
// Utility: Scroll to section by ID
// ============================================================
export function scrollToSection(sectionId: string, offset: number = 0) {
  const element = document.getElementById(sectionId);
  if (element) {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(element, { offset, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// ============================================================
// Utility: Scroll to top
// ============================================================
export function scrollToTop(immediate: boolean = false) {
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate, duration: immediate ? 0 : 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
  }
}
