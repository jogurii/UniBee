**Add your own guidelines here**
<!--

UniBee Mobile-First Development Guidelines

=====================================
# GENERAL MOBILE-FIRST PRINCIPLES
=====================================

## Screen & Viewport
* Always design for mobile-first (360px-428px width)
* Use `min-h-screen` and `full-h-screen` (100dvh) for proper mobile height
* Use `overflow-x-hidden` to prevent horizontal scroll issues
* Always test on actual mobile devices when possible

## Safe Areas (Notch, Home Bar, etc.)
* Use CSS custom properties for safe areas:
  - `--safe-area-inset-top`, `--safe-area-inset-bottom`
  - `env(safe-area-inset-top)` for dynamic values
* Add padding classes:
  - `pt-safe` - Safe area top padding
  - `pb-safe` - Safe area bottom padding
  - `pt-safe-nav`, `pb-safe-nav` - For navigation areas

## Touch Targets
* Minimum touch target: 44x44px
* Use `.touch-target` class for all interactive elements
* Never place interactive elements too close together

## Typography - Mobile Optimized
* Use clamp() for responsive font sizes:
  - Hero: clamp(1.75rem, 5vw, 2.5rem)
  - Title: clamp(1.25rem, 4vw, 1.75rem)
  - Body: clamp(0.875rem, 3vw, 1rem)

## Scroll Behavior
* Use `-webkit-overflow-scrolling: touch` for smooth scrolling
* Use `.scrollbar-hide` for hidden scrollbars on mobile
* Consider overflow scrolling for long lists

## Bottom Navigation
* Fixed bottom nav must account for safe area:
  - Height: `calc(80px + env(safe-area-inset-bottom))`
  - Use `z-[100]` to stay above content
* Main content must have `pb-safe-nav` padding

=====================================
# COMPONENT GUIDELINES
=====================================

## Buttons
* Primary: min-height 52px, use `.btn-hp-primary`
* Secondary: min-height 48px, use `.btn-hp-secondary`
* Include ripple/press feedback on tap

## Cards
* Border radius: 1.5rem (24px) for mobile
* Use `.card-hp` for consistent styling
* Include active/press states

## Inputs
* Font size: 16px minimum (prevents iOS zoom)
* Height: 52px minimum
* Use `.input-hp` class

## Modals/Bottom Sheets
* Use slide-up animation
* Include drag handle
* Account for safe area at bottom

## Progress Indicators
* Height: 8px for mobile
* Use rounded-full for pill shape

=====================================
# ANIMATIONS - Performance
=====================================

* Use GPU acceleration: `transform: translateZ(0)`
* Use `will-change` sparingly
* Prefer CSS transitions over JS animations
* Respect `prefers-reduced-motion`

=====================================
# PWA SETUP
=====================================

* Include manifest.json in public folder
* Add meta tags for iOS/Android support
* Use SVG icons for scalability
* Test offline mode functionality

=====================================
# DEBUGGING MOBILE ISSUES
=====================================

* Use Chrome DevTools device emulation
* Check for horizontal scroll overflow
* Test on real device for touch issues
* Verify safe area insets on iPhone X+

-->