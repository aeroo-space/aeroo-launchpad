import { Star, Quote, GraduationCap, Trophy, Building, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const TESTIMONIAL_TYPES = {
  director: { icon: Building, colorClass: "text-primary" },
  teacher: { icon: GraduationCap, colorClass: "text-accent" },
  participant: { icon: User, colorClass: "text-primary-glow" },
  winner: { icon: Trophy, colorClass: "text-success" }
};

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      type: "director",
      rating: 5,
      id: 0
    },
    {
      type: "teacher", 
      rating: 5,
      id: 1
    },
    {
      type: "winner",
      rating: 5, 
      id: 2
    },
    {
      type: "participant",
      rating: 5,
      id: 3
    },
    {
      type: "teacher",
      rating: 5,
      id: 4
    },
    {
      type: "director",
      rating: 5,
      id: 5
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('home.testimonials.title', { defaultValue: 'Отзывы о AEROO' })}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('home.testimonials.subtitle', { defaultValue: 'Что говорят о нас директора школ, учителя, участники и победители соревнований' })}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const typeConfig = TESTIMONIAL_TYPES[testimonial.type as keyof typeof TESTIMONIAL_TYPES];
            const Icon = typeConfig.icon;
            
            return (
              <article 
                key={testimonial.id}
                className="glass-card p-8 rounded-xl hover:glow-primary transition-all duration-300 hover-scale animate-fade-in relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-20">
                  <Quote className="h-8 w-8 text-primary" />
                </div>

                {/* Header with Type and Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-muted/20 ${typeConfig.colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {t(`home.testimonials.types.${testimonial.type}`, { 
                        defaultValue: testimonial.type === 'director' ? 'Директор' :
                                     testimonial.type === 'teacher' ? 'Учитель' :
                                     testimonial.type === 'winner' ? 'Победитель' : 'Участник'
                      })}
                    </span>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-foreground leading-relaxed mb-6">
                  "{t(`home.testimonials.items.${testimonial.id}.text`, { 
                    defaultValue: 'Отзыв загружается...' 
                  })}"
                </blockquote>

                {/* Author Info */}
                <footer className="border-t border-border/50 pt-4">
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">
                      {t(`home.testimonials.items.${testimonial.id}.author`, { 
                        defaultValue: 'Автор' 
                      })}
                    </div>
                    <div className="text-muted-foreground">
                      {t(`home.testimonials.items.${testimonial.id}.position`, { 
                        defaultValue: 'Должность' 
                      })}
                    </div>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            {t('home.testimonials.cta.text', { 
              defaultValue: 'Присоединяйтесь к тысячам довольных участников и педагогов' 
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/competitions"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              {t('home.testimonials.cta.competitions', { defaultValue: 'Участвовать в соревнованиях' })}
            </a>
            <a 
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border hover:bg-muted/50 transition-colors font-medium"
            >
              {t('home.testimonials.cta.products', { defaultValue: 'Заказать наборы' })}
            </a>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-accent rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-primary rounded-full animate-ping opacity-20" />
      <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-40" />
    </section>
  );
}