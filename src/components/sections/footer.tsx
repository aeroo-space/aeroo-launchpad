import { Mail, Phone, MapPin, Instagram, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const SOCIAL_LINKS = [{
  name: "Instagram",
  href: "https://instagram.com/aeroo.space",
  icon: Instagram
}, {
  name: "Telegram",
  href: "https://t.me/+5nKRCrdTXT05YThi",
  icon: Send
}, {
  name: "WhatsApp",
  href: "https://wa.me/77770990300",
  icon: MessageCircle
}, {
  name: "Email",
  href: "mailto:info@aeroo.space?subject=Вопрос%20по%20AEROO",
  icon: Mail
}];
const FOOTER_LINKS = [{
  title: "Платформа",
  links: [{
    name: "Соревнования",
    href: "/competitions"
  }, {
    name: "Курсы",
    href: "/courses"
  }, {
    name: "Продукты",
    href: "/products"
  }, {
    name: "О нас",
    href: "/about"
  }, {
    name: "Карьера",
    href: "/careers"
  }]
}, {
  title: "Поддержка",
  links: [{
    name: "Контакты",
    href: "/contacts"
  }, {
    name: "Техподдержка",
    href: "/support"
  }, {
    name: "Сообщество",
    href: "/community"
  }]
}, {
  title: "Документы",
  links: [{
    name: "Политика конфиденциальности",
    href: "/privacy"
  }, {
    name: "Пользовательское соглашение",
    href: "/terms"
  }]
}];
export function Footer() {
  const {
    t
  } = useTranslation();
  return <footer className="bg-muted/20 border-t border-border/50 mt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/b69a9019-60d9-465c-8c97-374a0558b678.png" alt="Логотип AEROO" className="h-8 w-auto" width={220} height={32} decoding="async" />
            </div>
            
            <p className="text-muted-foreground max-w-md">
              {t('footer.description', {
              defaultValue: 'Образовательная платформа, объединяющая школьников, студентов и молодых инженеров вокруг аэрокосмических технологий.'
            })}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@aeroo.space" className="hover:text-primary transition-colors">info@aeroo.space</a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+77751639790" className="hover:text-primary transition-colors">+7 775 163 97 90</a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t('footer.location', {
                  defaultValue: 'Алматы, Казахстан'
                })}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(social => {
              const Icon = social.icon as any;
              return <Button key={social.name} variant="ghost" size="sm" className="w-10 h-10 p-0 hover:glow-primary transition-all" asChild>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} onClick={e => {
                  e.preventDefault();
                  window.open(social.href, '_blank', 'noopener,noreferrer');
                }}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>;
            })}
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((section, sIdx) => <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{t(`footer.sections.${sIdx}.title`, {
              defaultValue: section.title
            })}</h3>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => <li key={link.name}>
                      {link.href.startsWith("http") ? <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {t(`footer.sections.${sIdx}.links.${lIdx}`, {
                  defaultValue: link.name
                })}
                        </a> : <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {t(`footer.sections.${sIdx}.links.${lIdx}`, {
                  defaultValue: link.name
                })}
                        </Link>}
                    </li>)}
              </ul>
            </div>)}
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AEROO. {t('footer.bottom.rights', {
            defaultValue: 'Все права защищены.'
          })}
          </p>
        </div>
      </div>

      {/* Background Stars */}
      
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-ping opacity-30" />
      
    </footer>;
}