/**
 * Custom hooks for shared functionality
 */

import { useCallback, useRef } from "react";
import { SWIPE } from "./constants";

/**
 * Hook to manage swipe blocking state
 * Used to prevent page navigation during horizontal scroll (e.g., carousels)
 *
 * @example
 * ```tsx
 * const { blockSwipeRef, onTouchStart, onTouchEnd } = useSwipeBlock();
 * // Use onTouchStart/onTouchEnd on carousel elements
 * // Use blockSwipeRef in parent to check state
 * ```
 */
export function useSwipeBlock() {
  const blockSwipeRef = useRef(false);

  const onTouchStart = useCallback(() => {
    blockSwipeRef.current = true;
  }, []);

  const onTouchEnd = useCallback(() => {
    setTimeout(() => {
      blockSwipeRef.current = false;
    }, SWIPE.BLOCK_DELAY_MS);
  }, []);

  return {
    blockSwipeRef,
    onTouchStart,
    onTouchEnd,
  };
}
