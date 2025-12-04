// ============================================================
// SWR Fetcher Functions
// ============================================================

/**
 * Default JSON fetcher for SWR
 * Handles response parsing and error handling
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object
    (error as any).info = await response.json().catch(() => null);
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

/**
 * POST fetcher for SWR mutations
 */
export const postFetcher = async <T, D = unknown>(
  url: string, 
  { arg }: { arg: D }
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  
  if (!response.ok) {
    const error = new Error('An error occurred while posting data.');
    (error as any).info = await response.json().catch(() => null);
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

/**
 * PUT fetcher for SWR mutations
 */
export const putFetcher = async <T, D = unknown>(
  url: string, 
  { arg }: { arg: D }
): Promise<T> => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  
  if (!response.ok) {
    const error = new Error('An error occurred while updating data.');
    (error as any).info = await response.json().catch(() => null);
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

/**
 * DELETE fetcher for SWR mutations
 */
export const deleteFetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = new Error('An error occurred while deleting data.');
    (error as any).info = await response.json().catch(() => null);
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

/**
 * Fetcher with authentication header
 */
export const authFetcher = async <T>(url: string): Promise<T> => {
  const token = localStorage.getItem('auth_token');
  
  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = await response.json().catch(() => null);
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

/**
 * Multi-key fetcher for parallel requests
 */
export const multiFetcher = async <T>(...urls: string[]): Promise<T[]> => {
  return Promise.all(urls.map(url => fetcher<T>(url)));
};
