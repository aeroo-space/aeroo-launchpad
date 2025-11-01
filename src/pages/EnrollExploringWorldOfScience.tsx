import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Users } from "lucide-react";
import { TeamInviteManager } from "@/components/invites/TeamInviteManager";
import { TeamMembersDisplay } from "@/components/team/TeamMembersDisplay";
import { useTranslation } from "react-i18next";

export default function EnrollExploringWorldOfSciencePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useTranslation();

  // Form state - only captain and team info
  const [teamName, setTeamName] = useState("");
  const [track, setTrack] = useState(""); // aslc, space_ai, rocket_science
  const [subtrack, setSubtrack] = useState(""); // for rocket_science only
  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);
  const [teamMembership, setTeamMembership] = useState<any>(null);
  const [showInviteForm, setShowInviteForm] = useState(false);

  // Captain info from profile
  const captainFullName = profile?.full_name || "";
  const captainEmail = user?.email || "";

  useEffect(() => {
    document.title = `${t('form.applicationTitle')} — Открываем Мир Науки`;
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = "Регистрация на международный конкурс Открываем Мир Науки 2026";
  }, [t]);

  // Check for existing enrollment and team membership
  useEffect(() => {
    const checkExisting = async () => {
      if (!user) return;

      // Check if user is a captain (has enrollment)
      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("competition_id", "exploring-world-of-science")
        .eq("status", "active")
        .maybeSingle();

      if (enrollmentData) {
        setExistingEnrollment(enrollmentData);
        setTeamName(enrollmentData.team_name || "");
        setTrack(enrollmentData.league || "");
        setSource(enrollmentData.source || "");
        setQuestions(enrollmentData.questions || "");
        setConsent(enrollmentData.consent || false);
        return;
      }

      // Check if user is a team member (invited participant)
      const { data: memberData } = await supabase
        .from("team_members")
        .select(`
          *,
          enrollments!inner (
            id,
            team_name,
            competition_id,
            league
          )
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .eq("enrollments.competition_id", "exploring-world-of-science")
        .eq("enrollments.status", "active")
        .maybeSingle();

      if (memberData) {
        setTeamMembership(memberData);
      }
    };

    checkExisting();
  }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile?.is_complete) {
      toast.error("Заполните профиль", {
        description: "Пожалуйста, заполните свой профиль перед регистрацией"
      });
      navigate("/dashboard");
      return;
    }

    if (!track) {
      toast.error("Выберите трек соревнования");
      return;
    }

    if (track === "rocket_science" && !subtrack) {
      toast.error("Выберите категорию ракет");
      return;
    }

    setSubmitting(true);

    try {
      const enrollmentData = {
        user_id: user!.id,
        competition_id: "exploring-world-of-science",
        team_name: teamName.trim(),
        league: track === "rocket_science" ? `${track}_${subtrack}` : track,
        captain_full_name: captainFullName,
        captain_iin: profile.iin,
        captain_phone: profile.phone,
        study_place: profile.school,
        city: profile.city,
        captain_grade: profile.grade?.toString(),
        captain_age: profile.age,
        email: captainEmail,
        telegram: profile.telegram,
        source: source.trim() || null,
        questions: questions.trim() || null,
        consent: consent,
        status: "active"
      };

      if (existingEnrollment) {
        // Update existing
        const { error } = await supabase
          .from("enrollments")
          .update(enrollmentData)
          .eq("id", existingEnrollment.id);

        if (error) throw error;
        toast.success("Заявка обновлена!");
      } else {
        // Create new
        const { data, error } = await supabase
          .from("enrollments")
          .insert(enrollmentData)
          .select()
          .single();

        if (error) {
          if (error.code === '23505') {
            toast.error("Вы уже зарегистрированы на это соревнование");
            navigate("/dashboard");
            return;
          }
          throw error;
        }

        // Create captain team_member entry
        await supabase
          .from("team_members")
          .insert({
            team_id: data.id,
            user_id: user!.id,
            role: 'captain',
            status: 'active',
            joined_at: new Date().toISOString()
          });

        setExistingEnrollment(data);
        toast.success("Команда создана!", {
          description: "Теперь пригласите участников по email"
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Ошибка регистрации", { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">{t('form.loginRequired')}</h2>
            <p className="text-muted-foreground mb-4">
              {t('form.loginDescription')}
            </p>
            <Button asChild>
              <Link to="/auth">{t('form.loginButton')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Team size limits by track
  const getMaxTeamSize = () => {
    if (track === "aslc") return 4;
    if (track === "space_ai") return 4;
    if (track === "rocket_science") return 2;
    return 4;
  };

  // If user is already a team member (not captain), show message
  if (teamMembership && !existingEnrollment) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-success/30 bg-success/5">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Вы уже в команде!</h2>
                <p className="text-muted-foreground mb-2">
                  Команда: <span className="font-semibold">{teamMembership.enrollments?.team_name}</span>
                </p>
                <p className="text-muted-foreground mb-6">
                  Трек: <span className="font-semibold">{teamMembership.enrollments?.league}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Вы являетесь участником команды. Для просмотра информации о команде и составе участников перейдите в личный кабинет.
                </p>
                <Button asChild>
                  <Link to="/dashboard">Перейти в личный кабинет</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">
                  {existingEnrollment ? "Управление командой" : "Регистрация команды"}
                </h1>
                <p className="text-muted-foreground">Открываем Мир Науки 2026</p>
              </div>
            </div>
          </div>

          {/* If team exists - show team management view */}
          {existingEnrollment ? (
            <div className="space-y-6">
              {/* Team Info Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Информация о команде</h3>
                    <div className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                      Зарегистрирована
                    </div>
                  </div>

                  {/* Editable Team Name */}
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Название команды</Label>
                    <div className="flex gap-2">
                      <Input
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Введите название команды"
                      />
                      <Button 
                        onClick={async () => {
                          if (!teamName.trim()) {
                            toast.error("Введите название команды");
                            return;
                          }
                          try {
                            const { error } = await supabase
                              .from("enrollments")
                              .update({ team_name: teamName.trim() })
                              .eq("id", existingEnrollment.id);
                            
                            if (error) throw error;
                            toast.success("Название обновлено");
                          } catch (error: any) {
                            toast.error("Ошибка обновления", { description: error.message });
                          }
                        }}
                        variant="outline"
                      >
                        Сохранить
                      </Button>
                    </div>
                  </div>

                  {/* Read-only info */}
                  <div className="space-y-3 pt-4 border-t">
                    <div>
                      <Label className="text-muted-foreground">Категория</Label>
                      <p className="text-sm font-medium mt-1">
                        {existingEnrollment.league === "aslc" && "🛰️ ASLC - Запуск спутников"}
                        {existingEnrollment.league === "space_ai" && "🤖 Space AI - Космический ИИ"}
                        {existingEnrollment.league === "rocket_science_water" && "🚀 Rocket Science - Водяные ракеты"}
                        {existingEnrollment.league === "rocket_science_model" && "🚀 Rocket Science - Модельные ракеты"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members List */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-success" />
                      <h3 className="text-lg font-semibold">Состав команды</h3>
                    </div>
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => setShowInviteForm(!showInviteForm)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {showInviteForm ? "Скрыть форму" : "Добавить участников"}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <TeamMembersDisplay teamId={existingEnrollment.id} canManage={true} />
                  </div>
                </CardContent>
              </Card>

              {/* Invite Form - shown on button click */}
              {showInviteForm && (
                <TeamInviteManager
                  teamId={existingEnrollment.id}
                  competitionId="exploring-world-of-science"
                  teamName={teamName}
                  maxTeamSize={getMaxTeamSize()}
                  currentTeamSize={1}
                />
              )}
            </div>
          ) : (
            /* Registration Form - Only for new teams */
            <form onSubmit={onSubmit} className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Team Name */}
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Название команды *</Label>
                    <Input
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Введите название команды"
                      required
                    />
                  </div>

                  {/* Track Selection */}
                  <div className="space-y-2">
                    <Label>Выбор категории *</Label>
                    <Select value={track} onValueChange={setTrack} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aslc">
                          <div className="flex items-center gap-2">
                            🛰️ ASLC - Запуск спутников
                          </div>
                        </SelectItem>
                        <SelectItem value="space_ai">
                          <div className="flex items-center gap-2">
                            🤖 Space AI - Космический ИИ
                          </div>
                        </SelectItem>
                        <SelectItem value="rocket_science">
                          <div className="flex items-center gap-2">
                            🚀 Rocket Science - Ракетостроение
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {track === "aslc" && "Ровно 4 участника (включая капитана) • 7-11 класс"}
                      {track === "space_ai" && "До 4 участников (включая капитана) • 7-11 класс"}
                      {track === "rocket_science" && "До 2 участников (включая капитана) • 7-11 класс"}
                    </p>
                  </div>

                  {/* Rocket Science Subtrack */}
                  {track === "rocket_science" && (
                    <div className="space-y-2">
                      <Label>Категория ракет *</Label>
                      <Select value={subtrack} onValueChange={setSubtrack} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="water">💧 Водяные ракеты</SelectItem>
                          <SelectItem value="model">🎯 Модельные ракеты</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Captain Info */}
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Капитан команды
                    </h3>
                    <p className="text-sm">{captainFullName}</p>
                    <p className="text-sm text-muted-foreground">{captainEmail}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard">Редактировать профиль</Link>
                    </Button>
                  </div>

                  {/* Source */}
                  <div className="space-y-2">
                    <Label htmlFor="source">Откуда узнали о мероприятии?</Label>
                    <Input
                      id="source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="Instagram, школа, друзья..."
                    />
                  </div>

                  {/* Questions */}
                  <div className="space-y-2">
                    <Label htmlFor="questions">Вопросы или комментарии</Label>
                    <Textarea
                      id="questions"
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      rows={3}
                      placeholder="Есть вопросы? Напишите здесь..."
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked as boolean)}
                      required
                    />
                    <Label htmlFor="consent" className="text-sm">
                      Я согласен с{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        условиями участия
                      </Link>{" "}
                      и обработкой персональных данных *
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    Создать команду
                  </Button>
                </CardContent>
              </Card>
            </form>
          )}

          {/* Team Management - Only shown after team is created */}
          {existingEnrollment && (
            <div className="mt-6">
              {/* Intentionally empty - team management is above */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
