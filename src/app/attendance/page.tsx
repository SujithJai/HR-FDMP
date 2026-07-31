"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle, Home, Coffee, Check } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { getStatusColor, formatStatus } from "@/lib/utils";

const INITIAL_ATTENDANCE = [
  { id: 1, name: "Sujai Director", avatar: "https://i.pravatar.cc/150?img=12", checkIn: "09:15 AM", checkOut: "06:30 PM", total: "9h 15m", status: "present", method: "Web GPS" },
  { id: 2, name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=5", checkIn: "09:45 AM", checkOut: "07:00 PM", total: "9h 15m", status: "late", method: "QR Code" },
  { id: 3, name: "Rohan Mehta", avatar: "https://i.pravatar.cc/150?img=13", checkIn: "09:00 AM", checkOut: "06:15 PM", total: "9h 15m", status: "present", method: "Web" },
  { id: 4, name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=8", checkIn: "—", checkOut: "—", total: "0h", status: "absent", method: "—" },
  { id: 5, name: "Ananya Iyer", avatar: "https://i.pravatar.cc/150?img=9", checkIn: "09:30 AM", checkOut: "01:30 PM", total: "4h", status: "half_day", method: "Web" },
  { id: 6, name: "Vikram Singh", avatar: "https://i.pravatar.cc/150?img=14", checkIn: "10:00 AM", checkOut: "—", total: "—", status: "late", method: "Biometric" },
];

export default function AttendancePage() {
  const [records, setRecords] = useState(INITIAL_ATTENDANCE);
  const [clockedIn, setClockedIn] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleMarkAttendance = async () => {
    try {
      const action = clockedIn ? "clockOut" : "clockIn";
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, location: "Web Dashboard (GPS)" }),
      });
      const data = await res.json();

      const timeNow = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

      if (action === "clockIn") {
        setClockedIn(true);
        setStatusMsg(`Successfully Clocked In at ${timeNow}`);
        setRecords([
          {
            id: Date.now(),
            name: "You (Active Session)",
            avatar: "https://i.pravatar.cc/150?img=60",
            checkIn: timeNow,
            checkOut: "Active",
            total: "In Progress",
            status: "present",
            method: "Web Portal",
          },
          ...records,
        ]);
      } else {
        setClockedIn(false);
        setStatusMsg(`Successfully Clocked Out at ${timeNow}`);
        setRecords(
          records.map((r) =>
            r.name.includes("You") ? { ...r, checkOut: timeNow, total: "8h 30m" } : r
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModulePage
      title="Attendance Tracking"
      subtitle="Monitor employee attendance in real-time"
      icon={<Clock className="w-6 h-6 text-white" />}
      actionLabel={clockedIn ? "Clock Out Now" : "Clock In Now"}
      onAction={handleMarkAttendance}
    >
      {statusMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 mb-4">
          <Check className="w-5 h-5" /> {statusMsg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Present", value: records.filter((r) => r.status === "present").length + 60, icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
          { label: "Absent", value: 4, icon: XCircle, color: "from-red-500 to-pink-500" },
          { label: "Late", value: 2, icon: AlertCircle, color: "from-amber-500 to-orange-500" },
          { label: "WFH", value: 8, icon: Home, color: "from-brand-500 to-cyan-400" },
          { label: "On Leave", value: 1, icon: Coffee, color: "from-purple-500 to-pink-500" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-3d rounded-[22px] p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-display text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Attendance Table */}
      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Today's Attendance Log</h3>
            <p className="text-sm text-slate-500 mt-1">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Employee</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Check In</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Check Out</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Total Hours</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Method</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={record.avatar} alt={record.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="font-semibold text-sm text-slate-900">{record.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.checkOut}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{record.total}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{record.method}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(record.status)}`}>
                      {formatStatus(record.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModulePage>
  );
}

