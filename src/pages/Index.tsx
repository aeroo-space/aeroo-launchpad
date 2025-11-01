import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/ui/navigation";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { FeaturesSection } from "@/components/sections/features-section";
import NewsSection from "@/components/sections/news-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  const pageTitle = t('home.metaTitle', { defaultValue: 'AEROO — STEM образовательная платформа | Спутники, CubeSat, Ракетостроение' });
  const pageDescription = t('home.metaDesc', { defaultValue: 'STEM образовательная платформа AEROO: соревнования по космосу, спутникам CubeSat и ракетостроению. Образовательные наборы для изучения космических технологий.' });
  const pageUrl = window.location.origin;
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="AEROO, aeroo kz, Aeroo, Aeroo соревнования, аэро соревнования, Aeroo жарыс, STEM, CubeSat, Спутники, космическое образование, соревнования по космосу, Ракетостроение, STEM платформа, STEM соревнования, Образовательные наборы, STEM наборы" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="AEROO" />
        <meta property="og:image" content={`${pageUrl}/lovable-uploads/05126356-406f-4466-b04f-fe02aed5e6ef.png`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${pageUrl}/lovable-uploads/05126356-406f-4466-b04f-fe02aed5e6ef.png`} />
        
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      
      <Navigation />
      <main>
        <HeroCarousel />
        <FeaturesSection />
        <NewsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
