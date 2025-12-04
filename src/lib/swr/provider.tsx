// ============================================================
// SWR Provider Component
// Wraps the app with global SWR configuration
// ============================================================

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { swrConfig } from './config';
import { fetcher } from './fetchers';

interface SWRProviderProps {
  children: ReactNode;
}

/**
 * Global SWR Provider with default configuration
 * Includes:
 * - Default fetcher
 * - Revalidation on focus
 * - Revalidation on network recovery
 * - Smart error retry
 * - Request deduplication
 */
export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig 
      value={{
        fetcher,
        ...swrConfig,
      }}
    >
      {children}
    </SWRConfig>
  );
}
