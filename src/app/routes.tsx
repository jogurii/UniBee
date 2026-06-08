/**
 * Application Router Configuration
 * React Router 7 with lazy loading
 */

import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { MainLayout } from "./components/MainLayout";
import { SplashScreen } from "./components/SplashScreen";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: SplashScreen },
        { path: "login", lazy: async () => { const m = await import("./components/LoginPage"); return { Component: m.LoginPage }; } },

        // Full-screen routes (no bottom nav)
        { path: "event/:id", lazy: async () => { const m = await import("./components/EventDetail"); return { Component: m.EventDetail }; } },
        { path: "scanner", lazy: async () => { const m = await import("./components/CommitteeScanner"); return { Component: m.CommitteeScanner }; } },
        { path: "notifications", lazy: async () => { const m = await import("./components/Notifications"); return { Component: m.Notifications }; } },

        // Main layout routes (with bottom nav) — unique path avoids conflict
        {
          path: "app",
          Component: MainLayout,
          children: [
            { index: true, lazy: async () => { const m = await import("./components/Dashboard"); return { Component: m.Dashboard }; } },
            { path: "explore", lazy: async () => { const m = await import("./components/Explore"); return { Component: m.Explore }; } },
            { path: "tickets", lazy: async () => { const m = await import("./components/MyTickets"); return { Component: m.MyTickets }; } },
            { path: "schedule", lazy: async () => { const m = await import("./components/Schedule"); return { Component: m.Schedule }; } },
            { path: "profile", lazy: async () => { const m = await import("./components/Profile"); return { Component: m.Profile }; } },
            { path: "achievements", lazy: async () => { const m = await import("./components/Achievements"); return { Component: m.Achievements }; } },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);