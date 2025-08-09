import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { competitions, getStatusColor } from "@/data/competitions";
import { useAuth } from "@/contexts/AuthProvider";
import { getSupabase } from "@/lib/supabase";
import { toast } from "@/components/ui/sonner";

const Competitions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenEnroll = (id: string) => {
    if (!user) {
      toast("Войдите, чтобы записаться", { description: "Переходим на страницу входа" });
      navigate("/auth");
      return;
    }
    setSelectedId(id);
    setOpen(true);
  };

  const handleSubmitEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedId) return;
    setSubmitting(true);
    let supabase;
    try {
      supabase = getSupabase();
    } catch {
      setSubmitting(false);
      toast.error("Supabase не настроен", { description: "Перезагрузите страницу и попробуйте снова" });
      return;
    }
    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      competition_id: selectedId,
      team_name: teamName,
      status: "active",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Не удалось записаться", { description: error.message });
      return;
    }
    toast.success("Вы записаны!", { description: "Запись доступна в Личном кабинете" });
    setOpen(false);
    setTeamName("");
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Соревнования AEROO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Присоединяйтесь к инновационным соревнованиям в области аэрокосмических технологий. 
            Проверьте свои навыки и создавайте будущее вместе с нами.
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {competitions.map((competition) => {
            const Icon = competition.icon;
            return (
              <Card key={competition.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-primary group-hover:glow-primary transition-all" />
                    <Badge className={`${getStatusColor(competition.status)} text-white`}>
                      {competition.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {competition.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-primary/70">
                    {competition.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {competition.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Возраст:</span>
                      <span className="font-medium">{competition.ages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Дедлайн:</span>
                      <span className="font-medium">{competition.deadline}</span>
                    </div>
                  </div>
                  
<div className="grid grid-cols-1 gap-3">
                    <Button variant="outline" className="w-full">Подробнее</Button>
                    <Button className="w-full btn-cosmic" onClick={() => handleOpenEnroll(competition.id)}>
                      Записаться с командой
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Archive Section */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Архив соревнований</h2>
          <p className="text-muted-foreground mb-6">
            Изучите результаты прошлых лет и вдохновитесь достижениями участников
          </p>
          <Button variant="outline" size="lg">
            Посмотреть архив
          </Button>
        </div>

        {/* Enroll Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Запись в соревнование</DialogTitle>
              <DialogDescription>
                Укажите название вашей команды. Запись будет сохранена в вашем личном кабинете.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEnroll} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team">Название команды</Label>
                <Input id="team" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Например: AEROO Crew" required />
              </div>
              <Button type="submit" className="w-full" disabled={!teamName || submitting}>
                {submitting ? "Отправка..." : "Подтвердить участие"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Competitions;