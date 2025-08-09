import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [showEmailCheck, setShowEmailCheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [sendingReset, setSendingReset] = useState(false);
  const [showResetPwd, setShowResetPwd] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);

useEffect(() => {
  document.title = mode === "signin" ? t('auth.metaTitle.signin', { defaultValue: 'Вход — AEROO' }) : t('auth.metaTitle.signup', { defaultValue: 'Регистрация — AEROO' });
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('auth.metaDesc', { defaultValue: 'Вход и регистрация AEROO — авторизация для участия в соревнованиях' }));
}, [mode, t]);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setShowResetPwd(true);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
        navigate("/dashboard", { replace: true });
      } else {
        // Валидация пароля и обязательных полей
        const passwordValid = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
        if (!passwordValid) {
          toast.error("Пароль не соответствует требованиям", { description: "Минимум 8 символов, одна заглавная буква и один спецсимвол" });
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Пароли не совпадают");
          return;
        }
        if (!fullName.trim() || !age || !school.trim()) {
          toast.error("Пожалуйста, заполните ФИО, возраст и школу");
          return;
        }
        await signUp(email, password, { full_name: fullName.trim(), age: Number(age), school: school.trim() });
        setShowEmailCheck(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = (forgotEmail || email).trim();
    if (!targetEmail) {
      toast.error("Укажите email");
      return;
    }
    setSendingReset(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      toast.success("Ссылка для восстановления отправлена");
      setShowForgot(false);
    } catch (err: any) {
      toast.error("Не удалось отправить письмо", { description: err.message });
    } finally {
      setSendingReset(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== newPwd2) {
      toast.error("Пароли не совпадают");
      return;
    }
    const valid = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(newPwd);
    if (!valid) {
      toast.error("Пароль не соответствует требованиям", { description: "Минимум 8 символов, одна заглавная буква и один спецсимвол" });
      return;
    }
    setResetSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPwd });
      if (error) throw error;
      toast.success("Пароль обновлён");
      setShowResetPwd(false);
      setMode("signin");
      setNewPwd("");
      setNewPwd2("");
    } catch (err: any) {
      toast.error("Ошибка обновления пароля", { description: err.message });
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="sr-only">{t('auth.heading', { defaultValue: 'Аутентификация AEROO' })}</h1>
        <div className="max-w-md mx-auto rounded-2xl border border-border/60 p-6 bg-card shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-muted p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm ${mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                onClick={() => setMode("signin")}
              >
                {t('auth.signin', { defaultValue: 'Войти' })}
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm ${mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                onClick={() => setMode("signup")}
              >
                {t('auth.signup', { defaultValue: 'Регистрация' })}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.emailBasic', { defaultValue: 'Email' })}</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('auth.fullName', { defaultValue: 'ФИО' })}</Label>
                  <Input id="fullName" placeholder="Иванов Иван Иванович" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">{t('auth.age', { defaultValue: 'Возраст' })}</Label>
                  <Input id="age" type="number" min={1} placeholder="16" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">{t('auth.school', { defaultValue: 'Наименование учебного заведения' })}</Label>
                  <Input id="school" placeholder="Гимназия №1" value={school} onChange={(e) => setSchool(e.target.value)} required />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password', { defaultValue: 'Пароль' })}</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {mode === "signup" && (
                <p className="text-xs text-muted-foreground">
                  {t('auth.passwordRules', { defaultValue: 'Минимум 8 символов, одна заглавная буква и один спецсимвол' })}
                </p>
              )}
            </div>

            {mode === "signin" && (
              <div className="text-right -mt-2">
                <Button type="button" variant="link" onClick={() => { setForgotEmail(email); setShowForgot(true); }}>
                  {t('auth.forgotPassword', { defaultValue: 'Забыли пароль?' })}
                </Button>
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword', { defaultValue: 'Подтвердите пароль' })}</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            )}

            <Button className="w-full" type="submit" disabled={submitting}>
              {mode === "signin" ? t('auth.signin', { defaultValue: 'Войти' }) : t('auth.createAccount', { defaultValue: 'Создать аккаунт' })}
            </Button>
          </form>
        </div>
      </main>

      <Dialog open={showEmailCheck} onOpenChange={setShowEmailCheck}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('auth.checkEmailTitle', { defaultValue: 'Проверьте почту' })}</DialogTitle>
            <DialogDescription>
              {t('auth.checkEmailDesc', { defaultValue: 'Мы отправили ссылку для подтверждения на ваш email. Перейдите по ссылке, чтобы активировать аккаунт.' })}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => { setShowEmailCheck(false); setMode('signin'); }}>
              {t('common.ok', { defaultValue: 'Понятно' })}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showForgot} onOpenChange={setShowForgot}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('auth.forgotPassword', { defaultValue: 'Восстановление пароля' })}</DialogTitle>
            <DialogDescription>
              {t('auth.forgotPasswordDesc', { defaultValue: 'Укажите ваш email. Мы отправим ссылку для восстановления.' })}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgotEmail">{t('form.emailBasic', { defaultValue: 'Email' })}</Label>
              <Input id="forgotEmail" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowForgot(false)}>{t('common.cancel', { defaultValue: 'Отмена' })}</Button>
              <Button type="submit" disabled={sendingReset}>{t('auth.sendLink', { defaultValue: 'Отправить ссылку' })}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetPwd} onOpenChange={setShowResetPwd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('auth.setNewPassword', { defaultValue: 'Установка нового пароля' })}</DialogTitle>
            <DialogDescription>
              {t('auth.passwordRules', { defaultValue: 'Минимум 8 символов, одна заглавная буква и один спецсимвол' })}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rp1">{t('auth.newPassword', { defaultValue: 'Новый пароль' })}</Label>
              <Input id="rp1" type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rp2">{t('auth.confirmPassword', { defaultValue: 'Подтвердите пароль' })}</Label>
              <Input id="rp2" type="password" value={newPwd2} onChange={(e)=>setNewPwd2(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowResetPwd(false)}>{t('common.cancel', { defaultValue: 'Отмена' })}</Button>
              <Button type="submit" disabled={resetSubmitting}>{t('common.save', { defaultValue: 'Сохранить' })}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Auth;
