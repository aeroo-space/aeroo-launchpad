import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthProvider";
import { getSupabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";
import { competitions } from "@/data/competitions";
import { useNavigate } from "react-router-dom";

interface Enrollment {
  id: string;
  user_id: string;
  competition_id: string;
  team_name: string | null;
  status: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Личный кабинет — AEROO";
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
      return;
    }
    (async () => {
      let supabase;
      try {
        supabase = getSupabase();
      } catch {
        setLoading(false);
        toast.error("Supabase не настроен", { description: "Перезагрузите страницу и попробуйте снова" });
        return;
      }
      const { data, error } = await supabase
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
                    <li key={e.id} className="py-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{compsById[e.competition_id] ?? e.competition_id}</div>
                        <div className="text-sm text-muted-foreground">Команда: {e.team_name || "—"}</div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground uppercase tracking-wide">
                        {e.status || "active"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
