"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { type User, type Session } from "@supabase/supabase-js";

interface Employee {
  id: string;
  employee_code: string;
  first_name: string;
  last_name: string;
  department: string;
  designation: string;
  photo_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  employee: Employee | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isSupabaseReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  const url = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : "";
  const key = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "";
  return !!(url && key && url !== "https://YOUR_PROJECT_ID.supabase.co" && key !== "YOUR_SUPABASE_ANON_KEY");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  const router = useRouter();

  const supabaseReady = isSupabaseConfigured();
  const supabase = supabaseReady ? createSupabaseBrowserClient() : null;

  // Fetch employee data based on user email
  const fetchEmployee = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase!
        .from("employees")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (!error && data) {
        setEmployee(data as Employee);
      }
    } catch (error) {
      console.error("Failed to fetch employee data:", error);
    }
  }, [supabase]);

  useEffect(() => {
    setIsSupabaseReady(supabaseReady);

    if (!supabase) {
      // Supabase not configured — skip auth, show app freely
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchEmployee(session.user.id);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          try {
            await fetchEmployee(session.user.id);
          } catch { /* ignore */ }

          if (event === "SIGNED_IN") {
            const redirectedFrom = new URLSearchParams(window.location.search).get("redirectedFrom");
            if (redirectedFrom) {
              router.push(redirectedFrom);
            } else {
              router.push("/dashboard");
            }
          }
        }

        if (event === "SIGNED_OUT") {
          setEmployee(null);
          router.push("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, supabaseReady, router, fetchEmployee]);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error("Supabase is not configured. Please set up your Supabase project first.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    setSession(data.session);
    setUser(data.user);
    if (data.user) {
      await fetchEmployee(data.user.id);
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setUser(null);
    setEmployee(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, employee, loading, signIn, signOut, isSupabaseReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
