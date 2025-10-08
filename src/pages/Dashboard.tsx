import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import { competitions } from "@/data/competitions";
import { useNavigate } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { Pencil, Download } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Enrollment = Tables<"enrollments">;

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [productRequests, setProductRequests] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [pwdSubmitting, setPwdSubmitting] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");
  const [fieldSubmitting, setFieldSubmitting] = useState(false);
  const [adminEnrollments, setAdminEnrollments] = useState<Enrollment[]>([]);
  useEffect(() => {
    document.title = t('dashboard.title', { defaultValue: 'Личный кабинет — AEROO' });
  }, [t]);

  // Function to load enrollments
  const loadEnrollments = async () => {
    if (!user) return;
    
    const { data: enrollmentData, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    if (!enrollmentError && enrollmentData) {
      setEnrollments(enrollmentData as Enrollment[]);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    (async () => {
      // Check if user is admin
      const { data: adminCheck, error: adminError } = await supabase.rpc('is_admin');
      setIsAdmin(adminCheck || false);

      // Load enrollments
      await loadEnrollments();

      // Load product requests if admin
      if (adminCheck) {
        const { data: requestData, error: requestError } = await supabase
          .from("product_requests")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (!requestError && requestData) {
          setProductRequests(requestData);
        }

        // Load all enrollments for admin view
        const { data: allEnrollments, error: enrollmentError } = await supabase
          .from("enrollments")
          .select("*")
          .eq("competition_id", "space-settlement-2025")
          .order("created_at", { ascending: false });
        
        if (!enrollmentError && allEnrollments) {
          setAdminEnrollments(allEnrollments as Enrollment[]);
        }
      }

      setLoading(false);
    })();
  }, [user, navigate]);

  // Set up real-time subscription for enrollments
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('enrollments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enrollments',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Enrollment change detected:', payload);
          // Reload enrollments when any change occurs
          loadEnrollments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const compsById = useMemo(() => {
    const map: Record<string, string> = {};
    competitions.forEach((c) => (map[c.id] = t(c.title)));
    return map;
  }, [t]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("enrollments").delete().eq("id", id);
      if (error) throw error;
      setEnrollments((prev) => prev.filter((x) => x.id !== id));
      toast.success(t('dashboardExtra.toasts.deleteSuccess', { defaultValue: 'Регистрация удалена' }));
    } catch (err: any) {
      toast.error(t('dashboardExtra.toasts.deleteError', { defaultValue: 'Не удалось удалить' }), { description: err.message });
    }
  };

  const handleDeleteProductRequest = async (id: string) => {
    try {
      const { error } = await supabase.from("product_requests").delete().eq("id", id);
      if (error) throw error;
      setProductRequests((prev) => prev.filter((x) => x.id !== id));
      toast.success('Заявка удалена');
    } catch (err: any) {
      toast.error('Не удалось удалить заявку', { description: err.message });
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== newPwd2) {
      toast.error(t('auth.passwordsDontMatch', { defaultValue: 'Пароли не совпадают' }));
      return;
    }
    const valid = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/.test(newPwd);
    if (!valid) {
      toast.error(t('auth.passwordInvalid', { defaultValue: 'Пароль не соответствует требованиям' }), { description: t('auth.passwordRules', { defaultValue: 'Минимум 8 символов, одна заглавная буква и один спецсимвол' }) });
      return;
    }
    try {
      setPwdSubmitting(true);
      const { error } = await supabase.auth.updateUser({ password: newPwd });
      if (error) throw error;
      toast.success(t('auth.passwordUpdated', { defaultValue: 'Пароль обновлён' }));
      setPwdOpen(false);
      setNewPwd("");
      setNewPwd2("");
    } catch (err: any) {
      toast.error(t('auth.passwordUpdateError', { defaultValue: 'Ошибка обновления пароля' }), { description: err.message });
    } finally {
      setPwdSubmitting(false);
    }
  };

  const handleFieldEdit = (field: string, currentValue: string | null) => {
    setEditingField(field);
    setFieldValue(currentValue || "");
  };

  const handleFieldCancel = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const handleFieldSave = async () => {
    if (!profile || !editingField) return;

    try {
      setFieldSubmitting(true);
      
      const updateData = {
        [editingField]: fieldValue.trim() || null,
      };

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", profile.id);

      if (error) throw error;

      // Update auth metadata for full_name
      if (editingField === 'full_name' && fieldValue.trim()) {
        const { error: authError } = await supabase.auth.updateUser({
          data: { full_name: fieldValue.trim() }
        });
        if (authError) console.warn("Auth metadata update failed:", authError);
      }

      toast.success(t('dashboard.fieldUpdated', { defaultValue: 'Поле обновлено' }));
      refetchProfile();
      setEditingField(null);
      setFieldValue("");
    } catch (error: any) {
      toast.error(t('dashboard.fieldUpdateError', { defaultValue: 'Ошибка обновления' }), {
        description: error.message
      });
    } finally {
      setFieldSubmitting(false);
    }
  };

  const downloadEnrollments = () => {
    const csvContent = [
      // CSV Header
      [
        'Дата регистрации',
        'Команда',
        'Лига',
        'Капитан',
        'Email капитана',
        'Телефон капитана',
        'Возраст капитана',
        'Город',
        'Место обучения',
        'Участник 2',
        'Участник 3', 
        'Участник 4',
        'Участник 5',
        'Наставник',
        'Телефон наставника',
        'Источник',
        'Статус'
      ].join(','),
      // CSV Data
      ...adminEnrollments.map(enrollment => [
        new Date(enrollment.created_at).toLocaleDateString('ru-RU'),
        `"${enrollment.team_name || 'Не указано'}"`,
        `"${enrollment.league || 'Не указано'}"`,
        `"${enrollment.captain_full_name || 'Не указано'}"`,
        `"${enrollment.email || 'Не указано'}"`,
        `"${enrollment.captain_phone || 'Не указано'}"`,
        enrollment.captain_age || 'Не указано',
        `"${enrollment.city || 'Не указано'}"`,
        `"${enrollment.study_place || 'Не указано'}"`,
        `"${enrollment.participant1_full_name || 'Не указано'}"`,
        `"${enrollment.participant2_full_name || 'Не указано'}"`,
        `"${enrollment.participant3_full_name || 'Не указано'}"`,
        `"${enrollment.participant4_full_name || 'Не указано'}"`,
        `"${enrollment.mentor_full_name || 'Не указано'}"`,
        `"${enrollment.mentor_phone || 'Не указано'}"`,
        `"${enrollment.source || 'Не указано'}"`,
        `"${enrollment.status === 'active' ? 'Активный' : enrollment.status}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `space-settlement-2025-teams-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{t('dashboard.title', { defaultValue: 'Личный кабинет' })}</h1>
          <Button variant="outline" onClick={signOut}>{t('dashboard.logout', { defaultValue: 'Выйти' })}</Button>
        </header>

        <section className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.profile', { defaultValue: 'Профиль' })}</CardTitle>
            </CardHeader>
            <CardContent>
              {profileLoading ? (
                <p className="text-muted-foreground">{t('dashboard.loading', { defaultValue: 'Загрузка...' })}</p>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.email', { defaultValue: 'Email' })}</div>
                      <div className="font-medium">{user.email || "—"}</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.fullName', { defaultValue: 'ФИО' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'full_name' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.fullNamePlaceholder', { defaultValue: 'Введите ваше полное имя' })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.full_name || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('full_name', profile?.full_name)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.iin', { defaultValue: 'ИИН' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'iin' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.iinPlaceholder', { defaultValue: '123456789012' })}
                              maxLength={12}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.iin || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('iin', profile?.iin)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.phone', { defaultValue: 'Телефон' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'phone' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.phonePlaceholder', { defaultValue: '+7 (xxx) xxx-xx-xx' })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.phone || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('phone', profile?.phone)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.telegram', { defaultValue: 'Telegram' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'telegram' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.telegramPlaceholder', { defaultValue: '@username' })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.telegram || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('telegram', profile?.telegram)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.school', { defaultValue: 'Школа/Университет' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'school' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.schoolPlaceholder', { defaultValue: 'Название учебного заведения' })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.school || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('school', profile?.school)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.city', { defaultValue: 'Город' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'city' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.cityPlaceholder', { defaultValue: 'Ваш город' })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.city || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('city', profile?.city)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('dashboard.grade', { defaultValue: 'Класс/Курс' })}</div>
                      <div className="flex items-center gap-2">
                        {editingField === 'grade' ? (
                          <div className="flex items-center gap-2 flex-1">
                            <Input
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              placeholder={t('profile.gradePlaceholder', { defaultValue: '11 класс / 2 курс' })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={handleFieldSave} disabled={fieldSubmitting}>
                              {t('common.save', { defaultValue: 'Сохранить' })}
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleFieldCancel}>
                              {t('common.cancel', { defaultValue: 'Отмена' })}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium flex-1">{profile?.grade || "—"}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFieldEdit('grade', profile?.grade?.toString() || '')}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setPwdOpen(true)}>
                      {t('dashboard.changePassword', { defaultValue: 'Сменить пароль' })}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.myEnrollments', { defaultValue: 'Мои участия в соревнованиях' })}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">{t('dashboard.loading', { defaultValue: 'Загрузка...' })}</p>
              ) : enrollments.length === 0 ? (
                <p className="text-muted-foreground">{t('dashboard.empty', { defaultValue: 'Пока нет записей. Перейдите на страницу «Соревнования», чтобы записаться.' })}</p>
              ) : (
                <ul className="divide-y divide-border">
                  {enrollments.map((e) => (
                    <li key={e.id} className="py-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">
                            {competitions.find(c => c.id === e.competition_id) 
                              ? t(competitions.find(c => c.id === e.competition_id)!.title)
                              : e.competition_id}
                          </div>
                          <div className="text-sm text-muted-foreground">{t('dashboardExtra.labels.team', { defaultValue: 'Команда' })}: {e.team_name || "—"}</div>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <div>{t('dashboardExtra.labels.email', { defaultValue: 'Email' })}: {e.email || "—"}</div>
                            <div>{t('dashboardExtra.labels.telegram', { defaultValue: 'Telegram' })}: {e.telegram || "—"}</div>
                          </div>
                          <div className="mt-2 text-sm">
                            <div>{t('dashboardExtra.labels.captain', { defaultValue: 'Капитан' })}: {e.captain_full_name || "—"}</div>
                            <div>Участник 2: {e.participant1_full_name || "—"}</div>
                            <div>Участник 3: {e.participant2_full_name || "—"}</div>
                            <div>Участник 4: {e.participant3_full_name || "—"}</div>
                            <div>Участник 5: {e.participant4_full_name || "—"}</div>
                            {e.mentor_full_name && <div className="mt-1 pt-1 border-t">Ментор: {e.mentor_full_name}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground uppercase tracking-wide">
                            {e.status || "active"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/enroll/space-settlement?edit=${e.id}`)}>
                          {t('dashboardExtra.actions.edit', { defaultValue: 'Редактировать' })}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">{t('dashboardExtra.actions.delete', { defaultValue: 'Удалить' })}</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t('dashboardExtra.confirm.title', { defaultValue: 'Удалить регистрацию?' })}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t('dashboardExtra.confirm.desc', { defaultValue: 'Это действие необратимо. Ваша запись в соревнование будет удалена.' })}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t('dashboardExtra.actions.cancel', { defaultValue: 'Отмена' })}</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(e.id)}>{t('dashboardExtra.actions.confirmDelete', { defaultValue: 'Удалить' })}</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Admin Panel - Space Settlement Competition Enrollments */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Участники Space Settlement Competition 2025</CardTitle>
                  <Button 
                    onClick={downloadEnrollments}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Скачать список
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Всего зарегистрировано команд: {adminEnrollments.length}
                </p>
              </CardHeader>
              <CardContent>
                {adminEnrollments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Download className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Участников пока нет</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {adminEnrollments.map((enrollment) => (
                      <div key={enrollment.id} className="border rounded-xl p-6 space-y-4 bg-gradient-to-r from-background to-muted/20 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-semibold text-primary">
                                {enrollment.team_name || "Команда без названия"}
                              </h4>
                              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                enrollment.status === 'active' 
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}>
                                {enrollment.status === 'active' ? 'Активная команда' : enrollment.status}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span className="font-medium">Капитан:</span> {enrollment.captain_full_name}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span className="font-medium">Лига:</span> {enrollment.league}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {new Date(enrollment.created_at).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Contact Info */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Контактная информация</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                <span className="text-muted-foreground">Email:</span>
                                <span className="break-all">{enrollment.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                <span className="text-muted-foreground">Телефон:</span>
                                <span>{enrollment.captain_phone}</span>
                              </div>
                              {enrollment.telegram && (
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                  <span className="text-muted-foreground">Telegram:</span>
                                  <span>{enrollment.telegram}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                                <span className="text-muted-foreground">Возраст:</span>
                                <span>{enrollment.captain_age} лет</span>
                              </div>
                            </div>
                          </div>

                          {/* Team Members */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Состав команды</h5>
                            <div className="space-y-2">
                              {[
                                enrollment.participant1_full_name,
                                enrollment.participant2_full_name,
                                enrollment.participant3_full_name,
                                enrollment.participant4_full_name
                              ].filter(Boolean).map((participant, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium">
                                    {index + 1}
                                  </span>
                                  <span>{participant}</span>
                                </div>
                              ))}
                              {![
                                enrollment.participant1_full_name,
                                enrollment.participant2_full_name,
                                enrollment.participant3_full_name,
                                enrollment.participant4_full_name
                              ].filter(Boolean).length && (
                                <p className="text-sm text-muted-foreground italic">Участники не указаны</p>
                              )}
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="space-y-3">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Дополнительная информация</h5>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Город:</span>
                                <span className="ml-2">{enrollment.city || "Не указан"}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Учебное заведение:</span>
                                <span className="ml-2">{enrollment.study_place || "Не указано"}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Наставник:</span>
                                <span className="ml-2">{enrollment.mentor_full_name || "Не указан"}</span>
                              </div>
                              {enrollment.mentor_phone && (
                                <div>
                                  <span className="text-muted-foreground">Телефон наставника:</span>
                                  <span className="ml-2">{enrollment.mentor_phone}</span>
                                </div>
                              )}
                              <div>
                                <span className="text-muted-foreground">Источник:</span>
                                <span className="ml-2">{enrollment.source || "Не указан"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {enrollment.questions && (
                          <div className="pt-4 border-t">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">Вопросы от команды</h5>
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <p className="text-sm leading-relaxed">{enrollment.questions}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Admin Panel - Product Requests */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Заявки на связь</CardTitle>
              </CardHeader>
              <CardContent>
                {productRequests.length === 0 ? (
                  <p className="text-muted-foreground">Заявок пока нет</p>
                ) : (
                  <div className="space-y-4">
                    {productRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-medium">{request.name}</h4>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                            {request.phone && (
                              <p className="text-sm text-muted-foreground">Телефон: {request.phone}</p>
                            )}
                            {request.organization && (
                              <p className="text-sm text-muted-foreground">Организация: {request.organization}</p>
                            )}
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{new Date(request.created_at).toLocaleDateString('ru-RU')}</div>
                            <div className={`inline-block px-2 py-1 rounded text-xs ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {request.status === 'pending' ? 'Ожидает' : 
                               request.status === 'completed' ? 'Завершено' : request.status}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">
                            Продукт: {request.product_id === 'partnership' ? 'Партнерство' : request.product_id}
                          </p>
                          {request.comment && (
                            <div>
                              <p className="text-sm font-medium mb-1">Комментарий:</p>
                              <p className="text-sm bg-muted p-2 rounded">{request.comment}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end mt-3">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                Удалить заявку
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Это действие необратимо. Заявка будет полностью удалена из системы.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProductRequest(request.id)}>
                                  Удалить
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </section>


        <Dialog open={pwdOpen} onOpenChange={setPwdOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dashboard.changePassword', { defaultValue: 'Сменить пароль' })}</DialogTitle>
              <DialogDescription>
                {t('auth.passwordRules', { defaultValue: 'Минимум 8 символов, одна заглавная буква и один спецсимвол' })}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('auth.newPassword', { defaultValue: 'Новый пароль' })}</Label>
                <Input id="newPassword" type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword2">{t('auth.confirmPassword', { defaultValue: 'Подтвердите пароль' })}</Label>
                <Input id="newPassword2" type="password" value={newPwd2} onChange={(e)=>setNewPwd2(e.target.value)} required />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setPwdOpen(false)}>{t('common.cancel', { defaultValue: 'Отмена' })}</Button>
                <Button type="submit" disabled={pwdSubmitting}>{t('common.save', { defaultValue: 'Сохранить' })}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
