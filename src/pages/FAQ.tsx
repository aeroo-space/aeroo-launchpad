import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('faq.metaTitle', { defaultValue: 'FAQ — AEROO' });
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('faq.metaDesc', { defaultValue: 'Ответы на популярные вопросы' }));
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('faq.title', { defaultValue: 'Частые вопросы' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle', { defaultValue: 'Ответы на популярные вопросы о платформах, наборах и соревнованиях AEROO.' })}
          </p>
        </header>
        <section className="max-w-3xl mx-auto space-y-6">
          <article>
            <h2 className="text-xl font-semibold">{t('faq.q1', { defaultValue: 'Как записаться на соревнование?' })}</h2>
            <p className="text-muted-foreground">{t('faq.a1', { defaultValue: 'Выберите соревнование на странице “Соревнования” и нажмите “Участвовать”. Далее следуйте инструкции.' })}</p>
          </article>
          <article>
            <h2 className="text-xl font-semibold">{t('faq.q2', { defaultValue: 'Как выбрать набор?' })}</h2>
            <p className="text-muted-foreground">{t('faq.a2', { defaultValue: 'Начните с ракетного набора AEROO-R1, если вы новичок. Для продвинутых подойдёт AEROO-S3.' })}</p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
