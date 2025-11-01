import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  competition_id: string;
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
      
      // Fetch team members
      const { data: teamMembersData, error: membersError } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", teamId)
        .order("role", { ascending: false }) // Captain first
        .order("joined_at", { ascending: true });

      if (membersError) throw membersError;

      if (!teamMembersData || teamMembersData.length === 0) {
        setMembers([]);
        setLoading(false);
        return;
      }

      // Fetch profiles for all user_ids
      const userIds = teamMembersData.map(m => m.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("full_name, phone, school, city, grade, id")
        .in("id", userIds);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
      }

      // Get captain email from enrollment
      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("email, user_id")
        .eq("id", teamId)
        .single();

      // Combine team members with their profiles
      const membersWithProfiles = teamMembersData.map(member => {
        const profile = profilesData?.find(p => p.id === member.user_id);
        return {
          ...member,
          profile: profile ? {
            ...profile,
            email: member.user_id === enrollment?.user_id ? enrollment?.email : ''
          } : null
        };
      });

      setMembers(membersWithProfiles as TeamMember[]);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setMembers([]);
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
