"use client";

import { useState } from "react";
import { DollarSign, Download, Plus, X, FileText, CheckCircle, Mail, Send, FileSpreadsheet } from "lucide-react";
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
  emailSent: boolean;
  creditDate: string;
}

const INITIAL_PAYSLIPS: PayslipItem[] = [
  {
    id: "PAY-2026-08-04",
    employeeName: "Surjith Thangavel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    designation: "Media Manager ( Digital Marketing & Branding )",
    department: "Digital Marketing & Branding",
    basicSalary: 38000,
    allowances: 7000,
    deductions: 0,
    netPay: 45000,
    status: "paid",
    month: "August 2026",
    emailSent: true,
    creditDate: "4th August 2026",
  },
  {
    id: "PAY-2026-07-04",
    employeeName: "Surjith Thangavel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    designation: "Media Manager ( Digital Marketing & Branding )",
    department: "Digital Marketing & Branding",
    basicSalary: 38000,
    allowances: 7000,
    deductions: 0,
    netPay: 45000,
    status: "paid",
    month: "July 2026",
    emailSent: true,
    creditDate: "4th July 2026",
  },
];

export default function PayrollPage() {
  const [payslips, setPayslips] = useState<PayslipItem[]>(INITIAL_PAYSLIPS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  const totalPayroll = payslips.reduce((acc, p) => acc + p.netPay, 0);

  const handleExportCSV = () => {
    const headers = ["ID,Employee,Designation,Department,Basic,Allowances,Deductions,Net Pay,Status,Credit Date,Email Sent"];
    const rows = payslips.map(p => `${p.id},"${p.employeeName}","${p.designation}",${p.department},${p.basicSalary},${p.allowances},${p.deductions},${p.netPay},${p.status},${p.creditDate},${p.emailSent}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Surjith_Thangavel_Payroll_Report_GoogleSheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRunPayroll = () => {
    setNotification("Monthly Payroll Credit executed for 4th of the Month! ₹45,000 credited & Automated Email Payslip sent to surjith@fourdee.com.");
    setPayslips(payslips.map(p => ({ ...p, status: "paid", emailSent: true })));
    setIsModalOpen(false);
    setTimeout(() => setNotification(""), 6000);
  };

  const handleResendEmail = (id: string) => {
    setSendingEmailId(id);
    setTimeout(() => {
      setSendingEmailId(null);
      setNotification(`Official Payslip PDF successfully emailed to surjith@fourdee.com!`);
      setTimeout(() => setNotification(""), 4000);
    }, 1200);
  };

  return (
    <ModulePage
      title="Payroll & Salary Payout"
      subtitle="Automated monthly salary credit (4th of Every Month) & email payslip dispatcher"
      icon={<DollarSign className="w-6 h-6 text-white" />}
      actionLabel="Process Monthly Payout (4th)"
      onAction={() => setIsModalOpen(true)}
    >
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-emerald-600" /> {notification}
        </div>
      )}

      {/* Header bar */}
      <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
        <div>
          <h4 className="font-display font-bold text-slate-900">Salary Schedule: 4th of Every Month</h4>
          <p className="text-xs text-slate-500">Automated Direct Bank Credit & PDF Email Payslips to surjith@fourdee.com</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-premium px-4 py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" /> Download Google Sheet / CSV
        </button>
      </div>

      {/* Payroll Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Surjith Thangavel Salary", value: formatCurrency(45000), color: "from-brand-500 to-cyan-400" },
          { label: "Salary Credit Date", value: "4th of Every Month", color: "from-emerald-500 to-teal-500" },
          { label: "Next Credit Date", value: "4th Sept 2026", color: "from-purple-500 to-pink-500" },
          { label: "Automated Email Payslip", value: "Active (surjith@fourdee.com)", color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Payslips Table */}
      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Monthly Payout History</h3>
            <p className="text-sm text-slate-500 mt-1">Verified salary credit records and dispatched email payslips</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Designation</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Credit Date</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Net Payout</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Email Notification</th>
                <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payslips.map((pay) => (
                <tr key={pay.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={pay.avatar} alt={pay.employeeName} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-100" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{pay.employeeName}</div>
                        <div className="text-xs text-slate-400">{pay.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{pay.designation}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{pay.creditDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">{formatCurrency(pay.netPay)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(pay.status)}`}>
                      {formatStatus(pay.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      <Mail className="w-3.5 h-3.5" /> Sent to surjith@fourdee.com
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleResendEmail(pay.id)}
                      disabled={sendingEmailId === pay.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl border border-brand-200"
                    >
                      <Send className="w-3 h-3" /> {sendingEmailId === pay.id ? "Sending Email..." : "Resend Email"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Payout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-brand-500" /> Execute Monthly Payout (4th)
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                You are about to execute the <strong>4th of the Month Salary Credit</strong> for:
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-sm border">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Employee:</span>
                  <span>Surjith Thangavel</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Designation:</span>
                  <span>Media Manager ( Digital Marketing & Branding )</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-base text-emerald-600">
                  <span>Net Payout Amount:</span>
                  <span>₹45,000</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-1">
                  <span>Email Recipient:</span>
                  <span>surjith@fourdee.com</span>
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
                  Confirm Credit & Send Email Payslip
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
