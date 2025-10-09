import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Brain,
  Rocket,
  Trophy,
  Users,
  Calendar,
  Award,
  CheckCircle2,
  Github,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Target,
  Zap,
  Code,
  Sparkles
} from 'lucide-react';

const SpaceAI2026 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const stages = [
    {
      title: t('spaceAI2026.stages.stage1Title'),
      duration: t('spaceAI2026.stages.stage1Duration'),
      tasks: [
        t('spaceAI2026.stages.stage1Task1'),
        t('spaceAI2026.stages.stage1Task2'),
        t('spaceAI2026.stages.stage1Task3'),
        t('spaceAI2026.stages.stage1Task4'),
        t('spaceAI2026.stages.stage1Task5')
      ],
      icon: Code
    },
    {
      title: t('spaceAI2026.stages.stage2Title'),
      duration: t('spaceAI2026.stages.stage2Duration'),
      tasks: [
        t('spaceAI2026.stages.stage2Task1'),
        t('spaceAI2026.stages.stage2Task2'),
        t('spaceAI2026.stages.stage2Task3')
      ],
      icon: Rocket
    }
  ];

  const criteria = [
    { name: t('spaceAI2026.criteria.innovation'), desc: t('spaceAI2026.criteria.innovationDesc'), points: "0-20" },
    { name: t('spaceAI2026.criteria.aiApplication'), desc: t('spaceAI2026.criteria.aiApplicationDesc'), points: "0-20" },
    { name: t('spaceAI2026.criteria.technical'), desc: t('spaceAI2026.criteria.technicalDesc'), points: "0-20" },
    { name: t('spaceAI2026.criteria.business'), desc: t('spaceAI2026.criteria.businessDesc'), points: "0-15" },
    { name: t('spaceAI2026.criteria.documentation'), desc: t('spaceAI2026.criteria.documentationDesc'), points: "0-10" },
    { name: t('spaceAI2026.criteria.presentation'), desc: t('spaceAI2026.criteria.presentationDesc'), points: "0-15" }
  ];

  const timeline = [
    { label: t('spaceAI2026.stages.registration'), date: t('spaceAI2026.stages.registrationDate') },
    { label: t('spaceAI2026.stages.submission'), date: t('spaceAI2026.stages.submissionDate') },
    { label: t('spaceAI2026.stages.results'), date: t('spaceAI2026.stages.resultsDate') },
    { label: t('spaceAI2026.stages.final'), date: t('spaceAI2026.stages.finalDate') }
  ];

  return (
    <>
      <Helmet>
        <title>{t('spaceAI2026.seo.title')}</title>
        <meta name="description" content={t('spaceAI2026.seo.description')} />
        <link rel="canonical" href="https://aeroo.space/competitions/space-ai-2026" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/30 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">{t('spaceAI2026.hero.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-2">
              <span className="inline-block bg-gradient-to-r from-primary via-green-400 to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.hero.title')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              {t('spaceAI2026.hero.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-medium">{t('spaceAI2026.hero.aiSkills')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
                <Globe className="w-5 h-5 text-primary" />
                <span className="font-medium">{t('spaceAI2026.hero.internationalExp')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg border border-primary/20">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-medium">{t('spaceAI2026.hero.grants')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                className="btn-cosmic group relative overflow-hidden"
                onClick={() => navigate('/enroll/exploring-world-of-science')}
              >
                <span className="relative z-10">{t('spaceAI2026.hero.participate')}</span>
                <Sparkles className="ml-2 w-5 h-5 relative z-10" />
              </Button>
              
              <Button 
                size="xl" 
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('spaceAI2026.hero.learnMore')}
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={(el) => el && (revealRefs.current[0] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              <span className="inline-block bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.about.title')}
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
                <p className="text-lg mb-6 leading-relaxed">
                  {t('spaceAI2026.about.description')}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('spaceAI2026.about.participants')}</h3>
                      <p className="text-muted-foreground">{t('spaceAI2026.about.participantsInfo')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <Trophy className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('spaceAI2026.about.prizeFund')}</h3>
                      <p className="text-muted-foreground">{t('spaceAI2026.about.prizeFundInfo')}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    {t('spaceAI2026.about.goalsTitle')}
                  </h3>
                  {[
                    t('spaceAI2026.about.goal1'),
                    t('spaceAI2026.about.goal2'),
                    t('spaceAI2026.about.goal3'),
                    t('spaceAI2026.about.goal4')
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Stages Section */}
        <section ref={(el) => el && (revealRefs.current[1] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              <span className="inline-block bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.stages.title')}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <Card key={idx} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground">{stage.duration}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {stage.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">{t('spaceAI2026.stages.datesTitle')}</h3>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-primary/20">
                    <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Criteria Section */}
        <section ref={(el) => el && (revealRefs.current[2] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              <span className="inline-block bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.criteria.title')}
              </span>
            </h2>

            <div className="max-w-6xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="text-left p-4 font-semibold">№</th>
                    <th className="text-left p-4 font-semibold">{t('spaceAI2026.criteria.title')}</th>
                    <th className="text-left p-4 font-semibold">{t('spaceAI2026.criteria.title')}</th>
                    <th className="text-left p-4 font-semibold">{t('spaceAI2026.criteria.title')}</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, idx) => (
                    <tr key={idx} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                      <td className="p-4">{idx + 1}</td>
                      <td className="p-4 font-medium">{criterion.name}</td>
                      <td className="p-4 text-muted-foreground">{criterion.desc}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                          {criterion.points}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-primary/30 font-bold">
                    <td className="p-4" colSpan={3}>{t('spaceAI2026.criteria.total')}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                        100
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section ref={(el) => el && (revealRefs.current[3] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              <span className="inline-block bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.prizes.title')}
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-cyan-500/10 backdrop-blur-sm border-primary/30">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{t('spaceAI2026.prizes.cash')}</h3>
                      <p className="text-muted-foreground">{t('spaceAI2026.prizes.cashDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{t('spaceAI2026.prizes.eduGrants')}</h3>
                      <p className="text-muted-foreground">{t('spaceAI2026.prizes.eduGrantsDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{t('spaceAI2026.prizes.gadgets')}</h3>
                      <p className="text-muted-foreground">{t('spaceAI2026.prizes.gadgetsDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{t('spaceAI2026.prizes.certificates')}</h3>
                      <p className="text-muted-foreground">{t('spaceAI2026.prizes.certificatesDesc')}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section ref={(el) => el && (revealRefs.current[4] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="inline-block bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.registration.title')}
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('spaceAI2026.registration.description')}
            </p>

            <Button 
              size="xl" 
              className="btn-cosmic text-lg px-12 py-6"
              onClick={() => navigate('/enroll/exploring-world-of-science')}
            >
              {t('spaceAI2026.registration.button')}
              <Rocket className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </section>

        {/* Contacts Section */}
        <section ref={(el) => el && (revealRefs.current[5] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              <span className="inline-block bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent px-1 py-2">
                {t('spaceAI2026.contacts.title')}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="text-xl font-bold mb-4">{t('spaceAI2026.contacts.contactUs')}</h3>
                <div className="space-y-4">
                  <a href="tel:+77751639790" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+7 775 163 97 90</span>
                  </a>
                  <a href="mailto:info@aeroo.space" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>info@aeroo.space</span>
                  </a>
                  <a href="https://aeroo.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-5 h-5" />
                    <span>aeroo.space</span>
                  </a>
                  <a href="https://t.me/+cbnepGa-hscxNmUy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{t('spaceAI2026.contacts.telegram')}</span>
                  </a>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="text-xl font-bold mb-4">{t('spaceAI2026.contacts.partners')}</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• РНПЦ "Дарын" (Минпросвещения РК)</p>
                  <p>• AEROO</p>
                  <p>• АУЭС им. Гумарбека Даукеева</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">{t('spaceAI2026.contacts.socialMedia')}</h4>
                  <div className="flex gap-4">
                    <a href="https://instagram.com/aeroo.space" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      @aeroo.space
                    </a>
                    <a href="https://instagram.com/rspc_daryn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      @rspc_daryn
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SpaceAI2026;
