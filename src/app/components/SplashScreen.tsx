import { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Hold splash screen for 2.5 seconds before seamless crossfade
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full bg-[#0B1120] flex flex-col items-center justify-center overflow-hidden relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
          }
        }}
        className="flex flex-col items-center relative z-10"
      >
        {/* Logo App */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
            visible: { 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
            }
          }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-orange-500 rounded-[2rem] blur-2xl opacity-30" />
          <div className="relative w-28 h-28 bg-gradient-to-br from-orange-500 to-amber-400 rounded-[2rem] flex items-center justify-center shadow-2xl border border-white/10 backdrop-blur-md">
            <GraduationCap className="w-14 h-14 text-white drop-shadow-md" />
          </div>
        </motion.div>

        {/* Nama App */}
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
            }
          }}
          className="text-4xl font-black text-white tracking-tight drop-shadow-lg"
        >
          UniBee
        </motion.h1>

        {/* Versi / Kampus */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
            }
          }}
          className="mt-2 flex flex-col items-center"
        >
          <p className="text-orange-400/80 font-semibold tracking-[0.2em] uppercase text-[10px] mb-1">
            Student Hub
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}