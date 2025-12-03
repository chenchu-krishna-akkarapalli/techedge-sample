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
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
