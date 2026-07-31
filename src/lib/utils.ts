import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number | string, currency = "INR") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export function formatNumber(num: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-IN", options).format(num);
}

export function formatPercentage(num: number, decimals = 1) {
  return `${num.toFixed(decimals)}%`;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getAvatarColor(name: string) {
  const colors = [
    "from-blue-400 to-indigo-600",
    "from-purple-400 to-pink-600",
    "from-emerald-400 to-teal-600",
    "from-orange-400 to-red-600",
    "from-cyan-400 to-blue-600",
    "from-rose-400 to-fuchsia-600",
    "from-amber-400 to-orange-600",
    "from-lime-400 to-emerald-600",
  ];
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

export function formatRelativeTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  });
}

export function formatTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    present: "bg-emerald-100 text-emerald-700 border-emerald-200",
    absent: "bg-red-100 text-red-700 border-red-200",
    late: "bg-amber-100 text-amber-700 border-amber-200",
    half_day: "bg-orange-100 text-orange-700 border-orange-200",
    leave: "bg-purple-100 text-purple-700 border-purple-200",
    holiday: "bg-cyan-100 text-cyan-700 border-cyan-200",
    wfh: "bg-blue-100 text-blue-700 border-blue-200",
    early_exit: "bg-yellow-100 text-yellow-700 border-yellow-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    cancelled: "bg-slate-100 text-slate-700 border-slate-200",
    paid: "bg-green-100 text-green-700 border-green-200",
    draft: "bg-slate-100 text-slate-700 border-slate-200",
    todo: "bg-slate-100 text-slate-700 border-slate-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    review: "bg-purple-100 text-purple-700 border-purple-200",
    done: "bg-emerald-100 text-emerald-700 border-emerald-200",
    blocked: "bg-red-100 text-red-700 border-red-200",
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    inactive: "bg-slate-100 text-slate-700 border-slate-200",
    released: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pre_production: "bg-blue-100 text-blue-700 border-blue-200",
    production: "bg-purple-100 text-purple-700 border-purple-200",
    post_production: "bg-amber-100 text-amber-700 border-amber-200",
    archived: "bg-slate-100 text-slate-700 border-slate-200",
    expected: "bg-blue-100 text-blue-700 border-blue-200",
    checked_in: "bg-emerald-100 text-emerald-700 border-emerald-200",
    checked_out: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    map[status] || "bg-slate-100 text-slate-700 border-slate-200"
  );
}

export function formatStatus(status: string) {
  return status
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function getPriorityColor(priority: string) {
  const map: Record<string, string> = {
    low: "bg-slate-100 text-slate-700",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
  };
  return map[priority] || "bg-slate-100 text-slate-700";
}
