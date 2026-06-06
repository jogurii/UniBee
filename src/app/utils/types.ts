import React from "react";

/**
 * Shared type definitions across the application
 * Centralized types help maintain consistency and catch errors early
 */

// ============================================
// Swipe Navigation Types
// ============================================

/** Reference type for blocking swipe navigation during horizontal scroll */
export interface SwipeBlockRef {
  blockSwipeRef: React.MutableRefObject<boolean>;
}

// ============================================
// Event Types
// ============================================

/** Reward structure for campus events */
export interface EventReward {
  satPoints?: string;
  certificate?: string;
  eWallet?: string;
}

/** Status options for campus events */
export type EventStatus = "Upcoming" | "Past" | "Confirmed";

/** Event type categories */
export type EventType = "Comserv" | "Seminar";

/** Campus event data model */
export interface CampusEvent {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  mapsQuery: string;
  image: string;
  description: string;
  reward: string;
  rewards: EventReward;
  type: EventType;
  isTFI: boolean;
  quotaRemaining: number;
  quotaTotal: number;
  status: EventStatus;
  ticketCode: string;
}

// ============================================
// Theme Types
// ============================================

/** Available theme options */
export type Theme = "dark" | "light";

/** Theme context interface */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// ============================================
// Navigation Types
// ============================================

/** Bottom navigation visibility state */
export interface BottomNavContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

// ============================================
// Notification Types
// ============================================

/** Notification categories */
export type NotificationType = "reminder" | "reward" | "action" | "status";

/** Notification data structure */
export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
}

// ============================================
// UI Component Types
// ============================================

/** Progress ring component props */
export interface ProgressRingProps {
  percentage: number;
  color: string;
  label: string;
  value: string;
  subValue: string;
}

/** Reward row component props */
export interface RewardRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconClass: string;
}

/** Card component variants */
export type CardVariant = "elevated" | "outlined" | "glass";

/** Card component props */
export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

/** Tab configuration */
export interface Tab {
  id: string;
  label: string;
}

/** Tab bar component props */
export interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  colorClass?: string;
}

/** Empty state component props */
export interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/** Modal component props */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/** Progress bar component props */
export interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
  height?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

// ============================================
// Animation Types
// ============================================

/** Animation timing configuration */
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

/** Motion variant direction */
export type SlideDirection = -1 | 0 | 1;