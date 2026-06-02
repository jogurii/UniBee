import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, QrCode, Calendar, MapPin, X, AlertTriangle, CheckCircle2, Ticket } from "lucide-react";
import { useNavigate } from "react-router";
import { useBottomNav } from "./MainLayout";

// DATA DISINKRONKAN: Menambahkan Penanaman Pohon dan status isTFI
const TICKETS = [
  {
    id: 1,
    title: "Seminar HCI & User Experience",
    date: "16 Mei 2026",
    location: "Xperience Space Lt.1, BINUS @Medan",
    status: "Upcoming",
    code: "UNB-7721-JX",
    isTFI: false,
    image: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Workshop UI/UX: Design for Sustainability",
    date: "18 Mei 2026",
    location: "Xperience Space Lt.1, BINUS @Medan",
    status: "Upcoming",
    code: "UNB-8820-XP",
    isTFI: false,
    image: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Penanaman Pohon (Panti Jompo Karya Kasih)",
    date: "14 Mei 2026",
    location: "Medan Johor",
    status: "Past",
    code: "TFI-9988-PJ",
    isTFI: true,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Seminar Career 101",
    date: "10 April 2026",
    location: "Main Hall, BINUS @Medan",
    status: "Past",
    code: "UNB-1122-OK",
    isTFI: false,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
  }
];

export function MyTickets() {
  const navigate = useNavigate();
  const { setIsVisible } = useBottomNav();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Hide bottom nav saat modal ticket dibuka, tampilkan kembali saat ditutup
  useEffect(() => {
    if (selectedTicket) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [selectedTicket, setIsVisible]);

  const filteredTickets = TICKETS.filter(t => t.status === activeTab);

  const handleCancelRSVP = () => {
    setShowCancelConfirm(false);
    setSelectedTicket(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pb-24 overflow-x-hidden full-h-screen">

      {/* HEADER */}
      <header className="px-6 pt-8 pb-6 bg-[#0B1120] rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="touch-target w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">Tiket Saya</h1>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 relative">
          <button onClick={() => setActiveTab("Upcoming")} className={`touch-target flex-1 py-3 text-sm font-bold rounded-xl transition-all relative z-10 ${activeTab === "Upcoming" ? "text-white" : "text-slate-400"}`}>Akan Datang</button>
          <button onClick={() => setActiveTab("Past")} className={`touch-target flex-1 py-3 text-sm font-bold rounded-xl transition-all relative z-10 ${activeTab === "Past" ? "text-white" : "text-slate-400"}`}>Selesai</button>
          <motion.div className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl z-0" animate={{ x: activeTab === "Upcoming" ? "0%" : "96%", width: "50%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        </div>
      </header>

      {/* TICKET LIST */}
      <main className="px-6 pt-5 space-y-5 pb-6">
        <AnimatePresence mode="wait">
          {filteredTickets.length > 0 ? (
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="relative flex flex-col bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-lg cursor-pointer group hover:-translate-y-1 transition-transform">
                  <div className="flex p-4 gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0"><img src={ticket.image} className="w-full h-full object-cover" alt="" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">{ticket.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> {ticket.date}</p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 truncate"><MapPin className="w-3 h-3"/> {ticket.location}</p>
                    </div>
                    <div className="flex items-center"><QrCode className="w-8 h-8 text-orange-500 opacity-50 group-hover:opacity-100 transition-opacity" /></div>
                  </div>
                  <div className="flex items-center px-4">
                    <div className="w-3 h-6 rounded-r-full bg-slate-50 dark:bg-[#0B1120] -ml-4 border-r border-slate-200 dark:border-white/10"></div>
                    <div className="flex-1 border-t border-dashed border-slate-200 dark:border-white/20 mx-2"></div>
                    <div className="w-3 h-6 rounded-l-full bg-slate-50 dark:bg-[#0B1120] -mr-4 border-l border-slate-200 dark:border-white/10"></div>
                  </div>
                  <div className="px-5 py-3 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ticket.code}</span>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-amber-400">TAP UNTUK QR</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-full flex items-center justify-center mb-6 shadow-sm"><Ticket className="w-12 h-12 text-slate-300 dark:text-slate-600" /></div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Belum Ada Tiket</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 px-8">Kamu belum memiliki acara yang {activeTab === "Upcoming" ? "akan datang" : "selesai diikuti"}.</p>
              <button onClick={() => navigate('/explore')} className="px-8 py-4 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 font-bold rounded-2xl hover:bg-orange-100 transition-colors">Cari Event Baru</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* EXPANDED VIEW MODAL */}
      <AnimatePresence>
        {selectedTicket && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-white dark:bg-[#0B1120] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
            <button
              onClick={() => setSelectedTicket(null)}
              className="fixed top-6 right-6 z-10 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 shadow-sm active:scale-95 transition-transform"
              style={{ top: 'max(1.5rem, env(safe-area-inset-top))', right: 'max(1.5rem, env(safe-area-inset-right))' }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm text-center overflow-hidden flex flex-col items-center justify-center px-4"
              style={{ height: 'calc(100vh - max(6rem, env(safe-area-inset-top)) - max(6rem, env(safe-area-inset-bottom)) - 3rem)' }}
            >
              <div className="flex flex-col items-center justify-center flex-1 w-full">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1 leading-tight">{selectedTicket.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-4">{selectedTicket.location}</p>
                <div className="bg-white dark:bg-white p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-slate-100 dark:border-white/20 mb-3 mx-auto w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedTicket.code}`}
                    className="w-full h-full p-1"
                    alt="QR Code"
                  />
                </div>
                <p className="text-xs font-black text-slate-400 tracking-[0.2em] mb-3 uppercase">{selectedTicket.code}</p>
              </div>

              {/* PERBAIKAN LOGIKA UI TFI */}
              <div className="space-y-3 w-full max-w-xs mx-auto mb-4">
                {selectedTicket.status === "Upcoming" ? (
                  <>
                    <p className="text-xs text-slate-400 italic">Arahkan QR Code ke alat scan di depan pintu masuk.</p>
                    <button onClick={() => setShowCancelConfirm(true)} className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-3 rounded-xl transition-colors">Batalkan RSVP</button>
                  </>
                ) : (
                  selectedTicket.isTFI ? (
                    <div className="flex flex-col gap-2 px-1">
                      <div className="p-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 rounded-2xl">
                        <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-0.5">Klaim Comserv-mu!</p>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400">Isi paper refleksi untuk acara ini agar jam sosialmu masuk ke sistem.</p>
                      </div>
                      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:-translate-y-1 transition-transform flex items-center justify-center gap-2 text-sm">
                        Tulis Refleksi di TFI
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl text-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Acara Telah Selesai</p>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">Terima kasih telah berpartisipasi!</p>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONFIRMATION POP-UP */}
      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-white/5">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 border border-red-200 dark:border-red-500/30"><AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" /></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Batalkan RSVP?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">Jika dibatalkan, kuota Anda akan diberikan kepada mahasiswa lain. Anda yakin ingin membatalkan kehadiran?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowCancelConfirm(false)} className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-2xl">Tidak</button>
                <button onClick={handleCancelRSVP} className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg">Ya, Batal</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 z-[100] border border-slate-800 dark:border-slate-200 min-w-[280px] justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" /><span className="text-sm font-bold">RSVP Berhasil Dibatalkan</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}