import React, { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Trophy, 
  GraduationCap, 
  ArrowRight,
  Star,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";
import { useTranslation } from "react-i18next";
const HeroSpace = React.lazy(() => import("@/components/three/HeroSpace"));


export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleRegistration = (type: 'course' | 'competition') => {
    setIsModalOpen(false);
    // Handle redirection to forms
    console.log(`Redirecting to ${type} registration`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
      {/* 3D Space Background */}
      <Suspense fallback={null}>
        <HeroSpace />
      </Suspense>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                AEROO
              </span>
              <span className="block text-3xl md:text-5xl text-foreground mt-2">
                {t('home.hero.subtitle', { defaultValue: 'Образовательная платформа' })}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.hero.tagline', { defaultValue: 'Вдохновляем и обучаем новое поколение создателей, развивая навыки, командную работу и системное мышление' })}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 my-12">
            <div className="glass-card p-6 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-accent mr-2" />
                <span className="text-2xl font-bold text-primary">500+</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('home.hero.stats.participants', { defaultValue: 'Участников' })}</p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-accent mr-2" />
                <span className="text-2xl font-bold text-primary">15+</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('home.hero.stats.competitions', { defaultValue: 'Соревнований' })}</p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center min-w-[120px]">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-accent mr-2" />
                <span className="text-2xl font-bold text-primary">50+</span>
              </div>
              <p className="text-sm text-muted-foreground">{t('home.hero.stats.projects', { defaultValue: 'Проектов' })}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="btn-cosmic text-lg px-8 py-6 group"
              onClick={() => setIsModalOpen(true)}
            >
              {t('home.hero.cta.startLearning', { defaultValue: 'Начать обучение' })}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">
              {t('home.hero.cta.join', { defaultValue: 'Присоединяйтесь к сообществу молодых инженеров' })}
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('home.hero.modal.title', { defaultValue: 'Выберите направление' })}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Button 
              className="w-full btn-cosmic p-6 text-lg justify-start"
              onClick={() => handleRegistration('course')}
            >
              <GraduationCap className="h-6 w-6 mr-4" />
              <div className="text-left">
                <div className="font-semibold">{t('home.hero.modal.course', { defaultValue: 'Записаться на курс' })}</div>
                <div className="text-sm opacity-80">{t('home.hero.modal.courseDesc', { defaultValue: 'Изучайте технологии в своем темпе' })}</div>
              </div>
            </Button>
            <Button 
              className="w-full btn-nebula p-6 text-lg justify-start"
              onClick={() => handleRegistration('competition')}
            >
              <Trophy className="h-6 w-6 mr-4" />
              <div className="text-left">
                <div className="font-semibold">{t('home.hero.modal.competition', { defaultValue: 'Участвовать в соревновании' })}</div>
                <div className="text-sm opacity-80">{t('home.hero.modal.competitionDesc', { defaultValue: 'Проверьте свои навыки в деле' })}</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}