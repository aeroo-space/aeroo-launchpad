import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";

const Support = () => {
  useEffect(() => {
    document.title = "Техподдержка AEROO";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Техподдержка</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Поможем с доступом, наборами, заказами и участием в соревнованиях. Напишите нам и мы ответим в ближайшее время.
          </p>
        </header>
        <section className="max-w-2xl mx-auto space-y-4">
          <p>Почта: support@aeroo.kz</p>
          <p>Telegram: @aeroo_support</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
