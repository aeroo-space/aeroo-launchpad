import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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
  const [dupOpen, setDupOpen] = useState(false);
  const [dupName, setDupName] = useState("");

  const handleOpenEnroll = (id: string) => {
    const comp = competitions.find((c) => c.id === id);
    if (!comp) return;
    const isAllowed = comp.status === "Регистрация" || comp.id === "satellite-launch";
    if (!isAllowed) {
      toast(t('competitions.toastNotOpenTitle', { defaultValue: "Регистрация пока не открыта" }), { description: t('competitions.toastNotOpenDesc', { defaultValue: "Скоро выйдет информация — будьте в курсе событий." }) });
      return;
    }
    navigate(`/enroll/${id}`);
  };

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const enroll = params.get("enroll");
    if (enroll) {
      navigate(`/enroll/${enroll}`);
    }
  }, [location.search, navigate]);

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
      // Handle duplicate registration (unique violation)
      // @ts-ignore Supabase PostgrestError has code field
      if ((error as any).code === "23505") {
        const comp = competitions.find((c) => c.id === selectedId);
        const compName = t(`competitions.items.${selectedId}.title`, { defaultValue: comp?.title || "соревнование" });
        setOpen(false);
        setDupName(compName);
        setDupOpen(true);
      } else {
        toast.error(t('competitions.toastEnrollError'), { description: error.message });
      }
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            {t('competitions.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('competitions.subtitle')}
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="btn-cosmic">
              <a href="#competitions-list">{t('cta.apply', { defaultValue: 'Подать заявку' })}</a>
            </Button>
          </div>
        </div>

        {/* Competitions Grid */}
        <div id="competitions-list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {competitions.map((competition) => {
            const Icon = competition.icon;
            return (
              <Card key={competition.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-primary group-hover:glow-primary transition-all" />
                    <Badge className={`${getStatusColor(t(competition.status))} text-white`}>
                      {t(competition.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {t(competition.title)}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-primary/70">
                    {t(competition.category)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {t(competition.description)}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('competitions.age')}</span>
                      <span className="font-medium">{t(competition.ages)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('competitions.deadline')}</span>
                      <span className="font-medium">{t(competition.deadline)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {competition.id === 'satellite-launch' ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/competitions/satellite-launch-2026">{t('competitions.details')}</Link>
                      </Button>
                    ) : competition.id === 'space-settlement' ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/competitions/space-settlement-2025">{t('competitions.details')}</Link>
                      </Button>
                    ) : competition.id === 'exploring-world-of-science' ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/competitions/exploring-world-of-science">{t('competitions.details')}</Link>
                      </Button>
                    ) : competition.id === 'rocket-science' ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/competitions/rocket-science-2026">{t('competitions.details')}</Link>
                      </Button>
                    ) : competition.id === 'ai-challenge' ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/competitions/space-ai-2026">{t('competitions.details')}</Link>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => toast(t('competitions.toastSoonTitle', { defaultValue: "Скоро выйдет информация" }), { description: t('competitions.toastSoonDesc', { defaultValue: "Будьте в курсе событий" }) })}
                      >
                        {t('competitions.details')}
                      </Button>
                    )}
                    {(competition.id === 'space-settlement' || competition.id === 'satellite-launch' || competition.id === 'ai-challenge' || competition.id === 'exploring-world-of-science' || competition.id === 'rocket-science' || competition.status === 'Регистрация') && (
                      <Button asChild className="w-full btn-cosmic">
                        <Link to={`/enroll/${competition.id}`}>{t('competitions.participate')}</Link>
                      </Button>
                    )}
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
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => toast(t('competitions.archiveToastTitle'), { 
              description: t('competitions.archiveToastDesc')
            })}
          >
            {t('competitions.archiveBtn')}
          </Button>
        </div>

        {/* Enroll Dialog removed in favor of dedicated page */}

        {/* Duplicate registration notice remains unused here */}

      </main>

      <Footer />
    </div>
  );
};

export default Competitions;