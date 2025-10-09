import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SpaceAI2026 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Space AI 2026 - AEROO</title>
        <meta name="description" content="Разработайте AI-решения для космических задач и исследований" />
        <link rel="canonical" href="https://aeroo.space/competitions/space-ai-2026" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Space AI 2026
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Разработайте AI-решения для космических задач и исследований
            </p>
            
            <Button 
              size="xl" 
              className="btn-cosmic"
              onClick={() => navigate('/enroll/ai-challenge')}
            >
              Принять участие
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-muted/30 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Скоро здесь появится подробная информация</h2>
              <p className="text-muted-foreground">
                Следите за обновлениями на нашем сайте и в социальных сетях
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SpaceAI2026;
