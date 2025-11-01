import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export interface TeamInvite {
  id: string;
  competition_id: string;
  team_id: string;
  invitee_email: string;
  token: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'revoked';
  expires_at: string;
  created_by: string;
  accepted_by: string | null;
  created_at: string;
  updated_at: string;
  team?: {
    team_name: string;
    captain_full_name: string;
  };
}

export function useTeamInvites(teamId?: string) {
  const { user } = useAuth();
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvites = useCallback(async () => {
    if (!user) {
      setInvites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase
        .from("invites")
        .select(`
          *,
          team:enrollments(team_name, captain_full_name)
        `);

      if (teamId) {
        query = query.eq("team_id", teamId);
      } else {
        // Fetch invites for current user's email
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();
        
        if (profile) {
          query = query.or(`created_by.eq.${user.id},invitee_email.eq.${user.email}`);
        }
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      setInvites((data || []) as TeamInvite[]);
    } catch (error) {
      console.error("Error fetching invites:", error);
      toast("Ошибка загрузки приглашений");
    } finally {
      setLoading(false);
    }
  }, [user, teamId]);

  useEffect(() => {
    fetchInvites();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('invites-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'invites',
          filter: teamId ? `team_id=eq.${teamId}` : undefined
        },
        () => {
          fetchInvites();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchInvites, teamId]);

  const createInvite = async (
    competitionId: string,
    teamId: string,
    inviteeEmail: string,
    teamName: string
  ) => {
    if (!user) return { error: "Not authenticated" };

    try {
      // Generate secure token
      const token = crypto.randomUUID() + '-' + Date.now();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 72);

      // Create invite
      const { data: invite, error: insertError } = await supabase
        .from("invites")
        .insert({
          competition_id: competitionId,
          team_id: teamId,
          invitee_email: inviteeEmail,
          token,
          expires_at: expiresAt.toISOString(),
          created_by: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Send email
      const { error: emailError } = await supabase.functions.invoke('send-team-invite', {
        body: {
          inviteId: invite.id,
          teamName,
          competitionId,
          inviteeEmail,
          token
        }
      });

      if (emailError) {
        console.error("Email error:", emailError);
        toast("Приглашение создано, но письмо не отправлено");
      } else {
        toast("Приглашение отправлено!");
      }

      await fetchInvites();
      return { data: invite };
    } catch (error: any) {
      console.error("Error creating invite:", error);
      toast("Ошибка создания приглашения");
      return { error: error.message };
    }
  };

  const respondToInvite = async (inviteId: string, accept: boolean) => {
    if (!user) return { error: "Not authenticated" };

    try {
      const invite = invites.find(i => i.id === inviteId);
      if (!invite) return { error: "Invite not found" };

      // Check if user is already in another team for this competition
      if (accept) {
        const { data: existingTeam } = await supabase
          .from("team_members")
          .select(`
            id,
            team:enrollments!inner(competition_id)
          `)
          .eq("user_id", user.id)
          .eq("status", "active")
          .eq("enrollments.competition_id", invite.competition_id)
          .maybeSingle();

        if (existingTeam) {
          toast.error("Вы уже состоите в команде для этого соревнования");
          return { error: "Already in team" };
        }
      }

      // CRITICAL: Update invite status FIRST
      const { error: inviteError } = await supabase
        .from("invites")
        .update({
          status: accept ? 'accepted' : 'declined',
          accepted_by: accept ? user.id : null,
          updated_at: new Date().toISOString()
        })
        .eq("id", inviteId);

      if (inviteError) {
        console.error("Error updating invite:", inviteError);
        throw inviteError;
      }

      // THEN create team_member entry (after status is updated)
      if (accept) {
        const { error: memberError } = await supabase
          .from("team_members")
          .insert({
            team_id: invite.team_id,
            user_id: user.id,
            role: 'member',
            status: 'active',
            joined_at: new Date().toISOString()
          });

        if (memberError) {
          console.error("Error creating team member:", memberError);
          toast.error("Ошибка добавления в команду", { 
            description: memberError.message 
          });
          throw memberError;
        }
      }

      toast(accept ? "Приглашение принято! Вы теперь член команды." : "Приглашение отклонено");
      await fetchInvites();
      return { data: true };
    } catch (error: any) {
      console.error("Error responding to invite:", error);
      toast.error("Ошибка обработки приглашения", { 
        description: error.message 
      });
      return { error: error.message };
    }
  };

  const revokeInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from("invites")
        .update({ status: 'revoked', updated_at: new Date().toISOString() })
        .eq("id", inviteId);

      if (error) throw error;

      toast("Приглашение отозвано");
      await fetchInvites();
      return { data: true };
    } catch (error: any) {
      console.error("Error revoking invite:", error);
      toast("Ошибка отзыва приглашения");
      return { error: error.message };
    }
  };

  const resendInvite = async (inviteId: string) => {
    try {
      const invite = invites.find(i => i.id === inviteId);
      if (!invite) return { error: "Invite not found" };

      const { error } = await supabase.functions.invoke('send-team-invite', {
        body: {
          inviteId: invite.id,
          teamName: invite.team?.team_name || 'команда',
          competitionId: invite.competition_id,
          inviteeEmail: invite.invitee_email,
          token: invite.token
        }
      });

      if (error) throw error;

      toast("Приглашение отправлено повторно!");
      return { data: true };
    } catch (error: any) {
      console.error("Error resending invite:", error);
      toast("Ошибка повторной отправки");
      return { error: error.message };
    }
  };

  return {
    invites,
    loading,
    createInvite,
    respondToInvite,
    revokeInvite,
    resendInvite,
    refetch: fetchInvites
  };
}
