// ============================================================
// SWR Module Exports
// ============================================================

// Provider
export { SWRProvider } from './provider';

// Configuration
export { swrConfig, POLLING_INTERVALS, API_ENDPOINTS } from './config';

// Fetchers
export { 
  fetcher, 
  postFetcher, 
  putFetcher, 
  deleteFetcher,
  authFetcher,
  multiFetcher,
} from './fetchers';

// Hooks
export {
  // Fast page navigation
  usePreloadedData,
  usePreload,
  
  // Polling
  usePollingData,
  
  // Data dependency
  useDependentData,
  
  // Optimistic UI / Local mutation
  useOptimisticMutation,
  useFormMutation,
  useUpdateItem,
  useDeleteItem,
  
  // Pagination
  usePaginatedData,
  useInfiniteScroll,
} from './hooks';

// Scroll position recovery
export { useScrollRecovery, useScrollToTop } from './scroll-recovery';

// App-specific hooks
export {
  useServices,
  useTestimonials,
  usePartners,
  useContactForm,
  useNewsletterSubscription,
  useAnalytics,
  usePaginatedTestimonials,
} from './app-hooks';

// Re-export SWR core for convenience
export { useSWRConfig, mutate } from 'swr';
export { default as useSWR } from 'swr';
export { default as useSWRMutation } from 'swr/mutation';
export { default as useSWRInfinite } from 'swr/infinite';
