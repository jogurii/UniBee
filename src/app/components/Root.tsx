import React from "react";
import { Outlet } from "react-router";

export function Root() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 font-sans">
      <Outlet />
    </div>
  );
}
