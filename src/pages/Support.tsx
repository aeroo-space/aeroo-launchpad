import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('support.metaTitle', { defaultValue: 'Техподдержка AEROO' });
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('support.metaDesc', { defaultValue: 'Помощь с доступом, наборами, заказами и участием в соревнованиях' }));
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('support.title', { defaultValue: 'Техподдержка' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('support.subtitle', { defaultValue: 'Поможем с доступом, наборами, заказами и участием в соревнованиях. Напишите нам и мы ответим в ближайшее время.' })}
          </p>
        </header>
        <section className="max-w-2xl mx-auto space-y-4">
          <p>{t('support.emailLabel', { defaultValue: 'Почта:' })} support@aeroo.kz</p>
          <p>{t('support.telegramLabel', { defaultValue: 'Telegram:' })} @aeroo_support</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
