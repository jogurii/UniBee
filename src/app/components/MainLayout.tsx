import React, { useEffect, createContext, useContext, useState, useCallback, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Compass, Ticket, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BottomNavContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const BottomNavContext = createContext<BottomNavContextType>({
  isVisible: true,
  setIsVisible: () => {},
});

export const useBottomNav = () => useContext(BottomNavContext);

// Swipe order: dashboard(0) -> explore(1) -> schedule(2) -> profile(3)
// Tickets is a standalone button — NOT part of the swipe sequence
const PAGES = ["/dashboard", "/explore", "/schedule", "/profile"];

function getPageIndex(path: string): number {
  const seg = "/" + path.split("/")[1];
  return PAGES.indexOf(seg);
}

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const [slideDir, setSlideDir] = useState(0); // -1=from left, 1=from right

  const activeIndex = getPageIndex(path);

  const prevIndexRef = useRef(activeIndex);
  const touchOrigin = useRef<{ x: number; y: number } | null>(null);
  const swipeLocked = useRef(false);

  useEffect(() => {
    const newIdx = getPageIndex(path);

    if (newIdx !== prevIndexRef.current) {
      setSlideDir(newIdx > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = newIdx;
    }

    setAnimKey(k => k + 1);
    window.scrollTo(0, 0);
    setIsBottomNavVisible(true);
  }, [path]);

  // Expose a ref that carousel/page components can use to block swipe
  // Usage: component can set blockSwipeRef.current = true during horizontal scroll
  // MainLayout checks this at touch-end and skips navigation if true
  const blockSwipeRef = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchOrigin.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swipeLocked.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchOrigin.current || swipeLocked.current) return;
    const dx = e.touches[0].clientX - touchOrigin.current.x;
    const dy = e.touches[0].clientY - touchOrigin.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 12) {
      swipeLocked.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchOrigin.current) return;

    const endX = e.changedTouches[0].clientX;
    const delta = endX - touchOrigin.current.x;

    if (swipeLocked.current && !blockSwipeRef.current) {
      const THRESHOLD = 55;

      if (delta < -THRESHOLD) {
        // Swipe LEFT → go forward (to higher index page)
        // BLOCK at last page (profile, index 3)
        if (activeIndex < PAGES.length - 1) {
          setSlideDir(1);
          navigate(PAGES[activeIndex + 1]);
        }
      } else if (delta > THRESHOLD) {
        // Swipe RIGHT → go backward (to lower index page)
        // BLOCK at first page (dashboard, index 0)
        if (activeIndex > 0) {
          setSlideDir(-1);
          navigate(PAGES[activeIndex - 1]);
        }
      }
    }

    touchOrigin.current = null;
    swipeLocked.current = false;
    // Reset block after short delay
    setTimeout(() => { blockSwipeRef.current = false; }, 100);
  }, [activeIndex, navigate]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir >= 1 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir >= 1 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <BottomNavContext.Provider value={{ isVisible: isBottomNavVisible, setIsVisible: setIsBottomNavVisible }}>
      <div
        className="relative min-h-screen bg-slate-50 dark:bg-[#0B1120] select-none pf-page"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={handleContextMenu}
      >
        {/* Animated Page Content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={animKey}
            custom={slideDir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pb-24 pf-content"
          >
            <Outlet context={{ blockSwipeRef }} />
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Bar */}
        <AnimatePresence>
          {isBottomNavVisible && (
            <motion.nav
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#0B1120]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-6 py-4 flex justify-between items-center z-[100] pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pf-nav"
            >
              <button
                onClick={() => {
                  if (activeIndex !== 0) { setSlideDir(-1); navigate(PAGES[0]); }
                }}
                className={`touch-target flex flex-col items-center gap-1 transition-all ${activeIndex === 0 ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}
              >
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-bold">Home</span>
              </button>

              <button
                onClick={() => {
                  if (activeIndex !== 1) { setSlideDir(activeIndex < 1 ? -1 : 1); navigate(PAGES[1]); }
                }}
                className={`touch-target flex flex-col items-center gap-1 transition-all ${activeIndex === 1 ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}
              >
                <Compass className="w-6 h-6" />
                <span className="text-[10px] font-bold">Explore</span>
              </button>

              {/* Tickets — direct navigation only, NOT part of swipe sequence */}
              <button
                onClick={() => navigate('/tickets')}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white -mt-8 border-4 border-white dark:border-[#0B1120] touch-target transition-transform bg-gradient-to-tr from-orange-400 to-amber-300 shadow-lg hover:-translate-y-1"
              >
                <Ticket className="w-6 h-6" />
              </button>

              <button
                onClick={() => {
                  if (activeIndex !== 2) { setSlideDir(1); navigate(PAGES[2]); }
                }}
                className={`touch-target flex flex-col items-center gap-1 transition-all ${activeIndex === 2 ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}
              >
                <Calendar className="w-6 h-6" />
                <span className="text-[10px] font-bold">Schedule</span>
              </button>

              <button
                onClick={() => {
                  if (activeIndex !== 3) { setSlideDir(1); navigate(PAGES[3]); }
                }}
                className={`touch-target flex flex-col items-center gap-1 transition-all ${activeIndex === 3 ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}
              >
                <User className="w-6 h-6" />
                <span className="text-[10px] font-bold">Profile</span>
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </BottomNavContext.Provider>
  );
}