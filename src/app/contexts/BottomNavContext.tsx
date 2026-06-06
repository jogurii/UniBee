/**
 * Bottom Navigation Context
 * Provides bottom nav visibility control and swipe blocking for child components
 *
 * Fixes circular dependency where MyTickets was importing useBottomNav from MainLayout
 */

import { createContext, useContext, useState, useCallback, useRef, type ReactNode, type RefObject } from "react";

// ============================================
// Types
// ============================================

interface BottomNavContextValue {
  /** Controls bottom nav visibility */
  isVisible: boolean;
  /** Setter for bottom nav visibility */
  setIsVisible: (visible: boolean) => void;
  /** Reference that child components can use to block swipe navigation */
  blockSwipeRef: RefObject<boolean>;
}

// ============================================
// Context
// ============================================

const BottomNavContext = createContext<BottomNavContextValue | null>(null);

// ============================================
// Provider
// ============================================

interface BottomNavProviderProps {
  children: ReactNode;
}

export function BottomNavProvider({ children }: BottomNavProviderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const blockSwipeRef = useRef(false);

  const handleSetIsVisible = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  return (
    <BottomNavContext.Provider value={{ isVisible, setIsVisible: handleSetIsVisible, blockSwipeRef }}>
      {children}
    </BottomNavContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

/**
 * Hook to access bottom navigation controls
 * @throws Error if used outside of BottomNavProvider
 */
export function useBottomNav() {
  const context = useContext(BottomNavContext);
  if (!context) {
    throw new Error("useBottomNav must be used within BottomNavProvider");
  }
  return context;
}

/**
 * Hook to access swipe blocking reference
 * Components with horizontal scroll can set blockSwipeRef.current = true
 * to prevent page swipe navigation
 */
export function useSwipeBlock(): RefObject<boolean> {
  const { blockSwipeRef } = useBottomNav();
  return blockSwipeRef;
}
