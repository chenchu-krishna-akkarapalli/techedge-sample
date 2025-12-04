// ============================================================
// SWR Custom Hooks
// Implements all required use cases:
// - Fast page navigation
// - Polling on interval
// - Data dependency
// - Revalidation on focus/network recovery
// - Local mutation (Optimistic UI)
// - Smart error retry
// - Pagination and scroll position recovery
// ============================================================

import useSWR, { useSWRConfig, SWRConfiguration, Key } from 'swr';
import useSWRMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useEffect, useRef } from 'react';
import { fetcher, postFetcher, putFetcher } from './fetchers';
import { POLLING_INTERVALS } from './config';

// ============================================================
// Types
// ============================================================
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

interface UseDataOptions<T> extends SWRConfiguration<T> {
  enabled?: boolean;
}

// ============================================================
// 1. Fast Page Navigation Hook
// Uses SWR's built-in caching for instant page transitions
// ============================================================
export function usePreloadedData<T>(
  key: Key,
  options?: UseDataOptions<T>
) {
  const { enabled = true, ...swrOptions } = options || {};
  
  return useSWR<T>(
    enabled ? key : null,
    fetcher,
    {
      // Keep data fresh in cache for fast navigation
      revalidateOnMount: true,
      // Don't show stale data while revalidating
      revalidateIfStale: true,
      ...swrOptions,
    }
  );
}

/**
 * Preload data for a route before navigation
 * Call this on hover/focus of navigation links
 */
export function usePreload() {
  const { mutate } = useSWRConfig();
  
  return useCallback((key: string) => {
    // Trigger a preload by mutating with no data
    mutate(key, fetcher(key), { revalidate: false });
  }, [mutate]);
}

// ============================================================
// 2. Polling on Interval Hook
// For real-time data updates
// ============================================================
export function usePollingData<T>(
  key: Key,
  interval: keyof typeof POLLING_INTERVALS | number = 'NORMAL',
  options?: UseDataOptions<T>
) {
  const { enabled = true, ...swrOptions } = options || {};
  const refreshInterval = typeof interval === 'number' 
    ? interval 
    : POLLING_INTERVALS[interval];
  
  return useSWR<T>(
    enabled ? key : null,
    fetcher,
    {
      refreshInterval,
      // Keep polling even when window is not focused
      refreshWhenHidden: false,
      // Stop polling when offline
      refreshWhenOffline: false,
      ...swrOptions,
    }
  );
}

// ============================================================
// 3. Data Dependency Hook
// Fetch data that depends on other data
// ============================================================
export function useDependentData<T, D>(
  getDependency: () => D | null | undefined,
  getKey: (dependency: D) => Key,
  options?: UseDataOptions<T>
) {
  const { enabled = true, ...swrOptions } = options || {};
  const dependency = getDependency();
  
  return useSWR<T>(
    enabled && dependency ? getKey(dependency) : null,
    fetcher,
    swrOptions
  );
}

/**
 * Example usage:
 * const { data: user } = useUser();
 * const { data: orders } = useDependentData(
 *   () => user?.id,
 *   (userId) => `/api/users/${userId}/orders`
 * );
 */

// ============================================================
// 4. Local Mutation Hook (Optimistic UI)
// Update UI immediately, sync with server in background
// ============================================================
export function useOptimisticMutation<T, D = Partial<T>>(
  key: Key,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error, rollbackData: T | undefined) => void;
  }
) {
  const { mutate } = useSWRConfig();
  
  const optimisticUpdate = useCallback(
    async (
      updateFn: (currentData: T | undefined) => T,
      serverUpdate: () => Promise<T>
    ) => {
      // Get current data for rollback
      const previousData = await mutate<T>(key, undefined, { revalidate: false });
      
      try {
        // Optimistically update the UI
        await mutate<T>(
          key,
          updateFn(previousData),
          { revalidate: false }
        );
        
        // Perform the actual server update
        const serverData = await serverUpdate();
        
        // Update with server response
        await mutate(key, serverData, { revalidate: false });
        
        options?.onSuccess?.(serverData);
        return serverData;
      } catch (error) {
        // Rollback on error
        await mutate(key, previousData, { revalidate: false });
        options?.onError?.(error as Error, previousData);
        throw error;
      }
    },
    [key, mutate, options]
  );
  
  return { optimisticUpdate };
}

/**
 * SWR Mutation hook for form submissions
 */
export function useFormMutation<T, D>(
  url: string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  }
) {
  return useSWRMutation<T, Error, string, D>(
    url,
    postFetcher,
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
      // Revalidate related data after mutation
      revalidate: true,
    }
  );
}

