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
  Globe 
} from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const achievements = [
  { number: "5000+", labelKey: "participants", text: "участников", icon: Users },
  { number: "30+", labelKey: "events", text: "мероприятий", icon: Rocket },
  { number: "5", labelKey: "countries", text: "страны", icon: Globe }
];

const partners = [
  "Digital & Space Ministry",
  "Energo University",
  "Fund for Sustainable Development of Education",
  "Estes Rockets",
  "SpaceLab",
  "The Global Citizen Education Group",
  "Sheilex",
  "Federation of International DroneSoccer Association",
  "Republican scientific and practical center «Daryn»"
];

const About = () => {
  const { t } = useTranslation();
  
  const team = [
    {
      nameKey: 'teamMembers.mirasName',
      role: "CEO",
      bio: "Эксперт в области STEAM-образования и разработки образовательных продуктов",
      image: "/lovable-uploads/4545a519-7175-4528-aa72-a8ac5307ea4d.png"
    },
    {
      nameKey: 'teamMembers.ryspayName', 
      role: "COO",
      bio: "6 лет в области STEAM-образования, ex CTO FIRST Robotics",
      image: "/lovable-uploads/191e5103-1470-4cd9-b480-294ceb5290e1.png"
    }
  ];
  useEffect(() => {
    document.title = t('about.metaTitle', { defaultValue: 'О AEROO — миссия и команда' });
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('about.metaDesc', { defaultValue: 'Образовательная экосистема AEROO: миссия, ценности, команда и партнёры' }));
  }, [t]);
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
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            {t('about.heroTitle', { defaultValue: 'О AEROO' })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.heroSubtitle', { defaultValue: 'Мы вдохновляем и обучаем новое поколение создателей, развивая навыки, командную работу и системное мышление в области аэрокосмических технологий.' })}
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">{t('about.missionTitle', { defaultValue: 'Наша миссия' })}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.missionText', { defaultValue: 'Создать образовательную экосистему, которая объединяет школьников, студентов и молодых инженеров вокруг передовых технологий. Мы стремимся сделать аэрокосмические знания доступными каждому талантливому человеку.' })}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">{t('about.valuesTitle', { defaultValue: 'Наши ценности' })}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t('about.values.innovation', { defaultValue: 'Инновации и технологическое превосходство' })}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t('about.values.openness', { defaultValue: 'Открытость и доступность образования' })}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t('about.values.teamwork', { defaultValue: 'Командная работа и взаимопомощь' })}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t('about.values.excellence', { defaultValue: 'Стремление к совершенству' })}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.achievementsTitle', { defaultValue: 'Наши достижения' })}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-10 w-10 text-primary group-hover:glow-primary transition-all" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground">{t(`about.achievements.${achievement.labelKey}`, { defaultValue: achievement.text })}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.teamTitle', { defaultValue: 'Наша команда' })}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {member.image !== "/placeholder.svg" ? (
                      <img src={member.image} alt={t(`about.${member.nameKey}`, { defaultValue: member.nameKey.includes('miras') ? 'Мирас Нусупов' : 'Рыспай Алихан' })} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="h-16 w-16 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {t(`about.${member.nameKey}`, { defaultValue: member.nameKey.includes('miras') ? 'Мирас Нусупов' : 'Рыспай Алихан' })}
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
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.partnersTitle', { defaultValue: 'Наши партнёры' })}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                <div className="text-sm font-medium text-muted-foreground">{partner}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const contactForm = document.querySelector('[name="name"]')?.closest('form');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              {t('about.becomePartner', { defaultValue: 'Стать партнёром' })}
            </Button>
          </div>
        </div>

        {/* Lead Capture */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.leadTitle', { defaultValue: 'Свяжитесь с нами' })}</h2>

          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const name = String(fd.get('name') || '').trim();
                const email = String(fd.get('email') || '').trim();
                if (!name || !email) {
                  toast.error(t('about.leadRequired', { defaultValue: 'Заполните имя и email' }));
                  return;
                }
                toast.success(t('about.leadSuccess', { defaultValue: 'Спасибо! Мы свяжемся с вами в ближайшее время.' }));
                form.reset();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">{t('about.formName', { defaultValue: 'Имя' })}</label>
                <input name="name" className="w-full p-3 rounded-lg border border-border bg-background" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input name="email" type="email" className="w-full p-3 rounded-lg border border-border bg-background" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('about.formPhone', { defaultValue: 'Телефон' })}</label>
                <input name="phone" type="tel" className="w-full p-3 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('about.formMessage', { defaultValue: 'Сообщение' })}</label>
                <textarea name="message" className="w-full p-3 rounded-lg border border-border bg-background h-32" />
              </div>
              <Button className="w-full btn-cosmic" type="submit">
                {t('about.sendMessage', { defaultValue: 'Отправить' })}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {t('about.privacyNote', { defaultValue: 'Отправляя форму, вы соглашаетесь с политикой конфиденциальности.' })}
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;