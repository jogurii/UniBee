import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, GraduationCap, Loader2, ShieldCheck, Fingerprint, UserCheck } from "lucide-react";
import { useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();
  const [loginStep, setLoginStep] = useState<"initial" | "sso" | "loading" | "2fa" | "success">("initial");

  const handleStartLogin = () => {
    setLoginStep("sso");
  };

  const handleEmailSubmit = () => {
    setLoginStep("loading");
    // Simulasi loading SSO
    setTimeout(() => setLoginStep("2fa"), 2000);
  };

  const handle2FAVerify = () => {
    setLoginStep("success");
    // Simulasi sukses, navigasi ke dashboard
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120]">
      <AnimatePresence mode="wait">
        {loginStep === "initial" && (
          <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen justify-center py-8">
            {/* Top Section - Logo & Welcome */}
            <div className="px-5 flex flex-col items-center mb-auto mt-16">
              {/* Logo Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl flex items-center justify-center shadow-xl shadow-orange-500/20 mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>

              {/* Welcome Text */}
              <h1 className="text-3xl font-black text-white text-center tracking-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">UniBee</span>
              </h1>
              <p className="mt-3 text-slate-400 text-center text-base leading-relaxed max-w-xs">
                Masuk dengan akun SSO untuk mengakses hub kemahasiswaan
              </p>
            </div>

            {/* Middle Section - Illustration */}
            <div className="px-5 py-6 mt-auto mb-auto">
              <div className="relative w-full h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white/80 text-sm font-medium">Satu ketukan, ribuan koneksi kampus</p>
                  </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Bottom Section - Login Button */}
            <div className="px-5 pb-8 flex flex-col items-center mt-auto">
              <button
                type="button"
                onClick={handleStartLogin}
                className="btn-hp-primary touch-target w-full max-w-sm"
              >
                <LogIn className="w-5 h-5" />
                <span>Login dengan Email Kampus</span>
              </button>

              <p className="mt-6 text-center text-sm text-slate-400">
                Masalah dengan akun? <a href="#" className="font-semibold text-orange-500 hover:underline">Bantuan Akses</a>
              </p>
            </div>
          </motion.div>
        )}

        {/* SSO EMAIL LOGIN STEP */}
        {loginStep === "sso" && (
          <motion.div key="sso" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="pt-8 px-5 pb-6 flex items-center gap-4">
              <button onClick={() => setLoginStep("initial")} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">Login SSO</h2>
                <p className="text-sm text-slate-400">Masuk dengan email kampus</p>
              </div>
            </div>

            {/* SSO Form - centered content */}
            <div className="flex-1 flex flex-col px-5">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center"><GraduationCap className="w-5 h-5 text-orange-500" /></div>
                  <div>
                    <p className="text-white font-semibold text-sm">Single Sign-On</p>
                    <p className="text-slate-400 text-xs">BINUS University</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">Gunakan email kampus Anda untuk masuk. Contoh: <span className="text-orange-400 font-semibold">imax@binus.ac.id</span></p>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Kampus</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="xxxxx@binus.ac.id"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-6">Email yang terdaftar di sistem kemahasiswaan BINUS</p>
            </div>

            {/* Submit Button - bottom */}
            <div className="px-5 pb-12">
              <button
                onClick={handleEmailSubmit}
                className="btn-hp-primary touch-target w-full max-w-sm mx-auto block"
              >
                <span>Lanjut ke Verifikasi</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* LOADING VERIFICATION STEP */}
        {loginStep === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center px-5">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-400 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-orange-500/30 animate-pulse">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white text-center mb-3">Memverifikasi Akun</h2>
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menghubungkan ke server BINUS SSO...</span>
            </div>
          </motion.div>
        )}

        {/* 2FA VERIFICATION STEP */}
        {loginStep === "2fa" && (
          <motion.div key="2fa" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="pt-8 px-5 pb-6 flex items-center gap-4">
              <button onClick={() => setLoginStep("sso")} className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">Verifikasi Dua Faktor</h2>
                <p className="text-sm text-slate-400">Pilih metode verifikasi</p>
              </div>
            </div>

            {/* 2FA Options - centered */}
            <div className="flex-1 flex flex-col px-5">
              <p className="text-slate-400 text-sm mb-6">Kami perlu memverifikasi identitas Anda sebelum memberikan akses.</p>

              {/* 2FA Method Cards */}
              <div className="flex flex-col gap-4 mb-8">
                {/* Email OTP */}
                <button onClick={handle2FAVerify} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <LogIn className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Kode OTP via Email</p>
                      <p className="text-slate-400 text-sm">Kode 6 digit dikirim ke email kampus</p>
                    </div>
                  </div>
                </button>

                {/* Biometric */}
                <button onClick={handle2FAVerify} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Fingerprint className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Biometric / Fingerprint</p>
                      <p className="text-slate-400 text-sm">Verifikasi sidik jari perangkat</p>
                    </div>
                  </div>
                </button>

                {/* Student Card */}
                <button onClick={handle2FAVerify} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <UserCheck className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">Verifikasi Kartu Mahasiswa</p>
                      <p className="text-slate-400 text-sm">Scan atau input Nomor Kartu Mahasiswa</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Info Box - bottom */}
            <div className="px-5 pb-12">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-blue-300 text-xs leading-relaxed">Login Anda dilindungi dengan enkripsi end-to-end. Data pribadi tidak akan dibagikan kepada pihak ketiga.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STEP */}
        {loginStep === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen items-center justify-center px-5">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/30">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </motion.div>
            <h2 className="text-2xl font-black text-white text-center mb-3">Login Berhasil!</h2>
            <p className="text-slate-400 text-center">Mengalihkan ke dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}