import React from "react";
import { Outlet } from "react-router";

export function Root() {
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
