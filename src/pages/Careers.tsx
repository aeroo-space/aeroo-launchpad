import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Code, Cpu, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

const POSITIONS = [
  {
    title: "Hardware Engineer",
    icon: Cpu,
    description: "Разработка и тестирование аэрокосмических систем",
    requirements: ["Опыт работы с микроконтроллерами", "Знание схемотехники", "Опыт проектирования PCB"]
  },
  {
    title: "Software Engineer", 
    icon: Code,
    description: "Разработка программного обеспечения для образовательной платформы",
    requirements: ["React/TypeScript", "Python/C++", "Опыт работы с API"]
  },
  {
    title: "Project Manager",
    icon: Settings,
    description: "Управление проектами и координация команды",
    requirements: ["Опыт управления проектами", "Знание Agile/Scrum", "Коммуникативные навыки"]
  }
];

export default function Careers() {
  const { t } = useTranslation();

  const handleApplyClick = () => {
    const subject = encodeURIComponent("Заявка на трудоустройство в AEROO");
    const body = encodeURIComponent(`Здравствуйте!

Меня заинтересовала вакансия в компании AEROO. Прикрепляю свое резюме.

Желаемая позиция: [указать желаемую позицию]
Опыт работы: [краткое описание опыта]

С уважением,
[Ваше имя]`);
    
    window.location.href = `mailto:info@aeroo.space?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Helmet>
        <title>{t('careers.metaTitle', { defaultValue: 'Карьера в AEROO — Присоединяйтесь к нашей команде' })}</title>
        <meta 
          name="description" 
          content={t('careers.metaDescription', { 
            defaultValue: 'Ищете работу в инновационной аэрокосмической компании? Присоединяйтесь к команде AEROO. Открытые вакансии для инженеров и менеджеров.' 
          })} 
        />
        <meta name="keywords" content="карьера AEROO, вакансии, работа, аэрокосмос, инженер, программист" />
        <link rel="canonical" href="https://aeroo.space/careers" />
      </Helmet>

      <main className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              {t('careers.hero.title', { defaultValue: 'Карьера в AEROO' })}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('careers.hero.subtitle', { 
                defaultValue: 'Присоединяйтесь к нашей инновационной команде и помогайте формировать будущее аэрокосмического образования' 
              })}
            </p>
          </section>

          {/* Main Content */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-12">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-4">
                    {t('careers.join.title', { defaultValue: 'Хотите работать с нами?' })}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {t('careers.join.description', { 
                      defaultValue: 'Если вы хотите работать в нашей инновационной компании и развивать аэрокосмические технологии, отправьте свое резюме на нашу электронную почту.' 
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={handleApplyClick}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-accent text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    {t('careers.join.button', { defaultValue: 'Отправить резюме' })}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    <Mail className="h-4 w-4 inline mr-1" />
                    info@aeroo.space
                  </p>
                </CardContent>
              </Card>

              {/* Open Positions */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                  {t('careers.positions.title', { defaultValue: 'Открытые позиции' })}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {POSITIONS.map((position, index) => {
                    const Icon = position.icon;
                    return (
                      <Card key={position.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">
                              {t(`careers.positions.${index}.title`, { defaultValue: position.title })}
                            </CardTitle>
                          </div>
                          <CardDescription>
                            {t(`careers.positions.${index}.description`, { defaultValue: position.description })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h4 className="font-semibold mb-2 text-sm">
                            {t('careers.requirements', { defaultValue: 'Требования:' })}
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {position.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {t(`careers.positions.${index}.requirements.${reqIndex}`, { defaultValue: req })}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Company Culture */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    {t('careers.culture.title', { defaultValue: 'Почему AEROO?' })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        {t('careers.culture.innovation.title', { defaultValue: 'Инновации' })}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('careers.culture.innovation.text', { 
                          defaultValue: 'Работайте с передовыми технологиями в области аэрокосмоса и образования' 
                        })}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        {t('careers.culture.impact.title', { defaultValue: 'Влияние' })}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('careers.culture.impact.text', { 
                          defaultValue: 'Помогайте формировать будущее поколение инженеров и исследователей' 
                        })}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        {t('careers.culture.growth.title', { defaultValue: 'Развитие' })}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('careers.culture.growth.text', { 
                          defaultValue: 'Непрерывное обучение и профессиональный рост в динамичной среде' 
                        })}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        {t('careers.culture.team.title', { defaultValue: 'Команда' })}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('careers.culture.team.text', { 
                          defaultValue: 'Работайте с passionate командой профессионалов из разных областей' 
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}