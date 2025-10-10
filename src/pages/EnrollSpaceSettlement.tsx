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
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EnrollSpaceSettlementPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useTranslation();

  // Form state
  const [teamName, setTeamName] = useState("");
  const [league, setLeague] = useState(""); // Junior or Senior
  const [teamMemberCount, setTeamMemberCount] = useState<number | null>(null);

  // Captain info
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainIin, setCaptainIin] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainSchool, setCaptainSchool] = useState("");
  const [captainCity, setCaptainCity] = useState("");
  const [captainGrade, setCaptainGrade] = useState("");
  const [captainTelegram, setCaptainTelegram] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");

  // Participants (up to 4 additional members)
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

  const [source, setSource] = useState("");
  const [questions, setQuestions] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Helper functions
  const handlePhoneChange = (value: string, setter: (value: string) => void) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length > 0) {
      if (digits.startsWith('7') && digits.length >= 11) {
        formatted = '+7';
        if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
        if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
        if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
        if (digits.length > 9) formatted += ' ' + digits.slice(9, 11);
      } else if (digits.startsWith('8') && digits.length === 11) {
        const withoutEight = digits.slice(1);
        formatted = '+7 ' + withoutEight.slice(0, 3) + ' ' + withoutEight.slice(3, 6) + ' ' + withoutEight.slice(6, 8) + ' ' + withoutEight.slice(8, 10);
      } else if (digits.startsWith('7')) {
        formatted = '+7';
        if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
        if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
        if (digits.length > 7) formatted += ' ' + digits.slice(7, 9);
        if (digits.length > 9) formatted += ' ' + digits.slice(9, 11);
      } else {
        formatted = '+7';
        if (digits.length > 0) formatted += ' ' + digits.slice(0, 3);
        if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
        if (digits.length > 6) formatted += ' ' + digits.slice(6, 8);
        if (digits.length > 8) formatted += ' ' + digits.slice(8, 10);
      }
    }
    setter(formatted);
  };

  const handleTelegramChange = (value: string, setter: (value: string) => void) => {
    if (!value.startsWith('@') && value.length > 0) {
      setter('@' + value.replace(/^@+/, ''));
    } else {
      setter(value);
    }
  };

  // Pre-fill from profile
  useEffect(() => {
    if (profile) {
      setCaptainFullName(profile.full_name || "");
      setCaptainIin(profile.iin || "");
      setCaptainPhone(profile.phone || "");
      setCaptainSchool(profile.school || "");
      setCaptainCity(profile.city || "");
      setCaptainTelegram(profile.telegram || "");
      setCaptainGrade(profile.grade?.toString() || "");
    }
    if (user?.email) {
      setCaptainEmail(user.email);
    }
  }, [profile, user]);

  // SEO
  useEffect(() => {
    document.title = `${t('form.applicationTitle')} — Space Settlement 2025`;
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDesc.content = "Подача заявки на участие: Space Settlement 2025. Заполните форму команды.";
  }, [t]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast(t('form.toastConsentRequired'), { description: t('form.toastConsentDescription') });
      return;
    }

    const validationErrors: string[] = [];
    
    if (!teamName.trim()) validationErrors.push("Название команды");
    if (!league.trim()) validationErrors.push("Лига (Младшая/Старшая)");
    if (teamMemberCount === null) validationErrors.push("Количество участников команды");
    if (!captainFullName.trim()) validationErrors.push("ФИО капитана");
    if (!captainIin.trim()) validationErrors.push("ИИН капитана");
    else if (captainIin.length !== 12 || !/^\d{12}$/.test(captainIin)) {
      validationErrors.push("ИИН капитана должен содержать 12 цифр");
    }
    if (!captainPhone.trim()) validationErrors.push("Телефон капитана");
    if (!captainSchool.trim()) validationErrors.push("Школа капитана");
    if (!captainCity.trim()) validationErrors.push("Город капитана");
    if (!captainGrade.trim()) validationErrors.push("Класс капитана");

    // Validate participants based on team member count
    if (teamMemberCount && teamMemberCount >= 2) {
      if (!participant1FullName.trim()) validationErrors.push("ФИО участника 1");
      if (!participant1Iin.trim()) validationErrors.push("ИИН участника 1");
      else if (participant1Iin.length !== 12 || !/^\d{12}$/.test(participant1Iin)) {
        validationErrors.push("ИИН участника 1 должен содержать 12 цифр");
      }
      if (!participant1Phone.trim()) validationErrors.push("Телефон участника 1");
      if (!participant1School.trim()) validationErrors.push("Школа участника 1");
      if (!participant1City.trim()) validationErrors.push("Город участника 1");
      if (!participant1Grade.trim()) validationErrors.push("Класс участника 1");
    }

    if (teamMemberCount && teamMemberCount >= 3) {
      if (!participant2FullName.trim()) validationErrors.push("ФИО участника 2");
      if (!participant2Iin.trim()) validationErrors.push("ИИН участника 2");
      else if (participant2Iin.length !== 12 || !/^\d{12}$/.test(participant2Iin)) {
        validationErrors.push("ИИН участника 2 должен содержать 12 цифр");
      }
      if (!participant2Phone.trim()) validationErrors.push("Телефон участника 2");
      if (!participant2School.trim()) validationErrors.push("Школа участника 2");
      if (!participant2City.trim()) validationErrors.push("Город участника 2");
      if (!participant2Grade.trim()) validationErrors.push("Класс участника 2");
    }

    if (teamMemberCount && teamMemberCount >= 4) {
      if (!participant3FullName.trim()) validationErrors.push("ФИО участника 3");
      if (!participant3Iin.trim()) validationErrors.push("ИИН участника 3");
      else if (participant3Iin.length !== 12 || !/^\d{12}$/.test(participant3Iin)) {
        validationErrors.push("ИИН участника 3 должен содержать 12 цифр");
      }
      if (!participant3Phone.trim()) validationErrors.push("Телефон участника 3");
      if (!participant3School.trim()) validationErrors.push("Школа участника 3");
      if (!participant3City.trim()) validationErrors.push("Город участника 3");
      if (!participant3Grade.trim()) validationErrors.push("Класс участника 3");
    }

    if (teamMemberCount && teamMemberCount >= 5) {
      if (!participant4FullName.trim()) validationErrors.push("ФИО участника 4");
      if (!participant4Iin.trim()) validationErrors.push("ИИН участника 4");
      else if (participant4Iin.length !== 12 || !/^\d{12}$/.test(participant4Iin)) {
        validationErrors.push("ИИН участника 4 должен содержать 12 цифр");
      }
      if (!participant4Phone.trim()) validationErrors.push("Телефон участника 4");
      if (!participant4School.trim()) validationErrors.push("Школа участника 4");
      if (!participant4City.trim()) validationErrors.push("Город участника 4");
      if (!participant4Grade.trim()) validationErrors.push("Класс участника 4");
    }

    if (validationErrors.length > 0) {
      toast.error("Заполните все обязательные поля", {
        description: validationErrors.join(", ")
      });
      return;
    }

    setSubmitting(true);

    try {
      const enrollmentData: any = {
        user_id: user!.id,
        competition_id: "space-settlement",
        team_name: teamName.trim(),
        league: league,
        captain_full_name: captainFullName.trim(),
        captain_iin: captainIin.trim(),
        captain_phone: captainPhone.trim(),
        study_place: captainSchool.trim(),
        city: captainCity.trim(),
        captain_grade: captainGrade.trim(),
        email: captainEmail.trim(),
        telegram: captainTelegram.trim(),
        source: source.trim(),
        questions: questions.trim(),
        consent: consent,
        status: "active"
      };

      // Add participant data if team has more than 1 member
      if (teamMemberCount && teamMemberCount >= 2) {
        enrollmentData.participant1_full_name = participant1FullName.trim();
        enrollmentData.participant1_iin = participant1Iin.trim();
        enrollmentData.participant1_phone = participant1Phone.trim();
        enrollmentData.participant1_school = participant1School.trim();
        enrollmentData.participant1_city = participant1City.trim();
        enrollmentData.participant1_grade = participant1Grade.trim();
      }

      if (teamMemberCount && teamMemberCount >= 3) {
        enrollmentData.participant2_full_name = participant2FullName.trim();
        enrollmentData.participant2_iin = participant2Iin.trim();
        enrollmentData.participant2_phone = participant2Phone.trim();
        enrollmentData.participant2_school = participant2School.trim();
        enrollmentData.participant2_city = participant2City.trim();
        enrollmentData.participant2_grade = participant2Grade.trim();
      }

      if (teamMemberCount && teamMemberCount >= 4) {
        enrollmentData.participant3_full_name = participant3FullName.trim();
        enrollmentData.participant3_iin = participant3Iin.trim();
        enrollmentData.participant3_phone = participant3Phone.trim();
        enrollmentData.participant3_school = participant3School.trim();
        enrollmentData.participant3_city = participant3City.trim();
        enrollmentData.participant3_grade = participant3Grade.trim();
      }

      if (teamMemberCount && teamMemberCount >= 5) {
        enrollmentData.participant4_full_name = participant4FullName.trim();
        enrollmentData.participant4_iin = participant4Iin.trim();
        enrollmentData.participant4_phone = participant4Phone.trim();
        enrollmentData.participant4_school = participant4School.trim();
        enrollmentData.participant4_city = participant4City.trim();
        enrollmentData.participant4_grade = participant4Grade.trim();
      }

      const { data, error } = await supabase
        .from("enrollments")
        .insert(enrollmentData)
        .select()
        .single();

      if (error) throw error;

      toast.success("Заявка успешно отправлена!", {
        description: "Мы свяжемся с вами в ближайшее время."
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Ошибка при отправке заявки", {
        description: error.message
      });
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
            <p className="text-muted-foreground mb-4">{t('form.loginDescription')}</p>
            <Button asChild>
              <Link to="/auth">{t('form.loginButton')}</Link>
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
            <h1 className="text-3xl font-bold mb-2">Space Settlement 2025</h1>
            <p className="text-muted-foreground">Заполните форму для регистрации на соревнование</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            {/* Team Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Информация о команде</h2>
                
                <div>
                  <Label htmlFor="teamName">Название команды *</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="league">Лига *</Label>
                  <Select value={league} onValueChange={setLeague} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите лигу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Младшая лига</SelectItem>
                      <SelectItem value="senior">Старшая лига</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="teamMemberCount">Количество участников команды *</Label>
                  <Select 
                    value={teamMemberCount?.toString() || ""} 
                    onValueChange={(value) => setTeamMemberCount(parseInt(value))} 
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите количество участников" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 участник (только капитан)</SelectItem>
                      <SelectItem value="2">2 участника</SelectItem>
                      <SelectItem value="3">3 участника</SelectItem>
                      <SelectItem value="4">4 участника</SelectItem>
                      <SelectItem value="5">5 участников</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Captain Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Информация о капитане</h2>
                
                <div>
                  <Label htmlFor="captainFullName">ФИО капитана *</Label>
                  <Input
                    id="captainFullName"
                    value={captainFullName}
                    onChange={(e) => setCaptainFullName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainIin">ИИН капитана *</Label>
                  <Input
                    id="captainIin"
                    value={captainIin}
                    onChange={(e) => setCaptainIin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    maxLength={12}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainPhone">Телефон капитана *</Label>
                  <Input
                    id="captainPhone"
                    value={captainPhone}
                    onChange={(e) => handlePhoneChange(e.target.value, setCaptainPhone)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainSchool">Школа капитана *</Label>
                  <Input
                    id="captainSchool"
                    value={captainSchool}
                    onChange={(e) => setCaptainSchool(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainCity">Город капитана *</Label>
                  <Input
                    id="captainCity"
                    value={captainCity}
                    onChange={(e) => setCaptainCity(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainGrade">Класс капитана *</Label>
                  <Input
                    id="captainGrade"
                    value={captainGrade}
                    onChange={(e) => setCaptainGrade(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainEmail">Email капитана *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={captainEmail}
                    onChange={(e) => setCaptainEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="captainTelegram">Telegram капитана</Label>
                  <Input
                    id="captainTelegram"
                    value={captainTelegram}
                    onChange={(e) => handleTelegramChange(e.target.value, setCaptainTelegram)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Participant 1 */}
            {teamMemberCount && teamMemberCount >= 2 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Участник 1</h2>
                  
                  <div>
                    <Label htmlFor="participant1FullName">ФИО участника 1 *</Label>
                    <Input
                      id="participant1FullName"
                      value={participant1FullName}
                      onChange={(e) => setParticipant1FullName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant1Iin">ИИН участника 1 *</Label>
                    <Input
                      id="participant1Iin"
                      value={participant1Iin}
                      onChange={(e) => setParticipant1Iin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant1Phone">Телефон участника 1 *</Label>
                    <Input
                      id="participant1Phone"
                      value={participant1Phone}
                      onChange={(e) => handlePhoneChange(e.target.value, setParticipant1Phone)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant1School">Школа участника 1 *</Label>
                    <Input
                      id="participant1School"
                      value={participant1School}
                      onChange={(e) => setParticipant1School(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant1City">Город участника 1 *</Label>
                    <Input
                      id="participant1City"
                      value={participant1City}
                      onChange={(e) => setParticipant1City(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant1Grade">Класс участника 1 *</Label>
                    <Input
                      id="participant1Grade"
                      value={participant1Grade}
                      onChange={(e) => setParticipant1Grade(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participant 2 */}
            {teamMemberCount && teamMemberCount >= 3 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Участник 2</h2>
                  
                  <div>
                    <Label htmlFor="participant2FullName">ФИО участника 2 *</Label>
                    <Input
                      id="participant2FullName"
                      value={participant2FullName}
                      onChange={(e) => setParticipant2FullName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant2Iin">ИИН участника 2 *</Label>
                    <Input
                      id="participant2Iin"
                      value={participant2Iin}
                      onChange={(e) => setParticipant2Iin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant2Phone">Телефон участника 2 *</Label>
                    <Input
                      id="participant2Phone"
                      value={participant2Phone}
                      onChange={(e) => handlePhoneChange(e.target.value, setParticipant2Phone)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant2School">Школа участника 2 *</Label>
                    <Input
                      id="participant2School"
                      value={participant2School}
                      onChange={(e) => setParticipant2School(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant2City">Город участника 2 *</Label>
                    <Input
                      id="participant2City"
                      value={participant2City}
                      onChange={(e) => setParticipant2City(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant2Grade">Класс участника 2 *</Label>
                    <Input
                      id="participant2Grade"
                      value={participant2Grade}
                      onChange={(e) => setParticipant2Grade(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participant 3 */}
            {teamMemberCount && teamMemberCount >= 4 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Участник 3</h2>
                  
                  <div>
                    <Label htmlFor="participant3FullName">ФИО участника 3 *</Label>
                    <Input
                      id="participant3FullName"
                      value={participant3FullName}
                      onChange={(e) => setParticipant3FullName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant3Iin">ИИН участника 3 *</Label>
                    <Input
                      id="participant3Iin"
                      value={participant3Iin}
                      onChange={(e) => setParticipant3Iin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant3Phone">Телефон участника 3 *</Label>
                    <Input
                      id="participant3Phone"
                      value={participant3Phone}
                      onChange={(e) => handlePhoneChange(e.target.value, setParticipant3Phone)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant3School">Школа участника 3 *</Label>
                    <Input
                      id="participant3School"
                      value={participant3School}
                      onChange={(e) => setParticipant3School(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant3City">Город участника 3 *</Label>
                    <Input
                      id="participant3City"
                      value={participant3City}
                      onChange={(e) => setParticipant3City(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant3Grade">Класс участника 3 *</Label>
                    <Input
                      id="participant3Grade"
                      value={participant3Grade}
                      onChange={(e) => setParticipant3Grade(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participant 4 */}
            {teamMemberCount && teamMemberCount >= 5 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Участник 4</h2>
                  
                  <div>
                    <Label htmlFor="participant4FullName">ФИО участника 4 *</Label>
                    <Input
                      id="participant4FullName"
                      value={participant4FullName}
                      onChange={(e) => setParticipant4FullName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant4Iin">ИИН участника 4 *</Label>
                    <Input
                      id="participant4Iin"
                      value={participant4Iin}
                      onChange={(e) => setParticipant4Iin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      maxLength={12}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant4Phone">Телефон участника 4 *</Label>
                    <Input
                      id="participant4Phone"
                      value={participant4Phone}
                      onChange={(e) => handlePhoneChange(e.target.value, setParticipant4Phone)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant4School">Школа участника 4 *</Label>
                    <Input
                      id="participant4School"
                      value={participant4School}
                      onChange={(e) => setParticipant4School(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant4City">Город участника 4 *</Label>
                    <Input
                      id="participant4City"
                      value={participant4City}
                      onChange={(e) => setParticipant4City(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="participant4Grade">Класс участника 4 *</Label>
                    <Input
                      id="participant4Grade"
                      value={participant4Grade}
                      onChange={(e) => setParticipant4Grade(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Дополнительная информация</h2>
                
                <div>
                  <Label htmlFor="source">Откуда вы узнали о соревновании?</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="questions">Вопросы или комментарии</Label>
                  <Textarea
                    id="questions"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                    Я согласен на обработку персональных данных и подтверждаю правильность введенной информации *
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Отправка..." : "Отправить заявку"}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate("/competitions")}>
                Отмена
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
