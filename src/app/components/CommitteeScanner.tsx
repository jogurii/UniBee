import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Zap, Keyboard, X, CheckCircle2, AlertCircle, Users, ZapOff } from "lucide-react";
import { useNavigate } from "react-router";

export function CommitteeScanner() {
  const navigate = useNavigate();
  const [flashlight, setFlashlight] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [nim, setNim] = useState("");
  const [scanStatus, setScanStatus] = useState<"idle" | "success" | "error">("idle");

  // Simulasi proses scan
  const simulateScan = (type: "success" | "error") => {
    setScanStatus(type);
    // Di dunia nyata, di sini akan ada fungsi playSound('beep.mp3')
    setTimeout(() => setScanStatus("idle"), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* 1. CAMERA VIEWPORT (SIMULASI) */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-4 sm:p-8">
        {/* Placeholder untuk feed kamera asli */}
        <div className="text-slate-700 flex flex-col items-center text-center px-8">
          <Zap className={`w-12 h-12 mb-4 ${flashlight ? "text-yellow-400 fill-yellow-400" : "opacity-20"}`} />
          <p className="text-xs font-bold tracking-widest uppercase opacity-40">Camera Feed Active</p>
        </div>

        {/* SCAN BOX OVERLAY */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 border-2 border-white/20 rounded-[2.5rem] overflow-hidden">
          {/* Pojok-pojok Frame */}
          <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-t-4 border-l-4 border-orange-500 rounded-tl-[2rem] sm:rounded-tl-[2.5rem]"></div>
          <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-t-4 border-r-4 border-orange-500 rounded-tr-[2rem] sm:rounded-tr-[2.5rem]"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-b-4 border-l-4 border-orange-500 rounded-bl-[2rem] sm:rounded-bl-[2.5rem]"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-b-4 border-r-4 border-orange-500 rounded-br-[2rem] sm:rounded-br-[2.5rem]"></div>

          {/* Animasi Garis Laser Scan */}
          <motion.div
            animate={{ top: ["10%", "90%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute left-3 right-3 sm:left-4 sm:right-4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_rgba(249,115,22,1)] z-10"
          />
        </div>
      </div>

      {/* 2. TOP UI OVERLAY */}
      <div className="absolute top-0 left-0 w-full pt-safe px-4 sm:px-6 flex justify-between items-start z-30">
        <button onClick={() => navigate(-1)} className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Counter Pendaftaran */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl text-center">
          <div className="flex items-center gap-2 mb-1 justify-center">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">Checked In</span>
          </div>
          <p className="text-lg sm:text-xl font-black">45 <span className="text-slate-500 text-xs sm:text-sm">/ 100</span></p>
        </div>

        <button
          onClick={() => setFlashlight(!flashlight)}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl backdrop-blur-md flex items-center justify-center border transition-all active:scale-95 ${flashlight ? "bg-yellow-400 border-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]" : "bg-black/40 border-white/10 text-white"}`}
        >
          {flashlight ? <Zap className="w-5 h-5 sm:w-6 sm:h-6" /> : <ZapOff className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* 3. FEEDBACK OVERLAYS (Visibility of System Status) */}
      <AnimatePresence>
        {scanStatus !== "idle" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`absolute inset-0 z-40 flex flex-col items-center justify-center backdrop-blur-md ${scanStatus === 'success' ? 'bg-emerald-500/40' : 'bg-red-500/40'}`}
          >
            <motion.div 
              initial={{ scale: 0.5, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 flex flex-col items-center shadow-2xl"
            >
              {scanStatus === 'success' ? (
                <>
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Berhasil!</h2>
                  <p className="text-slate-500 font-bold">Mahasiswa - 290xxxx413</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Gagal</h2>
                  <p className="text-slate-500 font-bold">QR Sudah Digunakan</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. FALLBACK INPUT (Error Recovery) */}
      <div className="absolute bottom-0 left-0 w-full px-4 sm:px-8 pb-6 sm:pb-8 pt-4 z-30">
        {!showManualInput ? (
          <button
            onClick={() => setShowManualInput(true)}
            className="w-full py-4 sm:py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl flex items-center justify-center gap-3 font-bold text-xs sm:text-sm active:scale-[0.98] transition-all"
          >
            <Keyboard className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            Input NIM Manual
          </button>
        ) : (
          <motion.div
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900 border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] shadow-2xl mb-4"
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="font-bold text-sm sm:text-base">Input NIM</h3>
              <button onClick={() => setShowManualInput(false)}><X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" /></button>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Contoh: 290274..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
              <button
                onClick={() => simulateScan("success")}
                className="px-4 sm:px-6 bg-orange-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base active:scale-95 transition-transform"
              >
                Cek
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* TEST TRIGGERS (Hanya untuk keperluan demo) */}
      <div className={`absolute left-0 right-0 flex justify-center gap-2 sm:gap-4 opacity-20 hover:opacity-100 transition-opacity z-30 ${showManualInput ? 'bottom-auto top-16' : 'bottom-0'}`}>
        <button onClick={() => simulateScan("success")} className="text-[8px] sm:text-[10px] border border-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Test Success</button>
        <button onClick={() => simulateScan("error")} className="text-[8px] sm:text-[10px] border border-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Test Error</button>
      </div>
    </div>
  );
}