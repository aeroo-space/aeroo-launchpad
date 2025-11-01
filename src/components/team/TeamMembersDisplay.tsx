import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Crown, UserX } from "lucide-react";

interface TeamMembersDisplayProps {
  teamId: string;
  canManage?: boolean;
}

export function TeamMembersDisplay({ teamId, canManage = false }: TeamMembersDisplayProps) {
  const { members, loading, removeMember } = useTeamMembers(teamId);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Загрузка участников...</p>;
  }

  const activeMembers = members.filter(m => m.status === 'active');

  return (
    <>
      {activeMembers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Пока нет участников. Пригласите членов команды.
        </p>
      ) : (
        <div className="space-y-3">
          {activeMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-start justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {member.role === 'captain' && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                  <p className="font-medium">
                    {member.profile?.full_name || 'Имя не указано'}
                  </p>
                  <Badge variant={member.role === 'captain' ? 'default' : 'outline'}>
                    {member.role === 'captain' ? 'Капитан' : 'Участник'}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  {member.profile?.school && <p>🏫 {member.profile.school}</p>}
                  {member.profile?.city && <p>📍 {member.profile.city}</p>}
                  {member.profile?.grade && <p>📚 {member.profile.grade} класс</p>}
                  {member.profile?.phone && <p>📞 {member.profile.phone}</p>}
                </div>
              </div>

              {canManage && member.role !== 'captain' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm('Удалить участника из команды?')) {
                      removeMember(member.id);
                    }
                  }}
                >
                  <UserX className="w-4 h-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
