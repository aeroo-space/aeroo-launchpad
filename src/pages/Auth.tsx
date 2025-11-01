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
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [inviteInfo, setInviteInfo] = useState<any>(null);
  const [processingInvite, setProcessingInvite] = useState(false);

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
    const invite = urlParams.get('invite');
    
    if (token && type === 'recovery') {
      setShowResetPwd(true);
      // Очищаем URL от параметров
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Обработка приглашения
    if (invite) {
      setInviteToken(invite);
      fetchInviteInfo(invite);
      // Не очищаем URL до тех пор, пока не обработаем приглашение
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

  const fetchInviteInfo = async (token: string) => {
    try {
      const { data, error } = await supabase
        .from("invites")
        .select(`
          id,
          team_id,
          competition_id,
          status,
          expires_at,
          team:enrollments(team_name)
        `)
        .eq("token", token)
        .eq("status", "pending")
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error("Приглашение не найдено или уже использовано");
        setInviteToken(null);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Проверяем срок действия
      if (new Date(data.expires_at) < new Date()) {
        toast.error("Приглашение истекло");
        setInviteToken(null);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      setInviteInfo(data);
      toast.info(`Вы приглашены в команду "${data.team?.team_name}"`, {
        description: "Войдите или зарегистрируйтесь, чтобы принять приглашение"
      });
    } catch (error: any) {
      console.error("Error fetching invite:", error);
      toast.error("Ошибка загрузки приглашения");
      setInviteToken(null);
    }
  };

  // Обработка приглашения после входа
  useEffect(() => {
    if (user && inviteToken && inviteInfo && !processingInvite) {
      handleAcceptInvite();
    }
  }, [user, inviteToken, inviteInfo]);

  const handleAcceptInvite = async () => {
    if (!user || !inviteInfo || processingInvite) return;

    setProcessingInvite(true);
    try {
      // Проверяем, не состоит ли пользователь уже в другой команде
      const { data: existingTeam } = await supabase
        .from("team_members")
        .select(`
          id,
          team:enrollments!inner(competition_id)
        `)
        .eq("user_id", user.id)
        .eq("status", "active")
        .eq("enrollments.competition_id", inviteInfo.competition_id)
        .maybeSingle();

      if (existingTeam) {
        toast.error("Вы уже состоите в команде для этого соревнования");
        setInviteToken(null);
        setInviteInfo(null);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Обновляем статус приглашения
      const { error: inviteError } = await supabase
        .from("invites")
        .update({
          status: 'accepted',
          accepted_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq("id", inviteInfo.id);

      if (inviteError) throw inviteError;

      // Создаём запись в team_members
      const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id: inviteInfo.team_id,
          user_id: user.id,
          role: 'member',
          status: 'active',
          joined_at: new Date().toISOString()
        });

      if (memberError) throw memberError;

      toast.success(`Вы успешно присоединились к команде "${inviteInfo.team?.team_name}"!`);
      
      // Очищаем состояние и URL
      setInviteToken(null);
      setInviteInfo(null);
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Перенаправляем на дашборд
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error accepting invite:", error);
      toast.error("Ошибка принятия приглашения", { description: error.message });
    } finally {
      setProcessingInvite(false);
    }
  };

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
        
        // Normalize phone for validation
        const phoneDigits = phone.replace(/\D/g, '');
        
        // Validate all profile fields for signup (telegram is optional)
        if (!fullName.trim() || 
            iin.length !== 12 || 
            phoneDigits.length !== 11 || 
            !school.trim() || 
            !city.trim() || 
            !grade || 
            !age) {
          alert("Пожалуйста, заполните все обязательные поля");
          return;
        }
        
        // Prepare user metadata for Supabase
        const userData = {
          full_name: fullName.trim(),
          iin: iin,
          phone: phone,
          telegram: telegram === '@' || telegram.trim() === '' ? null : telegram,
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
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <h1 className="sr-only">{t('auth.heading', { defaultValue: 'Аутентификация AEROO' })}</h1>
        <div className="max-w-md mx-auto rounded-2xl border border-border/60 p-4 sm:p-6 bg-card shadow-sm">
          {inviteInfo && (
            <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm font-medium text-primary mb-1">
                🎉 Приглашение в команду
              </p>
              <p className="text-sm">
                Команда: <strong>{inviteInfo.team?.team_name}</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Войдите или зарегистрируйтесь, чтобы принять приглашение
              </p>
            </div>
          )}
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

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.emailBasic', { defaultValue: 'Email' })}</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>


            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password', { defaultValue: 'Пароль' })}</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
              {mode === "signup" && (
                <p className="text-xs text-muted-foreground">
                  {t('auth.passwordRequirements', { defaultValue: 'Минимум 8 символов, одна заглавная буква и один спецсимвол' })}
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
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword', { defaultValue: 'Подтвердите пароль' })} *</Label>
                <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} required />
              </div>
            )}

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('form.fullName', { defaultValue: 'ФИО' })} *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                    placeholder={t('form.fullNamePlaceholder', { defaultValue: 'Иванов Иван Иванович' })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iin">{t('form.iin', { defaultValue: 'ИИН' })} *</Label>
                  <Input
                    id="iin"
                    value={iin}
                    onChange={handleIinChange}
                    placeholder={t('form.iinPlaceholder', { defaultValue: '123456789012' })}
                    maxLength={12}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('form.phone', { defaultValue: 'Телефон' })} *</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={t('form.phonePlaceholder', { defaultValue: '+7 700 000 00 00' })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">{t('form.telegram', { defaultValue: 'Telegram' })}</Label>
                  <Input
                    id="telegram"
                    value={telegram}
                    onChange={handleTelegramChange}
                    placeholder={t('form.telegramPlaceholder', { defaultValue: '@username (необязательно)' })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">{t('form.school', { defaultValue: 'Учебное заведение' })} *</Label>
                  <Input
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder={t('form.schoolPlaceholder', { defaultValue: 'Название школы/ВУЗа' })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t('form.city', { defaultValue: 'Город' })} *</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('form.cityPlaceholder', { defaultValue: 'Алматы' })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">{t('form.grade', { defaultValue: 'Класс/Курс обучения' })} *</Label>
                  <Input
                    id="grade"
                    value={grade}
                    onChange={handleGradeChange}
                    placeholder={t('form.gradePlaceholder', { defaultValue: '11' })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">{t('form.age', { defaultValue: 'Возраст' })} *</Label>
                  <Input
                    id="age"
                    value={age}
                    onChange={handleAgeChange}
                    placeholder={t('form.agePlaceholder', { defaultValue: '18' })}
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
