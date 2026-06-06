/**
 * UniBee Button Component
 * Production-ready button with loading states, variants, and accessibility
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "./utils";

// ============================================
// Variants & Styles
// ============================================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary gradient button (UniBee brand)
        primary:
          "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-500 hover:shadow-orange-500/40",
        // Secondary outline button
        secondary:
          "border-2 border-slate-200 dark:border-white/20 bg-transparent text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10",
        // Ghost/subtle button
        ghost:
          "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white",
        // Destructive (danger) button
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25",
        // Success button
        success:
          "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25",
        // Link style
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-lg",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg rounded-2xl",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        full: "w-full h-12 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ============================================
// Types
// ============================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Use asChild for rendering as different element */
  asChild?: boolean;
  /** Loading state - shows spinner and disables interaction */
  isLoading?: boolean;
  /** Loading text to display while loading */
  loadingText?: string;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
}

// ============================================
// Component
// ============================================

/**
 * Production-ready Button component with:
 * - Loading states with spinner
 * - Multiple variants for different use cases
 * - Icon support (left/right)
 * - Full accessibility support
 * - Touch-friendly sizes
 *
 * @example
 * ```tsx
 * // Primary button with loading
 * <Button isLoading={isSubmitting} loadingText="Submitting...">
 *   Submit
 * </Button>
 *
 * // Icon button
 * <Button variant="ghost" size="icon" aria-label="Delete">
 *   <Trash2 className="size-5" />
 * </Button>
 *
 * // Full width button
 * <Button size="full" leftIcon={<Plus />}>
 *   Add New Item
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const content = isLoading ? (
      <>
        <Loader2 className="animate-spin" aria-hidden="true" />
        <span>{loadingText || children}</span>
      </>
    ) : (
      <>
        {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </>
    );

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && "cursor-wait"
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = "Button";

// ============================================
// Sub-components for common patterns
// ============================================

/**
 * Floating Action Button - positioned fixed at bottom right
 */
export interface FABProps extends ButtonProps {
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}

export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className,
      position = "bottom-right",
      size = "icon",
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      "bottom-right": "fixed bottom-6 right-6",
      "bottom-left": "fixed bottom-6 left-6",
      "bottom-center": "fixed bottom-6 left-1/2 -translate-x-1/2",
    };

    return (
      <Button
        ref={ref}
        className={cn(
          positionClasses[position],
          "shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40",
          className
        )}
        size={size}
        {...props}
      />
    );
  }
);

FAB.displayName = "FAB";

/**
 * Button Group - for related actions
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the button group */
  orientation?: "horizontal" | "vertical";
  /** Gap between buttons */
  gap?: "sm" | "md" | "lg";
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, orientation = "horizontal", gap = "md", children, ...props },
    ref
  ) => {
    const gapClasses = {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-4",
    };

    const orientationClasses = {
      horizontal: "flex-row",
      vertical: "flex-col",
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Button group"
        className={cn(
          "flex",
          gapClasses[gap],
          orientationClasses[orientation],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { buttonVariants };
