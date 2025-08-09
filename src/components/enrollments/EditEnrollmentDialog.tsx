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
  const [form, setForm] = useState({
    email: enrollment.email ?? "",
    telegram: enrollment.telegram ?? "",
    team_name: enrollment.team_name ?? "",
    captain_full_name: enrollment.captain_full_name ?? "",
    captain_phone: enrollment.captain_phone ?? "",
    captain_age: enrollment.captain_age ?? ("" as any),
    city: enrollment.city ?? "",
    study_place: enrollment.study_place ?? "",
    participant2_info: enrollment.participant2_info ?? "",
    participant3_info: enrollment.participant3_info ?? "",
    participant4_info: enrollment.participant4_info ?? "",
    source: enrollment.source ?? "",
    consent: Boolean(enrollment.consent),
  });

  useEffect(() => {
    // Sync when enrollment changes
    setForm({
      email: enrollment.email ?? "",
      telegram: enrollment.telegram ?? "",
      team_name: enrollment.team_name ?? "",
      captain_full_name: enrollment.captain_full_name ?? "",
      captain_phone: enrollment.captain_phone ?? "",
      captain_age: enrollment.captain_age ?? ("" as any),
      city: enrollment.city ?? "",
      study_place: enrollment.study_place ?? "",
      participant2_info: enrollment.participant2_info ?? "",
      participant3_info: enrollment.participant3_info ?? "",
      participant4_info: enrollment.participant4_info ?? "",
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
    if (!form.email || !form.telegram || !form.team_name || !form.captain_full_name || !form.captain_phone || !form.captain_age || !form.city || !form.study_place || !form.source || !form.consent) {
      toast("Заполните все обязательные поля", { description: "Поля со * обязательны" });
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
          captain_phone: form.captain_phone,
          captain_age: typeof form.captain_age === "number" ? form.captain_age : Number(form.captain_age),
          city: form.city,
          study_place: form.study_place,
          participant2_info: form.participant2_info,
          participant3_info: form.participant3_info,
          participant4_info: form.participant4_info,
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Редактировать заявку — {compTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
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
              <Label htmlFor="captain_phone">Телефон капитана *</Label>
              <Input id="captain_phone" name="captain_phone" value={form.captain_phone} onChange={onChange} required />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="participant2_info">2 участник *</Label>
              <Textarea id="participant2_info" name="participant2_info" value={form.participant2_info} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="participant3_info">3 участник *</Label>
              <Textarea id="participant3_info" name="participant3_info" value={form.participant3_info} onChange={onChange} required />
            </div>
            <div>
              <Label htmlFor="participant4_info">4 участник *</Label>
              <Textarea id="participant4_info" name="participant4_info" value={form.participant4_info} onChange={onChange} required />
            </div>
          </div>

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
