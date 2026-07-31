"use client";

import { Film, Play, TrendingUp, Calendar, Users, DollarSign } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

const projects = [
  { id: 1, name: "Midnight in Mumbai", code: "MIM-2024", type: "movie", stage: "post_production", director: "Sanjay Gupta", producer: "Arjun Kapoor", budget: 250000000, spent: 200000000, progress: 80, releaseDate: "Jun 15, 2025", genre: "Thriller" },
  { id: 2, name: "Tales of Tomorrow", code: "TOT-S1", type: "web_series", stage: "production", director: "Anurag Kashyap", producer: "Priya Sharma", budget: 150000000, spent: 80000000, progress: 55, releaseDate: "Sep 1, 2025", genre: "Sci-Fi" },
  { id: 3, name: "Royal Elegance", code: "RE-AD", type: "commercial", stage: "released", director: "Zoya Akhtar", producer: "Rohan Mehta", budget: 5000000, spent: 4500000, progress: 100, releaseDate: "Sep 15, 2024", genre: "Luxury" },
  { id: 4, name: "Rhythm of Love", code: "ROL-MV", type: "music_video", stage: "pre_production", director: "Imtiaz Ali", producer: "Vikram Singh", budget: 8000000, spent: 1000000, progress: 25, releaseDate: "Mar 14, 2025", genre: "Romance" },
];

export default function ProjectsPage() {
  return (
    <ModulePage
      title="Production Projects"
      subtitle="Manage movies, web series, commercials & music videos"
      icon={<Film className="w-6 h-6 text-white" />}
      actionLabel="New Project"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: 4, icon: Play, color: "from-brand-500 to-cyan-400" },
          { label: "Total Budget", value: "₹41.3Cr", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
          { label: "In Production", value: 2, icon: Film, color: "from-purple-500 to-pink-500" },
          { label: "Released", value: 1, icon: TrendingUp, color: "from-amber-500 to-orange-500" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-3d rounded-[22px] p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-display text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card-3d rounded-[22px] overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-40 bg-gradient-to-br from-brand-500 via-cyan-400 to-purple-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm ${getStatusColor(project.stage)}`}>
                  {formatStatus(project.stage)}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700">
                  {project.type.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-2xl font-bold text-white">{project.name}</h3>
                <p className="text-sm text-white/80 mt-1">{project.code} • {project.genre}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">Director</div>
                  <div className="text-sm font-semibold text-slate-900">{project.director}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">Producer</div>
                  <div className="text-sm font-semibold text-slate-900">{project.producer}</div>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-500">Progress</span>
                    <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-xs text-slate-500">Budget</div>
                    <div className="font-bold text-slate-900">{formatCurrency(project.budget)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Spent</div>
                    <div className="font-bold text-slate-900">{formatCurrency(project.spent)}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>Release: {project.releaseDate}</span>
                </div>
                <button className="text-xs font-semibold text-brand-500 hover:text-brand-600">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
