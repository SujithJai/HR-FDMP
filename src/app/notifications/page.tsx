"use client";

import { useState } from "react";
import { Bell, Check, Trash2, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "alert" | "info" | "success";
  read: boolean;
}

const INITIAL_NOTIFS: NotificationItem[] = [
  { id: "1", title: "New Leave Application", message: "Priya Sharma applied for 3 days Casual Leave.", time: "10 mins ago", type: "info", read: false },
  { id: "2", title: "Budget Threshold Warning", message: "Project Kaal VFX department reached 90% allocated budget.", time: "1 hour ago", type: "alert", read: false },
  { id: "3", title: "Monthly Payroll Processed", message: "July 2026 Salary disbursement completed for 5 employees.", time: "2 hours ago", type: "success", read: true },
  { id: "4", title: "Security Login Alert", message: "New login session initiated from Chrome on Windows OS.", time: "Yesterday", type: "info", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <ModulePage
      title="Notification Center"
      subtitle="System alerts, workflow approval requests, and audit logs"
      icon={<Bell className="w-6 h-6 text-white" />}
      actionLabel="Mark All as Read"
      onAction={markAllRead}
    >
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`card-3d rounded-[22px] p-5 flex items-center justify-between transition-all ${
              !n.read ? "border-l-4 border-l-brand-500 bg-brand-50/20" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                n.type === "alert" ? "bg-red-100 text-red-600" : n.type === "success" ? "bg-emerald-100 text-emerald-600" : "bg-brand-100 text-brand-600"
              }`}>
                {n.type === "alert" ? <AlertTriangle className="w-5 h-5" /> : n.type === "success" ? <ShieldCheck className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  {n.title}
                  {!n.read && <span className="w-2 h-2 rounded-full bg-brand-500" />}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.time}</span>
              </div>
            </div>
            <button
              onClick={() => deleteNotif(n.id)}
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
