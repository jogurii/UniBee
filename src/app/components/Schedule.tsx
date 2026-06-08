import { useState, useMemo, useCallback, memo } from "react";
import {
  ArrowLeft, CalendarDays, Clock, MapPin, MoreVertical, ChevronRight, ChevronLeft, X
} from "lucide-react";
import { useNavigate } from "react-router";
import { EVENTS, type CampusEvent } from "../data/events";
import { parseEventDate } from "../utils/date";

// ============================================
// CONSTANTS (Moved outside component)
// ============================================

const DAY_NAMES = ["Minggu", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const TYPE_CONFIG: Record<string, { color: string; iconBg: string }> = {
  Seminar: { color: "border-orange-500", iconBg: "bg-orange-100 text-orange-600" },
  Workshop: { color: "border-orange-500", iconBg: "bg-orange-100 text-orange-600" },
  Comserv: { color: "border-blue-500", iconBg: "bg-blue-100 text-blue-600" },
};

// ============================================
// PURE FUNCTIONS (No closure creation)
// ============================================

/** Filter events for a specific day - stable reference */
function getEventsForDay(events: CampusEvent[], selectedDate: Date): CampusEvent[] {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return events.filter(e => {
    const { day, month } = parseEventDate(e.date);
    const eventMonthIndex = monthNames.indexOf(month) !== -1 ? monthNames.indexOf(month) : 4;
    return day === selectedDate.getDate() && eventMonthIndex === selectedDate.getMonth();
  });
}

/** Check which days have events - pre-computed once */
function getDaysWithEvents(events: CampusEvent[]): Set<string> {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const days = new Set<string>();
  for (const event of events) {
    const { day, month } = parseEventDate(event.date);
    const eventMonthIndex = monthNames.indexOf(month) !== -1 ? monthNames.indexOf(month) : 4;
    const year = event.date.split(" ")[2] || "2026";
    days.add(`${year}-${eventMonthIndex}-${day}`);
  }
  return days;
}

/** Format day label for display */
function formatDayLabel(selectedDate: Date): string {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const year = selectedDate.getFullYear();
  return `${days[selectedDate.getDay()]}, ${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${year}`;
}

function getWeekDays(baseDate: Date) {
  const currentDay = baseDate.getDay(); 
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() + distanceToMonday);

  const days = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      day: DAY_NAMES[d.getDay()],
      date: d.getDate(),
      fullDate: d,
    });
  }
  return days;
}

function getCalendarDays(year: number, month: number) {
  const date = new Date(year, month, 1);
  const firstDayIndex = date.getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

// ============================================
// MEMOIZED COMPONENTS
// ============================================

interface ScheduleCardProps {
  item: CampusEvent;
}

const ScheduleCard = memo(function ScheduleCard({ item }: ScheduleCardProps) {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.Seminar;

  return (
    <div
      className="flex gap-4 group"
    >
      {/* Time Column */}
      <div className="flex flex-col items-center min-w-[50px] pt-1">
        <span className="text-sm font-black text-slate-900 dark:text-white leading-none">
          {item.time}
        </span>
        <div className="w-[2px] flex-1 bg-slate-200 dark:bg-slate-800 my-2 group-last:bg-transparent" />
      </div>

      {/* Content Card */}
      <div className={`flex-1 bg-white dark:bg-white/5 border-l-4 ${config.color} rounded-2xl p-4 shadow-sm mb-6 hover:shadow-md transition-shadow relative overflow-hidden`}>
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${config.iconBg}`}>
            {item.type}
          </span>
          <button className="text-slate-400" aria-label="More options">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {item.title}
        </h3>

        <div className="flex flex-col gap-1.5 pr-16">
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
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap ${
            item.type === 'Comserv' 
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' 
              : 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10'
          }`}>
            {item.reward}
          </span>
        </div>
      </div>
    </div>
  );
});

interface DayButtonProps {
  day: string;
  date: number;
  fullDate: Date;
  isSelected: boolean;
  hasEvent: boolean;
  onSelect: (date: Date) => void;
}

const DayButton = memo(function DayButton({ day, date, fullDate, isSelected, hasEvent, onSelect }: DayButtonProps) {
  return (
    <button
      onClick={() => onSelect(fullDate)}
      className={`touch-target flex flex-col items-center min-w-[64px] px-4 py-4 rounded-2xl transition-all duration-300 border ${
        isSelected
          ? "bg-gradient-to-b from-orange-500 to-amber-500 border-orange-400 shadow-[0_8px_20px_rgba(249,115,22,0.4)] text-white scale-105"
          : "bg-white/5 border-white/5 text-slate-400"
      }`}
    >
      <span className="text-[10px] font-bold uppercase mb-1">{day}</span>
      <span className="text-lg font-black">{date}</span>
      {hasEvent && (
        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-orange-400"}`} />
      )}
    </button>
  );
});

