import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();
  
  const pageTitle = t('support.metaTitle', { defaultValue: 'Техподдержка AEROO | Помощь по STEM наборам и соревнованиям' });
  const pageDescription = t('support.metaDesc', { defaultValue: 'Техническая поддержка AEROO: помощь с доступом к платформе, STEM наборами, заказами и участием в космических соревнованиях CubeSat и ракетостроению' });
  const pageUrl = `${window.location.origin}/support`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="AEROO, aeroo kz, Aeroo, Aeroo соревнования, аэро соревнования, Aeroo жарыс, техподдержка AEROO, помощь, STEM наборы, соревнования, CubeSat, поддержка клиентов, контакты" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('support.title', { defaultValue: 'Техподдержка' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('support.subtitle', { defaultValue: 'Поможем с доступом, наборами, заказами и участием в соревнованиях. Напишите нам и мы ответим в ближайшее время.' })}
          </p>
        </header>
        <section className="max-w-2xl mx-auto space-y-4">
          <p>{t('support.emailLabel', { defaultValue: 'Почта:' })} info@aeroo.space</p>
          <p>{t('support.telegramLabel', { defaultValue: 'Telegram:' })} @alikhanrsp</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
