// ============================================================
// Application-Specific SWR Hooks
// Ready-to-use hooks for TechEdge application
// ============================================================

import { useSWR, useFormMutation, usePollingData, usePaginatedData, API_ENDPOINTS } from './index';

// ============================================================
// Types
// ============================================================
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

export interface AnalyticsData {
  visitors: number;
  pageViews: number;
  avgDuration: string;
  bounceRate: number;
}

// ============================================================
// Services Hook
// ============================================================
export function useServices(enabled = true) {
  return useSWR<Service[]>(
    enabled ? API_ENDPOINTS.SERVICES : null
  );
}

// ============================================================
// Testimonials Hook with Polling
// Auto-refreshes every 30 seconds for new testimonials
// ============================================================
export function useTestimonials(enabled = true) {
  return usePollingData<Testimonial[]>(
    API_ENDPOINTS.TESTIMONIALS,
    'SLOW', // 30 seconds
    { enabled }
  );
}

// ============================================================
// Partners Hook
// ============================================================
export function usePartners(enabled = true) {
  return useSWR<Partner[]>(
    enabled ? API_ENDPOINTS.PARTNERS : null
  );
}

// ============================================================
// Contact Form Mutation
// With optimistic UI feedback
// ============================================================
export function useContactForm(options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useFormMutation<{ success: boolean; message: string }, ContactFormData>(
    API_ENDPOINTS.CONTACT,
    options
  );
}

// ============================================================
// Newsletter Subscription
// ============================================================
export function useNewsletterSubscription(options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useFormMutation<{ success: boolean }, NewsletterData>(
    API_ENDPOINTS.NEWSLETTER,
    options
  );
}

// ============================================================
// Analytics Hook with Fast Polling
// For real-time analytics dashboard
// ============================================================
export function useAnalytics(enabled = true) {
  return usePollingData<AnalyticsData>(
    API_ENDPOINTS.ANALYTICS,
    'FAST', // 3 seconds
    { enabled }
  );
}

// ============================================================
// Paginated Testimonials (for testimonials page)
// ============================================================
export function usePaginatedTestimonials(pageSize = 6, enabled = true) {
  return usePaginatedData<Testimonial>(
    API_ENDPOINTS.TESTIMONIALS,
    pageSize,
    { enabled }
  );
}
