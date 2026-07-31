"use client";

import { useState } from "react";
import { FileText, Plus, X, CheckCircle2, Clock, AlertTriangle, Star } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

interface DailyReportItem {
  id: string;
  employeeName: string;
  avatar: string;
  department: string;
  date: string;
  hoursWorked: number;
  tasksCompleted: string;
  blockers: string;
  productivityScore: number;
}

const INITIAL_REPORTS: DailyReportItem[] = [
  { id: "REP-01", employeeName: "Arjun Kapoor", avatar: "https://i.pravatar.cc/150?img=12", department: "Executive", date: "Today", hoursWorked: 9, tasksCompleted: "Reviewed Kaal Teaser v2 cut, approved marketing budget for Q3.", blockers: "None", productivityScore: 98 },
  { id: "REP-02", employeeName: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=8", department: "Cinematography", date: "Today", hoursWorked: 8.5, tasksCompleted: "Completed lighting test for Cyber City EP2 night sequence.", blockers: "Outdoor generator power glitch on set B.", productivityScore: 92 },
  { id: "REP-03", employeeName: "Ananya Rao", avatar: "https://i.pravatar.cc/150?img=9", department: "VFX", date: "Today", hoursWorked: 9.5, tasksCompleted: "Finished 3D CG creature composite render for Scene 14.", blockers: "Heavy GPU rendering queue backlog.", productivityScore: 95 },
];

export default function DailyReportsPage() {
  const [reports, setReports] = useState<DailyReportItem[]>(INITIAL_REPORTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tasksCompleted: "",
    hoursWorked: "8",
    blockers: "None",
    score: "95",
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tasksCompleted) return;

    const newRep: DailyReportItem = {
      id: `REP-0${reports.length + 1}`,
      employeeName: "You (Sujai Director)",
      avatar: "https://i.pravatar.cc/150?img=60",
      department: "Production",
      date: "Today",
      hoursWorked: Number(formData.hoursWorked) || 8,
      tasksCompleted: formData.tasksCompleted,
      blockers: formData.blockers || "None",
      productivityScore: Number(formData.score) || 95,
    };

    setReports([newRep, ...reports]);
    setIsModalOpen(false);
    setFormData({ tasksCompleted: "", hoursWorked: "8", blockers: "None", score: "95" });
  };

  return (
    <ModulePage
      title="Daily Work Reports"
      subtitle="Log daily production achievements, track hours worked, and flag blockers"
      icon={<FileText className="w-6 h-6 text-white" />}
      actionLabel="Submit Daily Report"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Submitted Today", value: `${reports.length} Reports`, color: "from-brand-500 to-cyan-400" },
          { label: "Avg Productivity Score", value: "95 / 100", color: "from-emerald-500 to-teal-500" },
          { label: "Total Hours Logged", value: "32.5 Hours", color: "from-purple-500 to-pink-500" },
          { label: "Active Set Blockers", value: "1 Flagged", color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {reports.map((rep) => (
          <div key={rep.id} className="card-3d rounded-[22px] p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={rep.avatar} alt={rep.employeeName} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm" />
                <div>
                  <h4 className="font-display font-bold text-slate-900">{rep.employeeName}</h4>
                  <p className="text-xs text-slate-500">{rep.department} • Logged {rep.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> {rep.productivityScore}% Score
                </div>
                <div className="flex items-center gap-1 text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {rep.hoursWorked} hrs
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-sm">
              <div className="bg-slate-50/80 p-4 rounded-2xl">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tasks Completed Today
                </div>
                <p className="text-slate-700">{rep.tasksCompleted}</p>
              </div>

              <div className="bg-slate-50/80 p-4 rounded-2xl">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Blockers / Issues
                </div>
                <p className={rep.blockers.toLowerCase().includes("none") ? "text-slate-500" : "text-amber-700 font-medium"}>
                  {rep.blockers}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Submit Daily Work Report
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Tasks Completed Today</label>
                <textarea
                  rows={3}
                  required
                  value={formData.tasksCompleted}
                  onChange={(e) => setFormData({ ...formData, tasksCompleted: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Detail the work and milestones finished today..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Hours Worked Today</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formData.hoursWorked}
                    onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="8.5"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Self Rating Score (0-100)</label>
                  <input
                    type="number"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="95"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Blockers or Dependencies (If any)</label>
                <input
                  type="text"
                  value={formData.blockers}
                  onChange={(e) => setFormData({ ...formData, blockers: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="e.g. Waiting for VFX asset render"
                />
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
                  Submit Work Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
