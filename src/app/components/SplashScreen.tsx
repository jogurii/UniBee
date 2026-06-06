import { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigasi otomatis ke halaman login setelah 2 detik
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full bg-[#0B1120] flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Logo App */}
        <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30 mb-6">
          <GraduationCap className="w-16 h-16 text-white" />
        </div>

        {/* Nama App */}
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-black text-white tracking-tight"
        >
          UniBee
        </motion.h1>

        {/* Versi / Kampus */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-slate-400 mt-2 text-sm"
        >
          v1.0 • BINUS University
        </motion.p>
      </motion.div>
    </div>
  );
}