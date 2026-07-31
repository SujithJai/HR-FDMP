"use client";

import { useState } from "react";
import { UserPlus, Plus, X, CheckCircle, Clock, ShieldCheck } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { getStatusColor, formatStatus } from "@/lib/utils";

interface VisitorItem {
  id: string;
  name: string;
  company: string;
  host: string;
  purpose: string;
  checkIn: string;
  checkOut: string;
  status: "checked_in" | "checked_out" | "expected";
}

const INITIAL_VISITORS: VisitorItem[] = [
  { id: "VIS-101", name: "Siddharth Malhotra", company: "Excel Entertainment", host: "Sujai (Director)", purpose: "Script Discussion", checkIn: "10:30 AM", checkOut: "Active", status: "checked_in" },
  { id: "VIS-102", name: "Kavita Reddy", company: "Red Chillies VFX", host: "Ananya Rao", purpose: "VFX Pipeline Review", checkIn: "11:15 AM", checkOut: "01:45 PM", status: "checked_out" },
  { id: "VIS-103", name: "Ramesh Kumar", company: "Sony Music India", host: "Meera Nair", purpose: "Audio Rights Meeting", checkIn: "Expected 03:00 PM", checkOut: "—", status: "expected" },
];

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<VisitorItem[]>(INITIAL_VISITORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", host: "Sujai (Director)", purpose: "Business Meeting" });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newVis: VisitorItem = {
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      company: formData.company || "Independent",
      host: formData.host,
      purpose: formData.purpose,
      checkIn: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      checkOut: "Active",
      status: "checked_in",
    };

    setVisitors([newVis, ...visitors]);
    setIsModalOpen(false);
    setFormData({ name: "", company: "", host: "Sujai (Director)", purpose: "Business Meeting" });
  };

  return (
    <ModulePage
      title="Visitor Management"
      subtitle="Track studio visitors, pre-register guests, and issue digital passes"
      icon={<UserPlus className="w-6 h-6 text-white" />}
      actionLabel="Register Visitor"
      onAction={() => setIsModalOpen(true)}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active In Studio", value: visitors.filter(v => v.status === "checked_in").length, color: "from-brand-500 to-cyan-400" },
          { label: "Expected Today", value: visitors.filter(v => v.status === "expected").length, color: "from-amber-500 to-orange-500" },
          { label: "Total Checked Out", value: visitors.filter(v => v.status === "checked_out").length, color: "from-emerald-500 to-teal-500" },
          { label: "Security Status", value: "Verified ✓", color: "from-purple-500 to-pink-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-display text-lg font-bold text-slate-900">Today's Visitor Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Visitor Name</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Company</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Host Employee</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Purpose</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Check In / Out</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visitors.map((v) => (
                <tr key={v.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm text-slate-900">{v.name}</div>
                    <div className="text-xs text-slate-400">{v.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{v.company}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{v.host}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{v.purpose}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{v.checkIn}</div>
                    <div className="text-xs text-slate-400">Out: {v.checkOut}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(v.status)}`}>
                      {formatStatus(v.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900">Register Studio Visitor</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Visitor Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Visitor Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Company"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Host Employee</label>
                  <input
                    type="text"
                    value={formData.host}
                    onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Meeting Purpose</label>
                <input
                  type="text"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Register & Issue Pass</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
