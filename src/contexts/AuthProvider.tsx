import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { ProfileSetupDialog } from "@/components/auth/ProfileSetupDialog";
import { ForcePasswordResetDialog } from "@/components/auth/ForcePasswordResetDialog";


interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    metadata?: { full_name?: string; age?: number; school?: string }
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showForcePasswordReset, setShowForcePasswordReset] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Check for recovery login - force password change
      if (newSession?.user && _event === 'SIGNED_IN') {
        // Check URL for recovery parameters
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const isRecovery = urlParams.get('type') === 'recovery' || hashParams.get('type') === 'recovery';
        
        if (isRecovery) {
          // Clear URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
          setShowForcePasswordReset(true);
          return; // Skip profile setup check for recovery
        }
        
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("profile_completed")
            .eq("user_id", newSession.user.id)
            .maybeSingle();
          
          if (!profile?.profile_completed) {
            setShowProfileSetup(true);
          }
        }, 100);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Ошибка входа", { description: error.message });
        throw error;
      }
      toast.success("Вы вошли в аккаунт");
    },
    signUp: async (email, password, metadata) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: metadata,
        },
      });
      if (error) {
        toast.error("Ошибка регистрации", { description: error.message });
        throw error;
      }
      toast.success("Проверьте почту для подтверждения");
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Ошибка выхода", { description: error.message });
        throw error;
      }
      toast("Вы вышли из аккаунта");
    },
  }), [user, session, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {user && (
        <>
          <ProfileSetupDialog
            user={user}
            open={showProfileSetup}
            onComplete={() => setShowProfileSetup(false)}
          />
          <ForcePasswordResetDialog
            user={user}
            open={showForcePasswordReset}
            onComplete={() => setShowForcePasswordReset(false)}
          />
        </>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
