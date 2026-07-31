"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

export function Logo({ size = "md", showText = true, className = "", animated = false }: LogoProps) {
  const dimensions = {
    sm: { height: 32, textClass: "text-sm", subtitleClass: "text-[9px]" },
    md: { height: 44, textClass: "text-base", subtitleClass: "text-[10px]" },
    lg: { height: 60, textClass: "text-xl", subtitleClass: "text-[11px]" },
    xl: { height: 90, textClass: "text-3xl", subtitleClass: "text-[13px]" },
  };

  const { height, textClass, subtitleClass } = dimensions[size];

  const LogoContent = (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Metallic 4D Film Reel Logo Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          style={{ height: `${height}px`, width: "auto" }}
          viewBox="0 0 240 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <defs>
            <linearGradient id="metallic-silver-mark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A616E" />
              <stop offset="30%" stopColor="#C4D3D9" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#8DA3AF" />
              <stop offset="100%" stopColor="#2B3E48" />
            </linearGradient>
            <linearGradient id="reel-dark-rim" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1B2931" />
              <stop offset="100%" stopColor="#526873" />
            </linearGradient>
          </defs>

          {/* 4 */}
          <path
            d="M 68,22 L 20,92 L 68,92 L 68,110 L 88,110 L 88,92 L 105,92 L 105,74 L 88,74 L 88,22 Z M 68,44 L 68,74 L 38,74 Z"
            fill="url(#metallic-silver-mark)"
            stroke="#2B3E48"
            strokeWidth="1.5"
          />

          {/* D Outer Curve */}
          <path
            d="M 98,22 L 140,22 C 190,22 222,48 222,66 C 222,84 190,110 140,110 L 98,110 Z"
            fill="url(#metallic-silver-mark)"
            stroke="#2B3E48"
            strokeWidth="1.5"
          />

          {/* D Inner Counter */}
          <path
            d="M 118,40 L 140,40 C 170,40 198,54 198,66 C 198,78 170,92 140,92 L 118,92 Z"
            fill="#FFFFFF"
          />

          {/* Film Reel inside D Center */}
          <g transform="translate(152, 66)">
            <circle r="36" fill="url(#metallic-silver-mark)" stroke="#2B3E48" strokeWidth="2" />
            <circle r="32" fill="url(#reel-dark-rim)" />
            <circle r="30" fill="url(#metallic-silver-mark)" />
            <circle r="22" fill="#1B2A32" />

            {/* 6 Holes */}
            <circle cx="0" cy="-14" r="5.5" fill="#EBF2F5" stroke="#4A616E" strokeWidth="0.8" />
            <circle cx="12" cy="-7" r="5.5" fill="#EBF2F5" stroke="#4A616E" strokeWidth="0.8" />
            <circle cx="12" cy="7" r="5.5" fill="#EBF2F5" stroke="#4A616E" strokeWidth="0.8" />
            <circle cx="0" cy="14" r="5.5" fill="#EBF2F5" stroke="#4A616E" strokeWidth="0.8" />
            <circle cx="-12" cy="7" r="5.5" fill="#EBF2F5" stroke="#4A616E" strokeWidth="0.8" />
            <circle cx="-12" cy="-7" r="5.5" fill="#EBF2F5" stroke="#4A616E" strokeWidth="0.8" />

            <circle r="8" fill="url(#metallic-silver-mark)" stroke="#1B2A32" strokeWidth="1" />
            <circle r="4" fill="#1B2A32" />
            <circle r="1.5" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-extrabold ${textClass} tracking-[0.12em] text-slate-900 uppercase`}>
            Four Dee
          </span>
          <span className={`font-semibold ${subtitleClass} tracking-[0.25em] text-slate-500 uppercase mt-1`}>
            Motion Pictures
          </span>
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {LogoContent}
      </motion.div>
    );
  }

  return LogoContent;
}

