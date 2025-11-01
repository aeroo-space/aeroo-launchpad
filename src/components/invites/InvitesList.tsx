import React from "react";
import { useTeamInvites } from "@/hooks/useTeamInvites";
import { useAuth } from "@/contexts/AuthProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function InvitesList() {
  const { invites, loading, respondToInvite } = useTeamInvites();
  const { user } = useAuth();

  // Filter to show only invites sent TO the user, not created BY the user
  const userInvites = invites.filter(invite => 
    invite.invitee_email === user?.email && invite.created_by !== user?.id
  );

  if (loading) {
    return <p className="text-sm text-muted-foreground">Загрузка приглашений...</p>;
  }

  if (userInvites.length === 0) {
    return <p className="text-sm text-muted-foreground">У вас пока нет приглашений</p>;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Ожидание</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Принято</Badge>;
      case 'declined':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Отклонено</Badge>;
      case 'expired':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Истекло</Badge>;
      case 'revoked':
        return <Badge variant="secondary">Отозвано</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Мои приглашения</h3>
      {userInvites.map((invite) => {
        const isExpired = new Date(invite.expires_at) < new Date();
        const canRespond = invite.status === 'pending' && !isExpired;

        return (
          <Card key={invite.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{invite.team?.team_name || 'Команда'}</h4>
                  {getStatusBadge(isExpired && invite.status === 'pending' ? 'expired' : invite.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Соревнование: <strong>{invite.competition_id}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  От: {invite.team?.captain_full_name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(invite.created_at), {
                    addSuffix: true,
                    locale: ru
                  })}
                </p>
              </div>

              {canRespond && (
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    onClick={() => respondToInvite(invite.id, true)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Принять
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => respondToInvite(invite.id, false)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Отклонить
                  </Button>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
