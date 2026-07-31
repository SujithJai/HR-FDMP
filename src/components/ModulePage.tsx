"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Plus, Filter, Download, Search } from "lucide-react";

interface ModulePageProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actionLabel?: string;
  children: ReactNode;
}

export function ModulePage({ title, subtitle, icon, actionLabel, children }: ModulePageProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px] transition-all duration-300">
        <Topbar />
        <div className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              {icon && (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-400 shadow-lg shadow-brand-500/30">
                  {icon}
                </div>
              )}
              <div>
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
                  {title}
                </h1>
                {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/70 border border-white/80 rounded-xl">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 w-48"
                />
              </div>
              <button className="p-2.5 rounded-xl hover:bg-white/70 border border-white/80 text-slate-600 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-white/70 border border-white/80 text-slate-600 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              {actionLabel && (
                <button className="btn-premium px-4 py-2.5 font-semibold text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {actionLabel}
                </button>
              )}
            </div>
          </motion.div>

          {children}
        </div>
      </main>
    </div>
  );
}
