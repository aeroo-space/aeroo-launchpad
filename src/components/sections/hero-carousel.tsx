import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const HeroCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api) return;
    const id = setInterval(() => {
      try {
        // With loop enabled we can just scrollNext continuously
        api.scrollNext();
      } catch (e) {
        // noop
      }
    }, 6000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative isolate overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
      
        <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
          <CarouselContent>

            {/* Slide 2: Соревнования */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src="/lovable-uploads/d178795f-04a5-480a-ad63-2cd5036b6027.png"
                  alt="Иллюстрация соревнований AEROO — школьники, дрон, спутник и ракета"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="lazy"
                />
                 <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      {t('home.hero.competitions.title')}
                    </h2>
                    <p className="text-base md:text-lg text-foreground/90 mb-8">
                      {t('home.hero.competitions.desc')}
                    </p>
                    <Button asChild size="xl" variant="primary">
                      <Link to="/competitions">{t('home.hero.competitions.button')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Продукты */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src="/lovable-uploads/91015627-7be5-493b-81fd-32419283bac5.png"
                  alt="Образовательные наборы AEROO — фото студентов с ракетой и CubeSat"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="lazy"
                />
                 <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      {t('home.hero.products.title')}
                    </h2>
                    <p className="text-base md:text-lg text-foreground/90 mb-8">
                      {t('home.hero.products.desc')}
                    </p>
                    <Button asChild size="xl" variant="primary">
                      <Link to="/products">{t('home.hero.products.button')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 4: Exploring the World of Science */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src="/lovable-uploads/c7d720b3-94b2-4030-9cee-6d6ff7de5556.png"
                  alt="Exploring the World of Science — научные исследования в космосе"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      {t('home.hero.exploringScience.title')}
                    </h2>
                    <p className="text-base md:text-lg text-foreground/90 mb-8">
                      {t('home.hero.exploringScience.desc')}
                    </p>
                    <Button asChild size="xl" variant="primary">
                      <Link to="/competitions/exploring-world-of-science">{t('home.hero.exploringScience.button')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Nav buttons (optional) */}
          <CarouselPrevious className="hidden md:inline-flex" aria-label={t('home.hero.competitions.button')} />
          <CarouselNext className="hidden md:inline-flex" aria-label={t('home.hero.competitions.button')} />
        </Carousel>
    </section>
  );
};

export default HeroCarousel;
