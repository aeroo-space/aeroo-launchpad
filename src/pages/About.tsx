import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Target, 
  Heart, 
  Users, 
  Trophy, 
  Globe, 
  Mail, 
  MapPin,
  Phone,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

const achievements = [
  { number: "500+", label: "Участников", icon: Users },
  { number: "50+", label: "Проектов", icon: Rocket },
  { number: "15+", label: "Наград", icon: Trophy },
  { number: "3", label: "Страны", icon: Globe }
];

const team = [
  {
    name: "Алексей Петров",
    role: "Основатель и CEO",
    bio: "Инженер-ракетостроитель с 10-летним опытом в космической индустрии",
    image: "/placeholder.svg"
  },
  {
    name: "Мария Иванова", 
    role: "Директор по образованию",
    bio: "Эксперт в области STEM-образования и разработки образовательных программ",
    image: "/placeholder.svg"
  },
  {
    name: "Дмитрий Сидоров",
    role: "Технический директор", 
    bio: "Специалист по беспилотным системам и искусственному интеллекту",
    image: "/placeholder.svg"
  }
];

const partners = [
  "Роскосмос", "SpaceX", "КазКосмос", "Московский авиационный институт",
  "МФТИ", "Казахстанский национальный университет"
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <Rocket className="h-20 w-20 text-primary mx-auto glow-primary animate-pulse" />
            <div className="absolute inset-0 animate-spin-slow">
              <Rocket className="h-20 w-20 text-primary-glow opacity-30 mx-auto" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            О AEROO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы вдохновляем и обучаем новое поколение создателей, развивая навыки, 
            командную работу и системное мышление в области аэрокосмических технологий.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">Наша миссия</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Создать образовательную экосистему, которая объединяет школьников, студентов 
                и молодых инженеров вокруг передовых технологий. Мы стремимся сделать 
                аэрокосмические знания доступными каждому талантливому человеку.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">Наши ценности</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Инновации и технологическое превосходство
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Открытость и доступность образования
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Командная работа и взаимопомощь
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Стремление к совершенству
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Наши достижения</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-10 w-10 text-primary group-hover:glow-primary transition-all" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground">{achievement.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="font-medium text-primary/70">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Наши партнёры</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">{partner}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Стать партнёром
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">info@aeroo.kz</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-medium">Телефон</div>
                  <div className="text-muted-foreground">+7 (777) 123-45-67</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-medium">Адрес</div>
                  <div className="text-muted-foreground">Алматы, Казахстан</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="sm" variant="outline">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Github className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Напишите нам</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <input className="w-full p-3 rounded-lg border border-border bg-background" placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full p-3 rounded-lg border border-border bg-background" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <textarea className="w-full p-3 rounded-lg border border-border bg-background h-32" placeholder="Ваше сообщение..."></textarea>
                </div>
                <Button className="w-full btn-cosmic">
                  Отправить сообщение
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;