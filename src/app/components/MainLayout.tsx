/**
 * MainLayout Component
 * Provides swipe navigation and bottom nav bar for the main app pages
 */

import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Compass, Ticket, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNavProvider, useBottomNav } from "../contexts/BottomNavContext";
import { PAGES, getPageIndex, ANIMATION_CONFIG, pageVariants } from "./MainLayout.config";

// ============================================
// Sub-components (memoized for performance)
// ============================================

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

const NavButton = memo(function NavButton({ icon, label, isActive, onClick, ariaLabel }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || label}
      aria-current={isActive ? "page" : undefined}
      className={`touch-target flex flex-col items-center gap-1 transition-all ${
        isActive
          ? "text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
          : "text-slate-400 hover:text-orange-500"
      }`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
});

interface TicketButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const TicketButton = memo(function TicketButton({ isActive, onClick }: TicketButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="My Tickets"
      aria-current={isActive ? "page" : undefined}
      className={`w-14 h-14 rounded-full flex items-center justify-center -mt-8 border-4 border-white dark:border-[#0B1120] touch-target transition-all shadow-lg ${
        isActive
          ? "bg-gradient-to-tr from-orange-600 to-amber-500 translate-y-[-2px] shadow-[0_4px_16px_rgba(249,115,22,0.5)]"
          : "bg-gradient-to-tr from-orange-400 to-amber-300 hover:-translate-y-1"
      }`}
    >
      <Ticket className="w-6 h-6 text-white" />
    </button>
  );
});

// ============================================
// MainLayout Content (uses context)
// ============================================

function MainLayoutContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { isVisible, setIsVisible } = useBottomNav();

  const direction = location.state?.direction ?? 1;
  const activeIndex = getPageIndex(path);
  // Dummy ref kept to prevent crashes in child components that useOutletContext
  const blockSwipeRef = useRef(false);

  // Reset nav visibility on route change
  useEffect(() => {
    setIsVisible(true);
  }, [path, setIsVisible]);



  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  // Navigation handlers
  const handleNavClick = useCallback((targetIndex: number) => {
    if (activeIndex !== targetIndex) {
      const newDirection = targetIndex > activeIndex ? 1 : -1;
      navigate(PAGES[targetIndex], { state: { direction: newDirection } });
    }
  }, [activeIndex, navigate]);

  return (
    <div
      className="absolute inset-0 w-full h-full bg-slate-50 dark:bg-[#0B1120] select-none pf-page overflow-hidden flex flex-col"
      onContextMenu={handleContextMenu}
    >
      {/* Page Content - Animated with Framer Motion for directional sliding */}
      <motion.div 
        className="relative flex-1 w-full overflow-hidden"
      >
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={path}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={ANIMATION_CONFIG.PAGE_TRANSITION}
            className="pf-content absolute inset-0 w-full h-full overflow-y-auto overscroll-y-contain"
          >
            <Outlet context={{ blockSwipeRef }} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom Navigation Bar */}
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={ANIMATION_CONFIG.SPRING}
            className="relative shrink-0 w-full bg-white/95 dark:bg-[#0B1120]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-6 py-4 flex justify-between items-center z-[100] pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pf-nav"
            aria-label="Main navigation"
          >
            <NavButton
              icon={<Home className="w-6 h-6" />}
              label="Home"
              isActive={activeIndex === 0}
              onClick={() => handleNavClick(0)}
              ariaLabel="Navigate to Home"
            />

            <NavButton
              icon={<Compass className="w-6 h-6" />}
              label="Explore"
              isActive={activeIndex === 1}
              onClick={() => handleNavClick(1)}
              ariaLabel="Navigate to Explore"
            />

            <TicketButton isActive={activeIndex === 2} onClick={() => handleNavClick(2)} />

            <NavButton
              icon={<Calendar className="w-6 h-6" />}
              label="Schedule"
              isActive={activeIndex === 3}
              onClick={() => handleNavClick(3)}
              ariaLabel="Navigate to Schedule"
            />

            <NavButton
              icon={<User className="w-6 h-6" />}
              label="Profile"
              isActive={activeIndex === 4}
              onClick={() => handleNavClick(4)}
              ariaLabel="Navigate to Profile"
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Wrapper with Provider
// ============================================

/**
 * MainLayout wraps the bottom nav pages with the BottomNavProvider
 * This allows child components to control nav visibility via useBottomNav()
 */
export function MainLayout() {
  return (
    <BottomNavProvider>
      <MainLayoutContent />
    </BottomNavProvider>
  );
}