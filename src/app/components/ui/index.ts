/**
 * UniBee UI Component Library
 * Production-ready, accessible, reusable components
 *
 * @example
 * ```tsx
 * import { Button, Badge, Input } from "@/components/ui";
 *
 * // Button with loading state
 * <Button isLoading={loading}>Submit</Button>
 *
 * // Status badge
 * <StatusBadge status="live" />
 *
 * // Input with validation
 * <Input label="Email" error errorMessage="Invalid email" />
 * ```
 */

// ============================================
// Core Components
// ============================================

export { Button, FAB, ButtonGroup, buttonVariants } from "./button";
export type { ButtonProps, FABProps, ButtonGroupProps } from "./button";

export { Badge, StatusBadge, CountBadge, RewardBadge, badgeVariants } from "./badge";
export type { BadgeProps, StatusBadgeProps, CountBadgeProps, RewardBadgeProps } from "./badge";

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonList,
  ContentSkeleton,
} from "./skeleton";
export type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps, SkeletonCardProps, SkeletonListProps, ContentSkeletonProps } from "./skeleton";

export { ToastProvider, useToast } from "./Toast";
export type { Toast, ToastType, ToastContextValue, ToastProviderProps } from "./Toast";

export { Input, Textarea } from "./input";
export type { InputProps, TextareaProps } from "./input";

// ============================================
// Shadcn UI Components (re-exported for convenience)
// ============================================

export { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
export { EmptyState } from "./EmptyState";
export { Modal } from "./Modal";
export { ProgressBar } from "./ProgressBar";
export { Avatar } from "./avatar";

// ============================================
// Utility Functions
// ============================================

export { cn } from "./utils";