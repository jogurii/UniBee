/**
 * Reusable Modal component with animation support
 * Provides consistent modal UI across the application
 */

import React, { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./utils";

interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

export const Modal = memo(function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  className
}: ModalProps) {
  const maxWidthClass = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md"
  }[size];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={cn(
              "relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full shadow-2xl border border-slate-100 dark:border-white/5",
              maxWidthClass,
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});