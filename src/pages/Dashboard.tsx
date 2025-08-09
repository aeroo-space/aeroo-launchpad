import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { competitions } from "@/data/competitions";
import { useNavigate } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";
import EditEnrollmentDialog from "@/components/enrollments/EditEnrollmentDialog";
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
  const navigate = useNavigate();
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enrollment | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    document.title = "Личный кабинет — AEROO";
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    (async () => {
      const { data, error } = await (supabase as any)
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setEnrollments(data as Enrollment[]);
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
      toast.success("Регистрация удалена");
    } catch (err: any) {
      toast.error("Не удалось удалить", { description: err.message });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          <Button variant="outline" onClick={signOut}>Выйти</Button>
        </header>

        <section className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Мои участия в соревнованиях</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Загрузка...</p>
              ) : enrollments.length === 0 ? (
                <p className="text-muted-foreground">Пока нет записей. Перейдите на страницу «Соревнования», чтобы записаться.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {enrollments.map((e) => (
                    <li key={e.id} className="py-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{compsById[e.competition_id] ?? e.competition_id}</div>
                          <div className="text-sm text-muted-foreground">Команда: {e.team_name || "—"}</div>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <div>Email: {e.email || "—"}</div>
                            <div>Telegram: {e.telegram || "—"}</div>
                            <div>Капитан: {e.captain_full_name || "—"}</div>
                            <div>Телефон капитана: {e.captain_phone || "—"}</div>
                            <div>Возраст капитана: {e.captain_age ?? "—"}</div>
                            <div>Город: {e.city || "—"}</div>
                            <div>Место обучения: {e.study_place || "—"}</div>
                            <div>Источник: {e.source || "—"}</div>
                          </div>
                          <div className="mt-2 text-sm">
                            <div>2 участник: {e.participant2_info || "—"}</div>
                            <div>3 участник: {e.participant3_info || "—"}</div>
                            <div>4 участник: {e.participant4_info || "—"}</div>
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
                          Редактировать
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Удалить регистрацию?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие необратимо. Ваша запись в соревнование будет удалена.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(e.id)}>Удалить</AlertDialogAction>
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
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
