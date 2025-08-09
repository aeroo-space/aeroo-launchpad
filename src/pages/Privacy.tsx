import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('privacy.metaTitle', { defaultValue: 'Политика конфиденциальности — AEROO' });
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('privacy.metaDesc', { defaultValue: 'Как мы собираем и обрабатываем ваши данные' }));
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('privacy.title', { defaultValue: 'Политика конфиденциальности' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('privacy.subtitle', { defaultValue: 'Как мы собираем и обрабатываем ваши данные.' })}</p>
        </header>
        <section className="prose prose-invert max-w-3xl mx-auto">
          <p>{t('privacy.body', { defaultValue: 'Мы относимся к безопасности данных ответственно. Данные используются исключительно для предоставления услуг AEROO.' })}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
