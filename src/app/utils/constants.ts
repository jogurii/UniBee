/**
 * Application constants
 * Centralized magic strings and numbers for maintainability
 */

import type { CampusEvent } from "./types";

// ============================================
// Route Paths
// ============================================

export const ROUTES = {
  INDEX: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  EXPLORE: "/explore",
  TICKETS: "/tickets",
  SCHEDULE: "/schedule",
  PROFILE: "/profile",
  ACHIEVEMENTS: "/achievements",
  EVENT_DETAIL: (id: string | number) => `/event/${id}`,
  SCANNER: "/scanner",
  NOTIFICATIONS: "/notifications",
} as const;

// Bottom nav page order for swipe navigation
export const NAV_PAGES = [
  ROUTES.DASHBOARD,
  ROUTES.EXPLORE,
  ROUTES.SCHEDULE,
  ROUTES.PROFILE,
] as const;

// ============================================
// Progress Thresholds
// ============================================

export const PROGRESS = {
  SAT: { current: 85, max: 120 },
  COMSERV: { current: 15, max: 30 },
} as const;

// ============================================
// Animation Timings
// ============================================

export const ANIMATION = {
  PAGE_TRANSITION: { duration: 0.22, ease: "easeOut" },
  PROGRESS_BAR: { duration: 1, delay: 0.2 },
  STAGGER_DELAY: 0.1,
  MODAL_SCALE: { duration: 0.3 },
  SPRING: { stiffness: 300, damping: 30, mass: 0.8 },
} as const;

// ============================================
// Swipe Configuration
// ============================================

export const SWIPE = {
  THRESHOLD: 55,
  BLOCK_DELAY_MS: 100,
  LOCK_THRESHOLD: 12,
} as const;

// ============================================
// UI Constants
// ============================================

export const UI = {
  AVATAR_SIZE: {
    SMALL: "w-10 h-10",
    MEDIUM: "w-12 h-12",
    LARGE: "w-14 h-14",
    XLARGE: "w-20 h-20",
    XXLARGE: "w-28 h-28",
  },
  BORDER_RADIUS: {
    SMALL: "rounded-xl",
    MEDIUM: "rounded-2xl",
    LARGE: "rounded-3xl",
    FULL: "rounded-full",
  },
  SAFE_AREA: {
    NAV: "pb-safe",
    INSET_TOP: "pt-safe",
  },
  TOUCH_TARGET: "min-h-[44px] min-w-[44px]",
} as const;

// ============================================
// Timing Constants
// ============================================

export const TIMING = {
  DOWNLOAD_DURATION_MS: 2000,
  DOWNLOAD_RESET_DELAY_MS: 3000,
  SWIPE_RESET_DELAY_MS: 100,
  TOAST_DURATION_MS: 3000,
} as const;

// ============================================
// Theme Colors
// ============================================

export const COLORS = {
  BRAND: {
    PRIMARY: "orange-500",
    SECONDARY: "amber-400",
    DARK: "#0B1120",
  },
  STATUS: {
    SUCCESS: "emerald-500",
    WARNING: "amber-500",
    ERROR: "red-500",
    INFO: "blue-500",
  },
} as const;

// ============================================
// Event Type Configuration
// ============================================

export const EVENT_TYPE_CONFIG: Record<
  CampusEvent["type"],
  { color: string; iconBg: string; badgeBg: string }
> = {
  Seminar: {
    color: "border-orange-500",
    iconBg: "bg-orange-100 text-orange-600",
    badgeBg: "bg-orange-100/95 border-orange-300 text-orange-700",
  },
  Comserv: {
    color: "border-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-600",
    badgeBg: "bg-blue-100/95 border-blue-300 text-blue-700",
  },
} as const;

// ============================================
// User Data (Mock)
// ============================================

export const MOCK_USER = {
  NAME: "Mahasiswa",
  EMAIL: "maha.siswa@binus.ac.id",
  NIM: "290xxxx413",
  PROGRAM: "Computer Science",
  CAMPUS: "BINUS @Medan",
} as const;