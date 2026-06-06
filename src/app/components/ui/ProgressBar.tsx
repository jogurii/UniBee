/**
 * Reusable ProgressBar component with animation support
 * Provides consistent progress bar styling across the application
 */

import React, { memo } from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface ProgressBarProps {
  /** Current value */
  value: number;
  /** Maximum value */
  max: number;
  /** Tailwind gradient class for the fill */
  colorClass?: string;
  /** Height variant: sm (h-2), md (h-2.5), lg (h-3) */
  height?: "sm" | "md" | "lg";
  /** Whether to animate the bar */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ProgressBar = memo(function ProgressBar({
  value,
  max,
  colorClass = "bg-gradient-to-r from-orange-500 to-amber-400",
  height = "md",
  animated = true,
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const heightClass = {
    sm: "h-2",
    md: "h-2.5",
    lg: "h-3"
  }[height];

  return (
    <div
      className={cn(
        "w-full rounded-full overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800",
        heightClass,
        className
      )}
    >
      <motion.div
        className={cn("h-full rounded-full", colorClass)}
        initial={animated ? { width: 0 } : false}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </div>
  );
});