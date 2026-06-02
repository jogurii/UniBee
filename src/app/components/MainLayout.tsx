import React, { useEffect, createContext, useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Compass, Ticket, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Context untuk mengontrol visibilitas bottom nav
interface BottomNavContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const BottomNavContext = createContext<BottomNavContextType>({
  isVisible: true,
  setIsVisible: () => {},
});

export const useBottomNav = () => useContext(BottomNavContext);

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset visibility nav saat route berubah
    setIsBottomNavVisible(true);
  }, [path]);

  return (
    <BottomNavContext.Provider value={{ isVisible: isBottomNavVisible, setIsVisible: setIsBottomNavVisible }}>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#0B1120]">
        {/* Konten Halaman dengan padding bawah agar tidak terhalang bottom nav */}
        <div className="pb-24">
          <Outlet />
        </div>

        {/* BOTTOM NAVIGATION BAR GLOBAL */}
        <AnimatePresence>
          {isBottomNavVisible && (
            <motion.nav
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#0B1120]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-6 py-4 flex justify-between items-center z-[100] pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)]"
            >
              <button onClick={() => navigate('/dashboard')} className={`touch-target flex flex-col items-center gap-1 transition-all ${path.includes('dashboard') ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}>
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-bold">Home</span>
              </button>

              <button onClick={() => navigate('/explore')} className={`touch-target flex flex-col items-center gap-1 transition-all ${path.includes('explore') ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}>
                <Compass className="w-6 h-6" />
                <span className="text-[10px] font-bold">Explore</span>
              </button>

              <button onClick={() => navigate('/tickets')} className={`w-14 h-14 rounded-full flex items-center justify-center text-white -mt-8 border-4 border-white dark:border-[#0B1120] touch-target transition-transform ${path.includes('tickets') ? 'bg-gradient-to-tr from-orange-500 to-amber-400 shadow-[0_0_25px_rgba(249,115,22,0.8)]' : 'bg-gradient-to-tr from-orange-400 to-amber-300 shadow-lg hover:-translate-y-1'}`}>
                <Ticket className="w-6 h-6" />
              </button>

              <button onClick={() => navigate('/schedule')} className={`touch-target flex flex-col items-center gap-1 transition-all ${path.includes('schedule') ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}>
                <Calendar className="w-6 h-6" />
                <span className="text-[10px] font-bold">Schedule</span>
              </button>

              <button onClick={() => navigate('/profile')} className={`touch-target flex flex-col items-center gap-1 transition-all ${path.includes('profile') || path.includes('achievements') ? 'text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'text-slate-400 hover:text-orange-500'}`}>
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