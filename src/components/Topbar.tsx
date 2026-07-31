"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Sun, MessageSquare, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials, getAvatarColor } from "@/lib/utils";

export function Topbar({ title }: { title?: string }) {
  const { user, employee, signOut, loading } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login");
    }
  }, [loading, user, pathname, router]);

  const notifications = [
    { id: 1, title: "Leave request approved", message: "Your casual leave for Dec 15 has been approved", time: "2m ago", unread: true },
    { id: 2, title: "New task assigned", message: "VFX rendering for scene 5 has been assigned to you", time: "1h ago", unread: true },
    { id: 3, title: "Payroll processed", message: "November payroll has been processed successfully", time: "3h ago", unread: true },
    { id: 4, title: "Birthday wish", message: "It's Meera's birthday today. Send her your wishes!", time: "5h ago", unread: false },
  ];

  // Compute a display name from Supabase user metadata
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const displayRole = user?.user_metadata?.role || "Employee";
  const avatarUrl = user?.user_metadata?.avatar_url || employee?.photo_url || null;

  return (
    <header className="sticky top-4 z-30 px-4 lg:px-6">
      <div className="glass-strong rounded-[22px] px-4 lg:px-6 py-3 flex items-center gap-4">
        {/* Title */}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="font-display text-xl lg:text-2xl font-bold text-slate-900 truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/50 border border-white/80 rounded-xl w-64 focus-within:bg-white focus-within:border-brand-300 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none flex-1 text-sm text-slate-900 placeholder:text-slate-400"
          />
          <kbd className="text-[10px] font-semibold text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">⌘K</kbd>
        </div>

        {/* Live Clock */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-brand-50 to-cyan-50 border border-brand-100 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-right">
            <div className="text-xs font-bold text-slate-900 tabular-nums">
              {currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {currentTime.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-white/70 text-slate-600 transition-colors relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl hover:bg-white/70 text-slate-600 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {notifications.filter((n) => n.unread).length}
              </span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-96 glass-strong rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-display font-bold text-slate-900">Notifications</h3>
                      <button className="text-xs font-semibold text-brand-500">Mark all read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-4 hover:bg-white/50 border-b border-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />}
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-slate-900">{notif.title}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{notif.message}</div>
                              <div className="text-[10px] text-slate-400 mt-1">{notif.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-100 text-center">
                      <button className="text-xs font-semibold text-brand-500">View all notifications</button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button className="p-2.5 rounded-xl hover:bg-white/70 text-slate-600 transition-colors">
            <Sun className="w-5 h-5" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-xl hover:bg-white/70 transition-colors"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-md"
                />
              ) : (
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(displayName)} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {getInitials(displayName)}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-slate-900 leading-tight">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-500 font-medium capitalize">
                  {displayRole.replace("_", " ")}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-brand-50 to-cyan-50">
                      <div className="flex items-center gap-3">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={displayName} className="w-12 h-12 rounded-full object-cover ring-2 ring-white" />
                        ) : (
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(displayName)} flex items-center justify-center text-white font-bold`}>
                            {getInitials(displayName)}
                          </div>
                        )}
                        <div>
                          <div className="font-display font-bold text-slate-900">{displayName}</div>
                          <div className="text-xs text-slate-500">{user?.email}</div>
                        </div>
                      </div>
                      {employee && (
                        <div className="mt-3 text-xs text-slate-600 bg-white/50 rounded-lg px-2 py-1.5">
                          <span className="font-semibold">{employee.designation}</span> · {employee.department}
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/70 text-sm text-slate-700">
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/70 text-sm text-slate-700">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-sm text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
