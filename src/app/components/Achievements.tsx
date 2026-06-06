import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Info,
  BarChart3,
  HeartHandshake
} from "lucide-react";
import { useNavigate } from "react-router";
import type { ProgressRingProps } from "../utils/types";

// ProgressRing constants - moved outside component for stability
const RING_RADIUS = 70;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// Static activity data - moved outside component to prevent recreation
const ACTIVITIES = [
  { id: "act-1", title: "Penanaman Pohon (Panti Jompo)", date: "14 Mei 2026", points: "+5 Jam", status: "Pending Refleksi", isTFI: true },
  { id: "act-2", title: "Seminar Career 101", date: "10 Apr 2026", points: "+2 SAT", status: "Verified", isTFI: false },
  { id: "act-3", title: "Relawan Sibandang (TFI)", date: "20 Nov 2025", points: "+10 Jam", status: "Verified", isTFI: true },
  { id: "act-4", title: "HCI Workshop", date: "16 Mei 2026", points: "+4 SAT", status: "Pending", isTFI: false },
] as const;

// Static SAT category data
const SAT_CATEGORIES = [
  { cat: "Seminar/Workshop", val: 41, max: 50, color: "bg-orange-500" },
  { cat: "Organisasi/UKM", val: 24, max: 40, color: "bg-amber-500" },
  { cat: "Lomba & Kompetisi", val: 20, max: 30, color: "bg-rose-500" }
] as const;

// Memoized ProgressRing component
const ProgressRing = memo(function ProgressRing({ percentage, color, label, value, subValue }: ProgressRingProps) {
  // Memoize strokeDashoffset calculation
  const strokeDashoffset = useMemo(
    () => RING_CIRCUMFERENCE - (percentage / 100) * RING_CIRCUMFERENCE,
    [percentage]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Lingkaran Background - Dikunci warnanya agar terlihat elegan di atas Navy */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="80" cy="80" r={RING_RADIUS} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
          {/* Lingkaran Progress */}
          <motion.circle
            cx="80" cy="80" r={RING_RADIUS} stroke={color} strokeWidth="12" strokeDasharray={RING_CIRCUMFERENCE}
            initial={{ strokeDashoffset: RING_CIRCUMFERENCE }} animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round" fill="transparent"
          />
        </svg>
        {/* Teks Tengah - Dikunci warna putih dengan efek drop-shadow agar kontras maksimal */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white leading-none drop-shadow-md">{percentage}%</span>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter mt-1">{label}</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-black text-white drop-shadow-sm">{value}</p>
        <p className="text-[10px] font-medium text-slate-400">{subValue}</p>
      </div>
    </div>
  );
});

export function Achievements() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pb-24 overflow-y-scroll overflow-x-hidden w-full relative full-h-screen">

      {/* HEADER DENGAN PERBAIKAN TRANSISI SEAMLESS */}
      <header className="px-6 pb-6 rounded-b-[2.5rem] shadow-lg relative z-20 bg-[#0B1120] overflow-hidden">
        
        {/* Lapisan Gradient Biru (TFI) yang muncul/hilang dengan animasi Fade */}
        <motion.div 
          initial={false}
          animate={{ opacity: activeTab === 'TFI Comserv' ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-[#0B1120] to-blue-800/90 z-0 pointer-events-none"
        />

        {/* Konten Header (Z-10 agar selalu berada di atas efek background) */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight">Pencapaian Mahasiswa</h1>
          </div>

          {/* TAB NAVIGATION */}
          <div className="flex bg-white/10 p-1.5 rounded-2xl border border-white/10 relative mb-8 backdrop-blur-md">
            {["Overview", "SAT Points", "TFI Comserv"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 ${activeTab === tab ? "text-white" : "text-slate-400 hover:text-slate-300"}`}
              >
                {tab}
              </button>
            ))}
            <motion.div 
              className={`absolute top-1.5 bottom-1.5 rounded-xl z-0 ${activeTab === 'TFI Comserv' ? 'bg-blue-600' : 'bg-gradient-to-r from-orange-600 to-amber-500'}`}
              animate={{ 
                x: activeTab === "Overview" ? "0%" : activeTab === "SAT Points" ? "100%" : "200%", 
                width: "33.33%" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* PROGRESS RINGS CONTAINER */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              className={`grid gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-xl ${activeTab === 'Overview' ? 'grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'}`}
            >
              {(activeTab === "Overview" || activeTab === "SAT Points") && (
                <ProgressRing percentage={70} color="#f97316" label="SAT Points" value="85 / 120" subValue="Sisa 35 Poin" />
              )}
              {(activeTab === "Overview" || activeTab === "TFI Comserv") && (
                <ProgressRing percentage={50} color={activeTab === 'TFI Comserv' ? "#06b6d4" : "#3b82f6"} label="Comserv" value="15 / 30 Jam" subValue="Sisa 15 Jam" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      <main className="px-6 py-10 space-y-10 pb-32">
        
        {/* DIAGRAM SAT POINTS */}
        {activeTab !== "TFI Comserv" && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                Detail Kategori SAT
              </h2>
              <button className="text-slate-400"><Info className="w-4 h-4" /></button>
            </div>

            <div className="space-y-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm shadow-slate-200/50 dark:shadow-none">
              {SAT_CATEGORIES.map((item) => (
                <div key={item.cat}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-600 dark:text-slate-300">{item.cat}</span>
                    <span className="text-slate-900 dark:text-white">{item.val} / {item.max}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${(item.val / item.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HISTORY LIST */}
        <section>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            {activeTab === "TFI Comserv" ? <HeartHandshake className="w-5 h-5 text-cyan-500" /> : <Award className="w-5 h-5 text-blue-500" />}
            {activeTab === "TFI Comserv" ? "Portofolio Sosial (TFI)" : "Riwayat Aktivitas"}
          </h2>

          <div className="space-y-4">
            {ACTIVITIES
 // Logika Filter
            .filter(item => {
              if (activeTab === "TFI Comserv") return item.isTFI;
              if (activeTab === "SAT Points") return !item.isTFI;
              return true; // Untuk tab "Overview" tampilkan semua
            })
            .map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.status === 'Verified' ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600' : 'bg-amber-50 dark:bg-amber-500/20 text-amber-600'}`}>
                    {activity.status === 'Verified' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activity.title}</h4>
                    <p className="text-[10px] font-medium text-slate-500 uppercase">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${activity.points.includes('SAT') ? 'text-orange-600' : 'text-cyan-500'}`}>{activity.points}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${activity.status === 'Verified' ? 'text-emerald-500' : 'text-amber-500'}`}>{activity.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}