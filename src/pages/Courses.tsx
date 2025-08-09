import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Plane, Satellite, Brain, Clock, Users, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "rocket-modeling",
    title: "Ракетомодельный спорт",
    description: "Обучение конструкциям и запуску моделей ракет; изучение аэродинамики и безопасного использования твердотопливных двигателей",
    icon: Rocket,
    duration: "8 недель",
    students: "127",
    rating: 4.9,
    level: "Начинающий",
    topics: ["Аэродинамика", "Конструирование", "Безопасность", "Запуск"]
  },
  {
    id: "drones",
    title: "Дроны",
    description: "Курс по пилотированию и программированию квадрокоптеров; знакомство с устройством и системами управления",
    icon: Plane,
    duration: "6 недель", 
    students: "89",
    rating: 4.8,
    level: "Средний",
    topics: ["FPV-пилотирование", "Программирование", "Аэросъёмка", "Настройка контроллеров"]
  },
  {
    id: "satellites",
    title: "Спутники",
    description: "Курс по созданию наноспутников; изучение бортовых систем, энергетики и коммуникаций",
    icon: Satellite,
    duration: "12 недель",
    students: "56",
    rating: 4.9,
    level: "Продвинутый", 
    topics: ["Бортовые системы", "Энергетика", "Коммуникации", "Полезная нагрузка"]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Начинающий": return "bg-green-500";
    case "Средний": return "bg-orange-500";
    case "Продвинутый": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const Courses = () => {
  const { t } = useTranslation();
  const [comingOpen, setComingOpen] = useState(true);

  useEffect(() => {
    document.title = "Курсы AEROO — скоро";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Курсы AEROO в разработке. Совсем скоро откроем доступ для всех!");
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.href = window.location.origin + "/courses";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('courses.hero.title', { defaultValue: 'Курсы AEROO' })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('courses.hero.subtitle', { defaultValue: 'Изучайте аэрокосмические технологии с нуля. Практические курсы от экспертов индустрии с реальными проектами и персональным наставничеством.' })}
          </p>
        </div>

        {/* Course Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t('courses.selectDirection', { defaultValue: 'Выберите направление' })}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-10 w-10 text-primary group-hover:glow-primary transition-all" />
                      <Badge className={`${getLevelColor(course.level)} text-white`}>
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {t(`courses.items.${course.id}.title`, { defaultValue: course.title })}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {t(`courses.items.${course.id}.description`, { defaultValue: course.description })}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="text-sm font-medium">{course.duration}</div>
                      </div>
                      <div className="text-center">
                        <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="text-sm font-medium">{course.students}</div>
                      </div>
                      <div className="text-center">
                        <Star className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="text-sm font-medium">{course.rating}</div>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('courses.topics', { defaultValue: 'Темы курса:' })}</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {t(`courses.items.${course.id}.topics.${index}`, { defaultValue: topic })}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full btn-cosmic">
                      {t('courses.cta.start', { defaultValue: 'Начать изучение' })}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Learning Process */}
        <div className="bg-muted/30 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{t('courses.how.title', { defaultValue: 'Как проходит обучение' })}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">{t('courses.how.steps.0.title', { defaultValue: 'Теория' })}</h3>
              <p className="text-sm text-muted-foreground">{t('courses.how.steps.0.desc', { defaultValue: 'Видеолекции и материалы от экспертов' })}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">{t('courses.how.steps.1.title', { defaultValue: 'Практика' })}</h3>
              <p className="text-sm text-muted-foreground">{t('courses.how.steps.1.desc', { defaultValue: 'Работа с реальными проектами' })}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">{t('courses.how.steps.2.title', { defaultValue: 'Наставничество' })}</h3>
              <p className="text-sm text-muted-foreground">{t('courses.how.steps.2.desc', { defaultValue: 'Персональная поддержка менторов' })}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold mb-2">{t('courses.how.steps.3.title', { defaultValue: 'Сертификат' })}</h3>
              <p className="text-sm text-muted-foreground">{t('courses.how.steps.3.desc', { defaultValue: 'Диплом о завершении курса' })}</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{t('courses.cta.title', { defaultValue: 'Готовы начать обучение?' })}</h2>
          <p className="text-muted-foreground mb-8">
            {t('courses.cta.desc', { defaultValue: 'Присоединяйтесь к сообществу будущих инженеров и исследователей космоса' })}
          </p>
          <Button size="lg" className="btn-cosmic">
            {t('courses.cta.choose', { defaultValue: 'Выбрать курс' })}
          </Button>
        </div>
        
        {/* Coming soon notice */}
        <AlertDialog open={comingOpen} onOpenChange={setComingOpen}>
          <AlertDialogContent className="animate-enter">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">Страница курсов в разработке</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Страница /courses ещё не готова. Позже будет доступна для всех. Пока команда AEROO готовит для вас классные уроки!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogCancel>Понятно</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link to="/">На главную</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;