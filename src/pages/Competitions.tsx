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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { competitions, getStatusColor } from "@/data/competitions";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Competitions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Registration form fields
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [captainFullName, setCaptainFullName] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainAge, setCaptainAge] = useState<number | "">("");
  const [city, setCity] = useState("");
  const [studyPlace, setStudyPlace] = useState("");
  const [participant2, setParticipant2] = useState("");
  const [participant3, setParticipant3] = useState("");
  const [participant4, setParticipant4] = useState("");
  const [source, setSource] = useState("");
  const [consent, setConsent] = useState(false);

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
    if (!consent) {
      toast("Подтвердите согласие", { description: "Необходимо согласиться с положением и политикой" });
      return;
    }
    setSubmitting(true);
    const ageNumber = typeof captainAge === "number" ? captainAge : parseInt(captainAge || "0", 10) || null;

    const { error } = await (supabase as any).from("enrollments").insert({
      user_id: user.id,
      competition_id: selectedId,
      team_name: teamName,
      status: "active",
      email,
      telegram,
      captain_full_name: captainFullName,
      captain_phone: captainPhone,
      captain_age: ageNumber,
      city,
      study_place: studyPlace,
      participant2_info: participant2,
      participant3_info: participant3,
      participant4_info: participant4,
      source,
      consent,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Не удалось записаться", { description: error.message });
      return;
    }
    toast.success("Вы записаны!", { description: "Подтверждение и материалы отправлены на почту капитана" });
    // Reset and close
    setOpen(false);
    setTeamName("");
    setSelectedId(null);
    setEmail("");
    setTelegram("");
    setCaptainFullName("");
    setCaptainPhone("");
    setCaptainAge("");
    setCity("");
    setStudyPlace("");
    setParticipant2("");
    setParticipant3("");
    setParticipant4("");
    setSource("");
    setConsent(false);
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
                Заполните данные команды. После регистрации капитану придёт письмо с подтверждением и техническим заданием.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEnroll} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email капитана *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tg">Telegram-аккаунт для связи *</Label>
                  <Input id="tg" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="@username" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="team">Название команды *</Label>
                  <Input id="team" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Например: AEROO Crew" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="captain">ФИО капитана команды *</Label>
                  <Input id="captain" value={captainFullName} onChange={(e) => setCaptainFullName(e.target.value)} placeholder="Иванов Иван Иванович" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона капитана *</Label>
                  <Input id="phone" value={captainPhone} onChange={(e) => setCaptainPhone(e.target.value)} placeholder="+7 700 000 00 00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Возраст капитана *</Label>
                  <Input id="age" type="number" min={8} value={captainAge === "" ? "" : captainAge} onChange={(e) => setCaptainAge(e.target.value === "" ? "" : Number(e.target.value))} placeholder="18" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Город *</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Алматы" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="study">Место обучения *</Label>
                  <Input id="study" value={studyPlace} onChange={(e) => setStudyPlace(e.target.value)} placeholder="Школа/ВУЗ" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p2">2 участник команды (ФИО, телефон, возраст, город, место обучения, почта) *</Label>
                  <Textarea id="p2" value={participant2} onChange={(e) => setParticipant2(e.target.value)} placeholder="ФИО; телефон; возраст; город; место обучения; почта" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p3">3 участник команды (ФИО, телефон, возраст, город, место обучения, почта) *</Label>
                  <Textarea id="p3" value={participant3} onChange={(e) => setParticipant3(e.target.value)} placeholder="ФИО; телефон; возраст; город; место обучения; почта" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p4">4 участник команды (ФИО, телефон, возраст, город, место обучения, почта) *</Label>
                  <Textarea id="p4" value={participant4} onChange={(e) => setParticipant4(e.target.value)} placeholder="ФИО; телефон; возраст; город; место обучения; почта" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Откуда узнали о соревновании? *</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите источник" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram_kazrockets">Instagram (@kazrockets)</SelectItem>
                      <SelectItem value="instagram_other">Instagram других аккаунтов</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="friends">У знакомых</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                  <Label htmlFor="consent" className="leading-snug">
                    С Положением ознакомлен(-а) и согласен(-а) с политикой конфиденциальности
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  submitting ||
                  !email || !telegram || !teamName || !captainFullName || !captainPhone || !captainAge || !city || !studyPlace ||
                  !participant2 || !participant3 || !participant4 || !source || !consent
                }
              >
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