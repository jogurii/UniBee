import React, { useCallback } from "react";
import { motion } from "motion/react";
import { Bell, Ticket, MapPin, Clock, ChevronRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
import { getUpcomingEvents } from "../data/events";

export function Dashboard() {
  const navigate = useNavigate();
  const handleNotifications = () => navigate("/notifications");

  // Get first upcoming event for "Jadwal Terdekatmu"
  const upcomingEvents = getUpcomingEvents();
  const nextEvent = upcomingEvents[0];

  // Extract date parts from next event
  const nextEventDay = nextEvent ? parseInt(nextEvent.date.split(" ")[0], 10) : 16;
  const nextEventMonth = nextEvent ? nextEvent.date.split(" ").slice(1, 3).join(" ") : "Mei";

  // Receive blockSwipeRef from MainLayout via Outlet context
  const { blockSwipeRef } = useOutletContext<{ blockSwipeRef: React.MutableRefObject<boolean> }>();

  const handleCarouselTouchStart = useCallback(() => {
    blockSwipeRef.current = true;
  }, [blockSwipeRef]);

  const handleCarouselTouchEnd = useCallback(() => {
    setTimeout(() => { blockSwipeRef.current = false; }, 100);
  }, [blockSwipeRef]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] overflow-x-hidden w-full relative full-h-screen">

      {/* LATAR BELAKANG HEADER */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 rounded-b-[2.5rem] shadow-lg" />

      {/* HEADER SECTION */}
      <header className="px-6 pt-8 pb-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-[2px] shadow-lg touch-target">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Profile"
              className="w-full h-full rounded-full border-2 border-slate-900 object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white drop-shadow-md">Halo, Mahasiswa! 👋</h1>
            <p className="text-sm text-slate-300 font-medium">Computer Science</p>
          </div>
        </div>
        <button onClick={handleNotifications} className="touch-target relative w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-sm">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-slate-900"></span>
        </button>
      </header>

      <main className="px-6 space-y-8 relative z-10 pb-32">
        {/* MINI PROGRESS BAR - KINI BISA DIKLIK MENUJU ACHIEVEMENTS */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          onClick={() => navigate('/achievements')}
          className="bg-white/95 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-slate-200/50 relative overflow-hidden cursor-pointer hover:border-orange-500/50 transition-colors group"
        >
          <div className="absolute top-4 right-4 text-slate-400 group-hover:text-orange-500 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>
          {/* SAT Points */}
          <div className="mb-5">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs text-slate-500 dark:text-indigo-200/60 font-bold uppercase tracking-wider mb-1">SAT Points</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white"><span className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">85</span> <span className="text-base text-slate-400 font-normal">/ 120</span></p>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">70%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
            </div>
          </div>

          {/* Comserv Hours */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs text-slate-500 dark:text-indigo-200/60 font-bold uppercase tracking-wider mb-1">Community Service</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white"><span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">15</span> <span className="text-sm text-slate-400 font-normal">/ 30 Jam</span></p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">50%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
            </div>
          </div>
        </motion.section>

        {/* HERO CAROUSEL */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Featured Events</h2>
            <button type="button" onClick={() => navigate("/explore")} className="text-sm text-orange-600 font-bold flex items-center hover:text-orange-500 transition-colors">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
            onTouchStart={handleCarouselTouchStart}
            onTouchMove={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
          >
            {getUpcomingEvents().map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
                className="min-w-[280px] shrink-0 h-40 rounded-3xl relative overflow-hidden snap-center group cursor-pointer shadow-lg shadow-slate-200/50 border border-slate-100"
              >
                <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <span className={`inline-block px-2 py-1 border text-[10px] font-bold rounded-md mb-2 backdrop-blur-sm ${
                    event.type === 'Comserv' ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' : 'bg-orange-500/20 border-orange-500/30 text-orange-300'
                  }`}>
                    {event.reward}
                  </span>
                  <h3 className="font-bold text-white text-sm leading-tight mb-1 drop-shadow-md">{event.title}</h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1"><MapPin className="w-3 h-3"/> {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* UPCOMING SCHEDULE */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Jadwal Terdekatmu</h2>
          {nextEvent ? (
            <div
              onClick={() => navigate(`/event/${nextEvent.id}`)}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md shadow-slate-200/40 flex gap-4 items-center cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <div className="bg-orange-50 text-orange-600 w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-orange-100">
                <span className="text-[10px] font-black uppercase tracking-wider">{nextEventMonth.slice(0, 3)}</span>
                <span className="text-xl font-black leading-none mt-0.5">{nextEventDay}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-slate-900 mb-1">{nextEvent.title}</h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {nextEvent.time}</span>
                  <span className="flex items-center gap-1 truncate max-w-[140px]"><MapPin className="w-3 h-3"/> {nextEvent.location}</span>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); navigate('/tickets'); }} className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 hover:bg-blue-100 transition-colors">
                <Ticket className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md text-center">
              <p className="text-slate-500 text-sm">Tidak ada acara mendatang.</p>
              <button onClick={() => navigate('/explore')} className="mt-3 text-orange-500 font-bold text-sm hover:underline">Cari Event Baru</button>
            </div>
          )}
        </motion.section>
      </main>

    </div>
  );
}