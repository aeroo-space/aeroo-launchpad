import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("+7");
  const [telegram, setTelegram] = useState("@");
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("");
  const [showEmailCheck, setShowEmailCheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [sendingReset, setSendingReset] = useState(false);
  const [showResetPwd, setShowResetPwd] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);

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

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAge(value);
  };

  useEffect(() => {
    document.title = mode === "signin" ? t('auth.metaTitle.signin', { defaultValue: 'Вход — AEROO' }) : t('auth.metaTitle.signup', { defaultValue: 'Регистрация — AEROO' });
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('auth.metaDesc', { defaultValue: 'Вход и регистрация AEROO — авторизация для участия в соревнованиях' }));
  }, [mode, t]);

  useEffect(() => {
    if (!loading && user) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  useEffect(() => {
    // Проверяем URL параметры для сброса пароля
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const type = urlParams.get('type');
    
    if (token && type === 'recovery') {
      setShowResetPwd(true);
      // Очищаем URL от параметров
      window.history.replaceState({}, document.title, window.location.pathname);
    }

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
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        if (password !== confirmPassword) {
          toast.error("Пароли не совпадают");
          return;
        }
        const isValidPassword = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
        if (!isValidPassword) {
          toast.error("Пароль не соответствует требованиям", { 
            description: "Минимум 8 символов, одна заглавная буква и один спецсимвол" 
          });
          return;
        }
        
        // Normalize phone and telegram for validation
        const phoneDigits = phone.replace(/\D/g, '');
        const telegramUsername = telegram.slice(1); // Remove '@' for length check
        
        console.log('Validation check:', {
          fullName: fullName.trim(),
          iin: iin,
          phoneDigits: phoneDigits,
          telegramUsername: telegramUsername,
          school: school.trim(),
          city: city.trim(),
          grade: grade
        });
        
        // Validate all profile fields for signup
        if (!fullName.trim() || iin.length !== 12 || phoneDigits.length !== 11 || telegramUsername.length === 0 || !school.trim() || !city.trim() || !grade || !age) {
          toast.error("Пожалуйста, заполните все поля корректно", {
            description: "Проверьте все обязательные поля"
          });
          return;
        }
        
        // Prepare user metadata for Supabase
        const userData = {
          full_name: fullName.trim(),
          iin: iin,
          phone: phone,
          telegram: telegram,
          school: school.trim(),
          city: city.trim(),
          grade: grade,
          age: age
        };
        
        console.log('Sending to Supabase:', userData);
        
        // Note: Email validation is handled by Supabase on backend
        await signUp(email, password, userData);
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


            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password', { defaultValue: 'Пароль' })}</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
              {mode === "signup" && (
                <p className="text-xs text-muted-foreground">
                  Минимум 8 символов, одна заглавная буква и один спецсимвол
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
                <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} required />
              </div>
            )}

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">ФИО *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                    placeholder="Иванов Иван Иванович"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iin">ИИН *</Label>
                  <Input
                    id="iin"
                    value={iin}
                    onChange={handleIinChange}
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
                    onChange={handlePhoneChange}
                    placeholder="+7 700 000 00 00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram *</Label>
                  <Input
                    id="telegram"
                    value={telegram}
                    onChange={handleTelegramChange}
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
                  <Label htmlFor="grade">Класс/Курс обучения *</Label>
                  <Input
                    id="grade"
                    value={grade}
                    onChange={handleGradeChange}
                    placeholder="11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Возраст *</Label>
                  <Input
                    id="age"
                    value={age}
                    onChange={handleAgeChange}
                    placeholder="18"
                    required
                  />
                </div>
              </>
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
            <DialogTitle>Проверьте почту</DialogTitle>
            <DialogDescription>
              Мы отправили ссылку для подтверждения на ваш email. Перейдите по ссылке, чтобы активировать аккаунт.
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
              <Input id="rp1" type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rp2">{t('auth.confirmPassword', { defaultValue: 'Подтвердите пароль' })}</Label>
              <Input id="rp2" type="password" value={newPwd2} onChange={(e) => setNewPwd2(e.target.value)} required />
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
