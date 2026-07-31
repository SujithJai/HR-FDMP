"use client";

import { useState } from "react";
import { DollarSign, Download, Plus, X, FileText, CheckCircle } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

interface PayslipItem {
  id: string;
  employeeName: string;
  avatar: string;
  designation: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: "paid" | "pending" | "processing";
  month: string;
}

const INITIAL_PAYSLIPS: PayslipItem[] = [
  { id: "PAY-2026-07-01", employeeName: "Arjun Kapoor", avatar: "https://i.pravatar.cc/150?img=12", designation: "Managing Director", department: "Executive", basicSalary: 120000, allowances: 40000, deductions: 10000, netPay: 150000, status: "paid", month: "July 2026" },
  { id: "PAY-2026-07-02", employeeName: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=5", designation: "HR Manager", department: "Human Resources", basicSalary: 75000, allowances: 25000, deductions: 5000, netPay: 95000, status: "paid", month: "July 2026" },
  { id: "PAY-2026-07-03", employeeName: "Rohan Mehta", avatar: "https://i.pravatar.cc/150?img=13", designation: "Production Manager", department: "Production", basicSalary: 90000, allowances: 28000, deductions: 8000, netPay: 110000, status: "paid", month: "July 2026" },
  { id: "PAY-2026-07-04", employeeName: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=8", designation: "Cinematographer", department: "Cinematography", basicSalary: 68000, allowances: 22000, deductions: 5000, netPay: 85000, status: "processing", month: "July 2026" },
  { id: "PAY-2026-07-05", employeeName: "Ananya Iyer", avatar: "https://i.pravatar.cc/150?img=9", designation: "Film Editor", department: "Editing", basicSalary: 65000, allowances: 20000, deductions: 5000, netPay: 80000, status: "processing", month: "July 2026" },
];

export default function PayrollPage() {
  const [payslips, setPayslips] = useState<PayslipItem[]>(INITIAL_PAYSLIPS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const totalPayroll = payslips.reduce((acc, p) => acc + p.netPay, 0);

  const handleRunPayroll = () => {
    setNotification("Monthly Payroll Run successfully processed for July 2026!");
    setPayslips(payslips.map(p => ({ ...p, status: "paid" })));
    setIsModalOpen(false);
  };

  return (
    <ModulePage
      title="Payroll & Payslips"
      subtitle="Manage employee salaries, tax deductions, and monthly payslips"
      icon={<DollarSign className="w-6 h-6 text-white" />}
      actionLabel="Run Monthly Payroll"
      onAction={() => setIsModalOpen(true)}
    >
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5" /> {notification}
        </div>
      )}

      {/* Payroll Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Payroll (Net)", value: formatCurrency(totalPayroll), color: "from-brand-500 to-cyan-400" },
          { label: "Total Employees Paid", value: `${payslips.filter(p => p.status === "paid").length} / ${payslips.length}`, color: "from-emerald-500 to-teal-500" },
          { label: "Total Deductions & Tax", value: formatCurrency(33000), color: "from-purple-500 to-pink-500" },
          { label: "Next Pay Date", value: "Aug 31, 2026", color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Payslips Table */}
      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">July 2026 Payroll Summary</h3>
            <p className="text-sm text-slate-500 mt-1">Detailed breakdown of employee payouts and deductions</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Basic Salary</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Allowances</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Deductions</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Net Pay</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payslips.map((pay) => (
                <tr key={pay.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pay.avatar} alt={pay.employeeName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{pay.employeeName}</div>
                        <div className="text-xs text-slate-400">{pay.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">{formatCurrency(pay.basicSalary)}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">{formatCurrency(pay.allowances)}</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">-{formatCurrency(pay.deductions)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatCurrency(pay.netPay)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(pay.status)}`}>
                      {formatStatus(pay.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
                      <Download className="w-3.5 h-3.5 text-slate-500" /> Payslip PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Run Payroll Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-500" /> Confirm Monthly Payroll Run
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                You are about to process and execute salary disbankment for <strong>July 2026</strong> across <strong>{payslips.length} active employees</strong>.
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gross Disbursement:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(totalPayroll + 33000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TDS & Statutory Deductions:</span>
                  <span className="font-bold text-red-600">-{formatCurrency(33000)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-base text-slate-900">
                  <span>Net Payout Amount:</span>
                  <span className="text-brand-600">{formatCurrency(totalPayroll)}</span>
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
                <button onClick={handleRunPayroll} className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">
                  Confirm & Process Payroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
