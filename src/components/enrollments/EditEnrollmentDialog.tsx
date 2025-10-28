import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { competitions } from "@/data/competitions";

type Enrollment = Tables<"enrollments">;

interface Props {
  enrollment: Enrollment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (updated: Enrollment) => void;
}

const EditEnrollmentDialog = ({ enrollment, open, onOpenChange, onUpdated }: Props) => {
  const compTitle = useMemo(() => {
    const map: Record<string, string> = {};
    competitions.forEach((c) => (map[c.id] = c.title));
    return map[enrollment.competition_id] ?? enrollment.competition_id;
  }, [enrollment.competition_id]);

  const [saving, setSaving] = useState(false);
  const maxParticipants = enrollment.competition_id === "space-settlement" ? 5 : 4;
  
  const [teamMemberCount, setTeamMemberCount] = useState<number>(() => {
    // Determine initial team member count based on existing data
    if (enrollment.participant4_full_name) return 5;
    if (enrollment.participant3_full_name) return 4;
    if (enrollment.participant2_full_name) return 3;
    if (enrollment.participant1_full_name) return 2;
    return 1;
  });

  const [form, setForm] = useState({
    email: enrollment.email ?? "",
    telegram: enrollment.telegram ?? "",
    team_name: enrollment.team_name ?? "",
    captain_full_name: enrollment.captain_full_name ?? "",
    captain_phone: enrollment.captain_phone ?? "",
    captain_age: enrollment.captain_age ?? ("" as any),
    captain_iin: enrollment.captain_iin ?? "",
    captain_grade: enrollment.captain_grade ?? "",
    city: enrollment.city ?? "",
    study_place: enrollment.study_place ?? "",
    participant1_full_name: enrollment.participant1_full_name ?? "",
    participant1_iin: enrollment.participant1_iin ?? "",
    participant1_phone: enrollment.participant1_phone ?? "",
    participant1_school: enrollment.participant1_school ?? "",
    participant1_city: enrollment.participant1_city ?? "",
    participant1_grade: enrollment.participant1_grade ?? "",
    participant2_full_name: enrollment.participant2_full_name ?? "",
    participant2_iin: enrollment.participant2_iin ?? "",
    participant2_phone: enrollment.participant2_phone ?? "",
    participant2_school: enrollment.participant2_school ?? "",
    participant2_city: enrollment.participant2_city ?? "",
    participant2_grade: enrollment.participant2_grade ?? "",
    participant3_full_name: enrollment.participant3_full_name ?? "",
    participant3_iin: enrollment.participant3_iin ?? "",
    participant3_phone: enrollment.participant3_phone ?? "",
    participant3_school: enrollment.participant3_school ?? "",
    participant3_city: enrollment.participant3_city ?? "",
    participant3_grade: enrollment.participant3_grade ?? "",
    participant4_full_name: enrollment.participant4_full_name ?? "",
    participant4_iin: enrollment.participant4_iin ?? "",
    participant4_phone: enrollment.participant4_phone ?? "",
    participant4_school: enrollment.participant4_school ?? "",
    participant4_city: enrollment.participant4_city ?? "",
    participant4_grade: enrollment.participant4_grade ?? "",
    source: enrollment.source ?? "",
    consent: Boolean(enrollment.consent),
  });

  useEffect(() => {
    // Sync when enrollment changes
    const newTeamMemberCount = enrollment.participant4_full_name ? 5 :
                              enrollment.participant3_full_name ? 4 : 
                              enrollment.participant2_full_name ? 3 : 
                              enrollment.participant1_full_name ? 2 : 1;
    setTeamMemberCount(newTeamMemberCount);

    setForm({
      email: enrollment.email ?? "",
      telegram: enrollment.telegram ?? "",
      team_name: enrollment.team_name ?? "",
      captain_full_name: enrollment.captain_full_name ?? "",
      captain_phone: enrollment.captain_phone ?? "",
      captain_age: enrollment.captain_age ?? ("" as any),
      captain_iin: enrollment.captain_iin ?? "",
      captain_grade: enrollment.captain_grade ?? "",
      city: enrollment.city ?? "",
      study_place: enrollment.study_place ?? "",
      participant1_full_name: enrollment.participant1_full_name ?? "",
      participant1_iin: enrollment.participant1_iin ?? "",
      participant1_phone: enrollment.participant1_phone ?? "",
      participant1_school: enrollment.participant1_school ?? "",
      participant1_city: enrollment.participant1_city ?? "",
      participant1_grade: enrollment.participant1_grade ?? "",
      participant2_full_name: enrollment.participant2_full_name ?? "",
      participant2_iin: enrollment.participant2_iin ?? "",
      participant2_phone: enrollment.participant2_phone ?? "",
      participant2_school: enrollment.participant2_school ?? "",
      participant2_city: enrollment.participant2_city ?? "",
      participant2_grade: enrollment.participant2_grade ?? "",
      participant3_full_name: enrollment.participant3_full_name ?? "",
      participant3_iin: enrollment.participant3_iin ?? "",
      participant3_phone: enrollment.participant3_phone ?? "",
      participant3_school: enrollment.participant3_school ?? "",
      participant3_city: enrollment.participant3_city ?? "",
      participant3_grade: enrollment.participant3_grade ?? "",
      participant4_full_name: enrollment.participant4_full_name ?? "",
      participant4_iin: enrollment.participant4_iin ?? "",
      participant4_phone: enrollment.participant4_phone ?? "",
      participant4_school: enrollment.participant4_school ?? "",
      participant4_city: enrollment.participant4_city ?? "",
      participant4_grade: enrollment.participant4_grade ?? "",
      source: enrollment.source ?? "",
      consent: Boolean(enrollment.consent),
    });
  }, [enrollment]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "captain_age" ? Number(value) || ("" as any) : value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation functions
    const validateName = (name: string, fieldName: string) => {
      if (!name.trim()) return `${fieldName} обязательно для заполнения`;
      if (/\d/.test(name)) return `${fieldName} не должно содержать цифры`;
      return null;
    };

    const validateCity = (city: string, fieldName: string) => {
      if (!city.trim()) return `${fieldName} обязательно для заполнения`;
      if (/\d/.test(city)) return `${fieldName} не должно содержать цифры`;
      return null;
    };

    const validatePhone = (phone: string, fieldName: string) => {
      if (!phone.trim()) return `${fieldName} обязательно для заполнения`;
      const phoneRegex = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;
      if (!phoneRegex.test(phone)) return `${fieldName} должен быть в формате +7 777 777 77 77`;
      return null;
    };

    // Validate required fields
    const validationErrors: string[] = [];
    
    if (!form.email.trim()) validationErrors.push("Email обязателен");
    if (!form.telegram.trim()) validationErrors.push("Telegram обязателен");
    if (!form.team_name.trim()) validationErrors.push("Название команды");
    if (!form.captain_age) validationErrors.push("Возраст капитана");
    if (!form.source.trim()) validationErrors.push("Источник информации");
    if (!form.consent) validationErrors.push("Согласие с политикой");
    
    // Captain validation
    const captainNameError = validateName(form.captain_full_name, "ФИО капитана");
    if (captainNameError) validationErrors.push(captainNameError);
    
    if (!form.captain_iin.trim()) validationErrors.push("ИИН капитана");
    else if (form.captain_iin.length !== 12 || !/^\d{12}$/.test(form.captain_iin)) {
      validationErrors.push("ИИН капитана должен содержать 12 цифр");
    }
    
    const captainPhoneError = validatePhone(form.captain_phone, "Телефон капитана");
    if (captainPhoneError) validationErrors.push(captainPhoneError);
    
    if (!form.study_place.trim()) validationErrors.push("Место обучения капитана");
    
    const captainCityError = validateCity(form.city, "Город капитана");
    if (captainCityError) validationErrors.push(captainCityError);
    
    if (!form.captain_grade.trim()) validationErrors.push("Класс капитана");

    // Validate team members based on count
    if (teamMemberCount >= 2) {
      const p1NameError = validateName(form.participant1_full_name, "ФИО участника 1");
      if (p1NameError) validationErrors.push(p1NameError);
      
      if (!form.participant1_iin.trim()) validationErrors.push("ИИН участника 1");
      else if (form.participant1_iin.length !== 12 || !/^\d{12}$/.test(form.participant1_iin)) {
        validationErrors.push("ИИН участника 1 должен содержать 12 цифр");
      }
      
      const p1PhoneError = validatePhone(form.participant1_phone, "Телефон участника 1");
      if (p1PhoneError) validationErrors.push(p1PhoneError);
      
      if (!form.participant1_school.trim()) validationErrors.push("Учебное заведение участника 1");
      
      const p1CityError = validateCity(form.participant1_city, "Город участника 1");
      if (p1CityError) validationErrors.push(p1CityError);
      
      if (!form.participant1_grade.trim()) validationErrors.push("Класс участника 1");
    }

    if (teamMemberCount >= 3) {
      const p2NameError = validateName(form.participant2_full_name, "ФИО участника 2");
      if (p2NameError) validationErrors.push(p2NameError);
      
      if (!form.participant2_iin.trim()) validationErrors.push("ИИН участника 2");
      else if (form.participant2_iin.length !== 12 || !/^\d{12}$/.test(form.participant2_iin)) {
        validationErrors.push("ИИН участника 2 должен содержать 12 цифр");
      }
      
      const p2PhoneError = validatePhone(form.participant2_phone, "Телефон участника 2");
      if (p2PhoneError) validationErrors.push(p2PhoneError);
      
      if (!form.participant2_school.trim()) validationErrors.push("Учебное заведение участника 2");
      
      const p2CityError = validateCity(form.participant2_city, "Город участника 2");
      if (p2CityError) validationErrors.push(p2CityError);
      
      if (!form.participant2_grade.trim()) validationErrors.push("Класс участника 2");
    }

    if (teamMemberCount >= 4) {
      const p3NameError = validateName(form.participant3_full_name, "ФИО участника 3");
      if (p3NameError) validationErrors.push(p3NameError);
      
      if (!form.participant3_iin.trim()) validationErrors.push("ИИН участника 3");
      else if (form.participant3_iin.length !== 12 || !/^\d{12}$/.test(form.participant3_iin)) {
        validationErrors.push("ИИН участника 3 должен содержать 12 цифр");
      }
      
      const p3PhoneError = validatePhone(form.participant3_phone, "Телефон участника 3");
      if (p3PhoneError) validationErrors.push(p3PhoneError);
      
      if (!form.participant3_school.trim()) validationErrors.push("Учебное заведение участника 3");
      
      const p3CityError = validateCity(form.participant3_city, "Город участника 3");
      if (p3CityError) validationErrors.push(p3CityError);
      
      if (!form.participant3_grade.trim()) validationErrors.push("Класс участника 3");
    }

    if (teamMemberCount >= 5) {
      const p4NameError = validateName(form.participant4_full_name, "ФИО участника 4");
      if (p4NameError) validationErrors.push(p4NameError);
      
      if (!form.participant4_iin.trim()) validationErrors.push("ИИН участника 4");
      else if (form.participant4_iin.length !== 12 || !/^\d{12}$/.test(form.participant4_iin)) {
        validationErrors.push("ИИН участника 4 должен содержать 12 цифр");
      }
      
      const p4PhoneError = validatePhone(form.participant4_phone, "Телефон участника 4");
      if (p4PhoneError) validationErrors.push(p4PhoneError);
      
      if (!form.participant4_school.trim()) validationErrors.push("Учебное заведение участника 4");
      
      const p4CityError = validateCity(form.participant4_city, "Город участника 4");
      if (p4CityError) validationErrors.push(p4CityError);
      
      if (!form.participant4_grade.trim()) validationErrors.push("Класс участника 4");
    }

    if (validationErrors.length > 0) {
      toast.error(`Ошибки валидации: ${validationErrors.join("; ")}`);
      return;
    }
    try {
      setSaving(true);
      const { data, error } = await supabase
        .from("enrollments")
        .update({
          email: form.email,
          telegram: form.telegram,
          team_name: form.team_name,
          captain_full_name: form.captain_full_name,
          captain_iin: form.captain_iin,
          captain_phone: form.captain_phone,
          captain_grade: form.captain_grade,
          captain_age: typeof form.captain_age === "number" ? form.captain_age : Number(form.captain_age),
          city: form.city,
          study_place: form.study_place,
          participant1_full_name: teamMemberCount >= 2 ? form.participant1_full_name : null,
          participant1_iin: teamMemberCount >= 2 ? form.participant1_iin : null,
          participant1_phone: teamMemberCount >= 2 ? form.participant1_phone : null,
          participant1_school: teamMemberCount >= 2 ? form.participant1_school : null,
          participant1_city: teamMemberCount >= 2 ? form.participant1_city : null,
          participant1_grade: teamMemberCount >= 2 ? form.participant1_grade : null,
          participant2_full_name: teamMemberCount >= 3 ? form.participant2_full_name : null,
          participant2_iin: teamMemberCount >= 3 ? form.participant2_iin : null,
          participant2_phone: teamMemberCount >= 3 ? form.participant2_phone : null,
          participant2_school: teamMemberCount >= 3 ? form.participant2_school : null,
          participant2_city: teamMemberCount >= 3 ? form.participant2_city : null,
          participant2_grade: teamMemberCount >= 3 ? form.participant2_grade : null,
          participant3_full_name: teamMemberCount >= 4 ? form.participant3_full_name : null,
          participant3_iin: teamMemberCount >= 4 ? form.participant3_iin : null,
          participant3_phone: teamMemberCount >= 4 ? form.participant3_phone : null,
          participant3_school: teamMemberCount >= 4 ? form.participant3_school : null,
          participant3_city: teamMemberCount >= 4 ? form.participant3_city : null,
          participant3_grade: teamMemberCount >= 4 ? form.participant3_grade : null,
          participant4_full_name: teamMemberCount >= 5 ? form.participant4_full_name : null,
          participant4_iin: teamMemberCount >= 5 ? form.participant4_iin : null,
          participant4_phone: teamMemberCount >= 5 ? form.participant4_phone : null,
          participant4_school: teamMemberCount >= 5 ? form.participant4_school : null,
          participant4_city: teamMemberCount >= 5 ? form.participant4_city : null,
          participant4_grade: teamMemberCount >= 5 ? form.participant4_grade : null,
          source: form.source,
          consent: form.consent,
        })
        .eq("id", enrollment.id)
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) {
        toast.success("Данные обновлены");
        onUpdated(data as Enrollment);
        onOpenChange(false);
      }
    } catch (err: any) {
      toast.error("Не удалось сохранить", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать заявку — {compTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Team Member Count Selection */}
          <div className="space-y-2">
            <Label>Количество участников команды *</Label>
            <div className="flex flex-col sm:flex-row gap-3 p-3 border border-input rounded-md bg-background">
              {Array.from({ length: maxParticipants }, (_, i) => i + 1).map((count) => (
                <label key={count} className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
                  <input
                    type="radio"
                    name="teamMemberCount"
                    value={count}
                    checked={teamMemberCount === count}
                    onChange={(e) => setTeamMemberCount(Number(e.target.value))}
                    className="w-4 h-4 text-primary border-2 border-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    required
                  />
                  <span className="text-sm font-medium">{count} участник{count > 1 ? (count < 5 ? 'а' : 'ов') : ''}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="team_name">Название команды *</Label>
              <Input id="team_name" name="team_name" value={form.team_name} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email капитана *</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="telegram">Telegram для связи *</Label>
              <Input id="telegram" name="telegram" value={form.telegram} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="captain_full_name">ФИО капитана *</Label>
              <Input id="captain_full_name" name="captain_full_name" value={form.captain_full_name} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="captain_iin">ИИН капитана *</Label>
              <Input id="captain_iin" name="captain_iin" value={form.captain_iin} onChange={onChange} maxLength={12} required />
            </div>
            <div>
              <Label htmlFor="captain_phone">Телефон капитана *</Label>
              <Input id="captain_phone" name="captain_phone" value={form.captain_phone} onChange={onChange} placeholder="+7 777 777 77 77" required />
            </div>
            <div>
              <Label htmlFor="captain_grade">Класс капитана *</Label>
              <Input id="captain_grade" name="captain_grade" value={form.captain_grade} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="captain_age">Возраст капитана *</Label>
              <Input id="captain_age" name="captain_age" type="number" value={form.captain_age as any} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="city">Город *</Label>
              <Input id="city" name="city" value={form.city} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="study_place">Место обучения *</Label>
              <Input id="study_place" name="study_place" value={form.study_place} onChange={onChange} required />
            </div>
          </div>

          {/* Additional Team Members */}
          {teamMemberCount > 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Дополнительные участники</h3>
              
              {/* Participant 1 */}
              {teamMemberCount >= 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <h4 className="col-span-full font-medium">Участник 2 *</h4>
                  <div>
                    <Label htmlFor="participant1_full_name">ФИО *</Label>
                    <Input id="participant1_full_name" name="participant1_full_name" value={form.participant1_full_name} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant1_iin">ИИН *</Label>
                    <Input id="participant1_iin" name="participant1_iin" value={form.participant1_iin} onChange={onChange} maxLength={12} required />
                  </div>
                  <div>
                    <Label htmlFor="participant1_phone">Телефон *</Label>
                    <Input id="participant1_phone" name="participant1_phone" value={form.participant1_phone} onChange={onChange} placeholder="+7 777 777 77 77" required />
                  </div>
                  <div>
                    <Label htmlFor="participant1_school">Учебное заведение *</Label>
                    <Input id="participant1_school" name="participant1_school" value={form.participant1_school} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant1_city">Город *</Label>
                    <Input id="participant1_city" name="participant1_city" value={form.participant1_city} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant1_grade">Класс *</Label>
                    <Input id="participant1_grade" name="participant1_grade" value={form.participant1_grade} onChange={onChange} required />
                  </div>
                </div>
              )}

              {/* Participant 2 */}
              {teamMemberCount >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <h4 className="col-span-full font-medium">Участник 3 *</h4>
                  <div>
                    <Label htmlFor="participant2_full_name">ФИО *</Label>
                    <Input id="participant2_full_name" name="participant2_full_name" value={form.participant2_full_name} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant2_iin">ИИН *</Label>
                    <Input id="participant2_iin" name="participant2_iin" value={form.participant2_iin} onChange={onChange} maxLength={12} required />
                  </div>
                  <div>
                    <Label htmlFor="participant2_phone">Телефон *</Label>
                    <Input id="participant2_phone" name="participant2_phone" value={form.participant2_phone} onChange={onChange} placeholder="+7 777 777 77 77" required />
                  </div>
                  <div>
                    <Label htmlFor="participant2_school">Учебное заведение *</Label>
                    <Input id="participant2_school" name="participant2_school" value={form.participant2_school} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant2_city">Город *</Label>
                    <Input id="participant2_city" name="participant2_city" value={form.participant2_city} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant2_grade">Класс *</Label>
                    <Input id="participant2_grade" name="participant2_grade" value={form.participant2_grade} onChange={onChange} required />
                  </div>
                </div>
              )}

              {/* Participant 3 */}
              {teamMemberCount >= 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <h4 className="col-span-full font-medium">Участник 4 *</h4>
                  <div>
                    <Label htmlFor="participant3_full_name">ФИО *</Label>
                    <Input id="participant3_full_name" name="participant3_full_name" value={form.participant3_full_name} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant3_iin">ИИН *</Label>
                    <Input id="participant3_iin" name="participant3_iin" value={form.participant3_iin} onChange={onChange} maxLength={12} required />
                  </div>
                  <div>
                    <Label htmlFor="participant3_phone">Телефон *</Label>
                    <Input id="participant3_phone" name="participant3_phone" value={form.participant3_phone} onChange={onChange} placeholder="+7 777 777 77 77" required />
                  </div>
                  <div>
                    <Label htmlFor="participant3_school">Учебное заведение *</Label>
                    <Input id="participant3_school" name="participant3_school" value={form.participant3_school} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant3_city">Город *</Label>
                    <Input id="participant3_city" name="participant3_city" value={form.participant3_city} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant3_grade">Класс *</Label>
                    <Input id="participant3_grade" name="participant3_grade" value={form.participant3_grade} onChange={onChange} required />
                  </div>
                </div>
              )}

              {/* Participant 4 */}
              {teamMemberCount >= 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <h4 className="col-span-full font-medium">Участник 5 *</h4>
                  <div>
                    <Label htmlFor="participant4_full_name">ФИО *</Label>
                    <Input id="participant4_full_name" name="participant4_full_name" value={form.participant4_full_name} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant4_iin">ИИН *</Label>
                    <Input id="participant4_iin" name="participant4_iin" value={form.participant4_iin} onChange={onChange} maxLength={12} required />
                  </div>
                  <div>
                    <Label htmlFor="participant4_phone">Телефон *</Label>
                    <Input id="participant4_phone" name="participant4_phone" value={form.participant4_phone} onChange={onChange} placeholder="+7 777 777 77 77" required />
                  </div>
                  <div>
                    <Label htmlFor="participant4_school">Учебное заведение *</Label>
                    <Input id="participant4_school" name="participant4_school" value={form.participant4_school} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant4_city">Город *</Label>
                    <Input id="participant4_city" name="participant4_city" value={form.participant4_city} onChange={onChange} required />
                  </div>
                  <div>
                    <Label htmlFor="participant4_grade">Класс *</Label>
                    <Input id="participant4_grade" name="participant4_grade" value={form.participant4_grade} onChange={onChange} required />
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="source">Откуда узнали *</Label>
            <Input id="source" name="source" value={form.source} onChange={onChange} placeholder="Instagram / Telegram / У знакомых / Другое" required />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Согласие с политикой *</p>
              <p className="text-xs text-muted-foreground">С Положением ознакомлен(-а) и согласен(-а) с политикой конфиденциальности</p>
            </div>
            <Switch checked={form.consent} onCheckedChange={(v) => setForm((f) => ({ ...f, consent: v }))} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEnrollmentDialog;
