import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import type { User } from "@supabase/supabase-js";

interface ForcePasswordResetDialogProps {
  user: User;
  open: boolean;
  onComplete: () => void;
}

export const ForcePasswordResetDialog: React.FC<ForcePasswordResetDialogProps> = ({
  user,
  open,
  onComplete,
}) => {
  const { t } = useTranslation();
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPwd !== newPwd2) {
      toast.error("Пароли не совпадают");
      return;
    }
    
    const valid = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(newPwd);
    if (!valid) {
      toast.error("Пароль не соответствует требованиям", { 
        description: "Минимум 8 символов, одна заглавная буква и один спецсимвол" 
      });
      return;
    }
    
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPwd });
      if (error) throw error;
      
      toast.success("Пароль успешно изменён");
      setNewPwd("");
      setNewPwd2("");
      onComplete();
    } catch (err: any) {
      toast.error("Ошибка обновления пароля", { description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Необходимо сменить пароль</DialogTitle>
          <DialogDescription>
            По соображениям безопасности необходимо установить новый пароль для вашего аккаунта.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forceNewPassword">
              {t('auth.newPassword', { defaultValue: 'Новый пароль' })}
            </Label>
            <Input
              id="forceNewPassword"
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="forceConfirmPassword">
              {t('auth.confirmPassword', { defaultValue: 'Подтвердите пароль' })}
            </Label>
            <Input
              id="forceConfirmPassword"
              type="password"
              value={newPwd2}
              onChange={(e) => setNewPwd2(e.target.value)}
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Минимум 8 символов, одна заглавная буква и один спецсимвол
          </p>
          <div className="flex justify-end">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Сохранение..." : "Сохранить новый пароль"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};