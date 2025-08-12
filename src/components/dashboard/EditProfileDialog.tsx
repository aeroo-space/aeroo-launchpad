import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  iin: string | null;
  phone: string | null;
  telegram: string | null;
  school: string | null;
  city: string | null;
  grade: string | null;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface EditProfileDialogProps {
  profile: Profile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProfileUpdated: () => void;
}

export function EditProfileDialog({ profile, open, onOpenChange, onProfileUpdated }: EditProfileDialogProps) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    iin: profile?.iin || "",
    phone: profile?.phone || "",
    telegram: profile?.telegram || "",
    school: profile?.school || "",
    city: profile?.city || "",
    grade: profile?.grade || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSubmitting(true);

      // Update profile in database
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name.trim() || null,
          iin: formData.iin.trim() || null,
          phone: formData.phone.trim() || null,
          telegram: formData.telegram.trim() || null,
          school: formData.school.trim() || null,
          city: formData.city.trim() || null,
          grade: formData.grade.trim() || null,
          profile_completed: true,
        })
        .eq("user_id", profile.user_id);

      if (profileError) throw profileError;

      // Update auth metadata for full_name
      if (formData.full_name.trim()) {
        const { error: authError } = await supabase.auth.updateUser({
          data: { full_name: formData.full_name.trim() }
        });
        if (authError) console.warn("Auth metadata update failed:", authError);
      }

      toast.success(t('dashboard.profileUpdated', { defaultValue: 'Профиль обновлён' }));
      onProfileUpdated();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(t('dashboard.profileUpdateError', { defaultValue: 'Ошибка обновления профиля' }), {
        description: error.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        iin: profile.iin || "",
        phone: profile.phone || "",
        telegram: profile.telegram || "",
        school: profile.school || "",
        city: profile.city || "",
        grade: profile.grade || "",
      });
    }
  }, [profile]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('dashboard.editProfile', { defaultValue: 'Редактировать профиль' })}</DialogTitle>
          <DialogDescription>
            {t('dashboard.editProfileDesc', { defaultValue: 'Обновите свою личную информацию' })}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('profile.fullName', { defaultValue: 'ФИО' })}</Label>
              <Input
                id="fullName"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                placeholder={t('profile.fullNamePlaceholder', { defaultValue: 'Введите ваше полное имя' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iin">{t('profile.iin', { defaultValue: 'ИИН' })}</Label>
              <Input
                id="iin"
                value={formData.iin}
                onChange={(e) => handleInputChange('iin', e.target.value)}
                placeholder={t('profile.iinPlaceholder', { defaultValue: '123456789012' })}
                maxLength={12}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('profile.phone', { defaultValue: 'Телефон' })}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t('profile.phonePlaceholder', { defaultValue: '+7 (xxx) xxx-xx-xx' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram">{t('profile.telegram', { defaultValue: 'Telegram' })}</Label>
              <Input
                id="telegram"
                value={formData.telegram}
                onChange={(e) => handleInputChange('telegram', e.target.value)}
                placeholder={t('profile.telegramPlaceholder', { defaultValue: '@username' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">{t('profile.school', { defaultValue: 'Школа/Университет' })}</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder={t('profile.schoolPlaceholder', { defaultValue: 'Название учебного заведения' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t('profile.city', { defaultValue: 'Город' })}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder={t('profile.cityPlaceholder', { defaultValue: 'Ваш город' })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="grade">{t('profile.grade', { defaultValue: 'Класс/Курс' })}</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                placeholder={t('profile.gradePlaceholder', { defaultValue: '11 класс / 2 курс' })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              {t('common.cancel', { defaultValue: 'Отмена' })}
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? t('common.saving', { defaultValue: 'Сохранение...' }) : t('common.save', { defaultValue: 'Сохранить' })}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}