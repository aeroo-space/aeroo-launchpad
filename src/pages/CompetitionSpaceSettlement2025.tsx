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
  Clock,
  ExternalLink,
  Languages,
} from "lucide-react";

import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { t, i18n } = useTranslation();
  const revealRefs = useRef<HTMLElement[]>([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer
  useEffect(() => {
    const deadline = new Date("2025-10-25T23:59:00+05:00"); // GMT+5
    
    const updateTimer = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Basic SEO
  useEffect(() => {
    document.title = t('spaceSettlement2025.meta.title');
    const metaDesc =
      (document.querySelector('meta[name="description"]') as HTMLMetaElement) ||
      (() => {
        const m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
        return m;
      })();
    metaDesc.content = t('spaceSettlement2025.meta.description');

    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/competitions/space-settlement-2025";
  }, [t]);

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  const applyBtn = (
    <Button size="lg" variant="primary" asChild aria-label={t('spaceSettlement2025.hero.participate')}>
      <Link to="/enroll-space-settlement">{t('spaceSettlement2025.hero.participate')}</Link>
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
                  <Link to="/">{t('spaceSettlement2025.breadcrumbs.home')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/competitions">{t('spaceSettlement2025.breadcrumbs.competitions')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('spaceSettlement2025.hero.title')}</BreadcrumbPage>
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
                {t('spaceSettlement2025.hero.title')}
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground/90 mb-6">
                {t('spaceSettlement2025.hero.subtitle')}
              </p>
              <div className="flex items-center gap-3 text-muted-foreground mb-8">
                <CalendarDays className="w-5 h-5 text-primary" />
                <span>
                  {t('spaceSettlement2025.hero.dates')}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {applyBtn}
                <Button asChild variant="outline" size="lg">
                  <a href="#about">{t('spaceSettlement2025.hero.learnMore')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                {t('spaceSettlement2025.countdown.title')}
              </h2>
              <p className="text-muted-foreground mb-6">{t('spaceSettlement2025.countdown.deadline')}</p>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {[
                  { value: timeLeft.days, label: t('spaceSettlement2025.countdown.days') },
                  { value: timeLeft.hours, label: t('spaceSettlement2025.countdown.hours') },
                  { value: timeLeft.minutes, label: t('spaceSettlement2025.countdown.minutes') },
                  { value: timeLeft.seconds, label: t('spaceSettlement2025.countdown.seconds') }
                ].map((item, i) => (
                  <div key={i} className="bg-background/80 backdrop-blur rounded-lg p-4 border">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                {applyBtn}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" ref={(el) => el && (revealRefs.current[0] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('spaceSettlement2025.about.title')}</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {t('spaceSettlement2025.about.text1')}
                  </p>
                  <p>
                    {t('spaceSettlement2025.about.text2')}
                  </p>
                <p>
                  {t('spaceSettlement2025.about.text3')} {' '}
                  <a href="https://nss.org/nss-space-settlement-contest/" target="_blank" rel="noopener" className="story-link">{t('spaceSettlement2025.about.nssLink')}</a>.
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

        {/* Competition Rules */}
        <section id="rules" ref={(el) => el && (revealRefs.current[8] = el)} className="opacity-0 translate-y-4 transition-all duration-700 bg-muted/20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="glass-card p-8">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">{t('spaceSettlement2025.rules.title')}</h3>
                    <p className="text-muted-foreground mb-6">
                      {t('spaceSettlement2025.rules.description')}
                    </p>
                    <Button size="lg" variant="outline" asChild className="group">
                      <a 
                        href="https://docs.google.com/document/d/13y24KHT0ZB9YJMKn4pUwpKVbY1dH1S30AjwCiC9o5EY/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <span>{t('spaceSettlement2025.rules.button')}</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section id="goals" ref={(el) => el && (revealRefs.current[1] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('spaceSettlement2025.goals.title')}</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {[
                { icon: Lightbulb, text: t('spaceSettlement2025.goals.items.0') },
                { icon: Rocket, text: t('spaceSettlement2025.goals.items.1') },
                { icon: Users, text: t('spaceSettlement2025.goals.items.2') },
                { icon: Star, text: t('spaceSettlement2025.goals.items.3') },
                { icon: School, text: t('spaceSettlement2025.goals.items.4') },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('spaceSettlement2025.format.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[{
                title: t('spaceSettlement2025.format.junior'),
              }, {
                title: t('spaceSettlement2025.format.senior'),
              }].map((item, idx) => (
                <Card key={idx} className="glass-card">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground"><FileText className="w-4 h-4 text-primary" /> {t('spaceSettlement2025.format.task')}</div>
                    <div className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="w-4 h-4 text-primary" /> {t('spaceSettlement2025.format.duration')}</div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" ref={(el) => el && (revealRefs.current[3] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('spaceSettlement2025.timeline.title')}</h2>
            <div className="relative border-l border-border pl-10 space-y-10">
              {[
                { date: t('spaceSettlement2025.timeline.deadline'), icon: CalendarDays },
                { date: t('spaceSettlement2025.timeline.hackathon'), icon: Rocket },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-6 top-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-background z-10">
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="glass-card rounded-xl p-6 ml-2">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('spaceSettlement2025.submission.title')}</h2>
            <p className="text-muted-foreground max-w-3xl">
              {t('spaceSettlement2025.submission.description')}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('spaceSettlement2025.awards.title')}</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 max-w-2xl">
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {t('spaceSettlement2025.awards.items.0')}</li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {t('spaceSettlement2025.awards.items.1')}</li>
              <li className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> {t('spaceSettlement2025.awards.items.2')}</li>
            </ul>
            <div className="mt-8">{applyBtn}</div>
          </div>
        </section>

        {/* Contacts */}
        <section id="contacts" ref={(el) => el && (revealRefs.current[7] = el)} className="opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('spaceSettlement2025.contacts.title')}</h2>
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
