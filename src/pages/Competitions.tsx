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
import { useTranslation } from "react-i18next";

const Competitions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  
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
      toast(t('competitions.toastLoginTitle'), { description: t('competitions.toastLoginDesc') });
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
      toast(t('competitions.toastNeedConsentTitle'), { description: t('competitions.toastNeedConsentDesc') });
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
      toast.error(t('competitions.toastEnrollError'), { description: error.message });
      return;
    }
    toast.success(t('competitions.toastEnrollSuccessTitle'));
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
            {t('competitions.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('competitions.subtitle')}
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
                      <span className="text-muted-foreground">{t('competitions.age')}</span>
                      <span className="font-medium">{competition.ages}</span>
                    </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('competitions.deadline')}</span>
                        <span className="font-medium">{competition.deadline}</span>
                      </div>
                  </div>
                  
<div className="grid grid-cols-1 gap-3">
                    <Button variant="outline" className="w-full">{t('competitions.details')}</Button>
                    <Button className="w-full btn-cosmic" onClick={() => handleOpenEnroll(competition.id)}>
                      {t('competitions.enrollTeam')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Archive Section */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('competitions.archiveTitle')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('competitions.archiveDesc')}
          </p>
          <Button variant="outline" size="lg">
            {t('competitions.archiveBtn')}
          </Button>
        </div>

        {/* Enroll Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('competitions.enrollDialogTitle')}</DialogTitle>
              <DialogDescription>
                {t('competitions.enrollDialogDesc')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEnroll} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tg">{t('form.telegram')}</Label>
                  <Input id="tg" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="@username" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="team">{t('form.teamName')}</Label>
                  <Input id="team" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Например: AEROO Crew" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="captain">{t('form.captainFullName')}</Label>
                  <Input id="captain" value={captainFullName} onChange={(e) => setCaptainFullName(e.target.value)} placeholder="Иванов Иван Иванович" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('form.captainPhone')}</Label>
                  <Input id="phone" value={captainPhone} onChange={(e) => setCaptainPhone(e.target.value)} placeholder="+7 700 000 00 00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">{t('form.captainAge')}</Label>
                  <Input id="age" type="number" min={8} value={captainAge === "" ? "" : captainAge} onChange={(e) => setCaptainAge(e.target.value === "" ? "" : Number(e.target.value))} placeholder="18" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t('form.city')}</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Алматы" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="study">{t('form.studyPlace')}</Label>
                  <Input id="study" value={studyPlace} onChange={(e) => setStudyPlace(e.target.value)} placeholder="Школа/ВУЗ" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p2">{t('form.participant2')}</Label>
                  <Textarea id="p2" value={participant2} onChange={(e) => setParticipant2(e.target.value)} placeholder="ФИО; телефон; возраст; город; место обучения; почта" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p3">{t('form.participant3')}</Label>
                  <Textarea id="p3" value={participant3} onChange={(e) => setParticipant3(e.target.value)} placeholder="ФИО; телефон; возраст; город; место обучения; почта" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="p4">{t('form.participant4')}</Label>
                  <Textarea id="p4" value={participant4} onChange={(e) => setParticipant4(e.target.value)} placeholder="ФИО; телефон; возраст; город; место обучения; почта" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>{t('form.source')}</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите источник" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram_kazrockets">{t('form.sourceInstagramKaz')}</SelectItem>
                      <SelectItem value="instagram_other">{t('form.sourceInstagramOther')}</SelectItem>
                      <SelectItem value="telegram">{t('form.sourceTelegram')}</SelectItem>
                      <SelectItem value="friends">{t('form.sourceFriends')}</SelectItem>
                      <SelectItem value="other">{t('form.sourceOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
                  <Label htmlFor="consent" className="leading-snug">
                    {t('form.consent')}
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
                {submitting ? t('form.sending') : t('form.submit')}
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