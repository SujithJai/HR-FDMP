"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Briefcase,
  DollarSign,
  CheckSquare,
  FileText,
  Receipt,
  UserPlus,
  CalendarDays,
  Megaphone,
  FolderOpen,
  Film,
  FilmIcon,
  BarChart3,
  Sparkles,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
} from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  group?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, group: "Overview" },
  { label: "Analytics", href: "/analytics", icon: BarChart3, group: "Overview" },
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles, badge: "New", group: "Overview" },

  { label: "Employees", href: "/employees", icon: Users, group: "People" },
  { label: "Attendance", href: "/attendance", icon: Clock, group: "People" },
  { label: "Leave", href: "/leave", icon: Calendar, badge: "3", group: "People" },
  { label: "Payroll", href: "/payroll", icon: DollarSign, group: "People" },

  { label: "Tasks", href: "/tasks", icon: CheckSquare, group: "Work" },
  { label: "Daily Reports", href: "/daily-reports", icon: FileText, group: "Work" },
  { label: "Expenses", href: "/expenses", icon: Receipt, badge: "2", group: "Work" },

  { label: "Projects", href: "/projects", icon: Film, group: "Production" },
  { label: "Digital Assets", href: "/assets", icon: FilmIcon, group: "Production" },

  { label: "Visitors", href: "/visitors", icon: UserPlus, group: "Office" },
  { label: "Holidays", href: "/holidays", icon: CalendarDays, group: "Office" },
  { label: "Notices", href: "/notices", icon: Megaphone, group: "Office" },
  { label: "Documents", href: "/documents", icon: FolderOpen, group: "Office" },

  { label: "Notifications", href: "/notifications", icon: Bell, badge: "5", group: "System" },
  { label: "Profile", href: "/profile", icon: User, group: "System" },
  { label: "Settings", href: "/settings", icon: Settings, group: "System" },
  { label: "Branding", href: "/branding", icon: Building2, group: "System" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const groups = Array.from(new Set(navItems.map((item) => item.group)));

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 272 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col py-4 px-3"
    >
      <div className="glass-strong rounded-[24px] h-full flex flex-col overflow-hidden relative">
        {/* Header with logo */}
        <div className={cn("px-4 py-5 flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {collapsed ? (
            <Link href="/dashboard">
              <Logo size="sm" showText={false} />
            </Link>
          ) : (
            <Link href="/dashboard">
              <Logo size="sm" />
            </Link>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-thin">
          {groups.map((group) => (
            <div key={group}>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400"
                  >
                    {group}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-0.5 mt-1">
                {navItems
                  .filter((item) => item.group === group)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link key={item.href} href={item.href}>
                        <motion.div
                          whileHover={{ x: collapsed ? 0 : 2 }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all relative group",
                            isActive
                              ? "bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-lg shadow-brand-500/30"
                              : "text-slate-600 hover:bg-white/70 hover:text-slate-900",
                            collapsed && "justify-center px-2"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-white")} />
                          <AnimatePresence>
                            {!collapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="whitespace-nowrap overflow-hidden flex-1"
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          {item.badge && !collapsed && (
                            <span
                              className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                isActive
                                  ? "bg-white/25 text-white"
                                  : "bg-brand-100 text-brand-600"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.badge && collapsed && (
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500" />
                          )}

                          {/* Tooltip for collapsed */}
                          {collapsed && (
                            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                              {item.label}
                            </div>
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse button */}
        {collapsed && (
          <div className="p-3">
            <button
              onClick={() => setCollapsed(false)}
              className="w-full p-2 rounded-xl hover:bg-white/70 text-slate-500 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upgrade card */}
        {!collapsed && (
          <div className="p-3">
            <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-brand-500 via-brand-600 to-cyan-500 text-white">
              <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-gold/20 blur-2xl" />
              <Sparkles className="w-6 h-6 mb-2 relative z-10" />
              <h4 className="font-bold text-sm mb-1 relative z-10">AI Assistant</h4>
              <p className="text-xs text-white/80 mb-3 relative z-10">
                Smart insights for your production workflow
              </p>
              <button className="w-full bg-white text-brand-600 text-xs font-bold py-2 rounded-lg hover:bg-white/90 transition-colors relative z-10">
                Explore AI
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
