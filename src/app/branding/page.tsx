"use client";

import { Building2, Download, Image as ImageIcon, Sparkles } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

export default function BrandingPage() {
  return (
    <ModulePage
      title="Brand Assets & Guidelines"
      subtitle="Official Four Dee Motion Pictures studio logo assets, color palettes, and press kits"
      icon={<Building2 className="w-6 h-6 text-white" />}
    >
      <div className="card-3d rounded-[22px] p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900">Official Metallic Studio Logo</h3>
            <p className="text-sm text-slate-500 mt-0.5">High-resolution master PNG asset for production overlays and media press kits</p>
          </div>
          <a
            href="/logo.png"
            download="Four_Dee_Motion_Pictures_Official_Logo.png"
            className="btn-premium px-5 py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Master PNG
          </a>
        </div>

        <div className="bg-slate-900/5 p-8 rounded-3xl flex items-center justify-center border border-slate-200/60">
          <img
            src="/logo.png"
            alt="Four Dee Motion Pictures Official Logo"
            className="h-44 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Color Tokens */}
      <div className="card-3d rounded-[22px] p-6 space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900">Brand Color System</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Cinematic Blue", hex: "#0066FF", class: "bg-blue-600" },
            { name: "Studio Cyan", hex: "#00F0FF", class: "bg-cyan-400" },
            { name: "Royal Purple", hex: "#7C3AED", class: "bg-purple-600" },
            { name: "Executive Dark", hex: "#0F172A", class: "bg-slate-900" },
          ].map((color) => (
            <div key={color.name} className="p-4 border rounded-2xl space-y-2">
              <div className={`h-14 rounded-xl ${color.class} shadow-md`} />
              <div className="font-semibold text-sm text-slate-900">{color.name}</div>
              <div className="text-xs text-slate-400 font-mono">{color.hex}</div>
            </div>
          ))}
        </div>
      </div>
    </ModulePage>
  );
}
