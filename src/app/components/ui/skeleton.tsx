/**
 * UniBee Skeleton Component
 * Production-ready loading skeleton with animation and variants
 */

import * as React from "react";
import { cn } from "./utils";

// ============================================
// Types
// ============================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pulse" | "wave" | "none";
  width?: string | number;
  height?: string | number;
  radius?: "sm" | "md" | "lg" | "full" | "none";
}

// ============================================
// Base Skeleton
// ============================================

/**
 * Production-ready Skeleton component for loading states
 */
export function Skeleton({
  className,
  variant = "pulse",
  width,
  height,
  radius = "md",
  style,
  ...props
}: SkeletonProps) {
  const radiusClasses = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
    none: "rounded-none",
  };

  const variantClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]",
    none: "",
  };

  return (
    <div
      className={cn(
        "bg-slate-200 dark:bg-slate-800",
        variantClasses[variant],
        radiusClasses[radius],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ============================================
// Skeleton Text
// ============================================

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
  lineHeight?: string;
  gap?: string;
}

/**
 * Skeleton for text content with multiple lines
 */
export function SkeletonText({
  className,
  lines = 3,
  lastLineWidth = "100%",
  lineHeight = "h-4",
  gap = "gap-2",
  ...props
}: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col", gap, className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(lineHeight)}
          style={{ width: i === lines - 1 && lines > 1 ? lastLineWidth : "100%" }}
        />
      ))}
    </div>
  );
}

// ============================================
// Skeleton Avatar
// ============================================

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
};

/**
 * Skeleton for avatar placeholder
 */
export function SkeletonAvatar({ className, size = "md", ...props }: SkeletonAvatarProps) {
  return <Skeleton variant="circle" className={cn(avatarSizes[size], className)} {...props} />;
}

// ============================================
// Skeleton Card
// ============================================

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact";
}

/**
 * Skeleton for card placeholder
 */
export function SkeletonCard({ className, variant = "default", ...props }: SkeletonCardProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex gap-3 p-4", className)} {...props}>
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 p-4 rounded-xl bg-white dark:bg-slate-900/50", className)} {...props}>
      <Skeleton className="w-full h-40 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

// ============================================
// Skeleton List
// ============================================

export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  itemVariant?: "default" | "compact";
}

/**
 * Skeleton for list of items
 */
export function SkeletonList({
  className,
  count = 5,
  itemVariant = "default",
  ...props
}: SkeletonListProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={itemVariant} />
      ))}
    </div>
  );
}

// ============================================
// Content Skeleton (Page Loading)
// ============================================

export interface ContentSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "feed" | "profile" | "dashboard" | "list";
}

/**
 * Full page content skeleton for loading states
 */
export function ContentSkeleton({
  className,
  variant = "feed",
  ...props
}: ContentSkeletonProps) {
  if (variant === "profile") {
    return (
      <div className={cn("space-y-6 p-6", className)} {...props}>
        <div className="flex items-center gap-4">
          <SkeletonAvatar size="xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <SkeletonText lines={4} />
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div className={cn("space-y-6 p-6", className)} {...props}>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-48 rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return <SkeletonList count={5} itemVariant="compact" />;
  }

  return (
    <div className={cn("space-y-6 p-6", className)} {...props}>
      <Skeleton className="h-64 rounded-xl" />
      <SkeletonText lines={3} />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
