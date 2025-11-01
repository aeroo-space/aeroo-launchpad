import React from "react";
import { useTeamInvites } from "@/hooks/useTeamInvites";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";

export function InviteNotificationBanner() {
  const { user } = useAuth();
  const { invites, loading, respondToInvite } = useTeamInvites();

  const pendingInvites = invites.filter(
    (invite) =>
      invite.status === 'pending' &&
      invite.invitee_email === user?.email &&
      new Date(invite.expires_at) > new Date()
  );

  if (loading || pendingInvites.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 max-w-md space-y-2">
      {pendingInvites.map((invite) => (
        <Card key={invite.id} className="p-4 bg-card shadow-lg border-2 border-primary/20">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold">Приглашение в команду</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {invite.team?.captain_full_name} приглашает вас в команду{' '}
                <strong>{invite.team?.team_name}</strong> для участия в{' '}
                {invite.competition_id}
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => respondToInvite(invite.id, true)}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Принять
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => respondToInvite(invite.id, false)}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Отклонить
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
