import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Bell, CheckSquare, CalendarClock, Award, TicketCheck, CheckCircle, MessageSquareWarning, Check, X } from "lucide-react";
import { useNavigate } from "react-router";

// Data dummy notifikasi
const INITIAL_NOTIFS = [
  {
    id: 1,
    type: "reminder",
    title: "Seminar HCI Mulai Dalam 2 Jam!",
    message: "Jangan lupa siapkan QR Code tiket Anda dan datang tepat waktu ke Ruang Teater.",
    time: "Baru saja",
    unread: true,
    icon: <CalendarClock className="w-5 h-5 text-blue-500" />,
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    iconBg: "bg-blue-100 dark:bg-blue-500/20 text-blue-600",
  },
  {
    id: 2,
    type: "reward",
    title: "Selamat! Poin SAT Bertambah",
    message: "Hore! 3 Poin SAT dari acara BINUS Esports Tournament telah berhasil masuk ke profilmu.",
    time: "2 jam yang lalu",
    unread: true,
    icon: <Award className="w-5 h-5 text-orange-500" />,
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    iconBg: "bg-orange-100 dark:bg-orange-500/20 text-orange-600",
  },
  {
    id: 3,
    type: "action",
    title: "Satu Langkah Lagi: Form Refleksi",
    message: "Kerja bagus di Panti Jompo! Segera isi form refleksi di portal TFI untuk mengklaim 5 Jam Comserv.",
    time: "Kemarin, 14:30",
    unread: false,
    icon: <MessageSquareWarning className="w-5 h-5 text-amber-500" />,
    bgColor: "bg-white dark:bg-white/5",
    iconBg: "bg-amber-100 dark:bg-amber-500/20 text-amber-600",
  },
  {
    id: 4,
    type: "status",
    title: "RSVP Dikonfirmasi",
    message: "Pendaftaran untuk Workshop UI/UX telah dikonfirmasi. Kuota Anda sudah diamankan.",
    time: "12 Mei 2026",
    unread: false,
    icon: <TicketCheck className="w-5 h-5 text-emerald-500" />,
    bgColor: "bg-white dark:bg-white/5",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600",
  }
];

export function Notifications() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [selectedActionNotif, setSelectedActionNotif] = useState(false); // State untuk Pop-up TFI

  // Fungsi untuk menandai semua sudah dibaca
  const markAllAsRead = () => {
    const updatedNotifs = notifs.map(n => ({ ...n, unread: false }));
    setNotifs(updatedNotifs);
  };

  // Fungsi untuk menangani klik notifikasi
  const handleNotifClick = (notif: any) => {
    // Tandai dibaca
    const updatedNotifs = notifs.map(n => n.id === notif.id ? { ...n, unread: false } : n);
    setNotifs(updatedNotifs);

    // IDE 2: TRIGGER POP-UP JIKA TIPE NOTIFIKASI ADALAH "ACTION" (TFI)
    if (notif.type === "action") {
      setSelectedActionNotif(true);
    }
  };

  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white pb-12 overflow-x-hidden">
      
      {/* HEADER TINGGI UNTUK KESAN PREMIUM */}
      <header className="pt-12 px-6 pb-6 bg-[#0B1120] rounded-b-[2.5rem] shadow-lg relative z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white tracking-tight">Notifikasi</h1>
          </div>
          
          {/* Tombol Mark All as Read */}
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 bg-white/5 px-3 py-2 rounded-xl transition-colors"
            >
              <CheckSquare className="w-4 h-4" />
              Tandai Dibaca
            </button>
          )}
        </div>
        
        {/* Teks Ringkasan */}
        <p className="text-sm text-slate-400 ml-14">
          Kamu memiliki <span className="text-orange-400 font-bold">{unreadCount} notifikasi baru</span>.
        </p>
      </header>

      {/* DAFTAR NOTIFIKASI */}
      <main className="px-6 py-6">
        <AnimatePresence>
          {notifs.length > 0 ? (
            <div className="space-y-4">
              {notifs.map((notif, index) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNotifClick(notif)} // Panggil fungsi notif click
                  className={`relative p-5 rounded-3xl border cursor-pointer transition-all duration-300 shadow-sm ${
                    notif.unread 
                      ? `${notif.bgColor} border-slate-200 dark:border-white/10 shadow-md transform hover:-translate-y-1` 
                      : `bg-white dark:bg-white/5 border-slate-100 dark:border-transparent opacity-80 hover:opacity-100`
                  }`}
                >
                  {/* Titik Indikator Belum Dibaca (Warna Oranye agar senada dgn UniBee) */}
                  {notif.unread && (
                    <span className="absolute top-6 right-5 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse"></span>
                  )}

                  <div className="flex gap-4">
                    {/* Ikon Kategori */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                      {notif.icon}
                    </div>

                    {/* Konten Teks */}
                    <div className="flex-1 pr-6">
                      <h3 className={`text-sm font-bold mb-1 ${notif.unread ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                        {notif.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {notif.message}
                      </p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // EMPTY STATE JIKA NOTIFIKASI KOSONG
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="py-20 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-10 h-10 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Belum ada notifikasi saat ini.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* IDE 2: POP-UP CARD REDIRECT REFLEKSI TFI */}
      <AnimatePresence>
        {selectedActionNotif && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
              onClick={() => setSelectedActionNotif(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-white/5 text-center"
            >
              <button 
                onClick={() => setSelectedActionNotif(false)} 
                className="absolute top-4 right-4 w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white dark:border-slate-800 shadow-lg">
                <Award className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Kerja bagus, Mahasiswa!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Kegiatan sosialmu di Panti Jompo Karya Kasih telah selesai. Tinggal 1 langkah lagi untuk mengklaim <strong>5 Jam Comserv-mu.</strong>
              </p>
              
              <button 
                onClick={() => setSelectedActionNotif(false)} 
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:-translate-y-1 transition-transform"
              >
                Tulis Refleksi di TFI
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}