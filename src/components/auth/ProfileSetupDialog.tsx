import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";

interface ProfileSetupDialogProps {
  user: User;
  open: boolean;
  onComplete: () => void;
}

export function ProfileSetupDialog({ user, open, onComplete }: ProfileSetupDialogProps) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("+7");
  const [telegram, setTelegram] = useState("@");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^а-яёА-ЯЁa-zA-Z\s]/g, '');
    setFullName(value);
  };

  const handleIinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    setIin(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('7')) {
      value = '7' + value;
    }
    value = value.slice(0, 11);
    
    if (value.length >= 1) {
      let formatted = '+7';
      if (value.length > 1) {
        formatted += ' ' + value.slice(1, 4);
      }
      if (value.length > 4) {
        formatted += ' ' + value.slice(4, 7);
      }
      if (value.length > 7) {
        formatted += ' ' + value.slice(7, 9);
      }
      if (value.length > 9) {
        formatted += ' ' + value.slice(9, 11);
      }
      setPhone(formatted);
    } else {
      setPhone('+7');
    }
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('@')) {
      value = '@' + value.replace('@', '');
    }
    setTelegram(value);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setGrade(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            full_name: fullName,
            iin,
            phone,
            telegram,
            school,
            city,
            grade: parseInt(grade) || 1,
            age: 18, // Default age
            is_complete: true,
          },
          { onConflict: "id" }
        );

      if (error) throw error;

      toast.success(t('profileSetup.success'));
      onComplete();
    } catch (error: any) {
      toast.error(t('profileSetup.error'), { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = fullName && iin.length === 12 && phone.length === 17 && telegram.length > 1 && school && city && grade;

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
          <DialogTitle>{t('profileSetup.title')}</DialogTitle>
          <DialogDescription>
            {t('profileSetup.description')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t('profileSetup.fullName')} *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder={t('profileSetup.fullNamePlaceholder')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iin">{t('profileSetup.iin')} *</Label>
            <Input
              id="iin"
              value={iin}
              onChange={handleIinChange}
              placeholder={t('profileSetup.iinPlaceholder')}
              maxLength={12}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t('profileSetup.phone')} *</Label>
            <Input
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t('profileSetup.phonePlaceholder')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram">{t('profileSetup.telegram')} *</Label>
            <Input
              id="telegram"
              value={telegram}
              onChange={handleTelegramChange}
              placeholder={t('profileSetup.telegramPlaceholder')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">{t('profileSetup.school')} *</Label>
            <Input
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder={t('profileSetup.schoolPlaceholder')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">{t('profileSetup.city')} *</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t('profileSetup.cityPlaceholder')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">{t('profileSetup.grade')} *</Label>
            <Input
              id="grade"
              value={grade}
              onChange={handleGradeChange}
              placeholder={t('profileSetup.gradePlaceholder')}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={submitting || !isValid}
          >
            {submitting ? t('profileSetup.submitting') : t('profileSetup.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}