import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Rocket,
  Trophy,
  Users,
  Calendar,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Target,
  Zap,
  Sparkles,
  Flame,
  Wind,
  Leaf,
  FileDown
} from 'lucide-react';

const RocketScience2026 = () => {
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

  const tracks = [
    {
      id: 'water',
      title: t('rocketScience2026.tracks.water.title'),
      age: t('rocketScience2026.tracks.water.age'),
      team: t('rocketScience2026.tracks.water.team'),
      icon: Wind,
      color: 'from-blue-500 to-cyan-500',
      description: t('rocketScience2026.tracks.water.description'),
      requirements: [
        t('rocketScience2026.tracks.water.req1'),
        t('rocketScience2026.tracks.water.req2'),
        t('rocketScience2026.tracks.water.req3'),
        t('rocketScience2026.tracks.water.req4')
      ]
    },
    {
      id: 'model',
      title: t('rocketScience2026.tracks.model.title'),
      age: t('rocketScience2026.tracks.model.age'),
      team: t('rocketScience2026.tracks.model.team'),
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      description: t('rocketScience2026.tracks.model.description'),
      requirements: [
        t('rocketScience2026.tracks.model.req1'),
        t('rocketScience2026.tracks.model.req2'),
        t('rocketScience2026.tracks.model.req3'),
        t('rocketScience2026.tracks.model.req4')
      ]
    }
  ];

  const timeline = [
    { label: t('rocketScience2026.timeline.registration'), date: t('rocketScience2026.timeline.registrationDate') },
    { label: t('rocketScience2026.timeline.stage1'), date: t('rocketScience2026.timeline.stage1Date') },
    { label: t('rocketScience2026.timeline.results'), date: t('rocketScience2026.timeline.resultsDate') },
    { label: t('rocketScience2026.timeline.final'), date: t('rocketScience2026.timeline.finalDate') }
  ];

  const waterCriteriaOnline = [
    { criterion: t('rocketScience2026.criteria.waterOnline.idea'), desc: t('rocketScience2026.criteria.waterOnline.ideaDesc'), points: "0-10" },
    { criterion: t('rocketScience2026.criteria.waterOnline.assembly'), desc: t('rocketScience2026.criteria.waterOnline.assemblyDesc'), points: "0-10" },
    { criterion: t('rocketScience2026.criteria.waterOnline.design'), desc: t('rocketScience2026.criteria.waterOnline.designDesc'), points: "0-10" },
    { criterion: t('rocketScience2026.criteria.waterOnline.safety'), desc: t('rocketScience2026.criteria.waterOnline.safetyDesc'), points: "0-10" }
  ];

  const waterCriteriaFinal = [
    { criterion: t('rocketScience2026.criteria.waterFinal.distance'), desc: t('rocketScience2026.criteria.waterFinal.distanceDesc'), points: "0-25" },
    { criterion: t('rocketScience2026.criteria.waterFinal.accuracy'), desc: t('rocketScience2026.criteria.waterFinal.accuracyDesc'), points: "0-15" },
    { criterion: t('rocketScience2026.criteria.waterFinal.stability'), desc: t('rocketScience2026.criteria.waterFinal.stabilityDesc'), points: "0-20" }
  ];

  const modelCriteria = [
    { criterion: t('rocketScience2026.criteria.model.accuracy'), desc: t('rocketScience2026.criteria.model.accuracyDesc'), points: "0-15" },
    { criterion: t('rocketScience2026.criteria.model.model3d'), desc: t('rocketScience2026.criteria.model.model3dDesc'), points: "0-15" },
    { criterion: t('rocketScience2026.criteria.model.docs'), desc: t('rocketScience2026.criteria.model.docsDesc'), points: "0-10" },
    { criterion: t('rocketScience2026.criteria.model.dimensions'), desc: t('rocketScience2026.criteria.model.dimensionsDesc'), points: "0-10" },
    { criterion: t('rocketScience2026.criteria.model.trajectory'), desc: t('rocketScience2026.criteria.model.trajectoryDesc'), points: "0-20" },
    { criterion: t('rocketScience2026.criteria.model.parachute'), desc: t('rocketScience2026.criteria.model.parachuteDesc'), points: "0-15" },
    { criterion: t('rocketScience2026.criteria.model.eco'), desc: t('rocketScience2026.criteria.model.ecoDesc'), points: "0-15" }
  ];

  return (
    <>
      <Helmet>
        <title>{t('rocketScience2026.metaTitle')}</title>
        <meta name="description" content={t('rocketScience2026.metaDescription')} />
        <link rel="canonical" href="https://aeroo.space/competitions/rocket-science-2026" />
      </Helmet>

      <div className="min-h-screen bg-[#000033] relative overflow-hidden">
        {/* Animated starfield background */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />
        
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000033]/50 to-[#000033]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/30 backdrop-blur-sm animate-pulse">
              <Rocket className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-500 font-orbitron">AEROO Rocket Science Competition 2026</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.hero.subtitle')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto">
              {t('rocketScience2026.hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/20 backdrop-blur-sm">
                <Target className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-white">{t('rocketScience2026.hero.skills')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/20 backdrop-blur-sm">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-white">{t('rocketScience2026.hero.teamwork')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/20 backdrop-blur-sm">
                <Leaf className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-white">{t('rocketScience2026.hero.ecoMission')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-orbitron"
                onClick={() => navigate('/enroll/exploring-world-of-science')}
              >
                <span className="relative z-10">{t('rocketScience2026.hero.participate')}</span>
                <Flame className="ml-2 w-5 h-5 relative z-10" />
              </Button>
              
              <Button 
                size="xl" 
                variant="outline"
                className="border-orange-500/30 hover:bg-orange-500/10 text-white font-orbitron"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('rocketScience2026.hero.learnMore')}
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={(el) => el && (revealRefs.current[0] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.about.title')}
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <p className="text-lg mb-6 leading-relaxed text-white/90">
                  {t('rocketScience2026.about.description')}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                    <Users className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white font-orbitron">{t('rocketScience2026.about.participants')}</h3>
                      <p className="text-white/70">{t('rocketScience2026.about.participantsDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                    <Trophy className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-white font-orbitron">{t('rocketScience2026.about.prizes')}</h3>
                      <p className="text-white/70">{t('rocketScience2026.about.prizesDesc')}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-xl mb-3 flex items-center gap-2 font-orbitron text-white">
                    <Zap className="w-5 h-5 text-orange-500" />
                    {t('rocketScience2026.about.goals')}
                  </h3>
                  {[
                    t('rocketScience2026.about.goal1'),
                    t('rocketScience2026.about.goal2'),
                    t('rocketScience2026.about.goal3'),
                    t('rocketScience2026.about.goal4')
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{goal}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Competition Rules Section */}
        <section className="py-20 relative bg-gradient-to-br from-orange-500/10 via-[#000033] to-orange-500/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
                  <FileDown className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-500 font-orbitron">{t('ews.rules.badge')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-orbitron">
                  {t('ews.rules.title')}
                </h2>
                <p className="text-lg text-white/70">
                  {t('ews.rules.subtitle')}
                </p>
              </div>

              <Card className="p-8 bg-white/5 backdrop-blur-sm border-2 border-orange-500/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Award className="w-16 h-16 mx-auto mb-4 text-orange-500" />
                    <p className="text-lg font-medium text-white">
                      {t('ews.rules.description')}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <a
                      href="https://drive.google.com/file/d/1uq2kaYiK2Th1cfQvJcTcITumVT273JHU/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-500/5 to-blue-600/10 border-2 border-blue-500/30 hover:border-blue-500/50">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                            <FileDown className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1 text-blue-500 font-orbitron">Қазақша</h3>
                            <p className="text-sm text-muted-foreground">Жарыс ережелері</p>
                          </div>
                          <span className="mt-2 px-3 py-1 border border-blue-500/50 text-blue-500 rounded-full text-xs">PDF</span>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://drive.google.com/file/d/1W9UXLpv3srm7oQ3g5wrCm6JJLDbYteTW/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-muted/50 to-muted/30 border-2 border-muted-foreground/20 hover:border-muted-foreground/40">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-muted-foreground/10 flex items-center justify-center group-hover:bg-muted-foreground/20 transition-colors">
                            <FileDown className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1 text-muted-foreground font-orbitron">Русский</h3>
                            <p className="text-sm text-muted-foreground">Правила соревнования</p>
                          </div>
                          <span className="mt-2 px-3 py-1 border border-muted-foreground/50 rounded-full text-xs">PDF</span>
                        </div>
                      </Card>
                    </a>

                    <a
                      href="https://drive.google.com/file/d/1uufuZOL8oHCYs3ZsFHqEolwb8Cw73lvS/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-success/5 to-success/10 border-2 border-success/20 hover:border-success/40">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-colors">
                            <FileDown className="w-6 h-6 text-success" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1 text-success font-orbitron">English</h3>
                            <p className="text-sm text-muted-foreground">Competition Rules</p>
                          </div>
                          <span className="mt-2 px-3 py-1 border border-success/50 text-success rounded-full text-xs">PDF</span>
                        </div>
                      </Card>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section ref={(el) => el && (revealRefs.current[1] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700 bg-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.tracks.title')}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {tracks.map((track, idx) => {
                const Icon = track.icon;
                return (
                  <Card 
                    key={idx} 
                    className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white font-orbitron">{track.title}</h3>
                        <p className="text-sm text-white/70">{track.age} • {track.team}</p>
                      </div>
                    </div>
                    
                    <p className="text-white/90 mb-4">{track.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white font-orbitron">{t('rocketScience2026.tracks.requirements')}</h4>
                      {track.requirements.map((req, reqIdx) => (
                        <div key={reqIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-white/80">{req}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={(el) => el && (revealRefs.current[2] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.timeline.title')}
              </span>
            </h2>

            <div className="max-w-4xl mx-auto mb-12">
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.timeline.stage1Title')}</h3>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{t('rocketScience2026.timeline.stage1Item1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{t('rocketScience2026.timeline.stage1Item2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{t('rocketScience2026.timeline.stage1Item3')}</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20 mt-6">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.timeline.stage2Title')}</h3>
                <div className="space-y-4 text-white/90">
                  <div>
                    <h4 className="font-semibold mb-2 text-white">{t('rocketScience2026.timeline.waterTitle')}</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• {t('rocketScience2026.timeline.waterItem1')}</li>
                      <li>• {t('rocketScience2026.timeline.waterItem2')}</li>
                      <li>• {t('rocketScience2026.timeline.waterItem3')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">{t('rocketScience2026.timeline.modelTitle')}</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• {t('rocketScience2026.timeline.modelItem1')}</li>
                      <li>• {t('rocketScience2026.timeline.modelItem2')}</li>
                      <li>• {t('rocketScience2026.timeline.modelItem3')}</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline dates */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8 text-white font-orbitron">{t('rocketScience2026.timeline.keyDates')}</h3>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-orange-500/20">
                    <Calendar className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">{item.label}</h4>
                      <p className="text-sm text-white/70">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Criteria Section */}
        <section ref={(el) => el && (revealRefs.current[3] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700 bg-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.criteria.title')}
              </span>
            </h2>

            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.criteria.waterOnlineTitle')}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr className="text-white/70">
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.criterion')}</th>
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.description')}</th>
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.points')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waterCriteriaOnline.map((item, idx) => (
                        <tr key={idx} className="even:bg-white/5">
                          <td className="py-2 px-3 text-white">{item.criterion}</td>
                          <td className="py-2 px-3 text-white/90">{item.desc}</td>
                          <td className="py-2 px-3 text-white">{item.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.criteria.waterFinalTitle')}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr className="text-white/70">
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.criterion')}</th>
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.description')}</th>
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.points')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waterCriteriaFinal.map((item, idx) => (
                        <tr key={idx} className="even:bg-white/5">
                          <td className="py-2 px-3 text-white">{item.criterion}</td>
                          <td className="py-2 px-3 text-white/90">{item.desc}</td>
                          <td className="py-2 px-3 text-white">{item.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.criteria.modelTitle')}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr className="text-white/70">
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.criterion')}</th>
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.description')}</th>
                        <th className="py-2 px-3 font-semibold">{t('rocketScience2026.criteria.points')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelCriteria.map((item, idx) => (
                        <tr key={idx} className="even:bg-white/5">
                          <td className="py-2 px-3 text-white">{item.criterion}</td>
                          <td className="py-2 px-3 text-white/90">{item.desc}</td>
                          <td className="py-2 px-3 text-white">{item.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section ref={(el) => el && (revealRefs.current[4] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.prizes.title')}
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-orange-500/20 text-center">
                <p className="text-lg mb-6 leading-relaxed text-white/90">
                  {t('rocketScience2026.prizes.description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center">
                    <Award className="w-12 h-12 text-orange-500 mb-2 animate-pulse" />
                    <span className="text-white font-semibold">{t('rocketScience2026.prizes.medals')}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Sparkles className="w-12 h-12 text-orange-500 mb-2 animate-pulse" />
                    <span className="text-white font-semibold">{t('rocketScience2026.prizes.gadgets')}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Trophy className="w-12 h-12 text-orange-500 mb-2 animate-pulse" />
                    <span className="text-white font-semibold">{t('rocketScience2026.prizes.grants')}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section ref={(el) => el && (revealRefs.current[5] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700 bg-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.registration.title')}
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-orange-500/20 text-center">
                <p className="text-lg mb-6 leading-relaxed text-white/90">
                  {t('rocketScience2026.registration.description')}
                </p>
                <Button 
                  size="xl" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-orbitron animate-pulse"
                  onClick={() => navigate('/enroll/exploring-world-of-science')}
                >
                  <span className="relative z-10">{t('rocketScience2026.registration.button')}</span>
                  <Flame className="ml-2 w-5 h-5 relative z-10" />
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section ref={(el) => el && (revealRefs.current[6] = el)} className="py-20 relative opacity-0 translate-y-4 transition-all duration-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-orbitron pb-2">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent px-1 py-2">
                {t('rocketScience2026.contacts.title')}
              </span>
            </h2>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.contacts.info')}</h3>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <a href="tel:+77751639790">+7 775 163 97 90</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <a href="mailto:info@aeroo.space">info@aeroo.space</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <a href="https://t.me/+cbnepGa-hscxNmUy" target="_blank" rel="noopener noreferrer">Telegram</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <a href="https://aeroo.space" target="_blank" rel="noopener noreferrer">https://aeroo.space</a>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-sm border-orange-500/20">
                <h3 className="text-xl font-bold mb-4 text-white font-orbitron">{t('rocketScience2026.contacts.partners')}</h3>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>РНПЦ "Дарын"</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>AEROO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>АУЭС</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default RocketScience2026;
