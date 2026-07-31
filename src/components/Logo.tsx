"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

export function Logo({ size = "md", showText = true, className = "", animated = false }: LogoProps) {
  const heights = {
    sm: "h-14",
    md: "h-24",
    lg: "h-36",
    xl: "h-56",
  };

  const imgHeight = heights[size];

  const LogoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Four Dee Motion Pictures"
        className={`${imgHeight} max-w-full w-auto object-contain drop-shadow-2xl`}
      />
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


