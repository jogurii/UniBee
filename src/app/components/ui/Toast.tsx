/**
 * UniBee Toast Component & Toast Provider
 * Production-ready toast notification system with accessibility
 */

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "./utils";

// ============================================
// Types
// ============================================

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  success: (title: string, message?: string) => string;
  error: (title: string, message?: string) => string;
  warning: (title: string, message?: string) => string;
  info: (title: string, message?: string) => string;
}

// ============================================
// Context
// ============================================

const ToastContext = createContext<ToastContextValue | null>(null);

// ============================================
// Provider
// ============================================

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
  maxToasts?: number;
  position?: "top" | "bottom";
}

let toastIdCounter = 0;

export function ToastProvider({
  children,
  defaultDuration = 4000,
  maxToasts = 5,
  position = "bottom",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `toast-${++toastIdCounter}`;
      const newToast: Toast = { ...toast, id };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });

      if (toast.duration !== 0) {
        setTimeout(() => removeToast(id), toast.duration || defaultDuration);
      }

      return id;
    },
    [defaultDuration, maxToasts, removeToast]
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (title: string, message?: string) =>
      addToast({ type: "success", title, message }),
    [addToast]
  );
  const error = useCallback(
    (title: string, message?: string) =>
      addToast({ type: "error", title, message }),
    [addToast]
  );
  const warning = useCallback(
    (title: string, message?: string) =>
      addToast({ type: "warning", title, message }),
    [addToast]
  );
  const info = useCallback(
    (title: string, message?: string) =>
      addToast({ type: "info", title, message }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} position={position} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

/**
 * Hook to access toast functionality
 * @throws Error if used outside ToastProvider
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// ============================================
// Toast Container
// ============================================

interface ToastContainerProps {
  toasts: Toast[];
  position: "top" | "bottom";
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, position, onDismiss }: ToastContainerProps) {
  return (
    <div
      className={cn(
        "fixed left-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none",
        position === "top" ? "top-safe top-4" : "bottom-24"
      )}
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} position={position} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Toast Item
// ============================================

interface ToastItemProps {
  toast: Toast;
  position: "top" | "bottom";
  onDismiss: () => void;
}

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: "border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/30",
  error: "border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30",
  warning: "border-amber-200 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30",
  info: "border-blue-200 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/30",
};

const toastIconColors = {
  success: "text-emerald-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};

function ToastItem({ toast, position, onDismiss }: ToastItemProps) {
  const Icon = toastIcons[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: position === "bottom" ? 50 : -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 p-4 rounded-2xl border shadow-xl shadow-black/5 dark:shadow-black/20 pointer-events-auto",
        "bg-white dark:bg-slate-900",
        toastStyles[toast.type]
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", toastIconColors[toast.type])} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-slate-900 dark:text-white">{toast.title}</p>
        {toast.message && (
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{toast.message}</p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-xs font-bold text-orange-500 hover:text-orange-600"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="shrink-0 p-1 -mr-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-slate-400" />
      </button>
    </motion.div>
  );
}
