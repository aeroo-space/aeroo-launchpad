import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'captain' | 'member';
  status: 'pending' | 'active' | 'removed';
  joined_at: string | null;
  created_at: string;
  updated_at: string;
  profile?: {
    full_name: string;
    email: string;
    phone: string;
    school: string;
    city: string;
    grade: number;
  };
}

export function useTeamMembers(teamId?: string) {
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    if (!teamId) {
      setMembers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          *,
          profile:profiles!user_id(
            full_name,
            phone,
            school,
            city,
            grade
          )
        `)
        .eq("team_id", teamId)
        .order("role", { ascending: false }) // Captain first
        .order("joined_at", { ascending: true });

      if (error) throw error;

      // Get user emails from auth.users via team enrollment
      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("email")
        .eq("id", teamId)
        .single();

      const membersWithEmail = (data || []).map((member: any) => ({
        ...member,
        profile: {
          ...member.profile,
          email: member.role === 'captain' ? enrollment?.email : member.profile?.email
        }
      }));

      setMembers(membersWithEmail as TeamMember[]);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchMembers();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('team-members-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_members',
          filter: teamId ? `team_id=eq.${teamId}` : undefined
        },
        () => {
          fetchMembers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMembers, teamId]);

  const removeMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ status: 'removed' })
        .eq("id", memberId);

      if (error) throw error;

      await fetchMembers();
      return { data: true };
    } catch (error: any) {
      console.error("Error removing member:", error);
      return { error: error.message };
    }
  };

  return {
    members,
    loading,
    refetch: fetchMembers,
    removeMember
  };
}
