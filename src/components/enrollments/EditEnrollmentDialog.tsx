import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    team_name: enrollment.team_name ?? "",
    league: enrollment.league ?? "",
    source: enrollment.source ?? "",
    questions: enrollment.questions ?? "",
    consent: Boolean(enrollment.consent),
  });

  useEffect(() => {
    setForm({
      team_name: enrollment.team_name ?? "",
      league: enrollment.league ?? "",
      source: enrollment.source ?? "",
      questions: enrollment.questions ?? "",
      consent: Boolean(enrollment.consent),
    });
  }, [enrollment]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors: string[] = [];
    
    if (!form.team_name.trim()) validationErrors.push("Название команды обязательно");
    if (!form.consent) validationErrors.push("Необходимо согласие с политикой");

    if (validationErrors.length > 0) {
      toast.error(`Ошибки: ${validationErrors.join("; ")}`);
      return;
    }

    try {
      setSaving(true);
      const { data, error } = await supabase
        .from("enrollments")
        .update({
          team_name: form.team_name,
          league: form.league || null,
          source: form.source || null,
          questions: form.questions || null,
          consent: form.consent,
        })
        .eq("id", enrollment.id)
        .select()
        .maybeSingle();

      if (error) throw error;
      if (data) {
        toast.success("Данные команды обновлены");
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать команду — {compTitle}</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-muted rounded-lg text-sm">
          <p className="font-medium mb-1">ℹ️ Управление участниками</p>
          <p className="text-muted-foreground">
            Участники теперь добавляются через систему приглашений. Используйте страницу Dashboard для управления командой.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="team_name">Название команды *</Label>
            <Input
              id="team_name"
              name="team_name"
              value={form.team_name}
              onChange={onChange}
              required
            />
          </div>

          {/* League */}
          <div className="space-y-2">
            <Label htmlFor="league">Лига</Label>
            <Select
              value={form.league || ""}
              onValueChange={(value) => setForm((f) => ({ ...f, league: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите лигу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (7-9 класс)</SelectItem>
                <SelectItem value="senior">Senior (10-11 класс)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Source */}
          <div className="space-y-2">
            <Label htmlFor="source">Откуда узнали?</Label>
            <Input
              id="source"
              name="source"
              value={form.source}
              onChange={onChange}
            />
          </div>

          {/* Questions */}
          <div className="space-y-2">
            <Label htmlFor="questions">Вопросы/Комментарии</Label>
            <Textarea
              id="questions"
              name="questions"
              value={form.questions}
              onChange={onChange}
              rows={3}
            />
          </div>

          {/* Consent */}
          <div className="flex items-center space-x-2">
            <Switch
              id="consent"
              checked={form.consent}
              onCheckedChange={(checked) => setForm((f) => ({ ...f, consent: checked }))}
            />
            <Label htmlFor="consent">Согласие с политикой *</Label>
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
