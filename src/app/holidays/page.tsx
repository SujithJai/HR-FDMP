"use client";

import { useState } from "react";
import { CalendarDays, Plus, X, Sparkles } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

interface HolidayItem {
  id: string;
  name: string;
  date: string;
  day: string;
  type: "Public" | "Festival" | "Optional";
}

const INITIAL_HOLIDAYS: HolidayItem[] = [
  { id: "HOL-01", name: "Independence Day", date: "Aug 15, 2026", day: "Saturday", type: "Public" },
  { id: "HOL-02", name: "Vinayagar Chaturthi", date: "Sep 07, 2026", day: "Monday", type: "Festival" },
  { id: "HOL-03", name: "Ayudha Pooja / Vijayadasami", date: "Oct 19, 2026", day: "Monday", type: "Festival" },
  { id: "HOL-04", name: "Deepavali", date: "Nov 08, 2026", day: "Sunday", type: "Festival" },
  { id: "HOL-05", name: "Christmas", date: "Dec 25, 2026", day: "Friday", type: "Public" },
];

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<HolidayItem[]>(INITIAL_HOLIDAYS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", type: "Festival" as const });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;

    const newHol: HolidayItem = {
      id: `HOL-0${holidays.length + 1}`,
      name: formData.name,
      date: formData.date,
      day: "Upcoming",
      type: formData.type,
    };

    setHolidays([...holidays, newHol]);
    setIsModalOpen(false);
    setFormData({ name: "", date: "", type: "Festival" });
  };

  return (
    <ModulePage
      title="Holiday Calendar 2026"
      subtitle="View official production studio holidays and festival leave schedules"
      icon={<CalendarDays className="w-6 h-6 text-white" />}
      actionLabel="Add Holiday"
      onAction={() => setIsModalOpen(true)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Holidays 2026", value: holidays.length },
          { label: "Public Holidays", value: holidays.filter(h => h.type === "Public").length },
          { label: "Festival Breaks", value: holidays.filter(h => h.type === "Festival").length },
        ].map((s) => (
          <div key={s.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{s.label}</div>
            <div className="font-display text-3xl font-bold gradient-text mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {holidays.map((h) => (
          <div key={h.id} className="card-3d rounded-[22px] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-100 text-brand-700">
                {h.type}
              </span>
              <span className="text-xs text-slate-400 font-mono">{h.id}</span>
            </div>
            <h4 className="font-display font-bold text-lg text-slate-900">{h.name}</h4>
            <div className="text-sm text-slate-600 font-medium">
              📅 {h.date} • <span className="text-slate-400">{h.day}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900">Add New Studio Holiday</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Holiday Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="e.g. Pongal Celebration"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="Public">Public</option>
                    <option value="Festival">Festival</option>
                    <option value="Optional">Optional</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Save Holiday</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
