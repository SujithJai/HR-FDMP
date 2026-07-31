"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, Building2, Calendar, MoreVertical, Plus, X } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatCurrency, getStatusColor, formatStatus } from "@/lib/utils";

interface EmployeeItem {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  salary?: number;
  status: string;
  joinDate?: string;
  joiningDate?: string;
  avatar?: string;
}

const INITIAL_EMPLOYEES: EmployeeItem[] = [
  { id: "4DMP001", firstName: "Arjun", lastName: "Kapoor", email: "admin@fourdee.com", phone: "+91 98765 43210", department: "Production", designation: "Managing Director", salary: 150000, status: "active", joinDate: "Jan 15, 2022", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "4DMP002", firstName: "Priya", lastName: "Sharma", email: "hr@fourdee.com", phone: "+91 98765 43211", department: "Human Resources", designation: "HR Manager", salary: 95000, status: "active", joinDate: "Feb 20, 2022", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "4DMP003", firstName: "Rohan", lastName: "Mehta", email: "manager@fourdee.com", phone: "+91 98765 43212", department: "Production", designation: "Production Manager", salary: 110000, status: "active", joinDate: "Mar 10, 2022", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "4DMP004", firstName: "Rahul", lastName: "Verma", email: "rahul@fourdee.com", phone: "+91 98765 43213", department: "Cinematography", designation: "Cinematographer", salary: 85000, status: "active", joinDate: "Apr 5, 2022", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: "4DMP005", firstName: "Ananya", lastName: "Iyer", email: "ananya@fourdee.com", phone: "+91 98765 43214", department: "Editing", designation: "Film Editor", salary: 80000, status: "active", joinDate: "May 18, 2022", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "4DMP006", firstName: "Vikram", lastName: "Singh", email: "vikram@fourdee.com", phone: "+91 98765 43215", department: "VFX", designation: "VFX Artist", salary: 90000, status: "active", joinDate: "Jun 22, 2022", avatar: "https://i.pravatar.cc/150?img=14" },
];

export default function EmployeesPage() {
  const [employeeList, setEmployeeList] = useState<EmployeeItem[]>(INITIAL_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "Production",
    designation: "",
    salary: "85000",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const apiList = data.data.map((emp: any, idx: number) => ({
            id: emp.id || `emp-${idx}`,
            firstName: emp.firstName || emp.first_name || "Member",
            lastName: emp.lastName || emp.last_name || "",
            email: emp.email || "user@fourdee.com",
            phone: emp.phone || "+91 98765 00000",
            department: emp.department || "Production",
            designation: emp.designation || "Executive",
            salary: emp.salary || 85000,
            status: emp.status || "active",
            joinDate: emp.joiningDate || emp.joinDate || "2024-01-01",
            avatar: `https://i.pravatar.cc/150?img=${(idx % 20) + 1}`,
          }));
          setEmployeeList(apiList);
        }
      })
      .catch((err) => console.log("Employees API notice:", err));
  }, []);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      const createdEmp: EmployeeItem = {
        id: result.data?.id || `emp-${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: formData.department,
        designation: formData.designation || "Team Member",
        salary: Number(formData.salary) || 85000,
        status: "active",
        joinDate: "Today",
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 30) + 1}`,
      };

      setEmployeeList([createdEmp, ...employeeList]);
      setIsModalOpen(false);
      setFormData({ firstName: "", lastName: "", email: "", department: "Production", designation: "", salary: "85000" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModulePage
      title="Employee Management"
      subtitle="Manage your team and their information"
      icon={<Users className="w-6 h-6 text-white" />}
      actionLabel="Add Employee"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: employeeList.length, color: "from-brand-500 to-cyan-400" },
          { label: "Active", value: employeeList.filter(e => e.status === "active").length, color: "from-emerald-500 to-teal-500" },
          { label: "On Leave", value: 2, color: "from-purple-500 to-pink-500" },
          { label: "New Hires (MTD)", value: 4, color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-3xl font-bold gradient-text mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employeeList.map((emp) => {
          const fullName = `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || emp.name || "Employee";
          return (
            <div key={emp.id} className="card-3d rounded-[22px] p-5 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} alt={fullName} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white shadow-md" />
                  <div>
                    <div className="font-display font-bold text-slate-900">{fullName}</div>
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
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Joined {emp.joinDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(emp.status)}`}>
                  {formatStatus(emp.status)}
                </span>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(emp.salary || 85000)}</span>
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
                <Plus className="w-5 h-5 text-brand-500" /> Add New Employee
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
                    placeholder="Sujai"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Director"
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
                  placeholder="sujai@fourdee.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="Production">Production</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="VFX & Animation">VFX & Animation</option>
                    <option value="Editing & Sound">Editing & Sound</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Lead Director"
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
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl"
                >
                  {loading ? "Saving..." : "Save Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}

