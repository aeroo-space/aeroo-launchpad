import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { competitions } from "@/data/competitions";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EnrollPage() {
  const { competitionId } = useParams<{ competitionId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useTranslation();

  const competition = useMemo(() => competitions.find(c => c.id === competitionId), [competitionId]);
  const isOpen = competition?.status === "Регистрация";

  // SEO
  useEffect(() => {
    const title = competition
      ? `Заявка — ${competition.title}`
      : "Заявка на участие — AEROO";
    document.title = title;
    const metaDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement) || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = competition
      ? `Подача заявки на участие: ${competition.title}. Заполните форму команды и подтвердите согласие.`
      : "Подача заявки на участие в соревнованиях AEROO.";
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + `/enroll/${competitionId ?? ''}`;
  }, [competition, competitionId]);

  // Form state
  const [teamName, setTeamName] = useState("");

  // Captain info (pre-filled from profile)
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainIin, setCaptainIin] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainSchool, setCaptainSchool] = useState("");
  const [captainCity, setCaptainCity] = useState("");
  const [captainGrade, setCaptainGrade] = useState("");
  const [captainTelegram, setCaptainTelegram] = useState("");

  // Participants
  const [participant1FullName, setParticipant1FullName] = useState("");
  const [participant1Iin, setParticipant1Iin] = useState("");
  const [participant1Phone, setParticipant1Phone] = useState("");
  const [participant1School, setParticipant1School] = useState("");
  const [participant1City, setParticipant1City] = useState("");
  const [participant1Grade, setParticipant1Grade] = useState("");

  const [participant2FullName, setParticipant2FullName] = useState("");
  const [participant2Iin, setParticipant2Iin] = useState("");
  const [participant2Phone, setParticipant2Phone] = useState("");
  const [participant2School, setParticipant2School] = useState("");
  const [participant2City, setParticipant2City] = useState("");
  const [participant2Grade, setParticipant2Grade] = useState("");

  const [participant3FullName, setParticipant3FullName] = useState("");
  const [participant3Iin, setParticipant3Iin] = useState("");
  const [participant3Phone, setParticipant3Phone] = useState("");
  const [participant3School, setParticipant3School] = useState("");
  const [participant3City, setParticipant3City] = useState("");
  const [participant3Grade, setParticipant3Grade] = useState("");

  // Mentor
  const [mentorFullName, setMentorFullName] = useState("");
  const [mentorIin, setMentorIin] = useState("");
  const [mentorPhone, setMentorPhone] = useState("");
  const [mentorSchool, setMentorSchool] = useState("");
  const [mentorCity, setMentorCity] = useState("");
  const [mentorTelegram, setMentorTelegram] = useState("");

  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [dupOpen, setDupOpen] = useState(false);
  const [dupName, setDupName] = useState("");

  // Pre-fill captain data from profile
  useEffect(() => {
    if (profile) {
      if (!captainFullName && profile.full_name) setCaptainFullName(profile.full_name);
      if (!captainIin && profile.iin) setCaptainIin(profile.iin);
      if (!captainPhone && profile.phone) setCaptainPhone(profile.phone);
      if (!captainSchool && profile.school) setCaptainSchool(profile.school);
      if (!captainCity && profile.city) setCaptainCity(profile.city);
      if (!captainTelegram && profile.telegram) setCaptainTelegram(profile.telegram);
    }
  }, [profile]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitionId) return;
    if (!consent) {
      toast("Нужно согласие", { description: "Подтвердите согласие с правилами" });
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("enrollments").insert({
      user_id: user?.id,
      competition_id: competitionId,
      team_name: teamName,
      status: "active",

      // Captain info
      captain_full_name: captainFullName,
      captain_iin: captainIin,
      captain_phone: captainPhone,
      captain_grade: captainGrade,
      city: captainCity,
      study_place: captainSchool,
      telegram: captainTelegram,

      // Participants
      participant1_full_name: participant1FullName,
      participant1_iin: participant1Iin,
      participant1_phone: participant1Phone,
      participant1_school: participant1School,
      participant1_city: participant1City,
      participant1_grade: participant1Grade,

      participant2_full_name: participant2FullName,
      participant2_iin: participant2Iin,
      participant2_phone: participant2Phone,
      participant2_school: participant2School,
      participant2_city: participant2City,
      participant2_grade: participant2Grade,

      participant3_full_name: participant3FullName,
      participant3_iin: participant3Iin,
      participant3_phone: participant3Phone,
      participant3_school: participant3School,
      participant3_city: participant3City,
      participant3_grade: participant3Grade,

      // Mentor
      mentor_full_name: mentorFullName,
      mentor_iin: mentorIin,
      mentor_phone: mentorPhone,
      mentor_school: mentorSchool,
      mentor_city: mentorCity,
      mentor_telegram: mentorTelegram,

      source,
      questions,
      consent,
    });

    setSubmitting(false);
    if (error) {
      if (error.code === "23505") {
        const compName = competition?.title || competitionId;
        setDupName(compName);
        setDupOpen(true);
      } else {
        toast.error("Ошибка при отправке", { description: error.message });
      }
      return;
    }
    toast.success("Заявка отправлена");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <header className="container mx-auto px-4 pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/competitions" className="hover:underline">Соревнования</Link>
            <span>/</span>
            <span>Заявка</span>
          </div>
        </header>

        <section className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Заявка на участие</h1>
            <p className="text-muted-foreground mb-6">
              {competition ? competition.title : "Выберите соревнование"}
            </p>
            {competition && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>Статус: {competition.status}</span>
              </div>
            )}
          </div>

          {!competition && (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                Соревнование не найдено. Вернуться к списку — <Link to="/competitions" className="text-primary hover:underline">Соревнования</Link>.
              </CardContent>
            </Card>
          )}

          {competition && !isOpen && (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                <p className="text-foreground mb-4">Регистрация пока не открыта. Следите за новостями.</p>
                <div className="flex gap-3">
                  <Button asChild variant="outline"><Link to={`/competitions/${competition.id === 'satellite-launch' ? 'satellite-launch-2026' : ''}` || "/competitions"}>Подробнее</Link></Button>
                  <Button asChild><Link to="/competitions">К списку соревнований</Link></Button>
                </div>
              </CardContent>
            </Card>
          )}

          {competition && isOpen && (
            <form onSubmit={onSubmit} className="max-w-4xl space-y-6">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="team">Название команды *</Label>
                <Input
                  id="team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Например: AEROO Crew"
                  required
                />
              </div>

              {/* Captain Info */}
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold">Капитан команды</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="captain-name">ФИО *</Label>
                    <Input
                      id="captain-name"
                      value={captainFullName}
                      onChange={(e) => setCaptainFullName(e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-iin">ИИН *</Label>
                    <Input
                      id="captain-iin"
                      value={captainIin}
                      onChange={(e) => setCaptainIin(e.target.value)}
                      placeholder="123456789012"
                      maxLength={12}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-phone">Телефон *</Label>
                    <Input
                      id="captain-phone"
                      value={captainPhone}
                      onChange={(e) => setCaptainPhone(e.target.value)}
                      placeholder="+7 700 000 00 00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-school">Учебное заведение *</Label>
                    <Input
                      id="captain-school"
                      value={captainSchool}
                      onChange={(e) => setCaptainSchool(e.target.value)}
                      placeholder="Название школы/ВУЗа"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-city">Город *</Label>
                    <Input
                      id="captain-city"
                      value={captainCity}
                      onChange={(e) => setCaptainCity(e.target.value)}
                      placeholder="Алматы"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-grade">Класс обучения *</Label>
                    <Input
                      id="captain-grade"
                      value={captainGrade}
                      onChange={(e) => setCaptainGrade(e.target.value)}
                      placeholder="11 класс"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="captain-telegram">Telegram *</Label>
                    <Input
                      id="captain-telegram"
                      value={captainTelegram}
                      onChange={(e) => setCaptainTelegram(e.target.value)}
                      placeholder="@username"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Участники команды</h3>

                {/* Participant 1 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 1 *</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ФИО *</Label>
                      <Input
                        value={participant1FullName}
                        onChange={(e) => setParticipant1FullName(e.target.value)}
                        placeholder="Иванов Иван Иванович"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ИИН *</Label>
                      <Input
                        value={participant1Iin}
                        onChange={(e) => setParticipant1Iin(e.target.value)}
                        placeholder="123456789012"
                        maxLength={12}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон *</Label>
                      <Input
                        value={participant1Phone}
                        onChange={(e) => setParticipant1Phone(e.target.value)}
                        placeholder="+7 700 000 00 00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Учебное заведение *</Label>
                      <Input
                        value={participant1School}
                        onChange={(e) => setParticipant1School(e.target.value)}
                        placeholder="Название школы/ВУЗа"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Город *</Label>
                      <Input
                        value={participant1City}
                        onChange={(e) => setParticipant1City(e.target.value)}
                        placeholder="Алматы"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Класс обучения *</Label>
                      <Input
                        value={participant1Grade}
                        onChange={(e) => setParticipant1Grade(e.target.value)}
                        placeholder="11 класс"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Participant 2 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 2 *</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ФИО *</Label>
                      <Input
                        value={participant2FullName}
                        onChange={(e) => setParticipant2FullName(e.target.value)}
                        placeholder="Иванов Иван Иванович"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ИИН *</Label>
                      <Input
                        value={participant2Iin}
                        onChange={(e) => setParticipant2Iin(e.target.value)}
                        placeholder="123456789012"
                        maxLength={12}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон *</Label>
                      <Input
                        value={participant2Phone}
                        onChange={(e) => setParticipant2Phone(e.target.value)}
                        placeholder="+7 700 000 00 00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Учебное заведение *</Label>
                      <Input
                        value={participant2School}
                        onChange={(e) => setParticipant2School(e.target.value)}
                        placeholder="Название школы/ВУЗа"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Город *</Label>
                      <Input
                        value={participant2City}
                        onChange={(e) => setParticipant2City(e.target.value)}
                        placeholder="Алматы"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Класс обучения *</Label>
                      <Input
                        value={participant2Grade}
                        onChange={(e) => setParticipant2Grade(e.target.value)}
                        placeholder="11 класс"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Participant 3 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 3 *</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ФИО *</Label>
                      <Input
                        value={participant3FullName}
                        onChange={(e) => setParticipant3FullName(e.target.value)}
                        placeholder="Иванов Иван Иванович"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ИИН *</Label>
                      <Input
                        value={participant3Iin}
                        onChange={(e) => setParticipant3Iin(e.target.value)}
                        placeholder="123456789012"
                        maxLength={12}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон *</Label>
                      <Input
                        value={participant3Phone}
                        onChange={(e) => setParticipant3Phone(e.target.value)}
                        placeholder="+7 700 000 00 00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Учебное заведение *</Label>
                      <Input
                        value={participant3School}
                        onChange={(e) => setParticipant3School(e.target.value)}
                        placeholder="Название школы/ВУЗа"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Город *</Label>
                      <Input
                        value={participant3City}
                        onChange={(e) => setParticipant3City(e.target.value)}
                        placeholder="Алматы"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Класс обучения *</Label>
                      <Input
                        value={participant3Grade}
                        onChange={(e) => setParticipant3Grade(e.target.value)}
                        placeholder="11 класс"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mentor */}
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold">Наставник команды</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ФИО *</Label>
                    <Input
                      value={mentorFullName}
                      onChange={(e) => setMentorFullName(e.target.value)}
                      placeholder="Иванов Иван Иванович"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ИИН *</Label>
                    <Input
                      value={mentorIin}
                      onChange={(e) => setMentorIin(e.target.value)}
                      placeholder="123456789012"
                      maxLength={12}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Телефон *</Label>
                    <Input
                      value={mentorPhone}
                      onChange={(e) => setMentorPhone(e.target.value)}
                      placeholder="+7 700 000 00 00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Название учебного заведения *</Label>
                    <Input
                      value={mentorSchool}
                      onChange={(e) => setMentorSchool(e.target.value)}
                      placeholder="Название школы/ВУЗа"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Город *</Label>
                    <Input
                      value={mentorCity}
                      onChange={(e) => setMentorCity(e.target.value)}
                      placeholder="Алматы"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telegram *</Label>
                    <Input
                      value={mentorTelegram}
                      onChange={(e) => setMentorTelegram(e.target.value)}
                      placeholder="@username"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Source and Consent */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Вопросы или дополнительная информация</Label>
                  <Input
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder="Ваши вопросы к организаторам..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Откуда узнали о соревновании? *</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите источник" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram_kazrockets">Instagram @kazrockets</SelectItem>
                      <SelectItem value="instagram_other">Другие Instagram аккаунты</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="friends">Друзья/знакомые</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                  <Label htmlFor="consent" className="leading-snug">
                    Я согласен(а) с правилами соревнования и обработкой персональных данных *
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  submitting ||
                  !teamName || !captainFullName || !captainIin || !captainPhone || !captainSchool ||
                  !captainCity || !captainGrade || !captainTelegram ||
                  !participant1FullName || !participant1Iin || !participant1Phone || !participant1School ||
                  !participant1City || !participant1Grade ||
                  !participant2FullName || !participant2Iin || !participant2Phone || !participant2School ||
                  !participant2City || !participant2Grade ||
                  !participant3FullName || !participant3Iin || !participant3Phone || !participant3School ||
                  !participant3City || !participant3Grade ||
                  !mentorFullName || !mentorIin || !mentorPhone || !mentorSchool ||
                  !mentorCity || !mentorTelegram ||
                  !source || !consent
                }
              >
                {submitting ? "Отправка..." : "Подать заявку"}
              </Button>
            </form>
          )}
        </section>

        {/* Duplicate registration notice */}
        <AlertDialog open={dupOpen} onOpenChange={setDupOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">Вы уже зарегистрированы</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Вы уже зарегистрированы на «{dupName}». Запись доступна в личном кабинете на странице «Мои регистрации».
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogCancel>Закрыть</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link to="/dashboard">Перейти в личный кабинет</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer />
    </div>
  );
}
