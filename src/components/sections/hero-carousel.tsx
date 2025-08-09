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
import heroSpace from "@/assets/hero-space.jpg";
import satelliteCrew from "@/assets/satellite-crew-edited.jpg";

export const HeroCarousel: React.FC = () => {
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
            {/* Slide 1: Образовательная платформа */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src={heroSpace}
                  alt="Космический фон AEROO — образовательная платформа"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/30 to-background/70" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <p className="text-sm md:text-base text-muted-foreground mb-3">AEROO</p>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      AEROO — образовательная платформа
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground mb-8">
                      Учись, создавай и расти вместе с сообществом AEROO. Курсы, проекты и реальные вызовы из аэрокосмической отрасли.
                    </p>
                    <div className="flex gap-3">
                      <Button asChild size="xl" variant="primary">
                        <Link to="/courses">Начать обучение</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2: Соревнования */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src={satelliteCrew}
                  alt="Команда AEROO на соревнованиях"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/30 to-background/70" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      Соревнования AEROO
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-8">
                      Участвуй в инженерных и исследовательских состязаниях. Покажи свой потенциал и получи признание.
                    </p>
                    <Button asChild size="xl" variant="primary">
                      <Link to="/competitions">Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Продукты */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src={heroSpace}
                  alt="Продукты AEROO на фоне космоса"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/30 to-background/70" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      Продукты AEROO
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-8">
                      Исследуй решения и инструменты AEROO для обучения, симуляции и коллаборации.
                    </p>
                    <Button asChild size="xl" variant="primary">
                      <Link to="/products">Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 4: Ближайшее соревнование */}
            <CarouselItem>
              <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
                <img
                  src={satelliteCrew}
                  alt="AEROO Space Settlement Competition 2025"
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/30 to-background/70" />
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-3xl py-16 md:py-24 animate-enter">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
                      AEROO Space Settlement Competition 2025
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground mb-6">
                      Даты проведения: 28–29 октября 2025.
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground mb-8">
                      Старт регистрации: с 5 сентября.
                    </p>
                    <Button asChild size="xl" variant="primary">
                      <Link to="/competitions">Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Nav buttons (optional) */}
          <CarouselPrevious className="hidden md:inline-flex" aria-label="Предыдущий слайд" />
          <CarouselNext className="hidden md:inline-flex" aria-label="Следующий слайд" />
        </Carousel>
    </section>
  );
};

export default HeroCarousel;
