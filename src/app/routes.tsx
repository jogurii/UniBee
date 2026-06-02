import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { MainLayout } from "./components/MainLayout"; // Import Layout Baru
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: "login", Component: LoginPage },
      
      // HALAMAN TANPA BOTTOM NAV (Layar Penuh)
      { path: "event/:id", Component: EventDetail },
      { path: "scanner", Component: CommitteeScanner },
      { path: "notifications", Component: Notifications },
      
      // HALAMAN DENGAN BOTTOM NAV (Dibungkus Layout)
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
]);