import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, CalendarDays, Clock, MapPin, MoreVertical, CheckCircle2, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router";
import { EVENTS, type CampusEvent } from "../data/events";

// Color mapping based on event type
const TYPE_CONFIG: Record<string, { color: string; iconBg: string }> = {
  Seminar: { color: "border-orange-500", iconBg: "bg-orange-100 text-orange-600" },
  Workshop: { color: "border-orange-500", iconBg: "bg-orange-100 text-orange-600" },
  Comserv: { color: "border-emerald-500", iconBg: "bg-emerald-100 text-emerald-600" },
};

function ScheduleCard({ item }: { item: CampusEvent }) {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.Seminar;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 group"
    >
      {/* Time Column */}
      <div className="flex flex-col items-center min-w-[50px] pt-1">
        <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{item.time}</span>
        <div className="w-[2px] flex-1 bg-slate-200 dark:bg-slate-800 my-2 group-last:bg-transparent" />
      </div>

      {/* Content Card */}
      <div className={`flex-1 bg-white dark:bg-white/5 border-l-4 ${config.color} rounded-2xl p-4 shadow-sm mb-6 hover:shadow-md transition-shadow relative overflow-hidden`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${config.iconBg}`}>
            {item.type}
          </span>
          <button className="text-slate-400"><MoreVertical className="w-4 h-4" /></button>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {item.title}
        </h3>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{item.time} - {item.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{item.location}</span>
          </div>
        </div>

        {/* Reward Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded-lg">
            {item.reward}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Schedule() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(16);

  // Build days from actual event data — only show days that have events
  // Map date numbers to match event dates
  const allEventDays = EVENTS.map(e => {
    const parts = e.date.split(" ");
    return { dayNum: parseInt(parts[0], 10), month: parts.slice(1).join(" ") };
  });

  // Show a range of days for the schedule view
  const days = [
    { day: "Sen", date: 13 },
    { day: "Sel", date: 14 },
    { day: "Rab", date: 15 },
    { day: "Kam", date: 16 },
    { day: "Jum", date: 17 },
    { day: "Sab", date: 18 },
  ];

  // Filter events for selected day
  // Day 14 = Penanaman Pohon (Past), Day 16 = Seminar HCI (Upcoming), Day 18 = Workshop (Upcoming)
  const getEventsForDay = (day: number) => {
    const eventsForDay = EVENTS.filter(e => {
      const eventDay = parseInt(e.date.split(" ")[0], 10);
      return eventDay === day;
    });
    return eventsForDay;
  };

  const dayEvents = getEventsForDay(selectedDay);
  const monthLabel = "Mei";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pb-24 overflow-x-hidden full-h-screen">

      {/* HEADER WITH MINI CALENDAR SCROLLER */}
      <header className="px-6 pt-8 pb-6 bg-[#0B1120] rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="touch-target w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight">Jadwal Mahasiswa</h1>
          </div>
          <button className="touch-target w-11 h-11 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <CalendarDays className="w-5 h-5" />
          </button>
        </div>

        {/* HORIZONTAL DATE PICKER */}
        <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {days.map((d) => {
            const hasEvent = EVENTS.some(e => parseInt(e.date.split(" ")[0], 10) === d.date);
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                className={`touch-target flex flex-col items-center min-w-[55px] py-4 rounded-2xl transition-all duration-300 border ${
                  selectedDay === d.date
                    ? "bg-gradient-to-b from-orange-500 to-amber-500 border-orange-400 shadow-[0_8px_20px_rgba(249,115,22,0.4)] text-white scale-105"
                    : "bg-white/5 border-white/5 text-slate-400"
                }`}
              >
                <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                <span className="text-lg font-black">{d.date}</span>
                {hasEvent && (
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${selectedDay === d.date ? "bg-white" : "bg-orange-400"}`} />
                )}
                {selectedDay === d.date && (
                  <motion.div layoutId="dot" className="w-1 h-1 bg-white rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="px-6 pt-6 pb-6">

        {/* DAY SUMMARY INFO */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-black capitalize">
              {selectedDay === 16 ? "Kamis, 16 Mei" :
               selectedDay === 14 ? "Rabu, 14 Mei" :
               selectedDay === 18 ? "Sabtu, 18 Mei" :
               `${selectedDay} Mei`}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {dayEvents.length > 0
                ? <span>Kamu punya <span className="text-orange-500 font-bold">{dayEvents.length} Acara</span> terjadwal</span>
                : "Tidak ada acara terjadwal"}
            </p>
          </div>
          {dayEvents.length > 0 && (
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">No Clashes</span>
            </div>
          )}
        </div>

        {/* TIMELINE LIST */}
        <div className="space-y-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {dayEvents.length > 0 ? (
                dayEvents.map((event) => (
                  <ScheduleCard key={event.id} item={event} />
                ))
              ) : (
                <div className="py-20 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <CalendarDays className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium italic">Belum ada acara terjadwal untuk tanggal ini.</p>
                  <button
                    onClick={() => navigate('/explore')}
                    className="mt-6 px-6 py-3 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold rounded-xl flex items-center gap-2 hover:bg-orange-100 transition-colors"
                  >
                    Cari Event Baru <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}