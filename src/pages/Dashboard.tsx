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
import EditEnrollmentDialog from "@/components/enrollments/EditEnrollmentDialog";
import { Pencil } from "lucide-react";
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
  const [selected, setSelected] = useState<Enrollment | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [pwdSubmitting, setPwdSubmitting] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");
  const [fieldSubmitting, setFieldSubmitting] = useState(false);
  useEffect(() => {
    document.title = t('dashboard.title', { defaultValue: 'Личный кабинет — AEROO' });
  }, [t]);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    (async () => {
      // Check if user is admin
      const { data: adminCheck } = await supabase.rpc('is_admin');
      setIsAdmin(adminCheck || false);

      // Load enrollments
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!enrollmentError && enrollmentData) {
        setEnrollments(enrollmentData as Enrollment[]);
      }

      // Load product requests if admin
      if (adminCheck) {
        const { data: requestData, error: requestError } = await supabase
          .from("product_requests")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (!requestError && requestData) {
          setProductRequests(requestData);
        }
      }

      setLoading(false);
    })();
  }, [user, navigate]);

  const compsById = useMemo(() => {
    const map: Record<string, string> = {};
    competitions.forEach((c) => (map[c.id] = c.title));
    return map;
  }, []);

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
                          <div className="font-medium">{compsById[e.competition_id] ?? e.competition_id}</div>
                          <div className="text-sm text-muted-foreground">{t('dashboardExtra.labels.team', { defaultValue: 'Команда' })}: {e.team_name || "—"}</div>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <div>{t('dashboardExtra.labels.email', { defaultValue: 'Email' })}: {e.email || "—"}</div>
                            <div>{t('dashboardExtra.labels.telegram', { defaultValue: 'Telegram' })}: {e.telegram || "—"}</div>
                            <div>{t('dashboardExtra.labels.captain', { defaultValue: 'Капитан' })}: {e.captain_full_name || "—"}</div>
                            <div>{t('dashboardExtra.labels.captainPhone', { defaultValue: 'Телефон капитана' })}: {e.captain_phone || "—"}</div>
                            <div>{t('dashboardExtra.labels.captainAge', { defaultValue: 'Возраст капитана' })}: {e.captain_age ?? "—"}</div>
                            <div>{t('dashboardExtra.labels.city', { defaultValue: 'Город' })}: {e.city || "—"}</div>
                            <div>{t('dashboardExtra.labels.studyPlace', { defaultValue: 'Место обучения' })}: {e.study_place || "—"}</div>
                            <div>{t('dashboardExtra.labels.source', { defaultValue: 'Источник' })}: {e.source || "—"}</div>
                          </div>
                          <div className="mt-2 text-sm">
                            <div>Участник 1: {e.participant1_full_name || "—"}</div>
                            <div>Участник 2: {e.participant2_full_name || "—"}</div>
                            <div>Участник 3: {e.participant3_full_name || "—"}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground uppercase tracking-wide">
                            {e.status || "active"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setSelected(e); setEditOpen(true); }}>
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
        </section>
        {selected && (
          <EditEnrollmentDialog
            enrollment={selected}
            open={editOpen}
            onOpenChange={(o) => setEditOpen(o)}
            onUpdated={(updated) => {
              setEnrollments((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
              setSelected(updated);
            }}
          />
        )}


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
