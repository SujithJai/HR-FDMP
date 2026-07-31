"use client";

import { motion } from "framer-motion";
import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Coffee,
  Home,
  Timer,
  Cake,
  Briefcase,
  DollarSign,
  Film,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  PlayCircle,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { useAuth } from "@/contexts/AuthContext";
import { formatNumber, formatPercentage } from "@/lib/utils";

const attendanceData = [
  { date: "Mon", present: 85, absent: 8, late: 7 },
  { date: "Tue", present: 92, absent: 5, late: 3 },
  { date: "Wed", present: 88, absent: 6, late: 6 },
  { date: "Thu", present: 90, absent: 4, late: 6 },
  { date: "Fri", present: 87, absent: 7, late: 6 },
  { date: "Sat", present: 45, absent: 0, late: 2 },
  { date: "Sun", present: 0, absent: 0, late: 0 },
];

const departmentPerformance = [
  { name: "Production", value: 92, fill: "#0F5FFF" },
  { name: "Direction", value: 88, fill: "#00C8FF" },
  { name: "VFX", value: 85, fill: "#5B8CFF" },
  { name: "Sound", value: 90, fill: "#10B981" },
  { name: "Marketing", value: 87, fill: "#F59E0B" },
];

const projectProgress = [
  { name: "Midnight in Mumbai", progress: 80, stage: "Post Production" },
  { name: "Tales of Tomorrow", progress: 55, stage: "Production" },
  { name: "Royal Elegance", progress: 100, stage: "Released" },
  { name: "Rhythm of Love", progress: 25, stage: "Pre Production" },
];

const payrollData = [
  { month: "Jul", amount: 2450000 },
  { month: "Aug", amount: 2520000 },
  { month: "Sep", amount: 2480000 },
  { month: "Oct", amount: 2550000 },
  { month: "Nov", amount: 2620000 },
  { month: "Dec", amount: 2680000 },
];

const productivityScore = [
  { name: "Score", value: 87, fill: "#0F5FFF" },
];

export default function DashboardPage() {
  const { user, employee } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-0 lg:ml-[272px] transition-all duration-300">
        <Topbar title={`Welcome back, ${user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Admin"}`} />

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                label: "Present Today",
                value: 87,
                total: 102,
                change: "+5.2%",
                trend: "up",
                icon: CheckCircle2,
                color: "from-emerald-500 to-teal-500",
                bgColor: "bg-emerald-50",
              },
              {
                label: "Late Arrivals",
                value: 12,
                change: "-2.1%",
                trend: "down",
                icon: Clock,
                color: "from-amber-500 to-orange-500",
                bgColor: "bg-amber-50",
              },
              {
                label: "On Leave",
                value: 8,
                change: "+1.5%",
                trend: "up",
                icon: Coffee,
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-50",
              },
              {
                label: "Work From Home",
                value: 15,
                change: "+8.3%",
                trend: "up",
                icon: Home,
                color: "from-brand-500 to-cyan-400",
                bgColor: "bg-brand-50",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={item} className="card-3d rounded-[22px] p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`${stat.bgColor} p-3 rounded-xl`}>
                      <Icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-amber-600"}`}>
                      {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold text-slate-900">
                        {formatNumber(stat.value)}
                      </span>
                      {stat.total && (
                        <span className="text-sm text-slate-400">/ {stat.total}</span>
                      )}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 card-3d rounded-[22px] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Attendance Trend
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">Weekly attendance overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    Present
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-600">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    Late
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      borderRadius: "12px",
                      boxShadow: "0 20px 40px -12px rgba(15,95,255,0.2)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPresent)"
                  />
                  <Area
                    type="monotone"
                    dataKey="late"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorLate)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* AI Productivity Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-3d rounded-[22px] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  AI Productivity
                </h3>
                <Sparkles className="w-5 h-5 text-brand-500" />
              </div>
              <div className="flex items-center justify-center py-4">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    data={productivityScore}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={20}
                      fill="#0F5FFF"
                      background={{ fill: "#F3F4F6" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute">
                  <div className="text-center">
                    <div className="font-display text-5xl font-bold gradient-text">87</div>
                    <div className="text-sm text-slate-500 font-medium mt-1">Excellent</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Task Completion</span>
                  <span className="font-semibold text-slate-900">92%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Punctuality</span>
                  <span className="font-semibold text-slate-900">88%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Quality Score</span>
                  <span className="font-semibold text-slate-900">85%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card-3d rounded-[22px] p-6"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 mb-6">
                Department Performance
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {departmentPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Payroll Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card-3d rounded-[22px] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Payroll Analysis
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">₹26.8L</div>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    +2.3% vs last month
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={payrollData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <YAxis
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      borderRadius: "12px",
                    }}
                    formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(2)}L`, "Payroll"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#0F5FFF"
                    strokeWidth={3}
                    dot={{ fill: "#0F5FFF", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Projects & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 card-3d rounded-[22px] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Active Production Projects
                </h3>
                <button className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {projectProgress.map((project, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-brand-50 to-cyan-50 rounded-lg">
                          <Film className="w-4 h-4 text-brand-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {project.name}
                          </div>
                          <div className="text-xs text-slate-500">{project.stage}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{project.progress}%</div>
                      </div>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="card-3d rounded-[22px] p-6"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Check In", icon: PlayCircle, color: "from-emerald-500 to-teal-500" },
                  { label: "Apply Leave", icon: Calendar, color: "from-purple-500 to-pink-500" },
                  { label: "Submit Report", icon: Briefcase, color: "from-brand-500 to-cyan-400" },
                  { label: "Add Expense", icon: DollarSign, color: "from-amber-500 to-orange-500" },
                  { label: "View Payslip", icon: Timer, color: "from-blue-500 to-indigo-500" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/70 transition-all group"
                    >
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="flex-1 text-left font-medium text-slate-700 text-sm">
                        {action.label}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity & Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="card-3d rounded-[22px] p-6"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: "Checked in", user: "You", time: "2 minutes ago", icon: CheckCircle2, color: "text-emerald-500" },
                  { action: "Submitted daily report", user: "Rahul Verma", time: "1 hour ago", icon: Briefcase, color: "text-brand-500" },
                  { action: "Approved leave request", user: "Priya Sharma", time: "2 hours ago", icon: Calendar, color: "text-purple-500" },
                  { action: "Uploaded VFX assets", user: "Vikram Singh", time: "3 hours ago", icon: Film, color: "text-cyan-500" },
                ].map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold text-slate-900">{activity.user}</span>{" "}
                          <span className="text-slate-600">{activity.action}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{activity.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="card-3d rounded-[22px] p-6"
            >
              <h3 className="font-display text-lg font-bold text-slate-900 mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {[
                  { title: "Team Meeting", date: "Today, 3:00 PM", type: "meeting", color: "bg-brand-500" },
                  { title: "Project Review", date: "Tomorrow, 10:00 AM", type: "review", color: "bg-purple-500" },
                  { title: "Meera's Birthday", date: "Dec 15", type: "birthday", color: "bg-pink-500" },
                  { title: "Diwali Celebration", date: "Nov 1", type: "event", color: "bg-amber-500" },
                ].map((event, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 transition-colors">
                    <div className={`w-1 h-12 rounded-full ${event.color}`} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-slate-900">{event.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
