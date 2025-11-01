import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeamInvites } from "@/hooks/useTeamInvites";
import { Mail, RefreshCw, X, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface TeamInviteManagerProps {
  teamId: string;
  competitionId: string;
  teamName: string;
  maxTeamSize?: number;
  currentTeamSize?: number;
}

export function TeamInviteManager({
  teamId,
  competitionId,
  teamName,
  maxTeamSize = 6,
  currentTeamSize = 1
}: TeamInviteManagerProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { invites, loading, createInvite, revokeInvite, resendInvite } = useTeamInvites(teamId);

  const handleSendInvite = async () => {
    if (!email.trim()) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }

    // Check if already invited
    if (invites.some(inv => inv.invitee_email === email && inv.status === 'pending')) {
      return;
    }

    // Check team size limit
    const pendingAndAccepted = invites.filter(
      inv => inv.status === 'pending' || inv.status === 'accepted'
    ).length;
    
    if (currentTeamSize + pendingAndAccepted >= maxTeamSize) {
      return;
    }

    setIsSubmitting(true);
    await createInvite(competitionId, teamId, email, teamName);
    setEmail("");
    setIsSubmitting(false);
  };

  const getStatusBadge = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    
    if (isExpired && status === 'pending') {
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Истек</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Ожидание</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Принято</Badge>;
      case 'declined':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Отклонено</Badge>;
      case 'revoked':
        return <Badge variant="secondary"><X className="w-3 h-3 mr-1" />Отозвано</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingAndAccepted = invites.filter(
    inv => inv.status === 'pending' || inv.status === 'accepted'
  ).length;
  const spotsLeft = maxTeamSize - currentTeamSize - pendingAndAccepted;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Пригласить участников</h3>
        
        <div className="flex gap-2 mb-4">
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
            disabled={isSubmitting || spotsLeft <= 0}
          />
          <Button 
            onClick={handleSendInvite} 
            disabled={isSubmitting || !email || spotsLeft <= 0}
          >
            <Mail className="w-4 h-4 mr-2" />
            Отправить
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Доступно мест: {spotsLeft} из {maxTeamSize}
        </p>
      </Card>

      {/* Only show pending invites */}
      {(() => {
        const pendingInvites = invites.filter(inv => inv.status === 'pending');
        
        if (pendingInvites.length === 0) return null;
        
        return (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Отправленные приглашения</h3>
            
            {loading ? (
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            ) : (
              <div className="space-y-3">
                {pendingInvites.map((invite) => {
                  const isExpired = new Date(invite.expires_at) < new Date();
                  
                  return (
                    <div key={invite.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{invite.invitee_email}</p>
                        <p className="text-xs text-muted-foreground">
                          Отправлено {formatDistanceToNow(new Date(invite.created_at), { 
                            addSuffix: true, 
                            locale: ru 
                          })}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isExpired ? (
                          <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Истек</Badge>
                        ) : (
                          <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Ожидание</Badge>
                        )}
                        
                        {!isExpired && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resendInvite(invite.id)}
                              title="Отправить повторно"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => revokeInvite(invite.id)}
                              title="Отозвать"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );
      })()}
    </div>
  );
}
