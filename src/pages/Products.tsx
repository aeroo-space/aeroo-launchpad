import { useEffect, useState, useRef } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Rocket, Plane, Satellite, Zap, Shield, Wrench } from "lucide-react";
import { ChatBotPanel } from "@/components/sections/product-chatbot";
import { ProductRequestModal } from "@/components/sections/product-request-modal";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
const products = [
  {
    id: "rocket-kit",
    title: "Набор ракетомоделирования AEROO-R1",
    description: "Полный комплект для изучения основ ракетостроения и аэродинамики",
    image: "/placeholder.svg",
    price: "12,990 ₸",
    features: ["Безопасные двигатели", "Детальные инструкции", "Система восстановления", "Видеокурс"],
    icon: Rocket,
    category: "Ракеты",
    inStock: true
  },
  {
    id: "drone-kit",
    title: "Образовательный дрон AEROO-D2",
    description: "Программируемый квадрокоптер для изучения основ пилотирования и программирования",
    image: "/placeholder.svg", 
    price: "45,990 ₸",
    features: ["FPV камера", "Программируемый контроллер", "Запасные пропеллеры", "Симулятор полёта"],
    icon: Plane,
    category: "Дроны",
    inStock: true
  },
  {
    id: "satellite-kit",
    title: "Наноспутник AEROO-S3",
    description: "Конструктор для сборки функционального наноспутника с системами связи",
    image: "/placeholder.svg",
    price: "89,990 ₸", 
    features: ["Солнечные панели", "Радиосистема", "Бортовой компьютер", "Датчики"],
    icon: Satellite,
    category: "Спутники",
    inStock: false
  }
];

const advantages = [
  {
    icon: Zap,
    title: "Инновационные технологии",
    description: "Используем последние достижения в области аэрокосмических технологий"
  },
  {
    icon: Shield,
    title: "Полная безопасность",
    description: "Все наборы проходят строгую сертификацию и тестирование"
  },
  {
    icon: Wrench,
    title: "Поддержка экспертов",
    description: "Техническая поддержка и консультации от наших инженеров"
  }
];

const Products = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = (t('products.metaTitle', { defaultValue: 'Продукты AEROO — наборы и конструкторы' }));
  }, [t]);

  const handleOpenRequest = (id: string) => {
    setSelectedProductId(id);
    setIsRequestOpen(true);
  };

  const handleGoToChat = () => chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('products.hero.title', { defaultValue: 'Продукты AEROO' })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('products.hero.subtitle', { defaultValue: 'Образовательные наборы и конструкторы для изучения аэрокосмических технологий. От простых моделей ракет до сложных наноспутников.' })}
          </p>
        </div>

        {/* Advantages Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t('products.advantages.title', { defaultValue: 'Преимущества наших наборов' })}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-10 w-10 text-primary group-hover:glow-primary transition-all" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t(`products.advantages.items.${index}.title`, { defaultValue: advantage.title })}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(`products.advantages.items.${index}.desc`, { defaultValue: advantage.description })}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t('products.grid.title', { defaultValue: 'Наши продукты' })}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-primary group-hover:glow-primary transition-all" />
                      <div className="flex gap-2">
                        <Badge variant="outline">{t(`products.items.${product.id}.category`, { defaultValue: product.category })}</Badge>
                        {product.inStock ? (
                          <Badge className="bg-green-500 text-white">{t('products.inStock', { defaultValue: 'В наличии' })}</Badge>
                        ) : (
                          <Badge variant="destructive">{t('products.outOfStock', { defaultValue: 'Нет в наличии' })}</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Package className="h-16 w-16 text-muted-foreground" />
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {t(`products.items.${product.id}.title`, { defaultValue: product.title })}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {t(`products.items.${product.id}.description`, { defaultValue: product.description })}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">{t('products.includes', { defaultValue: 'Что входит в набор:' })}</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {t(`products.items.${product.id}.features.${index}`, { defaultValue: feature })}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                    </div>

<Button 
                      className="w-full btn-cosmic" 
                      disabled={!product.inStock}
                      onClick={() => handleOpenRequest(product.id)}
                    >
                    {product.inStock ? t('products.cta.request', { defaultValue: 'Оставить заявку' }) : t('products.cta.notify', { defaultValue: 'Сообщить о поступлении' })}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('products.help.title', { defaultValue: 'Нужна консультация?' })}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('products.help.desc', { defaultValue: 'Наши эксперты помогут выбрать подходящий набор для вашего уровня подготовки и образовательных целей. Свяжитесь с нами для персональной консультации.' })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-cosmic" onClick={handleGoToChat}>
              {t('products.help.getConsultation', { defaultValue: 'Получить консультацию' })}
            </Button>
            <Button size="lg" variant="outline" onClick={() => toast({ title: t('products.catalog.soon', { defaultValue: 'Каталог скоро' }), description: t('products.catalog.pdfLater', { defaultValue: 'PDF-каталог будет доступен позже' }) })}>
              {t('products.catalog.download', { defaultValue: 'Скачать каталог' })}
            </Button>
          </div>
        </div>

        {/* Online Consultation Chat */}
        <section className="mt-12" aria-label="Онлайн-консультация AEROO">
          <h2 className="sr-only">Онлайн-консультация</h2>
          <div ref={chatRef} className="max-w-3xl mx-auto">
            <ChatBotPanel />
          </div>
        </section>

        {/* Request Modal */}
        <ProductRequestModal
          open={isRequestOpen}
          onOpenChange={setIsRequestOpen}
          products={products.map((p) => ({ id: p.id, title: t(`products.items.${p.id}.title`, { defaultValue: p.title }) }))}
          selectedProductId={selectedProductId}
          onSubmitted={() =>
            toast({ title: t('products.request.sent', { defaultValue: 'Заявка отправлена' }), description: t('products.request.weWillContact', { defaultValue: 'Мы свяжемся с вами по email' }) })
          }
        />
      </main>

      <Footer />
    </div>
  );
};

export default Products;