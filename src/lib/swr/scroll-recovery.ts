// ============================================================
// Scroll Position Recovery Hook
// Persists scroll position across page reloads using sessionStorage
// ============================================================

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_STORAGE_KEY = 'app_scroll_positions';
const SCROLL_DEBOUNCE_MS = 100;

interface ScrollPositions {
  [pathname: string]: number;
}

/**
 * Get all stored scroll positions
 */
function getScrollPositions(): ScrollPositions {
  try {
    const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save scroll position for a specific path
 */
function saveScrollPosition(pathname: string, position: number): void {
  try {
    const positions = getScrollPositions();
    positions[pathname] = position;
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get scroll position for a specific path
 */
function getScrollPosition(pathname: string): number {
  const positions = getScrollPositions();
  return positions[pathname] || 0;
}

/**
 * Hook for automatic scroll position recovery
 * - Saves scroll position on scroll and before page unload
 * - Restores scroll position on mount and navigation
 */
export function useScrollRecovery() {
  const location = useLocation();
  const pathname = location.pathname;

  // Restore scroll position on mount/navigation
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const savedPosition = getScrollPosition(pathname);
      if (savedPosition > 0) {
        window.scrollTo({
          top: savedPosition,
          behavior: 'instant',
        });
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  // Save scroll position on scroll (debounced)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        saveScrollPosition(pathname, window.scrollY);
      }, SCROLL_DEBOUNCE_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Save scroll position before page unload (refresh/close)
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition(pathname, window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  // Manual scroll position management
  const saveCurrentPosition = useCallback(() => {
    saveScrollPosition(pathname, window.scrollY);
  }, [pathname]);

  const restorePosition = useCallback(() => {
    const savedPosition = getScrollPosition(pathname);
    window.scrollTo({
      top: savedPosition,
      behavior: 'instant',
    });
  }, [pathname]);

  const clearPosition = useCallback(() => {
    saveScrollPosition(pathname, 0);
  }, [pathname]);

  return {
    saveCurrentPosition,
    restorePosition,
    clearPosition,
  };
}

/**
 * Hook to scroll to top on route change
 * Use this if you want fresh scroll on certain routes
 */
export function useScrollToTop(routes?: string[]) {
  const location = useLocation();

  useEffect(() => {
    // If specific routes provided, only scroll to top for those
    if (routes && !routes.includes(location.pathname)) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [location.pathname, routes]);
}
