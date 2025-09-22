import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Rocket, 
  GraduationCap, 
  Package, 
  Users, 
  Globe, 
  Menu, 
  X,
  User,
  Mail
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const LANGUAGES = [
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
  { code: 'en', label: 'EN' }
];

const NAVIGATION_ITEMS = [
  { label: 'Соревнования', href: '/competitions', icon: Rocket },
  { label: 'Курсы', href: '/courses', icon: GraduationCap },
  { label: 'Продукты', href: '/products', icon: Package },
  { label: 'О нас', href: '/about', icon: Users },
  { label: 'Контакты', href: '/contacts', icon: Mail },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'ru').split('-')[0];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-6 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center" aria-label="AEROO — образовательная платформа">
              <img
                src="/lovable-uploads/b69a9019-60d9-465c-8c97-374a0558b678.png"
                alt="Логотип AEROO"
                className="h-10 w-auto"
                width={220}
                height={32}
                decoding="async"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-1 justify-center">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const translationKey = {
                '/competitions': 'nav.competitions',
                '/courses': 'nav.courses', 
                '/products': 'nav.products',
                '/about': 'nav.about',
                '/contacts': 'nav.contacts'
              }[item.href];
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Icon className="h-4 w-4 group-hover:glow-primary transition-all" />
                  <span className="whitespace-nowrap text-sm">
                    {translationKey ? t(translationKey) : item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Language Switcher */}
            <div className="hidden md:flex items-center space-x-1 bg-muted rounded-lg p-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={cn(
                    "px-2 py-1.5 text-xs font-medium rounded-md transition-colors inline-flex items-center justify-center min-w-8 min-h-8",
                    currentLang === lang.code
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Profile/Login or Dashboard */}
            {user ? (
              <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                <Link to="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  {t('nav.dashboard')}
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                <Link to="/auth">
                  <User className="h-4 w-4 mr-2" />
                  {t('nav.login')}
                </Link>
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle aria-label={t('nav.toggleTheme', { defaultValue: 'Переключить тему' })} />

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className="lg:hidden h-10 w-10"
              aria-label={isMenuOpen ? t('nav.closeMenu', { defaultValue: 'Закрыть меню' }) : t('nav.openMenu', { defaultValue: 'Открыть меню' })}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-x-0 top-16 lg:top-20 z-[100] lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="px-4 py-4 space-y-2 overflow-y-auto bg-background/95 backdrop-blur-md h-full min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const translationKey = {
                  '/competitions': 'nav.competitions',
                  '/courses': 'nav.courses', 
                  '/products': 'nav.products',
                  '/about': 'nav.about',
                  '/contacts': 'nav.contacts'
                }[item.href];
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-base text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="whitespace-nowrap">
                      {translationKey ? t(translationKey) : item.label}
                    </span>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md inline-flex items-center justify-center min-w-11 min-h-11",
                        currentLang === lang.code
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {/* Theme toggle (mobile) */}
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>

              {user ? (
                <Button className="w-full h-11 btn-cosmic" asChild>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.dashboard')}
                  </Link>
                </Button>
              ) : (
                <Button className="w-full h-11 btn-cosmic" asChild>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    {t('nav.login')}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}