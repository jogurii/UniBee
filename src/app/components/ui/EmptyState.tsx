/**
 * Reusable EmptyState component
 * Provides consistent empty state UI across the application
 */

import React, { memo } from "react";
import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";
import { cn } from "./utils";

interface EmptyStateProps {
  /** Lucide icon component */
  icon: LucideIcon;
  /** Title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Additional CSS classes */
  className?: string;
}

export const EmptyState = memo(function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("py-16 flex flex-col items-center justify-center text-center", className)}
    >
      <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-slate-300 dark:text-slate-600" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 px-8">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-8 py-4 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 font-bold rounded-2xl hover:bg-orange-100 transition-colors"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
});