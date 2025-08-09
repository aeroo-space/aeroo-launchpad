import { useEffect, useRef, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Satellite,
  Rocket,
  CalendarDays,
  Cpu,
  CircuitBoard,
  Wrench,
  Presentation,
  Users,
  Award,
  ClipboardList,
  TrendingUp,
  MessageCircle,
  Mail,
} from "lucide-react";
import heroSpace from "@/assets/hero-space.jpg";
import { Link, useNavigate } from "react-router-dom";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
const sections = ["about", "goals", "stages", "criteria", "awards", "contacts"] as const;

const CompetitionSatelliteLaunch2026 = () => {
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    document.title = "AEROO Satellite Launch Competition 2026 — турнир наноспутников";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Международный турнир по разработке и запуску наноспутников. Регистрация 1.11.2025–1.01.2026, финал 9–12.04.2026, Астана.");
    // canonical
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/competitions/satellite-launch-2026";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const competitionId = "satellite-launch";
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [teamName, setTeamName] = useState("");
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

  const handleOpenEnroll = () => {
    if (!user) {
      toast(t('competitions.toastLoginTitle'), { description: t('competitions.toastLoginDesc') });
      navigate("/auth");
      return;
    }
    setOpen(true);
  };

  const handleSubmitEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!consent) {
      toast(t('competitions.toastNeedConsentTitle'), { description: t('competitions.toastNeedConsentDesc') });
      return;
    }
    setSubmitting(true);
    const ageNumber = typeof captainAge === "number" ? captainAge : parseInt(captainAge || "0", 10) || null;

    const { error } = await (supabase as any).from("enrollments").insert({
      user_id: user.id,
      competition_id: competitionId,
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
    setOpen(false);
    setTeamName("");
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

      <main>
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/competitions">Соревнования</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>AEROO Satellite Launch Competition 2026</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: `url(${heroSpace})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0" style={{ background: "var(--gradient-satellite-hero)" }} />
          <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-[hsl(var(--space-5))]">
                AEROO Satellite Launch Competition 2026
              </h1>
              <p className="text-lg md:text-2xl text-[hsl(var(--space-5)/0.9)] mb-6">
                Международный инженерный турнир по разработке и запуску наноспутников
              </p>
              <div className="flex items-center gap-3 text-[hsl(var(--space-5)/0.85)] mb-8">
                <CalendarDays className="w-5 h-5" />
                <span>
                  Регистрация: 1 ноября 2025 – 1 января 2026 | Финал: 9–12 апреля 2026, Астана
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="lg" onClick={handleOpenEnroll} aria-label="Принять участие — регистрация на AEROO Satellite Launch 2026" data-testid="cta-top-apply">
                  Принять участие
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://docs.google.com/document/d/1KclwhBPXbtUXfjepxtpxADl9rwIr1KdOHrpDbRqsp_4/edit?usp=sharing"
                    target="_blank"
                    rel="noopener"
                    aria-label="Прочитать Регламент — откроется в новой вкладке"
                    data-testid="link-regulation"
                  >
                    Прочитать Регламент
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About the competition */}
        <section id="about" ref={(el) => el && (revealRefs.current[0] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">О турнире</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Казахстан — родина космодрома Байконур, с которого в 1957 году был запущен первый искусственный
                  спутник Земли. Продолжая эту традицию, AEROO Satellite Launch Competition собирает команды молодых
                  инженеров для проектирования, сборки и запуска наноспутников на стратосферу.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Участники создают концепцию миссии, разрабатывают ПО, собирают и тестируют спутники, а затем
                  запускают их в финале. Турнир развивает инженерное и критическое мышление, навыки командной работы и
                  международного взаимодействия.
                </p>
              </div>
              <div>
                <Card className="glass-card">
                  <CardContent className="p-0">
                    <div className="aspect-video w-full bg-[hsl(var(--space-3)/0.2)] flex items-center justify-center">
                      <Satellite className="w-24 h-24 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About AEROO */}
        <section ref={(el) => el && (revealRefs.current[1] = el)} className="opacity-0 translate-y-4 transition-all duration-700" style={{ background: "var(--gradient-satellite-section)" }}>
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">О AEROO</h2>
            <p className="text-[hsl(var(--space-5))] max-w-3xl">
              AEROO — организация, развивающая аэрокосмическое образование через инженерные соревнования и образовательные
              программы. Мы готовим новое поколение инженеров и учёных для космической отрасли.
            </p>
          </div>
        </section>

        {/* Goals */}
        <section id="goals" ref={(el) => el && (revealRefs.current[2] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Цели и задачи</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {[
                { icon: Cpu, text: "Развитие инженерного и проектного мышления" },
                { icon: ClipboardList, text: "Освоение навыков системного проектирования спутников" },
                { icon: CircuitBoard, text: "Работа с CAD, 3D-моделированием, PCB и электроникой" },
                { icon: Wrench, text: "Программирование микроконтроллеров и работа с телеметрией" },
                { icon: Presentation, text: "Навыки презентации и защиты проектов" },
                { icon: Users, text: "Международное взаимодействие и обмен опытом" },
              ].map((g, i) => (
                <Card key={i} className="glass-card">
                  <CardContent className="p-6 flex items-start gap-4">
                    <g.icon className="w-6 h-6 text-primary" />
                    <p className="text-sm text-muted-foreground">{g.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stages timeline */}
        <section id="stages" ref={(el) => el && (revealRefs.current[3] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Этапы проведения</h2>
            <div className="relative border-l border-border pl-6 space-y-10">
              {[
                {
                  title: "I этап — Отборочный (онлайн)",
                  date: "5–25 января 2026",
                  icon: CalendarDays,
                  details:
                    "Творческое задание по концепции миссии. Главное — идея, актуальность и польза. 60 лучших команд проходят в полуфинал.",
                },
                {
                  title: "II этап — Полуфинал (онлайн)",
                  date: "1–20 февраля 2026",
                  icon: ClipboardList,
                  details:
                    "Разработка проекта на основе AEROO CubeSat Kit с инженерными расчётами и выбором компонентов. Отбираются 15 финалистов.",
                },
                {
                  title: "III этап — Финал (очно, Астана)",
                  date: "9–12 апреля 2026",
                  icon: Rocket,
                  details: [
                    "9 апреля — инструктаж и подготовка",
                    "10 апреля — 24 часа на сборку спутников",
                    "11 апреля — запуск на стратосферу",
                    "12 апреля — награждение победителей",
                  ],
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <div className="text-sm text-muted-foreground mb-4">🗓 {item.date}</div>
                    {Array.isArray(item.details) ? (
                      <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                        {item.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">{item.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section id="criteria" ref={(el) => el && (revealRefs.current[4] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Критерии оценивания</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {[
                { icon: TrendingUp, text: "Инновационность и актуальность идеи" },
                { icon: Cpu, text: "Техническая обоснованность" },
                { icon: ClipboardList, text: "Полнота и детализация проекта" },
                { icon: Wrench, text: "Реализуемость с учётом ограничений" },
                { icon: Presentation, text: "Презентация и командная работа" },
                { icon: Award, text: "Итоговая оценка экспертов" },
              ].map((c, i) => (
                <Card key={i} className="glass-card">
                  <CardContent className="p-6 flex items-start gap-4">
                    <c.icon className="w-6 h-6 text-primary" />
                    <p className="text-sm text-muted-foreground">{c.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section id="awards" ref={(el) => el && (revealRefs.current[5] = el)} className="opacity-0 translate-y-4 transition-all duration-700 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "var(--gradient-satellite-section)" }} />
          <div className="container mx-auto px-4 py-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Награды</h2>
            <div className="space-y-3 text-[hsl(var(--space-5))]">
              <div>🏆 I место: грант на обучение в АУЭС им. Гумарбека Даукеева + денежный приз</div>
              <div>🥈 II и III места: денежные призы и ценные подарки</div>
              <div>🎖 Все финалисты — памятные дипломы</div>
            </div>
            <div className="mt-8">
              <Button variant="primary" size="xl" onClick={handleOpenEnroll} aria-label="Принять участие — подать заявку на участие" data-testid="cta-bottom-apply">
                Принять участие
              </Button>
            </div>
          </div>
        </section>

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
                  <Input id="age" type="number" min={8} value={captainAge === '' ? '' : captainAge} onChange={(e) => setCaptainAge(e.target.value === '' ? '' : Number(e.target.value))} placeholder="18" required />
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

        {/* Contacts */}
        <section id="contacts" ref={(el) => el && (revealRefs.current[6] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:info@aeroo.space" className="story-link">info@aeroo.space</a>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <a href="https://t.me/+5nKRCrdTXT05YThi" target="_blank" rel="noopener" className="story-link">Telegram: aeroo.space community</a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompetitionSatelliteLaunch2026;
