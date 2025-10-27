import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const HackathonTask = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Задача Хакатона — AEROO";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Задача Хакатона
          </h1>
          
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-lg text-muted-foreground">
              Контент будет добавлен позже. Эта страница доступна только участникам Space Settlement Competition 2025.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HackathonTask;
