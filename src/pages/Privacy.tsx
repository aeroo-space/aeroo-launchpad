import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";

const Privacy = () => {
  useEffect(() => {
    document.title = "Политика конфиденциальности — AEROO";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Политика конфиденциальности</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Как мы собираем и обрабатываем ваши данные.</p>
        </header>
        <section className="prose prose-invert max-w-3xl mx-auto">
          <p>Мы относимся к безопасности данных ответственно. Данные используются исключительно для предоставления услуг AEROO.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
