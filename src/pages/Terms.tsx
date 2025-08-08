import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";

const Terms = () => {
  useEffect(() => {
    document.title = "Пользовательское соглашение — AEROO";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Пользовательское соглашение</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Правила использования платформы AEROO.</p>
        </header>
        <section className="prose prose-invert max-w-3xl mx-auto">
          <p>Используя наш сайт, вы соглашаетесь соблюдать правила и не нарушать права других пользователей.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
