import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { FeaturesSection } from "@/components/sections/features-section";
import NewsSection from "@/components/sections/news-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('home.metaTitle', { defaultValue: 'AEROO — образовательная платформа' });
  }, [t]);
  return (
    <div className="min-h-screen">
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
