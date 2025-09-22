import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { competitions } from "@/data/competitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

type Enrollment = Tables<"enrollments">;

const EditEnrollment = () => {
  const navigate = useNavigate();
  const { enrollmentId } = useParams();
  const { t } = useTranslation();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const compTitle = useMemo(() => {
    if (!enrollment) return "";
    const map: Record<string, string> = {};
    competitions.forEach((c) => (map[c.id] = c.title));
    return map[enrollment.competition_id] ?? enrollment.competition_id;
  }, [enrollment?.competition_id]);

  const [teamMemberCount, setTeamMemberCount] = useState<number>(1);

  const [form, setForm] = useState({
    email: "",
    telegram: "",
    team_name: "",
    captain_full_name: "",
    captain_phone: "",
    captain_age: "" as any,
    captain_iin: "",
    captain_grade: "",
    city: "",
    study_place: "",
    participant1_full_name: "",
    participant1_iin: "",
    participant1_phone: "",
    participant1_school: "",
    participant1_city: "",
    participant1_grade: "",
    participant2_full_name: "",
    participant2_iin: "",
    participant2_phone: "",
    participant2_school: "",
    participant2_city: "",
    participant2_grade: "",
    participant3_full_name: "",
    participant3_iin: "",
    participant3_phone: "",
    participant3_school: "",
    participant3_city: "",
    participant3_grade: "",
    participant4_full_name: "",
    participant4_iin: "",
    participant4_phone: "",
    participant4_school: "",
    participant4_city: "",
    participant4_grade: "",
    mentor_full_name: "",
    mentor_iin: "",
    mentor_phone: "",
    mentor_school: "",
    mentor_city: "",
    mentor_telegram: "",
    league: "",
    source: "",
    questions: "",
    consent: false,
  });

  useEffect(() => {
    if (!enrollmentId) {
      navigate('/dashboard');
      return;
    }

    const fetchEnrollment = async () => {
      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('*')
          .eq('id', enrollmentId)
          .single();

        if (error) throw error;

        if (!data) {
          toast.error('Заявка не найдена');
          navigate('/dashboard');
          return;
        }

        setEnrollment(data);
        
        // Initialize form with enrollment data
        setForm({
          email: data.email ?? "",
          telegram: data.telegram ?? "",
          team_name: data.team_name ?? "",
          captain_full_name: data.captain_full_name ?? "",
          captain_phone: data.captain_phone ?? "",
          captain_age: data.captain_age ?? ("" as any),
          captain_iin: data.captain_iin ?? "",
          captain_grade: data.captain_grade ?? "",
          city: data.city ?? "",
          study_place: data.study_place ?? "",
          participant1_full_name: data.participant1_full_name ?? "",
          participant1_iin: data.participant1_iin ?? "",
          participant1_phone: data.participant1_phone ?? "",
          participant1_school: data.participant1_school ?? "",
          participant1_city: data.participant1_city ?? "",
          participant1_grade: data.participant1_grade ?? "",
          participant2_full_name: data.participant2_full_name ?? "",
          participant2_iin: data.participant2_iin ?? "",
          participant2_phone: data.participant2_phone ?? "",
          participant2_school: data.participant2_school ?? "",
          participant2_city: data.participant2_city ?? "",
          participant2_grade: data.participant2_grade ?? "",
          participant3_full_name: data.participant3_full_name ?? "",
          participant3_iin: data.participant3_iin ?? "",
          participant3_phone: data.participant3_phone ?? "",
          participant3_school: data.participant3_school ?? "",
          participant3_city: data.participant3_city ?? "",
          participant3_grade: data.participant3_grade ?? "",
          participant4_full_name: data.participant4_full_name ?? "",
          participant4_iin: data.participant4_iin ?? "",
          participant4_phone: data.participant4_phone ?? "",
          participant4_school: data.participant4_school ?? "",
          participant4_city: data.participant4_city ?? "",
          participant4_grade: data.participant4_grade ?? "",
          mentor_full_name: data.mentor_full_name ?? "",
          mentor_iin: data.mentor_iin ?? "",
          mentor_phone: data.mentor_phone ?? "",
          mentor_school: data.mentor_school ?? "",
          mentor_city: data.mentor_city ?? "",
          mentor_telegram: data.mentor_telegram ?? "",
          league: data.league ?? "",
          source: data.source ?? "",
          questions: data.questions ?? "",
          consent: data.consent ?? false,
        });

        // Determine initial team member count based on existing data
        if (data.participant3_full_name) setTeamMemberCount(4);
        else if (data.participant2_full_name) setTeamMemberCount(3);
        else if (data.participant1_full_name) setTeamMemberCount(2);
        else setTeamMemberCount(1);

      } catch (error) {
        console.error('Error fetching enrollment:', error);
        toast.error('Ошибка при загрузке заявки');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [enrollmentId, navigate]);

  const onChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+7 [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validation
      if (!form.email) {
        toast.error("Email обязателен");
        return;
      }

      if (!form.captain_full_name) {
        toast.error("ФИО капитана обязательно");
        return;
      }

      if (!form.captain_phone) {
        toast.error("Телефон капитана обязателен");
        return;
      }

      if (!validatePhoneNumber(form.captain_phone)) {
        toast.error("Неверный формат телефона капитана. Используйте формат: +7 777 777 77 77");
        return;
      }

      if (!form.captain_iin) {
        toast.error("ИИН капитана обязателен");
        return;
      }

      if (!form.captain_grade) {
        toast.error("Класс капитана обязателен");
        return;
      }

      if (!form.city) {
        toast.error("Город обязателен");
        return;
      }

      if (!form.study_place) {
        toast.error("Место учебы обязательно");
        return;
      }

      // Team members validation
      for (let i = 1; i < teamMemberCount; i++) {
        const participant = form[`participant${i}_full_name` as keyof typeof form] as string;
        if (!participant) {
          toast.error(`ФИО участника ${i + 1} обязательно`);
          return;
        }

        const participantIin = form[`participant${i}_iin` as keyof typeof form] as string;
        if (!participantIin) {
          toast.error(`ИИН участника ${i + 1} обязателен`);
          return;
        }

        const participantPhone = form[`participant${i}_phone` as keyof typeof form] as string;
        if (!participantPhone) {
          toast.error(`Телефон участника ${i + 1} обязателен`);
          return;
        }

        if (!validatePhoneNumber(participantPhone)) {
          toast.error(`Неверный формат телефона участника ${i + 1}. Используйте формат: +7 777 777 77 77`);
          return;
        }

        const participantSchool = form[`participant${i}_school` as keyof typeof form] as string;
        if (!participantSchool) {
          toast.error(`Школа участника ${i + 1} обязательна`);
          return;
        }

        const participantCity = form[`participant${i}_city` as keyof typeof form] as string;
        if (!participantCity) {
          toast.error(`Город участника ${i + 1} обязателен`);
          return;
        }

        const participantGrade = form[`participant${i}_grade` as keyof typeof form] as string;
        if (!participantGrade) {
          toast.error(`Класс участника ${i + 1} обязателен`);
          return;
        }
      }

      // Mentor validation
      if (form.mentor_full_name) {
        if (!form.mentor_iin) {
          toast.error("ИИН ментора обязателен");
          return;
        }

        if (!form.mentor_phone) {
          toast.error("Телефон ментора обязателен");
          return;
        }

        if (!validatePhoneNumber(form.mentor_phone)) {
          toast.error("Неверный формат телефона ментора. Используйте формат: +7 777 777 77 77");
          return;
        }

        if (!form.mentor_school) {
          toast.error("Место работы ментора обязательно");
          return;
        }

        if (!form.mentor_city) {
          toast.error("Город ментора обязателен");
          return;
        }

        if (!form.mentor_telegram) {
          toast.error("Telegram ментора обязателен");
          return;
        }
      }

      if (!form.consent) {
        toast.error("Необходимо дать согласие на обработку персональных данных");
        return;
      }

      // Prepare update data - clear fields for participants that are no longer needed
      const updateData: any = { ...form };
      
      // Clear unused participant fields based on team size
      for (let i = teamMemberCount; i <= 4; i++) {
        if (i > 1) {
          updateData[`participant${i}_full_name`] = null;
          updateData[`participant${i}_iin`] = null;
          updateData[`participant${i}_phone`] = null;
          updateData[`participant${i}_school`] = null;
          updateData[`participant${i}_city`] = null;
          updateData[`participant${i}_grade`] = null;
        }
      }

      const { error } = await supabase
        .from('enrollments')
        .update(updateData)
        .eq('id', enrollmentId);

      if (error) throw error;

      toast.success("Заявка успешно обновлена");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating enrollment:', error);
      toast.error("Ошибка при обновлении заявки");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Заявка не найдена</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к панели
          </Button>
          
          <h1 className="text-3xl font-bold">Редактирование заявки</h1>
          <p className="text-muted-foreground mt-2">{compTitle}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    value={form.telegram}
                    onChange={(e) => onChange('telegram', e.target.value)}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team_name">Название команды</Label>
                <Input
                  id="team_name"
                  value={form.team_name}
                  onChange={(e) => onChange('team_name', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Капитан команды</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="captain_full_name">ФИО *</Label>
                  <Input
                    id="captain_full_name"
                    value={form.captain_full_name}
                    onChange={(e) => onChange('captain_full_name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="captain_phone">Телефон *</Label>
                  <Input
                    id="captain_phone"
                    value={form.captain_phone}
                    onChange={(e) => onChange('captain_phone', e.target.value)}
                    placeholder="+7 777 777 77 77"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="captain_iin">ИИН *</Label>
                  <Input
                    id="captain_iin"
                    value={form.captain_iin}
                    onChange={(e) => onChange('captain_iin', e.target.value)}
                    placeholder="123456789012"
                    maxLength={12}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="captain_grade">Класс *</Label>
                  <Input
                    id="captain_grade"
                    value={form.captain_grade}
                    onChange={(e) => onChange('captain_grade', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="captain_age">Возраст</Label>
                  <Input
                    id="captain_age"
                    type="number"
                    value={form.captain_age}
                    onChange={(e) => onChange('captain_age', e.target.value ? parseInt(e.target.value) : "")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => onChange('city', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="study_place">Место учебы *</Label>
                  <Input
                    id="study_place"
                    value={form.study_place}
                    onChange={(e) => onChange('study_place', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Состав команды</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Количество участников в команде</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <Button
                      key={count}
                      type="button"
                      variant={teamMemberCount === count ? "default" : "outline"}
                      onClick={() => setTeamMemberCount(count)}
                    >
                      {count} участник{count > 1 ? (count > 4 ? 'ов' : 'а') : ''}
                    </Button>
                  ))}
                </div>
              </div>

              {Array.from({ length: teamMemberCount - 1 }, (_, i) => i + 1).map((participantIndex) => (
                <div key={participantIndex} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Участник {participantIndex + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`participant${participantIndex}_full_name`}>ФИО *</Label>
                      <Input
                        id={`participant${participantIndex}_full_name`}
                        value={form[`participant${participantIndex}_full_name` as keyof typeof form] as string}
                        onChange={(e) => onChange(`participant${participantIndex}_full_name`, e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`participant${participantIndex}_phone`}>Телефон *</Label>
                      <Input
                        id={`participant${participantIndex}_phone`}
                        value={form[`participant${participantIndex}_phone` as keyof typeof form] as string}
                        onChange={(e) => onChange(`participant${participantIndex}_phone`, e.target.value)}
                        placeholder="+7 777 777 77 77"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`participant${participantIndex}_iin`}>ИИН *</Label>
                      <Input
                        id={`participant${participantIndex}_iin`}
                        value={form[`participant${participantIndex}_iin` as keyof typeof form] as string}
                        onChange={(e) => onChange(`participant${participantIndex}_iin`, e.target.value)}
                        placeholder="123456789012"
                        maxLength={12}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`participant${participantIndex}_school`}>Школа *</Label>
                      <Input
                        id={`participant${participantIndex}_school`}
                        value={form[`participant${participantIndex}_school` as keyof typeof form] as string}
                        onChange={(e) => onChange(`participant${participantIndex}_school`, e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`participant${participantIndex}_grade`}>Класс *</Label>
                      <Input
                        id={`participant${participantIndex}_grade`}
                        value={form[`participant${participantIndex}_grade` as keyof typeof form] as string}
                        onChange={(e) => onChange(`participant${participantIndex}_grade`, e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`participant${participantIndex}_city`}>Город *</Label>
                    <Input
                      id={`participant${participantIndex}_city`}
                      value={form[`participant${participantIndex}_city` as keyof typeof form] as string}
                      onChange={(e) => onChange(`participant${participantIndex}_city`, e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ментор (необязательно)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor_full_name">ФИО ментора</Label>
                  <Input
                    id="mentor_full_name"
                    value={form.mentor_full_name}
                    onChange={(e) => onChange('mentor_full_name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentor_phone">Телефон ментора</Label>
                  <Input
                    id="mentor_phone"
                    value={form.mentor_phone}
                    onChange={(e) => onChange('mentor_phone', e.target.value)}
                    placeholder="+7 777 777 77 77"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mentor_iin">ИИН ментора</Label>
                  <Input
                    id="mentor_iin"
                    value={form.mentor_iin}
                    onChange={(e) => onChange('mentor_iin', e.target.value)}
                    placeholder="123456789012"
                    maxLength={12}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentor_school">Место работы ментора</Label>
                  <Input
                    id="mentor_school"
                    value={form.mentor_school}
                    onChange={(e) => onChange('mentor_school', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mentor_city">Город ментора</Label>
                  <Input
                    id="mentor_city"
                    value={form.mentor_city}
                    onChange={(e) => onChange('mentor_city', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mentor_telegram">Telegram ментора</Label>
                <Input
                  id="mentor_telegram"
                  value={form.mentor_telegram}
                  onChange={(e) => onChange('mentor_telegram', e.target.value)}
                  placeholder="@username"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Дополнительная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="league">Лига</Label>
                <Input
                  id="league"
                  value={form.league}
                  onChange={(e) => onChange('league', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">Откуда узнали о соревновании?</Label>
                <Input
                  id="source"
                  value={form.source}
                  onChange={(e) => onChange('source', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="questions">Вопросы или комментарии</Label>
                <Textarea
                  id="questions"
                  value={form.questions}
                  onChange={(e) => onChange('questions', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="consent"
                  checked={form.consent}
                  onCheckedChange={(checked) => onChange('consent', checked)}
                />
                <Label htmlFor="consent" className="text-sm">
                  Согласие на обработку персональных данных *
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              disabled={saving}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEnrollment;