"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

export function Logo({ size = "md", showText = true, className = "", animated = false }: LogoProps) {
  const sizes = {
    sm: { box: 28, text: "text-sm" },
    md: { box: 40, text: "text-base" },
    lg: { box: 56, text: "text-xl" },
    xl: { box: 80, text: "text-3xl" },
  };

  const { box, text } = sizes[size];

  const LogoMark = (
    <svg
      width={box}
      height={box}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="fd-logo-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F5FFF" />
          <stop offset="50%" stopColor="#00C8FF" />
          <stop offset="100%" stopColor="#5B8CFF" />
        </linearGradient>
        <linearGradient id="fd-gold" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF9500" />
        </linearGradient>
      </defs>
      {/* Background rounded square */}
      <rect x="2" y="2" width="76" height="76" rx="20" fill="url(#fd-logo-gradient)" />
      <rect x="2" y="2" width="76" height="76" rx="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Film strip marks */}
      <circle cx="14" cy="16" r="2" fill="rgba(255,255,255,0.7)" />
      <circle cx="66" cy="16" r="2" fill="rgba(255,255,255,0.7)" />
      <circle cx="14" cy="64" r="2" fill="rgba(255,255,255,0.7)" />
      <circle cx="66" cy="64" r="2" fill="rgba(255,255,255,0.7)" />
      {/* 4D text */}
      <text
        x="40"
        y="52"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, Inter, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill="white"
        letterSpacing="-2"
      >
        4D
      </text>
      {/* Gold accent bar */}
      <rect x="22" y="58" width="36" height="3" rx="1.5" fill="url(#fd-gold)" />
    </svg>
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {animated ? (
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {LogoMark}
        </motion.div>
      ) : (
        LogoMark
      )}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-display font-bold ${text} tracking-tight text-slate-900`}>
            Four Dee
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-500">
            Motion Pictures
          </span>
        </div>
      )}
    </div>
  );
}
