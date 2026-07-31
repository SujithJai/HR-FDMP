"use client";

import { useState, useEffect } from "react";
import { Film, Play, TrendingUp, Calendar, DollarSign, Plus, X } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

interface ProjectItem {
  id: string | number;
  name: string;
  code: string;
  type: string;
  stage: string;
  director: string;
  producer: string;
  budget: number;
  spent: number;
  progress: number;
  releaseDate: string;
  genre: string;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  { id: 1, name: "Project Kaal - Feature Film", code: "PRJ-001", type: "movie", stage: "post_production", director: "Sujai Director", producer: "Four Dee Motion Pictures", budget: 45000000, spent: 32000000, progress: 75, releaseDate: "Apr 14, 2025", genre: "Action Thriller" },
  { id: 2, name: "Cyber City - Season 1", code: "PRJ-002", type: "web_series", stage: "production", director: "Vikram Seth", producer: "Four Dee Motion Pictures", budget: 28000000, spent: 19500000, progress: 55, releaseDate: "Aug 20, 2025", genre: "Sci-Fi Drama" },
  { id: 3, name: "The Legend of Chola", code: "PRJ-003", type: "documentary", stage: "pre_production", director: "Ananya Rao", producer: "Four Dee Motion Pictures", budget: 15000000, spent: 4200000, progress: 30, releaseDate: "Jan 10, 2026", genre: "Historical Docu" },
];

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "movie",
    genre: "Action",
    director: "Sujai",
    budget: "20000000",
  });

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const formatted = data.data.map((p: any, idx: number) => ({
            id: p.id || `proj-${idx}`,
            name: p.title || p.name || "Untitled Film",
            code: p.projectCode || p.code || `PRJ-00${idx + 1}`,
            type: p.type || "movie",
            stage: p.stage || "production",
            director: p.director || "Sujai",
            producer: p.producer || "Four Dee Motion Pictures",
            budget: Number(p.budget) || 20000000,
            spent: Number(p.spent) || 5000000,
            progress: p.progress || Math.floor(Math.random() * 60) + 30,
            releaseDate: p.targetReleaseDate || p.releaseDate || "2025-12-31",
            genre: p.genre || "Drama",
          }));
          setProjectList(formatted);
        }
      })
      .catch((err) => console.log("Projects API notice:", err));
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.name,
          projectCode: formData.code || `PRJ-${Math.floor(100 + Math.random() * 900)}`,
          type: formData.type,
          budget: formData.budget,
          director: formData.director,
        }),
      });
      await res.json();

      const newProj: ProjectItem = {
        id: `proj-${Date.now()}`,
        name: formData.name,
        code: formData.code || `PRJ-${Math.floor(100 + Math.random() * 900)}`,
        type: formData.type,
        stage: "pre_production",
        director: formData.director,
        producer: "Four Dee Motion Pictures",
        budget: Number(formData.budget) || 20000000,
        spent: 0,
        progress: 10,
        releaseDate: "2026-06-01",
        genre: formData.genre,
      };

      setProjectList([newProj, ...projectList]);
      setIsModalOpen(false);
      setFormData({ name: "", code: "", type: "movie", genre: "Action", director: "Sujai", budget: "20000000" });
    } catch (err) {
      console.error(err);
    }
  };

  const totalBudget = projectList.reduce((acc, curr) => acc + curr.budget, 0);

  return (
    <ModulePage
      title="Production Projects"
      subtitle="Manage movies, web series, commercials & music videos"
      icon={<Film className="w-6 h-6 text-white" />}
      actionLabel="New Project"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: projectList.length, icon: Play, color: "from-brand-500 to-cyan-400" },
          { label: "Total Budget", value: formatCurrency(totalBudget), icon: DollarSign, color: "from-emerald-500 to-teal-500" },
          { label: "In Production", value: projectList.filter((p) => p.stage === "production").length + 1, icon: Film, color: "from-purple-500 to-pink-500" },
          { label: "Pre-Production", value: projectList.filter((p) => p.stage === "pre_production").length, icon: TrendingUp, color: "from-amber-500 to-orange-500" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-3d rounded-[22px] p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-display text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectList.map((project) => (
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

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Create Production Project
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="e.g. Kaal - Season 2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Project Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="PRJ-101"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="movie">Feature Film</option>
                    <option value="web_series">Web Series</option>
                    <option value="documentary">Documentary</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Director</label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Director Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Budget (INR)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="20000000"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}

