"use client";

import { useState } from "react";
import { Clock, CheckCircle2, XCircle, AlertCircle, Fingerprint, Plus, X, FileSpreadsheet, Edit3, UserCheck } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { getStatusColor, formatStatus } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  employeeName: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  method: "Biometric Scanner" | "Manual Admin Log" | "Web Portal";
  status: "Present" | "Late" | "Absent" | "Half Day" | "WFH";
}

const INITIAL_LOGS: AttendanceRecord[] = [
  { id: "ATT-101", employeeName: "Surjith Thangavel (Media Manager)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", checkIn: "09:15 AM", checkOut: "06:30 PM", totalHours: "9h 15m", method: "Biometric Scanner", status: "Present" },
  { id: "ATT-102", employeeName: "Surjith Thangavel (Media Manager)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", checkIn: "09:45 AM", checkOut: "07:00 PM", totalHours: "9h 15m", method: "Biometric Scanner", status: "Late" },
  { id: "ATT-103", employeeName: "Surjith Thangavel (Media Manager)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", checkIn: "09:00 AM", checkOut: "06:15 PM", totalHours: "9h 15m", method: "Manual Admin Log", status: "Present" },
];

export default function AttendancePage() {
  const [logs, setLogs] = useState<AttendanceRecord[]>(INITIAL_LOGS);
  const [isClockedIn, setIsClockedIn] = useState(true);
  const [clockInTime, setClockInTime] = useState("09:15 AM");
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isBiometricSyncing, setIsBiometricSyncing] = useState(false);
  const [notification, setNotification] = useState("");

  const [manualForm, setManualForm] = useState({
    employeeName: "Surjith Thangavel (Media Manager)",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "Present" as const,
  });

  const handleExportCSV = () => {
    const headers = ["ID,Employee,Check In,Check Out,Total Hours,Method,Status"];
    const rows = logs.map(l => `${l.id},"${l.employeeName}",${l.checkIn},${l.checkOut},${l.totalHours},${l.method},${l.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Surjith_Thangavel_Attendance_Log_GoogleSheet_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBiometricSync = () => {
    setIsBiometricSyncing(true);
    setTimeout(() => {
      setIsBiometricSyncing(false);
      setNotification("Biometric Hardware Device Synced! 1 New Check-In record auto-captured for Surjith Thangavel.");
      const autoRecord: AttendanceRecord = {
        id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
        employeeName: "Surjith Thangavel (Media Manager)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        checkIn: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        checkOut: "In Progress",
        totalHours: "Active",
        method: "Biometric Scanner",
        status: "Present",
      };
      setLogs([autoRecord, ...logs]);
      setTimeout(() => setNotification(""), 4000);
    }, 1500);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: AttendanceRecord = {
      id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
      employeeName: manualForm.employeeName,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      checkIn: manualForm.checkIn,
      checkOut: manualForm.checkOut,
      totalHours: "9h 00m",
      method: "Manual Admin Log",
      status: manualForm.status,
    };

    setLogs([newRecord, ...logs]);
    setIsManualModalOpen(false);
    setNotification("Manual Attendance entry successfully recorded by Admin!");
    setTimeout(() => setNotification(""), 4000);
  };

  return (
    <ModulePage
      title="Attendance & Biometric Logs"
      subtitle="Automatic Biometric scanner integration & Admin manual attendance override"
      icon={<Clock className="w-6 h-6 text-white" />}
      actionLabel={isClockedIn ? "Clock Out (Active Session)" : "Clock In Now"}
      onAction={() => setIsClockedIn(!isClockedIn)}
    >
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {notification}
        </div>
      )}

      {/* Control Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBiometricSync}
            disabled={isBiometricSyncing}
            className="btn-premium px-4 py-2 text-xs font-semibold rounded-xl inline-flex items-center gap-2"
          >
            <Fingerprint className="w-4 h-4 text-cyan-300" />
            {isBiometricSyncing ? "Syncing Biometric Device..." : "Sync Biometric Device"}
          </button>
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-100 font-semibold text-xs text-slate-700 rounded-xl inline-flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-brand-500" /> Admin Manual Update
          </button>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl inline-flex items-center gap-2 shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4" /> Download Google Sheet / CSV
        </button>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Surjith Thangavel Status", value: isClockedIn ? "Present (Active)" : "Clocked Out", color: "from-brand-500 to-cyan-400" },
          { label: "Biometric Device", value: "Online (Gate 1)", color: "from-emerald-500 to-teal-500" },
          { label: "Check In Time", value: clockInTime, color: "from-purple-500 to-pink-500" },
          { label: "Monthly Attendance Rate", value: "98.5%", color: "from-amber-500 to-orange-500" },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-xl font-bold text-slate-900 mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="card-3d rounded-[22px] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Attendance Register</h3>
            <p className="text-sm text-slate-500 mt-1">Automatic Biometric & Admin verified attendance records</p>
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
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Capture Method</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={log.avatar} alt={log.employeeName} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-100" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{log.employeeName}</div>
                        <div className="text-xs text-slate-400">{log.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{log.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{log.checkOut}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{log.totalHours}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                      {log.method.includes("Biometric") ? <Fingerprint className="w-3.5 h-3.5 text-cyan-600" /> : <UserCheck className="w-3.5 h-3.5 text-brand-600" />}
                      {log.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(log.status)}`}>
                      {formatStatus(log.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Admin Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900">Admin Manual Attendance Entry</h3>
              <button onClick={() => setIsManualModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleManualAdd} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Employee</label>
                <input
                  type="text"
                  required
                  value={manualForm.employeeName}
                  onChange={(e) => setManualForm({ ...manualForm, employeeName: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Check In Time</label>
                  <input
                    type="text"
                    value={manualForm.checkIn}
                    onChange={(e) => setManualForm({ ...manualForm, checkIn: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="09:00 AM"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Check Out Time</label>
                  <input
                    type="text"
                    value={manualForm.checkOut}
                    onChange={(e) => setManualForm({ ...manualForm, checkOut: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="06:00 PM"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Status</label>
                <select
                  value={manualForm.status}
                  onChange={(e) => setManualForm({ ...manualForm, status: e.target.value as any })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Half Day">Half Day</option>
                  <option value="WFH">WFH</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setIsManualModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">Save Attendance Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}
