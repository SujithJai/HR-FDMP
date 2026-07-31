"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

export function PlaceholderModule({ title, description, icon, features }: PlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[28px] p-8 md:p-12 bg-gradient-to-br from-brand-500 via-brand-600 to-cyan-500 text-white"
      >
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
              {icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              Enterprise Module
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-lg text-white/90 mb-6">{description}</p>
          <button className="btn-premium bg-white text-brand-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white/90">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="card-3d rounded-[22px] p-6"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-cyan-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 mb-1">{feature}</h3>
                <p className="text-sm text-slate-500">
                  Premium enterprise feature with advanced capabilities and AI-powered insights.
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Efficiency", value: "98%" },
          { label: "Time Saved", value: "45h/mo" },
          { label: "Accuracy", value: "99.9%" },
          { label: "ROI", value: "3.2x" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5 text-center">
            <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
