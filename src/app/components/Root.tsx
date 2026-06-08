import { memo } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";

/**
 * Root layout component - wraps the entire app with desktop shell styling.
 * Pure presentational component with no state; wrapped in memo to prevent
 * unnecessary re-renders when parent context changes.
 */
function RootComponent() {
  const location = useLocation();
  // Use only the top-level path segment as the key so nested routes (like inside /app)
  // don't trigger the root transition and unmount the MainLayout.
  const rootKey = location.pathname.split('/')[1] || 'root';

  return (
    <div className="desktop-shell">
      {/* Decorative background blobs */}
      <div className="desktop-bg-blob blob-1" />
      <div className="desktop-bg-blob blob-2" />
      <div className="desktop-bg-blob blob-3" />

      {/* Branding hint for desktop visitors */}
      <div className="desktop-brand-hint">
        <span className="desktop-brand-name">UniBee</span>
        <span className="desktop-brand-sub">Campus App · BINUS @Medan</span>
      </div>

      {/* Phone frame */}
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen bg-[#0B1120]">
          <AnimatePresence>
            <motion.div
              key={rootKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full overflow-y-auto overscroll-y-contain"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="phone-home-bar" />
      </div>
    </div>
  );
}

// Wrap with memo since this is a pure presentational component with no state
export const Root = memo(RootComponent);