// ============================================================
// 5. Pagination Hook with Scroll Position Recovery
// ============================================================
export function usePaginatedData<T>(
  baseKey: string,
  pageSize: number = 10,
  options?: UseDataOptions<PaginatedResponse<T>>
) {
  const { enabled = true, ...swrOptions } = options || {};
  const scrollPositionRef = useRef<number>(0);
  
  const getKey = (pageIndex: number, previousPageData: PaginatedResponse<T> | null) => {
    // Don't fetch if disabled
    if (!enabled) return null;
    
    // Reached the end
    if (previousPageData && !previousPageData.hasMore) return null;
    
    // Return the key for this page
    return `${baseKey}?page=${pageIndex + 1}&pageSize=${pageSize}`;
  };
  
  const result = useSWRInfinite<PaginatedResponse<T>>(
    getKey,
    fetcher,
    {
      // Keep previous data during pagination
      keepPreviousData: true,
      // Revalidate first page only
      revalidateFirstPage: true,
      // Persist data between navigations
      persistSize: true,
      ...swrOptions,
    }
  );
  
  // Save scroll position before unmount
  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositionRef.current = window.scrollY;
    };
    
    window.addEventListener('beforeunload', saveScrollPosition);
    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, []);
  
  // Restore scroll position on mount
  useEffect(() => {
    if (scrollPositionRef.current > 0 && result.data) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [result.data]);
  
  // Flatten paginated data
  const flatData = result.data?.flatMap(page => page.data) ?? [];
  const isLoadingMore = result.isLoading || 
    (result.size > 0 && result.data && typeof result.data[result.size - 1] === 'undefined');
  const hasMore = result.data?.[result.data.length - 1]?.hasMore ?? false;
  const total = result.data?.[0]?.total ?? 0;
  
  return {
    ...result,
    data: flatData,
    isLoadingMore,
    hasMore,
    total,
    loadMore: () => result.setSize(result.size + 1),
  };
}

// ============================================================
// 6. Infinite Scroll Hook
// ============================================================
export function useInfiniteScroll<T>(
  baseKey: string,
  options?: {
    pageSize?: number;
    threshold?: number;
    enabled?: boolean;
  }
) {
  const { pageSize = 10, threshold = 200, enabled = true } = options || {};
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  const pagination = usePaginatedData<T>(baseKey, pageSize, { enabled });
  
  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!enabled) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination.hasMore && !pagination.isLoadingMore) {
          pagination.loadMore();
        }
      },
      { rootMargin: `${threshold}px` }
    );
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [enabled, pagination.hasMore, pagination.isLoadingMore, pagination.loadMore, threshold]);
  
  return {
    ...pagination,
    loadMoreRef,
  };
}

// ============================================================
// 7. Mutation with Optimistic Updates Hook
// ============================================================
export function useUpdateItem<T extends { id: string | number }>(
  listKey: Key,
  updateEndpoint: (id: string | number) => string
) {
  const { mutate } = useSWRConfig();
  
  const updateItem = useCallback(
    async (item: T) => {
      // Optimistic update
      await mutate<T[]>(
        listKey,
        (currentData) => {
          if (!currentData) return currentData;
          return currentData.map((d) => 
            d.id === item.id ? item : d
          );
        },
        { revalidate: false }
      );
      
      try {
        // Server update
        const response = await fetch(updateEndpoint(item.id), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        
        if (!response.ok) throw new Error('Update failed');
        
        const updatedItem = await response.json();
        
        // Update with server response
        await mutate<T[]>(
          listKey,
          (currentData) => {
            if (!currentData) return currentData;
            return currentData.map((d) => 
              d.id === updatedItem.id ? updatedItem : d
            );
          },
          { revalidate: false }
        );
        
        return updatedItem;
      } catch (error) {
        // Revalidate on error to get correct state
        await mutate(listKey);
        throw error;
      }
    },
    [listKey, mutate, updateEndpoint]
  );
  
  return { updateItem };
}

// ============================================================
// 8. Delete with Optimistic Update
// ============================================================
export function useDeleteItem<T extends { id: string | number }>(
  listKey: Key,
  deleteEndpoint: (id: string | number) => string
) {
  const { mutate } = useSWRConfig();
  
  const deleteItem = useCallback(
    async (id: string | number) => {
      // Optimistic removal
      await mutate<T[]>(
        listKey,
        (currentData) => {
          if (!currentData) return currentData;
          return currentData.filter((d) => d.id !== id);
        },
        { revalidate: false }
      );
      
      try {
        const response = await fetch(deleteEndpoint(id), {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Delete failed');
        
        return true;
      } catch (error) {
        // Revalidate on error to restore item
        await mutate(listKey);
        throw error;
      }
    },
    [listKey, mutate, deleteEndpoint]
  );
  
  return { deleteItem };
}
