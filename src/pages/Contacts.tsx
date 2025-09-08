import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";
import { Mail, Phone, Instagram, Send, MessageCircle, MapPin } from "lucide-react";

const Contacts = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const title = t('contacts.metaTitle', { defaultValue: 'Контакты — AEROO' });
    const desc = t('contacts.metaDesc', { defaultValue: 'Свяжитесь с AEROO: email, телефон, Instagram, Telegram и WhatsApp.' });
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = desc;
      document.head.appendChild(m);
    }
    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = window.location.origin + '/contacts';

    // Structured data
    const scriptId = 'ld-json-contacts';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AEROO',
      url: window.location.origin,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'info@aeroo.space',
          telephone: '+7 775 163 97 90'
        }
      ]
    };
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(ld);
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contacts.title', { defaultValue: 'Контакты AEROO' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contacts.subtitle', { defaultValue: 'Мы на связи: выберите удобный способ и свяжитесь с нашей командой.' })}
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <a href="mailto:info@aeroo.space" className="group rounded-xl border border-border p-6 hover:glow-primary transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Email</h2>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">info@aeroo.space</p>
          </a>

          {/* Phone */}
          <a href="tel:+77751639790" className="group rounded-xl border border-border p-6 hover:glow-primary transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{t('contacts.phone', { defaultValue: 'Телефон' })}</h2>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">+7 775 163 97 90</p>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/aeroo.space" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group rounded-xl border border-border p-6 hover:glow-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://instagram.com/aeroo.space', '_blank', 'noopener,noreferrer');
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Instagram className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Instagram</h2>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">@aeroo.space</p>
          </a>

          {/* Telegram */}
          <a href="https://t.me/+5nKRCrdTXT05YThi" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border p-6 hover:glow-primary transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Send className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Telegram</h2>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">{t('contacts.telegram', { defaultValue: 'Сообщество AEROO' })}</p>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/77751639790" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border p-6 hover:glow-primary transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">WhatsApp</h2>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">+7 775 163 97 90</p>
          </a>

          {/* Location */}
          <div className="group rounded-xl border border-border p-6 hover:glow-primary transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{t('contacts.location', { defaultValue: 'Локация' })}</h2>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">{t('footer.location', { defaultValue: 'Алматы, Казахстан' })}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
