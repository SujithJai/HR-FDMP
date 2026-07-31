"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, Clapperboard, Database, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@fourdee.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, isSupabaseReady } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { role: "Super Admin", email: "admin@fourdee.com", color: "from-purple-500 to-pink-500" },
    { role: "HR Manager", email: "hr@fourdee.com", color: "from-emerald-500 to-teal-500" },
    { role: "Production Manager", email: "manager@fourdee.com", color: "from-brand-500 to-cyan-400" },
    { role: "Employee", email: "rahul@fourdee.com", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden animated-gradient flex items-center justify-center p-4">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-brand-200/60 to-cyan-400/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 40, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-300/40 to-pink-300/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-gold/30 to-orange-300/30 blur-3xl"
        />

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 right-1/4"
        >
          <div className="glass rounded-2xl p-4 w-20 h-20 flex items-center justify-center">
            <Clapperboard className="w-10 h-10 text-brand-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4"
        >
          <div className="glass rounded-2xl p-4 w-20 h-20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-gold" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - branding */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8 text-slate-800"
        >
          <Logo size="xl" />

          <div className="space-y-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl font-bold leading-tight"
            >
              Where <span className="gradient-text">Cinematic Stories</span>
              <br />
              Meet Enterprise Excellence
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-600 max-w-md"
            >
              A unified platform for HR, Production, Assets, and AI-powered insights —
              crafted for the future of filmmaking.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { value: "25+", label: "Modules" },
              { value: "10K+", label: "Assets" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Supabase Setup Banner */}
          {!isSupabaseReady && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-strong rounded-2xl p-5 border-2 border-brand-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-slate-900">Supabase Configuration</div>
                  <div className="text-xs text-slate-500">Required for authentication</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-brand-100 text-brand-600 text-xs font-bold flex items-center justify-center">1</span>
                  <span>Go to <a href="https://supabase.com/dashboard" target="_blank" className="text-brand-600 underline">supabase.com</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-brand-100 text-brand-600 text-xs font-bold flex items-center justify-center">2</span>
                  <span>Create a project & copy API keys</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-brand-100 text-brand-600 text-xs font-bold flex items-center justify-center">3</span>
                  <span>Update <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> file</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right side - login form */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="glass-strong rounded-[28px] p-8 md:p-10 shadow-2xl"
        >
          <div className="lg:hidden mb-6">
            <Logo size="lg" />
          </div>

          {/* Supabase Setup Banner (Mobile) */}
          {!isSupabaseReady && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass rounded-2xl p-4 border-2 border-brand-200 mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-brand-600" />
                <span className="font-bold text-sm text-slate-900">Supabase Setup Required</span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Update the <code className="bg-slate-100 px-1 rounded text-xs">.env</code> file with your Supabase credentials to enable login.
              </p>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full btn-premium py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
              >
                Continue without Auth <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500">
              Sign in to access your enterprise workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl focus-ring transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-semibold text-brand-500 hover:text-brand-600">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl focus-ring transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-premium py-4 font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in to Workspace"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-3 text-slate-400 font-semibold tracking-wider">
                  Quick Demo Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={async () => {
                    setEmail(account.email);
                    setPassword("demo123");
                    setLoading(true);
                    try {
                      await signIn(account.email, "demo123");
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Login failed");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="p-3 rounded-xl border border-white/80 bg-white/50 hover:bg-white/80 transition-all text-left group cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${account.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <div className="text-xs font-semibold text-slate-900">{account.role}</div>
                  <div className="text-[10px] text-slate-500 truncate">{account.email}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Powered by Supabase Auth · Enterprise-grade security · Audit Logs
          </p>
        </motion.div>
      </div>
    </div>
  );
}
