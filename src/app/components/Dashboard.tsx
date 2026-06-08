import { useCallback, useMemo, useEffect, useRef, memo } from "react";
import { Bell, Ticket, MapPin, Clock, ChevronRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
import { getUpcomingEvents } from "../data/events";
import { parseEventDate, formatEventMonth } from "../utils/date";
import { SwipeBlockRef } from "../utils/types";
import { useUser, useUserProgress } from "../contexts/UserContext";

interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
  gradientClass: string;
  accentColor: string;
  percentage: number;
}

const ProgressBar = memo(function ProgressBar({ current, max, label, gradientClass, accentColor, percentage }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-xs text-slate-500 dark:text-indigo-200/60 font-bold uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            <span className={accentColor}>{current}</span>
            <span className="text-sm text-slate-400 font-normal"> / {max}</span>
          </p>
        </div>
        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

interface EventCardProps {
  id: number;
  title: string;
  image: string;
  location: string;
  reward: string;
  type: "Comserv" | "Seminar";
  onNavigate: (path: string) => void;
}

const EventCard = memo(function EventCard({ id, title, image, location, reward, type, onNavigate }: EventCardProps) {
  const isComserv = type === "Comserv";

  return (
    <div
      onClick={() => onNavigate(`/event/${id}`)}
      className="min-w-[280px] shrink-0 h-40 rounded-3xl relative overflow-hidden snap-center group cursor-pointer shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <img
        src={image}
        alt={`${title} at ${location}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <span
          className={`inline-block px-2 py-1 border text-[10px] font-bold rounded-md mb-2 backdrop-blur-sm ${
            isComserv
              ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
              : "bg-orange-500/20 border-orange-500/30 text-orange-300"
          }`}
        >
          {reward}
        </span>
        <h3 className="font-bold text-white text-sm leading-tight mb-1 drop-shadow-md">
          {title}
        </h3>
        <p className="text-xs text-slate-200 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {location}
        </p>
      </div>
    </div>
  );
});

interface UpcomingScheduleProps {
  event: ReturnType<typeof getUpcomingEvents>[number] | undefined;
  onNavigate: (path: string) => void;
}

const UpcomingSchedule = memo(function UpcomingSchedule({ event, onNavigate }: UpcomingScheduleProps) {
  if (!event) {
    return (
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-md text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">Tidak ada acara mendatang.</p>
        <button
          onClick={() => onNavigate("/app/explore")}
          className="mt-3 text-orange-500 font-bold text-sm hover:underline"
        >
          Cari Event Baru
        </button>
      </div>
    );
  }

  const { day, month } = parseEventDate(event.date);

  return (
    <div
      onClick={() => onNavigate(`/event/${event.id}`)}
      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-md shadow-slate-200/40 dark:shadow-none flex gap-4 items-center cursor-pointer hover:-translate-y-1 transition-transform"
    >
      <div className="bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-orange-100 dark:border-orange-500/30">
        <span className="text-[10px] font-black uppercase tracking-wider">
          {formatEventMonth(month)}
        </span>
        <span className="text-xl font-black leading-none mt-0.5">{day}</span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{event.title}</h4>
        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {event.time}
          </span>
          <span className="flex items-center gap-1 truncate max-w-[140px]">
            <MapPin className="w-3 h-3" />
            {event.location}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("/app/tickets");
        }}
        className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-500/30 hover:bg-blue-100 dark:hover:bg-blue-500/30 transition-colors"
      >
        <Ticket className="w-4 h-4" />
      </button>
    </div>
  );
});

export function Dashboard() {
  const navigate = useNavigate();
  const user = useUser();
  const { sat, comserv } = useUserProgress();

  // Receive blockSwipeRef from MainLayout via Outlet context
  const { blockSwipeRef } = useOutletContext<SwipeBlockRef>();

  // Memoize upcoming events to avoid redundant filtering
  const upcomingEvents = useMemo(() => getUpcomingEvents(), []);
  const nextEvent = upcomingEvents[0];

  // Memoize touch handlers with proper cleanup
  const handleCarouselTouchStart = useCallback(() => {
    blockSwipeRef.current = true;
  }, [blockSwipeRef]);

  // Store timeout ID for cleanup
  const swipeResetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCarouselTouchEnd = useCallback(() => {
    // Clear any existing timeout to prevent multiple timeouts
    if (swipeResetTimeout.current) {
      clearTimeout(swipeResetTimeout.current);
    }
    swipeResetTimeout.current = setTimeout(() => {
      blockSwipeRef.current = false;
      swipeResetTimeout.current = null;
    }, 100);
  }, [blockSwipeRef]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (swipeResetTimeout.current) {
        clearTimeout(swipeResetTimeout.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] overflow-x-hidden w-full relative full-h-screen">
      {/* Background Header */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 rounded-b-[2.5rem] shadow-lg" />

      {/* Header Section */}
      <header className="px-6 pt-8 pb-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-[2px] shadow-lg touch-target">
            <img
              src={user.avatar}
              alt={`${user.name}'s profile`}
              loading="eager"
              className="w-full h-full rounded-full border-2 border-slate-900 object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white drop-shadow-md">
              Halo, {user.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 font-medium">{user.program}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/notifications")}
          aria-label="View notifications"
          className="touch-target relative w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-sm"
        >
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-slate-900" />
        </button>
      </header>

      <main className="px-6 space-y-8 relative z-10 pb-32">
        {/* Mini Progress Bar */}
        <section
          onClick={() => navigate("/app/achievements")}
          className="bg-white/95 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl shadow-slate-200/50 relative overflow-hidden cursor-pointer hover:border-orange-500/50 transition-colors group"
        >
          <div className="absolute top-4 right-4 text-slate-400 group-hover:text-orange-500 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </div>

          <div className="mb-5">
            <ProgressBar
              current={sat.current}
              max={sat.max}
              label="SAT Points"
              gradientClass="from-orange-500 to-amber-400"
              accentColor="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
              percentage={sat.percentage}
            />
          </div>

          <div>
            <ProgressBar
              current={comserv.current}
              max={comserv.max}
              label="Community Service"
              gradientClass="from-blue-500 to-cyan-400"
              accentColor="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
              percentage={comserv.percentage}
            />
          </div>
        </section>

        {/* Hero Carousel */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Featured Events</h2>
            <button
              type="button"
              onClick={() => navigate("/app/explore")}
              className="text-sm text-orange-600 font-bold flex items-center hover:text-orange-500 transition-colors"
            >
              Lihat Semua
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
            onTouchStart={handleCarouselTouchStart}
            onTouchMove={handleCarouselTouchStart}
            onTouchEnd={handleCarouselTouchEnd}
          >
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                image={event.image}
                location={event.location}
                reward={event.reward}
                type={event.type}
                onNavigate={navigate}
              />
            ))}
          </div>
        </section>

        {/* Upcoming Schedule */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Jadwal Terdekatmu</h2>
          <UpcomingSchedule event={nextEvent} onNavigate={navigate} />
        </section>
      </main>
    </div>
  );
}
