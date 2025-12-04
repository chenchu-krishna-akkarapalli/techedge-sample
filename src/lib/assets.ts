// ============================================================
// Asset Paths - Centralized image paths (from public folder)
// Works with GoDaddy hosting using relative paths
// ============================================================

// Helper to get base URL for assets
const getAssetPath = (path: string): string => {
  // In production, assets are served from root
  // In development, Vite handles the base path
  return path;
};

// Hero Section
export const imgInnerScreen = getAssetPath('/assets/2b19803f6c5e3c26b39f607fe129d1919300df81.png');
