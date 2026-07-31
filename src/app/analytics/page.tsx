"use client";

import { BarChart3, TrendingUp, DollarSign, Clock, Users, ShieldCheck, Zap } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Production Efficiency", value: "98%", change: "+4.2% vs last month", color: "from-brand-500 to-cyan-400" },
    { label: "Hours Saved with AI", value: "45h / mo", change: "+12 hrs saved", color: "from-purple-500 to-pink-500" },
    { label: "Asset Delivery Accuracy", value: "99.9%", change: "Zero delays", color: "from-emerald-500 to-teal-500" },
    { label: "Overall Project ROI", value: "3.2x", change: "+0.4x increase", color: "from-amber-500 to-orange-500" },
  ];

  const departmentPerformance = [
    { name: "Production & Direction", progress: 94, budgetUtilized: "82%", status: "Optimal" },
    { name: "Cinematography & Lighting", progress: 88, budgetUtilized: "75%", status: "Optimal" },
    { name: "VFX & 3D Animation", progress: 96, budgetUtilized: "90%", status: "High Output" },
    { name: "Sound Design & Editing", progress: 91, budgetUtilized: "68%", status: "Ahead of Schedule" },
  ];

  return (
    <ModulePage
      title="Advanced Analytics & BI"
      subtitle="Real-time business intelligence, production ROI, and team efficiency metrics"
      icon={<BarChart3 className="w-6 h-6 text-white" />}
      actionLabel="Export Report"
      onAction={() => alert("Exporting Executive Analytics PDF...")}
    >
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="card-3d rounded-[22px] p-5 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.label}</div>
            <div className="font-display text-3xl font-bold text-slate-900">{m.value}</div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Departmental Performance */}
      <div className="card-3d rounded-[22px] p-6 space-y-6">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">Department Performance & Output</h3>
          <p className="text-sm text-slate-500 mt-1">Cross-departmental efficiency, budget utilization, and task completion velocity</p>
        </div>

        <div className="space-y-5">
          {departmentPerformance.map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-900">{dept.name}</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500">Budget: <strong>{dept.budgetUtilized}</strong></span>
                  <span className="font-bold text-brand-600">{dept.progress}% Efficiency</span>
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${dept.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-3d rounded-[22px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-slate-900">VFX Throughput Surge</h4>
          <p className="text-xs text-slate-600">
            VFX department achieved a <strong>14% higher frame render velocity</strong> this month compared to previous production cycles.
          </p>
        </div>

        <div className="card-3d rounded-[22px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-slate-900">Budget Optimization</h4>
          <p className="text-xs text-slate-600">
            Resource re-allocation saved <strong>₹4.5 Lakhs</strong> in equipment rental overheads for Project Kaal.
          </p>
        </div>

        <div className="card-3d rounded-[22px] p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-display font-bold text-slate-900">On-Time Milestones</h4>
          <p className="text-xs text-slate-600">
            <strong>100% of critical shooting milestones</strong> for Cyber City Season 1 were hit on or before target release dates.
          </p>
        </div>
      </div>
    </ModulePage>
  );
}
