import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface SpaceSettlementProtectedRouteProps {
  children: React.ReactElement;
}

const SpaceSettlementProtectedRoute: React.FC<SpaceSettlementProtectedRouteProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user is enrolled in space-settlement competition
        const { data, error } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user.id)
          .eq("competition_id", "space-settlement")
          .maybeSingle();

        if (error) {
          console.error("Error checking enrollment:", error);
          setHasAccess(false);
        } else {
          setHasAccess(!!data);
        }
      } catch (err) {
        console.error("Error:", err);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkEnrollment();
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (!loading && !hasAccess && user) {
      toast("Доступ запрещен", { 
        description: "Эта страница доступна только участникам Space Settlement Competition 2025" 
      });
    }
  }, [hasAccess, loading, user]);

  if (authLoading || loading) {
    return null; // Or a spinner/loader
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default SpaceSettlementProtectedRoute;
