import { memo } from "react";
import { Outlet } from "react-router";

/**
 * Root layout component - wraps the entire app with desktop shell styling.
 * Pure presentational component with no state; wrapped in memo to prevent
 * unnecessary re-renders when parent context changes.
 */
function RootComponent() {
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
        <div className="phone-screen">
          <Outlet />
        </div>
        <div className="phone-home-bar" />
      </div>
    </div>
  );
}

// Wrap with memo since this is a pure presentational component with no state
export const Root = memo(RootComponent);
