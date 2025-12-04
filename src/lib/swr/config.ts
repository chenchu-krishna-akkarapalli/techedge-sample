// ============================================================
// SWR Global Configuration
// ============================================================
import { SWRConfiguration } from 'swr';

/**
 * Global SWR configuration with smart defaults for:
 * - Revalidation on focus
 * - Revalidation on network recovery
 * - Smart error retry with exponential backoff
 */
export const swrConfig: SWRConfiguration = {
  // Revalidation on focus - auto refresh when user returns to tab
  revalidateOnFocus: true,
  
  // Revalidation on network recovery
  revalidateOnReconnect: true,
  
  // Keep previous data while fetching new data
  keepPreviousData: true,
  
  // Smart error retry with exponential backoff
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404
    if (error.status === 404) return;
    
    // Never retry on 401/403 (auth errors)
    if (error.status === 401 || error.status === 403) return;
    
    // Max retries
    if (retryCount >= 3) return;
    
    // Exponential backoff: 1s, 2s, 4s
    const delay = Math.min(1000 * 2 ** retryCount, 8000);
    setTimeout(() => revalidate({ retryCount }), delay);
  },
  
  // Dedupe requests within 2 seconds
  dedupingInterval: 2000,
  
  // Error retry count
  errorRetryCount: 3,
  
  // Focus throttle (only revalidate once per 5 seconds on focus)
  focusThrottleInterval: 5000,
  
  // Loading timeout
  loadingTimeout: 3000,
};

/**
 * Polling configuration for real-time data
 */
export const POLLING_INTERVALS = {
  FAST: 3000,      // 3 seconds - for real-time data
  NORMAL: 10000,   // 10 seconds - for semi-real-time data
  SLOW: 30000,     // 30 seconds - for less critical data
  MINUTE: 60000,   // 1 minute
} as const;

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  // Example endpoints - replace with your actual API
  SERVICES: '/api/services',
  TESTIMONIALS: '/api/testimonials',
  PARTNERS: '/api/partners',
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  ANALYTICS: '/api/analytics',
} as const;
