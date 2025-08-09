import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Rocket, Users, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Community = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('community.metaTitle', { defaultValue: 'Сообщество AEROO — общение и поддержка' });
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('community.hero.title', { defaultValue: 'Сообщество AEROO' })}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('community.hero.subtitle', { defaultValue: 'Пространство для учеников, студентов, наставников и инженеров, которым интересны ракеты, дроны, спутники и ИИ. Делитесь опытом, задавайте вопросы и участвуйте в проектах AEROO.' })}
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{t('community.cards.networking.title', { defaultValue: 'Знакомства и нетворкинг' })}</h3>
            <p className="text-muted-foreground text-sm">{t('community.cards.networking.desc', { defaultValue: 'Находите команду для соревнований и проекты для портфолио.' })}</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Вопросы и помощь</h3>
            <p className="text-muted-foreground text-sm">Получайте ответы от менторов и сообщества по наборам и технике.</p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Анонсы и активности</h3>
            <p className="text-muted-foreground text-sm">Будьте в курсе курсов, соревнований и запусков AEROO.</p>
          </div>
        </section>

        <div className="text-center">
          <Button asChild size="lg" className="btn-nebula">
            <a
              href="https://t.me/+5nKRCrdTXT05YThi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Перейти в сообщество AEROO в Telegram"
            >
              Перейти в сообщество
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Откроется в новом окне Telegram</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
