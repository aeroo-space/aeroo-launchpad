import { useEffect, useRef } from "react";
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
  Rocket,
  School,
  Users,
  Lightbulb,
  Star,
  CalendarDays,
  FileText,
  Award,
  Send,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const TG_COMMUNITY = "https://t.me/+5nKRCrdTXT05YThi";

const sections = [
  "about",
  "goals",
  "format",
  "timeline",
  "submission",
  "rules",
  "awards",
  "contacts",
] as const;

export default function CompetitionSpaceSettlement2025() {
  const revealRefs = useRef<HTMLElement[]>([]);

  // Basic SEO
  useEffect(() => {
    document.title = "AEROO Space Settlement Competition 2025 — онлайн-хакатон";
    const metaDesc =
      (document.querySelector('meta[name="description"]') as HTMLMetaElement) ||
      (() => {
        const m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
        return m;
      })();
    metaDesc.content =
      "Онлайн-хакатон по проектированию космических поселений для школьников. Регистрация: 05.09–24.10.2025, хакатон: 28–29.10.2025.";

    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/competitions/space-settlement-2025";
  }, []);

  // Reveal on scroll
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

  const applyBtn = (
    <Button size="lg" variant="primary" onClick={() => toast("Регистрация пока закрыта", { description: "Подождите до 5 сентября 2025 года" })} aria-label="Принять участие — регистрация на AEROO Space Settlement 2025">
      Принять участие
    </Button>
  );

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
                <BreadcrumbPage>AEROO Space Settlement Competition 2025</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: "url(/lovable-uploads/8f3c3b0a-eb8e-4268-9777-f90603ffc009.png)", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/90" />
          <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
                AEROO Space Settlement Competition 2025
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground/90 mb-6">
                Республиканский онлайн-хакатон по проектированию космических поселений
              </p>
              <div className="flex items-center gap-3 text-muted-foreground mb-8">
                <CalendarDays className="w-5 h-5 text-primary" />
                <span>
                  Регистрация: 05.09.2025 – 24.10.2025 | Хакатон: 28–29.10.2025
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {applyBtn}
                <Button asChild variant="outline" size="lg">
                  <a href="#about">Подробнее</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" ref={(el) => el && (revealRefs.current[0] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">О соревновании</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    AEROO Space Settlement Competition 2025 — республиканский онлайн-хакатон научно-исследовательской и инженерной направленности для школьников.
                  </p>
                  <p>
                    Цель — развить навыки проектирования космических поселений, научного анализа и инженерного обоснования.
                  </p>
                <p>
                  Лучшие участники войдут в сборную Казахстана для участия в международном конкурсе 
                  <a href="https://nss.org/nss-space-settlement-contest/" target="_blank" rel="noopener" className="story-link">NSS Space Settlement Contest</a>.
                </p>
                </div>


              </div>
              <div>
                <Card className="glass-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video w-full bg-muted relative animate-fade-in hover-scale">
                      <img
                        src="/lovable-uploads/dfa5faf7-bfb1-4e41-b074-862c17e63ff4.png"
                        alt="AEROO Space Settlement Competition — визуализация поселения"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section id="goals" ref={(el) => el && (revealRefs.current[1] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Цели и задачи</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {[
                { icon: Lightbulb, text: "Развитие инженерных и исследовательских компетенций школьников" },
                { icon: Rocket, text: "Разработка проектов космических поселений с научным и инженерным обоснованием" },
                { icon: Users, text: "Формирование сборной Казахстана для NSS Space Settlement Contest" },
                { icon: Star, text: "Популяризация аэрокосмических направлений" },
                { icon: School, text: "Выявление и поддержка талантливых участников" },
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

        {/* Format & Leagues */}
        <section id="format" ref={(el) => el && (revealRefs.current[2] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Формат и секции хакатона</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[{
                title: "Младшая лига: 7–9 классы",
              }, {
                title: "Старшая лига: 10–12 классы",
              }].map((item, idx) => (
                <Card key={idx} className="glass-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground"><FileText className="w-4 h-4 text-primary" /> Задание: разработка научно-инженерного проекта по теме колонизации космоса (10–15 страниц)</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="w-4 h-4 text-primary" /> Формат: онлайн, 36 часов на выполнение с момента публикации задания</div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" ref={(el) => el && (revealRefs.current[3] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ключевые даты</h2>
            <div className="relative border-l border-border pl-6 space-y-10">
              {[
                { date: "05.09.2025 — открытие регистрации", icon: CalendarDays },
                { date: "24.10.2025 (23:59 GMT+5) — дедлайн подачи заявки", icon: CalendarDays },
                { date: "28–29.10.2025 — хакатон (36 часов на выполнение задания)", icon: Rocket },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="glass-card rounded-xl p-6">
                    <p className="text-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submission */}
        <section id="submission" ref={(el) => el && (revealRefs.current[4] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Подача работ</h2>
            <p className="text-muted-foreground max-w-3xl">
              Все работы загружаются в электронном виде через платформу организаторов до установленного дедлайна. Плагиат запрещён.
            </p>
            
          </div>
        </section>

        {/* Rules & Criteria */}

        {/* Awards */}
        <section
          id="awards"
          ref={(el) => el && (revealRefs.current[6] = el)}
          className="opacity-0 translate-y-4 transition-all duration-700"
        >
          <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Награды</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 max-w-2xl">
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Денежные призы</li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Гранты от Energo University</li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Формирование сборной Казахстана для NSS Space Settlement Contest</li>
            </ul>
            <div className="mt-8">{applyBtn}</div>
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" ref={(el) => el && (revealRefs.current[7] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Контакты</h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
              <a href="mailto:info@aeroo.space" className="glass-card rounded-xl p-5 flex items-center gap-3 hover-scale">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@aeroo.space</span>
              </a>
              <a href={TG_COMMUNITY} target="_blank" rel="noopener" className="glass-card rounded-xl p-5 flex items-center gap-3 hover-scale">
                <Send className="w-5 h-5 text-primary" />
                <span>AEROO Community</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
