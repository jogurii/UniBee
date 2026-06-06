import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Search, Filter, Clock, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { EVENTS } from "../data/events";

// Cache DOM element refs outside the component
const domRefs = {
  pfContent: null as HTMLElement | null,
  phoneScreen: null as HTMLElement | null,
};

export function Explore() {
  const navigate = useNavigate();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Update header visibility - stable function
  const updateHeaderVisibility = useCallback(() => {
    let scrollTop: number;

    if (domRefs.pfContent && window.innerWidth >= 768) {
      scrollTop = domRefs.pfContent.scrollTop;
    } else if (domRefs.phoneScreen) {
      scrollTop = domRefs.phoneScreen.scrollTop;
    } else {
      scrollTop = window.scrollY;
    }

    const scrollDelta = scrollTop - lastScrollY.current;

    if (scrollDelta > 2) {
      setIsHeaderVisible(false);
    } else if (scrollDelta < -2) {
      setIsHeaderVisible(true);
    }

    lastScrollY.current = scrollTop;
    ticking.current = false;
  }, []);

  // Stable scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateHeaderVisibility);
      ticking.current = true;
    }
  }, [updateHeaderVisibility]);

  // Setup and cleanup scroll listeners
  useEffect(() => {
    // Cache DOM references once
    domRefs.pfContent = document.querySelector('.pf-content') as HTMLElement;
    domRefs.phoneScreen = document.querySelector('.phone-screen') as HTMLElement;

    // Initialize scroll position
    if (domRefs.pfContent && window.innerWidth >= 768) {
      lastScrollY.current = domRefs.pfContent.scrollTop;
      domRefs.pfContent.addEventListener("scroll", handleScroll, { passive: true });
    } else if (domRefs.phoneScreen) {
      lastScrollY.current = domRefs.phoneScreen.scrollTop;
      domRefs.phoneScreen.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      lastScrollY.current = window.scrollY;
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (domRefs.pfContent && window.innerWidth >= 768) {
        domRefs.pfContent.removeEventListener("scroll", handleScroll);
      } else if (domRefs.phoneScreen) {
        domRefs.phoneScreen.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
      ticking.current = false;
    };
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-24">

      {/* HEADER: sticky inside phone frame, fixed on mobile */}
      <header className={`pf-header fixed top-0 left-0 w-full z-40 bg-[#0B1120]/95 backdrop-blur-xl border-b border-slate-800 pt-safe-nav px-4 pb-3 shadow-xl transition-transform duration-300 ease-in-out ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold tracking-tight text-white drop-shadow-sm">Cari Event</h1>
          <button className="touch-target w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Seminar, UKM, atau Comserv..."
            className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all shadow-inner touch-target"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          <button className="touch-target px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-semibold whitespace-nowrap shadow-lg shadow-orange-500/30">Semua</button>
          <button className="touch-target px-4 py-1.5 bg-white/10 border border-white/20 text-white rounded-full text-xs font-medium whitespace-nowrap hover:bg-white/20 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(249,115,22,1)]" />
            TFI Comserv
          </button>
          <button className="touch-target px-4 py-1.5 bg-white/10 border border-white/20 text-slate-200 rounded-full text-xs font-medium whitespace-nowrap hover:bg-white/20">SAT Points</button>
          <button className="touch-target px-4 py-1.5 bg-white/10 border border-white/20 text-slate-200 rounded-full text-xs font-medium whitespace-nowrap hover:bg-white/20">Seminar</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-4 pt-40 md:pt-4 py-4 space-y-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-white">
            Rekomendasi Untukmu
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
          </h2>

          <div className="space-y-6">
            {EVENTS.map((event) => (
              <motion.div
                key={event.id}
                role="button"
                tabIndex={0}
                aria-label={`View event details for ${event.title} at ${event.location}`}
                onClick={() => navigate(`/event/${event.id}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/event/${event.id}`)}
                className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={`${event.title} event image at ${event.location}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                  {event.isTFI && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-white/40 text-slate-900 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
                      <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 rounded-full shadow-sm">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      TFI Verified
                    </div>
                  )}

                  <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-lg border backdrop-blur-md
                    ${event.type === 'Comserv' ? 'bg-blue-100/95 border-blue-300 text-blue-700' : 'bg-orange-100/95 border-orange-300 text-orange-700'}`}>
                    {event.reward}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2">{event.organizer}</p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {event.date}</span>
                      <span className="flex items-center gap-1.5 truncate max-w-[120px]"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {event.location}</span>
                    </div>
                    <span className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

    </div>
  );
}