// ============================================
// MAIN COMPONENT
// ============================================

export function Schedule() {
  const navigate = useNavigate();
  // By default select 16 Mei 2026 to match old static state
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 16));
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date(2026, 4, 1));

  // Memoize days with events - computed once
  const daysWithEvents = useMemo(() => getDaysWithEvents(EVENTS), []);

  // Memoize filtered events - only recomputes when selectedDate changes
  const dayEvents = useMemo(
    () => getEventsForDay(EVENTS, selectedDate),
    [selectedDate]
  );

  // Memoize days for the current week
  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate]);

  // Stable callback for day selection
  const handleDaySelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  // Memoize formatted label
  const dayLabel = useMemo(
    () => formatDayLabel(selectedDate),
    [selectedDate]
  );

  const handlePrevMonth = () => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));
  };

  const calendarDaysList = useMemo(() => {
    return getCalendarDays(calendarViewDate.getFullYear(), calendarViewDate.getMonth());
  }, [calendarViewDate]);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pb-24 overflow-x-hidden full-h-screen relative">

      {/* HEADER WITH MINI CALENDAR SCROLLER */}
      <header className="px-6 pt-8 pb-2 bg-[#0B1120] rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="touch-target w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight">Jadwal Mahasiswa</h1>
          </div>
          <button
            className="touch-target w-11 h-11 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 transition-transform active:scale-95"
            aria-label="Calendar"
            onClick={() => {
              setCalendarViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
              setIsCalendarOpen(true);
            }}
          >
            <CalendarDays className="w-5 h-5" />
          </button>
        </div>

        {/* HORIZONTAL DATE PICKER */}
        <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-6 px-2 -mx-2 scrollbar-hide">
          {weekDays.map((d) => {
            const dateStr = `${d.fullDate.getFullYear()}-${d.fullDate.getMonth()}-${d.fullDate.getDate()}`;
            const isSelected = selectedDate.getFullYear() === d.fullDate.getFullYear() &&
                               selectedDate.getMonth() === d.fullDate.getMonth() &&
                               selectedDate.getDate() === d.fullDate.getDate();
            return (
              <DayButton
                key={dateStr}
                day={d.day}
                date={d.date}
                fullDate={d.fullDate}
                isSelected={isSelected}
                hasEvent={daysWithEvents.has(dateStr)}
                onSelect={handleDaySelect}
              />
            );
          })}
        </div>
      </header>

      <main className="px-6 pt-4 pb-6">

        {/* DAY SUMMARY INFO */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-black capitalize">{dayLabel}</h2>
            <p className="text-xs text-slate-500 font-medium">
              {dayEvents.length > 0 ? (
                <span>
                  Kamu punya <span className="text-orange-500 font-bold">{dayEvents.length}</span> Acara terjadwal
                </span>
              ) : (
                "Tidak ada acara terjadwal"
              )}
            </p>
          </div>
          {dayEvents.length > 0 && (
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">No Clashes</span>
            </div>
          )}
        </div>

        {/* TIMELINE LIST */}
        <div className="space-y-0 pb-24">
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
                onClick={() => navigate('/app/explore')}
                className="mt-6 px-6 py-3 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold rounded-xl flex items-center gap-2 hover:bg-orange-100 transition-colors"
              >
                Cari Event Baru <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* CUSTOM CALENDAR MODAL */}
      {isCalendarOpen && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B1120]/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pilih Tanggal</h3>
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handlePrevMonth}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-500 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg text-slate-900 dark:text-white">{monthNames[calendarViewDate.getMonth()]} {calendarViewDate.getFullYear()}</span>
              <button 
                onClick={handleNextMonth}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:text-orange-500 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d, i) => (
                <div key={i} className="text-[10px] font-bold text-slate-400 uppercase">{d}</div>
              ))}
              
              {calendarDaysList.map((dateObj, i) => {
                if (!dateObj) {
                  return <div key={`empty-${i}`} className="w-10 h-10" />;
                }
                const isSelected = dateObj.getFullYear() === selectedDate.getFullYear() && 
                                   dateObj.getMonth() === selectedDate.getMonth() && 
                                   dateObj.getDate() === selectedDate.getDate();
                const isToday = dateObj.toDateString() === new Date().toDateString();
                const dateStr = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
                const hasEvent = daysWithEvents.has(dateStr);
                
                return (
                  <div key={i} className="flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedDate(dateObj);
                        setIsCalendarOpen(false);
                      }}
                      className={`relative w-10 h-10 flex items-center justify-center rounded-2xl text-sm font-bold transition-all ${
                        isSelected 
                          ? "bg-gradient-to-b from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/40 scale-105" 
                          : isToday 
                            ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                      }`}
                    >
                      {dateObj.getDate()}
                      {hasEvent && !isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-orange-400" />
                      )}
                      {hasEvent && isSelected && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
