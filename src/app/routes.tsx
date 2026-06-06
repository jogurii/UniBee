/**
 * Application Router Configuration
 * React Router 7 with static imports
 * Note: Lazy loading can be implemented via Vite's build config (build.rollupOptions.input)
 */

import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { MainLayout } from "./components/MainLayout";
import { SplashScreen } from "./components/SplashScreen";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { Explore } from "./components/Explore";
import { EventDetail } from "./components/EventDetail";
import { MyTickets } from "./components/MyTickets";
import { Achievements } from "./components/Achievements";
import { CommitteeScanner } from "./components/CommitteeScanner";
import { Notifications } from "./components/Notifications";
import { Profile } from "./components/Profile";
import { Schedule } from "./components/Schedule";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: SplashScreen },
        { path: "login", Component: LoginPage },

        // Full-screen routes (no bottom nav)
        { path: "event/:id", Component: EventDetail },
        { path: "scanner", Component: CommitteeScanner },
        { path: "notifications", Component: Notifications },

        // Main layout routes (with bottom nav)
        {
          path: "/",
          Component: MainLayout,
          children: [
            { path: "dashboard", Component: Dashboard },
            { path: "explore", Component: Explore },
            { path: "tickets", Component: MyTickets },
            { path: "schedule", Component: Schedule },
            { path: "profile", Component: Profile },
            { path: "achievements", Component: Achievements },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);