"use client";

import { useState } from "react";
import { User, Mail, Shield, Key, Building, CheckCircle } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { employee, user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(employee ? `${employee.first_name} ${employee.last_name}` : "Sujai Director");
  const [email] = useState(user?.email || "admin@fourdee.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ModulePage
      title="User Profile"
      subtitle="Manage account information, security preferences, and enterprise credentials"
      icon={<User className="w-6 h-6 text-white" />}
    >
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Profile settings successfully updated!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-3d rounded-[22px] p-6 text-center space-y-4">
          <div className="relative inline-block">
            <img
              src="/logo.png"
              alt="Avatar"
              className="w-28 h-28 rounded-full object-contain mx-auto border-4 border-white shadow-xl bg-slate-900/5 p-2"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900">{name}</h3>
            <p className="text-sm text-brand-600 font-semibold mt-0.5">Four Dee Motion Pictures</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Super Admin</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Verified</span>
          </div>
        </div>

        <div className="lg:col-span-2 card-3d rounded-[22px] p-6 space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-900 border-b pb-3">Personal & Security Details</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm bg-slate-100 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Department</label>
                <input
                  type="text"
                  disabled
                  value="Executive & Direction"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm bg-slate-100 text-slate-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Employee ID</label>
                <input
                  type="text"
                  disabled
                  value="FD-101"
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl text-sm bg-slate-100 text-slate-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <button type="submit" className="btn-premium px-6 py-2.5 text-sm font-semibold rounded-xl">
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModulePage>
  );
}
