"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, Clock, XCircle, Plus, X, Coffee, AlertCircle } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { getStatusColor, formatStatus } from "@/lib/utils";

interface LeaveRequest {
  id: string;
  employeeName: string;
  avatar: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "approved" | "pending" | "rejected";
}

const INITIAL_LEAVES: LeaveRequest[] = [
  { id: "LV-101", employeeName: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=5", type: "Casual Leave", startDate: "2026-08-05", endDate: "2026-08-07", days: 3, reason: "Family Event", status: "pending" },
  { id: "LV-102", employeeName: "Rohan Mehta", avatar: "https://i.pravatar.cc/150?img=13", type: "Sick Leave", startDate: "2026-08-01", endDate: "2026-08-02", days: 2, reason: "Viral Fever", status: "approved" },
  { id: "LV-103", employeeName: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=8", type: "Earned Leave", startDate: "2026-08-10", endDate: "2026-08-15", days: 6, reason: "Annual Vacation", status: "approved" },
  { id: "LV-104", employeeName: "Ananya Rao", avatar: "https://i.pravatar.cc/150?img=9", type: "Casual Leave", startDate: "2026-07-25", endDate: "2026-07-25", days: 1, reason: "Personal Work", status: "rejected" },
];

export default function LeavePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "Casual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;

    const newLeave: LeaveRequest = {
      id: `LV-${Math.floor(100 + Math.random() * 900)}`,
      employeeName: "You (Sujai Director)",
      avatar: "https://i.pravatar.cc/150?img=12",
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: 2,
      reason: formData.reason || "Personal Leave",
      status: "pending",
    };

    setLeaves([newLeave, ...leaves]);
    setIsModalOpen(false);
    setFormData({ type: "Casual Leave", startDate: "", endDate: "", reason: "" });
  };

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

  return (
    <ModulePage
      title="Leave Management"
      subtitle="Track leave balances, apply for leaves, and manage approvals"
      icon={<Calendar className="w-6 h-6 text-white" />}
      actionLabel="Apply for Leave"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Leave Balances */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Casual Leave", balance: "8 / 12 Days", color: "from-brand-500 to-cyan-400" },
          { label: "Sick Leave", balance: "5 / 7 Days", color: "from-purple-500 to-pink-500" },
          { label: "Earned Leave", balance: "14 / 18 Days", color: "from-emerald-500 to-teal-500" },
          { label: "Pending Approvals", balance: `${leaves.filter(l => l.status === "pending").length} Requests`, color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-2xl font-bold text-slate-900 mt-1">{stat.balance}</div>
          </div>
        ))}
      </div>

      {/* Leave Applications Table */}
      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Leave Applications</h3>
            <p className="text-sm text-slate-500 mt-1">Manage employee leave requests and approvals</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Leave Type</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Duration</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Reason</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map((req) => (
                <tr key={req.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={req.avatar} alt={req.employeeName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{req.employeeName}</div>
                        <div className="text-xs text-slate-400">{req.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{req.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{req.startDate} to {req.endDate}</div>
                    <div className="text-xs text-slate-400">{req.days} Day(s)</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{req.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(req.status)}`}>
                      {formatStatus(req.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {req.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(req.id, "approved")}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(req.id, "rejected")}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg shadow-sm"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Apply for Leave
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Leave Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="Casual Leave">Casual Leave (CL)</option>
                  <option value="Sick Leave">Sick Leave (SL)</option>
                  <option value="Earned Leave">Earned Leave (EL)</option>
                  <option value="Loss of Pay">Loss of Pay (LOP)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Reason</label>
                <textarea
                  rows={3}
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Provide reason for leave..."
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
                  Submit Leave Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
