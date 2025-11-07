import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { TeamMembersDisplay } from "@/components/team/TeamMembersDisplay";
import { TeamInviteManager } from "@/components/invites/TeamInviteManager";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import type { Tables } from "@/integrations/supabase/types";
import { competitions } from "@/data/competitions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Enrollment = Tables<"enrollments">;

interface EnrollmentItemProps {
  enrollment: Enrollment;
  feedbackStatus: Record<string, boolean>;
  onDelete: (id: string) => void;
  onFeedback: (enrollmentId: string, userId: string) => void;
}

// Helper function to get max team size based on competition and league
const getMaxTeamSize = (competitionId: string, league?: string | null): number => {
  if (competitionId === "exploring-world-of-science") {
    if (league === "aslc") return 4;
    if (league === "space_ai") return 4;
    if (league === "rocket_science") return 2;
    return 4;
  }
  // Default for other competitions
  return 6;
};

export const EnrollmentItem: React.FC<EnrollmentItemProps> = ({
  enrollment,
  feedbackStatus,
  onDelete,
  onFeedback,
}) => {
  const { t } = useTranslation();
  const { members } = useTeamMembers(enrollment.id);
  
  const isSpaceSettlement = enrollment.competition_id === "space-settlement";
  const comp = competitions.find(c => c.id === enrollment.competition_id);
  const compStatus = comp ? t(comp.status) : '';
  const isCompleted = compStatus.includes('Завершено') || 
                     compStatus.includes('Completed') || 
                     compStatus.includes('Аяқталды');
  
  const maxTeamSize = getMaxTeamSize(enrollment.competition_id, enrollment.league);
  const activeMembers = members.filter(m => m.status === 'active');
  const currentTeamSize = activeMembers.length;

  // Simplified view for completed Space Settlement Competition
  if (isSpaceSettlement && isCompleted) {
    // Determine badge text based on award_place
    const badgeText = enrollment.award_place 
      ? t('feedback.awardBadge', { place: enrollment.award_place })
      : t('feedback.participantBadge', { defaultValue: '🏆 Участник AEROO Space Settlement Competition 2025' });

    return (
      <li className="py-4 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">
              {comp ? t(comp.title) : enrollment.competition_id}
            </div>
            <div className="text-sm text-muted-foreground">
              {t('dashboardExtra.labels.team', { defaultValue: 'Команда' })}: {enrollment.team_name || "—"}
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded uppercase tracking-wide bg-red-500/20 text-red-400 border border-red-500/30">
            {compStatus}
          </span>
        </div>
        <div className="space-y-3">
          {enrollment.submission_link && (
            <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <Badge variant="default" className="text-sm whitespace-normal text-left">
                {badgeText}
              </Badge>
            </div>
          )}
          {enrollment.submission_link && !feedbackStatus[enrollment.id] && (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => onFeedback(enrollment.id, enrollment.user_id)}
              className="w-full text-base font-semibold"
            >
              {t('feedback.giveFeedback', { defaultValue: '💬 Оставить обратную связь' })}
            </Button>
          )}
          {enrollment.submission_link && feedbackStatus[enrollment.id] && (
            <div className="text-center text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
              {t('feedback.alreadySubmitted', { defaultValue: '✅ Спасибо! Ваш отзыв уже получен' })}
            </div>
          )}
        </div>
      </li>
    );
  }

  // Full view for other competitions or active competitions
  return (
    <li className="py-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">
            {comp ? t(comp.title) : enrollment.competition_id}
          </div>
          <div className="text-sm text-muted-foreground">
            {t('dashboardExtra.labels.team', { defaultValue: 'Команда' })}: {enrollment.team_name || "—"}
          </div>
          {enrollment.league && (
            <div className="text-sm text-muted-foreground">
              {t('dashboardExtra.labels.category', { defaultValue: 'Категория' })}: {
                t(`dashboardExtra.categories.${enrollment.league}`, { defaultValue: enrollment.league })
              }
            </div>
          )}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <div>{t('dashboardExtra.labels.email', { defaultValue: 'Email' })}: {enrollment.email || "—"}</div>
            <div>{t('dashboardExtra.labels.telegram', { defaultValue: 'Telegram' })}: {enrollment.telegram || "—"}</div>
          </div>
          <div className="mt-2 text-sm">
            <div>{t('dashboardExtra.labels.captain', { defaultValue: 'Капитан' })}: {enrollment.captain_full_name || "—"}</div>
          </div>
          <div className="mt-4">
            <TeamMembersDisplay teamId={enrollment.id} canManage={false} />
          </div>
          <div className="mt-4">
            <TeamInviteManager
              teamId={enrollment.id}
              competitionId={enrollment.competition_id}
              teamName={enrollment.team_name || ""}
              maxTeamSize={maxTeamSize}
              currentTeamSize={currentTeamSize}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded uppercase tracking-wide ${
            isCompleted 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {isCompleted ? compStatus : (enrollment.status || "active")}
          </span>
          {!isCompleted && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  {t('dashboard.deleteEnrollment', { defaultValue: 'Удалить' })}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {t('dashboard.deleteEnrollmentTitle', { defaultValue: 'Удалить регистрацию?' })}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('dashboard.deleteEnrollmentDesc', { 
                      defaultValue: 'Вы уверены, что хотите удалить свою регистрацию на это соревнование? Это действие нельзя отменить.' 
                    })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {t('common.cancel', { defaultValue: 'Отмена' })}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(enrollment.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {t('common.delete', { defaultValue: 'Удалить' })}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </li>
  );
};