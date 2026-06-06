/**
 * MainLayout configuration constants
 * Extracted for better separation of concerns and reusability
 */

// Page routes for swipe navigation
export const PAGES = ["/dashboard", "/explore", "/schedule", "/profile"] as const;

// Animation variants - moved outside component for stability
export const pageVariants = {
  enter: (dir: number) => ({
    x: dir >= 1 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir >= 1 ? "-100%" : "100%",
    opacity: 0,
  }),
};

/**
 * Get the page index from a path
 * @param path - Current pathname
 * @returns Index of the page in PAGES array, or -1 if not found
 */
export function getPageIndex(path: string): number {
  const seg = "/" + path.split("/")[1];
  return PAGES.indexOf(seg as (typeof PAGES)[number]);
}

// Animation config
export const ANIMATION_CONFIG = {
  PAGE_TRANSITION: { duration: 0.22, ease: "easeOut" },
  SPRING: { stiffness: 300, damping: 30, mass: 0.8 },
} as const;

// Swipe config
export const SWIPE_CONFIG = {
  THRESHOLD: 55,
  LOCK_THRESHOLD: 12,
} as const;