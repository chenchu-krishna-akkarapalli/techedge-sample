import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS merge support
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Smoothly scrolls to a section by ID
 * Uses Lenis if available, falls back to native smooth scroll
 */
export function scrollToSection(sectionId: string, offset: number = 0): void {
  const element = document.getElementById(sectionId);
  if (element) {
    // Check if Lenis is available on window (set by LenisProvider)
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(element, { offset, duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/**
 * Smoothly scrolls to top of page
 * Uses Lenis if available, falls back to native scroll
 */
export function scrollToTop(immediate: boolean = false): void {
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate, duration: immediate ? 0 : 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
  }
}

/**
 * Generates a staggered animation delay based on index
 */
export function getStaggerDelay(index: number, baseDelay = 0.1): number {
  return index * baseDelay;
}

/**
 * Checks if the code is running on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Debounce function for scroll handlers
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Format number with leading zero
 */
export function formatNumber(num: number): string {
  return num.toString().padStart(2, '0');
}
