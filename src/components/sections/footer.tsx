import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const SOCIAL_LINKS = [
  { name: "Telegram", href: "https://t.me/+5nKRCrdTXT05YThi", icon: "📱" },
  { name: "Instagram", href: "https://instagram.com/", icon: "📷" },
  { name: "YouTube", href: "https://youtube.com/", icon: "📺" },
  { name: "LinkedIn", href: "https://linkedin.com/", icon: "💼" }
];

const FOOTER_LINKS = [
  {
    title: "Платформа",
    links: [
      { name: "Соревнования", href: "/competitions" },
      { name: "Курсы", href: "/courses" },
      { name: "Продукты", href: "/products" },
      { name: "О нас", href: "/about" }
    ]
  },
  {
    title: "Поддержка",
    links: [
      { name: "Контакты", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Техподдержка", href: "/support" },
      { name: "Сообщество", href: "/community" }
    ]
  },
  {
    title: "Документы",
    links: [
      { name: "Политика конфиденциальности", href: "/privacy" },
      { name: "Пользовательское соглашение", href: "/terms" },
      { name: "Правила соревнований", href: "/rules" },
      { name: "Сертификаты", href: "/certificates" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border/50 mt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/b69a9019-60d9-465c-8c97-374a0558b678.png"
                alt="Логотип AEROO"
                className="h-8 w-auto"
                width={220}
                height={32}
                decoding="async"
              />
            </div>
            
            <p className="text-muted-foreground max-w-md">
              Образовательная платформа, объединяющая школьников, студентов и молодых инженеров вокруг аэрокосмических технологий.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@aeroo.kz</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+7 (777) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Алматы, Казахстан</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:glow-primary transition-all"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <span className="text-lg">{social.icon}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                    <li key={link.name}>
                      {link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="glass-card p-8 rounded-xl mb-12">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              Будьте в курсе новостей AEROO
            </h3>
            <p className="text-muted-foreground">
              Получайте уведомления о новых курсах, соревнованиях и мероприятиях
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="btn-cosmic px-6 py-2" onClick={() => toast("Спасибо! Вы подписались на новости AEROO.")}> 
                Подписаться
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AEROO. Все права защищены.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Конфиденциальность
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Условия использования
            </a>
            <a href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Background Stars */}
      <div className="absolute bottom-10 left-10 w-1 h-1 bg-primary rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-ping opacity-30" />
      <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-primary-glow rounded-full animate-pulse opacity-50" />
    </footer>
  );
}