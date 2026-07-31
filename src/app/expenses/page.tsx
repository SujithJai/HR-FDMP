"use client";

import { useState } from "react";
import { DollarSign, Plus, X, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

interface ExpenseItem {
  id: string;
  claimedBy: string;
  category: string;
  projectName: string;
  amount: number;
  date: string;
  description: string;
  status: "approved" | "pending" | "rejected";
}

const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: "EXP-801", claimedBy: "Rahul Verma", category: "Equipment Rental", projectName: "Project Kaal", amount: 145000, date: "2026-07-28", description: "ARRI Alexa Mini LF Lens Package 3-Day Rental", status: "approved" },
  { id: "EXP-802", claimedBy: "Rohan Mehta", category: "Catering & Craft", projectName: "Cyber City", amount: 48000, date: "2026-07-30", description: "Unit Catering for 60 Crew Members (Shoot Day 12)", status: "approved" },
  { id: "EXP-803", claimedBy: "Ananya Rao", category: "Software License", projectName: "Project Kaal", amount: 25000, date: "2026-07-31", description: "Nuke Studio VFX Annual Node-Locked License", status: "pending" },
  { id: "EXP-804", claimedBy: "Priya Sharma", category: "Travel & Stay", projectName: "Executive", amount: 32000, date: "2026-07-26", description: "Mumbai Casting Call Flight Tickets & Hotel", status: "approved" },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "Equipment Rental",
    projectName: "Project Kaal",
    amount: "15000",
    description: "",
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const newExp: ExpenseItem = {
      id: `EXP-${Math.floor(800 + Math.random() * 200)}`,
      claimedBy: "You (Sujai Director)",
      category: formData.category,
      projectName: formData.projectName,
      amount: Number(formData.amount) || 15000,
      date: new Date().toISOString().split("T")[0],
      description: formData.description,
      status: "pending",
    };

    setExpenses([newExp, ...expenses]);
    setIsModalOpen(false);
    setFormData({ category: "Equipment Rental", projectName: "Project Kaal", amount: "15000", description: "" });
  };

  const handleApprove = (id: string) => {
    setExpenses(expenses.map(e => (e.id === id ? { ...e, status: "approved" } : e)));
  };

  const totalSpent = expenses.filter(e => e.status === "approved").reduce((sum, e) => sum + e.amount, 0);

  return (
    <ModulePage
      title="Expense Claims"
      subtitle="Track production budgets, equipment rentals, and travel claims"
      icon={<DollarSign className="w-6 h-6 text-white" />}
      actionLabel="Submit Claim"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Expense Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Approved Expenses", value: formatCurrency(totalSpent), color: "from-brand-500 to-cyan-400" },
          { label: "Pending Claims", value: formatCurrency(expenses.filter(e => e.status === "pending").reduce((sum, e) => sum + e.amount, 0)), color: "from-amber-500 to-orange-500" },
          { label: "Equipment & Logistics", value: formatCurrency(145000), color: "from-purple-500 to-pink-500" },
          { label: "Catering & Unit Stay", value: formatCurrency(48000), color: "from-emerald-500 to-teal-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Claims Table */}
      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Production Expense Claims</h3>
            <p className="text-sm text-slate-500 mt-1">Review and approve unit expense reimbursement claims</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Claim ID</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Claimant</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Category & Project</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Description</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">{exp.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{exp.claimedBy}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="font-medium text-slate-900">{exp.category}</div>
                    <div className="text-xs text-slate-400">{exp.projectName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{exp.description}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatCurrency(exp.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(exp.status)}`}>
                      {formatStatus(exp.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {exp.status === "pending" ? (
                      <button
                        onClick={() => handleApprove(exp.id)}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow-sm"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Approved ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Claim Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Submit Expense Claim
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="Equipment Rental">Equipment Rental</option>
                    <option value="Catering & Unit">Catering & Unit</option>
                    <option value="Travel & Stay">Travel & Stay</option>
                    <option value="Software License">Software License</option>
                    <option value="Location Permits">Location Permits</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Project Name</label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Project Kaal"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Claim Amount (INR)</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="15000"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Description / Items Purchased</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Provide bill details and description..."
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
                  Submit Reimbursement Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
