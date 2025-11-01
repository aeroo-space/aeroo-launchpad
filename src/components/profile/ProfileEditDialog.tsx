import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: Profile;
  onProfileUpdated: () => void;
}

export const ProfileEditDialog = ({ open, onOpenChange, profile, onProfileUpdated }: ProfileEditDialogProps) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    iin: profile.iin || "",
    phone: profile.phone || "",
    telegram: profile.telegram || "",
    school: profile.school || "",
    city: profile.city || "",
    grade: profile.grade?.toString() || "",
  });

  useEffect(() => {
    setFormData({
      full_name: profile.full_name || "",
      iin: profile.iin || "",
      phone: profile.phone || "",
      telegram: profile.telegram || "",
      school: profile.school || "",
      city: profile.city || "",
      grade: profile.grade?.toString() || "",
    });
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const updateData = {
        full_name: formData.full_name.trim() || null,
        iin: formData.iin.trim() || null,
        phone: formData.phone.trim() || null,
        telegram: formData.telegram.trim() || null,
        school: formData.school.trim() || null,
        city: formData.city.trim() || null,
        grade: formData.grade ? parseInt(formData.grade) : null,
      };

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", profile.id);

      if (error) throw error;

      // Update auth metadata for full_name
      if (formData.full_name.trim()) {
        const { error: authError } = await supabase.auth.updateUser({
          data: { full_name: formData.full_name.trim() }
        });
        if (authError) console.warn("Auth metadata update failed:", authError);
      }

      toast.success(t('dashboard.profileUpdated', { defaultValue: 'Профиль обновлен' }));
      onProfileUpdated();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(t('dashboard.profileUpdateError', { defaultValue: 'Ошибка обновления профиля' }), {
        description: error.message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('dashboard.editProfile', { defaultValue: 'Редактировать профиль' })}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t('dashboard.fullName', { defaultValue: 'ФИО' })}</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder={t('profile.fullNamePlaceholder', { defaultValue: 'Введите ваше полное имя' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iin">{t('dashboard.iin', { defaultValue: 'ИИН' })}</Label>
              <Input
                id="iin"
                value={formData.iin}
                onChange={(e) => setFormData({ ...formData, iin: e.target.value })}
                placeholder={t('profile.iinPlaceholder', { defaultValue: '123456789012' })}
                maxLength={12}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('dashboard.phone', { defaultValue: 'Телефон' })}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('profile.phonePlaceholder', { defaultValue: '+7 (xxx) xxx-xx-xx' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram">{t('dashboard.telegram', { defaultValue: 'Telegram' })}</Label>
              <Input
                id="telegram"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder={t('profile.telegramPlaceholder', { defaultValue: '@username' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">{t('dashboard.school', { defaultValue: 'Школа/Университет' })}</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                placeholder={t('profile.schoolPlaceholder', { defaultValue: 'Название учебного заведения' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t('dashboard.city', { defaultValue: 'Город' })}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('profile.cityPlaceholder', { defaultValue: 'Ваш город' })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">{t('dashboard.grade', { defaultValue: 'Класс/Курс' })}</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder={t('profile.gradePlaceholder', { defaultValue: '11' })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
};