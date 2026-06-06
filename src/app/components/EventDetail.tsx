import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Award,
  Wallet,
  Sparkles,
  CheckCircle2,
  Users,
  AlertCircle,
  HeartHandshake, // Tambahkan ikon ini untuk TFI
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { getEventById } from "../data/events";

function RewardRow({
  icon,
  label,
  value,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconClass: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/80 dark:bg-white/10 rounded-2xl px-4 py-3 border border-amber-200/50 dark:border-white/10">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconClass}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id);
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-6 text-center">
        <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Event tidak ditemukan</h1>
        <p className="text-slate-400 text-sm mb-6">Event yang Anda cari mungkin sudah tidak tersedia.</p>
        <button
          type="button"
          onClick={() => navigate("/explore")}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl"
        >
          Kembali ke Explore
        </button>
      </div>
    );
  }

  const quotaPercent = Math.round((event.quotaRemaining / event.quotaTotal) * 100);
  const isLowQuota = quotaPercent <= 20;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-24 overflow-x-hidden full-h-screen">

      {/* HEADER IMAGE & BADGE */}
      <div className="relative h-72 sm:h-80 w-full">
        <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-black/30" />
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Kembali"
          className="absolute top-6 left-6 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10 touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {event.isTFI && (
          <div className="absolute top-12 right-6 bg-white/95 border border-white/40 text-slate-900 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
            <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
            TFI Verified
          </div>
        )}
      </div>

      <main className="relative -mt-8 px-6 space-y-6 z-10">
        
        {/* INFO UTAMA EVENT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xl"
        >
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-2">{event.organizer}</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-5">{event.title}</h1>
          
          {/* IDE 1: INTEGRASI KOTAK INFO TFI */}
          {event.isTFI && (
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-4 mb-5 flex gap-3 items-start shadow-sm">
              <HeartHandshake className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-blue-700 dark:text-blue-400 block mb-0.5">Acara Resmi TFI</strong>
                Acara ini diselenggarakan langsung oleh Teach For Indonesia. Jangan lupa mengisi form refleksi di akhir acara untuk mengklaim jam Comserv-mu.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Tanggal</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{event.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Waktu</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{event.time} - {event.endTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Lokasi</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">{event.location}</p>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-amber-400 hover:underline">
                  Buka di Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
          <p className="mt-5 pt-5 border-t border-slate-100 dark:border-white/10 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {event.description}
          </p>
        </motion.section>

        {/* REWARDS SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-orange-500/10 p-6 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Benefit yang Kamu Dapat</h2>
          </div>
          <div className="space-y-3">
            {event.rewards?.satPoints && (
              <RewardRow icon={<Award className="w-5 h-5 text-orange-500" />} label="Poin SAT" value={event.rewards.satPoints} iconClass="bg-orange-500/20" />
            )}
            {event.rewards?.certificate && (
              <RewardRow icon={<CheckCircle2 className="w-5 h-5 text-indigo-500" />} label="Sertifikat" value={event.rewards.certificate} iconClass="bg-indigo-500/20" />
            )}
            {event.rewards?.eWallet && (
              <RewardRow icon={<Wallet className="w-5 h-5 text-emerald-500" />} label="E-Wallet" value={event.rewards.eWallet} iconClass="bg-emerald-500/20" />
            )}
          </div>
        </motion.section>

        {/* QUOTA SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`rounded-3xl p-6 border shadow-md ${isLowQuota ? "bg-red-500/5 border-red-500/30" : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10"}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className={`w-5 h-5 ${isLowQuota ? "text-red-500" : "text-slate-500"}`} />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Kuota Peserta</h2>
            </div>
            {isLowQuota && (
              <span className="px-2.5 py-1 bg-red-500/15 text-red-600 text-[10px] font-black uppercase rounded-lg animate-pulse">
                Segera Penuh!
              </span>
            )}
          </div>
          <p className={`text-lg font-bold mb-3 ${isLowQuota ? "text-red-600" : "text-slate-900 dark:text-white"}`}>
            Sisa {event.quotaRemaining} dari {event.quotaTotal} Kuota
          </p>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${quotaPercent}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className={`h-full rounded-full ${isLowQuota ? "bg-gradient-to-r from-red-600 to-orange-500" : "bg-gradient-to-r from-orange-600 to-amber-400"}`}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {isLowQuota ? "Kuota hampir habis — daftar sekarang sebelum kehabisan!" : `${quotaPercent}% kuota masih tersedia`}
          </p>
        </motion.section>
      </main>

      {/* STICKY BOTTOM BUTTON */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 pt-4 pb-safe-nav bg-gradient-to-t from-white via-white/95 dark:from-[#0B1120] dark:via-[#0B1120]/95 to-transparent">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => setRegistered(true)}
          disabled={registered || event.quotaRemaining === 0}
          className={`btn-hp-primary ${
            registered
              ? "bg-emerald-600"
              : event.quotaRemaining === 0
                ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                : ""
          }`}
        >
          {registered ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Terdaftar — RSVP Berhasil!
            </>
          ) : event.quotaRemaining === 0 ? (
            "Kuota Penuh"
          ) : (
            "Register Now — 1-Click RSVP"
          )}
        </motion.button>
        {!registered && event.quotaRemaining > 0 && isLowQuota && (
          <p className="text-center text-[10px] text-amber-500 dark:text-amber-400/90 font-bold mt-2 uppercase tracking-wider">
            ⚡ {event.quotaRemaining} kursi tersisa — jangan sampai ketinggalan!
          </p>
        )}
      </div>
    </div>
  );
}