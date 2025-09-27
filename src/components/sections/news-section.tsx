import { ExternalLink, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const NewsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Cosmic Background with Stars */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-accent rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-accent-glow rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-20 right-10 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-10 left-10 w-1 h-1 bg-primary-glow rounded-full animate-pulse delay-900"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            {t('news.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        {/* News Ticker */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm">
            <div className="news-ticker group">
              <div className="news-track">
                {/* Duplicate the news items for seamless loop */}
                {[...Array(6), ...Array(6)].map((_, index) => {
                  const itemIndex = (index % 6) + 1;
                  return (
                    <div
                      key={`news-${itemIndex}-${index}`}
                      className="news-item flex-shrink-0 w-80 md:w-96 mx-4"
                    >
                      <div className="glass-card rounded-xl p-6 h-full border border-border/30 bg-card/10 backdrop-blur-md hover:bg-card/20 transition-all duration-300">
                        <div className="flex flex-col h-full">
                          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                            {t(`news.items.item${itemIndex}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {t(`news.items.item${itemIndex}.date`)}
                          </p>
                          <p className="text-sm text-foreground/90 mb-4 line-clamp-3 flex-grow">
                            {t(`news.items.item${itemIndex}.summary`)}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={() => window.open(t(`news.items.item${itemIndex}.link`), '_blank')}
                          >
                            {t('news.readMore')}
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
            <Instagram className="w-5 h-5 text-primary" />
            <span className="text-foreground">{t('news.instagram.text')}</span>
            <Button
              variant="link"
              size="sm"
              className="text-primary hover:text-primary-glow p-0 h-auto"
              onClick={() => window.open(t('news.instagram.link'), '_blank')}
            >
              {t('news.instagram.handle')}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .news-ticker {
          width: 100%;
          overflow: hidden;
        }
        
        .news-track {
          display: flex;
          animation: scroll-left 40s linear infinite;
          width: calc(200%);
        }
        
        .news-ticker:hover .news-track {
          animation-play-state: paused;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .news-item {
            width: 280px;
          }
          
          .news-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsSection;