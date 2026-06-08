/**
 * MainLayout configuration constants
 * Extracted for better separation of concerns and reusability
 */

// Page routes for swipe navigation (matches bottom nav order: Home, Explore, Tickets, Schedule, Profile)
export const PAGES = ["/app", "/app/explore", "/app/tickets", "/app/schedule", "/app/profile"] as const;



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
  // Strip base URL prefix (e.g., "/UniBee") for matching
  const cleanPath = path.replace(/^\/UniBee/, "");
  
  // Custom mapping for sub-pages to highlight specific nav items
  if (cleanPath.startsWith("/app/achievements")) {
    return 4; // Profile tab index
  }

  // Find the longest matching page path
  let bestIndex = -1;
  for (let i = 0; i < PAGES.length; i++) {
    if (cleanPath.startsWith(PAGES[i])) {
      if (bestIndex === -1 || PAGES[i].length > PAGES[bestIndex].length) {
        bestIndex = i;
      }
    }
  }
  return bestIndex;
}

// Animation config
export const ANIMATION_CONFIG = {
  PAGE_TRANSITION: { duration: 0.22, ease: "easeOut" },
  SPRING: { stiffness: 300, damping: 30, mass: 0.8 },
} as const;
