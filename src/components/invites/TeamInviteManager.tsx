import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeamInvites } from "@/hooks/useTeamInvites";
import { Mail, RefreshCw, X, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru, kk, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  // Get locale for date-fns based on current language
  const getDateLocale = () => {
    switch (i18n.language) {
      case 'kk': return kk;
      case 'en': return enUS;
      default: return ru;
    }
  };

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

    // Check team size limit - only count pending invites since accepted ones are already in team
    const pendingInvites = invites.filter(
      inv => inv.status === 'pending'
    ).length;
    
    if (currentTeamSize + pendingInvites >= maxTeamSize) {
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
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />{t('teamManagement.expired')}</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />{t('teamManagement.pending')}</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />{t('teamManagement.accepted')}</Badge>;
      case 'declined':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />{t('teamManagement.declined')}</Badge>;
      case 'revoked':
        return <Badge variant="secondary"><X className="w-3 h-3 mr-1" />{t('teamManagement.revoked')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Only count pending invites - accepted ones are already team members
  const pendingInvites = invites.filter(
    inv => inv.status === 'pending'
  ).length;
  const spotsLeft = maxTeamSize - currentTeamSize - pendingInvites;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">{t('teamManagement.inviteMembers')}</h3>
        
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
            {t('teamManagement.send')}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {t('teamManagement.spotsLeft')}: {spotsLeft} {t('teamManagement.of')} {maxTeamSize}
          {spotsLeft === 0 && ` (${t('teamManagement.teamComplete')})`}
        </p>
      </Card>

      {/* Only show pending invites */}
      {(() => {
        const pendingInvites = invites.filter(inv => inv.status === 'pending');
        
        if (pendingInvites.length === 0) return null;
        
        return (
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">{t('teamManagement.sentInvites')}</h3>
            
            {loading ? (
              <p className="text-sm text-muted-foreground">{t('teamManagement.loading')}</p>
            ) : (
              <div className="space-y-3">
                {pendingInvites.map((invite) => {
                  const isExpired = new Date(invite.expires_at) < new Date();
                  
                  return (
                    <div key={invite.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{invite.invitee_email}</p>
                        <p className="text-xs text-muted-foreground">
                          {t('teamManagement.sentAgo')} {formatDistanceToNow(new Date(invite.created_at), { 
                            addSuffix: true, 
                            locale: getDateLocale()
                          })}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isExpired ? (
                          <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />{t('teamManagement.expired')}</Badge>
                        ) : (
                          <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />{t('teamManagement.pending')}</Badge>
                        )}
                        
                        {!isExpired && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resendInvite(invite.id)}
                              title={t('teamManagement.resend')}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => revokeInvite(invite.id)}
                              title={t('teamManagement.revoke')}
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
