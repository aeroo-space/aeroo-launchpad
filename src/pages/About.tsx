import { Helmet } from "react-helmet-async";
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthProvider";

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
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  const team = [
    {
      nameKey: 'teamMembers.mirasName',
      roleKey: 'teamMembers.miraRole',
      bioKey: 'teamMembers.mirasBio',
      role: "CEO",
      bio: "Эксперт в области STEAM-образования и разработки образовательных продуктов",
      image: "/lovable-uploads/4545a519-7175-4528-aa72-a8ac5307ea4d.png"
    },
    {
      nameKey: 'teamMembers.ryspayName', 
      roleKey: 'teamMembers.ryspayRole',
      bioKey: 'teamMembers.ryspayBio',
      role: "COO",
      bio: "6 лет в области STEAM-образования, ex CTO FIRST Robotics",
      image: "/lovable-uploads/191e5103-1470-4cd9-b480-294ceb5290e1.png"
    }
  ];
  const pageTitle = t('about.metaTitle', { defaultValue: 'О AEROO — миссия, команда | STEM космическое образование' });
  const pageDescription = t('about.metaDesc', { defaultValue: 'STEM образовательная экосистема AEROO: миссия развития космического образования, ценности, команда экспертов и партнёры в области спутниковых технологий и ракетостроения' });
  const pageUrl = `${window.location.origin}/about`;
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="AEROO, aeroo kz, Aeroo, Aeroo соревнования, аэро соревнования, Aeroo жарыс, STEM образование, космические технологии, CubeSat, команда AEROO, партнеры, миссия, спутники, ракетостроение, образовательная платформа" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${window.location.origin}/lovable-uploads/4545a519-7175-4528-aa72-a8ac5307ea4d.png`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="relative mb-6 sm:mb-8">
            <Rocket className="h-16 w-16 sm:h-20 sm:w-20 text-primary mx-auto glow-primary animate-pulse" fill="currentColor" strokeWidth={1} />
            <div className="absolute inset-0 animate-spin-slow">
              <Rocket className="h-16 w-16 sm:h-20 sm:w-20 text-primary-glow opacity-30 mx-auto" fill="currentColor" strokeWidth={1} />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-primary">
            {t('about.heroTitle', { defaultValue: 'О AEROO' })}
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.heroSubtitle', { defaultValue: 'Мы вдохновляем и обучаем новое поколение создателей, развивая навыки, командную работу и системное мышление в области аэрокосмических технологий.' })}
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20">
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
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('about.achievementsTitle', { defaultValue: 'Наши достижения' })}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-10 w-10 text-primary group-hover:glow-primary transition-all" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">{t(`about.achievements.${achievement.labelKey}`, { defaultValue: achievement.text })}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('about.teamTitle', { defaultValue: 'Наша команда' })}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                    {t(`about.${member.roleKey}`, { defaultValue: member.role })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`about.${member.bioKey}`, { defaultValue: member.bio })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('about.partnersTitle', { defaultValue: 'Наши партнёры' })}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
        <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('about.leadTitle', { defaultValue: 'Свяжитесь с нами' })}</h2>

          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                
                try {
                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);
                  const name = String(fd.get('name') || '').trim();
                  const email = String(fd.get('email') || '').trim();
                  const phone = String(fd.get('phone') || '').trim();
                  const message = String(fd.get('message') || '').trim();
                  
                  if (!name || !email) {
                    toast.error(t('about.leadRequired', { defaultValue: 'Заполните имя и email' }));
                    return;
                  }

                  // Сохраняем заявку в базу данных
                  const { error } = await supabase
                    .from('product_requests')
                    .insert({
                      user_id: user?.id || null,
                      product_id: 'partnership',
                      name: name,
                      email: email,
                      phone: phone || null,
                      organization: null,
                      comment: message || 'Заявка на партнерство со страницы "О нас"',
                      status: 'pending'
                    });

                  if (error) throw error;

                  toast.success(t('about.leadSuccess', { defaultValue: 'Спасибо! Мы свяжемся с вами в ближайшее время.' }));
                  form.reset();
                } catch (error: any) {
                  console.error('Error submitting partnership request:', error);
                  toast.error('Ошибка при отправке заявки. Попробуйте еще раз.');
                } finally {
                  setSubmitting(false);
                }
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
              <Button className="w-full btn-cosmic" type="submit" disabled={submitting}>
                {submitting ? t('about.sending', { defaultValue: 'Отправляем...' }) : t('about.sendMessage', { defaultValue: 'Отправить' })}
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