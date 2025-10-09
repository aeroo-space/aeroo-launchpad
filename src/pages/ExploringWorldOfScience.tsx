import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Rocket,
  Satellite,
  Brain,
  Gift,
  Calendar,
  Users,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Clock,
  Target,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const ExploringWorldOfScience = () => {
  const { t, i18n } = useTranslation();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState('');

  // Determine CTA state based on dates (GMT+5)
  const now = new Date();
  const registrationStart = new Date('2025-10-10T12:00:00+05:00');
  const registrationEnd = new Date('2026-01-19T23:59:00+05:00');

  const ctaState = now < registrationStart 
    ? 'before' 
    : now <= registrationEnd 
    ? 'active' 
    : 'closed';

  useEffect(() => {
    window.scrollTo(0, 0);

    // Setup intersection observer for animations
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

    document.querySelectorAll('.fade-in').forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleEmailSubscribe = () => {
    // Here you would integrate with your email service
    console.log('Email subscription:', email);
    setShowEmailDialog(false);
    setEmail('');
  };

  const tracks = [
    {
      id: 'aslc',
      icon: Satellite,
      color: 'from-blue-500 to-cyan-500',
      stages: 3
    },
    {
      id: 'space_ai',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      stages: 2
    },
    {
      id: 'rocket_science',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      subtracks: ['water_rockets', 'model_rockets']
    }
  ];

  const timeline = [
    { key: 'registration', date: t('ews.timeline.registration.date'), icon: Calendar },
    { key: 'submission', date: t('ews.timeline.submission.date'), icon: Clock },
    { key: 'results', date: t('ews.timeline.results.date'), icon: CheckCircle2 },
    { key: 'arrival', date: t('ews.timeline.arrival.date'), icon: Users },
    { key: 'final', date: t('ews.timeline.final.date'), icon: Award }
  ];

  return (
    <>
      <Helmet>
        <title>{t('ews.seo.title')}</title>
        <meta name="description" content={t('ews.seo.description')} />
        <meta property="og:title" content={t('ews.seo.title')} />
        <meta property="og:description" content={t('ews.seo.description')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aeroo.space/competitions/exploring-world-of-science" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />
          
          <div className="container mx-auto px-4 relative z-10 text-center fade-in">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t('ews.hero.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              {t('ews.hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('ews.hero.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-medium">{t('ews.hero.facts.free')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-medium">{t('ews.hero.facts.categories')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span className="font-medium">{t('ews.hero.facts.final')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaState === 'active' ? (
                <Button 
                  size="xl" 
                  className="btn-cosmic"
                  onClick={() => window.open('https://aeroo.space', '_blank')}
                >
                  {t('ews.cta.register')}
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              ) : ctaState === 'before' ? (
                <Button 
                  size="xl" 
                  className="btn-cosmic"
                  onClick={() => setShowEmailDialog(true)}
                >
                  {t('ews.cta.soon')}
                  <Mail className="ml-2 w-5 h-5" />
                </Button>
              ) : (
                <Button 
                  size="xl" 
                  disabled
                  className="opacity-50"
                >
                  {t('ews.cta.closed')}
                </Button>
              )}
              
              <Button 
                size="xl" 
                variant="outline"
                onClick={() => window.open('https://aeroo.space/login', '_blank')}
              >
                {t('ews.cta.login')}
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {t('ews.about.title')}
              </h2>
              
              <Card className="p-8 glass-card">
                <div className="space-y-6 text-lg">
                  <p>{t('ews.about.intro')}</p>
                  <p>{t('ews.about.mission')}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{t('ews.about.who.title')}</h3>
                        <p className="text-muted-foreground">{t('ews.about.who.text')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Gift className="w-6 h-6 text-success mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{t('ews.about.cost.title')}</h3>
                        <p className="text-muted-foreground">{t('ews.about.cost.text')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 fade-in">
              {t('ews.tracks.title')}
            </h2>
            <p className="text-center text-muted-foreground mb-12 fade-in">
              {t('ews.tracks.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tracks.map((track) => {
                const Icon = track.icon;
                return (
                  <Card 
                    key={track.id}
                    className="p-6 glass-card hover:shadow-2xl transition-all duration-300 cursor-pointer group fade-in"
                    onClick={() => setSelectedTrack(track.id)}
                  >
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{t(`ews.tracks.${track.id}.name`)}</h3>
                    <p className="text-muted-foreground mb-4">{t(`ews.tracks.${track.id}.summary`)}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('ews.tracks.age')}:</span>
                        <span className="font-medium">{t(`ews.tracks.${track.id}.age`)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('ews.tracks.team')}:</span>
                        <span className="font-medium">{t(`ews.tracks.${track.id}.team`)}</span>
                      </div>
                    </div>

                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/10">
                      {t('ews.tracks.details')}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 relative bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
              {t('ews.timeline.title')}
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {timeline.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} className="flex gap-4 items-start fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 pb-6 border-l-2 border-dashed border-muted-foreground/20 pl-6 ml-6">
                        <h3 className="font-bold text-lg mb-1">{t(`ews.timeline.${item.key}.label`)}</h3>
                        <p className="text-muted-foreground">{item.date}</p>
                        <p className="text-sm mt-2">{t(`ews.timeline.${item.key}.desc`)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
              {t('ews.prizes.title')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {['medals', 'special', 'fund', 'education'].map((prize, idx) => (
                <Card key={prize} className="p-6 glass-card text-center fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <Award className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-bold mb-2">{t(`ews.prizes.${prize}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`ews.prizes.${prize}.desc`)}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Participate */}
        <section className="py-20 relative bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
              {t('ews.howto.title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="text-center fade-in">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t(`ews.howto.step${step}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`ews.howto.step${step}.desc`)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
              {ctaState === 'active' && (
                <Button 
                  size="lg" 
                  className="btn-cosmic"
                  onClick={() => window.open('https://aeroo.space', '_blank')}
                >
                  {t('ews.cta.register')}
                  <ExternalLink className="ml-2" />
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.open('https://aeroo.space/login', '_blank')}
              >
                {t('ews.cta.login')}
                <ExternalLink className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
              {t('ews.faq.title')}
            </h2>

            <div className="max-w-3xl mx-auto fade-in">
              <Accordion type="single" collapsible>
                {['free', 'language', 'organizers', 'age', 'logistics'].map((faq) => (
                  <AccordionItem key={faq} value={faq}>
                    <AccordionTrigger className="text-left">
                      {t(`ews.faq.${faq}.q`)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {t(`ews.faq.${faq}.a`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section className="py-20 relative bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
              {t('ews.contacts.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Daryn */}
              <Card className="p-8 glass-card fade-in">
                <h3 className="text-xl font-bold mb-6">{t('ews.contacts.org.title')}</h3>
                <div className="space-y-4">
                  <a href="tel:+77172576563" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+7 (7172) 576-563</span>
                  </a>
                  <a href="https://daryn.kz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-5 h-5" />
                    <span>daryn.kz</span>
                  </a>
                  <a href="mailto:info@daryn.kz" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>info@daryn.kz</span>
                  </a>
                </div>
              </Card>

              {/* AEROO */}
              <Card className="p-8 glass-card fade-in">
                <h3 className="text-xl font-bold mb-6">{t('ews.contacts.tech.title')}</h3>
                <div className="space-y-4">
                  <a href="tel:+77751639790" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+7 775 163 97 90</span>
                  </a>
                  <a href="https://aeroo.space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-5 h-5" />
                    <span>aeroo.space</span>
                  </a>
                  <a href="https://t.me/+cbnepGa-hscxNmUy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Telegram</span>
                  </a>
                  <a href="mailto:info@aeroo.space" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>info@aeroo.space</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Track Detail Dialog */}
      <Dialog open={!!selectedTrack} onOpenChange={() => setSelectedTrack(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedTrack && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{t(`ews.tracks.${selectedTrack}.name`)}</DialogTitle>
                <DialogDescription>{t(`ews.tracks.${selectedTrack}.summary`)}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('ews.tracks.age')}</p>
                    <p className="font-medium">{t(`ews.tracks.${selectedTrack}.age`)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('ews.tracks.team')}</p>
                    <p className="font-medium">{t(`ews.tracks.${selectedTrack}.team`)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">{t('ews.tracks.stages_title')}</h3>
                  <div className="space-y-2">
                    {(t(`ews.tracks.${selectedTrack}.stages`, { returnObjects: true }) as string[]).map((stage: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">{idx + 1}</Badge>
                        <span>{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTrack === 'rocket_science' && (
                  <div>
                    <h3 className="font-bold mb-3">{t('ews.tracks.rocket_science.subtracks_title')}</h3>
                    <div className="space-y-4">
                      {['water_rockets', 'model_rockets'].map((sub) => (
                        <Card key={sub} className="p-4">
                          <h4 className="font-semibold mb-2">{t(`ews.tracks.rocket_science.${sub}.name`)}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{t(`ews.tracks.rocket_science.${sub}.summary`)}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">{t('ews.tracks.age')}: </span>
                              <span className="font-medium">{t(`ews.tracks.rocket_science.${sub}.age`)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{t('ews.tracks.team')}: </span>
                              <span className="font-medium">{t(`ews.tracks.rocket_science.${sub}.team`)}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Subscription Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('ews.email.title')}</DialogTitle>
            <DialogDescription>{t('ews.email.desc')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('ews.email.placeholder')}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Button onClick={handleEmailSubscribe} className="w-full btn-cosmic">
              {t('ews.email.submit')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExploringWorldOfScience;
