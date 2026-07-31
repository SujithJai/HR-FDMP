"use client";

import { useState } from "react";
import { Users, Mail, Phone, Building2, Calendar, MoreVertical, Plus, X, Download, FileSpreadsheet, Trash2 } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

interface EmployeeItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  status: string;
  joinDate: string;
  avatar: string;
}

const INITIAL_EMPLOYEES: EmployeeItem[] = [
  {
    id: "FD-101",
    firstName: "Surjith",
    lastName: "Thangavel",
    email: "surjith@fourdee.com",
    phone: "+91 98765 43210",
    department: "Digital Marketing & Branding",
    designation: "Media Manager ( Digital Marketing & Branding )",
    salary: 45000,
    status: "active",
    joinDate: "Aug 01, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  },
];

export default function EmployeesPage() {
  const [employeeList, setEmployeeList] = useState<EmployeeItem[]>(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "Digital Marketing & Branding",
    designation: "Media Manager",
    salary: "45000",
  });

  const handleExportGoogleSheet = () => {
    const headers = ["Employee ID,First Name,Last Name,Email,Department,Designation,Salary,Status,Join Date"];
    const rows = employeeList.map(e => `${e.id},${e.firstName},${e.lastName},${e.email},${e.department},"${e.designation}",${e.salary},${e.status},${e.joinDate}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Four_Dee_Employee_List_GoogleSheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    const createdEmp: EmployeeItem = {
      id: `FD-${Math.floor(100 + Math.random() * 900)}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: "+91 98765 00000",
      department: formData.department,
      designation: formData.designation || "Media Manager",
      salary: Number(formData.salary) || 45000,
      status: "active",
      joinDate: "Today",
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 30) + 1}`,
    };

    setEmployeeList([createdEmp, ...employeeList]);
    setIsModalOpen(false);
    setFormData({ firstName: "", lastName: "", email: "", department: "Digital Marketing & Branding", designation: "Media Manager", salary: "45000" });
  };

  const handleDelete = (id: string) => {
    setEmployeeList(employeeList.filter(e => e.id !== id));
  };

  return (
    <ModulePage
      title="Employee Directory"
      subtitle="Manage studio crew members, designations, and salary structures"
      icon={<Users className="w-6 h-6 text-white" />}
      actionLabel="Add Employee"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Action Header & Export */}
      <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
        <div>
          <h4 className="font-display font-bold text-slate-900">Active Employee Roster</h4>
          <p className="text-xs text-slate-500">Official HR records for Four Dee Motion Pictures</p>
        </div>
        <button
          onClick={handleExportGoogleSheet}
          className="btn-premium px-4 py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export Google Sheet / CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Active Crew", value: employeeList.length, color: "from-brand-500 to-cyan-400" },
          { label: "Department", value: "Media & Branding", color: "from-purple-500 to-pink-500" },
          { label: "Monthly Compensation", value: formatCurrency(employeeList.reduce((sum, e) => sum + e.salary, 0)), color: "from-emerald-500 to-teal-500" },
          { label: "Payroll Status", value: "Verified ✓", color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employeeList.map((emp) => {
          const fullName = `${emp.firstName} ${emp.lastName}`.trim();
          return (
            <div key={emp.id} className="card-3d rounded-[24px] p-6 space-y-4 relative group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} alt={fullName} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-100 shadow-md" />
                  <div>
                    <div className="font-display font-bold text-lg text-slate-900">{fullName}</div>
                    <div className="text-xs text-brand-600 font-semibold">{emp.designation}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{emp.id}</div>
                  </div>
                </div>
                {employeeList.length > 1 && (
                  <button onClick={() => handleDelete(emp.id)} className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-2 text-xs bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{emp.department}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{emp.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(emp.status)}`}>
                  {formatStatus(emp.status)}
                </span>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Monthly Salary</div>
                  <div className="font-display font-bold text-base text-slate-900">{formatCurrency(emp.salary)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Add Studio Employee
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Surjith"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Thangavel"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="surjith@fourdee.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Media Manager ( Digital Marketing & Branding )"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Monthly Salary (INR)</label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="45000"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
