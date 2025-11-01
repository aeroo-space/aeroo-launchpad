import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { CalendarDays } from "lucide-react";
import { TeamInviteManager } from "@/components/invites/TeamInviteManager";
import { TeamMembersDisplay } from "@/components/team/TeamMembersDisplay";

export default function EnrollSimplifiedPage() {
  const { competitionId } = useParams<{ competitionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();

  // Form state - only captain info
  const [teamName, setTeamName] = useState("");
  const [league, setLeague] = useState("");
  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);

  // Captain info from profile
  const captainFullName = profile?.full_name || "";
  const captainEmail = user?.email || "";

  useEffect(() => {
    document.title = `Регистрация — ${competitionId}`;
  }, [competitionId]);

  // Check for existing enrollment
  useEffect(() => {
    const checkExisting = async () => {
      if (!user || !competitionId) return;

      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("competition_id", competitionId)
        .eq("status", "active")
        .maybeSingle();

      if (data) {
        setExistingEnrollment(data);
        setTeamName(data.team_name || "");
        setLeague(data.league || "");
        setSource(data.source || "");
        setQuestions(data.questions || "");
        setConsent(data.consent || false);
      }
    };

    checkExisting();
  }, [user, competitionId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitionId) return;

    if (!profile?.is_complete) {
      toast.error("Заполните профиль", {
        description: "Пожалуйста, заполните свой профиль перед регистрацией"
      });
      navigate("/dashboard");
      return;
    }

    setSubmitting(true);

    try {
      const enrollmentData = {
        user_id: user!.id,
        competition_id: competitionId,
        team_name: teamName.trim(),
        league: league || null,
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
            toast.error("Вы уже зарегистрированы");
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
        toast.success("Команда создана! Теперь пригласите участников.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Ошибка", { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Требуется вход</h2>
            <p className="text-muted-foreground mb-4">
              Войдите или зарегистрируйтесь для участия
            </p>
            <Button asChild>
              <Link to="/auth">Войти</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Регистрация команды</h1>
                <p className="text-muted-foreground">{competitionId}</p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
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

                <div className="space-y-2">
                  <Label>Лига</Label>
                  <Select value={league} onValueChange={setLeague}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите лигу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior (7-9 класс)</SelectItem>
                      <SelectItem value="senior">Senior (10-11 класс)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold">Капитан команды</h3>
                  <p className="text-sm">{captainFullName}</p>
                  <p className="text-sm text-muted-foreground">{captainEmail}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard">Редактировать профиль</Link>
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Откуда узнали о мероприятии?</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questions">Вопросы или комментарии</Label>
                  <Textarea
                    id="questions"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    required
                  />
                  <Label htmlFor="consent" className="text-sm">
                    Я согласен с обработкой персональных данных *
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {existingEnrollment ? "Обновить заявку" : "Создать команду"}
                </Button>
              </CardContent>
            </Card>
          </form>

          {existingEnrollment && (
            <div className="mt-6 space-y-6">
              <TeamMembersDisplay teamId={existingEnrollment.id} canManage={true} />
              <TeamInviteManager
                teamId={existingEnrollment.id}
                competitionId={competitionId!}
                teamName={teamName}
                maxTeamSize={6}
                currentTeamSize={1}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
