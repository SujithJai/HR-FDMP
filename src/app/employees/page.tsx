"use client";

import { Users, Mail, Phone, Building2, Calendar, MoreVertical, Search, Filter, Plus } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { getInitials, getAvatarColor, formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

const employees = [
  { id: "4DMP001", name: "Arjun Kapoor", email: "admin@fourdee.com", phone: "+91 98765 43210", department: "Production", designation: "Managing Director", salary: 150000, status: "active", joinDate: "Jan 15, 2022", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "4DMP002", name: "Priya Sharma", email: "hr@fourdee.com", phone: "+91 98765 43211", department: "Human Resources", designation: "HR Manager", salary: 95000, status: "active", joinDate: "Feb 20, 2022", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "4DMP003", name: "Rohan Mehta", email: "manager@fourdee.com", phone: "+91 98765 43212", department: "Production", designation: "Production Manager", salary: 110000, status: "active", joinDate: "Mar 10, 2022", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "4DMP004", name: "Rahul Verma", email: "rahul@fourdee.com", phone: "+91 98765 43213", department: "Cinematography", designation: "Cinematographer", salary: 85000, status: "active", joinDate: "Apr 5, 2022", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: "4DMP005", name: "Ananya Iyer", email: "ananya@fourdee.com", phone: "+91 98765 43214", department: "Editing", designation: "Film Editor", salary: 80000, status: "active", joinDate: "May 18, 2022", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "4DMP006", name: "Vikram Singh", email: "vikram@fourdee.com", phone: "+91 98765 43215", department: "VFX", designation: "VFX Artist", salary: 90000, status: "active", joinDate: "Jun 22, 2022", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: "4DMP007", name: "Meera Nair", email: "meera@fourdee.com", phone: "+91 98765 43216", department: "Sound Design", designation: "Sound Designer", salary: 75000, status: "active", joinDate: "Jul 12, 2022", avatar: "https://i.pravatar.cc/150?img=16" },
  { id: "4DMP008", name: "Aditya Rao", email: "aditya@fourdee.com", phone: "+91 98765 43217", department: "Marketing", designation: "Marketing Head", salary: 100000, status: "active", joinDate: "Aug 8, 2022", avatar: "https://i.pravatar.cc/150?img=33" },
];

export default function EmployeesPage() {
  return (
    <ModulePage
      title="Employee Management"
      subtitle="Manage your team and their information"
      icon={<Users className="w-6 h-6 text-white" />}
      actionLabel="Add Employee"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: 102, color: "from-brand-500 to-cyan-400" },
          { label: "Active", value: 95, color: "from-emerald-500 to-teal-500" },
          { label: "On Leave", value: 5, color: "from-purple-500 to-pink-500" },
          { label: "New Hires (MTD)", value: 3, color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-3xl font-bold gradient-text mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <div key={emp.id} className="card-3d rounded-[22px] p-5 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={emp.avatar} alt={emp.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-md" />
                <div>
                  <div className="font-display font-bold text-slate-900">{emp.name}</div>
                  <div className="text-xs text-slate-500">{emp.designation}</div>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{emp.department}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{emp.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Joined {emp.joinDate}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(emp.status)}`}>
                {formatStatus(emp.status)}
              </span>
              <span className="text-sm font-bold text-slate-900">{formatCurrency(emp.salary)}</span>
            </div>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
