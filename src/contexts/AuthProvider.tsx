import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User, SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sb, setSb] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase lazily to avoid crash when globals are not ready
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const tryInit = () => {
      try {
        const client = getSupabase();
        if (!cancelled) setSb(client);
      } catch {
        attempts += 1;
        if (!cancelled && attempts < 50) {
          setTimeout(tryInit, 100);
        } else if (!cancelled) {
          setLoading(false);
        }
      }
    };
    tryInit();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!sb) return;
    let isMounted = true;
    (async () => {
      const { data } = await sb.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    })();

    const { data: listener } = sb.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [sb]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    signIn: async (email, password) => {
      if (!sb) {
        toast.error("Авторизация недоступна", { description: "Supabase не инициализирован" });
        return;
      }
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Ошибка входа", { description: error.message });
        throw error;
      }
      toast.success("Вы вошли в аккаунт");
    },
    signUp: async (email, password) => {
      if (!sb) {
        toast.error("Регистрация недоступна", { description: "Supabase не инициализирован" });
        return;
      }
      const { error } = await sb.auth.signUp({ email, password });
      if (error) {
        toast.error("Ошибка регистрации", { description: error.message });
        throw error;
      }
      toast.success("Проверьте почту для подтверждения");
    },
    signOut: async () => {
      if (!sb) return;
      const { error } = await sb.auth.signOut();
      if (error) {
        toast.error("Ошибка выхода", { description: error.message });
        throw error;
      }
      toast("Вы вышли из аккаунта");
    },
  }), [user, session, loading, sb]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
