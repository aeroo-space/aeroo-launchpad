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

  // Captain info
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainIin, setCaptainIin] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainSchool, setCaptainSchool] = useState("");
  const [captainCity, setCaptainCity] = useState("");
  const [captainGrade, setCaptainGrade] = useState("");
  const [captainTelegram, setCaptainTelegram] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");

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
    if (!captainFullName.trim()) validationErrors.push("ФИО капитана");
    if (!captainIin.trim()) validationErrors.push("ИИН капитана");
    else if (captainIin.length !== 12 || !/^\d{12}$/.test(captainIin)) {
      validationErrors.push("ИИН капитана должен содержать 12 цифр");
    }
    if (!captainPhone.trim()) validationErrors.push("Телефон капитана");
    if (!captainSchool.trim()) validationErrors.push("Школа капитана");
    if (!captainCity.trim()) validationErrors.push("Город капитана");
    if (!captainGrade.trim()) validationErrors.push("Класс капитана");

    if (validationErrors.length > 0) {
      toast.error("Заполните все обязательные поля", {
        description: validationErrors.join(", ")
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("enrollments")
        .insert({
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
        })
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
