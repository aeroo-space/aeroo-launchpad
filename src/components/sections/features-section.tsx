import { 
  Rocket, 
  Plane, 
  Satellite, 
  Cpu, 
  Trophy, 
  Users,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FEATURES = [
  {
    icon: Rocket,
    title: "Ракетомодельный спорт",
    description: "Изучение аэродинамики, конструирование и запуск моделей ракет с твердотопливными двигателями",
    color: "text-primary"
  },
  {
    icon: Plane,
    title: "Беспилотные системы",
    description: "Программирование дронов, FPV-пилотирование, аэросъёмка и автономные полёты",
    color: "text-accent"
  },
  {
    icon: Satellite,
    title: "Спутниковые технологии",
    description: "Создание наноспутников, изучение бортовых систем и подготовка к запуску",
    color: "text-primary-glow"
  },
  {
    icon: Cpu,
    title: "Искусственный интеллект",
    description: "Разработка автономных алгоритмов для навигации и управления космическими миссиями",
    color: "text-accent-glow"
  },
  {
    icon: Trophy,
    title: "Соревнования",
    description: "Участие в международных конкурсах по аэрокосмическим технологиям",
    color: "text-success"
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Развитие навыков сотрудничества в многодисциплинарных проектах",
    color: "text-primary"
  }
];

export function FeaturesSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('home.features.title', { defaultValue: 'Направления обучения' })}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('home.features.subtitle', { defaultValue: 'Погрузитесь в мир аэрокосмических технологий через практические курсы и захватывающие соревнования' })}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                to={index < 3 ? "/products" : "/competitions"}
                key={index}
                className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
                aria-label={`${t(`home.features.items.${index}.title`, { defaultValue: feature.title })} — подробнее`}
              >
                <article className="glass-card p-8 rounded-xl hover:glow-primary transition-all duration-300 hover-scale animate-fade-in">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-muted/20 mr-4 group-hover:glow-primary transition-all">
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(`home.features.items.${index}.title`, { defaultValue: feature.title })}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`home.features.items.${index}.desc`, { defaultValue: feature.description })}
                  </p>
                  <div className="mt-6 text-primary flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-medium">{t('home.features.learnMore', { defaultValue: 'Узнать больше' })}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            {t('home.features.cta.title', { defaultValue: 'Готовы начать свой путь в космос?' })}
          </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-cosmic px-8 py-3">
                <Link to="/products" aria-label={t('home.features.cta.courses', { defaultValue: 'Посмотреть образовательные комплекты для школ' })}>
                  {t('home.features.cta.courses', { defaultValue: 'Посмотреть образовательные комплекты для школ' })}
                </Link>
              </Button>
              <Button asChild className="btn-aurora px-8 py-3">
                <Link to="/competitions/space-settlement-2025" aria-label={t('home.features.cta.competitions', { defaultValue: 'Ближайшие соревнования' })}>
                  {t('home.features.cta.competitions', { defaultValue: 'Ближайшие соревнования' })}
                </Link>
              </Button>
            </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-accent rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-primary rounded-full animate-ping opacity-20" />
      <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-40" />
    </section>
  );
}