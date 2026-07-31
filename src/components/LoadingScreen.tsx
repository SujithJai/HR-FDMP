"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return p + 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center animated-gradient"
    >
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-brand-200/40 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-400/30 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-gold/30 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="glass-strong rounded-[32px] p-8"
        >
          <Logo size="xl" showText={false} animated />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold gradient-text mb-2">
            Four Dee Motion Pictures
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">
            Enterprise HRMS • Production CRM • DAM
          </p>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "280px", opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative h-1.5 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/60"
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 via-cyan-400 to-brand-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <p className="text-sm text-slate-400 font-medium tabular-nums">
          Loading workspace... {progress}%
        </p>
      </div>
    </motion.div>
  );
}
