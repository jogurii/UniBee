/**
 * UniBee Input Component
 * Production-ready input with validation states and accessibility
 */

import * as React from "react";
import { cn } from "./utils";

// ============================================
// Types
// ============================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
}

// ============================================
// Component
// ============================================

const inputSizes = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-base px-4",
  lg: "h-14 text-lg px-5",
};

const iconSizes = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

/**
 * Production-ready Input component with validation states
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your name" />
 * <Input error errorMessage="This field is required" />
 * <Input leftIcon={<Search />} placeholder="Search..." />
 * <Input label="Email" type="email" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = "md",
      error,
      errorMessage,
      leftIcon,
      rightIcon,
      label,
      helperText,
      fullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const hasError = error || !!errorMessage;
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={cn("space-y-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className={cn(
                "absolute left-3 text-slate-400 pointer-events-none",
                iconSizes[size]
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex-1 rounded-xl border bg-white dark:bg-slate-900/50",
              "text-slate-900 dark:text-white placeholder:text-slate-400",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              inputSizes[size],
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-200 dark:border-slate-700",
              fullWidth && "w-full",
              className
            )}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {rightIcon && !hasError && (
            <span
              className={cn(
                "absolute right-3 text-slate-400 pointer-events-none",
                iconSizes[size]
              )}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
          {hasError && (
            <span
              className={cn(
                "absolute right-3 text-red-500 pointer-events-none",
                iconSizes[size]
              )}
              aria-hidden="true"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          )}
        </div>
        {(errorMessage || helperText) && (
          <p
            id={errorMessage ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              "text-xs",
              hasError ? "text-red-500" : "text-slate-500 dark:text-slate-400"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================
// Textarea
// ============================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * Production-ready Textarea component
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message" rows={4} />
 * <Textarea label="Description" error errorMessage="Too short" />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      errorMessage,
      label,
      helperText,
      fullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const hasError = error || !!errorMessage;
    const inputId = id || `textarea-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={cn("space-y-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "flex-1 rounded-xl border bg-white dark:bg-slate-900/50 px-4 py-3",
            "text-slate-900 dark:text-white placeholder:text-slate-400",
            "transition-colors duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-200 dark:border-slate-700",
            fullWidth && "w-full",
            className
          )}
          disabled={disabled}
          aria-invalid={hasError}
          {...props}
        />
        {(errorMessage || helperText) && (
          <p
            className={cn(
              "text-xs",
              hasError ? "text-red-500" : "text-slate-500 dark:text-slate-400"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
