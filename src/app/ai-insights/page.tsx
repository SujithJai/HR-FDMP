"use client";

import { Sparkles, Brain, Zap, TrendingUp, Lightbulb, Target } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { motion } from "framer-motion";

const insights = [
  { icon: TrendingUp, title: "Productivity Up 12%", description: "Your team's productivity increased 12% this month. VFX department shows exceptional performance.", color: "from-emerald-500 to-teal-500", priority: "high" },
  { icon: Target, title: "Project Risk Alert", description: "Midnight in Mumbai is 5 days behind schedule. Consider reallocating resources from Royal Elegance.", color: "from-amber-500 to-orange-500", priority: "urgent" },
  { icon: Lightbulb, title: "Optimization Opportunity", description: "WFH on Wednesdays shows 15% higher productivity. Consider making it permanent.", color: "from-brand-500 to-cyan-400", priority: "medium" },
  { icon: Brain, title: "Leave Pattern Detected", description: "3 team members have leave requests around Dec 20-25. Plan project milestones accordingly.", color: "from-purple-500 to-pink-500", priority: "medium" },
  { icon: Zap, title: "Cost Saving", description: "Switching to bulk equipment rental can save ₹2.3L per project.", color: "from-amber-500 to-orange-500", priority: "high" },
];

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px]">
        <Topbar />
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[28px] p-8 md:p-12 bg-gradient-to-br from-purple-600 via-brand-600 to-cyan-500 text-white"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  AI-Powered
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">AI Insights</h1>
              <p className="text-lg text-white/90">
                Smart recommendations and predictive analytics powered by machine learning
              </p>
            </div>
          </motion.div>

          {/* AI Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "AI Health Score", value: "94/100", trend: "+5", color: "from-emerald-500 to-teal-500" },
              { label: "Predictions Made", value: "47", trend: "Today", color: "from-brand-500 to-cyan-400" },
              { label: "Actions Suggested", value: "12", trend: "Pending", color: "from-purple-500 to-pink-500" },
            ].map((stat) => (
              <div key={stat.label} className="card-3d rounded-[22px] p-6">
                <div className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.label}
                </div>
                <div className="font-display text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-slate-900">Latest Insights</h2>
            {insights.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-3d rounded-[22px] p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${insight.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg font-bold text-slate-900">{insight.title}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          insight.priority === "urgent" ? "bg-red-100 text-red-700" :
                          insight.priority === "high" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {insight.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{insight.description}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <button className="btn-premium px-4 py-2 rounded-lg text-xs font-semibold">
                          Take Action
                        </button>
                        <button className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
