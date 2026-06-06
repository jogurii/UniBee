/**
 * UniBee Badge Component
 * Production-ready badge with status indicators and accessibility
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ============================================
// Variants & Styles
// ============================================

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap shrink-0 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
        secondary:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        success:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
        warning:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
        destructive:
          "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
        info:
          "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
        outline:
          "border border-slate-200 bg-transparent text-slate-600 dark:border-white/20 dark:text-slate-300",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white",
        gradient:
          "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-sm",
        tfi: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px] rounded-md",
        md: "px-2.5 py-1 text-xs rounded-lg",
        lg: "px-3 py-1.5 text-sm rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================
// Types
// ============================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  dot?: boolean;
  dotColor?: string;
}

// ============================================
// Component
// ============================================

/**
 * Production-ready Badge component with multiple variants and accessibility
 *
 * @example
 * ```tsx
 * <Badge variant="success">Verified</Badge>
 * <Badge variant="warning" dot>Pending</Badge>
 * <Badge variant="gradient">New!</Badge>
 * <Badge variant="tfi">TFI Verified</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, dotColor, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "size-1.5 rounded-full animate-pulse",
              dotColor ||
                (variant === "success" && "bg-emerald-500") ||
                (variant === "warning" && "bg-amber-500") ||
                (variant === "destructive" && "bg-red-500") ||
                (variant === "info" && "bg-blue-500") ||
                (variant === "gradient" && "bg-white") ||
                (variant === "tfi" && "bg-blue-500") ||
                "bg-orange-500"
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </Comp>
    );
  }
);

Badge.displayName = "Badge";

// ============================================
// Status Badge
// ============================================

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: "upcoming" | "live" | "completed" | "cancelled" | "pending" | "confirmed";
}

const statusConfig: Record<
  StatusBadgeProps["status"],
  { label: string; variant: BadgeProps["variant"]; dot?: boolean }
> = {
  upcoming: { label: "Upcoming", variant: "info" },
  live: { label: "Live", variant: "success", dot: true },
  completed: { label: "Completed", variant: "secondary" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  pending: { label: "Pending", variant: "warning", dot: true },
  confirmed: { label: "Confirmed", variant: "success" },
};

/**
 * Convenience component for common status indicators
 *
 * @example
 * ```tsx
 * <StatusBadge status="live" />
 * <StatusBadge status="upcoming" />
 * ```
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className, ...props }, ref) => {
    const config = statusConfig[status];

    return (
      <Badge
        ref={ref}
        variant={config.variant}
        dot={config.dot}
        className={className}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

// ============================================
// Count Badge
// ============================================

export interface CountBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  maxCount?: number;
}

/**
 * Notification count badge
 *
 * @example
 * ```tsx
 * <CountBadge>5</CountBadge>
 * <CountBadge maxCount={99}>150</CountBadge> // Shows "99+"
 * ```
 */
export const CountBadge = React.forwardRef<HTMLSpanElement, CountBadgeProps>(
  ({ className, children, maxCount = 99, ...props }, ref) => {
    const count = Number(children);
    const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold rounded-full",
          "bg-red-500 text-white",
          className
        )}
        aria-label={count > 0 ? `${count} items` : undefined}
        {...props}
      >
        {displayCount}
      </span>
    );
  }
);

CountBadge.displayName = "CountBadge";

// ============================================
// Reward Badge
// ============================================

export interface RewardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: "sat" | "comserv" | "certificate" | "ewallet";
  points?: string;
}

const rewardColors: Record<NonNullable<RewardBadgeProps["type"]>, string> = {
  sat: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30",
  comserv: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
  certificate: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/30",
  ewallet: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
};

/**
 * Specialized badge for displaying event rewards
 *
 * @example
 * ```tsx
 * <RewardBadge type="sat" points="+4 SAT Points" />
 * <RewardBadge type="comserv" points="+5 Jam" />
 * ```
 */
export const RewardBadge = React.forwardRef<HTMLSpanElement, RewardBadgeProps>(
  ({ className, type = "sat", points, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold",
          rewardColors[type],
          className
        )}
        {...props}
      >
        {children || points}
      </span>
    );
  }
);

RewardBadge.displayName = "RewardBadge";

export { badgeVariants };
