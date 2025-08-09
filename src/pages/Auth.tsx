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

useEffect(() => {
  document.title = mode === "signin" ? t('auth.metaTitle.signin', { defaultValue: 'Вход — AEROO' }) : t('auth.metaTitle.signup', { defaultValue: 'Регистрация — AEROO' });
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('auth.metaDesc', { defaultValue: 'Вход и регистрация AEROO — авторизация для участия в соревнованиях' }));
}, [mode, t]);

  useEffect(() => {
    if (!loading && user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

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

      <Footer />
    </div>
  );
};

export default Auth;
