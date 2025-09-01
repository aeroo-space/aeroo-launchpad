import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface ProfileSetupDialogProps {
  user: User;
  open: boolean;
  onComplete: () => void;
}

export function ProfileSetupDialog({ user, open, onComplete }: ProfileSetupDialogProps) {
  const [fullName, setFullName] = useState("");
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            full_name: fullName,
            iin,
            phone,
            telegram,
            school,
            city,
            grade,
            profile_completed: true,
          },
          { onConflict: 'user_id' }
        );

      if (error) throw error;

      toast.success("Профиль успешно создан!");
      onComplete();
    } catch (error: any) {
      toast.error("Ошибка при создании профиля", { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = fullName && iin && phone && telegram && school && city && grade;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <button 
          onClick={(e) => e.preventDefault()} 
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          style={{ display: 'none' }}
        >
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle>Завершите настройку профиля</DialogTitle>
          <DialogDescription>
            Пожалуйста, заполните информацию о себе для завершения регистрации.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iin">ИИН *</Label>
            <Input
              id="iin"
              value={iin}
              onChange={(e) => setIin(e.target.value)}
              placeholder="123456789012"
              maxLength={12}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 700 000 00 00"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram *</Label>
            <Input
              id="telegram"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="@username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">Учебное заведение *</Label>
            <Input
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Название школы/ВУЗа"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Город *</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Алматы"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Класс обучения *</Label>
            <Input
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="11 класс"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={submitting || !isValid}
          >
            {submitting ? "Сохранение..." : "Завершить регистрацию"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}