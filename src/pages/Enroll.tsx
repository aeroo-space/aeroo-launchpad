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
  const { profile, refetch } = useProfile();
  const { t } = useTranslation();

  const competition = useMemo(() => competitions.find(c => c.id === competitionId), [competitionId]);
  // Use competition.status (i18n key) but don't rely on translations to determine openness
  const statusText = competition ? t(competition.status, { defaultValue: competition.status }) : "";
  const isOpen = (competition?.id === "space-settlement") ||
    statusText === t('competitions.statuses.registration', { defaultValue: 'Регистрация' }) ||
    /reg/i.test(statusText) || /регист/i.test(statusText);

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
  const [league, setLeague] = useState("");

  // Captain info (pre-filled from profile)
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainIin, setCaptainIin] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainSchool, setCaptainSchool] = useState("");
  const [captainCity, setCaptainCity] = useState("");
  const [captainGrade, setCaptainGrade] = useState("");
  const [captainTelegram, setCaptainTelegram] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainAge, setCaptainAge] = useState("");

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

  const [participant4FullName, setParticipant4FullName] = useState("");
  const [participant4Iin, setParticipant4Iin] = useState("");
  const [participant4Phone, setParticipant4Phone] = useState("");
  const [participant4School, setParticipant4School] = useState("");
  const [participant4City, setParticipant4City] = useState("");
  const [participant4Grade, setParticipant4Grade] = useState("");

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

  // Helper functions for input validation
  const handleDigitsOnlyChange = (value: string, setter: (value: string) => void) => {
    const digitsOnly = value.replace(/\D/g, '');
    setter(digitsOnly);
  };

  const handleTelegramChange = (value: string, setter: (value: string) => void) => {
    if (!value.startsWith('@') && value.length > 0) {
      setter('@' + value.replace(/^@+/, ''));
    } else {
      setter(value);
    }
  };

  // Pre-fill captain data from profile and update when profile changes
  useEffect(() => {
    if (profile) {
      setCaptainFullName(profile.full_name || "");
      setCaptainIin(profile.iin || "");
      setCaptainPhone(profile.phone || "");
      setCaptainSchool(profile.school || "");
      setCaptainCity(profile.city || "");
      setCaptainTelegram(profile.telegram || "");
      setCaptainGrade(profile.grade?.toString() || "");
      setCaptainAge(profile.age?.toString() || "");
    }
    if (user?.email) {
      setCaptainEmail(user.email);
    }
  }, [profile, user]);

  // Refetch profile when user comes to the page to ensure latest data
  useEffect(() => {
    if (user && refetch) {
      refetch();
    }
  }, [user, refetch]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitionId) return;
    if (!consent) {
      toast(t('form.toastConsentRequired'), { description: t('form.toastConsentDescription') });
      return;
    }

    // Captain is required (participant 1), others are optional
    if (!captainFullName.trim() || !captainIin.trim() || !captainPhone.trim() || !captainSchool.trim() || !captainCity.trim() || !captainGrade.trim()) {
      toast.error("Данные капитана команды (Участник 1) обязательны для заполнения");
      return;
    }

    // Captain age is mandatory
    if (!captainAge.trim()) {
      toast.error("Пожалуйста, укажите возраст капитана");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("enrollments").insert({
      user_id: user?.id,
      competition_id: competitionId,
      team_name: teamName,
      league: league,
      status: "active",

      // Captain info
      captain_full_name: captainFullName,
      captain_iin: captainIin,
      captain_phone: captainPhone,
      captain_grade: captainGrade,
      captain_age: parseInt(captainAge) || null,
      city: captainCity,
      study_place: captainSchool,
      email: captainEmail,
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

      participant4_full_name: participant4FullName,
      participant4_iin: participant4Iin,
      participant4_phone: participant4Phone,
      participant4_school: participant4School,
      participant4_city: participant4City,
      participant4_grade: participant4Grade,

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
        toast.error(t('form.toastSubmitError'), { description: error.message });
      }
      return;
    }
    toast.success(t('form.toastSubmitSuccess'));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <header className="container mx-auto px-4 pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/competitions" className="hover:underline">{t('form.breadcrumbCompetitions')}</Link>
            <span>/</span>
            <span>{t('form.breadcrumbApplication')}</span>
          </div>
        </header>

        <section className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('form.applicationTitle')}</h1>
            <p className="text-muted-foreground mb-6">
              {competition ? competition.title : "Выберите соревнование"}
            </p>
            {competition && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span>{t('form.statusLabel')} {statusText}</span>
              </div>
            )}
          </div>

          {!competition && (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                {t('form.competitionNotFound')} <Link to="/competitions" className="text-primary hover:underline">{t('form.breadcrumbCompetitions')}</Link>.
              </CardContent>
            </Card>
          )}

          {competition && !isOpen && (
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                <p className="text-foreground mb-4">{t('form.registrationNotOpen')}</p>
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
                <Label htmlFor="team">{t('form.teamName')}</Label>
                <Input
                  id="team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder={t('enroll.teamNamePlaceholder')}
                  required
                />
              </div>

              {/* League Selection */}
              <div className="space-y-2">
                <Label htmlFor="league">Лига *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="league"
                      value="junior"
                      checked={league === "junior"}
                      onChange={(e) => setLeague(e.target.value)}
                      className="text-primary"
                      required
                    />
                    <span>Младшая лига (7-9 классы)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="league"
                      value="senior"
                      checked={league === "senior"}
                      onChange={(e) => setLeague(e.target.value)}
                      className="text-primary"
                    />
                    <span>Старшая лига (10-12 классы)</span>
                  </label>
                </div>
              </div>

              {/* Participant 1 (Captain) */}
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Участник 1 (Капитан команды) *</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard">
                      Редактировать в профиле
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="captain-name">{t('form.fullName')} *</Label>
                    <Input
                      id="captain-name"
                      value={captainFullName}
                      placeholder={t('form.fullNamePlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-iin">{t('form.iin')} *</Label>
                    <Input
                      id="captain-iin"
                      value={captainIin}
                      placeholder={t('form.iinPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-phone">{t('form.phone')} *</Label>
                    <Input
                      id="captain-phone"
                      value={captainPhone}
                      placeholder={t('form.phonePlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-school">{t('form.school')} *</Label>
                    <Input
                      id="captain-school"
                      value={captainSchool}
                      placeholder={t('form.schoolPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-city">{t('form.city')}</Label>
                    <Input
                      id="captain-city"
                      value={captainCity}
                      placeholder={t('form.cityPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-grade">{t('form.grade')} *</Label>
                    <Input
                      id="captain-grade"
                      value={captainGrade}
                      placeholder={t('form.gradePlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-email">Email *</Label>
                    <Input
                      id="captain-email"
                      value={captainEmail}
                      placeholder="example@email.com"
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-telegram">Telegram *</Label>
                    <Input
                      id="captain-telegram"
                      value={captainTelegram}
                      placeholder={t('form.telegramPlaceholder')}
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain-age">Возраст капитана *</Label>
                    <Input
                      id="captain-age"
                      value={captainAge}
                      placeholder="Введите возраст"
                      readOnly
                      className="bg-muted-foreground/10"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Participants (Optional) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Дополнительные участники (необязательно)</h3>

                {/* Participant 1 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 2</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant1FullName}
                        onChange={(e) => setParticipant1FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant1Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant1Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.phone')}</Label>
                      <Input
                        value={participant1Phone}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant1Phone)}
                        placeholder={t('form.phonePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant1School}
                        onChange={(e) => setParticipant1School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant1City}
                        onChange={(e) => setParticipant1City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant1Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant1Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                {/* Participant 2 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 3</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant2FullName}
                        onChange={(e) => setParticipant2FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant2Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant2Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.phone')}</Label>
                      <Input
                        value={participant2Phone}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant2Phone)}
                        placeholder={t('form.phonePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant2School}
                        onChange={(e) => setParticipant2School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant2City}
                        onChange={(e) => setParticipant2City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant2Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant2Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                {/* Participant 3 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 4</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant3FullName}
                        onChange={(e) => setParticipant3FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant3Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant3Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.phone')}</Label>
                      <Input
                        value={participant3Phone}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant3Phone)}
                        placeholder={t('form.phonePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant3School}
                        onChange={(e) => setParticipant3School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant3City}
                        onChange={(e) => setParticipant3City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant3Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant3Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                {/* Participant 4 */}
                <div className="bg-muted rounded-lg p-4 space-y-4 shadow-sm">
                  <h4 className="font-medium">Участник 5</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('form.fullName')}</Label>
                      <Input
                        value={participant4FullName}
                        onChange={(e) => setParticipant4FullName(e.target.value)}
                        placeholder={t('form.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.iin')}</Label>
                      <Input
                        value={participant4Iin}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant4Iin)}
                        placeholder={t('form.iinPlaceholder')}
                        maxLength={12}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.phone')}</Label>
                      <Input
                        value={participant4Phone}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant4Phone)}
                        placeholder={t('form.phonePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.school')}</Label>
                      <Input
                        value={participant4School}
                        onChange={(e) => setParticipant4School(e.target.value)}
                        placeholder={t('form.schoolPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.city')}</Label>
                      <Input
                        value={participant4City}
                        onChange={(e) => setParticipant4City(e.target.value)}
                        placeholder={t('form.cityPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('form.grade')}</Label>
                      <Input
                        value={participant4Grade}
                        onChange={(e) => handleDigitsOnlyChange(e.target.value, setParticipant4Grade)}
                        placeholder={t('form.gradePlaceholder')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mentor */}
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold">{t('form.mentor')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('form.fullName')}</Label>
                    <Input
                      value={mentorFullName}
                      onChange={(e) => setMentorFullName(e.target.value)}
                      placeholder={t('form.fullNamePlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.iin')}</Label>
                    <Input
                      value={mentorIin}
                      onChange={(e) => handleDigitsOnlyChange(e.target.value, setMentorIin)}
                      placeholder={t('form.iinPlaceholder')}
                      maxLength={12}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.phone')}</Label>
                    <Input
                      value={mentorPhone}
                      onChange={(e) => handleDigitsOnlyChange(e.target.value, setMentorPhone)}
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.school')}</Label>
                    <Input
                      value={mentorSchool}
                      onChange={(e) => setMentorSchool(e.target.value)}
                      placeholder={t('form.schoolPlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('form.city')}</Label>
                    <Input
                      value={mentorCity}
                      onChange={(e) => setMentorCity(e.target.value)}
                      placeholder={t('form.cityPlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telegram</Label>
                    <Input
                      value={mentorTelegram}
                      onChange={(e) => handleTelegramChange(e.target.value, setMentorTelegram)}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Source and Consent */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('form.questions')}</Label>
                  <Input
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder={t('form.questionsPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('form.source')}</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('enroll.selectSource')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram_aeroo">{t('form.sourceInstagramKaz')}</SelectItem>
                      <SelectItem value="instagram_other">{t('form.sourceInstagramOther')}</SelectItem>
                      <SelectItem value="telegram">{t('form.sourceTelegram')}</SelectItem>
                      <SelectItem value="friends">{t('form.sourceFriends')}</SelectItem>
                      <SelectItem value="other">{t('form.sourceOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                  <Label htmlFor="consent" className="leading-snug">
                    {t('form.consent')} *
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  submitting ||
                  !teamName || !league || !captainFullName || !captainIin || !captainPhone || !captainSchool ||
                  !captainCity || !captainGrade || !captainTelegram || !captainAge ||
                  !source || !consent
                }
              >
                {submitting ? t('form.sending') : t('form.submit')}
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
