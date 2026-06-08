import { useState, useCallback } from "react";
import { motion } from "motion/react";
import {
  Download, Moon, Sun, Bell, ShieldCheck, LogOut, ChevronRight,
  Loader2, CheckCircle, FileText, Mail, Fingerprint, Award, ScanLine
} from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "./ThemeContext";
import { useUser } from "../contexts/UserContext";

// Download timeout constants (ms)
const DOWNLOAD_DURATION_MS = 2000;
const DOWNLOAD_RESET_DELAY_MS = 3000;

export function Profile() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const user = useUser();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = useCallback(() => {
    if (isDownloaded) return;
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), DOWNLOAD_RESET_DELAY_MS);
    }, DOWNLOAD_DURATION_MS);
  }, [isDownloaded]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pb-24 overflow-x-hidden full-h-screen">

      {/* HEADER */}
      <header className="px-6 pt-10 pb-10 bg-[#0B1120] rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -z-10" />
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-1 shadow-2xl touch-target">
              <img
                src={user.avatar}
                alt={`${user.name}'s profile`}
                loading="eager"
                className="w-full h-full rounded-full border-4 border-[#0B1120] object-cover"
              />
            </div>
            <button aria-label="Biometric authentication" className="absolute bottom-1 right-1 w-8 h-8 bg-orange-500 rounded-full border-2 border-[#0B1120] flex items-center justify-center shadow-lg touch-target">
              <Fingerprint className="w-4 h-4 text-white" />
            </button>
          </div>
          <h1 className="mt-5 text-2xl font-black text-white tracking-tight">{user.name}</h1>
          <p className="text-slate-400 font-medium text-sm">NIM: {user.nim}</p>
        </div>
      </header>

      <main className="px-6 -mt-6 space-y-5 relative z-10 pb-6">

        {/* BIODATA CARD */}
        <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Kampus</p>
              <p className="text-sm font-bold">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jurusan</p>
              <p className="text-sm font-bold">{user.program} - {user.campus}</p>
            </div>
          </div>
        </section>

        {/* 3. Tombol Unduh Transkrip Interaktif */}
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-full group p-[1px] rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${isDownloaded ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-gradient-to-r from-orange-600 to-amber-500 shadow-orange-500/20'}`}
        >
          <div className={`rounded-[calc(1.5rem-1px)] px-6 py-5 flex items-center justify-between transition-colors ${isDownloaded ? 'bg-emerald-500' : 'bg-white dark:bg-[#0B1120]/90 group-hover:bg-transparent'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDownloaded ? 'bg-white/20 text-white' : 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 group-hover:text-white group-hover:bg-white/20'}`}>
                {isDownloading ? <Loader2 className="w-6 h-6 animate-spin" /> : isDownloaded ? <CheckCircle className="w-6 h-6" /> : <Download className="w-6 h-6" />}
              </div>
              <div className="text-left">
                <h3 className={`font-bold transition-colors ${isDownloaded ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-white'}`}>
                  {isDownloading ? 'Memproses PDF...' : isDownloaded ? 'Tersimpan!' : 'Unduh Transkrip'}
                </h3>
                <p className={`text-xs transition-colors ${isDownloaded ? 'text-emerald-100' : 'text-slate-500 group-hover:text-white/80'}`}>
                  {isDownloading ? 'Mohon tunggu sebentar' : isDownloaded ? 'Cek folder Download Anda' : 'PDF Rekap SAT & Comserv'}
                </p>
              </div>
            </div>
            {!isDownloading && !isDownloaded && <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />}
          </div>
        </button>

        {/* MENU AKADEMIK & KEPANITIAAN (Penghubung ke Achievement & Scanner) */}
        <section className="space-y-3 pt-2">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-4 mb-4">Aktivitas Mahasiswa</h2>
          <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-2 space-y-1 shadow-sm">
            
            <div onClick={() => navigate('/app/achievements')} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Pencapaian & Poin SAT</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>

            <div onClick={() => navigate('/scanner')} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <ScanLine className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Committee Portal (Scanner)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>

          </div>
        </section>

        {/* SETTINGS LIST */}
        <section className="space-y-3 pt-2">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-4 mb-4">Pengaturan</h2>
          <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-2 space-y-1 shadow-sm">
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
                  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <span className="font-bold text-sm">Tema Gelap</span>
              </div>
              <button onClick={toggleTheme} className={`w-12 h-6 rounded-full relative transition-colors ${isDark ? 'bg-orange-500' : 'bg-slate-200'}`}>
                <motion.div animate={{ x: isDark ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Notifikasi Push</span>
              </div>
              <button onClick={() => setNotifEnabled(!notifEnabled)} className={`w-12 h-6 rounded-full relative transition-colors ${notifEnabled ? 'bg-orange-500' : 'bg-slate-200'}`}>
                <motion.div animate={{ x: notifEnabled ? 26 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Keamanan & Password</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </section>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={() => navigate('/login')}
          className="w-full py-5 bg-red-50 dark:bg-red-500/10 text-red-600 font-bold rounded-3xl flex items-center justify-center gap-3 hover:bg-red-100 transition-colors border border-red-100 dark:border-red-500/20 mt-4"
        >
          <LogOut className="w-5 h-5" />
          Keluar dari UniBee
        </button>
        <p className="text-center text-[10px] text-slate-400 font-medium pb-4">UniBee v1.0 — Made for BINUS @Medan</p>
      </main>

    </div>
  );
}