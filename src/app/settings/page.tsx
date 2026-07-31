"use client";

import { useState } from "react";
import { Settings, Shield, Bell, Database, CheckCircle, Lock } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [mfa, setMfa] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ModulePage
      title="System Settings"
      subtitle="Configure enterprise security policies, database connections, and notification preferences"
      icon={<Settings className="w-6 h-6 text-white" />}
    >
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card-3d rounded-[22px] p-6 space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 border-b pb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-500" /> Security & Access Controls
          </h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-semibold text-sm text-slate-900">Enforce Multi-Factor Authentication (MFA)</div>
              <div className="text-xs text-slate-500">Require 2FA verification for all HR Manager & Executive logins</div>
            </div>
            <input
              type="checkbox"
              checked={mfa}
              onChange={(e) => setMfa(e.target.checked)}
              className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <div>
              <div className="font-semibold text-sm text-slate-900">Automated Supabase Cloud Backups</div>
              <div className="text-xs text-slate-500">Perform daily database snapshots at 02:00 AM IST</div>
            </div>
            <input
              type="checkbox"
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e.target.checked)}
              className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="card-3d rounded-[22px] p-6 space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 border-b pb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-500" /> System Notifications
          </h3>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-semibold text-sm text-slate-900">Email Notifications for Leave Approvals</div>
              <div className="text-xs text-slate-500">Send automated email notifications when employees apply for leave</div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-premium px-6 py-2.5 text-sm font-semibold rounded-xl">
            Save System Configurations
          </button>
        </div>
      </form>
    </ModulePage>
  );
}
