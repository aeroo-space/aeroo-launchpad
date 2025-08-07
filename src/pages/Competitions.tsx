import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Satellite, Building, Brain, Car, Plane, Trophy } from "lucide-react";

const competitions = [
  {
    id: "aeroo-fest",
    title: "AEROO Fest",
    category: "Фестиваль",
    description: "Мероприятия, шоу и мастер‑классы для продвижения аэрокосмических технологий",
    icon: Trophy,
    status: "Активно",
    deadline: "15 марта 2024",
    ages: "12-25 лет"
  },
  {
    id: "satellite-launch", 
    title: "AEROO Satellite Launch",
    category: "Малый спутник",
    description: "Проектирование, сборка и запуск мини‑спутников",
    icon: Satellite,
    status: "Регистрация",
    deadline: "1 апреля 2024",
    ages: "16-25 лет"
  },
  {
    id: "space-settlement",
    title: "AEROO Space Settlement", 
    category: "Проектирование",
    description: "Разработка концепций поселений в космосе для долгосрочной жизни",
    icon: Building,
    status: "Скоро",
    deadline: "10 мая 2024",
    ages: "14-25 лет"
  },
  {
    id: "ai-challenge",
    title: "AEROO Space AI Challenge",
    category: "AI",
    description: "Разработка автономных алгоритмов для навигации, управления и планирования миссий",
    icon: Brain,
    status: "Активно", 
    deadline: "25 марта 2024",
    ages: "16-25 лет"
  },
  {
    id: "drive-competition",
    title: "AEROO Drive Competition",
    category: "Ровер",
    description: "Создание и управление роверами для исследования поверхностей планет",
    icon: Car,
    status: "Регистрация",
    deadline: "5 апреля 2024", 
    ages: "14-25 лет"
  },
  {
    id: "drone-competition",
    title: "AEROO Drone Competition",
    category: "Дроны",
    description: "Конструирование и пилотирование дронов для зондирования, картографирования и гонок",
    icon: Plane,
    status: "Активно",
    deadline: "20 марта 2024",
    ages: "12-25 лет"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Активно": return "bg-green-500";
    case "Регистрация": return "bg-blue-500";
    case "Скоро": return "bg-orange-500";
    default: return "bg-gray-500";
  }
};

const Competitions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Соревнования AEROO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Присоединяйтесь к инновационным соревнованиям в области аэрокосмических технологий. 
            Проверьте свои навыки и создавайте будущее вместе с нами.
          </p>
        </div>

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {competitions.map((competition) => {
            const Icon = competition.icon;
            return (
              <Card key={competition.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-primary group-hover:glow-primary transition-all" />
                    <Badge className={`${getStatusColor(competition.status)} text-white`}>
                      {competition.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {competition.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-primary/70">
                    {competition.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {competition.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Возраст:</span>
                      <span className="font-medium">{competition.ages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Дедлайн:</span>
                      <span className="font-medium">{competition.deadline}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full btn-cosmic">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Archive Section */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Архив соревнований</h2>
          <p className="text-muted-foreground mb-6">
            Изучите результаты прошлых лет и вдохновитесь достижениями участников
          </p>
          <Button variant="outline" size="lg">
            Посмотреть архив
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competitions;