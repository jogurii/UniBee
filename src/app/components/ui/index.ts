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

export { Button, FAB, ButtonGroup, buttonVariants } from "./Button";
export type { ButtonProps, FABProps, ButtonGroupProps } from "./Button";

export { Badge, StatusBadge, CountBadge, RewardBadge, badgeVariants } from "./Badge";
export type { BadgeProps, StatusBadgeProps, CountBadgeProps, RewardBadgeProps } from "./Badge";

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonList,
  ContentSkeleton,
} from "./Skeleton";
export type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps, SkeletonCardProps, SkeletonListProps, ContentSkeletonProps } from "./Skeleton";

export { ToastProvider, useToast } from "./Toast";
export type { Toast, ToastType, ToastContextValue, ToastProviderProps } from "./Toast";

export { Input, Textarea } from "./Input";
export type { InputProps, TextareaProps } from "./Input";

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